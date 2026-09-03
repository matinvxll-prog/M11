import React from "react";
import {
  Home,
  BookOpen,
  FileCheck,
  Target,
  Trophy,
  Calendar,
  FileText,
  Bookmark,
  BarChart2,
  Users,
  ShoppingBag,
  Flame,
  Sun,
  Moon,
  ChevronRight,
  Video,
  FileDown,
  Disc,
  MessageSquare,
  Crown,
  ShieldCheck,
  Coins,
  RefreshCw,
  Timer,
  Sparkles,
  Bot,
  Layers
} from "lucide-react";
import { Language, UserProfile } from "../types";
import { uiTranslations } from "../utils/i18n";
import purpleMascotImg from "../assets/images/purple_mascot_1785415026355.jpg";

export type NavTab =
  | "home"
  | "gameMap"
  | "subjects"
  | "exams"
  | "ministerialExams"
  | "grade12Special"
  | "studyTools"
  | "pomodoro"
  | "revision"
  | "videos"
  | "pdfLibrary"
  | "challenges"
  | "leaderboard"
  | "studyPlan"
  | "notes"
  | "bookmarks"
  | "statistics"
  | "community"
  | "friends"
  | "shop"
  | "luckyWheel"
  | "premium"
  | "admin";

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  user: UserProfile;
  language: Language;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenVoiceQuiz?: () => void;
  onOpenCameraOcr?: () => void;
  onOpenAiTutor?: () => void;
  onOpenCalculator?: () => void;
  onOpenDictionary?: () => void;
  onOpenProfile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  user,
  language,
  isDarkMode,
  onToggleDarkMode,
  isOpenMobile,
  onCloseMobile,
  onOpenVoiceQuiz,
  onOpenCameraOcr,
  onOpenAiTutor,
  onOpenCalculator,
  onOpenDictionary,
  onOpenProfile
}) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";

  const mainNavItems = [
    { id: "home" as NavTab, label: isBadini ? "سەرەتا" : isKu ? "سەرەکی" : "Home Dashboard", icon: Home },
    { id: "subjects" as NavTab, label: isBadini ? "وانەگۆتن (بابەت)" : isKu ? "وانەکان (بابەتەکان)" : "Lessons & Subjects", icon: BookOpen, badge: "8" },
    { id: "exams" as NavTab, label: isBadini ? "تاقیکردنەوەکان" : isKu ? "تاقیکردنەوەکانی وزاری" : "Exams", icon: FileCheck },
    { id: "studyPlan" as NavTab, label: isBadini ? "پلانی خوێندن" : isKu ? "پلانی ڕۆژانە" : "Study Planner", icon: Calendar },
    { id: "pomodoro" as NavTab, label: isBadini ? "تەرکیز و پۆمۆدۆرۆ" : isKu ? "کاتژمێری تەرکیز" : "Focus Timer", icon: Timer },
    { id: "revision" as NavTab, label: isBadini ? "پێداچوونەوە" : isKu ? "پێداچوونەوەی وزاری" : "Revision", icon: RefreshCw },
    { id: "statistics" as NavTab, label: isBadini ? "ئامار و نمرەکان" : isKu ? "ئاماری پێشکەوتن" : "Analytics", icon: BarChart2 },
    { id: "pdfLibrary" as NavTab, label: isBadini ? "PDF و مەلزەمە" : isKu ? "مەلزەمەی وانەکان" : "PDF Library", icon: FileDown },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Premium Dark-Purple Left Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 lg:w-68 bg-[#120d29] border-r border-purple-900/30 text-slate-100 flex flex-col justify-between p-4 overflow-y-auto no-scrollbar transition-all duration-300 ease-in-out shadow-2xl ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="space-y-5">
          {/* Top Brand Mascot & StudyBuddy Branding */}
          <div className="flex items-center gap-3 px-2 pt-1 pb-3 border-b border-purple-900/40">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#6b21a8] to-[#9333ea] p-1 flex items-center justify-center shadow-lg shadow-purple-900/50 ring-2 ring-purple-400/30">
              <img
                src={purpleMascotImg}
                alt="StudyBuddy Mascot"
                className="w-full h-full object-contain drop-shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#120d29] rounded-full" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-white tracking-tight">StudyBuddy</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-bold text-purple-300/80 bg-purple-950/80 px-2 py-0.5 rounded-md border border-purple-800/50">
                  {isBadini || isKu ? "پۆلا ۱۲ زانستی" : "Grade 12 EdTech"}
                </span>
              </div>
            </div>
          </div>

          {/* AI Tutor Quick Access Button */}
          <button
            onClick={() => {
              onOpenAiTutor?.();
              onCloseMobile();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-800/60 to-indigo-900/60 hover:from-purple-700/80 hover:to-indigo-800/80 border border-purple-700/40 text-purple-200 hover:text-white transition group shadow-md"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-purple-600/80 flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className="text-right">
                <span className="text-xs font-black block text-white">{isBadini ? "مامۆستای ژیر (AI)" : isKu ? "مامۆستای ژیر (AI)" : "AI Tutor"}</span>
                <span className="text-[10px] text-purple-300 font-medium">{isBadini || isKu ? "پرسیار بکە و وەڵام وەربگرە" : "Ask questions 24/7"}</span>
              </div>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:scale-125 transition-transform" />
          </button>

          {/* Menu Items List */}
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-400/80 block mb-2 px-2 text-right">
              {isBadini ? "بەشەکانی سەرەکی" : isKu ? "بەشە سەرەکییەکان" : "Main Navigation"}
            </span>

            <nav className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white shadow-lg shadow-purple-900/50 font-black border border-purple-400/30"
                        : "text-purple-200/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-purple-300/70"}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded-md ${
                        isActive ? "bg-white/20 text-white" : "bg-purple-900/60 text-purple-300"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Tools Chips */}
          <div className="pt-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-400/80 block mb-2 px-2 text-right">
              {isBadini ? "ئامرازەکان" : isKu ? "ئامرازە خێراکان" : "Smart Tools"}
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => {
                  onOpenCameraOcr?.();
                  onCloseMobile();
                }}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/30 text-[11px] font-bold text-purple-200 hover:text-white transition text-right"
              >
                <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span className="truncate">{isBadini ? "سکانی پرسیار" : "سکانی پرسیار"}</span>
              </button>

              <button
                onClick={() => {
                  onOpenCalculator?.();
                  onCloseMobile();
                }}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/30 text-[11px] font-bold text-purple-200 hover:text-white transition text-right"
              >
                <div className="w-2 h-2 rounded-full bg-teal-400 shrink-0" />
                <span className="truncate">{isBadini ? "ژمێرەر" : "کالکیولێتەر"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Study Goal Card & User Profile */}
        <div className="pt-4 mt-4 border-t border-purple-900/30 space-y-3">
          {/* Motivation Goal Box */}
          <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-950/60 to-[#1e1342] border border-purple-800/40 text-right">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-extrabold text-amber-400 flex items-center gap-1">
                <Flame className="w-3 h-3 fill-amber-400" />
                {user.dailyStreak} {uiTranslations.daysUnit[language]} {isBadini || isKu ? "بەردەوامی" : "Streak"}
              </span>
              <span className="text-[10px] font-bold text-purple-300">نمرەی ۱۰۰ 🎯</span>
            </div>
            <div className="w-full bg-purple-950 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-400 to-amber-400 h-full rounded-full"
                style={{ width: `${Math.min(100, (user.currentXp / user.nextLevelXp) * 100)}%` }}
              />
            </div>
          </div>

          {/* User Profile Progress Card */}
          <div
            onClick={() => {
              onOpenProfile?.();
              onCloseMobile();
            }}
            className="p-2.5 rounded-2xl bg-purple-950/50 hover:bg-purple-900/50 border border-purple-800/30 cursor-pointer transition flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 rounded-xl object-cover ring-2 ring-purple-500/40 shrink-0"
              />
              <div className="min-w-0 text-right">
                <span className="text-xs font-black text-white truncate block">
                  {user.name}
                </span>
                <span className="text-[10px] text-purple-300/80 font-bold block">
                  {isBadini || isKu ? `ئاستی ${user.level}` : `Level ${user.level}`}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-purple-400/60" />
          </div>
        </div>
      </aside>
    </>
  );
};

