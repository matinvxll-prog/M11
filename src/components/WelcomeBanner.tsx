import React, { useState } from "react";
import { motion } from "motion/react";
import { Play, Target, Trophy, Flame, Zap, Award, Sparkles, Brain, ArrowRight } from "lucide-react";
import { Language, UserProfile } from "../types";

interface WelcomeBannerProps {
  user: UserProfile;
  language: Language;
  isDarkMode?: boolean;
  onStartQuiz?: () => void;
  onStartDailyChallenge?: () => void;
  onOpenAiTutor?: () => void;
  onOpenPremium?: () => void;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  user,
  language,
  isDarkMode = false,
  onStartQuiz,
  onStartDailyChallenge,
  onOpenAiTutor,
  onOpenPremium
}) => {
  const [imgError, setImgError] = useState(false);
  const isBadini = language === "badini";

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-3xl p-6 sm:p-10 transition-all duration-500 shadow-2xl ${
        isDarkMode
          ? "bg-gradient-to-br from-[#160b30] via-[#1f144d] to-[#110e28] border-2 border-purple-500/40 text-white shadow-purple-950/50"
          : "bg-white/95 border-2 border-purple-200 shadow-purple-500/10 text-slate-900 backdrop-blur-xl"
      }`}
    >
      {/* Subtle Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between">
        {/* Left / Mascot Hero Graphic (Duolingo Style 3D App Icon) */}
        <div className="md:col-span-5 flex justify-center md:justify-start order-1 md:order-2 py-2">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 flex items-center justify-center group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-indigo-500/30 rounded-[3.5rem] blur-3xl transform scale-95" />

            {!imgError ? (
              <img
                src="/src/assets/images/degel_qutabi_owl_mascot_1785171720218.jpg"
                alt="DEGEL QUTABI Mascot"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover rounded-[3rem] shadow-2xl transform hover:scale-105 transition duration-500"
              />
            ) : (
              <div className="w-full h-full rounded-[3rem] bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-900 border-4 border-white/20 flex flex-col items-center justify-center text-white shadow-2xl p-6 text-center space-y-3">
                <Trophy className="w-20 h-20 text-amber-300" />
                <span className="text-xl font-black tracking-wider">DEGEL QUTABI</span>
                <span className="text-sm text-purple-200 font-bold">Grade 12 Prep System</span>
              </div>
            )}
            
            {/* Floating Live Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className={`absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm shadow-2xl border flex items-center gap-2.5 z-20 ${
                isDarkMode
                  ? "bg-[#181a38]/95 border-purple-500/60 text-purple-200 shadow-purple-950"
                  : "bg-white/95 border-purple-200 text-purple-700 shadow-purple-900/10"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span>{isBadini ? "دگەل قوتابی • پۆلا ۱۲" : "لەگەڵ قوتابی • پۆلی ۱۲"}</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Right / Content Area */}
        <div className="md:col-span-7 space-y-5 text-center md:text-right order-2 md:order-1">
          {/* Top Pill Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black shadow-sm ${
              isDarkMode
                ? "bg-purple-500/20 border border-purple-500/40 text-purple-300"
                : "bg-purple-100/80 border border-purple-300/80 text-purple-800"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: "6s" }} />
            <span>
              {isBadini
                ? "سیستەمێ زیرەک یێ ئامادەکارییا ئەزموونا وزاری"
                : "سیستەمی زیرەکی ئامادەکاری بۆ وەزارەت"}
            </span>
          </motion.div>

          {/* Bold Brand & Welcome Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-2"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent font-extrabold block mb-1">
                DEGEL QUTABI
              </span>
              <span className={isDarkMode ? "text-white" : "text-slate-900"}>
                {isBadini ? "بەخێر بێی، " : "بەخێر بێیتەوە، "}
                <span className="underline decoration-purple-500 decoration-wavy decoration-2 text-purple-600 dark:text-purple-400">{user.name}</span>! 🎓
              </span>
            </h1>
            <p className={`text-sm sm:text-base font-semibold leading-relaxed max-w-xl ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
              {isBadini
                ? "دگەل قوتابی: باشترین پلاتفۆرم بۆ پرسیارێن وزاری، مەلزەمە، ڤیدیۆ و مامۆستایێ ژیری AI بۆ گەهشتن ب نمرەیا ١٠٠ د پۆلا ١٢ دا."
                : "لەگەڵ قوتابی: باشترین پلاتفۆرم بۆ پرسیاری وزاری، مەلزەمە، وانەی ڤیدیۆیی و مامۆستای AI بۆ گەیشتن بە نمرەی ١٠٠."}
            </p>
          </motion.div>

          {/* User Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1"
          >
            <div className={`px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-2 shadow-sm transition hover:scale-105 ${
              isDarkMode ? "bg-[#181a38] border border-purple-500/30 text-purple-200" : "bg-purple-50 border border-purple-200 text-purple-900"
            }`}>
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Level {user.level}</span>
            </div>
            
            <div className={`px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-2 shadow-sm transition hover:scale-105 ${
              isDarkMode ? "bg-[#181a38] border border-purple-500/30 text-amber-300" : "bg-amber-50 border border-amber-200 text-amber-900"
            }`}>
              <Zap className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>{user.totalXp.toLocaleString()} XP</span>
            </div>

            <div className={`px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-2 shadow-sm transition hover:scale-105 ${
              isDarkMode ? "bg-[#181a38] border border-purple-500/30 text-orange-400" : "bg-orange-50 border border-orange-200 text-orange-900"
            }`}>
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>{user.dailyStreak} {isBadini ? "ڕۆژێن بەردەوام" : "ڕۆژی بەردەوام"}</span>
            </div>
          </motion.div>

          {/* Action Buttons Row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onStartQuiz}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white hover:shadow-purple-600/30 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isBadini ? "دەستپێکرنا تاقیکرنێ" : "دەستپێکردنی تاقیکردنەوە"}</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onStartDailyChallenge}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all ${
                isDarkMode
                  ? "bg-[#1a1c3d] hover:bg-[#252857] border border-purple-500/30 text-white"
                  : "bg-white hover:bg-slate-50 border border-purple-200 text-slate-800 shadow-sm"
              }`}
            >
              <Target className="w-4 h-4 text-amber-500" />
              <span>{isBadini ? "ئاڵنگارییا ڕۆژانە" : "چالنجی ڕۆژانە"}</span>
            </motion.button>

            {onOpenAiTutor && (
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={onOpenAiTutor}
                className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all ${
                  isDarkMode
                    ? "bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300"
                    : "bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 shadow-sm"
                }`}
              >
                <Brain className="w-4 h-4 text-rose-500" />
                <span>{isBadini ? "مامۆستایێ AI" : "مامۆستای AI"}</span>
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};


