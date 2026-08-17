import React from "react";
import { CheckCircle2, HelpCircle, FileText, Zap } from "lucide-react";
import { Language, UserProfile } from "../types";
import { uiTranslations } from "../utils/i18n";

interface ProgressOverviewProps {
  user: UserProfile;
  language: Language;
}

export const ProgressOverview: React.FC<ProgressOverviewProps> = ({ user, language }) => {
  const percent = 65;
  const strokeDashoffset = 283 - (283 * percent) / 100;

  return (
    <div className="bg-[#16182e] border border-indigo-900/30 rounded-3xl p-5 shadow-xl flex flex-col justify-between">
      <h3 className="text-sm sm:text-base font-extrabold text-white mb-4">
        {uiTranslations.progressTitle[language]}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* SVG Circular Donut Chart */}
        <div className="flex flex-col items-center justify-center relative">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="9"
                className="text-indigo-950"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#purpleGradient)"
                strokeWidth="9"
                strokeDasharray="283"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute text-center">
              <span className="text-2xl font-black text-white tracking-tight">{percent}%</span>
              <span className="text-[10px] text-slate-400 block font-medium">
                {language === "badini"
                  ? "گشتی"
                  : language === "ku"
                  ? "سەرجەم"
                  : "Overall"}
              </span>
            </div>
          </div>
        </div>

        {/* Stats List */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#1e203c]/60">
            <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] text-slate-400 block">
                {language === "badini"
                  ? "کۆیا XP"
                  : language === "ku"
                  ? "سەرجەمی XP"
                  : "Total XP"}
              </span>
              <span className="text-xs font-bold text-white font-mono">
                {user.totalXp.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#1e203c]/60">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <HelpCircle className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] text-slate-400 block">
                {language === "badini"
                  ? "پرسیارێن بەرسڤدایی"
                  : language === "ku"
                  ? "پرسیاری وەڵامدراوە"
                  : "Questions Answered"}
              </span>
              <span className="text-xs font-bold text-white font-mono">
                {user.questionsAnswered.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#1e203c]/60">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] text-slate-400 block">
                {language === "badini"
                  ? "بەرسڤێن دروست"
                  : language === "ku"
                  ? "وەڵامی ڕاست"
                  : "Correct Answers"}
              </span>
              <span className="text-xs font-bold text-white font-mono">
                {user.correctAnswers.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#1e203c]/60">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] text-slate-400 block">
                {language === "badini"
                  ? "تاقیکرنێن وزاری یێن ئەنجامدایی"
                  : language === "ku"
                  ? "ئەزموونی وزاری کراو"
                  : "Exams Taken"}
              </span>
              <span className="text-xs font-bold text-white font-mono">{user.examsTaken}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

