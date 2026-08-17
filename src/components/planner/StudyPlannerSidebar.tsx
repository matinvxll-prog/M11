import React from "react";
import {
  Grid,
  Calendar,
  BookOpen,
  Clock,
  Award,
  BarChart2,
  PieChart,
  Settings,
  HelpCircle,
  GraduationCap
} from "lucide-react";
import { Language } from "../../types";

interface StudyPlannerSidebarProps {
  language: Language;
  activeNav: string;
  onSelectNav: (nav: string) => void;
  onClose?: () => void;
  isDarkMode?: boolean;
}

export const StudyPlannerSidebar: React.FC<StudyPlannerSidebarProps> = ({
  language,
  activeNav,
  onSelectNav,
  onClose,
  isDarkMode
}) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";

  const navItems = [
    { id: "dashboard", labelEn: "Dashboard", labelBadini: "سەرەتا", labelKu: "سەرەتا", icon: Grid },
    { id: "planner", labelEn: "My Planner", labelBadini: "پلانا من", labelKu: "پلانی من", icon: Calendar },
    { id: "subjects", labelEn: "Subjects", labelBadini: "وانەکان", labelKu: "وانەکان", icon: BookOpen },
    { id: "calendar", labelEn: "Calendar", labelBadini: "رۆژمێر", labelKu: "ڕۆژمێر", icon: Clock },
    { id: "exams", labelEn: "Exams", labelBadini: "ئەزموون", labelKu: "تاقیکردنەوەکان", icon: Award },
    { id: "analytics", labelEn: "Analytics", labelBadini: "شیکار", labelKu: "شیکارییەکان", icon: BarChart2 },
    { id: "reports", labelEn: "Reports", labelBadini: "راپۆرت", labelKu: "ڕاپۆرتەکان", icon: PieChart },
    { id: "settings", labelEn: "Settings", labelBadini: "رێکخستن", labelKu: "ڕێکخستنەکان", icon: Settings },
  ];

  const handleNavClick = (id: string) => {
    onSelectNav(id);
    if (id === "dashboard" && onClose) {
      onClose();
    }
  };

  return (
    <aside className="w-64 shrink-0 bg-white dark:bg-[#0f1219] border-r border-slate-200/80 dark:border-slate-800/80 p-4 hidden xl:flex flex-col justify-between select-none">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-slate-100 dark:border-slate-800/80">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-black text-base tracking-tight text-slate-900 dark:text-white leading-none">
              {isBadini ? "پلانا سەرکەوتنێ" : isKu ? "پلانی سەرکەوتن" : "Success Planner"}
            </h2>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1 block">
              {isBadini ? "پۆلا ١٢ یێ زانستی" : isKu ? "پۆلی ١٢ ی زانستی" : "Grade 12"}
            </span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeNav === item.id || (item.id === "planner" && activeNav === "studyPlan");
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-150 ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-sm shadow-blue-500/20 font-black"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400 dark:text-slate-500"}`} />
                <span>{isBadini ? item.labelBadini : isKu ? item.labelKu : item.labelEn}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Section */}
      <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <button
          onClick={() => handleNavClick("help")}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition"
        >
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <span>{isBadini ? "ناڤەندا هاریکاریێ" : isKu ? "ناوەندی یارمەتی" : "Help Center"}</span>
        </button>

        {/* Mini Motivational Banner */}
        <div className="p-3.5 rounded-xl bg-[#F5F7FA] dark:bg-[#181c26] border border-slate-200/60 dark:border-slate-800/80 space-y-1.5 relative overflow-hidden">
          <div className="w-1.5 h-full bg-[#2563EB] absolute top-0 left-0" />
          <span className="text-[11px] font-black text-[#2563EB] block uppercase tracking-wider">
            {isBadini ? "پالەوانێ پۆلا ١٢" : isKu ? "پاڵەوانی پۆلی ١٢" : "Keep going!"}
          </span>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-snug">
            {isBadini
              ? "پابەندبوون ئەڤرۆ، سەرکەوتن سوبەهی یە."
              : isKu
              ? "پابەندبوون ئەمڕۆ، سەرکەوتن بەیانییە."
              : "Discipline today, success tomorrow."}
          </p>
        </div>
      </div>
    </aside>
  );
};
