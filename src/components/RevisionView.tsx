import React, { useState, useEffect } from "react";
import {
  RefreshCw,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Flame,
  Zap,
  RotateCcw,
  Clock,
  Target,
  AlertCircle,
  HelpCircle,
  Award,
  ChevronRight,
  ChevronDown,
  Layers,
  Brain,
  Filter,
  Check,
  Plus,
  Minus,
  Trash2,
  Bookmark,
  Timer,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Bell,
  Coffee,
  Calendar,
  CalendarDays,
  CheckSquare,
  ListTodo,
  Maximize2,
  Minimize2
} from "lucide-react";
import { Language, UserProfile } from "../types";
import { SubjectIcon } from "./SubjectIcon";
import { grade12SyllabusData, SyllabusSubject } from "../data/grade12Syllabus";
import { timeSlotPresets } from "../data/timeSlotBackgrounds";

interface RevisionViewProps {
  language: Language;
  user?: UserProfile;
  onStartQuiz?: (subjectId: string) => void;
}

interface Flashcard {
  id: string;
  subjectId: string;
  frontBadini: string;
  frontKu: string;
  frontEn: string;
  backBadini: string;
  backKu: string;
  backEn: string;
  tag: string;
}

interface WeakPoint {
  id: string;
  subjectId: string;
  topicBadini: string;
  topicKu: string;
  topicEn: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

const mockFlashcards: Flashcard[] = [
  {
    id: "f1",
    subjectId: "math",
    frontBadini: "یاسایا تەواوکاری یا پارچە پارچە (Integration by Parts) چییە؟",
    frontKu: "یاسای تەواوکاری بەش بەش (Integration by Parts) چییە؟",
    frontEn: "What is the Integration by Parts formula?",
    backBadini: "∫ u dv = u·v - ∫ v du",
    backKu: "∫ u dv = u·v - ∫ v du",
    backEn: "∫ u dv = u·v - ∫ v du",
    tag: "بیرکاری - تەواوکاری"
  },
  {
    id: "f2",
    subjectId: "physics",
    frontBadini: "یاسایا ئۆمی (Ohm's Law) چی دیار دکەت؟",
    frontKu: "یاسای ئۆم (Ohm's Law) چی دیاری دەکات؟",
    frontEn: "What does Ohm's Law state?",
    backBadini: "V = I × R (ڤۆڵتیە = تەزوو × بەرگری)",
    backKu: "V = I × R (ڤۆڵتیە = تەزوو × بەرگری)",
    backEn: "V = I × R (Voltage = Current × Resistance)",
    tag: "فیزیا - کارەبا"
  },
  {
    id: "f3",
    subjectId: "biology",
    frontBadini: "سیتۆپلازم چییە و جهێ چ کردارانە؟",
    frontKu: "سیتۆپلازم چییە و شوێنی چ کردارێکە؟",
    frontEn: "What is the cytoplasm and its function?",
    backBadini: "پێکبهاتەیەکێ شلەیە د ناڤبەرا پەردەیا خانەیی و ناوکێ دا کو کارلێکێن کیمیایی تێدا ڕووددەن.",
    backKu: "پێکهاتەیەکی شلەیە لەنێوان پەردەی خانە و ناوک دا کە کارلێکە کیمیاییەکانی تێدا ڕوودەدەن.",
    backEn: "Fluid substance between cell membrane and nucleus where metabolic processes occur.",
    tag: "زیندەوەر - خانە"
  },
  {
    id: "f4",
    subjectId: "chemistry",
    frontBadini: "یاسایا گازی بێگەرد (Ideal Gas Law) چییە؟",
    frontKu: "یاسای گازی بێگەرد (Ideal Gas Law) چییە؟",
    frontEn: "What is the Ideal Gas Law equation?",
    backBadini: "P·V = n·R·T (پەستان × قەبارە = مۆڵ × نەگۆڕی گازی × پلەیا گەرمیێ)",
    backKu: "P·V = n·R·T (پەستان × قەبارە = مۆڵ × نەگۆڕی گازی × پلەی گەرمی)",
    backEn: "P·V = n·R·T",
    tag: "کیمیا - گازەکان"
  },
  {
    id: "f5",
    subjectId: "english",
    frontBadini: "یاسایا If Clause Type 3 جەوا دروست دبیت؟",
    frontKu: "یاسای If Clause Type 3 چۆن دروست دەبێت؟",
    frontEn: "What is the structure of If Clause Type 3?",
    backBadini: "If + Past Perfect (had + V3), Subject + would/could + have + V3",
    backKu: "If + Past Perfect (had + V3), Subject + would/could + have + V3",
    backEn: "If + Past Perfect (had + V3), Subject + would/could + have + V3",
    tag: "ئینگلیزی - Grammar"
  },
  {
    id: "f6",
    subjectId: "kurdish",
    frontBadini: "جۆرێن ئاوەڵناو د زمانێ کوردی دا کیژکن؟",
    frontKu: "جۆرەکانی ئاوەڵناو لە زمانی کوردی دا کامانەن؟",
    frontEn: "What are the types of adjectives in Kurdish?",
    backBadini: "ئاوەڵناوا چۆنیەتی، بڕیی، ئاماژەیی، ژمارەیی، و پرسیاری.",
    backKu: "ئاوەڵناوی چۆنیەتی، بڕیی، ئاماژەیی، ژمارەیی، و پرسیاری.",
    backEn: "Descriptive, Quantitative, Demonstrative, Numeral, and Interrogative Adjectives.",
    tag: "کوردی - ڕێزمان"
  },
  {
    id: "f7",
    subjectId: "arabic",
    frontBadini: "مەنتوقا (كان وأخواتها) چییە د ڕێزمانێ دا؟",
    frontKu: "مەنتوقی (كان وأخواتها) چییە لە ڕێزماندا؟",
    frontEn: "What is the rule of 'Kana and its sisters'?",
    backBadini: "تدخل على الجملة الاسمية فترفع المبتدأ اسماً لها وتنصب الخبر خبراً لها.",
    backKu: "تدخل على الجملة الاسمية فترفع المبتدأ اسماً لها وتنصب الخبر خبراً لها.",
    backEn: "Enters nominal sentences, keeping subject nominative and predicate accusative.",
    tag: "عەرەبی - القواعد"
  }
];

export const RevisionView: React.FC<RevisionViewProps> = ({
  language,
  onStartQuiz
}) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";

  const [activeTab, setActiveTab] = useState<"tracker" | "flashcards" | "mistakes" | "blitz" | "timer" | "planner">("tracker");
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>("all");

  // Daily Planner State
  const [plannerDate, setPlannerDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [plannerSubject, setPlannerSubject] = useState<string>("biology");
  const [plannerTimeSlot, setPlannerTimeSlot] = useState<string>("08:00 AM - 10:00 AM");
  const [plannerText, setPlannerText] = useState<string>("");
  const [plannerPriority, setPlannerPriority] = useState<"high" | "medium" | "normal">("high");
  const [startTime, setStartTime] = useState<string>("08:00 AM");
  const [endTime, setEndTime] = useState<string>("10:00 AM");
  const [openStartDropdown, setOpenStartDropdown] = useState<boolean>(false);
  const [openEndDropdown, setOpenEndDropdown] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>("#86E3CE");

  const timeOptions = [
    "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
    "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"
  ];

  const pastelColors = [
    { code: "#CCABD8", label: "Purple" },
    { code: "#FA897B", label: "Peach" },
    { code: "#FFDD94", label: "Yellow" },
    { code: "#D0E6A5", label: "Green" },
    { code: "#86E3CE", label: "Mint" },
  ];

  const [dailyPlannerTasks, setDailyPlannerTasks] = useState<
    Array<{ id: string; date: string; subjectId: string; timeSlot: string; taskText: string; completed: boolean; priority: "high" | "medium" | "normal" }>
  >(() => {
    try {
      const saved = localStorage.getItem("grade12_daily_study_plan");
      const today = new Date().toISOString().split("T")[0];
      if (saved) {
        return JSON.parse(saved);
      }
      return [
        { id: "dp_1", date: today, subjectId: "biology", timeSlot: "08:00 AM - 10:00 AM", taskText: "مراجەعەیا زیندەوەر - بەندێ 1 (پێکاتیا خانەیێ)", completed: true, priority: "high" },
        { id: "dp_2", date: today, subjectId: "math", timeSlot: "10:30 AM - 12:30 PM", taskText: "دەستنیشانکرن و چارەسەرکرنا 15 پرسیارێن وزاری یێن بیرکاری", completed: false, priority: "high" },
        { id: "dp_3", date: today, subjectId: "physics", timeSlot: "02:00 PM - 04:00 PM", taskText: "مراجەعەیا یاسایێن فیزیا - بەندێ 2", completed: false, priority: "medium" },
        { id: "dp_4", date: today, subjectId: "english", timeSlot: "05:00 PM - 06:30 PM", taskText: "خویندنا وشەیێن Unit 1 & Unit 2 ئینگلیزی", completed: false, priority: "normal" }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("grade12_daily_study_plan", JSON.stringify(dailyPlannerTasks));
    } catch (e) {
      console.error(e);
    }
  }, [dailyPlannerTasks]);

  const handleAddPlannerTask = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!plannerText.trim()) return;

    const formattedTimeSlot = (startTime && endTime) ? `${startTime} - ${endTime}` : plannerTimeSlot || "08:00 AM - 10:00 AM";

    const newTask = {
      id: "dp_" + Date.now(),
      date: plannerDate,
      subjectId: plannerSubject,
      timeSlot: formattedTimeSlot,
      taskText: plannerText.trim(),
      completed: false,
      priority: plannerPriority,
      color: selectedColor
    };

    setDailyPlannerTasks((prev) => [newTask, ...prev]);
    setPlannerText("");
  };

