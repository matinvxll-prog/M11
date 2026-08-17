import React, { useState } from "react";
import { FileText, Download, Eye, Search, Sparkles, BookOpen, Check, FileCheck, X } from "lucide-react";
import { Language, SubjectId, PdfDocument } from "../types";
import { mockPdfs, subjectsList } from "../data/mockData";
import { getLocalizedText } from "../utils/i18n";

interface PdfLibraryViewProps {
  language: Language;
}

export const PdfLibraryView: React.FC<PdfLibraryViewProps> = ({ language }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePdf, setActivePdf] = useState<PdfDocument | null>(null);
  const [downloadedList, setDownloadedList] = useState<string[]>([]);

  const filteredPdfs = mockPdfs.filter((pdf) => {
    const matchSubject = selectedSubject === "all" || pdf.subjectId === selectedSubject;
    const matchSearch =
      pdf.titleKu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pdf.authorTeacher.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubject && matchSearch;
  });

  const handleDownload = (id: string) => {
    if (!downloadedList.includes(id)) {
      setDownloadedList([...downloadedList, id]);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 border border-purple-800/40 shadow-2xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold">
          <FileText className="w-3.5 h-3.5" />
          <span>
            {language === "badini"
              ? "کتێبخانەیا PDF و مەلزەمەیێن وزاری"
              : language === "ku"
              ? "کتێبخانەی PDF و مەلزەمە وزارییەکان"
              : "Grade 12 Official PDF & Notes Library"}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {language === "badini"
            ? "داگرتنا مەلزەمە و کورتکراوەیێن پۆلا ۱۲"
            : language === "ku"
            ? "داگرتنی مەلزەمە و کورتکراوەکانی پۆلی ۱۲"
            : "Download Grade 12 Notes & Exam Summaries"}
        </h1>
        <p className="text-xs sm:text-sm text-purple-200/80">
          {language === "badini"
            ? "هەمی مەلزەمەیێن مامۆستایێن بەناوبانگ و پرسیارێن وزاری ب فۆرماتێ PDF بەردەستن"
            : language === "ku"
            ? "سەرجەم مەلزەمەی مامۆستا بەناوبانگەکانی کوردستان بە خۆڕایی و بە کوالێتیی بەرز"
            : "Access top teacher notes, solved exam sheets, and formula cheat sheets in PDF format."}
        </p>
      </div>

      {/* Sleek Modern Control Center */}
      <div className="bg-[#16182e]/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-purple-500/30 shadow-2xl space-y-4">
        {/* Top Row: Title / Stats & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-black shadow-sm">
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span>
                {language === "badini"
                  ? `${filteredPdfs.length} مەلزەمە بەردەستن`
                  : language === "ku"
                  ? `${filteredPdfs.length} مەلزەمە بەردەستە`
                  : `${filteredPdfs.length} PDFs Available`}
              </span>
            </span>
          </div>

          {/* Smart Search Bar */}
          <div className="relative flex items-center bg-[#101222] border border-indigo-900/50 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20 rounded-2xl px-3.5 py-2.5 transition-all shadow-inner w-full sm:w-80">
            <Search className="w-4 h-4 text-purple-400 shrink-0 opacity-80" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === "badini"
                  ? "لگەڕیان بۆ مەلزەمە یان مامۆستای..."
                  : language === "ku"
                  ? "گەڕان بۆ مەلزەمە یان مامۆستا..."
                  : "Search PDF title or author..."
              }
              className="w-full bg-transparent border-none text-xs text-white placeholder-slate-500 focus:outline-none px-3 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-slate-400 hover:text-white transition p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Bottom Row: Segmented Subject Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <button
            onClick={() => setSelectedSubject("all")}
            className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
              selectedSubject === "all"
                ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-lg shadow-purple-600/30 scale-[1.02]"
                : "bg-[#101222]/90 border border-indigo-900/40 text-slate-300 hover:text-white hover:bg-white/5 hover:border-purple-500/40"
            }`}
          >
            {language === "badini" ? "✨ هەمی بابەت" : language === "ku" ? "✨ هەموو بابەتەکان" : "✨ All Subjects"}
          </button>
          {subjectsList.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSubject(s.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                selectedSubject === s.id
                  ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-lg shadow-purple-600/30 scale-[1.02]"
                  : "bg-[#101222]/90 border border-indigo-900/40 text-slate-300 hover:text-white hover:bg-white/5 hover:border-purple-500/40"
              }`}
            >
              <span>{s.iconSymbol}</span>
              <span>{getLocalizedText(s, "name", language)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* PDF Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPdfs.map((pdf) => {
          const isDownloaded = downloadedList.includes(pdf.id);
          return (
            <div
              key={pdf.id}
              className="bg-[#16182e] border border-indigo-900/30 hover:border-purple-500/50 p-5 rounded-2xl shadow-xl transition flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-14 rounded-2xl bg-gradient-to-br from-rose-600 to-purple-600 flex flex-col items-center justify-center text-white font-black shadow-lg shadow-rose-600/30 shrink-0">
                  <FileText className="w-6 h-6" />
                  <span className="text-[9px]">PDF</span>
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {pdf.year || "2024"}
                    </span>
                    {pdf.isExclusive && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        تایبەتی VIP ⭐
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white leading-snug">
                    {getLocalizedText(pdf, "title", language)}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {pdf.authorTeacher} • {pdf.pages} {language === "badini" ? "پەڕە" : language === "ku" ? "لاپەڕە" : "Pages"} • {pdf.fileSize}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-indigo-900/20 pt-3">
                <button
                  onClick={() => setActivePdf(pdf)}
                  className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-bold"
                >
                  <Eye className="w-4 h-4" />
                  <span>{language === "badini" ? "پێشبینین" : language === "ku" ? "بینین" : "Preview"}</span>
                </button>

                <button
                  onClick={() => handleDownload(pdf.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-md ${
                    isDownloaded
                      ? "bg-emerald-600 text-white shadow-emerald-600/30"
                      : "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30"
                  }`}
                >
                  {isDownloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  <span>
                    {isDownloaded
                      ? language === "badini"
                        ? "داگیرا"
                        : language === "ku"
                        ? "داگیرا"
                        : "Downloaded"
                      : language === "badini"
                      ? "داگرتن PDF"
                      : language === "ku"
                      ? "داگرتنی PDF"
                      : "Download PDF"}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* PDF Viewer Preview Modal */}
      {activePdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#111326] border border-purple-500/30 rounded-3xl p-6 text-slate-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-900/30 pb-3">
              <h2 className="text-sm font-extrabold text-white truncate pr-4">
                {getLocalizedText(activePdf, "title", language)}
              </h2>
              <button
                onClick={() => setActivePdf(null)}
                className="px-3 py-1 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition"
              >
                داخستن
              </button>
            </div>

            <div className="h-80 bg-[#16182e] rounded-2xl border border-indigo-900/40 p-6 flex flex-col items-center justify-center text-center space-y-3">
              <BookOpen className="w-12 h-12 text-purple-400 animate-pulse" />
              <p className="text-sm font-bold text-white">
                {language === "badini"
                  ? "پێشبینینا لایپەڕێن مەلزەمەیێ (نموونە)"
                  : language === "ku"
                  ? "پێشبینینی ڕاستەوخۆی لاپەڕەکانی مەلزەمەکە"
                  : "PDF Live Preview Canvas"}
              </p>
              <p className="text-xs text-slate-400 max-w-md">
                {activePdf.authorTeacher} • {activePdf.pages} Pages • {activePdf.fileSize}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  handleDownload(activePdf.id);
                  setActivePdf(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center gap-2 hover:bg-purple-500 transition shadow-lg shadow-purple-600/30"
              >
                <Download className="w-4 h-4" />
                <span>داگرتنی هەموو مەلزەمەکە</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
