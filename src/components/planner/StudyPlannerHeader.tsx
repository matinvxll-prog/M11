import React, { useState } from "react";
import {
  Search,
  Calendar as CalendarIcon,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  Edit3,
  Check,
  Menu
} from "lucide-react";
import { Language, UserProfile } from "../../types";

interface StudyPlannerHeaderProps {
  language: Language;
  user?: UserProfile;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  daysLeft: number;
  onUpdateDaysLeft: (days: number) => void;
  onToggleMobileSidebar?: () => void;
}

export const StudyPlannerHeader: React.FC<StudyPlannerHeaderProps> = ({
  language,
  user,
  isDarkMode,
  onToggleTheme,
  daysLeft,
  onUpdateDaysLeft,
  onToggleMobileSidebar
}) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";
  const [showDaysEditor, setShowDaysEditor] = useState(false);
  const [tempDays, setTempDays] = useState(daysLeft.toString());
  const [searchQuery, setSearchQuery] = useState("");

  const handleSaveDays = () => {
    const val = parseInt(tempDays, 10);
    if (!isNaN(val) && val >= 0) {
      onUpdateDaysLeft(val);
    }
    setShowDaysEditor(false);
  };

  const userName = user?.name || (isBadini ? "مەتبن" : isKu ? "مەتبن" : "Mateen");

  return (
    <header className="bg-white dark:bg-[#0f1219] border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 sticky top-0 z-30 select-none">
      {/* Left Area: Mobile Toggle & Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="p-2 rounded-xl bg-[#F5F7FA] dark:bg-[#181c26] hover:bg-slate-200/60 xl:hidden text-slate-700 dark:text-slate-300 transition"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="relative w-full">
          <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#F5F7FA] dark:bg-[#181c26] border border-slate-200/60 dark:border-slate-800 focus-within:border-[#2563EB] focus-within:bg-white dark:focus-within:bg-[#0f1219] transition shadow-xs w-full">
            <div className="flex items-center gap-2.5 flex-1">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isBadini ? "ل هەر بابەت یان وانەیەکێ بگەڕە..." : isKu ? "لە هەر بابەت یان وانەیەک گەڕان بکە..." : "Search anything..."}
                className="bg-transparent border-none text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none w-full font-medium"
              />
            </div>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700/60 font-mono text-[10px] font-bold text-slate-500 dark:text-slate-400 shrink-0">
              ⌘K
            </span>
          </div>
        </div>
      </div>

      {/* Right Area: Exam Countdown, Notifications, Theme, Profile */}
      <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
        {/* Ministry Exam Countdown Card Pill */}
        <div className="relative">
          <div
            onClick={() => {
              setTempDays(daysLeft.toString());
              setShowDaysEditor(!showDaysEditor);
            }}
            className="px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#F5F7FA] dark:bg-[#181c26] hover:bg-blue-50 dark:hover:bg-blue-950/30 border border-slate-200/80 dark:border-slate-800 flex items-center gap-2 sm:gap-3 transition cursor-pointer shadow-xs group"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-[#2563EB] flex items-center justify-center shrink-0">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block leading-none">
                {isBadini ? "ئەزموونا وزاری" : isKu ? "تاقیکردنەوەی وزاری" : "Ministry Exam"}
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-sm sm:text-base font-black text-[#2563EB] font-mono leading-none">
                  {daysLeft}
                </span>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  {isBadini ? "ڕۆژ ماینە" : isKu ? "ڕۆژ ماوە" : "Days Left"}
                </span>
              </div>
            </div>
            <Edit3 className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition hidden sm:block" />
          </div>

          {/* Days Left Popover Editor */}
          {showDaysEditor && (
            <div className="absolute top-12 right-0 z-40 p-4 rounded-2xl bg-white dark:bg-[#161a23] border border-slate-200 dark:border-slate-800 shadow-xl space-y-3 w-60 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 dark:text-white">
                  {isBadini ? "گوهورینا کاتێ ماین" : isKu ? "گۆڕینی ڕۆژانی ماوە" : "Edit Countdown Target"}
                </span>
                <span className="text-[10px] font-mono text-blue-500 font-bold">Grade 12</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={tempDays}
                  onChange={(e) => setTempDays(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0f1219] text-sm font-bold text-center font-mono focus:outline-none focus:border-[#2563EB]"
                />
                <button
                  onClick={handleSaveDays}
                  className="px-3.5 py-1.5 rounded-xl bg-[#2563EB] text-white hover:bg-blue-700 font-bold text-xs flex items-center justify-center gap-1 transition shrink-0"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <button
          onClick={() => alert(isBadini ? "٣ ئاگەهداریکرنێن نووی هەنە ل سەر وانە و تاقیکرنان" : isKu ? "٣ ئاگادارکردنەوەی نوێ هەن بۆ وانە و تاقیکردنەوەکان" : "You have 3 new study and revision notifications")}
          className="p-2.5 rounded-xl bg-[#F5F7FA] dark:bg-[#181c26] hover:bg-slate-200/60 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 relative transition shadow-xs"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center absolute -top-1 -right-1 border-2 border-white dark:border-[#0f1219]">
            3
          </span>
        </button>

        {/* Theme Switch Button */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl bg-[#F5F7FA] dark:bg-[#181c26] hover:bg-slate-200/60 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition shadow-xs"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        )}

        {/* Student Profile Pill */}
        <div
          onClick={() => alert(isBadini ? `سلاو ${userName}! تو یێ د قۆناغا پێداچوونێ دا یێ بەردەوامی.` : isKu ? `سڵاو ${userName}! تۆ لە قۆناغی پێداچوونەوەدایت بە بەردەوامی.` : `Hi ${userName}! You are making consistent Grade 12 progress.`)}
          className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-200 dark:border-slate-800 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2563EB] to-indigo-500 text-white font-black flex items-center justify-center text-xs sm:text-sm shadow-sm shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block text-left">
            <span className="text-xs font-black text-slate-900 dark:text-white block leading-tight group-hover:text-[#2563EB] transition">
              {isBadini ? `سلاو، ${userName}` : isKu ? `سڵاو، ${userName}` : `Hi, ${userName}`}
            </span>
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 block leading-tight">
              {isBadini ? "پۆلا ١٢" : isKu ? "پۆلی ١٢" : "Grade 12"}
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block group-hover:text-slate-600 transition" />
        </div>
      </div>
    </header>
  );
};
