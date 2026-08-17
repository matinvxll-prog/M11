import React, { useState } from "react";
import { ArrowRight, Trophy, Star, Crown, Medal, ShieldAlert, Sparkles } from "lucide-react";
import { LeaderboardUser, Language } from "../types";
import { uiTranslations } from "../utils/i18n";

interface LeaderboardWidgetProps {
  users: LeaderboardUser[];
  language: Language;
  isDarkMode?: boolean;
  onSeeFullLeaderboard?: () => void;
  onViewAll?: () => void;
}

export const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = ({
  users,
  language,
  isDarkMode = true,
  onSeeFullLeaderboard,
  onViewAll
}) => {
  const [activeTab, setActiveTab] = useState<"global" | "friends" | "class">("global");
  const handleViewAll = () => {
    if (onSeeFullLeaderboard) onSeeFullLeaderboard();
    else if (onViewAll) onViewAll();
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-7 h-7 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-black font-black flex items-center justify-center shadow-md shadow-amber-500/40 transform scale-110">
          <Crown className="w-4 h-4 text-black fill-black/20" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-6 h-6 rounded-xl bg-gradient-to-tr from-slate-300 to-slate-400 text-slate-900 font-black flex items-center justify-center shadow-sm">
          <Medal className="w-3.5 h-3.5 text-slate-800" />
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-6 h-6 rounded-xl bg-gradient-to-tr from-amber-700 to-orange-600 text-white font-black flex items-center justify-center shadow-sm">
          <span className="text-xs">3</span>
        </div>
      );
    }
    return (
      <div className={`w-6 h-6 rounded-xl font-bold flex items-center justify-center text-xs ${
        isDarkMode ? "bg-white/5 text-slate-400" : "bg-slate-100 text-slate-600"
      }`}>
        {rank}
      </div>
    );
  };

  return (
    <div
      className={`border rounded-3xl p-5 sm:p-6 shadow-xl transition-all duration-300 flex flex-col justify-between ${
        isDarkMode
          ? "bg-[#111326]/95 border-indigo-900/40 text-white shadow-indigo-950/50"
          : "bg-white border-purple-100 text-slate-900 shadow-purple-900/5"
      }`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-tight">
                {uiTranslations.leaderboardTitle[language]}
              </h3>
              <p className={`text-[11px] font-semibold ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                {language === "badini"
                  ? "ڕیزبەندا گشتی یا هەرێمێ و پۆلا ١٢"
                  : language === "ku"
                  ? "ڕێزبەندی گشتی هەرێم و قوتابیانی پۆلی ١٢"
                  : "Regional Grade 12 Top Achievers"}
              </p>
            </div>
          </div>

          <button
            onClick={handleViewAll}
            className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl transition ${
              isDarkMode
                ? "bg-purple-500/15 text-purple-300 hover:bg-purple-500/25"
                : "bg-purple-50 text-purple-700 hover:bg-purple-100"
            }`}
          >
            <span>{uiTranslations.viewAll[language]}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tab Buttons (Global / Friends / Class) */}
        <div className={`flex items-center p-1 rounded-2xl border mb-4 ${
          isDarkMode ? "bg-[#16182e] border-indigo-900/30" : "bg-slate-100/80 border-slate-200/80"
        }`}>
          <button
            onClick={() => setActiveTab("global")}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
              activeTab === "global"
                ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-md shadow-purple-600/30"
                : isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-purple-900"
            }`}
          >
            {language === "badini" ? "🌍 گشتی" : language === "ku" ? "🌍 گشتی" : "🌍 Global"}
          </button>
          <button
            onClick={() => setActiveTab("friends")}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
              activeTab === "friends"
                ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-md shadow-purple-600/30"
                : isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-purple-900"
            }`}
          >
            {language === "badini" ? "👥 هەڤال" : language === "ku" ? "👥 هاوڕێیان" : "👥 Friends"}
          </button>
          <button
            onClick={() => setActiveTab("class")}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
              activeTab === "class"
                ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-md shadow-purple-600/30"
                : isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-purple-900"
            }`}
          >
            {language === "badini" ? "🏫 پۆلا من" : language === "ku" ? "🏫 پۆلەکەم" : "🏫 My Class"}
          </button>
        </div>

        {/* Users List */}
        <div className="space-y-2.5">
          {users.slice(0, 5).map((u) => {
            const isSelf = u.isCurrentUser;
            return (
              <div
                key={u.id}
                className={`flex items-center justify-between p-3 rounded-2xl transition-all duration-200 border group ${
                  isSelf
                    ? isDarkMode
                      ? "bg-gradient-to-r from-purple-900/60 via-indigo-900/60 to-purple-900/60 border-purple-500/60 shadow-lg shadow-purple-600/20 scale-[1.02]"
                      : "bg-gradient-to-r from-purple-100 via-indigo-50 to-purple-100 border-purple-300 shadow-md font-bold scale-[1.02]"
                    : isDarkMode
                    ? "bg-[#16182e]/80 hover:bg-[#1d203e] border-indigo-900/30 hover:border-purple-500/40"
                    : "bg-slate-50 hover:bg-purple-50/60 border-slate-200/80 hover:border-purple-300"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {getRankBadge(u.rank)}
                  <div className="relative">
                    <img
                      src={u.avatar}
                      alt={u.name}
                      className={`w-9 h-9 rounded-2xl object-cover ring-2 ${
                        u.rank === 1 ? "ring-amber-400 shadow-md shadow-amber-400/30" : "ring-purple-500/30"
                      }`}
                    />
                    {u.rank === 1 && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs sm:text-sm font-black truncate ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                        {u.name}
                      </span>
                      {isSelf && (
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-purple-600 text-white shrink-0">
                          {language === "badini" ? "تۆ" : language === "ku" ? "تۆ" : "You"}
                        </span>
                      )}
                    </div>
                    <span className={`text-[11px] font-semibold truncate block ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                      📍 {u.city}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 font-mono text-xs font-black text-amber-500 dark:text-amber-400 shrink-0">
                  <span>{u.xp.toLocaleString()} XP</span>
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* See Full Leaderboard Callout Button */}
      <button
        onClick={handleViewAll}
        className="w-full mt-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 group hover:scale-[1.01]"
      >
        <Trophy className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
        <span>
          {language === "badini"
            ? "دیتنا تەواویا ڕیزبەندێ و خەڵاتان 🏆"
            : language === "ku"
            ? "سەیرکردنی ڕێزبەندی تەواو و خەڵاتەکان 🏆"
            : "See Full Leaderboard & Rewards 🏆"}
        </span>
      </button>
    </div>
  );
};


