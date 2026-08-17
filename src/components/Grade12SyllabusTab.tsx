import React, { useState, useEffect } from "react";
import {
  Check,
  BookOpen,
  Sparkles,
  Award,
  TrendingUp,
  Calendar,
  Copy,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  BarChart3,
  Target,
  AlertCircle,
  Milestone,
  Clock,
  Lock,
  ArrowRight
} from "lucide-react";
import { grade12SyllabusData, SyllabusSubject } from "../data/grade12Syllabus";
import { Language } from "../types";
import { SubjectIcon } from "./SubjectIcon";

interface Grade12SyllabusTabProps {
  language: Language;
}

const MotivatingProgressBar: React.FC<{
  percent: number;
  completed: number;
  total: number;
  language: Language;
  showBadge?: boolean;
  size?: "sm" | "md" | "lg";
  isDark?: boolean;
}> = ({ percent, completed, total, language, showBadge = true, size = "md", isDark = true }) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";

  let motivationalText = "";
  if (percent === 0) {
    motivationalText = isBadini ? "🚀 کلیک ل سەر پشکان بکە بۆ دەستپێکرنێ!" : isKu ? "🚀 کلیک لەسەر بەشەکان بکە بۆ دەستپێکردن!" : "🚀 Click sections to start!";
  } else if (percent < 30) {
    motivationalText = isBadini ? "🌱 دەستپێکەکا سەرکەفتییە! بەردەوام بە" : isKu ? "🌱 دەستپێکێکی سەرکەوتووە! بەردەوام بە" : "🌱 Great start! Keep going";
  } else if (percent < 60) {
    motivationalText = isBadini ? "⚡ نیڤا ڕێگایێ! بازدانەکا خورت بڕی" : isKu ? "⚡ نیوەی ڕێگاکە! ڕەوتی باش بڕی" : "⚡ Halfway there! Keep advancing";
  } else if (percent < 90) {
    motivationalText = isBadini ? "🔥 زۆر نێزیک بووی ل لووتکەیێ! بگوڕتر بە" : isKu ? "🔥 زۆر نێزیک بووی لە لوتکە! چالاکتر بە" : "🔥 Almost at 100%! Push harder";
  } else if (percent < 100) {
    motivationalText = isBadini ? "🎯 تەنها ئێک هەنگاڤ مایە بۆ ١٠٠٪ێ وزاری!" : isKu ? "🎯 تەنها یەک هەنگاو ماوە بۆ ١٠٠٪ی وزاری!" : "🎯 Just 1 step away from 100%!";
  } else {
    motivationalText = isBadini ? "🏆 پیرۆزە! ئەڤ وانەیە ب نمرە 100 تەمامبوو" : isKu ? "🏆 پیرۆزە! ئەم وانەیە بە ١٠٠٪ تەواوبوو" : "🏆 Congratulations! 100% Completed";
  }

  const heightClass = size === "sm" ? "h-2.5" : size === "lg" ? "h-4" : "h-3";

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between text-xs font-bold gap-2">
        {showBadge && (
          <span className={`text-[11px] font-black tracking-tight ${percent === 100 ? "text-emerald-400" : isDark ? "text-amber-300" : "text-indigo-600"}`}>
            {motivationalText}
          </span>
        )}
        <div className="flex items-center gap-1 font-mono text-[11px] font-black shrink-0 ms-auto">
          <span className={isDark ? "text-emerald-400" : "text-emerald-600"}>{completed}</span>
          <span className="text-slate-500">/</span>
          <span className={isDark ? "text-slate-300" : "text-slate-600"}>{total}</span>
          <span className="text-slate-400 text-[10px] font-sans me-1">{isBadini || isKu ? "پشک" : "Sec"}</span>
          <span className={`px-2 py-0.5 rounded-md font-mono text-xs ${
            percent === 100
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
              : isDark
              ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
              : "bg-indigo-50 text-indigo-700 border border-indigo-200"
          }`}>
            {percent}%
          </span>
        </div>
      </div>

      <div className={`w-full ${heightClass} ${isDark ? "bg-slate-900 border-slate-700/80" : "bg-slate-100 border-slate-200"} rounded-full overflow-hidden p-0.5 border shadow-inner relative`}>
        <div
          className={`h-full rounded-full transition-all duration-700 relative ${
            percent === 100
              ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.6)]"
              : "bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
          }`}
          style={{ width: `${percent}%` }}
        >
          {percent > 0 && percent < 100 && (
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/80 rounded-full shadow-[0_0_8px_#ffffff] animate-pulse rtl:left-0 rtl:right-auto" />
          )}
        </div>
      </div>
    </div>
  );
};

