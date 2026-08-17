import React from "react";
import { RecentActivityItem, Language } from "../types";
import { getLocalizedText, uiTranslations } from "../utils/i18n";
import { Sparkles, Activity, Clock, Award } from "lucide-react";

interface RecentActivityProps {
  activities: RecentActivityItem[];
  language: Language;
  isDarkMode?: boolean;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  activities,
  language,
  isDarkMode = true
}) => {
  return (
    <div
      className={`border rounded-3xl p-5 sm:p-6 shadow-xl transition-all duration-300 flex flex-col justify-between ${
        isDarkMode
          ? "bg-[#111326]/95 border-indigo-900/40 text-white shadow-indigo-950/50"
          : "bg-white border-purple-100 text-slate-900 shadow-purple-900/5"
      }`}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-tight">
                {uiTranslations.recentActivity[language]}
              </h3>
              <p className={`text-[11px] font-semibold ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                {language === "badini"
                  ? "دوایین چالاکی و خاڵێن XP یێن تە"
                  : language === "ku"
                  ? "دوایین چالاکی و خاڵەکانی XP کە کۆتکردوونەتەوە"
                  : "Your latest activities and earned XP"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 text-pink-500 dark:text-pink-400 text-xs font-black">
            <Sparkles className="w-3.5 h-3.5 fill-pink-400" />
            <span>{language === "badini" ? "چاڵاک" : language === "ku" ? "چالاک" : "Active"}</span>
          </div>
        </div>

        {/* Activity List */}
        <div className="space-y-3">
          {activities.map((act) => {
            const title = getLocalizedText(act, "title", language);
            const timeAgo = getLocalizedText(act, "timeAgo", language);

            return (
              <div
                key={act.id}
                className={`flex items-center justify-between gap-3 p-3.5 rounded-2xl border transition-all duration-200 group hover:scale-[1.01] ${
                  isDarkMode
                    ? "bg-[#16182e]/80 hover:bg-[#1d203e] border-indigo-900/30 hover:border-pink-500/40"
                    : "bg-slate-50 hover:bg-purple-50/60 border-slate-200/80 hover:border-purple-300"
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 text-lg shadow-sm border transition-transform group-hover:scale-110 ${act.iconBg}`}
                  >
                    {act.icon}
                  </div>

                  <div className="min-w-0">
                    <h4 className={`text-xs sm:text-sm font-black truncate ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                      {title}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>{timeAgo}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-mono text-xs font-black shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
                    <span>+{act.xpGained}</span>
                    <span className="text-[10px]">XP</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer encouraging note */}
      <div className={`mt-5 pt-3.5 border-t flex items-center justify-between text-xs font-bold ${
        isDarkMode ? "border-indigo-900/30 text-slate-400" : "border-slate-200 text-slate-500"
      }`}>
        <div className="flex items-center gap-1.5 text-amber-500">
          <Award className="w-4 h-4" />
          <span>{language === "badini" ? "بەردەوام بە بۆ وەرگرتنا خەڵاتان!" : language === "ku" ? "بەردەوام بە بۆ وەرگرتنی خەڵاتی زیاتر!" : "Keep going to earn more rewards!"}</span>
        </div>
        <span className="font-mono text-[11px] text-purple-400 font-extrabold">XP BOOSTER 🚀</span>
      </div>
    </div>
  );
};


