import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  Search,
  SlidersHorizontal,
  Tag,
  Plus,
  ArrowLeft,
  ArrowRight,
  Home,
  Maximize2,
  Minimize2,
  Calendar,
  Clock,
  Target,
  Trophy,
  BarChart3,
  X,
  ChevronDown
} from "lucide-react";
import { Language, Subject, SubjectId } from "../types";

import mathMascot from "../assets/images/math_mascot_1785970327866.jpg";
import chemMascot from "../assets/images/chemistry_mascot_1785970339483.jpg";
import phyMascot from "../assets/images/physics_mascot_1785970349601.jpg";
import bioMascot from "../assets/images/biology_mascot_1785970360815.jpg";
import kurMascot from "../assets/images/kurdish_mascot_1785970374665.jpg";
import engMascot from "../assets/images/english_mascot_1785970385553.jpg";
import araMascot from "../assets/images/arabic_mascot_1785970395130.jpg";
import relMascot from "../assets/images/religion_mascot_1785970406533.jpg";
import purpleMascotImg from "../assets/images/purple_mascot_1785415026355.jpg";
import cosmicMascotPedestal from "../assets/images/cosmic_mascot_pedestal_1788382139320.jpg";
import plannerMascotTarget from "../assets/images/planner_mascot_target_1788382153757.jpg";

interface SubjectsGridProps {
  subjects: Subject[];
  language: Language;
  isDarkMode?: boolean;
  onSelectSubject: (subjectId: SubjectId) => void;
  onStartQuiz?: (subjectId: SubjectId) => void;
  onOpenStudyPlan?: () => void;
  onViewAll?: () => void;
  showBanner?: boolean;
  onBackToHome?: () => void;
  onOpenAiTutor?: () => void;
}

interface SubjectCardConfig {
  id: SubjectId;
  mascot: string;
  nameBadini: string;
  nameKu: string;
  nameEn: string;
  badgeIcon: string;
  badgeBoxClass: string;
  questionsCount: number;
  extraSub?: string;
  progressPercent: number;
  color: string;
  cardBg: string;
  borderColor: string;
  category: "scientific" | "literary" | "common";
}