const getSubjectTheme = (subjectId: string, isSelected: boolean) => {
  switch (subjectId) {
    case "biology":
      return {
        cardBg: "bg-gradient-to-r from-purple-700 via-fuchsia-700 to-indigo-800 text-white",
        cardBorder: isSelected
          ? "border-amber-300 ring-4 ring-amber-300/60 shadow-2xl shadow-purple-600/60 scale-[1.01]"
          : "border-purple-400/40 hover:border-purple-300/80 shadow-xl shadow-purple-950/30",
        pillBgActive: "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-md shadow-purple-500/30",
        stepCircle: isSelected ? "bg-amber-400 text-slate-950 ring-4 ring-amber-300/40 font-black" : "bg-purple-900/90 text-purple-100 border border-purple-400/50",
        waveFrom: "#FFFFFF",
        waveTo: "#E879F9"
      };

    case "math":
      return {
        cardBg: "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-800 text-white",
        cardBorder: isSelected
          ? "border-amber-300 ring-4 ring-amber-300/60 shadow-2xl shadow-emerald-600/60 scale-[1.01]"
          : "border-emerald-400/40 hover:border-emerald-300/80 shadow-xl shadow-emerald-950/30",
        pillBgActive: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30",
        stepCircle: isSelected ? "bg-amber-400 text-slate-950 ring-4 ring-amber-300/40 font-black" : "bg-teal-900/90 text-teal-100 border border-teal-400/50",
        waveFrom: "#FFFFFF",
        waveTo: "#34D399"
      };

    case "physics":
      return {
        cardBg: "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 text-white",
        cardBorder: isSelected
          ? "border-amber-300 ring-4 ring-amber-300/60 shadow-2xl shadow-blue-600/60 scale-[1.01]"
          : "border-blue-400/40 hover:border-blue-300/80 shadow-xl shadow-blue-950/30",
        pillBgActive: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30",
        stepCircle: isSelected ? "bg-amber-400 text-slate-950 ring-4 ring-amber-300/40 font-black" : "bg-blue-900/90 text-blue-100 border border-blue-400/50",
        waveFrom: "#FFFFFF",
        waveTo: "#818CF8"
      };

    case "chemistry":
      return {
        cardBg: "bg-gradient-to-r from-sky-500 via-cyan-600 to-blue-700 text-white",
        cardBorder: isSelected
          ? "border-amber-300 ring-4 ring-amber-300/60 shadow-2xl shadow-sky-600/60 scale-[1.01]"
          : "border-sky-400/40 hover:border-sky-300/80 shadow-xl shadow-sky-950/30",
        pillBgActive: "bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-md shadow-sky-500/30",
        stepCircle: isSelected ? "bg-amber-400 text-slate-950 ring-4 ring-amber-300/40 font-black" : "bg-sky-900/90 text-sky-100 border border-sky-400/50",
        waveFrom: "#FFFFFF",
        waveTo: "#38BDF8"
      };

    case "english":
      return {
        cardBg: "bg-gradient-to-r from-pink-600 via-rose-600 to-purple-700 text-white",
        cardBorder: isSelected
          ? "border-amber-300 ring-4 ring-amber-300/60 shadow-2xl shadow-pink-600/60 scale-[1.01]"
          : "border-pink-400/40 hover:border-pink-300/80 shadow-xl shadow-pink-950/30",
        pillBgActive: "bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-500/30",
        stepCircle: isSelected ? "bg-amber-400 text-slate-950 ring-4 ring-amber-300/40 font-black" : "bg-pink-900/90 text-pink-100 border border-pink-400/50",
        waveFrom: "#FFFFFF",
        waveTo: "#FB7185"
      };

    case "kurdish":
      return {
        cardBg: "bg-gradient-to-r from-rose-600 via-red-600 to-orange-600 text-white",
        cardBorder: isSelected
          ? "border-amber-300 ring-4 ring-amber-300/60 shadow-2xl shadow-rose-600/60 scale-[1.01]"
          : "border-rose-400/40 hover:border-rose-300/80 shadow-xl shadow-rose-950/30",
        pillBgActive: "bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md shadow-rose-500/30",
        stepCircle: isSelected ? "bg-amber-400 text-slate-950 ring-4 ring-amber-300/40 font-black" : "bg-rose-900/90 text-rose-100 border border-rose-400/50",
        waveFrom: "#FFFFFF",
        waveTo: "#F87171"
      };

    case "arabic":
      return {
        cardBg: "bg-gradient-to-r from-amber-500 via-yellow-600 to-orange-600 text-white",
        cardBorder: isSelected
          ? "border-white ring-4 ring-amber-300/60 shadow-2xl shadow-amber-600/60 scale-[1.01]"
          : "border-amber-400/40 hover:border-amber-300/80 shadow-xl shadow-amber-950/30",
        pillBgActive: "bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-md shadow-amber-500/30",
        stepCircle: isSelected ? "bg-white text-slate-950 ring-4 ring-amber-300/40 font-black" : "bg-amber-900/90 text-amber-100 border border-amber-400/50",
        waveFrom: "#FFFFFF",
        waveTo: "#FACC15"
      };

    case "religion":
      return {
        cardBg: "bg-gradient-to-r from-teal-600 via-emerald-600 to-green-700 text-white",
        cardBorder: isSelected
          ? "border-amber-300 ring-4 ring-amber-300/60 shadow-2xl shadow-teal-600/60 scale-[1.01]"
          : "border-teal-400/40 hover:border-teal-300/80 shadow-xl shadow-teal-950/30",
        pillBgActive: "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-500/30",
        stepCircle: isSelected ? "bg-amber-400 text-slate-950 ring-4 ring-amber-300/40 font-black" : "bg-teal-900/90 text-teal-100 border border-teal-400/50",
        waveFrom: "#FFFFFF",
        waveTo: "#2DD4BF"
      };

    default:
      return {
        cardBg: "bg-slate-800 text-white",
        cardBorder: isSelected ? "border-amber-400 ring-2 ring-amber-400/50" : "border-slate-700",
        pillBgActive: "bg-slate-900 text-white",
        stepCircle: "bg-slate-900 text-indigo-300 border border-slate-700",
        waveFrom: "#FFFFFF",
        waveTo: "#C084FC"
      };
  }
};

const SubjectCardWaves: React.FC<{ waveFrom: string; waveTo: string }> = () => {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      <svg
        className="absolute right-0 top-0 bottom-0 w-2/3 h-full rtl:left-0 rtl:right-auto transition-all duration-500"
        viewBox="0 0 350 160"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft 3D Curved Diagonal Split Wave like the user's reference image */}
        <path
          d="M130 0C180 35 220 20 350 110V160H110L130 0Z"
          fill="white"
          opacity="0.14"
        />
        <path
          d="M190 0C230 45 270 50 350 160H220L190 0Z"
          fill="white"
          opacity="0.08"
        />
        <path
          d="M0 160C100 140 220 160 350 60V160H0Z"
          fill="white"
          opacity="0.05"
        />

        {/* Floating Sparkles & Soft 3D Glows */}
        <circle cx="280" cy="35" r="3" fill="#FFFFFF" opacity="0.9" />
        <circle cx="310" cy="70" r="4.5" fill="#FFFFFF" opacity="0.7" />
        <circle cx="210" cy="115" r="2.5" fill="#FFFFFF" opacity="0.6" />
        <circle cx="160" cy="45" r="3" fill="#FFFFFF" opacity="0.5" />

        {/* Sparkle 4-point Stars */}
        <path d="M250 25L251.5 20L253 25L258 26.5L253 28L251.5 33L250 28L245 26.5L250 25Z" fill="#FFFFFF" opacity="0.85" />
        <path d="M290 100L291 97L292 100L295 101L292 102L291 105L290 102L287 101L290 100Z" fill="#FFFFFF" opacity="0.9" />
        <path d="M180 120L181 118L182 120L184 121L182 122L181 124L180 122L178 121L180 120Z" fill="#FFFFFF" opacity="0.7" />
      </svg>
    </div>
  );
};

