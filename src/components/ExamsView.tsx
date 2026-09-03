import React from "react";
import { motion } from "motion/react";
import { Bookmark, Flame, Sparkles, ArrowRight, Trophy, Star } from "lucide-react";
import { Language, SubjectId } from "../types";

import mathMascot from "../assets/images/math_mascot_1785970327866.jpg";
import chemMascot from "../assets/images/chemistry_mascot_1785970339483.jpg";
import physMascot from "../assets/images/physics_mascot_1785970349601.jpg";
import bioMascot from "../assets/images/biology_mascot_1785970360815.jpg";
import kurMascot from "../assets/images/kurdish_mascot_1785970374665.jpg";
import engMascot from "../assets/images/english_mascot_1785970385553.jpg";
import arbMascot from "../assets/images/arabic_mascot_1785970395130.jpg";
import relMascot from "../assets/images/religion_mascot_1785970406533.jpg";

interface ExamsViewProps {
  language: Language;
  onStartExam: (examTitle: string, subjectId?: SubjectId) => void;
  onBackToHome?: () => void;
}

interface SubjectCardItem {
  id: SubjectId;
  nameKu: string;
  nameBadini: string;
  nameEn: string;
  mascotImg: string;
  levelBadge: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  progressPercent: number;
  progressBarGradient: string;
  glowColor: string;
  hoverBorder: string;
  bubbleText?: string;
}

