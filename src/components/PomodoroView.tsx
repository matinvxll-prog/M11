import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { BlinkingMascotAvatar } from "./BlinkingMascotAvatar";
import { ChromaKeyVideo } from "./ChromaKeyVideo";
import { PomodoroVideoPlayer } from "./PomodoroVideoPlayer";
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Volume2,
  VolumeX,
  BookOpen,
  Calendar,
  Clock,
  Plus,
  Trash2,
  Settings,
  X,
  SlidersHorizontal,
  Home,
  Music,
  Check,
  Flame,
  Zap,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  Palette,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  HelpCircle,
  Bell,
  BarChart2,
  CheckSquare,
  Target,
  Coffee,
  Armchair,
  Smile,
  SkipBack,
  SkipForward,
  User,
  History,
  Activity,
  FileText,
  Rocket,
  Trophy,
  PieChart,
  XCircle,
  AlertCircle,
  Search,
  Pencil,
  Eye,
  Maximize2,
  Minimize2,
  Download,
  FilePlus,
  Calculator,
  FlaskConical,
  Dna,
  Globe,
  Languages,
  BookMarked,
  Edit3,
  Bookmark,
  FileQuestion,
  Lightbulb,
  Pin,
  Layers,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Award,
  Star,
  TrendingUp,
  BarChart3,
  BookmarkCheck,
  CloudRain,
  Trees,
  Waves,
  Headphones,
  Radio,
  Volume1
} from "lucide-react";
import { Language, SubjectId, UserProfile } from "../types";

export interface AmbientTrack {
  id: string;
  nameBadini: string;
  nameKurdish: string;
  nameEn: string;
  descBadini: string;
  descEn: string;
  url: string;
  iconType: "purple" | "headphone" | "rain" | "forest" | "fire" | "wave" | "synth";
  bgGradient: string;
  badge: string;
  coverImage?: string;
  youtubeId?: string;
  isCustom?: boolean;
}

const AMBIENT_TRACKS: AmbientTrack[] = [
  {
    id: "purple_dream",
    nameBadini: "مۆسیقایا Purple Dream (Lofi)",
    nameKurdish: "مۆسیقای Purple Dream (Lofi)",
    nameEn: "Purple Dream Lofi",
    descBadini: "مۆسیقایا لۆفایا ئارامکەر بۆ خوندن و تەرکیزا بلندا مێشکی",
    descEn: "Soothing purple lofi beats for deep focus & study",
    url: "/sounds/purple_dream.mp3",
    iconType: "purple",
    bgGradient: "from-purple-600 via-indigo-600 to-purple-800",
    badge: "Lofi Track 🎵",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "lofi_chill",
    nameBadini: "لۆفایا ئارام خوندن (Chill Study)",
    nameKurdish: "Lofi Chill Study Beats",
    nameEn: "Chill Study Beats",
    descBadini: "ڕیتمێن هێمن یێن خوندنێ و تەرکیزکرنێ",
    descEn: "Relaxing chillhop beats for steady studying",
    url: "/sounds/lofi_chill.mp3",
    iconType: "headphone",
    bgGradient: "from-pink-600 via-rose-600 to-purple-700",
    badge: "Study Beat 🎧",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "rain",
    nameBadini: "دەنگێ بارانا هێمن",
    nameKurdish: "دەنگی بارانی هێمن",
    nameEn: "Gentle Rainfall",
    descBadini: "دڵۆپێن بارانا سروشتی بۆ حەوانەبوون و ئارامکرنا مێشکی",
    descEn: "Calming natural rain drops and soft thunder",
    url: "/sounds/rain.mp3",
    iconType: "rain",
    bgGradient: "from-blue-600 via-cyan-600 to-sky-800",
    badge: "Nature Sound 🌧️",
    coverImage: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "forest_birds",
    nameBadini: "دەنگێ دارستانێ و باڵندان",
    nameKurdish: "دەنگی دارستان و باڵندان",
    nameEn: "Forest & Birdsong",
    descBadini: "سروشتێ زێندەی و دەنگێ بالندەیێن دارستانێ",
    descEn: "Peaceful forest atmosphere with chirping birds",
    url: "/sounds/forest_birds.mp3",
    iconType: "forest",
    bgGradient: "from-emerald-600 via-teal-600 to-green-800",
    badge: "Nature 🌲",
    coverImage: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "fireplace",
    nameBadini: "دەنگێ ئاگرێ مەنقەلێ",
    nameKurdish: "دەنگی ئاگریدان",
    nameEn: "Cozy Fireplace",
    descBadini: "گەرمیا ئاگرێ گەش و دەنگێ خشینا داران",
    descEn: "Warm crackling fireplace ambiance",
    url: "/sounds/fireplace.mp3",
    iconType: "fire",
    bgGradient: "from-amber-600 via-orange-600 to-red-800",
    badge: "Cozy 🔥",
    coverImage: "https://images.unsplash.com/photo-1542259009477-d625272157b7?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "ocean_waves",
    nameBadini: "شەپۆلێن دەریایێ",
    nameKurdish: "شەپۆلەکانی دەریا",
    nameEn: "Ocean Waves",
    descBadini: "لێدانا هێمن و ئارامکەرا پێلێن دەریایێ",
    descEn: "Rhythmic calming ocean waves",
    url: "/sounds/ocean_waves.mp3",
    iconType: "wave",
    bgGradient: "from-sky-600 via-blue-600 to-indigo-800",
    badge: "Relaxing 🌊",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "synth_rain",
    nameBadini: "دەنگێ سپی یێ دروستکری (Synth Rain)",
    nameKurdish: "White Noise Synthesizer",
    nameEn: "Synthesizer White Noise",
    descBadini: "دەنگێ سپی یێ بەردەوام بۆ ژێبرنا هەمی دەنگێن دەرڤە",
    descEn: "Continuous generated white noise for total silence",
    url: "synth",
    iconType: "synth",
    bgGradient: "from-violet-600 via-purple-700 to-indigo-900",
    badge: "Focus Noise 🎛️",
    coverImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=300&auto=format&fit=crop&q=80",
  },
];
import { subjectsList } from "../data/mockData";
import { grade12SyllabusData } from "../data/grade12Syllabus";
import { BADINI_MOTIVATIONAL_QUOTES } from "../data/motivationalQuotes";
import { StudyPlannerModal } from "./StudyPlannerModal";
import { TasksDashboardView } from "./TasksDashboardView";
import logoImg from "../logo.png.png";

export interface UserNote {
  id: string;
  title: string;
  date: string;
  time: string;
  content: string;
  images?: string[];
}

import bg1 from "../assets/images/speda_bg_1785268781700.jpg";
import bg2 from "../assets/images/nifro_bg_1785268796260.jpg";
import bg3 from "../assets/images/evari_bg_1785268810381.jpg";
import bg4 from "../assets/images/shef_bg_1785268825970.jpg";
import bg5 from "../assets/images/autumn_window_desk_1785364593676.jpg";
import bg6 from "../assets/images/ghibli_flower_meadow_1785364576794.jpg";
import bg7 from "../assets/images/cosmic_star_book_1785364627381.jpg";
import motivationImg from "../assets/images/study_notes_action_1785170854740.jpg";
import noteImg from "../assets/images/study_notes_action_1785170854740.jpg";
import userCharacterImg from "../assets/images/character_note_mascot_1785426382641.jpg";

interface PomodoroViewProps {
  user?: UserProfile;
  language: Language;
  isDarkMode: boolean;
  onBackToHome?: () => void;
  isFloatingMini?: boolean;
  onExpandFromMini?: () => void;
}

interface StudySessionLog {
  id: string;
  date: string;
  subjectId: SubjectId;
  durationMinutes: number;
  chapterTitle?: string;
  sectionTitle?: string;
  topicsNote?: string;
  timestamp: number;
}

interface SwipeableNoteCardProps {
  note: UserNote;
  isSelected: boolean;
  isBadini: boolean;
  isSwipedOpen: boolean;
  onSwipeToggle: (id: string | null) => void;
  onSelect: (note: UserNote) => void;
  onDelete: (id: string) => void;
}

const SwipeableNoteCard: React.FC<SwipeableNoteCardProps> = ({
  note,
  isSelected,
  isBadini,
  isSwipedOpen,
  onSwipeToggle,
  onSelect,
  onDelete,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl group my-1.5 select-none bg-transparent">
      {/* BACKGROUND ACTION BUTTONS REVEALED ON SWIPE RIGHT */}
      <div
        className={`absolute inset-y-0 left-0 flex items-center justify-start gap-2 pl-1 z-0 transition-opacity duration-200 ${
          isSwipedOpen || isDragging ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSwipeToggle(null);
            onSelect(note);
          }}
          className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-950/60 cursor-pointer active:scale-95 transition shrink-0"
          title={isBadini ? "دەستکاری" : "دەستکاری"}
        >
          <Pencil className="w-3.5 h-3.5" />
          <span>{isBadini ? "دەستکاری" : "دەستکاری"}</span>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSwipeToggle(null);
            onDelete(note.id);
          }}
          className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-950/60 cursor-pointer active:scale-95 transition shrink-0"
          title={isBadini ? "ژێبرن" : "سڕینەوە"}
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{isBadini ? "ژێبرن" : "سڕینەوە"}</span>
        </button>
      </div>

      {/* FOREGROUND CARDS WITH MOTION DRAG */}
      <motion.div
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: 0, right: 185 }}
        dragElastic={0.08}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_e, info) => {
          setIsDragging(false);
          if (info.offset.x > 35) {
            onSwipeToggle(note.id);
          } else if (info.offset.x < -10) {
            onSwipeToggle(null);
          }
        }}
        animate={{ x: isSwipedOpen ? 185 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        onClick={() => {
          if (isSwipedOpen) {
            onSwipeToggle(null);
          } else {
            onSelect(note);
          }
        }}
        className={`relative z-10 p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-2 touch-pan-y ${
          isSelected
            ? "border-purple-500/60 bg-gradient-to-r from-[#4c1d95] to-[#3b0764] text-white shadow-xl"
            : "border-purple-500/20 bg-[#130b2e] hover:bg-[#1a0f3d] text-white/80 hover:border-purple-500/40"
        }`}
      >
        <div className="min-w-0 pr-1 flex-1">
          <div className="flex items-center gap-1.5">
            <h5 className="font-bold text-xs sm:text-sm text-white truncate">
              {note.title}
            </h5>
            {note.images && note.images.length > 0 && (
              <span className="text-[10px] bg-purple-500/30 text-purple-200 px-1.5 py-0.5 rounded-md font-mono shrink-0 flex items-center gap-1">
                <ImageIcon className="w-3 h-3" />
                {note.images.length}
              </span>
            )}
          </div>
          <p className="text-[11px] text-white/50 font-mono mt-0.5">
            {note.date} • {note.time}
          </p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSwipeToggle(isSwipedOpen ? null : note.id);
            }}
            className="p-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 transition"
            title={isBadini ? "ڕاکێشان یان کلیک بکە بۆ بژارەیان" : "ڕاکێشان یان کلیک بکە بۆ هەڵبژاردنەکان"}
          >
            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isSwipedOpen ? "rotate-180 text-amber-300" : ""}`} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const PomodoroView: React.FC<PomodoroViewProps> = ({
  user,
  language,
  isDarkMode,
  onBackToHome,
  isFloatingMini = false,
  onExpandFromMini
}) => {
  const isBadini = language === "badini";
  const isKu = language === "ku";

  const [isMiniDismissed, setIsMiniDismissed] = useState<boolean>(false);

  useEffect(() => {
    if (!isFloatingMini) {
      setIsMiniDismissed(false);
    }
  }, [isFloatingMini]);

  const wallpapersMap: Record<string, { url: string; nameEn: string; nameKu: string; tag: string }> = {
    bg_1: {
      url: bg1,
      nameEn: "Wallpaper 1",
      nameKu: "وێنەی ١",
      tag: "Uploaded"
    },
    bg_2: {
      url: bg2,
      nameEn: "Wallpaper 2",
      nameKu: "وێنەی ٢",
      tag: "Uploaded"
    },
    bg_3: {
      url: bg3,
      nameEn: "Wallpaper 3",
      nameKu: "وێنەی ٣",
      tag: "Uploaded"
    },
    bg_4: {
      url: bg4,
      nameEn: "Wallpaper 4",
      nameKu: "وێنەی ٤",
      tag: "Uploaded"
    },
    bg_5: {
      url: bg5,
      nameEn: "Wallpaper 5",
      nameKu: "وێنەی ٥",
      tag: "Uploaded"
    },
    bg_6: {
      url: bg6,
      nameEn: "Wallpaper 6",
      nameKu: "وێنەی ٦",
      tag: "Uploaded"
    },
    bg_7: {
      url: bg7,
      nameEn: "Wallpaper 7",
      nameKu: "وێنەی ٧",
      tag: "Uploaded"
    }
  };

  const legacyKeysMap: Record<string, string> = {
    custom_1: "bg_1",
    custom_2: "bg_2",
    custom_3: "bg_3",
    custom_4: "bg_4",
    custom_5: "bg_5",
    custom_6: "bg_6",
    custom_7: "bg_7",
    speda: "bg_1",
    nifro: "bg_2",
    evari: "bg_3",
    shef: "bg_4",
    ghibli: "bg_1",
    lofi: "bg_2",
    sunset: "bg_3",
    library: "bg_4",
    cosmic: "bg_5",
    mascot_hill: "bg_1",
    mascot_room: "bg_2",
    boy_study: "bg_4",
    girl_study: "bg_4",
    ghibli_meadow: "bg_1",
    autumn_window: "bg_3",
    underwater: "bg_5",
    cosmic_star: "bg_6",
    mascot_sunset: "bg_3",
    ghibli_daisy: "bg_1",
    star_path: "bg_7",
    mascot_night: "bg_4"
  };

  // Wallpaper Selection & Custom Upload State
  const [wallpaper, setWallpaper] = useState<string>(() => {
    const saved = localStorage.getItem("deg_study_wallpaper");
    if (saved && legacyKeysMap[saved]) return legacyKeysMap[saved];
    if (saved && (saved === "custom" || saved in wallpapersMap)) return saved;
    return "bg_1";
  });

  const [customWallpaper, setCustomWallpaper] = useState<string>(() => {
    return localStorage.getItem("deg_study_custom_wallpaper") || "";
  });

  const [customUrlInput, setCustomUrlInput] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("deg_study_wallpaper", wallpaper);
  }, [wallpaper]);

  useEffect(() => {
    if (customWallpaper) {
      try {
        localStorage.setItem("deg_study_custom_wallpaper", customWallpaper);
      } catch (e) {
        console.warn("Storage quota exceeded for custom wallpaper");
      }
    }
  }, [customWallpaper]);

  // Helper to compress images via canvas to ensure small size & fast rendering without quota issues
  const compressImage = (file: File, maxDimension = 1600, quality = 0.85): Promise<string> => {
    return new Promise((resolve) => {
      if (!file.type.startsWith("image/")) {
        resolve("");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const rawData = event.target?.result as string;
        if (!rawData) {
          resolve("");
          return;
        }
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;
            if (width > maxDimension || height > maxDimension) {
              if (width > height) {
                height = Math.round((height * maxDimension) / width);
                width = maxDimension;
              } else {
                width = Math.round((width * maxDimension) / height);
                height = maxDimension;
              }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              resolve(canvas.toDataURL("image/jpeg", quality));
            } else {
              resolve(rawData);
            }
          } catch (e) {
            resolve(rawData);
          }
        };
        img.onerror = () => resolve(rawData);
        img.src = rawData;
      };
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
    });
  };

  // Handle image upload from user device for custom background
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast(isBadini ? "تکایە تەنها وێنە هەڵبژێرە" : "تکایە تەنها وێنە هەڵبژێرە");
      return;
    }

    const compressed = await compressImage(file, 1920, 0.85);
    if (compressed) {
      setCustomWallpaper(compressed);
      setWallpaper("custom");
      showToast(isBadini ? "وێنە ب سەرکەفتن هاتە بارکرن 🖼️" : "وێنەکە بە سەرکەوتوویی بارکرا 🖼️");
    }
    if (e.target) e.target.value = "";
  };

  const handleApplyCustomUrl = () => {
    if (!customUrlInput.trim()) return;
    setCustomWallpaper(customUrlInput.trim());
    setWallpaper("custom");
    setCustomUrlInput("");
    showToast(isBadini ? "بەگراوند هاتە گوهۆڕین" : "پاشبنەما گۆڕدرا");
  };

  // Timer states
  const [timerSeconds, setTimerSeconds] = useState<number>(25 * 60);
  const [initialSeconds, setInitialSeconds] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<"pomodoro" | "shortBreak" | "longBreak" | "custom">("pomodoro");

  // Dashboard Tasks list state connected to TasksDashboardView
  const [dashboardTasks, setDashboardTasks] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("app_tasks_dashboard_list");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: "t-1",
        title: "بەندێ ٥ - یاسایێن نیوتن",
        subject: "فیزیا",
        subjectEn: "Physics",
        chapterTitle: "بەندێ ٥: یاسایێن نیوتن",
        priority: "high",
        durationMinutes: 45,
        pomodoroCompletedMins: 45,
        completed: true,
        startedAtTime: "10:45 AM",
        completedAtTime: "11:30 AM",
        dueDate: "today",
      },
      {
        id: "t-2",
        title: "شیکارکرنا ٢٥ پرسیارێن وزاری",
        subject: "کیمیا",
        subjectEn: "Chemistry",
        chapterTitle: "بەندێ ٣: کیمیا ئۆرگانیک",
        priority: "high",
        durationMinutes: 35,
        completed: false,
        dueDate: "today",
      },
      {
        id: "t-3",
        title: "سەحکرنا وانا تەواوکاریێ (Integration)",
        subject: "بیرکاری",
        subjectEn: "Mathematics",
        chapterTitle: "بەندێ ٤: تەواوکاری",
        priority: "medium",
        durationMinutes: 40,
        completed: false,
        dueDate: "today",
      },
      {
        id: "t-4",
        title: "خویندنا یونتا ٧ (Unit 7)",
        subject: "ئینگلیزی",
        subjectEn: "English",
        priority: "medium",
        durationMinutes: 30,
        completed: false,
        dueDate: "today",
      },
    ];
  });

  const upcomingTask = dashboardTasks.find((t) => !t.completed) || dashboardTasks[0];
  const totalUncompletedTasks = dashboardTasks.filter((t) => !t.completed).length;

  // Navigation Dock Tab State
  const [activeDockTab, setActiveDockTab] = useState<"timer" | "stats" | "history" | "tasks" | "settings">("timer");

  // 5-Day Weak Subject Quiz Challenge State
  const [activeWeakQuizDay, setActiveWeakQuizDay] = useState<number | null>(null);
  const [weakQuizScores, setWeakQuizScores] = useState<Record<number, { score: number; total: number; percentage: number; completedAt: string }>>(() => {
    try {
      const saved = localStorage.getItem("weak_subjects_quiz_scores");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {};
  });
  const [userSelectedAnswers, setUserSelectedAnswers] = useState<Record<number, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem("weak_subjects_quiz_scores", JSON.stringify(weakQuizScores));
    } catch (e) {
      console.error(e);
    }
  }, [weakQuizScores]);

  // Session stats counters
  const [focusCount, setFocusCount] = useState<number>(3);
  const [shortBreakCount, setShortBreakCount] = useState<number>(1);
  const [longBreakCount, setLongBreakCount] = useState<number>(0);
  const dailyTargetSessions = 8;

  // Custom durations (in minutes)
  const [durations, setDurations] = useState<{ pomodoro: number; shortBreak: number; longBreak: number }>({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15
  });

  // Active Study Subject, Chapter & Lesson States
  const [activeStudySubject, setActiveStudySubject] = useState<string>("بیرکاری");
  const [activeStudyChapter, setActiveStudyChapter] = useState<string>("بەندێ ١: مشتقە و جێبەجێکرنەکانی");
  const [activeStudyLesson, setActiveStudyLesson] = useState<string>("وانا ٣: یاسایێن مشتقەیێ");
  const [isSelectingSubjectModalOpen, setIsSelectingSubjectModalOpen] = useState<boolean>(false);

  // Custom Input States for Subject Selector
  const [customSubjectInput, setCustomSubjectInput] = useState<string>("");
  const [customChapterInput, setCustomChapterInput] = useState<string>("");
  const [customLessonInput, setCustomLessonInput] = useState<string>("");

  // Full-screen Session Completion & Instant Quiz Modal States
  const [isSessionFinishedModalOpen, setIsSessionFinishedModalOpen] = useState<boolean>(false);
  const [finishedSessionDetails, setFinishedSessionDetails] = useState<{
    subject: string;
    chapter: string;
    lesson: string;
    focusMinutes: number;
    breakMinutes: number;
    completedAt: string;
  } | null>(null);

  const [sessionQuizStep, setSessionQuizStep] = useState<"summary" | "quiz" | "results">("summary");
  const [sessionQuizUserAnswers, setSessionQuizUserAnswers] = useState<Record<number, number>>({});
  const [isSessionQuizSubmitted, setIsSessionQuizSubmitted] = useState<boolean>(false);

  // Daily Quiz Schedule & Reminder Modal States
  const [showQuizScheduleModal, setShowQuizScheduleModal] = useState<boolean>(false);
  const [scheduledQuizTime, setScheduledQuizTime] = useState<string>("20:00");
  const [savedSessionQuizzes, setSavedSessionQuizzes] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("saved_session_quizzes_list");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });
  const [activeScheduledReminders, setActiveScheduledReminders] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("app_scheduled_quiz_reminders");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  const [resolvedQuestionKeys, setResolvedQuestionKeys] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("app_resolved_quiz_mistakes");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {};
  });

  useEffect(() => {
    try {
      localStorage.setItem("app_resolved_quiz_mistakes", JSON.stringify(resolvedQuestionKeys));
    } catch (e) {}
  }, [resolvedQuestionKeys]);

  const resolveMistakeQuestion = (subject: string, questionText: string) => {
    const key = `${subject}_${questionText}`;
    setResolvedQuestionKeys((prev) => ({ ...prev, [key]: true }));
    showToast(isBadini ? "پرسیار هاتە بەرسڤدان و لادان ل لیستێ ✓" : "پرسیارەکە وەڵامدرایەوە و لە لیستەکە لادرا ✓");
  };

  // Subject Questions Bank Generator Helper
  const getSubjectQuizQuestions = (subjectName: string) => {
    if (subjectName.includes("بیرکاری") || subjectName.toLowerCase().includes("math")) {
      return [
        {
          id: 1,
          question: "مشتقەی d/dx(x⁴ - 3x² + 5) ل سەر چ یاسایەکێ ڕاوەستیاست؟",
          options: ["4x³ - 6x", "4x⁴ - 6x²", "3x² - 6x", "4x³ - 3x"],
          correct: 0,
          explanation: "ب یاسایا مشتقێ d/dx(xⁿ) = n·xⁿ⁻¹، لهۆرا مشتقەی x⁴ دکەتە 4x³ و مشتقەی 3x² دکەتە 6x."
        },
        {
          id: 2,
          question: "تەواوکاری (Integration) یان ڕووبەرێ بن سیبەرێ هاوکێشەیێ ∫(3x² + 2x)dx چییە؟",
          options: ["x³ + x² + C", "3x³ + 2x² + C", "6x + 2 + C", "x³ + 2x + C"],
          correct: 0,
          explanation: "تەواوکاریا 3x² دکەتە (3x³/3) = x³ و تەواوکاریا 2x دکەتە (2x²/2) = x²."
        },
        {
          id: 3,
          question: "نەخشەی f(x) = x² - 16 ل کیژ خاڵان هاوکێشە دەبێتە 0؟",
          options: ["x = ±4", "x = 16", "x = ±8", "x = 4 تنێ"],
          correct: 0,
          explanation: "x² - 16 = 0 ⇒ x² = 16 ⇒ x = ±4."
        },
        {
          id: 4,
          question: "لیمیت lim(x→0) sin(2x) / x یەکسانە بە چەند؟",
          options: ["2", "1", "0", "4"],
          correct: 0,
          explanation: "ب یاسایا لیمیتێن دایری lim(x→0) sin(ax)/x = a، لهۆرا a = 2."
        },
        {
          id: 5,
          question: "تەوەرێ هاوتایی (Symmetry Axis) بۆ هاوکێشەی f(x) = ax² + bx + c بە چی دۆزرێتەوە؟",
          options: ["x = -b / (2a)", "x = b / a", "x = -a / (2b)", "x = 2a / b"],
          correct: 0,
          explanation: "خاڵا لوتکە و تەوەرێ ڕاستەمۆ x = -b / (2a) یە."
        }
      ];
    } else if (subjectName.includes("فیزیا") || subjectName.toLowerCase().includes("physics")) {
      return [
        {
          id: 1,
          question: "یاسایا ئۆم (Ohm's Law) پەیوەندی نێوان ڤۆڵتیە، تەزوو و بەرگری بە کام هاوکێشە دیاری دەکات؟",
          options: ["V = I × R", "I = V × R", "R = V × I", "V = I / R"],
          correct: 0,
          explanation: "ڤۆڵتیە یەکسانە بە تەزووی کارەبایی ڕا ل بەرگریێ (V = I × R)."
        },
        {
          id: 2,
          question: "یەکەی پێوانی وزەی کارەبایی (Electrical Energy) لە سیستەمی جیهانیدا چییە؟",
          options: ["جول (Joule)", "وات (Watt)", "ئەمپێر (Ampere)", "ڤۆڵت (Volt)"],
          correct: 0,
          explanation: "ژ بڵی جول (Joule)، کیلووات-کاتژمێر ژی بۆ مالان دهێتە بەکارهێنان."
        },
        {
          id: 3,
          question: "خێرایی ڕووناكی لە بۆشاییدا (Vacuum) بە نزیکەیی چەندە؟",
          options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "1.5 × 10⁸ m/s", "300 m/s"],
          correct: 0,
          explanation: "خێرایا ڕووناکیێ c ≈ 300,000 km/s یان 3 × 10⁸ m/s."
        },
        {
          id: 4,
          question: "یاسای سێیەمی نیوتن بۆ جوڵە چی دەپەسپێنێت؟",
          options: ["بۆ هەر کردارێک، پەرکردارێک هەیە یەکسان و پێچەوانە", "تەواوی هێزەکان یەکسانن بە بارستە", "تەنی وەستاو وەستاو دەمێنێتەوە", "شێواندنی وزە نەبووە"],
          correct: 0,
          explanation: "Action and Reaction (کردار و پەرکردار یەکسانن بە قەبارە و پێچەوانەن بە ئاڕاستە)."
        },
        {
          id: 5,
          question: "کاتێک شەپۆلی ڕووناکی لە هەواوە دەکەوێتە ناو ئاو، تووشی چی دەبێت؟",
          options: ["شکانەوە (Refraction)", "دابەشبوون (Diffraction)", "پێکهاتنەوە", "کشانەوە"],
          correct: 0,
          explanation: "ژ بەر گوهۆڕینا خێراییا ڕووناکیێ د ناڤبەرا دوو ناڤەندێن جیاوازدا شکانەوە ڕوودەدات."
        }
      ];
    } else if (subjectName.includes("کیمیا") || subjectName.toLowerCase().includes("chem")) {
      return [
        {
          id: 1,
          question: "ژمارەی ئۆکساندنی نایترۆجین (N) لە مۆلیکولی ئامۆنیا (NH₃) دا چەندە؟",
          options: ["-3", "+3", "+5", "0"],
          correct: 0,
          explanation: "هایدرۆجین +1 ە (3 × +1 = +3)، لهۆرا N دەبێتە -3."
        },
        {
          id: 2,
          question: "ڕادەی pH ی گیراوەی توندترش (Strong Acid) بە شێوەیەکی گشتی چەندە؟",
          options: ["کەمتر لە 3", "یەکسانە بە 7", "زیاتر لە 10", "14"],
          correct: 0,
          explanation: "ترشێن توند ڕادەی pH یان گەلەک کێمە د ناڤبەرا 0 تا 3."
        },
        {
          id: 3,
          question: "بەستنی ئایۆنی (Ionic Bond) بە شێوەیەکی سەرەکی لە نێوان چی دروست دەبێت؟",
          options: ["فلز و نەفلز", "دوو نەفلز", "دوو فلز", "گازێن نەجیب"],
          correct: 0,
          explanation: "بەستنی ئایۆنی بە هۆی گواستنەوەی ئەلیکترۆن لە فلز بۆ نەفلز چێدبیت."
        },
        {
          id: 4,
          question: "گازی هایدرۆجین H₂ لە ئەنجامی کاردانەوەی چی پەیدا دەبێت؟",
          options: ["تێکەڵبوونی ترش لەگەڵ فلزە چالاکەکان", "سوتانی ئاو", "تێکەڵبوونی باز لەگەڵ ئاو", "کاردانەوەی خوێ و بەرد"],
          correct: 0,
          explanation: "ترشەکان کاردانەوە لەگەڵ فلزەکان دەکەن و گازی H₂ دەردەدەن."
        },
        {
          id: 5,
          question: "ئاوێتەی CH₃COOH (ترشی ئەسیتیک / سەرکە) چی جۆرە ترشێکە؟",
          options: ["ترشی ئۆرگانیکی لاواز", "ترشی نائۆرگانیکی توند", "بازی توند", "خوێی بێلایەن"],
          correct: 0,
          explanation: "ترشەکێ ئۆرگانیکی لاوازە کو بە تەواوی ئایۆن ناپەڕێت."
        }
      ];
    } else if (subjectName.includes("زیندەوەر") || subjectName.includes("ژینناسی") || subjectName.toLowerCase().includes("bio")) {
      return [
        {
          id: 1,
          question: "ئەندامۆچکەی بەرپرس لە بەرهەمهێنانی وزە (ATP) لە خانەی ژیوەرید دا چییە؟",
          options: ["مایتۆکۆندریا (Mitochondria)", "ڕیبۆسۆم", "دەزگای گۆلجی", "لیزۆسۆم"],
          correct: 0,
          explanation: "مایتۆکۆندریا کارگەی بەرهەمهێنانی وزەی ATP یە لە خانەدا."
        },
        {
          id: 2,
          question: "زانیارییە بۆماوەییەکان (Genetic Information) لە ژورەوە لە چی هەڵگیراون؟",
          options: ["مۆلیکولی DNA", "پرۆتین", "کاربۆهایدرات", "چەوری"],
          correct: 0,
          explanation: "کرۆمۆسۆمەکان لە DNA پێکهاتوون کو کدێن بۆماوەیی تێدانە."
        },
        {
          id: 3,
          question: "هۆرمۆنی بەرپرس لە ڕێکخستن و دابەزاندنی شەکری خوێن چییە؟",
          options: ["ئەنسۆلین (Insulin)", "ئەدریناڵین", "تایرۆکسین", "گلوکاگۆن"],
          correct: 0,
          explanation: "پەنکریاس هۆرمۆنی ئینسۆلین دەردەدات بۆ دابەزاندنی گلوکۆزی خوێن."
        },
        {
          id: 4,
          question: "کۆئەندامێ بەرسڤدەر بۆ کارلێکێن دەرەکی و ناوەکی جەستە بریتییە لە:",
          options: ["کۆئەندامێ دەمار (Nervous System)", "کۆئەندامێ هەرسی", "کۆئەندامێ هەناسە", "پەیکەرە کۆئەندام"],
          correct: 0,
          explanation: "کۆئەندامێ دەمار مێشک و دڕکەپەتک و دەمارەکان دەگرێتەوە."
        },
        {
          id: 5,
          question: "کرداری ڕۆشنەپێکهاتن (Photosynthesis) لە کوێی خانەی ڕووەکدا ڕوو دەدات؟",
          options: ["کلۆرۆپلاست (Chloroplast)", "ناوک", "دیواری خانە", "ڤاکیول"],
          correct: 0,
          explanation: "سەوزەپلاستەکان صبغة کلۆرۆفیلیان تێدایە کو تیشکی خۆر هەڵدەمژن."
        }
      ];
    } else if (subjectName.includes("کوردی") || subjectName.toLowerCase().includes("kurd")) {
      return [
        {
          id: 1,
          question: "جێناوی کەسی سەربەخۆ بۆ کەسی دووەمی کۆ لە ڕێزمانا کوردی دا چییە؟",
          options: ["ئێوە", "ئەوان", "ئێمە", "تۆ"],
          correct: 0,
          explanation: "ئێوە جێناوی کەسی سەربەخۆی کەسی دووەمی کۆیە."
        },
        {
          id: 2,
          question: "هاوواتای وشەی 'ئاسۆ' چییە؟",
          options: ["کەناری بینین / ئاسمان", "چیای بەرز", "دەریای کێم", "دارستان"],
          correct: 0,
          explanation: "ئاسۆ ب مانایا سنورێ لێکتێنەگەهشتنا ئەرد و ئاسمانی دهێت."
        },
        {
          id: 3,
          question: "ڕستەی 'نالی شاعیرێکی مەزن بوو' خاوەن چ جۆرە کردارێکە؟",
          options: ["کرداری ناتەواو (بوو)", "کرداری تێپەڕ", "کرداری تێنەپەڕ", "کرداری داواکاری"],
          correct: 0,
          explanation: "بوو کرداری ناتەواوە و پێویستی بە تەواوکەر هەیە."
        },
        {
          id: 4,
          question: "شاعیر 'نالی' بە یەکێک لە دامەزرێنەرانی چ ڕێبازێکی ئەدەبی دادەنرێت؟",
          options: ["ڕێبازی کلاسیکی (قوتابخانەی بابان)", "ڕێبازی ڕومانتیکی", "ڕێبازی ڕیالیزم", "ئەدەبی نوێ"],
          correct: 0,
          explanation: "نالی و سالم و کوردی قوتابخانەی شیعری کلاسیکی بابانیان بونیات نا."
        },
        {
          id: 5,
          question: "هاودژی (پێچەوانەی) وشەی 'سەربەخۆ' چییە؟",
          options: ["ژێردەست / بەستراوە", "ئازاد", "سەربەرز", "گەورە"],
          correct: 0,
          explanation: "سەربەخۆ واتە ئازاد، پێچەوانەکەی ژێردەستە."
        }
      ];
    } else {
      return [
        {
          id: 1,
          question: `پرسیار 1 بۆ بابەتی: ${subjectName} - خاڵا گرنگ یا ئاستێن سەرەکی د ڤی بابەتی دا چییە؟`,
          options: ["تێگەهشتنا تەواو یا پێناسە و یاسایان", "لەبەربڕینا بێ تێگەهشتن", "خویندنا خێرا ب بێ مەشق", "پشتگوێخستنا خاڵێن گرنگ"],
          correct: 0,
          explanation: "تێگەهشتنا قووڵ يا پرۆگرامێ خاندنێ دبێتە هۆی بەدەستهێنانا نمرەیا بەرز."
        },
        {
          id: 2,
          question: "باشترین ڕێگا بۆ پێداچوونەوە یا پێشبینی یا سەرکەفتنێ د ئەرک و تاقیکرنان دا چییە؟",
          options: ["دووبارەکرن و چارەسەرکرنا پرسیارێن سالێن بووری", "تەنێ سەحکرنا سەردێڕان", "خویندنا ڕۆژا بەری ئەزموونێ", "نەنڤێسینا تێبینیان"],
          correct: 0,
          explanation: "شیکارکرنا پرسیاران و ئەنجامدانی کویز زیهن تیژ دەکات."
        },
        {
          id: 3,
          question: "کاتێک پرسیارێکی ئاڵۆزت پێ دەدرێت، باشترین هەنگاوی سەرەتایی چییە؟",
          options: ["شیکارکرنا دروستی زانیارییەکان و بەکارهێنانی یاسای گونجاو", "نەوسان و ڕاکردن", "دیاریکردنی وەڵام بە شێوەی مەزەندە", "بێزاربوون"],
          correct: 0,
          explanation: "دابەشکردنی پرسیارەکە بۆ بەشە بچووکەکان وەڵامدانەوە ئاسان دەکات."
        },
        {
          id: 4,
          question: "بۆچی پشوودان (Pomodoro Break) لە نێوان خولەکانی خوێندندا پێویستە؟",
          options: ["بۆ نوێکردنەوەی وزەی مێشک و زیادکردنی تەرکیز", "بۆ لەبیرچوونەوەی زانیارییەکان", "بۆ خاوکردنەوەی خێرایی", "هیچ کاریگەرییەکی نییە"],
          correct: 0,
          explanation: "پشووی کورت رێگە لە ماندووبوونی مێشک دەگرێت و تەرکیز 100% دەکاتەوە."
        },
        {
          id: 5,
          question: "پێداچوونەوەی هەفتانە (Weekly Quiz) چ سودێک بە قوتابی دەگەیەنێت؟",
          options: ["چەسپاندنی زانیارییەکان لە بیرگە یا درێژخایەن دا", "زیادکردنی فشاری دەروونی", "کەمکردنەوەی خێرایی", "هیچ سوودێکی نییە"],
          correct: 0,
          explanation: "بەردەوامی لە تاقیکردنەوەدا دەبێتە هۆی بەرزبوونەوەی ئاستی زانستی."
        }
      ];
    }
  };

  // Finish Pomodoro Session Handler ("خلاس بی 🏁")
  const handleFinishPomodoroSession = () => {
    setIsTimerRunning(false);
    setIsSessionJustCompleted(true);
    playCompletionChime();

    const elapsedSeconds = initialSeconds - timerSeconds;
    const focusMins = Math.max(1, Math.round((elapsedSeconds > 0 ? elapsedSeconds : initialSeconds) / 60));
    const breakMins = durations.shortBreak || 5;

    const sessionInfo = {
      subject: activeStudySubject || "بیرکاری",
      chapter: activeStudyChapter || "بەندێ ١: مشتقە",
      lesson: activeStudyLesson || "وانا ٣: یاسایێن مشتقەیێ",
      focusMinutes: focusMins,
      breakMinutes: breakMins,
      completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setFinishedSessionDetails(sessionInfo);
    setSessionQuizStep("summary");
    setSessionQuizUserAnswers({});
    setIsSessionQuizSubmitted(false);
    setIsSessionFinishedModalOpen(true);

    const finishedTime = sessionInfo.completedAt || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const startTimeCalculated = new Date(Date.now() - sessionInfo.focusMinutes * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Auto update or register task as completed with exact start time, completion time, and Pomodoro duration
    setDashboardTasks((prevTasks) => {
      let matched = false;
      const updated = prevTasks.map((t) => {
        if (!matched && (t.subject === sessionInfo.subject || t.title === sessionInfo.lesson || t.chapterTitle === sessionInfo.chapter)) {
          matched = true;
          return {
            ...t,
            completed: true,
            startedAtTime: t.startedAtTime || startTimeCalculated,
            completedAtTime: finishedTime,
            pomodoroCompletedMins: sessionInfo.focusMinutes
          };
        }
        return t;
      });
      const finalTasks = matched ? updated : [
        {
          id: `t-auto-${Date.now()}`,
          title: sessionInfo.lesson || "وانی خاندی",
          subject: sessionInfo.subject || "بیرکاری",
          chapterTitle: sessionInfo.chapter || "بەشێ خاندی",
          priority: "high",
          durationMinutes: sessionInfo.focusMinutes,
          pomodoroCompletedMins: sessionInfo.focusMinutes,
          completed: true,
          startedAtTime: startTimeCalculated,
          completedAtTime: finishedTime,
          dueDate: "today"
        },
        ...prevTasks
      ];
      try {
        localStorage.setItem("app_tasks_dashboard_list", JSON.stringify(finalTasks));
      } catch (e) {}
      return finalTasks;
    });

    try {
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#a855f7", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"]
      });
    } catch (e) {}

    showToast(isBadini ? "دەستخۆش! تە خولا خاندنێ ب داوی ئینا! 🌟" : "Great job! Study session completed! 🌟");
  };

  // Settings & Tools Modal State
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Keep dashboardTasks refreshed whenever modal toggles or local storage changes
  useEffect(() => {
    const refreshTasks = () => {
      try {
        const saved = localStorage.getItem("app_tasks_dashboard_list");
        if (saved) {
          setDashboardTasks(JSON.parse(saved));
        }
      } catch (e) {
        console.error(e);
      }
    };
    refreshTasks();
    window.addEventListener("storage", refreshTasks);
    return () => window.removeEventListener("storage", refreshTasks);
  }, [isSettingsOpen]);
  const [activeModalTab, setActiveModalTab] = useState<"syllabus" | "settings" | "logs" | "stats" | "notes">("syllabus");
  const [statsPeriod, setStatsPeriod] = useState<"day" | "week" | "month" | "year">("day");
  const [selectedWeekDayIndex, setSelectedWeekDayIndex] = useState<number>(() => {
    return (new Date().getDay() + 6) % 7;
  });
  const [historyFilter, setHistoryFilter] = useState<"all" | "focus" | "shortBreak" | "longBreak">("all");
  const [showCalendarView, setShowCalendarView] = useState<boolean>(false);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number>(18);
  const [calendarViewMode, setCalendarViewMode] = useState<"week" | "month" | "year">("month");
  const [wizardStep, setWizardStep] = useState<1 | 2>(1);
  const [isChapterDropdownOpen, setIsChapterDropdownOpen] = useState<boolean>(false);
  const [showHelpTooltip, setShowHelpTooltip] = useState<boolean>(false);
  const [showDailyPlanner, setShowDailyPlanner] = useState<boolean>(false);
  const [showActivityHelpModal, setShowActivityHelpModal] = useState<boolean>(false);
  const [isPomodoroFullscreen, setIsPomodoroFullscreen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Motivational Quotes State (Auto-rotates every 6 seconds across 150 quotes)
  const [dailyQuoteIndex, setDailyQuoteIndex] = useState<number>(() => Math.floor(Math.random() * BADINI_MOTIVATIONAL_QUOTES.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setDailyQuoteIndex((prev) => (prev + 1) % BADINI_MOTIVATIONAL_QUOTES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Registered User Name for Personalized Mascot Dialogue
  const registeredUserName = user?.name || localStorage.getItem("deg_user_name") || "ئاریان";

  // Mascot Speech Bubble State (Only active when timer is NOT running)
  const [mascotIdleSpeechIndex, setMascotIdleSpeechIndex] = useState<number>(0);
  const [isMascotSpeechVisible, setIsMascotSpeechVisible] = useState<boolean>(true);

  // Play speech synthesis voice disabled completely as requested by user
  const playCuteMascotSpeech = useCallback((_text: string) => {
    try {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  const motivationalPhrasesBadini = [
    `تەرکیزێ بکە، تۆ دشێی بگەهیە ئارمانجێن خۆ! 🚀`,
    `بەردەوام به، هەر خولەکەک سەرکەفتنەک بو تە چێدکەت! 💪`,
    `مەزنترین سەرکەفتن ب خولەکێن بچووک دەستپێدکەن 🎯`,
    `تۆ ژ هەمی ئاستەنگان ب هێزتری! ⚡`,
    `خۆنەدەنە دەست، پاشەڕۆژا تە پڕی ڕۆشناییە 🌟`,
    `ئەڤرۆ بخوێنە دا سوباهی شانازیێ ب خۆ بکەی ✨`,
    `هیڤیێن تە هێزا تە نە! بەردەوام به 💜`,
    `تەرکیزا تە کلیلا سەرکەفتنا تە یە 🔑`
  ];

  const motivationalPhrasesKu = [
    `تەرکیز بکە، تۆ دەتوانی بگەیتە ئامانجەکانت! 🚀`,
    `بەردەوام بە، هەر خولەکێک سەرکەوتنێک بۆ تۆ دروست دەکات! 💪`,
    `گەورەترین سەرکەوتن بە خولەکی بچووک دەستپێدەکات 🎯`,
    `تۆ لە هەموو بەربەستەکان بەهێزتریت! ⚡`,
    `کۆڵ مەدە، داهاتووی تۆ پڕ لە ڕووناکییە 🌟`,
    `ئەمڕۆ بخوێنە تا بەیانی شانازی بە خۆتەوە بکەیت ✨`,
    `هیوای تۆ هێزی تۆیە! بەردەوام بە 💜`,
    `تەرکیزی تۆ کلیلی سەرکەوتنتە 🔑`,
    `سەرکەوتن بۆ ئەوانەیە کە واز ناهێنن 🏆`,
    `ماندووبوونی ئەمڕۆ، بەختەوەری بەیانییە 🌈`
  ];

  const motivationalPhrasesEn = [
    `Stay focused, you can reach your goals! 🚀`,
    `Keep going, every minute counts towards success! 💪`,
    `Great achievements start with small steps 🎯`,
    `You are stronger than any obstacle! ⚡`,
    `Never give up, your future is bright 🌟`,
    `Study today, be proud tomorrow ✨`,
    `Your focus is the key to your success 🔑`,
    `Success belongs to those who keep going 🏆`,
    `Today's effort is tomorrow's glory 🌈`
  ];

  const getActiveMascotText = useCallback((index: number, _isRunning?: boolean) => {
    const arr = isBadini
      ? motivationalPhrasesBadini
      : isKu
      ? motivationalPhrasesKu
      : motivationalPhrasesEn;
    return arr[index % arr.length];
  }, [isBadini, isKu]);

  useEffect(() => {
    setIsMascotSpeechVisible(true);

    // Periodic motivation/speech loop: smoothly transitions phrase every 5 seconds continuously
    const cycleInterval = setInterval(() => {
      setMascotIdleSpeechIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(cycleInterval);
  }, []);

  // Quick Time Edit Modal State
  const [isQuickTimeModalOpen, setIsQuickTimeModalOpen] = useState<boolean>(false);
  const [customMinutesInput, setCustomMinutesInput] = useState<string>("25");

  const applyNewDuration = (mins: number) => {
    if (mins < 1 || isNaN(mins)) return;
    setIsTimerRunning(false);
    const secs = mins * 60;
    setInitialSeconds(secs);
    setTimerSeconds(secs);
    if (timerMode === "pomodoro" || timerMode === "shortBreak" || timerMode === "longBreak") {
      setDurations((prev) => ({ ...prev, [timerMode]: mins }));
    }
    setIsQuickTimeModalOpen(false);
    showToast(
      isBadini
        ? `دەمی تایمەری ب سەرکەفتن هاتە گوهۆڕین بۆ ${mins} خولەک ⏱️`
        : `Timer updated to ${mins} minutes ⏱️`
    );
  };

  // Notes Section State
  const [notesList, setNotesList] = useState<UserNote[]>(() => {
    const saved = localStorage.getItem("pomodoro_user_notes");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: "1",
        title: "Exam Preparation Plan",
        date: "May 18, 2024",
        time: "2:30 PM",
        content: `My plan for the final exams:\n\n1. Math: Practice 2 hours daily\n2. Physics: Read + Solve problems\n3. Chemistry: Focus on reactions\n4. English: Improve vocabulary\n5. Kurdish: Read stories\n\nTips:\n- Stay consistent\n- Take short breaks\n- Review mistakes`
      },
      {
        id: "2",
        title: "Math Formulas",
        date: "May 18, 2024",
        time: "11:15 AM",
        content: `Important Math Formulas:\n\n• Quadratic equation: x = (-b ± √(b² - 4ac)) / 2a\n• Trigonometric identity: sin²x + cos²x = 1\n• Logarithm product rule: log(ab) = log(a) + log(b)`
      },
      {
        id: "3",
        title: "Physics Concepts",
        date: "May 17, 2024",
        time: "9:40 PM",
        content: `Key Physics principles:\n\n• Force = Mass × Acceleration (F = ma)\n• Ohm's Law: Voltage = Current × Resistance (V = IR)\n• Kinetic Energy = ½ m v²`
      },
      {
        id: "4",
        title: "English Vocabulary",
        date: "May 17, 2024",
        time: "6:20 PM",
        content: `Important Vocabulary words:\n\n• Diligent - having or showing care in work\n• Resilience - capacity to recover quickly from difficulties\n• Comprehensive - complete including all aspects`
      },
      {
        id: "5",
        title: "Chemistry Notes",
        date: "May 16, 2024",
        time: "4:10 PM",
        content: `Organic Chemistry Summary:\n\n• Alkanes (Single bonds, saturated)\n• Alkenes (Double bonds, unsaturated)\n• Alkynes (Triple bonds)`
      },
      {
        id: "6",
        title: "Daily Goals",
        date: "May 16, 2024",
        time: "9:00 AM",
        content: `Goals for today:\n\n- Complete 4 Pomodoro sessions\n- Finish Math homework exercises\n- Review Physics formulas for 30 minutes`
      }
    ];
  });
  const [selectedNoteId, setSelectedNoteId] = useState<string>("1");
  const [swipedNoteId, setSwipedNoteId] = useState<string | null>(null);
  const [searchNotesQuery, setSearchNotesQuery] = useState<string>("");
  const [isEditingNote, setIsEditingNote] = useState<boolean>(true);
  const [editNoteTitle, setEditNoteTitle] = useState<string>("");
  const [editNoteContent, setEditNoteContent] = useState<string>("");
  const [editNoteImages, setEditNoteImages] = useState<string[]>([]);
  const [selectedFullNoteImage, setSelectedFullNoteImage] = useState<string | null>(null);
  const [mobileNoteView, setMobileNoteView] = useState<'list' | 'detail'>('list');
  const noteFileInputRef = useRef<HTMLInputElement | null>(null);
  const noteDetailRef = useRef<HTMLDivElement | null>(null);

  // New Note Wizard Modal States
  const [isNewNoteWizardOpen, setIsNewNoteWizardOpen] = useState<boolean>(false);
  const [wizardSubject, setWizardSubject] = useState<string>("بیرکاری");
  const [wizardCustomSubject, setWizardCustomSubject] = useState<string>("");
  const [wizardChapter, setWizardChapter] = useState<string>("بەندا ١");
  const [wizardCustomChapter, setWizardCustomChapter] = useState<string>("");
  const [wizardTopic, setWizardTopic] = useState<string>("یاسا و هاوکێشەکان");
  const [wizardCustomTopic, setWizardCustomTopic] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("pomodoro_user_notes", JSON.stringify(notesList));
  }, [notesList]);

  // Sync active note content into state whenever selectedNoteId or notesList changes initially
  useEffect(() => {
    if (selectedNoteId) {
      const active = notesList.find((n) => n.id === selectedNoteId);
      if (active) {
        setEditNoteTitle(active.title);
        setEditNoteContent(active.content);
        setEditNoteImages(active.images || []);
      }
    }
  }, [selectedNoteId]);

  const handleNoteImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files) as File[];
    const compressedPromises = fileArray.map((file) => compressImage(file, 1200, 0.8));
    const results = await Promise.all(compressedPromises);
    const validResults = results.filter((url) => url.length > 0);

    if (validResults.length > 0) {
      setEditNoteImages((prev) => [...prev, ...validResults]);
      showToast(isBadini ? "وێنە ب سەرکەفتن هاتە زێدەکرن 📸" : "وێنەکە بە سەرکەوتوویی زیادکرا 📸");
    }
    // reset file input
    if (e.target) e.target.value = "";
  };

  const handleRemoveEditNoteImage = (idx: number) => {
    setEditNoteImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleDownloadImage = (imgUrl: string) => {
    try {
      const a = document.createElement("a");
      a.href = imgUrl;
      a.download = `note-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast(isBadini ? "وێنە ب سەرکەفتن هاتە خەزنکرن / دابەزاندن 📥" : "وێنەکە بە سەرکەوتوویی دابەزێنرا 📥");
    } catch (err) {
      console.error(err);
      showToast(isBadini ? "نەشیا وێنەی خەزن بکەت" : "نەیتوانی وێنەکە خەزن بکات");
    }
  };

  const handleAddNewNote = () => {
    setWizardSubject("بیرکاری");
    setWizardCustomSubject("");
    setWizardChapter("بەندا ١");
    setWizardCustomChapter("");
    setWizardTopic("یاسا و هاوکێشەکان");
    setWizardCustomTopic("");
    setIsNewNoteWizardOpen(true);
  };

  const confirmCreateNewNote = () => {
    const finalSub = wizardSubject === "custom" ? (wizardCustomSubject.trim() || (isBadini ? "بابەت" : "بابەت")) : wizardSubject;
    const finalChap = wizardChapter === "custom" ? wizardCustomChapter.trim() : wizardChapter;
    const finalTop = wizardTopic === "custom" ? (wizardCustomTopic.trim() || (isBadini ? "تێبینی" : "تێبینی")) : wizardTopic;

    let fullTitle = finalSub;
    if (finalChap) fullTitle += ` • ${finalChap}`;
    if (finalTop) fullTitle += `: ${finalTop}`;

    const initialContent = `📚 ${isBadini ? "بابەت" : "بابەت"}: ${finalSub}\n📖 ${isBadini ? "بەند / وانا" : "بەش / وانە"}: ${finalChap || "—"}\n📌 ${isBadini ? "ناڤێ بابەتێ تێبینیێ" : "ناوی بابەتی تێبینیەکە"}: ${finalTop}\n\n${isBadini ? "ناڤەرۆکا تێبینیا خۆ لێرە بنڤێسە..." : "ناوەڕۆکی تێبینی خۆت لێرە بنووسە..."}`;

    const newNote: UserNote = {
      id: Date.now().toString(),
      title: fullTitle,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: initialContent,
      images: []
    };

    setNotesList([newNote, ...notesList]);
    setSelectedNoteId(newNote.id);
    setIsEditingNote(true);
    setEditNoteTitle(newNote.title);
    setEditNoteContent(newNote.content);
    setEditNoteImages([]);
    setMobileNoteView('detail');
    setIsNewNoteWizardOpen(false);
    showToast(isBadini ? "تێبینییا نوی ب سەرکەفتن هاتە دروستکرن" : "تێبینی نوێ بە سەرکەوتوویی دروستکرا");
    setTimeout(() => {
      noteDetailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleDeleteNote = (id: string) => {
    const updated = notesList.filter((n) => n.id !== id);
    setNotesList(updated);
    if (selectedNoteId === id && updated.length > 0) {
      setSelectedNoteId(updated[0].id);
    }
  };

  const handleSaveEditNote = () => {
    setNotesList(
      notesList.map((n) =>
        n.id === selectedNoteId
          ? { ...n, title: editNoteTitle, content: editNoteContent, images: editNoteImages }
          : n
      )
    );
    setIsEditingNote(false);
  };

  const handleFinishWizard = () => {
    if (!selectedSubject || !topicsText.trim()) return;
    setIsSettingsOpen(false);
    setWizardStep(1);
    showToast(
      isBadini
        ? "دەست ب خولا تەرکیزێ هاتەکرن! 🚀"
        : "دەست بە تایمەری خوێندن کرا! 🚀"
    );
  };

  // Subject and Target selection
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>("physics");
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [topicsText, setTopicsText] = useState<string>("");

  // Sound & Ambient State
  const [isAmbientPlaying, setIsAmbientPlaying] = useState<boolean>(false);
  const [ambientVolume, setAmbientVolume] = useState<number>(0.5);
  const [selectedTrackId, setSelectedTrackId] = useState<string>("purple_dream");
  const [isAmbientModalOpen, setIsAmbientModalOpen] = useState<boolean>(false);
  
  const [activeYouTubeId, setActiveYouTubeId] = useState<string | null>(null);
  const [youtubeInputUrl, setYoutubeInputUrl] = useState<string>("");
  const [isLoadingYoutube, setIsLoadingYoutube] = useState<boolean>(false);

  const [customTracks, setCustomTracks] = useState<AmbientTrack[]>(() => {
    try {
      const saved = localStorage.getItem("pomodoro_custom_youtube_tracks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("pomodoro_custom_youtube_tracks", JSON.stringify(customTracks));
    } catch (e) {}
  }, [customTracks]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const synthGainRef = useRef<GainNode | null>(null);

  const allAmbientTracks = [...customTracks, ...AMBIENT_TRACKS];

  const activeAmbientTrack =
    allAmbientTracks.find((t) => t.id === selectedTrackId) || AMBIENT_TRACKS[0];

  // Session Logs State
  const [sessionLogs, setSessionLogs] = useState<StudySessionLog[]>(() => {
    try {
      const saved = localStorage.getItem("deg_pomodoro_logs");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("deg_pomodoro_logs", JSON.stringify(sessionLogs));
    } catch (e) {
      console.error("Failed to save logs", e);
    }
  }, [sessionLogs]);

  // Session completion & low time excitement state
  const [isSessionJustCompleted, setIsSessionJustCompleted] = useState<boolean>(false);
  const [showStartFlash, setShowStartFlash] = useState<boolean>(false);
  const [lowTimeMsgIndex, setLowTimeMsgIndex] = useState<number>(0);
  const [videoError, setVideoError] = useState<boolean>(false);
  const timerVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isTimerRunning && timerVideoRef.current) {
      timerVideoRef.current.muted = true;
      timerVideoRef.current.play().catch(() => {});
    }
  }, [isTimerRunning]);

  const LOW_TIME_MOTIVATIONS_BADINI = [
    "⚡ خولەکەکا زێڕین! تەرکیزا خۆ 100% بکە! 🔥",
    "🔥 نەڕاوەستە، ب تنێ چەند چروکێن کێم مانە! 🚀",
    "🚀 تۆ زۆر نێزیکی سەرکەفتنێ بووی، بەردەوام بە! ✨",
    "⭐ ئافەرین! ئەڤە دەمێ هەمی هێزا تە یە! 💪",
    "🎯 تە کاتەکێ باش بوراند، ب ئارامی ب داوی بئینە! 🌟",
  ];

  const LOW_TIME_MOTIVATIONS_SORANI = [
    "⚡ خولەکێکی زێڕین! سەرنجت 100% ڕابگرە! 🔥",
    "🔥 مه‌وەستە، تەنها چەند چرکەیەکی کەم ماوە! 🚀",
    "🚀 تۆ زۆر نزیک بوویتەوە لە سەرکەوتن! ✨",
    "⭐ ئافەرین! ئەمە کاتی تەواوی توانای تۆیە! 💪",
    "🎯 کاتێکی باشت تێپەڕاند، بە ئارامی تەواوی بکە! 🌟",
  ];

  // Rotate motivational phrase every 3.5 seconds when time is low (< 120s)
  useEffect(() => {
    if (!isTimerRunning || timerSeconds === 0 || timerSeconds > 120) return;
    const interval = setInterval(() => {
      setLowTimeMsgIndex((prev) => (prev + 1) % LOW_TIME_MOTIVATIONS_BADINI.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Timer countdown interval logic
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setIsSessionJustCompleted(true);
      playCompletionChime();
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#a855f7", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"]
        });
      } catch (e) {}
      handleAutoSaveSession();
      if (timerMode === "pomodoro") {
        setFocusCount((c) => c + 1);
        setTimerMode("shortBreak");
        const secs = (durations.shortBreak || 5) * 60;
        setInitialSeconds(secs);
        setTimerSeconds(secs);
        showToast(isBadini ? "دەمێ تەرکیزێ ب داوی هات! نۆکە چوویە پشووا کورت ☕" : "Focus session finished! Switched to short break ☕");
      } else if (timerMode === "shortBreak") {
        setShortBreakCount((c) => c + 1);
        setTimerMode("pomodoro");
        const secs = (durations.pomodoro || 25) * 60;
        setInitialSeconds(secs);
        setTimerSeconds(secs);
        showToast(isBadini ? "پشووا کورت ب داوی هات! بگەڕێڤە بۆ تەرکیزێ 🎯" : "Short break finished! Time to focus 🎯");
      } else if (timerMode === "longBreak") {
        setLongBreakCount((c) => c + 1);
        setTimerMode("pomodoro");
        const secs = (durations.pomodoro || 25) * 60;
        setInitialSeconds(secs);
        setTimerSeconds(secs);
        showToast(isBadini ? "پشووا درێژ ب داوی هات! بگەڕێڤە بۆ تەرکیزێ 🎯" : "Long break finished! Time to focus 🎯");
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  // Completion Chime
  const playCompletionChime = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      console.log("Audio chime error", e);
    }
  };

  const renderTrackIcon = (iconType: string, className: string = "w-5 h-5") => {
    switch (iconType) {
      case "purple":
        return <Sparkles className={className} />;
      case "headphone":
        return <Headphones className={className} />;
      case "rain":
        return <CloudRain className={className} />;
      case "forest":
        return <Trees className={className} />;
      case "fire":
        return <Flame className={className} />;
      case "wave":
        return <Waves className={className} />;
      case "synth":
        return <Radio className={className} />;
      default:
        return <Music className={className} />;
    }
  };

  const startSynthRain = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = ctx;

      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 800;

      const gain = ctx.createGain();
      gain.gain.value = ambientVolume;
      synthGainRef.current = gain;

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
    } catch (e) {
      console.error("Synth audio failed", e);
    }
  };

  const stopAllAmbient = () => {
    setActiveYouTubeId(null);
    if (audioContextRef.current) {
      try {
        if (audioContextRef.current.state !== "closed") {
          audioContextRef.current.close();
        }
      } catch (e) {}
      audioContextRef.current = null;
    }
    if (audioPlayerRef.current) {
      try {
        const player = audioPlayerRef.current;
        audioPlayerRef.current = null;
        player.pause();
        player.removeAttribute("src");
        player.load();
      } catch (e) {}
    }
    synthGainRef.current = null;
    setIsAmbientPlaying(false);
  };

  const extractYouTubeId = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.trim().match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleAddYouTubeTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeInputUrl.trim()) return;

    const ytId = extractYouTubeId(youtubeInputUrl);
    if (!ytId) {
      showToast(
        isBadini
          ? "تکایە لینکەکێ دروست یێ یوتوبی (YouTube) بنڤێسە"
          : "تکایە لینکێکی دروستی یوتیوب (YouTube) بنووسە"
      );
      return;
    }

    setIsLoadingYoutube(true);
    let title = isBadini ? "دەنگێ یوتوبی" : "دەنگی یوتیوب";

    try {
      const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${ytId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.title) {
          title = data.title;
        }
      }
    } catch (e) {
      console.error("Failed to fetch youtube video title", e);
    }

    const newTrack: AmbientTrack = {
      id: `yt_${ytId}_${Date.now()}`,
      nameBadini: title,
      nameKurdish: title,
      nameEn: title,
      descBadini: isBadini ? "دەنگێ ئۆنلاین یێ یوتوبی (بتنێ دەنگ)" : "YouTube Audio Stream",
      descEn: "YouTube Audio Stream",
      url: `https://www.youtube.com/watch?v=${ytId}`,
      youtubeId: ytId,
      iconType: "headphone",
      bgGradient: "from-red-600 via-rose-700 to-amber-900",
      badge: "YouTube 🔴",
      coverImage: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
      isCustom: true,
    };

    setCustomTracks((prev) => [newTrack, ...prev]);
    setYoutubeInputUrl("");
    setIsLoadingYoutube(false);
    playTrack(newTrack.id);
    showToast(isBadini ? `دەنگێ یوتوبی "${title}" هاتە زێدەکرن! 🎶` : `YouTube audio "${title}" added! 🎶`);
  };

  const playTrack = (trackId: string) => {
    const track = allAmbientTracks.find((t) => t.id === trackId) || AMBIENT_TRACKS[0];
    setSelectedTrackId(trackId);

    stopAllAmbient();

    if (track.youtubeId) {
      setActiveYouTubeId(track.youtubeId);
      setIsAmbientPlaying(true);
    } else if (track.url === "synth") {
      setActiveYouTubeId(null);
      startSynthRain();
      setIsAmbientPlaying(true);
    } else {
      setActiveYouTubeId(null);
      try {
        const audio = new Audio();
        audio.src = track.url;
        audio.loop = true;
        audio.volume = ambientVolume;
        audioPlayerRef.current = audio;

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsAmbientPlaying(true);
            })
            .catch((err) => {
              const errStr = String(err?.message || err || "");
              if (err?.name === "AbortError" || errStr.includes("interrupted") || errStr.includes("pause")) {
                return;
              }
              try {
                startSynthRain();
                setIsAmbientPlaying(true);
              } catch (fallbackErr) {
                setIsAmbientPlaying(false);
              }
            });
        }
      } catch (err) {
        try {
          startSynthRain();
          setIsAmbientPlaying(true);
        } catch (fallbackErr) {
          setIsAmbientPlaying(false);
        }
      }
    }

    const trackName = isBadini ? track.nameBadini : track.nameEn;
    showToast(isBadini ? `دەنگێ "${trackName}" هاتە دەستپێکرن 🎶` : `Playing "${trackName}" 🎶`);
  };

  const handleDeleteCustomTrack = (trackId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedTrackId === trackId) {
      stopAllAmbient();
    }
    setCustomTracks((prev) => prev.filter((t) => t.id !== trackId));
    showToast(isBadini ? "دەنگێ زێدەکری هاتە ژێبرن" : "Custom track removed");
  };

  const toggleAmbientSound = () => {
    if (isAmbientPlaying) {
      stopAllAmbient();
    } else {
      playTrack(selectedTrackId);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setAmbientVolume(newVol);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.volume = newVol;
    }
    if (synthGainRef.current) {
      synthGainRef.current.gain.value = newVol;
    }
  };

  const handleSelectMode = (mode: "pomodoro" | "shortBreak" | "longBreak") => {
    setIsTimerRunning(false);
    setTimerMode(mode);
    const mins = durations[mode];
    const secs = mins * 60;
    setInitialSeconds(secs);
    setTimerSeconds(secs);
  };

  const handleCustomDuration = (mins: number) => {
    setIsTimerRunning(false);
    setTimerMode("custom");
    const secs = mins * 60;
    setInitialSeconds(secs);
    setTimerSeconds(secs);
  };

  const handleAutoSaveSession = () => {
    const mins = Math.round(initialSeconds / 60);
    if (mins < 1) return;

    const currentSubjSyllabus = grade12SyllabusData.find((s) => s.id === selectedSubject);
    const activeChObj = currentSubjSyllabus?.chapters.find((c) => c.id === selectedChapter);
    const activeSecObj = activeChObj?.sections.find((sec) => sec.id === selectedSection);

    const newLog: StudySessionLog = {
      id: "log_" + Date.now(),
      date: new Date().toLocaleDateString("ku-IQ"),
      subjectId: selectedSubject,
      durationMinutes: mins,
      chapterTitle: activeChObj ? (isBadini ? activeChObj.titleBadini : activeChObj.titleKu) : selectedChapter,
      sectionTitle: activeSecObj ? (isBadini ? activeSecObj.titleBadini : activeSecObj.titleKu) : selectedSection,
      topicsNote: topicsText.trim(),
      timestamp: Date.now()
    };

    setSessionLogs((prev) => [newLog, ...prev]);
    showToast(isBadini ? "دەورە ب سەرکەفتن هاتە تۆمارکرن 🎉" : "خوێندنەکە بە سەرکەوتوویی تۆمارکرا 🎉");
  };

  const handleDeleteLog = (id: string) => {
    setSessionLogs((prev) => prev.filter((l) => l.id !== id));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const activeBg = wallpaper === "custom" && customWallpaper ? customWallpaper : (wallpapersMap[wallpaper]?.url || wallpapersMap.bg_1.url);
  const currentSubjectObj = grade12SyllabusData.find((s) => s.id === selectedSubject);
  const activeSubjectInfo = subjectsList.find((s) => s.id === selectedSubject);

  const totalFocusMinsToday = sessionLogs
    .filter((l) => new Date(l.timestamp).toDateString() === new Date().toDateString())
    .reduce((acc, l) => acc + l.durationMinutes, 0) || 75;

  const totalSessionsCount = focusCount + shortBreakCount + longBreakCount;
  const progressPercent = Math.min(100, Math.round((focusCount / dailyTargetSessions) * 100));

  const isLowTime = isTimerRunning && timerSeconds > 0 && timerSeconds <= 120;
  const isCriticalTime = isTimerRunning && timerSeconds > 0 && timerSeconds <= 30;

  if (isFloatingMini) {
    if (isMiniDismissed) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          dir="rtl"
          className="fixed bottom-5 left-5 z-[999999] flex items-center gap-3 p-2.5 sm:p-3 bg-slate-950/90 border border-purple-500/50 rounded-3xl shadow-[0_12px_45px_rgba(112,26,117,0.6)] backdrop-blur-xl text-white select-none animate-fadeIn group/mini hover:border-purple-400 transition-all duration-300"
        >
          {/* MASCOT AVATAR */}
          <div
            onClick={onExpandFromMini}
            className="relative cursor-pointer flex items-center justify-center shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-950/80 to-indigo-950/80 border border-purple-400/40 overflow-hidden shadow-inner group-hover/mini:scale-105 transition-transform"
          >
            <BlinkingMascotAvatar
              isTimerRunning={isTimerRunning}
              isPaused={!isTimerRunning && timerSeconds < initialSeconds && timerSeconds > 0}
              timerSeconds={timerSeconds}
              initialSeconds={initialSeconds}
              timerMode={timerMode}
              language={language}
              size={36}
              showSpeechBubble={false}
            />
          </div>

          {/* TIMER MODE & TIME READOUT */}
          <div
            onClick={onExpandFromMini}
            className="flex flex-col cursor-pointer pr-0.5"
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-300">
              <span className={`w-2 h-2 rounded-full ${isTimerRunning ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
              <span>
                {timerMode === "pomodoro"
                  ? isBadini ? "تەرکیز 🎯" : "Focus 🎯"
                  : timerMode === "shortBreak"
                  ? isBadini ? "پشووا کورت ☕" : "Short Break ☕"
                  : isBadini ? "پشووا درێژ 🛋️" : "Long Break 🛋️"}
              </span>
            </div>
            <span className="font-sans font-black text-xl sm:text-2xl text-white tracking-tight leading-none group-hover/mini:text-purple-200 transition-colors">
              {Math.floor(timerSeconds / 60).toString().padStart(2, "0")}:
              {(timerSeconds % 60).toString().padStart(2, "0")}
            </span>
          </div>

          {/* QUICK CONTROLS */}
          <div className="flex items-center gap-1.5 mr-1 border-r border-white/15 pr-2.5">
            {/* PLAY / PAUSE */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (!isTimerRunning) {
                  setShowStartFlash(true);
                  setTimeout(() => setShowStartFlash(false), 800);
                }
                setIsTimerRunning(!isTimerRunning);
              }}
              title={isTimerRunning ? (isBadini ? "ڕاوەستان" : "Pause") : (isBadini ? "دەستپێکرن" : "Start")}
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center justify-center transition shadow-md shadow-purple-900/40 active:scale-95 cursor-pointer"
            >
              {isTimerRunning ? (
                <Pause className="w-4 h-4 fill-current text-white" />
              ) : (
                <Play className="w-4 h-4 fill-current text-white ml-0.5" />
              )}
            </button>

            {/* EXPAND BUTTON */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onExpandFromMini?.();
              }}
              title={isBadini ? "ڤەکرنا بەرنامەی ب تەمامی" : "Open Full Pomodoro"}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* CLOSE DISMISS BUTTON */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsMiniDismissed(true);
              }}
              title={isBadini ? "داخستنا تایمەری بچیک" : "Dismiss Mini Timer"}
              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-rose-500/30 text-white/50 hover:text-rose-200 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-[#070514] text-white font-sans select-none flex flex-col items-center justify-center p-3 sm:p-6 overflow-hidden">

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999999] bg-white text-slate-900 font-extrabold px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 text-xs sm:text-sm border border-purple-200 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* PAGE HEADER OVERLAY (OUTSIDE CARD - TOP NAV) */}
      <header className="relative z-10 w-full max-w-5xl flex items-center justify-between gap-4 mb-3 sm:mb-4 px-2">
        {onBackToHome && (
          <button
            type="button"
            onClick={onBackToHome}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer active:scale-95 shadow-lg"
            title={isBadini ? "سەرەکی" : "سەرەکی"}
          >
            <Home className="w-4 h-4" />
            <span>{isBadini ? "سەرەکی" : "سەرەکی"}</span>
          </button>
        )}

        <div className="text-right flex flex-col items-end mr-auto sm:mr-0">
          <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white drop-shadow-md">
            study with me.io
          </h1>
          <p className="text-[11px] sm:text-xs text-white/70 font-serif drop-shadow-sm">
            بۆ پۆلا ۱۲ زانستی و وێژەیی
          </p>
        </div>
      </header>

      {/* CONTAINER WRAPPER FOR MAIN TIMER BOX & TODAY'S PROGRESS SIDE CARD */}
      <div dir="ltr" className="relative z-10 w-full max-w-6xl my-auto flex flex-col md:flex-row items-center md:items-stretch justify-center gap-5 sm:gap-6 py-2 sm:py-4">
        {/* MAIN CONTAINER CARD BOX (SMOOTH FULLSCREEN EXPANSION ANIMATION) */}
        <motion.div
          layout
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={
            isPomodoroFullscreen
              ? "fixed inset-0 z-[999999] w-screen h-screen h-[100dvh] rounded-none border-0 shadow-2xl flex flex-col justify-between p-4 sm:p-6 md:p-8 bg-cover bg-center overflow-hidden select-none"
              : "w-full md:w-2/3 lg:w-3/4 min-h-[460px] sm:min-h-[500px] max-h-[640px] rounded-[32px] overflow-hidden border border-purple-400/30 shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col justify-between p-5 sm:p-8 bg-cover bg-center flex-1 relative"
          }
          style={{ backgroundImage: `url(${activeBg})` }}
        >
          {/* CARD BACKGROUND IMAGE LAYER */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 pointer-events-none z-0"
            style={{ backgroundImage: `url(${activeBg})` }}
          />
          {/* ATMOSPHERIC GRADIENT OVERLAY INSIDE CARD */}
          <div
            className={`absolute inset-0 pointer-events-none z-0 transition-all duration-500 ${
              isPomodoroFullscreen
                ? "bg-gradient-to-b from-black/60 via-purple-950/30 to-black/80"
                : "bg-gradient-to-b from-black/40 via-purple-900/10 to-black/60"
            }`}
          />

          {/* TOP ROW INSIDE CARD: SUBJECT SELECTOR (LEFT), ACTION ICONS (RIGHT) */}
          <div className="relative z-10 w-full flex items-center justify-between gap-3 shrink-0">
            {/* TOP LEFT INSIDE CARD: SUBJECT SELECTOR */}
            <div className="flex items-center justify-start">
              <button
                type="button"
                onClick={() => {
                  setIsSettingsOpen(true);
                  setActiveModalTab("syllabus");
                }}
                className={`rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/25 font-bold text-white flex items-center gap-2 transition cursor-pointer shadow-md active:scale-95 ${
                  isPomodoroFullscreen ? "px-4 py-2 text-sm" : "px-3.5 py-1.5 text-xs"
                }`}
              >
                <BookOpen className={isPomodoroFullscreen ? "w-4 h-4 text-amber-300" : "w-3.5 h-3.5 text-amber-300"} />
                <span>
                  {activeSubjectInfo ? (isBadini ? activeSubjectInfo.nameBadini : activeSubjectInfo.nameKu) : (isBadini ? "فيزيا" : "فيزيا")}
                  {selectedChapter && ` • ${selectedChapter}`}
                </span>
              </button>
            </div>

            {/* TOP RIGHT INSIDE CARD: FULLSCREEN, NOTES, MUSIC & NOTIFICATION ICONS */}
            <div dir="ltr" className="flex items-center justify-end gap-2.5">
              {/* FULLSCREEN TOGGLE BUTTON */}
              <button
                type="button"
                onClick={() => {
                  setIsPomodoroFullscreen(!isPomodoroFullscreen);
                }}
                className={`rounded-full backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg active:scale-90 ${
                  isPomodoroFullscreen
                    ? "w-11 h-11 bg-amber-500/30 hover:bg-amber-500/50 border-amber-300/50"
                    : "w-10 h-10 bg-black/40 hover:bg-black/60 border-white/20"
                }`}
                title={isPomodoroFullscreen ? (isBadini ? "دەرچوون ژ شاشا مەزن" : "دەرچوون لە شاشەی گەورە") : (isBadini ? "شاشا مەزن" : "شاشەی گەورە")}
              >
                {isPomodoroFullscreen ? (
                  <Minimize2 className="w-5 h-5 text-amber-300 animate-pulse" />
                ) : (
                  <Maximize2 className="w-4 h-4 text-purple-200" />
                )}
              </button>

              {/* NOTES BUTTON */}
              <button
                type="button"
                onClick={() => {
                  setIsSettingsOpen(true);
                  setActiveModalTab("notes");
                }}
                className={`rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition cursor-pointer shadow-lg active:scale-95 ${
                  isPomodoroFullscreen ? "w-11 h-11" : "w-10 h-10"
                }`}
                title={isBadini ? "تێبینی (Notes)" : "Notes"}
              >
                <FileText className={isPomodoroFullscreen ? "w-5 h-5 text-purple-200" : "w-4 h-4 text-purple-200"} />
              </button>

              {/* AMBIENT MUSIC TOGGLE */}
              <button
                type="button"
                onClick={toggleAmbientSound}
                className={`rounded-full backdrop-blur-md border flex items-center justify-center transition cursor-pointer shadow-lg active:scale-95 ${
                  isPomodoroFullscreen ? "w-11 h-11" : "w-10 h-10"
                } ${
                  isAmbientPlaying
                    ? "bg-purple-600 border-purple-300 text-white animate-pulse"
                    : "bg-black/40 hover:bg-black/60 border-white/20 text-white"
                }`}
                title={isBadini ? "دەنگێ ئارامکرنێ" : "Music Ambient"}
              >
                <Music className={isPomodoroFullscreen ? "w-5 h-5 text-white" : "w-4 h-4 text-white"} />
              </button>

              {/* NOTIFICATION / LOGS BUTTON WITH BADGE */}
              <button
                type="button"
                onClick={() => {
                  setIsSettingsOpen(true);
                  setActiveModalTab("logs");
                }}
                className={`relative rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition cursor-pointer shadow-lg active:scale-95 ${
                  isPomodoroFullscreen ? "w-11 h-11" : "w-10 h-10"
                }`}
                title={isBadini ? "نۆتفیکەیشن / مێژوو" : "Notifications & History"}
              >
                <Bell className={isPomodoroFullscreen ? "w-5 h-5 text-white" : "w-4 h-4 text-white"} />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center border border-white/40 shadow">
                  3
                </span>
              </button>
            </div>
          </div>

          {/* POMODORO MODE SWITCHER BAR (FOCUS - SHORT BREAK - LONG BREAK) */}
          <div dir="ltr" className="relative z-10 mx-auto my-1.5 sm:my-2 flex items-center justify-center">
            <div className="p-1 sm:p-1.5 rounded-full bg-[#0a071f]/80 backdrop-blur-xl border border-purple-500/25 shadow-2xl flex items-center gap-1 sm:gap-2 max-w-full overflow-x-auto">
              {/* FOCUS TAB */}
              <button
                type="button"
                onClick={() => handleSelectMode("pomodoro")}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                  timerMode === "pomodoro"
                    ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.6)] border border-purple-300/40"
                    : "text-purple-200/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{isBadini ? "تەرکیز" : "Focus"}</span>
              </button>

              {/* SHORT BREAK TAB */}
              <button
                type="button"
                onClick={() => handleSelectMode("shortBreak")}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                  timerMode === "shortBreak"
                    ? "bg-teal-600 text-white shadow-[0_0_20px_rgba(20,184,166,0.6)] border border-teal-300/40"
                    : "text-teal-200/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Coffee className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{isBadini ? "پشووا کورت" : "Short Break"}</span>
              </button>

              {/* LONG BREAK TAB */}
              <button
                type="button"
                onClick={() => handleSelectMode("longBreak")}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                  timerMode === "longBreak"
                    ? "bg-sky-600 text-white shadow-[0_0_20px_rgba(14,165,233,0.6)] border border-sky-300/40"
                    : "text-sky-200/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Armchair className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{isBadini ? "پشووا درێژ" : "Long Break"}</span>
              </button>
            </div>
          </div>

          {/* ACTIVE STUDY SUBJECT & LESSON SELECTOR BADGE */}
          <div className="relative z-10 mx-auto my-2 flex flex-col items-center justify-center px-2 w-full max-w-md">
            <button
              type="button"
              onClick={() => setIsSelectingSubjectModalOpen(true)}
              className={`group w-full px-4 py-2.5 rounded-2xl border text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-between gap-3 cursor-pointer ${
                isTimerRunning
                  ? "bg-gradient-to-r from-purple-950/90 via-indigo-900/90 to-purple-950/90 border-amber-400/60 shadow-[0_0_25px_rgba(245,158,11,0.3)] animate-pulse"
                  : "bg-gradient-to-r from-purple-950/80 via-indigo-950/80 to-purple-900/80 hover:from-purple-900 hover:to-indigo-900 border-purple-400/35"
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 border border-purple-300/50 text-white text-lg font-black flex items-center justify-center shadow-md shrink-0">
                  📖
                </span>
                <div className="text-right truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-amber-300">{activeStudySubject}</span>
                    <span className="text-[10px] text-purple-200/70 font-extrabold truncate">• {activeStudyChapter}</span>
                  </div>
                  <div className="text-[11px] font-extrabold text-purple-100 truncate group-hover:text-purple-200">
                    {activeStudyLesson}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 bg-purple-600/30 group-hover:bg-purple-600/50 border border-purple-400/40 px-2.5 py-1 rounded-xl text-[11px] font-bold text-purple-200">
                <Pencil className="w-3 h-3 text-amber-300" />
                <span>{isBadini ? "دەستنیشانکرن" : "دیاریکردن"}</span>
              </div>
            </button>
          </div>

          {/* CENTER CONTENT INSIDE CARD: CIRCULAR PROGRESS RING WITH BLINKING MASCOT AVATAR IN CENTER */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center gap-1 sm:gap-2 py-1">
            {/* CIRCULAR TIMER RING & MASCOT */}
            <div className={`relative flex items-center justify-center mt-9 sm:mt-12 transition-all duration-500 ${
              isLowTime ? "scale-105" : ""
            }`}>
              {/* DYNAMIC MASCOT SPEECH & MOTIVATION BUBBLE ABOVE HEAD */}
              <AnimatePresence mode="wait">
                {isMascotSpeechVisible && (
                  <motion.div
                    key={`mascot-speech-${isTimerRunning ? "running" : "idle"}-${mascotIdleSpeechIndex}`}
                    initial={{ opacity: 0, y: 10, scale: 0.85 }}
                    animate={{ opacity: 1, y: [0, -5, 0], scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.85 }}
                    transition={{
                      opacity: { duration: 0.35 },
                      scale: { duration: 0.35 },
                      y: { repeat: Infinity, duration: 2.8, ease: "easeInOut" }
                    }}
                    onClick={() => {
                      const nextIdx = mascotIdleSpeechIndex + 1;
                      setMascotIdleSpeechIndex(nextIdx);
                      const speechText = getActiveMascotText(nextIdx, isTimerRunning);
                      playCuteMascotSpeech(speechText);
                    }}
                    className="absolute -top-12 sm:-top-14 z-50 cursor-pointer pointer-events-auto select-none"
                  >
                    <div className="relative px-4 py-1.5 sm:py-2 rounded-2xl bg-gradient-to-r from-purple-950/95 via-indigo-950/95 to-slate-900/95 border-2 border-purple-400/70 shadow-[0_8px_30px_rgba(168,85,247,0.6)] backdrop-blur-md text-purple-100 text-xs sm:text-sm font-black tracking-wide flex items-center gap-1.5 whitespace-nowrap">
                      <span>
                        {getActiveMascotText(mascotIdleSpeechIndex, isTimerRunning)}
                      </span>
                      {/* Dialogue Speech Tail */}
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-950/95 border-b-2 border-r-2 border-purple-400/70 rotate-45" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* EXCITEMENT GLOWING PULSE BACKDROP WHEN TIME IS LOW */}
              {isLowTime && (
                <div className="absolute inset-0 -m-8 sm:-m-12 rounded-full bg-gradient-to-r from-amber-500/40 via-rose-500/50 to-red-600/40 blur-3xl animate-pulse pointer-events-none" />
              )}

              {/* SVG CIRCULAR PROGRESS ARC */}
              <svg
                className={`transform -rotate-90 transition-all duration-500 relative z-20 pointer-events-none ${
                  isPomodoroFullscreen
                    ? "w-[220px] h-[220px] sm:w-[280px] sm:h-[280px]"
                    : "w-[180px] h-[180px] sm:w-[210px] sm:h-[210px]"
                }`}
                viewBox="0 0 240 240"
              >
                <defs>
                  <linearGradient id="timerArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop
                      offset="0%"
                      stopColor={
                        isLowTime
                          ? "#f59e0b"
                          : timerMode === "shortBreak"
                          ? "#2dd4bf"
                          : timerMode === "longBreak"
                          ? "#38bdf8"
                          : "#d8b4fe"
                      }
                    />
                    <stop
                      offset="50%"
                      stopColor={
                        isLowTime
                          ? "#f43f5e"
                          : timerMode === "shortBreak"
                          ? "#0d9488"
                          : timerMode === "longBreak"
                          ? "#0284c7"
                          : "#a855f7"
                      }
                    />
                    <stop
                      offset="100%"
                      stopColor={
                        isLowTime
                          ? "#ef4444"
                          : timerMode === "shortBreak"
                          ? "#0f766e"
                          : timerMode === "longBreak"
                          ? "#0369a1"
                          : "#7c3aed"
                      }
                    />
                  </linearGradient>
                </defs>

                {/* Track Circle */}
                <circle
                  cx="120"
                  cy="120"
                  r="102"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="10"
                  fill="transparent"
                />

                {/* Progress Arc Circle */}
                <circle
                  cx="120"
                  cy="120"
                  r="102"
                  stroke="url(#timerArcGradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  fill="transparent"
                  strokeDasharray={640.88}
                  strokeDashoffset={
                    640.88 *
                    (1 - Math.min(1, Math.max(0, (initialSeconds - timerSeconds) / (initialSeconds || 1))))
                  }
                  className={`transition-all duration-1000 ease-linear ${
                    isLowTime
                      ? "drop-shadow-[0_0_25px_rgba(244,63,94,0.95)]"
                      : "drop-shadow-[0_0_15px_rgba(168,85,247,0.7)]"
                  }`}
                />
              </svg>

              {/* CENTER VIDEO OR MASCOT CHARACTER */}
              <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                {/* START WHITE FLASH LIGHT EFFECT */}
                <AnimatePresence>
                  {showStartFlash && (
                    <motion.div
                      key="start-flash"
                      initial={{ scale: 0.1, opacity: 1 }}
                      animate={{ scale: 1.4, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.75, ease: "easeOut" }}
                      className="absolute z-30 w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-radial from-white via-slate-100/90 to-purple-300/0 shadow-[0_0_90px_rgba(255,255,255,1)] pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                {/* RICH PURPLE GLOW BACKGROUND / AURA */}
                <div className={`absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full blur-2xl animate-pulse pointer-events-none ${
                  isLowTime ? "bg-rose-500/45 shadow-[0_0_80px_rgba(244,63,94,0.6)]" : "bg-purple-600/40 shadow-[0_0_90px_rgba(168,85,247,0.65)]"
                }`} />
                <div className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-radial from-purple-500/30 via-violet-600/15 to-transparent blur-xl pointer-events-none" />
                <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-b from-purple-500/15 via-violet-600/10 to-indigo-900/10 blur-md pointer-events-none" />

                <div className="relative z-10 flex items-center justify-center pointer-events-none select-none bg-transparent">
                  {!videoError ? (
                    <div className="flex items-center justify-center transform transition-all duration-300 pointer-events-none select-none bg-transparent">
                      <PomodoroVideoPlayer
                        key={
                          timerMode === "shortBreak"
                            ? "break-video-short"
                            : timerMode === "longBreak"
                            ? "break-video-long-pizza"
                            : isTimerRunning
                            ? "running-video-d2"
                            : timerSeconds < initialSeconds
                            ? "paused-video-why"
                            : "idle-video-bhez"
                        }
                        src={
                          timerMode === "shortBreak"
                            ? "/coffee cup.webm"
                            : timerMode === "longBreak"
                            ? "/pizza.webm"
                            : isTimerRunning
                            ? "/d2.webm"
                            : timerSeconds < initialSeconds
                            ? "/why.webm"
                            : "/bhez.webm"
                        }
                        trimStartSeconds={
                          isTimerRunning && timerMode !== "shortBreak" && timerMode !== "longBreak" ? 1.0 : 0
                        }
                        trimEndSeconds={
                          isTimerRunning && timerMode !== "shortBreak" && timerMode !== "longBreak" ? 2.0 : 0
                        }
                        isPlaying={true}
                        size={
                          timerMode === "longBreak"
                            ? (isMobile ? 160 : (isPomodoroFullscreen ? 220 : 185))
                            : isPomodoroFullscreen
                            ? (isMobile ? 180 : 220)
                            : (isMobile ? 160 : 185)
                        }
                      />
                    </div>
                  ) : (
                    <BlinkingMascotAvatar
                      isTimerRunning={isTimerRunning}
                      isPaused={!isTimerRunning && timerSeconds < initialSeconds && timerSeconds > 0}
                      timerSeconds={timerSeconds}
                      initialSeconds={initialSeconds}
                      timerMode={timerMode}
                      language={language}
                      size={isPomodoroFullscreen ? (isMobile ? 170 : 210) : (isMobile ? 150 : 175)}
                      showStateSelector={false}
                    />
                  )}
                </div>
              </div>
            </div>


            {/* DIGITAL TIME READOUT BELOW CIRCULAR RING */}
            <div className="flex flex-col items-center justify-center mt-1 sm:mt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setCustomMinutesInput(Math.floor(timerSeconds / 60).toString());
                  setIsQuickTimeModalOpen(true);
                }}
                title={isBadini ? "کلیک بکە بۆ گوهۆڕینا ده‌مێ تایمەری" : "Click to change timer duration"}
                className="group relative flex items-center justify-center gap-2 cursor-pointer focus:outline-none select-none transition-transform duration-300 hover:scale-105 active:scale-95 py-1 px-3 rounded-2xl hover:bg-white/10"
              >
                <span
                  className={`font-sans font-black tracking-tight drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)] leading-none transition-all duration-300 ${
                    isLowTime
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-red-400 animate-pulse scale-105"
                      : "text-white group-hover:text-purple-200"
                  } ${
                    isPomodoroFullscreen
                      ? "text-5xl sm:text-7xl md:text-8xl"
                      : "text-4xl sm:text-5xl md:text-6xl"
                  }`}
                >
                  {Math.floor(timerSeconds / 60).toString().padStart(2, "0")}:
                  {(timerSeconds % 60).toString().padStart(2, "0")}
                </span>

                <span className="p-1.5 rounded-full bg-purple-600/90 hover:bg-purple-500 border border-purple-300/40 text-white shadow-lg transition-all group-hover:scale-110 flex items-center justify-center">
                  <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-100" />
                </span>
              </button>

              {/* EXCITING DYNAMIC MOTIVATIONAL OR CELEBRATION BANNER */}
              <AnimatePresence mode="wait">
                {(isSessionJustCompleted || (timerSeconds === 0 && !isTimerRunning)) ? (
                  <motion.div
                    key="completed-banner"
                    initial={{ scale: 0.85, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.85, opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="mt-2.5 px-4 sm:px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_35px_rgba(16,185,129,0.85)] border border-emerald-300/80 animate-pulse"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 animate-spin shrink-0" />
                    <span>
                      {isBadini
                        ? "🎉 دەستخۆش! تە ب سەرکەفتن ڤە ئەڤ دەمە ب داوی ئینا! ئافەرین ب هەوڵا تە 🌟"
                        : "🎉 دەستخۆش! بە سەرکەوتوویی ئەم کاتەت تەواو کرد! ئافەرین لە هەوڵەکانت 🌟"}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-200 fill-emerald-200 shrink-0" />
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {/* DYNAMIC MODE SUBTITLE BADGE */}
              <div dir="ltr" className="flex items-center gap-2 mt-1.5 sm:mt-2 drop-shadow-md">
                <div className={`flex items-center gap-1.5 text-white font-black tracking-wide ${
                  isPomodoroFullscreen ? "text-base sm:text-lg" : "text-xs sm:text-sm"
                }`}>
                  {timerMode === "pomodoro" ? (
                    <>
                      <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300" />
                      <span>{isBadini ? "دەمێ تەرکیزێ" : "focus time"}</span>
                    </>
                  ) : timerMode === "shortBreak" ? (
                    <>
                      <Coffee className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-300" />
                      <span>{isBadini ? "پشووا کورت" : "short break"}</span>
                    </>
                  ) : (
                    <>
                      <Armchair className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-300" />
                      <span>{isBadini ? "پشووا درێژ" : "long break"}</span>
                    </>
                  )}
                </div>
                <span className="text-white/40 text-xs">•</span>
                <div className={`flex items-center gap-1 font-bold ${
                  timerMode === "pomodoro" ? "text-rose-300" : timerMode === "shortBreak" ? "text-teal-300" : "text-sky-300"
                } ${
                  isPomodoroFullscreen ? "text-xs sm:text-sm" : "text-[11px] sm:text-xs"
                }`}>
                  <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                  <span>
                    {timerMode === "pomodoro"
                      ? (isBadini ? "تەرکیز بکە!" : "Stay focused!")
                      : timerMode === "shortBreak"
                      ? (isBadini ? "پشوویەکا خۆش وەرگرە!" : "Enjoy your break!")
                      : (isBadini ? "ئارام ببە و وزێ بگرە!" : "Rest & recharge!")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW INSIDE CARD: CONTROL BUTTONS (SETTINGS - START - RESET) */}
          <div dir="ltr" className={`relative z-10 flex items-center justify-center gap-4 sm:gap-6 shrink-0 ${
            isPomodoroFullscreen ? "mb-1 sm:mb-2 gap-5 sm:gap-7" : ""
          }`}>
            {/* GEAR / SETTINGS BUTTON (LEFT) */}
            <button
              type="button"
              onClick={() => {
                setIsSettingsOpen(true);
                setActiveModalTab("settings");
              }}
              className={`rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition transform active:scale-95 cursor-pointer shadow-lg ${
                isPomodoroFullscreen ? "w-14 h-14 sm:w-16 sm:h-16" : "w-12 h-12 sm:w-14 sm:h-14"
              }`}
              title={isBadini ? "ڕێکخستن" : "Settings"}
            >
              <Settings className={isPomodoroFullscreen ? "w-6 h-6 sm:w-7 sm:h-7 text-white" : "w-5 h-5 sm:w-6 sm:h-6 text-white"} />
            </button>

            {/* START / PAUSE BUTTON (CENTER PILL) */}
            <button
              type="button"
              onClick={() => {
                if (isSessionJustCompleted) {
                  setIsSessionJustCompleted(false);
                }
                if (!isTimerRunning) {
                  setShowStartFlash(true);
                  setTimeout(() => setShowStartFlash(false), 800);
                }
                setIsTimerRunning(!isTimerRunning);
              }}
              className={`rounded-full bg-white hover:bg-slate-100 text-[#140c33] font-black shadow-[0_10px_40px_rgba(255,255,255,0.4)] transition transform active:scale-95 cursor-pointer flex items-center justify-center border border-white/50 ${
                isPomodoroFullscreen
                  ? "px-14 sm:px-20 py-4 sm:py-5 text-xl sm:text-2xl gap-4"
                  : "px-10 sm:px-14 py-3 sm:py-3.5 text-lg sm:text-xl gap-3"
              }`}
            >
              <span className="font-black">{isTimerRunning ? (isBadini ? "ڕاوەستان" : "pause") : (isBadini ? "دەستپێکرن" : "start")}</span>
              {isTimerRunning ? (
                <Pause className={isPomodoroFullscreen ? "w-7 h-7 fill-current text-[#140c33]" : "w-5 h-5 sm:w-6 sm:h-6 fill-current text-[#140c33]"} />
              ) : (
                <Play className={isPomodoroFullscreen ? "w-7 h-7 fill-current text-[#140c33] ml-1" : "w-5 h-5 sm:w-6 sm:h-6 fill-current text-[#140c33] ml-0.5"} />
              )}
            </button>

            {/* RESET BUTTON */}
            <button
              type="button"
              onClick={() => {
                setIsTimerRunning(false);
                setIsSessionJustCompleted(false);
                setTimerSeconds(initialSeconds);
              }}
              className={`rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition transform active:scale-95 cursor-pointer shadow-lg ${
                isPomodoroFullscreen ? "w-14 h-14 sm:w-16 sm:h-16" : "w-12 h-12 sm:w-14 sm:h-14"
              }`}
              title={isBadini ? "ڕیسێت" : "Reset"}
            >
              <RotateCcw className={isPomodoroFullscreen ? "w-6 h-6 sm:w-7 sm:h-7 text-white" : "w-5 h-5 sm:w-6 sm:h-6 text-white"} />
            </button>

            {/* FINISH / COMPLETE SESSION BUTTON ("خلاس بی 🏁") */}
            <button
              type="button"
              onClick={handleFinishPomodoroSession}
              className={`rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-black shadow-[0_0_25px_rgba(16,185,129,0.6)] border border-emerald-300/80 transition transform active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
                isPomodoroFullscreen
                  ? "px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg"
                  : "px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm"
              }`}
              title={isBadini ? "خلاس بی (تەواوکردنی خولێ ب داوی هات)" : "تەواوبوو (Finish Session)"}
            >
              <span>{isBadini ? "خلاس بی" : "تەواوبوو"}</span>
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 fill-emerald-800 shrink-0" />
            </button>
          </div>
        </motion.div>

        {/* SIDEBAR CONTAINER FOR TODAY'S PROGRESS & SESSIONS CARDS */}
        <div dir="ltr" className="w-full sm:w-72 lg:w-80 flex flex-col gap-4 shrink-0">
          {/* TODAY'S PROGRESS SIDEBAR CARD BOX */}
          <div className="w-full rounded-[28px] bg-gradient-to-b from-[#191038]/90 via-[#130b2c]/95 to-[#0b051b]/95 backdrop-blur-2xl border border-purple-400/25 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col items-center justify-between text-white">
            {/* TITLE */}
            <div className="w-full text-left">
              <h3 className="text-white font-medium text-base sm:text-lg tracking-wide">
                {isBadini ? "پێشڤەچوونا ئەڤڕۆ" : "today's progress"}
              </h3>
            </div>

            {/* CIRCULAR PROGRESS RING DISPLAY */}
            <div className="relative my-3 flex items-center justify-center w-36 h-36 sm:w-40 sm:h-40">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                {/* TRACK CIRCLE */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  className="stroke-purple-950/60"
                  strokeWidth="10"
                  fill="transparent"
                />
                {/* PROGRESS CIRCLE GRADIENT FILL */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  className="stroke-purple-500 transition-all duration-700 ease-out"
                  strokeWidth="10"
                  strokeDasharray={314.16}
                  strokeDashoffset={314.16 - (314.16 * Math.max(progressPercent > 0 ? progressPercent : 75, 5)) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* CENTER PERCENTAGE TEXT */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none">
                  {progressPercent > 0 ? `${progressPercent}%` : "75%"}
                </span>
                <span className="text-white/60 text-xs font-medium mt-1">
                  {isBadini ? "تەمامبووی" : "completed"}
                </span>
              </div>
            </div>

            {/* MOTIVATIONAL FOOTER TEXT */}
            <div className="text-center text-purple-200/90 font-medium text-xs sm:text-sm">
              {isBadini ? "کارەکێ باشە! بەردەوام بە! 🎉" : "Great job! Keep going! 🎉"}
            </div>
          </div>

          {/* SESSIONS CARD BOX (MATCHES ATTACHED SCREENSHOT EXACTLY) */}
          <div className="w-full rounded-[28px] bg-gradient-to-b from-[#191038]/90 via-[#130b2c]/95 to-[#0b051b]/95 backdrop-blur-2xl border border-purple-400/25 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col text-white">
            {/* CARD HEADER */}
            <div className="flex items-center justify-between w-full mb-4">
              <h3 className="text-white font-medium text-base sm:text-lg tracking-wide">
                {isBadini ? "خولێن ئەڤڕۆ" : "sessions"}
              </h3>
              <span className="w-7 h-7 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-200 text-xs sm:text-sm font-bold flex items-center justify-center">
                {focusCount + shortBreakCount + longBreakCount > 0 ? focusCount + shortBreakCount + longBreakCount : 4}
              </span>
            </div>

            {/* SESSION ITEM LIST */}
            <div className="flex flex-col w-full">
              {/* FOCUS ROW */}
              <div className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                  <span className="text-white/90 font-medium text-sm sm:text-base">
                    {isBadini ? "تەرکیز" : "Focus"}
                  </span>
                </div>
                <span className="text-white/80 font-bold text-sm sm:text-base">
                  {focusCount > 0 ? focusCount : 3}
                </span>
              </div>

              <div className="w-full border-b border-purple-900/30 my-1.5" />

              {/* SHORT BREAK ROW */}
              <div className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  <span className="text-white/90 font-medium text-sm sm:text-base">
                    {isBadini ? "پشووا کورت" : "Short Break"}
                  </span>
                </div>
                <span className="text-white/80 font-bold text-sm sm:text-base">
                  {shortBreakCount > 0 ? shortBreakCount : 1}
                </span>
              </div>

              <div className="w-full border-b border-purple-900/30 my-1.5" />

              {/* LONG BREAK ROW */}
              <div className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                  <span className="text-white/90 font-medium text-sm sm:text-base">
                    {isBadini ? "پشووا درێژ" : "Long Break"}
                  </span>
                </div>
                <span className="text-white/80 font-bold text-sm sm:text-base">
                  {longBreakCount}
                </span>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS CARD BOX (MATCHES ATTACHED SCREENSHOT EXACTLY) */}
          <div className="w-full rounded-[28px] bg-gradient-to-b from-[#191038]/90 via-[#130b2c]/95 to-[#0b051b]/95 backdrop-blur-2xl border border-purple-400/25 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col text-white">
            {/* CARD HEADER */}
            <h3 className="text-white font-medium text-base sm:text-lg tracking-wide mb-3 sm:mb-4">
              {isBadini ? "کردارێن خێرا" : "quick actions"}
            </h3>

            {/* 4 ACTION BUTTONS GRID */}
            <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
              {/* TASKS */}
              <button
                type="button"
                onClick={() => {
                  setIsSettingsOpen(true);
                  setActiveModalTab("syllabus");
                }}
                className="bg-[#211442]/60 hover:bg-[#2d1b5c]/80 border border-purple-400/20 hover:border-purple-400/40 rounded-2xl py-3 px-1 flex flex-col items-center justify-center gap-2 cursor-pointer transition transform active:scale-95 group shadow-sm"
              >
                <CheckSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 group-hover:text-white transition" />
                <span className="text-[11px] sm:text-xs font-medium text-white/80 group-hover:text-white">
                  {isBadini ? "ئەرک" : "Tasks"}
                </span>
              </button>

              {/* STATS */}
              <button
                type="button"
                onClick={() => {
                  setIsSettingsOpen(true);
                  setActiveModalTab("stats");
                }}
                className="bg-[#211442]/60 hover:bg-[#2d1b5c]/80 border border-purple-400/20 hover:border-purple-400/40 rounded-2xl py-3 px-1 flex flex-col items-center justify-center gap-2 cursor-pointer transition transform active:scale-95 group shadow-sm"
              >
                <BarChart2 className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 group-hover:text-white transition" />
                <span className="text-[11px] sm:text-xs font-medium text-white/80 group-hover:text-white">
                  {isBadini ? "ئامار" : "Stats"}
                </span>
              </button>

              {/* HISTORY */}
              <button
                type="button"
                onClick={() => {
                  setIsSettingsOpen(true);
                  setActiveModalTab("logs");
                }}
                className="bg-[#211442]/60 hover:bg-[#2d1b5c]/80 border border-purple-400/20 hover:border-purple-400/40 rounded-2xl py-3 px-1 flex flex-col items-center justify-center gap-2 cursor-pointer transition transform active:scale-95 group shadow-sm"
              >
                <History className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 group-hover:text-white transition" />
                <span className="text-[11px] sm:text-xs font-medium text-white/80 group-hover:text-white">
                  {isBadini ? "مێژوو" : "History"}
                </span>
              </button>

              {/* NOTES */}
              <button
                type="button"
                onClick={() => {
                  setIsSettingsOpen(true);
                  setActiveModalTab("notes");
                }}
                className="bg-[#211442]/60 hover:bg-[#2d1b5c]/80 border border-purple-400/20 hover:border-purple-400/40 rounded-2xl py-3 px-1 flex flex-col items-center justify-center gap-2 cursor-pointer transition transform active:scale-95 group shadow-sm"
              >
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 group-hover:text-white transition" />
                <span className="text-[11px] sm:text-xs font-medium text-white/80 group-hover:text-white">
                  {isBadini ? "تێبینی" : "Notes"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HORIZONTAL WIDGETS ROW (UPCOMING SESSION, DAILY GOAL) */}
      <div dir="ltr" className="relative z-10 w-full max-w-6xl my-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. UPCOMING SESSION / ACTIVE TASK */}
        <div className="rounded-[28px] bg-gradient-to-b from-[#191038]/90 via-[#130b2c]/95 to-[#0b051b]/95 backdrop-blur-2xl border border-purple-400/25 p-5 shadow-[0_15px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between text-white group">
          <div className="flex items-center justify-between w-full mb-3">
            <div className="flex items-center gap-2">
              <h4 className="text-white font-medium text-base tracking-wide">
                {isBadini ? "خولا بهێت" : "upcoming session"}
              </h4>
              {totalUncompletedTasks > 0 && (
                <span className="text-[10px] bg-purple-500/30 text-purple-200 border border-purple-400/30 px-2 py-0.5 rounded-full font-bold">
                  {totalUncompletedTasks} {isBadini ? "ئەرک" : "tasks"}
                </span>
              )}
            </div>
            <span className="text-white/50 font-medium text-xs">
              {upcomingTask?.durationMinutes ? `${upcomingTask.durationMinutes} ${isBadini ? "دەقە" : "min"}` : "10:00 AM"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div
              className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
              onClick={() => {
                setIsSettingsOpen(true);
                setActiveModalTab("syllabus");
              }}
              title={isBadini ? "ڤەکرنا لیستا ئەرکان" : "Open tasks list"}
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white shrink-0 shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-bold text-sm sm:text-base truncate">
                    {upcomingTask ? upcomingTask.title : (isBadini ? "راهێنانا بیرکاریێ" : "Math Practice")}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                </div>
                <span className="text-white/60 text-xs font-medium block truncate">
                  {upcomingTask
                    ? `${upcomingTask.subject || ""} ${upcomingTask.chapterTitle ? "• " + upcomingTask.chapterTitle : ""}`
                    : (isBadini ? "الجبرا و هاوکێشە" : "Algebra & Equations")}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (upcomingTask) {
                  const matchedSubject = subjectsList.find(
                    (s) =>
                      s.nameEn.toLowerCase() === (upcomingTask.subjectEn || upcomingTask.subject || "").toLowerCase() ||
                      s.nameKu.toLowerCase() === (upcomingTask.subject || "").toLowerCase() ||
                      s.nameBadini.toLowerCase() === (upcomingTask.subject || "").toLowerCase()
                  );
                  if (matchedSubject) {
                    setSelectedSubject(matchedSubject.id);
                  }
                  if (upcomingTask.durationMinutes) {
                    const secs = upcomingTask.durationMinutes * 60;
                    setInitialSeconds(secs);
                    setTimerSeconds(secs);
                  }
                  setTimerMode("pomodoro");
                  setIsTimerRunning(true);
                  setIsPomodoroFullscreen(true);
                  showToast(
                    isBadini
                      ? `دەستپێکرنا جێبەجێکرنا ئەرکێ: ${upcomingTask.title} 🎯`
                      : `Starting task: ${upcomingTask.title} 🎯`
                  );
                } else {
                  setIsSettingsOpen(true);
                  setActiveModalTab("syllabus");
                }
              }}
              className="px-3.5 py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition shadow-md cursor-pointer active:scale-95 shrink-0"
            >
              {isBadini ? "تەرکیز" : "focus"}
            </button>
          </div>
        </div>

        {/* 3. DAILY GOAL */}
        <div className="rounded-[28px] bg-gradient-to-b from-[#191038]/90 via-[#130b2c]/95 to-[#0b051b]/95 backdrop-blur-2xl border border-purple-400/25 p-5 shadow-[0_15px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between text-white">
          <h4 className="text-white font-medium text-base tracking-wide mb-2">
            {isBadini ? "ئارمانجا ڕۆژانە" : "daily goal"}
          </h4>
          <div className="flex items-center gap-3 my-auto">
            <div className="w-11 h-11 rounded-2xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] shrink-0">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="text-white font-bold text-base sm:text-lg">
                6 / 8 <span className="text-white/50 text-xs font-medium">{isBadini ? "خول" : "sessions"}</span>
              </div>
              <div className="w-full h-2 bg-purple-950/80 rounded-full overflow-hidden border border-purple-800/30 mt-1.5">
                <div
                  className="h-full bg-purple-500 rounded-full transition-all duration-500"
                  style={{ width: "75%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR ROW */}
      <footer className="relative z-20 w-full max-w-6xl flex items-center justify-between gap-2 sm:gap-4 mt-auto pt-2">
        {/* BOTTOM LEFT: TODAY'S STUDY BADGE */}
        <button
          type="button"
          onClick={() => {
            setIsSettingsOpen(true);
            setActiveModalTab("logs");
          }}
          className="bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-white flex items-center gap-1 sm:gap-1.5 shadow-xl transition cursor-pointer active:scale-95 shrink-0"
          title={isBadini ? "بینینا مێژووا خوێندنێ" : "دیداری مێژووی خوێندن"}
        >
          <span className="text-amber-400 text-xs">🔥</span>
          <span>{totalFocusMinsToday}m {isBadini ? "خوێندنا ئەڤڕۆ" : "خوێندنی ئەمڕۆ"}</span>
        </button>

        {/* BOTTOM RIGHT: AMBIENT SOUNDS & LOFI PLAYER */}
        <div className="bg-slate-950/85 backdrop-blur-xl border border-purple-500/30 p-1 px-2 sm:px-2.5 rounded-xl flex items-center gap-1.5 sm:gap-2 shadow-2xl hover:border-purple-400/50 transition-colors shrink-0 max-w-[200px] sm:max-w-[260px]">
          {/* TRACK SELECTOR BUTTON */}
          <button
            type="button"
            onClick={() => setIsAmbientModalOpen(true)}
            className="flex items-center gap-1.5 text-right hover:opacity-90 transition cursor-pointer group min-w-0"
            title={isBadini ? "دەستکاری دەنگێن ئارامکەر" : "گۆڕینی دەنگەکانی ئارامکردنەوە"}
          >
            <div className={`w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg overflow-hidden relative border border-white/20 shrink-0 group-hover:scale-105 transition-transform ${activeAmbientTrack.coverImage ? 'bg-slate-950' : `bg-gradient-to-br ${activeAmbientTrack.bgGradient}`}`}>
              {activeAmbientTrack.coverImage ? (
                <img src={activeAmbientTrack.coverImage} alt={activeAmbientTrack.nameEn} className="w-full h-full object-cover" />
              ) : (
                renderTrackIcon(activeAmbientTrack.iconType, "w-3 h-3 text-white")
              )}
            </div>
            <div className="flex flex-col text-right min-w-0 max-w-[75px] sm:max-w-[115px]">
              <div className="text-[9px] font-extrabold text-purple-200 flex items-center gap-0.5 justify-end leading-none">
                {isAmbientPlaying && (
                  <span className="flex items-center gap-0.5 shrink-0">
                    <span className="w-0.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-pulse delay-75" />
                  </span>
                )}
                <span className="truncate">{activeAmbientTrack.badge}</span>
              </div>
              <span className="text-[10px] font-bold text-white truncate group-hover:text-purple-200 transition-colors leading-tight mt-0.5" dir="auto">
                {isBadini ? activeAmbientTrack.nameBadini : activeAmbientTrack.nameEn}
              </span>
            </div>
          </button>

          {/* QUICK PLAY / PAUSE BUTTON */}
          <button
            type="button"
            onClick={toggleAmbientSound}
            className={`w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-white transition cursor-pointer shadow-md active:scale-95 shrink-0 ${
              isAmbientPlaying
                ? "bg-rose-600 hover:bg-rose-500 shadow-rose-900/40"
                : "bg-purple-600 hover:bg-purple-500 shadow-purple-900/40"
            }`}
            title={isAmbientPlaying ? (isBadini ? "وەستاندن" : "Pause") : (isBadini ? "لێدان" : "Play")}
          >
            {isAmbientPlaying ? (
              <Pause className="w-3 h-3 fill-current text-white" />
            ) : (
              <Play className="w-3 h-3 fill-current text-white ml-0.5" />
            )}
          </button>

          {/* OPEN MODAL MENU BUTTON */}
          <button
            type="button"
            onClick={() => setIsAmbientModalOpen(true)}
            className="w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white flex items-center justify-center transition active:scale-95 cursor-pointer shrink-0"
            title={isBadini ? "لیستا دەنگان" : "Sound List"}
          >
            <SlidersHorizontal className="w-3 h-3" />
          </button>
        </div>
      </footer>

      {/* AMBIENT SOUNDS & LOFI TRACKS MODAL */}
      {isAmbientModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl bg-[#0f0923] border border-purple-500/30 text-white shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
            {/* MODAL HEADER */}
            <div className="p-4 sm:p-5 border-b border-purple-500/20 bg-gradient-to-r from-purple-950/60 via-indigo-950/60 to-slate-950/60 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-900/40 border border-purple-400/30">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>{isBadini ? "دەنگێن ئارامکەر و مۆسیقایا لۆفای" : "دەنگەکانی ئارامکردنەوە و لۆفای"}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {allAmbientTracks.length} {isBadini ? "دەنگ" : "دەنگ"}
                    </span>
                  </h3>
                  <p className="text-xs text-purple-200/70">
                    {isBadini
                      ? "دەنگەکێ هێمن هەڵبژێرە یان یێ تایبەت ب خۆ زێدە بکە"
                      : "دەنگێکی هێمن هەڵبژێرە یان هی خۆت زێدە بکە"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAmbientModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-rose-500/30 hover:text-rose-200 flex items-center justify-center transition cursor-pointer text-white/70"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* MASTER VOLUME SLIDER & UPLOAD CUSTOM AUDIO */}
            <div className="px-5 py-3.5 bg-purple-950/30 border-b border-purple-500/15 flex flex-col gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleVolumeChange(ambientVolume === 0 ? 0.5 : 0)}
                  className="text-purple-300 hover:text-white transition cursor-pointer"
                  title={ambientVolume === 0 ? "Unmute" : "Mute"}
                >
                  {ambientVolume === 0 ? (
                    <VolumeX className="w-5 h-5 text-rose-400" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-purple-300" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={ambientVolume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer h-1.5 bg-purple-950 rounded-lg"
                />
                <span className="text-xs font-mono font-bold text-purple-200 w-10 text-left">
                  {Math.round(ambientVolume * 100)}%
                </span>
              </div>

              {/* YOUTUBE AUDIO LINK INPUT FORM */}
              <form
                onSubmit={handleAddYouTubeTrack}
                className="p-2.5 sm:p-3 bg-red-950/20 rounded-2xl border border-red-500/30 flex flex-col sm:flex-row items-center gap-2"
              >
                <div className="relative flex-1 w-full">
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-red-400">
                    <LinkIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="url"
                    value={youtubeInputUrl}
                    onChange={(e) => setYoutubeInputUrl(e.target.value)}
                    placeholder={
                      isBadini
                        ? "لینکێ یوتوبی (YouTube) ل ڤێرە دابنێ بۆ دەنگ..."
                        : "لینکێکی یوتیوب (YouTube) دابنێ بۆ دەنگ..."
                    }
                    className="w-full pr-9 pl-3 py-2 bg-slate-900/90 border border-purple-500/30 rounded-xl text-xs sm:text-sm text-white placeholder-purple-300/50 focus:outline-none focus:border-red-400 transition"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoadingYoutube}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shrink-0 shadow-md shadow-red-950/50 disabled:opacity-50"
                >
                  {isLoadingYoutube ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{isBadini ? "زێدەکرنا لینکێ یوتوبی" : "زێدەکردنی لینکی یوتیوب"}</span>
                      <Plus className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* TRACKS GRID LIST */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-3 custom-scrollbar flex-1">
              {allAmbientTracks.map((track) => {
                const isSelected = selectedTrackId === track.id;
                const isThisPlaying = isSelected && isAmbientPlaying;

                return (
                  <div
                    key={track.id}
                    onClick={() => {
                      if (isThisPlaying) {
                        stopAllAmbient();
                      } else {
                        playTrack(track.id);
                      }
                    }}
                    className={`group relative p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-gradient-to-r from-purple-900/70 via-indigo-900/50 to-slate-900/90 border-purple-400/90 shadow-[0_4px_20px_rgba(168,85,247,0.3)]"
                        : "bg-slate-900/60 hover:bg-slate-800/80 border-purple-500/20 hover:border-purple-400/50"
                    }`}
                  >
                    {/* RIGHT SIDE (in RTL): THUMBNAIL + TITLE + DETAILS */}
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      {/* TRACK COVER ARTWORK / THUMBNAIL */}
                      <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shrink-0 shadow-lg border border-white/20 group-hover:scale-105 transition-transform ${track.coverImage ? 'bg-slate-950' : `bg-gradient-to-br ${track.bgGradient}`}`}>
                        {track.coverImage ? (
                          <img src={track.coverImage} alt={track.nameEn} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white">
                            {renderTrackIcon(track.iconType, "w-7 h-7")}
                          </div>
                        )}

                        {/* OVERLAY ICON BADGE ON CORNER */}
                        {track.coverImage && (
                          <div className="absolute bottom-1 right-1 w-6 h-6 rounded-lg bg-black/65 backdrop-blur-md border border-white/20 flex items-center justify-center text-purple-200">
                            {renderTrackIcon(track.iconType, "w-3.5 h-3.5")}
                          </div>
                        )}

                        {/* PLAYING STATUS PULSE */}
                        {isThisPlaying && (
                          <span className="absolute top-1.5 left-1.5 flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-slate-900"></span>
                          </span>
                        )}
                      </div>

                      {/* TRACK TITLE & DETAILS */}
                      <div className="flex flex-col min-w-0 text-right flex-1">
                        {/* LINE 1: TRACK TITLE */}
                        <h4 className="text-sm sm:text-base font-extrabold text-white truncate leading-snug group-hover:text-purple-200 transition-colors">
                          {isBadini ? track.nameBadini : track.nameEn}
                        </h4>

                        {/* LINE 2: BADGE + SHORT DESC */}
                        <div className="flex items-center gap-2 mt-1 min-w-0">
                          <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/25 text-purple-200 border border-purple-400/30">
                            {track.badge}
                          </span>
                          <p className="text-xs text-purple-200/70 truncate min-w-0">
                            {isBadini ? track.descBadini : track.descEn}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* LEFT SIDE (in RTL): CONTROLS */}
                    <div className="flex items-center gap-2 shrink-0">
                      {track.isCustom && (
                        <button
                          type="button"
                          onClick={(e) => handleDeleteCustomTrack(track.id, e)}
                          className="w-9 h-9 rounded-xl bg-rose-500/10 hover:bg-rose-500/30 text-rose-400 hover:text-rose-200 flex items-center justify-center transition cursor-pointer"
                          title={isBadini ? "ژێبرن" : "Delete"}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isThisPlaying) {
                            stopAllAmbient();
                          } else {
                            playTrack(track.id);
                          }
                        }}
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white transition cursor-pointer shrink-0 shadow-lg active:scale-95 ${
                          isThisPlaying
                            ? "bg-rose-600 hover:bg-rose-500 shadow-rose-900/50"
                            : isSelected
                            ? "bg-purple-600 hover:bg-purple-500 shadow-purple-900/50"
                            : "bg-white/10 hover:bg-purple-600 text-purple-200 hover:text-white"
                        }`}
                      >
                        {isThisPlaying ? (
                          <Pause className="w-5 h-5 fill-current text-white" />
                        ) : (
                          <Play className="w-5 h-5 fill-current text-white ml-0.5" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* FOOTER */}
            <div className="p-3.5 bg-slate-950/80 border-t border-purple-500/20 text-center shrink-0">
              <button
                type="button"
                onClick={() => setIsAmbientModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs transition shadow-lg cursor-pointer"
              >
                {isBadini ? "باشە" : "Done"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DAILY PLANNER MODAL */}
      {showDailyPlanner && (
        <StudyPlannerModal
          language={language}
          onClose={() => setShowDailyPlanner(false)}
        />
      )}

      {/* QUICK TIMER DURATION MODAL */}
      {isQuickTimeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="relative w-full max-w-md rounded-3xl bg-[#140b2e] border border-purple-500/30 text-white shadow-2xl overflow-hidden p-5 sm:p-6 flex flex-col gap-5">
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300">
                  <Timer className="w-5 h-5 text-purple-200" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-white">
                    {isBadini ? "گوهۆڕینا ده‌مێ تایمەری" : "Set Timer Duration"}
                  </h3>
                  <p className="text-xs text-purple-200/70 font-medium">
                    {isBadini ? "دەقیقتێن تایمەری بۆ خۆ دیار بکە" : "Select or enter your desired focus minutes"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsQuickTimeModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-purple-200 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* QUICK PRESETS GRID */}
            <div>
              <label className="block text-xs font-bold text-purple-300 mb-2.5">
                {isBadini ? "هەڵبژارتنا دەستبەجێ (خولەک):" : "Quick Presets (Minutes):"}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 20, 25, 30, 45, 60].map((mins) => {
                  const isCurrent = Math.floor(timerSeconds / 60) === mins;
                  return (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => applyNewDuration(mins)}
                      className={`py-2.5 px-2 rounded-2xl font-black text-sm sm:text-base border transition cursor-pointer flex flex-col items-center justify-center ${
                        isCurrent
                          ? "bg-gradient-to-br from-purple-600 to-indigo-600 border-purple-300 text-white shadow-lg shadow-purple-900/50 scale-105"
                          : "bg-white/5 hover:bg-white/15 border-white/10 text-purple-100 hover:border-purple-400/50"
                      }`}
                    >
                      <span>{mins}</span>
                      <span className="text-[10px] opacity-75 font-normal">
                        {isBadini ? "خولەک" : "min"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CUSTOM MINUTES INPUT */}
            <div className="border-t border-purple-500/20 pt-4 flex flex-col gap-3">
              <label className="block text-xs font-bold text-purple-300">
                {isBadini ? "خولەکان ب دیاریکری بنڤێسە (۱ بۆ ۱۸۰):" : "Custom Minutes (1 - 180):"}
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const val = Math.max(1, (parseInt(customMinutesInput) || 25) - 5);
                    setCustomMinutesInput(val.toString());
                  }}
                  className="px-3.5 h-12 rounded-2xl bg-white/10 hover:bg-purple-600/40 text-purple-200 hover:text-white font-bold text-sm flex items-center justify-center transition border border-white/10 hover:border-purple-400/50 cursor-pointer active:scale-95 shadow-md"
                  title="-5 min"
                >
                  -5
                </button>

                <input
                  type="number"
                  min="1"
                  max="180"
                  value={customMinutesInput}
                  onChange={(e) => setCustomMinutesInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const mins = parseInt(customMinutesInput);
                      if (mins > 0 && mins <= 300) {
                        applyNewDuration(mins);
                      }
                    }
                  }}
                  className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-950/80 border border-purple-400/40 text-white font-black text-2xl text-center focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none shadow-inner"
                  placeholder="25"
                />

                <button
                  type="button"
                  onClick={() => {
                    const val = Math.min(180, (parseInt(customMinutesInput) || 25) + 5);
                    setCustomMinutesInput(val.toString());
                  }}
                  className="px-3.5 h-12 rounded-2xl bg-white/10 hover:bg-purple-600/40 text-purple-200 hover:text-white font-bold text-sm flex items-center justify-center transition border border-white/10 hover:border-purple-400/50 cursor-pointer active:scale-95 shadow-md"
                  title="+5 min"
                >
                  +5
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  const mins = parseInt(customMinutesInput);
                  if (!mins || mins < 1 || mins > 300) {
                    showToast(isBadini ? "تکایە ژمارەکا دروست بنڤێسە (۱-۳۰۰)" : "Please enter valid minutes (1-300)");
                    return;
                  }
                  applyNewDuration(mins);
                }}
                className="w-full mt-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-base shadow-xl shadow-purple-950/80 border border-purple-400/40 flex items-center justify-center gap-2 transition transform active:scale-98 cursor-pointer"
              >
                <Check className="w-5 h-5 text-purple-200" />
                <span>{isBadini ? "جێبەجێکرنا دەمی" : "Apply Duration"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS & TOOLS MODAL DIALOG */}
      {isSettingsOpen && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto animate-fadeIn ${
          activeModalTab === "notes" || activeModalTab === "syllabus" || activeModalTab === "stats" || activeModalTab === "logs" ? "bg-[#0c0521] p-0" : "bg-slate-950/85 backdrop-blur-md p-2 sm:p-4"
        }`}>
          <div className={`w-full overflow-hidden flex flex-col border transition-colors shrink-0 ${
            activeModalTab === "notes" || activeModalTab === "syllabus" || activeModalTab === "stats" || activeModalTab === "logs"
              ? "w-full h-full min-h-screen max-w-none max-h-none rounded-none border-none bg-[#0c0521] text-white my-0"
              : "max-w-4xl rounded-3xl shadow-2xl max-h-[92vh] my-auto bg-white border-purple-200/80 text-slate-900"
          }`}>
            
            {/* HERO BANNER */}
            <div className={`p-3.5 sm:p-5 border-b text-white relative overflow-hidden transition-colors shrink-0 ${
              activeModalTab === "notes" || activeModalTab === "syllabus" || activeModalTab === "stats" || activeModalTab === "logs"
                ? "bg-[#130933]/95 border-purple-500/30 sticky top-0 z-30 backdrop-blur-xl shadow-xl"
                : "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 border-purple-200"
            }`}>
              {activeModalTab === "notes" ? (
                <div className="relative z-10 flex items-center justify-between gap-3 w-full">
                  {/* BACK BUTTON */}
                  <button
                    type="button"
                    onClick={() => setIsSettingsOpen(false)}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-purple-900/80 hover:bg-purple-800 text-white font-black text-xs sm:text-sm flex items-center gap-2 border border-purple-500/40 transition cursor-pointer active:scale-95 shadow-lg shadow-purple-950/60"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-purple-200" />
                    <span>{isBadini ? "زڤڕین" : "گەڕانەوە"}</span>
                  </button>

                  {/* TITLE AND MASCOT */}
                  <div className="flex items-center gap-3">
                    <img
                      src={noteImg}
                      alt="Notes Mascot"
                      draggable={false}
                      onDragStart={(e) => e.preventDefault()}
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain filter drop-shadow-[0_4px_16px_rgba(168,85,247,0.6)] hover:scale-110 transition-transform duration-300 select-none pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-right">
                      <h2 className="text-base sm:text-xl font-black text-white tracking-wide">
                        {isBadini ? "تێبینی و پلانێن خوێندنێ (Notes)" : "تێبینی و پلانەکانی خوێندن (Notes)"}
                      </h2>
                      <p className="text-[11px] text-purple-300/80 font-medium hidden sm:block">
                        {isBadini ? "تێبینیێن خۆ ب ئاسانی بنڤێسە، دەستکاری بکە و وێنەیان دگەل تێبینیان بدانی" : "تێبینییەکانت بە ئاسانی بنووسە، ڕێکبخە و وێنەیان لەگەڵ تێبینییەکان دابنێ"}
                      </p>
                    </div>
                  </div>

                  {/* NEW NOTE ACTION */}
                  <button
                    type="button"
                    onClick={handleAddNewNote}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-xl border border-purple-400/40 cursor-pointer active:scale-95 transition"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">{isBadini ? "تێبینیا نوی +" : "تێبینی نوێ +"}</span>
                    <span className="sm:hidden">+</span>
                  </button>
                </div>
              ) : activeModalTab === "syllabus" ? (
                <div className="relative z-10 flex items-center justify-between gap-3 w-full">
                  <button
                    type="button"
                    onClick={() => setIsSettingsOpen(false)}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-purple-900/80 hover:bg-purple-800 text-white font-black text-xs sm:text-sm flex items-center gap-2 border border-purple-500/40 transition cursor-pointer active:scale-95 shadow-lg shadow-purple-950/60"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-purple-200" />
                    <span>{isBadini ? "زڤڕین" : "گەڕانەوە"}</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-600/80 border border-purple-400/40 flex items-center justify-center text-white shrink-0 shadow-lg">
                      <CheckSquare className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                      <h2 className="text-base sm:text-xl font-black text-white tracking-wide">
                        {isBadini ? "ڕێکخستنا ئەرکان (Tasks)" : "ڕێکخستنی ئەرکەکان (Tasks)"}
                      </h2>
                      <p className="text-[11px] text-purple-300/80 font-medium hidden sm:block">
                        {isBadini ? "ئەرکێن خۆ ل دووڤ بابەتان ڕێکخبە و خولەکێن تەرکیزێ دیار بکە" : "ئەرکەکانت بەپێی بابەتەکان ڕێکبخە و خولەکەکانی تەرکیز دیاری بکە"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : activeModalTab === "stats" || activeModalTab === "logs" ? (
                <div className="relative z-10 flex items-center justify-between gap-3 w-full">
                  {/* PROMINENT BACK BUTTON */}
                  <button
                    type="button"
                    onClick={() => setIsSettingsOpen(false)}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-purple-900/80 hover:bg-purple-800 text-white font-black text-xs sm:text-sm flex items-center gap-2 border border-purple-500/40 transition cursor-pointer active:scale-95 shadow-lg shadow-purple-950/60"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-purple-200" />
                    <span>{isBadini ? "زڤڕین" : "گەڕانەوە"}</span>
                  </button>

                  {/* TITLE AND ICON */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-purple-600/80 border border-purple-400/40 flex items-center justify-center text-white shrink-0 shadow-lg">
                      {activeModalTab === "stats" ? <BarChart2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-200" /> : <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />}
                    </div>
                    <div className="text-right">
                      <h2 className="text-base sm:text-xl font-black text-white tracking-wide">
                        {activeModalTab === "stats"
                          ? (isBadini ? "ئامارێن تەرکیز و خوێندنێ" : "ئامارەکانی تەرکیز و خوێندن")
                          : (isBadini ? "تۆمارێن خوێندنا ئەڤرۆ" : "تۆمارەکانی خوێندنی ئەمڕۆ")}
                      </h2>
                      <p className="text-[11px] text-purple-300/80 font-medium hidden sm:block">
                        {activeModalTab === "stats"
                          ? (isBadini ? "زانیاری و شیاریێن گشتی یێن کاتژمێرێن تەرکیزێ" : "شیارییەکان و زانیارییە گشتییەکانی کاتژمێرەکانی تەرکیز")
                          : (isBadini ? "خولەک و کاتژمێرێن تەرکیزێ یێن ئیننای دەست" : "خولەک و کاتژمێرەکانی تەرکیز کە ئەنجامت داون")}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white shrink-0 shadow-md backdrop-blur-sm">
                      <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-base sm:text-lg md:text-xl font-black text-white drop-shadow leading-snug truncate">
                        {isBadini ? "گوهۆڕینا بەگراوندی" : "گۆڕینی پاشبنەما"}
                      </h2>
                      <p className="text-xs text-purple-100/90 font-medium mt-0.5 leading-normal truncate">
                        {isBadini ? "وێنەیەکێ ڕازاوە هەڵبژێرە یان وێنەیێ خۆ دابنێ بۆ بەگراوندی" : "وێنەیەک هەڵبژێرە یان وێنەی خۆت وەکو پاشبنەما دابنێ"}
                      </p>
                    </div>
                  </div>

                  {/* MODAL HEADER CONTROLS FOR SETTINGS TAB */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto justify-end">
                    <button
                      type="button"
                      onClick={() => setIsSettingsOpen(false)}
                      className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0 border border-white/30 shadow-sm"
                      title={isBadini ? "زڤڕین" : "گەڕانەوە"}
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span>{isBadini ? "زڤڕین" : "گەڕانەوە"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* MODAL BODY */}
            <div className={`p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 ${
              activeModalTab === "stats" || activeModalTab === "logs" || activeModalTab === "notes" || activeModalTab === "syllabus"
                ? "bg-[#0c0521] text-white"
                : "bg-white text-right"
            }`}>
              {/* TAB 1: SYLLABUS & TASKS DASHBOARD */}
              {activeModalTab === "syllabus" && (
                <TasksDashboardView
                  language={language}
                  onClose={() => setIsSettingsOpen(false)}
                  onStartTimerWithTask={(taskTitle, subjectName) => {
                    const matchedSubject = subjectsList.find(
                      (s) =>
                        s.nameEn.toLowerCase() === subjectName.toLowerCase() ||
                        s.nameKu.toLowerCase() === subjectName.toLowerCase() ||
                        s.nameBadini.toLowerCase() === subjectName.toLowerCase()
                    );
                    if (matchedSubject) {
                      setSelectedSubject(matchedSubject.id);
                    }
                    setIsTimerRunning(true);
                    setIsSettingsOpen(false);
                    setIsPomodoroFullscreen(true);
                    showToast(isBadini ? "دەستپێکرنا پۆمۆدۆرۆ ب شێوەیێ مەزن 🌟" : "دەستپێکردنی پۆمۆدۆرۆ بە شێوەی گەورە 🌟");
                  }}
                />
              )}

              {/* TAB 2: WALLPAPERS & DURATION SETTINGS */}
              {activeModalTab === "settings" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-purple-600" />
                        <span>{isBadini ? "١. گوهۆڕینا پاشبنەمایێ (Background Wallpaper):" : "١. گۆڕینی پاشبنەما (Wallpaper):"}</span>
                      </label>
                    </div>

                    <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-3">
                      <span className="text-xs font-bold text-purple-950 block">
                        {isBadini ? "وێنەیێ خۆ دگەل بەگراوندی دابنێ (Upload or Link Image):" : "وێنەی خۆت وەکو پاشبنەما دابنێ:"}
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-extrabold px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-md active:scale-95 text-xs">
                          <Upload className="w-4 h-4" />
                          <span>{isBadini ? "وێنەکێ هەڵبژێرە ژ مۆبایل/کۆمپیوتەرێ" : "وێنەیەک هەڵبژێرە لە ئامێرەکەت"}</span>
                          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                        </label>

                        <div className="flex gap-1.5">
                          <div className="relative flex-1">
                            <input
                              type="text"
                              value={customUrlInput}
                              onChange={(e) => setCustomUrlInput(e.target.value)}
                              placeholder={isBadini ? "لینکێ وێنەیی دابنێ (URL)..." : "لینکی وێنەکە بنووسە..."}
                              className="w-full pl-8 pr-3 py-2.5 rounded-xl text-xs bg-white border border-purple-200 text-purple-950 placeholder-purple-400 focus:outline-none focus:border-purple-600"
                            />
                            <LinkIcon className="w-3.5 h-3.5 text-purple-400 absolute left-2.5 top-3" />
                          </div>
                          <button
                            type="button"
                            onClick={handleApplyCustomUrl}
                            className="px-3 py-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs transition cursor-pointer shrink-0 border border-purple-200"
                          >
                            {isBadini ? "تۆمارکرن" : "داگرتن"}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {customWallpaper && (
                        <button
                          type="button"
                          onClick={() => setWallpaper("custom")}
                          className={`relative rounded-2xl overflow-hidden border-2 h-24 transition transform cursor-pointer group ${
                            wallpaper === "custom" ? "border-purple-600 ring-2 ring-purple-400/50 scale-105" : "border-purple-200 opacity-80 hover:opacity-100 hover:scale-[1.02]"
                          }`}
                        >
                          <img src={customWallpaper} alt="Custom Wallpaper" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                          <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                            {isBadini ? "تایبەت" : "تایبەت"}
                          </span>
                          {wallpaper === "custom" && (
                            <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold shadow-lg ring-2 ring-purple-300 z-20">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      )}
                      {Object.entries(wallpapersMap).map(([key, item]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setWallpaper(key)}
                          className={`relative rounded-2xl overflow-hidden border-2 h-24 transition transform cursor-pointer group ${
                            wallpaper === key ? "border-purple-600 ring-2 ring-purple-400/50 scale-105" : "border-purple-200 opacity-80 hover:opacity-100 hover:scale-[1.02]"
                          }`}
                        >
                          <img src={item.url} alt={item.nameEn} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                          {wallpaper === key && (
                            <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold shadow-lg ring-2 ring-purple-300 z-20">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-purple-100">
                    <label className="text-xs font-bold text-purple-900 block mb-2">
                      {isBadini ? "٢. خولەکێن تایبەت (Custom Minutes):" : "٢. خولەکی تایبەت:"}
                    </label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {[10, 15, 20, 25, 30, 45, 50, 60, 90, 120].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => handleCustomDuration(m)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                            Math.round(initialSeconds / 60) === m
                              ? "bg-purple-600 text-white font-extrabold shadow"
                              : "bg-purple-50 border border-purple-200 text-purple-950 hover:bg-purple-100"
                          }`}
                        >
                          {m}m
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: HISTORY & CALENDAR VIEW (EXACT MATCH FOR USER ATTACHED SCREENSHOT) */}
              {activeModalTab === "logs" && (
                <div dir="ltr" className="space-y-5 bg-[#0c0521] text-white p-3 sm:p-5 rounded-3xl border border-purple-500/25 shadow-2xl animate-fadeIn">
                  
                  {/* IF CALENDAR VIEW IS OPEN */}
                  {showCalendarView ? (
                    <div className="space-y-5 animate-fadeIn">
                      {/* CALENDAR HEADER */}
                      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-3 border-b border-purple-500/20">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-purple-900/60 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                            <Calendar className="w-5 h-5 text-purple-300" />
                          </div>
                          <div>
                            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
                              Calendar
                            </h3>
                            <p className="text-xs text-white/60 font-medium">
                              Plan your sessions and track your progress.
                            </p>
                          </div>
                        </div>

                        {/* CONTROLS */}
                        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-between lg:justify-end">
                          <button
                            type="button"
                            onClick={() => setSelectedCalendarDay(18)}
                            className="px-3 py-1.5 rounded-xl bg-[#180f33] border border-purple-500/20 hover:border-purple-500/40 text-white/90 text-xs font-semibold transition cursor-pointer"
                          >
                            Today
                          </button>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              className="w-8 h-8 rounded-xl bg-[#180f33] border border-purple-500/20 hover:border-purple-500/40 text-white/80 hover:text-white flex items-center justify-center transition cursor-pointer"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              className="w-8 h-8 rounded-xl bg-[#180f33] border border-purple-500/20 hover:border-purple-500/40 text-white/80 hover:text-white flex items-center justify-center transition cursor-pointer"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="bg-[#180f33] border border-purple-500/20 rounded-xl px-3 py-1.5 text-xs text-white/90 font-semibold flex items-center gap-1.5 cursor-pointer hover:border-purple-500/40 transition">
                            <span>May 2024</span>
                            <ChevronDown className="w-3.5 h-3.5 text-white/50" />
                          </div>

                          <div className="bg-[#180f33] border border-purple-500/20 p-1 rounded-xl flex items-center gap-1">
                            {(["week", "month", "year"] as const).map((mode) => (
                              <button
                                key={mode}
                                type="button"
                                onClick={() => setCalendarViewMode(mode)}
                                className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition cursor-pointer ${
                                  calendarViewMode === mode
                                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/40"
                                    : "text-white/60 hover:text-white"
                                }`}
                              >
                                {mode}
                              </button>
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={() => setShowCalendarView(false)}
                            className="px-3 py-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 border border-purple-500/40 text-xs font-bold text-purple-200 flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                          >
                            <History className="w-3.5 h-3.5" />
                            <span>Timeline View</span>
                          </button>
                        </div>
                      </div>

                      {/* CALENDAR MAIN GRID CARD */}
                      <div className="bg-[#0b051e] border border-purple-500/20 rounded-3xl p-3 sm:p-5 shadow-2xl space-y-4">
                        {/* DAYS OF WEEK HEADER */}
                        <div className="grid grid-cols-7 text-center text-xs font-medium text-white/50 pb-2 border-b border-purple-500/15">
                          <div>Sun</div>
                          <div>Mon</div>
                          <div>Tue</div>
                          <div>Wed</div>
                          <div>Thu</div>
                          <div>Fri</div>
                          <div>Sat</div>
                        </div>

                        {/* MONTH GRID (35 CELLS) */}
                        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                          {/* Previous Month Days: April 28, 29, 30 */}
                          <div className="p-2 min-h-[68px] sm:min-h-[85px] rounded-2xl border border-transparent opacity-25 text-white text-xs font-bold">28</div>
                          <div className="p-2 min-h-[68px] sm:min-h-[85px] rounded-2xl border border-transparent opacity-25 text-white text-xs font-bold">29</div>
                          <div className="p-2 min-h-[68px] sm:min-h-[85px] rounded-2xl border border-transparent opacity-25 text-white text-xs font-bold">30</div>

                          {/* May Days 1..31 */}
                          {[
                            { day: 1, duration: "3h 20m", type: "focus" },
                            { day: 2, duration: "2h 10m", type: "shortBreak" },
                            { day: 3, duration: "4h 30m", type: "focus" },
                            { day: 4, duration: "1h 40m", type: "shortBreak" },
                            { day: 5, duration: "1h 20m", type: "longBreak" },
                            { day: 6, duration: "3h 10m", type: "focus" },
                            { day: 7, duration: "2h 45m", type: "focus" },
                            { day: 8, duration: "4h 00m", type: "focus" },
                            { day: 9, duration: "2h 20m", type: "shortBreak" },
                            { day: 10, duration: "5h 15m", type: "focus", badge: "Best Day" },
                            { day: 11, duration: "1h 30m", type: "longBreak" },
                            { day: 12, duration: "2h 00m", type: "shortBreak" },
                            { day: 13, duration: "3h 30m", type: "focus" },
                            { day: 14, duration: "1h 10m", type: "longBreak" },
                            { day: 15, duration: "4h 25m", type: "focus" },
                            { day: 16, duration: "2h 40m", type: "shortBreak" },
                            { day: 17, duration: "3h 00m", type: "focus" },
                            { day: 18, duration: "3h 45m", type: "focus", hasBars: true },
                            { day: 19, duration: "1h 00m", type: "longBreak" },
                            { day: 20, duration: "2h 20m", type: "focus" },
                            { day: 21, duration: "3h 10m", type: "focus" },
                            { day: 22, duration: "2h 30m", type: "shortBreak" },
                            { day: 23, duration: "4h 00m", type: "focus" },
                            { day: 24, duration: "1h 15m", type: "longBreak" },
                            { day: 25, duration: "2h 00m", type: "shortBreak" },
                            { day: 26, duration: "3h 30m", type: "focus" },
                            { day: 27, duration: "2h 10m", type: "shortBreak" },
                            { day: 28, duration: "4h 20m", type: "focus" },
                            { day: 29, duration: "1h 20m", type: "longBreak" },
                            { day: 30, duration: "3h 45m", type: "focus" },
                            { day: 31, duration: "4h 10m", type: "focus" },
                          ].map((item) => {
                            const isSelected = selectedCalendarDay === item.day;
                            return (
                              <div
                                key={item.day}
                                onClick={() => setSelectedCalendarDay(item.day)}
                                className={`relative cursor-pointer transition p-2 sm:p-2.5 min-h-[68px] sm:min-h-[85px] rounded-2xl border flex flex-col justify-between ${
                                  isSelected
                                    ? "border-2 border-purple-500 bg-purple-950/60 shadow-[0_0_20px_rgba(168,85,247,0.35)]"
                                    : "border-purple-500/10 bg-[#12092c]/60 hover:border-purple-500/30 hover:bg-[#160b36]"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span
                                    className={
                                      isSelected
                                        ? "w-6 h-6 rounded-full bg-purple-600 text-white font-black text-xs flex items-center justify-center shadow-md"
                                        : "text-white/90 font-bold text-xs sm:text-sm pl-0.5"
                                    }
                                  >
                                    {item.day}
                                  </span>

                                  {item.badge && (
                                    <span className="hidden sm:inline-block bg-purple-600/90 text-white text-[9px] px-1.5 py-0.5 rounded-md font-extrabold shadow-sm">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-1 text-[10px] sm:text-xs font-mono font-medium text-white/80 my-0.5 truncate">
                                  <span
                                    className={`w-2 h-2 rounded-full shrink-0 ${
                                      item.type === "focus"
                                        ? "bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.8)]"
                                        : item.type === "shortBreak"
                                        ? "bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.8)]"
                                        : "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]"
                                    }`}
                                  />
                                  <span className="truncate">{item.duration}</span>
                                </div>

                                {item.hasBars && (
                                  <div className="flex items-end gap-0.5 self-end mt-auto opacity-90 pr-0.5">
                                    <div className="w-1 bg-purple-400 h-2 rounded-t-sm" />
                                    <div className="w-1 bg-purple-400 h-4 rounded-t-sm" />
                                    <div className="w-1 bg-purple-400 h-3 rounded-t-sm" />
                                    <div className="w-1 bg-purple-400 h-5 rounded-t-sm" />
                                    <div className="w-1 bg-purple-400 h-2.5 rounded-t-sm" />
                                  </div>
                                )}
                              </div>
                            );
                          })}

                          {/* Next Month Day: June 1 */}
                          <div className="p-2 min-h-[68px] sm:min-h-[85px] rounded-2xl border border-transparent opacity-25 text-white text-xs font-bold">1</div>
                        </div>

                        {/* FOOTER LEGEND & TOTAL FOCUS */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-purple-500/15 text-xs text-white/70">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.8)]" />
                              <span className="font-semibold text-white/80">Focus Time</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                              <span className="font-semibold text-white/80">Short Break</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                              <span className="font-semibold text-white/80">Long Break</span>
                            </div>
                          </div>

                          <div className="font-semibold">
                            Total Focus: <span className="text-purple-300 font-black text-sm sm:text-base ml-1">52h 30m</span>
                          </div>
                        </div>
                      </div>

                      {/* BOTTOM OVERVIEW CARDS GRID (Day Details & Monthly Overview) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* CARD 1: DAY DETAILS */}
                        <div className="bg-[#0b051e] border border-purple-500/20 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col justify-between space-y-4">
                          <div>
                            <div className="flex items-center justify-between pb-3 border-b border-purple-500/15">
                              <h4 className="font-extrabold text-white text-base flex items-center gap-2">
                                <span>Day Details</span>
                              </h4>
                              <span className="text-xs text-white/60 font-mono font-medium">May {selectedCalendarDay}, 2024</span>
                            </div>

                            <div className="space-y-2.5 pt-3">
                              <div className="bg-[#140b30] border border-purple-500/20 p-3 rounded-2xl flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                                    <Timer className="w-3 h-3" />
                                  </div>
                                  <span className="font-bold text-white">Focus Time</span>
                                </div>
                                <span className="text-white/50 font-mono text-[11px]">9:00 AM – 10:25 AM</span>
                                <span className="font-mono font-extrabold text-white">25m</span>
                              </div>

                              <div className="bg-[#140b30] border border-purple-500/20 p-3 rounded-2xl flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                                    <Timer className="w-3 h-3" />
                                  </div>
                                  <span className="font-bold text-white">Short Break</span>
                                </div>
                                <span className="text-white/50 font-mono text-[11px]">10:25 AM – 10:35 AM</span>
                                <span className="font-mono font-extrabold text-white">10m</span>
                              </div>

                              <div className="bg-[#140b30] border border-purple-500/20 p-3 rounded-2xl flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                                    <Timer className="w-3 h-3" />
                                  </div>
                                  <span className="font-bold text-white">Focus Time</span>
                                </div>
                                <span className="text-white/50 font-mono text-[11px]">10:35 AM – 11:00 AM</span>
                                <span className="font-mono font-extrabold text-white">25m</span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setShowCalendarView(false)}
                            className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition self-start pt-2 cursor-pointer"
                          >
                            <span>View full history</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* CARD 2: MONTHLY OVERVIEW */}
                        <div className="bg-[#0b051e] border border-purple-500/20 rounded-3xl p-4 sm:p-5 shadow-xl space-y-4">
                          <h4 className="font-extrabold text-white text-base pb-3 border-b border-purple-500/15">
                            Monthly Overview
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="bg-[#140b30] border border-purple-500/20 p-3.5 rounded-2xl flex flex-col justify-between space-y-2">
                              <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-300 flex items-center justify-center">
                                <RotateCcw className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-[10px] text-white/50 font-medium uppercase block">Total Focus Time</span>
                                <span className="text-lg sm:text-xl font-black text-white font-mono block">52h 30m</span>
                              </div>
                              <span className="text-emerald-400 font-bold text-[11px]">▲ 22% vs last month</span>
                            </div>

                            <div className="bg-[#140b30] border border-purple-500/20 p-3.5 rounded-2xl flex flex-col justify-between space-y-2">
                              <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-300 flex items-center justify-center">
                                <Target className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-[10px] text-white/50 font-medium uppercase block">Total Sessions</span>
                                <span className="text-lg sm:text-xl font-black text-white font-mono block">128</span>
                              </div>
                              <span className="text-emerald-400 font-bold text-[11px]">▲ 27% vs last month</span>
                            </div>

                            <div className="bg-[#140b30] border border-purple-500/20 p-3.5 rounded-2xl flex flex-col justify-between space-y-2">
                              <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-300 flex items-center justify-center">
                                <Sparkles className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-[10px] text-white/50 font-medium uppercase block">Productivity</span>
                                <span className="text-lg sm:text-xl font-black text-white font-mono block">89%</span>
                              </div>
                              <span className="text-emerald-400 font-bold text-[11px]">▲ Great job!</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* TIMELINE VIEW (REGULAR HISTORY) */
                    <div className="space-y-5 animate-fadeIn">
                      {/* TOP HEADER CONTAINER */}
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-purple-500/20">
                        {/* TITLE WITH ICON */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-purple-900/60 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                            <History className="w-5 h-5 text-purple-300" />
                          </div>
                          <div>
                            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
                              History
                            </h3>
                          </div>
                        </div>

                        {/* CONTROLS: FILTER TABS & DATE RANGE / CALENDAR BUTTON */}
                        <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 w-full md:w-auto">
                          {/* FILTER TABS */}
                          <div className="bg-[#180f33] border border-purple-500/20 p-1 rounded-2xl flex items-center gap-1 shadow-inner overflow-x-auto max-w-full">
                            {[
                              { id: "all", label: "All" },
                              { id: "focus", label: "Focus" },
                              { id: "shortBreak", label: "Short Break" },
                              { id: "longBreak", label: "Long Break" },
                            ].map((filter) => (
                              <button
                                key={filter.id}
                                type="button"
                                onClick={() => setHistoryFilter(filter.id as any)}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                                  historyFilter === filter.id
                                    ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.6)]"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                                }`}
                              >
                                {filter.label}
                              </button>
                            ))}
                          </div>

                          {/* DATE RANGE BADGE - CLICK OPENS CALENDAR */}
                          <button
                            type="button"
                            onClick={() => setShowCalendarView(true)}
                            className="bg-[#180f33] border border-purple-500/20 hover:border-purple-500/50 hover:bg-[#201542] px-3.5 py-2 rounded-2xl text-xs font-semibold text-white/90 flex items-center gap-2 shadow-inner transition cursor-pointer group"
                            title="Open Calendar View"
                          >
                            <span>May 12 – May 18</span>
                            <Calendar className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
                          </button>
                        </div>
                      </div>

                      {/* TIMELINE LIST */}
                      <div className="space-y-6 pt-1">
                        {/* SECTION 1: TODAY - MAY 18 */}
                        {(historyFilter === "all" || historyFilter === "focus" || historyFilter === "shortBreak" || historyFilter === "longBreak") && (
                          <div className="space-y-3">
                            <h4 className="text-xs sm:text-sm font-semibold text-white/60 tracking-wide pl-1">
                              Today - May 18
                            </h4>

                            <div className="relative pl-7 space-y-2.5">
                              {/* VERTICAL TIMELINE LINKING LINE */}
                              <div className="absolute left-3.5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-purple-500/80 via-blue-500/50 to-emerald-500/30 pointer-events-none" />

                              {/* 1. FOCUS TIME (9:00 AM - 9:25 AM) | 25m 🏆 */}
                              {(historyFilter === "all" || historyFilter === "focus") && (
                                <div className="relative z-10 bg-[#130b2c]/90 border border-purple-500/20 hover:border-purple-500/40 p-3.5 rounded-2xl flex items-center justify-between gap-3 transition shadow-md">
                                  <div className="flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.8)] shrink-0 z-10">
                                      <Timer className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="font-bold text-white text-sm">Focus Time</span>
                                  </div>
                                  <div className="text-white/50 text-xs font-mono hidden sm:block">
                                    9:00 AM - 9:25 AM
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-white/90 font-mono font-bold text-xs sm:text-sm">25m</span>
                                    <span className="text-amber-400 text-sm drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]">🏆</span>
                                  </div>
                                </div>
                              )}

                              {/* 2. SHORT BREAK (9:25 AM - 9:35 AM) | 10m */}
                              {(historyFilter === "all" || historyFilter === "shortBreak") && (
                                <div className="relative z-10 bg-[#130b2c]/90 border border-purple-500/20 hover:border-purple-500/40 p-3.5 rounded-2xl flex items-center justify-between gap-3 transition shadow-md">
                                  <div className="flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.8)] shrink-0 z-10">
                                      <Timer className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="font-bold text-white text-sm">Short Break</span>
                                  </div>
                                  <div className="text-white/50 text-xs font-mono hidden sm:block">
                                    9:25 AM - 9:35 AM
                                  </div>
                                  <div className="text-white/90 font-mono font-bold text-xs sm:text-sm">
                                    10m
                                  </div>
                                </div>
                              )}

                              {/* 3. FOCUS TIME (9:35 AM - 10:00 AM) | 25m */}
                              {(historyFilter === "all" || historyFilter === "focus") && (
                                <div className="relative z-10 bg-[#130b2c]/90 border border-purple-500/20 hover:border-purple-500/40 p-3.5 rounded-2xl flex items-center justify-between gap-3 transition shadow-md">
                                  <div className="flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.8)] shrink-0 z-10">
                                      <Timer className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="font-bold text-white text-sm">Focus Time</span>
                                  </div>
                                  <div className="text-white/50 text-xs font-mono hidden sm:block">
                                    9:35 AM - 10:00 AM
                                  </div>
                                  <div className="text-white/90 font-mono font-bold text-xs sm:text-sm">
                                    25m
                                  </div>
                                </div>
                              )}

                              {/* 4. FOCUS TIME (10:15 AM - 10:40 AM) | 25m */}
                              {(historyFilter === "all" || historyFilter === "focus") && (
                                <div className="relative z-10 bg-[#130b2c]/90 border border-purple-500/20 hover:border-purple-500/40 p-3.5 rounded-2xl flex items-center justify-between gap-3 transition shadow-md">
                                  <div className="flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.8)] shrink-0 z-10">
                                      <Timer className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="font-bold text-white text-sm">Focus Time</span>
                                  </div>
                                  <div className="text-white/50 text-xs font-mono hidden sm:block">
                                    10:15 AM - 10:40 AM
                                  </div>
                                  <div className="text-white/90 font-mono font-bold text-xs sm:text-sm">
                                    25m
                                  </div>
                                </div>
                              )}

                              {/* 5. LONG BREAK (10:40 AM - 11:00 AM) | 20m */}
                              {(historyFilter === "all" || historyFilter === "longBreak") && (
                                <div className="relative z-10 bg-[#130b2c]/90 border border-purple-500/20 hover:border-purple-500/40 p-3.5 rounded-2xl flex items-center justify-between gap-3 transition shadow-md">
                                  <div className="flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.8)] shrink-0 z-10">
                                      <Timer className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="font-bold text-white text-sm">Long Break</span>
                                  </div>
                                  <div className="text-white/50 text-xs font-mono hidden sm:block">
                                    10:40 AM - 11:00 AM
                                  </div>
                                  <div className="text-white/90 font-mono font-bold text-xs sm:text-sm">
                                    20m
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* SECTION 2: YESTERDAY - MAY 17 */}
                        {(historyFilter === "all" || historyFilter === "focus" || historyFilter === "shortBreak") && (
                          <div className="space-y-3 pt-2">
                            <h4 className="text-xs sm:text-sm font-semibold text-white/60 tracking-wide pl-1">
                              Yesterday - May 17
                            </h4>

                            <div className="relative pl-7 space-y-2.5">
                              {/* VERTICAL TIMELINE LINKING LINE */}
                              <div className="absolute left-3.5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-purple-500/80 via-blue-500/50 to-purple-900/20 pointer-events-none" />

                              {/* 1. FOCUS TIME (8:30 PM - 8:55 PM) | 25m */}
                              {(historyFilter === "all" || historyFilter === "focus") && (
                                <div className="relative z-10 bg-[#130b2c]/90 border border-purple-500/20 hover:border-purple-500/40 p-3.5 rounded-2xl flex items-center justify-between gap-3 transition shadow-md">
                                  <div className="flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.8)] shrink-0 z-10">
                                      <Timer className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="font-bold text-white text-sm">Focus Time</span>
                                  </div>
                                  <div className="text-white/50 text-xs font-mono hidden sm:block">
                                    8:30 PM - 8:55 PM
                                  </div>
                                  <div className="text-white/90 font-mono font-bold text-xs sm:text-sm">
                                    25m
                                  </div>
                                </div>
                              )}

                              {/* 2. SHORT BREAK (8:55 PM - 9:05 PM) | 10m */}
                              {(historyFilter === "all" || historyFilter === "shortBreak") && (
                                <div className="relative z-10 bg-[#130b2c]/90 border border-purple-500/20 hover:border-purple-500/40 p-3.5 rounded-2xl flex items-center justify-between gap-3 transition shadow-md">
                                  <div className="flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.8)] shrink-0 z-10">
                                      <Timer className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="font-bold text-white text-sm">Short Break</span>
                                  </div>
                                  <div className="text-white/50 text-xs font-mono hidden sm:block">
                                    8:55 PM - 9:05 PM
                                  </div>
                                  <div className="text-white/90 font-mono font-bold text-xs sm:text-sm">
                                    10m
                                  </div>
                                </div>
                              )}

                              {/* 3. FOCUS TIME (9:05 PM - 9:30 PM) | 25m */}
                              {(historyFilter === "all" || historyFilter === "focus") && (
                                <div className="relative z-10 bg-[#130b2c]/90 border border-purple-500/20 hover:border-purple-500/40 p-3.5 rounded-2xl flex items-center justify-between gap-3 transition shadow-md">
                                  <div className="flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.8)] shrink-0 z-10">
                                      <Timer className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="font-bold text-white text-sm">Focus Time</span>
                                  </div>
                                  <div className="text-white/50 text-xs font-mono hidden sm:block">
                                    9:05 PM - 9:30 PM
                                  </div>
                                  <div className="text-white/90 font-mono font-bold text-xs sm:text-sm">
                                    25m
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* SECTION 3: RECENT USER SAVED SESSIONS */}
                        {sessionLogs.length > 0 && (historyFilter === "all" || historyFilter === "focus") && (
                          <div className="space-y-3 pt-2">
                            <h4 className="text-xs sm:text-sm font-semibold text-purple-300 tracking-wide pl-1 flex items-center justify-between">
                              <span>Recent Recorded Sessions</span>
                              <span className="text-xs text-white/50 font-mono">({sessionLogs.length})</span>
                            </h4>

                            <div className="relative pl-7 space-y-2.5">
                              <div className="absolute left-3.5 top-3 bottom-3 w-0.5 bg-purple-500/40 pointer-events-none" />
                              {sessionLogs.map((log) => (
                                <div
                                  key={log.id}
                                  className="relative z-10 bg-[#130b2c]/90 border border-purple-500/30 hover:border-purple-400 p-3.5 rounded-2xl flex items-center justify-between gap-3 transition group shadow-md"
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.8)] shrink-0 z-10">
                                      <Timer className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="min-w-0">
                                      <span className="font-bold text-white text-sm block truncate capitalize">{log.subjectId}</span>
                                      <span className="text-[11px] text-white/50 block font-mono">{log.date}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3 shrink-0">
                                    <span className="text-white/90 font-mono font-bold text-xs sm:text-sm">
                                      {log.durationMinutes}m
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteLog(log.id)}
                                      className="p-1.5 hover:bg-rose-500/20 text-rose-400 rounded-lg transition"
                                      title="سڕینەوە"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 4: STATS DASHBOARD */}
              {activeModalTab === "stats" && (
                <div dir="rtl" className="space-y-5 bg-[#0c0521] text-white p-3 sm:p-5 rounded-3xl border border-purple-500/25 shadow-2xl animate-fadeIn">
                  {/* UNIFIED STATS DASHBOARD HEADER & PERIOD SELECTOR */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4 pb-4 border-b border-purple-500/25" dir="rtl">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-800 via-indigo-900 to-purple-950 border border-purple-400/40 text-purple-200 flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(168,85,247,0.4)]">
                        {statsPeriod === "day" && <Sun className="w-6 h-6 text-amber-300" />}
                        {statsPeriod === "week" && <BarChart2 className="w-6 h-6 text-purple-300" />}
                        {statsPeriod === "month" && <Calendar className="w-6 h-6 text-indigo-300" />}
                        {statsPeriod === "year" && <Calendar className="w-6 h-6 text-emerald-300" />}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide whitespace-nowrap">
                          {statsPeriod === "day"
                            ? (isBadini ? "ئامارێن رۆژانە" : "ئامارەکانی ڕۆژانە")
                            : statsPeriod === "week"
                            ? (isBadini ? "ئامارێن حەفتانە" : "ئامارەکانی هەفتانە")
                            : statsPeriod === "month"
                            ? (isBadini ? "ئامارێن هەیڤانە" : "ئامارەکانی مانگانە")
                            : (isBadini ? "ئامارێن ساڵانە" : "ئامارەکانی ساڵانە")}
                        </h3>
                        <p className="text-xs text-purple-200/70 font-medium mt-0.5 whitespace-nowrap">
                          {statsPeriod === "day"
                            ? (isBadini ? "ئەڤرۆ (ئەنجامێن تەرکیزا تە)" : "ئەمڕۆ (ئەنجامەکانی تەرکیز)")
                            : statsPeriod === "week"
                            ? (isBadini ? "ئەم حەفتەیە (پێشکەوتنا تە)" : "ئەم هەفتەیە (پێشکەوتنت)")
                            : statsPeriod === "month"
                            ? (isBadini ? "گوڵان ۲۰۲۴" : "مای 2024")
                            : (isBadini ? "ساڵا ۲۰۲۴" : "ساڵی 2024")}
                        </p>
                      </div>
                    </div>

                    {/* TIME PERIOD SELECTOR (DAY / WEEK / MONTH / YEAR) */}
                    <div className="bg-[#180f33] border border-purple-500/30 p-1.5 rounded-2xl flex items-center gap-1.5 shadow-inner shrink-0 flex-wrap">
                      {(["day", "week", "month", "year"] as const).map((period) => (
                        <button
                          key={period}
                          type="button"
                          onClick={() => setStatsPeriod(period)}
                          className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold capitalize transition-all cursor-pointer whitespace-nowrap ${
                            statsPeriod === period
                              ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white shadow-[0_0_18px_rgba(168,85,247,0.85)] border border-purple-300/50 scale-105"
                              : "text-purple-200/70 hover:text-white hover:bg-purple-900/40"
                          }`}
                        >
                          {period === "day"
                            ? (isBadini ? "رۆژانە" : "ڕۆژانە")
                            : period === "week"
                            ? (isBadini ? "حەفتانە" : "هەفتانە")
                            : period === "month"
                            ? (isBadini ? "هەیڤانە" : "مانگانە")
                            : (isBadini ? "ساڵانە" : "ساڵانە")}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* DAY VIEW */}
                  {statsPeriod === "day" && (
                    <div className="space-y-5 animate-fadeIn">

                      {/* TOP METRICS ROW (4 CARDS GRID WITH VIBRANT DYNAMIC COLORS & GLOWS) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        {/* 1. TOTAL FOCUS TIME TODAY */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-[#2a1352] via-[#1e0e3e] to-[#13072b] border border-purple-400/50 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:border-purple-300 transition-all group min-h-[145px]">
                          <div className="flex items-center gap-2.5 z-10">
                            <div className="w-8 h-8 rounded-full bg-purple-600/90 border border-purple-300/50 flex items-center justify-center shadow-[0_0_12px_rgba(168,85,247,0.8)] text-white shrink-0">
                              <Clock className="w-4 h-4" />
                            </div>
                            <span className="text-purple-100 font-bold text-xs sm:text-sm">
                              {isBadini ? "دەمێ تەرکیزا ئەڤرۆ" : "کاتی تەرکیزی ئەمڕۆ"}
                            </span>
                          </div>
                          <div className="text-2xl sm:text-3xl font-black text-white my-1 tracking-tight z-10 drop-shadow-[0_2px_10px_rgba(168,85,247,0.5)]">
                            2h 45m
                          </div>
                          <div className="text-emerald-300 text-xs font-black flex items-center gap-1.5 relative z-10 pb-1">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 shadow-sm">▲ 15%</span>
                            <span className="text-purple-200/70 font-medium">{isBadini ? "بەراورد ب دوهی" : "بەراورد بە دوێنێ"}</span>
                          </div>
                          <svg className="absolute bottom-0 left-0 right-0 w-full h-8 opacity-75 pointer-events-none z-0" viewBox="0 0 100 30" preserveAspectRatio="none">
                            <path
                              d="M0 27 Q 25 24, 50 20 T 75 16 T 100 12 L 100 30 L 0 30 Z"
                              fill="rgba(168,85,247,0.2)"
                            />
                            <path
                              d="M0 27 Q 25 24, 50 20 T 75 16 T 100 12"
                              fill="none"
                              stroke="#c084fc"
                              strokeWidth="2"
                              strokeLinecap="round"
                              style={{ filter: "drop-shadow(0px 0px 4px rgba(192, 132, 252, 0.6))" }}
                            />
                          </svg>
                        </div>

                        {/* 2. TODAY'S SESSIONS */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-[#0f316e] via-[#0b224e] to-[#071330] border border-blue-400/50 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:border-blue-300 transition-all group min-h-[145px]">
                          <div className="flex items-center gap-2.5 z-10">
                            <div className="w-8 h-8 rounded-full bg-blue-600/90 border border-blue-300/50 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.8)] text-white shrink-0">
                              <Target className="w-4 h-4" />
                            </div>
                            <span className="text-blue-100 font-bold text-xs sm:text-sm">
                              {isBadini ? "خولێن ئەڤرۆ" : "خولەکانی ئەمڕۆ"}
                            </span>
                          </div>
                          <div className="text-2xl sm:text-3xl font-black text-white my-1 tracking-tight z-10 drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]">
                            6 {isBadini ? "خول" : "خول"}
                          </div>
                          <div className="text-emerald-300 text-xs font-black flex items-center gap-1.5 relative z-10 pb-1">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 shadow-sm">▲ +2</span>
                            <span className="text-blue-200/70 font-medium">{isBadini ? "زێدەتر ژ دوهی" : "زیاتر لە دوێنێ"}</span>
                          </div>
                          <svg className="absolute bottom-0 left-0 right-0 w-full h-8 opacity-75 pointer-events-none z-0" viewBox="0 0 100 30" preserveAspectRatio="none">
                            <path
                              d="M0 26 Q 20 28, 40 22 T 70 17 T 100 13 L 100 30 L 0 30 Z"
                              fill="rgba(59,130,246,0.2)"
                            />
                            <path
                              d="M0 26 Q 20 28, 40 22 T 70 17 T 100 13"
                              fill="none"
                              stroke="#60a5fa"
                              strokeWidth="2"
                              strokeLinecap="round"
                              style={{ filter: "drop-shadow(0px 0px 4px rgba(96, 165, 250, 0.6))" }}
                            />
                          </svg>
                        </div>

                        {/* 3. TODAY'S STREAK */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-[#6b310c] via-[#4a2007] to-[#290f03] border border-amber-400/50 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:border-amber-300 transition-all group min-h-[145px]">
                          <div className="flex items-center gap-2.5 z-10">
                            <div className="w-8 h-8 rounded-full bg-amber-500/90 border border-amber-300/50 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.8)] text-white shrink-0">
                              <Flame className="w-4 h-4" />
                            </div>
                            <span className="text-amber-100 font-bold text-xs sm:text-sm">
                              {isBadini ? "زنجیرا ئەڤرۆ" : "زنجیری ئەمڕۆ"}
                            </span>
                          </div>
                          <div className="text-2xl sm:text-3xl font-black text-white my-1 tracking-tight z-10 drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)]">
                            18 {isBadini ? "ڕۆژ" : "ڕۆژ"}
                          </div>
                          <div className="text-amber-300 text-xs font-black flex items-center gap-1 relative z-10 pb-1">
                            <span className="px-2 py-0.5 rounded bg-amber-950/90 border border-amber-500/40 shadow-sm">🔥 {isBadini ? "بەردەوام بە!" : "بەردەوام بە!"}</span>
                          </div>
                          <svg className="absolute bottom-0 left-0 right-0 w-full h-8 opacity-75 pointer-events-none z-0" viewBox="0 0 100 30" preserveAspectRatio="none">
                            <path
                              d="M0 28 Q 25 25, 50 20 T 75 16 T 100 12 L 100 30 L 0 30 Z"
                              fill="rgba(245,158,11,0.2)"
                            />
                            <path
                              d="M0 28 Q 25 25, 50 20 T 75 16 T 100 12"
                              fill="none"
                              stroke="#fbbf24"
                              strokeWidth="2"
                              strokeLinecap="round"
                              style={{ filter: "drop-shadow(0px 0px 4px rgba(251, 191, 36, 0.6))" }}
                            />
                          </svg>
                        </div>

                        {/* 4. PRODUCTIVITY SCORE TODAY */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-[#0f6336] via-[#094524] to-[#042613] border border-emerald-400/50 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:border-emerald-300 transition-all group min-h-[145px]">
                          <div className="z-10">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-8 h-8 rounded-full bg-emerald-500/90 border border-emerald-300/50 flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.8)] text-white shrink-0">
                                <PieChart className="w-4 h-4" />
                              </div>
                              <span className="text-emerald-100 font-bold text-xs sm:text-sm">
                                {isBadini ? "نمرەیا بەرهەمداریێ" : "نمرەی بەرهەمداری"}
                              </span>
                            </div>
                            <div className="text-2xl sm:text-3xl font-black text-white my-1 tracking-tight drop-shadow-[0_2px_10px_rgba(16,185,129,0.5)]">
                              {Math.min(100, Math.max(15, Math.round((focusCount / dailyTargetSessions) * 100)))}%
                            </div>
                            <div className="text-emerald-300 text-xs font-black flex items-center gap-1 z-10 pb-1">
                              <span className="px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/40 shadow-sm">▲ {isBadini ? "سەرسوڕهێنەر!" : "سەرسوڕهێنەر!"}</span>
                            </div>
                          </div>

                          <svg className="absolute bottom-0 left-0 right-0 w-full h-8 opacity-75 pointer-events-none z-0" viewBox="0 0 100 30" preserveAspectRatio="none">
                            <path
                              d="M0 24 Q 25 16, 50 20 T 75 14 T 100 10 L 100 30 L 0 30 Z"
                              fill="rgba(16,185,129,0.2)"
                            />
                            <path
                              d="M0 24 Q 25 16, 50 20 T 75 14 T 100 10"
                              fill="none"
                              stroke="#34d399"
                              strokeWidth="2"
                              strokeLinecap="round"
                              style={{ filter: "drop-shadow(0px 0px 4px rgba(52, 211, 153, 0.6))" }}
                            />
                          </svg>
                        </div>
                      </div>

                      {/* TODAY'S HOURLY FOCUS TIME DISTRIBUTION (BAR CHART) */}
                      <div className="bg-[#130b2c]/90 border border-purple-500/20 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <h4 className="text-white font-extrabold text-base tracking-wide flex items-center gap-2">
                            <BarChart2 className="w-4 h-4 text-purple-400" />
                            {isBadini ? "دابەشبوونا کاتژمێری یا تەرکیزا ئەڤرۆ" : "دابەشبوونی کاتژمێریی تەرکیزی ئەمڕۆ"}
                          </h4>
                          <span className="text-xs text-purple-300 bg-purple-900/40 border border-purple-500/30 px-3 py-1 rounded-full font-semibold">
                            {isBadini ? "ئەڤرۆ: ۲ کاتژمێر و ٤٥ خولەک" : "ئەمڕۆ: 2 کاتژمێر و 45 خولەک"}
                          </span>
                        </div>

                        <div className="relative w-full pt-8 pb-2">
                          {/* Y-AXIS HORIZONTAL GRID LINES */}
                          <div className="absolute inset-x-0 top-8 bottom-8 flex flex-col justify-between pointer-events-none opacity-20">
                            <div className="border-b border-purple-400 flex items-center justify-between text-[10px] text-white/50 -mt-2"><span>60m</span></div>
                            <div className="border-b border-purple-400 flex items-center justify-between text-[10px] text-white/50"><span>45m</span></div>
                            <div className="border-b border-purple-400 flex items-center justify-between text-[10px] text-white/50"><span>30m</span></div>
                            <div className="border-b border-purple-400 flex items-center justify-between text-[10px] text-white/50"><span>15m</span></div>
                            <div className="border-b border-purple-400 flex items-center justify-between text-[10px] text-white/50"><span>0m</span></div>
                          </div>

                          {/* BARS CONTAINER */}
                          <div className="relative z-10 h-48 flex items-end justify-between gap-1.5 sm:gap-3 px-2 pt-4">
                            {[
                              { time: "08:00", pct: 30, val: "20m", subject: isBadini ? "بیرکاری" : "Math" },
                              { time: "10:00", pct: 65, val: "40m", subject: isBadini ? "فیزیا" : "Physics" },
                              { time: "12:00", pct: 40, val: "25m", subject: isBadini ? "کیمیا" : "Chemistry" },
                              { time: "14:00", pct: 85, val: "50m", subject: isBadini ? "فیزیا" : "Physics", active: true },
                              { time: "16:00", pct: 20, val: "15m", subject: isBadini ? "ئینگلیزی" : "English" },
                              { time: "18:00", pct: 50, val: "30m", subject: isBadini ? "بیرکاری" : "Math" },
                              { time: "20:00", pct: 45, val: "25m", subject: isBadini ? "کوردی" : "Kurdish" },
                              { time: "22:00", pct: 0, val: "0m", subject: "—" },
                            ].map((bar, idx) => (
                              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end relative group">
                                {/* TOOLTIP ON HOVER OR ACTIVE */}
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1c103b]/95 border border-purple-400/60 text-white rounded-xl px-2.5 py-1 shadow-2xl flex flex-col items-center opacity-0 group-hover:opacity-100 transition pointer-events-none z-20 whitespace-nowrap backdrop-blur-md">
                                  <span className="text-white/70 text-[10px] font-semibold">{bar.time} - {bar.subject}</span>
                                  <span className="text-white font-extrabold text-xs">{bar.val}</span>
                                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1c103b] border-r border-b border-purple-400/60 rotate-45" />
                                </div>

                                {/* BAR INNER */}
                                <div className="w-full max-w-[36px] bg-[#180e38] rounded-t-xl overflow-hidden h-full flex items-end p-0.5 border border-purple-500/10">
                                  <div
                                    style={{ height: `${bar.pct}%` }}
                                    className={`w-full rounded-t-lg transition-all duration-500 ${
                                      bar.active
                                        ? "bg-gradient-to-t from-purple-700 via-purple-500 to-indigo-300 shadow-[0_0_14px_rgba(168,85,247,0.8)]"
                                        : "bg-gradient-to-t from-purple-900/80 to-purple-600/80 hover:from-purple-700 hover:to-purple-400"
                                    }`}
                                  />
                                </div>

                                <span className="text-[11px] text-white/60 font-semibold mt-2.5 truncate max-w-full">
                                  {bar.time}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* TODAY'S SUBJECT BREAKDOWN GRID */}
                      <div className="bg-[#130b2c]/90 border border-purple-500/20 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
                        <h4 className="text-white font-extrabold text-base tracking-wide flex items-center gap-2">
                          <PieChart className="w-4 h-4 text-purple-400" />
                          {isBadini ? "دابەشبوونا تەرکیزێ ل سەر بابەتێن ئەڤرۆ" : "دابەشبوونی تەرکیز لەسەر بابەتەکانی ئەمڕۆ"}
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {[
                            { name: isBadini ? "فیزیا" : "فیزیا", minutes: 75, color: "from-purple-600 to-indigo-600", pct: "45%" },
                            { name: isBadini ? "کیمیا" : "کیمیا", minutes: 35, color: "from-pink-600 to-rose-600", pct: "21%" },
                            { name: isBadini ? "بیرکاری" : "بیرکاری", minutes: 35, color: "from-blue-600 to-cyan-600", pct: "21%" },
                            { name: isBadini ? "ئینگلیزی" : "ئینگلیزی", minutes: 20, color: "from-emerald-600 to-teal-600", pct: "13%" },
                          ].map((item, idx) => (
                            <div key={idx} className="bg-[#09031a] border border-purple-500/20 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-white font-bold text-sm sm:text-base">{item.name}</span>
                                <span className="text-purple-300 font-extrabold text-xs bg-purple-950/80 border border-purple-500/30 px-2.5 py-0.5 rounded-full">
                                  {item.pct}
                                </span>
                              </div>
                              <div className="text-white/70 text-xs font-semibold">
                                {item.minutes} {isBadini ? "خولەک" : "خولەک"}
                              </div>
                              <div className="w-full bg-purple-950 h-2 rounded-full overflow-hidden border border-purple-800/30">
                                <div
                                  style={{ width: item.pct }}
                                  className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 1. AUTOMATIC TIME-OF-DAY STUDY LEVEL TRACKER (سپێدێ/رۆژ ، نیڤرۆ ، ئێڤاری ، شەڤ) */}
                      {(() => {
                        const currentHour = new Date().getHours();
                        let activeTimeKey = "night";
                        if (currentHour >= 5 && currentHour < 12) activeTimeKey = "morning";
                        else if (currentHour >= 12 && currentHour < 16) activeTimeKey = "afternoon";
                        else if (currentHour >= 16 && currentHour < 20) activeTimeKey = "evening";

                        // Compute total study minutes per period from session logs
                        let morningMins = 0;
                        let afternoonMins = 0;
                        let eveningMins = 0;
                        let nightMins = 0;

                        sessionLogs.forEach((l) => {
                          const h = l.timestamp ? new Date(l.timestamp).getHours() : 14;
                          const m = l.durationMinutes || 25;
                          if (h >= 5 && h < 12) morningMins += m;
                          else if (h >= 12 && h < 16) afternoonMins += m;
                          else if (h >= 16 && h < 20) eveningMins += m;
                          else nightMins += m;
                        });

                        // Default realistic data if no logs exist yet
                        if (morningMins === 0 && afternoonMins === 0 && eveningMins === 0 && nightMins === 0) {
                          morningMins = 75;   // 1h 15m
                          afternoonMins = 50; // 50m
                          eveningMins = 40;   // 40m
                          nightMins = 30;     // 30m
                        }

                        const totalPeriodMins = morningMins + afternoonMins + eveningMins + nightMins;

                        const timeSlots = [
                          {
                            key: "morning",
                            titleBadini: "سپێدێ / رۆژ",
                            titleKu: "بەیانی / ڕۆژ",
                            timeRange: "05:00 - 11:59",
                            IconComponent: Sunrise,
                            mins: morningMins,
                            pct: Math.round((morningMins / totalPeriodMins) * 100),
                            gradient: "from-amber-400 via-orange-400 to-amber-500",
                            border: "border-amber-500/40 hover:border-amber-300",
                            bg: "bg-gradient-to-br from-[#2a1708]/90 via-[#20100a]/90 to-[#140826]/90 shadow-[0_0_20px_rgba(245,158,11,0.12)]",
                            iconBg: "bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/30"
                          },
                          {
                            key: "afternoon",
                            titleBadini: "نیڤرۆ",
                            titleKu: "نیوەڕۆ",
                            timeRange: "12:00 - 15:59",
                            IconComponent: Sun,
                            mins: afternoonMins,
                            pct: Math.round((afternoonMins / totalPeriodMins) * 100),
                            gradient: "from-yellow-400 via-amber-400 to-yellow-500",
                            border: "border-yellow-500/40 hover:border-yellow-300",
                            bg: "bg-gradient-to-br from-[#2b2108]/90 via-[#211706]/90 to-[#140826]/90 shadow-[0_0_20px_rgba(234,179,8,0.12)]",
                            iconBg: "bg-gradient-to-tr from-yellow-400 to-amber-500 text-slate-950 shadow-md shadow-yellow-500/30"
                          },
                          {
                            key: "evening",
                            titleBadini: "ئێڤاری",
                            titleKu: "ئێوارە",
                            timeRange: "16:00 - 19:59",
                            IconComponent: Sunset,
                            mins: eveningMins,
                            pct: Math.round((eveningMins / totalPeriodMins) * 100),
                            gradient: "from-indigo-400 via-purple-400 to-indigo-500",
                            border: "border-indigo-500/40 hover:border-indigo-300",
                            bg: "bg-gradient-to-br from-[#16143c]/90 via-[#180e38]/90 to-[#140826]/90 shadow-[0_0_20px_rgba(99,102,241,0.12)]",
                            iconBg: "bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/30"
                          },
                          {
                            key: "night",
                            titleBadini: "شەڤ",
                            titleKu: "شەو",
                            timeRange: "20:00 - 04:59",
                            IconComponent: Moon,
                            mins: nightMins,
                            pct: Math.round((nightMins / totalPeriodMins) * 100),
                            gradient: "from-purple-400 via-pink-400 to-indigo-500",
                            border: "border-purple-500/40 hover:border-purple-300",
                            bg: "bg-gradient-to-br from-[#1c0c3a]/90 via-[#120729]/90 to-[#0a0319]/90 shadow-[0_0_20px_rgba(168,85,247,0.12)]",
                            iconBg: "bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/30"
                          }
                        ];

                        const topFocusSlot = [...timeSlots].sort((a, b) => b.mins - a.mins)[0];
                        const TopIconComponent = topFocusSlot.IconComponent;

                        return (
                          <div className="bg-gradient-to-br from-[#1c0d45]/95 via-[#140833]/95 to-[#0c0422]/95 border border-purple-500/40 rounded-3xl p-5 sm:p-6 shadow-[0_0_40px_rgba(147,51,234,0.2)] backdrop-blur-xl space-y-5">
                            <div className="flex items-center justify-between flex-wrap gap-3 border-b border-purple-500/25 pb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-purple-600 to-indigo-600 border border-amber-300/40 flex items-center justify-center text-white shadow-md shrink-0">
                                  <Clock className="w-5 h-5 text-amber-200" />
                                </div>
                                <div>
                                  <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                                    <span>{isBadini ? "ئاستێ خاندنێ ل دیڤ دەمێن رۆژانە" : "ئاستی خوێندن لەسەر کاتەکانی ڕۆژانە"}</span>
                                    <Sparkles className="w-4 h-4 text-amber-300" />
                                  </h4>
                                  <p className="text-xs text-purple-200/70 font-bold">
                                    {isBadini ? "تایمەرێ ئوتوماتیکی (سپێدێ، نیڤرۆ، ئێڤاری، شەڤ)" : "تایمەری ئۆتۆماتیکی (بەیانی، نیوەڕۆ، ئێوارە، شەو)"}
                                  </p>
                                </div>
                              </div>

                              <div className="px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-purple-600/25 to-indigo-600/30 border border-amber-400/40 text-amber-300 text-xs font-black shadow-md flex items-center gap-2">
                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                <span>
                                  {isBadini ? "باشترین دەمێ تە یێ تەرکیزێ:" : "باشترین کاتی تەرکیزت:"} {isBadini ? topFocusSlot.titleBadini : topFocusSlot.titleKu}
                                </span>
                                <TopIconComponent className="w-4 h-4 text-amber-300" />
                              </div>
                            </div>

                            {/* 4 TIME PERIODS CARDS GRID */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                              {timeSlots.map((slot) => {
                                const isCurrentNow = activeTimeKey === slot.key;
                                const SlotIcon = slot.IconComponent;
                                return (
                                  <div
                                    key={slot.key}
                                    className={`relative rounded-2xl p-4 border transition-all flex flex-col justify-between space-y-3.5 ${slot.bg} ${slot.border} ${
                                      isCurrentNow ? "ring-2 ring-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.35)] scale-[1.02]" : ""
                                    }`}
                                  >
                                    {isCurrentNow && (
                                      <span className="absolute -top-2.5 left-3 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-md animate-pulse flex items-center gap-1">
                                        <Zap className="w-3 h-3 fill-slate-950" />
                                        <span>{isBadini ? "نۆکە دەمێ ڤێیە" : "ئێستا لەم کاتەدایت"}</span>
                                      </span>
                                    )}

                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2.5">
                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${slot.iconBg}`}>
                                          <SlotIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                          <div className="text-white font-black text-sm">
                                            {isBadini ? slot.titleBadini : slot.titleKu}
                                          </div>
                                          <div className="text-[10px] text-purple-200/70 font-bold">
                                            {slot.timeRange}
                                          </div>
                                        </div>
                                      </div>
                                      <span className="text-xs font-black text-amber-300 bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-500/40 shadow-inner">
                                        {slot.pct}%
                                      </span>
                                    </div>

                                    <div className="space-y-1.5 pt-1">
                                      <div className="flex justify-between text-xs font-bold text-purple-100">
                                        <span>{isBadini ? "مایی/خاندی:" : "خوێندراو:"}</span>
                                        <span className="text-white font-black">{slot.mins} {isBadini ? "خولەک" : "خولەک"}</span>
                                      </div>
                                      <div className="w-full bg-purple-950/90 h-2.5 rounded-full overflow-hidden border border-purple-700/50 shadow-inner">
                                        <div
                                          style={{ width: `${slot.pct}%` }}
                                          className={`h-full bg-gradient-to-r ${slot.gradient} rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]`}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })()}

                      {/* 2. REGISTERED STUDY SUBJECTS & TASKS IN DAILY SCHEDULE (وان بابەتان یێن دەستنیشان کرین د ئەرک دا) */}
                      <div className="bg-gradient-to-br from-[#1c0d45]/95 via-[#140833]/95 to-[#0c0422]/95 border border-purple-500/40 rounded-3xl p-5 sm:p-6 shadow-[0_0_40px_rgba(147,51,234,0.2)] backdrop-blur-xl space-y-4">
                        <div className="flex items-center justify-between border-b border-purple-500/25 pb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-500 border border-purple-300/40 flex items-center justify-center text-white shadow-md shrink-0">
                              <BookOpen className="w-5 h-5 text-purple-200" />
                            </div>
                            <div>
                              <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                                <span>{isBadini ? "بابەت و ئەرکێن دەستنیشانکری بۆ خاندنا ئەڤرۆ" : "بابەت و ئەرکە دیاریکراوەکانی ئەمڕۆ"}</span>
                              </h4>
                              <p className="text-xs text-purple-200/70 font-bold">
                                {isBadini ? "ئەو بابەتێن تە هەڵبژارتین و د ئەرک دا هاتینە تۆمارکرن" : "ئەو بابەتانەی دیاریت کردوون و لە ئەرکدا پاشەکەوت کراون"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* ACTIVE SELECTED SUBJECT BANNER */}
                        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/90 via-indigo-950/90 to-purple-900/90 border border-amber-400/50 shadow-xl flex items-center justify-between flex-wrap gap-3">
                          <div className="flex items-center gap-3">
                            <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 border border-purple-300/50 text-white flex items-center justify-center shadow-md shrink-0">
                              <BookOpen className="w-5 h-5 text-amber-300" />
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/40">
                                  {isBadini ? "بابەتێ چالاك نۆکە:" : "بابەتی چالاکی ئێستا:"} {activeStudySubject}
                                </span>
                                <span className="text-xs text-purple-200 font-extrabold">• {activeStudyChapter}</span>
                              </div>
                              <div className="text-xs font-bold text-purple-100 mt-1 flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5 text-purple-300" />
                                <span>{activeStudyLesson}</span>
                              </div>
                            </div>
                          </div>

                          {/* ACTION BUTTON TO RETAKE QUIZ FOR THIS ACTIVE SUBJECT */}
                          <button
                            type="button"
                            onClick={() => {
                              const sessionInfo = {
                                subject: activeStudySubject || "بیرکاری",
                                chapter: activeStudyChapter || "بەندێ ١: مشتقە",
                                lesson: activeStudyLesson || "وانا ٣: یاسایێن مشتقەیێ",
                                focusMinutes: 25,
                                breakMinutes: 5,
                                completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                              };
                              setFinishedSessionDetails(sessionInfo);
                              setSessionQuizStep("quiz");
                              setSessionQuizUserAnswers({});
                              setIsSessionQuizSubmitted(false);
                              setIsSessionFinishedModalOpen(true);
                            }}
                            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-xs shadow-lg shadow-emerald-900/60 border border-emerald-300/60 transition cursor-pointer active:scale-95 flex items-center gap-2"
                          >
                            <Target className="w-4 h-4 text-amber-300" />
                            <span>{isBadini ? "دووبارە کەرەڤە تاقیکرنێ" : "دووبارە کەرەوە تاقیکردنەوە"}</span>
                            <ArrowRight className="w-4 h-4 text-amber-300" />
                          </button>
                        </div>

                        {/* REGISTERED TASKS LIST GRID */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          {dashboardTasks.map((t) => (
                            <div
                              key={t.id}
                              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                                t.completed
                                  ? "bg-[#13092e]/90 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                                  : "bg-[#180d38] border-purple-500/40 hover:border-purple-300 shadow-md"
                              }`}
                            >
                              <div className="space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="space-y-1">
                                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-purple-900/80 border border-purple-500/40 text-amber-300 inline-block">
                                      {t.subject}
                                    </span>
                                    <h5 className="text-xs sm:text-sm font-black text-white line-clamp-1">
                                      {t.title}
                                    </h5>
                                    {t.chapterTitle && (
                                      <p className="text-[11px] text-purple-200/70 font-bold truncate">
                                        {t.chapterTitle}
                                      </p>
                                    )}
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      const nextStatus = !t.completed;
                                      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                      setDashboardTasks((prev) => {
                                        const next = prev.map((item) =>
                                          item.id === t.id
                                            ? {
                                                ...item,
                                                completed: nextStatus,
                                                completedAtTime: nextStatus ? (item.completedAtTime || nowTime) : undefined,
                                                pomodoroCompletedMins: nextStatus ? (item.pomodoroCompletedMins || item.durationMinutes || 25) : undefined
                                              }
                                            : item
                                        );
                                        try {
                                          localStorage.setItem("app_tasks_dashboard_list", JSON.stringify(next));
                                        } catch (e) {}
                                        return next;
                                      });
                                      showToast(
                                        nextStatus
                                          ? (isBadini ? `ئەرکێ (${t.title}) تەمام بوو ل ${nowTime} ✓` : `ئەرکی (${t.title}) تەواوبوو لە ${nowTime} ✓`)
                                          : (isBadini ? "ئەرک زڤڕی باری نە تەمام" : "ئەرک باری نە تەواو")
                                      );
                                    }}
                                    className={`text-[10px] font-black px-2.5 py-1 rounded-xl shrink-0 flex items-center gap-1 transition cursor-pointer active:scale-95 ${
                                      t.completed
                                        ? "bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-900 shadow-sm"
                                        : "bg-amber-950/90 text-amber-300 border border-amber-500/40 hover:bg-amber-900"
                                    }`}
                                    title={isBadini ? "گۆڕینی باری تەمامبوونێ" : "گۆڕینی باری تەواوبوون"}
                                  >
                                    {t.completed ? (
                                      <>
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                        <span>{isBadini ? "تەواوبوو ✓" : "تەواوبوو ✓"}</span>
                                      </>
                                    ) : (
                                      <>
                                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                                        <span>{t.durationMinutes} {isBadini ? "خولەک" : "خولەک"}</span>
                                      </>
                                    )}
                                  </button>
                                </div>

                                {/* DETAILS BOX FOR COMPLETED TASKS: START TIME, FINISH TIME, & SUBJECT STUDY DURATION */}
                                {t.completed ? (
                                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-950/70 via-teal-950/60 to-purple-950/70 border border-emerald-500/40 space-y-1.5 mt-1 text-[11px] font-bold shadow-sm">
                                    {/* 1. START TIME (دەمێ دەستپێکرنێ) */}
                                    <div className="flex items-center justify-between text-purple-200">
                                      <span className="flex items-center gap-1.5 text-cyan-300">
                                        <Play className="w-3.5 h-3.5 text-cyan-400 shrink-0 fill-cyan-400/30" />
                                        {isBadini ? "دەمێ دەستپێکرنێ:" : "کاتی دەستپێکردن:"}
                                      </span>
                                      <span className="text-white font-extrabold bg-purple-900/90 px-2 py-0.5 rounded-md border border-purple-500/40 font-mono text-[10px] tracking-wide dir-ltr">
                                        {t.startedAtTime || "10:45 AM"}
                                      </span>
                                    </div>

                                    {/* 2. FINISH TIME (دەمێ خلاسبوونێ) */}
                                    <div className="flex items-center justify-between text-emerald-300 pt-1 border-t border-emerald-500/20">
                                      <span className="flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                        {isBadini ? "دەمێ خلاسبوونێ:" : "کاتی تەواوبوون:"}
                                      </span>
                                      <span className="text-white font-extrabold bg-emerald-900/90 px-2 py-0.5 rounded-md border border-emerald-500/40 font-mono text-[10px] tracking-wide dir-ltr">
                                        {t.completedAtTime || "11:30 AM"}
                                      </span>
                                    </div>

                                    {/* 3. TASK STUDY DURATION (ماوێ خاندنا ڤی بابەتی) */}
                                    <div className="flex items-center justify-between text-amber-300 pt-1 border-t border-emerald-500/20">
                                      <span className="flex items-center gap-1.5 font-black">
                                        <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                        {isBadini ? "ماوێ خاندنا ڤی بابەتی:" : "ماوەی خوێندنی ئەم بابەتە:"}
                                      </span>
                                      <span className="text-amber-300 font-extrabold bg-purple-950/90 px-2.5 py-0.5 rounded-md border border-amber-400/40">
                                        {t.pomodoroCompletedMins || t.durationMinutes || 45} {isBadini ? "خولەک" : "خولەک"}
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-[11px] text-purple-200/60 font-medium flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-purple-400" />
                                    <span>{isBadini ? "تایمەرێ ئامادەکری:" : "تایمەری ئامادەکراو:"} {t.durationMinutes} {isBadini ? "خولەک" : "خولەک"}</span>
                                  </div>
                                )}
                              </div>

                              {/* ACTION BUTTONS FOR THIS TASK */}
                              <div className="flex items-center justify-between gap-2 pt-2 border-t border-purple-500/20">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveStudySubject(t.subject);
                                    if (t.chapterTitle) setActiveStudyChapter(t.chapterTitle);
                                    setActiveStudyLesson(t.title);
                                    setActiveDockTab("timer");
                                    showToast(isBadini ? `بابەتێ ${t.subject} هاتە دەستنیشانکرن بۆ پۆمۆدۆرۆ` : `بابەتی ${t.subject} دیاریکرا`);
                                  }}
                                  className="px-3 py-1.5 rounded-xl bg-purple-900/70 hover:bg-purple-800 text-purple-200 font-bold text-[11px] transition cursor-pointer flex items-center gap-1.5"
                                >
                                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                                  <span>{isBadini ? "دەستپێکرنا تەرکیزێ" : "دەستپێکردن"}</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    const sessionInfo = {
                                      subject: t.subject || "بیرکاری",
                                      chapter: t.chapterTitle || "بەندێ ١: بەشێن بابەتی",
                                      lesson: t.title,
                                      focusMinutes: t.durationMinutes || 30,
                                      breakMinutes: 5,
                                      completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                    };
                                    setFinishedSessionDetails(sessionInfo);
                                    setSessionQuizStep("quiz");
                                    setSessionQuizUserAnswers({});
                                    setIsSessionQuizSubmitted(false);
                                    setIsSessionFinishedModalOpen(true);
                                  }}
                                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-[11px] shadow-md transition cursor-pointer flex items-center gap-1.5"
                                >
                                  <Target className="w-3.5 h-3.5 text-amber-300" />
                                  <span>{isBadini ? "دووبارە کەرەڤە تاقیکرنێ" : "تاقیکردنەوە"}</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 3. COMPLETED QUIZZES & INCORRECT ANSWERS REVIEW CARD WITH RETAKE PROMPT */}
                      <div className="bg-gradient-to-br from-[#1c0d45]/95 via-[#140833]/95 to-[#0c0422]/95 border border-purple-500/40 rounded-3xl p-5 sm:p-6 shadow-[0_0_40px_rgba(147,51,234,0.2)] backdrop-blur-xl space-y-5">
                        {(() => {
                          const rawQuizzes = (savedSessionQuizzes.length > 0
                            ? savedSessionQuizzes
                            : [
                                {
                                  id: 101,
                                  subject: "بیرکاری",
                                  scorePct: 40,
                                  savedAt: "ئەڤرۆ 10:30",
                                  incorrect: [
                                    { q: "مشتقەی d/dx(x⁴ - 3x² + 5) چییە؟", userAns: "3x² - 6x", correctAns: "4x³ - 6x" },
                                    { q: "تەواوکاری ∫(3x² + 2x)dx چییە؟", userAns: "3x³ + 2x² + C", correctAns: "x³ + x² + C" }
                                  ]
                                },
                                {
                                  id: 102,
                                  subject: "فیزیا",
                                  scorePct: 60,
                                  savedAt: "ئەڤرۆ 14:15",
                                  incorrect: [
                                    { q: "یەکەی پێوانی وزەی کارەبایی چییە؟", userAns: "وات (Watt)", correctAns: "جول (Joule)" },
                                    { q: "خێرایی ڕووناكی لە بۆشاییدا چەندە؟", userAns: "300 m/s", correctAns: "3 × 10⁸ m/s" }
                                  ]
                                }
                              ]
                          );

                          const quizzesWithMistakes = rawQuizzes
                            .map((qz) => {
                              let inc = qz.incorrect;
                              if (!inc || inc.length === 0) {
                                const sampleQuestions = getSubjectQuizQuestions(qz.subject || "بیرکاری");
                                inc = sampleQuestions.slice(0, 2).map((q) => ({
                                  q: q.question,
                                  userAns: q.options[1] || q.options[0],
                                  correctAns: q.options[q.correct]
                                }));
                              }
                              const activeInc = inc.filter((qItem: any) => !resolvedQuestionKeys[`${qz.subject}_${qItem.q}`]);
                              return { ...qz, incorrect: activeInc };
                            })
                            .filter((qz) => qz.incorrect && qz.incorrect.length > 0);

                          return (
                            <>
                              <div className="flex items-center justify-between border-b border-purple-500/25 pb-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 border border-rose-300/40 flex items-center justify-center text-white shadow-md shrink-0">
                                    <XCircle className="w-5 h-5 text-rose-200" />
                                  </div>
                                  <div>
                                    <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                                      <span>{isBadini ? "بابەت و پرسیارێن تێدا خەلەت بۆی (بۆ دووبارە تاقیکرنێ)" : "پێداچوونەوە و ڕاستکردنەوەی هەڵەکان"}</span>
                                    </h4>
                                    <p className="text-xs text-purple-200/70 font-bold">
                                      {isBadini ? "هر پرسیارەکا بەرسڤ بدەی ڕاستەوخۆ ژ لیستێ دهێتە لادان" : "هەر پرسیارێک وەڵام بدەیت ڕاستەوخۆ لە لیستەکە لادەبرێت"}
                                    </p>
                                  </div>
                                </div>

                                <span className="px-3.5 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 font-black text-xs flex items-center gap-1.5 shadow-md">
                                  <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                                  <span>{quizzesWithMistakes.length} {isBadini ? "بابەتێن خەلەتی تێدا" : "بابەتی هەڵە"}</span>
                                </span>
                              </div>

                              {/* PREVIOUS QUIZZES & INCORRECT QUESTIONS BREAKDOWN LIST */}
                              {quizzesWithMistakes.length === 0 ? (
                                <div className="p-6 text-center space-y-3 bg-[#160a33]/90 border border-emerald-500/40 rounded-2xl shadow-inner">
                                  <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 border border-emerald-300/50 flex items-center justify-center text-white text-2xl shadow-lg">
                                    ✓
                                  </div>
                                  <h4 className="text-base font-black text-emerald-300">
                                    {isBadini ? "هەموو پرسیارێن خەلەت ب سەرکەفتن هاتنە بەرسڤدان و لادان!" : "تەواوی پرسیارە هەڵەکان وەڵامدرانەوە و ڕاستکرانەوە!"}
                                  </h4>
                                  <p className="text-xs text-purple-200/80 font-bold">
                                    {isBadini ? "چ پرسیارەکا خەلەت نەما د تەواویا تاقیکرنان دا. ئافەرین! 🎉" : "هیچ پرسیارێکی هەڵە نەماوە لە تاقیکردنەوەکاندا. دەستخۆش! 🎉"}
                                  </p>
                                </div>
                              ) : (
                                <div className="space-y-4">
                                  {quizzesWithMistakes.map((qz, qIdx) => (
                                    <div key={qIdx} className="p-4 rounded-2xl bg-[#190e38] border border-purple-500/40 space-y-3">
                                      <div className="flex items-center justify-between flex-wrap gap-2">
                                        <div className="flex items-center gap-2.5">
                                          <span className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-400/30 text-amber-300 font-black text-xs flex items-center justify-center">
                                            {qIdx + 1}
                                          </span>
                                          <div>
                                            <div className="text-sm font-black text-white flex items-center gap-2">
                                              <span>{qz.subject}</span>
                                              <span className="text-[10px] text-purple-300 font-bold bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-500/30">
                                                {qz.savedAt}
                                              </span>
                                            </div>
                                            <div className="text-xs font-bold text-amber-300 flex items-center gap-1 mt-0.5">
                                              <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                                              <span>{isBadini ? "ئاستێ نمرێ:" : "نمرە:"} {qz.scorePct}%</span>
                                            </div>
                                          </div>
                                        </div>

                                        {/* RETAKE BUTTON WITH PROMPT */}
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const sessionInfo = {
                                              subject: qz.subject,
                                              chapter: "بەندێ ١: وانێن خاندی",
                                              lesson: "پێداچوونا تاقیکرنێ دگەل ڕاستڤەکرنا خەلەتییان",
                                              focusMinutes: 25,
                                              breakMinutes: 5,
                                              completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                            };
                                            setFinishedSessionDetails(sessionInfo);
                                            setSessionQuizStep("quiz");
                                            setSessionQuizUserAnswers({});
                                            setIsSessionQuizSubmitted(false);
                                            setIsSessionFinishedModalOpen(true);
                                          }}
                                          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg border border-amber-300/80 transition cursor-pointer active:scale-95 flex items-center gap-2"
                                        >
                                          <RotateCcw className="w-3.5 h-3.5" />
                                          <span>{isBadini ? `دووبارە تاقیکرنێ ڤەکە (${qz.subject})` : `دووبارە تاقیکردنەوە ب کەرەوە (${qz.subject})`}</span>
                                        </button>
                                      </div>

                                      {/* INCORRECT ANSWERS REVIEW SECTION WITH INSTANT ANSWER & REMOVE ACTION */}
                                      {qz.incorrect && qz.incorrect.length > 0 && (
                                        <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-2">
                                          <div className="text-xs font-black text-rose-300 flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                              <XCircle className="w-4 h-4 text-rose-400" />
                                              <span>{isBadini ? "پرسیارێن تێدا خەلەت کری د ڤێ تاقیکرنێ دا:" : "پرسیارە هەڵەکان لەم تاقیکردنەوەدا:"}</span>
                                            </div>
                                            <span className="text-[11px] text-purple-200/60 font-medium">({qz.incorrect.length} {isBadini ? "پرسیار" : "پرسیار"})</span>
                                          </div>
                                          <div className="space-y-2">
                                            {qz.incorrect.map((inc: any, i: number) => (
                                              <div key={i} className="text-xs text-purple-100 bg-purple-950/70 p-3 rounded-xl border border-purple-500/30 space-y-2 shadow-sm transition hover:border-purple-400/50">
                                                <div className="flex items-start justify-between gap-2">
                                                  <div className="font-bold text-white flex items-start gap-1.5 leading-snug">
                                                    <HelpCircle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                                                    <span>{inc.q}</span>
                                                  </div>
                                                  <button
                                                    type="button"
                                                    onClick={() => resolveMistakeQuestion(qz.subject, inc.q)}
                                                    className="px-2.5 py-1 rounded-lg bg-emerald-900/70 hover:bg-emerald-800 text-emerald-200 border border-emerald-500/50 text-[11px] font-black transition cursor-pointer active:scale-95 flex items-center gap-1 shrink-0 shadow-sm"
                                                    title={isBadini ? "بەرسڤدان و لادان ل لیستێ" : "وەڵامدانەوە و لادان"}
                                                  >
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                                    <span>{isBadini ? "بەرسڤدان و لادان ✓" : "وەڵامدانەوە ✓"}</span>
                                                  </button>
                                                </div>
                                                <div className="flex flex-wrap gap-2 text-[11px] font-semibold pt-0.5">
                                                  <span className="text-rose-300 flex items-center gap-1 bg-rose-950/80 px-2.5 py-1 rounded-lg border border-rose-500/30">
                                                    <XCircle className="w-3 h-3 text-rose-400 shrink-0" />
                                                    {isBadini ? "بەرسڤا تەیا خەلەت:" : "وەڵامی هەڵە:"} {inc.userAns}
                                                  </span>
                                                  <span className="text-emerald-300 flex items-center gap-1 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                                                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                                                    {isBadini ? "بەرسڤا دروست:" : "وەڵامی درست:"} {inc.correctAns}
                                                  </span>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  {/* WEEK VIEW */}
                  {statsPeriod === "week" && (() => {
                    const getWeekDates = () => {
                      const now = new Date();
                      const currentDay = now.getDay();
                      const diffToMon = (currentDay + 6) % 7;
                      const monday = new Date(now);
                      monday.setDate(now.getDate() - diffToMon);
                      monday.setHours(0, 0, 0, 0);

                      const dates: Date[] = [];
                      for (let i = 0; i < 7; i++) {
                        const d = new Date(monday);
                        d.setDate(monday.getDate() + i);
                        dates.push(d);
                      }
                      return dates;
                    };

                    const weekDates = getWeekDates();
                    const todayDateStr = new Date().toDateString();

                    const dayNamesBadini = ["دووشەمب", "سێشەمب", "چوارشەمب", "پێنجشەمب", "ئینینی", "شەمبی", "ئێکەشەمب"];
                    const dayNamesSoran = ["دووشەممە", "سێشەممە", "چوارشەممە", "پێنجشەممە", "ئینینی", "شەممە", "یەکشەممە"];
                    const fallbackHours = [2.16, 2.5, 2.75, 2.25, 2.58, 1.66, 0.75];

                    const weekDayData = weekDates.map((dateObj, idx) => {
                      const dayName = isBadini ? dayNamesBadini[idx] : dayNamesSoran[idx];
                      const dateStr = dateObj.toDateString();
                      const isToday = dateStr === todayDateStr;

                      const logsForDay = sessionLogs.filter((l) => new Date(l.timestamp).toDateString() === dateStr);
                      const loggedMins = logsForDay.reduce((acc, l) => acc + l.durationMinutes, 0);

                      let totalMins = loggedMins;
                      if (totalMins === 0 && isToday && focusCount > 0) {
                        totalMins = focusCount * (durations.pomodoro || 25);
                      }
                      if (totalMins === 0 && sessionLogs.length === 0) {
                        totalMins = Math.round(fallbackHours[idx] * 60);
                      }

                      const hrsNum = totalMins / 60;
                      const hFormatted = Math.floor(hrsNum);
                      const mFormatted = Math.round(totalMins % 60);
                      const valStr = hFormatted > 0 ? `${hFormatted}h ${mFormatted}m` : `${mFormatted}m`;
                      const sessionsCount = logsForDay.length || Math.ceil(totalMins / 25);

                      return {
                        day: dayName,
                        dateObj,
                        totalMins,
                        hours: parseFloat(hrsNum.toFixed(1)),
                        sessions: sessionsCount,
                        val: valStr,
                        isToday,
                      };
                    });

                    const maxMins = Math.max(240, ...weekDayData.map((d) => d.totalMins));
                    const totalWeekMins = weekDayData.reduce((acc, d) => acc + d.totalMins, 0);
                    const totalWeekSessions = weekDayData.reduce((acc, d) => acc + d.sessions, 0);
                    const weekTotalHoursStr = `${Math.floor(totalWeekMins / 60)}h ${totalWeekMins % 60}m`;

                    return (
                    <div className="space-y-5 animate-fadeIn">

                      {/* TOP METRICS ROW (4 CARDS GRID WITH SPARKLINE WAVES) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        {/* 1. TOTAL FOCUS TIME */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-[#2a1352] via-[#1e0e3e] to-[#13072b] border border-purple-400/50 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:border-purple-300 transition-all group min-h-[145px]">
                          <div className="flex items-center gap-2.5 z-10">
                            <div className="w-8 h-8 rounded-full bg-purple-600/90 border border-purple-300/50 flex items-center justify-center shadow-[0_0_12px_rgba(168,85,247,0.8)] text-white shrink-0">
                              <Clock className="w-4 h-4" />
                            </div>
                            <span className="text-purple-100 font-bold text-xs sm:text-sm">
                              {isBadini ? "سەرجەمێ دەمێ تەرکیزێ" : "کۆی کاتی تەرکیز"}
                            </span>
                          </div>
                          <div className="text-2xl sm:text-3xl font-black text-white my-1 tracking-tight z-10 drop-shadow-[0_2px_10px_rgba(168,85,247,0.5)]">
                            {weekTotalHoursStr}
                          </div>
                          <div className="text-emerald-300 text-xs font-black flex items-center gap-1.5 relative z-10 pb-1">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 shadow-sm">▲ 18%</span>
                            <span className="text-purple-200/70 font-medium">{isBadini ? "ژ حەفتیا بۆری" : "لە هەفتەی پێشوو"}</span>
                          </div>
                          <svg className="absolute bottom-0 left-0 right-0 w-full h-8 opacity-75 pointer-events-none z-0" viewBox="0 0 100 30" preserveAspectRatio="none">
                            <path d="M0,27 C20,24 40,22 60,18 C80,14 90,16 100,12 L100,30 L0,30 Z" fill="rgba(168,85,247,0.2)" />
                            <path d="M0,27 C20,24 40,22 60,18 C80,14 90,16 100,12" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" style={{ filter: "drop-shadow(0px 0px 4px rgba(192, 132, 252, 0.6))" }} />
                          </svg>
                        </div>

                        {/* 2. POMODORO SESSIONS */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-[#0f316e] via-[#0b224e] to-[#071330] border border-blue-400/50 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:border-blue-300 transition-all group min-h-[145px]">
                          <div className="flex items-center gap-2.5 z-10">
                            <div className="w-8 h-8 rounded-full bg-blue-600/90 border border-blue-300/50 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.8)] text-white shrink-0">
                              <Activity className="w-4 h-4" />
                            </div>
                            <span className="text-blue-100 font-bold text-xs sm:text-sm">
                              {isBadini ? "خولێن پۆمۆدۆرۆ" : "خولەکانی پۆمۆدۆرۆ"}
                            </span>
                          </div>
                          <div className="text-2xl sm:text-3xl font-black text-white my-1 tracking-tight z-10 drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]">
                            {totalWeekSessions}
                          </div>
                          <div className="text-emerald-300 text-xs font-black flex items-center gap-1.5 relative z-10 pb-1">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 shadow-sm">▲ 24%</span>
                            <span className="text-blue-200/70 font-medium">{isBadini ? "ژ حەفتیا بۆری" : "لە هەفتەی پێشوو"}</span>
                          </div>
                          <svg className="absolute bottom-0 left-0 right-0 w-full h-8 opacity-75 pointer-events-none z-0" viewBox="0 0 100 30" preserveAspectRatio="none">
                            <path d="M0,26 C20,28 40,21 60,19 C80,15 90,17 100,13 L100,30 L0,30 Z" fill="rgba(59,130,246,0.2)" />
                            <path d="M0,26 C20,28 40,21 60,19 C80,15 90,17 100,13" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" style={{ filter: "drop-shadow(0px 0px 4px rgba(96, 165, 250, 0.6))" }} />
                          </svg>
                        </div>

                        {/* 3. LONGEST STREAK */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-[#6b310c] via-[#4a2007] to-[#290f03] border border-amber-400/50 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:border-amber-300 transition-all group min-h-[145px]">
                          <div className="flex items-center gap-2.5 z-10">
                            <div className="w-8 h-8 rounded-full bg-amber-500/90 border border-amber-300/50 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.8)] text-white shrink-0">
                              <Flame className="w-4 h-4" />
                            </div>
                            <span className="text-amber-100 font-bold text-xs sm:text-sm">
                              {isBadini ? "درێژترین زنجیرا بەردەوامیێ" : "درێژترین زنجیر"}
                            </span>
                          </div>
                          <div className="text-2xl sm:text-3xl font-black text-white my-1 tracking-tight z-10 drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)]">
                            {isBadini ? "۱۸ ڕۆژ" : "18 days"}
                          </div>
                          <div className="text-amber-300 text-xs font-black flex items-center gap-1 relative z-10 pb-1">
                            <span className="px-2 py-0.5 rounded bg-amber-950/90 border border-amber-500/40 shadow-sm">🔥 {isBadini ? "بەردەوام بە!" : "بەردەوام بە!"}</span>
                          </div>
                          <svg className="absolute bottom-0 left-0 right-0 w-full h-8 opacity-75 pointer-events-none z-0" viewBox="0 0 100 30" preserveAspectRatio="none">
                            <path d="M0,28 C25,25 50,20 75,16 100,12 L100,30 L0,30 Z" fill="rgba(245,158,11,0.2)" />
                            <path d="M0,28 C25,25 50,20 75,16 100,12" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" style={{ filter: "drop-shadow(0px 0px 4px rgba(251, 191, 36, 0.6))" }} />
                          </svg>
                        </div>

                        {/* 4. PRODUCTIVITY SCORE */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-[#0f6336] via-[#094524] to-[#042613] border border-emerald-400/50 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:border-emerald-300 transition-all group min-h-[145px]">
                          <div className="z-10">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-8 h-8 rounded-full bg-emerald-500/90 border border-emerald-300/50 flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.8)] text-white shrink-0">
                                <Target className="w-4 h-4" />
                              </div>
                              <span className="text-emerald-100 font-bold text-xs sm:text-sm">
                                {isBadini ? "نمرەیا بەرهەمداریێ" : "نمرەی بەرهەمداری"}
                              </span>
                            </div>
                            <div className="text-2xl sm:text-3xl font-black text-white my-1 tracking-tight drop-shadow-[0_2px_10px_rgba(16,185,129,0.5)]">
                              92%
                            </div>
                            <div className="text-emerald-300 text-xs font-black flex items-center gap-1 pb-1">
                              <span className="px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/40 shadow-sm">▲ {isBadini ? "سەرسوڕهێنەر!" : "سەرسوڕهێنەر!"}</span>
                            </div>
                          </div>

                          <svg className="absolute bottom-0 left-0 right-0 w-full h-8 opacity-75 pointer-events-none z-0" viewBox="0 0 100 30" preserveAspectRatio="none">
                            <path d="M0 24 Q 25 16, 50 20 T 75 14 T 100 10 L 100 30 L 0 30 Z" fill="rgba(16,185,129,0.2)" />
                            <path d="M0 24 Q 25 16, 50 20 T 75 14 T 100 10" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" style={{ filter: "drop-shadow(0px 0px 4px rgba(52, 211, 153, 0.6))" }} />
                          </svg>
                        </div>
                      </div>

                      {/* NEW SECTION 1: STUDIED VS UNSTUDIED SUBJECTS PERCENTAGE & REMAINING PROGRESS */}
                      {(() => {
                        const allGrade12Subjects = [
                          { id: "physics", name: isBadini ? "فیزیا" : "فیزیا", icon: "⚡", color: "from-blue-600 to-indigo-500", defaultScore: 94, isStudied: true, hrs: "5.5" },
                          { id: "chemistry", name: isBadini ? "کیمیا" : "کیمیا", icon: "🧪", color: "from-purple-600 to-pink-500", defaultScore: 88, isStudied: true, hrs: "4.0" },
                          { id: "math", name: isBadini ? "بیرکاری" : "بیرکاری", icon: "📐", color: "from-emerald-600 to-teal-500", defaultScore: 65, isStudied: true, hrs: "4.5" },
                          { id: "biology", name: isBadini ? "زیندەوەر" : "ژینناسی", icon: "🧬", color: "from-amber-600 to-yellow-500", defaultScore: 82, isStudied: true, hrs: "3.0" },
                          { id: "kurdish", name: isBadini ? "کوردی" : "کوردی", icon: "📚", color: "from-rose-600 to-red-500", defaultScore: 78, isStudied: true, hrs: "1.5" },
                          { id: "arabic", name: isBadini ? "عەرەبی" : "عەرەبی", icon: "📖", color: "from-cyan-600 to-blue-500", defaultScore: 58, isStudied: false, hrs: "0.0" },
                          { id: "islamic", name: isBadini ? "ئاین" : "پەروەردەی ئیسلامی", icon: "🌙", color: "from-teal-600 to-emerald-500", defaultScore: 90, isStudied: false, hrs: "0.0" },
                        ];

                        const studiedSubjects = allGrade12Subjects.filter(s => s.isStudied);
                        const unstudiedSubjects = allGrade12Subjects.filter(s => !s.isStudied);
                        const studiedPct = Math.round((studiedSubjects.length / allGrade12Subjects.length) * 100);
                        const unstudiedPct = 100 - studiedPct;

                        const weakestSubject = [...allGrade12Subjects].sort((a, b) => a.defaultScore - b.defaultScore)[0];
                        const strongestSubject = [...allGrade12Subjects].sort((a, b) => b.defaultScore - a.defaultScore)[0];

                        const dailySubjectBreakdown = weekDayData.map((dayData, idx) => {
                          let subjectsStudied = [];
                          if (idx === 0) subjectsStudied = [{ name: isBadini ? "فیزیا" : "فیزیا", icon: "⚡", time: "1.5h" }, { name: isBadini ? "بیرکاری" : "بیرکاری", icon: "📐", time: "1.0h" }];
                          else if (idx === 1) subjectsStudied = [{ name: isBadini ? "کیمیا" : "کیمیا", icon: "🧪", time: "1.5h" }, { name: isBadini ? "زیندەوەر" : "ژینناسی", icon: "🧬", time: "1.0h" }];
                          else if (idx === 2) subjectsStudied = [{ name: isBadini ? "فیزیا" : "فیزیا", icon: "⚡", time: "1.8h" }, { name: isBadini ? "بیرکاری" : "بیرکاری", icon: "📐", time: "1.2h" }];
                          else if (idx === 3) subjectsStudied = [{ name: isBadini ? "کوردی" : "کوردی", icon: "📚", time: "1.5h" }, { name: isBadini ? "کیمیا" : "کیمیا", icon: "🧪", time: "1.0h" }];
                          else if (idx === 4) subjectsStudied = [{ name: isBadini ? "بیرکاری" : "بیرکاری", icon: "📐", time: "1.5h" }, { name: isBadini ? "زیندەوەر" : "ژینناسی", icon: "🧬", time: "1.1h" }];
                          else if (idx === 5) subjectsStudied = [{ name: isBadini ? "فیزیا" : "فیزیا", icon: "⚡", time: "1.2h" }, { name: isBadini ? "کوردی" : "کوردی", icon: "📚", time: "0.5h" }];
                          else subjectsStudied = []; // Sunday 0 hrs / No study registered

                          return {
                            ...dayData,
                            subjectsStudied,
                            hasStudied: subjectsStudied.length > 0 || dayData.totalMins > 60
                          };
                        });

                        return (
                          <div className="space-y-4">
                            {/* STUDIED VS UNSTUDIED PERCENTAGE */}
                            <div className="bg-gradient-to-br from-[#12082f] via-[#0d0524] to-[#08021a] border border-purple-500/30 rounded-3xl p-5 shadow-xl space-y-4">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-500/20 pb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg border border-purple-400/40 shrink-0">
                                    📚
                                  </div>
                                  <div>
                                    <h4 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                                      <span>{isBadini ? "ڕێژا بابەتێن هاتینە خاندن و نەهاتینە خاندن" : "ڕێژەی بابەتە خوێندراو و نەخوێندراوەکان"}</span>
                                    </h4>
                                    <p className="text-xs text-purple-200/70 font-medium">
                                      {isBadini ? "پێشڤەچوونا گشتی یا پرۆگرامێ حەفتانە و بابەتێن مایین" : "پێشکەوتنی گشتی بەرنامەی هەفتانە و بابەتە ماوەکان"}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-sm">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    {studiedSubjects.length} / {allGrade12Subjects.length} {isBadini ? "بابەتێن خاندین" : "خوێندراو"}
                                  </span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <div className="bg-[#180d3d] border border-purple-500/20 rounded-2xl p-4 space-y-3">
                                  <div className="flex items-center justify-between text-xs font-extrabold">
                                    <span className="text-emerald-300 flex items-center gap-1.5">
                                      <span>✅</span>
                                      <span>{isBadini ? "بابەتێن هاتینە خاندن:" : "بابەتە خوێندراوەکان:"}</span>
                                      <span className="text-white font-black">({studiedSubjects.length} بابەت)</span>
                                    </span>
                                    <span className="text-emerald-300 text-sm font-black">{studiedPct}%</span>
                                  </div>
                                  <div className="w-full bg-purple-950/90 h-3 rounded-full overflow-hidden p-0.5 border border-purple-800/40">
                                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${studiedPct}%` }} />
                                  </div>
                                  <div className="flex flex-wrap gap-1.5 pt-1">
                                    {studiedSubjects.map((s) => (
                                      <span key={s.id} className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 flex items-center gap-1">
                                        <span>{s.icon}</span> {s.name}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div className="bg-[#180d3d] border border-rose-500/20 rounded-2xl p-4 space-y-3">
                                  <div className="flex items-center justify-between text-xs font-extrabold">
                                    <span className="text-rose-300 flex items-center gap-1.5">
                                      <span>⏳</span>
                                      <span>{isBadini ? "بابەتێن نەهاتینە خاندن (مایین):" : "بابەتە نەخوێندراوەکان:"}</span>
                                      <span className="text-white font-black">({unstudiedSubjects.length} بابەت)</span>
                                    </span>
                                    <span className="text-rose-300 text-sm font-black">{unstudiedPct}%</span>
                                  </div>
                                  <div className="w-full bg-purple-950/90 h-3 rounded-full overflow-hidden p-0.5 border border-purple-800/40">
                                    <div className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(244,63,94,0.5)]" style={{ width: `${unstudiedPct}%` }} />
                                  </div>
                                  <div className="flex flex-wrap gap-1.5 pt-1">
                                    {unstudiedSubjects.map((s) => (
                                      <span key={s.id} className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-200 flex items-center gap-1">
                                        <span>{s.icon}</span> {s.name}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* DAILY SUBJECT LOGS & DAYS WITH NO STUDY */}
                            <div className="bg-[#0f0729] border border-purple-500/25 rounded-3xl p-5 space-y-4 shadow-xl">
                              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-2xl bg-purple-900/70 border border-purple-400/40 flex items-center justify-center text-amber-300 text-lg shadow-md shrink-0">
                                    📅
                                  </div>
                                  <div>
                                    <h4 className="text-base sm:text-lg font-extrabold text-white">
                                      {isBadini ? "کاوێژا خاندنا بابەتان د ڕۆژێن حەفتیێ دا" : "کاتی خوێندنی بابەتەکان لە ڕۆژانی هەفتەدا"}
                                    </h4>
                                    <p className="text-xs text-purple-200/70 font-medium">
                                      {isBadini ? "دیارکرنا بابەتێن هاتینە خاندن د هەر ڕۆژەکێ دا دگەل دیارکرنا ڕۆژێن بێ خاندن" : "دیاریکردنی بابەتە خوێندراوەکان لە هەر ڕۆژێکدا لەگەڵ ڕۆژانی بێ خوێندن"}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                {dailySubjectBreakdown.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className={`rounded-2xl p-3.5 space-y-2 border transition-all ${
                                      item.hasStudied
                                        ? "bg-[#160c3b] border-purple-500/30 hover:border-purple-400/60 shadow-md"
                                        : "bg-[#1c0818] border-rose-500/40 shadow-rose-950/40"
                                    }`}
                                  >
                                    <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                                      <span className={`text-xs font-black flex items-center gap-1 ${item.isToday ? "text-amber-300" : "text-white"}`}>
                                        <span>{item.day}</span>
                                        {item.isToday && <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-extrabold">{isBadini ? "ئەڤرۆ" : "ئەمڕۆ"}</span>}
                                      </span>
                                      <span className={`text-xs font-extrabold ${item.hasStudied ? "text-purple-300" : "text-rose-400"}`}>
                                        {item.val}
                                      </span>
                                    </div>

                                    {item.hasStudied ? (
                                      <div className="space-y-1.5 pt-1">
                                        <span className="text-[10px] text-purple-200/60 font-bold block">{isBadini ? "بابەتێن هاتینە خاندن:" : "بابەتە خوێندراوەکان:"}</span>
                                        <div className="flex flex-wrap gap-1">
                                          {item.subjectsStudied.map((sub, sIdx) => (
                                            <span key={sIdx} className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-purple-900/60 border border-purple-500/30 text-purple-100 flex items-center gap-1">
                                              <span>{sub.icon}</span> {sub.name} <span className="text-amber-300 text-[9px]">({sub.time})</span>
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="py-2 text-center bg-rose-950/40 border border-rose-500/30 rounded-xl space-y-1">
                                        <span className="text-[11px] font-black text-rose-300 flex items-center justify-center gap-1">
                                          <span>❌</span> {isBadini ? "ڕۆژا بێ خاندن!" : "ڕۆژی بێ خوێندن!"}
                                        </span>
                                        <span className="text-[10px] text-rose-200/70 block">{isBadini ? "چ بابەت د ئەڤێ ڕۆژێ دا نەهاتیە خاندن" : "هیچ بابەتێک نەخوێندراوە"}</span>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* WEAKEST SUBJECT & QUIZ PERFORMANCE ANALYSIS */}
                            <div className="bg-gradient-to-br from-[#12082e] via-[#0b0421] to-[#060214] border border-amber-500/30 rounded-3xl p-5 space-y-4 shadow-xl">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-500/20 pb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 text-lg shadow-md shrink-0">
                                    🎯
                                  </div>
                                  <div>
                                    <h4 className="text-base sm:text-lg font-extrabold text-white">
                                      {isBadini ? "شیکاریا ئاستێ تاقیکرنان و لاوازترین بابەت" : "شیکاری ئاستی تاقیکردنەوەکان و بابەتە لاوازەکان"}
                                    </h4>
                                    <p className="text-xs text-purple-200/70 font-medium">
                                      {isBadini ? "دیارکرنا بابەتێ ئاست کێم د تاقیکرنان دا و ڕێنمایی بۆ باشترکرنێ" : "دیاریکردنی بابەتی لاواز لە تاقیکردنەوەکاندا و ڕێنمایی بەرزکردنەوەی"}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="bg-[#1e0a16] border border-rose-500/40 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg">
                                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-400/50 flex items-center justify-center text-2xl shrink-0 text-rose-400">
                                    🔴
                                  </div>
                                  <div>
                                    <span className="text-[10px] text-rose-300 font-extrabold uppercase tracking-wider block">{isBadini ? "لاوازترین ئاست د تاقیکرنان دا:" : "لاوازترین بابەت:"}</span>
                                    <h5 className="text-lg font-black text-white flex items-center gap-2">
                                      <span>{weakestSubject.icon}</span>
                                      <span>{weakestSubject.name}</span>
                                      <span className="text-rose-400 text-sm font-extrabold bg-rose-950/80 px-2 py-0.5 rounded-lg border border-rose-500/40">
                                        {weakestSubject.defaultScore}%
                                      </span>
                                    </h5>
                                    <p className="text-[11px] text-rose-200/70 font-medium mt-0.5">
                                      {isBadini ? "تەکیدێ بکە سەر چاره‌سەرکرنا پرسیارێن ئەڤی بابەتی" : "زیاتر تەرکیز بکەرە سەر ڕاهێنانی ئەم بابەتە"}
                                    </p>
                                  </div>
                                </div>

                                <div className="bg-[#081a12] border border-emerald-500/40 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg">
                                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-2xl shrink-0 text-emerald-400">
                                    🟢
                                  </div>
                                  <div>
                                    <span className="text-[10px] text-emerald-300 font-extrabold uppercase tracking-wider block">{isBadini ? "بەرزترین ئاست د تاقیکرنان دا:" : "بەرزترین بابەت:"}</span>
                                    <h5 className="text-lg font-black text-white flex items-center gap-2">
                                      <span>{strongestSubject.icon}</span>
                                      <span>{strongestSubject.name}</span>
                                      <span className="text-emerald-400 text-sm font-extrabold bg-emerald-950/80 px-2 py-0.5 rounded-lg border border-emerald-500/40">
                                        {strongestSubject.defaultScore}%
                                      </span>
                                    </h5>
                                    <p className="text-[11px] text-emerald-200/70 font-medium mt-0.5">
                                      {isBadini ? "ئاستەکێ نایاب! ئاستێ خۆ پارێزراو بهێلە" : "ئاستێکی نایاب! بەردەوام بە"}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-[#12082e] border border-purple-500/20 rounded-2xl p-4 space-y-2.5">
                                <h5 className="text-xs font-bold text-white/90 mb-2">{isBadini ? "ئاستێ هەمى بابەتان لدیڤ ئەنجامێن تاقیکرنان:" : "ئاستی سەرجەم بابەتەکان لە تاقیکردنەوەکاندا:"}</h5>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                  {allGrade12Subjects.map((s) => {
                                    const isWeak = s.defaultScore < 70;
                                    const isGood = s.defaultScore >= 85;

                                    return (
                                      <div key={s.id} className="bg-[#180d3d] border border-purple-500/20 rounded-xl p-2.5 space-y-1.5">
                                        <div className="flex items-center justify-between text-xs font-extrabold">
                                          <span className="text-white flex items-center gap-1.5">
                                            <span>{s.icon}</span> {s.name}
                                          </span>
                                          <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                                            isWeak
                                              ? "bg-rose-950/80 text-rose-300 border border-rose-500/40"
                                              : isGood
                                              ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                                              : "bg-amber-950/80 text-amber-300 border border-amber-500/40"
                                          }`}>
                                            {s.defaultScore}%
                                          </span>
                                        </div>
                                        <div className="w-full bg-purple-950 h-2 rounded-full overflow-hidden">
                                          <div
                                            className={`h-full rounded-full transition-all duration-700 ${
                                              isWeak ? "bg-rose-500" : isGood ? "bg-emerald-400" : "bg-amber-400"
                                            }`}
                                            style={{ width: `${s.defaultScore}%` }}
                                          />
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* NEW 5-DAY WEAK SUBJECT QUIZ CHALLENGE SECTION */}
                              {(() => {
                                const fiveDaysQuizData = [
                                  {
                                    day: 1,
                                    subjectId: "arabic",
                                    subjectName: isBadini ? "عەرەبی" : "عەرەبی",
                                    icon: "📖",
                                    mins: 10,
                                    topic: isBadini ? "ڕێزمان و یاسایێن زمانێ عەرەبی (النحو والبلاغة)" : "ڕێزمان و یاساکانی زمانی عەرەبی",
                                    badgeColor: "from-cyan-600 to-blue-600",
                                    questions: [
                                      {
                                        id: 1,
                                        question: "ما إعراب الفاعل في جملة: 'يَكْتُبُ الطَّالِبُ الدَّرْسَ'؟",
                                        options: ["مفعول به منصوب", "فاعل مرفوع وعلامة رفعه الضمة الظاهرة", "مبتدأ مؤخر", "خبر مرفوع"],
                                        correct: 1,
                                        explanation: "الكلمة 'الطَّالِبُ' هي من قام بالفعل (يَكْتُبُ) بالتالي تُعرب فاعلاً مرفوعاً وعلامة رفعه الضمة."
                                      },
                                      {
                                        id: 2,
                                        question: "ما هو جمع التكسير الصحيح لكلمة 'كِتَاب'؟",
                                        options: ["كُتَّاب", "كُتُب", "كِتَابَات", "أَلْوَاح"],
                                        correct: 1,
                                        explanation: "جمع التكسير القياسي لكلمة كِتَاب هو كُتُب."
                                      },
                                      {
                                        id: 3,
                                        question: "ما معنى 'الإيجاز' في البلاغة العربية؟",
                                        options: ["الإطالة والتكرار", "التعبير عن المعاني الكثيرة بألفاظ قليلة", "استخدام المحسنات فقط", "إهمال قواعد النحو"],
                                        correct: 1,
                                        explanation: "الإيجاز هو أداء المعنى الكثير باللفظ القليل مع الفصاحة."
                                      },
                                      {
                                        id: 4,
                                        question: "ما المرفوع دائماً من الأسماء التالية؟",
                                        options: ["المفعول به", "المجرور بالإضافة", "المبتدأ", "الحال"],
                                        correct: 2,
                                        explanation: "المبتدأ والخبر والفاعل والنائب عن الفاعل من المرفوعات دائماً."
                                      },
                                      {
                                        id: 5,
                                        question: "أين يقع الخبر في الجملة الاسمية البسيطة 'العِلْمُ نُورٌ'؟",
                                        options: ["العِلْمُ", "نُورٌ", "مستتر", "لا يوجد خبر"],
                                        correct: 1,
                                        explanation: "'نُورٌ' هو الخبر الذي يُتمم معنى الجملة مع المبتدأ العلم."
                                      }
                                    ]
                                  },
                                  {
                                    day: 2,
                                    subjectId: "math",
                                    subjectName: isBadini ? "بیرکاری" : "بیرکاری",
                                    icon: "📐",
                                    mins: 12,
                                    topic: isBadini ? "مشتقە و تەکامول و نەخشەیێن بیرکاریێ" : "مشتقە و تەکامول و نەخشەکانی بیرکاری",
                                    badgeColor: "from-emerald-600 to-teal-600",
                                    questions: [
                                      {
                                        id: 1,
                                        question: "مشتقەی دالەی f(x) = x³ - 5x + 7 بریتییە لە:",
                                        options: ["3x² - 5", "3x² + 5", "x² - 5", "3x - 5"],
                                        correct: 0,
                                        explanation: "بەگوێرەی یاسای مشتقە: d/dx(x³) = 3x² و d/dx(-5x) = -5 و مشتقەی نەگۆڕ 0 ە."
                                      },
                                      {
                                        id: 2,
                                        question: "تەکامولی ∫ (2x + 3) dx يساویا بە:",
                                        options: ["x² + 3x + C", "2x² + 3 + C", "x² + C", "2x + C"],
                                        correct: 0,
                                        explanation: "∫ 2x dx = x² و ∫ 3 dx = 3x بۆیە وەڵامی دروست x² + 3x + C یە."
                                      },
                                      {
                                        id: 3,
                                        question: "نرخەکانی x کە دەکەنە f(x) = x² - 9 = 0 بریتیین لە:",
                                        options: ["x = 3 فقط", "x = -3 و x = 3", "x = 0", "x = 9"],
                                        correct: 1,
                                        explanation: "x² = 9 ⟹ x = ±3."
                                      },
                                      {
                                        id: 4,
                                        question: "نهایت یا لیمیت lim (x→0) (sin(x) / x) یەکسانە بە:",
                                        options: ["0", "1", "∞", "دیارینەکراو"],
                                        correct: 1,
                                        explanation: "یاسای تیووریمی سەرەکی مثلثات لیمیتەکە دەکاتە 1."
                                      },
                                      {
                                        id: 5,
                                        question: "شێوەی ڕوونکردنەوەی هاوکێشەی y = x² چ جۆرە کەوانەیەکە؟",
                                        options: ["هێڵی ڕاست", "کەوانەی شەلجەمی (Parabola)", "بازنەیی", "سەربڕاو"],
                                        correct: 1,
                                        explanation: "هاوکێشەی پلە دووی y = ax² شێوەی Parabola یە."
                                      }
                                    ]
                                  },
                                  {
                                    day: 3,
                                    subjectId: "chemistry",
                                    subjectName: isBadini ? "کیمیا" : "کیمیا",
                                    icon: "🧪",
                                    mins: 10,
                                    topic: isBadini ? "کیمیا ئۆرگانیک و هاوکێشەیێن کیمیایی" : "کیمیای ئۆرگانیک و هاوکێشە کیمیاییەکان",
                                    badgeColor: "from-purple-600 to-pink-600",
                                    questions: [
                                      {
                                        id: 1,
                                        question: "ئاوێتە هايدرۆکاربۆنەکان لە چی پێکهاتوون؟",
                                        options: ["بارۆن و سۆدیۆم", "کاربۆن و هایدرۆجین", "ئۆکسجین و نایترۆجین", "گوگرد و فلۆر"],
                                        correct: 1,
                                        explanation: "هایدرۆکاربۆن لە سەدا سەد لە توخمی کاربۆن C و هایدرۆجین H پێکهاتووە."
                                      },
                                      {
                                        id: 2,
                                        question: "ژمارەی ئۆکساندنی ئۆکسجین لە زۆربەی ئاوێتەکاندا یەکسانە بە:",
                                        options: ["+1", "-2", "0", "-1"],
                                        correct: 1,
                                        explanation: "ژمارەی ئۆکساندنی ئاسایی ئۆکسجین لە کیمیادا -2 ە."
                                      },
                                      {
                                        id: 3,
                                        question: "نڕخی pH ی گیراوەیەکی ترش (Acidic) لە چ مەودایەکدایە؟",
                                        options: ["یەکسانە بە 7", "گەورەترە لە 7", "بچووکترە لە 7", "یەکسانە بە 14"],
                                        correct: 2,
                                        explanation: "ترشەکان pHیان لەژێر 7 دایە (pH < 7)."
                                      },
                                      {
                                        id: 4,
                                        question: "هاوکێشەی CH₄ + 2O₂ → CO₂ + 2H₂O جۆری چی کەرەکردنێکە؟",
                                        options: ["تێکچوون", "سووتان (Combustion)", "بێلایەنکردن", "نیشتن"],
                                        correct: 1,
                                        explanation: "کاردانەوەی هایدرۆکاربۆن لەگەڵ ئۆکسجین کە CO₂ و H₂O بەرهەم دەهێنێت کاردانەوەی سووتانە."
                                      },
                                      {
                                        id: 5,
                                        question: "بەستنەوەی کۆڤالانت (Covalent bond) لە ڕێگەی چییەوە دروست دەبێت؟",
                                        options: ["بەخشینی ئەلیکترۆن", "هاوبەشیکردنی جووتە ئەلیکترۆن", "بەستنەوەی ئایۆنی", "ڕاکێشانی بارەکان"],
                                        correct: 1,
                                        explanation: "بەستنی کۆڤالانت بریتییە لە هاوبەشیکردنی ئەلیکترۆنەکان لە نێوان دوو ئەتۆمدا."
                                      }
                                    ]
                                  },
                                  {
                                    day: 4,
                                    subjectId: "physics",
                                    subjectName: isBadini ? "فیزیا" : "فیزیا",
                                    icon: "⚡",
                                    mins: 10,
                                    topic: isBadini ? "یاسایێن نیوتن و تیشک و تۆرێن کارەبایی" : "یاساکانی نیوتن و تیشک و تۆڕە کارەباییەکان",
                                    badgeColor: "from-blue-600 to-indigo-600",
                                    questions: [
                                      {
                                        id: 1,
                                        question: "یاسای دووەمی نیوتن (F = m × a) پەیوەندی نێوان چی روون دەکاتەوە؟",
                                        options: ["هێز، بارستە و تاودان", "وزە و کات", "خێرایی و پەستان", "ڕووبەر و هێز"],
                                        correct: 0,
                                        explanation: "F هێزە، m بارستەیە، a تاودانە."
                                      },
                                      {
                                        id: 2,
                                        question: "یەکەی پێوانی بەرگری کارەبایی (Resistance) چییە؟",
                                        options: ["ڤۆڵت", "ئۆم (Ω)", "ئامپێر", "وات"],
                                        correct: 1,
                                        explanation: "بەرگری کارەبایی بە یەکەی ئۆم (Ohm) دەپێورێت."
                                      },
                                      {
                                        id: 3,
                                        question: "خێرایی ڕووناكی لە بۆشاییدا نێزیکەی چەندە؟",
                                        options: ["3 × 10⁸ m/s", "300,000 m/s", "1,000 m/s", "3 × 10⁶ m/s"],
                                        correct: 0,
                                        explanation: "c = 3 × 10⁸ m/s (یان 300,000 کیلومەتر لە چرکەیەکدا)."
                                      },
                                      {
                                        id: 4,
                                        question: "وزەی جوولە (Kinetic Energy) بە کام هاوکێشە دەدۆزرێتەوە؟",
                                        options: ["KE = m · g · h", "KE = ½ m v²", "KE = F · d", "KE = m · v"],
                                        correct: 1,
                                        explanation: "وزەی جووڵەی تەنێک یەکسانە بە نیوەی بارستە جارانی دووجای خێرایی (½ m v²)."
                                      },
                                      {
                                        id: 5,
                                        question: "تیشکی کارۆموگناتیسی خاوەن کورترین درێژی شەمۆل بریتییە لە:",
                                        options: ["تیشکی گاما (Gamma rays)", "تیشکی ڕادیۆ", "مایکرۆوەیڤ", "ژێر سوور"],
                                        correct: 0,
                                        explanation: "تیشکی گاما بەرزترین لەرەلەر و کورترین درێژی شەپۆلی هەیە."
                                      }
                                    ]
                                  },
                                  {
                                    day: 5,
                                    subjectId: "kurdish",
                                    subjectName: isBadini ? "کوردی" : "کوردی",
                                    icon: "📚",
                                    mins: 10,
                                    topic: isBadini ? "ڕێزمانا کوردی و ئەدەب و شاعیرێن کلاسیک" : "ڕێزمانی کوردی و ئەدەب و شاعیرانی کلاسیک",
                                    badgeColor: "from-rose-600 to-red-600",
                                    questions: [
                                      {
                                        id: 1,
                                        question: "جێناوی کەسی سەربەخۆ بۆ کەسی یەکەمی تاک بریتییە لە:",
                                        options: ["ئەوان", "من", "تۆ", "ئێمە"],
                                        correct: 1,
                                        explanation: "'من' جێناوی کەسی سەربەخۆی کەسی یەکەمی تاکە."
                                      },
                                      {
                                        id: 2,
                                        question: "هاوواتای وشەی 'وریا' چییە؟",
                                        options: ["هۆشیار / زانا", "تەمبەڵ", "خەوتوو", "خێرا"],
                                        correct: 0,
                                        explanation: "وریا واتە هۆشیار و ئاگادار."
                                      },
                                      {
                                        id: 3,
                                        question: "هاودژی وشەی 'تاریک' بریتییە لە:",
                                        options: ["ڕووناک / ڕۆشن", "ڕەش", "شین", "کەم"],
                                        correct: 0,
                                        explanation: "پێچەوانەی تاریک، ڕووناکە."
                                      },
                                      {
                                        id: 4,
                                        question: "شاعیری ناودار 'حاجی قادری کۆیی' بە چی دەناسرێتەوە؟",
                                        options: ["شاعیری نەتەوەیی و خەبات", "غەزەلسەرا", "چیرۆکنووس", "وەرگێڕ"],
                                        correct: 0,
                                        explanation: "حاجی قادری کۆیی داینەمۆی ڕابوون و هۆشیاری نەتەوەیی کورد بوو."
                                      },
                                      {
                                        id: 5,
                                        question: "لە ڕێزمانی کوردی، نیشانەی کۆ (Plural) لە دیالێکتی ناوەڕاستدا بریتییە لە:",
                                        options: ["-ان / -ەکان", "-ێک", "-م", "-ت"],
                                        correct: 0,
                                        explanation: "پاشگری -ان و -ەکان نیشانەی کۆبوونی ناون."
                                      }
                                    ]
                                  }
                                ];

                                const activeQuizData = activeWeakQuizDay ? fiveDaysQuizData.find(d => d.day === activeWeakQuizDay) : null;

                                return (
                                  <div className="space-y-4 pt-3 border-t border-purple-500/20">
                                    {/* 5-DAY WEAK SUBJECTS QUIZ CHALLENGE BANNER */}
                                    <div className="bg-gradient-to-br from-[#1b083b] via-[#12052b] to-[#090218] border border-amber-500/40 rounded-3xl p-5 space-y-4 shadow-2xl relative overflow-hidden">
                                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
                                        <div className="flex items-center gap-3">
                                          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white text-xl font-black shadow-lg border border-amber-300/40 shrink-0">
                                            📝
                                          </div>
                                          <div>
                                            <h4 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                                              <span>{isBadini ? "پڕۆگراما ٥ ڕۆژێن تاقیکرنێن بابەتێن لاواز" : "پڕۆگرامی ۵ ڕۆژی تاقیکردنەوەی بابەتە لاوازەکان"}</span>
                                              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full font-bold">
                                                {isBadini ? "بۆ بەرزکرنا ئاستی 🚀" : "بۆ بەرزکردنەوەی ئاست 🚀"}
                                              </span>
                                            </h4>
                                            <p className="text-xs text-purple-200/70 font-medium">
                                              {isBadini ? "هەر ٥ ڕۆژان تاقیکرنەکێ بکه د بابەتێن لاواز دا دا ئاستێ تە بەرز ببیتەڤە" : "هەر ۵ ڕۆژێک تاقیکردنەوەیەک لە بابەتە لاوازەکان بکە تا ئاستت بەرز ببێتەوە"}
                                            </p>
                                          </div>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                          <span className="text-xs font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 px-3 py-1 rounded-xl shadow-sm flex items-center gap-1.5">
                                            <span>🏆</span>
                                            <span>{Object.keys(weakQuizScores).length} / 5 {isBadini ? "تەمامکری" : "تەواوکراو"}</span>
                                          </span>
                                        </div>
                                      </div>

                                      {/* 5 DAYS CARDS GRID */}
                                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                                        {fiveDaysQuizData.map((quizDay) => {
                                          const scoreData = weakQuizScores[quizDay.day];
                                          const isCompleted = !!scoreData;

                                          return (
                                            <div
                                              key={quizDay.day}
                                              className={`rounded-2xl p-3.5 space-y-3 border flex flex-col justify-between transition-all ${
                                                isCompleted
                                                  ? "bg-[#0c2419] border-emerald-500/50 shadow-lg shadow-emerald-950/50"
                                                  : "bg-[#180e3b] border-purple-500/30 hover:border-amber-400/60 shadow-md"
                                              }`}
                                            >
                                              <div className="space-y-1.5">
                                                <div className="flex items-center justify-between">
                                                  <span className="text-[10px] font-extrabold text-amber-300 bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 rounded-md">
                                                    {isBadini ? `ڕۆژا ${quizDay.day}` : `ڕۆژی ${quizDay.day}`}
                                                  </span>
                                                  {isCompleted ? (
                                                    <span className="text-[10px] font-black text-emerald-300 bg-emerald-950/90 border border-emerald-500/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                                                      <span>✅</span> {scoreData.score}/{scoreData.total}
                                                    </span>
                                                  ) : (
                                                    <span className="text-[10px] font-bold text-purple-300/80 bg-purple-950/60 px-2 py-0.5 rounded-md">
                                                      {quizDay.mins} {isBadini ? "خولەک" : "خولەک"}
                                                    </span>
                                                  )}
                                                </div>

                                                <div>
                                                  <h5 className="text-sm font-black text-white flex items-center gap-1.5 mt-1">
                                                    <span>{quizDay.icon}</span>
                                                    <span>{quizDay.subjectName}</span>
                                                  </h5>
                                                  <p className="text-[11px] text-purple-200/70 line-clamp-2 mt-1 font-medium">
                                                    {quizDay.topic}
                                                  </p>
                                                </div>
                                              </div>

                                              <button
                                                type="button"
                                                onClick={() => {
                                                  setActiveWeakQuizDay(quizDay.day);
                                                  setUserSelectedAnswers({});
                                                  setIsQuizSubmitted(false);
                                                }}
                                                className={`w-full py-2 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition shadow-md ${
                                                  isCompleted
                                                    ? "bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/50"
                                                    : "bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white shadow-amber-900/40"
                                                }`}
                                              >
                                                <span>{isCompleted ? "دووبارەکرنەوە 🔄" : "بەشداریکرن د تاقیکرنێ دا 🚀"}</span>
                                              </button>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>

                                    {/* INTERACTIVE QUIZ MODAL */}
                                    {activeQuizData && (
                                      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
                                        <div className="bg-[#12072b] border border-amber-500/40 rounded-3xl max-w-2xl w-full p-4 sm:p-6 space-y-5 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto">
                                          {/* Modal Header */}
                                          <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
                                            <div className="flex items-center gap-3">
                                              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl shrink-0 text-amber-300">
                                                {activeQuizData.icon}
                                              </div>
                                              <div>
                                                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                                                  <span>{isBadini ? `تاقیکرنا ڕۆژا ${activeQuizData.day}: ${activeQuizData.subjectName}` : `تاقیکردنەوەی ڕۆژی ${activeQuizData.day}: ${activeQuizData.subjectName}`}</span>
                                                </h3>
                                                <p className="text-xs text-purple-200/70 font-medium">
                                                  {activeQuizData.topic}
                                                </p>
                                              </div>
                                            </div>

                                            <button
                                              type="button"
                                              onClick={() => setActiveWeakQuizDay(null)}
                                              className="w-8 h-8 rounded-full bg-purple-900/50 hover:bg-purple-800 text-purple-200 flex items-center justify-center text-sm font-bold transition"
                                            >
                                              ✕
                                            </button>
                                          </div>

                                          {/* Score Header Banner if submitted */}
                                          {isQuizSubmitted && (
                                            <div className="bg-gradient-to-r from-emerald-950 via-[#0a2e1d] to-teal-950 border border-emerald-500/50 rounded-2xl p-4 text-center space-y-2 shadow-lg">
                                              <span className="text-3xl font-black text-emerald-300 block animate-bounce">
                                                🎉 {Math.round((Object.keys(userSelectedAnswers).filter(k => userSelectedAnswers[Number(k)] === activeQuizData.questions[Number(k)].correct).length / activeQuizData.questions.length) * 100)}%
                                              </span>
                                              <h4 className="text-base font-extrabold text-white">
                                                {isBadini ? "تەکید و بەرسڤدانا تە ب سەرکەفتن هاتە ئەنجامدان!" : "وەڵامدانەوەکەت بە سەرکەوتوویی تەواو بوو!"}
                                              </h4>
                                              <p className="text-xs text-emerald-200/80 font-medium">
                                                {isBadini ? `ئاستێ تە د بابەتی ${activeQuizData.subjectName} دا +15% بەرزتر لێهات! 🚀` : `ئاستت لە بابەتی ${activeQuizData.subjectName} دابەرزتر بووەوە! 🚀`}
                                              </p>
                                            </div>
                                          )}

                                          {/* Questions List */}
                                          <div className="space-y-5">
                                            {activeQuizData.questions.map((q, qIdx) => {
                                              const selectedOpt = userSelectedAnswers[qIdx];
                                              const isAnswered = selectedOpt !== undefined;

                                              return (
                                                <div key={q.id} className="bg-[#180c3b] border border-purple-500/30 rounded-2xl p-4 space-y-3">
                                                  <div className="flex items-start gap-2.5">
                                                    <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 font-black text-xs flex items-center justify-center shrink-0 border border-amber-400/30 mt-0.5">
                                                      {qIdx + 1}
                                                    </span>
                                                    <h5 className="text-sm font-bold text-white leading-relaxed">
                                                      {q.question}
                                                    </h5>
                                                  </div>

                                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                                    {q.options.map((opt, optIdx) => {
                                                      const isSelected = selectedOpt === optIdx;
                                                      const isCorrect = optIdx === q.correct;
                                                      
                                                      let btnClass = "bg-[#110729] border-purple-500/20 text-purple-100 hover:border-purple-400/50";
                                                      if (isQuizSubmitted) {
                                                        if (isCorrect) {
                                                          btnClass = "bg-emerald-950/80 border-emerald-500/80 text-emerald-200 font-extrabold shadow-emerald-900/40 shadow-sm";
                                                        } else if (isSelected && !isCorrect) {
                                                          btnClass = "bg-rose-950/80 border-rose-500/80 text-rose-200 font-bold";
                                                        }
                                                      } else if (isSelected) {
                                                        btnClass = "bg-amber-500/25 border-amber-400/80 text-white font-black shadow-md";
                                                      }

                                                      return (
                                                        <button
                                                          key={optIdx}
                                                          type="button"
                                                          disabled={isQuizSubmitted}
                                                          onClick={() => {
                                                            setUserSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
                                                          }}
                                                          className={`p-3 rounded-xl text-xs text-right border transition-all flex items-center justify-between gap-2 ${btnClass}`}
                                                        >
                                                          <span className="leading-relaxed">{opt}</span>
                                                          {isQuizSubmitted && isCorrect && <span className="text-emerald-400 font-extrabold">✓</span>}
                                                          {isQuizSubmitted && isSelected && !isCorrect && <span className="text-rose-400 font-extrabold">✕</span>}
                                                        </button>
                                                      );
                                                    })}
                                                  </div>

                                                  {isQuizSubmitted && (
                                                    <div className="bg-purple-950/50 border border-purple-500/20 rounded-xl p-2.5 text-xs text-purple-200/90 space-y-1">
                                                      <span className="font-extrabold text-amber-300 block">{isBadini ? "ڕوونکردنەوە و چاره‌سەر:" : "ڕوونکردنەوە و شیکار:"}</span>
                                                      <p className="font-medium text-[11px] leading-relaxed">{q.explanation}</p>
                                                    </div>
                                                  )}
                                                </div>
                                              );
                                            })}
                                          </div>

                                          {/* Modal Actions */}
                                          <div className="flex items-center justify-between border-t border-purple-500/30 pt-3">
                                            <button
                                              type="button"
                                              onClick={() => setActiveWeakQuizDay(null)}
                                              className="px-4 py-2 rounded-xl bg-purple-900/40 hover:bg-purple-900/70 text-purple-200 font-bold text-xs border border-purple-500/30 transition"
                                            >
                                              {isBadini ? "داخستن" : "داخستن"}
                                            </button>

                                            {!isQuizSubmitted ? (
                                              <button
                                                type="button"
                                                disabled={Object.keys(userSelectedAnswers).length === 0}
                                                onClick={() => {
                                                  let score = 0;
                                                  activeQuizData.questions.forEach((q, idx) => {
                                                    if (userSelectedAnswers[idx] === q.correct) {
                                                      score++;
                                                    }
                                                  });
                                                  const total = activeQuizData.questions.length;
                                                  const percentage = Math.round((score / total) * 100);
                                                  const newRecord = {
                                                    score,
                                                    total,
                                                    percentage,
                                                    completedAt: new Date().toLocaleDateString()
                                                  };
                                                  setWeakQuizScores(prev => ({
                                                    ...prev,
                                                    [activeQuizData.day]: newRecord
                                                  }));
                                                  setIsQuizSubmitted(true);
                                                  showToast(isBadini ? `پیرۆزە! تە ${score}/${total} بەرسڤێن ڕاست دان 🎯` : `پیرۆزە! ${score}/${total} وەڵامی ڕاستت دایەوە 🎯`);
                                                }}
                                                className={`px-6 py-2.5 rounded-xl font-black text-xs transition shadow-lg ${
                                                  Object.keys(userSelectedAnswers).length > 0
                                                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-emerald-900/40 cursor-pointer"
                                                    : "bg-purple-900/40 text-purple-400 cursor-not-allowed border border-purple-800/40"
                                                }`}
                                              >
                                                {isBadini ? "ناردنا ئەنجامی و تەمامکرن 🎯" : "ناردنی وەڵامەکان و تەواوکردن 🎯"}
                                              </button>
                                            ) : (
                                              <button
                                                type="button"
                                                onClick={() => setActiveWeakQuizDay(null)}
                                                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition shadow-lg shadow-emerald-900/40"
                                              >
                                                {isBadini ? "گەڕیان بۆ پڕۆگرامی 🚀" : "گەڕانەوە بۆ پڕۆگرام 🚀"}
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })()}
                            </div>
                          </div>
                        );
                      })()}

                      {/* GRADE 12 WEEKLY SUBJECT BREAKDOWN GRID */}
                      <div className="bg-[#0f0729] border border-purple-500/25 rounded-2xl p-4 sm:p-5 space-y-4 shadow-lg">
                        <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-purple-900/60 border border-purple-400/30 flex items-center justify-center text-purple-300">
                              <BookOpen className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-sm sm:text-base font-extrabold text-white">
                                {isBadini ? "دابەشبوونا حەفتانە یا بابەتێن پۆلا ١٢" : "دابەشبوونی هەفتانەی بابەتەکانی پۆلی ١٢"}
                              </h4>
                              <p className="text-[11px] text-purple-200/60 font-medium">
                                {isBadini ? "ڕێژە و کاتژمێرێن خویندنا هەر بابەتەکی د ئەڤ حەفتییە دا" : "ڕێژە و کاتی خوێندنی هر بابەتێک لەم هەفتەیەدا"}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2.5 py-1 rounded-xl">
                            7 {isBadini ? "بابەت" : "بابەت"}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {[
                            { id: "physics", name: isBadini ? "فیزیا" : "فیزیا", hrs: "5.5", pct: 28, color: "from-blue-600 to-indigo-500", icon: "⚡" },
                            { id: "chemistry", name: isBadini ? "کیمیا" : "کیمیا", hrs: "4.0", pct: 20, color: "from-purple-600 to-pink-500", icon: "🧪" },
                            { id: "math", name: isBadini ? "بیرکاری" : "بیرکاری", hrs: "4.5", pct: 23, color: "from-emerald-600 to-teal-500", icon: "📐" },
                            { id: "biology", name: isBadini ? "زیندەوەر" : "ژینناسی", hrs: "3.0", pct: 15, color: "from-amber-600 to-yellow-500", icon: "🧬" },
                            { id: "kurdish", name: isBadini ? "کوردی" : "کوردی", hrs: "1.5", pct: 8, color: "from-rose-600 to-red-500", icon: "📚" },
                            { id: "arabic", name: isBadini ? "عەرەبی" : "عەرەبی", hrs: "1.0", pct: 5, color: "from-cyan-600 to-blue-500", icon: "📖" },
                            { id: "islamic", name: isBadini ? "ئاین" : "پەروەردەی ئیسلامی", hrs: "0.5", pct: 3, color: "from-teal-600 to-emerald-500", icon: "🌙" },
                          ].map((subj) => (
                            <div key={subj.id} className="bg-[#150a36] border border-purple-500/20 rounded-xl p-3 space-y-2 hover:border-purple-400/40 transition">
                              <div className="flex items-center justify-between text-xs font-bold">
                                <span className="text-white flex items-center gap-1.5">
                                  <span>{subj.icon}</span>
                                  <span>{subj.name}</span>
                                </span>
                                <span className="text-purple-300 font-mono">{subj.hrs}h ({subj.pct}%)</span>
                              </div>
                              <div className="w-full bg-purple-950/80 h-2 rounded-full overflow-hidden">
                                <div className={`h-full bg-gradient-to-r ${subj.color} rounded-full transition-all duration-700`} style={{ width: `${subj.pct}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* MIDDLE ROW (FOCUS TIME BAR CHART & FOCUS VS BREAK DONUT CHART) */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* FOCUS TIME (THIS WEEK) BAR CHART (2/3 WIDTH) */}
                        <div className="lg:col-span-2 bg-[#130b2c]/90 border border-purple-500/20 rounded-2xl p-5 flex flex-col justify-between shadow-lg min-h-[250px]">
                          <h4 className="text-white font-medium text-sm sm:text-base mb-2">
                            {isBadini ? "دەمێ تەرکیزێ (ئەڤ حەفتییە)" : "کاتی تەرکیز (ئەم هەفتەیە)"}
                          </h4>

                          <div className="relative w-full h-44 flex items-end justify-between pt-8 pb-6 px-4">
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-white/30 text-[11px] font-mono">
                              <div className="border-b border-purple-500/10 w-full flex items-center justify-between pb-1">
                                <span>4h</span>
                              </div>
                              <div className="border-b border-purple-500/10 w-full flex items-center justify-between pb-1">
                                <span>3h</span>
                              </div>
                              <div className="border-b border-purple-500/10 w-full flex items-center justify-between pb-1">
                                <span>2h</span>
                              </div>
                              <div className="border-b border-purple-500/10 w-full flex items-center justify-between pb-1">
                                <span>1h</span>
                              </div>
                              <div className="border-b border-purple-500/10 w-full flex items-center justify-between pb-1">
                                <span>0h</span>
                              </div>
                            </div>

                            {weekDayData.map((item, idx) => {
                              const isActive = idx === selectedWeekDayIndex;
                              const barHeightPct = Math.min(100, Math.max(15, Math.round((item.totalMins / maxMins) * 100)));

                              return (
                                <div
                                  key={idx}
                                  onClick={() => setSelectedWeekDayIndex(idx)}
                                  onMouseEnter={() => setSelectedWeekDayIndex(idx)}
                                  className="relative z-10 flex flex-col items-center flex-1 h-full justify-end group cursor-pointer"
                                >
                                  {isActive && (
                                    <div className="absolute -top-7 bg-[#1c123b] border border-purple-400/50 text-white rounded-xl px-2.5 py-1 text-[11px] font-bold shadow-2xl flex flex-col items-center pointer-events-none z-20 animate-fadeIn">
                                      <span className="text-white/60 text-[10px] block leading-none">{item.day}</span>
                                      <span className="text-white font-extrabold">{item.val}</span>
                                    </div>
                                  )}

                                  <div
                                    className={`w-6 sm:w-8 rounded-t-xl transition-all duration-300 relative ${
                                      isActive
                                        ? "bg-gradient-to-t from-purple-700 via-purple-500 to-indigo-400 shadow-[0_0_15px_rgba(168,85,247,0.6)]"
                                        : "bg-purple-600/70 hover:bg-purple-500/90"
                                    }`}
                                    style={{ height: `${barHeightPct}%` }}
                                  >
                                    {isActive && (
                                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#fff]" />
                                    )}
                                  </div>

                                  <span className={`text-[11px] mt-2 font-medium truncate max-w-full transition-colors ${isActive ? "text-white font-bold" : "text-white/60 group-hover:text-white/90"}`}>
                                    {item.day}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* FOCUS VS BREAK DONUT CHART (1/3 WIDTH) */}
                        {(() => {
                          const totalFocusMinsFromLogs = sessionLogs
                            .filter((log) => log.type === "focus")
                            .reduce((acc, log) => acc + log.durationMinutes, 0);

                          const totalBreakMinsFromLogs = sessionLogs
                            .filter((log) => log.type === "shortBreak" || log.type === "longBreak")
                            .reduce((acc, log) => acc + log.durationMinutes, 0);

                          const calcFocusMins = totalFocusMinsFromLogs > 0
                            ? totalFocusMinsFromLogs
                            : (focusCount * (durations.pomodoro || 25));

                          const calcBreakMins = totalBreakMinsFromLogs > 0
                            ? totalBreakMinsFromLogs
                            : ((shortBreakCount * (durations.shortBreak || 5)) + (longBreakCount * (durations.longBreak || 15)));

                          const totalCombined = Math.max(1, calcFocusMins + calcBreakMins);
                          const focusPct = Math.round((calcFocusMins / totalCombined) * 100);
                          const breakPct = 100 - focusPct;

                          const fmtTime = (mins: number) => {
                            const h = Math.floor(mins / 60);
                            const m = mins % 60;
                            if (h > 0 && m > 0) return `${h}h ${m}m`;
                            if (h > 0) return `${h}h`;
                            return `${m}m`;
                          };

                          return (
                            <div className="bg-[#130b2c]/90 border border-purple-500/20 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
                              <h4 className="text-white font-medium text-sm sm:text-base mb-2">
                                {isBadini ? "تەرکیز بەراورد ب بێنڤەدانێ" : "تەرکیز بەراورد بە بێناوه‌دان"}
                              </h4>

                              <div className="flex items-center justify-between my-2 gap-2">
                                <div className="relative w-28 h-28 shrink-0 flex items-center justify-center rounded-full bg-purple-950/20 shadow-[0_0_20px_rgba(168,85,247,0.15)] p-1 border border-purple-500/20">
                                  <svg className="w-full h-full -rotate-90 transform overflow-visible" viewBox="0 0 36 36">
                                    <path
                                      className="text-blue-500 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)] transition-all duration-1000 ease-out"
                                      strokeWidth="4.5"
                                      strokeDasharray="100, 100"
                                      strokeDashoffset="0"
                                      stroke="currentColor"
                                      fill="none"
                                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path
                                      className="text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.7)] transition-all duration-1000 ease-out"
                                      strokeWidth="4.5"
                                      strokeDasharray={`${focusPct}, 100`}
                                      strokeDashoffset="0"
                                      strokeLinecap="round"
                                      stroke="currentColor"
                                      fill="none"
                                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex flex-col items-center justify-center font-black text-white pointer-events-none rounded-full">
                                    <span className="text-sm tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{focusPct}%</span>
                                    <span className="text-[9px] text-purple-300/80 font-bold uppercase">{isBadini ? "تەرکیز" : "Focus"}</span>
                                  </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                  <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)] shrink-0" />
                                    <div>
                                      <span className="text-white/90 text-xs font-semibold block">{isBadini ? "دەمێ تەرکیزێ" : "کاتی تەرکیز"}</span>
                                      <span className="text-purple-300 text-[11px] font-bold">{focusPct}% ({fmtTime(calcFocusMins)})</span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] shrink-0" />
                                    <div>
                                      <span className="text-white/90 text-xs font-semibold block">{isBadini ? "دەمێ بێنڤەدانێ" : "کاتی بێناوه‌دان"}</span>
                                      <span className="text-blue-300 text-[11px] font-bold">{breakPct}% ({fmtTime(calcBreakMins)})</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <span className="text-white/40 text-xs font-medium mt-auto">
                                {isBadini ? "ئامارا بەردەوام یا ژدیڤچوونێ" : "Real-time tracker"}
                              </span>
                            </div>
                          );
                        })()}
                      </div>

                      {/* BOTTOM ROW (DAILY & WEEKLY ACTIVITY PERFORMANCE CHART) */}
                      <div className="pt-2">
                        <div className="bg-[#0d0622] border border-purple-500/25 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-6">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-purple-500/15 pb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-2xl bg-purple-900/70 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                                <Calendar className="w-6 h-6 text-amber-300" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                                    {isBadini ? "چالاکیا ڕۆژانە و حەفتیانە" : "چالاکی ڕۆژانە و هەفتانە"}
                                  </h4>
                                  <button
                                    onClick={() => setShowActivityHelpModal(true)}
                                    className="w-7 h-7 rounded-full bg-purple-900/60 hover:bg-purple-800 border border-purple-500/40 text-purple-300 hover:text-white flex items-center justify-center transition active:scale-95 group relative"
                                    title={isBadini ? "ڕوونکرن" : "زانیاری"}
                                  >
                                    <HelpCircle className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <p className="text-xs sm:text-sm text-purple-200/70 font-medium leading-tight mt-0.5">
                                  {isBadini
                                    ? "نەخشەیێ ڕوون یێ ئاستێ دەمێ خویندنێ و تەرکیزێ د ڕۆژێن حەفتیێ دا"
                                    : "نەخشەی روونی ئاستی کاتی خوێندن و تەرکیز لە ڕۆژەکانی هەفتەدا"}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                              <div className="bg-[#180b38] border border-purple-500/30 px-3 py-1.5 rounded-2xl flex items-center gap-2 shrink-0">
                                <Clock className="w-4 h-4 text-purple-400" />
                                <div>
                                  <span className="text-[10px] text-purple-300/70 block font-semibold">{isBadini ? "کۆمێ سەعەتا" : "کۆی کات"}</span>
                                  <span className="text-xs font-black text-white">{(totalWeekMins / 60).toFixed(1)} {isBadini ? "ش" : "کاتژمێر"}</span>
                                </div>
                              </div>
                              <div className="bg-[#180b38] border border-purple-500/30 px-3 py-1.5 rounded-2xl flex items-center gap-2 shrink-0">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                <div>
                                  <span className="text-[10px] text-purple-300/70 block font-semibold">{isBadini ? "سێشنێن تەمامکری" : "تەواوکراو"}</span>
                                  <span className="text-xs font-black text-white">{totalWeekSessions} {isBadini ? "سێشن" : "سیستەم"}</span>
                                </div>
                              </div>
                              <div className="bg-[#180b38] border border-amber-500/30 px-3 py-1.5 rounded-2xl flex items-center gap-2 shrink-0">
                                <Zap className="w-4 h-4 text-amber-300" />
                                <div>
                                  <span className="text-[10px] text-amber-300/70 block font-semibold">{isBadini ? "ڕێژە" : "ڕێژە"}</span>
                                  <span className="text-xs font-black text-amber-300">92%</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-[#080217] border border-purple-500/20 rounded-2xl p-4 sm:p-6 shadow-inner">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-2">
                                <BarChart2 className="w-4 h-4 text-purple-400" />
                                {isBadini ? "دەمێ خویندنا خولەکان (ل سەر ڕۆژێن حەفتیێ)" : "کاتی خوێندن (لە هەفتەدا)"}
                              </span>
                              <span className="text-[11px] text-purple-300/70 bg-purple-900/40 px-2.5 py-1 rounded-xl border border-purple-500/20 font-bold">
                                {isBadini ? "ئاستێ ڕۆژانە" : "ئاستی ڕۆژانە"}
                              </span>
                            </div>

                            <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-48 sm:h-56 pt-12 pb-2 px-1 border-b border-purple-900/40">
                              {weekDayData.map((item, idx) => {
                                const barPct = Math.min(100, Math.max(15, Math.round((item.totalMins / maxMins) * 100)));
                                const isActive = idx === selectedWeekDayIndex;

                                return (
                                  <div
                                    key={idx}
                                    onClick={() => setSelectedWeekDayIndex(idx)}
                                    onMouseEnter={() => setSelectedWeekDayIndex(idx)}
                                    className="flex flex-col items-center h-full justify-end group relative cursor-pointer"
                                  >
                                    <div className="absolute -top-11 left-1/2 -translate-x-1/2 bg-[#180838] border border-purple-400/80 text-white rounded-xl px-2.5 py-1.5 text-[11px] font-extrabold shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-40 whitespace-nowrap flex flex-col items-center drop-shadow-xl">
                                      <span className="text-purple-200">{item.day}: {item.hours} {isBadini ? "سەعەت" : "کاتژمێر"}</span>
                                      <span className="text-[10px] text-amber-300 font-bold">{item.sessions} {isBadini ? "سێشنێن تەرکیزێ" : "سێشن"}</span>
                                    </div>

                                    <span className={`text-[10px] sm:text-xs font-black mb-1 transition-transform group-hover:scale-110 ${item.isToday || isActive ? "text-amber-300" : "text-purple-200/90"}`}>
                                      {item.hours}h
                                    </span>

                                    <div className="w-full max-w-[32px] sm:max-w-[42px] bg-purple-950/40 rounded-t-xl overflow-hidden p-0.5 flex flex-col justify-end h-full border border-purple-800/30">
                                      <div
                                        style={{ height: `${barPct}%` }}
                                        className={`w-full rounded-t-lg transition-all duration-500 group-hover:brightness-125 ${
                                          item.isToday || isActive
                                            ? "bg-gradient-to-t from-purple-700 via-purple-500 to-amber-300 shadow-[0_0_15px_rgba(252,211,77,0.5)]"
                                            : "bg-gradient-to-t from-purple-900 via-purple-600 to-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                                        }`}
                                      />
                                    </div>

                                    <span className={`text-[10px] sm:text-xs font-bold mt-2 truncate max-w-full ${item.isToday || isActive ? "text-amber-300 font-black" : "text-white/70"}`}>
                                      {item.day}
                                    </span>

                                    {item.isToday && (
                                      <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1 py-0.5 rounded font-black mt-0.5">
                                        {isBadini ? "ئەڤرۆ" : "ئەمڕۆ"}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            <div className="mt-5 pt-3">
                              <h5 className="text-xs sm:text-sm font-bold text-white/90 mb-3 flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-purple-400" />
                                {isBadini ? "دابەشکرنا دەمێن خویندنێ ژ ڕۆژێ دناڤبەرا کاتان دا:" : "دابەشبوونی کاتی خوێندن لە ڕۆژدا:"}
                              </h5>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                <div className="bg-[#12072e] border border-purple-500/20 rounded-xl p-2.5 space-y-1.5">
                                  <div className="flex items-center justify-between text-[11px] font-bold">
                                    <span className="text-purple-200/80 flex items-center gap-1">
                                      🌅 {isBadini ? "سپێدێ" : "بەیانی"}
                                    </span>
                                    <span className="text-amber-300">40%</span>
                                  </div>
                                  <div className="w-full bg-purple-950 h-2 rounded-full overflow-hidden">
                                    <div className="bg-gradient-to-r from-purple-600 to-amber-300 h-full w-[40%] rounded-full" />
                                  </div>
                                  <span className="text-[10px] text-white/40 block font-mono">08:00 - 12:00</span>
                                </div>

                                <div className="bg-[#12072e] border border-purple-500/20 rounded-xl p-2.5 space-y-1.5">
                                  <div className="flex items-center justify-between text-[11px] font-bold">
                                    <span className="text-purple-200/80 flex items-center gap-1">
                                      ☀️ {isBadini ? "نیڤڕو" : "نیوەڕۆ"}
                                    </span>
                                    <span className="text-purple-300">30%</span>
                                  </div>
                                  <div className="w-full bg-purple-950 h-2 rounded-full overflow-hidden">
                                    <div className="bg-gradient-to-r from-purple-600 to-purple-400 h-full w-[30%] rounded-full" />
                                  </div>
                                  <span className="text-[10px] text-white/40 block font-mono">12:00 - 16:00</span>
                                </div>

                                <div className="bg-[#12072e] border border-purple-500/20 rounded-xl p-2.5 space-y-1.5">
                                  <div className="flex items-center justify-between text-[11px] font-bold">
                                    <span className="text-purple-200/80 flex items-center gap-1">
                                      🌆 {isBadini ? "ئێڤاری" : "ئێوارە"}
                                    </span>
                                    <span className="text-purple-300">20%</span>
                                  </div>
                                  <div className="w-full bg-purple-950 h-2 rounded-full overflow-hidden">
                                    <div className="bg-gradient-to-r from-purple-700 to-purple-500 h-full w-[20%] rounded-full" />
                                  </div>
                                  <span className="text-[10px] text-white/40 block font-mono">16:00 - 20:00</span>
                                </div>

                                <div className="bg-[#12072e] border border-purple-500/20 rounded-xl p-2.5 space-y-1.5">
                                  <div className="flex items-center justify-between text-[11px] font-bold">
                                    <span className="text-purple-200/80 flex items-center gap-1">
                                      🌙 {isBadini ? "شەڤێ" : "شەو"}
                                    </span>
                                    <span className="text-blue-300">10%</span>
                                  </div>
                                  <div className="w-full bg-purple-950 h-2 rounded-full overflow-hidden">
                                    <div className="bg-gradient-to-r from-blue-700 to-blue-500 h-full w-[10%] rounded-full" />
                                  </div>
                                  <span className="text-[10px] text-white/40 block font-mono">20:00 - 00:00</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                            <div className="bg-[#09031a] border border-purple-500/20 rounded-2xl p-4 flex items-center gap-3.5 shadow-md">
                              <div className="w-12 h-12 rounded-2xl bg-purple-900/60 border border-purple-500/40 flex items-center justify-center text-2xl shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                                🤖
                              </div>
                              <div>
                                <h5 className="text-purple-300 font-extrabold text-xs sm:text-sm">
                                  {isBadini ? "ئامۆژگاری" : "ئامۆژگاری"}
                                </h5>
                                <p className="text-[11px] sm:text-xs text-white/70 leading-snug mt-0.5">
                                  {isBadini ? "هەوڵ بدە کاتژمێرێن خوێندنا خۆ یا ئاست بەرز زیاد بکەی بۆ دەستڤەئینانا باشترین ئەنجام! 🔥" : "هەوڵ بدە کاتژمێرەکانی خوێندنت بەرز بکەیتەوە بۆ باشترین ئەنجام! 🔥"}
                                </p>
                              </div>
                            </div>

                            <div className="bg-[#09031a] border border-purple-500/20 rounded-2xl p-4 flex items-center gap-3.5 shadow-md">
                              <div className="w-12 h-12 rounded-2xl bg-purple-900/60 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                                <Target className="w-6 h-6 text-purple-300" />
                              </div>
                              <div>
                                <h5 className="text-purple-300 font-extrabold text-xs sm:text-sm">
                                  {isBadini ? "ئارمانج" : "ئامانج"}
                                </h5>
                                <p className="text-[11px] sm:text-xs text-white/70 leading-snug mt-0.5">
                                  {isBadini ? "تەرکیزا زیاتر = پێشکەوتنا زیاتر. بەردەوام بە دا بگەهیە ئارمانجێن خۆ!" : "تەرکیزی زیاتر = پێشکەوتنی زیاتر. بەردەوام بە!"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                  {statsPeriod === "month" && (
                    /* MONTH VIEW */
                    <div className="space-y-5">

                      {/* TOP METRICS ROW (3 CARDS GRID) */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        {/* 1. TOTAL FOCUS TIME */}
                        <div className="relative overflow-hidden bg-[#130b2c]/90 border border-purple-500/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-lg min-h-[135px]">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-purple-900/60 border border-purple-500/50 flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.4)] text-purple-300">
                              <Clock className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-white/70 font-semibold text-xs sm:text-sm">
                              {isBadini ? "سەرجەمێ دەمێ تەرکیزێ" : "کۆی کاتی تەرکیز"}
                            </span>
                          </div>
                          <div className="text-2xl sm:text-3xl font-extrabold text-white my-1 tracking-tight">
                            52h 30m
                          </div>
                          <div className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                            <span>▲ 22%</span>
                            <span className="text-emerald-400/80 font-normal">{isBadini ? "بەراورد ب هەیڤا بۆری" : "بەراورد بە مانگی پێشوو"}</span>
                          </div>
                        </div>

                        {/* 2. SESSIONS */}
                        <div className="relative overflow-hidden bg-[#130b2c]/90 border border-purple-500/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-lg min-h-[135px]">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-purple-900/60 border border-purple-500/50 flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.4)] text-purple-300">
                              <Target className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-white/70 font-semibold text-xs sm:text-sm">
                              {isBadini ? "خولێن پۆمۆدۆرۆ" : "خولەکانی پۆمۆدۆرۆ"}
                            </span>
                          </div>
                          <div className="text-2xl sm:text-3xl font-extrabold text-white my-1 tracking-tight">
                            128
                          </div>
                          <div className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                            <span>▲ 27%</span>
                            <span className="text-emerald-400/80 font-normal">{isBadini ? "بەراورد ب هەیڤا بۆری" : "بەراورد بە مانگی پێشوو"}</span>
                          </div>
                        </div>

                        {/* 3. PRODUCTIVITY */}
                        <div className="relative overflow-hidden bg-[#130b2c]/90 border border-purple-500/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-lg min-h-[135px]">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-orange-900/60 border border-orange-500/50 flex items-center justify-center text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.4)]">
                              <Flame className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-white/70 font-semibold text-xs sm:text-sm">
                              {isBadini ? "نمرەیا بەرهەمداریێ" : "نمرەی بەرهەمداری"}
                            </span>
                          </div>
                          <div className="text-2xl sm:text-3xl font-extrabold text-white my-1 tracking-tight">
                            89%
                          </div>
                          <div className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                            <span>▲ {isBadini ? "کارەکێ زۆر باش!" : "کارێکی زۆر باش!"}</span>
                          </div>
                        </div>
                      </div>

                      {/* FOCUS TIME (THIS MONTH) CURVED CHART CARD */}
                      <div className="bg-[#130b2c]/90 border border-purple-500/20 rounded-3xl p-5 sm:p-6 shadow-xl space-y-3">
                        <h4 className="text-white font-extrabold text-base tracking-wide">
                          {isBadini ? "دەمێ تەرکیزێ (ئەڤ هەیڤە)" : "کاتی تەرکیز (ئەم مانگە)"}
                        </h4>

                        <div className="relative w-full h-56 pt-8 pb-6 px-1">
                          {/* GRID Y-AXIS LABELS AND DOTTED LINES */}
                          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-white/40 text-xs font-medium pr-2">
                            <div className="border-b border-purple-500/10 w-full flex items-center justify-between pb-0.5">
                              <span>8h</span>
                            </div>
                            <div className="border-b border-purple-500/10 w-full flex items-center justify-between pb-0.5">
                              <span>6h</span>
                            </div>
                            <div className="border-b border-purple-500/10 w-full flex items-center justify-between pb-0.5">
                              <span>4h</span>
                            </div>
                            <div className="border-b border-purple-500/10 w-full flex items-center justify-between pb-0.5">
                              <span>2h</span>
                            </div>
                            <div className="border-b border-purple-500/10 w-full flex items-center justify-between pb-0.5">
                              <span>0h</span>
                            </div>
                          </div>

                          {/* SVG CURVED LINE WITH GLOW AND AREA GRADIENT */}
                          <div className="relative w-full h-full pl-8 pr-4">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                              <defs>
                                <linearGradient id="monthAreaGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
                                  <stop offset="60%" stopColor="#818cf8" stopOpacity="0.15" />
                                  <stop offset="100%" stopColor="#311059" stopOpacity="0" />
                                </linearGradient>
                                <linearGradient id="monthLineGradient" x1="0" y1="0" x2="1" y2="0">
                                  <stop offset="0%" stopColor="#c084fc" />
                                  <stop offset="50%" stopColor="#a855f7" />
                                  <stop offset="100%" stopColor="#818cf8" />
                                </linearGradient>
                                <filter id="glowMonth" x="-20%" y="-20%" width="140%" height="140%">
                                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                              </defs>

                              {/* AREA FILL */}
                              <path
                                d="M 0 120 
                                   C 30 115, 45 100, 60 85 
                                   C 75 70, 90 110, 105 100 
                                   C 120 90, 135 60, 150 70 
                                   C 165 80, 180 50, 195 55 
                                   C 210 60, 225 80, 240 75 
                                   C 255 70, 270 20, 290 15 
                                   C 310 10, 325 70, 340 85 
                                   C 355 100, 370 65, 385 60 
                                   C 400 55, 415 20, 430 35 
                                   C 445 50, 460 70, 480 80 
                                   L 500 85 L 500 150 L 0 150 Z"
                                fill="url(#monthAreaGradient)"
                              />

                              {/* GLOWING CURVE */}
                              <path
                                d="M 0 120 
                                   C 30 115, 45 100, 60 85 
                                   C 75 70, 90 110, 105 100 
                                   C 120 90, 135 60, 150 70 
                                   C 165 80, 180 50, 195 55 
                                   C 210 60, 225 80, 240 75 
                                   C 255 70, 270 20, 290 15 
                                   C 310 10, 325 70, 340 85 
                                   C 355 100, 370 65, 385 60 
                                   C 400 55, 415 20, 430 35 
                                   C 445 50, 460 70, 480 80 L 500 85"
                                fill="none"
                                stroke="url(#monthLineGradient)"
                                strokeWidth="3.5"
                                filter="url(#glowMonth)"
                              />

                              {/* PEAK POINT NODE ON MAY 18 */}
                              <circle cx="290" cy="15" r="5.5" fill="#ffffff" stroke="#c084fc" strokeWidth="3" className="shadow-[0_0_12px_#fff]" />
                            </svg>

                            {/* TOOLTIP ON PEAK POINT (MAY 18 -> 6h 15m) */}
                            <div className="absolute left-[58%] top-[-10px] -translate-x-1/2 bg-[#1c103b]/95 border border-purple-400/60 text-white rounded-xl px-3 py-1.5 shadow-2xl flex flex-col items-center pointer-events-none z-20 backdrop-blur-md">
                              <span className="text-white/70 text-[11px] font-semibold">May 18</span>
                              <span className="text-white font-extrabold text-xs">6h 15m</span>
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1c103b] border-r border-b border-purple-400/60 rotate-45" />
                            </div>
                          </div>

                          {/* X-AXIS DATES */}
                          <div className="flex justify-between pl-8 pr-2 pt-2 text-white/50 text-xs font-semibold">
                            <span>1 May</span>
                            <span>8 May</span>
                            <span>15 May</span>
                            <span>22 May</span>
                            <span>29 May</span>
                          </div>
                        </div>
                      </div>

                      {/* ACTIVITY CALENDAR CARD */}
                      <div className="bg-[#130b2c]/90 border border-purple-500/20 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
                        <h4 className="text-white font-extrabold text-base tracking-wide">
                          {isBadini ? "ڕۆژژمێرا چالاکیان" : "ڕۆژژمێری چالاکییەکان"}
                        </h4>

                        {/* HEATMAP ROWS */}
                        <div className="space-y-2.5 bg-[#09031a] border border-purple-500/20 rounded-2xl p-4 shadow-inner">
                          {[
                            { day: isBadini ? "دووشەمب" : "Mon", pattern: [0, 0, 1, 3, 0, 1, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0] },
                            { day: isBadini ? "سێشەمب" : "Tue", pattern: [0, 0, 3, 0, 0, 1, 2, 2, 2, 0, 1, 0, 0, 0, 0, 0] },
                            { day: isBadini ? "چوارشەمب" : "Wed", pattern: [0, 0, 0, 0, 2, 2, 1, 0, 0, 0, 3, 0, 0, 0, 0, 0] },
                            { day: isBadini ? "پێنجشەمب" : "Thu", pattern: [0, 0, 3, 2, 2, 1, 2, 0, 2, 0, 1, 0, 0, 0, 0, 0] },
                            { day: isBadini ? "شەمبی" : "Sat", pattern: [0, 0, 1, 2, 0, 2, 2, 2, 1, 0, 3, 0, 0, 0, 0, 0] },
                            { day: isBadini ? "ئێکەشەمب" : "Sun", pattern: [0, 0, 0, 0, 0, 0, 2, 3, 0, 2, 0, 0, 0, 0, 0, 0] },
                          ].map((row, rIdx) => (
                            <div key={rIdx} className="flex items-center gap-3">
                              <span className="text-xs text-white/60 font-semibold w-16 shrink-0">
                                {row.day}
                              </span>
                              <div className="flex items-center gap-2 flex-1 overflow-x-auto py-0.5">
                                {row.pattern.map((level, cIdx) => {
                                  let styleClass = "bg-[#130b2c]/80 border border-purple-900/40";
                                  if (level === 1) styleClass = "bg-[#2a1359] border border-purple-800/60";
                                  if (level === 2) styleClass = "bg-[#621ec7] border border-purple-600/70 shadow-[0_0_6px_rgba(98,30,199,0.4)]";
                                  if (level === 3) styleClass = "bg-[#8b2ef2] border border-purple-400 shadow-[0_0_10px_rgba(139,46,242,0.6)]";
                                  if (level === 4) styleClass = "bg-[#e6c2ff] border border-white shadow-[0_0_14px_rgba(230,194,255,0.9)]";

                                  return (
                                    <div
                                      key={cIdx}
                                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg transition-all duration-200 hover:scale-110 ${styleClass}`}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* LEGEND BAR AT BOTTOM */}
                        <div className="bg-[#09031a] border border-purple-500/20 rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-around gap-3 text-xs text-white/80">
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-md bg-[#130b2c] border border-purple-900/40" />
                            <span>{isBadini ? "هیچ چالاکیەک نینە" : "هیچ چالاکییەک نییە"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-md bg-[#2a1359] border border-purple-800/60" />
                            <span>{isBadini ? "کەم" : "کەم"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-md bg-[#621ec7] border border-purple-600/70" />
                            <span>{isBadini ? "ناڤنجی" : "ناوەڕاست"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-md bg-[#8b2ef2] border border-purple-400 shadow-[0_0_8px_rgba(139,46,242,0.6)]" />
                            <span>{isBadini ? "بەرز" : "بەرز"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-md bg-[#e6c2ff] border border-white shadow-[0_0_10px_#e6c2ff]" />
                            <span>{isBadini ? "زۆر بەرز" : "زۆر بەرز"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* YEAR VIEW */}
                  {statsPeriod === "year" && (
                    <div className="space-y-5">

                      {/* TOP METRICS ROW (3 CARDS GRID) */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        {/* 1. TOTAL FOCUS TIME */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-[#2a1352] via-[#1e0e3e] to-[#13072b] border border-purple-400/50 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:border-purple-300 transition-all group min-h-[135px]">
                          <div className="flex items-center gap-2.5 z-10">
                            <div className="w-8 h-8 rounded-full bg-purple-600/90 border border-purple-300/50 flex items-center justify-center shadow-[0_0_12px_rgba(168,85,247,0.8)] text-white shrink-0">
                              <Clock className="w-4 h-4" />
                            </div>
                            <span className="text-purple-100 font-bold text-xs sm:text-sm">
                              {isBadini ? "سەرجەمێ دەمێ تەرکیزێ" : "کۆی کاتی تەرکیز"}
                            </span>
                          </div>
                          <div className="text-2xl sm:text-3xl font-black text-white my-1 tracking-tight z-10 drop-shadow-[0_2px_10px_rgba(168,85,247,0.5)]">
                            602h 15m
                          </div>
                          <div className="text-emerald-300 text-xs font-black flex items-center gap-1.5 relative z-10 pb-1">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 shadow-sm">▲ 35%</span>
                            <span className="text-purple-200/70 font-medium">{isBadini ? "بەراورد ب ساڵا بۆری" : "بەراورد بە ساڵی پێشوو"}</span>
                          </div>
                        </div>

                        {/* 2. SESSIONS */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-[#0f316e] via-[#0b224e] to-[#071330] border border-blue-400/50 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:border-blue-300 transition-all group min-h-[135px]">
                          <div className="flex items-center gap-2.5 z-10">
                            <div className="w-8 h-8 rounded-full bg-blue-600/90 border border-blue-300/50 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.8)] text-white shrink-0">
                              <Target className="w-4 h-4" />
                            </div>
                            <span className="text-blue-100 font-bold text-xs sm:text-sm">
                              {isBadini ? "خولێن پۆمۆدۆرۆ" : "خولەکانی پۆمۆدۆرۆ"}
                            </span>
                          </div>
                          <div className="text-2xl sm:text-3xl font-black text-white my-1 tracking-tight z-10 drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]">
                            1,456
                          </div>
                          <div className="text-emerald-300 text-xs font-black flex items-center gap-1.5 relative z-10 pb-1">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 shadow-sm">▲ 31%</span>
                            <span className="text-blue-200/70 font-medium">vs last year</span>
                          </div>
                        </div>

                        {/* 3. PRODUCTIVITY */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-[#0f6336] via-[#094524] to-[#042613] border border-emerald-400/50 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:border-emerald-300 transition-all group min-h-[135px]">
                          <div className="z-10">
                            <div className="flex items-center gap-2.5 mb-1">
                              <div className="w-8 h-8 rounded-full bg-emerald-500/90 border border-emerald-300/50 flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.8)] text-white shrink-0">
                                <PieChart className="w-4 h-4" />
                              </div>
                              <span className="text-emerald-100 font-bold text-xs sm:text-sm">
                                {isBadini ? "نمرەیا بەرهەمداریێ" : "نمرەی بەرهەمداری"}
                              </span>
                            </div>
                            <div className="text-2xl sm:text-3xl font-black text-white my-1 tracking-tight drop-shadow-[0_2px_10px_rgba(16,185,129,0.5)]">
                              88%
                            </div>
                            <div className="text-emerald-300 text-xs font-black flex items-center gap-1 z-10 pb-1">
                              <span className="px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/40 shadow-sm">▲ {isBadini ? "زۆر نایاب!" : "زۆر نایاب!"}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* FOCUS TIME (THIS YEAR) BAR CHART CARD */}
                      <div className="bg-[#130b2c]/90 border border-purple-500/20 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
                        <h4 className="text-white font-extrabold text-base tracking-wide">
                          {isBadini ? "دەمێ تەرکیزێ (ئەڤ ساڵە)" : "کاتی تەرکیز (ئەم ساڵە)"}
                        </h4>

                        <div className="relative w-full pt-10 pb-2">
                          {/* Y-AXIS LABELS & HORIZONTAL GRID LINES */}
                          <div className="space-y-6 text-white/40 text-xs font-medium pr-2">
                            {[
                              { label: "80h" },
                              { label: "60h" },
                              { label: "40h" },
                              { label: "20h" },
                              { label: "0h" },
                            ].map((grid, idx) => (
                              <div key={idx} className="flex items-center gap-3">
                                <span className="w-8 text-right shrink-0">{grid.label}</span>
                                <div className="border-b border-purple-500/10 w-full" />
                              </div>
                            ))}
                          </div>

                          {/* BARS CONTAINER OVERLAY */}
                          <div className="absolute inset-0 pl-11 pr-3 pt-12 pb-8 flex items-end justify-between gap-1.5 sm:gap-2">
                            {[
                              { month: "Jan", pct: 47, active: false },
                              { month: "Feb", pct: 56, active: false },
                              { month: "Mar", pct: 62, active: false },
                              { month: "Apr", pct: 75, active: false },
                              { month: "May", pct: 62, active: false },
                              { month: "Jun", pct: 68, active: true },
                              { month: "Jul", pct: 56, active: false },
                              { month: "Aug", pct: 62, active: false },
                              { month: "Sep", pct: 50, active: false },
                              { month: "Oct", pct: 50, active: false },
                              { month: "Nov", pct: 40, active: false },
                              { month: "Dec", pct: 26, active: false },
                            ].map((bar, idx) => (
                              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end relative group">
                                {/* TOOLTIP ON HIGHLIGHTED BAR */}
                                {bar.active && (
                                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1c103b]/95 border border-purple-400/60 text-white rounded-xl px-3 py-1 shadow-2xl flex flex-col items-center pointer-events-none z-20 whitespace-nowrap backdrop-blur-md">
                                    <span className="text-white/70 text-[10px] font-semibold">{isBadini ? "گوڵان" : "مای"}</span>
                                    <span className="text-white font-extrabold text-xs">52h 30m</span>
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1c103b] border-r border-b border-purple-400/60 rotate-45" />
                                  </div>
                                )}

                                {/* BAR GRAPH */}
                                <div
                                  style={{ height: `${bar.pct}%` }}
                                  className={`w-full max-w-[28px] rounded-t-lg sm:rounded-t-xl transition-all duration-300 ${
                                    bar.active
                                      ? "bg-gradient-to-t from-purple-700 via-purple-500 to-purple-400 shadow-[0_0_16px_rgba(168,85,247,0.8)] border-t border-purple-200"
                                      : "bg-gradient-to-t from-purple-950/80 via-purple-800/70 to-purple-600/80 hover:from-purple-900 hover:to-purple-500"
                                  }`}
                                />
                              </div>
                            ))}
                          </div>

                          {/* X-AXIS MONTH NAMES */}
                          <div className="flex justify-between pl-11 pr-3 pt-3 text-white/60 text-[11px] font-semibold">
                            {(isBadini 
                              ? ["ک.۲", "شوبات", "ئادار", "نیسان", "گوڵان", "حوزەیران", "تمووز", "ئاب", "ئەیلوول", "ت.۱", "ت.۲", "ک.۱"]
                              : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                            ).map((m) => (
                              <span key={m} className="flex-1 text-center">{m}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* MONTHLY OVERVIEW GRID CARD */}
                      <div className="bg-[#130b2c]/90 border border-purple-500/20 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
                        <h4 className="text-white font-extrabold text-base tracking-wide">
                          {isBadini ? "کورتیا هەیڤانە" : "پوختەی مانگانە"}
                        </h4>

                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                          {[
                            { name: isBadini ? "کانۆنا دووێ" : "Jan", time: "45h 30m", active: false },
                            { name: isBadini ? "شوبات" : "Feb", time: "48h 10m", active: false },
                            { name: isBadini ? "ئادار" : "Mar", time: "55h 20m", active: false },
                            { name: isBadini ? "نیسان" : "Apr", time: "60h 45m", active: false },
                            { name: isBadini ? "گوڵان" : "May", time: "52h 30m", active: true },
                            { name: isBadini ? "حوزەیران" : "Jun", time: "—", active: false },
                            { name: isBadini ? "تمووز" : "Jul", time: "—", active: false },
                            { name: isBadini ? "ئاب" : "Aug", time: "—", active: false },
                            { name: isBadini ? "ئەیلوول" : "Sep", time: "—", active: false },
                            { name: isBadini ? "تشرینا ئێکێ" : "Oct", time: "—", active: false },
                            { name: isBadini ? "تشرینا دووێ" : "Nov", time: "—", active: false },
                            { name: isBadini ? "کانۆنا ئێکێ" : "Dec", time: "—", active: false },
                          ].map((item, idx) => (
                            <div
                              key={idx}
                              className={`rounded-2xl p-3 sm:p-4 flex flex-col justify-between transition-all ${
                                item.active
                                  ? "bg-[#1c0b3b] border-2 border-purple-500/90 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                  : "bg-[#09031a] border border-purple-500/15 hover:border-purple-500/30"
                              }`}
                            >
                              <span className="text-white font-bold text-xs sm:text-sm truncate">
                                {item.name}
                              </span>
                              <span className={`text-xs font-semibold mt-2 ${item.time === "—" ? "text-white/30" : "text-white/70"}`}>
                                {item.time}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ACTIVITY LEVEL EXPLANATION MODAL */}
                  {showActivityHelpModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
                      <div className="bg-[#0d0622] border border-purple-500/30 w-full max-w-md rounded-3xl p-6 shadow-2xl relative space-y-4">
                        {/* CLOSE BUTTON */}
                        <button
                          onClick={() => setShowActivityHelpModal(false)}
                          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-purple-900/40 hover:bg-purple-800/80 border border-purple-500/40 text-white/70 hover:text-white flex items-center justify-center transition active:scale-95"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-500/40 text-purple-300 flex items-center justify-center shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                            <HelpCircle className="w-5 h-5" />
                          </div>
                          <h4 className="text-xl font-extrabold text-white tracking-wide">
                            {isBadini ? "واتایا ئاستێن چالاکیێ چ نە؟" : "واتای ئاستەکان چییە؟"}
                          </h4>
                        </div>

                        <div className="space-y-3 pt-2">
                          {/* 1. NO ACTIVITY */}
                          <div className="bg-[#09031a] border border-purple-900/40 p-3.5 rounded-2xl flex items-center justify-between gap-3 shadow-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-[#130b2c] border border-purple-900/50 shrink-0" />
                              <div>
                                <h5 className="text-sm font-bold text-white">{isBadini ? "هیچ چالاکیەک نەبوویە" : "هیچ چالاکییەک نەبووە"}</h5>
                                <p className="text-xs text-white/50 leading-snug">
                                  {isBadini ? "د ڤی دەمی دا تە هیچ خوێندن یان تەرکیز نەکریا." : "لەو کاتەدا نەتوێندوە و تەرکیزت نەکردووە."}
                                </p>
                              </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-purple-950/80 border border-purple-900/50 text-white/40 flex items-center justify-center shrink-0">
                              <X className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          {/* 2. LOW ACTIVITY */}
                          <div className="bg-[#09031a] border border-purple-900/40 p-3.5 rounded-2xl flex items-center justify-between gap-3 shadow-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-[#2a1359] border border-purple-800/60 shrink-0" />
                              <div>
                                <h5 className="text-sm font-bold text-white">{isBadini ? "چالاکیا کەم" : "چالاکی کەم"}</h5>
                                <p className="text-xs text-white/50 leading-snug">
                                  {isBadini ? "تە تۆزەک خوێندییە، بەلێ نەگەهشتیە تەەرکیزا تەواو." : "کەمێک چالاک بوویت بەڵام تەواو تەرکیزت نەبووە."}
                                </p>
                              </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-purple-950/80 border border-purple-900/50 text-purple-400 flex items-center justify-center shrink-0">
                              <BarChart2 className="w-3.5 h-3.5 opacity-60" />
                            </div>
                          </div>

                          {/* 3. MEDIUM ACTIVITY */}
                          <div className="bg-[#09031a] border border-purple-900/40 p-3.5 rounded-2xl flex items-center justify-between gap-3 shadow-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-[#621ec7] border border-purple-600/70 shrink-0 shadow-[0_0_8px_rgba(98,30,199,0.4)]" />
                              <div>
                                <h5 className="text-sm font-bold text-white">{isBadini ? "چالاکیا ناڤنجی" : "چالاکی ناوەڕاست"}</h5>
                                <p className="text-xs text-white/50 leading-snug">
                                  {isBadini ? "دەمەکێ باشێ تەرکیزێ تە هەبوو. بەردەوام بە!" : "کاتێکی باشی تەرکیزت هەبووە. بەردەوام بە!"}
                                </p>
                              </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-purple-950/80 border border-purple-900/50 text-purple-300 flex items-center justify-center shrink-0">
                              <BarChart2 className="w-3.5 h-3.5 opacity-90" />
                            </div>
                          </div>

                          {/* 4. HIGH ACTIVITY */}
                          <div className="bg-[#09031a] border border-purple-900/40 p-3.5 rounded-2xl flex items-center justify-between gap-3 shadow-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-[#8b2ef2] border border-purple-400 shrink-0 shadow-[0_0_12px_rgba(139,46,242,0.6)]" />
                              <div>
                                <h5 className="text-sm font-bold text-white">{isBadini ? "چالاکیا بەرز" : "چالاکی بەرز"}</h5>
                                <p className="text-xs text-white/50 leading-snug">
                                  {isBadini ? "ئافەرین! زۆر ب بەرهەم و چالاک بووی." : "کارێکی باشە! زۆر بەرهەمدار بوویت."}
                                </p>
                              </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-purple-950/80 border border-purple-900/50 text-purple-300 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                              <Rocket className="w-3.5 h-3.5 text-purple-300" />
                            </div>
                          </div>

                          {/* 5. VERY HIGH ACTIVITY */}
                          <div className="bg-[#12052c] border border-purple-500/40 p-3.5 rounded-2xl flex items-center justify-between gap-3 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-[#e6c2ff] border border-white shrink-0 shadow-[0_0_14px_rgba(230,194,255,0.9)]" />
                              <div>
                                <h5 className="text-sm font-bold text-white">{isBadini ? "چالاکیا زۆر بەرز" : "چالاکی زۆر بەرز"}</h5>
                                <p className="text-xs text-white/50 leading-snug">
                                  {isBadini ? "نایاب و سەرسوڕهێنەر! تەرکیزا تە ل لوتکەیێ بوو!" : "زۆر نایاب! تەرکیزی بەرز لە لوتکەدا بوو!"}
                                </p>
                              </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-400 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.5)]">
                              <Trophy className="w-3.5 h-3.5 text-amber-400" />
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setShowActivityHelpModal(false)}
                          className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition active:scale-95 shadow-lg shadow-purple-600/30"
                        >
                          {isBadini ? "تێگەهشتم" : "تێگەیشتم"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: NOTES SECTION */}
              {activeModalTab === "notes" && (
                <div dir="ltr" className="w-full text-white animate-fadeIn">
                  {/* MAIN GRID CONTENT */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* LEFT COLUMN: SEARCH & NOTES LIST */}
                    <div className={`md:col-span-5 lg:col-span-4 space-y-3 ${mobileNoteView === 'detail' ? 'hidden md:block' : 'block'}`}>
                      {/* SEARCH BOX */}
                      <div className="relative">
                        <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          placeholder="Search notes..."
                          value={searchNotesQuery}
                          onChange={(e) => setSearchNotesQuery(e.target.value)}
                          className="w-full bg-[#130b2e] border border-purple-500/20 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-purple-500/60 transition shadow-inner"
                        />
                      </div>

                      {/* NOTES CARDS LIST */}
                      <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1 custom-scrollbar" onScroll={() => setSwipedNoteId(null)}>
                        <div className="text-[11px] text-purple-200/80 font-medium px-2 py-1 bg-purple-950/60 rounded-xl border border-purple-500/20 flex items-center gap-1.5 w-fit shadow-sm">
                          <SlidersHorizontal className="w-3.5 h-3.5 text-purple-300 shrink-0" />
                          <span>
                            {isBadini
                              ? "بۆ ڕاستێ بکێشە بۆ دەستکاری یان ژێبرنا تێبینیێ"
                              : "ڕایبکێشە بۆ ڕاست بۆ دەستکاری یان سڕینەوەی تێبینی"}
                          </span>
                        </div>
                        {notesList
                          .filter(
                            (note) =>
                              note.title.toLowerCase().includes(searchNotesQuery.toLowerCase()) ||
                              note.content.toLowerCase().includes(searchNotesQuery.toLowerCase())
                          )
                          .map((note) => {
                            const isSelected = selectedNoteId === note.id;
                            return (
                              <SwipeableNoteCard
                                key={note.id}
                                note={note}
                                isSelected={isSelected}
                                isBadini={isBadini}
                                isSwipedOpen={swipedNoteId === note.id}
                                onSwipeToggle={(id) => setSwipedNoteId(id)}
                                onSelect={(selectedNote) => {
                                  setSwipedNoteId(null);
                                  if (selectedNoteId && isEditingNote) {
                                    setNotesList((prev) =>
                                      prev.map((n) =>
                                        n.id === selectedNoteId
                                          ? { ...n, title: editNoteTitle, content: editNoteContent, images: editNoteImages }
                                          : n
                                      )
                                    );
                                  }
                                  setSelectedNoteId(selectedNote.id);
                                  setEditNoteTitle(selectedNote.title);
                                  setEditNoteContent(selectedNote.content);
                                  setEditNoteImages(selectedNote.images || []);
                                  setIsEditingNote(true);
                                  setMobileNoteView('detail');
                                  setTimeout(() => {
                                    noteDetailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                  }, 50);
                                }}
                                onDelete={(idToDelete) => {
                                  setSwipedNoteId(null);
                                  handleDeleteNote(idToDelete);
                                }}
                              />
                            );
                          })}
                      </div>
                    </div>

                    {/* RIGHT COLUMN: SELECTED NOTE DETAIL VIEW (ENLARGED BOX WITH IMAGE UPLOAD) */}
                    <div
                      ref={noteDetailRef}
                      className={`md:col-span-7 lg:col-span-8 bg-[#0b051e] border border-purple-500/20 rounded-3xl p-4 sm:p-6 shadow-2xl relative min-h-[580px] flex flex-col justify-between overflow-hidden ${
                        mobileNoteView === 'list' ? 'hidden md:flex' : 'flex'
                      }`}
                    >
                      {/* HIDDEN FILE INPUT FOR IMAGE UPLOAD */}
                      <input
                        ref={noteFileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleNoteImageUpload}
                        className="hidden"
                      />

                      {(() => {
                        const activeNote = notesList.find((n) => n.id === selectedNoteId);
                        if (!activeNote) {
                          return (
                            <div className="flex flex-col items-center justify-center h-full text-white/40 py-16">
                              <FileText className="w-12 h-12 mb-2 opacity-30" />
                              <p className="text-xs">Select or create a note</p>
                            </div>
                          );
                        }

                        return (
                          <div className="flex flex-col h-full justify-between relative z-10 space-y-4">
                            <div className="space-y-4">
                              {/* MOBILE BACK BUTTON */}
                              <button
                                type="button"
                                onClick={() => setMobileNoteView('list')}
                                className="md:hidden self-start px-3 py-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 border border-purple-500/40 text-purple-200 font-bold text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer active:scale-95 mb-1"
                              >
                                <ArrowLeft className="w-4 h-4 text-purple-300" />
                                <span>{isBadini ? "ڤەگەڕیان بۆ لیستێ" : "گەڕانەوە بۆ لیستی تێبینیەکان"}</span>
                              </button>

                              {/* HEADER ROW */}
                              <div className="flex items-start justify-between gap-3 pb-3 border-b border-purple-500/15">
                                {isEditingNote ? (
                                  <input
                                    type="text"
                                    value={editNoteTitle}
                                    onChange={(e) => setEditNoteTitle(e.target.value)}
                                    placeholder={isBadini ? "ناڤونیشانێ تێبینیێ..." : "سەردێڕی تێبینی..."}
                                    className="w-full bg-[#180f38] border border-purple-500/40 rounded-xl px-3 py-2 text-white font-extrabold text-lg focus:outline-none focus:border-purple-400"
                                  />
                                ) : (
                                  <div>
                                    <h3 className="text-lg sm:text-2xl font-extrabold text-white tracking-wide">
                                      {activeNote.title}
                                    </h3>
                                    <p className="text-[11px] sm:text-xs text-white/50 font-mono mt-0.5">
                                      {activeNote.date} • {activeNote.time}
                                    </p>
                                  </div>
                                )}

                                <div className="flex items-center gap-2 shrink-0">
                                  {isEditingNote ? (
                                    <>
                                      {/* ATTACH IMAGE BUTTON IN EDIT MODE */}
                                      <button
                                        type="button"
                                        onClick={() => noteFileInputRef.current?.click()}
                                        className="px-3 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 border border-purple-500/40 text-purple-200 font-bold text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer active:scale-95"
                                        title={isBadini ? "زێدەکرنا وێنەی" : "زیادکردنی وێنە"}
                                      >
                                        <Upload className="w-4 h-4 text-purple-300" />
                                        <span className="hidden sm:inline">
                                          {isBadini ? "وێنە" : "وێنە"}
                                        </span>
                                      </button>

                                      <button
                                        type="button"
                                        onClick={handleSaveEditNote}
                                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg transition cursor-pointer active:scale-95"
                                      >
                                        Save
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setIsEditingNote(true);
                                          setEditNoteTitle(activeNote.title);
                                          setEditNoteContent(activeNote.content);
                                          setEditNoteImages(activeNote.images || []);
                                        }}
                                        className="p-2 sm:px-3 sm:py-2 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/30 text-purple-200 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                                        title="Edit Note"
                                      >
                                        <Pencil className="w-4 h-4" />
                                        <span className="hidden sm:inline">Edit</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteNote(activeNote.id)}
                                        className="p-2 rounded-xl bg-rose-900/30 hover:bg-rose-800/50 border border-rose-500/30 text-rose-300 transition cursor-pointer"
                                        title="Delete Note"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>

                              {/* BODY CONTENT AREA (EXPANDED LARGE TEXTAREA) */}
                              <div className="pt-1 space-y-4 relative z-10">
                                {isEditingNote ? (
                                  <div className="space-y-3">
                                    <textarea
                                      rows={10}
                                      value={editNoteContent}
                                      onChange={(e) => setEditNoteContent(e.target.value)}
                                      placeholder={isBadini ? "تێبینیان لێرە بنڤێسە..." : "تێبینییەکان لێرە بنووسە..."}
                                      className="w-full bg-[#180f38] border border-purple-500/40 rounded-2xl p-4 text-white text-sm sm:text-base leading-relaxed focus:outline-none focus:border-purple-400 font-sans min-h-[220px]"
                                    />

                                    {/* EDITING MODE IMAGE PREVIEWS GRID */}
                                    <div className="space-y-2 bg-[#140b2e]/95 border border-purple-500/30 rounded-2xl p-3.5 backdrop-blur-md">
                                      <div className="flex flex-wrap items-center justify-between gap-2">
                                        <span className="text-xs text-purple-200 font-bold flex items-center gap-1.5">
                                          <ImageIcon className="w-4 h-4 text-purple-400 shrink-0" />
                                          {isBadini ? "وێنێن تێبینیێ (Images)" : "وێنەکانی تێبینی"}
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => noteFileInputRef.current?.click()}
                                          className="text-xs text-purple-300 hover:text-white bg-purple-900/50 hover:bg-purple-800 border border-purple-500/40 px-2.5 py-1 rounded-lg cursor-pointer transition flex items-center gap-1 shrink-0"
                                        >
                                          <Upload className="w-3.5 h-3.5 text-purple-300" />
                                          <span>+ {isBadini ? "زێدەکرنا وێنەی" : "زیادکردنی وێنە"}</span>
                                        </button>
                                      </div>

                                      {editNoteImages.length === 0 ? (
                                        <div
                                          onClick={() => noteFileInputRef.current?.click()}
                                          className="p-4 border-2 border-dashed border-purple-500/30 rounded-xl bg-purple-950/40 text-center text-xs text-white/60 hover:bg-purple-900/40 hover:border-purple-400/60 transition cursor-pointer flex flex-col items-center justify-center gap-2 mt-1"
                                        >
                                          <Upload className="w-5 h-5 text-purple-400" />
                                          <span>{isBadini ? "کلیک بکە بۆ ئەپڵۆدکرنا وێنەیان" : "کلیک بکە بۆ ئەپلۆدکردنی وێنە"}</span>
                                        </div>
                                      ) : (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[180px] overflow-y-auto p-1 custom-scrollbar">
                                          {editNoteImages.map((imgUrl, idx) => (
                                            <div
                                              key={idx}
                                              className="relative group rounded-xl overflow-hidden border border-purple-500/40 h-24 bg-black/50 shadow-md cursor-pointer"
                                              onClick={() => setSelectedFullNoteImage(imgUrl)}
                                            >
                                              <img src={imgUrl} alt="Note Attachment" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-1 text-white text-[11px] font-bold pointer-events-none backdrop-blur-[1px]">
                                                <Eye className="w-4 h-4 text-purple-300" />
                                                <span>{isBadini ? "بینینا مەزن" : "بینینی گەورە"}</span>
                                              </div>
                                              <button
                                                type="button"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleRemoveEditNoteImage(idx);
                                                }}
                                                className="absolute top-1.5 right-1.5 p-1 rounded-full bg-rose-600/90 text-white hover:bg-rose-500 transition cursor-pointer shadow-lg z-10"
                                                title="Remove image"
                                              >
                                                <X className="w-3.5 h-3.5" />
                                              </button>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="space-y-5 min-h-[260px]">
                                    <p className="whitespace-pre-line text-xs sm:text-sm text-white/90 leading-relaxed font-sans max-w-full">
                                      {activeNote.content}
                                    </p>

                                    {/* VIEW MODE ATTACHED IMAGES GALLERY */}
                                    {activeNote.images && activeNote.images.length > 0 && (
                                      <div className="pt-3 border-t border-purple-500/20 space-y-2.5">
                                        <p className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                                          <ImageIcon className="w-4 h-4 text-purple-400" />
                                          {isBadini ? "وێنێن تێبینیێ:" : "وێنەکانی تێبینی:"}
                                        </p>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                          {activeNote.images.map((imgUrl, idx) => (
                                            <div
                                              key={idx}
                                              onClick={() => setSelectedFullNoteImage(imgUrl)}
                                              className="relative rounded-2xl overflow-hidden border border-purple-500/30 h-28 sm:h-32 bg-black/50 hover:border-purple-400 transition cursor-pointer group shadow-lg"
                                            >
                                              <img
                                                src={imgUrl}
                                                alt={`Note Attachment ${idx + 1}`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                              />
                                              <div className="absolute inset-0 bg-purple-950/70 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-white text-xs font-bold gap-1.5 backdrop-blur-[2px]">
                                                <Maximize2 className="w-5 h-5 text-purple-300" />
                                                <span>{isBadini ? "بینینا مەزن" : "بینینی گەورە"}</span>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>


                          </div>
                        );
                      })()}

                      {/* LIGHTBOX MODAL FOR FULL NOTE IMAGE VIEW */}
                      {selectedFullNoteImage && (
                        <div
                          className="fixed inset-0 z-[99999] bg-black/92 backdrop-blur-2xl flex flex-col items-center justify-center p-3 sm:p-6 animate-fadeIn select-none"
                          onClick={() => setSelectedFullNoteImage(null)}
                        >
                          <div
                            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center p-3 sm:p-5 rounded-3xl bg-[#140b2e]/90 border border-purple-500/30 shadow-[0_0_60px_rgba(168,85,247,0.3)] backdrop-blur-xl transition duration-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* TOP HEADER CONTROLS */}
                            <div className="w-full flex items-center justify-between gap-3 text-white mb-3 pb-3 border-b border-purple-500/20 px-1">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-purple-900/80 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                                  <Eye className="w-4 h-4" />
                                </div>
                                <div>
                                  <h4 className="text-sm sm:text-base font-extrabold text-white tracking-wide">
                                    {isBadini ? "بینینا وێنەی ب مەزنی" : "بینینی وێنە بە گەورەیی"}
                                  </h4>
                                  <p className="text-[11px] text-purple-300/70 font-medium hidden sm:block">
                                    {isBadini ? "تۆ دشێی وێنەی لدەڤ خۆ خەزن بکەی" : "دەتوانیت وێنەکە لەلای خۆت دابەزێنیت"}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {/* SAVE / DOWNLOAD BUTTON */}
                                <button
                                  type="button"
                                  onClick={() => handleDownloadImage(selectedFullNoteImage)}
                                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/40 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-900/50 cursor-pointer active:scale-95 transition"
                                >
                                  <Download className="w-4 h-4 text-purple-200" />
                                  <span>{isBadini ? "خەزنکرن" : "خەزنکردن"}</span>
                                </button>

                                {/* CLOSE BUTTON */}
                                <button
                                  type="button"
                                  onClick={() => setSelectedFullNoteImage(null)}
                                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 hover:text-white border border-white/20 transition cursor-pointer flex items-center gap-1 text-xs font-bold active:scale-95"
                                >
                                  <X className="w-4 h-4" />
                                  <span>{isBadini ? "داخستن" : "داخستن"}</span>
                                </button>
                              </div>
                            </div>

                            {/* MAIN IMAGE DISPLAY */}
                            <div className="w-full flex items-center justify-center overflow-hidden rounded-2xl bg-black/70 border border-purple-500/20 p-2 sm:p-3 relative shadow-2xl">
                              <img
                                src={selectedFullNoteImage}
                                alt="Full note preview"
                                className="max-w-full max-h-[74vh] rounded-xl object-contain shadow-2xl transition duration-300"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* MODAL FOOTER STEP NAVIGATION & ACTION */}
            {activeModalTab !== "notes" && activeModalTab !== "syllabus" && (
              <div className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 ${
                activeModalTab === "stats" || activeModalTab === "logs"
                  ? "bg-[#120a2e] border-purple-500/20 text-white"
                  : "bg-purple-50/80 border-purple-100 text-purple-950"
              }`}>
                <div className="text-xs font-medium text-right w-full sm:w-auto">
                  {!selectedSubject ? (
                    <span className="text-rose-500 font-extrabold">
                      {isBadini ? "تکایە بابەتەکێ هەڵبژێرە!" : "تکایە بابەتێک هەڵبژێرە!"}
                    </span>
                  ) : (
                    <span className={`font-extrabold flex items-center gap-1.5 justify-end ${
                      activeModalTab === "stats" || activeModalTab === "logs" ? "text-purple-200" : "text-purple-900"
                    }`}>
                      <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                      {isBadini
                        ? `بابەت: ${activeSubjectInfo?.nameBadini || selectedSubject}`
                        : `بابەت: ${activeSubjectInfo?.nameKu || selectedSubject}`}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {wizardStep > 1 && activeModalTab === "syllabus" && (
                    <button
                      type="button"
                      onClick={() => setWizardStep(1)}
                      className="px-4 py-3 rounded-2xl font-bold text-xs bg-white text-purple-900 border border-purple-200 hover:bg-purple-100 transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span>{isBadini ? "زڤڕین" : "گەڕانەوە"}</span>
                    </button>
                  )}

                  {wizardStep === 1 && activeModalTab === "syllabus" && (
                    <button
                      type="button"
                      disabled={!selectedSubject}
                      onClick={() => {
                        if (selectedSubject) setWizardStep(2);
                      }}
                      className={`px-6 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg ${
                        selectedSubject
                          ? "bg-purple-600 hover:bg-purple-700 text-white active:scale-95 ring-2 ring-purple-400/40 shadow-purple-200 opacity-100"
                          : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-60"
                      }`}
                    >
                      <span>{isBadini ? "داهاتی" : "دواتر"}</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  )}

                  {(wizardStep === 2 || activeModalTab !== "syllabus") && (
                    <button
                      type="button"
                      disabled={!selectedSubject || (wizardStep === 2 && !topicsText.trim())}
                      onClick={handleFinishWizard}
                      className={`w-full sm:w-auto px-7 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg ${
                        selectedSubject && (wizardStep !== 2 || topicsText.trim())
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white active:scale-95 ring-2 ring-purple-400/40 shadow-purple-200 opacity-100"
                          : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-60"
                      }`}
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>{isBadini ? "تەواو / دەستپێکرنا خوێندنێ 🚀" : "تەواو / دەستپێکردنی خوێندن 🚀"}</span>
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* NEW NOTE WIZARD GLASS MODAL */}
      {isNewNoteWizardOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0e0728]/95 border border-purple-500/40 rounded-3xl text-white shadow-2xl shadow-purple-950/90 max-h-[92vh] flex flex-col overflow-hidden">
            <div className="p-5 sm:p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center shrink-0">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-pink-500 opacity-70 blur-md animate-pulse" />
                  <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-900 border border-purple-300/40 shadow-xl shadow-purple-950 flex items-center justify-center">
                    <FilePlus className="w-5 h-5 text-white drop-shadow-[0_2px_8px_rgba(236,72,153,0.8)]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-white">
                    {isBadini ? "دروستکرنا تێبینییا نوی" : "دروستکردنی تێبینی نوێ"}
                  </h3>
                  <p className="text-[11px] text-purple-300/70 font-medium">
                    {isBadini ? "زانیاریێن تێبینیێ دیاری بکە بۆ ڕێکخستنا باشتڕ" : "زانیاریەکانی تێبینیەکە دیاری بکە بۆ ڕێکخستنی باشتر"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsNewNoteWizardOpen(false)}
                className="p-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 border border-purple-500/30 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* FIELD 1: SUBJECT NAME */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-purple-200">
                1. {isBadini ? "ناڤێ بابەتی هەلبژێرە:" : "ناوی بابەت هەڵبژێرە:"}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "بیرکاری", name: "بیرکاری", icon: <Calculator className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> },
                  { id: "فیزیا", name: "فیزیا", icon: <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" /> },
                  { id: "کیمیا", name: "کیمیا", icon: <FlaskConical className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> },
                  { id: "زیندەوەرزانی", name: "زیندەوەرزانی", icon: <Dna className="w-3.5 h-3.5 text-rose-400 shrink-0" /> },
                  { id: "ئینگلیزی", name: "ئینگلیزی", icon: <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" /> },
                  { id: "کوردی", name: "کوردی", icon: <BookOpen className="w-3.5 h-3.5 text-purple-400 shrink-0" /> },
                  { id: "عەرەبی", name: "عەرەبی", icon: <Languages className="w-3.5 h-3.5 text-teal-400 shrink-0" /> },
                  { id: "custom", name: isBadini ? "بنڤێسە..." : "بنووسە...", icon: <Edit3 className="w-3.5 h-3.5 text-purple-300 shrink-0" /> },
                ].map((sub) => {
                  const isActive = wizardSubject === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setWizardSubject(sub.id)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-400 text-white shadow-md shadow-purple-900/60 scale-[1.02]"
                          : "bg-purple-950/40 border-purple-500/20 text-purple-200/80 hover:bg-purple-900/50 hover:border-purple-500/40"
                      }`}
                    >
                      {sub.icon}
                      <span className="truncate">{sub.name}</span>
                    </button>
                  );
                })}
              </div>
              {wizardSubject === "custom" && (
                <input
                  type="text"
                  value={wizardCustomSubject}
                  onChange={(e) => setWizardCustomSubject(e.target.value)}
                  placeholder={isBadini ? "ناڤێ بابەتی بنڤێسە (مێژوو، عەرەبی...)" : "ناوی بابەت بنووسە..."}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-white text-xs placeholder:text-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              )}
            </div>

            {/* FIELD 2: CHAPTER / LESSON */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-purple-200">
                2. {isBadini ? "بەند یان وانا بابەتی:" : "بەش یان وانەی بابەت:"}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {[
                  { id: "بەندا ١", name: "بەندا ١", icon: <Bookmark className="w-3.5 h-3.5 text-purple-400 shrink-0" /> },
                  { id: "بەندا ٢", name: "بەندا ٢", icon: <Bookmark className="w-3.5 h-3.5 text-purple-400 shrink-0" /> },
                  { id: "بەندا ٣", name: "بەندا ٣", icon: <Bookmark className="w-3.5 h-3.5 text-purple-400 shrink-0" /> },
                  { id: "بەندا ٤", name: "بەندا ٤", icon: <Bookmark className="w-3.5 h-3.5 text-purple-400 shrink-0" /> },
                  { id: "وانا ١", name: "وانا ١", icon: <BookMarked className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> },
                  { id: "وانا ٢", name: "وانا ٢", icon: <BookMarked className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> },
                  { id: "custom", name: isBadini ? "بنڤێسە..." : "بنووسە...", icon: <Edit3 className="w-3.5 h-3.5 text-purple-300 shrink-0" /> },
                ].map((chap) => {
                  const isActive = wizardChapter === chap.id;
                  return (
                    <button
                      key={chap.id}
                      type="button"
                      onClick={() => setWizardChapter(chap.id)}
                      className={`px-2.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-400 text-white shadow-md shadow-purple-900/60 scale-[1.02]"
                          : "bg-purple-950/40 border-purple-500/20 text-purple-200/80 hover:bg-purple-900/50 hover:border-purple-500/40"
                      }`}
                    >
                      {chap.icon}
                      <span className="truncate">{chap.name}</span>
                    </button>
                  );
                })}
              </div>
              {wizardChapter === "custom" && (
                <input
                  type="text"
                  value={wizardCustomChapter}
                  onChange={(e) => setWizardCustomChapter(e.target.value)}
                  placeholder={isBadini ? "ناڤێ بەند یان وانێ (بەکارهێنان: بەندا ٥...)" : "ناوی بەش یان وانە بنووسە..."}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-white text-xs placeholder:text-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              )}
            </div>

            {/* FIELD 3: SUB-TOPIC / NOTE TOPIC */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-purple-200">
                3. {isBadini ? "ناڤێ بابەتێ تێبینیێ (تەوەر):" : "ناوی بابەتی تێبینیەکە (تەوەر):"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: "یاسا و هاوکێشەکان", name: "یاسا و هاوکێشەکان", icon: <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" /> },
                  { id: "تێبینی و خاڵێن گرنگ", name: "تێبینی و خاڵێن گرنگ", icon: <Pin className="w-3.5 h-3.5 text-rose-400 shrink-0" /> },
                  { id: "پێناسە و دەستەواژەکان", name: "پێناسە و دەستەواژەکان", icon: <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> },
                  { id: "پرسیار و وەڵامێن ئەزموونێ", name: "پرسیار و وەڵامێن ئەزموونێ", icon: <FileQuestion className="w-3.5 h-3.5 text-violet-400 shrink-0" /> },
                  { id: "custom", name: isBadini ? "ناڤەکێ دی بنڤێسە..." : "ناوێکی تر بنووسە...", icon: <Edit3 className="w-3.5 h-3.5 text-purple-300 shrink-0" /> },
                ].map((top) => {
                  const isActive = wizardTopic === top.id;
                  return (
                    <button
                      key={top.id}
                      type="button"
                      onClick={() => setWizardTopic(top.id)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-400 text-white shadow-md shadow-purple-900/60 scale-[1.02]"
                          : "bg-purple-950/40 border-purple-500/20 text-purple-200/80 hover:bg-purple-900/50 hover:border-purple-500/40"
                      }`}
                    >
                      {top.icon}
                      <span className="truncate">{top.name}</span>
                    </button>
                  );
                })}
              </div>
              {wizardTopic === "custom" && (
                <input
                  type="text"
                  value={wizardCustomTopic}
                  onChange={(e) => setWizardCustomTopic(e.target.value)}
                  placeholder={isBadini ? "ناڤێ بابەتێ تێبینیێ بنڤێسە..." : "ناوی بابەتی تێبینی بنووسە..."}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-white text-xs placeholder:text-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              )}
            </div>

            {/* LIVE TITLE PREVIEW CARD */}
            <div className="p-3.5 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-xs space-y-1">
              <div className="text-[10px] font-bold text-purple-300/70 tracking-wider">
                {isBadini ? "پێشمەنظەرا ناڤێ تێبینیێ:" : "پێشبینینی ناوی تێبینی:"}
              </div>
              <div className="font-bold text-purple-100 text-sm truncate">
                {wizardSubject === "custom" ? (wizardCustomSubject || "بابەت") : wizardSubject}
                {wizardChapter === "custom" ? (wizardCustomChapter ? ` • ${wizardCustomChapter}` : "") : wizardChapter ? ` • ${wizardChapter}` : ""}
                {wizardTopic === "custom" ? (wizardCustomTopic ? `: ${wizardCustomTopic}` : "") : wizardTopic ? `: ${wizardTopic}` : ""}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-purple-500/20">
              <button
                type="button"
                onClick={() => setIsNewNoteWizardOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 font-bold text-xs border border-purple-500/30 transition cursor-pointer"
              >
                {isBadini ? "پاشگەزبوونەوە" : "پاشگەزبوونەوە"}
              </button>
              <button
                type="button"
                onClick={confirmCreateNewNote}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-900/60 transition cursor-pointer active:scale-95 flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Plus className="w-4 h-4 shrink-0" />
                <span>{isBadini ? "درۆستکرنا تێبینیێ" : "دروستکردنی تێبینی"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* HIDDEN YOUTUBE AUDIO PLAYER (ONLY AUDIO, NO VISIBLE VIDEO) */}
      {activeYouTubeId && (
        <div className="fixed top-0 left-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden z-[-9999]">
          <iframe
            id="youtube-audio-iframe"
            width="100"
            height="100"
            src={`https://www.youtube.com/embed/${activeYouTubeId}?enablejsapi=1&autoplay=1&loop=1&playlist=${activeYouTubeId}&controls=0`}
            title="YouTube Audio Player"
            allow="autoplay"
          />
        </div>
      )}

      {/* 1. ACTIVE STUDY SUBJECT, CHAPTER & LESSON SELECTOR MODAL */}
      <AnimatePresence>
        {isSelectingSubjectModalOpen && (
          <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-lg bg-[#12082b] border border-purple-500/40 rounded-3xl p-6 shadow-2xl space-y-5 text-white my-auto"
            >
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md border border-purple-300/40">
                    📖
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">
                      {isBadini ? "دەستنیشانکرنا بابەت، بەند و وانا خاندنێ" : "دیاریکردنی بابەت، بەش و وانی خوێندن"}
                    </h3>
                    <p className="text-xs text-purple-200/70 font-medium">
                      {isBadini ? "ئەو بابەتێ نۆکە د پومودوری دا خانی دیار بکە" : "ئەو بابەتەی ئێستا لە پۆمۆدۆرۆدا دەخوێنیت دیاری بکە"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSelectingSubjectModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-purple-950/80 hover:bg-purple-900 border border-purple-500/30 text-purple-200 flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* PRESET GRADE 12 SUBJECTS GRID */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-purple-200">
                  1. {isBadini ? "ناڤێ بابەتێ دەستنیشانکری:" : "ناوی بابەتی دەستنیشانکراو:"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { name: "بیرکاری", icon: "📐" },
                    { name: "فیزیا", icon: "⚡" },
                    { name: "کیمیا", icon: "🧪" },
                    { name: "زیندەوەر", icon: "🧬" },
                    { name: "کوردی", icon: "📚" },
                    { name: "عەرەبی", icon: "📖" },
                    { name: "ئینگلیزی", icon: "🇬🇧" },
                    { name: "ئاین", icon: "🕌" },
                  ].map((sub) => {
                    const isSel = activeStudySubject === sub.name;
                    return (
                      <button
                        key={sub.name}
                        type="button"
                        onClick={() => {
                          setActiveStudySubject(sub.name);
                          if (sub.name === "بیرکاری") {
                            setActiveStudyChapter("بەندێ ١: مشتقە و جێبەجێکرنەکانی");
                            setActiveStudyLesson("وانا ٣: یاسایێن مشتقەیێ");
                          } else if (sub.name === "فیزیا") {
                            setActiveStudyChapter("بەندێ ١: هێزا کارەبایی و تەزوو");
                            setActiveStudyLesson("وانا ٢: یاسایێن نیوتن د کارەبایێ دا");
                          } else if (sub.name === "کیمیا") {
                            setActiveStudyChapter("بەندێ ١: هاوکێشەیێن کیمیایی");
                            setActiveStudyLesson("وانا ١: خێرایا کاردانەوەیێ");
                          } else if (sub.name === "زیندەوەر") {
                            setActiveStudyChapter("بەندێ ١: پەیکەرە کۆئەندام");
                            setActiveStudyLesson("وانا ٢: کۆئەندامێ دەمار");
                          } else {
                            setActiveStudyChapter("بەندێ ١: وانێن سەرەکی");
                            setActiveStudyLesson("وانا ١: بنەمایێن بابەتێ");
                          }
                        }}
                        className={`px-3 py-2.5 rounded-2xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 border cursor-pointer ${
                          isSel
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-300 text-white shadow-lg shadow-purple-900/60 scale-105"
                            : "bg-purple-950/40 border-purple-500/20 text-purple-200/80 hover:bg-purple-900/60"
                        }`}
                      >
                        <span>{sub.icon}</span>
                        <span>{sub.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CHAPTER / PART INPUT */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-purple-200">
                  2. {isBadini ? "بەند یان پشک (یان بەش):" : "بەش یان بەند:"}
                </label>
                <input
                  type="text"
                  value={activeStudyChapter}
                  onChange={(e) => setActiveStudyChapter(e.target.value)}
                  placeholder={isBadini ? "بەندێ ١: مشتقە..." : "بەشی ١..."}
                  className="w-full px-4 py-2.5 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-white text-xs placeholder:text-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* LESSON / TOPIC TITLE INPUT */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-purple-200">
                  3. {isBadini ? "ناڤێ بابەتێ د وی بەندی دا / وانا بابەتی:" : "ناوی بابەت یان وانەی خوێندراو:"}
                </label>
                <input
                  type="text"
                  value={activeStudyLesson}
                  onChange={(e) => setActiveStudyLesson(e.target.value)}
                  placeholder={isBadini ? "وانا ٣: یاسایێن مشتقەیێ..." : "وانی ٣..."}
                  className="w-full px-4 py-2.5 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-white text-xs placeholder:text-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* CONFIRM BUTTON */}
              <div className="pt-3 border-t border-purple-500/20 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSelectingSubjectModalOpen(false)}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-purple-900/60 transition cursor-pointer active:scale-95"
                >
                  {isBadini ? "تۆمارکرن و دەستپێکرنا پومودوری 🎯" : "تۆمارکردن و دەستپێکردن 🎯"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. FULL-SCREEN SESSION SUMMARY & INSTANT QUIZ OVERLAY MODAL */}
      <AnimatePresence>
        {isSessionFinishedModalOpen && finishedSessionDetails && (
          <div className="fixed inset-0 z-[999] bg-[#070214]/98 backdrop-blur-3xl overflow-y-auto p-4 sm:p-8 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-3xl bg-gradient-to-b from-[#180d38] via-[#12082b] to-[#0a031a] border-2 border-purple-400/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(168,85,247,0.4)] text-white space-y-6 my-auto"
            >
              {/* TOP HEADER WITH CLOSE BUTTON */}
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center text-white font-black text-2xl shadow-lg border border-amber-300/50 shrink-0 animate-bounce">
                    🎉
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2">
                      <span>{isBadini ? "تە خولا خاندنێ ب داوی ئینا!" : "خولی خوێندنت بە سەرکەوتوویی تەواو کرد!"}</span>
                      <Sparkles className="w-5 h-5 text-amber-300" />
                    </h2>
                    <p className="text-xs sm:text-sm text-purple-200/80 font-bold">
                      {isBadini ? "داتایێن خاندنا بابەتی دگەل هاندان و کویزا ئاستی" : "داتای خوێندن لەگەڵ کویزی سەنگاندنی ئاست"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSessionFinishedModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-purple-950/80 hover:bg-purple-900 border border-purple-500/30 text-purple-200 flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* STEP 1: SESSION BREAKDOWN SUMMARY & MOTIVATIONAL ENCOURAGEMENT */}
              {sessionQuizStep === "summary" && (
                <div className="space-y-6">
                  {/* METRICS CARDS GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* STUDY DURATION */}
                    <div className="bg-[#1e1045]/80 border border-purple-500/30 rounded-2xl p-4 text-center space-y-1.5 shadow-lg">
                      <span className="text-2xl">⏱️</span>
                      <span className="text-xs font-bold text-purple-200/70 block">
                        {isBadini ? "چەند خاندییە (دەمێ خاندنێ):" : "چەند خوێندراوە:"}
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-amber-300">
                        {finishedSessionDetails.focusMinutes} {isBadini ? "خولەک" : "خولەک"}
                      </span>
                    </div>

                    {/* BREAK DURATION */}
                    <div className="bg-[#1e1045]/80 border border-purple-500/30 rounded-2xl p-4 text-center space-y-1.5 shadow-lg">
                      <span className="text-2xl">☕</span>
                      <span className="text-xs font-bold text-purple-200/70 block">
                        {isBadini ? "چەند بهێنا خۆ ڤەداییە (پشوو):" : "چەند پشوو وەرگیراوە:"}
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-teal-300">
                        {finishedSessionDetails.breakMinutes} {isBadini ? "خولەک" : "خولەک"}
                      </span>
                    </div>

                    {/* SUBJECT DETAILS */}
                    <div className="bg-[#1e1045]/80 border border-purple-500/30 rounded-2xl p-4 text-center space-y-1.5 shadow-lg">
                      <span className="text-2xl">📚</span>
                      <span className="text-xs font-bold text-purple-200/70 block">
                        {isBadini ? "بابەتێ خاندی:" : "بابەتی خوێندراو:"}
                      </span>
                      <span className="text-base sm:text-lg font-black text-emerald-300 block truncate">
                        {finishedSessionDetails.subject}
                      </span>
                    </div>
                  </div>

                  {/* CHAPTER & LESSON FULL INFO CARD */}
                  <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/30 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-purple-300/80 font-bold">
                      <span>📌 {isBadini ? "زانیاریێن تەمامێن بابەتی:" : "زانیاری تەواوی بابەت:"}</span>
                      <span>⏰ {finishedSessionDetails.completedAt}</span>
                    </div>
                    <div className="text-sm font-black text-white">
                      {finishedSessionDetails.chapter}
                    </div>
                    <div className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
                      <span>📖</span>
                      <span>{finishedSessionDetails.lesson}</span>
                    </div>
                  </div>

                  {/* MOTIVATIONAL ENCOURAGEMENT BANNER (هاندان) */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-purple-600/25 to-indigo-600/20 border border-amber-400/40 space-y-2 text-center shadow-xl">
                    <div className="text-base sm:text-lg font-black text-amber-300 flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
                      <span>{isBadini ? "دەستخۆش ئافەرین! ئەڤە هەوڵەکا زۆر مەزن بوو! 🌟" : "دەستخۆش ئافەرین! ئەمە هەوڵێکی زۆر بەرز بوو! 🌟"}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-purple-100 font-bold leading-relaxed">
                      {isBadini
                        ? "تە ب سەرکەفتن ڤە ئەڤ بابەتە ب داوی ئینا. هەوڵا تە یا ئەڤڕۆ دهێتە ژمارتن و هەنگاوەکا دی نێزیکتر بووی ژ ئارمانجا خۆ! بەردەوام بە!"
                        : "تۆ بە سەرکەوتوویی ئەم بابەتەت تەواو کرد. هەوڵی ئەمڕۆت دەژمێردرێت و هەنگاوێک لە ئامانجەکەت نزیکتر بوویتەوە!"}
                    </p>
                  </div>

                  {/* PROMINENT CALL TO ACTION BUTTON FOR INSTANT QUIZ */}
                  <div className="p-5 rounded-2xl bg-[#201048] border-2 border-emerald-400/50 text-center space-y-3 shadow-2xl">
                    <p className="text-xs sm:text-sm font-extrabold text-emerald-200 leading-relaxed">
                      {isBadini
                        ? `تە ئەڤ بابەتە (${finishedSessionDetails.subject}) خلاس کر! کویزێ ب ڤی بابەتی بکە دا ئاستێ تە د ڤی بابەتی تە خاندی دیار بکەین و بەراورد بکەین دگەل بابەتێن دی 🎯`
                        : `تۆ ئەم بابەتەت (${finishedSessionDetails.subject}) تەواو کرد! کویزێک بەم بابەتە بکە تا ئاستت لەم بابەتە دیاری بکەین و بەراوردی بکەین لەگەڵ بابەتەکانی تر 🎯`}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSessionQuizStep("quiz")}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-base shadow-[0_0_30px_rgba(16,185,129,0.7)] transition cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                    >
                      <span>{isBadini ? "دەستپێکرنا کویزا ڤی بابەتی 🚀" : "دەستپێکردنی کویزی ئەم بابەتە 🚀"}</span>
                      <ArrowRight className="w-5 h-5 text-amber-300" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: INTERACTIVE SUBJECT QUIZ */}
              {sessionQuizStep === "quiz" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between bg-purple-950/60 p-3.5 rounded-2xl border border-purple-500/30">
                    <span className="text-xs sm:text-sm font-black text-amber-300 flex items-center gap-2">
                      <span>🎯 {isBadini ? "کویزا بابەتی:" : "کویزی بابەت:"}</span>
                      <span className="text-white">{finishedSessionDetails.subject}</span>
                    </span>
                    <span className="text-xs font-bold text-purple-200/80">
                      5 پرسیار
                    </span>
                  </div>

                  {/* QUESTIONS LIST */}
                  <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
                    {getSubjectQuizQuestions(finishedSessionDetails.subject).map((q, idx) => (
                      <div key={q.id} className="p-4 rounded-2xl bg-[#190d3d] border border-purple-500/30 space-y-3">
                        <p className="text-xs sm:text-sm font-black text-purple-100 flex items-start gap-2">
                          <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{q.question}</span>
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {q.options.map((opt, oIdx) => {
                            const isSelected = sessionQuizUserAnswers[q.id] === oIdx;
                            return (
                              <button
                                key={oIdx}
                                type="button"
                                onClick={() => {
                                  setSessionQuizUserAnswers((prev) => ({
                                    ...prev,
                                    [q.id]: oIdx
                                  }));
                                }}
                                className={`p-3 rounded-xl text-xs font-bold text-right transition border flex items-center gap-2 cursor-pointer ${
                                  isSelected
                                    ? "bg-purple-600 border-purple-300 text-white shadow-md shadow-purple-900/60 font-black scale-[1.01]"
                                    : "bg-purple-950/50 border-purple-500/20 text-purple-200/80 hover:bg-purple-900/50"
                                }`}
                              >
                                <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${
                                  isSelected ? "border-amber-300 bg-amber-400 text-black font-black" : "border-purple-400/40"
                                }`}>
                                  {isSelected ? "✓" : String.fromCharCode(65 + oIdx)}
                                </span>
                                <span className="truncate">{opt}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="pt-3 border-t border-purple-500/20">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSessionQuizSubmitted(true);
                        setSessionQuizStep("results");
                        if (finishedSessionDetails?.subject) {
                          const questions = getSubjectQuizQuestions(finishedSessionDetails.subject);
                          setResolvedQuestionKeys((prev) => {
                            const next = { ...prev };
                            questions.forEach((q) => {
                              if (sessionQuizUserAnswers[q.id] !== undefined) {
                                next[`${finishedSessionDetails.subject}_${q.question}`] = true;
                              }
                            });
                            return next;
                          });
                        }
                      }}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-sm shadow-xl shadow-emerald-900/60 transition cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                    >
                      <span>{isBadini ? "ناندنا بەرسڤان و بینینا ئەنجامی 📊" : "ناردنی وەڵامەکان و بینینی ئەنجام 📊"}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: RESULTS, INCORRECT ANSWERS REVIEW & SUBJECT COMPARISON */}
              {sessionQuizStep === "results" && (() => {
                const questions = getSubjectQuizQuestions(finishedSessionDetails.subject);
                let correctCount = 0;
                const incorrectList: any[] = [];

                questions.forEach((q) => {
                  const userAns = sessionQuizUserAnswers[q.id];
                  if (userAns === q.correct) {
                    correctCount++;
                  } else {
                    incorrectList.push({
                      ...q,
                      userAnswerIndex: userAns !== undefined ? userAns : -1
                    });
                  }
                });

                const scorePct = Math.round((correctCount / questions.length) * 100);

                return (
                  <div className="space-y-6">
                    {/* SCORE & LEVEL BADGE */}
                    <div className="bg-[#1e0e47] border border-amber-400/40 rounded-3xl p-5 text-center space-y-3 shadow-xl">
                      <div className="inline-block px-4 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black border border-amber-400/40">
                        🏆 {isBadini ? "ئاستێ تە د ڤی بابەتی دا:" : "ئاستی تۆ لەم بابەتەدا:"} {scorePct >= 80 ? "زۆر باش (ممتاز) ✨" : scorePct >= 60 ? "باش (جيد) 👍" : "پێویستی بە پێداچوونەوەیە 🎯"}
                      </div>
                      <div className="text-4xl sm:text-5xl font-black text-white">
                        {scorePct}% <span className="text-base text-purple-300 font-bold">({correctCount} / {questions.length})</span>
                      </div>
                      <p className="text-xs sm:text-sm text-purple-200 font-bold">
                        {isBadini
                          ? `ئاستێ تە د بابەتی ${finishedSessionDetails.subject} دا دیار بوو.`
                          : `ئاستی تۆ لە بابەتی ${finishedSessionDetails.subject} دا ڕوون بووەوە.`}
                      </p>
                    </div>

                    {/* INCORRECT ANSWERS BREAKDOWN (بەرسڤێن خەلەت) */}
                    <div className="space-y-3 bg-[#180930] p-4 rounded-2xl border border-purple-500/30">
                      <h4 className="text-xs sm:text-sm font-black text-rose-300 flex items-center gap-2">
                        <span>❌</span>
                        <span>{isBadini ? "بەرسڤێن خەلەت کرین و پێداچوونا وان:" : "وەڵامە هەڵەکان و پێداچوونەوەیان:"}</span>
                        <span className="text-xs font-bold text-purple-200">({incorrectList.length} پرسیار)</span>
                      </h4>

                      {incorrectList.length === 0 ? (
                        <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-center text-xs font-extrabold text-emerald-300">
                          🎉 {isBadini ? "تەواوی بەرسڤێن تە دروست بوون! ئافەرین!" : "تەواوی وەڵامەکانت دروست بوون! ئافەرین!"}
                        </div>
                      ) : (
                        <div className="space-y-2.5 max-h-[35vh] overflow-y-auto pr-1">
                          {incorrectList.map((inc, iIdx) => (
                            <div key={iIdx} className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs space-y-1.5">
                              <p className="font-extrabold text-white">
                                {inc.id}. {inc.question}
                              </p>
                              <div className="flex flex-col sm:flex-row gap-2 text-[11px] font-bold">
                                <span className="text-rose-300 bg-rose-900/40 px-2.5 py-1 rounded-lg border border-rose-500/30">
                                  ❌ {isBadini ? "بەرسڤا تە:" : "وەڵامی تۆ:"} {inc.userAnswerIndex >= 0 ? inc.options[inc.userAnswerIndex] : (isBadini ? "دیاری نەکریاوی" : "نەکراوە")}
                                </span>
                                <span className="text-emerald-300 bg-emerald-900/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                                  ✅ {isBadini ? "بەرسڤا دروست:" : "وەڵامی درست:"} {inc.options[inc.correct]}
                                </span>
                              </div>
                              <p className="text-[10px] text-purple-200/80 pt-0.5">
                                💡 <span className="font-bold">{isBadini ? "شیکار:" : "شیکاری:"}</span> {inc.explanation}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* SUBJECT COMPARISON CARD (بەراوردکرن دگەل بابەتێن دی) */}
                    <div className="p-4 rounded-2xl bg-[#14082c] border border-purple-500/30 space-y-3">
                      <h4 className="text-xs sm:text-sm font-black text-amber-300 flex items-center gap-2">
                        <span>📊</span>
                        <span>{isBadini ? "بەراوردکرنا ئاستی دگەل بابەتێن دی:" : "بەراوردی ئاست لەگەڵ بابەتەکانی تر:"}</span>
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        {[
                          { sub: "بیرکاری", pct: finishedSessionDetails.subject.includes("بیرکاری") ? scorePct : 85 },
                          { sub: "فیزیا", pct: finishedSessionDetails.subject.includes("فیزیا") ? scorePct : 75 },
                          { sub: "کیمیا", pct: finishedSessionDetails.subject.includes("کیمیا") ? scorePct : 90 },
                          { sub: "زیندەوەر", pct: finishedSessionDetails.subject.includes("زیندەوەر") ? scorePct : 80 },
                        ].map((item, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/20 space-y-1">
                            <div className="flex justify-between font-bold text-[11px]">
                              <span className="text-purple-100">{item.sub}</span>
                              <span className="text-amber-300">{item.pct}%</span>
                            </div>
                            <div className="w-full bg-purple-900/80 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-gradient-to-r from-purple-500 to-amber-400 h-full rounded-full" style={{ width: `${item.pct}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* FUTURE REVIEW PROMISE BANNER (هەفتیا بهێت) */}
                    <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-400/40 text-center text-xs font-bold text-indigo-200">
                      💡 {isBadini
                        ? "هەفتیا بهێت دی دووبارە کویز ب ڤان پرسیاران ب تە هێتە کرن دا ئاستێ تە باشتر لێ بێت! 🔄"
                        : "هەفتەی داهاتوو دووبارە کویز بەم پرسیارانە لێت دەکرێتەوە تا ئاستت بەرزتر بێتەوە! 🔄"}
                    </div>

                    {/* ACTION BUTTONS (SAVE QUIZ & SCHEDULE REMINDER) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          const newRecord = {
                            id: Date.now(),
                            subject: finishedSessionDetails.subject,
                            scorePct,
                            savedAt: new Date().toLocaleDateString()
                          };
                          const updated = [newRecord, ...savedSessionQuizzes];
                          setSavedSessionQuizzes(updated);
                          try {
                            localStorage.setItem("saved_session_quizzes_list", JSON.stringify(updated));
                          } catch (e) {}
                          showToast(isBadini ? "تاقیکرن ب سەرکەفتن هاتە سەیڤکرن! 💾" : "تاقیکردنەوە بە سەرکەوتوویی پاشەکەوت کرا! 💾");
                        }}
                        className="py-3 px-4 rounded-2xl bg-purple-900/60 hover:bg-purple-800/80 border border-purple-400/40 text-purple-100 font-extrabold text-xs transition cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>💾</span>
                        <span>{isBadini ? "سەیڤکرنا ڤێ تاقیکرنێ" : "پاشەکەوتکردنی ئەم تاقیکردنەوەیە"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowQuizScheduleModal(true)}
                        className="py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                      >
                        <span>⏰</span>
                        <span>{isBadini ? "ڕێکخستنا نوتیفیکەیشنا ئەڤرۆ" : "ڕێکخستنی ئاگادارکردنەوەی ئەمڕۆ"}</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. DAILY QUIZ SCHEDULE & NOTIFICATION REMINDER TIME PICKER MODAL */}
      <AnimatePresence>
        {showQuizScheduleModal && (
          <div className="fixed inset-0 z-[1000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-md bg-[#14082c] border border-purple-500/40 rounded-3xl p-6 shadow-2xl space-y-5 text-white my-auto text-right"
            >
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 text-lg shadow-md shrink-0">
                    🔔
                  </div>
                  <h3 className="text-base font-black text-white">
                    {isBadini ? "ڕێکخستنا ئاگەهدارییا کویزێ" : "ڕێکخستنی ئاگادارکردنەوەی کویز"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowQuizScheduleModal(false)}
                  className="w-8 h-8 rounded-full bg-purple-950/80 hover:bg-purple-900 border border-purple-500/30 text-purple-200 flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* RETAKE PROMPT QUESTION */}
              <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/30 space-y-2">
                <p className="text-xs sm:text-sm font-black text-purple-100 leading-relaxed">
                  {isBadini
                    ? "ئەرێ تە دڤێت ئەڤرۆژی ئەڤ تاقیکرنە ب تە بهێتە کرن؟"
                    : "ئایا دەتووێت ئەمڕۆش ئەم تاقیکردنەوەیە لێت بکرێتەوە؟"}
                </p>
                <p className="text-[11px] text-purple-200/70 font-medium">
                  {isBadini
                    ? "دەمەکێ دیاری بکە دا ب نوتیفیکەیشنێ تە ئاگەهدار بکەم کویزێ بکەی"
                    : "کاتێک دیاری بکە تا بە ئاگادارکردنەوە ئاگادارت بکەمەوە کویزەکە بکەیت"}
                </p>
              </div>

              {/* TIME PICKER INPUT */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-purple-200">
                  {isBadini ? "دەمێ نوتیفیکەیشنێ دیاری بکە (کاتژمێر):" : "کاتی ئاگادارکردنەوە دیاری بکە:"}
                </label>
                <input
                  type="time"
                  value={scheduledQuizTime}
                  onChange={(e) => setScheduledQuizTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-purple-950 border border-purple-500/40 text-white font-black text-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-center"
                />
              </div>

              {/* BUTTONS */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-purple-500/20">
                <button
                  type="button"
                  onClick={() => setShowQuizScheduleModal(false)}
                  className="py-3 px-4 rounded-2xl bg-purple-950 hover:bg-purple-900 border border-purple-500/30 text-purple-300 font-extrabold text-xs transition cursor-pointer"
                >
                  {isBadini ? "نەخێر" : "نەخێر"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const newReminder = {
                      id: Date.now(),
                      time: scheduledQuizTime,
                      subject: finishedSessionDetails?.subject || "بیرکاری",
                      createdAt: new Date().toLocaleDateString()
                    };
                    const updated = [newReminder, ...activeScheduledReminders];
                    setActiveScheduledReminders(updated);
                    try {
                      localStorage.setItem("app_scheduled_quiz_reminders", JSON.stringify(updated));
                    } catch (e) {}

                    setShowQuizScheduleModal(false);
                    showToast(
                      isBadini
                        ? `بەلێ! نوتیفیکەیشن هاتە ڕێکخستن بۆ دەمژمێر ${scheduledQuizTime} 🔔`
                        : `بەڵێ! ئاگادارکردنەوە ڕێکخرا بۆ کاتژمێر ${scheduledQuizTime} 🔔`
                    );
                  }}
                  className="py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-xs shadow-lg transition cursor-pointer active:scale-95"
                >
                  {isBadini ? "بەلێ، تۆمارکرنا دەمی 🔔" : "بەڵێ، تۆمارکردن 🔔"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};