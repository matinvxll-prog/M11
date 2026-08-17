import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  User,
  LayoutGrid,
  BookOpen,
  FileCheck,
  Target,
  Trophy,
  Calendar,
  FileText,
  Bookmark,
  BarChart2,
  Users,
  ShoppingBag,
  Video,
  FileDown,
  Disc,
  MessageSquare,
  Crown,
  ShieldCheck,
  Sparkles,
  Zap,
  Camera,
  Brain,
  Calculator,
  X,
  Flame
} from "lucide-react";
import { Language, UserProfile } from "../types";
import { NavTab } from "./Sidebar";

interface TopNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  user: UserProfile;
  language: Language;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenVoiceQuiz?: () => void;
  onOpenCameraOcr?: () => void;
  onOpenAiTutor?: () => void;
  onOpenCalculator?: () => void;
  onOpenDictionary?: () => void;
  onOpenProfile?: () => void;
  onOpenLuckyWheel?: () => void;
  onOpenPremium?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onSelectTab,
  user,
  language,
  isDarkMode,
  onOpenProfile,
  onOpenAiTutor,
  onOpenCameraOcr,
  onOpenCalculator
}) => {
  const [showAllAppsModal, setShowAllAppsModal] = useState(false);

  const quickToolsList = [
    {
      id: "aiTutor",
      labelKu: "مامۆستای AI",
      labelBadini: "مامۆستایێ AI",
      labelEn: "AI Tutor",
      icon: Brain,
      color: "text-rose-400 bg-rose-500/15 border-rose-500/30",
      action: onOpenAiTutor
    },
    {
      id: "cameraOcr",
      labelKu: "سکانی پرسیار",
      labelBadini: "سکێنێ پرسیارێ",
      labelEn: "Camera Scanner",
      icon: Camera,
      color: "text-amber-400 bg-amber-500/15 border-amber-500/30",
      action: onOpenCameraOcr
    },
    {
      id: "calculator",
      labelKu: "ژمێرەی زانستی",
      labelBadini: "کالکیولێتەر",
      labelEn: "Scientific Calc",
      icon: Calculator,
      color: "text-violet-400 bg-violet-500/15 border-violet-500/30",
      action: onOpenCalculator
    }
  ];

  const allSections = [
    {
      id: "exams",
      labelKu: "تاقیکردنەوەکان",
      labelBadini: "تاقیکرنێن وزاری",
      labelEn: "Exams",
      icon: FileCheck,
      descKu: "تاقیکردنەوەی نیشتمانی و پۆلی ١٢",
      descBadini: "تاقیکرنێن وزاری یێن ساڵێن دەربازبووی"
    },
    {
      id: "subjects",
      labelKu: "بابەتەکان",
      labelBadini: "بابەتێن پۆلا ۱۲",
      labelEn: "Subjects",
      icon: BookOpen,
      descKu: "هەموو بابەتەکانی پۆلی ١٢",
      descBadini: "هەمی بابەتێن پۆلا ۱۲ ئامادەکری"
    },
    {
      id: "grade12Special",
      labelKu: "ئامادەکاری پۆلی ١٢",
      labelBadini: "تایبەت ب پۆلا ۱۲",
      labelEn: "Grade 12 Prep",
      icon: Target,
      descKu: "سیستەمی تایبەت ب ئامادەکاری",
      descBadini: "سیستەمێ تایبەت بۆ پۆلا ۱۲"
    },
    {
      id: "studyTools",
      labelKu: "ئامراز و کاتژمێر",
      labelBadini: "ئامرازێن خویندنێ",
      labelEn: "Study Tools",
      icon: Calendar,
      descKu: "پۆمۆدۆرۆ و ئامرازی خویندن",
      descBadini: "تایمەرێ پۆمۆدۆرۆ و ئامراز"
    },
    {
      id: "leaderboard",
      labelKu: "ڕێزبەندی گشتی",
      labelBadini: "ڕیزبەندا گشتی",
      labelEn: "Leaderboard",
      icon: Trophy,
      descKu: "ڕێزبەندی قوتابیانی کوردستان",
      descBadini: "ڕیزبەندا گشتیا قوتابییان"
    },
    {
      id: "community",
      labelKu: "کۆمەڵگە",
      labelBadini: "کۆمەڵگەها قوتابییان",
      labelEn: "Community",
      icon: Users,
      descKu: "پرس و وەڵام لەگەڵ هاوپۆلان",
      descBadini: "پرسیار و بەرسڤ دگەل قوتابییان"
    },
    {
      id: "shop",
      labelKu: "فرۆشگا",
      labelBadini: "فرۆشگەها خەڵاتان",
      labelEn: "Shop",
      icon: ShoppingBag,
      descKu: "خەڵات و دیارییەکان",
      descBadini: "خەڵات و دیاریێن قوتابییان"
    }
  ];

  return (
    <>
      {/* Clean, Large, Spacious Top Navigation Bar */}
      <nav
        className={`relative z-20 transition-all duration-300 border-b shadow-md backdrop-blur-xl py-2 px-4 sm:px-8 ${
          isDarkMode
            ? "bg-[#101224]/95 border-indigo-900/50 text-slate-100 shadow-indigo-950/50"
            : "bg-white/95 border-purple-200 text-slate-900 shadow-purple-500/10"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Main Focused Buttons: HOME & PROFILE */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* 1. HOME (سەرەتا) */}
            <button
              onClick={() => onSelectTab("home")}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-base sm:text-lg font-black transition-all duration-200 shadow-md ${
                activeTab === "home"
                  ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-purple-600/40 scale-105 ring-2 ring-purple-400"
                  : isDarkMode
                  ? "bg-[#181a38] hover:bg-[#20234a] border border-indigo-900/40 text-slate-200 hover:text-white"
                  : "bg-purple-100/80 hover:bg-purple-200 border border-purple-300 text-purple-950"
              }`}
            >
              <Home className="w-5 h-5 text-purple-300" />
              <span>{language === "badini" ? "سەرەتا" : language === "ku" ? "سەرەتا" : "Home"}</span>
            </button>

            {/* 2. PROFILE (پڕۆفایل) */}
            <button
              onClick={() => {
                if (onOpenProfile) onOpenProfile();
                else onSelectTab("profile" as NavTab);
              }}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-base sm:text-lg font-black transition-all duration-200 shadow-md ${
                activeTab === ("profile" as NavTab)
                  ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-purple-600/40 scale-105 ring-2 ring-purple-400"
                  : isDarkMode
                  ? "bg-[#181a38] hover:bg-[#20234a] border border-indigo-900/40 text-slate-200 hover:text-white"
                  : "bg-purple-100/80 hover:bg-purple-200 border border-purple-300 text-purple-950"
              }`}
            >
              <User className="w-5 h-5 text-purple-300" />
              <span>{language === "badini" ? "پڕۆفایل" : language === "ku" ? "پڕۆفایل" : "Profile"}</span>
            </button>
          </div>

          {/* Right Side: All Sections Launcher & Quick AI Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Exams shortcut */}
            <button
              onClick={() => onSelectTab("exams")}
              className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-black transition ${
                activeTab === "exams"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : isDarkMode
                  ? "bg-[#16182e] border border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
                  : "bg-purple-50 border border-purple-200 text-purple-900 hover:bg-purple-100"
              }`}
            >
              <FileCheck className="w-4 h-4 text-purple-400" />
              <span>{language === "badini" ? "تاقیکرن" : language === "ku" ? "تاقیکردنەوە" : "Exams"}</span>
            </button>

            {/* All Sections Launcher Button */}
            <button
              onClick={() => setShowAllAppsModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-md shadow-amber-500/20 transition active:scale-95"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>{language === "badini" ? "هەمی بەش" : language === "ku" ? "هەموو بەشەکان" : "All Sections"}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ALL SECTIONS LAUNCHER GRID MODAL */}
      <AnimatePresence>
        {showAllAppsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, type: "spring" }}
              className={`w-full max-w-4xl rounded-3xl p-6 sm:p-8 shadow-2xl border flex flex-col max-h-[88vh] overflow-hidden ${
                isDarkMode
                  ? "bg-[#101224] border-purple-500/40 text-white shadow-purple-950/80"
                  : "bg-white border-purple-200 text-slate-900 shadow-2xl"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-indigo-900/20">
                <div className="flex items-center gap-3">
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30">
                    <LayoutGrid className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                      {language === "badini" ? "هەمی بەش و ئامرازێن DEGEL QUTABI 🚀" : "هەموو بەش و ئامرازەکانی DEGEL QUTABI 🚀"}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 font-semibold">
                      {language === "badini"
                        ? "ب یەک کلیک بگەهە هەمی بەش و ئامرازێن خویندنێ"
                        : "بە یەک کلیک بگەیەنە هەموو بەش و ئامرازەکانی خوێندن"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAllAppsModal(false)}
                  className={`p-3 rounded-2xl transition ${
                    isDarkMode ? "hover:bg-white/10 text-slate-400 hover:text-white" : "hover:bg-slate-100 text-slate-600"
                  }`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Content Grid */}
              <div className="flex-1 overflow-y-auto no-scrollbar py-6 space-y-6">
                {/* AI & Quick Tools */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-500 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>{language === "badini" ? "ئامرازێن زیرەک یێن AI" : "ئامرازەکانی زیرەکی AI"}</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {quickToolsList.map((tool) => {
                      const ToolIcon = tool.icon;
                      return (
                        <button
                          key={tool.id}
                          onClick={() => {
                            tool.action?.();
                            setShowAllAppsModal(false);
                          }}
                          className={`p-4 rounded-2xl border text-right transition-all flex items-center gap-3 group hover:scale-[1.02] ${
                            isDarkMode
                              ? "bg-[#16182e] border-indigo-900/40 hover:border-amber-500/50"
                              : "bg-slate-50 border-slate-200 hover:border-amber-400 shadow-sm"
                          }`}
                        >
                          <div className={`p-3 rounded-2xl border ${tool.color}`}>
                            <ToolIcon className="w-6 h-6" />
                          </div>
                          <span className="text-sm font-black">
                            {language === "badini" ? tool.labelBadini : tool.labelKu}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Main App Sections */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{language === "badini" ? "بەشێن سەرەکی یێن بێ بەرامبەر" : "بەشە سەرەکییەکان"}</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {allSections.map((sec) => {
                      const SecIcon = sec.icon;
                      const isItemActive = activeTab === sec.id;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => {
                            onSelectTab(sec.id as NavTab);
                            setShowAllAppsModal(false);
                          }}
                          className={`p-4 rounded-2xl border text-right transition-all flex items-start gap-3 group hover:scale-[1.02] ${
                            isItemActive
                              ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-lg shadow-purple-600/30 border-purple-400 font-bold"
                              : isDarkMode
                              ? "bg-[#16182e] border-indigo-900/40 hover:border-purple-500/50 hover:bg-[#1d203e]"
                              : "bg-slate-50 border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 shadow-sm"
                          }`}
                        >
                          <div className={`p-3 rounded-2xl shrink-0 ${isItemActive ? "bg-white/20 text-white" : "bg-purple-600/20 text-purple-400"}`}>
                            <SecIcon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-black block truncate">
                              {language === "badini" ? sec.labelBadini : sec.labelKu}
                            </span>
                            <p className="text-xs text-slate-400 font-medium mt-1 line-clamp-2">
                              {language === "badini" ? sec.descBadini : sec.descKu}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-indigo-900/20 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black text-amber-400">
                  <Flame className="w-4 h-4 fill-amber-400" />
                  <span>🔥 {user.dailyStreak} {language === "badini" ? "ڕۆژێن بەردەوام" : "ڕۆژی بەردەوام"}</span>
                </div>
                <button
                  onClick={() => setShowAllAppsModal(false)}
                  className="px-6 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black transition"
                >
                  {language === "badini" ? "داخستن" : "داخستن"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