const subjectConfigs: Record<string, SubjectCardConfig> = {
  // Row 1 (RTL: Math on the right, Physics, Chemistry, Biology on the left)
  math: {
    id: "math",
    mascot: mathMascot,
    nameBadini: "ریاضی",
    nameKu: "ریاضی",
    nameEn: "Mathematics",
    badgeIcon: "+ − ✕ ✕",
    badgeBoxClass: "bg-emerald-50 text-emerald-600 border border-emerald-200/80",
    questionsCount: 1250,
    progressPercent: 75,
    color: "#10b981",
    cardBg: "bg-gradient-to-b from-white via-white to-emerald-50/40",
    borderColor: "border-slate-100/90 hover:border-emerald-300",
    category: "scientific"
  },
  physics: {
    id: "physics",
    mascot: phyMascot,
    nameBadini: "فیزیا",
    nameKu: "فیزیا",
    nameEn: "Physics",
    badgeIcon: "⚛️",
    badgeBoxClass: "bg-blue-50 text-blue-600 border border-blue-200/80",
    questionsCount: 980,
    progressPercent: 60,
    color: "#2563eb",
    cardBg: "bg-gradient-to-b from-white via-white to-blue-50/40",
    borderColor: "border-slate-100/90 hover:border-blue-300",
    category: "scientific"
  },
  chemistry: {
    id: "chemistry",
    mascot: chemMascot,
    nameBadini: "کیمیا",
    nameKu: "کیمیا",
    nameEn: "Chemistry",
    badgeIcon: "🧪",
    badgeBoxClass: "bg-purple-50 text-purple-600 border border-purple-200/80",
    questionsCount: 870,
    progressPercent: 55,
    color: "#9333ea",
    cardBg: "bg-gradient-to-b from-white via-white to-purple-50/40",
    borderColor: "border-slate-100/90 hover:border-purple-300",
    category: "scientific"
  },
  biology: {
    id: "biology",
    mascot: bioMascot,
    nameBadini: "زیندۆزانستی",
    nameKu: "زیندۆزانستی",
    nameEn: "Biology",
    badgeIcon: "🧬",
    badgeBoxClass: "bg-orange-50 text-orange-600 border border-orange-200/80",
    questionsCount: 950,
    progressPercent: 65,
    color: "#ea580c",
    cardBg: "bg-gradient-to-b from-white via-white to-orange-50/40",
    borderColor: "border-slate-100/90 hover:border-orange-300",
    category: "scientific"
  },
  // Row 2 (RTL: Nishandi on the right, Arabic, Kurdish, English on the left)
  religion: {
    id: "religion",
    mascot: relMascot,
    nameBadini: "نیشاندی",
    nameKu: "نیشاندی",
    nameEn: "General & Islamic Studies",
    badgeIcon: "Aa",
    badgeBoxClass: "bg-sky-50 text-sky-600 border border-sky-200/80 font-black",
    questionsCount: 760,
    progressPercent: 80,
    color: "#0284c7",
    cardBg: "bg-gradient-to-b from-white via-white to-sky-50/40",
    borderColor: "border-slate-100/90 hover:border-sky-300",
    category: "common"
  },
  arabic: {
    id: "arabic",
    mascot: araMascot,
    nameBadini: "عەربی",
    nameKu: "عەربی",
    nameEn: "Arabic",
    badgeIcon: "ف",
    badgeBoxClass: "bg-amber-50 text-amber-600 border border-amber-200/80 font-bold",
    questionsCount: 650,
    progressPercent: 70,
    color: "#d97706",
    cardBg: "bg-gradient-to-b from-white via-white to-amber-50/40",
    borderColor: "border-slate-100/90 hover:border-amber-300",
    category: "common"
  },
  kurdish: {
    id: "kurdish",
    mascot: kurMascot,
    nameBadini: "کوردی",
    nameKu: "کوردی",
    nameEn: "Kurdish",
    badgeIcon: "ێ",
    badgeBoxClass: "bg-pink-50 text-pink-600 border border-pink-200/80 font-bold",
    questionsCount: 540,
    progressPercent: 45,
    color: "#db2777",
    cardBg: "bg-gradient-to-b from-white via-white to-pink-50/40",
    borderColor: "border-slate-100/90 hover:border-pink-300",
    category: "common"
  },
  english: {
    id: "english",
    mascot: engMascot,
    nameBadini: "ئینگلیزی",
    nameKu: "ئینگلیزی",
    nameEn: "English",
    extraSub: "(بەرز و دیسانپشتگی)",
    badgeIcon: "📖",
    badgeBoxClass: "bg-teal-50 text-teal-600 border border-teal-200/80",
    questionsCount: 480,
    progressPercent: 40,
    color: "#0d9488",
    cardBg: "bg-gradient-to-b from-white via-white to-teal-50/40",
    borderColor: "border-slate-100/90 hover:border-teal-300",
    category: "common"
  }
};

