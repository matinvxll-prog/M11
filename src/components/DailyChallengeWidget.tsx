import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calendar, Star, Clock } from "lucide-react";
import { Language } from "../types";
import { uiTranslations } from "../utils/i18n";

interface DailyChallengeWidgetProps {
  language: Language;
  isDarkMode?: boolean;
  onStartChallenge: () => void;
}

export const DailyChallengeWidget: React.FC<DailyChallengeWidgetProps> = ({
  language,
  isDarkMode = false,
  onStartChallenge
}) => {
  // Live countdown timer mockup
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 25, seconds: 36 });
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigits = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -3 }}
      className={`rounded-mastery p-5 shadow-xl flex flex-col justify-between transition-all ${
        isDarkMode
          ? "bg-[#16182e] border border-indigo-900/30"
          : "pastel-card-lavender shadow-md"
      }`}
    >
      <div>
        {/* Banner Image Graphic */}
        {!imgError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full h-28 sm:h-36 mb-4 rounded-2xl overflow-hidden relative shadow-inner group"
          >
            <img
              src="/src/assets/images/class_challenge_banner_1785097476209.jpg"
              alt="Challenge Banner"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
              <span className="text-white text-xs font-black drop-shadow-md">
                ⚡ {language === "badini" ? "ئاڵنگارییا ڕۆژێ: کێبڕکێیا پۆلا ۱۲" : "چالنجی ڕۆژانە: کێبڕکێی پۆلی ۱۲"}
              </span>
            </div>
          </motion.div>
        )}

        {/* Header with Title and Timer */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Calendar className={`w-4 h-4 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
            <h3 className={`text-sm font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              {uiTranslations.dailyChallenge[language]}
            </h3>
          </div>
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold shadow-sm ${
            isDarkMode
              ? "bg-purple-950/80 border border-purple-500/30 text-purple-300"
              : "bg-white border border-purple-300 text-purple-700"
          }`}>
            <Clock className={`w-3 h-3 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
            <span>{`${formatDigits(timeLeft.hours)}:${formatDigits(timeLeft.minutes)}:${formatDigits(timeLeft.seconds)}`}</span>
          </div>
        </div>

        {/* Challenge Goal Description */}
        <p className={`text-xs font-bold mb-3 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
          {language === "badini"
            ? "بە دروستی بەرسڤا ۲۰ پرسیاران بدە و خەڵاتێ تایبەت وەربگرە"
            : language === "ku"
            ? "بە دروستی وەڵامی ۲۰ پرسیار بدەرەوە و خەڵاتی تایبەت وەربگرە"
            : "Answer 20 questions correctly"}
        </p>

        {/* Progress Bar */}
        <div className="space-y-1.5 mb-4">
          <div className={`w-full rounded-full h-2 overflow-hidden ${isDarkMode ? "bg-indigo-950/80" : "bg-white/80"}`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 h-2 rounded-full"
            />
          </div>
          <div className={`flex justify-end text-[11px] font-mono font-bold ${isDarkMode ? "text-purple-300" : "text-purple-800"}`}>
            15 / 20
          </div>
        </div>
      </div>

      {/* Footer: Reward & Start Challenge Button */}
      <div className={`flex items-center justify-between gap-3 pt-3 border-t ${isDarkMode ? "border-indigo-900/20" : "border-purple-300/40"}`}>
        <div>
          <span className={`text-[10px] block font-semibold ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            {language === "badini"
              ? "خەڵاتێ ئاڵنگاریێ"
              : language === "ku"
              ? "خەڵاتی چالنج"
              : "Reward"}
          </span>
          <div className="flex items-center gap-1 text-xs font-black text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-500" />
            <span>500 XP</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartChallenge}
          className={`px-5 py-2.5 rounded-full font-black text-xs shadow-md transition ${
            isDarkMode
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white"
              : "bg-black text-white hover:bg-slate-800"
          }`}
        >
          {language === "badini"
            ? "دەستپێکرنا ئاڵنگاریێ"
            : language === "ku"
            ? "دەستپێکردنی چالنج"
            : "Start Challenge"}
        </motion.button>
      </div>
    </motion.div>
  );
};

