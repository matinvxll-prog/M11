import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  X,
  BookOpen,
  Brain,
  Mic,
  Camera,
  Calculator,
  Book,
  Target,
  FileCheck,
  FileDown,
  Video,
  Calendar,
  FileText,
  Bookmark,
  BarChart2,
  Trophy,
  Users,
  MessageSquare,
  ShoppingBag,
  Disc,
  Crown,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Download,
  Play,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Language, Subject, Question, PdfDocument, VideoLesson, NoteItem } from "../types";
import { NavTab } from "./Sidebar";
import { mockQuestions, mockPdfs, mockVideos, mockNotes } from "../data/mockData";

interface GlobalSearchResultsProps {
  searchTerm: string;
  language: Language;
  isDarkMode: boolean;
  onClearSearch: () => void;
  onSelectTab: (tab: NavTab) => void;
  onSelectSubject: (subjectId: string) => void;
  onOpenAiTutor: () => void;
  onOpenVoiceQuiz: () => void;
  onOpenCameraOcr: () => void;
  onOpenCalculator: () => void;
  onOpenDictionary: () => void;
  onOpenLuckyWheel: () => void;
  onOpenPremium: () => void;
  onOpenProfile: () => void;
  subjectsList: Subject[];
}

interface SearchableTool {
  id: string;
  labelKu: string;
  labelBadini: string;
  labelEn: string;
  descKu: string;
  descBadini: string;
  descEn: string;
  icon: any;
  badge?: string;
  iconBg: string;
  actionType: "tab" | "modal";
  targetTab?: NavTab;
  targetModal?: () => void;
}

const normalizeText = (str: string = ""): string => {
  return str
    .toLowerCase()
    .replace(/ێ/g, "ی")
    .replace(/ئ/g, "")
    .replace(/ە/g, "ه")
    .replace(/ك/g, "ک")
    .replace(/ۆ/g, "و")
    .replace(/ڕ/g, "ر")
    .replace(/\s+/g, " ")
    .trim();
};

