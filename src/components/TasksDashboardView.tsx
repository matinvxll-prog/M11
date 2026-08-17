import React, { useState, useEffect } from "react";
import {
  CheckSquare,
  Search,
  Bell,
  Calendar,
  Plus,
  Play,
  CheckCircle2,
  Clock,
  BarChart3,
  Sparkles,
  Filter,
  MoreVertical,
  Flame,
  AlertTriangle,
  ArrowRight,
  Trash2,
  X,
  Bot,
  Check,
  BookOpen,
  ChevronDown,
  Brain,
  Award,
  HelpCircle,
  Zap,
  RotateCcw,
  Star,
  Pencil
} from "lucide-react";
import { Language } from "../types";
import { grade12SyllabusData, SyllabusSubject, SyllabusChapter, SyllabusSection } from "../data/grade12Syllabus";

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  subject: string;
  subjectEn: string;
  chapterTitle?: string;
  sectionTitle?: string;
  priority: "high" | "medium" | "low";
  durationMinutes: number;
  completed: boolean;
  dueDate: "today" | "tomorrow" | string;
  requestAssessment?: boolean;
  assessedLevel?: "high" | "medium" | "low";
  assessedScore?: number;
}

interface TasksDashboardViewProps {
  language?: Language;
  onClose?: () => void;
  onStartTimerWithTask?: (taskTitle: string, subjectName: string) => void;
}

const DEFAULT_TASKS: TaskItem[] = [
  {
    id: "t-1",
    title: "بەندێ ٥ - یاسایێن نیوتن",
    description: "خویندنا وەرزێ پڕاوپڕ + تەمامکرنا کورتیێ",
    subject: "فیزیا",
    subjectEn: "Physics",
    chapterTitle: "بەندێ ٥: یاسایێن نیوتن",
    sectionTitle: "پشکا ١: یاسایێ ئێکێ یێ نیوتن",
    priority: "high",
    durationMinutes: 45,
    completed: true,
    dueDate: "today",
    requestAssessment: true,
  },
  {
    id: "t-2",
    title: "شیکارکرنا ٢٥ پرسیارێن وزاری",
    description: "کیمیا ئۆرگانیک - بەندێ ٣",
    subject: "کیمیا",
    subjectEn: "Chemistry",
    chapterTitle: "بەندێ ٣: کیمیا ئۆرگانیک",
    priority: "high",
    durationMinutes: 35,
    completed: false,
    dueDate: "today",
    requestAssessment: true,
  },
  {
    id: "t-3",
    title: "سەحکرنا وانا تەواوکاریێ (Integration)",
    description: "سەحکرنا ڤیدیۆیێ + چارەسەرکرنا نموونەیان",
    subject: "بیرکاری",
    subjectEn: "Mathematics",
    chapterTitle: "بەندێ ٤: تەواوکاری",
    priority: "medium",
    durationMinutes: 40,
    completed: false,
    dueDate: "today",
    requestAssessment: false,
  },
  {
    id: "t-4",
    title: "خویندنا یونتا ٧ (Unit 7)",
    description: "پەیڤێن نوی + خویندنەڤا تێکستی",
    subject: "ئینگلیزی",
    subjectEn: "English",
    priority: "medium",
    durationMinutes: 30,
    completed: false,
    dueDate: "today",
  },
  {
    id: "t-5",
    title: "پێداچوونا هەڵبەستا ٥",
    description: "خویندن و نڤێسینا خاڵێن سەرەکی",
    subject: "کوردی",
    subjectEn: "Kurdish",
    priority: "low",
    durationMinutes: 25,
    completed: true,
    dueDate: "today",
  },
];

const UPCOMING_TASKS_PRESET = [
  {
    id: "up-1",
    subject: "فیزیا",
    subjectEn: "Physics",
    title: "بەندێ ٦ - وەزە و توانابوون",
    due: "Tomorrow • 45 min",
    color: "bg-purple-500",
  },
  {
    id: "up-2",
    subject: "کیمیا",
    subjectEn: "Chemistry",
    title: "پێداچوونا بەندێ ٤",
    due: "Tomorrow • 40 min",
    color: "bg-emerald-500",
  },
  {
    id: "up-3",
    subject: "بیرکاری",
    subjectEn: "Mathematics",
    title: "چارەسەرکرنا پرسیارا وزاری 2023",
    due: "May 20 • 1h 30m",
    color: "bg-blue-500",
  },
];

const SUBJECT_OPTIONS = [
  { id: "all", nameKu: "هەموو", nameBadini: "هەمی", nameEn: "All" },
  { id: "Physics", nameKu: "فیزیا", nameBadini: "فیزیا", nameEn: "Physics" },
  { id: "Chemistry", nameKu: "کیمیا", nameBadini: "کیمیا", nameEn: "Chemistry" },
  { id: "Mathematics", nameKu: "بیرکاری", nameBadini: "بیرکاری", nameEn: "Mathematics" },
  { id: "Biology", nameKu: "زیندەوەرزانی", nameBadini: "زیندەوەرزانی", nameEn: "Biology" },
  { id: "English", nameKu: "ئینگلیزی", nameBadini: "ئینگلیزی", nameEn: "English" },
  { id: "Arabic", nameKu: "عەرەبی", nameBadini: "عەرەبی", nameEn: "Arabic" },
  { id: "Kurdish", nameKu: "کوردی", nameBadini: "کوردی", nameEn: "Kurdish" },
  { id: "Islamic", nameKu: "پەروەردەی ئیسلامی", nameBadini: "پەروەردیا ئیسلامی", nameEn: "Islamic Studies" },
];

