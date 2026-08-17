import React from "react";
import {
  Shield,
  Award,
  Flame,
  CheckCircle2,
  Target,
  Plus,
  Sparkles
} from "lucide-react";
import { Language } from "../../types";

interface StudyPlannerAchievementsFooterProps {
  language: Language;
  onQuickAdd?: () => void;
}

export const StudyPlannerAchievementsFooter: React.FC<StudyPlannerAchievementsFooterProps> = ({
  language,
  onQuickAdd
}) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";

  const achievements = [
    {
      id: "early",
      titleEn: "Early Bird",
      titleBadini: "پالەوانێ سپێدێ",
      titleKu: "پاڵەوانی بەیانیان",
      subEn: "7 Days at 6 AM",
      subBadini: "٧ رۆژ ل ٦ سپێدێ",
      subKu: "٧ ڕۆژ لە ٦ بەیانی",
      icon: Shield,
      color: "bg-emerald-500/10 text-[#10B981] border-emerald-500/30"
    },
    {
      id: "focus",
      titleEn: "Focus Master",
      titleBadini: "وەستایێ تەرکیزێ",
      titleKu: "وەستای تەرکیز",
      subEn: "25 Pomodoros",
      subBadini: "٢٥ خولێن پۆمۆدۆرۆ",
      subKu: "٢٥ خولی پۆمۆدۆرۆ",
      icon: Flame,
      color: "bg-amber-500/10 text-[#F59E0B] border-amber-500/30"
    },
    {
      id: "week",
      titleEn: "Week Warrior",
      titleBadini: "جەنگاوەرێ هەفتێ",
      titleKu: "جەنگاوەری هەفتە",
      subEn: "6 Weeks Straight",
      subBadini: "٦ هەفتە بێ راوەستان",
      subKu: "٦ هەفتە بەبێ پچڕان",
      icon: Target,
      color: "bg-purple-500/10 text-purple-500 border-purple-500/30"
    },
    {
      id: "top",
      titleEn: "Top Performer",
      titleBadini: "یەکەمێ پۆلێ",
      titleKu: "یەکەمی پۆل",
      subEn: "90%+ Exam Score",
      subBadini: "٩٠٪+ د ئەزموونا دا",
      subKu: "٩٠٪+ لە تاقیکردنەوەدا",
      icon: Award,
      color: "bg-blue-500/10 text-[#2563EB] border-blue-500/30"
    },
    {
      id: "consistent",
      titleEn: "Consistent",
      titleBadini: "کۆڵنەدەر",
      titleKu: "کۆڵنەدەر",
      subEn: "30 Days Streak",
      subBadini: "٣٠ ڕۆژ بەردەوام",
      subKu: "٣٠ ڕۆژ بەردەوام",
      icon: CheckCircle2,
      color: "bg-sky-500/10 text-sky-500 border-sky-500/30"
    },
    {
      id: "crusher",
      titleEn: "Goal Crusher",
      titleBadini: "شکێنەرێ ئارمانجان",
      titleKu: "شکێنەری ئامانجەکان",
      subEn: "10 Monthly Goals",
      subBadini: "١٠ ئارمانجێن مانگانە",
      subKu: "١٠ ئامانجی مانگانە",
      icon: Sparkles,
      color: "bg-teal-500/10 text-teal-500 border-teal-500/30"
    }
  ];

  return (
    <footer className="space-y-6 pt-4 select-none">
      {/* Top Row: Recent Achievements */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-base text-slate-900 dark:text-white">
            {isBadini ? "دەستکەفتێن دوماهیێ" : isKu ? "دەستکەوتە نوێیەکان" : "Recent Achievements"}
          </h3>
          <span className="text-xs font-bold text-[#2563EB] cursor-pointer hover:underline">
            {isBadini ? "هەمی دەستکەفت" : isKu ? "هەموو دەستکەوتەکان" : "View All (18)"}
          </span>
        </div>

        {/* Badges Row */}
        <div className="flex items-center gap-3.5 overflow-x-auto pb-2 scrollbar-none">
          {achievements.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border bg-white dark:bg-[#0f1219] min-w-[170px] shrink-0 flex items-center gap-3 transition hover:scale-102 shadow-xs ${item.color}`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 flex items-center justify-center ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-black text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                    {isBadini ? item.titleBadini : isKu ? item.titleKu : item.titleEn}
                  </h4>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mt-0.5 truncate">
                    {isBadini ? item.subBadini : isKu ? item.subKu : item.subEn}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Row: Motivational Quote Box */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900/10 via-indigo-900/5 to-slate-900/10 dark:from-[#181c26] dark:via-blue-950/30 dark:to-[#0f1219] border border-blue-500/20 dark:border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xs">
        {/* Subtle background decoration */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10 max-w-2xl text-left">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-[#2563EB] flex items-center justify-center font-serif text-3xl font-bold leading-none select-none mb-2">
            “
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-snug">
            {isBadini
              ? "پابەندبوون ئەڤرۆ، سەرکەوتن سوبەهی یە."
              : isKu
              ? "پابەندبوون ئەمڕۆ، سەرکەوتن بەیانییە."
              : "Discipline today, success tomorrow."}
          </h2>
          <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400">
            {isBadini
              ? "پاشەڕۆژا تە سەحکەتە تە ئەڤرۆ. هەر خولەکەکا خویندنێ، پێنگاڤەکە بەرەف زانکۆیێ."
              : isKu
              ? "داهاتووت دەڕوانێتە ئەمڕۆت. هەر خولەکێکی خوێندن، هەنگاوێکە بەرەو زانکۆ."
              : "Your future self is watching you right now. Every minute of focus brings you closer to your dream university."}
          </p>
        </div>

        {/* Mountain Summit Vector Graphic */}
        <div className="shrink-0 flex items-center justify-center relative">
          <div className="w-32 h-28 relative flex items-end justify-center">
            {/* SVG Snowy Mountain Peak with Flag */}
            <svg className="w-full h-full text-[#2563EB]" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 90 L50 20 L90 90 Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M40 90 L75 35 L110 90 Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
              {/* Snow Caps */}
              <path d="M50 20 L40 38 L48 40 L50 35 L54 42 L62 38 L50 20 Z" fill="currentColor" />
              <path d="M75 35 L67 48 L73 49 L76 46 L80 50 L85 47 L75 35 Z" fill="currentColor" />
              {/* Flag Pole and Banner at Peak */}
              <line x1="50" y1="20" x2="50" y2="5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M50 5 L68 10 L50 15 Z" fill="#10B981" />
            </svg>
          </div>
        </div>
      </div>

      {/* Floating Action Button (+) */}
      {onQuickAdd && (
        <button
          onClick={onQuickAdd}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-14 h-14 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white shadow-xl shadow-blue-500/30 flex items-center justify-center font-black transition-all transform hover:scale-105 active:scale-95 z-40"
          title={isBadini ? "زێدەکەرێ خێرا یێ ئارمانجان" : isKu ? "زیادکردنی خێرای ئامانجەکان" : "Quick Add Priority or Goal"}
        >
          <Plus className="w-7 h-7 stroke-[3]" />
        </button>
      )}
    </footer>
  );
};
