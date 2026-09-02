import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Clock,
  HelpCircle,
  Check,
  XCircle,
  X,
  Bookmark,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Volume2,
  VolumeX,
  BookOpen,
  Lightbulb,
  Flame,
  Award,
  Star,
  AlertTriangle,
  LogOut,
  Play,
  FileText,
  Trash2,
  Save,
  Edit3
} from "lucide-react";
import confetti from "canvas-confetti";
import { Question, Language } from "../types";
import { getLocalizedText, getLocalizedArray } from "../utils/i18n";
import { GlossyGameStarsRow } from "./GlossyGameStars";
import { MascotCharacter, GlowingMascotBadge, FullBodyDancingMascot } from "./MascotCharacter";
import { AnimatedGrammarBreakdown } from "./AnimatedGrammarBreakdown";

interface QuizRunnerModalProps {
  subjectName: string;
  questions: Question[];
  language: Language;
  onClose: () => void;
  onQuizComplete: (score: number, totalXp: number, correctAnswersCount: number) => void;
  onToggleBookmark: (question: Question) => void;
  bookmarkedQuestionIds: string[];
  startFinishedDemo?: boolean;
}

const CORRECT_MESSAGES = {
  badini: [
    "زۆر دەست خۆش! بەرسڤا تە زۆر دروستە! 🎉",
    "ئەڤە بژیت! زۆر ب زیرەکانە بەرسڤ دا! 🌟",
    "ئۆف، تە زۆر ب جوانی و دروست چێکر! ✨",
    "دەستێن تە ئێشێ نەبینن! سەرکەفتن یا تە کۆنترۆڵکری! 🚀",
    "بێ وێنەی! ب ڤێ ڕێکێ بەردەوام بە! 💪🔥"
  ],
  ku: [
    "زۆر دەستخۆش! وەڵامەکەت زۆر ڕاستە! 🎉",
    "دەستت خۆش بێت! زۆر ب زیرەکی وەڵامت دایەوە! 🌟",
    "ئافەرم! وەڵامێکی زۆر تەواو و دروست! ✨",
    "بژیت، سەرکەوتن هەر شایەنی تۆیە! 🚀",
    "زۆر بێ وێنەی! بەردەوام بە لەم سەرکەوتنە! 💪🔥"
  ],
  en: [
    "Awesome Job! Correct Answer! 🎉",
    "Brilliant! You nailed it! 🌟",
    "Spot on! Keep up the great work! ✨",
    "You're on fire! Perfect answer! 🚀",
    "Fantastic job! So smart! 💪🔥"
  ]
};

const WRONG_MESSAGES = {
  badini: [
    "غەمگین نەبە و بێ هیڤی نەبە! هێشتا تە دەرفەت یا هەی! 💪✨",
    "پڕ هیڤی بە! ئەڤ خەلەتییە ئەزموونەکە بۆ فێربوونێ! 🌟",
    "چ تشتی نەدۆڕاندی! هەوڵدانێ ڕێکا سەرکەفتنێیە! 🚀",
    "سەربەرز بە! هەر کەسەک خەلەت دکەت دا بگریتە ڕێکا دروست! ✨",
    "سەریا خوار نەکە! پرسیارا پاشتر دێ ئارمانجێ پێکی! 🔥"
  ],
  ku: [
    "سەربەرز بە و بێ هیڤی مەبە! بەردەوام بە لە هەوڵدان! 💪✨",
    "دڵگران مەبە! ئەمە ئەزموونێکە بۆ فێربوونی زیاتر! 🌟",
    "هیچ نەدۆڕاوە! ڕێگای سەرکەوتن بە هەوڵدان دەست پێ دەکات! 🚀",
    "هەردەم بێ باک بە! فێربوون لە هەڵەکانەوە دەست پێ دەکات! ✨",
    "بێ هیڤی مەبە! پرسیاری دواتر دەبێتە نیشانەی سەرکەوتنت! 🔥"
  ],
  en: [
    "Don't lose hope! Practice makes perfect! 💪✨",
    "Keep your chin up! Every mistake is a step to learning! 🌟",
    "You've got this! Don't give up now! 🚀",
    "Stay strong! Success comes from trying again! ✨",
    "Never mind! The next question will be yours! 🔥"
  ]
};

const getMascotReactionMessage = (isCorrect: boolean, index: number, language: Language): string => {
  const langKey = language === "badini" ? "badini" : language === "ku" ? "ku" : "en";
  const list = isCorrect ? CORRECT_MESSAGES[langKey] : WRONG_MESSAGES[langKey];
  return list[index % list.length];
};

// Cute Mascot SVG with Raised Arms (Matching Screenshot Top Mascot)
export const MascotArmsUp: React.FC<{ size?: number }> = ({ size = 110 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mascotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9333ea" />
        <stop offset="100%" stopColor="#6b21a8" />
      </linearGradient>
      <linearGradient id="faceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f3e8ff" />
      </linearGradient>
      <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#7c3aed" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Shadow beneath mascot */}
    <ellipse cx="60" cy="112" rx="28" ry="6" fill="#6d28d9" opacity="0.2" />

    <g filter="url(#softGlow)">
      {/* Top Antenna */}
      <path d="M60 30 L60 16" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="12" r="6" fill="#c084fc" />
      <circle cx="58" cy="10" r="2" fill="#ffffff" />

      {/* Feet */}
      <ellipse cx="48" cy="106" rx="10" ry="6" fill="#5b21b6" />
      <ellipse cx="72" cy="106" rx="10" ry="6" fill="#5b21b6" />

      {/* Left Raised Arm */}
      <path d="M36 68 C22 62, 16 48, 22 42 C26 38, 34 44, 40 54" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="2" strokeLinecap="round" />

      {/* Right Raised Arm */}
      <path d="M84 68 C98 62, 104 48, 98 42 C94 38, 86 44, 80 54" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="2" strokeLinecap="round" />

      {/* Round Body */}
      <ellipse cx="60" cy="68" rx="36" ry="36" fill="url(#mascotGrad)" />

      {/* Face Oval Patch */}
      <path d="M38 64 C38 48, 48 42, 60 42 C72 42, 82 48, 82 64 C82 76, 72 82, 60 82 C48 82, 38 76, 38 64 Z" fill="url(#faceGrad)" />

      {/* Eyes (Happy ^ ^) */}
      <path d="M48 60 C50 54, 54 54, 56 60" stroke="#2e1065" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M64 60 C66 54, 70 54, 72 60" stroke="#2e1065" strokeWidth="3.5" strokeLinecap="round" fill="none" />

      {/* Rosy Cheeks */}
      <ellipse cx="44" cy="66" rx="4" ry="2.5" fill="#f472b6" opacity="0.6" />
      <ellipse cx="76" cy="66" rx="4" ry="2.5" fill="#f472b6" opacity="0.6" />

      {/* Happy Smile Mouth */}
      <path d="M54 68 C54 74, 66 74, 66 68 Z" fill="#2e1065" />
    </g>
  </svg>
);

// Cute Mascot SVG giving Thumbs Up (Matching Screenshot Bottom Mascot)
export const MascotThumbsUp: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mascotGradThumb" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9333ea" />
        <stop offset="100%" stopColor="#6b21a8" />
      </linearGradient>
      <linearGradient id="faceGradThumb" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f3e8ff" />
      </linearGradient>
    </defs>

    {/* Antenna */}
    <path d="M50 22 L50 12" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />
    <circle cx="50" cy="8" r="5" fill="#c084fc" />

    {/* Feet */}
    <ellipse cx="40" cy="86" rx="8" ry="5" fill="#5b21b6" />
    <ellipse cx="60" cy="86" rx="8" ry="5" fill="#5b21b6" />

    {/* Body */}
    <circle cx="50" cy="52" r="28" fill="url(#mascotGradThumb)" />

    {/* Face Patch */}
    <ellipse cx="50" cy="50" rx="18" ry="14" fill="url(#faceGradThumb)" />

    {/* Winking Eye */}
    <path d="M40 48 C42 44, 45 44, 47 48" stroke="#2e1065" strokeWidth="3" strokeLinecap="round" fill="none" />

    {/* Open Right Eye */}
    <circle cx="58" cy="47" r="3" fill="#2e1065" />
    <circle cx="59" cy="46" r="1" fill="#ffffff" />

    {/* Smile */}
    <path d="M46 54 C46 59, 54 59, 54 54 Z" fill="#2e1065" />

    {/* Sparkle */}
    <path d="M78 30 L80 22 L82 30 L90 32 L82 34 L80 42 L78 34 L70 32 Z" fill="#fbbf24" />
  </svg>
);

