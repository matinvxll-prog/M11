import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { Language, UserProfile } from "../types";
import { uiTranslations } from "../utils/i18n";
import {
  RefreshCw,
  CheckCircle2,
  Layers,
  BookOpen,
  Award,
  Flame,
  Calendar,
  Clock,
  TrendingUp,
  PieChart as PieChartIcon,
  Trophy,
  Plus,
  Save,
  Sparkles,
  BarChart3,
  CalendarDays,
  Check,
  Zap
} from "lucide-react";

interface StatisticsViewProps {
  user: UserProfile;
  language: Language;
}

// 7 Grade 12 Primary Subjects
export interface SubjectLogDef {
  id: string;
  nameKu: string;
  nameBadini: string;
  nameEn: string;
  icon: string;
  color: string;
}

export const GRADE_12_SUBJECTS: SubjectLogDef[] = [
  { id: "physics", nameKu: "فیزیا", nameBadini: "فیزیا", nameEn: "Physics", icon: "⚛️", color: "#3b82f6" },
  { id: "math", nameKu: "بیرکاری", nameBadini: "بیرکاری", nameEn: "Mathematics", icon: "➕", color: "#22c55e" },
  { id: "chemistry", nameKu: "کیمیا", nameBadini: "کیمیا", nameEn: "Chemistry", icon: "🧪", color: "#a855f7" },
  { id: "biology", nameKu: "زیندەوەر", nameBadini: "زیندەوەر", nameEn: "Biology", icon: "🧬", color: "#f97316" },
  { id: "kurdish", nameKu: "کوردی", nameBadini: "کوردی", nameEn: "Kurdish", icon: "📚", color: "#ec4899" },
  { id: "arabic", nameKu: "عەرەبی", nameBadini: "عەرەبی", nameEn: "Arabic", icon: "📖", color: "#eab308" },
  { id: "religion", nameKu: "ئاین", nameBadini: "ئاین", nameEn: "Islamic Studies", icon: "🌙", color: "#14b8a6" }
];

export interface DayStudyRecord {
  date: string; // YYYY-MM-DD
  dayLabelKu: string;
  dayLabelBadini: string;
  dayLabelEn: string;
  hours: Record<string, number>; // subjectId -> hours studied
}

// Default initial mock study history for 7 days of current week
const INITIAL_WEEKLY_RECORDS: DayStudyRecord[] = [
  {
    date: "2026-08-01",
    dayLabelKu: "شەممە",
    dayLabelBadini: "شەمبی",
    dayLabelEn: "Sat",
    hours: { physics: 2.5, math: 3.0, chemistry: 1.5, biology: 2.0, kurdish: 1.0, arabic: 0.5, religion: 0.5 }
  },
  {
    date: "2026-08-02",
    dayLabelKu: "یەکشەممە",
    dayLabelBadini: "یەکشەمبی",
    dayLabelEn: "Sun",
    hours: { physics: 1.5, math: 2.5, chemistry: 2.0, biology: 1.5, kurdish: 0.5, arabic: 0.5, religion: 0.5 }
  },
  {
    date: "2026-08-03",
    dayLabelKu: "دووشەممە",
    dayLabelBadini: "دووشەمبی",
    dayLabelEn: "Mon",
    hours: { physics: 2.0, math: 3.5, chemistry: 2.5, biology: 2.5, kurdish: 1.0, arabic: 1.0, religion: 0.5 }
  },
  {
    date: "2026-08-04",
    dayLabelKu: "سێشەممە",
    dayLabelBadini: "سێشەمبی",
    dayLabelEn: "Tue",
    hours: { physics: 3.0, math: 2.0, chemistry: 1.5, biology: 3.0, kurdish: 0.5, arabic: 0.5, religion: 1.0 }
  },
  {
    date: "2026-08-05",
    dayLabelKu: "چوارشەممە",
    dayLabelBadini: "چوارشەمبی",
    dayLabelEn: "Wed",
    hours: { physics: 2.0, math: 4.0, chemistry: 2.0, biology: 2.0, kurdish: 1.5, arabic: 1.0, religion: 0.5 }
  },
  {
    date: "2026-08-06",
    dayLabelKu: "پێنجشەممە",
    dayLabelBadini: "پێنجشەمبی",
    dayLabelEn: "Thu", // Best Day
    hours: { physics: 3.5, math: 4.5, chemistry: 3.0, biology: 2.5, kurdish: 1.0, arabic: 1.0, religion: 1.0 }
  },
  {
    date: "2026-08-07",
    dayLabelKu: "جومعە",
    dayLabelBadini: "ئینی",
    dayLabelEn: "Fri",
    hours: { physics: 1.0, math: 2.0, chemistry: 1.0, biology: 1.5, kurdish: 1.0, arabic: 0.5, religion: 1.5 }
  }
];

