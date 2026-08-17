import React, { useState } from "react";
import { ArrowLeft, Calendar as CalendarIcon, ChevronDown, ChevronLeft, ChevronRight, Check, Clock, Plus, Trash2, BookOpen, Sparkles, RefreshCw } from "lucide-react";
import { Language, UserProfile } from "../types";
import { Grade12SyllabusTab } from "./Grade12SyllabusTab";
import { timeSlotPresets } from "../data/timeSlotBackgrounds";

const timeOptions = [
  "05:00 AM", "05:30 AM", "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM",
  "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
  "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM",
  "11:00 PM", "11:30 PM", "12:00 AM"
];

export interface StudyPlannerModalProps {
  language: Language;
  onClose?: () => void;
  user?: UserProfile;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  onSelectTab?: (tab: string) => void;
}

interface DayTask {
  id: number;
  text: string;
  completed: boolean;
  color: string;
  startTime?: string;
  endTime?: string;
}

export const StudyPlannerModal: React.FC<StudyPlannerModalProps> = ({
  language,
  onClose
}) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";
  const isRtl = isBadini || isKu;

  type PlannerTheme = "snow" | "matcha" | "peach" | "lavender" | "sky";

  const [activeTheme, setActiveTheme] = useState<PlannerTheme>("snow");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  
  // Store tasks mapped by date string YYYY-MM-DD
  const [tasks, setTasks] = useState<Record<string, DayTask[]>>({});
  const [newTaskText, setNewTaskText] = useState("");
  const [selectedColor, setSelectedColor] = useState("#86E3CE");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [openStartDropdown, setOpenStartDropdown] = useState(false);
  const [openEndDropdown, setOpenEndDropdown] = useState(false);
  const [dateColors, setDateColors] = useState<Record<string, string>>({});

  // Tab state: Daily Calendar vs Weekly Timetable
  const [plannerTab, setPlannerTab] = useState<"daily" | "weekly" | "syllabus">("syllabus");

  // Weekly Timetable Grid state
  const [weeklySchedule, setWeeklySchedule] = useState<Record<string, Record<string, { subject: string; color: string }>>>(() => {
    return {
      "08:00 AM - 10:00 AM": {
        sat: { subject: isBadini ? "بیرکاری" : isKu ? "بیرکاری" : "Math", color: "#86E3CE" },
        sun: { subject: isBadini ? "زیندەوەر" : isKu ? "زیندەوەرزانی" : "Biology", color: "#FFDD94" },
        mon: { subject: isBadini ? "کیمیا" : isKu ? "کیمیا" : "Chemistry", color: "#CCABD8" },
        tue: { subject: isBadini ? "فیزیا" : isKu ? "فیزیا" : "Physics", color: "#60A5FA" },
        wed: { subject: isBadini ? "بیرکاری" : isKu ? "بیرکاری" : "Math", color: "#86E3CE" },
        thu: { subject: isBadini ? "زیندەوەر" : isKu ? "زیندەوەرزانی" : "Biology", color: "#FFDD94" },
        fri: { subject: isBadini ? "تاقیکردنەڤا خۆیی" : isKu ? "تاقیکردنەوەی خۆیی" : "Self Test", color: "#FA897B" }
      },
      "10:30 AM - 12:30 PM": {
        sat: { subject: isBadini ? "فیزیا" : isKu ? "فیزیا" : "Physics", color: "#60A5FA" },
        sun: { subject: isBadini ? "بیرکاری" : isKu ? "بیرکاری" : "Math", color: "#86E3CE" },
        mon: { subject: isBadini ? "زیندەوەر" : isKu ? "زیندەوەرزانی" : "Biology", color: "#FFDD94" },
        tue: { subject: isBadini ? "کیمیا" : isKu ? "کیمیا" : "Chemistry", color: "#CCABD8" },
        wed: { subject: isBadini ? "فیزیا" : isKu ? "فیزیا" : "Physics", color: "#60A5FA" },
        thu: { subject: isBadini ? "بیرکاری" : isKu ? "بیرکاری" : "Math", color: "#86E3CE" },
        fri: { subject: isBadini ? "پێداچوونەڤا هەفتێ" : isKu ? "پێداچوونەوەی هەفتە" : "Weekly Review", color: "#86E3CE" }
      },
      "02:00 PM - 04:00 PM": {
        sat: { subject: isBadini ? "پشوودان" : isKu ? "پشوودان" : "Break & Review", color: "#FFDD94" },
        sun: { subject: isBadini ? "عەرەبی" : isKu ? "عەرەبی" : "Arabic", color: "#FA897B" },
        mon: { subject: isBadini ? "بیرکاری" : isKu ? "بیرکاری" : "Math", color: "#86E3CE" },
        tue: { subject: isBadini ? "عەرەبی" : isKu ? "عەرەبی" : "Arabic", color: "#FA897B" },
        wed: { subject: isBadini ? "ئینگلیزی" : isKu ? "ئینگلیزی" : "English", color: "#86E3CE" },
        thu: { subject: isBadini ? "کوردی" : isKu ? "کوردی" : "Kurdish", color: "#CCABD8" },
        fri: { subject: isBadini ? "پشوودان" : isKu ? "پشوودان" : "Break", color: "#FFDD94" }
      },
      "05:00 PM - 07:00 PM": {
        sat: { subject: isBadini ? "کیمیا" : isKu ? "کیمیا" : "Chemistry", color: "#CCABD8" },
        sun: { subject: isBadini ? "فیزیا" : isKu ? "فیزیا" : "Physics", color: "#60A5FA" },
        mon: { subject: isBadini ? "کوردی" : isKu ? "کوردی" : "Kurdish", color: "#FA897B" },
        tue: { subject: isBadini ? "بیرکاری" : isKu ? "بیرکاری" : "Math", color: "#86E3CE" },
        wed: { subject: isBadini ? "کیمیا" : isKu ? "کیمیا" : "Chemistry", color: "#CCABD8" },
        thu: { subject: isBadini ? "عەرەبی" : isKu ? "عەرەبی" : "Arabic", color: "#FA897B" },
        fri: { subject: isBadini ? "ئامادەسازی هەفتێ" : isKu ? "ئامادەسازی هەفتە" : "Next Week Prep", color: "#CCABD8" }
      },
      "08:00 PM - 10:00 PM": {
        sat: { subject: isBadini ? "کوردی" : isKu ? "کوردی" : "Kurdish", color: "#FA897B" },
        sun: { subject: isBadini ? "ئینگلیزی" : isKu ? "ئینگلیزی" : "English", color: "#86E3CE" },
        mon: { subject: isBadini ? "پرسیارێن وزاری" : isKu ? "پرسیاری وزاری" : "Past Papers", color: "#60A5FA" },
        tue: { subject: isBadini ? "زیندەوەر" : isKu ? "زیندەوەرزانی" : "Biology", color: "#FFDD94" },
        wed: { subject: isBadini ? "پێداچوونەڤا گشتی" : isKu ? "پێداچوونەوەی گشتی" : "General Review", color: "#FFDD94" },
        thu: { subject: isBadini ? "پرسیارێن وزاری" : isKu ? "پرسیاری وزاری" : "Past Papers", color: "#60A5FA" },
        fri: { subject: isBadini ? "خویندنا ئازاد" : isKu ? "خوێندنی ئازاد" : "Free Study", color: "#86E3CE" }
      }
    };
  });

  const [editingSlot, setEditingSlot] = useState<{ time: string; dayId: string; subject: string; color: string } | null>(null);

  const weeklyDays = [
    { id: "sat", nameBadini: "شەمبی", nameKu: "شەممە", nameEn: "Sat" },
    { id: "sun", nameBadini: "ئێک شەمبی", nameKu: "یەکشەممە", nameEn: "Sun" },
    { id: "mon", nameBadini: "دوو شەمبی", nameKu: "دووشەممە", nameEn: "Mon" },
    { id: "tue", nameBadini: "سێ شەمبی", nameKu: "سێشەممە", nameEn: "Tue" },
    { id: "wed", nameBadini: "چار شەمبی", nameKu: "چوارشەممە", nameEn: "Wed" },
    { id: "thu", nameBadini: "پێنج شەمبی", nameKu: "پێنجشەممە", nameEn: "Thu" },
    { id: "fri", nameBadini: "ئەینی", nameKu: "هەینی", nameEn: "Fri" },
  ];

  const weeklyHours = [
    "08:00 AM - 10:00 AM",
    "10:30 AM - 12:30 PM",
    "02:00 PM - 04:00 PM",
    "05:00 PM - 07:00 PM",
    "08:00 PM - 10:00 PM",
  ];

  const quickSubjects = [
    { name: isBadini ? "بیرکاری" : isKu ? "بیرکاری" : "Math", color: "#86E3CE" },
    { name: isBadini ? "فیزیا" : isKu ? "فیزیا" : "Physics", color: "#60A5FA" },
    { name: isBadini ? "کیمیا" : isKu ? "کیمیا" : "Chemistry", color: "#CCABD8" },
    { name: isBadini ? "زیندەوەر" : isKu ? "زیندەوەرزانی" : "Biology", color: "#FFDD94" },
    { name: isBadini ? "کوردی" : isKu ? "کوردی" : "Kurdish", color: "#FA897B" },
    { name: isBadini ? "عەرەبی" : isKu ? "عەرەبی" : "Arabic", color: "#F4B6C2" },
    { name: isBadini ? "ئینگلیزی" : isKu ? "ئینگلیزی" : "English", color: "#A3E1D4" },
    { name: isBadini ? "پرسیارێن وزاری" : isKu ? "پرسیاری وزاری" : "Past Papers", color: "#60A5FA" },
    { name: isBadini ? "پشوودان" : isKu ? "پشوودان" : "Break", color: "#FFDD94" },
  ];

  const handleLoadGrade12Preset = () => {
    setWeeklySchedule({
      "08:00 AM - 10:00 AM": {
        sat: { subject: isBadini ? "بیرکاری" : isKu ? "بیرکاری" : "Math", color: "#86E3CE" },
        sun: { subject: isBadini ? "زیندەوەر" : isKu ? "زیندەوەرزانی" : "Biology", color: "#FFDD94" },
        mon: { subject: isBadini ? "کیمیا" : isKu ? "کیمیا" : "Chemistry", color: "#CCABD8" },
        tue: { subject: isBadini ? "فیزیا" : isKu ? "فیزیا" : "Physics", color: "#60A5FA" },
        wed: { subject: isBadini ? "بیرکاری" : isKu ? "بیرکاری" : "Math", color: "#86E3CE" },
        thu: { subject: isBadini ? "زیندەوەر" : isKu ? "زیندەوەرزانی" : "Biology", color: "#FFDD94" },
        fri: { subject: isBadini ? "تاقیکردنەڤا خۆیی" : isKu ? "تاقیکردنەوەی خۆیی" : "Self Test", color: "#FA897B" }
      },
      "10:30 AM - 12:30 PM": {
        sat: { subject: isBadini ? "فیزیا" : isKu ? "فیزیا" : "Physics", color: "#60A5FA" },
        sun: { subject: isBadini ? "بیرکاری" : isKu ? "بیرکاری" : "Math", color: "#86E3CE" },
        mon: { subject: isBadini ? "زیندەوەر" : isKu ? "زیندەوەرزانی" : "Biology", color: "#FFDD94" },
        tue: { subject: isBadini ? "کیمیا" : isKu ? "کیمیا" : "Chemistry", color: "#CCABD8" },
        wed: { subject: isBadini ? "فیزیا" : isKu ? "فیزیا" : "Physics", color: "#60A5FA" },
        thu: { subject: isBadini ? "بیرکاری" : isKu ? "بیرکاری" : "Math", color: "#86E3CE" },
        fri: { subject: isBadini ? "پێداچوونەڤا هەفتێ" : isKu ? "پێداچوونەوەی هەفتە" : "Weekly Review", color: "#86E3CE" }
      },
      "02:00 PM - 04:00 PM": {
        sat: { subject: isBadini ? "پشوودان" : isKu ? "پشوودان" : "Break & Review", color: "#FFDD94" },
        sun: { subject: isBadini ? "عەرەبی" : isKu ? "عەرەبی" : "Arabic", color: "#FA897B" },
        mon: { subject: isBadini ? "بیرکاری" : isKu ? "بیرکاری" : "Math", color: "#86E3CE" },
        tue: { subject: isBadini ? "عەرەبی" : isKu ? "عەرەبی" : "Arabic", color: "#FA897B" },
        wed: { subject: isBadini ? "ئینگلیزی" : isKu ? "ئینگلیزی" : "English", color: "#86E3CE" },
        thu: { subject: isBadini ? "کوردی" : isKu ? "کوردی" : "Kurdish", color: "#CCABD8" },
        fri: { subject: isBadini ? "پشوودان" : isKu ? "پشوودان" : "Break", color: "#FFDD94" }
      },
      "05:00 PM - 07:00 PM": {
        sat: { subject: isBadini ? "کیمیا" : isKu ? "کیمیا" : "Chemistry", color: "#CCABD8" },
        sun: { subject: isBadini ? "فیزیا" : isKu ? "فیزیا" : "Physics", color: "#60A5FA" },
        mon: { subject: isBadini ? "کوردی" : isKu ? "کوردی" : "Kurdish", color: "#FA897B" },
        tue: { subject: isBadini ? "بیرکاری" : isKu ? "بیرکاری" : "Math", color: "#86E3CE" },
        wed: { subject: isBadini ? "کیمیا" : isKu ? "کیمیا" : "Chemistry", color: "#CCABD8" },
        thu: { subject: isBadini ? "عەرەبی" : isKu ? "عەرەبی" : "Arabic", color: "#FA897B" },
        fri: { subject: isBadini ? "ئامادەسازی هەفتێ" : isKu ? "ئامادەسازی هەفتە" : "Next Week Prep", color: "#CCABD8" }
      },
      "08:00 PM - 10:00 PM": {
        sat: { subject: isBadini ? "کوردی" : isKu ? "کوردی" : "Kurdish", color: "#FA897B" },
        sun: { subject: isBadini ? "ئینگلیزی" : isKu ? "ئینگلیزی" : "English", color: "#86E3CE" },
        mon: { subject: isBadini ? "پرسیارێن وزاری" : isKu ? "پرسیاری وزاری" : "Past Papers", color: "#60A5FA" },
        tue: { subject: isBadini ? "زیندەوەر" : isKu ? "زیندەوەرزانی" : "Biology", color: "#FFDD94" },
        wed: { subject: isBadini ? "پێداچوونەڤا گشتی" : isKu ? "پێداچوونەوەی گشتی" : "General Review", color: "#FFDD94" },
        thu: { subject: isBadini ? "پرسیارێن وزاری" : isKu ? "پرسیاری وزاری" : "Past Papers", color: "#60A5FA" },
        fri: { subject: isBadini ? "خویندنا ئازاد" : isKu ? "خوێندنی ئازاد" : "Free Study", color: "#86E3CE" }
      }
    });
  };

  const handleSaveSlot = () => {
    if (!editingSlot) return;
    const { time, dayId, subject, color } = editingSlot;
    const newSchedule = { ...weeklySchedule };
    if (!newSchedule[time]) newSchedule[time] = {};
    if (subject.trim()) {
      newSchedule[time][dayId] = { subject: subject.trim(), color };
    } else {
      delete newSchedule[time][dayId];
    }
    setWeeklySchedule(newSchedule);
    setEditingSlot(null);
  };

  // Pastel palette from the user's reference image
  const pastelColors = [
    { code: "#86E3CE", label: "Mint" },
    { code: "#D0E6A5", label: "Green" },
    { code: "#FFDD94", label: "Yellow" },
    { code: "#FA897B", label: "Peach" },
    { code: "#CCABD8", label: "Purple" },
  ];

  const themeOptions: {
    id: PlannerTheme;
    nameKu: string;
    nameBadini: string;
    nameEn: string;
    bgClass: string;
    cardBg: string;
    border: string;
    accent: string;
  }[] = [
    {
      id: "snow",
      nameKu: "سپی پەتاری (100% White)",
      nameBadini: "سپیی پەتاری (100% White)",
      nameEn: "Pure White & Mint",
      bgClass: "bg-white text-slate-900",
      cardBg: "bg-slate-50",
      border: "border-slate-200",
      accent: "#86E3CE"
    },
    {
      id: "matcha",
      nameKu: "ماتچای سروشت",
      nameBadini: "ماتچا و سروشت",
      nameEn: "Matcha Zen",
      bgClass: "bg-[#f4f8f3] text-slate-900",
      cardBg: "bg-[#e8f2e6]",
      border: "border-[#c8dec4]",
      accent: "#8bbd56"
    },
    {
      id: "peach",
      nameKu: "قۆخ و کرێمی",
      nameBadini: "قۆخ و کرێمی",
      nameEn: "Peach & Cream",
      bgClass: "bg-[#fffbf6] text-slate-900",
      cardBg: "bg-[#fef3e7]",
      border: "border-[#fae3cb]",
      accent: "#FA897B"
    },
    {
      id: "lavender",
      nameKu: "لاڤێندەری ئارام",
      nameBadini: "لاڤێندەرێ ئارام",
      nameEn: "Lavender Mist",
      bgClass: "bg-[#f9f8fe] text-slate-900",
      cardBg: "bg-[#f1edfb]",
      border: "border-[#e1d7f8]",
      accent: "#CCABD8"
    },
    {
      id: "sky",
      nameKu: "ئاسمانی سادە",
      nameBadini: "ئاسمانی سادە",
      nameEn: "Soft Sky",
      bgClass: "bg-[#f4f9ff] text-slate-900",
      cardBg: "bg-[#e6f2ff]",
      border: "border-[#bfdfff]",
      accent: "#60A5FA"
    }
  ];

  const currentThemeConfig = themeOptions.find((t) => t.id === activeTheme) || themeOptions[0];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const monthNames = isBadini || isKu
    ? [
        "کانوونا دووێ", "شوبات", "ئادار", "نیسان", "گولان", "حوزەیران",
        "تەباخ", "ئاب", "ئەیلوول", "تشرینا ئێکێ", "تشرینا دووێ", "کانوونا ئێکێ"
      ]
    : [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

  const dayNames = isBadini || isKu
    ? ["یکش", "دووش", "سێش", "چوارش", "پێنج", "هەینی", "شەم"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const currentTasks = tasks[selectedDate] || [];
    const newTask: DayTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false,
      color: selectedColor,
      startTime: startTime.trim() || undefined,
      endTime: endTime.trim() || undefined,
    };
    setTasks({
      ...tasks,
      [selectedDate]: [...currentTasks, newTask]
    });
    setNewTaskText("");
    setStartTime("");
    setEndTime("");
  };

  const handleColorDay = (colorCode: string) => {
    setSelectedColor(colorCode);
    setDateColors((prev) => {
      if (prev[selectedDate] === colorCode) {
        const next = { ...prev };
        delete next[selectedDate];
        return next;
      }
      return { ...prev, [selectedDate]: colorCode };
    });
  };

  const handleToggleTask = (taskId: number) => {
    const currentTasks = tasks[selectedDate] || [];
    setTasks({
      ...tasks,
      [selectedDate]: currentTasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    });
  };

  const handleDeleteTask = (taskId: number) => {
    const currentTasks = tasks[selectedDate] || [];
    setTasks({
      ...tasks,
      [selectedDate]: currentTasks.filter((t) => t.id !== taskId)
    });
  };

  const currentDayTasks = tasks[selectedDate] || [];

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`max-w-4xl mx-auto my-4 rounded-3xl border shadow-xl p-6 sm:p-10 font-sans transition-all duration-300 animate-fadeIn ${currentThemeConfig.bgClass} ${currentThemeConfig.border}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200/80 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#86E3CE] via-[#FFDD94] to-[#FA897B] flex items-center justify-center shrink-0 shadow-sm">
            <CalendarIcon className="w-6 h-6 text-slate-900 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {isBadini ? "ڕوژمێر و پلانا خویندنێ" : isKu ? "ڕۆژمێر و پلانی خوێندن" : "Study Calendar & Planner"}
            </h1>
            <p className="text-xs sm:text-sm font-bold text-slate-500 mt-0.5">
              {isBadini
                ? "ب ڕەنگێن جوان و سادە پلانا ڕۆژێن خو ڕێکبێخە"
                : isKu
                ? "بە ڕەنگە جوان و سادەکان پلانی ڕۆژەکانت ڕێکبخە"
                : "Plan your study days with a simple pastel calendar"}
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition shrink-0"
          >
            <ArrowLeft className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
            <span>{isBadini ? "ڤەگەڕە" : isKu ? "گەڕانەوە" : "Back"}</span>
          </button>
        )}
      </div>

      {/* Theme Selector Bar */}
      <div className={`flex flex-wrap items-center justify-between gap-3 p-4 mb-8 rounded-2xl border transition-all shadow-xs ${currentThemeConfig.cardBg} ${currentThemeConfig.border}`}>
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-800">
            {isBadini ? "🎨 ثیمێ ئارامکەر (هەلبژێرە ب دلێ خۆ):" : isKu ? "🎨 تیمی ئارامکەرە (بە دڵی خۆت هەڵبژێرە):" : "🎨 Calming Theme:"}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {themeOptions.map((th) => {
            const isSelected = activeTheme === th.id;
            const label = isBadini ? th.nameBadini : isKu ? th.nameKu : th.nameEn;
            return (
              <button
                key={th.id}
                onClick={() => setActiveTheme(th.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all transform ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-md scale-105"
                    : "bg-white/90 text-slate-700 hover:bg-white border border-slate-200/80 shadow-2xs"
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full shadow-2xs" style={{ backgroundColor: th.accent }} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Switcher: Daily Calendar vs Grade 12 Weekly Timetable */}
      <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-8 border-b border-slate-200/80 pb-5">
        <button
          type="button"
          onClick={() => setPlannerTab("daily")}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 transition transform cursor-pointer ${
            plannerTab === "daily"
              ? "bg-slate-900 text-white shadow-md scale-[1.02]"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-2xs"
          }`}
        >
          <CalendarIcon className="w-4 h-4 text-[#86E3CE]" />
          <span>{isBadini ? "📅 پلانا ڕۆژانە (ساڵنامە)" : isKu ? "📅 پلانی ڕۆژانە (ساڵنامە)" : "📅 Daily Calendar Planner"}</span>
        </button>
        <button
          type="button"
          onClick={() => setPlannerTab("weekly")}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 transition transform cursor-pointer ${
            plannerTab === "weekly"
              ? "bg-slate-900 text-white shadow-md scale-[1.02]"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-2xs"
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#60A5FA]" />
          <span>{isBadini ? "🗓️ پلانا حەفتیانە (خشتێ هەفتێ یێ پۆلا ١٢)" : isKu ? "🗓️ پلانی هەفتانە (خشتەی هەفتەی پۆلی ١٢)" : "🗓️ Grade 12 Weekly Timetable"}</span>
        </button>
        <button
          type="button"
          onClick={() => setPlannerTab("syllabus")}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 transition transform cursor-pointer ${
            plannerTab === "syllabus"
              ? "bg-slate-900 text-white shadow-md scale-[1.02]"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-2xs"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>{isBadini ? "📚 سیلاَبس و ئەنالیزینگا وزاری (پۆلا ١٢)" : isKu ? "📚 سیلاَبس و ئەنالیزینگی وزاری (پۆلی ١٢)" : "📚 Grade 12 Ministerial Syllabus & Analytics"}</span>
        </button>
      </div>

      {/* DAILY CALENDAR TAB */}
      {plannerTab === "daily" && (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Calendar Section */}
        <div className={`md:col-span-7 rounded-3xl p-5 sm:p-6 border shadow-sm transition-all ${currentThemeConfig.cardBg} ${currentThemeConfig.border}`}>
          
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6 px-1">
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              {monthNames[month]} <span className="text-slate-400 font-bold">{year}</span>
            </h2>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition shadow-2xs"
              >
                <ChevronRight className={`w-4 h-4 ${isRtl ? "" : "rotate-180"}`} />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition shadow-2xs"
              >
                <ChevronLeft className={`w-4 h-4 ${isRtl ? "" : "rotate-180"}`} />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3 text-center">
            {dayNames.map((day, idx) => (
              <div key={idx} className="text-xs font-black text-slate-400 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-11 sm:h-12 rounded-2xl opacity-0" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
              const isSelected = selectedDate === dateStr;
              const isToday =
                new Date().toISOString().split("T")[0] === dateStr;
              const dayTasksCount = tasks[dateStr]?.length || 0;
              const completedCount = tasks[dateStr]?.filter((t) => t.completed).length || 0;
              const dayCustomColor = dateColors[dateStr];

              return (
                <button
                  key={dayNum}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`h-12 sm:h-14 rounded-2xl font-black text-sm sm:text-base flex flex-col items-center justify-center relative transition-all duration-200 ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-md scale-105 z-10"
                      : dayCustomColor
                      ? "text-slate-900 shadow-xs font-black scale-[1.02]"
                      : isToday
                      ? "bg-[#86E3CE]/30 text-slate-900 border-2 border-[#86E3CE] font-black"
                      : "bg-white text-slate-700 hover:bg-slate-100/80 border border-slate-200/80 shadow-2xs"
                  }`}
                  style={{
                    backgroundColor: !isSelected && dayCustomColor ? `${dayCustomColor}50` : undefined,
                    borderColor: !isSelected && dayCustomColor ? dayCustomColor : undefined,
                    borderWidth: !isSelected && dayCustomColor ? "2px" : undefined,
                    boxShadow: isSelected && dayCustomColor ? `0 0 0 3px ${dayCustomColor}` : undefined
                  }}
                >
                  <span>{dayNum}</span>
                  
                  {/* Task Indicators */}
                  {dayTasksCount > 0 && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          completedCount === dayTasksCount ? "bg-[#86E3CE]" : "bg-[#FA897B]"
                        }`}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Pastel Palette Legend Display - Interactive */}
          <div className="mt-6 pt-5 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-700 flex items-center gap-1">
                🎨 {isBadini ? "ڕەنگێن جوان (کلیک بکە بۆ ڕەنگکرنا ڕۆژێ):" : isKu ? "ڕەنگەکان (کلیک بکە بۆ ڕەنگکردنی ڕۆژەکە):" : "Day Colors (Click to color day):"}
              </span>
              {dateColors[selectedDate] && (
                <button
                  type="button"
                  onClick={() => setDateColors(p => { const n = {...p}; delete n[selectedDate]; return n; })}
                  className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-lg hover:bg-rose-100 transition"
                >
                  {isBadini ? "ڕەنگێ لادە" : isKu ? "سڕینەوەی ڕەنگ" : "Clear Color"}
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              {pastelColors.map((col) => {
                const isDayColored = dateColors[selectedDate] === col.code;
                return (
                  <button
                    key={col.code}
                    type="button"
                    onClick={() => handleColorDay(col.code)}
                    className={`w-6 h-6 rounded-full shadow-xs transition transform hover:scale-110 flex items-center justify-center ${
                      isDayColored ? "scale-125 ring-2 ring-slate-900 ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: col.code }}
                    title={col.label}
                  >
                    {isDayColored && <Check className="w-3.5 h-3.5 stroke-[3] text-slate-900" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tasks Section for Selected Date */}
        <div className={`md:col-span-5 flex flex-col rounded-3xl p-5 sm:p-6 border shadow-sm transition-all ${currentThemeConfig.cardBg} ${currentThemeConfig.border}`}>
          
          <div className="pb-4 mb-4 border-b border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
                {isBadini ? "پلانا ڕوژا هەلبژارتی" : isKu ? "پلانی ڕۆژی هەڵبژێردراو" : "Selected Day Plan"}
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-0.5">
                {selectedDate}
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-bold text-xs shadow-2xs">
              {currentDayTasks.filter((t) => t.completed).length} / {currentDayTasks.length}
            </span>
          </div>

          {/* Add Task Form - Cohesive Unified Card */}
          <form onSubmit={handleAddTask} className="mb-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 space-y-4 transition-all overflow-hidden">
            {/* Top Row: Task Name Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#86E3CE]" />
                  {isBadini ? "١. ناڤێ ئەرکی بنڤیسە:" : isKu ? "١. ناونیشانی ئەرک بنووسە:" : "1. Task Name:"}
                </span>
              </label>

              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder={isBadini ? "بۆ نموونە: خواندنا فیزیا بەشێ ١..." : isKu ? "بۆ نموونە: خوێندنی فیزیا بەشی ١..." : "Enter study task (e.g., Read Physics Ch. 1)..."}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900 transition shadow-2xs"
              />
            </div>

            {/* Time Section Box: Enclosed inside inner card */}
            <div className="bg-slate-50/90 p-3.5 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-500 stroke-[2.5]" />
                  <span>{isBadini ? "٢. دەمێ خوێندنێ:" : isKu ? "٢. کاتی خوێندن:" : "2. Study Time:"}</span>
                </span>
                {(startTime || endTime) && (
                  <button
                    type="button"
                    onClick={() => { setStartTime(""); setEndTime(""); }}
                    className="text-[11px] font-bold text-rose-500 hover:text-rose-600 bg-rose-50 px-2 py-0.5 rounded-lg transition flex items-center gap-1"
                  >
                    <span>{isBadini ? "سڕینەڤە" : isKu ? "سڕینەوە" : "Clear"}</span>
                    <span>✕</span>
                  </button>
                )}
              </div>

              {/* Quick Preset Buttons */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                  ⚡ {isBadini ? "هەلبژاردنا خێرا ب ١ کلیک:" : isKu ? "هەڵبژاردنی خێرا بە ١ کلیک:" : "Quick 1-Click Select:"}
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {timeSlotPresets.map((slot) => {
                    const isSelected = startTime === slot.start && endTime === slot.end;
                    return (
                      <button
                        key={`modal-${slot.id}`}
                        type="button"
                        onClick={() => { setStartTime(slot.start); setEndTime(slot.end); }}
                        className={`relative overflow-hidden p-3 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-between border cursor-pointer group min-h-[54px] ${
                          isSelected
                            ? slot.activeRing + " scale-[1.02] z-10"
                            : "border-slate-300/80 hover:scale-[1.01] hover:border-slate-400 shadow-2xs"
                        }`}
                        style={{
                          backgroundImage: `url(${slot.bgImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        {/* Translucent Overlay for text contrast */}
                        <div className={`absolute inset-0 transition-opacity ${slot.overlayGradient} ${isSelected ? "opacity-85" : "opacity-70 group-hover:opacity-50"}`} />

                        {/* Content */}
                        <div className="relative z-10 flex items-center justify-between w-full text-white">
                          <div className="flex items-center gap-2">
                            <span className="text-lg drop-shadow-md">{slot.icon}</span>
                            <span className="font-black text-xs sm:text-sm tracking-wide drop-shadow-md">
                              {isBadini ? slot.labelBadini : isKu ? slot.labelKu : slot.labelEn}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] sm:text-[11px] font-mono font-black drop-shadow-md bg-black/50 px-2 py-0.5 rounded-lg border border-white/20 text-amber-200">
                              {slot.range}
                            </span>
                            {isSelected && (
                              <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-[10px] shadow-md">
                                ✓
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Exact Time Dropdown Selectors - Custom Sleek UI without native browser select! */}
              <div className="pt-2.5 border-t border-slate-200/60 flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] font-bold text-slate-500">
                  {isBadini ? "یان کاتژمێر دیار بکە:" : isKu ? "یان کاتژمێر دیاری بکە:" : "Or select time:"}
                </span>
                <div className="flex items-center gap-2 flex-wrap relative">
                  {/* Start Time Custom Select */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => { setOpenStartDropdown(!openStartDropdown); setOpenEndDropdown(false); }}
                      className={`flex items-center justify-between gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border text-xs font-black transition cursor-pointer shadow-2xs ${
                        openStartDropdown ? "border-indigo-500 ring-2 ring-indigo-500/20 text-indigo-900" : "border-slate-200 hover:border-slate-300 text-slate-800"
                      }`}
                    >
                      <span className="text-[10px] text-indigo-500 font-bold">{isBadini || isKu ? "ژ:" : "From:"}</span>
                      <span>{startTime || (isBadini || isKu ? "دەسپێک..." : "Start...")}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${openStartDropdown ? "rotate-180 text-indigo-600" : ""}`} />
                    </button>

                    {openStartDropdown && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setOpenStartDropdown(false)} />
                        <div className="absolute right-0 sm:left-0 bottom-full mb-1.5 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                          <div className="text-[11px] font-black text-slate-700 px-3 py-2.5 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between">
                            <span>{isBadini || isKu ? "کاتژمێرێ دەسپێکێ دیار بکە:" : "Select Start Time:"}</span>
                            {startTime && (
                              <button type="button" onClick={() => { setStartTime(""); setOpenStartDropdown(false); }} className="text-red-500 hover:underline text-[10px]">
                                {isBadini || isKu ? "سڕینەوە" : "Clear"}
                              </button>
                            )}
                          </div>
                          <div className="p-2 max-h-52 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-1">
                              {timeOptions.map((t) => {
                                const isSel = startTime === t;
                                const isAM = t.includes("AM");
                                return (
                                  <button
                                    key={`start-opt-${t}`}
                                    type="button"
                                    onClick={() => { setStartTime(t); setOpenStartDropdown(false); }}
                                    className={`px-2 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                                      isSel
                                        ? "bg-slate-900 text-white font-black shadow-xs scale-[1.02]"
                                        : "text-slate-700 hover:bg-slate-100/80 bg-slate-50/50"
                                    }`}
                                  >
                                    <span>{t}</span>
                                    <span className="text-[10px] opacity-70">{isAM ? "🌅" : "🌙"}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <span className="text-slate-400 font-black text-xs">-</span>

                  {/* End Time Custom Select */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => { setOpenEndDropdown(!openEndDropdown); setOpenStartDropdown(false); }}
                      className={`flex items-center justify-between gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border text-xs font-black transition cursor-pointer shadow-2xs ${
                        openEndDropdown ? "border-indigo-500 ring-2 ring-indigo-500/20 text-indigo-900" : "border-slate-200 hover:border-slate-300 text-slate-800"
                      }`}
                    >
                      <span className="text-[10px] text-indigo-500 font-bold">{isBadini || isKu ? "بۆ:" : "To:"}</span>
                      <span>{endTime || (isBadini || isKu ? "دوماهیک..." : "End...")}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${openEndDropdown ? "rotate-180 text-indigo-600" : ""}`} />
                    </button>

                    {openEndDropdown && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setOpenEndDropdown(false)} />
                        <div className="absolute right-0 sm:left-0 bottom-full mb-1.5 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                          <div className="text-[11px] font-black text-slate-700 px-3 py-2.5 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between">
                            <span>{isBadini || isKu ? "کاتژمێرێ دوماهیکێ دیار بکە:" : "Select End Time:"}</span>
                            {endTime && (
                              <button type="button" onClick={() => { setEndTime(""); setOpenEndDropdown(false); }} className="text-red-500 hover:underline text-[10px]">
                                {isBadini || isKu ? "سڕینەوە" : "Clear"}
                              </button>
                            )}
                          </div>
                          <div className="p-2 max-h-52 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-1">
                              {timeOptions.map((t) => {
                                const isSel = endTime === t;
                                const isAM = t.includes("AM");
                                return (
                                  <button
                                    key={`end-opt-${t}`}
                                    type="button"
                                    onClick={() => { setEndTime(t); setOpenEndDropdown(false); }}
                                    className={`px-2 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                                      isSel
                                        ? "bg-slate-900 text-white font-black shadow-xs scale-[1.02]"
                                        : "text-slate-700 hover:bg-slate-100/80 bg-slate-50/50"
                                    }`}
                                  >
                                    <span>{t}</span>
                                    <span className="text-[10px] opacity-70">{isAM ? "🌅" : "🌙"}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Color Selector Box */}
            <div className="flex items-center justify-between gap-2 bg-slate-50/90 p-3 rounded-xl border border-slate-200/80">
              <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                <span>٣. {isBadini ? "ڕەنگێ ئەرکی:" : isKu ? "ڕەنگی ئەرک:" : "Task Color:"}</span>
              </span>
              <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-slate-200 shadow-2xs">
                {pastelColors.map((col) => (
                  <button
                    key={col.code}
                    type="button"
                    onClick={() => setSelectedColor(col.code)}
                    className={`w-5 h-5 rounded-full transition transform flex items-center justify-center ${
                      selectedColor === col.code ? "scale-125 ring-2 ring-slate-900 ring-offset-1 shadow-xs" : "opacity-80 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: col.code }}
                    title={col.label}
                  >
                    {selectedColor === col.code && <Check className="w-3 h-3 stroke-[3] text-slate-900" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button - Full Width at Bottom of Card */}
            <button
              type="submit"
              disabled={!newTaskText.trim()}
              className="w-full py-3 rounded-xl bg-slate-900 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>{isBadini ? "ئەرکێ نوی زێدەکە بۆ ڤێ ڕۆژێ" : isKu ? "زیادکردنی ئەرک بۆ ئەم ڕۆژە" : "Add Task to This Day"}</span>
            </button>
          </form>

          {/* Tasks List */}
          <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[340px] pr-1">
            {currentDayTasks.length === 0 ? (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-2xs">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold">
                  {isBadini ? "چ ئەرک بۆ ڤێ ڕوژێ نەهاتینە زێدەکردن" : isKu ? "هیچ ئەرکێک بۆ ئەم ڕۆژە نەنووسراوە" : "No tasks planned for this day"}
                </p>
              </div>
            ) : (
              currentDayTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 ${
                    task.completed
                      ? "bg-slate-100/60 border-slate-200/60 opacity-60 line-through"
                      : "bg-white border-slate-200/80 shadow-2xs"
                  }`}
                  style={{
                    borderRightColor: isRtl && !task.completed ? task.color : undefined,
                    borderLeftColor: !isRtl && !task.completed ? task.color : undefined,
                    borderRightWidth: isRtl && !task.completed ? "6px" : undefined,
                    borderLeftWidth: !isRtl && !task.completed ? "6px" : undefined,
                  }}
                >
                  <div
                    onClick={() => handleToggleTask(task.id)}
                    className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer select-none"
                  >
                    <div
                      className="w-5 h-5 rounded-lg flex items-center justify-center transition shrink-0 shadow-2xs"
                      style={{
                        backgroundColor: task.completed ? task.color : "transparent",
                        border: `2px solid ${task.color}`,
                        color: task.completed ? "#0f1219" : "transparent"
                      }}
                    >
                      {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className={`text-sm font-bold text-slate-800 truncate ${task.completed ? "line-through opacity-70" : ""}`}>
                        {task.text}
                      </span>
                      {(task.startTime || task.endTime) && (
                        <span className="text-[11px] font-black text-slate-600 flex items-center gap-1 mt-0.5 bg-slate-100/80 px-2 py-0.5 rounded-md w-fit">
                          ⏰ {isBadini || isKu ? "ژ" : "From"} {task.startTime || "..."} {isBadini || isKu ? "بۆ" : "to"} {task.endTime || "..."}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition shrink-0"
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

      {/* WEEKLY TIMETABLE TAB */}
      {plannerTab === "weekly" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Banner with Presets and Info */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800">
            <div className="space-y-1.5">
              <h2 className="text-lg sm:text-xl font-black flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                <span>{isBadini ? "خشتێ حەفتیانە یێ خویندنا پۆلا ١٢" : isKu ? "خشتەی هەفتانەی خوێندنی پۆلی ١٢" : "Grade 12 Weekly Study Timetable"}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-bold">
                {isBadini
                  ? "ل سەر هەر خانەیەکێ کلیک بکە بۆ دیارکردنا وانێ یان گوهورینێ، یان پلانا ئامادە بکاربینە"
                  : isKu
                  ? "لە سەر هەر خانەیەک کلیک بکە بۆ دیاریکردنی وانە یان گۆڕین، یان پلانی ئامادە بەکاربێنە"
                  : "Click any slot to customize your study plan or load our Grade 12 high-achiever preset"}
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap shrink-0">
              <button
                type="button"
                onClick={handleLoadGrade12Preset}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md hover:shadow-lg transition active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 stroke-[2.5]" />
                <span>{isBadini ? "✨ پلانا ئامادە یا پۆلا ١٢ (١ کلیک)" : isKu ? "✨ پلانی ئامادەی پۆلی ١٢ (١ کلیک)" : "✨ Load Grade 12 Preset"}</span>
              </button>
              <button
                type="button"
                onClick={() => setWeeklySchedule({})}
                className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isBadini ? "پاقژکردنەڤە" : isKu ? "پاککردنەوە" : "Clear"}</span>
              </button>
            </div>
          </div>

          {/* Color Legend */}
          <div className="flex items-center gap-4 px-3 py-3.5 bg-white/90 rounded-2xl border border-slate-200/80 text-xs font-black text-slate-700 overflow-x-auto shadow-2xs">
            <span className="shrink-0 text-slate-800">{isBadini ? "📌 پۆلینکردنا وانان:" : isKu ? "📌 پۆلێنکردنی وانەکان:" : "📌 Subjects Legend:"}</span>
            <span className="flex items-center gap-1.5 shrink-0"><span className="w-3 h-3 rounded-full bg-[#86E3CE] shadow-2xs" /> {isBadini ? "بیرکاری" : "Math"}</span>
            <span className="flex items-center gap-1.5 shrink-0"><span className="w-3 h-3 rounded-full bg-[#60A5FA] shadow-2xs" /> {isBadini ? "فیزیا" : "Physics"}</span>
            <span className="flex items-center gap-1.5 shrink-0"><span className="w-3 h-3 rounded-full bg-[#CCABD8] shadow-2xs" /> {isBadini ? "کیمیا" : "Chemistry"}</span>
            <span className="flex items-center gap-1.5 shrink-0"><span className="w-3 h-3 rounded-full bg-[#FFDD94] shadow-2xs" /> {isBadini ? "زیندەوەر" : "Biology"}</span>
            <span className="flex items-center gap-1.5 shrink-0"><span className="w-3 h-3 rounded-full bg-[#FA897B] shadow-2xs" /> {isBadini ? "کوردی" : "Kurdish"}</span>
            <span className="flex items-center gap-1.5 shrink-0"><span className="w-3 h-3 rounded-full bg-[#F4B6C2] shadow-2xs" /> {isBadini ? "عەرەبی" : "Arabic"}</span>
            <span className="flex items-center gap-1.5 shrink-0"><span className="w-3 h-3 rounded-full bg-[#A3E1D4] shadow-2xs" /> {isBadini ? "ئینگلیزی" : "English"}</span>
          </div>

          {/* Weekly Timetable Grid */}
          <div className={`rounded-3xl p-4 sm:p-6 border shadow-sm overflow-x-auto ${currentThemeConfig.cardBg} ${currentThemeConfig.border}`}>
            <div className="min-w-[760px] grid grid-cols-8 gap-2.5">
              {/* Column 1: Time Slots */}
              <div className="space-y-2.5 pt-11">
                {weeklyHours.map((time) => (
                  <div key={time} className="h-16 flex flex-col justify-center text-right pr-2.5 font-mono text-[11px] font-black text-slate-700 bg-white/80 rounded-xl px-2 border border-slate-200 shadow-2xs">
                    <span className="text-slate-900 font-extrabold text-xs">{time.split(" - ")[0]}</span>
                    <span className="text-slate-400 text-[10px] font-sans font-bold">بۆ {time.split(" - ")[1]}</span>
                  </div>
                ))}
              </div>

              {/* Columns 2-8: Days */}
              {weeklyDays.map((day) => (
                <div key={day.id} className="space-y-2.5">
                  <div className="text-center py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-black shadow-xs">
                    {isBadini ? day.nameBadini : isKu ? day.nameKu : day.nameEn}
                  </div>
                  {weeklyHours.map((time) => {
                    const slot = weeklySchedule[time]?.[day.id];
                    const hasSubject = !!slot?.subject;
                    return (
                      <div
                        key={`${day.id}-${time}`}
                        onClick={() => setEditingSlot({
                          time,
                          dayId: day.id,
                          subject: slot?.subject || "",
                          color: slot?.color || "#86E3CE"
                        })}
                        className={`h-16 p-2 rounded-2xl text-xs font-bold flex flex-col items-center justify-center text-center transition cursor-pointer hover:scale-[1.03] hover:shadow-md select-none border ${
                          hasSubject
                            ? "text-slate-900 font-black shadow-sm"
                            : "bg-white/60 border-dashed border-slate-300 text-slate-400 hover:bg-white/90 hover:text-slate-600 hover:border-slate-400"
                        }`}
                        style={hasSubject ? { backgroundColor: slot.color, borderColor: slot.color } : {}}
                      >
                        {hasSubject ? (
                          <span className="line-clamp-2 leading-tight drop-shadow-2xs">{slot.subject}</span>
                        ) : (
                          <span className="text-[11px] flex items-center gap-1 font-normal opacity-75">
                            <Plus className="w-3.5 h-3.5" />
                            {isBadini ? "وانێ بدانە" : "Add"}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SYLLABUS & MINISTERIAL ANALYTICS TAB */}
      {plannerTab === "syllabus" && (
        <Grade12SyllabusTab language={language} />
      )}

      {/* Interactive Slot Editor Modal */}
      {editingSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div>
                <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <span>{isBadini ? "دیارکردنا وانێ بۆ ڤی دەمی:" : isKu ? "دیاریکردنی وانە بۆ ئەم کاتە:" : "Edit Study Slot"}</span>
                </h3>
                <p className="text-xs font-bold text-slate-500 mt-0.5 font-mono">
                  {weeklyDays.find((d) => d.id === editingSlot.dayId)?.[isBadini ? "nameBadini" : isKu ? "nameKu" : "nameEn"]} • {editingSlot.time}
                </p>
              </div>
              <button onClick={() => setEditingSlot(null)} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg bg-slate-100 font-bold">✕</button>
            </div>

            {/* Quick Subject Selectors */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-700 block">⚡ {isBadini ? "هەلبژاردنا خێرا یا وانێن پۆلا ١٢:" : isKu ? "هەڵبژاردنی خێرای وانەکانی پۆلی ١٢:" : "Quick Grade 12 Subjects:"}</label>
              <div className="flex flex-wrap gap-1.5">
                {quickSubjects.map((qs) => (
                  <button
                    key={qs.name}
                    type="button"
                    onClick={() => setEditingSlot({ ...editingSlot, subject: qs.name, color: qs.color })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                      editingSlot.subject === qs.name
                        ? "bg-slate-900 text-white shadow-sm scale-105"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: qs.color }} />
                    <span>{qs.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Subject Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-700 block">{isBadini ? "ناڤێ وانێ بنڤیسە:" : isKu ? "ناونیشانی وانە بنووسە:" : "Or Custom Subject Name:"}</label>
              <input
                type="text"
                value={editingSlot.subject}
                onChange={(e) => setEditingSlot({ ...editingSlot, subject: e.target.value })}
                placeholder={isBadini ? "بۆ نموونە: پێداچوونەڤا بیرکاری بەشێ ١..." : "Enter subject or task name..."}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
              />
            </div>

            {/* Color Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-700 block">{isBadini ? "ڕەنگێ وانێ:" : isKu ? "ڕەنگی وانە:" : "Slot Color:"}</label>
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                {pastelColors.map((col) => (
                  <button
                    key={col.code}
                    type="button"
                    onClick={() => setEditingSlot({ ...editingSlot, color: col.code })}
                    className={`w-7 h-7 rounded-full transition transform flex items-center justify-center ${
                      editingSlot.color === col.code ? "scale-125 ring-2 ring-slate-900 ring-offset-1 shadow-sm" : "opacity-80 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: col.code }}
                  >
                    {editingSlot.color === col.code && <Check className="w-3.5 h-3.5 stroke-[3] text-slate-900" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              {editingSlot.subject && (
                <button
                  type="button"
                  onClick={() => {
                    const newSch = { ...weeklySchedule };
                    if (newSch[editingSlot.time]) {
                      delete newSch[editingSlot.time][editingSlot.dayId];
                    }
                    setWeeklySchedule(newSch);
                    setEditingSlot(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs transition"
                >
                  {isBadini ? "سڕینەڤا خانێ" : isKu ? "سڕینەوەی خانە" : "Clear Slot"}
                </button>
              )}
              <button
                type="button"
                onClick={handleSaveSlot}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition active:scale-95 flex items-center gap-1.5"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>{isBadini ? "پاشکەوتکرن (سەڤکە)" : isKu ? "پاشەکەوتکردن" : "Save Slot"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