// Small Mascot Head for Top Header
export const MascotAvatarHead: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="28" fill="#a855f7" />
    <ellipse cx="30" cy="28" rx="18" ry="14" fill="#ffffff" />
    {/* Soft cheeks */}
    <circle cx="18" cy="30" r="2.5" fill="#f472b6" opacity="0.6" />
    <circle cx="42" cy="30" r="2.5" fill="#f472b6" opacity="0.6" />
    {/* Eyes */}
    <path d="M 20,27 C 20,22 26,22 26,27" stroke="#2e1065" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M 34,27 C 34,22 40,22 40,27" stroke="#2e1065" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* Clean Cute Smile Arc without tongue */}
    <path d="M 26 31 C 26 35, 34 35, 34 31" stroke="#2e1065" strokeWidth="2.2" strokeLinecap="round" fill="none" />
  </svg>
);

export const QuizRunnerModal: React.FC<QuizRunnerModalProps> = ({
  subjectName,
  questions,
  language,
  onClose,
  onQuizComplete,
  onToggleBookmark,
  bookmarkedQuestionIds
}) => {
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [wrongQuestionsList, setWrongQuestionsList] = useState<Question[]>([]);
  const [repeatedQuestionIds, setRepeatedQuestionIds] = useState<string[]>([]);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isMascotSpeaking, setIsMascotSpeaking] = useState(false);
  const [showExitConfirmModal, setShowExitConfirmModal] = useState(false);

  // Per-question notes state (persisted in localStorage)
  const [questionNotes, setQuestionNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem("quiz_question_notes");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [currentNoteText, setCurrentNoteText] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("quiz_question_notes", JSON.stringify(questionNotes));
    } catch (e) {
      console.warn("Failed to save question notes to localStorage:", e);
    }
  }, [questionNotes]);

  const handleExitClick = () => {
    if (isFinished) {
      onClose();
    } else {
      setShowExitConfirmModal(true);
    }
  };

  const handleReadMascotSpeech = (speechMessage: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    if (isMascotSpeaking) {
      setIsMascotSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(speechMessage);
    utterance.lang = language === "badini" || language === "ku" ? "ar-SA" : "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 1.25;

    utterance.onstart = () => setIsMascotSpeaking(true);
    utterance.onend = () => setIsMascotSpeaking(false);
    utterance.onerror = () => setIsMascotSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Initialize or update activeQuestions when props change
  useEffect(() => {
    if (questions && questions.length > 0) {
      // Limit to max 5 questions as requested
      const limitedQuestions = questions.slice(0, 5);
      setActiveQuestions(limitedQuestions);
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setScore(0);
      setEarnedXp(0);
      setTimeLeft(45);
      setIsFinished(false);
      setWrongQuestionsList([]);
      setRepeatedQuestionIds([]);
      setTotalAttempted(0);
      setElapsedSeconds(0);
    }
  }, [questions]);

  // Overall quiz elapsed time counter
  useEffect(() => {
    if (isFinished) return;
    const elapsedTimer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(elapsedTimer);
  }, [isFinished]);

  const currentQuestion = activeQuestions[currentIndex];
  const isBookmarked = currentQuestion ? bookmarkedQuestionIds.includes(currentQuestion.id) : false;
  const isRepeatedQuestion = currentQuestion ? repeatedQuestionIds.includes(currentQuestion.id) : false;
  const currentQuestionNote = currentQuestion ? questionNotes[currentQuestion.id] : undefined;
  const hasNote = Boolean(currentQuestionNote && currentQuestionNote.trim().length > 0);

  const handleOpenNoteModal = () => {
    setCurrentNoteText(currentQuestionNote || "");
    setShowNoteModal(true);
  };

  const handleSaveNote = () => {
    if (!currentQuestion) return;
    const trimmed = currentNoteText.trim();
    setQuestionNotes((prev) => {
      const updated = { ...prev };
      if (trimmed) {
        updated[currentQuestion.id] = trimmed;
      } else {
        delete updated[currentQuestion.id];
      }
      return updated;
    });
    setShowNoteModal(false);
  };

  const handleDeleteNote = () => {
    if (!currentQuestion) return;
    setQuestionNotes((prev) => {
      const updated = { ...prev };
      delete updated[currentQuestion.id];
      return updated;
    });
    setCurrentNoteText("");
    setShowNoteModal(false);
  };

  // Timer countdown
  useEffect(() => {
    if (isFinished || isAnswered || !currentQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isAnswered, isFinished, currentQuestion]);

  const handleTimeOut = () => {
    setIsAnswered(true);
  };

  // Helper for sound effects using Web Audio API
  const playSoundEffect = (isCorrect: boolean) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      if (isCorrect) {
        // High ascending happy chime (C5 - E5 - G5 - C6)
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 0.25);
        });
      } else {
        // Gentle encouraging warm chime (G4 -> C5 -> E5)
        const notes = [392.00, 523.25, 659.25];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.1);
          osc.stop(ctx.currentTime + idx * 0.1 + 0.3);
        });
      }
    } catch {
      // Audio not supported
    }
  };

  const playToggleSound = (willBeEnabled: boolean) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.connect(gain);
      gain.connect(ctx.destination);
      if (willBeEnabled) {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
      } else {
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch {
      // ignore
    }
  };

  const playVictoryFanfare = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") ctx.resume();

      const notes = [
        { freq: 523.25, delay: 0 },
        { freq: 659.25, delay: 0.12 },
        { freq: 783.99, delay: 0.24 },
        { freq: 1046.50, delay: 0.38 },
        { freq: 1318.51, delay: 0.55 }
      ];

      notes.forEach(({ freq, delay }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
        gain.gain.setValueAtTime(0.25, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.4);
      });
    } catch {
      // Audio not supported
    }
  };

  const speakText = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    try {
      const synth = window.speechSynthesis;
      if (synth.paused) {
        synth.resume();
      }
      synth.cancel();

      // Clean text: Replace slashes (/ and \) with space or Kurdish 'یان' so TTS never says "SLASH"
      const cleanText = text
        .replace(/[\/\\]+/g, " یان ")
        .replace(/[\n\r]+/g, " ")
        .replace(/["'”«»]/g, "")
        .replace(/\s+/g, " ")
        .trim();

      if (!cleanText) return;

      setTimeout(() => {
        try {
          const utterance = new SpeechSynthesisUtterance(cleanText);
          utterance.lang = language === "badini" || language === "ku" ? "ar-SA" : "en-US";
          utterance.rate = 0.88;
          utterance.pitch = 1.0;
          
          if (synth.paused) {
            synth.resume();
          }
          synth.speak(utterance);
        } catch {
          // ignore
        }
      }, 50);
    } catch {
      // Fallback
    }
  };

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    playToggleSound(nextState);
    if (nextState) {
      speakText(currentQuestionText);
    } else if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered || !currentQuestion) return;
    setSelectedOption(index);
    setIsAnswered(true);
    setTotalAttempted((prev) => prev + 1);

    const isCorrect = index === currentQuestion.correctIndex;
    const voiceMsg = getMascotReactionMessage(isCorrect, currentIndex, language);
    if (soundEnabled) {
      playSoundEffect(isCorrect);
      speakText(voiceMsg.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, ''));
    }

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setEarnedXp((prev) => prev + (currentQuestion.xp || 15));
      if (soundEnabled) {
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } else {
      // 1. Auto-bookmark the wrong question if not already bookmarked
      if (!isBookmarked) {
        onToggleBookmark(currentQuestion);
      }

      // 2. Track in wrong questions list
      setWrongQuestionsList((prev) => {
        if (!prev.some((q) => q.id === currentQuestion.id)) {
          return [...prev, currentQuestion];
        }
        return prev;
      });

      // 3. Queue this wrong question to repeat again later in the quiz!
      setActiveQuestions((prev) => [
        ...prev,
        {
          ...currentQuestion,
          id: `${currentQuestion.id}_repeat_${Date.now()}` // Unique repeat ID
        }
      ]);

      // 4. Mark repeated ID
      setRepeatedQuestionIds((prev) => [...prev, currentQuestion.id]);
    }
  };

  const proceedToNextQuestion = () => {
    setIsMascotSpeaking(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (currentIndex + 1 < activeQuestions.length) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(45);
    } else {
      setIsFinished(true);
      playVictoryFanfare();
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 }
      });
    }
  };

  const handleNext = () => {
    proceedToNextQuestion();
  };

  const handleFinishAndProceed = () => {
    onQuizComplete(score, earnedXp, score);
    onClose();
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(45);
    }
  };

  const handleRestart = () => {
    setDirection(1);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setEarnedXp(0);
    setTimeLeft(45);
    setIsFinished(false);
  };

  if (!currentQuestion && !isFinished) {
    return null;
  }

  const currentQuestionText = getLocalizedText(currentQuestion, "question", language);
  const currentExplanationText = getLocalizedText(currentQuestion, "explanation", language);
  const currentOptions = getLocalizedArray(currentQuestion, "options", language);

  const progressPct = Math.round(((currentIndex + 1) / (activeQuestions.length || 1)) * 100);

  // Calculate Stars
  const scorePercent = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  let starsCount = 0;
  if (scorePercent >= 80) starsCount = 3;
  else if (scorePercent >= 50) starsCount = 2;
  else if (scorePercent > 0) starsCount = 1;

  // Level & Word of Encouragement
  const getPerformanceDetails = () => {
    if (starsCount === 3) {
      return {
        levelBadini: "ئاستێ تە: گەلەک بەرز و نایاب (3 ستێرە) 🏆",
        levelKu: "ئاستی تۆ: زۆر بەرز و نایاب (3 ئەستێرە) 🏆",
        levelEn: "Level: Excellent & Master (3 Stars) 🏆",
        quoteBadini: "«ئەڤە نیشانا بزاڤ و تێکۆشینا تەیا بەردەوامە! ئاستێ تە یێ ناوازەیە و دگۆپێتکێ دایە. هەر بەردەوام بە.»",
        quoteKu: "«ئەمە نیشانەی هۆشیاری و هەوڵدانی بەردەوامتە! ئاستت زۆر لە لوتکەدایە. بەردەوام بە.»",
        quoteEn: "“Fantastic work! You demonstrated complete mastery over these questions. Keep shining!”",
        badgeBg: "bg-emerald-500/10 text-emerald-700 border-emerald-200"
      };
    } else if (starsCount === 2) {
      return {
        levelBadini: "ئاستێ تە: گەلەک باش و بەرەڤ پێشچوو (2 ستێرە) ⭐️⭐️",
        levelKu: "ئاستی تۆ: زۆر باش و پێشکەوتوو (2 ئەستێرە) ⭐️⭐️",
        levelEn: "Level: Very Good (2 Stars) ⭐️⭐️",
        quoteBadini: "«ئەنجامەکێ گەلەک باشە! ب بتنێ گۆڕانکاریەکا بچووک دێ گەهیە ٣ ستێران و نمرەیا تەمام.»",
        quoteKu: "«ئەنجامێکی زۆر باشە! تەنها بە تۆزێک ڕاهێنانی تر دەگەیتە ٣ ئەستێرە و نمرەی تەواو.»",
        quoteEn: "“Great effort! You are very close to achieving 3 full stars. Keep practicing!”",
        badgeBg: "bg-amber-500/10 text-amber-700 border-amber-200"
      };
    } else if (starsCount === 1) {
      return {
        levelBadini: "ئاستێ تە: باشە - پێویستی ب پێداچوونێ هەیە (1 ستێرە) ⭐️",
        levelKu: "ئاستی تۆ: باشە - پێویستی بە پێداچوونەوە هەیە (1 ئەستێرە) ⭐️",
        levelEn: "Level: Good - Needs Review (1 Star) ⭐️",
        quoteBadini: "«هەوڵدانەکا باش بوو! پرسیارێن خەلەت سەحکێڤە و دووبارە ڕاهێنانێ بکە دا نمرەیا تە بەرزتر لێ بهێت.»",
        quoteKu: "«هەوڵدانێکی باش بوو! سەیری پرسیارە هەڵەکان بکەرەوە و دووبارە هەوڵبدەرەوە تا نمرەکەت بەرزتر بێت.»",
        quoteEn: "“Good try! Check the wrong questions and repeat to improve your score.”",
        badgeBg: "bg-purple-500/10 text-purple-700 border-purple-200"
      };
    } else {
      return {
        levelBadini: "ئاستێ تە: دەستپێک - دووبارە تاقیبکەوه 🔄",
        levelKu: "ئاستی تۆ: دەستپێک - دووبارە تاقیبکەرەوە 🔄",
        levelEn: "Level: Beginner - Try Again 🔄",
        quoteBadini: "«چ ئاریشە نینە! هەر شکەستنەک دەرگەهەکە بۆ فێربوونا نوو. سەیری شڕۆڤەکرنان بکه و دووبارە هەوڵبدە.»",
        quoteKu: "«هیچ کێشەیەک نییە! هەر هەڵەیەک دەرفەتێکە بۆ فێربوون. شیکردنەوەکان بخوێنەرەوە و دووبارە تاقیبکەرەوە.»",
        quoteEn: "“Don't give up! Review the explanations and try again to master this material.”",
        badgeBg: "bg-rose-500/10 text-rose-700 border-rose-200"
      };
    }
  };

  const perf = getPerformanceDetails();

  const formatTimeSpent = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;

    if (language === "badini") {
      if (mins > 0 && secs > 0) return `تە ئەڤ تاقیکرنە د ${mins} خولەک و ${secs} چڕکان دا تەواو کر`;
      if (mins > 0 && secs === 0) return `تە ئەڤ تاقیکرنە د ${mins} خولەک دا تەواو کر`;
      return `تە ئەڤ تاقیکرنە د ${secs} چڕکان دا تەواو کر`;
    } else if (language === "ku") {
      if (mins > 0 && secs > 0) return `تۆ ئەم تاقیکردنەوەت لە ${mins} خولەک و ${secs} چڕکدا تەواو کرد`;
      if (mins > 0 && secs === 0) return `تۆ ئەم تاقیکردنەوەت لە ${mins} خولەکدا تەواو کرد`;
      return `تۆ ئەم تاقیکردنەوەت لە ${secs} چڕکدا تەواو کرد`;
    } else {
      if (mins > 0 && secs > 0) return `You completed this test in ${mins} min ${secs} sec`;
      if (mins > 0 && secs === 0) return `You completed this test in ${mins} min`;
      return `You completed this test in ${secs} sec`;
    }
  };

  return (
    <motion.div
      dir="rtl"
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full h-[100dvh] max-h-screen bg-[#f8f6fe] text-slate-800 flex flex-col overflow-hidden select-none"
    >
      
      {/* 1. TOP NAVBAR - Hide at the end/finish screen as requested */}
      {!isFinished && (
        <div className="px-3 sm:px-6 py-2.5 bg-white/95 backdrop-blur-md border-b border-purple-100/80 flex items-center justify-between gap-2 sm:gap-4 shrink-0 shadow-xs w-full max-w-full overflow-hidden relative z-40">
          
          {/* Right side (RTL): Back Arrow & Subject Pill */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={handleExitClick}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white border border-purple-100 shadow-sm text-purple-600 hover:bg-purple-50 hover:border-purple-200 transition flex items-center justify-center cursor-pointer active:scale-95 shrink-0"
              title="داخستن"
            >
              <ArrowRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-purple-600" />
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-white border border-purple-100 shadow-xs text-purple-700 font-extrabold text-xs sm:text-sm shrink-0">
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 shrink-0" />
              <span className="truncate max-w-[80px] sm:max-w-[160px]">{subjectName}</span>
            </div>
          </div>

          {/* Center: Question Counter & Progress Bar */}
          <div className="flex flex-col items-center justify-center gap-1 min-w-0 px-1 shrink">
            <span className="text-[11px] sm:text-sm font-extrabold text-slate-700 whitespace-nowrap">
              {language === "badini"
                ? `پرسیار ${currentIndex + 1} ژ ${activeQuestions.length}`
                : language === "ku"
                ? `پرسیار ${currentIndex + 1} لە ${activeQuestions.length}`
                : `Question ${currentIndex + 1} / ${activeQuestions.length}`}
            </span>
            <div className="w-16 sm:w-36 h-2 bg-purple-100/80 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-purple-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Left side (RTL): Sound Button & Top Mascot Avatar */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              onClick={handleToggleSound}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl border shadow-xs transition flex items-center justify-center cursor-pointer shrink-0 active:scale-95 ${
                soundEnabled
                  ? "bg-purple-600 border-purple-600 text-white shadow-purple-200"
                  : "bg-white border-purple-100 text-slate-400 hover:bg-purple-50"
              }`}
              title="دەنگ"
            >
              {soundEnabled ? <Volume2 className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" /> : <VolumeX className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-slate-400" />}
            </button>

            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-purple-100 border-2 border-purple-200 flex items-center justify-center shadow-xs overflow-hidden shrink-0">
              <MascotAvatarHead size={32} />
            </div>
          </div>
        </div>
      )}

      {/* MAIN QUIZ CONTAINER WITH WHITE SCROLLBAR - SCROLLS SEPARATELY */}
      <div className="flex-1 w-full overflow-y-auto quiz-light-scrollbar min-h-0 bg-[#f8f6fe]">
        <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 py-4 md:py-6 flex flex-col justify-start space-y-4 md:space-y-6 min-h-0 pb-8">
          
          <AnimatePresence mode="wait" custom={direction}>
            {!isFinished ? (
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="space-y-4 md:space-y-5 flex-1 flex flex-col min-h-0 py-1"
              >

                {/* 2. META PILLS ROW (4 Pills) */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center shrink-0">
                  {/* Pill 1: Year & Session */}
                  <div 
                    className="bg-white border border-purple-100/90 rounded-xl md:rounded-2xl py-2 px-1.5 shadow-xs flex items-center justify-center gap-1 text-center min-w-0"
                    title={currentQuestion?.year ? currentQuestion.year.replace(/الوزاري/g, "وزاری") : (language === "badini" ? "وزاری" : "وزاری")}
                  >
                    <span className="text-amber-500 font-extrabold text-[11px] sm:text-xs md:text-sm truncate">
                      {currentQuestion?.year
                        ? currentQuestion.year.replace(/الوزاري/g, "وزاری")
                        : (language === "badini" ? "وزاری" : "وزاری")}
                    </span>
                  </div>

                  {/* Pill 2: Grade */}
                  <div className="bg-white border border-purple-100/90 rounded-xl md:rounded-2xl py-2 px-1 shadow-xs flex items-center justify-center gap-1.5">
                    <Award className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                    <span className="text-purple-950 font-bold text-[10px] sm:text-xs md:text-sm">پۆلی 12</span>
                  </div>

                  {/* Pill 3: Streak */}
                  <div className="bg-white border border-purple-100/90 rounded-xl md:rounded-2xl py-2 px-1 shadow-xs flex items-center justify-center gap-1.5">
                    <span className="text-purple-950 font-extrabold text-xs sm:text-sm md:text-base">7</span>
                    <Flame className="w-4 h-4 md:w-5 md:h-5 text-purple-600 fill-purple-600" />
                  </div>

                  {/* Pill 4: XP */}
                  <div className="bg-white border border-purple-100/90 rounded-xl md:rounded-2xl py-2 px-1 shadow-xs flex items-center justify-center gap-1.5">
                    <span className="text-amber-500 font-extrabold text-xs sm:text-sm md:text-base">1250</span>
                    <span className="text-amber-500 text-xs sm:text-sm md:text-base">⭐</span>
                  </div>
                </div>

                {/* 3. MASCOT BANNER BACKGROUND - Glossy 3D Logo & Light Rays (شەوق) */}
                <div className="relative w-full flex flex-col items-center justify-center py-3 sm:py-4 shrink-0 overflow-visible">
                  {/* Rotating Sunburst Light Rays (شەوق) behind Mascot */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full pointer-events-none opacity-40 -z-10"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent 0deg, rgba(168,85,247,0.3) 15deg, transparent 30deg, rgba(251,191,36,0.35) 45deg, transparent 60deg, rgba(168,85,247,0.3) 75deg, transparent 90deg, rgba(251,191,36,0.35) 105deg, transparent 120deg, rgba(168,85,247,0.3) 135deg, transparent 150deg, rgba(251,191,36,0.35) 165deg, transparent 180deg, rgba(168,85,247,0.3) 195deg, transparent 210deg, rgba(251,191,36,0.35) 225deg, transparent 240deg, rgba(168,85,247,0.3) 255deg, transparent 270deg, rgba(251,191,36,0.35) 285deg, transparent 300deg, rgba(168,85,247,0.3) 315deg, transparent 330deg, rgba(251,191,36,0.35) 345deg, transparent 360deg)"
                    }}
                  />

                  {/* Outer Purple Backlight Pulse Glow */}
                  <div className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-purple-500/20 blur-xl animate-pulse -z-10" />

                  {/* Dynamic Glowing Mascot Badge matching user image */}
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Animated Live Comment Speech Bubble Reaction on Answer - Placed ABOVE Logo */}
                    <AnimatePresence>
                      {isAnswered && (
                        <motion.div
                          initial={{ opacity: 0, y: -12, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.8 }}
                          className="relative mb-3 z-30 flex flex-col items-center max-w-xs sm:max-w-md"
                        >
                          {/* Comic Speech Bubble Box */}
                          <div
                            className={`px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl shadow-xl border text-xs sm:text-sm font-black flex items-center justify-center gap-2 text-center relative ${
                              selectedOption === currentQuestion.correctIndex
                                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-300 shadow-emerald-500/25"
                                : "bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800 text-white border-purple-300/80 shadow-purple-600/30"
                            }`}
                          >
                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 fill-amber-300 shrink-0" />
                            <span className="leading-snug tracking-wide">
                              {getMascotReactionMessage(
                                selectedOption === currentQuestion.correctIndex,
                                currentIndex,
                                language
                              )}
                            </span>

                            {/* Comment Speech Bubble Pointer Arrow (pointing down towards mascot) */}
                            <div
                              className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[10px] drop-shadow-sm ${
                                selectedOption === currentQuestion.correctIndex
                                  ? "border-t-teal-600"
                                  : "border-t-indigo-800"
                              }`}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <GlowingMascotBadge
                      size={135}
                      expression={
                        !isAnswered
                          ? "happy"
                          : selectedOption === currentQuestion.correctIndex
                          ? "cheering"
                          : "encouraging"
                      }
                      showStars={true}
                    />
                  </div>
                </div>

                {/* 4. QUESTION CARD WITH AMBER BOOKMARK & PURPLE NOTE TOOLBAR */}
                <div className="relative bg-white rounded-2xl md:rounded-3xl p-5 pt-8 sm:p-7 sm:pt-9 md:p-8 md:pt-10 shadow-md border border-purple-100/80 text-center z-10 shrink-0 mt-3">
                  {/* Bookmark & Note Action Toolbar Ribbon at Top */}
                  <div className="absolute -top-4 sm:-top-4.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-md p-1.5 px-3 rounded-full shadow-md shadow-purple-900/10 border-2 border-purple-100/90 z-20 transition-all hover:border-purple-200 whitespace-nowrap">
                    {/* Bookmark Button */}
                    <button
                      type="button"
                      onClick={() => onToggleBookmark(currentQuestion)}
                      className={`px-3 py-1.5 rounded-full font-black text-xs sm:text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                        isBookmarked
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm shadow-amber-500/30 border border-amber-400"
                          : "bg-amber-50/80 hover:bg-amber-100/90 text-amber-900 border border-amber-200/70"
                      }`}
                      title={language === "badini" ? "پاشەکەوتکرنا پرسیارێ" : "پاشەکەوتکردنی پرسیار"}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-white text-white" : "text-amber-600"}`} />
                      <span>
                        {language === "badini" ? "پاراستن" : "پاراستن"}
                      </span>
                    </button>

                    <div className="w-[1px] h-4 bg-purple-200/80 rounded-full" />

                    {/* Add / Edit Note Button */}
                    <button
                      type="button"
                      onClick={handleOpenNoteModal}
                      className={`px-3 py-1.5 rounded-full font-black text-xs sm:text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                        hasNote
                          ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white shadow-sm shadow-purple-500/30 border border-purple-300"
                          : "bg-purple-50/80 hover:bg-purple-100/90 text-purple-900 border border-purple-200/70"
                      }`}
                      title={language === "badini" ? "زێدەکرنا تێبینیێ ل سەر ڤێ پرسیارێ" : "زیادکردنی تێبینی لەسەر ئەم پرسیارە"}
                    >
                      <FileText className={`w-3.5 h-3.5 ${hasNote ? "text-white" : "text-purple-600"}`} />
                      <span>
                        {hasNote
                          ? (language === "badini" ? "تێبینی هەیە" : "تێبینی هەیە")
                          : (language === "badini" ? "+ تێبینی" : "+ تێبینی")}
                      </span>
                      {hasNote && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse ring-2 ring-purple-300" />
                      )}
                    </button>
                  </div>

                  {/* Repeated Question Badge Notice */}
                  {isRepeatedQuestion && (
                    <div className="mt-1 mb-3 px-3.5 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 animate-pulse">
                      <RotateCcw className="w-4 h-4 text-amber-600" />
                      <span>
                        {language === "badini"
                          ? "ئەڤ پرسیارە دووبارە بوو چونکی وە بەرسڤەکا خەلەت دابوو!"
                          : "ئەم پرسیارە دووبارە بوویەوە چونکە وەڵامێکی هەڵەت دابوو!"}
                      </span>
                    </div>
                  )}

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-black text-slate-800 leading-relaxed text-center pt-1.5">
                    {currentQuestionText}
                  </p>

                  {/* Saved Note Card Display on Question */}
                  {hasNote && (
                    <div className="mt-3.5 p-2.5 px-3.5 bg-gradient-to-r from-purple-50 via-indigo-50/80 to-purple-50 border border-purple-200/90 rounded-2xl text-purple-950 text-xs font-bold flex items-center justify-between gap-2.5 text-right shadow-2xs">
                      <div className="flex items-center gap-2 overflow-hidden min-w-0">
                        <div className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                          <FileText className="w-3.5 h-3.5" />
                        </div>
                        <div className="overflow-hidden min-w-0">
                          <span className="text-[10px] text-purple-600 font-extrabold block">
                            {language === "badini" ? "تێبینییا تە بۆ ڤێ پرسیارێ:" : "تێبینیی تۆ بۆ ئەم پرسیارە:"}
                          </span>
                          <p className="text-xs text-slate-800 font-extrabold truncate">
                            {currentQuestionNote}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleOpenNoteModal}
                        className="px-2.5 py-1 rounded-xl bg-purple-200/80 hover:bg-purple-300 text-purple-900 text-[11px] font-black shrink-0 transition cursor-pointer active:scale-95 flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3 text-purple-700" />
                        <span>{language === "badini" ? "دەستکاری" : "دەستکاری"}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* 5. OPTIONS LIST */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 shrink-0">
                  {currentOptions.map((opt, idx) => {
                    const optionLabels = ["A", "B", "C", "D"];
                    
                    let containerStyle =
                      "bg-white border-purple-100/90 text-slate-800 hover:border-purple-300 hover:bg-purple-50/40 shadow-xs";

                    if (isAnswered) {
                      if (idx === currentQuestion.correctIndex) {
                        containerStyle =
                          "bg-[#f3ebff] border-2 border-purple-500 text-purple-900 shadow-sm font-extrabold";
                      } else if (selectedOption === idx) {
                        containerStyle = "bg-rose-50 border-2 border-rose-400 text-rose-900 shadow-sm";
                      } else {
                        containerStyle = "bg-white/60 border-purple-100/40 text-slate-400 opacity-50";
                      }
                    } else if (selectedOption === idx) {
                      containerStyle = "bg-[#f3ebff] border-2 border-purple-500 text-purple-900 shadow-sm";
                    }

                    const isSelectedCorrect = isAnswered && idx === currentQuestion.correctIndex;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswered}
                        className={`w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-right font-bold text-xs sm:text-sm md:text-base flex items-center justify-between transition-all duration-200 cursor-pointer min-h-[52px] sm:min-h-[60px] ${containerStyle}`}
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3">
                          {/* Radio Checkmark Circle on Left */}
                          {isSelectedCorrect || (selectedOption === idx && !isAnswered) ? (
                            <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xs shrink-0">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : isAnswered && selectedOption === idx && idx !== currentQuestion.correctIndex ? (
                            <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xs shrink-0">
                              <XCircle className="w-3.5 h-3.5" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-purple-200 bg-slate-50/50 shrink-0" />
                          )}

                          <span className="leading-snug text-xs sm:text-sm md:text-base">
                            {typeof opt === "string" ? opt.replace(/^[A-D]\s*[-–:]\s*/i, "") : opt}
                          </span>
                        </div>

                        {/* Letter Badge (A, B, C, D) on Right */}
                        <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-purple-100/80 text-purple-700 font-extrabold text-xs sm:text-sm flex items-center justify-center shrink-0">
                          {optionLabels[idx]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* 5. EXPLANATION CARD (شیکردنەوە / شڕۆڤەکرن) & ANIMATED GRAMMAR BREAKDOWN */}
                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="space-y-2.5 my-1"
                    >
                      {/* Interactive Animated Grammar Breakdown (if available for Kurdish verbs/grammar) */}
                      {currentQuestion?.grammarBreakdown && (
                        <AnimatedGrammarBreakdown
                          breakdown={currentQuestion.grammarBreakdown}
                          language={language}
                          isWrong={isAnswered && selectedOption !== currentQuestion.correctIndex}
                        />
                      )}

                      {/* General Explanation Card */}
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-[#f3ebff]/95 border border-purple-200 text-slate-800 flex items-start gap-3 shadow-xs shrink-0">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs shrink-0 mt-0.5">
                          <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 fill-amber-300" />
                        </div>

                        <div className="space-y-1 min-w-0 flex-1">
                          <span className="block font-black text-purple-900 text-xs sm:text-sm">
                            {language === "badini"
                              ? "شڕۆڤەکرن:"
                              : language === "ku"
                              ? "شیکردنەوە:"
                              : "Explanation:"}
                          </span>
                          <p className="text-xs sm:text-sm leading-relaxed text-slate-800 font-semibold whitespace-pre-line">
                            {currentExplanationText}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            ) : (
              /* FINISHED RESULT SCREEN WITH SPECTACULAR STARS, LEVEL, TIME & MOTIVATIONAL WORD */
              <motion.div
                key="finished-screen"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="py-4 text-center space-y-3.5 flex-1 flex flex-col items-center justify-center max-w-sm sm:max-w-md mx-auto w-full px-2 relative"
              >
                {/* 1. Spectacular 3D Candy Glossy Game Stars Display (Image Matched) */}
                <div className="relative flex flex-col items-center justify-center w-full">
                  <GlossyGameStarsRow starsCount={starsCount} />

                  <span className="text-xs sm:text-sm font-black text-amber-700 bg-amber-100/90 px-4 py-1.5 rounded-full border border-amber-300 shadow-xs -mt-1">
                    {starsCount} / 3 {language === "badini" ? "ستێرە هاتیە وەرگرتن" : "ئەستێرە وەرگیرا"} ⭐️
                  </span>
                </div>

                {/* 2. Header & Level Evaluation Badge */}
                <div className="space-y-1.5 w-full">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                    {language === "badini"
                      ? "پیرۆزە! قۆناغ تەواو بوو"
                      : language === "ku"
                      ? "پیرۆزە! قۆناغەکە تەواو بوو"
                      : "Stage Completed!"}
                  </h2>
                  
                  {/* Level Badge */}
                  <div className={`inline-block px-4 py-1.5 rounded-2xl border font-black text-xs sm:text-sm shadow-2xs ${perf.badgeBg}`}>
                    {language === "badini" ? perf.levelBadini : language === "ku" ? perf.levelKu : perf.levelEn}
                  </div>
                </div>

                {/* 3. Time Spent Card ("تە د ڤی دەمی دا ئەڤ پرسیارە بەرسڤدان") */}
                <div className="w-full p-3 bg-indigo-50/90 border border-indigo-200/90 rounded-2xl flex items-center justify-between px-4 shadow-2xs">
                  <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-xs sm:text-sm">
                    <Clock className="w-4 h-4 text-indigo-600 shrink-0 animate-pulse" />
                    <span>{formatTimeSpent(elapsedSeconds)}</span>
                  </div>
                  <span className="text-[11px] font-black bg-indigo-200/60 text-indigo-800 px-2.5 py-0.5 rounded-lg font-mono" dir="ltr">
                    {Math.floor(elapsedSeconds / 60) > 0
                      ? `${Math.floor(elapsedSeconds / 60)}m ${String(elapsedSeconds % 60).padStart(2, "0")}s`
                      : `${elapsedSeconds}s`}
                  </span>
                </div>

                {/* 4. Encouraging Word / Motivational Quote Box (پەیڤەک بۆ تە) */}
                <div className="w-full p-3.5 sm:p-4 bg-purple-50/90 border border-purple-200/90 rounded-2xl text-right shadow-2xs space-y-1">
                  <div className="flex items-center gap-2 text-purple-900 font-black text-xs sm:text-sm">
                    <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>{language === "badini" ? "پەیاما هاندانی و ئاستێ تە:" : language === "ku" ? "پەیامی هاندان و ئاستی تۆ:" : "Performance & Motivational Word:"}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-purple-950 font-bold leading-relaxed pr-6 italic">
                    {language === "badini" ? perf.quoteBadini : language === "ku" ? perf.quoteKu : perf.quoteEn}
                  </p>
                </div>

                {/* 5. Score & XP Grid */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className="p-3 rounded-2xl bg-white border border-purple-100 text-center shadow-xs">
                    <span className="text-[11px] text-slate-500 block font-bold mb-1">
                      {language === "badini" ? "پرسیارێن ڕاست" : "پرسیارە ڕاستەکان"}
                    </span>
                    <span className="text-lg sm:text-xl font-black text-emerald-600 font-mono">
                      {score} / {questions.length}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-purple-100 text-center shadow-xs">
                    <span className="text-[11px] text-slate-500 block font-bold mb-1">
                      {language === "badini" ? "خاڵێن XP" : "خاڵەکانی XP"}
                    </span>
                    <span className="text-lg sm:text-xl font-black text-amber-500 font-mono">
                      +{earnedXp}
                    </span>
                  </div>
                </div>

                {/* 6. Auto-Saved Wrong Questions Box */}
                {wrongQuestionsList.length > 0 && (
                  <div className="w-full p-3 bg-amber-50 border border-amber-200 rounded-2xl text-right flex items-center gap-2.5 shadow-xs">
                    <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                      <Bookmark className="w-4 h-4 fill-white" />
                    </div>
                    <div className="text-xs text-amber-900 font-bold leading-tight">
                      <span>{wrongQuestionsList.length} پرسیارێن خەلەت هاتنە پاشەکەوتکرن بۆ دووبارە ڕاهێنانێ.</span>
                    </div>
                  </div>
                )}

                {/* 7. Action Buttons with Next Stage Transition */}
                <div className="flex flex-col gap-2.5 pt-1 w-full">
                  {/* Primary Next Stage Button */}
                  <button
                    onClick={handleFinishAndProceed}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white font-extrabold text-sm shadow-xl shadow-purple-500/30 hover:brightness-110 transition cursor-pointer active:scale-95"
                  >
                    <span>{language === "badini" ? "دەربازبوون بۆ قۆناغا داهاتی 🚀" : language === "ku" ? "ڕۆشتن بۆ قۆناغی داهاتوو 🚀" : "Proceed to Next Stage 🚀"}</span>
                    <ArrowLeft className="w-4 h-4 text-white" />
                  </button>

                  {/* Secondary Restart Button */}
                  <button
                    onClick={handleRestart}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-purple-200 text-slate-700 font-bold text-xs transition shadow-2xs hover:bg-purple-50 cursor-pointer active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-purple-600" />
                    <span>{language === "badini" ? "دووبارەکرنا ڤێ قۆناغێ" : "دووبارەکردنەوەی ئەم قۆناغە"}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* 7. BOTTOM CONTROL BAR (Fixed at bottom outside scrollable container) */}
      {!isFinished && (
        <div className="w-full px-3 sm:px-6 py-2.5 sm:py-3.5 bg-white border-t border-purple-100 shrink-0 relative z-40 shadow-lg">
            <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
              
              {/* Left Button: Previous (پێشتر) */}
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-2xl font-bold text-xs sm:text-sm md:text-base border transition flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  currentIndex > 0
                    ? "bg-white border-purple-200/90 text-purple-700 shadow-xs hover:bg-purple-50"
                    : "bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed"
                }`}
              >
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                <span>{language === "badini" ? "پێشتر" : "پێشتر"}</span>
              </button>

              {/* Center Mascot: Winking Mascot with Thumbs Up */}
              <div className="flex items-center justify-center transform -translate-y-1 sm:-translate-y-2 md:translate-y-0 md:scale-110 shrink-0">
                <MascotThumbsUp size={52} />
              </div>

              {/* Right Button: Next (دواتر) */}
              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className={`px-5 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm md:text-base shadow-lg transition flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  isAnswered
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-500/30"
                    : "bg-purple-200 text-purple-400 cursor-not-allowed shadow-none"
                }`}
              >
                <span>
                  {currentIndex + 1 === questions.length
                    ? language === "badini"
                      ? "تەمامکرن"
                      : "تەواوکردن"
                    : language === "badini"
                    ? "دواتر"
                    : "دواتر"}
                </span>
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>

            </div>
          </div>
        )}

      {/* EXIT CONFIRMATION MODAL OVERLAY */}
      <AnimatePresence>
        {showExitConfirmModal && (
          <div dir="rtl" className="fixed inset-0 z-[99999] bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
            {/* Ambient Background Glows */}
            <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none -top-10 -left-10" />
            <div className="absolute w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none -bottom-10 -right-10" />

            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-xl rounded-[2.25rem] p-6 sm:p-7 shadow-2xl border-2 border-purple-200/90 text-center space-y-4 relative overflow-hidden"
            >
              {/* Top Gradient Decorative Stripe */}
              <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-amber-400 via-purple-500 to-indigo-600" />

              {/* Mascot & Warning Badge */}
              <div className="relative pt-2 flex flex-col items-center justify-center">
                <div className="relative">
                  <MascotCharacter pose="thinking" size={90} className="mx-auto filter drop-shadow-lg" />
                  <div className="absolute -bottom-1 -left-1 w-9 h-9 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center shadow-lg animate-bounce">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Confirmation Title */}
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {language === "badini"
                    ? "ئەرێ تە دڤێت ژ تاقیکرنێ دەربکەڤی؟"
                    : language === "ku"
                    ? "ئایا دەتەوێت لە تاقیکردنەوەکە دەربچیت؟"
                    : "Exit Quiz?"}
                </h3>
              </div>

              {/* Subtitle / Context Box */}
              <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-3 text-amber-900 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-inner">
                <p className="leading-relaxed">
                  {language === "badini"
                    ? "پێشڤەچوونا تە د ڤێ تاقیکرنێ دا نا هێتە پاراستن ئەگەر نوکە دەربکەڤی."
                    : language === "ku"
                    ? "پێشکەوتنت لەم تاقیکردنەوەیەدا پاشەکەوت ناکرێت ئەگەر ئێستا دەربچیت."
                    : "Your progress in this quiz will not be saved if you exit now."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                {/* Primary Tactile 3D Button: Continue Quiz */}
                <button
                  onClick={() => setShowExitConfirmModal(false)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 border-b-4 border-indigo-900 hover:brightness-110 active:border-b-0 active:translate-y-1 text-white font-black text-sm sm:text-base shadow-lg shadow-purple-500/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>
                    {language === "badini"
                      ? "نەخێر، بەردەوام بە د تاقیکرنێ دا"
                      : language === "ku"
                      ? "نەخێر، بەردەوام بە لە تاقیکردنەوەدا"
                      : "No, Continue Quiz"}
                  </span>
                </button>

                {/* Secondary Tactile Button: Exit */}
                <button
                  onClick={onClose}
                  className="w-full py-3 px-6 rounded-2xl bg-rose-50/90 hover:bg-rose-100/90 border-2 border-rose-200 text-rose-600 font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <LogOut className="w-4 h-4" />
                  <span>
                    {language === "badini"
                      ? "بەلێ، دەرکەڤە"
                      : language === "ku"
                      ? "بەڵێ، دەربچۆ"
                      : "Yes, Exit Quiz"}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QUESTION NOTE MODAL OVERLAY */}
      <AnimatePresence>
        {showNoteModal && (
          <div dir="rtl" className="fixed inset-0 z-[99999] bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="w-full max-w-lg bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border-2 border-purple-200 text-right space-y-4 relative overflow-hidden"
            >
              {/* Top Accent Gradient Stripe */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-amber-500" />

              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center font-black">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      {language === "badini" ? "تێبینییا پرسیارێ" : "تێبینیی پرسیار"}
                    </h3>
                    <p className="text-xs text-slate-500 font-extrabold">
                      {language === "badini"
                        ? "تێبینی یان یاسایەکێ ل سەر ڤێ پرسیارێ بنڤێسە"
                        : "تێبینی یان یاسایەک لەسەر ئەم پرسیارە بنووسە"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowNoteModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Question Text Preview Box */}
              <div className="p-3 bg-purple-50/70 border border-purple-100 rounded-2xl text-xs sm:text-sm text-purple-950 font-extrabold leading-relaxed">
                <span className="text-[10px] uppercase font-black tracking-wider text-purple-600 block mb-0.5">
                  {language === "badini" ? "دەقێ پرسیارێ:" : "دەقی پرسیارەکە:"}
                </span>
                {getLocalizedText(currentQuestion, "question", language)}
              </div>

              {/* Quick Tag Chips */}
              <div className="space-y-1.5">
                <span className="text-xs font-black text-slate-600 block">
                  {language === "badini" ? "پێشنیارێن بلەز:" : "پێشنیارەکانی خێرا:"}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    language === "badini" ? "⚡ پرسیارا ب هێز" : "⚡ پرسیاری بەهێز",
                    language === "badini" ? "⚠️ ئەگەرا خەلەتیێ زۆرە" : "⚠️ ئەگەری هەڵە زۆرە",
                    language === "badini" ? "💡 یاسایا گرنگ" : "💡 یاسای گرنگ",
                    language === "badini" ? "📌 پێویستی ب دووبارەکرنێ هەیە" : "📌 پێویستی بە دووبارەکردنەوە هەیە"
                  ].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        if (currentNoteText.includes(tag)) return;
                        setCurrentNoteText((prev) => (prev ? `${prev} - ${tag}` : tag));
                      }}
                      className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-800 text-xs font-bold transition cursor-pointer active:scale-95 border border-slate-200"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Note Textarea */}
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-700 block">
                  {language === "badini" ? "تێبینییا تە:" : "تێبینیی تۆ:"}
                </label>
                <textarea
                  value={currentNoteText}
                  onChange={(e) => setCurrentNoteText(e.target.value)}
                  rows={4}
                  placeholder={
                    language === "badini"
                      ? "ل ڤێرێ تێبینی، تێبینیێن خویندنێ، یان یاسایێن ڤێ پرسیارێ بنڤێسە..."
                      : "لەێرەدا تێبینی، یاسا، یان ڕوونکردنەوەی ئەم پرسیارە بنووسە..."
                  }
                  className="w-full p-3 bg-slate-50 border-2 border-slate-200 focus:border-purple-500 rounded-2xl text-xs sm:text-sm text-slate-800 font-bold focus:outline-none focus:bg-white transition resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
                {hasNote ? (
                  <button
                    onClick={handleDeleteNote}
                    className="px-3.5 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-black transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{language === "badini" ? "سڕینەوە" : "سڕینەوە"}</span>
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowNoteModal(false)}
                    className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-extrabold transition cursor-pointer"
                  >
                    {language === "badini" ? "پاشگەزبوونەوە" : "پاشگەزبوونەوە"}
                  </button>
                  <button
                    onClick={handleSaveNote}
                    className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white text-xs font-black shadow-md shadow-purple-300 transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>{language === "badini" ? "پاشەکەوتکرنا تێبینیێ" : "پاشەکەوتکردنی تێبینی"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
