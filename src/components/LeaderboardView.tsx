import React, { useState } from "react";
import { Search, MapPin, School, Star, Flame } from "lucide-react";
import { LeaderboardUser, Language } from "../types";
import { uiTranslations } from "../utils/i18n";

interface LeaderboardViewProps {
  users: LeaderboardUser[];
  language: Language;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ users, language }) => {
  const [filterTab, setFilterTab] = useState<"global" | "erbil" | "sulaymaniyah" | "duhok" | "halabja">("global");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.school.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterTab === "global") return matchesSearch;
    return matchesSearch && u.city.toLowerCase() === filterTab.toLowerCase();
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 border border-purple-800/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-3xl shadow-lg">
            🏆
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              {uiTranslations.leaderboardTitle[language]}
            </h1>
            <p className="text-xs text-purple-200/80 mt-1">
              {language === "badini"
                ? "ڕکابەرییا ژیرانە بکە د ناڤبەرا باشترین قوتابییێن پارێزگەهان دا"
                : language === "ku"
                ? "کێبرکێی ژیرانە بکه لە نێوان باشترین قوتابییانی پارێزگاکاندا"
                : "Compete with top students across Erbil, Sulaymaniyah, Duhok & Halabja!"}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 bg-[#16182e] border border-indigo-900/30 rounded-2xl overflow-x-auto w-full sm:w-auto">
          {[
            { id: "global", labelKu: "گشتی", labelBadini: "گشتی", labelEn: "Global" },
            { id: "erbil", labelKu: "هەولێر", labelBadini: "هەولێر", labelEn: "Erbil" },
            { id: "sulaymaniyah", labelKu: "سلێمانی", labelBadini: "سلێمانی", labelEn: "Sulaymaniyah" },
            { id: "duhok", labelKu: "دهۆک", labelBadini: "دهۆک", labelEn: "Duhok" },
            { id: "halabja", labelKu: "هەڵەبجە", labelBadini: "هەڵەبجە", labelEn: "Halabja" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                filterTab === tab.id
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {language === "badini"
                ? tab.labelBadini
                : language === "ku"
                ? tab.labelKu
                : tab.labelEn}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === "badini"
                ? "لێگەڕیان ل سەر ناڤێ قوتابی..."
                : language === "ku"
                ? "گەڕان بەدوای ناوی قوتابی..."
                : "Search student..."
            }
            className="w-full bg-[#16182e] text-white text-xs pl-10 pr-4 py-2.5 rounded-2xl border border-indigo-900/30 focus:outline-none focus:border-purple-500 placeholder-slate-500"
          />
        </div>
      </div>

      {/* Podium Top 3 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {users.slice(0, 3).map((u, index) => {
          const podiumBg =
            index === 0
              ? "from-amber-900/40 via-amber-950/20 to-[#16182e] border-amber-500/50"
              : index === 1
              ? "from-slate-800/40 via-slate-900/20 to-[#16182e] border-slate-400/50"
              : "from-amber-950/40 via-orange-950/20 to-[#16182e] border-amber-700/50";

          const rankTitle = index === 0 ? "🥇 Rank 1" : index === 1 ? "🥈 Rank 2" : "🥉 Rank 3";

          return (
            <div
              key={u.id}
              className={`p-5 rounded-3xl bg-gradient-to-b ${podiumBg} border shadow-xl text-center flex flex-col items-center justify-between relative overflow-hidden`}
            >
              <div className="absolute top-3 right-3 text-[10px] font-black text-amber-400 bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 rounded-full">
                {rankTitle}
              </div>

              <div className="my-2">
                <img
                  src={u.avatar}
                  alt={u.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-4 ring-purple-500/40 shadow-xl mb-3 mx-auto"
                />
                <h3 className="text-base font-extrabold text-white">{u.name}</h3>
                <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mt-1">
                  <MapPin className="w-3 h-3 text-purple-400" />
                  <span>{u.city}</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-[10px] text-purple-300 mt-0.5">
                  <School className="w-3 h-3 text-purple-400" />
                  <span className="truncate max-w-[150px]">{u.school}</span>
                </div>
              </div>

              <div className="mt-3 w-full py-2 rounded-xl bg-purple-950/60 border border-purple-800/30 font-mono text-sm font-black text-amber-400 flex items-center justify-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{u.xp.toLocaleString()} XP</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-[#16182e] border border-indigo-900/30 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-indigo-900/20 text-xs font-bold text-slate-400 grid grid-cols-12 gap-2">
          <span className="col-span-1 text-center">#</span>
          <span className="col-span-5">
            {language === "badini"
              ? "قوتابی"
              : language === "ku"
              ? "قوتابی"
              : "Student"}
          </span>
          <span className="col-span-3">
            {language === "badini"
              ? "بژارە & قوتابخانە"
              : language === "ku"
              ? "شار & قوتابخانە"
              : "City & School"}
          </span>
          <span className="col-span-3 text-right">
            {language === "badini"
              ? "کۆیا XP"
              : language === "ku"
              ? "کۆی XP"
              : "Total XP"}
          </span>
        </div>

        <div className="divide-y divide-indigo-900/20">
          {filteredUsers.map((u) => (
            <div
              key={u.id}
              className={`p-3.5 grid grid-cols-12 gap-2 items-center transition ${
                u.isCurrentUser
                  ? "bg-purple-950/60 border-l-4 border-l-purple-500"
                  : "hover:bg-[#1f2240]"
              }`}
            >
              <div className="col-span-1 text-center font-bold text-xs font-mono text-slate-300">
                {u.rank}
              </div>

              <div className="col-span-5 flex items-center gap-3">
                <img
                  src={u.avatar}
                  alt={u.name}
                  className="w-9 h-9 rounded-xl object-cover ring-1 ring-purple-500/30"
                />
                <div>
                  <span className="text-xs font-bold text-white block">
                    {u.name}{" "}
                    {u.isCurrentUser &&
                      (language === "badini"
                        ? "(تۆ)"
                        : language === "ku"
                        ? "(تۆ)"
                        : "(You)")}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-orange-400">
                    <Flame className="w-3 h-3 fill-orange-400" />
                    <span>
                      {u.streakDays} {uiTranslations.daysUnit[language]}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-3">
                <span className="text-xs text-slate-300 font-medium block truncate">{u.city}</span>
                <span className="text-[10px] text-slate-500 truncate block">{u.school}</span>
              </div>

              <div className="col-span-3 text-right font-mono text-xs font-black text-amber-400 flex items-center justify-end gap-1">
                <span>{u.xp.toLocaleString()}</span>
                <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

