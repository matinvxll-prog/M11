import React, { useState } from "react";
import {
  Search,
  Globe,
  Sparkles,
  X,
  Coins,
  Crown,
  Menu
} from "lucide-react";
import { Language, UserProfile } from "../types";
import { uiTranslations } from "../utils/i18n";
import { AppLogoSvg } from "./AppLogo";

interface NavbarProps {
  user: UserProfile;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenAiTutor: () => void;
  onOpenAuth?: () => void;
  onSearch: (term: string) => void;
  searchTerm: string;
  onToggleMobileSidebar?: () => void;
  isMobileSidebarOpen?: boolean;
  onOpenCameraOcr?: () => void;
  onOpenLuckyWheel?: () => void;
  onOpenPremium?: () => void;
  onOpenVoiceQuiz?: () => void;
  onOpenCertificate?: () => void;
  onOpenProfile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  language,
  onLanguageChange,
  isDarkMode,
  onToggleTheme,
  onOpenAiTutor,
  onSearch,
  searchTerm,
  onToggleMobileSidebar,
  isMobileSidebarOpen,
  onOpenPremium,
  onOpenProfile
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);

  return (
    <header
      className={`relative z-30 backdrop-blur-md border-b px-3 sm:px-6 py-2.5 transition-colors ${
        isDarkMode
          ? "bg-[#0d0f1d]/90 border-indigo-900/30 text-slate-100"
          : "bg-white/90 border-slate-200 text-slate-900 shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between gap-3 sm:gap-6 py-1">
        {/* Left: Brand Logo & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className={`lg:hidden p-2.5 rounded-xl transition ${
                isDarkMode
                  ? "text-slate-300 hover:text-white hover:bg-indigo-950/50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
              aria-label="Toggle Navigation"
            >
              {isMobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}

          <div
            onClick={onOpenProfile}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <AppLogoSvg className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl shadow-xl shadow-purple-600/40 transition-transform group-hover:scale-105" />
            <div>
              <span
                className={`font-black text-lg sm:text-2xl block leading-none ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
                style={{ letterSpacing: "normal" }}
              >
                دگەڵ قوتابی
              </span>
              <span className="text-xs font-bold text-purple-400 block mt-1">
                Dagal Qutabi • بۆ قوتابییێن پۆلا ۱۲
              </span>
            </div>
          </div>
        </div>

        {/* Center Search Input */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-2 relative">
          <Search className="w-5 h-5 text-purple-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={uiTranslations.searchPlaceholder[language]}
            className={`w-full text-sm pl-11 pr-9 py-2.5 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition font-bold placeholder-slate-400 ${
              isDarkMode
                ? "bg-[#16182e] text-slate-100 border-indigo-900/40 focus:border-purple-500"
                : "bg-slate-100 text-slate-900 border-slate-200 focus:border-purple-500"
            }`}
          />
          {searchTerm.trim().length > 0 && (
            <button
              onClick={() => onSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition"
              title="پاقژکردن"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Coins Badge */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-black text-sm shadow-sm">
            <Coins className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{user.coins.toLocaleString()}</span>
          </div>

          {/* VIP Upgrade Badge */}
          {onOpenPremium && (
            <button
              onClick={onOpenPremium}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm shadow-md shadow-amber-500/25 flex items-center gap-1.5 transition active:scale-95"
            >
              <Crown className="w-4 h-4" />
              <span className="hidden sm:inline">VIP</span>
            </button>
          )}

          {/* AI Tutor Button */}
          <button
            onClick={onOpenAiTutor}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm shadow-lg shadow-purple-600/30 transition active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border text-xs sm:text-sm font-black transition ${
                isDarkMode
                  ? "bg-[#16182e] border-indigo-900/40 text-slate-200"
                  : "bg-slate-100 border-slate-200 text-slate-800"
              }`}
            >
              <Globe className="w-4 h-4 text-purple-400" />
              <span>{language === "badini" ? "بادینی" : language === "ku" ? "سۆرانی" : "EN"}</span>
            </button>

            {showLangMenu && (
              <div
                className={`absolute right-0 mt-2 w-44 rounded-2xl shadow-2xl py-2 z-50 border ${
                  isDarkMode
                    ? "bg-[#16182e] border-indigo-900/40 text-slate-100"
                    : "bg-white border-slate-200 text-slate-800"
                }`}
              >
                <button
                  onClick={() => {
                    onLanguageChange("ku");
                    setShowLangMenu(false);
                  }}
                  className="w-full text-right px-4 py-2 text-xs sm:text-sm font-black hover:bg-purple-500/10 block"
                >
                  کوردی (سۆرانی)
                </button>
                <button
                  onClick={() => {
                    onLanguageChange("badini");
                    setShowLangMenu(false);
                  }}
                  className="w-full text-right px-4 py-2 text-xs sm:text-sm font-black hover:bg-purple-500/10 block text-purple-400"
                >
                  کوردی (بادینی)
                </button>
                <button
                  onClick={() => {
                    onLanguageChange("en");
                    setShowLangMenu(false);
                  }}
                  className="w-full text-right px-4 py-2 text-xs sm:text-sm font-black hover:bg-purple-500/10 block"
                >
                  English
                </button>
              </div>
            )}
          </div>

          {/* User Profile Avatar Trigger */}
          {onOpenProfile && (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 transition group shadow-md"
              title="پڕۆفایلێ من"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover ring-2 ring-purple-400"
              />
              <div className="hidden lg:block text-right pr-1">
                <span className="text-sm font-black block leading-tight truncate max-w-[110px]">
                  {user.name}
                </span>
                <span className="text-[11px] font-black text-purple-400 block">
                  پڕۆفایل
                </span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Search Bar Row */}
      <div className="md:hidden px-1 pt-2 pb-1">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={uiTranslations.searchPlaceholder[language]}
            className={`w-full text-xs pl-9 pr-8 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition placeholder-slate-400 ${
              isDarkMode
                ? "bg-[#16182e] text-slate-200 border-indigo-900/30 focus:border-purple-500"
                : "bg-slate-100 text-slate-900 border-slate-200 focus:border-purple-500"
            }`}
          />
          {searchTerm.trim().length > 0 && (
            <button
              onClick={() => onSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition"
              title="پاقژکردن"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};



