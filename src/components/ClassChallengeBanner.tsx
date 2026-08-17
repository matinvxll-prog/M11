import React from "react";
import { Users, ArrowRight } from "lucide-react";
import { Language } from "../types";

interface ClassChallengeBannerProps {
  language: Language;
  onJoin: () => void;
}

export const ClassChallengeBanner: React.FC<ClassChallengeBannerProps> = ({
  language,
  onJoin
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-950 border border-purple-800/40 p-6 shadow-2xl">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-md text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>
              {language === "badini"
                ? "ڕکابەرییا هەڤپۆلان"
                : language === "ku"
                ? "کێبرکێی هاوپۆلەکان"
                : "Class Battle"}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {language === "badini"
              ? "پشکداریێ د ئاڵنگارییا پۆلا خۆ دا بکە!"
              : language === "ku"
              ? "بەشداری چالنجی پۆلەکەت بکە!"
              : "Join class challenge!"}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-purple-200/80 font-medium leading-relaxed">
            {language === "badini"
              ? "دگەل هەڤپۆلێن خۆ ڕکابەریێ بکە، خالێن جیاواز کۆبکەڤە و خەڵاتێن ناوازە بەدەستڤە بینە!"
              : language === "ku"
              ? "لەگەڵ هاوپۆلەکانت ڕکابەری بکە، خاڵی جیاواز کۆبکەرەوە و خەڵاتی ناوازە بەدەستبهێنە!"
              : "Compete with your classmates and win amazing rewards!"}
          </p>

          <button
            onClick={onJoin}
            className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-600/30 transition transform hover:scale-105 active:scale-95"
          >
            <span>
              {language === "badini"
                ? "نوکە پشکدار ببە"
                : language === "ku"
                ? "ئێستا بەشداربە"
                : "Join Now"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Artwork Image */}
        <div className="w-full md:w-64 h-36 rounded-2xl overflow-hidden shadow-xl ring-1 ring-purple-500/30 flex-shrink-0">
          <img
            src="/src/assets/images/class_challenge_banner_1785097476209.jpg"
            alt="Students Class Challenge"
            className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
          />
        </div>
      </div>
    </div>
  );
};

