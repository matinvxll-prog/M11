import React, { useState } from "react";
import { Swords, Play } from "lucide-react";
import { Language, UserProfile } from "../types";
import { uiTranslations } from "../utils/i18n";

interface BattleModeViewProps {
  user: UserProfile;
  language: Language;
  onStartBattleQuiz: () => void;
}

export const BattleModeView: React.FC<BattleModeViewProps> = ({
  user,
  language,
  onStartBattleQuiz
}) => {
  const [searchingOpponent, setSearchingOpponent] = useState(false);
  const [matchedOpponent, setMatchedOpponent] = useState<any | null>(null);

  const handleMatchmake = () => {
    setSearchingOpponent(true);
    setMatchedOpponent(null);

    setTimeout(() => {
      setSearchingOpponent(false);
      setMatchedOpponent({
        name: "Rebin Kardo",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        city: "Erbil",
        school: "Chuefat Erbil",
        level: 19,
        xp: 8200
      });
    }, 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-rose-950 border border-purple-800/40 shadow-2xl text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center text-3xl shadow-xl mx-auto">
          ⚔️
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {uiTranslations.battleTitle[language]}
        </h1>
        <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl mx-auto">
          {language === "badini"
            ? "ڕکابەریێ بکە دگەل قوتابییەکێ دی یێ پۆلا ۱۲ ل سەر لەزاتی و دروستیا بەرسڤدانا پرسیارێن وزاری!"
            : language === "ku"
            ? "ڕکابەری بکە لەگەڵ قوتابییەکی دیکەی پۆلی ۱۲ لەسەر خێرایی و دروستی وەڵامدانی پرسیاری وزاری!"
            : "Challenge another Grade 12 student in real-time speed & accuracy quiz battle!"}
        </p>
      </div>

      {/* Matchmaker Box */}
      <div className="p-8 rounded-3xl bg-[#16182e] border border-indigo-900/30 text-center space-y-6 shadow-xl">
        {!matchedOpponent && !searchingOpponent && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">
              {language === "badini"
                ? "تۆ ئامادەیی بۆ ڕکابەریا لەز؟"
                : language === "ku"
                ? "ئامادەیت بۆ دووئامانجی خێرا؟"
                : "Ready for a 1v1 Battle?"}
            </h3>
            <button
              onClick={handleMatchmake}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-rose-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm shadow-2xl shadow-purple-600/40 transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto"
            >
              <Swords className="w-5 h-5" />
              <span>
                {language === "badini"
                  ? "لێگەڕیان ل سەر ڕکابەری"
                  : language === "ku"
                  ? "گەڕان بەدوای ڕکابەر"
                  : "Find Match"}
              </span>
            </button>
          </div>
        )}

        {searchingOpponent && (
          <div className="space-y-4 py-6">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-bold text-purple-300 animate-pulse">
              {language === "badini"
                ? "دیتنا ڕکابەرێن ئۆنلاین ل قوتابخانەیێن هەولێر/سلێمانی/دهۆک..."
                : language === "ku"
                ? "دۆزینەوەی ڕکابەری ئۆنلاین لە قوتابخانەکانی هەولێر/سلێمانی/دهۆک..."
                : "Searching for online student in Kurdistan..."}
            </p>
          </div>
        )}

        {matchedOpponent && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-xs font-extrabold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full inline-block">
              ✓{" "}
              {language === "badini"
                ? "ڕکابەر هاتە دیتن!"
                : language === "ku"
                ? "ڕکابەر دۆزرایەوە!"
                : "Match Found!"}
            </div>

            <div className="flex items-center justify-center gap-6 sm:gap-12">
              {/* You */}
              <div className="text-center space-y-2">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-4 ring-purple-500 shadow-xl mx-auto"
                />
                <span className="text-xs font-bold text-white block">{user.name}</span>
                <span className="text-[10px] text-purple-400 font-mono block">Level {user.level}</span>
              </div>

              <div className="text-2xl font-black text-rose-500 italic">VS</div>

              {/* Opponent */}
              <div className="text-center space-y-2">
                <img
                  src={matchedOpponent.avatar}
                  alt={matchedOpponent.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-4 ring-rose-500 shadow-xl mx-auto"
                />
                <span className="text-xs font-bold text-white block">{matchedOpponent.name}</span>
                <span className="text-[10px] text-purple-400 font-mono block">{matchedOpponent.city}</span>
              </div>
            </div>

            <button
              onClick={onStartBattleQuiz}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-xl shadow-emerald-600/30 transition flex items-center justify-center gap-2 mx-auto"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>
                {language === "badini"
                  ? "دەستپێکرنا ڕکابەریێ"
                  : language === "ku"
                  ? "دەستپێکردنی ڕکابەری"
                  : "Start Battle Quiz"}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