// Initial mock records for 30 days
const generateMonthlyRecords = (): DayStudyRecord[] => {
  const records: DayStudyRecord[] = [];
  const daysKu = ["شەممە", "یەکشەممە", "دووشەممە", "سێشەممە", "چوارشەممە", "پێنجشەممە", "جومعە"];
  const daysBadini = ["شەمبی", "یەکشەمبی", "دووشەمبی", "سێشەمبی", "چوارشەمبی", "پێنجشەمبی", "ئینی"];
  const daysEn = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  for (let i = 1; i <= 30; i++) {
    const dayIdx = (i - 1) % 7;
    // Make day 16 the absolute best day of the month
    const factor = i === 16 ? 1.8 : i % 5 === 0 ? 1.4 : 1.0;
    records.push({
      date: `2026-08-${i < 10 ? "0" + i : i}`,
      dayLabelKu: `${daysKu[dayIdx]} (${i})`,
      dayLabelBadini: `${daysBadini[dayIdx]} (${i})`,
      dayLabelEn: `${daysEn[dayIdx]} ${i}`,
      hours: {
        physics: parseFloat((1.5 * factor).toFixed(1)),
        math: parseFloat((2.5 * factor).toFixed(1)),
        chemistry: parseFloat((1.2 * factor).toFixed(1)),
        biology: parseFloat((1.8 * factor).toFixed(1)),
        kurdish: parseFloat((0.8 * factor).toFixed(1)),
        arabic: parseFloat((0.6 * factor).toFixed(1)),
        religion: parseFloat((0.5 * factor).toFixed(1))
      }
    });
  }
  return records;
};

