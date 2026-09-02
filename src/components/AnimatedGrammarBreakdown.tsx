import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  BookOpen,
  CheckCircle2,
  ListOrdered,
  LayoutGrid,
  GraduationCap,
  Zap,
  ArrowDown,
  BrainCircuit,
  KeyRound,
  Compass,
  Sparkle,
  Gamepad2,
  Trophy,
  Check,
  Flame,
  Lightbulb,
  HelpCircle
} from "lucide-react";
import { GrammarBreakdown, Language } from "../types";
import { TeacherMascotPointer } from "./TeacherMascotPointer";

interface AnimatedGrammarBreakdownProps {
  breakdown: GrammarBreakdown;
  language: Language;
  isWrong?: boolean;
}

// 🎮 Interactive Grammar Formula Mini-Game Component 🎮
interface GrammarFormulaGameProps {
  breakdown: GrammarBreakdown;
  language: Language;
  currentResultTense: string;
  currentMemoryHook: string;
  isWrong?: boolean;
}

const GrammarFormulaGame: React.FC<GrammarFormulaGameProps> = ({
  breakdown,
  language,
  currentResultTense,
  currentMemoryHook,
  isWrong = false,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [assembledSteps, setAssembledSteps] = useState<
    Array<{ segment: string; role: string; originalIdx: number }>
  >([]);
  const [wrongFeedback, setWrongFeedback] = useState<string | null>(null);
  const [shakingPiece, setShakingPiece] = useState<string | null>(null);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [showDirectRule, setShowDirectRule] = useState<boolean>(false);

  // Available pieces (randomized)
  const pieces = useMemo(() => {
    return breakdown.steps.map((step, idx) => ({
      segment: step.segment,
      originalIdx: idx,
      roleBadini: step.roleBadini,
      roleKu: step.roleKu,
    })).sort((a, b) => (a.segment.length > b.segment.length ? -1 : 1));
  }, [breakdown.targetWord, breakdown.steps]);

  // Reset when word changes
  useEffect(() => {
    setActiveStepIndex(0);
    setAssembledSteps([]);
    setWrongFeedback(null);
    setShakingPiece(null);
    setHasWon(false);
  }, [breakdown.targetWord]);

  const currentTargetStep = breakdown.steps[activeStepIndex];

  const handleSelectPiece = (piece: {
    segment: string;
    originalIdx: number;
    roleBadini: string;
    roleKu: string;
  }) => {
    if (hasWon || !currentTargetStep) return;

    if (piece.originalIdx === activeStepIndex) {
      // Correct piece!
      const nextAssembled = [
        ...assembledSteps,
        {
          segment: piece.segment,
          role: language === "badini" ? piece.roleBadini : piece.roleKu,
          originalIdx: piece.originalIdx,
        },
      ];
      setAssembledSteps(nextAssembled);
      setWrongFeedback(null);
      setShakingPiece(null);

      const nextIdx = activeStepIndex + 1;
      if (nextIdx >= breakdown.steps.length) {
        setHasWon(true);
      } else {
        setActiveStepIndex(nextIdx);
      }
    } else {
      // Wrong piece!
      setShakingPiece(piece.segment);
      const pieceRole = language === "badini" ? piece.roleBadini : piece.roleKu;
      const targetRole =
        language === "badini"
          ? currentTargetStep.roleBadini
          : currentTargetStep.roleKu;

      setWrongFeedback(
        language === "badini"
          ? `«${piece.segment}» (${pieceRole}) یە، نەخێر! ل «${targetRole}» بگەڕە.`
          : `«${piece.segment}» (${pieceRole})ـە، نەخێر! بەدوای «${targetRole}»دا بگەڕێ.`
      );

      setTimeout(() => {
        setShakingPiece(null);
      }, 500);
    }
  };

  const handleResetGame = () => {
    setActiveStepIndex(0);
    setAssembledSteps([]);
    setWrongFeedback(null);
    setShakingPiece(null);
    setHasWon(false);
  };

  const handleAutoSolve = () => {
    setAssembledSteps(
      breakdown.steps.map((s, i) => ({
        segment: s.segment,
        role: language === "badini" ? s.roleBadini : s.roleKu,
        originalIdx: i,
      }))
    );
    setHasWon(true);
    setWrongFeedback(null);
  };

  return (
    <div
      className={`rounded-3xl p-4 sm:p-5 border-2 transition-all space-y-4 relative overflow-hidden shadow-sm ${
        isWrong
          ? "bg-gradient-to-br from-amber-50/95 via-purple-50/90 to-white border-amber-300"
          : "bg-white border-purple-200"
      }`}
    >
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-purple-100">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black shadow-xs shrink-0 ${
              isWrong
                ? "bg-amber-400 text-slate-950"
                : "bg-purple-600 text-white"
            }`}
          >
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h5 className="font-black text-sm sm:text-base text-purple-950">
                {isWrong
                  ? language === "badini"
                    ? "🎯 ڕاهێنانا چاککرنا خەلەتیێ"
                    : "🎯 ڕاهێنانی چاککردنی هەڵە"
                  : language === "badini"
                  ? "یارییا چێکرنا یاسایا کاری 🎮"
                  : "یاریی دروستکردنی یاسای کار 🎮"}
              </h5>
            </div>
            <p className="text-[11px] sm:text-xs text-purple-800 font-bold mt-0.5">
              {language === "badini"
                ? "پارچەیێن کاری ب دروستی هەلبژێرە دا یاسایا زێڕین چەسپیت:"
                : "پارچەکانی کار بە دروستی هەڵبژێرە بۆ جێگیربوونی یاسای زێڕین:"}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setShowDirectRule(!showDirectRule)}
            className="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 font-bold text-xs flex items-center gap-1 transition cursor-pointer active:scale-95"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>
              {showDirectRule
                ? language === "badini"
                  ? "یاری"
                  : "یاری"
                : language === "badini"
                ? "یاسا"
                : "یاسا"}
            </span>
          </button>

          <button
            type="button"
            onClick={handleResetGame}
            className="p-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 transition cursor-pointer active:scale-95"
            title={language === "badini" ? "دووبارە ژ دەستپێکێ" : "دووبارە لە سەرەتاوە"}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!showDirectRule ? (
        <div className="space-y-4">
          {/* Target Word & Assembly Track */}
          <div className="bg-purple-950 text-white rounded-2xl p-3.5 sm:p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-purple-200">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>
                  {language === "badini" ? "کاری بنێرە:" : "کارەکە ببینە:"}{" "}
                  <strong className="text-amber-300 text-sm font-black underline underline-offset-4">
                    « {breakdown.targetWord} »
                  </strong>
                </span>
              </span>
              <span className="text-[11px] font-mono text-purple-300">
                {assembledSteps.length} / {breakdown.steps.length}
              </span>
            </div>

            {/* Assembled Step Pills Row */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {breakdown.steps.map((step, idx) => {
                const isCompleted = idx < assembledSteps.length;
                const isCurrent = idx === activeStepIndex && !hasWon;

                return (
                  <React.Fragment key={idx}>
                    <motion.div
                      layout
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 border-2 ${
                        isCompleted
                          ? "bg-amber-400 text-slate-950 border-amber-300 shadow-xs"
                          : isCurrent
                          ? "bg-purple-800/90 text-amber-200 border-amber-400 border-dashed animate-pulse ring-2 ring-amber-400/30"
                          : "bg-purple-900/50 text-purple-400 border-purple-800/60"
                      }`}
                    >
                      <span>
                        {isCompleted
                          ? step.segment
                          : `( ${idx + 1} ) ؟`}
                      </span>
                      {isCompleted && (
                        <Check className="w-3 h-3 text-slate-950 stroke-[3]" />
                      )}
                    </motion.div>
                    {idx < breakdown.steps.length - 1 && (
                      <span className="text-amber-400 font-bold font-mono text-xs">+</span>
                    )}
                  </React.Fragment>
                );
              })}

              <span className="text-amber-300 font-black font-mono text-sm">=</span>

              <span
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  hasWon
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30 border border-emerald-300"
                    : "bg-purple-900/60 text-purple-300 border border-purple-800"
                }`}
              >
                {hasWon ? currentResultTense : "..."}
              </span>
            </div>
          </div>

          {!hasWon ? (
            /* Active Question & Selectable Word Cards */
            <div className="space-y-3">
              {/* Prompt box */}
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-right">
                <span className="text-xs font-black text-purple-950 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[11px] font-black">
                    {activeStepIndex + 1}
                  </span>
                  <span>
                    {language === "badini" ? "کیژ پارچەیا کارێ سەری دەستنیشان دکەت بۆ:" : "کامیان دیاری دەکات بۆ:"}{" "}
                    <strong className="text-purple-900 text-xs sm:text-sm bg-amber-200 px-2 py-0.5 rounded-md">
                      «{" "}
                      {language === "badini"
                        ? currentTargetStep?.roleBadini
                        : currentTargetStep?.roleKu}{" "}
                      »
                    </strong>
                  </span>
                </span>

                {/* Wrong feedback hint */}
                <AnimatePresence>
                  {wrongFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="mt-2 p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-bold"
                    >
                      {wrongFeedback}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Word piece cards to click */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {pieces.map((p) => {
                  const isUsed = assembledSteps.some(
                    (a) => a.originalIdx === p.originalIdx
                  );
                  const isShaking = shakingPiece === p.segment;

                  return (
                    <motion.button
                      key={p.originalIdx}
                      type="button"
                      disabled={isUsed}
                      onClick={() => handleSelectPiece(p)}
                      animate={
                        isShaking
                          ? { x: [-6, 6, -6, 6, 0] }
                          : isUsed
                          ? { scale: 0.9, opacity: 0.35 }
                          : { scale: 1, opacity: 1 }
                      }
                      transition={{ duration: 0.25 }}
                      className={`px-4 py-2.5 rounded-2xl font-black text-sm border-2 transition-all cursor-pointer active:scale-95 flex items-center gap-2 shadow-xs ${
                        isUsed
                          ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                          : isShaking
                          ? "bg-rose-500 text-white border-rose-600 shadow-md"
                          : "bg-white hover:bg-purple-50 text-purple-950 border-purple-300 hover:border-purple-500 hover:shadow-sm"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>{p.segment}</span>
                    </motion.button>
                  );
                })}

                <button
                  type="button"
                  onClick={handleAutoSolve}
                  className="px-3 py-2 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold border border-purple-200 cursor-pointer active:scale-95"
                >
                  {language === "badini" ? "چێکرنا خێرا ⚡" : "دروستکردنی خێرا ⚡"}
                </button>
              </div>
            </div>
          ) : (
            /* 🏆 VICTORY & GOLDEN EXAM MEMORY RULE 🏆 */
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="p-4 rounded-2xl bg-gradient-to-r from-amber-100 via-amber-50 to-emerald-50 border-2 border-amber-300 shadow-sm space-y-2.5 text-right"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-xs">
                    <Sparkles className="w-4 h-4 fill-slate-950" />
                  </span>
                  <span className="font-black text-xs sm:text-sm text-amber-950">
                    {language === "badini"
                      ? "🎉 ئافەریم! تە یاسایا دروست پێکڤە بەست:"
                      : "🎉 دەستخۆش! یاساکەت بە دروستی پێکەوە بەست:"}
                  </span>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center gap-1 shadow-xs">
                  <Check className="w-3.5 h-3.5" />
                  {language === "badini" ? "١٠٠٪ دروست" : "١٠٠٪ تەواو"}
                </span>
              </div>

              {/* The Golden Memory Rule */}
              <div className="p-3 bg-white rounded-xl border border-amber-300 shadow-xs">
                <p className="text-xs sm:text-sm font-extrabold text-amber-950 leading-relaxed">
                  {currentMemoryHook}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-amber-900 font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  {language === "badini"
                    ? "مەرجا مسۆگەر یا ئەزموونا وەزارییا پۆلا ١٢"
                    : "مەرجی مسۆگەری تاقیکردنەوەی وزاریی پۆلی ١٢"}
                </span>

                <button
                  type="button"
                  onClick={handleResetGame}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition cursor-pointer active:scale-95 shadow-xs"
                >
                  {language === "badini" ? "دووبارە یاری بکە" : "دووبارە یاری بکە"}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        /* Direct Rule View Toggle */
        <div className="p-3 bg-white rounded-2xl border border-amber-300 space-y-1.5 text-right">
          <div className="flex items-center gap-1.5 text-amber-900 font-black text-xs">
            <KeyRound className="w-3.5 h-3.5 text-amber-600" />
            <span>
              {language === "badini"
                ? "نەخشەیا مێشکی بۆ بیردانکا درێژخایەن:"
                : "نەخشەی مێشک بۆ بیرگەی درێژخایەن:"}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-extrabold text-slate-800 leading-relaxed">
            {currentMemoryHook}
          </p>
        </div>
      )}
    </div>
  );
};

