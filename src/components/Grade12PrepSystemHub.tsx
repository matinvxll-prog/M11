import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Clock,
  CheckSquare,
  Award,
  Zap,
  BookOpen,
  FileText,
  Video,
  FileDown,
  Volume2,
  Sparkles,
  MessageSquare,
  HelpCircle,
  Target,
  Users,
  BarChart2,
  Bell,
  Heart,
  Search,
  Plus,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Brain,
  ShieldCheck,
  Star,
  Bookmark,
  Share2,
  Download,
  Activity,
  Layers
} from "lucide-react";
import { Language, UserProfile } from "../types";

interface Grade12PrepSystemHubProps {
  user: UserProfile;
  language: Language;
  isDarkMode?: boolean;
  onOpenAiTutor: () => void;
  onStartQuiz: (subjectId: string) => void;
  onOpenPdfLibrary: () => void;
  onOpenVideoLessons: () => void;
  onClaimDailyReward?: () => void;
}

export const Grade12PrepSystemHub: React.FC<Grade12PrepSystemHubProps> = ({
  user,
  language,
  isDarkMode = false,
  onOpenAiTutor,
  onStartQuiz,
  onOpenPdfLibrary,
  onOpenVideoLessons
}) => {
  const isBadini = language === "badini";

  const [activeSection, setActiveSection] = useState<
    "overview" | "studyHub" | "exams" | "analytics" | "aiTeacher" | "library" | "challenges" | "community" | "calendar"
  >("overview");

  // Module 1: Study Hub - Pomodoro Timer State
  const [pomoMinutes, setPomoMinutes] = useState(25);
  const [pomoSeconds, setPomoSeconds] = useState(0);
  const [isPomoRunning, setIsPomoRunning] = useState(false);
  const [pomoMode, setPomoMode] = useState<"work" | "break">("work");

  // Module 1: Task Checklist
  const [tasks, setTasks] = useState<{ id: string; text: string; completed: boolean }[]>([]);
  const [newTaskText, setNewTaskText] = useState("");

  // Pomodoro countdown timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPomoRunning) {
      timer = setInterval(() => {
        if (pomoSeconds > 0) {
          setPomoSeconds((prev) => prev - 1);
        } else if (pomoMinutes > 0) {
          setPomoMinutes((prev) => prev - 1);
          setPomoSeconds(59);
        } else {
          setIsPomoRunning(false);
          if (pomoMode === "work") {
            setPomoMode("break");
            setPomoMinutes(5);
            alert(isBadini ? "دەمێ بێهنڤەدانێ دەستپێکر! (5 خولەک)" : "کاتی پشوو دەستی پێکرد! (5 خولەک)");
          } else {
            setPomoMode("work");
            setPomoMinutes(25);
            alert(isBadini ? "دەمێ خویندنێ زڤڕی! (25 خولەک)" : "کاتی خوێندن دەستی پێکردەوە!");
          }
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPomoRunning, pomoMinutes, pomoSeconds, pomoMode, isBadini]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks((prev) => [...prev, { id: Date.now().toString(), text: newTaskText.trim(), completed: false }]);
    setNewTaskText("");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Grade 12 Subjects (Module 14)
  const g12Subjects = [
    { id: "math", name: isBadini ? "بیرکاری" : "بیرکاری", code: "MATH", color: "from-purple-600 to-indigo-600", progress: 65, lessonsCount: 12, nextLesson: "جیاکاری و تەواوکاری (Calculus)" },
    { id: "physics", name: isBadini ? "فیزیا" : "فیزیا", code: "PHYS", color: "from-blue-600 to-cyan-600", progress: 80, lessonsCount: 14, nextLesson: "شەپۆل و دەنگ (Waves & Sound)" },
    { id: "chemistry", name: isBadini ? "کیمیا" : "کیمیا", code: "CHEM", color: "from-emerald-600 to-teal-600", progress: 75, lessonsCount: 10, nextLesson: "هاوسەنگیی کیمیایی (Chemical Equilibrium)" },
    { id: "biology", name: isBadini ? "زیندەوەرناسی" : "زیندەزانی", code: "BIOL", color: "from-rose-600 to-pink-600", progress: 90, lessonsCount: 16, nextLesson: "سیتۆپلازم و کۆنترۆڵ (Cell Control)" },
    { id: "kurdish", name: isBadini ? "کوردی" : "کوردی", code: "KURD", color: "from-amber-600 to-orange-600", progress: 88, lessonsCount: 8, nextLesson: "ڕێزمان و ڕەوانبێژی" },
    { id: "english", name: isBadini ? "ئینگلیزی" : "ئینگلیزی", code: "ENG", color: "from-indigo-600 to-violet-600", progress: 82, lessonsCount: 12, nextLesson: "Grammar & Unit 5 Reading" }
  ];

  // Simulated 30-day heatmap activity data (Module 13)
  const heatmapData = Array.from({ length: 28 }, (_, i) => ({
    day: i + 1,
    intensity: i % 7 === 0 ? 0 : i % 5 === 0 ? 1 : i % 3 === 0 ? 2 : 3
  }));

  return (
    <div className="space-y-6">
      {/* SYSTEM SECTION NAV TABS - Modern Segmented Bar */}
      <div className={`flex items-center overflow-x-auto no-scrollbar gap-2 p-2 rounded-2xl md:rounded-full transition-all ${
        isDarkMode
          ? "bg-[#101226]/90 border border-purple-500/30 shadow-xl backdrop-blur-md"
          : "bg-white/90 border border-purple-200 shadow-md backdrop-blur-md"
      }`}>
        {[
          { id: "overview", labelBadini: "داشبۆردێ گشتی", labelKu: "داشبۆردی گشتی", icon: Zap, color: "text-amber-500" },
          { id: "studyHub", labelBadini: "ناوەندا خویندنێ & تایمەر", labelKu: "ناوەندی خوێندن", icon: Clock, color: "text-cyan-500" },
          { id: "exams", labelBadini: "ئەزموونێن وزاری & Quizzes", labelKu: "تاقیکردنەوە و ڕاهێنان", icon: FileText, color: "text-emerald-500" },
          { id: "analytics", labelBadini: "داتای پێشکەوتنێ", labelKu: "ئامار و پێشکەوتن", icon: BarChart2, color: "text-purple-500" },
          { id: "aiTeacher", labelBadini: "مامۆستایێ ژیری AI", labelKu: "مامۆستای AI", icon: Brain, color: "text-rose-500" },
          { id: "library", labelBadini: "کتێبخانە (PDF/ڤیدیۆ)", labelKu: "کتێبخانە", icon: BookOpen, color: "text-sky-500" },
        ].map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveSection(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl md:rounded-full text-xs font-black transition-all flex items-center gap-2 shrink-0 relative ${
                isActive
                  ? isDarkMode
                    ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-lg shadow-purple-600/30"
                    : "bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 text-white shadow-md shadow-purple-500/20"
                  : isDarkMode
                    ? "text-slate-300 hover:text-white hover:bg-white/5"
                    : "text-slate-700 hover:text-black hover:bg-purple-50"
              }`}
            >
              <IconComponent className={`w-4 h-4 ${isActive ? "text-white" : tab.color}`} />
              <span>{isBadini ? tab.labelBadini : tab.labelKu}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* SECTION CONTENTS */}
      <AnimatePresence mode="wait">
        {/* OVERVIEW SECTION: COMBINES MODULE 12 (QUICK ACTIONS), MODULE 11 (VOCAB/FORMULA OF THE DAY), MODULE 13 (HEATMAP), MODULE 14 (SUBJECT CARDS) */}
        {activeSection === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Module 12: Quick Actions Bar with Vibrant Generated Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Quiz Action */}
              <motion.button
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onStartQuiz("math")}
                className={`group rounded-2xl transition-all duration-300 text-right flex flex-col justify-between overflow-hidden shadow-lg ${
                  isDarkMode
                    ? "bg-[#16182e] border border-purple-500/30 hover:border-purple-500/60 hover:shadow-purple-600/20"
                    : "bg-white border border-purple-200 hover:shadow-xl"
                }`}
              >
                <div className="w-full h-32 relative overflow-hidden bg-gradient-to-br from-purple-900 to-indigo-950">
                  <img
                    src="/src/assets/images/quiz_exam_action_1785170806516.jpg"
                    alt="Quiz Prep"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16182e] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-purple-600/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition">
                    <Play className="w-4 h-4 fill-white" />
                  </div>
                </div>
                <div className="p-4 flex flex-col justify-between flex-1 w-full">
                  <div>
                    <h4 className={`text-sm font-black ${isDarkMode ? "text-white group-hover:text-purple-300" : "text-slate-900 group-hover:text-purple-700"} transition`}>
                      {isBadini ? "دەستپێکرنا Quiz" : "دەستپێکردنی Quiz"}
                    </h4>
                    <p className={`text-xs mt-1 font-semibold ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                      {isBadini ? "تستێن خیرایین وزاری" : "ڕاهێنانی خێرا"}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-end text-xs font-bold text-purple-400 group-hover:translate-x-[-4px] transition">
                    <span>{isBadini ? "دەستپێبکە" : "دەستپێبکە"}</span>
                    <ChevronRight className="w-4 h-4 rotate-180 ml-1" />
                  </div>
                </div>
              </motion.button>

              {/* Card 2: PDF Library Action */}
              <motion.button
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenPdfLibrary}
                className={`group rounded-2xl transition-all duration-300 text-right flex flex-col justify-between overflow-hidden shadow-lg ${
                  isDarkMode
                    ? "bg-[#16182e] border border-blue-500/30 hover:border-blue-500/60 hover:shadow-blue-600/20"
                    : "bg-white border border-purple-200 hover:shadow-xl"
                }`}
              >
                <div className="w-full h-32 relative overflow-hidden bg-gradient-to-br from-blue-900 to-cyan-950">
                  <img
                    src="/src/assets/images/pdf_library_action_1785170821609.jpg"
                    alt="PDF Library"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16182e] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-blue-600/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition">
                    <FileDown className="w-4 h-4" />
                  </div>
                </div>
                <div className="p-4 flex flex-col justify-between flex-1 w-full">
                  <div>
                    <h4 className={`text-sm font-black ${isDarkMode ? "text-white group-hover:text-blue-300" : "text-slate-900 group-hover:text-blue-700"} transition`}>
                      {isBadini ? "خویندنا PDF" : "خوێندنی PDF"}
                    </h4>
                    <p className={`text-xs mt-1 font-semibold ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                      {isBadini ? "مەلزەمە و پرسیار" : "مەلزەمەکانی پۆلی ۱۲"}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-end text-xs font-bold text-blue-400 group-hover:translate-x-[-4px] transition">
                    <span>{isBadini ? "ببینە" : "ببینە"}</span>
                    <ChevronRight className="w-4 h-4 rotate-180 ml-1" />
                  </div>
                </div>
              </motion.button>

              {/* Card 3: AI Tutor Action */}
              <motion.button
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenAiTutor}
                className={`group rounded-2xl transition-all duration-300 text-right flex flex-col justify-between overflow-hidden shadow-lg ${
                  isDarkMode
                    ? "bg-[#16182e] border border-rose-500/30 hover:border-rose-500/60 hover:shadow-rose-600/20"
                    : "bg-white border border-purple-200 hover:shadow-xl"
                }`}
              >
                <div className="w-full h-32 relative overflow-hidden bg-gradient-to-br from-rose-900 to-pink-950">
                  <img
                    src="/src/assets/images/ai_tutor_action_1785170838051.jpg"
                    alt="AI Tutor"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16182e] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-rose-600/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition">
                    <Brain className="w-4 h-4" />
                  </div>
                </div>
                <div className="p-4 flex flex-col justify-between flex-1 w-full">
                  <div>
                    <h4 className={`text-sm font-black ${isDarkMode ? "text-white group-hover:text-rose-300" : "text-slate-900 group-hover:text-rose-700"} transition`}>
                      {isBadini ? "چاتی مامۆستایێ AI" : "چاتی مامۆستای AI"}
                    </h4>
                    <p className={`text-xs mt-1 font-semibold ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                      {isBadini ? "پرسینا هەمی پسیاران" : "ڕوونکردنەوەی وەڵامەکان"}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-end text-xs font-bold text-rose-400 group-hover:translate-x-[-4px] transition">
                    <span>{isBadini ? "پسیار بکە" : "پرسیار بکە"}</span>
                    <ChevronRight className="w-4 h-4 rotate-180 ml-1" />
                  </div>
                </div>
              </motion.button>

              {/* Card 4: Study Notes Action */}
              <motion.button
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveSection("studyHub")}
                className={`group rounded-2xl transition-all duration-300 text-right flex flex-col justify-between overflow-hidden shadow-lg ${
                  isDarkMode
                    ? "bg-[#16182e] border border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-emerald-600/20"
                    : "bg-white border border-purple-200 hover:shadow-xl"
                }`}
              >
                <div className="w-full h-32 relative overflow-hidden bg-gradient-to-br from-emerald-900 to-teal-950">
                  <img
                    src="/src/assets/images/study_notes_action_1785170854740.jpg"
                    alt="Study Notes"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16182e] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-emerald-600/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition">
                    <CheckSquare className="w-4 h-4" />
                  </div>
                </div>
                <div className="p-4 flex flex-col justify-between flex-1 w-full">
                  <div>
                    <h4 className={`text-sm font-black ${isDarkMode ? "text-white group-hover:text-emerald-300" : "text-slate-900 group-hover:text-emerald-700"} transition`}>
                      {isBadini ? "تۆمارکرنا تێبینیان" : "تۆمارکردنی تێبینی"}
                    </h4>
                    <p className={`text-xs mt-1 font-semibold ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                      {isBadini ? "لیستا کارێن ئەڤڕۆ" : "لیستی کارەکان"}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-end text-xs font-bold text-emerald-400 group-hover:translate-x-[-4px] transition">
                    <span>{isBadini ? "تۆمار بکە" : "تۆمار بکە"}</span>
                    <ChevronRight className="w-4 h-4 rotate-180 ml-1" />
                  </div>
                </div>
              </motion.button>
            </div>

          </motion.div>
        )}

        {/* MODULE 1: STUDY HUB & POMODORO TAB */}
        {activeSection === "studyHub" && (
          <motion.div
            key="studyHub"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Pomodoro Timer */}
            <div className="p-6 rounded-3xl bg-[#12142d] border border-purple-500/30 space-y-6 text-center">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>{isBadini ? "تایمەرێ پۆمۆدۆرۆ (Pomodoro Study Timer)" : "تایمەری پۆمۆدۆرۆ"}</span>
                </h3>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                  {pomoMode === "work" ? "خویندن (25m)" : "بێهنڤەدان (5m)"}
                </span>
              </div>

              {/* Big Circular Display */}
              <div className="w-44 h-44 mx-auto rounded-full bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-4 border-cyan-500/40 flex flex-col items-center justify-center shadow-2xl">
                <span className="text-4xl font-black text-white tracking-widest font-mono">
                  {String(pomoMinutes).padStart(2, "0")}:{String(pomoSeconds).padStart(2, "0")}
                </span>
                <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider mt-1">
                  {isPomoRunning ? "تایمەر کار دکەت..." : "تایمەر وەستایە"}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsPomoRunning(!isPomoRunning)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/30 flex items-center gap-2 transition"
                >
                  {isPomoRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
                  <span>{isPomoRunning ? (isBadini ? "ڕاوەستاندنا تایمەری" : "وەستاندن") : (isBadini ? "دەستپێکرنا خویندنێ" : "دەستپێکردن")}</span>
                </button>

                <button
                  onClick={() => {
                    setIsPomoRunning(false);
                    setPomoMinutes(25);
                    setPomoSeconds(0);
                    setPomoMode("work");
                  }}
                  className="p-3 rounded-2xl bg-[#1c1e42] hover:bg-[#252857] text-slate-300 border border-purple-500/20 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Task Checklist */}
            <div className="p-6 rounded-3xl bg-[#12142d] border border-purple-500/30 space-y-4">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                <span>{isBadini ? "لیستا بابەت و ئەرکێن ئەڤڕۆ (Daily Task Checklist)" : "لیستی کارەکانی ئەمڕۆ"}</span>
              </h3>

              <form onSubmit={handleAddTask} className="flex gap-2">
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder={isBadini ? "ئەرکەکێ نوو بۆ ئامادەکارییا وزاری تێبنووسە..." : "کارێکی نوێ زیاد بکە..."}
                  className="flex-1 bg-[#1a1c3b] border border-purple-500/30 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition"
                >
                  {isBadini ? "زێدەکرن" : "زیادکردن"}
                </button>
              </form>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {tasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => toggleTask(t.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      t.completed
                        ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-300 line-through opacity-70"
                        : "bg-[#1b1e42] border-purple-500/20 text-white hover:border-purple-500/50"
                    }`}
                  >
                    <span className="text-xs font-semibold">{t.text}</span>
                    <CheckCircle2 className={`w-4 h-4 ${t.completed ? "text-emerald-400" : "text-slate-600"}`} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* MODULE 2: SMART EXAMS TAB */}
        {activeSection === "exams" && (
          <motion.div
            key="exams"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-3xl bg-[#12142d] border border-purple-500/30 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    <span>{isBadini ? "بانکا تاقیکرنێن وزاری یێن سالێن بووری (Ministry Exams)" : "بانکی تاقیکردنەوەی وەزارەتی"}</span>
                  </h3>
                  <p className="text-xs text-purple-200/80 mt-1">
                    {isBadini ? "پرسیارێن سالێن ۲۰۲۴، ۲۰۲۳، ۲۰۲۲ ب بەرسڤێن دروست و کاتژمێرا ئاقڵانە." : "پرسیارەکانی ساڵانی ڕابردوو بە سیستەمی پێوەر و نمرەدان."}
                  </p>
                </div>

                <button
                  onClick={() => onStartQuiz("math")}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 transition flex items-center gap-2 shrink-0"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>{isBadini ? "دەستپێکرنا تاقیکرنا وەزارەتی کامل (Mock Exam)" : "دەستپێکردنی تاقیکردنەوەی گشتی"}</span>
                </button>
              </div>

              {/* Sample Ministry Papers List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-[#1b1e42] border border-purple-500/20 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">بیرکاری - خولی یەکەم ۲۰۲٤</h4>
                    <span className="text-[10px] text-slate-400">٥٠ پرسیار • ۱۲۰ خولەک</span>
                  </div>
                  <button
                    onClick={() => onStartQuiz("math")}
                    className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-200 font-bold text-xs transition"
                  >
                    حەلکرن
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#1b1e42] border border-purple-500/20 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">فیزیا - خولی دووەم ۲۰۲۳</h4>
                    <span className="text-[10px] text-slate-400">٥٠ پرسیار • ۱۲۰ خولەک</span>
                  </div>
                  <button
                    onClick={() => onStartQuiz("physics")}
                    className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-200 font-bold text-xs transition"
                  >
                    حەلکرن
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* MODULE 3: PERFORMANCE ANALYTICS TAB */}
        {activeSection === "analytics" && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Accuracy & Progress Overview */}
            <div className="p-6 rounded-3xl bg-[#12142d] border border-purple-500/30 space-y-4">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-purple-400" />
                <span>{isBadini ? "ڕێژەیا دروستییێ ل دیف بابەتان" : "ڕێژەی دروستی بەپێی بابەت"}</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-300">زیندەوەرناسی</span>
                    <span className="text-emerald-400">95% (بەهێزترین)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[95%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-300">بیرکاری</span>
                    <span className="text-purple-400">88% (باش)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full w-[88%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-300">فیزیا</span>
                    <span className="text-rose-400">68% (پێویست ب مەشقێ)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full w-[68%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Report Summary */}
            <div className="p-6 rounded-3xl bg-[#12142d] border border-purple-500/30 space-y-4">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>{isBadini ? "ڕاپۆرتا مەهانە یا ئامادەکارییا وزاری" : "ڕاپۆرتی مانگانەی ئامادەکاری"}</span>
              </h3>

              <div className="p-4 rounded-2xl bg-[#1b1e42] border border-purple-500/10 space-y-2 text-xs text-slate-300">
                <p>📈 <strong className="text-white">ئاستی گشتی:</strong> زۆر باش (Top 5% لە سەرانسەری هەرێم)</p>
                <p>⚡ <strong className="text-white">کۆی پرسیارە وەڵامدراوەکان:</strong> {user.questionsAnswered} پرسیار</p>
                <p>🎯 <strong className="text-white">ڕاسپاردە:</strong> لە بەشی فیزیادا زیاتر ڕاهێنان لەسەر یاسای کۆڵۆم و شەپۆلەکان بکە.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* MODULE 4: AI TEACHER TAB */}
        {activeSection === "aiTeacher" && (
          <motion.div
            key="aiTeacher"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 rounded-3xl bg-[#12142d] border border-purple-500/30 space-y-4 text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center text-white shadow-xl">
              <Brain className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-black text-white">{isBadini ? "مامۆستایێ ژیری دەستکرد بۆ پۆلا ۱۲" : "مامۆستای ژیری دەستکردی پۆلی ۱۲"}</h3>
              <p className="text-xs text-purple-200/80 mt-1 max-w-md mx-auto">
                {isBadini
                  ? "پرسیار بکە دەربارەی هەر وانەیەکێ وزاری، چارەسەری یاسایان، یان داوا بکە تاقیکردنەوەی تایبەتت بۆ دروست بکات!"
                  : "پرسیاڕ بپرسە دەربارەی هەموو وانەکان و داوای وەڵامی ورد بکە."}
              </p>
            </div>

            <button
              onClick={onOpenAiTutor}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-xl shadow-purple-600/30 transition transform hover:-translate-y-0.5"
            >
              🚀 {isBadini ? "دەستپێکرنا چاتێ لگەل مامۆستایێ AI" : "دەستپێکردنی گفتوگۆ لەگەڵ مامۆستا"}
            </button>
          </motion.div>
        )}

        {/* MODULE 5: LIBRARY TAB */}
        {activeSection === "library" && (
          <motion.div
            key="library"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <button
              onClick={onOpenPdfLibrary}
              className="p-6 rounded-3xl bg-[#12142d] border border-purple-500/30 hover:border-purple-500/60 text-right space-y-3 group transition"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:scale-110 transition">
                <FileDown className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white">{isBadini ? "کتێبخانەیا مەلزەمە و PDF" : "کتێبخانەی مەلزەمەکان"}</h4>
                <p className="text-xs text-slate-400 mt-1">{isBadini ? "داگرتن و خویندنا مەلزەمەیێن هەمی مامۆستایان" : "داگرتنی مەلزەمەکان"}</p>
              </div>
            </button>

            <button
              onClick={onOpenVideoLessons}
              className="p-6 rounded-3xl bg-[#12142d] border border-purple-500/30 hover:border-purple-500/60 text-right space-y-3 group transition"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400 group-hover:scale-110 transition">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white">{isBadini ? "ڤیدیۆ و وانەیێن تۆمارکری" : "ڤیدیۆ و وانە تۆمارکراوەکان"}</h4>
                <p className="text-xs text-slate-400 mt-1">{isBadini ? "سەحکرنا ڕوونکردنەوەیێن کامل یێن وانان" : "سەیری وانەکان بکە"}</p>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
