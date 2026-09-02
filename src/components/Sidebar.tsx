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
  MapPin
} from "lucide-react";
import { Language, UserProfile } from "../types";
import { uiTranslations } from "../utils/i18n";

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
  const navItems = [
    { id: "home" as NavTab, labelKu: "سەرەتا", labelBadini: "سەرەتا", labelEn: "Home", icon: Home },
    { id: "grade12Special" as NavTab, labelKu: "تایبەت ب پۆلا ۱۲ 🎓", labelBadini: "تایبەت ب پۆلا ۱۲ 🎓", labelEn: "Grade 12 Special 🎓", icon: Target },
    { id: "pomodoro" as NavTab, labelKu: "کاتژمێری پۆمۆدۆرۆ (تەرکیز)", labelBadini: "کاتژمێرا پۆمۆدۆرۆ (تەرکیز)", labelEn: "Pomodoro Focus Timer", icon: Timer },
    { id: "revision" as NavTab, labelKu: "پێداچوون 🔄", labelBadini: "پێداچوون 🔄", labelEn: "Revision 🔄", icon: RefreshCw },
    { id: "studyTools" as NavTab, labelKu: "ئامرازێن خویندنێ 🧠", labelBadini: "ئامرازێن خویندنێ 🧠", labelEn: "Study Tools 🧠", icon: Calendar },
    { id: "subjects" as NavTab, labelKu: "شرۆڤەی وانەکان 📖", labelBadini: "شرۆڤەکرنا وانەیان 📖", labelEn: "Lesson Explanations 📖", icon: BookOpen },
    { id: "exams" as NavTab, labelKu: "تاقیکردنەوەکان", labelBadini: "تاقیکرنێن وزاری", labelEn: "Exams", icon: FileCheck },
    { id: "videos" as NavTab, labelKu: "ڤیدیۆی وانەکان", labelBadini: "ڤیدیۆیێن وانان", labelEn: "Video Lessons", icon: Video },
    { id: "pdfLibrary" as NavTab, labelKu: "PDF و مەلزەمە", labelBadini: "PDF و مەلزەمە", labelEn: "PDF Library", icon: FileDown },
    { id: "challenges" as NavTab, labelKu: "چالنجەکان", labelBadini: "ئاڵنگاریێن ڕۆژانە", labelEn: "Challenges", icon: Target },
    { id: "leaderboard" as NavTab, labelKu: "ڕێزبەند", labelBadini: "ڕیزبەندا گشتی", labelEn: "Leaderboard", icon: Trophy },
    { id: "studyPlan" as NavTab, labelKu: "پلانی خوێندن", labelBadini: "پلانا خویندنێ", labelEn: "Study Plan", icon: Calendar },
    { id: "notes" as NavTab, labelKu: "تێبینییەکان", labelBadini: "تێبینی و یاسا", labelEn: "Notes", icon: FileText },
    { id: "bookmarks" as NavTab, labelKu: "پارێزراوەکان", labelBadini: "پرسیارێن پاراستی", labelEn: "Bookmarks", icon: Bookmark },
    { id: "statistics" as NavTab, labelKu: "ئامارەکان", labelBadini: "ئامارێن خویندنێ", labelEn: "Statistics", icon: BarChart2 },
    { id: "community" as NavTab, labelKu: "کۆمەڵگە و فۆڕەم", labelBadini: "کۆمەڵگەها قوتابییان", labelEn: "Community Forum", icon: Users },
    { id: "friends" as NavTab, labelKu: "هاوڕێیان و چات", labelBadini: "هاڤاڵ و چات", labelEn: "Friends & Chat", icon: MessageSquare },
    { id: "shop" as NavTab, labelKu: "فرۆشگای خەڵات", labelBadini: "فرۆشگەها خەڵاتان", labelEn: "Rewards Shop", icon: ShoppingBag },
    { id: "luckyWheel" as NavTab, labelKu: "چەرخی شانس 🎡", labelBadini: "چەرخێ شانسێ 🎡", labelEn: "Lucky Wheel 🎡", icon: Disc },
    { id: "premium" as NavTab, labelKu: "پلانی VIP / Premium 👑", labelBadini: "پلانا Premium 👑", labelEn: "VIP Premium 👑", icon: Crown },
    { id: "admin" as NavTab, labelKu: "پانێڵی بەڕێوەبەر", labelBadini: "پانێڵێ بڕێڤەبەری", labelEn: "Admin Panel", icon: ShieldCheck }
  ];

  const days = [
    { name: "M", checked: true },
    { name: "T", checked: true },
    { name: "W", checked: true },
    { name: "T", checked: true },
    { name: "F", checked: true },
    { name: "S", checked: true },
    { name: "S", checked: false }
  ];

  const getNavItemLabel = (item: typeof navItems[0]) => {
    if (language === "badini") return item.labelBadini;
    if (language === "ku") return item.labelKu;
    return item.labelEn;
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 border-r flex flex-col justify-between p-4 overflow-y-auto no-scrollbar transition-all duration-300 ease-in-out ${
          isDarkMode
            ? "bg-[#0d0f1d] border-indigo-900/30 text-slate-100"
            : "bg-white border-slate-200 text-slate-800 shadow-sm"
        } ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Menu Items List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 text-white shadow-lg shadow-purple-600/30 font-semibold"
                      : isDarkMode
                      ? "text-slate-400 hover:text-slate-200 hover:bg-[#16182e]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span className="truncate">{getNavItemLabel(item)}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Access Block */}
          <div className="mt-5 pt-4 border-t border-indigo-900/30">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-400 block mb-2 px-1">
              {language === "badini" ? "دەستگەهێ خێرا (Quick Access)" : language === "ku" ? "دەستگەیشتنی خێرا" : "Quick Access"}
            </span>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onOpenCameraOcr?.();
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isDarkMode
                    ? "text-slate-300 hover:bg-[#16182e] hover:text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span>{language === "badini" ? "سکێنێ پرسیارێ" : "سکانی پرسیار"}</span>
              </button>

              <button
                onClick={() => {
                  onOpenAiTutor?.();
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isDarkMode
                    ? "text-slate-300 hover:bg-[#16182e] hover:text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                <span>{language === "badini" ? "ڕوونکردنا ژیری" : "ڕوونکردنەوەی ژیرانە"}</span>
              </button>

              <button
                onClick={() => {
                  onOpenCalculator?.();
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isDarkMode
                    ? "text-slate-300 hover:bg-[#16182e] hover:text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-violet-500" />
                <span>{language === "badini" ? "کالکیولێتەر" : "ژمێرەی زانستی"}</span>
              </button>
            </div>
          </div>

          {/* Daily Streak Widget */}
          <div
            className={`mt-6 p-3.5 rounded-2xl border ${
              isDarkMode
                ? "bg-[#16182e] border-indigo-900/30"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                <span className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  {uiTranslations.dailyStreak[language]}
                </span>
              </div>
              <span className="text-xs font-bold text-orange-500">
                {user.dailyStreak} {uiTranslations.daysUnit[language]}
              </span>
            </div>

            {/* Streak Checkmarks Row */}
            <div className="grid grid-cols-7 gap-1 mt-2">
              {days.map((day, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      day.checked
                        ? "bg-purple-600 text-white shadow-sm shadow-purple-600/50"
                        : isDarkMode
                        ? "bg-indigo-950/60 text-slate-600 border border-indigo-900/40"
                        : "bg-slate-200 text-slate-400 border border-slate-300"
                    }`}
                  >
                    {day.checked ? "✓" : ""}
                  </div>
                  <span className="text-[9px] text-slate-400">{day.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom User Card & Dark Mode Switch */}
        <div
          className={`pt-4 border-t space-y-3 ${
            isDarkMode ? "border-indigo-900/20" : "border-slate-200"
          }`}
        >
          {/* User Profile Progress Card */}
          <div
            onClick={() => {
              onOpenProfile?.();
              onCloseMobile();
            }}
            className={`p-3 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] ${
              isDarkMode ? "bg-[#16182e] border-indigo-900/30 hover:border-purple-500/50" : "bg-slate-50 border-slate-200 hover:border-purple-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-purple-500/50"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold truncate ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {user.name}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <span className="text-[10px] font-semibold text-purple-500 block">
                  Level {user.level}
                </span>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="mt-2.5">
              <div
                className={`w-full rounded-full h-1.5 overflow-hidden ${
                  isDarkMode ? "bg-indigo-950/80" : "bg-slate-200"
                }`}
              >
                <div
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      (user.currentXp / user.nextLevelXp) * 100
                    )}%`
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>{user.currentXp.toLocaleString()}</span>
                <span>/ {user.nextLevelXp.toLocaleString()} XP</span>
              </div>
            </div>
          </div>

          {/* Dark / Light Mode Toggle */}
          <div
            className={`flex items-center justify-between p-2.5 rounded-xl border ${
              isDarkMode ? "bg-[#16182e] border-indigo-900/30" : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {isDarkMode ? (
                <Moon className="w-4 h-4 text-purple-400" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
              <span
                className={`text-xs font-medium ${
                  isDarkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                {isDarkMode
                  ? uiTranslations.darkMode[language]
                  : uiTranslations.lightMode[language]}
              </span>
            </div>

            <button
              onClick={onToggleDarkMode}
              className={`w-11 h-6 rounded-full transition-colors p-0.5 relative ${
                isDarkMode ? "bg-purple-600" : "bg-slate-300"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform transform ${
                  isDarkMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

