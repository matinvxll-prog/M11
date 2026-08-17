import React from "react";
import { ArrowRight, ShieldCheck, Award, Zap } from "lucide-react";
import { ChallengeItem, Language } from "../types";
import { getLocalizedText, uiTranslations } from "../utils/i18n";

interface ChallengesWidgetProps {
  challenges: ChallengeItem[];
  language: Language;
  onSelectChallenge: (challenge: ChallengeItem) => void;
  onViewAll: () => void;
}

export const ChallengesWidget: React.FC<ChallengesWidgetProps> = ({
  challenges,
  language,
  onSelectChallenge,
  onViewAll
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Award":
        return <Award className="w-5 h-5 text-blue-400" />;
      case "Star":
        return <ShieldCheck className="w-5 h-5 text-amber-400" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-emerald-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="bg-[#16182e] border border-indigo-900/30 rounded-3xl p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm sm:text-base font-extrabold text-white">
          {uiTranslations.challengesTitle[language]}
        </h3>
        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300 transition"
        >
          <span>{uiTranslations.viewAll[language]}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Challenges List */}
      <div className="space-y-3">
        {challenges.slice(1, 4).map((c) => (
          <div
            key={c.id}
            onClick={() => onSelectChallenge(c)}
            className="group cursor-pointer p-3 rounded-2xl bg-[#1e203c] border border-indigo-900/20 hover:border-purple-500/40 flex items-center gap-3.5 transition duration-200"
          >
            {/* Icon Badge */}
            <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-800/40 flex items-center justify-center flex-shrink-0">
              {getIcon(c.iconName)}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white truncate">
                  {getLocalizedText(c, "title", language)}
                </h4>
                <span className="text-[10px] font-mono font-bold text-purple-300">
                  {c.current} / {c.target}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                {getLocalizedText(c, "description", language)}
              </p>

              {/* Mini progress bar */}
              <div className="w-full bg-indigo-950 rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (c.current / c.target) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