export const SubjectsGrid: React.FC<SubjectsGridProps> = ({
  subjects,
  language,
  isDarkMode = false,
  onSelectSubject,
  onStartQuiz,
  onOpenStudyPlan,
  showBanner = true,
  onBackToHome,
  onOpenAiTutor
}) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => setIsFullscreen(true));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => setIsFullscreen(false));
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "scientific" | "literary" | "languages">("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showCountdownModal, setShowCountdownModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);

  const [dailyGoalHours, setDailyGoalHours] = useState(3);
  const [dailyTargetLessons, setDailyTargetLessons] = useState(4);
  const [planSaved, setPlanSaved] = useState(false);

  const isBadini = language === "badini";
  const isKu = language === "ku";

  // Ordered strictly according to the reference image in RTL:
  // Row 1 (RTL): Math (Right) -> Physics -> Chemistry -> Biology (Left)
  // Row 2 (RTL): Nishandi (Right) -> Arabic -> Kurdish -> English (Left)
  const defaultKeys = [
    "math",
    "physics",
    "chemistry",
    "biology",
    "religion",
    "arabic",
    "kurdish",
    "english"
  ];

  const filteredConfigs = defaultKeys
    .map((k) => subjectConfigs[k])
    .filter(Boolean)
    .filter((cfg) => {
      const matchesCategory =
        selectedCategory === "all"
          ? true
          : selectedCategory === "scientific"
          ? cfg.category === "scientific"
          : selectedCategory === "languages"
          ? cfg.id === "kurdish" || cfg.id === "arabic" || cfg.id === "english"
          : true;

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesQuery =
        cfg.nameBadini.toLowerCase().includes(query) ||
        cfg.nameKu.toLowerCase().includes(query) ||
        cfg.nameEn.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });

  return (
    <div className="w-full space-y-5 select-none font-sans" dir="rtl">
      {/* ==================================================================== */}
      {/* 1. TOP HERO BANNER (Directly matching Image Reference) */}
      {/* ==================================================================== */}
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative w-full rounded-[32px] sm:rounded-[38px] bg-gradient-to-r from-[#ece4f8] via-[#f7f2fd] to-[#eae0f8] dark:from-[#1b143f] dark:via-[#261754] dark:to-[#170e37] overflow-hidden p-6 sm:p-8 md:p-10 shadow-[0_4px_30px_rgba(147,51,234,0.06)] border border-white/90 dark:border-purple-800/40 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Subtle Ambient Cosmic Circles & Stars matching the image */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Glowing orbital ellipse around mascot on physical left */}
            <div className="absolute top-1/2 left-8 md:left-16 -translate-y-1/2 w-64 h-32 md:w-80 md:h-40 border border-purple-300/40 dark:border-purple-400/20 rounded-full rotate-[-12deg]" />
            <div className="absolute top-1/2 left-8 md:left-16 -translate-y-1/2 w-52 h-24 md:w-64 md:h-30 border border-indigo-200/30 dark:border-indigo-400/15 rounded-full rotate-[15deg]" />

            {/* Faint stars */}
            <span className="absolute top-8 left-1/3 text-purple-400/50 dark:text-purple-300/40 text-lg">✦</span>
            <span className="absolute bottom-8 left-1/4 text-indigo-400/40 dark:text-indigo-300/30 text-sm">✨</span>
            <span className="absolute top-12 right-1/4 text-purple-300/40 text-xs">✦</span>
          </div>

          {/* Right in RTL: Title and Subtitle (FIRST child in RTL flex row) */}
          <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-right flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#5b2b9d] dark:text-purple-200 tracking-tight drop-shadow-xs">
              {isBadini ? "بابەتین خوێندنی پۆلا ۱۲" : isKu ? "بابەتەکانی خوێندنی پۆلی ۱۲" : "Grade 12 Study Subjects"}
            </h1>
            <p className="text-xs sm:text-sm md:text-base font-bold text-purple-900/75 dark:text-purple-300/80 mt-2 max-w-xl">
              {isBadini
                ? "بابەتەکی هەڵبژێره دا دەست به راهێنان و پرسیاران بکە."
                : isKu
                ? "بابەتێک هەڵبژێرە تا دەست بە ڕاهێنان و پرسیارەکان بکەیت."
                : "Select a subject to start practice and exam questions."}
            </p>
          </div>

          {/* Left in RTL: Floating Cute Purple Blob Mascot (SECOND child in RTL flex row) */}
          <div className="relative z-10 flex-shrink-0 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 flex items-center justify-center cursor-pointer"
              onClick={() => setShowCountdownModal(true)}
            >
              <img
                src={purpleMascotImg}
                alt="Purple Mascot"
                className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(147,51,234,0.18)]"
              />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ==================================================================== */}
      {/* 2. SUB-BAR / TOOLBAR (Directly matching Image Reference) */}
      {/* ==================================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        {/* Right side in RTL (FIRST in RTL flex): Filter button & Search input */}
        <div className="flex items-center gap-2.5">
          {/* Filter button: فلتەر ≡ */}
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 bg-white/95 dark:bg-[#171336] border border-purple-100/90 dark:border-purple-800/60 text-slate-700 dark:text-slate-200 shadow-xs hover:bg-slate-50 dark:hover:bg-purple-950/40 transition active:scale-95"
            >
              <span className="font-extrabold text-sm text-purple-700 dark:text-purple-300">≡</span>
              <span>{isBadini || isKu ? "فلتەر" : "Filter"}</span>
            </button>

            {/* Filter Dropdown */}
            <AnimatePresence>
              {showFilterDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-[#1a153a] border border-purple-100 dark:border-purple-900 shadow-xl p-2 z-30 space-y-1 text-right text-xs"
                >
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setShowFilterDropdown(false);
                    }}
                    className={`w-full text-right px-3 py-2 rounded-xl font-bold transition ${
                      selectedCategory === "all" ? "bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-black" : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {isBadini || isKu ? "هەموو بابەتەکان" : "All Subjects"}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory("scientific");
                      setShowFilterDropdown(false);
                    }}
                    className={`w-full text-right px-3 py-2 rounded-xl font-bold transition ${
                      selectedCategory === "scientific" ? "bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-black" : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {isBadini || isKu ? "بەشی زانستی" : "Scientific"}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory("languages");
                      setShowFilterDropdown(false);
                    }}
                    className={`w-full text-right px-3 py-2 rounded-xl font-bold transition ${
                      selectedCategory === "languages" ? "bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-black" : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {isBadini || isKu ? "زمانەکان" : "Languages"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search input: ...گەڕان لە بابەتەکان Q */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBadini || isKu ? "...گەڕان لە بابەتەکان" : "Search subjects..."}
              className="w-48 sm:w-64 pl-4 pr-9 py-2 rounded-2xl text-xs font-bold bg-white/95 dark:bg-[#171336] border border-purple-100/90 dark:border-purple-800/60 text-slate-900 dark:text-white focus:border-purple-400 outline-none shadow-xs text-right placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Left side in RTL (SECOND in RTL flex): ✦ دەمریا هەمان ➔ */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="text-[#602d9c] dark:text-purple-300 hover:text-purple-900 dark:hover:text-white font-black text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95"
          >
            <span className="text-sm">✦</span>
            <span>{isBadini ? "دەمریا هەمان" : isKu ? "دەمریا هەمان" : "All Subjects"}</span>
            <span className="text-sm font-black leading-none">➔</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. THE 8 SUBJECT CARDS (Directly matching Image Reference Grid) */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
        {filteredConfigs.map((cfg, index) => {
          const displayName = isBadini ? cfg.nameBadini : isKu ? cfg.nameKu : cfg.nameEn;

          return (
            <motion.div
              key={cfg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.35, ease: "easeOut" }}
              whileHover={{ y: -4, scale: 1.012 }}
              onClick={() => onSelectSubject(cfg.id)}
              className={`relative rounded-[28px] p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 border shadow-[0_4px_22px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(147,51,234,0.09)] overflow-hidden ${
                isDarkMode ? "bg-[#16122d] border-purple-900/50 hover:border-purple-500/50" : `${cfg.cardBg} ${cfg.borderColor}`
              }`}
            >
              {/* Top-Right Badge Icon matching Image (e.g. ➕✖️, ⚛️, 🧪, 🧬, Aa, ف, ێ, 📖) */}
              <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center text-xs sm:text-sm font-black shadow-xs ${cfg.badgeBoxClass}`}
                >
                  {cfg.id === "math" ? (
                    <div className="flex flex-col items-center justify-center font-black leading-none text-[11px] sm:text-xs">
                      <span className="tracking-wider">+ −</span>
                      <span className="tracking-tighter text-[10px]">✕ ✕</span>
                    </div>
                  ) : (
                    <span>{cfg.badgeIcon}</span>
                  )}
                </div>
              </div>

              {/* Middle Section: Title + Stats on RIGHT, Mascot on LEFT in RTL */}
              <div className="flex items-center justify-between gap-2 w-full pt-1 pb-3">
                {/* Subject Title & Stats on Right (FIRST child in RTL flex) */}
                <div className="flex flex-col items-start text-right flex-1 min-w-0 pr-1">
                  <h3
                    className={`text-xl sm:text-2xl font-black transition-colors truncate w-full ${
                      isDarkMode ? "text-white group-hover:text-purple-300" : "text-slate-900"
                    }`}
                  >
                    {displayName}
                  </h3>

                  {cfg.extraSub && (
                    <span className="text-[11px] font-bold text-slate-400 mt-0.5">
                      {cfg.extraSub}
                    </span>
                  )}

                  <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">
                    {cfg.questionsCount} پرسیار
                  </span>
                </div>

                {/* 3D Mascot Image on Left (SECOND child in RTL flex) */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={cfg.mascot}
                    alt={displayName}
                    className="w-full h-full object-contain rounded-2xl drop-shadow-sm hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Bottom Progress Bar matching Image: Bar on Left, Percentage on Right */}
              <div className="w-full pt-2 flex items-center gap-2.5" dir="ltr">
                {/* Filled bar on the left */}
                <div className="flex-1 h-2.5 sm:h-3 rounded-full bg-slate-100 dark:bg-slate-800/80 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cfg.progressPercent}%` }}
                    transition={{ delay: 0.1 + index * 0.04, duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: cfg.color }}
                  />
                </div>
                {/* Percentage text on the right */}
                <span className="font-mono font-black text-xs sm:text-sm shrink-0" style={{ color: cfg.color }}>
                  {cfg.progressPercent}%
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ==================================================================== */}
      {/* 4. BOTTOM DAILY PLANNER BANNER (Directly matching Image Reference) */}
      {/* ==================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="relative w-full rounded-[30px] sm:rounded-[36px] bg-gradient-to-r from-[#ece4f8] via-[#f7f2fd] to-[#eae0f8] dark:from-[#1b143f] dark:via-[#261754] dark:to-[#170e37] border border-purple-200/80 dark:border-purple-800/40 p-5 sm:p-6 shadow-sm overflow-hidden flex flex-col md:flex-row items-center justify-between gap-5"
      >
        {/* Right in RTL (FIRST in RTL flex): Solid Purple Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              if (onOpenStudyPlan) {
                onOpenStudyPlan();
              } else {
                setShowPlanModal(true);
              }
            }}
            className="px-6 py-2.5 sm:py-3 rounded-2xl bg-[#5b2b9d] hover:bg-[#4a2283] text-white font-black text-xs sm:text-sm shadow-md shadow-purple-900/20 transition active:scale-95 flex items-center gap-2"
          >
            <span>{isBadini || isKu ? "پلانی ڕۆژانە دروست بکە" : "Create Daily Plan"}</span>
          </button>
        </div>

        {/* Center in RTL: Motivational Copy directly from Reference Image */}
        <div className="text-center md:text-right flex-1">
          <h3 className="text-base sm:text-lg font-black text-[#431e78] dark:text-purple-200">
            {isBadini
              ? "هەمرۆ چی پلانت هەیە؟"
              : isKu
              ? "هەمرۆ چی پلانت هەیە؟"
              : "What is your study plan today?"}
          </h3>
          <p className="text-xs sm:text-sm text-purple-900/80 dark:text-purple-300/80 font-bold mt-1">
            {isBadini || isKu
              ? "پلانت دانێ و هەموو ڕۆژەکەت بە هەنگاوێک نزیکتر بۆ سەرکەوتن!"
              : "Set your daily plan and take a step closer to success every single day!"}
          </p>
        </div>

        {/* Left in RTL (THIRD in RTL flex): Cute Purple Mascot Peeking Out */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 sm:w-20 sm:h-20"
          >
            <img
              src={purpleMascotImg}
              alt="Planner Mascot"
              className="w-full h-full object-contain drop-shadow-sm"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* ==================================================================== */}
      {/* 5. INTERACTIVE MODALS (Exam Countdown, Daily Plan, Achievements) */}
      {/* ==================================================================== */}

      {/* Ministerial Exam Countdown Modal */}
      <AnimatePresence>
        {showCountdownModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#1a153a] rounded-[32px] p-6 text-right shadow-2xl border border-purple-200 dark:border-purple-800 space-y-4"
              dir="rtl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      {isBadini ? "مێژووی ئەزموونێن وزاری ۲۰۲٥" : "مێژووی ئەزموونی وزاری ۲۰۲٥"}
                    </h3>
                    <span className="text-xs font-bold text-amber-500">⭐ ١٢٩ ڕۆژ ماینە</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowCountdownModal(false)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800 flex items-center justify-between font-bold">
                  <span>📅 دەستپێکرنا ئەزموونێن نیشتیمانی خولی یەکەم</span>
                  <span className="font-black text-purple-700 dark:text-purple-300">٢٠٢٥/٠٦/٠١</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between font-bold">
                  <span>🎯 دەمژمێرێن پێکڤە خواندن و تەماشاکرنا وانەیان</span>
                  <span className="font-black text-slate-900 dark:text-white">٤-٦ دەمژمێر / ڕۆژانە</span>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 font-medium">
                  💡 <strong>شیرەت:</strong> تەماشاکرن و پێداچوونا شرۆڤەکرنا وانەیان و پوختەیێن وان کلیلێ سەرەکیێ نمرەیا ١٠٠ ێ یە!
                </div>
              </div>

              <button
                onClick={() => setShowCountdownModal(false)}
                className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-md shadow-purple-600/30 transition active:scale-95"
              >
                دەستخۆش، بەردەوامم لسەر خواندنێ ✨
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Daily Study Plan Creator Modal */}
      <AnimatePresence>
        {showPlanModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#1a153a] rounded-[32px] p-6 text-right shadow-2xl border border-purple-200 dark:border-purple-800 space-y-4"
              dir="rtl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      {isBadini ? "دانانا پلانا ڕۆژانە یا وانەیان" : "دانانی پلانی ڕۆژانەی وانەکان"}
                    </h3>
                    <span className="text-xs text-purple-600 dark:text-purple-400 font-bold">
                      ئامانجێن ئەڤرۆ یێن خواندن و شرۆڤەیێ دیاربکە
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowPlanModal(false)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {planSaved ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 dark:text-white">
                    پلان ب سەرکەفتن هاتە تۆمارکرن! 🎉
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    ئەڤرۆ ئامانجا تە {dailyGoalHours} دەمژمێر و {dailyTargetLessons} وانەیێن شرۆڤەکرینە. بەردەوام بە!
                  </p>
                  <button
                    onClick={() => {
                      setPlanSaved(false);
                      setShowPlanModal(false);
                    }}
                    className="px-6 py-2.5 rounded-2xl bg-purple-600 text-white text-xs font-black"
                  >
                    داخستن
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      ⏱️ ئامانجا دەمژمێرێن خواندن و بینینا شرۆڤەیان: ({dailyGoalHours} دەمژمێر)
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={8}
                      value={dailyGoalHours}
                      onChange={(e) => setDailyGoalHours(Number(e.target.value))}
                      className="w-full accent-purple-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      📚 ژمارا وانەیێن پێویستە شرۆڤەیێن وان تەواو بکەی: ({dailyTargetLessons} وانە)
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      step={1}
                      value={dailyTargetLessons}
                      onChange={(e) => setDailyTargetLessons(Number(e.target.value))}
                      className="w-full accent-purple-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200">
                    📚 <strong>پێشنیارا مۆدێلا ژیر:</strong> دەستپێکێ ب شرۆڤەکرنا وانەیەکا بیرکاری یان فیزیا دەستپێبکە، پاشان کورتەیەکا کوردی و ئینگلیزی بخوینە.
                  </div>

                  <button
                    onClick={() => setPlanSaved(true)}
                    className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-md shadow-purple-600/30 transition active:scale-95"
                  >
                    تۆمارکرنا پلانا ئەڤرۆ 🚀
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress & Stats Modal */}
      <AnimatePresence>
        {showStatsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#1a153a] rounded-[32px] p-6 text-right shadow-2xl border border-purple-200 dark:border-purple-800 space-y-4"
              dir="rtl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      ئاست و سەرکەفتنێن پۆلا ۱۲ 🏆
                    </h3>
                    <span className="text-xs text-emerald-500 font-bold">ئاستێ ٥ • ستێرکێن زێڕین</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowStatsModal(false)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800">
                  <span className="text-2xl font-black text-purple-600 block">204</span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">وانەیێن شرۆڤەکری</span>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800">
                  <span className="text-2xl font-black text-amber-500 block">64</span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">بەش و یەکەیێن سەرەکی</span>
                </div>
              </div>

              <button
                onClick={() => setShowStatsModal(false)}
                className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-md shadow-purple-600/30 transition active:scale-95"
              >
                بەردەوام بە بەرەڤ نمرەیا ۱۰۰ 🎯
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
