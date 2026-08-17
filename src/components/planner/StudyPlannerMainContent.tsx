import React, { useState, useEffect } from "react";
import {
  Check,
  Play,
  Pause,
  RotateCcw,
  Plus,
  CloudRain,
  Trees,
  Coffee,
  Waves,
  Music,
  CheckSquare,
  Clock,
  Calendar as CalendarIcon,
  Trash2,
  Sparkles,
  Target,
  BookOpen
} from "lucide-react";
import { Language } from "../../types";
import { audioGen } from "./ambientSound";

interface PriorityItem {
  id: number;
  textEn: string;
  textBadini: string;
  textKu: string;
  completed: boolean;
}

interface TimelineItem {
  id: number;
  time: string;
  subjectEn: string;
  subjectBadini: string;
  subjectKu: string;
  done: boolean;
}

interface StudyPlannerMainContentProps {
  language: Language;
  priorities: PriorityItem[];
  onTogglePriority: (id: number) => void;
  onAddPriority: (text: string) => void;
  onDeletePriority?: (id: number) => void;
  timelineItems: TimelineItem[];
  onToggleTimeline: (id: number) => void;
  scheduleGrid: Record<string, Record<string, { subjectEn: string; subjectBadini: string; subjectKu: string; color: string }>>;
  onUpdateSlot: (time: string, day: string, subEn: string, subBadini: string, subKu: string, color: string) => void;
  isDarkMode?: boolean;
}