  const togglePlannerTask = (id: string) => {
    setDailyPlannerTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deletePlannerTask = (id: string) => {
    setDailyPlannerTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddExamPresetTasks = () => {
    const today = plannerDate;
    const presets = [
      { id: "preset_1_" + Date.now(), date: today, subjectId: "biology", timeSlot: "08:00 AM - 10:30 AM", taskText: "مراجەعەیا بەندێ ١ و ٢ (زیندەوەر + حلکرنا پرسیارێن وزاری)", completed: false, priority: "high" as const },
      { id: "preset_2_" + Date.now(), date: today, subjectId: "math", timeSlot: "11:00 AM - 01:00 PM", taskText: "شیکارکرنا تاقیکرنێن وزاریا ساڵێن بوردی (بیرکاری)", completed: false, priority: "high" as const },
      { id: "preset_3_" + Date.now(), date: today, subjectId: "physics", timeSlot: "02:30 PM - 04:30 PM", taskText: "پێداچوونا یاسا و دیارکرنا هەڵەیێن بەربەلاڤ (فیزیا)", completed: false, priority: "medium" as const },
      { id: "preset_4_" + Date.now(), date: today, subjectId: "english", timeSlot: "07:30 PM - 09:00 PM", taskText: "مراجەعەیا ڕێزمان و ڕستەسازی (ئینگلیزی)", completed: false, priority: "normal" as const }
    ];

    setDailyPlannerTasks((prev) => [...presets, ...prev]);
  };

  // Study Timer & Pomodoro State
  const [timerMode, setTimerMode] = useState<"pomodoro" | "deepwork" | "shortBreak" | "longBreak" | "custom">("pomodoro");
  const [timerSeconds, setTimerSeconds] = useState<number>(25 * 60);
  const [initialSeconds, setInitialSeconds] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [selectedTimerSubject, setSelectedTimerSubject] = useState<string>("physics");
  const [ambientSound, setAmbientSound] = useState<boolean>(false);
  const [customInputMinutes, setCustomInputMinutes] = useState<number>(45);

  // Chapter, Lesson & Topics state for timer session
  const [timerSelectedChapter, setTimerSelectedChapter] = useState<string>("phys-ch1");
  const [timerSelectedSection, setTimerSelectedSection] = useState<string>("phys-ch1-sec1");
  const [timerTopicsText, setTimerTopicsText] = useState<string>("شیکارکرنا یاسایێن فیزیا + حلکرنا پرسیارێن وزاری");
  const [studyLogFilterSubject, setStudyLogFilterSubject] = useState<string>("all");
  const [sessionToast, setSessionToast] = useState<string | null>(null);
  const [isFullScreenFocus, setIsFullScreenFocus] = useState<boolean>(false);

  const [completedPomodoros, setCompletedPomodoros] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("grade12_completed_pomodoros");
      return saved ? parseInt(saved, 10) : 3;
    } catch {
      return 3;
    }
  });

  const [totalFocusMinutes, setTotalFocusMinutes] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("grade12_total_focus_minutes");
      return saved ? parseInt(saved, 10) : 75;
    } catch {
      return 75;
    }
  });

  const [studyLogs, setStudyLogs] = useState<Array<{
    id: string;
    subjectId: string;
    chapterTitle?: string;
    lessonTitle?: string;
    topicsText?: string;
    durationMinutes: number;
    timestamp: string;
    date?: string;
  }>>(() => {
    try {
      const saved = localStorage.getItem("grade12_study_logs");
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: "log_1",
              subjectId: "physics",
              chapterTitle: "بەندێ ٢: ئیندەکشەنا کارۆمۆگناتیسی",
              lessonTitle: "پشکا ٢.١: یاسایا فارادای و لێنز",
              topicsText: "خویندنا یاسایان + شیکارکرنا ۵ پرسیارێن وزاری",
              durationMinutes: 25,
              timestamp: "10:30 AM",
              date: new Date().toLocaleDateString()
            },
            {
              id: "log_2",
              subjectId: "arabic",
              chapterTitle: "القواعد: النحو والصرف",
              lessonTitle: "الدرس الأول: كان وأخواتها",
              topicsText: "پێداچوونا ڕێزمانێ + حلکرنا ڕستەیێن نموونه‌یی",
              durationMinutes: 50,
              timestamp: "11:15 AM",
              date: new Date().toLocaleDateString()
            },
            {
              id: "log_3",
              subjectId: "islamic",
              chapterTitle: "بەشێ ئاینی: تەفسیر و فەرموودە",
              lessonTitle: "پشکا ١: فەرموودەیێن سەرەکی",
              topicsText: "لەبەرمەندکرن و ژبەرکرنا وشە و مەعنایان",
              durationMinutes: 25,
              timestamp: "02:00 PM",
              date: new Date().toLocaleDateString()
            }
          ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("grade12_completed_pomodoros", completedPomodoros.toString());
    } catch (e) { console.error(e); }
  }, [completedPomodoros]);

  useEffect(() => {
    try {
      localStorage.setItem("grade12_total_focus_minutes", totalFocusMinutes.toString());
    } catch (e) { console.error(e); }
  }, [totalFocusMinutes]);

  useEffect(() => {
    try {
      localStorage.setItem("grade12_study_logs", JSON.stringify(studyLogs));
    } catch (e) { console.error(e); }
  }, [studyLogs]);

  const handleSelectTimerSubject = (subjId: string) => {
    setSelectedTimerSubject(subjId);
    const subjSyllabus = grade12SyllabusData.find((s) => s.id === subjId);
    if (subjSyllabus && subjSyllabus.chapters.length > 0) {
      const firstCh = subjSyllabus.chapters[0];
      setTimerSelectedChapter(firstCh.id);
      if (firstCh.sections.length > 0) {
        setTimerSelectedSection(firstCh.sections[0].id);
      } else {
        setTimerSelectedSection("");
      }
    } else {
      setTimerSelectedChapter("");
      setTimerSelectedSection("");
    }
  };

  const handleSaveCurrentStudySession = (overrideMins?: number) => {
    const currentSyllabusSubj = grade12SyllabusData.find((s) => s.id === selectedTimerSubject);
    const selectedChObj = currentSyllabusSubj?.chapters.find((ch) => ch.id === timerSelectedChapter);
    const selectedSecObj = selectedChObj?.sections.find((sec) => sec.id === timerSelectedSection);
    const subjObj = subjectsList.find((s) => s.id === selectedTimerSubject);
    const subjName = subjObj ? (isBadini ? subjObj.nameBadini : isKu ? subjObj.nameKu : subjObj.nameEn) : selectedTimerSubject;

    const chName = selectedChObj
      ? `${selectedChObj.chapterNumber}: ${isBadini ? selectedChObj.titleBadini : isKu ? selectedChObj.titleKu : selectedChObj.titleEn}`
      : (timerSelectedChapter || (isBadini ? "بەندێ دیارنەکری" : "بەندی دیارینەکراو"));

    const secName = selectedSecObj
      ? (isBadini ? selectedSecObj.titleBadini : isKu ? selectedSecObj.titleKu : selectedSecObj.titleEn)
      : (timerSelectedSection || (isBadini ? "هەموو وانەکان" : "هەموو وانەکان"));

    const topicsNotes = timerTopicsText.trim() || (isBadini ? "پێداچوونا گشتی و شیکارکرنا پرسیارێن وزاری" : "پێداچوونەوەی گشتی و شیکارکردنی پرسیارەکان");

    const duration = overrideMins && overrideMins > 0 ? overrideMins : Math.round(initialSeconds / 60) || 25;

    const newLog = {
      id: "log_" + Date.now(),
      subjectId: selectedTimerSubject,
      chapterTitle: chName,
      lessonTitle: secName,
      topicsText: topicsNotes,
      durationMinutes: duration,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString(isBadini || isKu ? 'ar-EG' : 'en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      })
    };

    setCompletedPomodoros((prev) => prev + 1);
    setTotalFocusMinutes((prev) => prev + duration);
    setStudyLogs((prev) => [newLog, ...prev]);

    // Auto-increment revision counts for tracker!
    changeSubjectRevCount(selectedTimerSubject, 1);
    if (timerSelectedChapter) {
      changeChapterRevCount(timerSelectedChapter, 1);
    }
    if (timerSelectedSection) {
      changeLessonRevCount(timerSelectedSection, 1);
    }

    setSessionToast(
      isBadini
        ? `تۆمارا پێداچوونا (${subjName}) ب سەرکەفتن هاتە سەیڤکرن دگەل مێژوویا خویندنێ! 💾`
        : `تۆماری پێداچوونەوەی (${subjName}) بەسەرکەوتوویی پاشەکەوت کرا! 💾`
    );

    setTimeout(() => {
      setSessionToast(null);
    }, 4500);
  };

  const playTimerChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.18); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.9);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.9);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (isTimerRunning && timerSeconds === 0) {
      setIsTimerRunning(false);
      playTimerChime();

      const studiedMin = Math.round(initialSeconds / 60);
      if (studiedMin > 0 && (timerMode === "pomodoro" || timerMode === "deepwork" || timerMode === "custom")) {
        handleSaveCurrentStudySession(studiedMin);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, initialSeconds, timerMode, selectedTimerSubject, timerSelectedChapter, timerSelectedSection, timerTopicsText]);

  const handleSelectTimerMode = (mode: string, durationMin?: number) => {
    setIsTimerRunning(false);
    setTimerMode(mode);
    let secs = 25 * 60;
    if (mode === "pomodoro") secs = 25 * 60;
    else if (mode === "deepwork") secs = 50 * 60;
    else if (mode === "shortBreak") secs = 5 * 60;
    else if (mode === "longBreak") secs = 15 * 60;
    else if (mode === "custom") secs = (durationMin || customInputMinutes) * 60;

    setTimerSeconds(secs);
    setInitialSeconds(secs);
  };

  // Local state for Revision Tracker
  const [revision1Progress, setRevision1Progress] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("grade12_rev1_progress");
      return saved ? JSON.parse(saved) : { math: true, physics: false, biology: true, chemistry: false };
    } catch {
      return { math: true, physics: false, biology: true, chemistry: false };
    }
  });

  const [revision2Progress, setRevision2Progress] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("grade12_rev2_progress");
      return saved ? JSON.parse(saved) : { math: false, physics: false, biology: false, chemistry: false };
    } catch {
      return { math: false, physics: false, biology: false, chemistry: false };
    }
  });

  // Flashcards flipped state
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Detailed Syllabus subject chapter view
  const [selectedDetailSubject, setSelectedDetailSubject] = useState<string>("biology");
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    "bio-ch1": true,
    "math-p1": true,
    "phys-ch1": true,
    "chem-ch1": true,
    "eng-reading": true,
    "kurd-grammar": true,
    "arab-grammar": true,
    "rel-quran": true
  });

  // Subject revision count state (ژمارەیا مراجەعەکرنا بابەتێ)
  const [subjectRevCounts, setSubjectRevCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("grade12_subject_rev_counts");
      return saved ? JSON.parse(saved) : { biology: 2, math: 1, physics: 1, chemistry: 1 };
    } catch {
      return { biology: 2, math: 1, physics: 1, chemistry: 1 };
    }
  });

  // Chapter revision count state (ژمارەیا مراجەعەکرنا بەندێ / بەشێ)
  const [chapterRevCounts, setChapterRevCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("grade12_chapter_rev_counts");
      return saved ? JSON.parse(saved) : { "bio-ch1": 2, "math-p1": 1 };
    } catch {
      return { "bio-ch1": 2, "math-p1": 1 };
    }
  });

  // Lesson revision count state (ژمارەیا مراجەعەکرنا وانەیێ)
  const [lessonRevCounts, setLessonRevCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("grade12_lesson_rev_counts");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("grade12_subject_rev_counts", JSON.stringify(subjectRevCounts));
    } catch (e) {
      console.error(e);
    }
  }, [subjectRevCounts]);

  useEffect(() => {
    try {
      localStorage.setItem("grade12_chapter_rev_counts", JSON.stringify(chapterRevCounts));
    } catch (e) {
      console.error(e);
    }
  }, [chapterRevCounts]);

  useEffect(() => {
    try {
      localStorage.setItem("grade12_lesson_rev_counts", JSON.stringify(lessonRevCounts));
    } catch (e) {
      console.error(e);
    }
  }, [lessonRevCounts]);

  const changeSubjectRevCount = (subjId: string, delta: number) => {
    setSubjectRevCounts((prev) => {
      const cur = prev[subjId] || 0;
      return { ...prev, [subjId]: Math.max(0, cur + delta) };
    });
  };

  const changeChapterRevCount = (chId: string, delta: number) => {
    setChapterRevCounts((prev) => {
      const cur = prev[chId] || 0;
      return { ...prev, [chId]: Math.max(0, cur + delta) };
    });
  };

  const changeLessonRevCount = (lessonId: string, delta: number) => {
    setLessonRevCounts((prev) => {
      const cur = prev[lessonId] || 0;
      return { ...prev, [lessonId]: Math.max(0, cur + delta) };
    });
  };

  const toggleChapter = (chId: string) => {
    setExpandedChapters((prev) => ({ ...prev, [chId]: !prev[chId] }));
  };

  const activeSubjectData = grade12SyllabusData.find((s) => s.id === selectedDetailSubject) || grade12SyllabusData[0];

  // Weak points log
  const [weakPoints, setWeakPoints] = useState<WeakPoint[]>(() => {
    try {
      const saved = localStorage.getItem("grade12_weak_points");
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: "wp1",
              subjectId: "math",
              topicBadini: "تەواوکاری ب ڕێکا گۆڕینا گۆڕاو (Substitution)",
              topicKu: "تەواوکاری بە ڕێگەی گۆڕینی گۆڕاو",
              topicEn: "Integration by Substitution",
              priority: "high",
              completed: false
            },
            {
              id: "wp2",
              subjectId: "physics",
              topicBadini: "شیکارکرنا یاسایا هێزا لوڕێنتز د بوارێن کارەبایی و موگناتیسی دا",
              topicKu: "شیکارکردنی یاسای هێزی لۆرێنتز",
              topicEn: "Lorentz Force Applications",
              priority: "high",
              completed: false
            },
            {
              id: "wp3",
              subjectId: "chemistry",
              topicBadini: "یاسایا هێس (Hess's Law) د کیمیایا گەرمی دا",
              topicKu: "یاسای هێس لە کیمیای گەرمیدا",
              topicEn: "Hess's Law Equations",
              priority: "medium",
              completed: true
            }
          ];
    } catch {
      return [];
    }
  });

  const [newTopicText, setNewTopicText] = useState("");
  const [newTopicSubject, setNewTopicSubject] = useState("math");

  useEffect(() => {
    try {
      localStorage.setItem("grade12_rev1_progress", JSON.stringify(revision1Progress));
    } catch (e) {
      console.error(e);
    }
  }, [revision1Progress]);

  useEffect(() => {
    try {
      localStorage.setItem("grade12_rev2_progress", JSON.stringify(revision2Progress));
    } catch (e) {
      console.error(e);
    }
  }, [revision2Progress]);

  useEffect(() => {
    try {
      localStorage.setItem("grade12_weak_points", JSON.stringify(weakPoints));
    } catch (e) {
      console.error(e);
    }
  }, [weakPoints]);

  const toggleRev1 = (subjId: string) => {
    setRevision1Progress((prev) => ({ ...prev, [subjId]: !prev[subjId] }));
  };

  const toggleRev2 = (subjId: string) => {
    setRevision2Progress((prev) => ({ ...prev, [subjId]: !prev[subjId] }));
  };

  const toggleCardFlip = (cardId: string) => {
    setFlippedCards((prev) => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  const handleAddWeakPoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicText.trim()) return;
    const newItem: WeakPoint = {
      id: "wp_" + Date.now(),
      subjectId: newTopicSubject,
      topicBadini: newTopicText,
      topicKu: newTopicText,
      topicEn: newTopicText,
      priority: "high",
      completed: false
    };
    setWeakPoints([newItem, ...weakPoints]);
    setNewTopicText("");
  };

  const toggleWeakPointComplete = (id: string) => {
    setWeakPoints(
      weakPoints.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const deleteWeakPoint = (id: string) => {
    setWeakPoints(weakPoints.filter((item) => item.id !== id));
  };

  const subjectsList = [
    { id: "biology", nameBadini: "زیندەوەرناسی", nameKu: "زیندەوەرناسی", nameEn: "Biology", color: "from-purple-600 to-indigo-600" },
    { id: "math", nameBadini: "بیرکاری", nameKu: "بیرکاری", nameEn: "Mathematics", color: "from-emerald-600 to-teal-600" },
    { id: "physics", nameBadini: "فیزیا", nameKu: "فیزیا", nameEn: "Physics", color: "from-blue-600 to-indigo-600" },
    { id: "chemistry", nameBadini: "کیمیا", nameKu: "کیمیا", nameEn: "Chemistry", color: "from-sky-500 to-cyan-600" },
    { id: "english", nameBadini: "ئینگلیزی", nameKu: "ئینگلیزی", nameEn: "English", color: "from-amber-500 to-orange-600" },
    { id: "kurdish", nameBadini: "کوردی", nameKu: "کوردی", nameEn: "Kurdish", color: "from-emerald-500 to-green-600" },
    { id: "arabic", nameBadini: "عەرەبی", nameKu: "عەرەبی", nameEn: "Arabic", color: "from-rose-500 to-red-600" },
    { id: "islamic", nameBadini: "ئیسلامی", nameKu: "ئیسلامی", nameEn: "Islamic", color: "from-teal-600 to-emerald-700" }
  ];

  const totalRev1Done = Object.values(revision1Progress).filter(Boolean).length;
  const totalRev2Done = Object.values(revision2Progress).filter(Boolean).length;

  const filteredCards = selectedSubjectFilter === "all"
    ? mockFlashcards
    : mockFlashcards.filter((c) => c.subjectId === selectedSubjectFilter);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-indigo-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2.5 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>
              {isBadini
                ? "سیستەمێ بەهێزا پێداچوونێ و مراجەعێ (Revision Hub)"
                : isKu
                ? "سیستەمی بەهێزی پێداچوونەوە و مراجەعە (Revision Hub)"
                : "Advanced Revision & Review Engine"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <span>
              {isBadini
                ? "بەشێ پێداچوونێ و مراجەعەیا وزاری 🔄"
                : isKu
                ? "بەشی پێداچوونەوە و مراجەعەی وزاری 🔄"
                : "Revision & Exam Review Hub 🔄"}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-bold leading-relaxed">
            {isBadini
              ? "پێداچوونا ۱ (مراجەعەیا هیر)، پێداچوونا ۲ (حلکردنا پرسیاران)، فلاش کاردێن یاسایان، و تۆمارا خاڵێن لاواز هەمی د ئێک جھ دا!"
              : isKu
              ? "پێداچوونەوەی ۱ (مراجەعەی ورد)، پێداچوونەوەی ۲ (پرسیار)، فلاش کاردی یاساکان، و تۆماری خاڵە لاوازەکان لە یەک شوێندا!"
              : "Track Revision Phase 1 & 2, master formulas with flashcards, and revise weak topics effectively."}
          </p>
        </div>

        {/* Top Quick Stats Badge */}
        <div className="flex flex-wrap md:flex-col gap-2.5 shrink-0 relative z-10 w-full md:w-auto">
          <div className="bg-slate-800/90 px-4 py-2.5 rounded-2xl border border-slate-700 flex items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-300">
              {isBadini ? "مراجەعەیا ۱:" : isKu ? "مراجەعەی ۱:" : "Revision 1:"}
            </span>
            <span className="text-sm font-black font-mono text-amber-400">
              {totalRev1Done} / {subjectsList.length} {isBadini || isKu ? "وانە" : "Subj"}
            </span>
          </div>

          <div className="bg-slate-800/90 px-4 py-2.5 rounded-2xl border border-slate-700 flex items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-300">
              {isBadini ? "مراجەعەیا ۲:" : isKu ? "مراجەعەی ۲:" : "Revision 2:"}
            </span>
            <span className="text-sm font-black font-mono text-emerald-400">
              {totalRev2Done} / {subjectsList.length} {isBadini || isKu ? "وانە" : "Subj"}
            </span>
          </div>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab("tracker")}
          className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === "tracker"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Target className="w-4 h-4" />
          <span>{isBadini ? "١. خشتەیێ مراجەعێ (Revision Plan)" : isKu ? "١. خشتەی مراجەعە (Revision Plan)" : "1. Revision Plan"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("flashcards")}
          className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === "flashcards"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{isBadini ? "٢. فلاش کاردێن یاسایان (Flashcards)" : isKu ? "٢. فلاش کاردی یاساکان (Flashcards)" : "2. Formula Flashcards"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("mistakes")}
          className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === "mistakes"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <AlertCircle className="w-4 h-4 text-rose-500" />
          <span>{isBadini ? "٣. خاڵێن لاواز (Weakness Review Log)" : isKu ? "٣. خاڵە لاوازەکان (Weakness Log)" : "3. Weakness Log"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("blitz")}
          className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === "blitz"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>{isBadini ? "٤. مراجەعەیا بپەلە (Exam Blitz Test)" : isKu ? "٤. مراجەعەی بەپەلە (Exam Blitz)" : "4. Fast Blitz Test"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("timer")}
          className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === "timer"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Timer className="w-4 h-4 text-emerald-400" />
          <span>{isBadini ? "٥. تایمەرێ خویندنێ و پۆمۆدۆرۆ (Study Timer)" : isKu ? "٥. تایمەری خوێندن و پۆمۆدۆرۆ (Study Timer)" : "5. Study Timer & Pomodoro"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("planner")}
          className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === "planner"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <CalendarDays className="w-4 h-4 text-purple-500" />
          <span>{isBadini ? "٦. پلانا رۆژانە (Daily Study Plan)" : isKu ? "٦. پلانی ڕۆژانە (Daily Study Plan)" : "6. Daily Study Plan"}</span>
        </button>
      </div>

      {/* TAB 1: REVISION PLAN & TRACKER */}
      {activeTab === "tracker" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{isBadini ? "دابەشکرنا مراجەعەیا ۱ و ۲ یا وانان" : isKu ? "دابەشکردنی مراجەعەی ۱ و ۲ ی وانەکان" : "Revision Phase 1 & 2 Subject Tracker"}</span>
                </h3>
                <p className="text-xs text-slate-500 font-bold">
                  {isBadini
                    ? "کلیک ل سەر هەر چوارگۆشەیەکێ بکە بۆ تۆمارکردنا تەمامکرنا مراجەعەیا ۱ (خواندنا هیر) یان مراجەعەیا ۲ (شیکارکرنا پرسیاران)"
                    : isKu
                    ? "کلیک لەسەر هەر چوارگۆشەیەک بکە بۆ تۆمارکردنی مراجەعەی ۱ یان ۲"
                    : "Toggle completion status for Revision Phase 1 and Phase 2 per subject"}
                </p>
              </div>
            </div>

            {/* Table of Subjects & Revisions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjectsList.map((subj) => {
                const isRev1Done = !!revision1Progress[subj.id];
                const isRev2Done = !!revision2Progress[subj.id];
                const subjName = isBadini ? subj.nameBadini : isKu ? subj.nameKu : subj.nameEn;

                return (
                  <div
                    key={subj.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <SubjectIcon subjectId={subj.id} size="md" />
                      <div>
                        <h4 className="font-black text-slate-900 text-sm">{subjName}</h4>
                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 mt-0.5">
                          <span className={isRev1Done ? "text-emerald-600 font-extrabold" : "text-slate-400"}>
                            {isRev1Done ? "✓ مراجەعەیا ۱" : "• مراجەعەیا ۱"}
                          </span>
                          <span>•</span>
                          <span className={isRev2Done ? "text-indigo-600 font-extrabold" : "text-slate-400"}>
                            {isRev2Done ? "✓ مراجەعەیا ۲" : "• مراجەعەیا ۲"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Checkbox Rev 1 */}
                      <button
                        type="button"
                        onClick={() => toggleRev1(subj.id)}
                        className={`px-3 py-2 rounded-2xl text-xs font-black transition cursor-pointer border flex items-center gap-1.5 ${
                          isRev1Done
                            ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                            : "bg-white text-slate-800 border-slate-300 hover:bg-slate-100"
                        }`}
                      >
                        <Check className={`w-4 h-4 ${isRev1Done ? "stroke-[3]" : "opacity-40"}`} />
                        <span>Rev 1</span>
                      </button>

                      {/* Checkbox Rev 2 */}
                      <button
                        type="button"
                        onClick={() => toggleRev2(subj.id)}
                        className={`px-3 py-2 rounded-2xl text-xs font-black transition cursor-pointer border flex items-center gap-1.5 ${
                          isRev2Done
                            ? "bg-indigo-600 text-white border-indigo-700 shadow-xs"
                            : "bg-white text-slate-800 border-slate-300 hover:bg-slate-100"
                        }`}
                      >
                        <Check className={`w-4 h-4 ${isRev2Done ? "stroke-[3]" : "opacity-40"}`} />
                        <span>Rev 2</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Syllabus Chapters & Lessons Section */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-600" />
                  <span>
                    {isBadini
                      ? "بەشێن هەمی وانەیان و وانەیێن وان ب وردی (Chapters & Lessons)"
                      : isKu
                      ? "بەشەکانی هەموو وانەکان و وانەکانیان بە وردی"
                      : "Detailed Subject Chapters & Lessons"}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 font-bold">
                  {isBadini
                    ? "وانەیەکێ هەڵبژێرە دا هەموو بەندێن (بەشێن) وی و وانەیێن وی یێن وزاری ب بینی"
                    : isKu
                    ? "وانەیەک هەڵبژێرە تا هەموو بەندەکان و وانە وزارییەکانی ببینی"
                    : "Select a subject to view all its chapters, sections, and ministerial lesson topics"}
                </p>
              </div>

              <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono shrink-0">
                8 {isBadini || isKu ? "وانەیێن پۆلا ١٢" : "Subjects"}
              </span>
            </div>

            {/* Subject Selector Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {grade12SyllabusData.map((subj) => {
                const isSelected = selectedDetailSubject === subj.id;
                const subjName = isBadini ? subj.nameBadini : isKu ? subj.nameKu : subj.nameEn;

                return (
                  <button
                    key={subj.id}
                    type="button"
                    onClick={() => setSelectedDetailSubject(subj.id)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-black transition cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 border ${
                      isSelected
                        ? "bg-slate-900 text-amber-300 border-slate-800 shadow-md ring-2 ring-indigo-500/50"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <SubjectIcon subjectId={subj.id} size="sm" />
                    <span>{subjName}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Subject Strategy Banner */}
            <div className="bg-gradient-to-r from-indigo-50 via-slate-50 to-amber-50 p-4 rounded-2xl border border-indigo-100/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <SubjectIcon subjectId={activeSubjectData.id} size="sm" />
                  <h4 className="text-sm font-black text-slate-900">
                    {isBadini ? activeSubjectData.nameBadini : isKu ? activeSubjectData.nameKu : activeSubjectData.nameEn}
                  </h4>
                  <span className="text-xs font-bold text-slate-500 font-mono">
                    ({activeSubjectData.chapters.length} {isBadini || isKu ? "بەند/بەش" : "Chapters"} • {activeSubjectData.totalSections} {isBadini || isKu ? "وانە/پشک" : "Lessons"})
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-700">
                  🎯 {isBadini ? activeSubjectData.ministerialStrategyBadini : isKu ? activeSubjectData.ministerialStrategyKu : activeSubjectData.ministerialStrategyEn}
                </p>
              </div>
            </div>

            {/* Chapters Accordion List */}
            <div className="space-y-3">
              {activeSubjectData.chapters.map((ch) => {
                const isExpanded = !!expandedChapters[ch.id];
                const chTitle = isBadini ? ch.titleBadini : isKu ? ch.titleKu : ch.titleEn;
                const chRevCount = chapterRevCounts[ch.id] || 0;

                return (
                  <div key={ch.id} className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
                    {/* Chapter Header */}
                    <div className="p-4 bg-slate-50 hover:bg-slate-100/80 transition flex items-center justify-between gap-3 select-none">
                      <div
                        onClick={() => toggleChapter(ch.id)}
                        className="flex items-center gap-3 cursor-pointer flex-1"
                      >
                        <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xs font-mono shrink-0 shadow-xs">
                          {ch.sectionsCount}
                        </div>
                        <div>
                          <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                            {ch.chapterNumber}
                          </span>
                          <h5 className="font-black text-slate-900 text-sm mt-0.5">{chTitle}</h5>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {/* Chapter Revision Counter Control */}
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-300 shadow-xs"
                        >
                          <span className="text-xs font-black text-slate-700 px-1 hidden sm:inline">
                            {isBadini ? "مراجەعەیا بەشێ:" : isKu ? "مراجەعەی بەش:" : "Ch Rev:"}
                          </span>
                          <button
                            type="button"
                            onClick={() => changeChapterRevCount(ch.id, -1)}
                            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center font-black text-xs transition cursor-pointer"
                            title="کێمکرنا مراجەعەکرنا بەشێ"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs sm:text-sm font-black font-mono text-emerald-800 bg-emerald-50 py-0.5 rounded-md border border-emerald-200">
                            {chRevCount} {isBadini || isKu ? "جار" : "revs"}
                          </span>
                          <button
                            type="button"
                            onClick={() => changeChapterRevCount(ch.id, 1)}
                            className="w-7 h-7 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center font-black text-xs transition cursor-pointer shadow-xs"
                            title="زێدەکرنا مراجەعەکرنا بەشێ"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div
                          onClick={() => toggleChapter(ch.id)}
                          className="flex items-center gap-1 cursor-pointer"
                        >
                          <span className="text-xs font-bold text-slate-500 font-mono hidden md:inline">
                            {ch.sections.length} {isBadini || isKu ? "وانە" : "Lessons"}
                          </span>
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-slate-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-600" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Lessons / Sections inside Chapter */}
                    {isExpanded && (
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-slate-100 bg-white">
                        {ch.sections.map((sec) => {
                          const secTitle = isBadini ? sec.titleBadini : isKu ? sec.titleKu : sec.titleEn;
                          const lessonRevCount = lessonRevCounts[sec.id] || 0;

                          return (
                            <div
                              key={sec.id}
                              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition flex items-center justify-between gap-3"
                            >
                              <div className="space-y-1">
                                <p className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                                  {secTitle}
                                </p>
                                {sec.weightMinisterial && (
                                  <span className="inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                                    ⚖️ {sec.weightMinisterial}
                                  </span>
                                )}
                              </div>

                              {/* Lesson Revision Counter Control */}
                              <div className="flex items-center gap-1 bg-white p-1.5 rounded-xl border border-slate-300 shrink-0 shadow-xs">
                                <button
                                  type="button"
                                  onClick={() => changeLessonRevCount(sec.id, -1)}
                                  className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 flex items-center justify-center font-black text-xs transition cursor-pointer"
                                  title="کێمکرنا مراجەعەکرنا وانەیێ"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-1.5 text-xs font-black font-mono text-indigo-900 bg-indigo-50 py-0.5 rounded-md border border-indigo-100">
                                  {lessonRevCount} {isBadini || isKu ? "جار" : "times"}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => changeLessonRevCount(sec.id, 1)}
                                  className="w-6 h-6 rounded-md bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white flex items-center justify-center font-black text-xs transition cursor-pointer shadow-xs"
                                  title="زێدەکرنا مراجەعەکرنا وانەیێ"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FLASHCARDS */}
      {activeTab === "flashcards" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>{isBadini ? "فلاش کاردێن یاسایان و خاڵێن هەستیار" : isKu ? "فلاش کاردی یاساکان و خاڵە هەستیارەکان" : "Formula & Concept Flashcards"}</span>
                </h3>
                <p className="text-xs text-slate-500 font-bold">
                  {isBadini
                    ? "ل سەر کارتێ کلیک بکە بۆ زانینا بەرسڤێ و دووبارەکرنا یاسایان ب خێڕایی"
                    : isKu
                    ? "کارتەکە وەربگێڕە بۆ بینینی وەڵام و دووبارەکردنەوەی یاساکان"
                    : "Click any card to flip and view the full formula or definition"}
                </p>
              </div>

              {/* Subject Filter Dropdown */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={selectedSubjectFilter}
                  onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">{isBadini || isKu ? "هەمی وانە (All Subjects)" : "All Subjects"}</option>
                  {subjectsList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {isBadini ? s.nameBadini : isKu ? s.nameKu : s.nameEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Flashcards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCards.map((card) => {
                const isFlipped = !!flippedCards[card.id];
                const frontText = isBadini ? card.frontBadini : isKu ? card.frontKu : card.frontEn;
                const backText = isBadini ? card.backBadini : isKu ? card.backKu : card.backEn;

                return (
                  <div
                    key={card.id}
                    onClick={() => toggleCardFlip(card.id)}
                    className={`min-h-[210px] p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-md hover:shadow-lg relative overflow-hidden ${
                      isFlipped
                        ? "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white border-indigo-500 ring-2 ring-indigo-500/30"
                        : "bg-white text-slate-900 border-slate-200 hover:border-indigo-400"
                    }`}
                  >
                    <div className="flex items-center justify-between border-b pb-2.5 mb-2 border-slate-200/60">
                      <span className={`text-xs font-black px-3 py-1 rounded-xl ${
                        isFlipped ? "bg-amber-400/20 text-amber-300 border border-amber-400/30" : "bg-indigo-50 text-indigo-700 border border-indigo-100"
                      }`}>
                        {card.tag}
                      </span>
                      <span className="text-xs font-extrabold text-slate-400">
                        {isFlipped ? (isBadini || isKu ? "بەرسڤ" : "Answer") : (isBadini || isKu ? "پرسیار" : "Question")}
                      </span>
                    </div>

                    <div className="my-auto py-3">
                      <p className={`text-base sm:text-lg font-black leading-relaxed ${isFlipped ? "text-amber-300 font-mono" : "text-slate-900"}`}>
                        {isFlipped ? backText : frontText}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-slate-200/40 flex items-center justify-between text-xs font-bold text-slate-400">
                      <span>{isFlipped ? "↩️ وەرگەڕان (Flip Back)" : "💡 کلیک بکە بۆ دیتنا بەرسڤێ"}</span>
                      <RotateCcw className="w-4 h-4 text-indigo-500" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MISTAKES & WEAKNESS LOG */}
      {activeTab === "mistakes" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600" />
                <span>{isBadini ? "تۆمارا خاڵێن لاواز و بابه‌تێن سەخت" : isKu ? "تۆماری خاڵە لاوازەکان و بابەتە سەختەکان" : "Weakness & Tough Topics Revision Log"}</span>
              </h3>
              <p className="text-xs text-slate-500 font-bold">
                {isBadini
                  ? "تۆمارکرنا ئەو بڕگە و یاسایانێن کو ل دۆر وان تێبینی هەنە دا پێداچوونا وان ب بەپەلەیی بکەی"
                  : isKu
                  ? "تۆمارکردنی ئەو بابەت و یاسایانەی کۆ تێبینییان لەسەرە تا پێداچوونەوەی بەپەلەی بۆ بکەیت"
                  : "Keep track of difficult concepts to prioritize before the ministerial exam"}
              </p>
            </div>

            {/* Add New Weak Point Form */}
            <form onSubmit={handleAddWeakPoint} className="flex flex-col sm:flex-row items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <select
                value={newTopicSubject}
                onChange={(e) => setNewTopicSubject(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none"
              >
                {subjectsList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {isBadini ? s.nameBadini : isKu ? s.nameKu : s.nameEn}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={newTopicText}
                onChange={(e) => setNewTopicText(e.target.value)}
                placeholder={isBadini ? "بابەتەکێ لاواز بنڤێسە (م. بیرکاری: تەواوکاری ب جێگرتن)..." : "ئاماژە بە بابەتێکی لاواز بکە..."}
                className="flex-1 w-full px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>{isBadini ? "زێدەکرن" : isKu ? "زیادکردن" : "Add Topic"}</span>
              </button>
            </form>

            {/* List of Weak Points */}
            <div className="space-y-2.5">
              {weakPoints.map((item) => {
                const topic = isBadini ? item.topicBadini : isKu ? item.topicKu : item.topicEn;
                const subjObj = subjectsList.find((s) => s.id === item.subjectId);
                const subjName = subjObj ? (isBadini ? subjObj.nameBadini : isKu ? subjObj.nameKu : subjObj.nameEn) : item.subjectId;

                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition flex items-center justify-between gap-3 ${
                      item.completed
                        ? "bg-emerald-50/60 border-emerald-200 text-slate-500 line-through"
                        : "bg-white border-slate-200 text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleWeakPointComplete(item.id)}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition cursor-pointer ${
                          item.completed
                            ? "bg-emerald-500 text-white"
                            : "border-2 border-slate-300 hover:border-indigo-500"
                        }`}
                      >
                        {item.completed && <Check className="w-4 h-4 stroke-[3]" />}
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {subjName}
                          </span>
                          <span className="text-xs font-black text-slate-900 no-underline">{topic}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteWeakPoint(item.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FAST BLITZ TEST */}
      {activeTab === "blitz" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg shadow-amber-400/30">
                <Zap className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {isBadini ? "تستا پێداچوونا خێرا یا وزاری (Fast Blitz Quiz)" : isKu ? "تستی پێداچوونەوەی بەپەلە (Fast Blitz Quiz)" : "Ministerial Rapid Revision Blitz"}
                </h3>
                <p className="text-xs text-slate-300 font-bold">
                  {isBadini
                    ? "پرسیارێن جۆراوجۆر ژ هەمی بابەتان بۆ تاقیکرنا ئاستێ جاهزییا تە ل بەردەم ئینتیحانا وزاری"
                    : isKu
                    ? "پرسیاری جۆراوجۆر لە هەموو وانەکان بۆ تاقیکردنەوەی ئاستی ئامادەیی"
                    : "Instant quiz launcher across all ministerial subjects to test revision readiness"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {subjectsList.map((s) => {
                const sName = isBadini ? s.nameBadini : isKu ? s.nameKu : s.nameEn;
                return (
                  <div
                    key={s.id}
                    className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <SubjectIcon subjectId={s.id} size="md" />
                      <h4 className="font-black text-white text-sm">{sName}</h4>
                    </div>

                    <button
                      type="button"
                      onClick={() => onStartQuiz && onStartQuiz(s.id)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
                    >
                      <Zap className="w-4 h-4 fill-current" />
                      <span>{isBadini ? "دەستپێکرنا تاقیکرنێ" : isKu ? "دەستپێکردنی تاقیکردنەوە" : "Start Blitz Quiz"}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: STUDY TIMER & POMODORO */}
      {activeTab === "timer" && (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-8">
            {/* Header & Stats Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black">
                  <Timer className="w-3.5 h-3.5 animate-pulse" />
                  <span>{isBadini ? "تایمەرێ تایبەت و ب تەرکیز" : isKu ? "تایمەری تایبەت و بە تەرکیز" : "Special Focus Timer Engine"}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-3">
                  <span>{isBadini ? "تایمەرێ خویندنێ و پۆمۆدۆرۆ (Pomodoro Focus Timer) ⏱️" : isKu ? "تایمەری خوێندن و پۆمۆدۆرۆ ⏱️" : "Study & Pomodoro Timer Hub ⏱️"}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-bold leading-relaxed">
                  {isBadini
                    ? "دیارکرنا بابەتی، بەند، وانە و بابەتێن خویندنێ بەری دەستپێکرنا کاتژمێرێ دا کو هەمى زانیاری ب تەمامی بهێنە سەیڤکرن."
                    : isKu
                    ? "دیارکردنی بابەت، بەند، وانە و بابەتەکانی خوێندن پێش دەستپێکردن بۆ سەیڤکردنی زانیارییەکان."
                    : "Configure subject, chapter, lesson, and topics before starting the timer to track full revision logs."}
                </p>
              </div>

              {/* Quick Session Stats */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700/80 text-center space-y-0.5 min-w-[110px]">
                  <span className="text-[10px] font-extrabold text-slate-400 block uppercase tracking-wider">
                    {isBadini ? "خولەکێن خویندنێ" : isKu ? "خولەکی خوێندن" : "Focus Mins"}
                  </span>
                  <p className="text-xl font-black font-mono text-emerald-400">{totalFocusMinutes} <span className="text-xs text-slate-400 font-normal">خولەک</span></p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700/80 text-center space-y-0.5 min-w-[110px]">
                  <span className="text-[10px] font-extrabold text-slate-400 block uppercase tracking-wider">
                    {isBadini ? "جارا پۆمۆدۆرۆ" : isKu ? "پۆمۆدۆرۆ" : "Sessions"}
                  </span>
                  <p className="text-xl font-black font-mono text-amber-400">{completedPomodoros} <span className="text-xs text-slate-400 font-normal">جار</span></p>
                </div>
              </div>
            </div>

            {/* Session Toast Banner */}
            {sessionToast && (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm font-black flex items-center justify-between gap-3 shadow-xl animate-fadeIn">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{sessionToast}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSessionToast(null)}
                  className="text-emerald-400 hover:text-emerald-200 font-bold px-2 py-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Mode Selectors & Subject/Chapter Setup */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (5 cols): Subject, Chapter, Lesson & Topic Form */}
              <div className="lg:col-span-5 space-y-5 bg-slate-950/60 p-5 sm:p-6 rounded-3xl border border-slate-800/80">
                {/* 1. Subject Selector */}
                <div className="space-y-2.5">
                  <label className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>{isBadini ? "١. دیارکرنا بابەتی (Subject):" : isKu ? "١. دیارکردنی بابەت:" : "1. Select Subject:"}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {subjectsList.map((s) => {
                      const isSelected = selectedTimerSubject === s.id;
                      const sName = isBadini ? s.nameBadini : isKu ? s.nameKu : s.nameEn;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => handleSelectTimerSubject(s.id)}
                          className={`p-2.5 rounded-xl border text-xs font-black transition cursor-pointer flex items-center gap-2 ${
                            isSelected
                              ? "bg-indigo-600 text-white border-indigo-400 shadow-lg ring-2 ring-indigo-500/50 scale-[1.02]"
                              : "bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800"
                          }`}
                        >
                          <SubjectIcon subjectId={s.id} size="sm" />
                          <span className="truncate">{sName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Chapter & Lesson Selection */}
                {(() => {
                  const currentSubjSyllabus = grade12SyllabusData.find((s) => s.id === selectedTimerSubject);
                  const currentChObj = currentSubjSyllabus?.chapters.find((ch) => ch.id === timerSelectedChapter);

                  return (
                    <div className="space-y-3 pt-3 border-t border-slate-800">
                      <label className="text-xs font-black text-indigo-300 flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-indigo-400" />
                        <span>{isBadini ? "٢. دیارکرنا بەند و وانەیێ (Chapter & Lesson):" : isKu ? "٢. دیارکردنی بەند و وانە:" : "2. Chapter & Lesson:"}</span>
                      </label>

                      <div className="space-y-2.5">
                        {/* Chapter Dropdown */}
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 block mb-1">
                            {isBadini ? "بەندێ پۆلێ (بەند):" : isKu ? "بەندی پەرتووک:" : "Chapter:"}
                          </span>
                          <select
                            value={timerSelectedChapter}
                            onChange={(e) => {
                              const newChId = e.target.value;
                              setTimerSelectedChapter(newChId);
                              const chObj = currentSubjSyllabus?.chapters.find((ch) => ch.id === newChId);
                              if (chObj && chObj.sections.length > 0) {
                                setTimerSelectedSection(chObj.sections[0].id);
                              } else {
                                setTimerSelectedSection("");
                              }
                            }}
                            className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-bold rounded-xl p-2.5 focus:outline-none focus:border-indigo-500"
                          >
                            <option value="">
                              {isBadini ? "-- هەڵبژاردنا بەندێ --" : isKu ? "-- هەڵبژاردنی بەند --" : "-- Select Chapter --"}
                            </option>
                            {currentSubjSyllabus?.chapters.map((ch) => (
                              <option key={ch.id} value={ch.id}>
                                {ch.chapterNumber}: {isBadini ? ch.titleBadini : isKu ? ch.titleKu : ch.titleEn}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Lesson / Section Dropdown */}
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 block mb-1">
                            {isBadini ? "وانە / پشک (Lesson):" : isKu ? "وانە / پشک:" : "Lesson / Section:"}
                          </span>
                          <select
                            value={timerSelectedSection}
                            onChange={(e) => setTimerSelectedSection(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-bold rounded-xl p-2.5 focus:outline-none focus:border-indigo-500"
                          >
                            <option value="">
                              {isBadini ? "-- هەڵبژاردنا وانەیێ --" : isKu ? "-- هەڵبژاردنی وانە --" : "-- Select Lesson --"}
                            </option>
                            {currentChObj?.sections.map((sec) => (
                              <option key={sec.id} value={sec.id}>
                                {isBadini ? sec.titleBadini : isKu ? sec.titleKu : sec.titleEn}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* 3. Topics & Revision Notes Text Area */}
                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <label className="text-xs font-black text-emerald-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>{isBadini ? "٣. نڤێسینا وان بابەتان یێن دێ خۆینیت (Topics & Notes):" : isKu ? "٣. نوسینی ئەو بابەتانەی دەیانخوێنیت:" : "3. Topics & Notes to Revise:"}</span>
                  </label>
                  <textarea
                    rows={2}
                    value={timerTopicsText}
                    onChange={(e) => setTimerTopicsText(e.target.value)}
                    placeholder={
                      isBadini
                        ? "بۆ نموونە: پێداچوونا یاسایێن سەرەکی + شیکارکرنا ۱۰ پرسیارێن وزاری..."
                        : isKu
                        ? "بۆ نموونە: پێداچوونەوەی یاساکان + شیکارکردنی ١٠ پرسیاری وزاری..."
                        : "e.g. Revision of core laws & solving past ministerial questions..."
                    }
                    className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-medium rounded-xl p-3 focus:outline-none focus:border-emerald-500 resize-none leading-relaxed"
                  />
                </div>

                {/* 4. Timer Mode Options */}
                <div className="space-y-2.5 pt-3 border-t border-slate-800">
                  <label className="text-xs font-black text-slate-300 block">
                    {isBadini ? "٤. جۆرێ کاتژمێری (Timer Mode):" : isKu ? "٤. جۆری کاتژمێر:" : "4. Select Timer Duration:"}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectTimerMode("pomodoro")}
                      className={`p-2.5 rounded-xl border text-xs font-black transition cursor-pointer flex items-center justify-between ${
                        timerMode === "pomodoro"
                          ? "bg-amber-500 text-slate-950 border-amber-400 font-black shadow-lg"
                          : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <Flame className="w-3.5 h-3.5 text-orange-600 fill-current shrink-0" />
                        <span className="truncate">{isBadini ? "پۆمۆدۆرۆ (٢٥م)" : "پۆمۆدۆرۆ (25m)"}</span>
                      </div>
                      <span className="font-mono text-[10px]">25:00</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelectTimerMode("deepwork")}
                      className={`p-2.5 rounded-xl border text-xs font-black transition cursor-pointer flex items-center justify-between ${
                        timerMode === "deepwork"
                          ? "bg-indigo-600 text-white border-indigo-500 font-black shadow-lg"
                          : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <Brain className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
                        <span className="truncate">{isBadini ? "خویندنا کوور (٥٠م)" : "خوێندنی قوڵ (50m)"}</span>
                      </div>
                      <span className="font-mono text-[10px]">50:00</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelectTimerMode("shortBreak")}
                      className={`p-2.5 rounded-xl border text-xs font-black transition cursor-pointer flex items-center justify-between ${
                        timerMode === "shortBreak"
                          ? "bg-emerald-600 text-white border-emerald-500 font-black shadow-lg"
                          : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <Clock className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                        <span className="truncate">{isBadini ? "بهێنڤەدان (٥م)" : "بێشوودان (5m)"}</span>
                      </div>
                      <span className="font-mono text-[10px]">05:00</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelectTimerMode("longBreak")}
                      className={`p-2.5 rounded-xl border text-xs font-black transition cursor-pointer flex items-center justify-between ${
                        timerMode === "longBreak"
                          ? "bg-teal-600 text-white border-teal-500 font-black shadow-lg"
                          : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <Coffee className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                        <span className="truncate">{isBadini ? "بهێنڤەدانا درێژ (١٥م)" : "بێشوودانی درێژ (15m)"}</span>
                      </div>
                      <span className="font-mono text-[10px]">15:00</span>
                    </button>
                  </div>

                  {/* Custom Minutes Input */}
                  <div className="pt-2 flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="180"
                      value={customInputMinutes}
                      onChange={(e) => setCustomInputMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-mono font-black text-white focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleSelectTimerMode("custom", customInputMinutes)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-xl cursor-pointer shrink-0 transition"
                    >
                      {isBadini ? "دیارکە" : "دا بنێ"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column (7 cols): Big Clock Display & Active Target Banner */}
              <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col items-center justify-between space-y-6 text-center relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Active Target Banner */}
                {(() => {
                  const currentSubjSyllabus = grade12SyllabusData.find((s) => s.id === selectedTimerSubject);
                  const activeChObj = currentSubjSyllabus?.chapters.find((ch) => ch.id === timerSelectedChapter);
                  const activeSecObj = activeChObj?.sections.find((sec) => sec.id === timerSelectedSection);
                  const subjInfo = subjectsList.find((s) => s.id === selectedTimerSubject);

                  return (
                    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-2 text-right">
                      <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                        <div className="flex items-center gap-2">
                          <SubjectIcon subjectId={selectedTimerSubject} size="sm" />
                          <span className="font-black text-sm text-amber-300">
                            {subjInfo ? (isBadini ? subjInfo.nameBadini : isKu ? subjInfo.nameKu : subjInfo.nameEn) : selectedTimerSubject}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsFullScreenFocus(true)}
                            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-indigo-500/20 border border-emerald-500/40 text-emerald-300 hover:text-white hover:bg-emerald-500/30 text-xs font-black transition cursor-pointer shadow-sm active:scale-95"
                          >
                            <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{isBadini ? "مۆدا خویندنێ (Focus)" : isKu ? "مۆدی خوێندن" : "Focus Mode"}</span>
                          </button>
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            {isBadini ? "ئارمانجا پێداچوونا نوکە 📌" : isKu ? "ئامانجی پێداچوونەوە 📌" : "Active Target 📌"}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-200 space-y-1.5 pt-1">
                        <p className="font-bold text-emerald-300 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                          <span>
                            {activeChObj
                              ? `${activeChObj.chapterNumber}: ${isBadini ? activeChObj.titleBadini : isKu ? activeChObj.titleKu : activeChObj.titleEn}`
                              : (timerSelectedChapter || (isBadini ? "بەندێ دیارنەکری" : "بەندی دیارینەکراو"))}
                          </span>
                          {activeSecObj && (
                            <span className="text-slate-400 font-normal">
                              ({isBadini ? activeSecObj.titleBadini : isKu ? activeSecObj.titleKu : activeSecObj.titleEn})
                            </span>
                          )}
                        </p>

                        {timerTopicsText && (
                          <div className="text-xs text-slate-300 font-medium bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 text-right">
                            <span className="font-black text-amber-300">📝 {isBadini ? "بابەتێن خویندنێ:" : "بابەتەکان:"} </span>
                            <span>{timerTopicsText}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* Clock Display */}
                <div className="relative flex items-center justify-center my-2">
                  <div className="w-60 h-60 sm:w-68 sm:h-68 rounded-full border-4 border-slate-800 flex flex-col items-center justify-center bg-slate-900/90 shadow-2xl space-y-2 relative">
                    <span className="text-xs font-black uppercase text-slate-400 tracking-widest font-mono">
                      {isTimerRunning
                        ? isBadini ? "تەرکیز یا هەیە..." : isKu ? "تەرکیز هەیە..." : "FOCUS SESSION"
                        : isBadini ? "ئامادە بگریت" : isKu ? "ئامادە بە" : "READY"}
                    </span>

                    <p className="text-5xl sm:text-6xl font-black font-mono text-white tracking-wider drop-shadow-md">
                      {Math.floor(timerSeconds / 60).toString().padStart(2, "0")}:{(timerSeconds % 60).toString().padStart(2, "0")}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-black text-emerald-400 font-mono">
                      <Flame className="w-3.5 h-3.5 fill-current" />
                      <span>{Math.round(initialSeconds / 60)} {isBadini || isKu ? "خولەک" : "Mins"}</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Controls & Manual Save Button */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!isTimerRunning) {
                        const subjObj = subjectsList.find((s) => s.id === selectedTimerSubject);
                        const subjName = subjObj ? (isBadini ? subjObj.nameBadini : isKu ? subjObj.nameKu : subjObj.nameEn) : selectedTimerSubject;
                        setSessionToast(
                          isBadini
                            ? `کاتژمێرا تەرکیزێ دەستپێکر! بابەت: (${subjName}) 📌`
                            : `کاتژمێری تەرکیز دەستی پێکرد! بابەت: (${subjName}) 📌`
                        );
                        setTimeout(() => setSessionToast(null), 3500);
                      }
                      setIsTimerRunning(!isTimerRunning);
                    }}
                    className={`px-8 py-3.5 rounded-2xl font-black text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl active:scale-95 w-full sm:w-auto ${
                      isTimerRunning
                        ? "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/40"
                        : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-950/50"
                    }`}
                  >
                    {isTimerRunning ? (
                      <>
                        <Pause className="w-5 h-5 fill-current" />
                        <span>{isBadini ? "ڕاوەستینە (Pause)" : isKu ? "ڕاوەستێنە" : "Pause Timer"}</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 fill-current" />
                        <span>{isBadini ? "دەستپێبکە (Start Focus)" : isKu ? "دەستپێبکە" : "Start Focus"}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSeconds(initialSeconds);
                    }}
                    className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer border border-slate-700 shrink-0"
                    title="دەستپێکرنەڤە (Reset)"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSaveCurrentStudySession()}
                    className="px-4 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 w-full sm:w-auto"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>{isBadini ? "تۆمارکرنا دەستبەجێ 💾" : isKu ? "تۆمارکردنی دەستبەجێ 💾" : "Save Session Log"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsFullScreenFocus(true)}
                    className="px-4 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-indigo-500/20 hover:from-emerald-500/30 hover:to-indigo-500/30 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-black transition cursor-pointer flex items-center justify-center gap-2 shadow-lg active:scale-95 w-full sm:w-auto"
                    title={isBadini ? "مۆدا خویندنێ (مەزنکرنا پەڕەی)" : "Focus Mode"}
                  >
                    <Maximize2 className="w-4 h-4 text-emerald-400" />
                    <span>{isBadini ? "مۆدا خویندنێ 📱" : isKu ? "مۆدی خوێندن" : "Focus Mode"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Fullscreen Distraction-Free Focus Mode Overlay */}
          {isFullScreenFocus && (
            <div className="fixed inset-0 z-50 bg-slate-950/98 text-white flex flex-col justify-between p-4 sm:p-8 overflow-y-auto min-h-screen w-screen select-none backdrop-blur-3xl animate-fadeIn">
              {/* Top Bar */}
              <div className="w-full max-w-3xl mx-auto flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-black text-base sm:text-lg text-white flex items-center gap-2">
                      <span>{isBadini ? "مۆدا خویندنێ و تەرکیزێ" : isKu ? "مۆدی خوێندن و تەرکیز" : "Full Screen Focus Mode"}</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {isBadini ? "چ تشتێن دی یێن بێزارکەر نینن - بتنێ تۆ و کاتژمێرا تەرکیزێ!" : "تەنها تۆ و کاتژمێری تەرکیز!"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsFullScreenFocus(false)}
                  className="px-4 py-2.5 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 hover:text-white font-black text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer active:scale-95 shadow-lg"
                >
                  <Minimize2 className="w-4 h-4" />
                  <span>{isBadini ? "دەرکەڤتن (Exit)" : isKu ? "دەرچوون" : "Exit"}</span>
                </button>
              </div>

              {/* Center Focus Area */}
              <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center space-y-6 text-center my-auto py-4">
                {/* Active Subject & Chapter Banner */}
                {(() => {
                  const currentSubjSyllabus = grade12SyllabusData.find((s) => s.id === selectedTimerSubject);
                  const activeChObj = currentSubjSyllabus?.chapters.find((ch) => ch.id === timerSelectedChapter);
                  const activeSecObj = activeChObj?.sections.find((sec) => sec.id === timerSelectedSection);
                  const subjInfo = subjectsList.find((s) => s.id === selectedTimerSubject);

                  return (
                    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-3 text-right">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                        <div className="flex items-center gap-2.5">
                          <SubjectIcon subjectId={selectedTimerSubject} size="md" />
                          <span className="font-black text-base sm:text-lg text-amber-300">
                            {subjInfo ? (isBadini ? subjInfo.nameBadini : isKu ? subjInfo.nameKu : subjInfo.nameEn) : selectedTimerSubject}
                          </span>
                        </div>
                        <span className="text-xs font-black px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {isBadini ? "مۆدا تەرکیزێ یا چالاک 📌" : "تەرکیزی چالاک 📌"}
                        </span>
                      </div>

                      <div className="text-xs sm:text-sm text-slate-200 space-y-2 pt-1">
                        <p className="font-bold text-emerald-300 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>
                            {activeChObj
                              ? `${activeChObj.chapterNumber}: ${isBadini ? activeChObj.titleBadini : isKu ? activeChObj.titleKu : activeChObj.titleEn}`
                              : (timerSelectedChapter || (isBadini ? "بەندێ دیارنەکری" : "بەندی دیارینەکراو"))}
                          </span>
                          {activeSecObj && (
                            <span className="text-slate-400 font-normal">
                              ({isBadini ? activeSecObj.titleBadini : isKu ? activeSecObj.titleKu : activeSecObj.titleEn})
                            </span>
                          )}
                        </p>

                        {timerTopicsText && (
                          <div className="text-xs sm:text-sm text-slate-300 font-medium bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-right">
                            <span className="font-black text-amber-300">📝 {isBadini ? "بابەتێن خویندنێ:" : "بابەتەکان:"} </span>
                            <span>{timerTopicsText}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* Main Clock Circle */}
                <div className="relative flex items-center justify-center my-2">
                  <div className={`w-64 h-64 sm:w-80 sm:h-80 lg:w-88 lg:h-88 rounded-full border-6 sm:border-8 ${isTimerRunning ? "border-emerald-500 animate-pulse shadow-[0_0_80px_rgba(16,185,129,0.25)]" : "border-slate-800 shadow-2xl"} flex flex-col items-center justify-center bg-slate-900/95 space-y-3 relative transition-all duration-500`}>
                    <span className="text-xs sm:text-sm font-black uppercase text-emerald-400 tracking-widest font-mono">
                      {isTimerRunning
                        ? isBadini ? "تەرکیز یا هەیە... (FOCUSING)" : "تەرکیز هەیە... (FOCUSING)"
                        : isBadini ? "ئامادە بگریت (READY)" : "ئامادە بە (READY)"}
                    </span>

                    <p className="text-5xl sm:text-7xl lg:text-8xl font-black font-mono text-white tracking-widest drop-shadow-2xl">
                      {Math.floor(timerSeconds / 60).toString().padStart(2, "0")}:{(timerSeconds % 60).toString().padStart(2, "0")}
                    </p>

                    <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-emerald-400 font-mono bg-emerald-950/60 px-4 py-1.5 rounded-full border border-emerald-500/30">
                      <Flame className="w-4 h-4 fill-current text-emerald-400" />
                      <span>{Math.round(initialSeconds / 60)} {isBadini || isKu ? "خولەک" : "Mins"}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Minutes Selector inside Full Screen */}
                <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
                  {[15, 25, 30, 45, 60, 90].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => handleSelectTimerMode(`custom_${m}`, m)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${
                        Math.round(initialSeconds / 60) === m
                          ? "bg-amber-500 text-slate-950 font-extrabold shadow-lg scale-105"
                          : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700"
                      }`}
                    >
                      {m} {isBadini ? "خولەک" : "خوولەک"}
                    </button>
                  ))}
                </div>

                {/* Primary Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (!isTimerRunning) {
                        const subjObj = subjectsList.find((s) => s.id === selectedTimerSubject);
                        const subjName = subjObj ? (isBadini ? subjObj.nameBadini : isKu ? subjObj.nameKu : subjObj.nameEn) : selectedTimerSubject;
                        setSessionToast(
                          isBadini
                            ? `کاتژمێرا تەرکیزێ دەستپێکر! بابەت: (${subjName}) 📌`
                            : `کاتژمێری تەرکیز دەستی پێکرد! بابەت: (${subjName}) 📌`
                        );
                        setTimeout(() => setSessionToast(null), 3500);
                      }
                      setIsTimerRunning(!isTimerRunning);
                    }}
                    className={`px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl font-black text-base transition-all cursor-pointer flex items-center justify-center gap-3 shadow-2xl active:scale-95 min-w-[180px] ${
                      isTimerRunning
                        ? "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/50"
                        : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-950/60"
                    }`}
                  >
                    {isTimerRunning ? (
                      <>
                        <Pause className="w-6 h-6 fill-current" />
                        <span>{isBadini ? "ڕاوەستینە" : "ڕاوەستێنە"}</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-6 h-6 fill-current" />
                        <span>{isBadini ? "دەستپێبکە (Start Focus)" : "دەستپێبکە"}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSeconds(initialSeconds);
                    }}
                    className="p-3.5 sm:p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer border border-slate-700 shrink-0"
                    title="دەستپێکرنەڤە (Reset)"
                  >
                    <RotateCcw className="w-6 h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSaveCurrentStudySession()}
                    className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 text-xs sm:text-sm font-black transition cursor-pointer flex items-center justify-center gap-2 shadow-lg active:scale-95"
                  >
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                    <span>{isBadini ? "تۆمارکرن 💾" : "تۆمارکردن 💾"}</span>
                  </button>
                </div>
              </div>

              {/* Bottom Footer Quote */}
              <div className="w-full max-w-3xl mx-auto border-t border-slate-800/80 pt-4 mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 text-center shrink-0">
                <span className="font-medium text-amber-300/90 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{isBadini ? "تەرکیزێ بگرە! تە شۆلەکێ مەزن کرییە بۆ پاشەڕۆژا خۆ 🌟" : "تەرکیز بگرە! ئایندەی خۆت دروست دەکەیت 🌟"}</span>
                </span>

                <span className="font-mono text-slate-500">
                  Pomodoro Focus Mode
                </span>
              </div>
            </div>
          )}

          {/* Detailed Session History Log Section */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <span>📋 {isBadini ? "تۆمارا زانیاریێن پێداچوونێ (Study Session History Logs)" : isKu ? "تۆماری زانیارییەکانی پێداچوونەوە" : "Saved Study Revision Logs"}</span>
                </h4>
                <p className="text-xs text-slate-400 font-medium">
                  {isBadini
                    ? "هەمى زانیاریێن خویندنێ (بابەت، بەند، وانە، و نڤێسینێن دەستنیشانکری) بۆ تە دهێنە سەیڤکرن"
                    : "هەموو زانیارییەکانی خوێندن بۆت پاشەکەوت کراون بە هەموو وردەکارییەکانەوە"}
                </p>
              </div>

              {/* Subject Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setStudyLogFilterSubject("all")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                    studyLogFilterSubject === "all"
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  {isBadini ? "هەموو بابەت" : "هەموو بابەتەکان"}
                </button>
                {subjectsList.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStudyLogFilterSubject(s.id)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                      studyLogFilterSubject === s.id
                        ? "bg-indigo-600 text-white font-black"
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                    }`}
                  >
                    <span>{s.id === "biology" ? "🧬" : s.id === "physics" ? "⚛️" : s.id === "arabic" ? "📚" : "📖"}</span>
                    <span>{isBadini ? s.nameBadini : isKu ? s.nameKu : s.nameEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Logs List */}
            {(() => {
              const filteredLogs = studyLogFilterSubject === "all"
                ? studyLogs
                : studyLogs.filter((l) => l.subjectId === studyLogFilterSubject);

              if (filteredLogs.length === 0) {
                return (
                  <div className="p-8 text-center bg-slate-950/40 rounded-2xl border border-slate-800 text-slate-400 text-xs font-bold">
                    {isBadini ? "هیچ تۆمارەکا پێداچوونێ بۆ ڤی بابەتی نینە." : "هیچ تۆمارێکی پێداچوونەوە نییە."}
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredLogs.map((log) => {
                    const subjInfo = subjectsList.find((s) => s.id === log.subjectId);
                    const sName = subjInfo ? (isBadini ? subjInfo.nameBadini : isKu ? subjInfo.nameKu : subjInfo.nameEn) : log.subjectId;

                    return (
                      <div
                        key={log.id}
                        className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 relative group hover:border-slate-700 transition"
                      >
                        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                          <div className="flex items-center gap-2">
                            <SubjectIcon subjectId={log.subjectId} size="sm" />
                            <span className="font-black text-xs text-amber-300">{sName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-mono text-[11px] font-black border border-emerald-500/30">
                              {log.durationMinutes}m
                            </span>
                            <button
                              type="button"
                              onClick={() => setStudyLogs((prev) => prev.filter((item) => item.id !== log.id))}
                              className="text-slate-500 hover:text-rose-400 transition p-1 cursor-pointer"
                              title="سڕینەوە"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="text-xs space-y-1.5">
                          <p className="font-extrabold text-slate-200 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                            <span>{log.chapterTitle || (isBadini ? "بەندێ گشتی" : "بەندی گشتی")}</span>
                          </p>
                          {log.lessonTitle && (
                            <p className="text-[11px] text-indigo-300/90 font-bold pr-5">
                              • {log.lessonTitle}
                            </p>
                          )}
                          {log.topicsText && (
                            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 text-[11px] text-slate-300 font-medium leading-relaxed">
                              📝 <span className="font-bold text-amber-200">{isBadini ? "بابەت:" : "بابەت:"} </span>
                              {log.topicsText}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-900">
                          <span>📅 {log.date || "ئەمڕۆ"}</span>
                          <span>⏰ {log.timestamp}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>

          {/* Daily Task Planner Card directly inside Timer Tab */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6 text-slate-900">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#86E3CE] via-[#FFDD94] to-[#FA897B] text-slate-900 flex items-center justify-center font-black shadow-sm">
                  <CalendarDays className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    {isBadini ? "پلانا خویندنا رۆژانە 📅" : isKu ? "پلانی خوێندنی ڕۆژانە 📅" : "Daily Study Task Planner 📅"}
                  </h4>
                  <p className="text-xs text-slate-500 font-bold">
                    {isBadini ? "ئەرک و کارێن خویندنێ ل سەر ڤێ کاتژمێرێ ڕێکبێخە" : isKu ? "ئەرک و کارەکانی خوێندن لێرە ڕێکبخە" : "Organize tasks to complete alongside your timer."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
                <Calendar className="w-4 h-4 text-purple-600" />
                <input
                  type="date"
                  value={plannerDate}
                  onChange={(e) => setPlannerDate(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* The exact Form from reference image */}
            <form onSubmit={handleAddPlannerTask} className="space-y-5">
              {/* Field 1: Task Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-800 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#86E3CE]" />
                  <span>{isBadini ? "١. ناڤێ ئەرکی بنڤیسە:" : isKu ? "١. ناونیشانی ئەرک بنووسە:" : "1. Task Name:"}</span>
                </label>
                <input
                  type="text"
                  value={plannerText}
                  onChange={(e) => setPlannerText(e.target.value)}
                  placeholder={isBadini ? "بۆ نموونە: خواندنا فیزیا بەشێ ١..." : isKu ? "بۆ نموونە: خوێندنی فیزیا بەشی ١..." : "Enter study task (e.g., Read Physics Ch. 1)..."}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition shadow-2xs"
                />
              </div>

              {/* Field 2: Study Time Box */}
              <div className="bg-slate-50/90 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-indigo-600 stroke-[2.5]" />
                    <span>{isBadini ? "٢. دەمێ خویندنێ:" : isKu ? "٢. کاتی خوێندن:" : "2. Study Time:"}</span>
                  </span>
                  {(startTime || endTime) && (
                    <button
                      type="button"
                      onClick={() => { setStartTime(""); setEndTime(""); }}
                      className="text-[11px] font-bold text-rose-500 hover:text-rose-600 bg-rose-50 px-2 py-0.5 rounded-lg transition"
                    >
                      {isBadini ? "سڕینەڤە ✕" : "Clear ✕"}
                    </button>
                  )}
                </div>

                {/* Preset 1-Click Buttons */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                    ⚡ {isBadini ? "هەلبژاردنا خێرا ب ١ کلیک:" : isKu ? "هەڵبژاردنی خێرا بە ١ کلیک:" : "Quick 1-Click Select:"}
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {timeSlotPresets.map((slot) => {
                      const isSelected = startTime === slot.start && endTime === slot.end;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => { setStartTime(slot.start); setEndTime(slot.end); setPlannerTimeSlot(`${slot.start} - ${slot.end}`); }}
                          className={`relative overflow-hidden p-3.5 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-between border cursor-pointer group min-h-[58px] ${
                            isSelected
                              ? slot.activeRing + " scale-[1.02] z-10"
                              : "border-slate-300/80 hover:scale-[1.01] hover:border-slate-400 shadow-2xs"
                          }`}
                          style={{
                            backgroundImage: `url(${slot.bgImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          {/* Translucent Overlay for perfect contrast */}
                          <div className={`absolute inset-0 transition-opacity ${slot.overlayGradient} ${isSelected ? "opacity-85" : "opacity-70 group-hover:opacity-50"}`} />

                          {/* Content */}
                          <div className="relative z-10 flex items-center justify-between w-full text-white">
                            <div className="flex items-center gap-2">
                              <span className="text-xl drop-shadow-md">{slot.icon}</span>
                              <span className="font-black text-xs sm:text-sm tracking-wide drop-shadow-md">
                                {isBadini ? slot.labelBadini : isKu ? slot.labelKu : slot.labelEn}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-mono font-black drop-shadow-md bg-black/50 px-2 py-0.5 rounded-lg border border-white/20 text-amber-200">
                                {slot.range}
                              </span>
                              {isSelected && (
                                <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shadow-md">
                                  ✓
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Exact Time Selectors */}
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[11px] font-bold text-slate-500">
                    {isBadini ? "یان کاتژمێر دیار بکە:" : isKu ? "یان کاتژمێر دیاری بکە:" : "Or select time:"}
                  </span>
                  <div className="flex items-center gap-2 flex-wrap relative">
                    {/* Start Time Select */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => { setOpenStartDropdown(!openStartDropdown); setOpenEndDropdown(false); }}
                        className={`flex items-center justify-between gap-1.5 bg-white px-3 py-2 rounded-xl border text-xs font-black transition cursor-pointer shadow-2xs ${
                          openStartDropdown ? "border-indigo-500 ring-2 ring-indigo-500/20 text-indigo-900" : "border-slate-200 hover:border-slate-300 text-slate-800"
                        }`}
                      >
                        <span className="text-[10px] text-indigo-500 font-bold">{isBadini || isKu ? "ژ:" : "From:"}</span>
                        <span>{startTime || (isBadini || isKu ? "دەسپێک..." : "Start...")}</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${openStartDropdown ? "rotate-180 text-indigo-600" : ""}`} />
                      </button>

                      {openStartDropdown && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setOpenStartDropdown(false)} />
                          <div className="absolute right-0 bottom-full mb-1.5 w-60 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden">
                            <div className="text-[11px] font-black text-slate-700 px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                              <span>{isBadini || isKu ? "کاتژمێرێ دەسپێکێ دیار بکە:" : "Start Time:"}</span>
                            </div>
                            <div className="p-2 max-h-48 overflow-y-auto grid grid-cols-2 gap-1">
                              {timeOptions.map((t) => (
                                <button
                                  key={`s-${t}`}
                                  type="button"
                                  onClick={() => { setStartTime(t); setOpenStartDropdown(false); setPlannerTimeSlot(`${t} - ${endTime || '10:00 AM'}`); }}
                                  className={`px-2 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                                    startTime === t ? "bg-slate-900 text-white font-black" : "text-slate-700 hover:bg-slate-100 bg-slate-50/50"
                                  }`}
                                >
                                  <span>{t}</span>
                                  <span className="text-[10px] opacity-70">{t.includes("AM") ? "🌅" : "🌙"}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <span className="text-slate-400 font-black text-xs">-</span>

                    {/* End Time Select */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => { setOpenEndDropdown(!openEndDropdown); setOpenStartDropdown(false); }}
                        className={`flex items-center justify-between gap-1.5 bg-white px-3 py-2 rounded-xl border text-xs font-black transition cursor-pointer shadow-2xs ${
                          openEndDropdown ? "border-indigo-500 ring-2 ring-indigo-500/20 text-indigo-900" : "border-slate-200 hover:border-slate-300 text-slate-800"
                        }`}
                      >
                        <span className="text-[10px] text-purple-500 font-bold">{isBadini || isKu ? "بۆ:" : "To:"}</span>
                        <span>{endTime || (isBadini || isKu ? "دوماهیک..." : "End...")}</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${openEndDropdown ? "rotate-180 text-indigo-600" : ""}`} />
                      </button>

                      {openEndDropdown && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setOpenEndDropdown(false)} />
                          <div className="absolute right-0 bottom-full mb-1.5 w-60 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden">
                            <div className="text-[11px] font-black text-slate-700 px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                              <span>{isBadini || isKu ? "کاتژمێرێ دوماهیێ دیار بکە:" : "End Time:"}</span>
                            </div>
                            <div className="p-2 max-h-48 overflow-y-auto grid grid-cols-2 gap-1">
                              {timeOptions.map((t) => (
                                <button
                                  key={`e-${t}`}
                                  type="button"
                                  onClick={() => { setEndTime(t); setOpenEndDropdown(false); setPlannerTimeSlot(`${startTime || '08:00 AM'} - ${t}`); }}
                                  className={`px-2 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                                    endTime === t ? "bg-slate-900 text-white font-black" : "text-slate-700 hover:bg-slate-100 bg-slate-50/50"
                                  }`}
                                >
                                  <span>{t}</span>
                                  <span className="text-[10px] opacity-70">{t.includes("AM") ? "🌅" : "🌙"}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Field 3: Colors */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  🎨 <span>{isBadini ? "٣. ڕەنگێ ئەرکی:" : isKu ? "٣. ڕەنگی ئەرک:" : "3. Task Color:"}</span>
                </span>
                <div className="flex items-center gap-2">
                  {pastelColors.map((col) => {
                    const isSelected = selectedColor === col.code;
                    return (
                      <button
                        key={col.code}
                        type="button"
                        onClick={() => setSelectedColor(col.code)}
                        className={`w-8 h-8 rounded-full transition transform hover:scale-110 flex items-center justify-center border border-slate-300/60 shadow-xs cursor-pointer ${
                          isSelected ? "scale-125 ring-2 ring-slate-900 ring-offset-2" : ""
                        }`}
                        style={{ backgroundColor: col.code }}
                        title={col.label}
                      >
                        {isSelected && <Check className="w-4 h-4 stroke-[3] text-slate-900" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Field 4: Subject Select */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs font-black text-slate-600 shrink-0">
                  {isBadini ? "بابەتێ پێکڤە گرێدای:" : isKu ? "بابەتی پەیوەندیدار:" : "Related Subject:"}
                </span>
                <select
                  value={plannerSubject}
                  onChange={(e) => setPlannerSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                >
                  {subjectsList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {isBadini ? s.nameBadini : isKu ? s.nameKu : s.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white font-black text-xs sm:text-sm rounded-2xl transition cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{isBadini ? "ئەرکێ نوێ زێدەکە بۆ ڤێ ڕوژێ" : isKu ? "ئەرکی نوێ زیادبکە بۆ ئەم ڕۆژە" : "Add Task for This Date"}</span>
              </button>
            </form>

            {/* List of Today's Tasks */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-black text-slate-800 flex items-center gap-2">
                  <ListTodo className="w-4 h-4 text-purple-600" />
                  <span>{isBadini ? `لیستا ئەرکێن ڕوژا (${plannerDate}):` : isKu ? `لیستی ئەرکەکانی (${plannerDate}):` : `Tasks for (${plannerDate}):`}</span>
                </h5>
                <span className="text-[11px] font-extrabold text-slate-500 font-mono">
                  {dailyPlannerTasks.filter((t) => t.date === plannerDate && t.completed).length} / {dailyPlannerTasks.filter((t) => t.date === plannerDate).length} {isBadini ? "ئەنجامدان" : "done"}
                </span>
              </div>

              {(() => {
                const tasksForDate = dailyPlannerTasks.filter((t) => t.date === plannerDate);
                if (tasksForDate.length === 0) {
                  return (
                    <p className="text-xs font-bold text-slate-400 text-center py-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      {isBadini ? "هیچ ئەرکەک بۆ ڤێ ڕێکەفتێ نەهاتیە زێدەکرن" : isKu ? "هیچ ئەرکێک بۆ ئەم ڕێکەوتە زیاد نەکراوە" : "No tasks added for this date yet."}
                    </p>
                  );
                }
                return (
                  <div className="space-y-2">
                    {tasksForDate.map((task) => {
                      const subj = subjectsList.find((s) => s.id === task.subjectId);
                      const sName = subj ? (isBadini ? subj.nameBadini : isKu ? subj.nameKu : subj.nameEn) : task.subjectId;
                      return (
                        <div
                          key={task.id}
                          className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                            task.completed ? "bg-slate-50 border-slate-200 opacity-70" : "bg-white border-slate-200"
                          }`}
                          style={{
                            borderLeftWidth: task.color ? "5px" : undefined,
                            borderLeftColor: task.color || undefined
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => togglePlannerTask(task.id)}
                              className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border cursor-pointer ${
                                task.completed ? "bg-emerald-600 border-emerald-600 text-white" : "bg-white border-slate-300 text-transparent"
                              }`}
                            >
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </button>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-black text-slate-900">{sName}</span>
                                <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-mono text-[10px] font-black">
                                  {task.timeSlot}
                                </span>
                              </div>
                              <p className={`text-xs font-bold mt-0.5 ${task.completed ? "line-through text-slate-400" : "text-slate-800"}`}>
                                {task.taskText}
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => deletePlannerTask(task.id)}
                            className="text-slate-300 hover:text-rose-600 transition cursor-pointer p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: DAILY STUDY PLANNER */}
      {activeTab === "planner" && (
        <div className="space-y-6">
          {/* Daily Planner Header & Stats */}
          <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl border border-purple-800/40 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-purple-800/30 pb-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-black">
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>{isBadini ? "پلانا رۆژانە یا زێڕین" : isKu ? "پلانی ڕۆژانەی زێڕین" : "Golden Daily Study Schedule"}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-3">
                  <span>{isBadini ? "پلانا خویندنا رۆژانە 📅" : isKu ? "پلانی خوێندنی ڕۆژانە 📅" : "Daily Study Planner 📅"}</span>
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/90 font-medium leading-relaxed">
                  {isBadini
                    ? "دیارکرن و دانانا خشتەیێ کار و مراجەعەیا هەر رۆژەکێ ب تەرکیز و دەمێ دیارکری"
                    : isKu
                    ? "دیاریکردن و دانانی خشتەی کار و مراجەعەی هەر ڕۆژێک بە کاتی دیاریکراو"
                    : "Plan and track your hourly revision goals for each day."}
                </p>
              </div>

              {/* Date Filter & Preset Button */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-700">
                  <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
                  <input
                    type="date"
                    value={plannerDate}
                    onChange={(e) => setPlannerDate(e.target.value)}
                    className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddExamPresetTasks}
                  className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs transition shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span>{isBadini ? "خشتەیێ پێشنیارکری یێ پۆلا ١٢" : isKu ? "خشتەی پێشنیارکراوی پۆلی ۱۲" : "Add Grade 12 Preset Plan"}</span>
                </button>
              </div>
            </div>

            {/* Daily Completion Progress Bar */}
            {(() => {
              const tasksForDate = dailyPlannerTasks.filter((t) => t.date === plannerDate);
              const totalCount = tasksForDate.length;
              const completedCount = tasksForDate.filter((t) => t.completed).length;
              const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

              return (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-black text-slate-300">
                    <span className="flex items-center gap-2">
                      <ListTodo className="w-4 h-4 text-purple-400" />
                      <span>{isBadini ? `رێژەیا ئەنجامدانێ ب دەستڤەهاتی (${plannerDate}):` : isKu ? `ڕێژەی ئەنجامدان (${plannerDate}):` : `Daily Completion (${plannerDate}):`}</span>
                    </span>
                    <span className="font-mono text-amber-300">{completedCount} / {totalCount} {isBadini || isKu ? "کار ئه‌نجامدانە" : "done"} ({percent}%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400 transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Form to Add New Task */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 text-slate-900">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#86E3CE] via-[#FFDD94] to-[#FA897B] text-slate-900 flex items-center justify-center font-black shadow-sm">
                <Plus className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h4 className="text-base font-black text-slate-900">
                {isBadini ? "زێدەکرنا ئەرکەکێ نوو بۆ خشتەیێ رۆژانە" : isKu ? "زیادکردنی ئەرکێکی نوێ بۆ خشتەی ڕۆژانە" : "Add New Task to Daily Schedule"}
              </h4>
            </div>

            <form onSubmit={handleAddPlannerTask} className="space-y-5">
              {/* Field 1: Task Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-800 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#86E3CE]" />
                  <span>{isBadini ? "١. ناڤێ ئەرکی بنڤیسە:" : isKu ? "١. ناونیشانی ئەرک بنووسە:" : "1. Task Name:"}</span>
                </label>
                <input
                  type="text"
                  value={plannerText}
                  onChange={(e) => setPlannerText(e.target.value)}
                  placeholder={isBadini ? "بۆ نموونە: خواندنا فیزیا بەشێ ١..." : isKu ? "بۆ نموونە: خوێندنی فیزیا بەشی ١..." : "Enter study task (e.g., Read Physics Ch. 1)..."}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition shadow-2xs"
                />
              </div>

              {/* Field 2: Study Time Box */}
              <div className="bg-slate-50/90 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-indigo-600 stroke-[2.5]" />
                    <span>{isBadini ? "٢. دەمێ خویندنێ:" : isKu ? "٢. کاتی خوێندن:" : "2. Study Time:"}</span>
                  </span>
                  {(startTime || endTime) && (
                    <button
                      type="button"
                      onClick={() => { setStartTime(""); setEndTime(""); }}
                      className="text-[11px] font-bold text-rose-500 hover:text-rose-600 bg-rose-50 px-2 py-0.5 rounded-lg transition"
                    >
                      {isBadini ? "سڕینەڤە ✕" : "Clear ✕"}
                    </button>
                  )}
                </div>

                {/* Preset 1-Click Buttons */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                    ⚡ {isBadini ? "هەلبژاردنا خێرا ب ١ کلیک:" : isKu ? "هەڵبژاردنی خێرا بە ١ کلیک:" : "Quick 1-Click Select:"}
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {timeSlotPresets.map((slot) => {
                      const isSelected = startTime === slot.start && endTime === slot.end;
                      return (
                        <button
                          key={`tab2-${slot.id}`}
                          type="button"
                          onClick={() => { setStartTime(slot.start); setEndTime(slot.end); setPlannerTimeSlot(`${slot.start} - ${slot.end}`); }}
                          className={`relative overflow-hidden p-3.5 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-between border cursor-pointer group min-h-[58px] ${
                            isSelected
                              ? slot.activeRing + " scale-[1.02] z-10"
                              : "border-slate-300/80 hover:scale-[1.01] hover:border-slate-400 shadow-2xs"
                          }`}
                          style={{
                            backgroundImage: `url(${slot.bgImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          {/* Translucent Overlay for perfect contrast */}
                          <div className={`absolute inset-0 transition-opacity ${slot.overlayGradient} ${isSelected ? "opacity-85" : "opacity-70 group-hover:opacity-50"}`} />

                          {/* Content */}
                          <div className="relative z-10 flex items-center justify-between w-full text-white">
                            <div className="flex items-center gap-2">
                              <span className="text-xl drop-shadow-md">{slot.icon}</span>
                              <span className="font-black text-xs sm:text-sm tracking-wide drop-shadow-md">
                                {isBadini ? slot.labelBadini : isKu ? slot.labelKu : slot.labelEn}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-mono font-black drop-shadow-md bg-black/50 px-2 py-0.5 rounded-lg border border-white/20 text-amber-200">
                                {slot.range}
                              </span>
                              {isSelected && (
                                <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shadow-md">
                                  ✓
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Exact Time Selectors */}
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[11px] font-bold text-slate-500">
                    {isBadini ? "یان کاتژمێر دیار بکە:" : isKu ? "یان کاتژمێر دیاری بکە:" : "Or select time:"}
                  </span>
                  <div className="flex items-center gap-2 flex-wrap relative">
                    {/* Start Time Select */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => { setOpenStartDropdown(!openStartDropdown); setOpenEndDropdown(false); }}
                        className={`flex items-center justify-between gap-1.5 bg-white px-3 py-2 rounded-xl border text-xs font-black transition cursor-pointer shadow-2xs ${
                          openStartDropdown ? "border-indigo-500 ring-2 ring-indigo-500/20 text-indigo-900" : "border-slate-200 hover:border-slate-300 text-slate-800"
                        }`}
                      >
                        <span className="text-[10px] text-indigo-500 font-bold">{isBadini || isKu ? "ژ:" : "From:"}</span>
                        <span>{startTime || (isBadini || isKu ? "دەسپێک..." : "Start...")}</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${openStartDropdown ? "rotate-180 text-indigo-600" : ""}`} />
                      </button>

                      {openStartDropdown && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setOpenStartDropdown(false)} />
                          <div className="absolute right-0 bottom-full mb-1.5 w-60 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden">
                            <div className="text-[11px] font-black text-slate-700 px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                              <span>{isBadini || isKu ? "کاتژمێرێ دەسپێکێ دیار بکە:" : "Start Time:"}</span>
                            </div>
                            <div className="p-2 max-h-48 overflow-y-auto grid grid-cols-2 gap-1">
                              {timeOptions.map((t) => (
                                <button
                                  key={`s2-${t}`}
                                  type="button"
                                  onClick={() => { setStartTime(t); setOpenStartDropdown(false); setPlannerTimeSlot(`${t} - ${endTime || '10:00 AM'}`); }}
                                  className={`px-2 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                                    startTime === t ? "bg-slate-900 text-white font-black" : "text-slate-700 hover:bg-slate-100 bg-slate-50/50"
                                  }`}
                                >
                                  <span>{t}</span>
                                  <span className="text-[10px] opacity-70">{t.includes("AM") ? "🌅" : "🌙"}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <span className="text-slate-400 font-black text-xs">-</span>

                    {/* End Time Select */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => { setOpenEndDropdown(!openEndDropdown); setOpenStartDropdown(false); }}
                        className={`flex items-center justify-between gap-1.5 bg-white px-3 py-2 rounded-xl border text-xs font-black transition cursor-pointer shadow-2xs ${
                          openEndDropdown ? "border-indigo-500 ring-2 ring-indigo-500/20 text-indigo-900" : "border-slate-200 hover:border-slate-300 text-slate-800"
                        }`}
                      >
                        <span className="text-[10px] text-purple-500 font-bold">{isBadini || isKu ? "بۆ:" : "To:"}</span>
                        <span>{endTime || (isBadini || isKu ? "دوماهیک..." : "End...")}</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${openEndDropdown ? "rotate-180 text-indigo-600" : ""}`} />
                      </button>

                      {openEndDropdown && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setOpenEndDropdown(false)} />
                          <div className="absolute right-0 bottom-full mb-1.5 w-60 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden">
                            <div className="text-[11px] font-black text-slate-700 px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                              <span>{isBadini || isKu ? "کاتژمێرێ دوماهیێ دیار بکە:" : "End Time:"}</span>
                            </div>
                            <div className="p-2 max-h-48 overflow-y-auto grid grid-cols-2 gap-1">
                              {timeOptions.map((t) => (
                                <button
                                  key={`e2-${t}`}
                                  type="button"
                                  onClick={() => { setEndTime(t); setOpenEndDropdown(false); setPlannerTimeSlot(`${startTime || '08:00 AM'} - ${t}`); }}
                                  className={`px-2 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                                    endTime === t ? "bg-slate-900 text-white font-black" : "text-slate-700 hover:bg-slate-100 bg-slate-50/50"
                                  }`}
                                >
                                  <span>{t}</span>
                                  <span className="text-[10px] opacity-70">{t.includes("AM") ? "🌅" : "🌙"}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Field 3: Colors */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  🎨 <span>{isBadini ? "٣. ڕەنگێ ئەرکی:" : isKu ? "٣. ڕەنگی ئەرک:" : "3. Task Color:"}</span>
                </span>
                <div className="flex items-center gap-2">
                  {pastelColors.map((col) => {
                    const isSelected = selectedColor === col.code;
                    return (
                      <button
                        key={col.code}
                        type="button"
                        onClick={() => setSelectedColor(col.code)}
                        className={`w-8 h-8 rounded-full transition transform hover:scale-110 flex items-center justify-center border border-slate-300/60 shadow-xs cursor-pointer ${
                          isSelected ? "scale-125 ring-2 ring-slate-900 ring-offset-2" : ""
                        }`}
                        style={{ backgroundColor: col.code }}
                        title={col.label}
                      >
                        {isSelected && <Check className="w-4 h-4 stroke-[3] text-slate-900" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Field 4: Subject Select */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs font-black text-slate-600 shrink-0">
                  {isBadini ? "بابەتێ پێکڤە گرێدای:" : isKu ? "بابەتی پەیوەندیدار:" : "Related Subject:"}
                </span>
                <select
                  value={plannerSubject}
                  onChange={(e) => setPlannerSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                >
                  {subjectsList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {isBadini ? s.nameBadini : isKu ? s.nameKu : s.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white font-black text-xs sm:text-sm rounded-2xl transition cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{isBadini ? "ئەرکێ نوێ زێدەکە بۆ ڤێ ڕوژێ" : isKu ? "ئەرکی نوێ زیادبکە بۆ ئەم ڕۆژە" : "Add Task for This Date"}</span>
              </button>
            </form>
          </div>

          {/* List of Tasks for Selected Date */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>
                  {isBadini ? `خشتەیێ خویندنا ڕێکخستی (${plannerDate}):` : isKu ? `خشتەی خوێندن (${plannerDate}):` : `Tasks for ${plannerDate}:`}
                </span>
              </h4>

              {dailyPlannerTasks.filter((t) => t.date === plannerDate).length > 0 && (
                <button
                  type="button"
                  onClick={() => setDailyPlannerTasks((prev) => prev.filter((t) => t.date !== plannerDate))}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 transition cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isBadini ? "پاقژکرنا لیسستێ" : isKu ? "پاککردنەوەی لیستەکە" : "Clear Tasks"}</span>
                </button>
              )}
            </div>

            {(() => {
              const tasksForDate = dailyPlannerTasks.filter((t) => t.date === plannerDate);

              if (tasksForDate.length === 0) {
                return (
                  <div className="p-8 text-center bg-white rounded-3xl border border-slate-200/90 shadow-2xs space-y-3">
                    <CalendarDays className="w-10 h-10 text-slate-300 mx-auto" />
                    <p className="text-sm font-black text-slate-700">
                      {isBadini ? "چ کار یان خشتە نینن بۆ ڤێ ڕێکەفتێ" : isKu ? "هیچ کارێک نییە بۆ ئەم ڕێکەوتە" : "No study tasks scheduled for this date."}
                    </p>
                    <p className="text-xs text-slate-500 font-bold max-w-md mx-auto">
                      {isBadini
                        ? "تۆ دشێی ب ڕێکا فۆڕما سەری ئەرکان زێدەبکەی یان ژی 'خشتەیێ پێشنیارکری یێ پۆلا ١٢' هەڵبژێری"
                        : isKu
                        ? "دەتوانی ئەرک زیاد بکەیت یان خشتەی پێشنیارکراو بەکاربهێنیت"
                        : "Add custom tasks above or click 'Add Grade 12 Preset Plan'."}
                    </p>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 gap-3">
                  {tasksForDate.map((task) => {
                    const subj = subjectsList.find((s) => s.id === task.subjectId);
                    const sName = subj ? (isBadini ? subj.nameBadini : isKu ? subj.nameKu : subj.nameEn) : task.subjectId;

                    return (
                      <div
                        key={task.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs ${
                          task.completed
                            ? "bg-slate-50/80 border-slate-200 opacity-80"
                            : "bg-white border-slate-200 hover:border-purple-300"
                        }`}
                      >
                        <div className="flex items-start sm:items-center gap-3">
                          <button
                            type="button"
                            onClick={() => togglePlannerTask(task.id)}
                            className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition cursor-pointer border ${
                              task.completed
                                ? "bg-emerald-600 border-emerald-700 text-white shadow-xs"
                                : "bg-white border-slate-300 hover:border-emerald-500 text-slate-400"
                            }`}
                          >
                            <Check className={`w-4 h-4 ${task.completed ? "stroke-[3]" : ""}`} />
                          </button>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <SubjectIcon subjectId={task.subjectId} size="xs" />
                              <span className="text-xs font-extrabold text-slate-900">{sName}</span>

                              <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 font-mono text-[11px] font-bold flex items-center gap-1">
                                <Clock className="w-3 h-3 text-purple-600" />
                                <span>{task.timeSlot}</span>
                              </span>

                              {task.priority === "high" && (
                                <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-black">
                                  🔥 {isBadini ? "فوری" : "High"}
                                </span>
                              )}
                            </div>

                            <p
                              className={`text-xs sm:text-sm font-bold leading-relaxed ${
                                task.completed ? "line-through text-slate-400" : "text-slate-800"
                              }`}
                            >
                              {task.taskText}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <button
                            type="button"
                            onClick={() => deletePlannerTask(task.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                            title="ژێبرن"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