const getSubjectSoftTheme = (subjectId: string) => {
  switch (subjectId) {
    case "biology":
      return {
        cardBorder: "border-purple-200/90 hover:border-purple-300 shadow-xs",
        headerBg: "bg-gradient-to-r from-purple-100/80 via-fuchsia-50/70 to-purple-50/60 hover:from-purple-100 hover:to-fuchsia-100/80",
        badgeBg: "bg-purple-200/80 text-purple-950 border border-purple-300/80 font-extrabold",
        numberBoxDone: "bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white shadow-sm shadow-purple-500/20",
        numberBoxPending: "bg-purple-900 text-purple-100 font-black shadow-xs",
        sectionDone: "bg-purple-100/90 border-purple-300 text-purple-950 shadow-2xs",
        sectionPending: "bg-purple-50/60 border-purple-200/70 hover:bg-purple-100/70 hover:border-purple-300/80 text-purple-950",
        checkDone: "bg-purple-600 text-white shadow-xs scale-110",
        badgeText: "text-purple-950 font-black",
        titleText: "text-purple-950 font-black",
      };

    case "math":
      return {
        cardBorder: "border-emerald-200/90 hover:border-emerald-300 shadow-xs",
        headerBg: "bg-gradient-to-r from-emerald-100/80 via-teal-50/70 to-emerald-50/60 hover:from-emerald-100 hover:to-teal-100/80",
        badgeBg: "bg-emerald-200/80 text-emerald-950 border border-emerald-300/80 font-extrabold",
        numberBoxDone: "bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-sm shadow-emerald-500/20",
        numberBoxPending: "bg-emerald-900 text-emerald-100 font-black shadow-xs",
        sectionDone: "bg-emerald-100/90 border-emerald-300 text-emerald-950 shadow-2xs",
        sectionPending: "bg-emerald-50/60 border-emerald-200/70 hover:bg-emerald-100/70 hover:border-emerald-300/80 text-emerald-950",
        checkDone: "bg-emerald-600 text-white shadow-xs scale-110",
        badgeText: "text-emerald-950 font-black",
        titleText: "text-emerald-950 font-black",
      };

    case "physics":
      return {
        cardBorder: "border-blue-200/90 hover:border-blue-300 shadow-xs",
        headerBg: "bg-gradient-to-r from-blue-100/80 via-indigo-50/70 to-blue-50/60 hover:from-blue-100 hover:to-indigo-100/80",
        badgeBg: "bg-blue-200/80 text-blue-950 border border-blue-300/80 font-extrabold",
        numberBoxDone: "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/20",
        numberBoxPending: "bg-blue-900 text-blue-100 font-black shadow-xs",
        sectionDone: "bg-blue-100/90 border-blue-300 text-blue-950 shadow-2xs",
        sectionPending: "bg-blue-50/60 border-blue-200/70 hover:bg-blue-100/70 hover:border-blue-300/80 text-blue-950",
        checkDone: "bg-blue-600 text-white shadow-xs scale-110",
        badgeText: "text-blue-950 font-black",
        titleText: "text-blue-950 font-black",
      };

    case "chemistry":
      return {
        cardBorder: "border-sky-200/90 hover:border-sky-300 shadow-xs",
        headerBg: "bg-gradient-to-r from-sky-100/80 via-cyan-50/70 to-sky-50/60 hover:from-sky-100 hover:to-cyan-100/80",
        badgeBg: "bg-sky-200/80 text-sky-950 border border-sky-300/80 font-extrabold",
        numberBoxDone: "bg-gradient-to-br from-sky-600 to-cyan-600 text-white shadow-sm shadow-sky-500/20",
        numberBoxPending: "bg-sky-900 text-sky-100 font-black shadow-xs",
        sectionDone: "bg-sky-100/90 border-sky-300 text-sky-950 shadow-2xs",
        sectionPending: "bg-sky-50/60 border-sky-200/70 hover:bg-sky-100/70 hover:border-sky-300/80 text-sky-950",
        checkDone: "bg-sky-600 text-white shadow-xs scale-110",
        badgeText: "text-sky-950 font-black",
        titleText: "text-sky-950 font-black",
      };

    case "english":
      return {
        cardBorder: "border-pink-200/90 hover:border-pink-300 shadow-xs",
        headerBg: "bg-gradient-to-r from-pink-100/80 via-rose-50/70 to-pink-50/60 hover:from-pink-100 hover:to-rose-100/80",
        badgeBg: "bg-pink-200/80 text-pink-950 border border-pink-300/80 font-extrabold",
        numberBoxDone: "bg-gradient-to-br from-pink-600 to-rose-600 text-white shadow-sm shadow-pink-500/20",
        numberBoxPending: "bg-pink-900 text-pink-100 font-black shadow-xs",
        sectionDone: "bg-pink-100/90 border-pink-300 text-pink-950 shadow-2xs",
        sectionPending: "bg-pink-50/60 border-pink-200/70 hover:bg-pink-100/70 hover:border-pink-300/80 text-pink-950",
        checkDone: "bg-pink-600 text-white shadow-xs scale-110",
        badgeText: "text-pink-950 font-black",
        titleText: "text-pink-950 font-black",
      };

    case "kurdish":
      return {
        cardBorder: "border-rose-200/90 hover:border-rose-300 shadow-xs",
        headerBg: "bg-gradient-to-r from-rose-100/80 via-red-50/70 to-rose-50/60 hover:from-rose-100 hover:to-red-100/80",
        badgeBg: "bg-rose-200/80 text-rose-950 border border-rose-300/80 font-extrabold",
        numberBoxDone: "bg-gradient-to-br from-rose-600 to-red-600 text-white shadow-sm shadow-rose-500/20",
        numberBoxPending: "bg-rose-900 text-rose-100 font-black shadow-xs",
        sectionDone: "bg-rose-100/90 border-rose-300 text-rose-950 shadow-2xs",
        sectionPending: "bg-rose-50/60 border-rose-200/70 hover:bg-rose-100/70 hover:border-rose-300/80 text-rose-950",
        checkDone: "bg-rose-600 text-white shadow-xs scale-110",
        badgeText: "text-rose-950 font-black",
        titleText: "text-rose-950 font-black",
      };

    case "arabic":
      return {
        cardBorder: "border-amber-200/90 hover:border-amber-300 shadow-xs",
        headerBg: "bg-gradient-to-r from-amber-100/80 via-yellow-50/70 to-amber-50/60 hover:from-amber-100 hover:to-yellow-100/80",
        badgeBg: "bg-amber-200/80 text-amber-950 border border-amber-300/80 font-extrabold",
        numberBoxDone: "bg-gradient-to-br from-amber-500 to-yellow-600 text-slate-950 shadow-sm shadow-amber-500/20 font-black",
        numberBoxPending: "bg-amber-900 text-amber-100 font-black shadow-xs",
        sectionDone: "bg-amber-100/90 border-amber-300 text-amber-950 shadow-2xs",
        sectionPending: "bg-amber-50/60 border-amber-200/70 hover:bg-amber-100/70 hover:border-amber-300/80 text-amber-950",
        checkDone: "bg-amber-500 text-slate-950 shadow-xs scale-110 font-bold",
        badgeText: "text-amber-950 font-black",
        titleText: "text-amber-950 font-black",
      };

    case "religion":
      return {
        cardBorder: "border-teal-200/90 hover:border-teal-300 shadow-xs",
        headerBg: "bg-gradient-to-r from-teal-100/80 via-emerald-50/70 to-teal-50/60 hover:from-teal-100 hover:to-emerald-100/80",
        badgeBg: "bg-teal-200/80 text-teal-950 border border-teal-300/80 font-extrabold",
        numberBoxDone: "bg-gradient-to-br from-teal-600 to-emerald-600 text-white shadow-sm shadow-teal-500/20",
        numberBoxPending: "bg-teal-900 text-teal-100 font-black shadow-xs",
        sectionDone: "bg-teal-100/90 border-teal-300 text-teal-950 shadow-2xs",
        sectionPending: "bg-teal-50/60 border-teal-200/70 hover:bg-teal-100/70 hover:border-teal-300/80 text-teal-950",
        checkDone: "bg-teal-600 text-white shadow-xs scale-110",
        badgeText: "text-teal-950 font-black",
        titleText: "text-teal-950 font-black",
      };

    default:
      return {
        cardBorder: "border-slate-200/80 hover:border-slate-300 shadow-xs",
        headerBg: "bg-slate-50/80 hover:bg-slate-100/80",
        badgeBg: "bg-slate-100 text-slate-700 border border-slate-200 font-extrabold",
        numberBoxDone: "bg-emerald-500 text-white shadow-xs",
        numberBoxPending: "bg-slate-900 text-white font-black shadow-xs",
        sectionDone: "bg-emerald-50/80 border-emerald-300 text-slate-900 shadow-2xs",
        sectionPending: "bg-slate-50/60 border-slate-200/80 hover:bg-slate-100/80 text-slate-800",
        checkDone: "bg-emerald-500 text-white shadow-xs scale-110",
        badgeText: "text-indigo-600 font-black",
        titleText: "text-slate-900 font-black",
      };
  }
};

