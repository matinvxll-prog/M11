import React, { useState } from "react";
import {
  GraduationCap,
  FileText,
  Calendar,
  Calculator,
  ShoppingBag,
  Download,
  Star,
  CheckCircle2,
  Sparkles,
  Search,
  BookOpen,
  ArrowRight,
  Landmark,
  Building2,
  Compass,
  Award,
  TrendingUp,
  AlertCircle,
  Filter,
  Check,
  MapPin,
  Zap,
  Info,
  ChevronRight
} from "lucide-react";
import { Language, UserProfile } from "../types";
import { Grade12PrepSystemHub } from "./Grade12PrepSystemHub";

interface Grade12SpecialViewProps {
  language: Language;
  user?: UserProfile;
  onOpenAiTutor?: () => void;
  onStartQuiz?: (subjectId: string) => void;
  onOpenPdfLibrary?: () => void;
  onOpenVideoLessons?: () => void;
  onOpenStudyPlan?: () => void;
}

export const Grade12SpecialView: React.FC<Grade12SpecialViewProps> = ({
  language,
  user,
  onOpenAiTutor = () => {},
  onStartQuiz = () => {},
  onOpenPdfLibrary = () => {},
  onOpenVideoLessons = () => {},
  onOpenStudyPlan = () => {}
}) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";

  const [subTab, setSubTab] = useState<"exams" | "timetable" | "predictor" | "marketplace">("exams");

  // Predictor state
  const [mathGrade, setMathGrade] = useState<number>(85);
  const [physicsGrade, setPhysicsGrade] = useState<number>(88);
  const [chemistryGrade, setChemistryGrade] = useState<number>(90);
  const [biologyGrade, setBiologyGrade] = useState<number>(92);
  const [kurdishGrade, setKurdishGrade] = useState<number>(95);
  const [arabicGrade, setArabicGrade] = useState<number>(80);
  const [englishGrade, setEnglishGrade] = useState<number>(86);

  const calculateAverage = () => {
    const total = mathGrade + physicsGrade + chemistryGrade + biologyGrade + kurdishGrade + arabicGrade + englishGrade;
    return (total / 7).toFixed(1);
  };

  // Ministry Exam Papers
  const ministryPapers = [
    { year: "2023 - 2024", term: "خولی یەکەم (1st Term)", subject: "بیرکاری (Mathematics)", downloads: "12,450" },
    { year: "2023 - 2024", term: "خولی دووەم (2nd Term)", subject: "فیزیا (Physics)", downloads: "9,820" },
    { year: "2022 - 2023", term: "خولی یەکەم (1st Term)", subject: "کیمیا (Chemistry)", downloads: "15,100" },
    { year: "2022 - 2023", term: "خولی یەکەم (1st Term)", subject: "زیندەوەرناسی (Biology)", downloads: "11,300" },
    { year: "2021 - 2022", term: "خولی یەکەم (1st Term)", subject: "ئینگلیزی (English)", downloads: "14,200" }
  ];

  // Marketplace items
  const marketplaceNotes = [
    {
      id: "m1",
      title: "نۆتێن زێڕینی یێن بەرامبەر وەزارەتی (فیزیا بەندێ ۱ بۆ ٦)",
      author: "ڕێبین کۆچەر (نمرە 98)",
      rating: 4.9,
      downloads: 840,
      price: "خۆڕایی (Free)"
    },
    {
      id: "m2",
      title: "کورتکراوەیا یاسایێن بیرکاریێ ب نموونانەوە",
      author: "سارا بارزانی (نمرە 99)",
      rating: 5.0,
      downloads: 1200,
      price: "خۆڕایی (Free)"
    },
    {
      id: "m3",
      title: "PDF یا هەمی پسیارێن سالێن بووری یێن زیندەوەرناسی",
      author: "دیار هۆست (نمرە 97)",
      rating: 4.8,
      downloads: 650,
      price: "خۆڕایی (Free)"
    }
  ];

  const defaultUser: UserProfile = user || {
    id: "usr_1",
    name: "مەتین بارزانی",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    role: "student",
    level: 18,
    currentXp: 7850,
    nextLevelXp: 8100,
    totalXp: 7850,
    coins: 450,
    dailyStreak: 12,
    rank: 3,
    schoolName: "ئامادەییا بارزان یا زانستی",
    city: "دهۆک",
    badges: [],
    questionsAnswered: 420,
    correctAnswers: 385,
    studyHours: 84
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Complete Grade 12 Prep System Hub */}
      <Grade12PrepSystemHub
        user={defaultUser}
        language={language}
        onOpenAiTutor={onOpenAiTutor}
        onStartQuiz={onStartQuiz}
        onOpenPdfLibrary={onOpenPdfLibrary}
        onOpenVideoLessons={onOpenVideoLessons}
        onClaimDailyReward={() => {}}
      />

      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#121427] border border-indigo-900/40 p-5 rounded-3xl">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            {isBadini ? "تایبەت بۆ قوتابییێن پۆلا ۱۲ زانستی و وێجەیی" : "تایبەت بۆ پۆلی ۱۲"}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            {isBadini ? "بانکا وەزارەتی، خشتە، پێشبینیکەر و مارکێت" : "بانکی وەزارەتی و ئامرازەکانی پۆلی ۱۲"}
          </h1>
        </div>

        {/* Sub Navigation */}
        <div className="flex overflow-x-auto gap-2 p-1 bg-[#171933] border border-indigo-900/30 rounded-2xl">
          <button
            onClick={() => setSubTab("exams")}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shrink-0 ${
              subTab === "exams" ? "bg-amber-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>پرسیارێن وەزارەتی</span>
          </button>
          <button
            onClick={() => setSubTab("timetable")}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shrink-0 ${
              subTab === "timetable" ? "bg-amber-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>خشتەی وەزارەت</span>
          </button>
          <button
            onClick={onOpenStudyPlan}
            className="px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shrink-0 bg-purple-600/30 text-purple-300 hover:bg-purple-600 hover:text-white border border-purple-500/30"
          >
            <Calendar className="w-4 h-4 text-purple-400" />
            <span>{isBadini ? "پلانا خویندنێ (Planner)" : isKu ? "پلانی خوێندن (Planner)" : "Study Planner"}</span>
          </button>
          <button
            onClick={() => setSubTab("predictor")}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shrink-0 ${
              subTab === "predictor" ? "bg-amber-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>پێشبینیکەرێ ۱۰۰</span>
          </button>
          <button
            onClick={() => setSubTab("marketplace")}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shrink-0 ${
              subTab === "marketplace" ? "bg-amber-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Student Market</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: MINISTRY EXAMS BANK */}
      {subTab === "exams" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ministryPapers.map((p, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#121427] border border-indigo-900/40 hover:border-amber-500/50 transition-all space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {p.year}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    {p.downloads}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white">{p.subject}</h3>
                <p className="text-xs text-slate-400">{p.term}</p>
                <button
                  onClick={() => alert(`داگرتنا PDF یا پرسیارێن ${p.subject} دەستپێکر!`)}
                  className="w-full py-2.5 rounded-xl bg-[#171933] border border-indigo-900/30 text-amber-400 font-bold text-xs hover:bg-amber-600 hover:text-white transition flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>داگرتنا پرسیار و بەرسڤان (PDF)</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 2: TIMETABLE */}
      {subTab === "timetable" && (
        <div className="bg-[#121427] border border-indigo-900/40 rounded-3xl p-6 space-y-4">
          <h3 className="font-black text-lg text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <span>خشتەی فەرمی یێ ئەزموونێن گشتی یێن پۆلا ۱۲ (Ministerial Timetable)</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-[#171933] text-amber-400 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3.5 rounded-l-xl">ڕۆژ و ڕێکەوت</th>
                  <th className="p-3.5">بابەت (زانستی)</th>
                  <th className="p-3.5 rounded-r-xl">کاتی دەستپێک</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-900/30">
                <tr>
                  <td className="p-3.5 font-bold text-white">یەکشەممە (2026/06/01)</td>
                  <td className="p-3.5 text-amber-300 font-bold">زیندەوەرناسی (Biology)</td>
                  <td className="p-3.5 font-mono">08:00 AM</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">چوارشەممە (2026/06/04)</td>
                  <td className="p-3.5 text-amber-300 font-bold">بیرکاری (Mathematics)</td>
                  <td className="p-3.5 font-mono">08:00 AM</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">یەکشەممە (2026/06/08)</td>
                  <td className="p-3.5 text-amber-300 font-bold">فیزیا (Physics)</td>
                  <td className="p-3.5 font-mono">08:00 AM</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">پێنجشەممە (2026/06/12)</td>
                  <td className="p-3.5 text-amber-300 font-bold">کیمیا (Chemistry)</td>
                  <td className="p-3.5 font-mono">08:00 AM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 3: PREDICTOR */}
      {subTab === "predictor" && (
        <div className="bg-[#121427] border border-indigo-900/40 rounded-3xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-amber-600/20 to-purple-600/20 border border-amber-500/30">
            <div>
              <h3 className="font-black text-lg text-white">پێشبینیکەرێ نمرەیێ ۱۰۰ (Expected Grade Predictor)</h3>
              <p className="text-xs text-slate-300">نمرەیێن خولەکێن ئەزموونی بنڤیسە دا تەخمینا نمرەیا فەرمی ببینی.</p>
            </div>
            <div className="mt-3 sm:mt-0 text-center">
              <span className="text-3xl font-black text-amber-400 font-mono">{calculateAverage()}%</span>
              <span className="text-[10px] text-slate-400 block font-bold">تێکڕایا پێشبینیکراو</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-slate-300 block mb-1">بیرکاری ({mathGrade})</label>
              <input
                type="range"
                min="50"
                max="100"
                value={mathGrade}
                onChange={(e) => setMathGrade(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">فیزیا ({physicsGrade})</label>
              <input
                type="range"
                min="50"
                max="100"
                value={physicsGrade}
                onChange={(e) => setPhysicsGrade(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">کیمیا ({chemistryGrade})</label>
              <input
                type="range"
                min="50"
                max="100"
                value={chemistryGrade}
                onChange={(e) => setChemistryGrade(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">زیندەوەرناسی ({biologyGrade})</label>
              <input
                type="range"
                min="50"
                max="100"
                value={biologyGrade}
                onChange={(e) => setBiologyGrade(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: STUDENT MARKETPLACE */}
      {subTab === "marketplace" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketplaceNotes.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl bg-[#121427] border border-indigo-900/40 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                    {item.price}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>
                <h4 className="font-bold text-sm text-white">{item.title}</h4>
                <p className="text-xs text-slate-400">بەرهەمێ: {item.author}</p>
                <button
                  onClick={() => alert(`داگرتنا نۆتێن ${item.title} دەستپێکر!`)}
                  className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition shadow-md shadow-purple-600/30 flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>داگرتن (Download)</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
