import React, { useState } from "react";
import {
  Clock,
  Target,
  Zap,
  Award,
  Droplets,
  Flame,
  TrendingUp,
  ChevronDown
} from "lucide-react";
import { Language } from "../../types";

interface StudyPlannerAnalyticsPanelProps {
  language: Language;
  waterCount: number;
  onUpdateWater: (count: number) => void;
  studyStreak: number;
  dailyProgress: number;
  isDarkMode?: boolean;
}

export const StudyPlannerAnalyticsPanel: React.FC<StudyPlannerAnalyticsPanelProps> = ({
  language,
  waterCount,
  onUpdateWater,
  studyStreak,
  dailyProgress,
  isDarkMode
}) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";
  const [timeframe, setTimeframe] = useState<"month" | "week">("month");

  const handleWaterClick = (index: number) => {
    if (index + 1 === waterCount && waterCount > 0) {
      onUpdateWater(waterCount - 1);
    } else {
      onUpdateWater(index + 1);
    }
  };

  return (
    <aside className="w-full xl:w-80 2xl:w-[340px] shrink-0 space-y-4 bg-white dark:bg-[#0f1219] p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs select-none">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800/80">
        <h3 className="font-black text-base text-slate-900 dark:text-white">
          {isBadini ? "شیکارێن من" : isKu ? "شیکارییەکانم" : "My Analytics"}
        </h3>
        <button
          onClick={() => setTimeframe(timeframe === "month" ? "week" : "month")}
          className="px-2.5 py-1 rounded-lg bg-[#F5F7FA] dark:bg-[#181c26] hover:bg-slate-200/60 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800 flex items-center gap-1 transition"
        >
          <span>
            {timeframe === "month"
              ? isBadini ? "ئەڤ مانگە" : isKu ? "ئەم مانگە" : "This Month"
              : isBadini ? "ئەڤ هەفتە" : isKu ? "ئەم هەفتە" : "This Week"}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      {/* Card 1: Study Hours */}
      <div className="p-4 rounded-xl bg-[#F5F7FA] dark:bg-[#181c26] border border-slate-200/60 dark:border-slate-800/60 space-y-2 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-500/10 text-[#2563EB] shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
              {isBadini ? "کاتژمێرێن خویندنێ" : isKu ? "کاتژمێرەکانی خوێندن" : "Study Hours"}
            </span>
          </div>
          <span className="text-xs font-black text-[#10B981] flex items-center gap-0.5">
            <TrendingUp className="w-3.5 h-3.5 inline" /> ▲ 18%
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
            128.5 <span className="text-xs font-normal text-slate-500 dark:text-slate-400 font-sans">hrs</span>
          </span>
          {/* Mini Wave Sparkline SVG */}
          <svg className="w-20 h-8 text-[#2563EB]" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 25 Q 25 5, 45 18 T 85 8 L 95 15" />
          </svg>
        </div>
      </div>

      {/* Card 2: Consistency */}
      <div className="p-4 rounded-xl bg-[#F5F7FA] dark:bg-[#181c26] border border-slate-200/60 dark:border-slate-800/60 space-y-2 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
              <Target className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
              {isBadini ? "بەردەوامی و پابەندبوون" : isKu ? "بەردەوامی و پابەندبوون" : "Consistency"}
            </span>
          </div>
          <span className="text-xs font-black text-[#10B981] flex items-center gap-0.5">
            ▲ 12%
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
            92%
          </span>
          {/* Mini Equalizer Bar Chart */}
          <div className="flex items-end gap-1 h-7">
            <div className="w-2.5 bg-purple-500/40 rounded-t h-3" />
            <div className="w-2.5 bg-purple-500/70 rounded-t h-5" />
            <div className="w-2.5 bg-purple-600 rounded-t h-7" />
            <div className="w-2.5 bg-purple-500/80 rounded-t h-6" />
            <div className="w-2.5 bg-purple-500 rounded-t h-4" />
          </div>
        </div>
      </div>

      {/* Card 3: Focus Score */}
      <div className="p-4 rounded-xl bg-[#F5F7FA] dark:bg-[#181c26] border border-slate-200/60 dark:border-slate-800/60 space-y-2 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
              {isBadini ? "ئاستێ تەرکیزێ" : isKu ? "ئاستی تەرکیز" : "Focus Score"}
            </span>
          </div>
          <span className="text-xs font-black text-[#10B981] flex items-center gap-0.5">
            ▲ 15%
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
            8.7 <span className="text-xs font-normal text-slate-500 dark:text-slate-400 font-sans">/ 10</span>
          </span>
          <svg className="w-20 h-8 text-indigo-500" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 22 L 25 10 L 45 18 L 70 6 L 95 12" />
          </svg>
        </div>
      </div>

      {/* Card 4: Exam Readiness */}
      <div className="p-4 rounded-xl bg-[#F5F7FA] dark:bg-[#181c26] border border-slate-200/60 dark:border-slate-800/60 space-y-2 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/10 text-[#F59E0B] shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
              {isBadini ? "ئامادەیی بۆ وزاری" : isKu ? "ئامادەیی بۆ وزاری" : "Exam Readiness"}
            </span>
          </div>
          <span className="text-xs font-black text-[#10B981] flex items-center gap-0.5">
            ▲ 10%
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
            68%
          </span>
          <svg className="w-20 h-8 text-[#F59E0B]" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 24 Q 30 20, 50 12 T 95 6" />
          </svg>
        </div>
      </div>

      {/* Card 5: Water Intake Hydration Tracker */}
      <div className="p-4 rounded-xl bg-[#F5F7FA] dark:bg-[#181c26] border border-slate-200/60 dark:border-slate-800/60 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500 shrink-0">
              <Droplets className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
              {isBadini ? "ڤەخوارنا ئاڤێ (ڕۆژانە)" : isKu ? "خواردنەوەی ئاو (ڕۆژانە)" : "Water Intake"}
            </span>
          </div>
          <span className="text-xs font-black font-mono text-sky-600 dark:text-sky-400">
            {waterCount} / 8 {isBadini ? "پەرداخ" : isKu ? "پەرداخ" : "Glasses"}
          </span>
        </div>
        <div className="flex items-center justify-between gap-1 pt-1">
          {Array.from({ length: 8 }).map((_, index) => {
            const isFilled = index < waterCount;
            return (
              <button
                key={index}
                onClick={() => handleWaterClick(index)}
                className={`flex-1 h-7 rounded-lg transition flex items-center justify-center ${
                  isFilled
                    ? "bg-sky-500 text-white shadow-xs shadow-sky-500/20 scale-105"
                    : "bg-slate-200/70 dark:bg-slate-800 text-slate-400 hover:bg-sky-500/30"
                }`}
                title={`Glass ${index + 1}`}
              >
                <Droplets className="w-3.5 h-3.5 fill-current" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Card 6: Study Streak */}
      <div className="p-4 rounded-xl bg-[#F5F7FA] dark:bg-[#181c26] border border-slate-200/60 dark:border-slate-800/60 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
              <Flame className="w-4 h-4 fill-amber-500" />
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
              {isBadini ? "بەردەوامیا خویندنێ" : isKu ? "بەردەوامی خوێندن" : "Study Streak"}
            </span>
          </div>
          <span className="text-base font-black font-mono text-amber-500">
            {studyStreak} {isBadini ? "ڕۆژ" : isKu ? "ڕۆژ" : "Days"}
          </span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full w-[80%]" />
        </div>
      </div>

      {/* Card 7: Daily Progress Ring */}
      <div className="p-4 rounded-xl bg-[#F5F7FA] dark:bg-[#181c26] border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block">
            {isBadini ? "پێشکەفتنا ئەڤرۆ" : isKu ? "پێشکەوتنی ئەمڕۆ" : "Daily Progress"}
          </span>
          <span className="text-xl font-black font-mono text-slate-900 dark:text-white mt-1 block">
            {dailyProgress}%
          </span>
          <span className="text-[11px] font-bold text-[#10B981] mt-0.5 block">
            {isBadini ? "د ئاستەکێ باش دایی ⭐" : isKu ? "لە ئاستێکی باش دایت ⭐" : "On track for today ⭐"}
          </span>
        </div>
        <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-200 dark:text-slate-800 stroke-current"
              strokeWidth="3.5"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-[#2563EB] stroke-current"
              strokeDasharray={`${dailyProgress}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute text-[11px] font-black font-mono text-slate-900 dark:text-white">
            {dailyProgress}%
          </span>
        </div>
      </div>
    </aside>
  );
};
