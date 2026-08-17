import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Language, Subject, SubjectId } from "../types";
import { getLocalizedText, uiTranslations } from "../utils/i18n";

interface SubjectsGridProps {
  subjects: Subject[];
  language: Language;
  isDarkMode?: boolean;
  onSelectSubject: (subjectId: SubjectId) => void;
  onViewAll: () => void;
}

export const SubjectsGrid: React.FC<SubjectsGridProps> = ({
  subjects,
  language,
  isDarkMode = false,
  onSelectSubject,
  onViewAll
}) => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-lg sm:text-xl font-black italic ${isDarkMode ? "text-white" : "text-slate-900"}`}>
          {uiTranslations.subjects[language]}
        </h2>
        <button
          onClick={onViewAll}
          className={`flex items-center gap-1.5 text-xs sm:text-sm font-black italic transition ${
            isDarkMode ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-800"
          }`}
        >
          <span>{uiTranslations.viewAll[language]}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of 8 Subjects - Full Width Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 w-full">
        {subjects.map((sub, index) => (
          <motion.div
            key={sub.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.35, ease: "easeOut" }}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelectSubject(sub.id)}
            className={`group cursor-pointer rounded-3xl p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden ${
              isDarkMode
                ? "bg-[#16182e] border border-indigo-900/40 hover:border-purple-500/60 shadow-xl hover:shadow-2xl hover:shadow-purple-600/25"
                : "bg-white border border-purple-100 hover:border-purple-300 shadow-lg shadow-purple-500/5 hover:shadow-xl hover:shadow-purple-500/10"
            }`}
          >
            {/* Subject Icon Box */}
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-3 font-black text-xl sm:text-2xl border shadow-lg transition group-hover:scale-110 ${sub.badgeBg}`}
            >
              {sub.iconSymbol}
            </div>

            {/* Subject Title */}
            <h3 className={`text-xs sm:text-sm font-black transition truncate w-full ${
              isDarkMode ? "text-white group-hover:text-purple-300" : "text-slate-900 group-hover:text-purple-700"
            }`}>
              {getLocalizedText(sub, "name", language)}
            </h3>

            {/* Questions count */}
            <span className={`text-[11px] sm:text-xs mt-1 font-bold ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              {sub.questionsCount} {uiTranslations.questionsCountLabel[language]}
            </span>

            {/* Progress Bar & Percentage */}
            <div className="w-full mt-3 space-y-1">
              <div className={`w-full rounded-full h-2 overflow-hidden border ${
                isDarkMode ? "bg-indigo-950/80 border-indigo-900/30" : "bg-slate-100 border-slate-200"
              }`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${sub.progressPercent}%` }}
                  transition={{ delay: 0.2 + index * 0.05, duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: sub.color || "#a855f7"
                  }}
                />
              </div>
              <div className="flex items-center justify-between w-full pt-1">
                <span className={`text-[10px] sm:text-xs font-mono font-bold ${
                  isDarkMode ? "text-purple-300" : "text-purple-700"
                }`}>
                  {sub.progressPercent}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

