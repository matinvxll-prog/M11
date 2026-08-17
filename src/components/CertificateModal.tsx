import React from "react";
import { Award, Download, Share2, X, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Language, UserProfile } from "../types";

interface CertificateModalProps {
  language: Language;
  user: UserProfile;
  courseTitle?: string;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  language,
  user,
  courseTitle,
  onClose
}) => {
  const currentTitle = courseTitle || (
    language === "badini"
      ? "تەواوکرنا خولا وزاری یا بیرکاری و فیزیایێ پۆلا ۱۲"
      : language === "ku"
      ? "تەواوکردنی کۆرسی وزاریی بیرکاری و فیزیای پۆلی ۱۲"
      : "Grade 12 Kurdistan Ministerial Master Certificate"
  );

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn cursor-pointer"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#111326] border border-amber-500/40 rounded-3xl p-6 text-slate-100 shadow-2xl space-y-5 cursor-default"
      >
        {/* Prominent Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/40 transition flex items-center justify-center shadow-lg"
          title={language === "badini" ? "دابئێخستن (X)" : "داخستن"}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Certificate Frame */}
        <div className="relative p-8 rounded-2xl bg-gradient-to-b from-[#181a38] to-[#0d0f1d] border-4 border-amber-500/50 shadow-2xl text-center space-y-4 overflow-hidden">
          {/* Subtle Corner Ornaments */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-400" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-400" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-400" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-400" />

          {/* Badge */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 mx-auto shadow-xl shadow-amber-500/40 ring-4 ring-amber-400/20">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-black text-amber-400 tracking-widest uppercase">
              {language === "badini" ? "پلاتفۆرما EDU PRO 12 - کوردی" : language === "ku" ? "پلاتفۆرمی خوێندنی پۆلی ۱۲ی کوردستان" : "KURDISTAN GRADE 12 ACADEMY"}
            </span>
            <h1 className="text-2xl font-black text-white font-serif tracking-wide">
              {language === "badini" ? "پێدانێ باوەرنامەیا دەستکەفتنێ" : language === "ku" ? "بڕوانامەی دەستکەوت و سەرکەوتن" : "CERTIFICATE OF ACHIEVEMENT"}
            </h1>
          </div>

          <p className="text-xs text-slate-300">
            {language === "badini" ? "ئەڤ باوەرنامەیە ب ڕێزڤە دهێتە بەخشین بۆ قوتابیێ ژیر:" : language === "ku" ? "ئەم بڕوانامەیە بە شانازییەوە دەبەخشرێت بە قوتابیی لێهاتوو:" : "This official certificate is proudly presented to:"}
          </p>

          <h2 className="text-xl font-black text-amber-300 underline underline-offset-8 decoration-amber-500/40">
            {user.name} ({user.schoolName})
          </h2>

          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            {currentTitle}
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-amber-500/30 text-[10px] text-slate-400">
            <div className="text-left">
              <span className="block font-bold text-slate-200">Date Issued:</span>
              <span>2026-07-26</span>
            </div>
            <div className="flex items-center gap-1 text-amber-400 font-extrabold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Ministerial ID: EDU-12-9984</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 border border-purple-500/30 transition"
          >
            <X className="w-4 h-4 text-rose-400" />
            <span>{language === "badini" ? "دابئێخستن (بگرە)" : language === "ku" ? "داخستن" : "Close"}</span>
          </button>

          <button
            onClick={() => alert("Certificate downloaded as PDF!")}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/30 transition"
          >
            <Download className="w-4 h-4" />
            <span>{language === "badini" ? "داگرتنا باوەرنامێ PDF" : language === "ku" ? "داگرتنی بڕوانامە بە PDF" : "Download Certificate PDF"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
