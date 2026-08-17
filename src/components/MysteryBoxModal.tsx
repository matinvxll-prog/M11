import React, { useState } from "react";
import { Gift, X, Award, Sparkles, Trophy, Star } from "lucide-react";
import { Language } from "../types";

interface MysteryBoxModalProps {
  language: Language;
  onClose: () => void;
  onClaimXP?: (xp: number, coins: number) => void;
}

export const MysteryBoxModal: React.FC<MysteryBoxModalProps> = ({
  language,
  onClose,
  onClaimXP
}) => {
  const isBadini = language === "badini";
  const [isOpenBox, setIsOpenBox] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  const handleOpenBox = () => {
    setIsOpenBox(true);
    setTimeout(() => {
      if (onClaimXP) {
        onClaimXP(250, 50);
      }
      setRewardClaimed(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#121427] border border-amber-500/50 rounded-3xl w-full max-w-md p-6 text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 blur-3xl rounded-full pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            {isBadini ? "سندوقێ نهێنی و خەڵاتێن ڕۆژانە" : "سندوقی نهێنی و دیاری ڕۆژانە"}
          </span>
          <h2 className="text-xl font-black text-white">
            {isBadini ? "دیاریا سەرسوڕهێنەر بۆ بەردەوامییا خویندنێ!" : "خەڵاتی سەرسوڕهێنەری ڕۆژانە"}
          </h2>
        </div>

        {/* Box Icon Animation */}
        <div className="py-6 flex justify-center">
          <div
            onClick={!isOpenBox ? handleOpenBox : undefined}
            className={`p-8 rounded-3xl bg-gradient-to-br from-amber-500/30 to-purple-600/30 border-2 border-amber-400 shadow-2xl cursor-pointer transition-all duration-500 transform ${
              isOpenBox ? "scale-110 rotate-6" : "hover:scale-105 animate-bounce"
            }`}
          >
            <Gift className={`w-20 h-20 ${isOpenBox ? "text-amber-300 animate-pulse" : "text-amber-400"}`} />
          </div>
        </div>

        {!isOpenBox && (
          <button
            onClick={handleOpenBox}
            className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition shadow-lg shadow-amber-500/30"
          >
            {isBadini ? "سندوقێ ڤەکە (Open Mystery Box)" : "سندوقەکە بڕکەرەوە"}
          </button>
        )}

        {rewardClaimed && (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 space-y-1 animate-fadeIn">
            <span className="font-extrabold text-emerald-300 text-sm block">🎉 پیرۆزە! ۲۵۰ XP + ۵۰ سکە وەرگیران!</span>
            <span className="text-xs text-slate-300 block">پۆنوسا ئامادەبوونا ڕۆژانە بۆ تە زێدە بوو.</span>
          </div>
        )}
      </div>
    </div>
  );
};