export const TasksDashboardView: React.FC<TasksDashboardViewProps> = ({
  language = "badini",
  onClose,
  onStartTimerWithTask,
}) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";

  // Persistent task state
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const saved = localStorage.getItem("app_tasks_dashboard_list");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_TASKS;
  });

  useEffect(() => {
    try {
      localStorage.setItem("app_tasks_dashboard_list", JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  // Pomodoro history state for calculation
  const [pomodoroLogs, setPomodoroLogs] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("deg_pomodoro_logs");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubjectFilter, setActiveSubjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "pending">("all");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [activeMenuTaskId, setActiveMenuTaskId] = useState<string | null>(null);

  // New Task / Edit Task Modal States
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("Physics");
  const [selectedChapterId, setSelectedChapterId] = useState<string>("");
  const [selectedSectionId, setSelectedSectionId] = useState<string>("");
  const [customTaskTitle, setCustomTaskTitle] = useState<string>("");
  const [customDescription, setCustomDescription] = useState<string>("");
  
  // Priority & Duration
  const [priority, setPriority] = useState<"high" | "medium" | "low">("high");
  const [autoPriorityReason, setAutoPriorityReason] = useState<string>("");
  const [durationMinutes, setDurationMinutes] = useState<number>(35);

  // Post Task Quiz Prompt Toggle
  const [wantAssessmentQuiz, setWantAssessmentQuiz] = useState<boolean>(true);

  // Quiz Modal State after completing a task
  const [quizTask, setQuizTask] = useState<TaskItem | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Syllabus matching
  const currentSyllabusSubject: SyllabusSubject | undefined = grade12SyllabusData.find(
    (s) =>
      s.id.toLowerCase() === selectedSubjectId.toLowerCase() ||
      s.nameEn.toLowerCase() === selectedSubjectId.toLowerCase()
  );

  const availableChapters: SyllabusChapter[] = currentSyllabusSubject ? currentSyllabusSubject.chapters : [];
  
  const currentSyllabusChapter: SyllabusChapter | undefined = availableChapters.find(
    (c) => c.id === selectedChapterId
  );

  const availableSections: SyllabusSection[] = currentSyllabusChapter ? currentSyllabusChapter.sections : [];

  // Calculate Pomodoro studied time for chosen subject
  const getSubjectPomodoroMinutes = (subjectName: string): number => {
    const subLower = subjectName.toLowerCase();
    const totalMins = pomodoroLogs
      .filter((log) => {
        const s = (log.subjectId || log.subjectName || "").toLowerCase();
        return s.includes(subLower) || subLower.includes(s);
      })
      .reduce((acc, log) => acc + (log.durationMinutes || 0), 0);
    return totalMins > 0 ? totalMins : 110; // Default simulated 1h 50m if empty
  };

  const studiedMins = getSubjectPomodoroMinutes(selectedSubjectId);
  const studiedHoursFormatted = `${Math.floor(studiedMins / 60)}h ${studiedMins % 60}m`;

  // Auto detect priority whenever Subject or Chapter changes
  useEffect(() => {
    if (currentSyllabusChapter) {
      if (currentSyllabusChapter.chapterNumber.toString().includes("٤") ||
          currentSyllabusChapter.chapterNumber.toString().includes("٥") ||
          currentSyllabusChapter.chapterNumber.toString().includes("٣") ||
          currentSyllabusChapter.titleEn.toLowerCase().includes("organic") ||
          currentSyllabusChapter.titleEn.toLowerCase().includes("newton")) {
        setPriority("high");
        setAutoPriorityReason(
          isBadini
            ? "بریکارا زیرەک: ئاستێ گرنگیێ (High 🔥) هاتە دیارکرن ژبەر کو ئەڤ بەندە د تاقیکرنێن وزاری دا گرنگیەکا بەرز یا هەی."
            : "سیستەمی زیرەک: ئاستی گرنگی (High 🔥) دیارکرا چونکە ئەم بەندە لە تاقیکردنەوە وزارییەکان گرنگییەکی بەرزی هەیە."
        );
      } else {
        setPriority("medium");
        setAutoPriorityReason(
          isBadini
            ? "بریکارا زیرەک: ئاستێ گرنگیێ (Medium ⚠️) هاتە دیارکرن بۆ لێگەڕیان و خویندنا هاوسەنگ."
            : "سیستەمی زیرەک: ئاستی گرنگی (Medium ⚠️) دیارکرا بۆ خوێندنێکی هاوسەنگ."
        );
      }
    } else {
      setPriority("medium");
      setAutoPriorityReason(
        isBadini
          ? "بریکارا زیرەک: ئاستێ پێشبینیکری (Medium ⚠️) دیارە ل دووڤ بابەتێ هەڵبژارتی."
          : "سیستەمی زیرەک: ئاستی پێشبینیکراو (Medium ⚠️) دیارە بەپێی بابەتی هەڵبژێردراو."
      );
    }
  }, [selectedSubjectId, selectedChapterId, isBadini]);

  // Handle Edit Task Pre-fill
  const handleEditTask = (task: TaskItem) => {
    setEditingTaskId(task.id);
    setCustomTaskTitle(task.title);
    setCustomDescription(task.description);
    setDurationMinutes(task.durationMinutes);
    setPriority(task.priority);
    setWantAssessmentQuiz(task.requestAssessment ?? true);

    const matchedSub = SUBJECT_OPTIONS.find(
      (s) =>
        s.nameEn.toLowerCase() === task.subjectEn?.toLowerCase() ||
        s.nameBadini === task.subject ||
        s.nameKu === task.subject
    );
    if (matchedSub) {
      setSelectedSubjectId(matchedSub.id);
    }

    setIsAddTaskOpen(true);
    setActiveMenuTaskId(null);
  };

  // Handle Create / Update Task Submission
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();

    const matchedSubjectObj = SUBJECT_OPTIONS.find(
      (s) => s.id.toLowerCase() === selectedSubjectId.toLowerCase() || s.nameEn.toLowerCase() === selectedSubjectId.toLowerCase()
    );

    const chObj = availableChapters.find((c) => c.id === selectedChapterId);
    const secObj = availableSections.find((sec) => sec.id === selectedSectionId);

    const chapterTitleStr = chObj
      ? `${chObj.chapterNumber}: ${isBadini ? chObj.titleBadini : chObj.titleKu}`
      : "";

    const sectionTitleStr = secObj
      ? `${isBadini ? secObj.titleBadini : secObj.titleKu}`
      : "";

    // Generate smart title if user left empty
    let finalTitle = customTaskTitle.trim();
    if (!finalTitle) {
      if (sectionTitleStr) {
        finalTitle = `${chapterTitleStr} - ${sectionTitleStr}`;
      } else if (chapterTitleStr) {
        finalTitle = `${chapterTitleStr}`;
      } else {
        finalTitle = isBadini ? `وانا بابەتێ ${matchedSubjectObj?.nameBadini || selectedSubjectId}` : `وانەی بابەتی ${matchedSubjectObj?.nameKu || selectedSubjectId}`;
      }
    }

    let finalDesc = customDescription.trim();
    if (!finalDesc) {
      finalDesc = isBadini
        ? `خویندنا تەمام + چارەسەرکرنا ڕاهێنانێن وزاری (${durationMinutes} خولەک)`
        : `خوێندنی تەواو + چارەسەرکردنی ڕاهێنانی وزاری (${durationMinutes} خولەک)`;
    }

    if (editingTaskId) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTaskId
            ? {
                ...t,
                title: finalTitle,
                description: finalDesc,
                subject: matchedSubjectObj ? (isBadini ? matchedSubjectObj.nameBadini : matchedSubjectObj.nameKu) : selectedSubjectId,
                subjectEn: matchedSubjectObj ? matchedSubjectObj.nameEn : selectedSubjectId,
                chapterTitle: chapterTitleStr || t.chapterTitle,
                sectionTitle: sectionTitleStr || t.sectionTitle,
                priority: priority,
                durationMinutes: durationMinutes,
                requestAssessment: wantAssessmentQuiz,
              }
            : t
        )
      );
      setEditingTaskId(null);
      showToast(isBadini ? "ئەرک ب سەرکەفتن هاتە دەستکاری کرن! ✏️" : "ئەرک بە سەرکەوتوویی دەستکاری کرا! ✏️");
    } else {
      const newTask: TaskItem = {
        id: "t-" + Date.now(),
        title: finalTitle,
        description: finalDesc,
        subject: matchedSubjectObj ? (isBadini ? matchedSubjectObj.nameBadini : matchedSubjectObj.nameKu) : selectedSubjectId,
        subjectEn: matchedSubjectObj ? matchedSubjectObj.nameEn : selectedSubjectId,
        chapterTitle: chapterTitleStr,
        sectionTitle: sectionTitleStr,
        priority: priority,
        durationMinutes: durationMinutes,
        completed: false,
        dueDate: "today",
        requestAssessment: wantAssessmentQuiz,
      };

      setTasks([newTask, ...tasks]);
      showToast(isBadini ? "ئەرکێ نوی ب سەرکەفتن هاتە زێدەکرن! 🎯" : "ئەرکی نوێ بە سەرکەوتوویی زێدەکرا! 🎯");
    }
    
    // Reset inputs
    setCustomTaskTitle("");
    setCustomDescription("");
    setSelectedChapterId("");
    setSelectedSectionId("");
    setIsAddTaskOpen(false);
  };

  // Toggle Task Completion & Trigger Quiz Assessment if requested
  const toggleTaskCompletion = (task: TaskItem) => {
    const isNowCompleted = !task.completed;

    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, completed: isNowCompleted } : t))
    );

    if (isNowCompleted && task.requestAssessment) {
      // Trigger Quiz Evaluation modal
      setQuizTask(task);
      setCurrentQuizIndex(0);
      setSelectedAnswerIndex(null);
      setQuizCompleted(false);
      setQuizScore(0);
      setUserAnswers([]);
    } else if (isNowCompleted) {
      showToast(isBadini ? "ئەرک ب سەرکەفتن هاتە ئەنجامدان! 🎉" : "ئەرک بە سەرکەوتوویی ئەنجامدرا! 🎉");
    }
  };

  // Delete Task
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setActiveMenuTaskId(null);
    showToast(isBadini ? "ئەرک هاتە سڕینەوە" : "ئەرک سڕایەوە");
  };

  // AI Generate Study Plan preset
  const handleGenerateAiPlan = () => {
    const aiTasks: TaskItem[] = [
      {
        id: "ai-" + Date.now() + "-1",
        title: "پرسیارێن وزاری 2023 - بەندێ ٤",
        description: "شیکارکرنا ۲٠ پرسیارێن سەرەکی یێن ڕاهێنانان",
        subject: "فیزیا",
        subjectEn: "Physics",
        priority: "high",
        durationMinutes: 45,
        completed: false,
        dueDate: "today",
        requestAssessment: true,
      },
      {
        id: "ai-" + Date.now() + "-2",
        title: "کیمیا ئۆرگانیک - تێکەڵە و هاوکێشەکان",
        description: "پێداچوونا یاسایان و خاڵێن گرنگ",
        subject: "کیمیا",
        subjectEn: "Chemistry",
        priority: "high",
        durationMinutes: 30,
        completed: false,
        dueDate: "today",
        requestAssessment: true,
      },
    ];

    setTasks((prev) => [...aiTasks, ...prev]);
    showToast(isBadini ? "پلانا زیرەک زێدەبوو بۆ ئەرکێن تە" : "پلانی زیرەک زێدەبوو بۆ ئەرکەکانت");
  };

  // Calculations
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const remainingCount = totalCount - completedCount;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Total planned time for remaining tasks
  const remainingPlannedMinutes = tasks
    .filter((t) => !t.completed)
    .reduce((acc, t) => acc + t.durationMinutes, 0);

  const hoursPlanned = Math.floor(remainingPlannedMinutes / 60);
  const minsPlanned = remainingPlannedMinutes % 60;
  const plannedTimeFormatted =
    hoursPlanned > 0 ? `${hoursPlanned}h ${minsPlanned}m` : `${minsPlanned}m`;

  // Filtered Tasks
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subjectEn.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubject =
      activeSubjectFilter === "all" ||
      t.subjectEn.toLowerCase() === activeSubjectFilter.toLowerCase() ||
      t.subject.toLowerCase() === activeSubjectFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "completed"
        ? t.completed
        : !t.completed;

    return matchesSearch && matchesSubject && matchesStatus;
  });

  // Current Date string
  const currentDateStr = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Sample Ministerial Quiz Questions for Level Assessment
  const QUIZ_QUESTIONS = [
    {
      question: isBadini
        ? `د دیارکرنا یاسایێن نیوتن دا، تەوانیا تێنێری (Inertia) بەستایە ب کیژ بڕێ ڤە؟`
        : `لە یاساکانی نیوتن دا، بارستەی نەگۆڕ (Inertia) بەندە لەسەر چ بڕێک؟`,
      options: [
        isBadini ? "بارستە (Mass)" : "بارستە (Mass)",
        isBadini ? "خێرایی (Velocity)" : "خێرایی (Velocity)",
        isBadini ? "هێز (Force)" : "هێز (Force)",
        isBadini ? "تاودان (Acceleration)" : "تاودان (Acceleration)"
      ],
      correctIndex: 0
    },
    {
      question: isBadini
        ? `د ڤی بابەتی دا، دەمێ ڕێژەیا تێکڕای وزەی ڕاهێنانێ دووبارە دبیت، هاوکێشە دچیتە کیژ ئاستی؟`
        : `لە تاقیکردنەوەیەم بابەتەدا، کاتێک ڕێژەی تێکڕای وزە دووبارە دەبێتەوە، هاوکێشە دەچێتە چ ئاستێک؟`,
      options: [
        isBadini ? "ئاستێ هاوسەنگ" : "ئاستی هاوسەنگ",
        isBadini ? "ئاستێ سەکۆ" : "ئاستی سەکۆ",
        isBadini ? "ئاستێ بەرزبوونەوە" : "ئاستی بەرزبوونەوە",
        isBadini ? "هیچ کامیک" : "هیچ کامێک"
      ],
      correctIndex: 0
    },
    {
      question: isBadini
        ? `ڕێژەیا سەرکەوتنا تە د شیاریێن وزاری یێن ڤی بەندی دا چەندە د وەڵامدانەڤەیان دا؟`
        : `ڕێژەی سەرکەوتنت لە پرسیارە وزارییەکانی ئەم بەندەدا چەندە؟`,
      options: [
        isBadini ? "تەمام و بێ هەڵە (%100)" : "تەواو و بێ هەڵە (%100)",
        isBadini ? "زۆر باش (%85)" : "زۆر باش (%85)",
        isBadini ? "باش (%70)" : "باش (%70)",
        isBadini ? "پێویستی بە پێداچوونەوەیە" : "پێویستی بە پێداچوونەوەیە"
      ],
      correctIndex: 0
    }
  ];

  const handleSelectQuizAnswer = (idx: number) => {
    setSelectedAnswerIndex(idx);
  };

  const handleNextQuizQuestion = () => {
    const isCorrect = selectedAnswerIndex === QUIZ_QUESTIONS[currentQuizIndex].correctIndex;
    const finalScore = quizScore + (isCorrect ? 1 : 0);
    setUserAnswers((prev) => [...prev, selectedAnswerIndex]);
    if (isCorrect) {
      setQuizScore(finalScore);
    }

    if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedAnswerIndex(null);
    } else {
      setQuizCompleted(true);
      // Calculate level based on quiz results (لدیڤ کویزاوی)
      let assessedLvl: "high" | "medium" | "low" = "medium";
      if (finalScore >= 3) {
        assessedLvl = "high";
      } else if (finalScore === 2) {
        assessedLvl = "medium";
      } else {
        assessedLvl = "low";
      }

      if (quizTask) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === quizTask.id
              ? {
                  ...t,
                  priority: assessedLvl,
                  assessedLevel: assessedLvl,
                  assessedScore: finalScore,
                }
              : t
          )
        );
      }
    }
  };

  return (
    <div className="w-full min-h-full bg-[#0c0626] text-white p-3 sm:p-6 space-y-5 rounded-3xl selection:bg-purple-500/30 font-sans relative">
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] bg-purple-600 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-2xl border border-purple-300/40 animate-bounce flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-purple-500/20">
        {/* LEFT: TITLE & ICON */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 border border-purple-400/30 flex items-center justify-center shadow-lg shadow-purple-900/50 shrink-0">
            <CheckSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              {isBadini ? "ئەرکەکان (Tasks & Study Syllabus)" : "ئەرکەکان (Tasks & Study Syllabus)"}
            </h1>
            <p className="text-xs text-purple-300/80 font-medium">
              {isBadini
                ? "ئەرکێن خۆ ل دووڤ بابەت، بەند و پشکان ڕێکخبە دگەل شیکارکرنا دەمی و تاقیکرنا ئاستی."
                : "ئەرکەکانت بەپێی بابەت، بەند و بەشەکان ڕێکبخە لەگەڵ شیکارکردنی کات و تاقیکردنەوەی ئاست."}
            </p>
          </div>
        </div>

        {/* RIGHT: SEARCH BAR + NOTIFICATIONS + MASCOT/BACK */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap w-full md:w-auto">
          {/* SEARCH INPUT */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBadini ? "گەڕیان ل ناف ئەرکاندا..." : "گەڕان لە ئەرکەکاندا..."}
              className="w-full bg-[#180e38] border border-purple-500/30 rounded-2xl pl-9 pr-3 py-2 text-xs text-white placeholder-purple-400/60 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* BELL BUTTON */}
          <button
            type="button"
            onClick={() => showToast(isBadini ? "٣ ئەرکێن گرنگ یێن ئەڤرۆ هەنە" : "٣ ئەرکی گرنگی ئەمڕۆت هەیە")}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#180e38] border border-purple-500/30 hover:border-purple-400/60 text-purple-300 flex items-center justify-center transition cursor-pointer relative shrink-0 shadow-sm"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600 text-[10px] font-black text-white flex items-center justify-center border border-purple-900 shadow">
              3
            </span>
          </button>

          {/* CLOSE / BACK BUTTON (IF MODAL) */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-500/30 flex items-center justify-center transition cursor-pointer shrink-0 shadow-sm"
              title={isBadini ? "داخستن" : "داخستن"}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* SUBJECT FILTER TABS ROW */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 no-scrollbar">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {SUBJECT_OPTIONS.map((sub) => {
            const isActive = activeSubjectFilter.toLowerCase() === sub.id.toLowerCase();
            const label = isBadini ? sub.nameBadini : isKu ? sub.nameKu : sub.nameEn;
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => setActiveSubjectFilter(sub.id)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl text-xs font-bold transition cursor-pointer whitespace-nowrap border ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-md shadow-purple-900/60 scale-[1.02]"
                    : "bg-[#160d36]/90 border-purple-500/20 text-purple-200/80 hover:bg-[#1f1348] hover:border-purple-500/40"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* STATUS FILTER DROPDOWN TOGGLE */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-[#160d36] border border-purple-500/30 hover:border-purple-400 text-xs font-bold text-purple-200 flex items-center gap-1.5 transition cursor-pointer shadow-sm"
          >
            <Filter className="w-3.5 h-3.5 text-purple-400" />
            <span>{isBadini ? "فلتەر" : "فلتەر"}</span>
          </button>

          {isFilterMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-[#140b2e] border border-purple-500/40 rounded-2xl shadow-2xl p-2 z-30 space-y-1 animate-fadeIn">
              <button
                type="button"
                onClick={() => {
                  setStatusFilter("all");
                  setIsFilterMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition ${
                  statusFilter === "all" ? "bg-purple-600 text-white" : "text-purple-300 hover:bg-purple-900/40"
                }`}
              >
                <span>{isBadini ? "هەمی ئەرک" : "هەموو ئەرکەکان"}</span>
                {statusFilter === "all" && <Check className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStatusFilter("completed");
                  setIsFilterMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition ${
                  statusFilter === "completed" ? "bg-purple-600 text-white" : "text-purple-300 hover:bg-purple-900/40"
                }`}
              >
                <span>{isBadini ? "ئەنجامدران" : "تەواوکراوەکان"}</span>
                {statusFilter === "completed" && <Check className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStatusFilter("pending");
                  setIsFilterMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition ${
                  statusFilter === "pending" ? "bg-purple-600 text-white" : "text-purple-300 hover:bg-purple-900/40"
                }`}
              >
                <span>{isBadini ? "تەواونەکراوەکان" : "ماوەکان"}</span>
                {statusFilter === "pending" && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MAIN LAYOUT: LEFT TASKS + RIGHT SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: TODAY'S TASKS CARD & TASK LIST (8 COLS) */}
        <div className="lg:col-span-8 space-y-4">
          {/* TODAY'S TASKS BANNER CONTAINER */}
          <div className="bg-[#130b35]/90 border border-purple-500/30 rounded-3xl p-4 sm:p-5 shadow-xl shadow-purple-950/60 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* HEADER WITH CALENDAR & DATE */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-white">
                    {isBadini ? "ئەرکێن ئەڤرۆ (Today's Tasks)" : "ئەرکەکانی ئەمڕۆ (Today's Tasks)"}
                  </h2>
                  <span className="text-[11px] font-semibold text-purple-300/60">
                    {currentDateStr}
                  </span>
                </div>
              </div>

              {/* ADD TASK BUTTON */}
              <button
                type="button"
                onClick={() => setIsAddTaskOpen(true)}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-900/60 transition cursor-pointer active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>{isBadini ? "زێدەکرنا ئەرکێ نوی" : "زێدەکردنی ئەرکی نوێ"}</span>
              </button>
            </div>

            {/* DAILY PROGRESS BAR BAR */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs font-bold text-purple-200">
                <span className="text-purple-300/80">Daily Progress</span>
                <div className="flex items-center gap-3">
                  <span className="text-purple-300/90">
                    {completedCount} / {totalCount} completed
                  </span>
                  <span className="text-white font-black">{completionPercentage}%</span>
                </div>
              </div>

              {/* PROGRESS BAR TRACK */}
              <div className="w-full h-3 rounded-full bg-purple-950/80 border border-purple-500/20 overflow-hidden p-0.5 shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-400 transition-all duration-500 shadow-sm shadow-purple-500/50"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* TASKS LIST ITEMS */}
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="p-8 rounded-3xl bg-[#130b35]/60 border border-purple-500/20 text-center space-y-3">
                <CheckSquare className="w-10 h-10 text-purple-400/50 mx-auto" />
                <h3 className="text-sm font-bold text-purple-200">
                  {isBadini ? "هیچ ئەرکەک نەهاتە لیتکرن!" : "هیچ ئەرکێک نەدۆزرایەوە!"}
                </h3>
                <p className="text-xs text-purple-300/60 max-w-xs mx-auto">
                  {isBadini
                    ? "تکایە بەشەکێ دی هەڵبژێرە یان ئەرکەکێ نوی دروست بکە."
                    : "تکایە بەشێکی تر هەڵبژێرە یان ئەرکێکی نوێ دروست بکە."}
                </p>
                <button
                  type="button"
                  onClick={() => setIsAddTaskOpen(true)}
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs"
                >
                  {isBadini ? "+ زێدەکرنا ئەرکی" : "+ زێدەکردنی ئەرک"}
                </button>
              </div>
            ) : (
              filteredTasks.map((task) => {
                const isCompleted = task.completed;
                return (
                  <div
                    key={task.id}
                    className={`group relative rounded-2xl border p-4 transition-all duration-200 shadow-lg ${
                      isCompleted
                        ? "bg-[#130b30]/70 border-purple-500/20 opacity-90"
                        : "bg-[#170e3d]/90 hover:bg-[#1d124c] border-purple-500/30 hover:border-purple-400/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      {/* CHECKBOX + SUBJECT BADGES + TITLE */}
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {/* CUSTOM CHECKBOX BUTTON */}
                        <button
                          type="button"
                          onClick={() => toggleTaskCompletion(task)}
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center transition cursor-pointer mt-0.5 shrink-0 ${
                            isCompleted
                              ? "bg-purple-600 border-purple-400 text-white shadow-md shadow-purple-900/80"
                              : "bg-purple-950/60 border-purple-500/40 text-transparent hover:border-purple-400"
                          }`}
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                        </button>

                        <div className="space-y-1.5 flex-1 min-w-0">
                          {/* BADGES ROW */}
                          <div className="flex items-center gap-2 flex-wrap">
                            {/* SUBJECT BADGE */}
                            <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-black bg-purple-950/70 border border-purple-500/40 text-purple-300">
                              {task.subject}
                            </span>

                            {/* CHAPTER BADGE IF AVAILABLE */}
                            {task.chapterTitle && (
                              <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-indigo-950/70 border border-indigo-500/40 text-indigo-300">
                                {task.chapterTitle}
                              </span>
                            )}

                            {/* LEVEL ASSESSMENT STAR BUTTON */}
                            {task.assessedLevel ? (
                              <button
                                type="button"
                                onClick={() => {
                                  setQuizTask(task);
                                  setCurrentQuizIndex(0);
                                  setSelectedAnswerIndex(null);
                                  setQuizCompleted(true);
                                }}
                                className="px-2.5 py-1 rounded-xl text-[10px] font-black bg-gradient-to-r from-purple-950 to-indigo-950 border border-amber-500/50 text-amber-300 flex items-center gap-1.5 shadow-sm hover:border-amber-300 transition cursor-pointer"
                              >
                                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300 shrink-0" />
                                <span>
                                  {isBadini ? "ئاستێ تە:" : "ئاستت:"}{" "}
                                  {task.assessedLevel === "high"
                                    ? isBadini ? "بەرز 🔥" : "بەرز 🔥"
                                    : task.assessedLevel === "medium"
                                    ? isBadini ? "ناوەند ⚠️" : "ناوەند ⚠️"
                                    : isBadini ? "پێداچوونەوە 🟢" : "پێداچوونەوە 🟢"}
                                </span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  setQuizTask(task);
                                  setCurrentQuizIndex(0);
                                  setSelectedAnswerIndex(null);
                                  setQuizCompleted(false);
                                  setQuizScore(0);
                                  setUserAnswers([]);
                                }}
                                className="px-2.5 py-1 rounded-xl text-[10px] font-black bg-gradient-to-r from-amber-500/20 via-purple-900/60 to-indigo-900/60 border border-amber-400/50 text-amber-300 hover:text-white hover:border-amber-300 flex items-center gap-1.5 shadow-md transition cursor-pointer active:scale-95"
                              >
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-300 shrink-0 animate-pulse" />
                                <span>
                                  {isBadini
                                    ? "دیارکرنا ئاستی 🌟 (تاقیکرنێ بکە دا ئاستێ خۆ دیار بکەی پشتی خاندنا ڤی بابەتی خلاس دکەی)"
                                    : "دیاری کردنی ئاست 🌟 (تاقیکردنەوە بکە تا ئاستت دیاری بکەیت پاش تەواوکردنی ئەم بابەتە)"}
                                </span>
                              </button>
                            )}
                          </div>

                          {/* TASK TITLE & DESCRIPTION */}
                          <div>
                            <h3
                              className={`font-black text-sm sm:text-base transition ${
                                isCompleted
                                  ? "text-purple-300/60 line-through"
                                  : "text-white group-hover:text-purple-200"
                              }`}
                            >
                              {task.title}
                            </h3>
                            <p className="text-xs text-purple-300/70 font-medium truncate">
                              {task.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT ACTION CONTROLS */}
                      <div className="flex items-center gap-2 shrink-0 self-center">
                        {/* DURATION BADGE */}
                        <div className="hidden sm:flex items-center gap-1 text-xs text-purple-300/80 font-semibold bg-purple-950/50 px-2.5 py-1 rounded-xl border border-purple-500/20">
                          <Clock className="w-3.5 h-3.5 text-purple-400" />
                          <span>{task.durationMinutes} min</span>
                        </div>

                        {/* START / COMPLETED ACTION BUTTON */}
                        {isCompleted ? (
                          <span className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1 shadow-sm">
                            <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                            <span>Completed</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              if (onStartTimerWithTask) {
                                onStartTimerWithTask(task.title, task.subject);
                              } else {
                                toggleTaskCompletion(task);
                                showToast(isBadini ? "دەستپێکرنا تەرکیزێ" : "دەستپێکردنی تەرکیز");
                              }
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-950 transition cursor-pointer active:scale-95"
                          >
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>Start</span>
                          </button>
                        )}

                        {/* MENU OPTIONS (THREE DOTS) */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveMenuTaskId(
                                activeMenuTaskId === task.id ? null : task.id
                              )
                            }
                            className="p-1.5 rounded-xl text-purple-400 hover:text-white hover:bg-purple-900/40 transition"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {activeMenuTaskId === task.id && (
                            <div className="absolute right-0 top-full mt-1 w-36 bg-[#140b2e] border border-purple-500/40 rounded-xl shadow-2xl p-1 z-30 animate-fadeIn space-y-0.5">
                              <button
                                type="button"
                                onClick={() => handleEditTask(task)}
                                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold text-purple-200 hover:bg-purple-900/50 flex items-center gap-2 cursor-pointer transition"
                              >
                                <Pencil className="w-3.5 h-3.5 text-purple-300" />
                                <span>{isBadini ? "دەستکاری کرن" : "دەستکاریکردن"}</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteTask(task.id)}
                                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-950/50 flex items-center gap-2 cursor-pointer transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>{isBadini ? "سڕینەوە" : "سڕینەوە"}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* PROGRESS LINE UNDER TASK */}
                    <div className="mt-3 w-full h-1 rounded-full bg-purple-950/60 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isCompleted
                            ? "bg-purple-500 w-full"
                            : "bg-purple-800/40 w-0"
                        }`}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR WIDGETS (4 COLS) */}
        <div className="lg:col-span-4 space-y-4">
          {/* TASK SUMMARY CARD (2X2 GRID) */}
          <div className="bg-[#130b35]/90 border border-purple-500/30 rounded-3xl p-5 shadow-xl shadow-purple-950/60 space-y-4">
            <h3 className="font-black text-base text-white">Task Summary</h3>

            <div className="grid grid-cols-2 gap-3">
              {/* COMPLETED CARD */}
              <div className="p-3.5 rounded-2xl bg-[#180e3c]/90 border border-purple-500/20 flex flex-col items-center justify-center text-center space-y-1">
                <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xl font-black text-white">{completedCount}</span>
                <span className="text-[11px] font-semibold text-purple-300/70">Completed</span>
              </div>

              {/* REMAINING CARD */}
              <div className="p-3.5 rounded-2xl bg-[#180e3c]/90 border border-purple-500/20 flex flex-col items-center justify-center text-center space-y-1">
                <div className="w-8 h-8 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-xl font-black text-white">{remainingCount}</span>
                <span className="text-[11px] font-semibold text-purple-300/70">Remaining</span>
              </div>

              {/* PLANNED TIME CARD */}
              <div className="p-3.5 rounded-2xl bg-[#180e3c]/90 border border-purple-500/20 flex flex-col items-center justify-center text-center space-y-1">
                <div className="w-8 h-8 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-base sm:text-lg font-black text-white">
                  {plannedTimeFormatted}
                </span>
                <span className="text-[11px] font-semibold text-purple-300/70">Planned Time</span>
              </div>

              {/* DAILY PROGRESS % CARD */}
              <div className="p-3.5 rounded-2xl bg-[#180e3c]/90 border border-purple-500/20 flex flex-col items-center justify-center text-center space-y-1">
                <div className="w-8 h-8 rounded-xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <span className="text-xl font-black text-white">{completionPercentage}%</span>
                <span className="text-[11px] font-semibold text-purple-300/70">Daily Progress</span>
              </div>
            </div>
          </div>

          {/* UPCOMING TASKS CARD */}
          <div className="bg-[#130b35]/90 border border-purple-500/30 rounded-3xl p-5 shadow-xl shadow-purple-950/60 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-base text-white">Upcoming Tasks</h3>
              <button
                type="button"
                onClick={() => showToast(isBadini ? "ئەرکێن پاشەڕۆژێ" : "ئەرکەکانی ئایەندە")}
                className="text-xs font-bold text-purple-300 hover:text-white flex items-center gap-1 transition"
              >
                <span>See All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {UPCOMING_TASKS_PRESET.map((up) => (
                <div
                  key={up.id}
                  className="p-3 rounded-2xl bg-[#180e3c]/70 border border-purple-500/20 flex items-center gap-3"
                >
                  <div className={`w-3 h-3 rounded-full ${up.color} shrink-0 shadow-sm`} />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-black text-purple-300/80 block">
                      {up.subject}
                    </span>
                    <h4 className="text-xs font-bold text-white truncate">{up.title}</h4>
                    <span className="text-[10px] font-medium text-purple-300/60">
                      {up.due}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI SUGGESTION CARD */}
          <div className="relative rounded-3xl bg-gradient-to-br from-purple-900/90 via-indigo-950/90 to-slate-950/95 border border-purple-500/40 p-5 shadow-2xl shadow-purple-950 space-y-4 overflow-hidden">
            {/* AMBIENT GLOW */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-600/80 border border-purple-300/40 flex items-center justify-center text-white shrink-0 shadow-lg shadow-purple-900/80">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-sm text-white flex items-center gap-1.5">
                  <span>AI Suggestion</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h3>
                <p className="text-[11px] text-purple-200/70 font-medium">
                  {isBadini ? "ڕێنماییا زیرەکا خوێندنێ" : "ڕێنمایی زیرەکی خوێندن"}
                </p>
              </div>
            </div>

            <p className="text-xs text-purple-100/90 font-medium leading-relaxed bg-purple-950/40 p-3 rounded-2xl border border-purple-500/20">
              "Focus more on Physics and Chemistry this week. You have upcoming exams!"
            </p>

            <button
              type="button"
              onClick={handleGenerateAiPlan}
              className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xl shadow-purple-900/60 transition cursor-pointer active:scale-95 border border-purple-400/40"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Generate Study Plan</span>
            </button>
          </div>
        </div>
      </div>

      {/* CREATE NEW TASK MODAL */}
      {isAddTaskOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-xl bg-[#0e0728] border border-purple-500/40 rounded-3xl text-white shadow-2xl shadow-purple-950 flex flex-col max-h-[90vh] overflow-hidden my-auto">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between p-5 sm:p-6 pb-4 border-b border-purple-500/20 bg-[#0e0728] shrink-0 z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                  {editingTaskId ? (
                    <Pencil className="w-5 h-5 text-purple-200" />
                  ) : (
                    <Plus className="w-5 h-5 stroke-[3]" />
                  )}
                </div>
                <div>
                  <h3 className="font-black text-base text-white">
                    {editingTaskId
                      ? isBadini
                        ? "دەستکاریکرنا ئەرکی (Edit Task)"
                        : "دەستکاریکردنی ئەرک (Edit Task)"
                      : isBadini
                      ? "زێدەکرنا ئەرکێ نوی (Syllabus Task)"
                      : "زێدەکردنی ئەرکی نوێ (Syllabus Task)"}
                  </h3>
                  <p className="text-xs text-purple-300/70 font-medium">
                    {isBadini ? "بابەت، بەند، پشک و ئاستێ گرنگیێ دیاری بکە" : "بابەت، بەند، پشک و ئاستی گرنگی دیاری بکە"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAddTaskOpen(false);
                  setEditingTaskId(null);
                }}
                className="w-8 h-8 rounded-xl bg-purple-900/40 hover:bg-purple-800 text-purple-300 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* SCROLLABLE FORM BODY */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
              <form onSubmit={handleCreateTask} className="space-y-4">
              {/* 1. QUIZ & LEVEL EVALUATION (کوێز و دیارکرنا ئاستی - لدەستپێکێ) */}
              <div className="bg-gradient-to-r from-purple-950/90 via-[#150c38] to-indigo-950/90 border border-purple-500/40 p-4 rounded-2xl space-y-2.5 shadow-lg">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-amber-300 animate-pulse shrink-0" />
                  <h4 className="text-xs font-black text-white">
                    {isBadini ? "کوێز و دیارکرنا ئاستی (Quiz Evaluation)" : "کوێز و دیارکردنی ئاست (Quiz Evaluation)"}
                  </h4>
                </div>

                <div className="p-3 rounded-xl bg-purple-950/70 border border-purple-500/30 text-[11px] text-purple-100 leading-relaxed space-y-1.5 shadow-inner">
                  <p className="font-bold text-amber-200">
                    {isBadini
                      ? "📌 پشتی تو ڤی بابەتی خلاس دکەی و کلیکێ ل سەر 'تەمامبوون' دکەی:"
                      : "📌 پاش ئەوەی ئەم بابەتە تەواو دەکەیت و کلیک لەسەر 'تەمامبوون' دەکەیت:"}
                  </p>
                  <p className="text-purple-200/90">
                    {isBadini
                      ? "دێ تاقیکرنەک (کوێز) ب وی بابەتێ تە خاندی بۆ تە هێتە کرن. پشتی تاقیکرنێ دێ ئاستێ تە دیار بیت کا چەوا ییە. ئەڤ چەندە دێ بۆ تە بساناهی بیت ژبەرکو دێ ئاستێ تە د ڤی بابەتی دا بۆ تە بەرچاو کەین و وان پرسیاران ژی دیار کەین یێن تە خەڵەتی تێدا کری، دا کو لدەمێ پێداچوونێ بساناهی بزانی ئاستێ تە ل کیڤە باش نینە د ڤی بابەتی دا."
                      : "تاقیکردنەوەیەک (کوێز) بەو بابەتەی خوێندتووە بۆت دەکرێت. پاش تاقیکردنەوەکە ئاستت دیاری دەکرێت. ئەم چەندە بۆت ئاسان دەبێت چونکە ئاستت لەم بابەتەدا بەرچاو دەکرێت و ئەو پرسیارانەی هەڵەت تێدا کردوون دیاری دەکرێن، تاوەکو لە کاتی پێداچوونەوەدا بە ئاسانی بزانیت ئاستت لە کوێدا باش نییە."}
                  </p>
                </div>
              </div>

              {/* 2. SUBJECT SELECTION (بابەت) */}
              <div>
                <label className="text-xs font-extrabold text-purple-200 block mb-1.5 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span>{isBadini ? "١. بابەتێ مەبەست هەڵبژێرە (Subject):" : "١. بابەتی مەبەست هەڵبژێرە (Subject):"}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SUBJECT_OPTIONS.filter((s) => s.id !== "all").map((s) => {
                    const isSelected = selectedSubjectId.toLowerCase() === s.id.toLowerCase();
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setSelectedSubjectId(s.id);
                          setSelectedChapterId("");
                          setSelectedSectionId("");
                        }}
                        className={`p-2.5 rounded-xl text-xs font-bold text-center border transition flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? "bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-950 scale-[1.02]"
                            : "bg-[#170e3c] border-purple-500/20 text-purple-300 hover:bg-purple-900/40"
                        }`}
                      >
                        <span className="truncate">{isBadini ? s.nameBadini : isKu ? s.nameKu : s.nameEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. CHAPTER & SECTION SELECTION (بەندێ چەندێ یان وانا چەندێ یان پشکا چەندێ) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#140b33]/60 p-3.5 rounded-2xl border border-purple-500/20">
                {/* CHAPTER (بەند) */}
                <div>
                  <label className="text-xs font-extrabold text-purple-200 block mb-1">
                    {isBadini ? "بەندێ هەڵبژارتی (Chapter):" : "بەندی هەڵبژێردراو (Chapter):"}
                  </label>
                  <select
                    value={selectedChapterId}
                    onChange={(e) => {
                      setSelectedChapterId(e.target.value);
                      setSelectedSectionId("");
                    }}
                    className="w-full bg-[#170e3c] border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  >
                    <option value="">
                      -- {isBadini ? "هەمی بەند (گشتی)" : "هەموو بەندەکان (گشتی)"} --
                    </option>
                    {availableChapters.map((ch) => (
                      <option key={ch.id} value={ch.id}>
                        {ch.chapterNumber}: {isBadini ? ch.titleBadini : ch.titleKu}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SECTION (پشک / وانە) */}
                <div>
                  <label className="text-xs font-extrabold text-purple-200 block mb-1">
                    {isBadini ? "پشک یان وانا هەڵبژارتی (Section):" : "بەش یان وانەی هەڵبژێردراو (Section):"}
                  </label>
                  <select
                    value={selectedSectionId}
                    onChange={(e) => setSelectedSectionId(e.target.value)}
                    disabled={!selectedChapterId || availableSections.length === 0}
                    className="w-full bg-[#170e3c] border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400 disabled:opacity-40"
                  >
                    <option value="">
                      -- {isBadini ? "هەمی پشک / وانە" : "هەموو بەشەکان / وانە"} --
                    </option>
                    {availableSections.map((sec) => (
                      <option key={sec.id} value={sec.id}>
                        {isBadini ? sec.titleBadini : sec.titleKu}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* CUSTOM TITLE & DESCRIPTION INPUT */}
              <div>
                <label className="text-xs font-extrabold text-purple-200 block mb-1">
                  {isBadini ? "ناڤێ تایبەت یێ ئەرکی (Task Title - ئیختیاری):" : "ناوی تایبەتی ئەرک (Task Title - ئیختیاری):"}
                </label>
                <input
                  type="text"
                  value={customTaskTitle}
                  onChange={(e) => setCustomTaskTitle(e.target.value)}
                  placeholder={
                    selectedChapterId
                      ? isBadini
                        ? "ناوی ئەرک ب شێوەیەکێ تایبەت یان لێگەر بۆ خودی بەندی..."
                        : "ناوی ئەرک بە شێوەیەکی تایبەت..."
                      : isBadini
                      ? "نموونە: بەندێ ٥ - یاسایێن نیوتن دگەل شیکارکرنا پرسیاران"
                      : "نموونە: بەندی ٥ - یاساکانی نیوتن لەگەڵ شیکارکردنی پرسیار"
                  }
                  className="w-full bg-[#170e3c] border border-purple-500/30 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400 transition"
                />
              </div>

              {/* 4. PREDICTED DURATION & POMODORO TIME TRACKER */}
              <div className="space-y-2.5">
                <label className="text-xs font-extrabold text-purple-200 block mb-1">
                  {isBadini ? "دەمێ پێشبینیکری (خولەک) + پێشنیارا دەمێ پۆمۆدۆرۆیێ:" : "کاتی پێشبینیکراو (خولەک) + پێشنیاری کاتی پۆمۆدۆرۆ:"}
                </label>

                <div className="flex items-center gap-2">
                  {[15, 25, 35, 45, 60].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setDurationMinutes(mins)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                        durationMinutes === mins
                          ? "bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-950"
                          : "bg-[#170e3c] border-purple-500/20 text-purple-300 hover:bg-purple-900/40"
                      }`}
                    >
                      {mins} min
                    </button>
                  ))}
                </div>

                {/* OVERALL STUDY TIME TRACKER STAT FOR SELECTED SUBJECT */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border border-purple-500/30 flex items-center justify-between text-xs font-medium shadow-inner">
                  <div className="flex items-center gap-2 text-purple-200">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      {isBadini
                        ? `دەمێ گشتی یێ خویندتی ل سەر بابەتی (${
                            SUBJECT_OPTIONS.find(
                              (s) =>
                                s.id.toLowerCase() === selectedSubjectId.toLowerCase() ||
                                s.nameEn.toLowerCase() === selectedSubjectId.toLowerCase()
                            )
                              ? isBadini
                                ? SUBJECT_OPTIONS.find(
                                    (s) =>
                                      s.id.toLowerCase() === selectedSubjectId.toLowerCase() ||
                                      s.nameEn.toLowerCase() === selectedSubjectId.toLowerCase()
                                  )?.nameBadini
                                : SUBJECT_OPTIONS.find(
                                    (s) =>
                                      s.id.toLowerCase() === selectedSubjectId.toLowerCase() ||
                                      s.nameEn.toLowerCase() === selectedSubjectId.toLowerCase()
                                  )?.nameKu
                              : selectedSubjectId
                          }):`
                        : `کاتی گشتی خوێندراو لەسەر بابەتی (${
                            SUBJECT_OPTIONS.find(
                              (s) =>
                                s.id.toLowerCase() === selectedSubjectId.toLowerCase() ||
                                s.nameEn.toLowerCase() === selectedSubjectId.toLowerCase()
                            )
                              ? isBadini
                                ? SUBJECT_OPTIONS.find(
                                    (s) =>
                                      s.id.toLowerCase() === selectedSubjectId.toLowerCase() ||
                                      s.nameEn.toLowerCase() === selectedSubjectId.toLowerCase()
                                  )?.nameBadini
                                : SUBJECT_OPTIONS.find(
                                    (s) =>
                                      s.id.toLowerCase() === selectedSubjectId.toLowerCase() ||
                                      s.nameEn.toLowerCase() === selectedSubjectId.toLowerCase()
                                  )?.nameKu
                              : selectedSubjectId
                          }):`}
                    </span>
                  </div>
                  <span className="font-extrabold text-amber-300 bg-black/50 px-3 py-1 rounded-xl border border-amber-500/40 text-xs">
                    {studiedHoursFormatted}
                  </span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-purple-500/20">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddTaskOpen(false);
                    setEditingTaskId(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-purple-300 hover:text-white cursor-pointer"
                >
                  {isBadini ? "پاشگەزبوون" : "پاشگەزبوونەوە"}
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg shadow-purple-950 transition cursor-pointer active:scale-95 border border-purple-400/30"
                >
                  {editingTaskId
                    ? isBadini
                      ? "پاشکەوتکرن"
                      : "پاشەکەوتکردن"
                    : isBadini
                    ? "پاشکەوتکرنا ئەرکی"
                    : "پاشەکەوتکردنی ئەرک"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}

      {/* LEVEL EVALUATION QUIZ MODAL AFTER TASK COMPLETION */}
      {quizTask && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#0d0726] border border-purple-500/40 rounded-3xl text-white shadow-2xl shadow-purple-950 flex flex-col max-h-[90vh] overflow-hidden my-auto">
            {/* QUIZ HEADER */}
            <div className="flex items-center justify-between p-5 pb-4 border-b border-purple-500/20 bg-[#0d0726] shrink-0 z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                  <Award className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-black text-base text-white">
                    {isBadini ? "تاقیکرنا ئاستی د بابەتی دا" : "تاقیکردنەوەی ئاست لە بابەتدا"}
                  </h3>
                  <p className="text-xs text-purple-300/80 font-medium">
                    {quizTask.subject} - {quizTask.title}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setQuizTask(null)}
                className="w-8 h-8 rounded-xl bg-purple-900/40 text-purple-300 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* QUIZ BODY */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4">
            {!quizCompleted ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-purple-300">
                  <span>پرسیارا {currentQuizIndex + 1} ژ {QUIZ_QUESTIONS.length}</span>
                  <span className="text-amber-300">کوێزا ئاستی</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#170e3c] border border-purple-500/30 text-sm font-bold text-white leading-relaxed">
                  {QUIZ_QUESTIONS[currentQuizIndex].question}
                </div>

                <div className="space-y-2">
                  {QUIZ_QUESTIONS[currentQuizIndex].options.map((option, idx) => {
                    const isSelected = selectedAnswerIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectQuizAnswer(idx)}
                        className={`w-full p-3 rounded-2xl text-xs font-bold text-right border transition flex items-center justify-between ${
                          isSelected
                            ? "bg-purple-600 text-white border-purple-300 shadow-md"
                            : "bg-[#130b30] border-purple-500/20 text-purple-200 hover:bg-purple-900/40"
                        }`}
                      >
                        <span>{option}</span>
                        {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  disabled={selectedAnswerIndex === null}
                  onClick={handleNextQuizQuestion}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg transition disabled:opacity-40 cursor-pointer"
                >
                  {currentQuizIndex < QUIZ_QUESTIONS.length - 1
                    ? isBadini
                      ? "پرسیارا دووڤدا"
                      : "پرسیاری دواتر"
                    : isBadini
                    ? "دیارکرنا ئەنجامی"
                    : "دیارکردنی ئەنجام"}
                </button>
              </div>
            ) : (
              /* QUIZ RESULT SCORE & DETAILED QUESTION BREAKDOWN */
              <div className="text-center space-y-4 py-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 mx-auto flex items-center justify-center text-white shadow-xl shadow-emerald-950 animate-bounce">
                  <Sparkles className="w-7 h-7 text-amber-200" />
                </div>

                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black">
                    {isBadini ? "ئەنجامێ ئەڤی کویزاوی 🎯" : "ئەنجامی ئەم کویزە 🎯"}
                  </span>
                  <h4 className="text-base font-black text-white">
                    {isBadini ? "ئاستێ تە د ڤی بابەتی دا دیار بوو:" : "ئاستت لەم بابەتەدا دیاری کرا:"}
                  </h4>
                  <div className="p-3.5 rounded-2xl bg-[#170e3c] border border-purple-500/30 space-y-1">
                    <p className="text-xl font-black text-amber-300 flex items-center justify-center gap-2">
                      {quizScore >= 3 ? (
                        <span>{isBadini ? "ئاستێ بەرز 🔥 (High Priority - %100)" : "ئاستی بەرز 🔥 (High Priority - %100)"}</span>
                      ) : quizScore === 2 ? (
                        <span>{isBadini ? "ئاستێ ناوەند ⚠️ (Medium Priority - %66)" : "ئاستی ناوەند ⚠️ (Medium Priority - %66)"}</span>
                      ) : (
                        <span>{isBadini ? "پێویستی ب پێداچوونەوەیێ هەیە 🟢 (Needs Review)" : "پێویستی بە پێداچوونەوە هەیە 🟢 (Needs Review)"}</span>
                      )}
                    </p>
                    <p className="text-xs text-purple-200/90 font-medium pt-1">
                      {isBadini
                        ? `تە توانیا ${quizScore} ژ ${QUIZ_QUESTIONS.length} پرسیاران ب دروستی وەڵام بدی. ئاستێ ڤی بابەتی د لیستا ئەرکان دا ب ئەڤی ئاستی هاتە نووکرن!`
                        : `توانیت ${quizScore} لە ${QUIZ_QUESTIONS.length} پرسیار بە دروستی وەڵام بدەیتەوە. ئاستی ئەم بابەتە نوێکرایەوە!`}
                    </p>
                  </div>
                </div>

                {/* QUESTION BY QUESTION REVIEW SHOWING WRONG QUESTIONS & CORRECT ANSWERS */}
                <div className="space-y-2.5 pt-2 text-right">
                  <h5 className="text-xs font-black text-purple-200 flex items-center gap-1.5 border-b border-purple-500/20 pb-2">
                    <Brain className="w-4 h-4 text-amber-300" />
                    <span>{isBadini ? "پێداچوونا پرسیاران (کا تە کیش پرسیار خەڵەت کرییە):" : "پێداچوونەوەی پرسیارەکان (کام پرسیارت هەڵە کردووە):"}</span>
                  </h5>

                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {QUIZ_QUESTIONS.map((q, qIdx) => {
                      const uAns = userAnswers[qIdx];
                      const isCorrect = uAns === q.correctIndex;

                      return (
                        <div
                          key={qIdx}
                          className={`p-3 rounded-2xl border text-xs space-y-1.5 ${
                            isCorrect
                              ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-200"
                              : "bg-rose-950/40 border-rose-500/30 text-rose-200"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-extrabold text-white text-[11px] leading-snug">
                              {qIdx + 1}. {q.question}
                            </span>
                            {isCorrect ? (
                              <span className="shrink-0 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                                {isBadini ? "دروست ✅" : "دروست ✅"}
                              </span>
                            ) : (
                              <span className="shrink-0 px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                                {isBadini ? "خەڵەت ❌" : "هەڵە ❌"}
                              </span>
                            )}
                          </div>

                          <div className="text-[10px] space-y-1 pt-1 border-t border-purple-500/10">
                            <p className={isCorrect ? "text-emerald-300 font-semibold" : "text-rose-300 font-semibold"}>
                              {isBadini ? "وەڵامێ تە:" : "وەڵامی تۆ:"} {uAns !== undefined && uAns !== null ? q.options[uAns] : "-"}
                            </p>
                            {!isCorrect && (
                              <p className="text-amber-300 font-bold">
                                {isBadini ? "وەڵامێ درست:" : "وەڵامی دروست:"} {q.options[q.correctIndex]}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setQuizTask(null)}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg shadow-purple-950 transition cursor-pointer active:scale-95"
                >
                  {isBadini ? "باشە، تەمام" : "باشە، تەواو"}
                </button>
              </div>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