export const GlobalSearchResults: React.FC<GlobalSearchResultsProps> = ({
  searchTerm,
  language,
  isDarkMode,
  onClearSearch,
  onSelectTab,
  onSelectSubject,
  onOpenAiTutor,
  onOpenVoiceQuiz,
  onOpenCameraOcr,
  onOpenCalculator,
  onOpenDictionary,
  onOpenLuckyWheel,
  onOpenPremium,
  onOpenProfile,
  subjectsList
}) => {
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");
  const [activeVideoPreview, setActiveVideoPreview] = useState<VideoLesson | null>(null);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  const query = normalizeText(searchTerm);

  const isKu = language === "ku";
  const isBadini = language === "badini";

  // List of all platform sections & AI tools
  const allTools: SearchableTool[] = [
    {
      id: "aiTutor",
      labelKu: "مامۆستای AI و شیکارکەر",
      labelBadini: "مامۆستایێ AI و شیکارکەر",
      labelEn: "AI Tutor & Assistant",
      descKu: "پرسیار بکە و شیکاری زیرەکی دەستبەجێ وەربگرە ب تەکنەلۆجیای ژیری دەستکرد",
      descBadini: "پرسیار بکە و شیکاریا زیرەک دەستبەجێ وەربگرە ب تەکنەلۆجیایا زیرەکیا دەستکرد",
      descEn: "Ask questions and get instant AI-powered explanations",
      icon: Brain,
      iconBg: "bg-gradient-to-br from-rose-500 to-red-600 text-white",
      actionType: "modal",
      targetModal: onOpenAiTutor,
      badge: "AI 🤖"
    },
    {
      id: "scanner",
      labelKu: "سکانی پرسیار بە کامێرا (OCR)",
      labelBadini: "سکاننێ پرسیارێ ب کامیرایێ (OCR)",
      labelEn: "Camera Question Scanner",
      descKu: "وێنەی هەر پرسیارێکی مەلزەمە یان پەرتووک بگرە بۆ شیکاری خێرا",
      descBadini: "وێنێ هەر پرسیارەکا مەلزەمە یان پەرتووکێ بگرە بۆ شیکاریا خێرا",
      descEn: "Snap a photo of any question to get instant solutions",
      icon: Camera,
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-600 text-white",
      actionType: "modal",
      targetModal: onOpenCameraOcr,
      badge: "OCR 📸"
    },
    {
      id: "calculator",
      labelKu: "ژمێرەی زانستی و هاوکێشەکان",
      labelBadini: "کالکیولیتەر و هاوکێشەکان",
      labelEn: "Scientific Calculator",
      descKu: "حسابکردنی هاوکێشە ئاڵۆزەکانی بیرکاری، فیزیا و کیمیا",
      descBadini: "حسابکرنا هاوکێشەیێن ئاڵۆز یێن بیرکاری، فیزیا و کیمیایێ",
      descEn: "Advanced scientific calculator for formulas",
      icon: Calculator,
      iconBg: "bg-gradient-to-br from-violet-500 to-purple-600 text-white",
      actionType: "modal",
      targetModal: onOpenCalculator
    },
    {
      id: "grade12Special",
      labelKu: "سیستەمی گشتگیری ئەزموونەکان 🎓",
      labelBadini: "سیستەمێ گشتگیر یێ ئەزموومان 🎓",
      labelEn: "Comprehensive Exam System",
      descKu: "تایبەت بە ئامادەکاری تەواو بۆ تاقیکردنەوەی وزاری پۆلی ١٢",
      descBadini: "تایبەت ب ئامادەکارییا تەمام بۆ تاقیکرنێن وزاری پۆلا ١٢",
      descEn: "Complete exam preparation platform for Grade 12",
      icon: Target,
      iconBg: "bg-gradient-to-br from-rose-500 to-red-600 text-white",
      actionType: "tab",
      targetTab: "grade12Special",
      badge: "HOT 🔥"
    },
    {
      id: "ministerialExams",
      labelKu: "تاقیکردنەوەی وزاری ساڵانی پێشوو",
      labelBadini: "تاقیکرنێن وزاری یێن ساڵێن دەربازبووی",
      labelEn: "Past Years Ministerial Exams",
      descKu: "تاقیکردنەوەی ڕاستەقینەی وزاری بە شێوازی کاتژمێری فەرمی",
      descBadini: "تاقیکرنێن ڕاستەقینە یێن وزاری ب شێوازێ کاتژمێرێ فەرمی",
      descEn: "Real past ministerial exams with timer",
      icon: FileCheck,
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white",
      actionType: "tab",
      targetTab: "ministerialExams"
    },
    {
      id: "subjects",
      labelKu: "هەموو بابەتەکان (بیرکاری، فیزیا، کیمیا...)",
      labelBadini: "هەمی بابەت (بیرکاری، فیزیا، کیمیا...)",
      labelEn: "All Grade 12 Subjects",
      descKu: "پرسیار، ڕاهێنان و بەشەکانی هەموو وانەکانی پۆلی ١٢",
      descBadini: "پرسیار، ڕاهێنان و بەشێن هەمی وانەیێن پۆلا ١٢",
      descEn: "Questions and practice for all 7 subjects",
      icon: BookOpen,
      iconBg: "bg-gradient-to-br from-indigo-500 to-purple-600 text-white",
      actionType: "tab",
      targetTab: "subjects"
    },
    {
      id: "pdfLibrary",
      labelKu: "کتێبخانەی PDF و مەلزەمەکان",
      labelBadini: "کتێبخانەیا PDF و مەلزەمە",
      labelEn: "PDF Library & Materials",
      descKu: "داونلۆدکردنی مەلزەمەی زێڕین، کورتە و پوختەی وانەکان",
      descBadini: "داونلۆدکرنا مەلزەما زێڕین، کورتە و پوختەیێن وانان",
      descEn: "Download top summaries and PDF books",
      icon: FileDown,
      iconBg: "bg-gradient-to-br from-purple-500 to-indigo-600 text-white",
      actionType: "tab",
      targetTab: "pdfLibrary"
    },
    {
      id: "videos",
      labelKu: "شیکاری ڤیدیۆیی وانەکان",
      labelBadini: "شیکارێن ڤیدیۆیی یێن وانان",
      labelEn: "Lesson Videos & Explanations",
      descKu: "شیکردنەوەی ڤیدیۆیی لەلایەن باشترین مامۆستایانی کوردستان",
      descBadini: "شیکارکرنێن ڤیدیۆیی ژ لایێ باشترین مامۆستایێن کوردستانێ",
      descEn: "Video lectures by top Kurdistan teachers",
      icon: Video,
      iconBg: "bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white",
      actionType: "tab",
      targetTab: "videos"
    },
    {
      id: "studyTools",
      labelKu: "ئامرازەکانی خوێندن (تایمەری پۆمۆدۆرۆ)",
      labelBadini: "ئامرازێن خویندنێ (تایمەرێ پۆمۆدۆرۆ)",
      labelEn: "Pomodoro & Focus Tools",
      descKu: "تایمەری تەرکیز و موزیکی ئارامکەرەوە بۆ خوێندنی کاریگەر",
      descBadini: "تایمەرێ تەرکیزێ و موزیکا ئارامکەر بۆ خویندنا کاریگەر",
      descEn: "Focus timer and ambient study sounds",
      icon: Calendar,
      iconBg: "bg-gradient-to-br from-cyan-500 to-blue-600 text-white",
      actionType: "tab",
      targetTab: "studyTools"
    },
    {
      id: "studyPlan",
      labelKu: "خشتە و پلانی خوێندنی هەفتانە",
      labelBadini: "خشتە و پلانا خویندنا حەفتیانە",
      labelEn: "Weekly Study Schedule",
      descKu: "ڕێکخستنی کاتەکان و دانانی پلانی خوێندن بۆ ئەزموونەکان",
      descBadini: "ڕێکخستنا دەمان و دانانا پلانا خویندنێ بۆ ئەزموومان",
      descEn: "Organize your weekly study calendar",
      icon: Calendar,
      iconBg: "bg-gradient-to-br from-teal-500 to-emerald-600 text-white",
      actionType: "tab",
      targetTab: "studyPlan"
    },
    {
      id: "challenges",
      labelKu: "پرسیاری ڕۆژانە و زنجیرەی دەستکەوت",
      labelBadini: "پرسیارێن ڕۆژانە و زنجیرەیا دەستکەفتان",
      labelEn: "Daily Quizzes & Streaks",
      descKu: "ڕۆژانە بەشداری بکە و خاڵی XP کۆبکەرەوە و زنجیرەکەت بپارێزە",
      descBadini: "ڕۆژانە بەشداریێ بکە و خاڵێن XP کۆمبکە و زنجیرەیا خۆ بپارێزە",
      descEn: "Complete daily challenges to maintain your streak",
      icon: Target,
      iconBg: "bg-gradient-to-br from-orange-500 to-red-600 text-white",
      actionType: "tab",
      targetTab: "challenges",
      badge: "NEW ✨"
    },
    {
      id: "notes",
      labelKu: "تێبینی و یاسا گرنگەکان",
      labelBadini: "تێبینی و یاسایێن گرنگ",
      labelEn: "Notes & Rules",
      descKu: "یاسا و پوختەی فرمۆلاکانی بیرکاری، فیزیا و کیمیا",
      descBadini: "یاسا و پوختەیا فرمۆلایێن بیرکاری، فیزیا و کیمیایێ",
      descEn: "Essential formulas and quick notes",
      icon: FileText,
      iconBg: "bg-gradient-to-br from-pink-500 to-rose-500 text-white",
      actionType: "tab",
      targetTab: "notes"
    },
    {
      id: "bookmarks",
      labelKu: "پرسیارە خەزنکراوەکان (پاراستی)",
      labelBadini: "پرسیارێن پاراستی و خەزنکری",
      labelEn: "Saved Questions",
      descKu: "ئەو پرسیارانەی کە هێلاوتەوە بۆ پێداچوونەوەی دواتر",
      descBadini: "ئەو پرسیارێن تە هێلاینەڤە بۆ پێداچوونەڤەیا دواتر",
      descEn: "Questions you bookmarked for review",
      icon: Bookmark,
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-600 text-white",
      actionType: "tab",
      targetTab: "bookmarks"
    },
    {
      id: "statistics",
      labelKu: "شیکاری بەرەوپێشچوون و کاتی خوێندن",
      labelBadini: "شیکاریا پێشکەفتن و دەمێ خویندنێ",
      labelEn: "Progress & Time Graphs",
      descKu: "هێلکاری و گرافێکی کاتەکانی خوێندن و خاڵەکانی هێز و لاوازی",
      descBadini: "هێلکاری و گرافێکێ دەمێن خویندنێ و خاڵێن هێز و لاوازیێ",
      descEn: "Analytics and progress visual graphs",
      icon: BarChart2,
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-600 text-white",
      actionType: "tab",
      targetTab: "statistics"
    },
    {
      id: "leaderboard",
      labelKu: "ڕێزبەندی گشتی لە کوردستان",
      labelBadini: "ڕیزبەندا گشتی ل کوردستانێ",
      labelEn: "Global Leaderboard",
      descKu: "ببینە کێ زۆرترین خاڵی هەیە لە سەرانسەری هەرێمی کوردستان",
      descBadini: "ببینە کێ پترترین خاڵ هەنە ل سەرانسەری هەرێما کوردستانێ",
      descEn: "Rankings of top students across the region",
      icon: Trophy,
      iconBg: "bg-gradient-to-br from-yellow-500 to-amber-600 text-white",
      actionType: "tab",
      targetTab: "leaderboard",
      badge: "TOP 🏆"
    },
    {
      id: "community",
      labelKu: "کۆمەڵگەی قوتابیان و گفتوگۆ",
      labelBadini: "کۆمەڵگەها قوتابیان و گەنگەشە",
      labelEn: "Student Community",
      descKu: "پرسیار بکە، شیکاری بڵاوبکەرەوە و هاوکاری هاوپۆلانت بکە",
      descBadini: "پرسیار بکە، شیکاریان بەلاڤ بکە و هاریکاریا هاڤاڵان بکە",
      descEn: "Ask questions and collaborate with peers",
      icon: Users,
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-600 text-white",
      actionType: "tab",
      targetTab: "community"
    },
    {
      id: "friends",
      labelKu: "چات و پەیوەندی لەگەڵ هاوپۆلان",
      labelBadini: "چات و پەیوەندی دگەل هاڤاڵان",
      labelEn: "Classmates & Groups Chat",
      descKu: "نامە ناردن، دروستکردنی گرووپی خوێندن و هاوڕێیەتی",
      descBadini: "نامە ناردن، دروستکرنا گرووپێن خویندنێ و هاڤاڵینی",
      descEn: "Connect and message your classmates",
      icon: MessageSquare,
      iconBg: "bg-gradient-to-br from-blue-600 to-indigo-600 text-white",
      actionType: "tab",
      targetTab: "friends"
    },
    {
      id: "shop",
      labelKu: "فرۆشگای خەڵاتەکان و دیزاین",
      labelBadini: "فرۆشگەها خەڵاتان و دیزاین",
      labelEn: "Rewards Shop",
      descKu: "خاڵەکانی XP بگۆڕەوە بە دیاری، دیزاین و وێنەی تایبەت",
      descBadini: "خاڵێن XP بگۆڕە ب دیاری، دیزاین و وێنەیێن تایبەت",
      descEn: "Spend XP points on avatars and themes",
      icon: ShoppingBag,
      iconBg: "bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white",
      actionType: "tab",
      targetTab: "shop"
    },
    {
      id: "luckyWheel",
      labelKu: "چەرخی بەختی ڕۆژانە",
      labelBadini: "چەرخێ بەختێ ڕۆژانە",
      labelEn: "Spin the Daily Wheel",
      descKu: "ڕۆژانە جارێک چەرخەکە بسووڕێنە و خەڵاتی زێڕین ببرەوە",
      descBadini: "ڕۆژانە جارەکێ چەرخێ بسووڕینە و خەڵاتێ زێڕین ببە",
      descEn: "Daily free spin for golden rewards",
      icon: Disc,
      iconBg: "bg-gradient-to-br from-amber-400 to-orange-500 text-white",
      actionType: "modal",
      targetModal: onOpenLuckyWheel,
      badge: "FREE 🎡"
    },
    {
      id: "premium",
      labelKu: "پلانی VIP Premium 👑",
      labelBadini: "پلانا VIP Premium 👑",
      labelEn: "VIP Premium Subscription",
      descKu: "تایبەتمەندی بێسنوور، شیکاری AI بێسنوور و نەبوونی هیچ ڕیکلامێک",
      descBadini: "تایبەتمەندیێن بێسنوور، شیکاریا AI بێسنوور و بێ ڕیکلام",
      descEn: "Unlimited AI, features and zero ads",
      icon: Crown,
      iconBg: "bg-gradient-to-br from-yellow-400 to-amber-600 text-white",
      actionType: "modal",
      targetModal: onOpenPremium,
      badge: "VIP 👑"
    },
    {
      id: "profile",
      labelKu: "پرۆفایل و ڕێکخستنەکان",
      labelBadini: "پروفایل و ڕێکخستنێن من",
      labelEn: "Profile & Settings",
      descKu: "گۆڕینی ناوی قوتابخانە، وێنەی پرۆفایل، باج و بڕوانامەکان",
      descBadini: "گۆڕینا ناڤێ قوتابخانێ، وێنێ پرۆفایلی، باج و بڕوانامە",
      descEn: "Manage your student account and badges",
      icon: Users,
      iconBg: "bg-gradient-to-br from-slate-600 to-slate-800 text-white",
      actionType: "modal",
      targetModal: onOpenProfile
    }
  ];

  // Filtering Tools
  const matchedTools = allTools.filter((t) => {
    return (
      normalizeText(t.labelKu).includes(query) ||
      normalizeText(t.labelBadini).includes(query) ||
      normalizeText(t.labelEn).includes(query) ||
      normalizeText(t.descKu).includes(query) ||
      normalizeText(t.descBadini).includes(query) ||
      normalizeText(t.descEn).includes(query)
    );
  });

  // Filtering Subjects
  const matchedSubjects = subjectsList.filter((s) => {
    return (
      normalizeText(s.nameKu).includes(query) ||
      normalizeText(s.nameBadini).includes(query) ||
      normalizeText(s.nameEn).includes(query) ||
      normalizeText(s.id).includes(query) ||
      (query === "بیرکاری" && s.id === "math") ||
      (query === "فیزیا" && s.id === "physics") ||
      (query === "کیمیا" && s.id === "chemistry") ||
      (query === "زیندەوەر" && s.id === "biology")
    );
  });

  // Filtering Questions
  const matchedQuestions = mockQuestions.filter((q) => {
    return (
      normalizeText(q.questionKu).includes(query) ||
      normalizeText(q.questionBadini).includes(query) ||
      normalizeText(q.questionEn).includes(query) ||
      normalizeText(q.chapterKu).includes(query) ||
      normalizeText(q.chapterBadini).includes(query) ||
      normalizeText(q.chapterEn).includes(query) ||
      normalizeText(q.explanationKu).includes(query) ||
      normalizeText(q.explanationBadini).includes(query) ||
      normalizeText(q.explanationEn).includes(query) ||
      normalizeText(q.year).includes(query)
    );
  });

  // Filtering PDF Documents
  const matchedPdfs = mockPdfs.filter((p) => {
    return (
      normalizeText(p.titleKu).includes(query) ||
      normalizeText(p.titleBadini).includes(query) ||
      normalizeText(p.titleEn).includes(query) ||
      normalizeText(p.subjectId).includes(query)
    );
  });

  // Filtering Video Lessons
  const matchedVideos = mockVideos.filter((v) => {
    return (
      normalizeText(v.titleKu).includes(query) ||
      normalizeText(v.titleBadini).includes(query) ||
      normalizeText(v.titleEn).includes(query) ||
      normalizeText(v.teacherName).includes(query) ||
      normalizeText(v.chapterKu).includes(query) ||
      normalizeText(v.chapterBadini).includes(query) ||
      normalizeText(v.subjectId).includes(query)
    );
  });

  // Filtering Notes & Formulas
  const matchedNotes = mockNotes.filter((n) => {
    return (
      normalizeText(n.titleKu).includes(query) ||
      normalizeText(n.titleBadini).includes(query) ||
      normalizeText(n.titleEn).includes(query) ||
      normalizeText(n.contentKu).includes(query) ||
      normalizeText(n.contentBadini).includes(query) ||
      normalizeText(n.contentEn).includes(query) ||
      normalizeText(n.subjectId).includes(query)
    );
  });

  const totalResultsCount =
    matchedTools.length +
    matchedSubjects.length +
    matchedQuestions.length +
    matchedPdfs.length +
    matchedVideos.length +
    matchedNotes.length;

  const handleToolClick = (tool: SearchableTool) => {
    if (tool.actionType === "tab" && tool.targetTab) {
      onSelectTab(tool.targetTab);
    } else if (tool.actionType === "modal" && tool.targetModal) {
      tool.targetModal();
    }
  };

  const triggerDownloadNotification = (title: string) => {
    setDownloadNotification(title);
    setTimeout(() => {
      setDownloadNotification(null);
    }, 4000);
  };

  const getSubjectName = (subjectId: string) => {
    const sub = subjectsList.find((s) => s.id === subjectId);
    if (!sub) return subjectId;
    return isBadini ? sub.nameBadini : isKu ? sub.nameKu : sub.nameEn;
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Toast notification for PDF Download */}
      <AnimatePresence>
        {downloadNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold shadow-xl flex items-center gap-3 border border-emerald-400 max-w-md text-center"
          >
            <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-200 animate-bounce" />
            <div className="text-sm">
              <p>{isBadini ? "دابەزاندن دەستپێکر..." : isKu ? "داونلۆدکردن دەستیپێکرد..." : "Download Started..."}</p>
              <p className="text-xs font-normal text-emerald-100 truncate mt-0.5">{downloadNotification}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Preview Modal if clicked */}
      <AnimatePresence>
        {activeVideoPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className={`w-full max-w-3xl rounded-3xl overflow-hidden border shadow-2xl p-6 ${
                isDarkMode ? "bg-[#16182e] border-indigo-900/50 text-white" : "bg-white border-slate-200 text-slate-900"
              }`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/30">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg">
                      {isBadini ? activeVideoPreview.titleBadini : isKu ? activeVideoPreview.titleKu : activeVideoPreview.titleEn}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {activeVideoPreview.teacherName}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveVideoPreview(null)}
                  className="p-2 rounded-xl hover:bg-slate-800/30 text-slate-400 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player Placeholder / Frame */}
              <div className="my-6 aspect-video w-full rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group">
                <img
                  src={activeVideoPreview.thumbnailUrl || "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80"}
                  alt="Lesson Thumbnail"
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition duration-500"
                />
                <div className="relative z-10 text-center p-6 max-w-md">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-600/40 animate-pulse">
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </div>
                  <h4 className="font-extrabold text-lg text-white mb-2">
                    {isBadini ? "پێشاندانا وانێ یان چوون بۆ بەشێ ڤیدیۆیان" : isKu ? "پیشاندانی وانە یان چوون بۆ بەشی ڤیدیۆیان" : "Playing Video Lesson"}
                  </h4>
                  <p className="text-xs text-slate-300 mb-6">
                    {isBadini ? "تۆ دشیی هەمی وانەیێن ڤیدیۆیی دگەل تێبینی و شیکاریان ل بەشێ تایبەت یێ ڤیدیۆیان ببینێ." : isKu ? "دەتوانیت هەموو وانە ڤیدیۆییەکان لەگەڵ تێبینی و شیکاری لە بەشی تایبەتی ڤیدیۆکان ببینی." : "You can access all video lessons with notes in the Videos section."}
                  </p>
                  <button
                    onClick={() => {
                      setActiveVideoPreview(null);
                      onSelectTab("videos");
                    }}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 hover:scale-105 transition inline-flex items-center gap-2"
                  >
                    <span>{isBadini ? "چوون بۆ بەشێ ڤیدیۆیان 🎬" : isKu ? "چوون بۆ بەشی ڤیدیۆکان 🎬" : "Go to Videos Section 🎬"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setActiveVideoPreview(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition"
                >
                  {isBadini ? "داخستن" : isKu ? "داخستن" : "Close"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEARCH HEADER BAR */}
      <div
        className={`p-5 sm:p-6 rounded-3xl border shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
          isDarkMode
            ? "bg-gradient-to-r from-[#16182e] via-[#1d203e] to-[#16182e] border-purple-500/30"
            : "bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white border-purple-800 shadow-purple-950/20"
        }`}
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 text-amber-400 shadow-inner">
            <Search className="w-6 h-6 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-black text-white truncate">
                {isBadini ? "ئەنجامێن گەڕیانێ بۆ:" : isKu ? "ئەنجامەکانی گەڕان بۆ:" : "Search Results for:"}{" "}
                <span className="text-amber-400 underline decoration-amber-400/50 underline-offset-4">"{searchTerm}"</span>
              </h2>
              <span className="px-3 py-0.5 rounded-full text-xs font-black bg-purple-500/30 border border-purple-400/40 text-purple-200">
                {totalResultsCount} {isBadini ? "ئەنجام" : isKu ? "ئەنجام" : "Results"}
              </span>
            </div>
            <p className="text-xs text-purple-200/80 mt-1 truncate">
              {isBadini
                ? "گەڕیان ل سەرانسەری بابەت، ئامراز، پرسیارێن وزاری، مەلزەمە و ڤیدیۆیان"
                : isKu
                ? "گەڕان لە سەرانسەری بابەتەکان، ئامراز، پرسیاری وزاری، مەلزەمە و ڤیدیۆکان"
                : "Searching across subjects, tools, ministerial questions, PDFs and videos"}
            </p>
          </div>
        </div>

        <button
          onClick={onClearSearch}
          className="px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-black transition flex items-center gap-2 shrink-0 self-stretch sm:self-auto justify-center shadow-md"
        >
          <X className="w-4 h-4 text-rose-300" />
          <span>{isBadini ? "لادان و پاقژکردنا گەڕیانێ" : isKu ? "لادان و پاککردنەوەی گەڕان" : "Clear Search & Close"}</span>
        </button>
      </div>

      {/* FILTER CATEGORY CHIPS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: "all", label: isBadini ? `✨ هەمی ئەنجام (${totalResultsCount})` : isKu ? `✨ هەموو ئەنجامەکان (${totalResultsCount})` : `✨ All (${totalResultsCount})` },
          { id: "tools", label: isBadini ? `🎛️ بەش و ئامراز (${matchedTools.length})` : isKu ? `🎛️ بەش و ئامرازەکان (${matchedTools.length})` : `🎛️ Tools (${matchedTools.length})` },
          { id: "subjects", label: isBadini ? `📚 بابەت (${matchedSubjects.length})` : isKu ? `📚 بابەتەکان (${matchedSubjects.length})` : `📚 Subjects (${matchedSubjects.length})` },
          { id: "questions", label: isBadini ? `❓ پرسیارێن وزاری (${matchedQuestions.length})` : isKu ? `❓ پرسیاری وزاری (${matchedQuestions.length})` : `❓ Questions (${matchedQuestions.length})` },
          { id: "pdfs", label: isBadini ? `📄 مەلزەمە و PDF (${matchedPdfs.length})` : isKu ? `📄 مەلزەمە و PDF (${matchedPdfs.length})` : `📄 PDFs (${matchedPdfs.length})` },
          { id: "videos", label: isBadini ? `🎥 ڤیدیۆ (${matchedVideos.length})` : isKu ? `🎥 ڤیدیۆکان (${matchedVideos.length})` : `🎥 Videos (${matchedVideos.length})` },
          { id: "notes", label: isBadini ? `📝 تێبینی و یاسا (${matchedNotes.length})` : isKu ? `📝 تێبینی و یاسا (${matchedNotes.length})` : `📝 Notes (${matchedNotes.length})` }
        ].map((chip) => {
          const isActive = activeCategoryFilter === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => setActiveCategoryFilter(chip.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all shrink-0 border shadow-sm ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-md shadow-purple-600/20"
                  : isDarkMode
                  ? "bg-[#16182e] text-slate-300 border-indigo-900/40 hover:bg-[#1d203e]"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* NO RESULTS AT ALL */}
      {totalResultsCount === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-10 rounded-3xl border text-center my-6 ${
            isDarkMode ? "bg-[#16182e] border-indigo-900/40" : "bg-white border-slate-200"
          } shadow-xl`}
        >
          <div className="w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-5">
            <AlertCircle className="w-10 h-10 animate-pulse" />
          </div>
          <h3 className="text-xl font-black mb-2">
            {isBadini ? `هیچ ئەنجامەک نەهاتە دیتن بۆ "${searchTerm}" 😔` : isKu ? `هیچ ئەنجامێک نەدۆزرایەوە بۆ "${searchTerm}" 😔` : `No results found for "${searchTerm}" 😔`}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
            {isBadini
              ? "بزاڤ بکە ب پەیڤەکا دی یان ناڤێ بابەتەکێ یان ئامرازەکێ بگەڕێ. بۆ نموونە دشێی یەک ژ ڤان پەیڤان تاقی بکەی:"
              : isKu
              ? "هەوڵ بدە بە وشەیەکی تر یان ناوی بابەتێک یان ئامرازێک بگەڕێیت. بۆ نموونە دەتوانیت یەکێک لەم وشانە تاقی بکەیتەوە:"
              : "Try searching with a different keyword, subject name, or tool. For example, try one of these suggestions:"}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto">
            {["بیرکاری", "فیزیا", "کیمیا", "زیندەوەر", "وزاری", "مامۆستای AI", "کالکیولیتەر", "مەلزەمە", "ڤیدیۆ", "تایمەر", "فەرهەنگ", "VIP"].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  const inputEl = document.querySelector('input[type="text"]') as HTMLInputElement;
                  if (inputEl) {
                    inputEl.value = suggestion;
                    inputEl.dispatchEvent(new Event("input", { bubbles: true }));
                  }
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition border ${
                  isDarkMode
                    ? "bg-purple-950/40 text-purple-300 border-purple-800/50 hover:bg-purple-900/60"
                    : "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
                }`}
              >
                🔍 {suggestion}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* SECTION 1: MATCHED TOOLS & SECTIONS */}
      {(activeCategoryFilter === "all" || activeCategoryFilter === "tools") && matchedTools.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-500" />
              <span>{isBadini ? "بەش و ئامرازێن ئەپلیکەیشنی" : isKu ? "بەش و ئامرازەکانی ئەپلیکەیشن" : "Platform Sections & Tools"}</span>
              <span className="text-xs font-bold text-slate-400">({matchedTools.length})</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {matchedTools.map((tool) => {
              const ToolIcon = tool.icon;
              return (
                <motion.button
                  key={tool.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleToolClick(tool)}
                  className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border text-left transition-all flex items-center justify-between gap-3.5 group shadow-md hover:shadow-lg ${
                    isDarkMode
                      ? "bg-[#16182e] border-indigo-900/40 hover:border-purple-500/50 hover:bg-[#1d203e]"
                      : "bg-white border-slate-200/90 hover:border-purple-400 hover:bg-purple-50/20 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 shadow-md ${tool.iconBg}`}>
                      <ToolIcon className="w-6 h-6" />
                    </div>
                    <div className="min-w-0 flex flex-col justify-center">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm sm:text-base font-black truncate leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                          {isBadini ? tool.labelBadini : isKu ? tool.labelKu : tool.labelEn}
                        </span>
                        {tool.badge && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm shrink-0">
                            {tool.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] sm:text-xs font-medium text-slate-400 line-clamp-1 mt-1">
                        {isBadini ? tool.descBadini : isKu ? tool.descKu : tool.descEn}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center">
                    <div className={`p-2.5 rounded-xl border transition-all ${
                      isDarkMode
                        ? "bg-purple-950/60 text-purple-400 border-purple-800/40 group-hover:bg-purple-900/80"
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
      )}

      {/* SECTION 2: MATCHED SUBJECTS */}
      {(activeCategoryFilter === "all" || activeCategoryFilter === "subjects") && matchedSubjects.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              <span>{isBadini ? "بابەتێن پۆلا ۱۲" : isKu ? "بابەتەکانی پۆلی ١٢" : "Grade 12 Subjects"}</span>
              <span className="text-xs font-bold text-slate-400">({matchedSubjects.length})</span>
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {matchedSubjects.map((sub) => (
              <motion.button
                key={sub.id}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectSubject(sub.id)}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-3 shadow-md hover:shadow-lg ${
                  isDarkMode
                    ? "bg-[#16182e] border-indigo-900/40 hover:border-indigo-500/60 hover:bg-[#1d203e]"
                    : "bg-white border-slate-200/90 hover:border-indigo-400 hover:bg-indigo-50/20 shadow-sm"
                }`}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${sub.color}20`, border: `1px solid ${sub.color}40`, color: sub.color }}
                >
                  {sub.iconSymbol || "📘"}
                </div>
                <div>
                  <span className={`text-base font-black block leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    {isBadini ? sub.nameBadini : isKu ? sub.nameKu : sub.nameEn}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 block mt-1">
                    {sub.questionsCount} {isBadini ? "پرسیار" : isKu ? "پرسیار" : "Questions"}
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${sub.progressPercent}%`, backgroundColor: sub.color }}
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: MATCHED MINISTERIAL QUESTIONS */}
      {(activeCategoryFilter === "all" || activeCategoryFilter === "questions") && matchedQuestions.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-500" />
              <span>{isBadini ? "پرسیارێن وزاری و ڕاهێنان" : isKu ? "پرسیاری وزاری و ڕاهێنان" : "Ministerial Exam Questions"}</span>
              <span className="text-xs font-bold text-slate-400">({matchedQuestions.length})</span>
            </h3>
          </div>
          <div className="space-y-3">
            {matchedQuestions.map((q) => {
              const isExpanded = expandedQuestionId === q.id;
              const qText = isBadini ? (q.questionBadini || q.questionKu) : isKu ? q.questionKu : q.questionEn;
              const explanationText = isBadini ? (q.explanationBadini || q.explanationKu) : isKu ? q.explanationKu : q.explanationEn;
              const chapterText = isBadini ? (q.chapterBadini || q.chapterKu) : isKu ? q.chapterKu : q.chapterEn;
              const qOptions = isBadini ? (q.optionsBadini || q.optionsKu || q.optionsEn || []) : isKu ? (q.optionsKu || q.optionsEn || []) : (q.optionsEn || q.optionsKu || []);
              const correctOption = q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-3xl border transition-all shadow-md ${
                    isDarkMode
                      ? "bg-[#16182e] border-indigo-900/40 hover:border-emerald-500/40"
                      : "bg-white border-slate-200/90 hover:border-emerald-400 shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        {getSubjectName(q.subjectId)}
                      </span>
                      {q.year && (
                        <span className="px-3 py-1 rounded-xl text-xs font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">
                          {q.year}
                        </span>
                      )}
                      {chapterText && (
                        <span className="text-xs text-slate-400 font-medium truncate max-w-xs">
                          • {chapterText}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className={`text-sm sm:text-base font-extrabold leading-relaxed mb-4 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    {qText}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                    {qOptions.map((opt, i) => {
                      const isCorrect = i === correctOption;
                      return (
                        <div
                          key={i}
                          className={`p-3 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-2.5 ${
                            isExpanded && isCorrect
                              ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                              : isDarkMode
                              ? "bg-slate-900/60 border-slate-800 text-slate-300"
                              : "bg-slate-50 border-slate-200 text-slate-800"
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                            isExpanded && isCorrect ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-slate-800"
                          }`}>
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="flex-1">{opt}</span>
                          {isExpanded && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {isExpanded && explanationText && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-purple-500/10 border border-purple-500/30 mb-4 text-xs sm:text-sm text-purple-200 leading-relaxed"
                    >
                      <div className="font-extrabold text-amber-400 flex items-center gap-1.5 mb-1.5">
                        <Sparkles className="w-4 h-4" />
                        <span>{isBadini ? "شیکاری و ڕوونکردنەڤە:" : isKu ? "شیکاری و ڕوونکردنەوە:" : "Explanation:"}</span>
                      </div>
                      {explanationText}
                    </motion.div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800/60">
                    <button
                      onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                      className="text-xs font-extrabold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 transition"
                    >
                      <span>
                        {isExpanded
                          ? isBadini ? "شیکاریێ ڤەشێرە 🙈" : isKu ? "شیکاری بشارەوە 🙈" : "Hide Explanation 🙈"
                          : isBadini ? "شیکاری و وەڵامێ درست ببینە 💡" : isKu ? "شیکاری و وەڵامی دروست ببینە 💡" : "Show Explanation & Answer 💡"}
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => onSelectTab("ministerialExams")}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 text-xs font-extrabold transition flex items-center gap-1.5"
                    >
                      <span>{isBadini ? "تاقیکرن ب ڤێ پرسیارێ 🚀" : isKu ? "تاقیکردنەوە لەسەر ئەمە 🚀" : "Test This Topic 🚀"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 4: MATCHED PDF DOCUMENTS */}
      {(activeCategoryFilter === "all" || activeCategoryFilter === "pdfs") && matchedPdfs.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
              <FileDown className="w-5 h-5 text-purple-500" />
              <span>{isBadini ? "مەلزەمە و پەرتووکێن PDF" : isKu ? "مەلزەمە و پەرتووکەکانی PDF" : "PDF Library & Materials"}</span>
              <span className="text-xs font-bold text-slate-400">({matchedPdfs.length})</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {matchedPdfs.map((pdf) => (
              <div
                key={pdf.id}
                className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border flex flex-col justify-between transition-all shadow-md ${
                  isDarkMode ? "bg-[#16182e] border-indigo-900/40 hover:border-purple-500/40" : "bg-white border-slate-200/90 hover:border-purple-400 shadow-sm"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-purple-500/15 text-purple-400 border border-purple-500/30">
                      {getSubjectName(pdf.subjectId)}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{pdf.fileSize} • {pdf.pages} {isBadini ? "لاپەڕە" : isKu ? "لاپەڕە" : "pages"}</span>
                  </div>
                  <h4 className={`text-sm sm:text-base font-extrabold line-clamp-2 leading-tight mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    {isBadini ? pdf.titleBadini : isKu ? pdf.titleKu : pdf.titleEn}
                  </h4>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/60">
                  <button
                    onClick={() => triggerDownloadNotification(isBadini ? pdf.titleBadini : isKu ? pdf.titleKu : pdf.titleEn)}
                    className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black shadow-md flex items-center justify-center gap-2 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isBadini ? "داونلۆد (PDF)" : isKu ? "داونلۆدکردن (PDF)" : "Download PDF"}</span>
                  </button>
                  <button
                    onClick={() => onSelectTab("pdfLibrary")}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
                    title={isBadini ? "چوون بۆ کتێبخانێ" : isKu ? "چوون بۆ کتێبخانە" : "Open Library"}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: MATCHED VIDEO LESSONS */}
      {(activeCategoryFilter === "all" || activeCategoryFilter === "videos") && matchedVideos.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
              <Video className="w-5 h-5 text-violet-500" />
              <span>{isBadini ? "ڤیدیۆیێن شیکاریا وانان" : isKu ? "ڤیدیۆی شیکاری وانەکان" : "Video Explanations"}</span>
              <span className="text-xs font-bold text-slate-400">({matchedVideos.length})</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {matchedVideos.map((vid) => (
              <div
                key={vid.id}
                className={`rounded-3xl border overflow-hidden transition-all shadow-md flex flex-col justify-between ${
                  isDarkMode ? "bg-[#16182e] border-indigo-900/40 hover:border-violet-500/50" : "bg-white border-slate-200/90 hover:border-violet-400 shadow-sm"
                }`}
              >
                <div
                  onClick={() => setActiveVideoPreview(vid)}
                  className="aspect-video w-full bg-slate-900 relative cursor-pointer group overflow-hidden"
                >
                  <img
                    src={vid.thumbnailUrl || "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80"}
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-violet-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-black/80 text-white text-[10px] font-bold">
                    {vid.duration || "15:20"}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-violet-500/15 text-violet-400 border border-violet-500/30">
                        {getSubjectName(vid.subjectId)}
                      </span>
                      <span className="text-[11px] text-slate-400 truncate">
                        {isBadini ? vid.chapterBadini : isKu ? vid.chapterKu : vid.chapterEn}
                      </span>
                    </div>
                    <h4 className={`text-sm font-extrabold line-clamp-2 leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      {isBadini ? vid.titleBadini : isKu ? vid.titleKu : vid.titleEn}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200 dark:border-slate-800/60">
                    <span className="text-xs font-bold text-slate-400 truncate max-w-[140px]">
                      👨‍🏫 {vid.teacherName}
                    </span>
                    <button
                      onClick={() => setActiveVideoPreview(vid)}
                      className="text-xs font-black text-violet-400 hover:text-violet-300 flex items-center gap-1"
                    >
                      <span>{isBadini ? "پێشاندان" : isKu ? "پێشاندان" : "Watch"}</span>
                      <Play className="w-3 h-3 fill-violet-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 6: MATCHED NOTES & FORMULAS */}
      {(activeCategoryFilter === "all" || activeCategoryFilter === "notes") && matchedNotes.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
              <FileText className="w-5 h-5 text-pink-500" />
              <span>{isBadini ? "تێبینی و یاسایێن گرنگ" : isKu ? "تێبینی و یاساکان" : "Notes & Formulas"}</span>
              <span className="text-xs font-bold text-slate-400">({matchedNotes.length})</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {matchedNotes.map((nt) => (
              <div
                key={nt.id}
                onClick={() => onSelectTab("notes")}
                className={`p-5 rounded-3xl border transition-all cursor-pointer shadow-md group ${
                  isDarkMode ? "bg-[#16182e] border-indigo-900/40 hover:border-pink-500/50" : "bg-white border-slate-200/90 hover:border-pink-400 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-pink-500/15 text-pink-400 border border-pink-500/30">
                    {getSubjectName(nt.subjectId)}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{nt.date}</span>
                </div>
                <h4 className={`text-base font-extrabold mb-2 group-hover:text-pink-400 transition ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  {isBadini ? (nt.titleBadini || nt.titleKu) : isKu ? nt.titleKu : nt.titleEn}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed whitespace-pre-line bg-slate-900/30 p-3 rounded-2xl border border-slate-800/40 font-mono">
                  {isBadini ? (nt.contentBadini || nt.contentKu) : isKu ? nt.contentKu : nt.contentEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