export const ExamsView: React.FC<ExamsViewProps> = ({ language, onStartExam, onBackToHome }) => {
  const subjects: SubjectCardItem[] = [
    {
      id: "math",
      nameKu: "بیرکاری",
      nameBadini: "بیرکاری",
      nameEn: "Mathematics",
      mascotImg: mathMascot,
      levelBadge: "Lv. 12",
      badgeBg: "bg-emerald-500/20",
      badgeText: "text-emerald-300",
      badgeBorder: "border-emerald-400/40",
      progressPercent: 75,
      progressBarGradient: "from-emerald-500 to-teal-400",
      glowColor: "rgba(16, 185, 129, 0.35)",
      hoverBorder: "group-hover:border-emerald-400/80"
    },
    {
      id: "chemistry",
      nameKu: "کیمیا",
      nameBadini: "کیمیا",
      nameEn: "Chemistry",
      mascotImg: chemMascot,
      levelBadge: "Lv. 10",
      badgeBg: "bg-cyan-500/20",
      badgeText: "text-cyan-300",
      badgeBorder: "border-cyan-400/40",
      progressPercent: 60,
      progressBarGradient: "from-cyan-400 to-blue-400",
      glowColor: "rgba(6, 182, 212, 0.35)",
      hoverBorder: "group-hover:border-cyan-400/80"
    },
    {
      id: "physics",
      nameKu: "فیزیا",
      nameBadini: "فیزیا",
      nameEn: "Physics",
      mascotImg: physMascot,
      levelBadge: "Lv. 11",
      badgeBg: "bg-purple-500/20",
      badgeText: "text-purple-300",
      badgeBorder: "border-purple-400/40",
      progressPercent: 65,
      progressBarGradient: "from-purple-500 to-indigo-400",
      glowColor: "rgba(168, 85, 247, 0.35)",
      hoverBorder: "group-hover:border-purple-400/80"
    },
    {
      id: "biology",
      nameKu: "زیندەوەر",
      nameBadini: "زیندەوەرناسی",
      nameEn: "Biology",
      mascotImg: bioMascot,
      levelBadge: "Lv. 9",
      badgeBg: "bg-lime-500/20",
      badgeText: "text-lime-300",
      badgeBorder: "border-lime-400/40",
      progressPercent: 55,
      progressBarGradient: "from-lime-400 to-emerald-400",
      glowColor: "rgba(132, 204, 22, 0.35)",
      hoverBorder: "group-hover:border-lime-400/80"
    },
    {
      id: "kurdish",
      nameKu: "کوردی",
      nameBadini: "کوردی",
      nameEn: "Kurdish",
      mascotImg: kurMascot,
      levelBadge: "Lv. 8",
      badgeBg: "bg-violet-500/20",
      badgeText: "text-violet-300",
      badgeBorder: "border-violet-400/40",
      progressPercent: 70,
      progressBarGradient: "from-violet-500 to-purple-400",
      glowColor: "rgba(139, 92, 246, 0.35)",
      hoverBorder: "group-hover:border-violet-400/80"
    },
    {
      id: "english",
      nameKu: "ئینگلیزی",
      nameBadini: "ئینگلیزی",
      nameEn: "English",
      mascotImg: engMascot,
      levelBadge: "Lv. 9",
      badgeBg: "bg-blue-500/20",
      badgeText: "text-blue-300",
      badgeBorder: "border-blue-400/40",
      progressPercent: 60,
      progressBarGradient: "from-blue-500 to-sky-400",
      glowColor: "rgba(59, 130, 246, 0.35)",
      hoverBorder: "group-hover:border-blue-400/80",
      bubbleText: "Hello!"
    },
    {
      id: "arabic",
      nameKu: "عەرەبی",
      nameBadini: "عەرەبی",
      nameEn: "Arabic",
      mascotImg: arbMascot,
      levelBadge: "Lv. 7",
      badgeBg: "bg-orange-500/20",
      badgeText: "text-orange-300",
      badgeBorder: "border-orange-400/40",
      progressPercent: 50,
      progressBarGradient: "from-orange-500 to-amber-400",
      glowColor: "rgba(249, 115, 22, 0.35)",
      hoverBorder: "group-hover:border-orange-400/80"
    },
    {
      id: "religion",
      nameKu: "ئاین",
      nameBadini: "ئاین",
      nameEn: "Religion",
      mascotImg: relMascot,
      levelBadge: "Lv. 6 🌙",
      badgeBg: "bg-yellow-500/20",
      badgeText: "text-yellow-300",
      badgeBorder: "border-yellow-400/40",
      progressPercent: 45,
      progressBarGradient: "from-yellow-400 to-amber-400",
      glowColor: "rgba(234, 179, 8, 0.35)",
      hoverBorder: "group-hover:border-yellow-400/80"
    }
  ];

  return (
    <div className="w-full relative space-y-6 sm:space-y-8 min-h-screen bg-[#f7f5fc] text-slate-800 p-2 sm:p-4 rounded-3xl overflow-hidden">
      {/* Top Header Glassmorphism Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-[26px] bg-white border border-purple-100 shadow-[0_10px_30px_rgba(147,51,234,0.06)]"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 font-black text-sm transition-all duration-300 shadow-xs active:scale-95 shrink-0 group"
            >
              <ArrowRight className="w-5 h-5 text-purple-600 group-hover:-translate-x-1 transition-transform" />
              <span>
                {language === "badini"
                  ? "زڤڕین بۆ سەرەتا"
                  : language === "ku"
                  ? "گەڕانەوە بۆ سەرەتا"
                  : "Back to Home"}
              </span>
            </button>
          )}
          <div>
            <div className="flex items-center gap-3 text-slate-900 font-black text-2xl sm:text-3xl tracking-tight">
              <span>{language === "badini" ? "تاقیکرنێن وزاری - بابەتێن پۆلا ۱۲" : language === "ku" ? "تاقیکردنەوەکانی وزاری - بابەتەکان" : "Ministerial Exams"}</span>
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 shadow-inner">
                <Trophy className="w-6 h-6 text-amber-500 fill-amber-400 animate-pulse" />
              </div>
            </div>
            <p className="text-sm sm:text-base text-purple-800 font-bold mt-1.5">
              {language === "badini"
                ? "بابەتەکێ هەڵبژێره و دەست ب راهێنانێن پرسیارێن وزاری بکە!"
                : language === "ku"
                ? "بابەتێک هەڵبژێرە و دەست بە پرسیارەکانی وزاری بکە!"
                : "Select a subject to take authentic ministerial exams!"}
            </p>
          </div>
        </div>

        {/* Gamification Streak Badge */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
          <div className="px-5 py-3 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center gap-3.5 shadow-sm shrink-0">
            <div className="p-2 rounded-xl bg-amber-100 border border-amber-300">
              <Flame className="w-7 h-7 text-amber-500 fill-amber-500 animate-pulse" />
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-slate-900 leading-none block">18</span>
              <span className="text-xs font-extrabold text-amber-700 block mt-0.5">
                {language === "badini" ? "ڕۆژێن ڕێزبووی" : language === "ku" ? "ڕۆژی ڕێزبوو" : "Day Streak"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4-Column Responsive Grid for Subject Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {subjects.map((sub, index) => {
          const subName = language === "badini" ? sub.nameBadini : language === "ku" ? sub.nameKu : sub.nameEn;

          return (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.45, ease: "easeOut" }}
              whileHover={{ scale: 1.04, y: -8 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onStartExam(`تاقیکرنا وزاری - ${subName}`, sub.id)}
              className="group relative p-6 rounded-[26px] bg-white border border-purple-100 hover:border-purple-300 transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(147,51,234,0.1)] cursor-pointer flex flex-col justify-between items-center text-center overflow-hidden min-h-[280px]"
            >
              {/* Floating Sparkles behind Mascot */}
              <div className="absolute top-6 left-6 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              </div>
              <div className="absolute top-12 right-6 pointer-events-none opacity-30 group-hover:opacity-80 transition-opacity">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              </div>

              {/* Top Level Badge */}
              <div
                className="absolute top-4 right-4 px-3.5 py-1 rounded-full text-xs font-black border bg-purple-50 text-purple-700 border-purple-200 shadow-xs z-10 flex items-center gap-1.5"
              >
                <span>{sub.levelBadge}</span>
              </div>

              {/* Large 3D Mascot Illustration with Floating Effect */}
              <div className="relative mt-2 mb-3">
                <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden p-1 bg-gradient-to-b from-purple-100 to-purple-50 border border-purple-200 shadow-md relative z-10 group-hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={sub.mascotImg}
                    alt={subName}
                    className="w-full h-full object-cover rounded-full group-hover:rotate-1 transition-transform duration-500"
                  />
                </motion.div>
              </div>

              {/* Subject Title */}
              <div className="w-full relative z-10">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-purple-700 transition-colors tracking-tight">
                  {subName}
                </h3>
              </div>

              {/* 10px Height Animated Progress Bar & Percentage */}
              <div className="w-full mt-4 space-y-2 relative z-10">
                <div className="flex items-center justify-between text-xs font-black px-1 text-slate-500">
                  <span className="text-purple-700 font-extrabold">
                    {language === "badini" ? "پیشکەفتن" : language === "ku" ? "پێشکەوتن" : "Progress"}
                  </span>
                  <span className="text-slate-900 font-mono text-sm">{sub.progressPercent}%</span>
                </div>

                {/* 10px height fully rounded container */}
                <div className="w-full bg-slate-100 h-[10px] rounded-full overflow-hidden p-[1px] border border-slate-200 shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${sub.progressPercent}%` }}
                    transition={{ delay: 0.2 + index * 0.05, duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${sub.progressBarGradient} shadow-xs`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Overall Progress Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative z-10 p-6 sm:p-8 rounded-[26px] bg-white border border-purple-100 space-y-4 shadow-[0_10px_30px_rgba(147,51,234,0.06)]"
      >
        <div className="flex items-center justify-between font-black text-lg sm:text-xl text-slate-900">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-5 h-5 text-purple-600" />
            <span>
              {language === "badini"
                ? "ڕێژەیا گشتی یا سەرکەوتنێ"
                : language === "ku"
                ? "ڕێژەی گشتی سەرکەوتن"
                : "Overall Progress"}
            </span>
          </div>
          <span className="text-amber-600 font-mono text-xl">62%</span>
        </div>

        {/* Full Width Progress Bar */}
        <div className="w-full bg-purple-50 h-3.5 rounded-full overflow-hidden p-0.5 border border-purple-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "62%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-amber-500 rounded-full shadow-md"
          />
        </div>

        {/* Motivational Mascot Footer */}
        <div className="flex items-center justify-center gap-2 pt-2 text-sm sm:text-base font-black text-purple-900">
          <Sparkles className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: "6s" }} />
          <span>
            {language === "badini"
              ? "کارەکێ نایاب! بەردەوام بە بەرەڤ سەرکەوتنا مەزن ڕێژەیا ۹۰٪+."
              : language === "ku"
              ? "کارێکی نایاب! بەردەوام بە بەرەو سەرکەوتنی گەورە ٩٠٪+."
              : "Great job! Keep grinding for 90%+ in ministerial exams."}
          </span>
          <Sparkles className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: "6s" }} />
        </div>
      </motion.div>
    </div>
  );
};

