import React from "react";
import { ArrowRight, Trophy, Lock, Sparkles, CheckCircle2 } from "lucide-react";
import { AchievementBadge, Language } from "../types";
import { getLocalizedText, uiTranslations } from "../utils/i18n";

interface AchievementsRowProps {
  achievements: AchievementBadge[];
  language: Language;
  isDarkMode?: boolean;
  onViewAll?: () => void;
}

export const AchievementsRow: React.FC<AchievementsRowProps> = ({
  achievements,
  language,
  isDarkMode = true,
  onViewAll
}) => {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length || 1;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div
      className={`border rounded-3xl p-5 sm:p-6 shadow-xl transition-all duration-300 flex flex-col justify-between ${
        isDarkMode
          ? "bg-[#111326]/95 border-indigo-900/40 text-white shadow-indigo-950/50"
          : "bg-white border-purple-100 text-slate-900 shadow-purple-900/5"
      }`}
    >
      {/* Header with Title and Unlocked Progress Pill */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-tight">
                {uiTranslations.achievementsTitle[language]}
              </h3>
              <p className={`text-[11px] font-semibold ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                {language === "badini"
                  ? "نیشانێن شانازیێ یێن پۆلا ١٢"
                  : language === "ku"
                  ? "نیشانەکانی شانازی پۆلی ١٢"
                  : "Grade 12 Honor Badges"}
              </p>
            </div>
          </div>

          {onViewAll && (
            <button
              onClick={onViewAll}
              className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl transition ${
                isDarkMode
                  ? "bg-purple-500/15 text-purple-300 hover:bg-purple-500/25"
                  : "bg-purple-50 text-purple-700 hover:bg-purple-100"
              }`}
            >
              <span>{uiTranslations.viewAll[language]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Progress Bar Header */}
        <div className={`p-3 rounded-2xl border mb-5 flex items-center justify-between gap-3 ${
          isDarkMode ? "bg-[#16182e] border-indigo-900/30" : "bg-slate-50 border-slate-200/80"
        }`}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="text-xs font-extrabold">
              {language === "badini"
                ? `${unlockedCount} ژ ${totalCount} نیشانان بەدەستڤەهاتینە`
                : language === "ku"
                ? `${unlockedCount} لە ${totalCount} نیشانە بەدەست هاتوون`
                : `${unlockedCount} / ${totalCount} Badges Unlocked`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-20 sm:w-28 h-2 rounded-full bg-slate-200 dark:bg-indigo-950 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-mono font-black text-amber-500">{progressPercent}%</span>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {achievements.map((badge) => {
            const title = getLocalizedText(badge, "title", language);
            const desc = getLocalizedText(badge, "desc", language);

            return (
              <div
                key={badge.id}
                title={desc}
                className={`relative flex flex-col items-center text-center p-3 rounded-2xl border transition-all duration-300 group ${
                  badge.unlocked
                    ? isDarkMode
                      ? "bg-gradient-to-b from-[#1c1e3d] to-[#161832] border-purple-500/40 hover:border-amber-500/60 shadow-lg hover:scale-105"
                      : "bg-gradient-to-b from-purple-50/80 to-white border-purple-200 hover:border-amber-400 shadow-md hover:scale-105"
                    : isDarkMode
                    ? "bg-[#141628] border-indigo-950/80 opacity-60 hover:opacity-80"
                    : "bg-slate-100/70 border-slate-200 opacity-60 hover:opacity-80"
                }`}
              >
                {/* Unlocked / Locked Status Indicator */}
                <div className="absolute top-1.5 right-1.5">
                  {badge.unlocked ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>

                {/* Badge Icon Container */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-md mb-2 transition-transform duration-300 group-hover:scale-110 ${
                    badge.unlocked
                      ? `bg-gradient-to-tr ${badge.color} ring-2 ring-white/20 shadow-purple-500/20`
                      : "bg-slate-300 dark:bg-indigo-950 grayscale opacity-50"
                  }`}
                >
                  {badge.icon}
                </div>

                {/* Badge Title */}
                <span
                  className={`text-[11px] font-black leading-tight truncate w-full ${
                    badge.unlocked
                      ? isDarkMode ? "text-white" : "text-slate-900 font-extrabold"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {title}
                </span>

                {/* XP Reward or Status Tag */}
                <span className={`text-[9px] font-bold mt-1 px-1.5 py-0.5 rounded-md ${
                  badge.unlocked
                    ? "bg-amber-500/15 text-amber-500 dark:text-amber-400 border border-amber-500/30"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                }`}>
                  {badge.unlocked ? "+500 XP" : language === "badini" ? "داخراوە" : language === "ku" ? "داخراوە" : "Locked"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


