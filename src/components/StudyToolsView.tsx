import React, { useState, useEffect } from "react";
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Calendar as CalendarIcon,
  CheckSquare,
  Bookmark,
  Layers,
  FileCode,
  Sparkles,
  Plus,
  Trash2,
  Check,
  ChevronRight,
  Clock,
  Target,
  BookOpen,
  Award
} from "lucide-react";
import { Language } from "../types";

interface StudyToolsViewProps {
  language: Language;
  initialSubTab?: "pomodoro" | "calendar" | "todo" | "flashcards" | "formulas";
  isPlannerOnly?: boolean;
  onOpenStudyPlan?: () => void;
}

export const StudyToolsView: React.FC<StudyToolsViewProps> = ({ language, initialSubTab, isPlannerOnly, onOpenStudyPlan = () => {} }) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";

  const [activeSubTab, setActiveSubTab] = useState<"pomodoro" | "calendar" | "todo" | "flashcards" | "formulas">(isPlannerOnly ? "calendar" : (initialSubTab || "pomodoro"));

  useEffect(() => {
    if (isPlannerOnly) {
      setActiveSubTab("calendar");
    } else if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab, isPlannerOnly]);

  // Study Planner State
  const [plannerDays, setPlannerDays] = useState<{
    id: string;
    dayBadini: string;
    dayKu: string;
    dayEn: string;
    tasks: { id: string; subject: string; duration: string; completed: boolean }[];
  }[]>([
    {
      id: "sat",
      dayBadini: "شەمبی (Saturday)",
      dayKu: "شەممە (Saturday)",
      dayEn: "Saturday",
      tasks: [
        { id: "p1", subject: "بەندێ ۳ یێ فیزیایێ + پرسیارێن وزاری", duration: "3 کاتژمێر", completed: true },
        { id: "p2", subject: "ڕێزمانی کوردی - وانەیا ۱ و ۲", duration: "1.5 کاتژمێر", completed: false }
      ]
    },
    {
      id: "sun",
      dayBadini: "ئێک شەمبی (Sunday)",
      dayKu: "یەکشەممە (Sunday)",
      dayEn: "Sunday",
      tasks: [
        { id: "p3", subject: "بیرکاری - بەشی ۴ (تەواوکاری)", duration: "3.5 کاتژمێر", completed: false },
        { id: "p4", subject: "ئینگلیزی - Unit 3 Vocabulary", duration: "2 کاتژمێر", completed: true }
      ]
    },
    {
      id: "mon",
      dayBadini: "دوو شەمبی (Monday)",
      dayKu: "دووشەممە (Monday)",
      dayEn: "Monday",
      tasks: [
        { id: "p5", subject: "کیمیا - بەشی ۵ (ئەلەکتڕۆکیمیا)", duration: "3 کاتژمێر", completed: false }
      ]
    },
    {
      id: "tue",
      dayBadini: "سێ شەمبی (Tuesday)",
      dayKu: "سێشەممە (Tuesday)",
      dayEn: "Tuesday",
      tasks: [
        { id: "p6", subject: "بایۆلۆجی - بۆماوەزانی (Genetics)", duration: "3 کاتژمێر", completed: false }
      ]
    },
    {
      id: "wed",
      dayBadini: "چوار شەمبی (Wednesday)",
      dayKu: "چوارشەممە (Wednesday)",
      dayEn: "Wednesday",
      tasks: [
        { id: "p7", subject: "بیرکاری - شیکاری پرسیاری وزاری", duration: "4 کاتژمێر", completed: false }
      ]
    },
    {
      id: "thu",
      dayBadini: "پێنج شەمبی (Thursday)",
      dayKu: "پێنجشەممە (Thursday)",
      dayEn: "Thursday",
      tasks: [
        { id: "p8", subject: "پێداچوونەوەی گشتی هەفتە", duration: "3 کاتژمێر", completed: false }
      ]
    },
    {
      id: "fri",
      dayBadini: "ئەینی (Friday)",
      dayKu: "هەینی (Friday)",
      dayEn: "Friday",
      tasks: [
        { id: "p9", subject: "تاقیکردنەوەی گشتی بە شێوازی وزاری", duration: "3 کاتژمێر", completed: false }
      ]
    }
  ]);
  const [selectedDayId, setSelectedDayId] = useState<string>("sat");
  const [newPlanTask, setNewPlanTask] = useState<string>("");
  const [newPlanDuration, setNewPlanDuration] = useState<string>("2 کاتژمێر");

  const handleAddPlanTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlanTask.trim()) return;
    setPlannerDays((prev) =>
      prev.map((day) => {
        if (day.id === selectedDayId) {
          return {
            ...day,
            tasks: [
              ...day.tasks,
              { id: Date.now().toString(), subject: newPlanTask, duration: newPlanDuration, completed: false }
            ]
          };
        }
        return day;
      })
    );
    setNewPlanTask("");
  };

  const handleTogglePlanTask = (dayId: string, taskId: string) => {
    setPlannerDays((prev) =>
      prev.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            tasks: day.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
          };
        }
        return day;
      })
    );
  };

  const handleDeletePlanTask = (dayId: string, taskId: string) => {
    setPlannerDays((prev) =>
      prev.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            tasks: day.tasks.filter((t) => t.id !== taskId)
          };
        }
        return day;
      })
    );
  };

  // Pomodoro Timer State
  const [pomoMinutes, setPomoMinutes] = useState(25);
  const [pomoSeconds, setPomoSeconds] = useState(0);
  const [isPomoRunning, setIsPomoRunning] = useState(false);
  const [pomoMode, setPomoMode] = useState<"work" | "break">("work");

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

  // To-Do List State
  const [todos, setTodos] = useState<{ id: string; text: string; completed: boolean }[]>([]);
  const [newTodoText, setNewTodoText] = useState("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    setTodos((prev) => [...prev, { id: Date.now().toString(), text: newTodoText.trim(), completed: false }]);
    setNewTodoText("");
  };

  // Flashcards State
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const flashcardsData = [
    {
      q: "ياسايا تاودانێ (Acceleration) چییە؟",
      a: "a = (v_final - v_initial) / t",
      subject: "فیزیا / Physics"
    },
    {
      q: "پێکهاتنا ڕووناکی (Photosynthesis) د کیژ ئەندامۆکێدا چێدبیت؟",
      a: "د کلۆرۆپلاستێ (Chloroplast)دا چێدبیت.",
      subject: "زیندەوەرناسی / Biology"
    },
    {
      q: "یاسایا ئۆمی (Ohm's Law) نیشان بدە",
      a: "V = I × R (پەستان = تەوژم × بەرگری)",
      subject: "کیمیا و فیزیا"
    }
  ];

  // Formulas Library Data
  const formulasList = [
    { category: "بیرکاری (Math)", title: "دەرهاویشتا نەخشەیێن توان (Power Rule)", formula: "d/dx (x^n) = n · x^(n-1)" },
    { category: "بیرکاری (Math)", title: "ئینتێگراڵا بنەڕەتی", formula: "∫ x^n dx = (x^(n+1))/(n+1) + C" },
    { category: "فیزیا (Physics)", title: "وزەیا جوولەیی (Kinetic Energy)", formula: "Ek = ½ m v²" },
    { category: "فیزیا (Physics)", title: "یاسایا نویترنێ یێ دووێ", formula: "F = m · a" },
    { category: "کیمیا (Chemistry)", title: "یاسایا غازێن نموونەیی", formula: "P · V = n · R · T" }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#121427] border border-indigo-900/40 p-5 rounded-3xl">
        <div>
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            {isPlannerOnly
              ? (isBadini ? "پلانا خویندنێ و ڕێکخستنا کاتی" : isKu ? "پلانی خوێندن و ڕێکخستنی کات" : "Study Planner & Timetable")
              : (isBadini ? "ئامرازێن زیرەکێن خویندنێ" : "ئامرازە ژیرەکانی خوێندن")}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            {isPlannerOnly
              ? (isBadini ? "خشتە و پلانا خویندنا حەفتیانە یا پۆلا ۱۲" : isKu ? "خشتە و پلانی خوێندنی هەفتانەی پۆلی ۱۲" : "Grade 12 Study Planner & Weekly Timetable")
              : (isBadini ? "سەنتەرێ کات، تێبینی و فلاش کارتێن پۆلا ۱۲" : "سەنتەری کات، پۆمۆدۆرۆ و فلەش کارت")}
          </h1>
        </div>

        {/* Sub Navigation */}
        {!isPlannerOnly && (
          <div className="flex overflow-x-auto gap-2 p-1 bg-[#171933] border border-indigo-900/30 rounded-2xl">
            <button
              onClick={() => setActiveSubTab("pomodoro")}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shrink-0 ${
                activeSubTab === "pomodoro" ? "bg-purple-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
              }`}
            >
              <Timer className="w-4 h-4" />
              <span>Pomodoro</span>
            </button>
            <button
              onClick={() => setActiveSubTab("todo")}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shrink-0 ${
                activeSubTab === "todo" ? "bg-purple-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>To-Do List</span>
            </button>
            <button
              onClick={() => setActiveSubTab("flashcards")}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shrink-0 ${
                activeSubTab === "flashcards" ? "bg-purple-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Flashcards</span>
            </button>
            <button
              onClick={() => setActiveSubTab("formulas")}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shrink-0 ${
                activeSubTab === "formulas" ? "bg-purple-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span>Formulas</span>
            </button>
            <button
              onClick={onOpenStudyPlan}
              className="px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shrink-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400/40 hover:scale-105"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>{isBadini ? "پلانا خویندنێ (شاشەیا تمەم)" : isKu ? "پلانی خوێندن (شاشەی تەواو)" : "Fullscreen Planner"}</span>
            </button>
          </div>
        )}
      </div>

      {/* SUBTAB 1: POMODORO TIMER */}
      {!isPlannerOnly && activeSubTab === "pomodoro" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#121427] border border-indigo-900/40 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-6">
            <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
              pomoMode === "work" ? "bg-purple-600/30 text-purple-300 border border-purple-500/40" : "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
            }`}>
              {pomoMode === "work" ? (isBadini ? "کاتی خویندنێ (Focus Time)" : "کاتی خوێندن") : (isBadini ? "کاتی بێهنڤەدانێ (Break)" : "کاتی پشوو")}
            </span>

            {/* Display Clock */}
            <div className="text-6xl sm:text-7xl font-mono font-black text-white tracking-widest drop-shadow-lg">
              {pomoMinutes < 10 ? `0${pomoMinutes}` : pomoMinutes}:
              {pomoSeconds < 10 ? `0${pomoSeconds}` : pomoSeconds}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPomoRunning(!isPomoRunning)}
                className={`p-4 rounded-2xl text-white font-extrabold transition-all shadow-xl flex items-center gap-2 ${
                  isPomoRunning ? "bg-amber-600 hover:bg-amber-500" : "bg-purple-600 hover:bg-purple-500 shadow-purple-600/30"
                }`}
              >
                {isPomoRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                <span>{isPomoRunning ? (isBadini ? "ڕاوەستین" : "وەستان") : (isBadini ? "دەستپێکرن" : "دەستپێکردن")}</span>
              </button>
              <button
                onClick={() => {
                  setIsPomoRunning(false);
                  setPomoMinutes(25);
                  setPomoSeconds(0);
                  setPomoMode("work");
                }}
                className="p-4 rounded-2xl bg-[#1c1e3d] text-slate-300 border border-indigo-900/40 hover:text-white hover:bg-[#252850]"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-[#121427] border border-indigo-900/40 rounded-3xl p-6 space-y-4">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <Timer className="w-5 h-5 text-purple-400" />
              {isBadini ? "تەکنیکا پۆمۆدۆرۆ بۆچی بەسوودە؟" : "تەکنیکی پۆمۆدۆرۆ چییە؟"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isBadini
                ? "تەکنیکا پۆمۆدۆرۆ ۱۲ خولەکێن تەرکیزا تام بێ بێزاربوون بۆ تە بەرهەم دئینیت. ب ۲۵ خولەک خویندن و ۵ خولەک بێهنڤەدان، سەرێ تە ماندوو نابیت د وەرزێ ئەزموونانیدا."
                : "بە بەکارهێنانی ۲٥ خولەک خوێندنی بەهێز و ٥ خولەک پشوو، تەرکیزت زیاد دەکات و ماندووبوونی مێشک کەم دەکاتەوە."}
            </p>
            <div className="p-4 rounded-2xl bg-[#171933] border border-indigo-900/30 space-y-2">
              <span className="text-xs font-bold text-purple-300 block">🎯 ئامانجی ئەمڕۆ (Daily Target):</span>
              <div className="w-full bg-indigo-950 rounded-full h-3 overflow-hidden">
                <div className="bg-purple-600 h-3 rounded-full w-3/4" />
              </div>
              <span className="text-[11px] text-slate-400 block font-mono">4 / 6 Sessions Completed (100 Mins)</span>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB: STUDY PLANNER / TIMETABLE */}
      {(isPlannerOnly || activeSubTab === "calendar") && (() => {
        const selectedDay = plannerDays.find((d) => d.id === selectedDayId) || plannerDays[0];
        const totalTasksWeekly = plannerDays.reduce((acc, d) => acc + d.tasks.length, 0);
        const completedTasksWeekly = plannerDays.reduce((acc, d) => acc + d.tasks.filter((t) => t.completed).length, 0);
        const completionRate = totalTasksWeekly > 0 ? Math.round((completedTasksWeekly / totalTasksWeekly) * 100) : 0;

        return (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Stat Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900/60 via-indigo-900/50 to-[#121427] border border-purple-500/30 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  {isBadini ? "خشتە و پلانا خویندنا حەفتیانە یا پۆلا ۱۲" : isKu ? "خشتە و پلانی خوێندنی هەفتانەی پۆلی ۱۲" : "Grade 12 Weekly Study Planner"}
                </span>
                <h2 className="text-2xl font-black text-white">
                  {isBadini ? "رێکخستنا دەمێ خویندنێ بۆ ئەزموونێن وزاری 🗓️" : isKu ? "ڕێکخستنی کاتی خوێندن بۆ ئەزموونە وزارییەکان 🗓️" : "Study Schedule & Timetable 🗓️"}
                </h2>
                <p className="text-xs sm:text-sm text-purple-100/80 max-w-xl">
                  {isBadini
                    ? "کاتێن خۆ ب رێک و پێکی دابەش بکە ل سەر رۆژێن حەفتیێ، هەمی بابەتێن وزاری پێداچوونەوێ بۆ بکە و پێشکەوتنا خۆ تۆمار بکە."
                    : "کاتەکانت بە ڕێک و پێکی دابەش بکە بەسەر ڕۆژەکانی هەفتەدا، هەموو بابەتە وزارییەکان پێداچوونەوە بکە و بەرەوپێشچوونت تۆمار بکە."}
                </p>
              </div>
              
              <div className="bg-[#121427]/90 backdrop-blur-md p-5 rounded-2xl border border-purple-500/40 text-center shrink-0 min-w-[200px] shadow-lg">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {isBadini ? "ڕێژەیا تەواوکرنا پلانا حەفتیێ" : isKu ? "ڕێژەی تەواوکردنی پلانی هەفتە" : "Weekly Plan Progress"}
                </span>
                <div className="text-4xl font-black text-purple-400 font-mono tracking-tight">
                  {completionRate}%
                </div>
                <div className="w-full bg-indigo-950 rounded-full h-2 overflow-hidden mt-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500" style={{ width: `${completionRate}%` }} />
                </div>
                <span className="text-[10px] text-slate-400 block mt-1 font-mono">
                  {completedTasksWeekly} / {totalTasksWeekly} {isBadini ? "ئەرک تمەم بوونە" : "ئەرک تەواوکراون"}
                </span>
              </div>
            </div>

            {/* Days of Week Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {plannerDays.map((day) => {
                const dayCompleted = day.tasks.length > 0 && day.tasks.every((t) => t.completed);
                const isSelected = day.id === selectedDayId;
                return (
                  <button
                    key={day.id}
                    onClick={() => setSelectedDayId(day.id)}
                    className={`p-3 rounded-2xl border text-center transition-all relative flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? "bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/30 scale-105"
                        : "bg-[#121427] border-indigo-900/40 text-slate-300 hover:border-purple-500/40 hover:text-white"
                    }`}
                  >
                    {dayCompleted && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-[#121427] flex items-center justify-center shadow">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                    <span className="text-xs font-black">
                      {isBadini ? day.dayBadini.split(" ")[0] : isKu ? day.dayKu.split(" ")[0] : day.dayEn}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${isSelected ? "bg-purple-700 text-purple-200" : "bg-[#171933] text-slate-400"}`}>
                      {day.tasks.filter((t) => t.completed).length}/{day.tasks.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Day Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Task List for Selected Day */}
              <div className="lg:col-span-2 bg-[#121427] border border-indigo-900/40 rounded-3xl p-6 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-indigo-900/30">
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                    <span>
                      {isBadini ? `خشتەیا وانەیێن رۆژا ${selectedDay.dayBadini}` : isKu ? `خشتەی وانەکانی ڕۆژی ${selectedDay.dayKu}` : `${selectedDay.dayEn} Schedule`}
                    </span>
                  </h3>
                  <span className="text-xs font-bold text-slate-400 bg-[#171933] px-3 py-1 rounded-xl border border-indigo-900/30">
                    {selectedDay.tasks.length} {isBadini ? "بابەت / وانە" : "وانە دیاریکراون"}
                  </span>
                </div>

                {/* Add new task form */}
                <form onSubmit={handleAddPlanTask} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newPlanTask}
                    onChange={(e) => setNewPlanTask(e.target.value)}
                    placeholder={isBadini ? "بابەتێ نوی بێنڤیسە... (م.ج: بیرکاری - حەلکرنا پرسیارێن بەندێ ۲)" : "بابەتێکی نوێ بنووسە... (م.ج: بیرکاری - بەشی ۲)"}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#171933] border border-indigo-900/40 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500"
                  />
                  <select
                    value={newPlanDuration}
                    onChange={(e) => setNewPlanDuration(e.target.value)}
                    className="px-3 py-2.5 rounded-xl bg-[#171933] border border-indigo-900/40 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500"
                  >
                    <option value="1 کاتژمێر">1 کاتژمێر</option>
                    <option value="1.5 کاتژمێر">1.5 کاتژمێر</option>
                    <option value="2 کاتژمێر">2 کاتژمێر</option>
                    <option value="2.5 کاتژمێر">2.5 کاتژمێر</option>
                    <option value="3 کاتژمێر">3 کاتژمێر</option>
                    <option value="3.5 کاتژمێر">3.5 کاتژمێر</option>
                    <option value="4 کاتژمێر">4 کاتژمێر</option>
                  </select>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isBadini ? "زێدەکرن" : "زیادکردن"}</span>
                  </button>
                </form>

                {/* Tasks List */}
                <div className="space-y-3">
                  {selectedDay.tasks.length === 0 ? (
                    <div className="p-8 text-center bg-[#171933]/50 rounded-2xl border border-indigo-900/30 text-slate-400">
                      <CalendarIcon className="w-10 h-10 mx-auto mb-2 opacity-40" />
                      <p className="text-xs font-bold">{isBadini ? "چ وانە و بابەت بۆ ڤێ رۆژێ نەهاتینە دیاریکرن." : "هیچ وانەیەک بۆ ئەم ڕۆژە دیاری نەکراوە."}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{isBadini ? "ل سەرەوە بابەتێ خۆ بێنڤیسە و زێدە بکە بۆ خشتەیێ خۆ." : "لە سەرەوە بابەتێک بنووسە و زیادی بکە بۆ خشتەکەت."}</p>
                    </div>
                  ) : (
                    selectedDay.tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-4 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                          task.completed
                            ? "bg-[#101222]/80 border-emerald-500/30 opacity-70"
                            : "bg-[#171933] border-indigo-900/40 hover:border-purple-500/40"
                        }`}
                      >
                        <div
                          onClick={() => handleTogglePlanTask(selectedDay.id, task.id)}
                          className="flex items-center gap-3.5 cursor-pointer flex-1"
                        >
                          <div
                            className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                              task.completed
                                ? "bg-emerald-500 border-emerald-400 text-[#121427]"
                                : "border-slate-500 hover:border-purple-400"
                            }`}
                          >
                            {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>
                          <div>
                            <span className={`text-xs sm:text-sm font-bold block ${task.completed ? "line-through text-slate-400" : "text-white"}`}>
                              {task.subject}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[11px] text-purple-300 mt-1 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                              <Clock className="w-3 h-3" />
                              {task.duration}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeletePlanTask(selectedDay.id, task.id)}
                          className="p-2 text-slate-500 hover:text-rose-400 transition"
                          title={isBadini ? "سڕینەوە" : "سڕینەوە"}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Right Column: Tips & Ministerial Exam Advice */}
              <div className="bg-[#121427] border border-indigo-900/40 rounded-3xl p-6 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>{isBadini ? "ئامۆژگاریێن زێڕین بۆ خویندنا پۆلا ۱۲" : "ئامۆژگارییە زێڕینەکانی خوێندنی پۆلی ۱۲"}</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-2xl bg-[#171933] border border-indigo-900/30 text-xs text-slate-300 leading-relaxed">
                      <strong className="text-purple-300 block mb-1 font-bold">💡 1. دابەشکردنا کاتی (Time Boxing):</strong>
                      {isBadini ? "بۆ هەر بابەتەکێ کاتەکێ دیاریکری دابنێ، م.ج ۳ کاتژمێر بۆ فیزیایێ، پاشان ۵ خولەک بێهنڤەدانێ وەرگرە ب تەکنیکا پۆمۆدۆرۆ." : "بۆ هەر بابەتێک کاتێکی دیاریکراو دابنێ، بۆ نموونە ۳ کاتژمێر بۆ فیزیا، پاشان ۵ خولەک پشوو وەرگرە."}
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#171933] border border-indigo-900/30 text-xs text-slate-300 leading-relaxed">
                      <strong className="text-amber-300 block mb-1 font-bold">🎯 2. حەلکرنا پرسیارێن وزاری:</strong>
                      {isBadini ? "ل کۆتایییا خویندنا هەر بەندەکێ، ڕاستەوخۆ پرسیارێن وزاری یێن سالێن بووری حەل بکە دا ئاستێ خۆ بزانی." : "لە کۆتایی خوێندنی هەر بەشێک، ڕاستەوخۆ پرسیارە وزارییەکانی ساڵانی ڕابردوو شیکار بکە."}
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#171933] border border-indigo-900/30 text-xs text-slate-300 leading-relaxed">
                      <strong className="text-emerald-300 block mb-1 font-bold">🔄 3. پێداچوونەوا رۆژا پێنجشەمبی و ئەینی:</strong>
                      {isBadini ? "رۆژێن کۆتایی حەفتیێ تەرخان بکە بۆ پێداچوونەوا گشتی و حەلکرنا ئەزموونێ گشتی ب شێوازێ ۳ کاتژمێری." : "ڕۆژانی کۆتایی هەفتە تەرخان بکە بۆ پێداچوونەوەی گشتی و تاقیکردنەوەی گشتی بە شێوازی ۳ کاتژمێری."}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 text-center">
                  <Target className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                  <span className="text-xs font-black text-white block">
                    {isBadini ? "تۆ یێ نێزیکی خەونێن خۆیی، بەردەوام بە!" : "تۆ لە خەونەکانت نزیکیت، بەردەوام بە!"}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {isBadini ? "هەمی رۆژەکا رێکخستی پێنگاڤەکا مەزنە بەرەو سەرکەوتنێ." : "هەموو ڕۆژێکی ڕێکخراو هەنگاوێکی گەورەیە بەرەو سەرکەوتن."}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* SUBTAB 2: TO-DO LIST */}
      {!isPlannerOnly && activeSubTab === "todo" && (
        <div className="bg-[#121427] border border-indigo-900/40 rounded-3xl p-6 space-y-6">
          <form onSubmit={handleAddTodo} className="flex gap-3">
            <input
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              placeholder={isBadini ? "ئەرکەکێ نوی بێنڤیسە... (م.ج: حەلکرنا پرسیاران)" : "ئەرکێکی نوێ بنووسە..."}
              className="flex-1 px-4 py-3 rounded-2xl bg-[#171933] border border-indigo-900/40 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-purple-600/30 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{isBadini ? "زێدەکرن" : "زیادکردن"}</span>
            </button>
          </form>

          <div className="space-y-2">
            {todos.map((t) => (
              <div
                key={t.id}
                className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                  t.completed ? "bg-[#101222] border-indigo-950 opacity-60" : "bg-[#171933] border-indigo-900/30"
                }`}
              >
                <div
                  onClick={() =>
                    setTodos((prev) =>
                      prev.map((item) => (item.id === t.id ? { ...item, completed: !item.completed } : item))
                    )
                  }
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center ${
                      t.completed ? "bg-purple-600 border-purple-500 text-white" : "border-slate-500"
                    }`}
                  >
                    {t.completed && <Check className="w-4 h-4" />}
                  </div>
                  <span className={`text-xs sm:text-sm font-medium ${t.completed ? "line-through text-slate-400" : "text-white"}`}>
                    {t.text}
                  </span>
                </div>

                <button
                  onClick={() => setTodos((prev) => prev.filter((item) => item.id !== t.id))}
                  className="p-2 text-slate-500 hover:text-rose-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: FLASHCARDS */}
      {!isPlannerOnly && activeSubTab === "flashcards" && (
        <div className="bg-[#121427] border border-indigo-900/40 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-6">
          <span className="text-xs font-bold text-purple-400">
            {flashcardsData[flashcardIndex].subject}
          </span>

          {/* Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full max-w-md h-64 rounded-3xl bg-gradient-to-br from-[#1a1c38] to-[#14162e] border border-purple-500/40 p-6 flex flex-col items-center justify-center cursor-pointer shadow-2xl transition-all duration-500 transform hover:scale-105"
          >
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              {isFlipped ? "بەرسڤ (Answer)" : "پسیار (Question) - کلیک بکە"}
            </span>
            <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {isFlipped ? flashcardsData[flashcardIndex].a : flashcardsData[flashcardIndex].q}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setIsFlipped(false);
                setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : flashcardsData.length - 1));
              }}
              className="px-4 py-2 rounded-xl bg-[#171933] border border-indigo-900/40 text-xs text-slate-300 hover:text-white"
            >
              کۆناپێش (Previous)
            </button>
            <span className="text-xs text-slate-400 font-mono">
              {flashcardIndex + 1} / {flashcardsData.length}
            </span>
            <button
              onClick={() => {
                setIsFlipped(false);
                setFlashcardIndex((prev) => (prev < flashcardsData.length - 1 ? prev + 1 : 0));
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30"
            >
              یێ پاشتر (Next)
            </button>
          </div>
        </div>
      )}

      {/* SUBTAB 4: FORMULAS */}
      {!isPlannerOnly && activeSubTab === "formulas" && (
        <div className="bg-[#121427] border border-indigo-900/40 rounded-3xl p-6 space-y-4">
          <h3 className="font-extrabold text-base text-white">
            {isBadini ? "بانکا یاسا و یاسایێن سەرەکی یێن پۆلا ۱۲" : "بانکی یاسا سەرەکییەکان"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formulasList.map((f, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#171933] border border-indigo-900/30 space-y-1">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wide">{f.category}</span>
                <h4 className="font-bold text-xs sm:text-sm text-white">{f.title}</h4>
                <div className="p-2.5 rounded-xl bg-[#0d0e1b] text-amber-300 font-mono text-sm border border-indigo-950 font-bold mt-2">
                  {f.formula}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
