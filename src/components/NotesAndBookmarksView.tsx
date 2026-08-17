import React, { useState } from "react";
import { Bookmark, FileText, Star, Trash2, Printer, Download, Upload, Plus, Sparkles } from "lucide-react";
import { BookmarkItem, Language, NoteItem, Question } from "../types";
import { getLocalizedText, uiTranslations } from "../utils/i18n";
import { SavedQuestionsPdfModal } from "./SavedQuestionsPdfModal";
import { AppLogoSvg } from "./AppLogo";

interface NotesAndBookmarksViewProps {
  notes: NoteItem[];
  bookmarks: BookmarkItem[];
  language: Language;
  onRemoveBookmark: (questionId: string) => void;
  onAddBookmark?: (question: Question) => void;
}

export const NotesAndBookmarksView: React.FC<NotesAndBookmarksViewProps> = ({
  notes,
  bookmarks,
  language,
  onRemoveBookmark,
  onAddBookmark
}) => {
  const [activeTab, setActiveTab] = useState<"notes" | "bookmarks">("bookmarks");
  const [showPdfModal, setShowPdfModal] = useState(false);

  const isBadini = language === "badini";

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 border border-purple-800/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>{uiTranslations.notesTitle[language]}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
              A4 PDF Exporter
            </span>
          </h1>
          <p className="text-xs text-purple-200/80 mt-1">
            {isBadini
              ? "پوختەیا یاسایێن گرنگ، پرسیارێن ڕزگارکری و دروستکرنا فایلا A4 PDF دگەڵ لۆگۆیێ تایبەت"
              : language === "ku"
              ? "پوختەی یاسا گرنگەکان، پرسیارە پارێزراوەکان و دروستکردنی فایلی A4 PDF لەگەڵ لۆگۆی تایبەت"
              : "Review your saved key formulas, summary notes, and export bookmarked questions to A4 PDF with owl logo."}
          </p>
        </div>

        <button
          onClick={() => setShowPdfModal(true)}
          className="py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>{isBadini ? "دروستکرنا فایلا A4 PDF (پرسیارێن پاراستی) 📄" : "دروستکردنی فایلی A4 PDF 📄"}</span>
        </button>
      </div>

      {/* Toggle Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 p-1 bg-[#16182e] border border-indigo-900/30 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab("notes")}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "notes"
                ? "bg-purple-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>
              {isBadini
                ? "تێبینی و یاسا"
                : language === "ku"
                ? "تێبینی و یاساکان"
                : "Study Notes"}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("bookmarks")}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "bookmarks"
                ? "bg-purple-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>
              {isBadini
                ? "پرسیارێن پاراستی"
                : language === "ku"
                ? "پرسیارە پارێزراوەکان"
                : "Bookmarks"}{" "}
              ({bookmarks.length})
            </span>
          </button>
        </div>

        {activeTab === "bookmarks" && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPdfModal(true)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold flex items-center gap-2 border border-purple-500/40 shadow-md transition"
            >
              <Download className="w-4 h-4" />
              <span>{isBadini ? "دابەزاندنا PDF و داخلکرن" : "داگرتن و هاوردەکردنی PDF"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {activeTab === "notes" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((n) => (
            <div
              key={n.id}
              className="p-5 rounded-3xl bg-[#16182e] border border-indigo-900/30 hover:border-purple-500/40 transition shadow-xl space-y-3"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-bold text-white">
                  {getLocalizedText(n, "title", language)}
                </h3>
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              </div>

              <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed bg-[#121426] p-3 rounded-xl border border-indigo-900/20">
                {getLocalizedText(n, "content", language)}
              </pre>

              <div className="text-[10px] text-slate-500 font-mono text-right">{n.date}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Banner for PDF export feature inside Bookmarks tab */}
          <div className="p-4 rounded-2xl bg-[#171933] border border-purple-500/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-purple-600/20 text-purple-300 border border-purple-500/30 shrink-0">
                <AppLogoSvg className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{isBadini ? "تایبەتمەندیا درستکرنا فایلا A4 PDF" : "تایبەتمەندی دروستکردنی فایلی A4 PDF"}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    دگەڵ قوتابی 🎓
                  </span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {isBadini
                    ? "تۆ دشێی هەمی پرسیارێن خۆ یێن پاراستی بکەیە فایلا PDF چوارگۆشە A4 دگەل لۆگۆیێ (دگەڵ قوتابی) ل قولاچەکا سەرێ لاپەرێ"
                    : "دەتوانیت هەموو پرسیارە پارێزراوەکانت بکەیتە فایلی A4 PDF لەگەڵ لۆگۆی (دگەڵ قوتابی) لە گۆشەی سەرەوەی لاپەڕە"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowPdfModal(true)}
              className="py-2 px-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-md shrink-0 transition"
            >
              {isBadini ? "کردنە PDF" : "دیاریکردن و PDF"}
            </button>
          </div>

          {bookmarks.length === 0 ? (
            <div className="p-10 text-center text-slate-400 text-xs bg-[#16182e] rounded-3xl border border-indigo-900/30 space-y-3">
              <p>
                {isBadini
                  ? "چ پرسیارێن پاراستی نینن. ل دەمێ تاقیکرنێ دا تۆ دشێی پرسیاران بۆ ڤێرێ پاشەکەوت بکەی یان ب ڕێکا پۆتەنێ سەر بگەهینێ ب فایلا PDF."
                  : language === "ku"
                  ? "هیچ پرسیارێکی پارێزراو نییە. لە کاتی تاقیکردنەوەدا دەتوانیت پرسیارەکان پاشەکەوت بکەیت یان بە دوگمەی سەرەوە بڕویتە دروستکردنی فایلی PDF."
                  : "No saved questions yet. Click bookmark inside any quiz to save questions here!"}
              </p>
              <button
                onClick={() => setShowPdfModal(true)}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs"
              >
                {isBadini ? "هاوردەکرنا پرسیاران و دروستکرنا PDF" : "هاوردەکردنی پرسیار و دروستکردنی PDF"}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarks.map((bm) => (
                <div
                  key={bm.id}
                  className="p-4 rounded-2xl bg-[#16182e] border border-indigo-900/30 hover:border-purple-500/40 transition shadow-md flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold text-purple-300 bg-purple-950 px-2 py-0.5 rounded-md border border-purple-800/30 uppercase">
                        {bm.question.subjectId}
                      </span>
                      {bm.question.year && (
                        <span className="text-[10px] font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-800/30">
                          {bm.question.year}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-white mt-1.5 leading-relaxed">
                      {getLocalizedText(bm.question, "question", language)}
                    </p>
                  </div>

                  <button
                    onClick={() => onRemoveBookmark(bm.question.id)}
                    className="p-2 text-slate-500 hover:text-red-400 transition shrink-0"
                    title="Remove bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PDF Generation Modal */}
      {showPdfModal && (
        <SavedQuestionsPdfModal
          bookmarks={bookmarks}
          language={language}
          onClose={() => setShowPdfModal(false)}
          onAddBookmark={onAddBookmark}
          onRemoveBookmark={onRemoveBookmark}
        />
      )}
    </div>
  );
};


