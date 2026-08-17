import React, { useState } from "react";
import { Crown, Check, Sparkles, X, Zap, ShieldCheck } from "lucide-react";
import { Language, UserProfile } from "../types";

interface PremiumModalProps {
  language: Language;
  user: UserProfile;
  onUpgrade: () => void;
  onClose: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({
  language,
  user,
  onUpgrade,
  onClose
}) => {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");

  const benefits = [
    {
      ku: "دەستگەیشتن بە هەموو ڤیدیۆ HD یەکان و کۆرسە تایبەتییەکان",
      badini: "دیترنا هەمی ڤیدیۆیێن HD و خولێن تایبەت",
      en: "Full HD Video Lessons & Exclusive Master Courses"
    },
    {
      ku: "داگرتنی بێسنووری PDF و مەلزەمە زێڕینەکانی وزاری",
      badini: "داگرتنا بێسنوور یا PDF و مەلزەمەیێن وزاری",
      en: "Unlimited PDF Downloads & Solved Ministerial Papers"
    },
    {
      ku: "شیکارکردنی بێسنوور بە ژیری دەستکرد (AI Tutor Priority)",
      badini: "شیکارکرنا بێسنوور ب AI تیوتر",
      en: "Priority 24/7 AI Tutor Question Resolutions"
    },
    {
      ku: "بێ ڕیکلام و ئەزموونی خوێندنی خێرا",
      badini: "بێ ڕیکلام و ئەزموونا بێ ئاریشە",
      en: "100% Ad-Free Experience & Instant Speed"
    },
    {
      ku: "نیشانەی VIP لە تەنیشت ناوت لە ڕێزبەندی گشتیدا",
      badini: "نیشانا VIP ل تەنشت ناڤێ تە د ڕیزبەندێ دا",
      en: "Exclusive Golden VIP Badge on Global Leaderboard"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#111326] border border-amber-500/40 rounded-3xl p-6 text-slate-100 shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 text-slate-950 flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/40">
            <Crown className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-black text-white">
            {language === "badini" ? "ئەپگرەید بکە بۆ EduPro VIP 👑" : language === "ku" ? "بەشداریکردن لە پلانی EduPro VIP 👑" : "Upgrade to EduPro VIP Premium 👑"}
          </h2>
          <p className="text-xs text-amber-300 font-medium">
            {language === "badini"
              ? "باشترین ڕێگا بۆ بەدەستهێنانی بەرزترین نمرەی وزاری پۆلا ۱۲"
              : language === "ku"
              ? "باشترین ڕێگە بۆ بەدەستهێنانی بڵندترین نمرەی وزاری لە پۆلی ۱۲"
              : "Unlock all premium tools to score 95%+ in Grade 12 exams!"}
          </p>
        </div>

        {/* Pricing Selector */}
        <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-[#16182e] border border-amber-500/30">
          <button
            onClick={() => setSelectedPlan("monthly")}
            className={`py-3 rounded-xl text-xs font-bold transition flex flex-col items-center ${
              selectedPlan === "monthly"
                ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 font-black"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span>{language === "badini" ? "مانگانە" : language === "ku" ? "مانگانە" : "Monthly"}</span>
            <span className="text-sm font-extrabold">12,000 IQD</span>
          </button>

          <button
            onClick={() => setSelectedPlan("yearly")}
            className={`py-3 rounded-xl text-xs font-bold transition flex flex-col items-center relative ${
              selectedPlan === "yearly"
                ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 font-black"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span className="absolute -top-2 px-2 py-0.5 rounded-full bg-rose-600 text-white text-[9px] font-black uppercase">
              Save 40%
            </span>
            <span>{language === "badini" ? "ساڵانە (باشترین)" : language === "ku" ? "ساڵانە (پێشنیارکراو)" : "Yearly (Best Value)"}</span>
            <span className="text-sm font-extrabold">75,000 IQD / Year</span>
          </button>
        </div>

        {/* Benefits List */}
        <div className="space-y-2.5 bg-[#16182e] p-4 rounded-2xl border border-indigo-900/30">
          {benefits.map((b, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs text-slate-200">
              <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/40">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold">
                {language === "badini" ? b.badini : language === "ku" ? b.ku : b.en}
              </span>
            </div>
          ))}
        </div>

        {/* Upgrade Action Button */}
        <button
          onClick={() => {
            onUpgrade();
            onClose();
          }}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/40 hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 fill-slate-950" />
          <span>
            {language === "badini" ? "ئێستا چالاک بکە (Fast VIP Upgrade)" : language === "ku" ? "ئێستا چالاکی بکە (تۆمارکردنی VIP)" : "Activate VIP Premium Now"}
          </span>
        </button>
      </div>
    </div>
  );
};