export const AnimatedGrammarBreakdown: React.FC<AnimatedGrammarBreakdownProps> = ({
  breakdown,
  language,
  isWrong = false,
}) => {
  // View mode: "stepper" (interactive step-by-step) or "overview" (full formula & map)
  const [viewMode, setViewMode] = useState<"stepper" | "overview">("stepper");
  const [showGameManual, setShowGameManual] = useState<boolean>(false);

  // Total steps = breakdown.steps.length (segments) + 1 (final conclusion step)
  const totalSteps = breakdown.steps.length + 1;
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedOverviewIndex, setSelectedOverviewIndex] = useState<number | null>(null);
  const [isExtractingDown, setIsExtractingDown] = useState<boolean>(false);

  // Auto-play interval timer
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2800);
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPlaying, totalSteps]);

  // Reset to first step whenever target word changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setSelectedOverviewIndex(null);
    setIsExtractingDown(true);
    const timer = setTimeout(() => setIsExtractingDown(false), 900);
    return () => clearTimeout(timer);
  }, [breakdown.targetWord]);

  const handleNext = () => {
    setIsPlaying(false);
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setIsPlaying(true);
    setIsExtractingDown(true);
    setTimeout(() => setIsExtractingDown(false), 800);
  };

  const handleStepClick = (idx: number) => {
    setIsPlaying(false);
    setCurrentStepIndex(idx);
  };

  // Clean & silent sentence drop animation trigger (No sound)
  const triggerSentenceExtraction = () => {
    setIsExtractingDown(true);
    setTimeout(() => setIsExtractingDown(false), 600);
  };

  const isFinalStep = currentStepIndex === totalSteps - 1;
  const activeSegment = !isFinalStep ? breakdown.steps[currentStepIndex] : null;

  const currentSentence =
    language === "badini"
      ? breakdown.sentenceBadini || breakdown.sentenceKu || `کارێ ڕستێ: « ${breakdown.targetWord} »`
      : breakdown.sentenceKu || breakdown.sentenceBadini || `کاری ڕستەکە: « ${breakdown.targetWord} »`;

  const currentResultTense =
    language === "badini"
      ? breakdown.resultTenseBadini
      : breakdown.resultTenseKu;

  const currentVerbRoot =
    language === "badini"
      ? breakdown.verbRootBadini
      : breakdown.verbRootKu;

  const currentSummaryRule =
    language === "badini"
      ? breakdown.summaryRuleBadini
      : breakdown.summaryRuleKu;

  const currentMemoryHook =
    language === "badini"
      ? breakdown.memoryHookBadini || "💡 یاسایا زێڕین: [نیشانا دە] + [قەدی بوری] = بێ گومان دبیتە بوریێ بەردەوامی ڕاگەهاندن!"
      : breakdown.memoryHookKu || "💡 یاسا: [دە] + [قەدی ڕابردوو] = هەمیشە بوریی بەردەوامی ڕاگەهاندنە!";

  // Teacher speech text reacting to the active step
  const getTeacherSpeechText = (): string => {
    if (isFinalStep) {
      return language === "badini"
        ? `ئافەریم! ڕێژە بوو: ${currentResultTense} 🎉`
        : `ئافەرین! بووە: ${currentResultTense} 🎉`;
    }
    if (activeSegment) {
      const role = language === "badini" ? activeSegment.roleBadini : activeSegment.roleKu;
      return `«${activeSegment.segment}» ⬅️ ${role}`;
    }
    return language === "badini" ? "سەحکە شیکارییێ!" : "سەیری شیکارییەکە بکە!";
  };

  // Color mappings for segment badges
  const getSegmentColorStyle = (color?: string, isCurrent = false, isPassed = false) => {
    if (isCurrent) {
      switch (color) {
        case "blue":
          return "bg-gradient-to-b from-sky-500 via-blue-600 to-indigo-700 text-white border-sky-300 ring-4 ring-sky-300/60 shadow-lg shadow-blue-500/40";
        case "amber":
          return "bg-gradient-to-b from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-black border-white ring-4 ring-amber-300/70 shadow-lg shadow-amber-500/50";
        case "purple":
          return "bg-gradient-to-b from-purple-500 via-fuchsia-600 to-purple-800 text-white border-purple-300 ring-4 ring-purple-300/60 shadow-lg shadow-purple-500/40";
        case "emerald":
          return "bg-gradient-to-b from-emerald-400 via-teal-600 to-emerald-700 text-white border-emerald-300 ring-4 ring-emerald-300/60 shadow-lg shadow-emerald-500/40";
        case "rose":
          return "bg-gradient-to-b from-rose-500 via-pink-600 to-red-700 text-white border-rose-300 ring-4 ring-rose-300/60 shadow-lg shadow-rose-500/40";
        default:
          return "bg-gradient-to-b from-indigo-500 via-purple-600 to-purple-800 text-white border-indigo-300 ring-4 ring-indigo-300/60 shadow-lg shadow-purple-500/40";
      }
    }

    if (isPassed) {
      return "bg-emerald-900/60 text-emerald-300 border-emerald-500/60 hover:bg-emerald-800/80 shadow-xs";
    }

    // Default Inactive
    return "bg-purple-950/70 text-purple-200 border-purple-800/80 hover:bg-purple-900/80 shadow-xs";
  };

  return (
    <div
      dir="rtl"
      className="w-full bg-gradient-to-br from-[#ffffff] via-[#faf5ff] to-[#f3e8ff] text-slate-900 rounded-3xl p-3.5 sm:p-5 shadow-2xl shadow-purple-950/10 border-2 border-purple-200/90 space-y-3.5 relative overflow-hidden"
    >
      {/* 🌟 1. TOP HEADER & EDUCATIONAL TITLE BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-200/80 pb-3 relative z-10">
        {/* Title and Root Verb Badge */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-500/25 ring-2 ring-amber-200 shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="overflow-hidden min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm sm:text-base font-black text-purple-950 truncate">
                {language === "badini"
                  ? "تاقیگەها ڕێزمانی و شڕۆڤەکرنا کاری"
                  : language === "ku"
                  ? "تاقیگەی ڕێزمان و شیکردنەوەی کار"
                  : "Interactive Grammar & Morphology Lab"}
              </h4>
            </div>
            {currentVerbRoot && (
              <p className="text-[11px] sm:text-xs text-purple-800 font-bold truncate mt-0.5">
                {language === "badini" ? "چاوکێ بنەڕەتی: " : "چاوگی سەرەکی: "}
                <span className="text-purple-950 font-black px-2 py-0.5 rounded-lg bg-amber-200/90 border border-amber-300 text-amber-950">
                  {currentVerbRoot}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Top Control Bar: Playback Controls & View Mode Stepper vs Overview */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Play/Pause & Restart Controls moved to TOP */}
          <div className="flex items-center gap-1 bg-purple-100/90 p-1 rounded-2xl border border-purple-200 shadow-xs shrink-0">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer active:scale-95 ${
                isPlaying
                  ? "bg-amber-400 text-slate-950 shadow-sm font-black"
                  : "bg-purple-700 hover:bg-purple-800 text-white shadow-sm"
              }`}
              title={
                isPlaying
                  ? language === "badini" ? "راگرتن" : "وەستاندن"
                  : language === "badini" ? "پێکرنا ئۆتۆماتیکی" : "پێکردنی ئۆتۆماتیکی"
              }
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>
                {isPlaying
                  ? language === "badini" ? "راگرتن" : "وەستاندن"
                  : language === "badini" ? "لێدان" : "لێدان"}
              </span>
            </button>

            <button
              type="button"
              onClick={handleRestart}
              className="p-1.5 rounded-xl bg-white hover:bg-purple-50 text-purple-900 border border-purple-200 transition cursor-pointer active:scale-95 shadow-2xs"
              title={language === "badini" ? "دووبارە ژ دەستپێکێ" : "دووبارە لە سەرەتاوە"}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* View Mode Stepper vs Overview Toggle */}
          <div className="flex items-center gap-1 bg-purple-100/80 p-1 rounded-2xl border border-purple-200 shadow-xs shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("stepper")}
              className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer active:scale-95 ${
                viewMode === "stepper"
                  ? "bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-sm shadow-purple-700/30"
                  : "text-purple-700 hover:text-purple-950"
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>{language === "badini" ? "پێنگاڤ ب پێنگاڤ" : "هەنگاو بە هەنگاو"}</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("overview")}
              className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer active:scale-95 ${
                viewMode === "overview"
                  ? "bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-sm shadow-purple-700/30"
                  : "text-purple-700 hover:text-purple-950"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{language === "badini" ? "نەخشەیا گشتی" : "نەخشەی گشتی"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🌟 2. SENTENCE DISPLAY WITH DIRECT SEGMENT CONTROL 🌟 */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base font-black text-purple-950 bg-white/95 p-3 sm:p-4 rounded-2xl border border-purple-200 shadow-xs">
          {(() => {
            const parts = currentSentence ? currentSentence.split(breakdown.targetWord) : ["", ""];
            return (
              <>
                {parts[0] && (
                  <span className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-900 border border-purple-100 font-bold">
                    {parts[0].trim()}
                  </span>
                )}

                {/* 🌟 Clean & Minimalist Interactive Segmented Verb + Result Pill 🌟 */}
                <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-purple-100/90 border border-purple-200 shadow-2xs">
                  {breakdown.steps.map((step, sIdx) => {
                    const isCurrent = currentStepIndex === sIdx;
                    const isPassed = currentStepIndex > sIdx;

                    return (
                      <button
                        key={sIdx}
                        type="button"
                        onClick={() => handleStepClick(sIdx)}
                        className={`px-3 py-1.5 rounded-lg font-black text-sm transition-all duration-150 cursor-pointer active:scale-95 ${
                          isCurrent
                            ? "bg-amber-400 text-slate-950 shadow-xs font-black"
                            : isPassed
                            ? "bg-purple-200/80 text-purple-950 hover:bg-purple-300/80"
                            : "text-purple-800 hover:bg-purple-200/60"
                        }`}
                        title={`${step.segment}: ${language === "badini" ? step.roleBadini : step.roleKu}`}
                      >
                        <span>{step.segment}</span>
                      </button>
                    );
                  })}

                  {/* Integrated Result Step Trigger */}
                  <button
                    type="button"
                    onClick={() => handleStepClick(totalSteps - 1)}
                    className={`px-2.5 py-1.5 rounded-lg font-black text-xs transition-all duration-150 cursor-pointer flex items-center gap-1 active:scale-95 ${
                      isFinalStep
                        ? "bg-emerald-500 text-white shadow-xs"
                        : "text-emerald-800 hover:bg-emerald-100/70"
                    }`}
                    title={language === "badini" ? "شیکاریا گشتی و ئەنجام" : "شیکاریی گشتی و ئەنجام"}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{language === "badini" ? "ئەنجام" : "ئەنجام"}</span>
                  </button>
                </div>

                {parts[1] && (
                  <span className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-900 border border-purple-100 font-bold">
                    {parts[1].trim()}
                  </span>
                )}
              </>
            );
          })()}
        </div>
      </div>

      {/* 🌟 3. MODE 1: INTERACTIVE STEP-BY-STEP WORKBENCH 🌟 */}
      {viewMode === "stepper" && (
        <div className="space-y-3.5 relative z-10">
          {/* Center Stage: Interactive Blackboard with Teacher Mascot */}
          <div className="bg-gradient-to-br from-[#240d4f] via-[#33085a] to-[#170e3b] text-white rounded-3xl p-4 sm:p-5 border-2 border-purple-400/40 shadow-2xl relative flex flex-col sm:flex-row items-center gap-4">
            {/* Teacher Mascot with Pointer Stick */}
            <div className="shrink-0 flex flex-col items-center justify-center">
              <TeacherMascotPointer
                size={115}
                isTeaching={true}
                speechText={getTeacherSpeechText()}
                stepIndex={currentStepIndex}
              />
              <span className="mt-1 px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 font-black text-[10px] tracking-wide">
                {language === "badini" ? "مامۆستایێ ڕێزمانی" : "مامۆستای ڕێزمان"}
              </span>
            </div>

            {/* Blackboard Explanation Content */}
            <div className="flex-1 w-full min-w-0 space-y-3.5">
              {/* Active Step / Conclusion Display */}
              <AnimatePresence mode="wait">
                {!isFinalStep && activeSegment ? (
                  <motion.div
                    key={`step-card-${currentStepIndex}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="space-y-3"
                  >
                    {/* Active Working Segment Banner (Clean, Modern & Elegant) */}
                    <div className="bg-white/[0.07] backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-purple-300/20 shadow-md space-y-3">
                      {/* Top Header: Word Segment + Role & Step Indicator */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5">
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Vibrant Word Segment Chip */}
                          <div className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-black text-lg sm:text-xl shadow-md border border-amber-200/80 shrink-0">
                            {activeSegment.segment}
                          </div>

                          {/* Role Tag & Name */}
                          <div className="space-y-0.5 min-w-0">
                            <span className="text-[11px] text-amber-300/90 font-bold block">
                              {language === "badini" ? "دەستنیشانکرنا بەشی:" : "دەستنیشانکردنی بەش:"}
                            </span>
                            <span className="text-sm sm:text-base font-black text-white block break-words">
                              {language === "badini"
                                ? activeSegment.roleBadini
                                : activeSegment.roleKu}
                            </span>
                          </div>
                        </div>

                        {/* Step Pill */}
                        <div className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-300/30 text-purple-200 text-xs font-bold shrink-0">
                          {language === "badini"
                            ? `پێنگاڤا ${currentStepIndex + 1} ژ ${totalSteps}`
                            : `هەنگاوی ${currentStepIndex + 1} لە ${totalSteps}`}
                        </div>
                      </div>

                      {/* Clean & Elegant Explanation Box */}
                      <div className="bg-purple-950/50 rounded-xl p-3 sm:p-3.5 border border-purple-400/20 text-xs sm:text-sm text-purple-100 font-medium leading-relaxed">
                        {language === "badini"
                          ? activeSegment.descriptionBadini
                          : activeSegment.descriptionKu}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* 🏆 FINAL STEP: CONCLUSION & COMPLETE FORMULA */
                  <motion.div
                    key="step-final-card"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="space-y-3.5 text-center"
                  >
                    <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-emerald-500/25 border border-emerald-400/60 text-emerald-300 text-xs font-black mx-auto">
                      <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                      <span>
                        {language === "badini"
                          ? "ئەنجامێ تێروتەسەل و دەستنیشانکرنا ڕێژەیێ"
                          : "ئەنجامی تەواو و دەستنیشانکردنی ڕێژەکە"}
                      </span>
                    </div>

                    {/* Assembled Equation */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                      {breakdown.steps.map((s, i) => (
                        <React.Fragment key={i}>
                          <span className="px-3 py-1.5 rounded-xl bg-purple-900 border border-purple-400/60 text-white font-black text-xs sm:text-sm shadow-xs">
                            {s.segment}
                          </span>
                          {i < breakdown.steps.length - 1 && (
                            <span className="text-amber-400 font-bold font-mono text-base">+</span>
                          )}
                        </React.Fragment>
                      ))}
                      <span className="text-amber-300 font-black font-mono text-lg mx-1">=</span>
                      <span className="px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-black text-sm sm:text-base shadow-xl shadow-emerald-500/30 border-2 border-emerald-300">
                        {currentResultTense}
                      </span>
                    </div>

                    {/* Summary Rule Box */}
                    {currentSummaryRule && (
                      <div className="p-3 bg-purple-950/80 rounded-2xl border border-amber-400/40 text-right text-xs sm:text-sm text-purple-100 font-bold leading-relaxed">
                        <span className="text-amber-300 font-black block mb-1">
                          {language === "badini" ? "یاسایا دەرهێنانێ:" : "یاسای دەرهێنان:"}
                        </span>
                        {currentSummaryRule}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 🌟 4. INTERACTIVE GRAMMAR FORMULA MINI-GAME OR CLEAN MEMORY HOOK 🌟 */}
          {isWrong || showGameManual ? (
            <GrammarFormulaGame
              breakdown={breakdown}
              language={language}
              currentResultTense={currentResultTense}
              currentMemoryHook={currentMemoryHook}
              isWrong={isWrong}
            />
          ) : (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-purple-600/10 to-indigo-600/15 border-2 border-amber-400/60 shadow-sm flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-500/20 shrink-0 mt-0.5">
                  <BrainCircuit className="w-5 h-5" />
                </div>

                <div className="space-y-1 min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-extrabold text-slate-800 leading-relaxed">
                    {currentMemoryHook}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowGameManual(true)}
                className="px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 border border-purple-300 text-purple-950 text-xs font-black flex items-center gap-1.5 shrink-0 transition cursor-pointer active:scale-95 shadow-xs"
              >
                <Gamepad2 className="w-4 h-4 text-purple-700" />
                <span>{language === "badini" ? "یارییا کاری 🎮" : "یاریی کار 🎮"}</span>
              </button>
            </div>
          )}

          {/* Stepper Navigation Controls Bar (Previous & Next) */}
          <div className="flex items-center justify-between gap-3 pt-1">
            {/* Previous Step Button */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className={`flex-1 max-w-[200px] py-2.5 px-4 rounded-2xl border-b-4 text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 transition cursor-pointer active:translate-y-1 ${
                currentStepIndex === 0
                  ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed border-b-2 opacity-60"
                  : "bg-purple-100 hover:bg-purple-200 border-purple-300 text-purple-950 shadow-xs"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
              <span>{language === "badini" ? "پێنگاڤا پێشتر" : "هەنگاوی پێشوو"}</span>
            </button>

            {/* Next Step Button */}
            <button
              type="button"
              onClick={handleNext}
              disabled={currentStepIndex === totalSteps - 1}
              className={`flex-1 max-w-[220px] py-2.5 px-4 sm:px-5 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 transition cursor-pointer active:translate-y-1 ${
                currentStepIndex === totalSteps - 1
                  ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed border-b-2 opacity-60"
                  : "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 border-b-4 border-amber-700 shadow-lg shadow-amber-500/25"
              }`}
            >
              <span>{language === "badini" ? "پێنگاڤا داهاتی" : "هەنگاوی دواتر"}</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 🌟 4. MODE 2: FULL OVERVIEW INTERACTIVE FORMULA MAP 🌟 */}
      {viewMode === "overview" && (
        <div className="space-y-4 relative z-10">
          <div className="bg-gradient-to-br from-[#240d4f] via-[#33085a] to-[#170e3b] text-white rounded-3xl p-4 sm:p-5 border-2 border-purple-400/40 shadow-2xl space-y-3.5 text-center">
            {/* Target word in overview */}
            <div className="inline-flex items-center gap-2 bg-purple-900/80 px-4 py-1.5 rounded-2xl border border-amber-400/50 mb-1">
              <span className="text-xs text-purple-200 font-extrabold">
                {language === "badini" ? "کارێ سەرەکی:" : "کاری سەرەکی:"}
              </span>
              <span className="font-black text-amber-300 text-sm sm:text-base">
                «{breakdown.targetWord}»
              </span>
            </div>

            <span className="text-xs text-purple-200 font-extrabold block">
              {language === "badini"
                ? "ل سەر هەر پارچەیەکێ کلیک بکە بۆ دیتنا شڕۆڤەکرنێ:"
                : "لەسەر هەر پارچەیەک کلیک بکە بۆ بینینی شیکردنەوەکە:"}
            </span>

            {/* Formula Block Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {breakdown.steps.map((step, idx) => {
                const isSelected = selectedOverviewIndex === idx;
                const isLast = idx === breakdown.steps.length - 1;

                return (
                  <React.Fragment key={idx}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedOverviewIndex(isSelected ? null : idx);
                      }}
                      className={`p-2.5 sm:p-3 px-3.5 sm:px-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer active:scale-95 ${
                        isSelected
                          ? "bg-amber-400 text-slate-950 font-black border-white ring-4 ring-amber-300 shadow-lg shadow-amber-500/40 scale-105"
                          : "bg-purple-900/70 text-purple-100 border-purple-700 hover:bg-purple-800"
                      }`}
                    >
                      <span className="font-black text-sm sm:text-base tracking-wide">
                        {step.segment}
                      </span>
                      <span className="text-[10px] font-extrabold opacity-90 block mt-0.5">
                        {language === "badini" ? step.roleBadini : step.roleKu}
                      </span>
                    </button>

                    {!isLast && (
                      <span className="text-amber-400 font-black text-lg font-mono">
                        +
                      </span>
                    )}
                  </React.Fragment>
                );
              })}

              <span className="text-amber-300 font-black text-lg font-mono mx-0.5">
                =
              </span>

              {/* Result Pill */}
              <div className="p-2.5 sm:p-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-500/30 border-2 border-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-200 fill-amber-200" />
                <span>{currentResultTense}</span>
              </div>
            </div>

            {/* Detail Drawer for Clicked Segment */}
            <AnimatePresence mode="wait">
              {selectedOverviewIndex !== null &&
                breakdown.steps[selectedOverviewIndex] && (
                  <motion.div
                    key={`overview-detail-${selectedOverviewIndex}`}
                    initial={{ opacity: 0, height: 0, y: 8 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: 8 }}
                    className="mt-3 p-3.5 bg-white/10 backdrop-blur-md border border-amber-400/40 rounded-2xl text-right text-xs sm:text-sm space-y-1 shadow-inner"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-amber-300 text-xs sm:text-sm flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-300" />
                        <span>
                          بەشێ «{breakdown.steps[selectedOverviewIndex].segment}»:{" "}
                          {language === "badini"
                            ? breakdown.steps[selectedOverviewIndex].roleBadini
                            : breakdown.steps[selectedOverviewIndex].roleKu}
                        </span>
                      </span>
                      <span className="text-[10px] text-purple-200 font-extrabold">
                        {language === "badini" ? "شیکارییا تێرۆتەسەل" : "شیکاریی تەواو"}
                      </span>
                    </div>
                    <p className="text-purple-100 font-bold text-xs sm:text-sm leading-relaxed pt-0.5">
                      {language === "badini"
                        ? breakdown.steps[selectedOverviewIndex].descriptionBadini
                        : breakdown.steps[selectedOverviewIndex].descriptionKu}
                    </p>
                  </motion.div>
                )}
            </AnimatePresence>
          </div>

          {/* 🌟 Mini-Game & Long-Term Memory Hook in Overview 🌟 */}
          {isWrong || showGameManual ? (
            <GrammarFormulaGame
              breakdown={breakdown}
              language={language}
              currentResultTense={currentResultTense}
              currentMemoryHook={currentMemoryHook}
              isWrong={isWrong}
            />
          ) : (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50 border-2 border-amber-300/80 shadow-xs flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-xs shrink-0 mt-0.5">
                  <BrainCircuit className="w-5 h-5 text-slate-950" />
                </div>
                <div className="space-y-1 flex-1 min-w-0">
                  <span className="text-xs font-black text-amber-950 block">
                    {language === "badini"
                      ? "یاسایا بیردانکا درێژخایەن (پۆلا ١٢):"
                      : "یاسای بیرگەی درێژخایەن (پۆلی ١٢):"}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-amber-900 leading-relaxed">
                    {currentMemoryHook}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowGameManual(true)}
                className="px-3 py-1.5 rounded-xl bg-amber-200 hover:bg-amber-300 border border-amber-400 text-amber-950 text-xs font-black flex items-center gap-1.5 shrink-0 transition cursor-pointer active:scale-95 shadow-xs"
              >
                <Gamepad2 className="w-4 h-4 text-amber-900" />
                <span>{language === "badini" ? "یاری 🎮" : "یاری 🎮"}</span>
              </button>
            </div>
          )}

          {/* Summary Pedagogical Rule */}
          {currentSummaryRule && (
            <div className="p-3.5 bg-white rounded-2xl border-2 border-purple-200 text-xs sm:text-sm text-slate-800 font-extrabold flex items-start gap-3 shadow-xs leading-relaxed">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-purple-950 font-black block text-xs mb-0.5">
                  {language === "badini" ? "یاسایا فێربوونێ:" : "یاسای فێربوون:"}
                </span>
                <p className="text-slate-700 text-xs sm:text-sm font-bold">
                  {currentSummaryRule}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
