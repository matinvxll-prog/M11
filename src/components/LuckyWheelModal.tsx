import React, { useState } from "react";
import { Disc, Sparkles, Gift, X, Award, Coins } from "lucide-react";
import { Language, UserProfile } from "../types";

interface LuckyWheelModalProps {
  language: Language;
  user: UserProfile;
  onRewardClaimed: (xp: number, coins: number) => void;
  onClose: () => void;
}

export const LuckyWheelModal: React.FC<LuckyWheelModalProps> = ({
  language,
  user,
  onRewardClaimed,
  onClose
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [claimedPrize, setClaimedPrize] = useState<{ xp: number; coins: number; label: string } | null>(null);

  const prizes = [
    { xp: 500, coins: 200, label: "+500 XP & 200 Coins", color: "from-purple-600 to-indigo-600" },
    { xp: 200, coins: 100, label: "+200 XP & 100 Coins", color: "from-blue-600 to-cyan-600" },
    { xp: 1000, coins: 500, label: "👑 Jackpot! +1000 XP & 500 Coins", color: "from-amber-500 to-orange-500" },
    { xp: 300, coins: 150, label: "+300 XP & 150 Coins", color: "from-emerald-600 to-teal-600" },
    { xp: 150, coins: 50, label: "+150 XP & 50 Coins", color: "from-pink-600 to-rose-600" },
    { xp: 400, coins: 250, label: "+400 XP & 250 Coins", color: "from-indigo-600 to-purple-600" }
  ];

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setClaimedPrize(null);

    const randomIndex = Math.floor(Math.random() * prizes.length);
    const extraRounds = 5 + Math.floor(Math.random() * 3);
    const degreesPerPrize = 360 / prizes.length;
    const targetDegree = rotationDegree + extraRounds * 360 + randomIndex * degreesPerPrize + degreesPerPrize / 2;

    setRotationDegree(targetDegree);

    setTimeout(() => {
      setIsSpinning(false);
      const won = prizes[randomIndex];
      setClaimedPrize(won);
      onRewardClaimed(won.xp, won.coins);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#111326] border border-amber-500/30 rounded-3xl p-6 text-slate-100 shadow-2xl text-center space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>
              {language === "badini"
                ? "چەرخێ شانسێ ڕۆژانە"
                : language === "ku"
                ? "چەرخی شانسی ڕۆژانە"
                : "Daily Lucky Wheel"}
            </span>
          </div>
          <h2 className="text-xl font-black text-white">
            {language === "badini"
              ? "چەرخی بزوێنە و خەڵاتێن XP و Coins ببە بە خۆڕایی!"
              : language === "ku"
              ? "چەرخەکە بخولێنەوە و خەڵاتی بێبەرامبەر ببرەوە!"
              : "Spin the Wheel & Win Free XP & Coins!"}
          </h2>
        </div>

        {/* Wheel Container */}
        <div className="relative w-64 h-64 mx-auto my-4 flex items-center justify-center">
          {/* Wheel Pointer Arrow */}
          <div className="absolute -top-3 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-400 drop-shadow-md" />

          {/* Canvas Disk */}
          <div
            style={{
              transform: `rotate(${rotationDegree}deg)`,
              transition: isSpinning ? "transform 4s cubic-bezier(0.15, 0.9, 0.2, 1)" : "none"
            }}
            className="w-full h-full rounded-full border-4 border-amber-500/50 bg-[#16182e] shadow-2xl overflow-hidden relative"
          >
            {prizes.map((p, idx) => {
              const rotateAngle = idx * (360 / prizes.length);
              return (
                <div
                  key={idx}
                  style={{
                    transform: `rotate(${rotateAngle}deg)`,
                    transformOrigin: "50% 50%"
                  }}
                  className="absolute inset-0 flex items-start justify-center pt-3"
                >
                  <span className="text-[10px] font-black text-amber-300 drop-shadow">
                    {p.xp} XP
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center Spin Button */}
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className="absolute z-10 w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-slate-950 font-black text-xs shadow-xl flex flex-col items-center justify-center hover:scale-105 active:scale-95 transition disabled:opacity-50"
          >
            <Disc className={`w-5 h-5 ${isSpinning ? "animate-spin" : ""}`} />
            <span>{isSpinning ? "..." : "SPIN!"}</span>
          </button>
        </div>

        {/* Claimed Prize Banner */}
        {claimedPrize && (
          <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 animate-bounce space-y-1">
            <span className="text-xs font-black block">🎉 پیرۆزە! خەڵاتەکەت وەرگرت:</span>
            <span className="text-sm font-black text-white">{claimedPrize.label}</span>
          </div>
        )}

        <p className="text-[11px] text-slate-400">
          {language === "badini"
            ? "تە ۱ دەلیڤەیا ب خۆڕایی هەیە د هەر ۲٤ دەمژمێران دا"
            : language === "ku"
            ? "تۆ ۱ شەنسی بە خۆڕاییت هەیە لە هەر ۲٤ کاتژمێرێکدا"
            : "You get 1 free lucky spin every 24 hours!"}
        </p>
      </div>
    </div>
  );
};
