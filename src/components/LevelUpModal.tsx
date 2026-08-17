import React from "react";
import { Crown, Sparkles, Award, ArrowUpRight, X } from "lucide-react";
import { Language, UserProfile } from "../types";
import { GlossyGameStarsRow } from "./GlossyGameStars";

interface LevelUpModalProps {
  language: Language;
  user: UserProfile;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({ language, user, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn" dir="rtl">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#240b36] via-[#1c082b] to-[#12041d] border border-pink-500/40 rounded-3xl p-6 text-slate-100 shadow-2xl text-center space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Glossy 3D Stars Row */}
        <div className="pt-2">
          <GlossyGameStarsRow starsCount={3} />
        </div>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-black border border-pink-500/40 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
            <span>🎉 سەرکەفتن د ئاستی دا / LEVEL UP!</span>
          </div>
          <h2 className="text-2xl font-black text-white pt-1">
            {language === "badini"
              ? `گەهشتیە ئاستێ ${user?.level || 1} (Level ${user?.level || 1})!`
              : language === "ku"
              ? `گەیشتیت بە ئاستی ${user?.level || 1} (Level ${user?.level || 1})!`
              : `Reached Level ${user?.level || 1}!`}
          </h2>
          <p className="text-xs text-purple-200 leading-relaxed max-w-xs mx-auto">
            {language === "badini"
              ? "دەستکەفتنەکا هەژی! ناڤێ تە ل لوحا ڕیزبەندیێ بڵندتر بوو ب ٣ ستێرێن نایاب!"
              : language === "ku"
              ? "دەستکەوتێکی بڵند! ناوت لە لوحی ڕێزبەندی بەرزتر بووەوە بە ٣ ئەستێرە!"
              : "Incredible progress! You earned 3 full stars on this stage."}
          </p>
        </div>

        {/* Rewards Given */}
        <div className="p-4 rounded-2xl bg-[#16182e] border border-amber-500/30 grid grid-cols-2 gap-3 text-center">
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">پاداشتی سکەی زێڕ</span>
            <span className="text-base font-black text-amber-400">+500 Coins</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">تەختەی VIP</span>
            <span className="text-base font-black text-purple-400">Master Badge</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 transition"
        >
          بەردەوامبوون لە خوێندن 🚀
        </button>
      </div>
    </div>
  );
};
