import React from "react";
import { motion } from "motion/react";
import {
  LayoutGrid,
  Sparkles,
  Brain,
  Mic,
  Camera,
  Calculator,
  Book,
  Target,
  Award,
  BookOpen,
  FileText,
  Video,
  Trophy,
  ArrowRight,
  FileCheck,
  FileDown,
  Calendar,
  Bookmark,
  BarChart2,
  Users,
  MessageSquare,
  ShoppingBag,
  Disc,
  Crown,
  ShieldCheck,
  Download,
  HelpCircle,
  Share2,
  RefreshCw,
  Timer
} from "lucide-react";
import { Language } from "../types";
import { NavTab } from "./Sidebar";

interface AllSectionsTopHubProps {
  language: Language;
  isDarkMode: boolean;
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenAiTutor: () => void;
  onOpenVoiceQuiz: () => void;
  onOpenCameraOcr: () => void;
  onOpenCalculator: () => void;
  onOpenDictionary: () => void;
}

export const AllSectionsTopHub: React.FC<AllSectionsTopHubProps> = ({
  language,
  isDarkMode,
  activeTab,
  onSelectTab,
  onOpenAiTutor,
  onOpenVoiceQuiz,
  onOpenCameraOcr,
  onOpenCalculator,
  onOpenDictionary
}) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";

  const quickToolsList = [
    {
      id: "aiTutor",
      label: isBadini ? "مامۆستایێ AI" : isKu ? "مامۆستای AI" : "AI Tutor",
      labelEn: "AI Tutor & Assistant",
      icon: Brain,
      iconBg: "bg-gradient-to-br from-rose-500 to-red-600 text-white",
      action: onOpenAiTutor
    },
    {
      id: "cameraOcr",
      label: isBadini ? "سکاننێ پرسیارێ" : isKu ? "سکانی پرسیار" : "Scanner",
      labelEn: "Camera Question Scanner",
      icon: Camera,
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-600 text-white",
      action: onOpenCameraOcr
    },
    {
      id: "calculator",
      label: isBadini ? "کالکیولیتەر" : isKu ? "ژمێرەی زانستی" : "Calculator",
      labelEn: "Scientific Calculator",
      icon: Calculator,
      iconBg: "bg-gradient-to-br from-violet-500 to-purple-600 text-white",
      action: onOpenCalculator
    }
  ];

  const allSectionCategories = [
    {
      id: "grade12Cat",
      title: isBadini ? "خوێندنا پۆلا ١٢ 🎓" : isKu ? "خوێندنی پۆلی ١٢ 🎓" : "Grade 12 Study 🎓",
      titleColor: "text-purple-400",
      iconColor: "text-purple-500",
      icon: Target,
      items: [
        {
          id: "grade12Special" as NavTab,
          label: isBadini ? "تایبەت ب پۆلا ١٢ 🎓" : isKu ? "تایبەت بە پۆلی ١٢ 🎓" : "Grade 12 Special Hub 🎓",
          labelEn: "Comprehensive Exam System",
          icon: Target,
          iconBg: "bg-gradient-to-br from-rose-500 to-red-600 text-white",
          badge: "🔥 HOT"
        },
        {
          id: "exams" as NavTab,
          label: isBadini ? "تاقیکرنێن وزاری" : isKu ? "تاقیکردنەوەی وزاری" : "Ministerial Exams",
          labelEn: "Past Years Ministerial Exams",
          icon: FileCheck,
          iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white",
          sideIcon: FileCheck
        },
        {
          id: "subjects" as NavTab,
          label: isBadini ? "شرۆڤەکرنا وانەیان" : isKu ? "شرۆڤەی وانەکان" : "Lesson Explanations",
          labelEn: "Grade 12 Lesson Explanations",
          icon: BookOpen,
          iconBg: "bg-gradient-to-br from-indigo-500 to-purple-600 text-white",
          sideIcon: BookOpen
        },
        {
          id: "pdfLibrary" as NavTab,
          label: isBadini ? "کتێبخانەیا PDF و مەلزەمە" : isKu ? "کتێبخانەی PDF و مەلزەمە" : "PDF Library & Notes",
          labelEn: "PDF Library & Materials",
          icon: FileDown,
          iconBg: "bg-gradient-to-br from-purple-500 to-indigo-600 text-white",
          sideIcon: Download
        },
        {
          id: "videos" as NavTab,
          label: isBadini ? "ڤیدیۆیێن وانان" : isKu ? "ڤیدیۆی وانەکان" : "Video Lessons",
          labelEn: "Lesson Videos & Explanations",
          icon: Video,
          iconBg: "bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white",
          sideIcon: Calendar
        }
      ]
    },
    {
      id: "studyToolsCat",
      title: isBadini ? "ئامراز و پلان 🧠" : isKu ? "ئامراز و پلان 🧠" : "Tools & Plan 🧠",
      titleColor: "text-blue-400",
      iconColor: "text-blue-500",
      icon: Calendar,
      items: [
        {
          id: "pomodoro" as NavTab,
          label: isBadini ? "کاتژمێرا پۆمۆدۆرۆ (تەرکیز)" : isKu ? "کاتژمێری پۆمۆدۆرۆ (تەرکیز)" : "Pomodoro Focus Timer",
          labelEn: "Dedicated Pomodoro Timer Page",
          icon: Timer,
          iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white",
          badge: "HOT 🔥"
        },
        {
          id: "revision" as NavTab,
          label: isBadini ? "پێداچوون (Revision)" : isKu ? "پێداچوونەوە (Revision)" : "Revision & Review",
          labelEn: "Phase 1 & 2 Revision Hub",
          icon: RefreshCw,
          iconBg: "bg-gradient-to-br from-indigo-500 to-purple-600 text-white",
          badge: "🔄 NEW"
        },
        {
          id: "studyTools" as NavTab,
          label: isBadini ? "ئامرازێن خویندنێ" : isKu ? "ئامرازەکانی خوێندن" : "Study Tools Hub",
          labelEn: "Pomodoro & Focus Tools",
          icon: Calendar,
          iconBg: "bg-gradient-to-br from-cyan-500 to-blue-600 text-white",
          sideIcon: Calendar
        },
        {
          id: "studyPlan" as NavTab,
          label: isBadini ? "پلانا خویندنێ" : isKu ? "پلانی خوێندن" : "Study Plan",
          labelEn: "Weekly Study Schedule",
          icon: Calendar,
          iconBg: "bg-gradient-to-br from-teal-500 to-emerald-600 text-white",
          sideIcon: Calendar
        },
        {
          id: "challenges" as NavTab,
          label: isBadini ? "ئاڵنگاریێن ڕۆژانە" : isKu ? "ئاڵنگاری ڕۆژانە" : "Daily Challenges",
          labelEn: "Daily Quizzes & Streaks",
          icon: Target,
          iconBg: "bg-gradient-to-br from-orange-500 to-red-600 text-white",
          badge: "NEW ✨"
        },
        {
          id: "notes" as NavTab,
          label: isBadini ? "تێبینی و یاسا" : isKu ? "تێبینی و یاساکان" : "Notes & Formulas",
          labelEn: "Notes & Rules",
          icon: FileText,
          iconBg: "bg-gradient-to-br from-pink-500 to-rose-500 text-white",
          sideIcon: FileText
        },
        {
          id: "bookmarks" as NavTab,
          label: isBadini ? "پرسیارێن پاراستی" : isKu ? "پرسیارە پارێزراوەکان" : "Saved Questions",
          labelEn: "Saved Questions",
          icon: Bookmark,
          iconBg: "bg-gradient-to-br from-blue-500 to-cyan-600 text-white",
          sideIcon: Bookmark
        },
        {
          id: "statistics" as NavTab,
          label: isBadini ? "ئامارێن خویندنێ" : isKu ? "ئاماری خوێندن" : "Study Statistics",
          labelEn: "Progress & Time Graphs",
          icon: BarChart2,
          iconBg: "bg-gradient-to-br from-purple-500 to-pink-600 text-white",
          sideIcon: BarChart2
        }
      ]
    },
    {
      id: "communityCat",
      title: isBadini ? "کۆمەڵگە و ڕیزبەندا گشتی 👥" : isKu ? "کۆمەڵگە و ڕێزبەند 👥" : "Community & Rank 👥",
      titleColor: "text-emerald-400",
      iconColor: "text-emerald-500",
      icon: Users,
      items: [
        {
          id: "leaderboard" as NavTab,
          label: isBadini ? "ڕیزبەندا گشتی" : isKu ? "ڕێزبەندی گشتی" : "Leaderboard",
          labelEn: "Global Leaderboard",
          icon: Trophy,
          iconBg: "bg-gradient-to-br from-yellow-500 to-amber-600 text-white",
          badge: "TOP 🏆"
        },
        {
          id: "community" as NavTab,
          label: isBadini ? "کۆمەڵگەها قوتابییان" : isKu ? "فۆڕەمی کۆمەڵگە" : "Community Forum",
          labelEn: "Student Community",
          icon: Users,
          iconBg: "bg-gradient-to-br from-amber-500 to-orange-600 text-white",
          sideIcon: Users
        },
        {
          id: "friends" as NavTab,
          label: isBadini ? "هاڤاڵ و چات" : isKu ? "هاوڕێیان و چات" : "Friends & Chat",
          labelEn: "Classmates & Groups Chat",
          icon: MessageSquare,
          iconBg: "bg-gradient-to-br from-blue-600 to-indigo-600 text-white",
          sideIcon: MessageSquare
        }
      ]
    },
    {
      id: "rewardsCat",
      title: isBadini ? "خەڵات و VIP 🎁" : isKu ? "خەڵات و VIP 🎁" : "Rewards & VIP 🎁",
      titleColor: "text-amber-400",
      iconColor: "text-amber-500",
      icon: ShoppingBag,
      items: [
        {
          id: "shop" as NavTab,
          label: isBadini ? "فرۆشگەها خەڵاتان" : isKu ? "فرۆشگای خەڵاتەکان" : "Rewards Shop",
          labelEn: "Exchange XP for Avatars",
          icon: ShoppingBag,
          iconBg: "bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white",
          sideIcon: ShoppingBag
        },
        {
          id: "luckyWheel" as NavTab,
          label: isBadini ? "چەرخێ شانسێ 🎡" : isKu ? "چەرخی شانس 🎡" : "Lucky Wheel 🎡",
          labelEn: "Spin the Daily Wheel",
          icon: Disc,
          iconBg: "bg-gradient-to-br from-amber-400 to-orange-500 text-white",
          badge: "FREE 🎡"
        },
        {
          id: "premium" as NavTab,
          label: isBadini ? "پلانا Premium 👑" : isKu ? "پلانی VIP Premium 👑" : "VIP Premium 👑",
          labelEn: "VIP Premium Subscription",
          icon: Crown,
          iconBg: "bg-gradient-to-br from-yellow-400 to-amber-600 text-white",
          badge: "VIP 👑"
        },
        {
          id: "admin" as NavTab,
          label: isBadini ? "پانێڵێ بڕێڤەبەری" : isKu ? "پانێڵی بەڕێوەبەر" : "Admin Panel",
          labelEn: "Platform Management",
          icon: ShieldCheck,
          iconBg: "bg-gradient-to-br from-slate-600 to-slate-800 text-white",
          sideIcon: ShieldCheck
        }
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: "spring" }}
      className={`w-full rounded-3xl p-5 sm:p-8 shadow-2xl border transition-all mb-8 ${
        isDarkMode
          ? "bg-[#101224]/95 border-purple-500/40 text-white shadow-purple-950/60"
          : "bg-white border-purple-200 text-slate-900 shadow-xl"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-indigo-900/20 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30">
            <LayoutGrid className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-black tracking-tight">
              {isBadini
                ? "هەمی بەش و ئامرازێن DEGEL QUTABI 🚀"
                : isKu
                ? "هەموو بەش و ئامرازەکانی DEGEL QUTABI 🚀"
                : "All DEGEL QUTABI Sections & Tools 🚀"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-0.5">
              {isBadini
                ? "ب یەک کلیک بگەهە هەمی تایبەتمەندی، کتێبخانە، تاقیکرن، ئامراز و خەڵاتان"
                : isKu
                ? "بە یەک کلیک بگەیەنە هەموو بەش، کتێبخانە، تاقیکردنەوە، ئامراز و خەڵاتەکان"
                : "Access all features, library, exams, study tools, and rewards with one click"}
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Quick AI & Study Tools */}
      <div className="mb-8">
        <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-500 mb-3.5 flex items-center gap-2 px-1">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>
            {isBadini ? "ئامرازێن زیرەک یێن AI و خێرا" : isKu ? "ئامرازی زیرەکی AI و خێرا" : "AI & Quick Tools"}
          </span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {quickToolsList.map((tool) => {
            const ToolIcon = tool.icon;
            return (
              <motion.button
                key={tool.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={tool.action}
                className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border text-left transition-all flex items-center justify-between gap-3.5 group shadow-md hover:shadow-lg ${
                  isDarkMode
                    ? "bg-[#16182e] border-indigo-900/40 hover:border-amber-500/50 hover:bg-[#1d203e]"
                    : "bg-white border-slate-200/90 hover:border-amber-400 hover:bg-amber-50/20 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 shadow-md ${tool.iconBg}`}>
                    <ToolIcon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex flex-col justify-center">
                    <span className={`text-sm sm:text-base font-black truncate leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      {tool.label}
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold truncate mt-1 text-slate-400">
                      {tool.labelEn}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  <div className={`p-2.5 rounded-xl border transition-all ${
                    isDarkMode
                      ? "bg-purple-950/60 text-amber-400 border-purple-800/40 group-hover:bg-purple-900/80"
                      : "bg-purple-50 text-purple-600 border-purple-100 group-hover:bg-purple-100/80"
                  }`}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* All Main Categories */}
      <div className="space-y-8">
        {allSectionCategories.map((category) => {
          const CatIcon = category.icon;
          return (
            <div key={category.id}>
              <h3 className={`text-xs sm:text-sm font-black uppercase tracking-wider ${category.titleColor} mb-3.5 flex items-center gap-2 px-1`}>
                <CatIcon className={`w-4 h-4 ${category.iconColor}`} />
                <span>{category.title}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {category.items.map((item) => {
                  const ItemIcon = item.icon;
                  const isItemActive = activeTab === item.id;
                  const SideIconComponent = item.sideIcon;
                  return (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onSelectTab(item.id)}
                      className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border text-left transition-all flex items-center justify-between gap-3.5 group shadow-md hover:shadow-lg ${
                        isItemActive
                          ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-purple-600/30 border-purple-400 font-bold"
                          : isDarkMode
                          ? "bg-[#16182e] border-indigo-900/40 hover:border-purple-500/50 hover:bg-[#1d203e]"
                          : "bg-white border-purple-100/90 hover:border-purple-300 hover:bg-purple-50/30 shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 shadow-md ${
                            isItemActive
                              ? "bg-white/20 text-white"
                              : item.iconBg || "bg-gradient-to-br from-purple-500 to-indigo-600 text-white"
                          }`}
                        >
                          <ItemIcon className="w-6 h-6" />
                        </div>
                        <div className="min-w-0 flex flex-col justify-center">
                          <span className={`text-sm sm:text-base font-black truncate leading-tight ${isItemActive ? "text-white" : isDarkMode ? "text-white" : "text-slate-900"}`}>
                            {item.label}
                          </span>
                          <span className={`text-[11px] sm:text-xs font-semibold truncate mt-1 ${isItemActive ? "text-purple-100" : "text-slate-400"}`}>
                            {item.labelEn}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center">
                        {item.badge ? (
                          <span className={`px-2.5 py-1 rounded-xl text-xs font-black shadow-sm flex items-center justify-center ${
                            item.badge === "TOP 🏆" || item.badge.includes("TOP") || item.badge.includes("HOT")
                              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white animate-pulse"
                              : isItemActive
                              ? "bg-white/20 text-white"
                              : isDarkMode
                              ? "bg-purple-900/60 text-purple-300 border border-purple-700/50"
                              : "bg-purple-100 text-purple-700 border border-purple-200"
                          }`}>
                            {item.badge}
                          </span>
                        ) : (
                          <div className={`p-2.5 rounded-xl border transition-all ${
                            isItemActive
                              ? "bg-white/20 text-white border-white/30"
                              : isDarkMode
                              ? "bg-purple-950/60 text-purple-400 border-purple-800/40 group-hover:bg-purple-900/80"
                              : "bg-purple-50 text-purple-600 border-purple-100 group-hover:bg-purple-100/80"
                          }`}>
                            {SideIconComponent ? <SideIconComponent className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