export const StatisticsView: React.FC<StatisticsViewProps> = ({ user, language }) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";

  // Active sub tab inside Statistics
  const [subTab, setSubTab] = useState<"daily" | "weekly" | "monthly" | "log" | "revisions">("daily");

  // Selected Day Index for Daily View
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(5); // Default to Thursday (index 5)

  // Load Weekly Study Records
  const [weeklyRecords, setWeeklyRecords] = useState<DayStudyRecord[]>(() => {
    try {
      const saved = localStorage.getItem("grade12_weekly_study_records_v2");
      return saved ? JSON.parse(saved) : INITIAL_WEEKLY_RECORDS;
    } catch {
      return INITIAL_WEEKLY_RECORDS;
    }
  });

  // Load Monthly Study Records
  const [monthlyRecords] = useState<DayStudyRecord[]>(() => {
    try {
      const saved = localStorage.getItem("grade12_monthly_study_records_v2");
      return saved ? JSON.parse(saved) : generateMonthlyRecords();
    } catch {
      return generateMonthlyRecords();
    }
  });

  // Form State for Study Logging
  const [logForm, setLogForm] = useState<Record<string, number>>({
    physics: 2.5,
    math: 3.5,
    chemistry: 2.0,
    biology: 2.0,
    kurdish: 1.0,
    arabic: 0.5,
    religion: 0.5
  });

  const [logDayIndex, setLogDayIndex] = useState<number>(5);
  const [showSaveToast, setShowSaveToast] = useState(false);

  // Sync log form when changing log day index
  useEffect(() => {
    if (weeklyRecords[logDayIndex]) {
      setLogForm(weeklyRecords[logDayIndex].hours);
    }
  }, [logDayIndex, weeklyRecords]);

  // Handle Save Log Form
  const handleSaveLogs = () => {
    const updatedWeekly = [...weeklyRecords];
    updatedWeekly[logDayIndex] = {
      ...updatedWeekly[logDayIndex],
      hours: { ...logForm }
    };
    setWeeklyRecords(updatedWeekly);

    try {
      localStorage.setItem("grade12_weekly_study_records_v2", JSON.stringify(updatedWeekly));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }

    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  // Revision counts logic (preserved)
  const [subjectRevCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("grade12_subject_rev_counts");
      return saved ? JSON.parse(saved) : { biology: 2, math: 1, physics: 1, chemistry: 1 };
    } catch {
      return { biology: 2, math: 1, physics: 1, chemistry: 1 };
    }
  });

  const [chapterRevCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("grade12_chapter_rev_counts");
      return saved ? JSON.parse(saved) : { "bio-ch1": 2, "math-p1": 1 };
    } catch {
      return { "bio-ch1": 2, "math-p1": 1 };
    }
  });

  const [lessonRevCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("grade12_lesson_rev_counts");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [rev1Progress] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("grade12_rev1_progress");
      return saved ? JSON.parse(saved) : { math: true, physics: false, biology: true, chemistry: false };
    } catch {
      return { math: true, physics: false, biology: true, chemistry: false };
    }
  });

  const [rev2Progress] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("grade12_rev2_progress");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Calculate Revision totals
  const totalSubjectRevs = Object.values(subjectRevCounts).reduce((a: number, b: any) => a + Number(b || 0), 0);
  const totalChapterRevs = Object.values(chapterRevCounts).reduce((a: number, b: any) => a + Number(b || 0), 0);
  const totalLessonRevs = Object.values(lessonRevCounts).reduce((a: number, b: any) => a + Number(b || 0), 0);
  const grandTotalRevisions = Number(totalSubjectRevs) + Number(totalChapterRevs) + Number(totalLessonRevs);

  const rev1DoneCount = Object.values(rev1Progress).filter(Boolean).length;
  const rev2DoneCount = Object.values(rev2Progress).filter(Boolean).length;

  // Selected Day Calculation (Daily Percentages)
  const currentSelectedDayRecord = weeklyRecords[selectedDayIndex] || weeklyRecords[0];
  const totalDailyHours: number = Object.values(currentSelectedDayRecord.hours).reduce<number>(
    (a, b) => a + (Number(b) || 0),
    0
  );

  // Subject Daily Breakdown with Percentages
  const dailySubjectData = GRADE_12_SUBJECTS.map((sub) => {
    const hrs = Number(currentSelectedDayRecord.hours[sub.id]) || 0;
    const pct = totalDailyHours > 0 ? parseFloat(((hrs / totalDailyHours) * 100).toFixed(1)) : 0;
    return {
      ...sub,
      hours: hrs,
      percentage: pct,
      name: isBadini ? sub.nameBadini : isKu ? sub.nameKu : sub.nameEn
    };
  }).sort((a, b) => b.hours - a.hours);

  // Weekly Total Calculations & Finding Best Day
  const weeklyAnalysisData = weeklyRecords.map((record, index) => {
    const dayTotal: number = Object.values(record.hours).reduce<number>(
      (a, b) => a + (Number(b) || 0),
      0
    );
    // Find top subject for this day
    let topSubId = "math";
    let topSubHrs = 0;
    Object.entries(record.hours).forEach(([subId, hrs]) => {
      const h = Number(hrs) || 0;
      if (h > topSubHrs) {
        topSubHrs = h;
        topSubId = subId;
      }
    });

    const topSubObj = GRADE_12_SUBJECTS.find((s) => s.id === topSubId);
    const topSubName = topSubObj
      ? isBadini
        ? topSubObj.nameBadini
        : isKu
        ? topSubObj.nameKu
        : topSubObj.nameEn
      : topSubId;
    const topSubPercent = dayTotal > 0 ? Math.round((topSubHrs / dayTotal) * 100) : 0;

    return {
      index,
      dayName: isBadini ? record.dayLabelBadini : isKu ? record.dayLabelKu : record.dayLabelEn,
      totalHours: parseFloat(dayTotal.toFixed(1)),
      topSubjectName: topSubName,
      topSubjectPercent: topSubPercent,
      hoursMap: record.hours
    };
  });

  // Best Day of the Week calculation
  const bestDayOfWeek = [...weeklyAnalysisData].sort((a, b) => b.totalHours - a.totalHours)[0];

  // Monthly Total Calculations & Finding Best Day/Week
  const monthlyTotalHours: number = monthlyRecords.reduce<number>((acc, rec) => {
    const sum: number = Object.values(rec.hours).reduce<number>(
      (a, b) => a + (Number(b) || 0),
      0
    );
    return acc + sum;
  }, 0);

  // Best Day of Month
  const monthlyDaysAnalyzed = monthlyRecords.map((rec) => {
    const dayTotal: number = Object.values(rec.hours).reduce<number>(
      (a, b) => a + (Number(b) || 0),
      0
    );
    return {
      date: rec.date,
      label: isBadini ? rec.dayLabelBadini : isKu ? rec.dayLabelKu : rec.dayLabelEn,
      totalHours: parseFloat(dayTotal.toFixed(1)),
      hours: rec.hours
    };
  });

  const bestDayOfMonth = [...monthlyDaysAnalyzed].sort((a, b) => b.totalHours - a.totalHours)[0];

  // Monthly Subject Totals and Percentages
  const monthlySubjectTotals: Record<string, number> = {};
  GRADE_12_SUBJECTS.forEach((sub) => {
    monthlySubjectTotals[sub.id] = 0;
  });

  monthlyRecords.forEach((rec) => {
    Object.entries(rec.hours).forEach(([subId, hrs]) => {
      const h = Number(hrs) || 0;
      if (monthlySubjectTotals[subId] !== undefined) {
        monthlySubjectTotals[subId] += h;
      }
    });
  });

  const monthlySubjectPercentages = GRADE_12_SUBJECTS.map((sub) => {
    const totalHrs = monthlySubjectTotals[sub.id] || 0;
    const pct = monthlyTotalHours > 0 ? parseFloat(((totalHrs / monthlyTotalHours) * 100).toFixed(1)) : 0;
    return {
      ...sub,
      name: isBadini ? sub.nameBadini : isKu ? sub.nameKu : sub.nameEn,
      totalHours: parseFloat(totalHrs.toFixed(1)),
      percentage: pct
    };
  }).sort((a, b) => b.totalHours - a.totalHours);

  // Best Week of Month (Group into 4 weeks)
  const weekTotals = [0, 0, 0, 0];
  monthlyRecords.forEach((rec, idx) => {
    const weekIdx = Math.min(Math.floor(idx / 7), 3);
    const dayTotal: number = Object.values(rec.hours).reduce<number>(
      (a, b) => a + (Number(b) || 0),
      0
    );
    weekTotals[weekIdx] += dayTotal;
  });

  const bestWeekNumber = weekTotals.indexOf(Math.max(...weekTotals)) + 1;
  const bestWeekHours = Math.max(...weekTotals).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950 via-indigo-900 to-slate-900 border border-purple-800/40 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              <Award className="w-8 h-8 text-amber-400" />
              <span>
                {isBadini
                  ? "شیکاریا خۆاندنا بابەتێن پۆلا ١٢"
                  : isKu
                  ? "شیکاری خوێندنی بابەتەکانی پۆلی ۱۲"
                  : "Grade 12 Subject Study Analytics"}
              </span>
            </h1>
            <p className="text-sm text-purple-200/90 font-medium leading-relaxed">
              {isBadini
                ? "دیارکرنا ڕێژەیا سەدی یا خۆاندنا فیزیا، بیرکاری، کیمیا، زیندەوەر، کوردی، عەرەبی و ئاین د ڕۆژێ، هەفتیێ و هەیڤێ دا ب بەراوردیێن ورد"
                : isKu
                ? "دیاریکردنی ڕێژەی سەدی خوێندنی فیزیا، بیرکاری، کیمیا، زیندەوەر، کوردی، عەرەبی و ئاین لە ڕۆژ، هەفتە و مانگدا بە بەراوردی ورد"
                : "Daily subject percentage breakdown, weekly best day comparison & monthly progress analytics."}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-3.5 py-2 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-500/30 text-xs font-black flex items-center gap-2 shadow-lg">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>
                {weeklyRecords[selectedDayIndex]
                  ? totalDailyHours.toFixed(1)
                  : "0"}{" "}
                {isBadini ? "کاتژمێر ئەڤرۆ" : "کاتژمێر ئەمڕۆ"}
              </span>
            </span>
          </div>
        </div>

        {/* Sub Navigation Bar Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-purple-800/40">
          <button
            onClick={() => setSubTab("daily")}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              subTab === "daily"
                ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20"
                : "bg-slate-900/60 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <PieChartIcon className="w-4 h-4" />
            <span>
              {isBadini
                ? "📊 ڕێژەیا سەدی یا ڕۆژانە"
                : isKu
                ? "📊 ڕێژەی سەدی ڕۆژانە"
                : "Daily Percentages"}
            </span>
          </button>

          <button
            onClick={() => setSubTab("weekly")}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              subTab === "weekly"
                ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20"
                : "bg-slate-900/60 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>
              {isBadini
                ? "🏆 بەراوردییا هەفتیانە (باشترین رۆژ)"
                : isKu
                ? "🏆 بەراوردی هەفتانە (باشترین ڕۆژ)"
                : "Weekly Best Day"}
            </span>
          </button>

          <button
            onClick={() => setSubTab("monthly")}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              subTab === "monthly"
                ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20"
                : "bg-slate-900/60 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>
              {isBadini
                ? "🗓️ ئەنالیزا هەیڤانە (Best Month Day)"
                : isKu
                ? "🗓️ ئەنالیزی مانگانە (باشترین ڕۆژی مانگ)"
                : "Monthly Analytics"}
            </span>
          </button>

          <button
            onClick={() => setSubTab("log")}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              subTab === "log"
                ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20"
                : "bg-slate-900/60 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>
              {isBadini
                ? "✍️ تۆمارکرنا دەمێ خویندنێ"
                : isKu
                ? "✍️ تۆمارکردنی کاتی خوێندن"
                : "Log Hours"}
            </span>
          </button>

          <button
            onClick={() => setSubTab("revisions")}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              subTab === "revisions"
                ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20"
                : "bg-slate-900/60 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>
              {isBadini ? "🔥 تۆمارا مراجەعێ" : isKu ? "🔥 تۆماری مراجەعە" : "Revisions"}
            </span>
          </button>
        </div>
      </div>

      {/* ------------------- 1. DAILY BREAKDOWN & PERCENTAGES TAB ------------------- */}
      {subTab === "daily" && (
        <div className="space-y-6">
          {/* Day Selector */}
          <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-black text-white">
                {isBadini ? "هەڵبژارتنا ڕۆژا هەفتیێ:" : isKu ? "هەڵبژاردنی ڕۆژی هەفتە:" : "Select Day of Week:"}
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
              {weeklyRecords.map((rec, idx) => {
                const isSelected = idx === selectedDayIndex;
                const label = isBadini ? rec.dayLabelBadini : isKu ? rec.dayLabelKu : rec.dayLabelEn;
                return (
                  <button
                    key={rec.date}
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105 border border-indigo-400/40"
                        : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/50"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Total Header Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-slate-950 border border-indigo-800/50 shadow-xl space-y-1">
              <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                {isBadini ? "سەرجەمێ دەمێ خویندنا ڤێ ڕۆژێ" : "سەرجەمی کاتی خوێندنی ئەم ڕۆژە"}
              </span>
              <p className="text-3xl font-black text-white font-mono">
                {totalDailyHours.toFixed(1)}{" "}
                <span className="text-sm font-normal text-slate-300">
                  {isBadini ? "کاتژمێر" : "کاتژمێر"}
                </span>
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-900/60 via-slate-900 to-slate-950 border border-emerald-800/50 shadow-xl space-y-1">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                {isBadini ? "زۆرترین بابەتێ خویندی" : "زۆرترین بابەتی خوێنراو"}
              </span>
              <p className="text-2xl font-black text-emerald-300">
                {dailySubjectData[0]?.icon} {dailySubjectData[0]?.name}
              </p>
              <span className="text-xs text-slate-400 font-mono font-bold">
                {dailySubjectData[0]?.hours} کاتژمێر ({dailySubjectData[0]?.percentage}%)
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-gradient-to-br from-purple-900/60 via-slate-900 to-slate-950 border border-purple-800/50 shadow-xl space-y-1">
              <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                {isBadini ? "بابەتێن ئەڤرۆ خویندین" : "بابەتە خوێنراوەکان"}
              </span>
              <p className="text-2xl font-black text-purple-300 font-mono">
                {dailySubjectData.filter((s) => s.hours > 0).length} / 7
              </p>
              <span className="text-xs text-slate-400 font-bold">
                {isBadini ? "بابەتێن پۆلا ١٢" : "بابەتەکانی پۆلی ۱۲"}
              </span>
            </div>
          </div>

          {/* Daily Subject Percentage Chart & Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Pie / Donut Chart */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-amber-400" />
                  <span>
                    {isBadini
                      ? "ڕێژەیا سەدی یا هەر بابەتەکی ( % )"
                      : isKu
                      ? "ڕێژەی سەدی هەریەک لە بابەتەکان ( % )"
                      : "Daily Subject Distribution"}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {isBadini
                    ? `دابەشبوونا کاتژمێران بۆ ڕۆژا ${currentSelectedDayRecord.dayLabelBadini}`
                    : `دابەشبوونی کاتژمێرەکان بۆ ڕۆژی ${currentSelectedDayRecord.dayLabelKu}`}
                </p>
              </div>

              <div className="h-64 w-full flex items-center justify-center">
                {totalDailyHours > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dailySubjectData.filter((s) => s.hours > 0)}
                        dataKey="hours"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={4}
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                      >
                        {dailySubjectData
                          .filter((s) => s.hours > 0)
                          .map((entry) => (
                            <Cell key={`cell-${entry.id}`} fill={entry.color} />
                          ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          borderColor: "#334155",
                          borderRadius: "16px",
                          color: "#fff",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}
                        formatter={(value, name) => [
                          `${value} کاتژمێر`,
                          `${name}`
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center text-slate-500 py-12 text-sm font-bold">
                    {isBadini
                      ? "هیچ کاتژمێرەک بۆ ڤێ ڕۆژێ نەهاتیە تۆمارکرن"
                      : "هیچ کاتژمێرێک بۆ ئەم ڕۆژە تۆمار نەکراوە"}
                  </div>
                )}
              </div>
            </div>

            {/* Subject Detailed Percentage Bars & List */}
            <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                  <span>
                    {isBadini
                      ? "وردەکارییا ڕێژە و دەمێ هەر ٧ بابەتان"
                      : isKu
                      ? "وردەکاری ڕێژە و کاتی هەر ۷ بابەتەکە"
                      : "All 7 Grade 12 Subject Percentages"}
                  </span>
                </h3>

                <button
                  onClick={() => setSubTab("log")}
                  className="px-3 py-1.5 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-500/30 text-xs font-bold hover:bg-amber-400/30 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isBadini ? "دەستکاری بکه" : "دەستکاری بکە"}</span>
                </button>
              </div>

              <div className="space-y-3">
                {dailySubjectData.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-black text-white">
                        <span className="text-base">{sub.icon}</span>
                        <span>{sub.name}</span>
                      </div>

                      <div className="flex items-center gap-3 font-mono font-bold">
                        <span className="text-slate-300">{sub.hours} کاتژمێر</span>
                        <span
                          className="px-2.5 py-1 rounded-xl text-xs font-black"
                          style={{
                            backgroundColor: `${sub.color}25`,
                            color: sub.color,
                            border: `1px solid ${sub.color}40`
                          }}
                        >
                          {sub.percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-500 rounded-full"
                        style={{
                          width: `${Math.min(sub.percentage, 100)}%`,
                          backgroundColor: sub.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------- 2. WEEKLY COMPARISON & BEST DAY TAB ------------------- */}
      {subTab === "weekly" && (
        <div className="space-y-6">
          {/* Winner Gold Badge Banner for Best Day of Week */}
          {bestDayOfWeek && (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950 via-amber-900/60 to-slate-950 border border-amber-500/40 shadow-2xl space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Trophy className="w-48 h-48 text-amber-300" />
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <Trophy className="w-4 h-4" />
                  <span>
                    {isBadini ? "باشترین رۆژێ هەفتیێ" : isKu ? "باشترین ڕۆژی هەفتە" : "Best Day of Week"}
                  </span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-amber-200 flex items-center gap-2">
                <span>
                  {isBadini
                    ? `رۆژا ${bestDayOfWeek.dayName} باشترین رۆژا تە بوو د ڤێ هەفتیێ دا!`
                    : `ڕۆژی ${bestDayOfWeek.dayName} باشترین ڕۆژی هەفتەکەت بوو!`}
                </span>
              </h2>

              <p className="text-sm text-amber-100/90 leading-relaxed font-medium max-w-3xl">
                {isBadini
                  ? `تە ل رۆژا ${bestDayOfWeek.dayName} بەرهەمەکی نایاب تۆمار کر ب کۆمبوونا ${bestDayOfWeek.totalHours} کاتژمێرێن خویندنێ. زۆرترین سەرنجا تە ل سەر بابەتێ ${bestDayOfWeek.topSubjectName} بوویە (${bestDayOfWeek.topSubjectPercent}% ژ دەمێ تەکەت).`
                  : `تۆ لە ڕۆژی ${bestDayOfWeek.dayName} بەرهەمێکی نایاب و بەرزت تۆمارکرد بە کۆی ${bestDayOfWeek.totalHours} کاتژمێر خوێندن. زۆرترین سەرنجت لەسەر بابەتی ${bestDayOfWeek.topSubjectName} بووە (${bestDayOfWeek.topSubjectPercent}%ی کاتەکەت).`}
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <div className="px-4 py-2 rounded-2xl bg-amber-900/50 border border-amber-500/30 text-amber-200 text-xs font-black font-mono">
                  🔥 {bestDayOfWeek.totalHours} {isBadini ? "کاتژمێر خویندن" : "کاتژمێر خوێندن"}
                </div>
                <div className="px-4 py-2 rounded-2xl bg-amber-900/50 border border-amber-500/30 text-amber-200 text-xs font-black">
                  ⭐ {isBadini ? "بابەتێ سەرەکی:" : "بابەتی سەرەکی:"} {bestDayOfWeek.topSubjectName} (
                  {bestDayOfWeek.topSubjectPercent}%)
                </div>
              </div>
            </div>
          )}

          {/* Weekly Bar Chart */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-400" />
              <span>
                {isBadini
                  ? "بەراوردییا کاتژمێرێن خویندنێ د هەر ٧ ڕۆژێن هەفتیێ دا"
                  : isKu
                  ? "بەراوردی کاتژمێرەکانی خوێندن لە هەر ۷ ڕۆژی هەفتەدا"
                  : "Weekly Total Study Hours Comparison"}
              </span>
            </h3>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyAnalysisData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="dayName" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "16px",
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}
                    formatter={(value) => [`${value} کاتژمێر خوێندن`, "سەرجەمی کات"]}
                  />
                  <Bar dataKey="totalHours" radius={[12, 12, 0, 0]}>
                    {weeklyAnalysisData.map((entry, index) => {
                      const isBest = bestDayOfWeek && entry.index === bestDayOfWeek.index;
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={isBest ? "#f59e0b" : "#6366f1"}
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Day by Day Cards List */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-slate-200">
              {isBadini
                ? "تێبینی و ڕێژەی بابەتان ل ڕۆژێن هەفتیێ:"
                : isKu
                ? "تێبینی و ڕێژەی بابەتەکان لە ڕۆژەکانی هەفتەدا:"
                : "Weekly Day-by-Day Subject Breakdown:"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {weeklyAnalysisData.map((item) => {
                const isBest = bestDayOfWeek && item.index === bestDayOfWeek.index;
                return (
                  <div
                    key={item.index}
                    onClick={() => {
                      setSelectedDayIndex(item.index);
                      setSubTab("daily");
                    }}
                    className={`p-5 rounded-3xl border transition-all cursor-pointer space-y-3 ${
                      isBest
                        ? "bg-amber-950/30 border-amber-500/50 hover:border-amber-400 shadow-xl shadow-amber-900/10"
                        : "bg-slate-900 border-slate-800 hover:border-indigo-500/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-white text-base">{item.dayName}</span>
                        {isBest && (
                          <span className="px-2 py-0.5 rounded-lg bg-amber-400 text-slate-950 text-[10px] font-black">
                            🏆 Best
                          </span>
                        )}
                      </div>

                      <span className="text-sm font-black text-amber-300 font-mono">
                        {item.totalHours} کاتژمێر
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="text-slate-300 flex items-center justify-between">
                        <span>{isBadini ? "بابەتێ هەری بەرز:" : "بابەتی سەرەکی:"}</span>
                        <span className="font-bold text-amber-400">
                          {item.topSubjectName} ({item.topSubjectPercent}%)
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 font-medium">
                      {isBadini ? "کرتێ بکە بۆ دیتنا ڕێژەیا سەدی یا کامل" : "کلیک بکە بۆ بینینی ڕێژەی سەدی کامل"} →
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ------------------- 3. MONTHLY ANALYTICS & BEST MONTH DAY TAB ------------------- */}
      {subTab === "monthly" && (
        <div className="space-y-6">
          {/* Monthly Highlights Banners */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-800/50 shadow-xl space-y-2">
              <span className="text-xs font-extrabold text-indigo-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                {isBadini ? "کۆمبوونا کاتژمێرێن خویندنا ڤێ هەیڤێ" : "کۆی کاتژمێرەکانی خوێندنی ئەم مانگە"}
              </span>
              <p className="text-3xl font-black text-white font-mono">
                {monthlyTotalHours.toFixed(1)}{" "}
                <span className="text-sm text-slate-400 font-normal">کاتژمێر</span>
              </p>
            </div>

            {bestDayOfMonth && (
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950 via-slate-900 to-slate-950 border border-amber-500/50 shadow-xl space-y-2">
                <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  {isBadini ? "رۆژا هەری باش یا هەیڤێ" : "باشترین ڕۆژی مانگ (Best Month Day)"}
                </span>
                <p className="text-xl font-black text-amber-300">
                  {bestDayOfMonth.label}
                </p>
                <p className="text-xs text-slate-300 font-mono font-bold">
                  ⚡ {bestDayOfMonth.totalHours} کاتژمێر خوێندن
                </p>
              </div>
            )}

            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border border-emerald-800/50 shadow-xl space-y-2">
              <span className="text-xs font-extrabold text-emerald-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-400" />
                {isBadini ? "هەفتیا هەری باش یا هەیڤێ" : "باشترین هەفتەی مانگ"}
              </span>
              <p className="text-xl font-black text-emerald-300">
                {isBadini ? `هەفتیا ${bestWeekNumber}` : `هەفتەی ${bestWeekNumber}`}
              </p>
              <p className="text-xs text-slate-300 font-mono font-bold">
                🔥 {bestWeekHours} کاتژمێر خوێندن
              </p>
            </div>
          </div>

          {/* Monthly Trend Area Chart */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <span>
                {isBadini
                  ? "گەشەکرنا کاتژمێرێن خویندنێ ل درێژاهیا ٣٠ ڕۆژێن هەیڤێ"
                  : isKu
                  ? "گەشەی کاتژمێرەکانی خوێندن لە درێژایی ۳۰ ڕۆژی مانگدا"
                  : "Monthly Daily Study Hours Trend"}
              </span>
            </h3>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyDaysAnalyzed}>
                  <defs>
                    <linearGradient id="colorMonthly" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="label" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "16px",
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}
                    formatter={(val) => [`${val} کاتژمێر`, "کاتژمێری خوێندن"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="totalHours"
                    stroke="#818cf8"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorMonthly)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Subject Percentages List */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-amber-400" />
              <span>
                {isBadini
                  ? "ڕێژەیا سەدی یا سەرجەمێ هەیڤێ بۆ هەر ٧ بابەتێن پۆلا ١٢"
                  : isKu
                  ? "ڕێژەی سەدی کۆی مانگ بۆ هەر ۷ بابەتەکەی پۆلی ۱۲"
                  : "Monthly Subject Percentages Breakdown"}
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {monthlySubjectPercentages.map((sub) => (
                <div
                  key={sub.id}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-black text-white">
                    <span className="flex items-center gap-2">
                      <span className="text-base">{sub.icon}</span>
                      <span>{sub.name}</span>
                    </span>
                    <span style={{ color: sub.color }}>{sub.percentage}%</span>
                  </div>

                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(sub.percentage, 100)}%`,
                        backgroundColor: sub.color
                      }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 font-mono text-right">
                    {sub.totalHours} کاتژمێر مانگانە
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------- 4. LOG & EDIT STUDY HOURS TAB ------------------- */}
      {subTab === "log" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Plus className="w-6 h-6 text-amber-400" />
                <span>
                  {isBadini
                    ? "تۆمارکرن و دەستکارییا کاتژمێرێن خویندنا ٧ بابەتان"
                    : isKu
                    ? "تۆمارکردن و دەستکاری کاتژمێرەکانی خوێندنی ۷ بابەتەکە"
                    : "Log & Edit Subject Study Hours"}
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                {isBadini
                  ? "ڕۆژا هەفتیێ هەڵبژێرە و کاتژمێرێن خویندنێ بۆ فیزیا، بیرکاری، کیمیا، زیندەوەر، کوردی، عەرەبی و ئاین بنڤیسە"
                  : "ڕۆژی هەفتە هەڵبژێرە و کاتژمێرەکانی خوێندن بۆ فیزیا، بیرکاری، کیمیا، زیندەوەر، کوردی، عەرەبی و ئاین بنووسە"}
              </p>
            </div>

            {showSaveToast && (
              <div className="px-4 py-2 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black flex items-center gap-2 animate-bounce">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>
                  {isBadini ? "ب سەرکەفتن هاتە هەڵگرتن!" : "بە سەرکەوتوویی تۆمارکرا!"}
                </span>
              </div>
            )}
          </div>

          {/* Select Log Day */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-300 block">
              {isBadini ? "ڕۆژا هەفتیێ دیار بکه:" : "ڕۆژی هەفتە دیاری بکە:"}
            </label>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {weeklyRecords.map((rec, idx) => {
                const isSelected = idx === logDayIndex;
                const label = isBadini ? rec.dayLabelBadini : isKu ? rec.dayLabelKu : rec.dayLabelEn;
                return (
                  <button
                    key={rec.date}
                    onClick={() => setLogDayIndex(idx)}
                    className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Inputs for 7 Subjects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GRADE_12_SUBJECTS.map((sub) => {
              const currentVal = logForm[sub.id] || 0;
              return (
                <div
                  key={sub.id}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-white flex items-center gap-2">
                      <span className="text-lg">{sub.icon}</span>
                      <span>{isBadini ? sub.nameBadini : isKu ? sub.nameKu : sub.nameEn}</span>
                    </span>

                    <span
                      className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold"
                      style={{
                        backgroundColor: `${sub.color}20`,
                        color: sub.color,
                        border: `1px solid ${sub.color}35`
                      }}
                    >
                      {currentVal} کاتژمێر
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="24"
                      value={currentVal}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        setLogForm((prev) => ({ ...prev, [sub.id]: val }));
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono font-bold text-sm focus:outline-none focus:border-amber-400"
                    />

                    {/* Quick increment buttons */}
                    <button
                      type="button"
                      onClick={() =>
                        setLogForm((prev) => ({ ...prev, [sub.id]: parseFloat((currentVal + 0.5).toFixed(1)) }))
                      }
                      className="px-2.5 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-black hover:bg-slate-700 transition-all cursor-pointer whitespace-nowrap"
                    >
                      +0.5
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setLogForm((prev) => ({ ...prev, [sub.id]: parseFloat((currentVal + 1.0).toFixed(1)) }))
                      }
                      className="px-2.5 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-black hover:bg-slate-700 transition-all cursor-pointer whitespace-nowrap"
                    >
                      +1h
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSaveLogs}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-400/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-5 h-5" />
              <span>
                {isBadini ? "تۆمارکرن و نووکرنا ڕێژەیان" : "تۆمارکردن و نوێکردنەوەی ڕێژەکان"}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ------------------- 5. REVISIONS TAB (PRESERVED LOGS) ------------------- */}
      {subTab === "revisions" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-black shadow-lg">
                  <RefreshCw className="w-6 h-6 animate-spin-slow" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-white">
                    {isBadini
                      ? "تۆمار و ئەنالیزا مراجەعەکرنێ (Revision Analytics)"
                      : isKu
                      ? "تۆمار و ئەنالیزی مراجەعەکردن"
                      : "Revision Log Analytics"}
                  </h2>
                  <p className="text-xs text-slate-400 font-bold">
                    {isBadini
                      ? "سەرجەمی جاران مراجەعەکرنا بابەت، بەند و وانەیێن پۆلا ١٢"
                      : isKu
                      ? "سەرجەمی جاران مراجەعەکردنی بابەت، بەند و وانەکانی پۆلی ۱۲"
                      : "Recorded repetition counts for Grade 12 subjects"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="px-3 py-1.5 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-500/30 text-xs font-black font-mono">
                  🔥 {grandTotalRevisions}{" "}
                  {isBadini || isKu ? "جار مراجەعە" : "Total Revisions"}
                </span>
              </div>
            </div>

            {/* 4 Cards Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>
                    {isBadini ? "مراجەعەیا بابه‌تان" : isKu ? "مراجەعەی بابەتەکان" : "Subject Revisions"}
                  </span>
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                </div>
                <p className="text-2xl font-black text-white font-mono">
                  {totalSubjectRevs}{" "}
                  <span className="text-xs text-slate-400 font-normal">جارا</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>
                    {isBadini ? "مراجەعەیا بەندان" : isKu ? "مراجەعەی بەندەکان" : "Chapter Revisions"}
                  </span>
                  <Layers className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-2xl font-black text-white font-mono">
                  {totalChapterRevs}{" "}
                  <span className="text-xs text-slate-400 font-normal">جارا</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>
                    {isBadini ? "مراجەعەیا ۱ (گەرا ۱)" : isKu ? "مراجەعەی ۱" : "Rev 1 Done"}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-2xl font-black text-amber-300 font-mono">
                  {rev1DoneCount} / 8{" "}
                  <span className="text-xs text-slate-400 font-normal">بابەت</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>
                    {isBadini ? "مراجەعەیا ۲ (گەرا ۲)" : isKu ? "مراجەعەی ۲" : "Rev 2 Done"}
                  </span>
                  <Flame className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-2xl font-black text-purple-300 font-mono">
                  {rev2DoneCount} / 8{" "}
                  <span className="text-xs text-slate-400 font-normal">بابەت</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



