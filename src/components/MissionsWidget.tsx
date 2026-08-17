import React, { useState } from "react";
import { Target, Award, Coins, CheckCircle2, Sparkles, Gift } from "lucide-react";
import { Language, Mission } from "../types";
import { mockMissions } from "../data/mockData";
import { getLocalizedText } from "../utils/i18n";

interface MissionsWidgetProps {
  language: Language;
  onClaim?: (xp: number, coins: number) => void;
  onClaimReward?: (xp: number, coins: number) => void;
  missions?: Mission[];
  isDarkMode?: boolean;
}

export const MissionsWidget: React.FC<MissionsWidgetProps> = ({ language, onClaim, onClaimReward, missions: propMissions, isDarkMode }) => {
  const [internalMissions, setInternalMissions] = useState<Mission[]>(mockMissions);
  const missions = propMissions || internalMissions;

  const handleClaim = (missionId: string) => {
    const claimFn = onClaim || onClaimReward;
    if (claimFn) {
      const mission = missions.find((m) => m.id === missionId);
      if (mission && mission.completed && !mission.claimed) {
        claimFn(mission.xpReward, mission.coinsReward);
      }
    }
    setInternalMissions(
      internalMissions.map((m) => {
        if (m.id === missionId && m.completed && !m.claimed) {
          return { ...m, claimed: true };
        }
        return m;
      })
    );
  };

  return (
    <div className="p-5 rounded-2xl bg-[#16182e] border border-indigo-900/30 space-y-4 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-400" />
          <h3 className="text-sm font-extrabold text-white">
            {language === "badini" ? "ڕاسپێردەیێن ڕۆژانە (Missions)" : language === "ku" ? "ڕاسپێردەکانی ڕۆژانە (Missions)" : "Daily Missions"}
          </h3>
        </div>
        <span className="text-[11px] font-bold text-amber-400">
          🎁 Claim Coins & XP
        </span>
      </div>

      <div className="space-y-3">
        {missions.map((m) => {
          const progressPercent = Math.min(100, Math.round((m.currentProgress / m.target) * 100));
          return (
            <div
              key={m.id}
              className="p-3.5 rounded-xl bg-[#101222] border border-indigo-900/30 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">
                  {getLocalizedText(m, "title", language)}
                </span>

                <div className="flex items-center gap-2 text-[10px] font-bold text-purple-300">
                  <span>+{m.xpReward} XP</span>
                  <span>•</span>
                  <span className="text-amber-400 font-extrabold">+{m.coinsReward} Coins</span>
                </div>
              </div>

              {/* Progress Bar & Claim Button */}
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <span className="text-[10px] text-slate-400 font-mono">
                  {m.currentProgress}/{m.target}
                </span>

                {m.completed ? (
                  m.claimed ? (
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-500 text-[10px] font-bold">
                      وەرگیرا✓
                    </span>
                  ) : (
                    <button
                      onClick={() => handleClaim(m.id)}
                      className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[10px] shadow-md shadow-amber-500/30 transition animate-bounce"
                    >
                      وەرگرتن 🎁
                    </button>
                  )
                ) : (
                  <span className="px-2.5 py-1 rounded-lg bg-purple-950/40 text-purple-400 text-[10px] font-semibold border border-purple-900/30">
                    لە جێبەجێکردندایە
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
