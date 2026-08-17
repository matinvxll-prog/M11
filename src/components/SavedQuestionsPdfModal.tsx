import React, { useState, useRef } from "react";
import {
  FileText,
  Download,
  Printer,
  X,
  Check,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Layers,
  FileCode,
  Trash2,
  Eye,
  Settings2
} from "lucide-react";
import { BookmarkItem, Language, Question, SubjectId } from "../types";
import { AppLogoWithText, AppLogoSvg } from "./AppLogo";
import html2pdf from "html2pdf.js";

interface SavedQuestionsPdfModalProps {
  bookmarks: BookmarkItem[];
  language: Language;
  onClose: () => void;
  onAddBookmark?: (question: Question) => void;
  onRemoveBookmark: (questionId: string) => void;
}

export const SavedQuestionsPdfModal: React.FC<SavedQuestionsPdfModalProps> = ({
  bookmarks,
  language,
  onClose,
  onAddBookmark,
  onRemoveBookmark
}) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";

  // State for filter & selection
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>(
    bookmarks.map((b) => b.question.id)
  );
  const [includeAnswers, setIncludeAnswers] = useState<boolean>(true);
  const [includeExplanations, setIncludeExplanations] = useState<boolean>(true);
  const [pdfTitle, setPdfTitle] = useState<string>(
    isBadini ? "بەندک و پرسیارێن پاراستی یێن وزاری" : "پرسیارە پارێزراوەکانی وەزارەتی"
  );

  const printAreaRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Filter bookmarks
  const filteredBookmarks = bookmarks.filter((bm) => {
    if (selectedSubject === "all") return true;
    return bm.question.subjectId === selectedSubject;
  });

  const questionsToExport = filteredBookmarks.filter((bm) =>
    selectedQuestionIds.includes(bm.question.id)
  );

  // Toggle selection
  const toggleSelectAll = () => {
    if (selectedQuestionIds.length === filteredBookmarks.length) {
      setSelectedQuestionIds([]);
    } else {
      setSelectedQuestionIds(filteredBookmarks.map((bm) => bm.question.id));
    }
  };

  const toggleSelectQuestion = (id: string) => {
    if (selectedQuestionIds.includes(id)) {
      setSelectedQuestionIds(selectedQuestionIds.filter((qId) => qId !== id));
    } else {
      setSelectedQuestionIds([...selectedQuestionIds, id]);
    }
  };

  // Export to PDF using html2pdf.js with full oklch color conversion and sanitization
  const handleDownloadPdf = async () => {
    if (!printAreaRef.current) return;
    setIsExporting(true);

    try {
      const element = printAreaRef.current;
      const opt = {
        margin: [8, 8, 8, 8] as [number, number, number, number], // top, left, bottom, right in mm
        filename: `${pdfTitle.replace(/\s+/g, "_")}_A4.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          windowWidth: 1024,
          onclone: (clonedDoc: Document) => {
            const canvas = clonedDoc.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Convert any oklch/oklab or unknown color strings to rgb hex
            const safeColor = (col: string): string => {
              if (!col || col === "transparent" || col === "inherit" || col === "initial") return col;
              if (col.includes("oklch") || col.includes("oklab")) {
                if (ctx) {
                  ctx.fillStyle = "#ffffff";
                  ctx.fillStyle = col;
                  return ctx.fillStyle;
                }
                return "#8b5cf6";
              }
              return col;
            };

            // 1. Sanitize style tags containing oklch
            const styleTags = clonedDoc.querySelectorAll("style");
            styleTags.forEach((styleTag) => {
              if (styleTag.innerHTML.includes("oklch") || styleTag.innerHTML.includes("oklab")) {
                styleTag.innerHTML = styleTag.innerHTML.replace(/(oklch|oklab)\([^)]+\)/g, (match) => {
                  return safeColor(match);
                });
              }
            });

            // 2. Traverse all elements inside printable area and convert computed oklch styles to rgb/hex + fix RTL letter spacing
            const printableArea = clonedDoc.getElementById("a4-printable-area");
            if (printableArea) {
              const allNodes = printableArea.querySelectorAll("*");
              const nodesArray = Array.from(allNodes);
              nodesArray.push(printableArea);

              nodesArray.forEach((node) => {
                const htmlEl = node as HTMLElement;
                // Force letter spacing to normal to prevent RTL Kurdish letter disjoining
                htmlEl.style.letterSpacing = "normal";
                htmlEl.style.textTransform = "none";

                const computed = window.getComputedStyle(htmlEl);

                if (computed.color && (computed.color.includes("oklch") || computed.color.includes("oklab"))) {
                  htmlEl.style.color = safeColor(computed.color);
                }
                if (computed.backgroundColor && (computed.backgroundColor.includes("oklch") || computed.backgroundColor.includes("oklab"))) {
                  htmlEl.style.backgroundColor = safeColor(computed.backgroundColor);
                }
                if (computed.borderColor && (computed.borderColor.includes("oklch") || computed.borderColor.includes("oklab"))) {
                  htmlEl.style.borderColor = safeColor(computed.borderColor);
                }
                if (computed.fill && (computed.fill.includes("oklch") || computed.fill.includes("oklab"))) {
                  htmlEl.style.fill = safeColor(computed.fill);
                }
                if (computed.stroke && (computed.stroke.includes("oklch") || computed.stroke.includes("oklab"))) {
                  htmlEl.style.stroke = safeColor(computed.stroke);
                }
                if (computed.boxShadow && (computed.boxShadow.includes("oklch") || computed.boxShadow.includes("oklab"))) {
                  htmlEl.style.boxShadow = "none";
                }
              });
            }
          }
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" as const }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF generation failed, falling back to window.print()", err);
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  // Direct Print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#121427] border border-purple-500/40 rounded-3xl w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-indigo-900/40 flex items-center justify-between bg-[#171933] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-white flex items-center gap-2">
                <span>{isBadini ? "درستکرنا فایلا A4 PDF ژ پرسیارێن پاراستی" : "دروستکردنی فایلی A4 PDF لە پرسیارە پارێزراوەکان"}</span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  دگەڵ قوتابی
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {isBadini
                  ? "پرسیاران بکە خشتەکا ئامادەیا چاپکرنێ دگەل لۆگۆیێ تایبەت ل قولاچەکا سەرێ لاپەرێ A4"
                  : "پرسیارەکان بکه فایلی PDF ئامادەی چاپ لەگەڵ لۆگۆی تایبەت لە گۆشەی لاپەڕەی A4"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Controls Panel (Left or Top) */}
          <div className="lg:col-span-5 p-5 bg-[#171933]/90 border-r border-indigo-900/40 space-y-5 overflow-y-auto">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleDownloadPdf}
                disabled={isExporting || questionsToExport.length === 0}
                className="flex-1 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition"
              >
                <Download className="w-4 h-4" />
                <span>{isExporting ? "تەواوکردن..." : isBadini ? "دابەزاندنا PDF (A4)" : "داگرتنی PDF"}</span>
              </button>

              <button
                onClick={handlePrint}
                className="py-3 px-4 rounded-xl bg-[#22254d] hover:bg-[#2c3063] text-white font-bold text-xs flex items-center justify-center gap-2 border border-indigo-800/40 transition"
              >
                <Printer className="w-4 h-4 text-purple-300" />
                <span>{isBadini ? "چاپکرن" : "چاپکردن"}</span>
              </button>
            </div>

            {/* Document Customization Settings */}
            <div className="p-4 rounded-2xl bg-[#121427] border border-indigo-900/40 space-y-3">
              <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <Settings2 className="w-4 h-4 text-purple-400" />
                {isBadini ? "ڕێکخستنێن ڕووکارێ PDF" : "ڕێکخستنەکانی لاپەڕەی PDF"}
              </span>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">ناڤێ فایلی (PDF Title)</label>
                <input
                  type="text"
                  value={pdfTitle}
                  onChange={(e) => setPdfTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#16182e] border border-indigo-900/40 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-300">{isBadini ? "نیشاندانا بەرسڤێن دروست" : "نیشاندانی وەڵامی درست"}</span>
                <input
                  type="checkbox"
                  checked={includeAnswers}
                  onChange={(e) => setIncludeAnswers(e.target.checked)}
                  className="w-4 h-4 accent-purple-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">{isBadini ? "نیشاندانا شیکارکرن و روونکردنەوان" : "نیشاندانی ڕوونکردنەوەکان"}</span>
                <input
                  type="checkbox"
                  checked={includeExplanations}
                  onChange={(e) => setIncludeExplanations(e.target.checked)}
                  className="w-4 h-4 accent-purple-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Subject Filter & Question Picker */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">
                  {isBadini ? "هەڵبژارتنا پرسیاران" : "هەڵبژاردنی پرسیارەکان"} ({questionsToExport.length} / {filteredBookmarks.length})
                </span>
                <button
                  onClick={toggleSelectAll}
                  className="text-xs font-bold text-purple-400 hover:text-purple-300"
                >
                  {selectedQuestionIds.length === filteredBookmarks.length ? "لابردنی هەمووی" : "دیاریکردنی هەمووی"}
                </button>
              </div>

              {/* Subject Filter Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {["all", "physics", "math", "chemistry", "biology", "english", "kurdish", "arabic"].map((subj) => (
                  <button
                    key={subj}
                    onClick={() => setSelectedSubject(subj)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold capitalize transition shrink-0 ${
                      selectedSubject === subj
                        ? "bg-purple-600 text-white"
                        : "bg-[#121427] text-slate-400 hover:text-white"
                    }`}
                  >
                    {subj === "all" ? (isBadini ? "هەمی" : "هەموو") : subj}
                  </button>
                ))}
              </div>

              {/* Questions Checklist */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {filteredBookmarks.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4">پرسیار نینن</p>
                ) : (
                  filteredBookmarks.map((bm) => {
                    const isSelected = selectedQuestionIds.includes(bm.question.id);
                    return (
                      <div
                        key={bm.id}
                        onClick={() => toggleSelectQuestion(bm.question.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer flex items-start gap-2.5 transition ${
                          isSelected
                            ? "bg-purple-950/40 border-purple-500/50 text-white"
                            : "bg-[#121427] border-indigo-900/30 text-slate-400"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded border shrink-0 mt-0.5 flex items-center justify-center ${
                            isSelected ? "bg-purple-600 border-purple-500 text-white" : "border-slate-600"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                        <div className="overflow-hidden flex-1">
                          <span className="text-[10px] font-bold text-purple-400 uppercase block">
                            {bm.question.subjectId} • {bm.question.year || "وزاری"}
                          </span>
                          <p className="font-bold text-slate-200 line-clamp-2 mt-0.5">
                            {bm.question.questionKu || bm.question.questionBadini}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Right side: A4 Paper Live Preview */}
          <div className="lg:col-span-7 p-4 sm:p-6 bg-slate-950 flex flex-col items-center overflow-y-auto">
            <span className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              {isBadini ? "پیشاندانا ڕاستەوخۆ یا لاپەرێ A4 (Live A4 Paper Preview)" : "پیشاندانی ڕاستەوخۆی لاپەڕەی A4"}
            </span>

            {/* A4 Printable Sheet Container */}
            <div
              ref={printAreaRef}
              id="a4-printable-area"
              className="w-full max-w-[210mm] min-h-[297mm] p-8 shadow-2xl rounded-sm flex flex-col justify-between font-sans relative border"
              style={{
                direction: "rtl",
                wordBreak: "break-word",
                backgroundColor: "#ffffff",
                color: "#0f172a",
                borderColor: "#cbd5e1"
              }}
            >
              {/* TOP HEADER WITH THE UPLOADED OWL LOGO IN THE CORNER */}
              <div>
                <div
                  className="flex items-center justify-between pb-4 mb-6"
                  style={{ borderBottom: "2px solid #e9d5ff" }}
                >
                  {/* Right side info in Kurdish */}
                  <div className="space-y-1">
                    <span
                      className="text-xs font-extrabold block"
                      style={{ color: "#581c87", letterSpacing: "normal" }}
                    >
                      وەزارەتی پەروەردە • پۆلی ۱۲ی ئامادەیی
                    </span>
                    <h1
                      className="text-xl font-black"
                      style={{ color: "#0f172a", letterSpacing: "normal" }}
                    >
                      {pdfTitle}
                    </h1>
                    <div
                      className="flex items-center gap-3 text-xs font-medium"
                      style={{ color: "#475569", letterSpacing: "normal" }}
                    >
                      <span>ژمارەی پرسیارەکان: {questionsToExport.length}</span>
                      <span>•</span>
                      <span>ڕێکەوت: {new Date().toLocaleDateString("en-CA")}</span>
                    </div>
                  </div>

                  {/* LEFT/RIGHT CORNER: THE EMBEDDED OWL LOGO WITH "دگەڵ قوتابی" */}
                  <div
                    className="flex flex-col items-center justify-center p-2 rounded-2xl shadow-sm min-w-[100px]"
                    style={{
                      backgroundColor: "#faf5ff",
                      border: "1px solid #e9d5ff"
                    }}
                  >
                    <AppLogoSvg className="w-12 h-12" />
                    <span
                      className="text-xs font-extrabold mt-1 text-center block whitespace-nowrap"
                      style={{ color: "#581c87", letterSpacing: "normal" }}
                    >
                      دگەڵ قوتابی
                    </span>
                    <span
                      className="text-[9px] font-bold text-center block"
                      style={{ color: "#7e22ce" }}
                    >
                      Dagal Qutabi
                    </span>
                  </div>
                </div>

                {/* Question List on A4 Paper */}
                <div className="space-y-6">
                  {questionsToExport.length === 0 ? (
                    <div
                      className="text-center py-12 text-sm"
                      style={{ color: "#94a3b8" }}
                    >
                      هیچ پرسیارێک هەڵنەبژێردراوە بۆ چاپکردن
                    </div>
                  ) : (
                    questionsToExport.map((bm, index) => {
                      const q = bm.question;
                      const options = q.optionsKu || q.optionsBadini || q.optionsEn || [];
                      return (
                        <div
                          key={q.id}
                          className="p-4 rounded-xl space-y-2.5 page-break-inside-avoid"
                          style={{
                            backgroundColor: "#f8fafc",
                            border: "1px solid #e2e8f0"
                          }}
                        >
                          {/* Question header */}
                          <div
                            className="flex justify-between items-center text-xs font-extrabold"
                            style={{ color: "#581c87" }}
                          >
                            <span>پرسیاری {index + 1}: ({q.subjectId.toUpperCase()})</span>
                            <span
                              className="px-2 py-0.5 rounded text-[10px]"
                              style={{
                                backgroundColor: "#f3e8ff",
                                color: "#581c87"
                              }}
                            >
                              {q.year || "پرسیاری وزاری"}
                            </span>
                          </div>

                          {/* Question text */}
                          <p
                            className="text-xs sm:text-sm font-bold leading-relaxed"
                            style={{
                              color: "#0f172a",
                              lineHeight: "1.8",
                              fontSize: "13px",
                              marginBottom: "8px"
                            }}
                          >
                            {q.questionKu || q.questionBadini}
                          </p>

                          {/* Choices Options Grid */}
                          <div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1"
                            style={{ gap: "10px" }}
                          >
                            {options.map((opt, optIdx) => {
                              const isCorrect = optIdx === q.correctIndex;
                              const optionLetter = ["A", "B", "C", "D"][optIdx] || optIdx + 1;
                              const optionStyle: React.CSSProperties = includeAnswers && isCorrect
                                ? {
                                    backgroundColor: "#ecfdf5",
                                    borderColor: "#34d399",
                                    color: "#064e3b",
                                    fontWeight: "bold",
                                    padding: "10px 12px",
                                    borderRadius: "10px",
                                    lineHeight: "1.7",
                                    fontSize: "12px",
                                    minHeight: "44px"
                                  }
                                : {
                                    backgroundColor: "#ffffff",
                                    borderColor: "#e2e8f0",
                                    color: "#1e293b",
                                    fontWeight: "500",
                                    padding: "10px 12px",
                                    borderRadius: "10px",
                                    lineHeight: "1.7",
                                    fontSize: "12px",
                                    minHeight: "44px"
                                  };

                              return (
                                <div
                                  key={optIdx}
                                  className="border flex items-center gap-2.5"
                                  style={optionStyle}
                                >
                                  <span
                                    className="w-6 h-6 rounded-md font-black text-[11px] flex items-center justify-center shrink-0"
                                    style={{
                                      backgroundColor: "#f3e8ff",
                                      color: "#581c87"
                                    }}
                                  >
                                    {optionLetter}
                                  </span>
                                  <span
                                    style={{
                                      flex: 1,
                                      lineHeight: "1.7",
                                      wordBreak: "break-word",
                                      overflow: "visible"
                                    }}
                                  >
                                    {opt}
                                  </span>
                                  {includeAnswers && isCorrect && (
                                    <CheckCircle2
                                      className="w-4 h-4 mr-auto shrink-0"
                                      style={{ color: "#059669" }}
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Explanation Box if enabled */}
                          {includeExplanations && (q.explanationKu || q.explanationBadini) && (
                            <div
                              className="p-3 rounded-lg text-xs mt-3"
                              style={{
                                backgroundColor: "#fffbeb",
                                border: "1px solid #fde68a",
                                color: "#78350f",
                                lineHeight: "1.8"
                              }}
                            >
                              <span
                                className="font-extrabold block mb-1"
                                style={{ color: "#451a03" }}
                              >
                                شیکار / روونکردنەوە:
                              </span>
                              {q.explanationKu || q.explanationBadini}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* FOOTER OF A4 PAGE */}
              <div
                className="pt-3 mt-8 flex items-center justify-between text-[10px]"
                style={{
                  borderTop: "1px solid #e2e8f0",
                  color: "#64748b"
                }}
              >
                <span>ئەپڵیکەیشنی دگەڵ قوتابی • بۆ قوتابییێن پۆلا ۱۲</span>
                <span className="font-mono">لاپەڕەی ۱ لە ۱</span>
                <span>www.dagalqutabi.app</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