export const StudyPlannerMainContent: React.FC<StudyPlannerMainContentProps> = ({
  language,
  priorities,
  onTogglePriority,
  onAddPriority,
  onDeletePriority,
  scheduleGrid,
  onUpdateSlot,
  isDarkMode
}) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";

  // Tab state for simplified view
  const [activeTab, setActiveTab] = useState<"daily" | "weekly">("daily");

  // Pomodoro Focus Timer State
  const [timerMode, setTimerMode] = useState<"focus" | "shortBreak" | "longBreak">("focus");
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [newPriorityText, setNewPriorityText] = useState("");

  // Timer mode switch
  const handleSelectTimerMode = (mode: "focus" | "shortBreak" | "longBreak") => {
    setIsTimerRunning(false);
    setTimerMode(mode);
    if (mode === "focus") setTimeLeft(25 * 60);
    else if (mode === "shortBreak") setTimeLeft(5 * 60);
    else if (mode === "longBreak") setTimeLeft(15 * 60);
  };

  // Timer useEffect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      alert(isBadini ? "کاتێ خویندنێ ب دوماهی هات! پشوودانەکێ وەرگرە 🎉" : isKu ? "کاتی خوێندن تەواو بوو! پشوویەک وەربگرە 🎉" : "Time is up! Take a well-deserved break 🎉");
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, isBadini, isKu]);

  // Sound handler
  const handleToggleSound = (type: "rain" | "forest" | "cafe" | "ocean" | "lofi") => {
    const started = audioGen.start(type);
    setActiveSound(started ? type : null);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${rem.toString().padStart(2, "0")}`;
  };

  const handlePrioritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPriorityText.trim()) return;
    onAddPriority(newPriorityText.trim());
    setNewPriorityText("");
  };

  const weekdays = [
    { id: "mon", labelEn: "Monday", labelBadini: "دوو شەمبی", labelKu: "دووشەممە" },
    { id: "tue", labelEn: "Tuesday", labelBadini: "سێ شەمبی", labelKu: "سێشەممە" },
    { id: "wed", labelEn: "Wednesday", labelBadini: "چار شەمبی", labelKu: "چوارشەممە" },
    { id: "thu", labelEn: "Thursday", labelBadini: "پێنج شەمبی", labelKu: "پێنجشەممە" },
    { id: "fri", labelEn: "Friday", labelBadini: "ئەینی", labelKu: "هەینی" },
    { id: "sat", labelEn: "Saturday", labelBadini: "شەمبی", labelKu: "شەممە" },
    { id: "sun", labelEn: "Sunday", labelBadini: "ئێک شەمبی", labelKu: "یەکشەممە" }
  ];

  const hoursList = ["08:00 AM", "10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM"];

  return (
    <div className="flex-1 space-y-6 min-w-0 select-none pb-8">
      {/* SIMPLIFIED HEADER & VIEW SWITCHER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Target className="w-7 h-7 text-[#2563EB]" />
            <span>{isBadini ? "پلانا من یا سادە" : isKu ? "پلانی من ی سادە" : "My Streamlined Planner"}</span>
          </h1>
          <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">
            {isBadini
              ? "سیستەمەکێ سادە و ڕوون بۆ رێکخستنا خویندنێ و کاتێ پۆلا ١٢"
              : isKu
              ? "سیستەمێکی سادە و ڕوون بۆ ڕێکخستنی خوێندن و کاتی پۆلی ١٢"
              : "Clean, distraction-free grade 12 study and focus management"}
          </p>
        </div>

        {/* Tab switcher: Daily Focus vs Weekly Schedule */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F5F7FA] dark:bg-[#181c26] rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <button
            onClick={() => setActiveTab("daily")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition ${
              activeTab === "daily"
                ? "bg-[#2563EB] text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{isBadini ? "ئەرک و تەرکیزا ئەڤرۆ" : isKu ? "ئەرک و تەرکیزی ئەمڕۆ" : "Daily Tasks & Timer"}</span>
          </button>
          <button
            onClick={() => setActiveTab("weekly")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition ${
              activeTab === "weekly"
                ? "bg-[#2563EB] text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            <span>{isBadini ? "خشتێ هەفتانە" : isKu ? "خشتەی هەفتانە" : "Weekly Schedule"}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: DAILY FOCUS & TASKS */}
      {activeTab === "daily" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fadeIn">
          {/* Left / Top Side: Clean Pomodoro Focus Timer (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#F5F7FA] dark:bg-[#181c26] border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-6 shadow-xs">
            {/* Mode Tabs */}
            <div className="flex items-center gap-2 p-1 bg-white dark:bg-[#0f1219] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              {[
                { id: "focus", labelEn: "Focus (25m)", labelBadini: "تەرکیز (٢٥ م)" },
                { id: "shortBreak", labelEn: "Short Break", labelBadini: "پشوو (٥ م)" },
                { id: "longBreak", labelEn: "Long Break", labelBadini: "پشووی درێژ" }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleSelectTimerMode(m.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                    timerMode === m.id
                      ? "bg-[#2563EB] text-white shadow-xs font-black"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {isBadini ? m.labelBadini : m.labelEn}
                </button>
              ))}
            </div>

            {/* Circular Timer Ring */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center my-2">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" className="text-slate-200 dark:text-slate-800 stroke-current" strokeWidth="6" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  className="text-[#2563EB] stroke-current transition-all duration-500"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="276.46"
                  strokeDashoffset={276.46 * (1 - timeLeft / (timerMode === "focus" ? 1500 : timerMode === "shortBreak" ? 300 : 900))}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
                  {formatTime(timeLeft)}
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-wider">
                  {timerMode === "focus" ? (isBadini ? "کاتی خویندنێ" : "Focus Time") : (isBadini ? "کاتی پشوودانێ" : "Break Time")}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  if (timerMode === "focus") setTimeLeft(25 * 60);
                  else if (timerMode === "shortBreak") setTimeLeft(5 * 60);
                  else setTimeLeft(15 * 60);
                }}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#0f1219] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:scale-105 transition"
                title="Reset Timer"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="w-18 h-18 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white shadow-xl shadow-blue-500/30 flex items-center justify-center font-black transition transform hover:scale-105 active:scale-95"
              >
                {isTimerRunning ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white ml-1" />}
              </button>
            </div>

            {/* Ambient Sounds */}
            <div className="w-full pt-4 border-t border-slate-200/60 dark:border-slate-800/80 space-y-2.5">
              <span className="text-xs font-black text-slate-600 dark:text-slate-300 block text-left">
                {isBadini ? "دەنگێن ئارام بۆ خویندنێ" : isKu ? "دەنگە ئارامەکان بۆ خوێندن" : "Soothing Background Sounds"}
              </span>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { id: "rain", labelBadini: "باران", labelEn: "Rain", icon: CloudRain },
                  { id: "forest", labelBadini: "دارستان", labelEn: "Forest", icon: Trees },
                  { id: "cafe", labelBadini: "کافی", labelEn: "Cafe", icon: Coffee },
                  { id: "ocean", labelBadini: "پێل", labelEn: "Ocean", icon: Waves },
                  { id: "lofi", labelBadini: "مۆزیک", labelEn: "Lo-fi", icon: Music }
                ].map((s) => {
                  const Icon = s.icon;
                  const isActive = activeSound === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleToggleSound(s.id as any)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-[11px] font-bold transition ${
                        isActive
                          ? "bg-[#2563EB] text-white border-[#2563EB] shadow-xs scale-105"
                          : "bg-white dark:bg-[#0f1219] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{isBadini ? s.labelBadini : s.labelEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side: Clean Study Tasks List (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1219] border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-[#2563EB] flex items-center justify-center">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                    {isBadini ? "لیستا ئەرک و وانەیێن ئەڤرۆ" : isKu ? "لیستی ئەرک و وانەکانی ئەمڕۆ" : "Today's Study Checklist"}
                  </h3>
                  <span className="text-xs font-bold text-slate-500 block">
                    {isBadini ? "ب سادەیی کارێن خۆ زێدەکە و جێبەجێبکە" : isKu ? "بە سادەیی کارەکانت زیادبکە و جێبەجێبکە" : "Add tasks and check them off effortlessly"}
                  </span>
                </div>
              </div>
              <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-emerald-500/10 text-[#10B981] font-mono">
                {priorities.filter(p => p.completed).length} / {priorities.length} {isBadini ? "تەمامبوو" : "Done"}
              </span>
            </div>

            {/* Quick Add Task Input */}
            <form onSubmit={handlePrioritySubmit} className="flex gap-2.5">
              <input
                type="text"
                value={newPriorityText}
                onChange={(e) => setNewPriorityText(e.target.value)}
                placeholder={isBadini ? "+ وانە یان ئەرکەکێ نووی زێدەکە (بۆ نموونە: بیرکاری بەندێ ٢)..." : isKu ? "+ وانە یان ئەرکێکی نوێ زیادبکە..." : "+ Add a study goal for today..."}
                className="flex-1 px-4 py-3 rounded-2xl bg-[#F5F7FA] dark:bg-[#181c26] border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#2563EB] transition"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 transition shrink-0 shadow-sm shadow-blue-500/20"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>{isBadini ? "زێدەکە" : "Add Task"}</span>
              </button>
            </form>

            {/* Tasks List */}
            <div className="space-y-3">
              {priorities.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                  <Sparkles className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
                  <p className="text-xs sm:text-sm font-bold">
                    {isBadini ? "چ ئەرک نەهاتینە زێدەکردن. ئەرکەکێ بۆ ئەڤرۆ بنڤیسە!" : "No tasks added yet. Write down your goals for today!"}
                  </p>
                </div>
              ) : (
                priorities.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition flex items-center justify-between gap-4 ${
                      item.completed
                        ? "bg-[#F5F7FA]/50 dark:bg-[#181c26]/40 border-slate-200/60 dark:border-slate-800/60 opacity-70"
                        : "bg-white dark:bg-[#0f1219] border-slate-200/80 dark:border-slate-800 hover:border-[#2563EB] shadow-xs"
                    }`}
                  >
                    <div
                      onClick={() => onTogglePriority(item.id)}
                      className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer"
                    >
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition shrink-0 ${
                        item.completed ? "bg-[#10B981] border-[#10B981] text-white" : "border-slate-300 dark:border-slate-600 hover:border-[#2563EB]"
                      }`}>
                        {item.completed && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                      <span className={`text-sm sm:text-base font-bold truncate ${
                        item.completed ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-900 dark:text-white"
                      }`}>
                        {isBadini ? item.textBadini : isKu ? item.textKu : item.textEn}
                      </span>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onDeletePriority) onDeletePriority(item.id);
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition shrink-0"
                      title="Delete Task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SIMPLIFIED WEEKLY TIMETABLE */}
      {activeTab === "weekly" && (
        <div className="bg-white dark:bg-[#0f1219] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80 dark:border-slate-800">
            <div>
              <h2 className="font-black text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#2563EB]" />
                <span>{isBadini ? "خشتێ هەفتانە یێ وانە و کاتژمێران" : isKu ? "خشتەی هەفتانەی وانە و کاتژمێرەکان" : "Weekly Study Schedule Grid"}</span>
              </h2>
              <p className="text-xs font-bold text-slate-500 mt-1">
                {isBadini
                  ? "ل سەر هەر وانەیەکێ کلیک بکە بۆ گوهورین یان زێدەکردنا بابەتەکێ نووی"
                  : isKu
                  ? "لە سەر هەر وانەیەک کلیک بکە بۆ گۆڕین یان زیادکردنی بابەتێکی نوێ"
                  : "Click any slot to easily edit or customize your study schedule"}
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-black">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#2563EB]" /> Math</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#10B981]" /> Physics</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-purple-600" /> Chemistry</span>
            </div>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="min-w-[780px] grid grid-cols-8 gap-2.5">
              {/* Header Column: Hours */}
              <div className="space-y-2.5 pt-9">
                {hoursList.map((time) => (
                  <div key={time} className="h-14 flex items-center justify-end pr-3 text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                    {time}
                  </div>
                ))}
              </div>

              {/* Day Columns */}
              {weekdays.map((day) => (
                <div key={day.id} className="space-y-2.5">
                  <div className="text-center py-2 rounded-xl bg-[#F5F7FA] dark:bg-[#181c26] text-xs font-black text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-800">
                    {isBadini ? day.labelBadini : isKu ? day.labelKu : day.labelEn}
                  </div>
                  {hoursList.map((time) => {
                    const slot = scheduleGrid[time]?.[day.id] || {
                      subjectEn: "Self Study",
                      subjectBadini: "خویندنا خۆیی",
                      subjectKu: "خوێندنی سەربەخۆ",
                      color: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    };
                    return (
                      <div
                        key={`${day.id}-${time}`}
                        onClick={() => {
                          const newSub = prompt(isBadini ? "ناڤێ وانێ بنڤیسە:" : "Enter Subject Name:", slot.subjectEn);
                          if (newSub) onUpdateSlot(time, day.id, newSub, newSub, newSub, "bg-[#2563EB] text-white shadow-sm font-black");
                        }}
                        className={`h-14 p-2 rounded-2xl text-xs font-bold flex items-center justify-center text-center transition cursor-pointer hover:scale-102 hover:shadow-md select-none ${slot.color}`}
                        title={`${time} - ${slot.subjectEn} (Click to edit)`}
                      >
                        <span className="truncate">{isBadini ? slot.subjectBadini : isKu ? slot.subjectKu : slot.subjectEn}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