const YearlyRoadmapCard: React.FC<{
  language: Language;
  completedSections: Record<string, boolean>;
}> = ({ language, completedSections }) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";

  // Calculate total sections & completed sections across all 8 Grade 12 subjects
  const { totalSections, completedCount, overallPercent } = React.useMemo(() => {
    let total = 0;
    let done = 0;
    grade12SyllabusData.forEach((subj) => {
      subj.chapters.forEach((ch) => {
        ch.sections.forEach((sec) => {
          total++;
          if (completedSections[sec.id]) {
            done++;
          }
        });
      });
    });
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return { totalSections: total, completedCount: done, overallPercent: percent };
  }, [completedSections]);

  const [phasePercents, setPhasePercents] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("grade12_yearly_roadmap_phases");
      return saved
        ? JSON.parse(saved)
        : {
            "phase-2": 65,
            "phase-3": 30,
            "phase-4": 10,
            "phase-5": 0,
          };
    } catch {
      return {
        "phase-2": 65,
        "phase-3": 30,
        "phase-4": 10,
        "phase-5": 0,
      };
    }
  });

  const [isExpandedModal, setIsExpandedModal] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("grade12_yearly_roadmap_phases", JSON.stringify(phasePercents));
    } catch (e) {
      console.error(e);
    }
  }, [phasePercents]);

  // Phase 1 is strictly tied to overall topic completion percentage
  const getPhasePercent = (phaseId: string, defaultFallback: number) => {
    if (phaseId === "phase-1") {
      return overallPercent;
    }
    return phasePercents[phaseId] ?? defaultFallback;
  };

  const phases = [
    {
      id: "phase-1",
      phaseNum: "Phase 1",
      titleEn: "Finish Curriculum",
      titleBadini: "تەواوکرنا پرۆگرامی",
      titleKu: "تەواوکردنی پرۆگرام",
      datesEn: "(Jun – Oct)",
      datesBadini: "(حوزەیران – تشرینی ئێکێ)",
      datesKu: "(حوزەیران – تشرینی یەکەم)",
      titleColor: "text-emerald-600 font-extrabold",
      circleBg: overallPercent >= 100 
        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30" 
        : overallPercent > 0 
        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-4 ring-emerald-100" 
        : "bg-slate-100 text-slate-400 border border-slate-300",
      icon: overallPercent >= 100 ? <Check className="w-4 h-4 stroke-[3]" /> : <BookOpen className="w-4 h-4 stroke-[2.5]" />,
      defaultPercent: overallPercent,
      isAutoSynced: true,
    },
    {
      id: "phase-2",
      phaseNum: "Phase 2",
      titleEn: "First Revision",
      titleBadini: "پێداچوونا ئێکێ",
      titleKu: "پێداچوونەوەی یەکەم",
      datesEn: "(Nov – Jan)",
      datesBadini: "(تشرینی دووێ – کانونی ئێکێ)",
      datesKu: "(تشرینی دووەم – کانونی یەکەم)",
      titleColor: "text-blue-600 font-extrabold",
      circleBg: "bg-blue-600 text-white shadow-md shadow-blue-600/30",
      icon: <Check className="w-4 h-4 stroke-[3]" />,
      defaultPercent: 65,
    },
    {
      id: "phase-3",
      phaseNum: "Phase 3",
      titleEn: "Second Revision",
      titleBadini: "پێداچوونا دووێ",
      titleKu: "پێداچوونەوەی دووەم",
      datesEn: "(Feb – Mar)",
      datesBadini: "(شوبات – ئادار)",
      datesKu: "(شوبات – ئادار)",
      titleColor: "text-purple-600 font-extrabold",
      circleBg: "bg-purple-600 text-white ring-4 ring-purple-100 shadow-md shadow-purple-600/30",
      icon: <Target className="w-4 h-4 stroke-[2.5]" />,
      defaultPercent: 30,
    },
    {
      id: "phase-4",
      phaseNum: "Phase 4",
      titleEn: "Past Papers",
      titleBadini: "پرسیارێن وزاری",
      titleKu: "پرسیارە وزارییەکان",
      datesEn: "(Apr – May)",
      datesBadini: "(نیسان – ئایار)",
      datesKu: "(نیسان – ئایار)",
      titleColor: "text-amber-600 font-extrabold",
      circleBg: "bg-amber-500 text-white shadow-md shadow-amber-500/30",
      icon: <Check className="w-4 h-4 stroke-[3]" />,
      defaultPercent: 10,
    },
    {
      id: "phase-5",
      phaseNum: "Phase 5",
      titleEn: "Final Review",
      titleBadini: "پێداچوونا دوماهیێ",
      titleKu: "پێداچوونەوەی کۆتایی",
      datesEn: "(Jun)",
      datesBadini: "(حوزەیران)",
      datesKu: "(حوزەیران)",
      titleColor: "text-emerald-600 font-extrabold",
      circleBg: "bg-slate-100 text-slate-400 border border-slate-300",
      icon: <Lock className="w-4 h-4" />,
      defaultPercent: 0,
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-5 overflow-hidden">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-blue-600 border border-blue-200/80 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
            <Calendar className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 flex-wrap">
              <span>{isBadini ? "بەرهەڤیا ویزاری" : isKu ? "ئامادەکاریی وزاری" : "Ministerial Preparation"}</span>
              <span className="text-slate-400 font-medium text-xs sm:text-sm">
                ({isBadini ? "پلانا وزاری یا ساڵانە" : isKu ? "پلانی وزاری ساڵانە" : "Yearly Ministerial Roadmap"})
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-bold mt-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>
                {isBadini
                  ? `ڕێژەیا قۆناغا ١ ئۆتۆماتیکی ژ تەواوکرنا بابەتان دھێتە حسابکرن: (${completedCount}/${totalSections} پشک)`
                  : isKu
                  ? `ڕێژەی قۆناغی ١ بە شێوەی خۆکار لە تەواوکردنی بابەتەکان حساب دەکرێت: (${completedCount}/${totalSections} پشک)`
                  : `Phase 1 percentage automatically computed from completed topics: (${completedCount}/${totalSections} sections)`}
              </span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpandedModal(!isExpandedModal)}
          className="text-xs sm:text-sm font-black text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition hover:underline shrink-0"
        >
          <span>{isBadini ? "دیتنا پلانی" : isKu ? "بینینی پلانەکە" : "View Roadmap"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Responsive Horizontal Sequence Timeline */}
      <div className="overflow-x-auto pb-2 pt-1 no-scrollbar">
        <div className="min-w-[650px] px-2">
          {/* Phase Names & Titles Row */}
          <div className="grid grid-cols-5 text-center gap-2 mb-3">
            {phases.map((p) => {
              const title = isBadini ? p.titleBadini : isKu ? p.titleKu : p.titleEn;
              const dates = isBadini ? p.datesBadini : isKu ? p.datesKu : p.datesEn;
              return (
                <div key={p.id} className="space-y-1">
                  <div className="text-[11px] font-black text-slate-800 tracking-tight flex items-center justify-center gap-1">
                    <span>{p.phaseNum}</span>
                    {p.isAutoSynced && (
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-md">
                        {isBadini || isKu ? "ڕاستەوخۆ" : "Live"}
                      </span>
                    )}
                  </div>
                  <div className={`text-xs sm:text-sm ${p.titleColor} truncate leading-tight`}>
                    {title}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-400 font-mono">
                    {dates}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Timeline Nodes & Connecting Lines Row */}
          <div className="relative flex items-center justify-between my-3 px-10">
            {/* Horizontal Line background with colored segments */}
            <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-1 bg-slate-200 rounded-full -z-0 flex overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: "25%" }}></div>
              <div className="h-full bg-blue-500" style={{ width: "25%" }}></div>
              <div className="h-full bg-purple-500" style={{ width: "25%" }}></div>
              <div className="h-full bg-amber-500" style={{ width: "25%" }}></div>
            </div>

            {phases.map((p) => {
              const currentVal = getPhasePercent(p.id, p.defaultPercent);
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    if (p.isAutoSynced) {
                      alert(
                        isBadini
                          ? `قۆناغا ١ (تەواوکرنا پرۆگرامی) ڕاستەوخۆ ژ بەشێن خلاس بوویێن پۆلا ١٢ ئێتە حیسابکرن (${overallPercent}%).\nتۆ دشێی ب نیشانکرنا پشکێن خلاس بووی ل وانەیان ڤێ ڕێژەیێ زێدە بکەی.`
                          : isKu
                          ? `قۆناغی ١ (تەواوکردنی پرۆگرام) بەشێوەی ڕاستەوخۆ لە بەشە تەواوبووەکان دیاری دەکرێت (${overallPercent}%).\nدەتوانیت بە دیاریکردنی بەشەکان لە وانەکان ئەم ڕێژەیە زیاد بکەیت.`
                          : `Phase 1 is live-calculated from completed subject topics (${overallPercent}%).\nCheck off subject sections below to update it.`
                      );
                      return;
                    }

                    const newVal = prompt(
                      `گوڕینا ڕێژەیا ${p.phaseNum} (${p.titleEn}) (0 - 100):`,
                      currentVal.toString()
                    );
                    if (newVal !== null) {
                      const parsed = parseInt(newVal, 10);
                      if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
                        setPhasePercents((prev) => ({ ...prev, [p.id]: parsed }));
                      }
                    }
                  }}
                  className="relative z-10 flex flex-col items-center group cursor-pointer"
                  title={p.isAutoSynced ? "Live synced with finished topics" : "Click to edit percentage"}
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${p.circleBg}`}
                  >
                    {p.icon}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Percentages Row */}
          <div className="grid grid-cols-5 text-center gap-2 mt-2">
            {phases.map((p) => {
              const currentVal = getPhasePercent(p.id, p.defaultPercent);
              return (
                <div key={p.id} className="text-center">
                  <span
                    className={`text-sm sm:text-base font-black font-mono tracking-tight ${
                      p.isAutoSynced ? "text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200" : "text-slate-900"
                    }`}
                  >
                    {currentVal}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Expanded Details Modal / Drawer if user clicks View Roadmap */}
      {isExpandedModal && (
        <div className="pt-4 border-t border-slate-100 space-y-3 bg-slate-50/80 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-xs font-black text-slate-900">
            <span>{isBadini ? "📅 وردەکاریێن پلانا بەرهەڤیا ویزاری:" : isKu ? "📅 وردەکارییەکانی پلانی ئامادەکاریی وزاری:" : "📅 Detailed Ministerial Preparation Milestones:"}</span>
            <button
              type="button"
              onClick={() => setIsExpandedModal(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕ {isBadini || isKu ? "داخستن" : "Close"}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
            {phases.map((p) => {
              const val = getPhasePercent(p.id, p.defaultPercent);
              return (
                <div key={p.id} className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-black text-slate-900">{p.phaseNum}: {isBadini ? p.titleBadini : isKu ? p.titleKu : p.titleEn}</span>
                    <span className="block text-[10px] text-slate-400">{isBadini ? p.datesBadini : isKu ? p.datesKu : p.datesEn}</span>
                  </div>
                  <span className="font-mono font-black text-indigo-600 text-sm">{val}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export const Grade12SyllabusTab: React.FC<Grade12SyllabusTabProps> = ({ language }) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";
  const isRtl = isBadini || isKu;

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("biology");
  const [completedSections, setCompletedSections] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("grade12_syllabus_progress");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    "bio-ch1": true,
    "math-p1": true,
    "phys-ch1": true,
    "chem-ch1": true,
    "eng-reading": true,
    "eng-grammar": true
  });

  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("grade12_syllabus_progress", JSON.stringify(completedSections));
    } catch (e) {
      console.error("Failed to save progress:", e);
    }
  }, [completedSections]);

  const activeSubject = grade12SyllabusData.find((s) => s.id === selectedSubjectId) || grade12SyllabusData[0];

  const handleToggleSection = (secId: string) => {
    setCompletedSections((prev) => ({
      ...prev,
      [secId]: !prev[secId]
    }));
  };

  const handleToggleChapter = (chId: string) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chId]: !prev[chId]
    }));
  };

  // Calculate analytics for active subject
  const totalSubjectSections = activeSubject.totalSections;
  let completedCount = 0;
  activeSubject.chapters.forEach((ch) => {
    ch.sections.forEach((sec) => {
      if (completedSections[sec.id]) {
        completedCount++;
      }
    });
  });

  const progressPercent = Math.round((completedCount / totalSubjectSections) * 100) || 0;

  // Calculate overall statistics across all 5 subjects
  let totalAllSections = 0;
  let totalAllCompleted = 0;
  const subjectStats = grade12SyllabusData.map((subj) => {
    let completed = 0;
    subj.chapters.forEach((ch) => {
      ch.sections.forEach((sec) => {
        if (completedSections[sec.id]) {
          completed++;
        }
      });
    });
    totalAllSections += subj.totalSections;
    totalAllCompleted += completed;
    const percent = Math.round((completed / subj.totalSections) * 100) || 0;
    return {
      ...subj,
      completed,
      percent
    };
  });
  const totalAllPercent = Math.round((totalAllCompleted / totalAllSections) * 100) || 0;

  // AI Prompt Template text
  const aiPromptText = `تکایە تو وەک ڕاوێژکارەکێ زیرەکێ دەستکرد (AI Advisor) و شارەزایێ پرۆگرامێ پۆلا ١٢ یا زانستی، پلانا ڕۆژانە، حەفتیانە، هەیڤانە، و وزاری بۆ من دابڕێژە دگەل شیکارییا (Analytics) تەواو بۆ هەر بابەتەکێ ب ڤێ دابەشبوونێ:
١. زیندەوەر: بەندێ ١ (٣ پشک)، بەندێ ٢ (٣ پشک)، بەندێ ٣ (٣ پشک)، بەندێ ٤ (٤ پشک)، بەندێ ٥ (٥ پشک)، بەندێ ٦ (٣ پشک)، بەندێ ٧ (٢ پشک)، بەندێ ٨ (٤ پشک).
٢. بیرکاری: بەشێ ١ (٣ وانە)، بەشێ ٢ (٤ وانە)، بەشێ ٣ (٤ وانە)، بەشێ ٤ (٥ وانە)، بەشێ ٥ (٤ وانە).
٣. فیزیا: بەندێ ١ (٣ پشک)، بەندێ ٢ (٣ پشک)، بەندێ ٣ (٤ پشک)، بەندێ ٤ (٣ پشک)، بەندێ ٥ (٣ پشک)، بەندێ ٦ (٣ پشک).
٤. کیمیا: بەندێ ١ (٢ پشک)، بەندێ ٢ (٣ پشک)، بەندێ ٣ (٢ پشک)، بەندێ ٤ (٢ پشک)، بەندێ ٥ (٢ پشک)، بەندێ ٦ (٤ پشک)، بەندێ ٩ (٤ پشک)، بەندێ ١٠ (٤ پشک).
٥. ئینگلیزی: Unit 1, 2, 3, 5, 6 (Reading + Grammar لدیڤ وێنێن مامۆستای) + ٧ ئێپسودێن کامل + Activity Book (Unit 1 بۆ 6) + دەنگ و فۆنەتیک (Sounds & Pronunciation).
٦. کوردی: ڕێزمان (٨ پشک)، ئەدەب و شاعیران (٧ پشک)، ڕەوانبێژی و داڕشتن (٥ پشک).
٧. عەرەبی: القواعد (٧ پشک)، الأدب والنصوص (٦ پشک)، المطالعة والإنشاء (٥ پشک).
٨. پەروەردەیا ئیسلامی: قورئان و تەفسیر (٥ پشک)، فەرموودە و سیرە (٥ پشک)، بیروباوەڕ و فیقهـ (٦ پشک).
تکایە بۆ هەر وانەیەکێ خشتەیەکێ شیکاری یێ ڕۆژانە و وزاری ب ڕێژەیا نمران بۆ من دیار بکە!`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(aiPromptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Hero Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isBadini ? "سیلاَبسێ کامل یێ پۆلا ١٢ ب ئەنالیزینگا وزاری (٨ وانە)" : isKu ? "سیلاَبسی تەواوی پۆلی ١٢ بە شیکاری وزاری (٨ وانە)" : "Grade 12 Complete Syllabus & Ministerial Analytics (8 Subjects)"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-indigo-400 shrink-0" />
            <span>{isBadini ? "پلانا وزاری و بەشێن تەواو یێن وانان" : isKu ? "پلانی وزاری و بەشە تەواوەکانی وانەکان" : "Ministerial Curriculum Tracker & Daily Plan"}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-bold leading-relaxed">
            {isBadini
              ? "هەموو بەند و پشکێن زیندەوەر، بیرکاری، فیزیا، کیمیا، ئینگلیزی، کوردی، عەرەبی، و ئیسلامی ب وردی لێرە هاتینە دیارکردن. ل سەر هەر پشکەکێ کلیک بکە بۆ تۆمارکردنا پێشکەفتنا خۆ."
              : isKu
              ? "هەموو بەند و پشکەکانی زیندەوەر، بیرکاری، فیزیا، کیمیا، ئینگلیزی، کوردی، عەرەبی، و ئیسلامی بە وردی لێرە دیاریکراون. لەسەر هەر پشکێک کلیک بکە بۆ تۆمارکردنی پێشکەوتن."
              : "All sections for Biology, Math, Physics, Chemistry, English, Kurdish, Arabic, and Islamic Education mapped out with ministerial weight."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto justify-end">
          <button
            type="button"
            onClick={() => setShowPromptModal(true)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 stroke-[2.5]" />
            <span>{isBadini ? "📋 دیتن و کۆپیکردنا پرۆمپتێ AI" : isKu ? "📋 بینین و کۆپیکردنی پرۆمپتی AI" : "📋 Copy AI Study Advisor Prompt"}</span>
          </button>
        </div>
      </div>

      {/* Yearly Roadmap Card (Ministerial Preparation / بەرهەڤیا ویزاری) */}
      <YearlyRoadmapCard language={language} completedSections={completedSections} />

      {/* All Subjects Progress Dashboard (پێشکەوتنی گشتی وانەکان) */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/90 to-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-xl border border-indigo-800/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-800/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 shrink-0">
              <Award className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>{isBadini ? "📊 پێشکەفتنا گشتی یا هەموو بابەتان (Subjects Progress)" : isKu ? "📊 پێشکەوتنی گشتی هەموو وانەکان (Subjects Progress)" : "📊 All Subjects Progress Dashboard"}</span>
              </h3>
              <p className="text-xs sm:text-sm font-bold text-indigo-200">
                {isBadini ? "ڕێژەیا تەمامکردنێ ل سەرانسەری سیلاَبسێ پۆلا ١٢ یا زانستی (٨ وانە ب گشتی)" : isKu ? "ڕێژەی تەواوکردن لەسەرانسەری پرۆگرامی پۆلی ١٢ ی زانستی (٨ وانە بە گشتی)" : "Overall completion across all 8 Grade 12 ministerial subjects"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/90 px-4 py-2.5 rounded-2xl border border-slate-700 shadow-sm shrink-0 self-start sm:self-auto">
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400">{isBadini || isKu ? "کۆی گشتی تەواوبوو:" : "Total Completed:"}</div>
              <div className="text-sm font-black text-emerald-400 font-mono">{totalAllCompleted} / {totalAllSections} <span className="text-xs text-slate-300 font-sans">{isBadini || isKu ? "پشک" : "Sec"}</span></div>
            </div>
            <div className="h-8 w-px bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">{totalAllPercent}%</div>
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-black">
            <span className="text-indigo-200">{isBadini ? "پێشکەفتنا سیلاَبسێ وزاری ب گشتی:" : isKu ? "پێشکەوتنی پرۆگرامی وزاری بە گشتی:" : "Total Ministerial Syllabus Mastery:"}</span>
            <span className="text-emerald-400 font-mono">{totalAllPercent}%</span>
          </div>
          <div className="w-full h-3.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 shadow-md"
              style={{ width: `${totalAllPercent}%` }}
            />
          </div>
        </div>

        {/* STEP WIZARD / STEPPER MODE */}
        <div className="space-y-4 pt-4 border-t border-indigo-800/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-amber-300">
              <Milestone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{isBadini ? "🚀 ڕێچکەیا قۆناغ ب قۆناغ بۆ تەمامکردنا سیلاَبسێ پۆلا ١٢" : isKu ? "🚀 ڕێچکەی قۆناغ بە قۆناغ بۆ تەواوکردنی پرۆگرامی پۆلی ١٢" : "🚀 Step-by-Step Ministerial Syllabus Mastery Roadmap"}</span>
            </div>
            <span className="text-[11px] font-bold text-slate-400 italic">
              {isBadini ? "* کلیک ل سەر هەر قۆناغەکێ بکە بۆ شیکاریا وزاری" : isKu ? "* کلیک لەسەر هەر قۆناغێک بکە بۆ شیکاری وزاری" : "* Click any step to open ministerial analytics"}
            </span>
          </div>

          <div className="bg-indigo-900/40 p-4 rounded-2xl border border-indigo-700/50 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
              <Milestone className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-indigo-200 leading-relaxed font-bold">
                {isBadini
                  ? "هەر ٨ وانە وەک قۆناغ و هەنگاڤێن یەک بە یەک هاتینە ڕێکخستن. لدیڤ ڕێزبەندیا گرنگیێ و قەبارەیا وانەیان، هەنگاڤ ب هەنگاڤ پێشکەفتنا خۆ تۆمار بکە:"
                  : isKu
                  ? "هەر ٨ وانە وەک قۆناغ و هەنگاوی یەک لەدوای یەک ڕێکخراون. بەپێی ڕێزبەندی گرنگی و قەبارەی وانەکان، هەنگاو بە هەنگاو پێشکەوتنت تۆمار بکە:"
                  : "All 8 subjects arranged as progressive mastery steps. Complete each step to achieve 100% ministerial readiness:"}
              </p>
            </div>
          </div>

          <div className="relative space-y-3 before:absolute before:top-4 before:bottom-4 before:left-6 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-purple-500 before:to-emerald-500 rtl:before:left-auto rtl:before:right-6">
            {subjectStats.map((subj, idx) => {
              const isSelected = selectedSubjectId === subj.id;
              const name = isBadini ? subj.nameBadini : isKu ? subj.nameKu : subj.nameEn;
              const isAllDone = subj.percent === 100;
              const stepNum = idx + 1;
              const theme = getSubjectTheme(subj.id, isSelected);

              return (
                <div
                  key={subj.id}
                  onClick={() => setSelectedSubjectId(subj.id)}
                  className={`relative flex items-center gap-4 p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${theme.cardBg} ${theme.cardBorder}`}
                >
                  {/* Decorative Subject Wave Gradient & Sparkle Background */}
                  <SubjectCardWaves waveFrom={theme.waveFrom} waveTo={theme.waveTo} />

                  {/* Step Circle Badge */}
                  <div className="relative z-10 flex items-center justify-center shrink-0">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm font-mono shadow-lg transition-transform ${
                        isAllDone
                          ? "bg-emerald-500 text-white shadow-emerald-500/30"
                          : theme.stepCircle
                      }`}
                    >
                      {isAllDone ? <Check className="w-6 h-6 stroke-[3]" /> : <span>{stepNum}</span>}
                    </div>
                  </div>

                  {/* Step Main Info */}
                  <div className="relative z-10 flex-1 min-w-0 grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <SubjectIcon subjectId={subj.id} size="md" />
                        <h4 className="text-base sm:text-lg font-black text-white drop-shadow-sm truncate">
                          {name}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-white/90 drop-shadow-2xs">
                        <span>{subj.totalSections} {isBadini || isKu ? "پشک (Sections)" : "Sections"}</span>
                        <span>•</span>
                        <span className="text-amber-200 font-extrabold">{subj.completed} {isBadini || isKu ? "تەمامبوویە" : "Done"}</span>
                      </div>
                    </div>

                    {/* Status Chip */}
                    <div className="flex items-center md:justify-center">
                      {isAllDone ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 backdrop-blur-xs border border-emerald-300/60 text-white text-xs font-black shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                          <span>{isBadini ? "تەمامبوو (١٠٠٪)" : isKu ? "تەواوبوو (١٠٠٪)" : "Completed (100%)"}</span>
                        </span>
                      ) : subj.percent > 0 ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 backdrop-blur-xs border border-white/40 text-white text-xs font-black shadow-sm">
                          <Clock className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
                          <span>{isBadini ? `د پرۆسێ دایە (${subj.percent}٪)` : isKu ? `لە پرۆسەدایە (${subj.percent}٪)` : `In Progress (${subj.percent}%)`}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 backdrop-blur-xs border border-white/20 text-white/90 text-xs font-bold shadow-2xs">
                          <Clock className="w-3.5 h-3.5 text-white/70" />
                          <span>{isBadini || isKu ? "دەستپێنەکراوە (٠٪)" : "Not Started (0%)"}</span>
                        </span>
                      )}
                    </div>

                    {/* Progress Bar & Action */}
                    <div className="space-y-1">
                      <MotivatingProgressBar
                        percent={subj.percent}
                        completed={subj.completed}
                        total={subj.totalSections}
                        language={language}
                        isDark={true}
                        size="sm"
                      />
                      {isSelected && (
                        <div className="text-[10px] font-black text-amber-300 flex items-center justify-end gap-1 pt-1">
                          <span>⚡ {isBadini || isKu ? "قۆناغی دیاریکراو بۆ خاندنێ" : "Active Subject"}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Subject Selector Grid (All 8 Subjects Clearly Visible & Un-truncated) */}
      <div className="bg-slate-100/90 backdrop-blur-xs p-3.5 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
            <h3 className="text-sm sm:text-base font-black text-slate-900">
              {isBadini
                ? "هەڵبژارتنا وانەیێن پۆلا ١٢ (هەموو ٨ وانە ب ڕۆهنی):"
                : isKu
                ? "هەڵبژاردنی وانەکانی پۆلی ١٢ (هەموو ٨ وانەکە به ڕوونی):"
                : "Select Grade 12 Subject (All 8 Subjects):"}
            </h3>
          </div>
          <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/80 font-mono shadow-2xs">
            8 {isBadini || isKu ? "وانەیێن وزاری" : "Subjects"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {grade12SyllabusData.map((subj) => {
            const isSelected = selectedSubjectId === subj.id;
            
            // Clean title extraction
            const kurdishTitle = isBadini
              ? subj.nameBadini.replace(/\s*\(.*?\)/, '')
              : isKu
              ? subj.nameKu.replace(/\s*\(.*?\)/, '')
              : subj.nameEn;
            const englishTitle = subj.nameEn;

            const softTheme = getSubjectSoftTheme(subj.id);
            const theme = getSubjectTheme(subj.id, isSelected);

            // Calculate progress percent for this subject
            const completedCount = subj.chapters.reduce(
              (acc, ch) => acc + ch.sections.filter((s) => completedSections[s.id]).length,
              0
            );
            const totalSec = subj.chapters.reduce((acc, ch) => acc + ch.sections.length, 0);
            const pPercent = totalSec > 0 ? Math.round((completedCount / totalSec) * 100) : 0;

            return (
              <button
                key={subj.id}
                type="button"
                onClick={() => setSelectedSubjectId(subj.id)}
                className={`relative p-3.5 sm:p-4 rounded-2xl text-start flex flex-col justify-between gap-3 transition-all duration-300 cursor-pointer overflow-hidden border ${
                  isSelected
                    ? `${theme.cardBg} ring-4 ring-amber-300/80 shadow-lg scale-[1.02]`
                    : `bg-white hover:bg-slate-50 text-slate-900 border-slate-200/90 shadow-2xs hover:shadow-md ${softTheme.cardBorder}`
                }`}
              >
                {/* Header inside Card: Icon & Progress Badge */}
                <div className="flex items-center justify-between w-full gap-2">
                  <div className="p-1.5 rounded-xl bg-white/90 backdrop-blur-xs shadow-2xs shrink-0 border border-slate-100">
                    <SubjectIcon subjectId={subj.id} size="sm" />
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-black font-mono shadow-2xs transition-all ${
                      isSelected
                        ? "bg-black/30 text-amber-200 border border-white/20"
                        : pPercent === 100
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : pPercent > 0
                        ? "bg-amber-100 text-amber-900 border border-amber-300"
                        : "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {pPercent}%
                  </span>
                </div>

                {/* Body inside Card: Kurdish Title & English Subtitle */}
                <div className="space-y-0.5 min-w-0">
                  <h4
                    className={`text-sm sm:text-base font-black leading-snug transition-colors ${
                      isSelected ? "text-white drop-shadow-xs" : "text-slate-900"
                    }`}
                  >
                    {kurdishTitle}
                  </h4>
                  <p
                    className={`text-[11px] font-bold transition-colors ${
                      isSelected ? "text-amber-200/90" : "text-slate-600"
                    }`}
                  >
                    {englishTitle}
                  </p>
                </div>

                {/* Selected Indicator Glow Dot */}
                {isSelected && (
                  <div className="absolute top-2 left-2 rtl:right-2 rtl:left-auto">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Subject Analytics & Ministerial Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Progress Card */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              {isBadini ? "ڕێژەیا تەمامکردنا بابەتێ" : isKu ? "ڕێژەی تەواوکردنی بابەت" : "Subject Completion"}
            </span>
            <span className="text-sm font-black text-indigo-600 font-mono">{completedCount} / {totalSubjectSections}</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-slate-900 font-mono">{progressPercent}%</span>
              <span className="text-xs font-bold text-slate-500">{isBadini || isKu ? "تەمامبوویە" : "Completed"}</span>
            </div>
            <MotivatingProgressBar
              percent={progressPercent}
              completed={completedCount}
              total={totalSubjectSections}
              language={language}
              isDark={false}
              size="lg"
            />
          </div>
        </div>

        {/* Daily Recommendation */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center gap-2 text-amber-600">
            <Calendar className="w-4 h-4 stroke-[2.5]" />
            <span className="text-xs font-black">{isBadini ? "📌 پلانا ڕۆژانە یا پێشنیارکری:" : isKu ? "📌 پلانی ڕۆژانەی پێشنیارکراو:" : "📌 Recommended Daily Plan:"}</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed bg-amber-50/70 p-3 rounded-2xl border border-amber-200/60">
            {isBadini ? activeSubject.dailyRecommendationBadini : isKu ? activeSubject.dailyRecommendationKu : activeSubject.dailyRecommendationEn}
          </p>
        </div>

        {/* Ministerial Strategy & Monthly Target */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center gap-2 text-indigo-600">
            <Target className="w-4 h-4 stroke-[2.5]" />
            <span className="text-xs font-black">{isBadini ? "🎯 شیکاریا وزاری و هەیڤانە:" : isKu ? "🎯 شیکاری وزاری و مانگانە:" : "🎯 Ministerial Strategy:"}</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed bg-indigo-50/70 p-3 rounded-2xl border border-indigo-200/60">
            {isBadini ? activeSubject.ministerialStrategyBadini : isKu ? activeSubject.ministerialStrategyKu : activeSubject.ministerialStrategyEn}
          </p>
        </div>
      </div>

      {/* Chapters Accordion List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2.5">
            <SubjectIcon subjectId={activeSubject.id} size="md" />
            <span>{isBadini ? `هەموو بەند و پشکێن ${activeSubject.nameBadini}` : isKu ? `هەموو بەند و پشکەکانی ${activeSubject.nameKu}` : `All Chapters & Sections for ${activeSubject.nameEn}`}</span>
          </h3>
          <span className="text-xs font-bold text-slate-500">{activeSubject.chapters.length} {isBadini || isKu ? "بەند / بەش" : "Chapters"}</span>
        </div>

        <div className="space-y-4">
          {activeSubject.chapters.map((ch) => {
            const softTheme = getSubjectSoftTheme(activeSubject.id);
            const isExpanded = !!expandedChapters[ch.id];
            // count completed in this chapter
            const chCompletedCount = ch.sections.filter((s) => completedSections[s.id]).length;
            const isAllCompleted = chCompletedCount === ch.sections.length && ch.sections.length > 0;

            return (
              <div key={ch.id} className={`bg-white/95 rounded-3xl border shadow-xs overflow-hidden transition hover:shadow-md ${softTheme.cardBorder}`}>
                {/* Chapter Header */}
                <div
                  onClick={() => handleToggleChapter(ch.id)}
                  className={`p-4 sm:p-5 transition cursor-pointer flex items-center justify-between gap-4 border-b border-slate-200/60 select-none ${softTheme.headerBg}`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs sm:text-sm shrink-0 transition ${
                      isAllCompleted ? softTheme.numberBoxDone : softTheme.numberBoxPending
                    }`}>
                      {isAllCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : <span>{ch.sectionsCount}</span>}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black px-2.5 py-0.5 rounded-lg ${softTheme.badgeBg}`}>
                          {ch.chapterNumber}
                        </span>
                        <h4 className={`font-black text-sm sm:text-base ${softTheme.titleText}`}>
                          {isBadini ? ch.titleBadini : isKu ? ch.titleKu : ch.titleEn}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-black font-mono ${softTheme.badgeText}`}>
                      {chCompletedCount}/{ch.sections.length} {isBadini || isKu ? "تەمام" : "Done"}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/90 border border-slate-200/80 flex items-center justify-center text-slate-700 shadow-2xs">
                      {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-800" /> : <ChevronRight className="w-4 h-4 text-slate-800" />}
                    </div>
                  </div>
                </div>

                {/* Chapter Sections List */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-white/80">
                    {ch.sections.map((sec) => {
                      const isSecDone = !!completedSections[sec.id];
                      return (
                        <div
                          key={sec.id}
                          onClick={() => handleToggleSection(sec.id)}
                          className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-start justify-between gap-3 ${
                            isSecDone
                              ? softTheme.sectionDone
                              : softTheme.sectionPending
                          }`}
                        >
                          <div className="space-y-1.5 flex-1">
                            <p className={`text-xs sm:text-sm font-black transition ${isSecDone ? "line-through opacity-80 text-emerald-950" : "text-slate-900"}`}>
                              {isBadini ? sec.titleBadini : isKu ? sec.titleKu : sec.titleEn}
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                              {sec.weightMinisterial && (
                                <span className="inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200/80">
                                  ⚖️ {sec.weightMinisterial}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className={`w-6 h-6 rounded-xl flex items-center justify-center shrink-0 transition ${
                            isSecDone ? softTheme.checkDone : "bg-white border-2 border-slate-300 text-transparent"
                          }`}>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Prompt Modal */}
      {showPromptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl border border-slate-200 space-y-5 animate-scaleUp max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-slate-950 font-black shadow-sm">
                  <Sparkles className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900">
                    {isBadini ? "پرۆمپتێ ئامادەکری یێ پۆلا ١٢ بۆ AI" : isKu ? "پرۆمپتی ئامادەکراوی پۆلی ١٢ بۆ AI" : "Grade 12 Complete AI Study Prompt"}
                  </h3>
                  <p className="text-xs font-bold text-slate-500">
                    {isBadini ? "ڤی دەقی کۆپی بکە و دناڤ ChatGPT یان Gemini دا بکاربینە" : isKu ? "ئەم دەقە کۆپی بکە و لەناو ChatGPT یان Gemini بەکاری بهێنە" : "Copy and paste into ChatGPT or Gemini for instant advisor plans"}
                  </p>
                </div>
              </div>
              <button onClick={() => setShowPromptModal(false)} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg bg-slate-100 font-bold">✕</button>
            </div>

            <div className="bg-slate-900 text-slate-100 p-4 sm:p-5 rounded-2xl font-mono text-xs sm:text-sm leading-relaxed border border-slate-800 whitespace-pre-wrap select-all shadow-inner">
              {aiPromptText}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-500">
                {copiedPrompt ? "✅ ب سەرکەوتووی هاتە کۆپیکردن!" : "💡 کلیک ل سەر کۆپیکردنێ بکە بۆ وەرگرتنی"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPromptModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  {isBadini || isKu ? "داخستن" : "Close"}
                </button>
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition active:scale-95 flex items-center gap-2"
                >
                  {copiedPrompt ? <CheckCircle2 className="w-4 h-4 text-emerald-400 stroke-[2.5]" /> : <Copy className="w-4 h-4 stroke-[2.5]" />}
                  <span>{copiedPrompt ? (isBadini || isKu ? "هاتە کۆپیکردن!" : "Copied!") : (isBadini || isKu ? "کۆپیکردنا دەقی" : "Copy Prompt")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
