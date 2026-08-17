import React from "react";
import { motion } from "motion/react";
import {
  Mic,
  Camera,
  Sparkles,
  Calendar,
  Award,
  TrendingUp,
  Calculator,
  BookOpen
} from "lucide-react";
import { Language } from "../types";

interface SmartFeaturesWidgetProps {
  language: Language;
  isDarkMode?: boolean;
  onOpenVoiceQuiz: () => void;
  onOpenCameraOcr: () => void;
  onOpenAiTutor: () => void;
  onOpenStudyPlan: () => void;
  onOpenCertificate: () => void;
  onOpenCalculator: () => void;
  onOpenDictionary: () => void;
}

export const SmartFeaturesWidget: React.FC<SmartFeaturesWidgetProps> = ({
  language,
  isDarkMode = false,
  onOpenVoiceQuiz,
  onOpenCameraOcr,
  onOpenAiTutor,
  onOpenStudyPlan,
  onOpenCertificate,
  onOpenCalculator,
  onOpenDictionary
}) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";

  const features = [
    {
      id: "ocr",
      titleBadini: "سکێنێ پرسیارێ",
      titleKu: "سکانی پرسیار",
      titleEn: "Scan Question",
      subBadini: "سکێنەرێ کامێرایێ",
      subKu: "سکانەری کامێرا",
      subEn: "Camera Scanner",
      icon: Camera,
      color: "from-orange-600/30 to-amber-600/30 text-amber-400 border-amber-500/40",
      action: onOpenCameraOcr
    },
    {
      id: "explain",
      titleBadini: "ڕوونکردنا ژیری",
      titleKu: "ڕوونکردنەوەی ژیرانە",
      titleEn: "AI Explain",
      subBadini: "ڕوونکردنا شاشیان",
      subKu: "ڕوونکردنەوەی هەڵەکان",
      subEn: "Explain mistakes",
      icon: Sparkles,
      color: "from-blue-600/30 to-cyan-600/30 text-cyan-400 border-cyan-500/40",
      action: onOpenAiTutor
    },
    {
      id: "plan",
      titleBadini: "پلانا ژیری",
      titleKu: "پلانی ژیرانە",
      titleEn: "AI Study Plan",
      subBadini: "پلانا تایبەت بو تە",
      subKu: "پلانی تایبەت بە تۆ",
      subEn: "Personalized Plan",
      icon: Calendar,
      color: "from-indigo-600/30 to-purple-600/30 text-indigo-400 border-indigo-500/40",
      action: onOpenStudyPlan
    },
    {
      id: "certificate",
      titleBadini: "بڕوانامە",
      titleKu: "بڕوانامە",
      titleEn: "Certificate",
      subBadini: "دەستکەفتنێن تە",
      subKu: "بەدەستهێنانی بڕوانامە",
      subEn: "Earn Certificates",
      icon: Award,
      color: "from-amber-600/30 to-yellow-600/30 text-yellow-400 border-yellow-500/40",
      action: onOpenCertificate
    },
    {
      id: "suggest",
      titleBadini: "پێشنیارا ژیری",
      titleKu: "پێشنیاری ژیرانە",
      titleEn: "Smart Suggest",
      subBadini: "باشکرنا بابەتا لاواز",
      subKu: "چاککردنی بەشە لاوازەکان",
      subEn: "Improve weak topics",
      icon: TrendingUp,
      color: "from-emerald-600/30 to-teal-600/30 text-emerald-400 border-emerald-500/40",
      action: onOpenAiTutor
    },
    {
      id: "calculator",
      titleBadini: "کالکیولێتەرا زانستی",
      titleKu: "ژمێرەی زانستی",
      titleEn: "Scientific Calculator",
      subBadini: "حیساباتی بیرکاری و فیزیا",
      subKu: "حیساباتی بەشی زانستی",
      subEn: "Math & Physics Solver",
      icon: Calculator,
      color: "from-violet-600/30 to-purple-600/30 text-violet-400 border-violet-500/40",
      action: onOpenCalculator
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-mastery p-5 shadow-xl transition-all ${
        isDarkMode
          ? "bg-[#121427] border border-indigo-900/40 text-white"
          : "pastel-card-lavender shadow-md text-slate-900"
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className={`w-5 h-5 ${isDarkMode ? "text-purple-400" : "text-purple-600 animate-spin"}`} style={{ animationDuration: "6s" }} />
        <h3 className="font-black text-base sm:text-lg italic">
          {isBadini ? "بەشێن ژیری (Smart Features)" : isKu ? "تایبەتمەندییە ژیرەکان" : "Smart Features"}
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {features.map((f, idx) => {
          const Icon = f.icon;
          const title = isBadini ? f.titleBadini : isKu ? f.titleKu : f.titleEn;
          const sub = isBadini ? f.subBadini : isKu ? f.subKu : f.subEn;

          return (
            <motion.button
              key={f.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={f.action}
              className={`group p-3.5 rounded-2xl transition-all duration-300 text-left flex flex-col items-start gap-2 relative overflow-hidden shadow-sm ${
                isDarkMode
                  ? "bg-[#171933] border border-indigo-900/30 hover:border-purple-500/50 hover:bg-[#1f2244]"
                  : "bg-white/90 border border-purple-200/80 hover:bg-white hover:shadow-md"
              }`}
            >
              <div
                className={`p-2.5 rounded-xl bg-gradient-to-br ${f.color} border transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div>
                <span className={`font-black text-xs sm:text-sm block truncate ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  {title}
                </span>
                <span className={`text-[10px] block truncate mt-0.5 font-semibold ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                  {sub}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};
