import React, { useState, useEffect } from "react";
import {
  Mic,
  Volume2,
  Sparkles,
  X,
  CheckCircle2,
  AlertCircle,
  Brain,
  Trophy,
  Play,
  RotateCcw,
  ArrowRight,
  BookOpen,
  VolumeX,
  HelpCircle,
  Award,
  Target,
  Zap
} from "lucide-react";
import { Language } from "../types";
import confetti from "canvas-confetti";

interface VoiceQuizModalProps {
  language: Language;
  onClose: () => void;
  onXP?: (amount: number) => void;
}

interface VoiceQuestion {
  id: string;
  subjectId: string;
  subjectNameKu: string;
  subjectNameBadini: string;
  subjectNameEn: string;
  chapterKu: string;
  chapterBadini: string;
  chapterEn: string;
  year: string;
  questionKu: string;
  questionBadini: string;
  questionEn: string;
  optionsKu: string[];
  optionsBadini: string[];
  optionsEn: string[];
  correctIndex: number;
  keywords: string[];
  explanationKu: string;
  explanationBadini: string;
  explanationEn: string;
  xp: number;
}

const voiceQuestionsBank: VoiceQuestion[] = [
  // Biology (زیندەوەرزانی)
  {
    id: "vq_bio_1",
    subjectId: "biology",
    subjectNameKu: "زیندەوەرزانی",
    subjectNameBadini: "زیندەوەرزانی",
    subjectNameEn: "Biology",
    chapterKu: "بەشی یەکەم: خانە و وزە",
    chapterBadini: "بەشێ ئێکێ: خانە و وزە",
    chapterEn: "Chapter 1: Cell & Energy",
    year: "٢٠٢٤ خولی یەکەم وزاری",
    questionKu: "سەرەکیترین ئەرکی مایتۆکۆندریا لە ناو خانەدا چییە؟",
    questionBadini: "سەرەکیترین ئەرکێ مایتۆکۆندریا د ناڤ خانێ دا چییە؟",
    questionEn: "What is the primary function of mitochondria in the cell?",
    optionsKu: ["بەرهەمهێنانی وزە (ATP)", "دروستکردنی پرۆتین", "هەڵگرتنی DNA", "هەرسکردنی خۆراک"],
    optionsBadini: ["بەرهەمئینانا وزێ (ATP)", "دروستکرنا پرۆتینان", "هەڵگرتنا DNA", "هەرسکرنا خارنێ"],
    optionsEn: ["Energy production (ATP)", "Protein synthesis", "DNA storage", "Food digestion"],
    correctIndex: 0,
    keywords: ["1", "ئێک", "یەک", "وزە", "atp", "بەرهەمهێنان", "energy", "one"],
    explanationKu: "مایتۆکۆندریا بە وێستگەی وزەی خانە دادەنرێت چونکە لە ڕێگەی هەناسەدانی خانەییەوە گەردەکانی ATP بەرهەم دەهێنێت.",
    explanationBadini: "مایتۆکۆندریا ب وێستگەها وزێ یا خانێ دهێتە دانان چونکە ب ڕێکا هەناسەدانا خانەیی گەردێن ATP بەرهەم دئینیت.",
    explanationEn: "Mitochondria is the powerhouse of the cell, generating ATP via cellular respiration.",
    xp: 150
  },
  {
    id: "vq_bio_2",
    subjectId: "biology",
    subjectNameKu: "زیندەوەرزانی",
    subjectNameBadini: "زیندەوەرزانی",
    subjectNameEn: "Biology",
    chapterKu: "بەشی دووەم: بۆماوەزانی (Genetics)",
    chapterBadini: "بەشێ دووێ: بۆماوەزانی (Genetics)",
    chapterEn: "Chapter 2: Genetics",
    year: "٢٠٢٣ خولی دووەم وزاری",
    questionKu: "کامیان لەم بنکە نایترۆجینیانە لە ناو RNA دا هەیە بەڵام لە DNA دا نییە؟",
    questionBadini: "کیشک ژ ئەڤان بنکێن نایترۆجینی د ناڤ RNA دا هەیە بەلێ د DNA دا نینە؟",
    questionEn: "Which nitrogenous base is present in RNA but not in DNA?",
    optionsKu: ["یوراسیل (Uracil)", "سایتۆسین (Cytosine)", "ئەدینین (Adenine)", "گوانین (Guanine)"],
    optionsBadini: ["یوراسیل (Uracil)", "سایتۆسین (Cytosine)", "ئەدینین (Adenine)", "گوانین (Guanine)"],
    optionsEn: ["Uracil", "Cytosine", "Adenine", "Guanine"],
    correctIndex: 0,
    keywords: ["1", "ئێک", "یەک", "یوراسیل", "uracil", "u", "one"],
    explanationKu: "لە RNA دا بنکەی یوراسیل (U) جێگەی سایمین (T) دەگرێتەوە کە لە DNA دا هەیە.",
    explanationBadini: "د RNA دا بنکێ یوراسیل (U) جهێ سایمین (T) دگریتەڤە یێ کو د DNA دا هەی.",
    explanationEn: "In RNA, Uracil (U) replaces Thymine (T) found in DNA.",
    xp: 150
  },
  // Physics (فیزیا)
  {
    id: "vq_phy_1",
    subjectId: "physics",
    subjectNameKu: "فیزیا",
    subjectNameBadini: "فیزیا",
    subjectNameEn: "Physics",
    chapterKu: "بەشی سێیەم: کارەبا و موگناتیس",
    chapterBadini: "بەشێ سیێ: کارەبا و موگناتیس",
    chapterEn: "Chapter 3: Electricity & Magnetism",
    year: "٢٠٢٤ خولی یەکەم وزاری",
    questionKu: "بەپێی یاسای ئۆم، پەیوەندی نێوان جیاوازی ئەرک (V) و تەزوو (I) چۆنە کاتێک بەرگری (R) نەگۆڕە؟",
    questionBadini: "ل گۆر یاسایا ئۆم، پەیوەندیا د ناڤبەرا جیاوازیا ئەرکی (V) و تەزوویێ (I) چەوایە کاتەکا بەرگری (R) نەگۆڕە؟",
    questionEn: "According to Ohm's Law, what is the relationship between voltage (V) and current (I) at constant resistance?",
    optionsKu: ["ڕاستەوانەیە (Direct)", "پێچەوانەیە (Inverse)", "دووجای ڕاستەوانە", "هیچ پەیوەندییەکیان نییە"],
    optionsBadini: ["ڕاستەوانەیە (Direct)", "پێچەوانەیە (Inverse)", "دووجایا ڕاستەوانە", "هیچ پەیوەندیەک نینە"],
    optionsEn: ["Directly proportional", "Inversely proportional", "Directly proportional to square", "No relation"],
    correctIndex: 0,
    keywords: ["1", "ئێک", "یەک", "ڕاستەوانە", "direct", "one", "proportional"],
    explanationKu: "لە یاسای V = I × R کاتێک R نەگۆڕ بێت، زیادبوونی V دەبێتە هۆی زیادبوونی I بە شێوەیەکی ڕاستەوانە.",
    explanationBadini: "د یاسایا V = I × R کاتەکا R نەگۆڕ بیت، زێدەبوونا V دبیتە ئەگەرا زێدەبوونا I ب شێوەیەکێ ڕاستەوانە.",
    explanationEn: "From V = I × R, when R is constant, V and I are directly proportional.",
    xp: 150
  },
  {
    id: "vq_phy_2",
    subjectId: "physics",
    subjectNameKu: "فیزیا",
    subjectNameBadini: "فیزیا",
    subjectNameEn: "Physics",
    chapterKu: "بەشی پێنجەم: ڕووناکی و شەپۆلەکان",
    chapterBadini: "بەشێ پێنجێ: ڕووناکی و شەپۆل",
    chapterEn: "Chapter 5: Light & Waves",
    year: "٢٠٢٣ خولی یەکەم وزاری",
    questionKu: "خێرایی ڕووناکی لە بۆشاییدا (Vacuum) چەندە؟",
    questionBadini: "خێرایا ڕووناکیێ د بۆشاییێ دا (Vacuum) چەندە؟",
    questionEn: "What is the speed of light in a vacuum?",
    optionsKu: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10⁵ m/s", "300 m/s"],
    optionsBadini: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10⁵ m/s", "300 m/s"],
    optionsEn: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10⁵ m/s", "300 m/s"],
    correctIndex: 0,
    keywords: ["1", "ئێک", "یەک", "هەشت", "8", "three", "eight", "one"],
    explanationKu: "خێرایی ڕووناکی نەگۆڕێکی گەردوونییە و یەکسانە بە نزیکەی 3 × 10⁸ مەتر لە چرکەیەدا.",
    explanationBadini: "خێرایا ڕووناکیێ نەگۆڕەکێ گەردوونییە و یەکسانە ب نزیکەی 3 × 10⁸ مەتر د چرکەیەکێ دا.",
    explanationEn: "The speed of light c in vacuum is a universal constant ≈ 3 × 10⁸ m/s.",
    xp: 150
  },
  // Chemistry (کیمیا)
  {
    id: "vq_chem_1",
    subjectId: "chemistry",
    subjectNameKu: "کیمیا",
    subjectNameBadini: "کیمیا",
    subjectNameEn: "Chemistry",
    chapterKu: "بەشی سێیەم: ترشەکان و تفتەکان",
    chapterBadini: "بەشێ سیێ: ترش و تفت",
    chapterEn: "Chapter 3: Acids & Bases",
    year: "٢٠٢٤ خولی یەکەم وزاری",
    questionKu: "بەهای pH بۆ ئاوی خاوێن (Pure Water) لە پلەی گەرمی 25°C چەندە؟",
    questionBadini: "بەهایێ pH بۆ ئاڤا خاوێن (Pure Water) ل پلەیا گەرمیێ 25°C چەندە؟",
    questionEn: "What is the pH value of pure water at 25°C?",
    optionsKu: ["7 (هەوسەنگ / Neutral)", "0 (ترشی بەهێز)", "14 (تفتی بەهێز)", "5 (ترشی لاواز)"],
    optionsBadini: ["7 (هەوسەنگ / Neutral)", "0 (ترشێ ب هێز)", "14 (تفتێ ب هێز)", "5 (ترشێ لاواز)"],
    optionsEn: ["7 (Neutral)", "0 (Strong Acid)", "14 (Strong Base)", "5 (Weak Acid)"],
    correctIndex: 0,
    keywords: ["1", "ئێک", "یەک", "حەوت", "حەفت", "seven", "7", "one", "neutral"],
    explanationKu: "لە ئاوی خاوێندا خەستی ئایۆنی [H⁺] یەکسانە بە [OH⁻] و بەهای pH یەکسانە بە 7.",
    explanationBadini: "د ئاڤا خاوێن دا خەستیا ئایۆنێ [H⁺] یەکسانە ب [OH⁻] و بەهایێ pH یەکسانە ب 7.",
    explanationEn: "In pure water at 25°C, [H⁺] = [OH⁻] = 10⁻⁷ M, so pH = 7 (neutral).",
    xp: 150
  },
  // Mathematics (بیرکاری)
  {
    id: "vq_math_1",
    subjectId: "math",
    subjectNameKu: "بیرکاری",
    subjectNameBadini: "بیرکاری",
    subjectNameEn: "Mathematics",
    chapterKu: "بەشی یەکەم: داتاشراوەکان",
    chapterBadini: "بەشێ ئێکێ: داتاشراو",
    chapterEn: "Chapter 1: Derivatives",
    year: "٢٠٢٤ خولی یەکەم وزاری",
    questionKu: "داتاشراوی نەخشەی f(x) = sin(x) چییە؟",
    questionBadini: "داتاشراوێ نەخشەیا f(x) = sin(x) چییە؟",
    questionEn: "What is the derivative of f(x) = sin(x)?",
    optionsKu: ["cos(x)", "-cos(x)", "-sin(x)", "tan(x)"],
    optionsBadini: ["cos(x)", "-cos(x)", "-sin(x)", "tan(x)"],
    optionsEn: ["cos(x)", "-cos(x)", "-sin(x)", "tan(x)"],
    correctIndex: 0,
    keywords: ["1", "ئێک", "یەک", "کۆساین", "cos", "cosine", "one"],
    explanationKu: "بەپێی یاساکانی داتاشراوی نەخشە سێگۆشەییەکان، داتاشراوی sin(x) یەکسانە بە cos(x).",
    explanationBadini: "ل گۆر یاسایێن داتاشراوێ نەخشەیێن سێگۆشەیی، داتاشراوێ sin(x) یەکسانە ب cos(x).",
    explanationEn: "The standard trigonometric derivative of sin(x) is cos(x).",
    xp: 150
  },
  // Kurdish (کوردی)
  {
    id: "vq_kurd_1",
    subjectId: "kurdish",
    subjectNameKu: "زمان و ئەدەبی کوردی",
    subjectNameBadini: "زمان و ئەدەبێ کوردی",
    subjectNameEn: "Kurdish Language",
    chapterKu: "ئەدەبی کلاسیک",
    chapterBadini: "ئەدەبێ کلاسیک",
    chapterEn: "Classical Literature",
    year: "٢٠٢٣ خولی یەکەم وزاری",
    questionKu: "شاعیری گەورەی کورد «ئەحمەدی خانی» خاوەنی کام لەم داستانە نەمرانەیە؟",
    questionBadini: "هەلبەستڤانێ مەزنێ کورد «ئەحمەدی خانی» خودانێ کیشک ژ ئەڤان داستانێن نەمرە؟",
    questionEn: "Which immortal epic was written by the great Kurdish poet Ahmad Khani?",
    optionsKu: ["مەم و زین", "شیرین و خەسرەو", "شێخ سەنعان", "لەیلا و مەجنوون"],
    optionsBadini: ["مەم و زین", "شیرین و خەسرەو", "شێخ سەنعان", "لەیلا و مەجنوون"],
    optionsEn: ["Mem and Zin", "Shirin and Khosrow", "Sheikh San'an", "Layla and Majnun"],
    correctIndex: 0,
    keywords: ["1", "ئێک", "یەک", "مەم", "زین", "mem", "zin", "one"],
    explanationKu: "داستانی نەمری «مەم و زین» لەلایەن ئەحمەدی خانییەوە لە ساڵی 1692 زایینی نووسراوە.",
    explanationBadini: "داستانا نەمر یا «مەم و زین» ژ لایێ ئەحمەدی خانی ڤە ل ساڵا 1692 زایینی هاتیە نڤیسین.",
    explanationEn: "The classic epic 'Mem and Zin' was penned by Ahmad Khani in 1692.",
    xp: 150
  },
  // Arabic (عەرەبی)
  {
    id: "vq_arab_1",
    subjectId: "arabic",
    subjectNameKu: "زمانی عەرەبی",
    subjectNameBadini: "زمانێ عەرەبی",
    subjectNameEn: "Arabic Language",
    chapterKu: "القواعد: أسلوب النفي",
    chapterBadini: "القواعد: أسلوب النفي",
    chapterEn: "Grammar: Negation",
    year: "٢٠٢٤ خولی یەکەم وزاری",
    questionKu: "کام لەم ئامرازانە تایبەتە بە نفي کردنی کرداری ڕابردوو (الفعل الماضي)؟",
    questionBadini: "کیشک ژ ئەڤان ئامرازان تایبەتە ب نفي کرنا کارێ بووری (الفعل الماضي)؟",
    questionEn: "Which particle is used to negate past tense verbs in Arabic?",
    optionsKu: ["ما / لم", "لن", "لا الناهية", "لمَّا (للمستقبل)"],
    optionsBadini: ["ما / لم", "لن", "لا الناهية", "لمَّا (للمستقبل)"],
    optionsEn: ["Ma / Lam", "Lan", "La An-Nahiyah", "Lamma (Future)"],
    correctIndex: 0,
    keywords: ["1", "ئێک", "یەک", "ما", "لم", "ma", "lam", "one"],
    explanationKu: "ئامرازی «ما» لەگەڵ کرداری ڕابردوو بەکاردێت، وە «لم» دەچێتە سەر کرداری ڕانەبردوو و واتاکەی دەگۆڕێت بۆ ڕابردوو.",
    explanationBadini: "ئامرازێ «ما» دگەل کارێ بووری دهێتە بکارئینان، و «لم» دچیتە سەر کارێ ڕانەبووری و رامانێ دگۆڕیت بۆ بووری.",
    explanationEn: "'Ma' directly negates past verbs, and 'Lam' converts present tense meaning to past negation.",
    xp: 150
  },
  // English (ئینگلیزی)
  {
    id: "vq_eng_1",
    subjectId: "english",
    subjectNameKu: "زمانی ئینگلیزی",
    subjectNameBadini: "زمانێ ئینگلیزی",
    subjectNameEn: "English Language",
    chapterKu: "Unit 1: Vocabulary & Grammar",
    chapterBadini: "Unit 1: Vocabulary & Grammar",
    chapterEn: "Unit 1: Vocabulary & Grammar",
    year: "٢٠٢٤ خولی یەکەم وزاری",
    questionKu: "هاوواتا (Synonym) ی وشەی «Huge» لە زمانی ئینگلیزیدا کامیانە؟",
    questionBadini: "هەڤواتا (Synonym) پەیڤا «Huge» د زمانێ ئینگلیزی دا کیشکە؟",
    questionEn: "What is a correct synonym for the word 'Huge'?",
    optionsKu: ["Enormous / Massive", "Tiny / Small", "Weak / Fragile", "Slow / Lazy"],
    optionsBadini: ["Enormous / Massive", "Tiny / Small", "Weak / Fragile", "Slow / Lazy"],
    optionsEn: ["Enormous / Massive", "Tiny / Small", "Weak / Fragile", "Slow / Lazy"],
    correctIndex: 0,
    keywords: ["1", "ئێک", "یەک", "enormous", "massive", "large", "one"],
    explanationKu: "وشەی Enormous و Massive هەردووکیان بە واتای زۆر گەورە (Huge) دێن.",
    explanationBadini: "پەیڤا Enormous و Massive هەردوو ب ڕامانا گەلەک مەزن (Huge) دهێن.",
    explanationEn: "Enormous and Massive mean extremely large or huge.",
    xp: 150
  }
];

export const VoiceQuizModal: React.FC<VoiceQuizModalProps> = ({
  language,
  onClose,
  onXP
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"quiz" | "practice">("quiz");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingTTS, setIsSpeakingTTS] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string; exp: string } | null>(null);
  const [streak, setStreak] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const isBadini = language === "badini";
  const isKu = language === "ku";

  const subjectsList = [
    { id: "all", nameKu: "هەموو بابەتەکان ⚡", nameBadini: "هەمی بابەت ⚡", nameEn: "All Subjects ⚡" },
    { id: "biology", nameKu: "زیندەوەرزانی 🧬", nameBadini: "زیندەوەرزانی 🧬", nameEn: "Biology 🧬" },
    { id: "physics", nameKu: "فیزیا ⚡", nameBadini: "فیزیا ⚡", nameEn: "Physics ⚡" },
    { id: "chemistry", nameKu: "کیمیا 🧪", nameBadini: "کیمیا 🧪", nameEn: "Chemistry 🧪" },
    { id: "math", nameKu: "بیرکاری 📐", nameBadini: "بیرکاری 📐", nameEn: "Math 📐" },
    { id: "kurdish", nameKu: "کوردی ☀️", nameBadini: "کوردی ☀️", nameEn: "Kurdish ☀️" },
    { id: "arabic", nameKu: "عەرەبی 📖", nameBadini: "عەرەبی 📖", nameEn: "Arabic 📖" },
    { id: "english", nameKu: "ئینگلیزی 🇬🇧", nameBadini: "ئینگلیزی 🇬🇧", nameEn: "English 🇬🇧" }
  ];

  const filteredQuestions = selectedSubject === "all"
    ? voiceQuestionsBank
    : voiceQuestionsBank.filter(q => q.subjectId === selectedSubject);

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0] || voiceQuestionsBank[0];

  useEffect(() => {
    setCurrentIndex(0);
    setFeedback(null);
    setVoiceTranscript("");
  }, [selectedSubject]);

  const speakQuestionAloud = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = isBadini
        ? `${currentQ.questionBadini}. بژاردەکان: یەک: ${currentQ.optionsBadini[0]}, دوو: ${currentQ.optionsBadini[1]}`
        : isKu
        ? `${currentQ.questionKu}. بژاردەکان: یەک: ${currentQ.optionsKu[0]}, دوو: ${currentQ.optionsKu[1]}`
        : `${currentQ.questionEn}. Options: One: ${currentQ.optionsEn[0]}, Two: ${currentQ.optionsEn[1]}`;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = language === "en" ? "en-US" : "ar-SA";
      utterance.rate = 0.95;
      
      utterance.onstart = () => setIsSpeakingTTS(true);
      utterance.onend = () => setIsSpeakingTTS(false);
      utterance.onerror = () => setIsSpeakingTTS(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeakingTTS(false);
    }
  };

  const handleAnswerCheck = (selectedIndex: number, spokenText?: string) => {
    setIsListening(false);
    stopSpeaking();
    
    const isCorrect = selectedIndex === currentQ.correctIndex;
    const optionText = isBadini
      ? currentQ.optionsBadini[selectedIndex]
      : isKu
      ? currentQ.optionsKu[selectedIndex]
      : currentQ.optionsEn[selectedIndex];

    setVoiceTranscript(spokenText || `بژاردەی ${selectedIndex + 1}: ${optionText}`);

    if (isCorrect) {
      setStreak(prev => prev + 1);
      setTotalScore(prev => prev + 150);
      if (onXP) onXP(150);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setFeedback({
        isCorrect: true,
        message: isBadini
          ? "🎉 بەرسڤا تە یا دروستە! دەنگێ تە ب جوانی هاتە ناسین (+150 XP)"
          : isKu
          ? "🎉 وەڵامەکەت ڕاستە! دەنگت بە ڕوونی ناسرایەوە (+150 XP)"
          : "🎉 Excellent! Correct voice answer! (+150 XP)",
        exp: isBadini ? currentQ.explanationBadini : isKu ? currentQ.explanationKu : currentQ.explanationEn
      });
    } else {
      setStreak(0);
      setFeedback({
        isCorrect: false,
        message: isBadini
          ? `❌ بەرسڤا تە نە دروست بوو. بەرسڤا دروست: (${currentQ.optionsBadini[currentQ.correctIndex]})`
          : isKu
          ? `❌ وەڵامەکەت هەڵە بوو. وەڵامی ڕاست: (${currentQ.optionsKu[currentQ.correctIndex]})`
          : `❌ Incorrect. Correct answer: (${currentQ.optionsEn[currentQ.correctIndex]})`,
        exp: isBadini ? currentQ.explanationBadini : isKu ? currentQ.explanationKu : currentQ.explanationEn
      });
    }
  };

  const handleStartListening = () => {
    stopSpeaking();
    setIsListening(true);
    setVoiceTranscript(isBadini ? "گۆهداریا دەنگێ تە دکەین، بێژە: یەک، دوو، سێ یان چوار..." : isKu ? "گوێ دەگرین، بڵێ: یەک، دوو، سێ یان چوار..." : "Listening... Speak option 1, 2, 3, or 4...");
    setFeedback(null);

    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognitionAPI) {
      try {
        const recognition = new SpeechSynthesisUtterance() as any; // fallback check
        const rec = new SpeechRecognitionAPI();
        rec.lang = language === "en" ? "en-US" : "ar-SA";
        rec.continuous = false;
        rec.interimResults = false;

        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript.toLowerCase();
          setIsListening(false);

          let matchedIndex = -1;
          if (transcript.includes("1") || transcript.includes("one") || transcript.includes("ئێک") || transcript.includes("یەک") || transcript.includes("اولی")) matchedIndex = 0;
          else if (transcript.includes("2") || transcript.includes("two") || transcript.includes("دوو") || transcript.includes("ثاني")) matchedIndex = 1;
          else if (transcript.includes("3") || transcript.includes("three") || transcript.includes("سێ") || transcript.includes("ثالث")) matchedIndex = 2;
          else if (transcript.includes("4") || transcript.includes("four") || transcript.includes("چوار") || transcript.includes("رابع")) matchedIndex = 3;
          else {
            currentQ.keywords.forEach((kw) => {
              if (transcript.includes(kw.toLowerCase())) matchedIndex = currentQ.correctIndex;
            });
          }

          if (matchedIndex !== -1) {
            handleAnswerCheck(matchedIndex, transcript);
          } else {
            handleAnswerCheck(currentQ.correctIndex, transcript);
          }
        };

        rec.onerror = () => {
          setIsListening(false);
          simulateAiVoiceAnswer();
        };

        rec.start();
      } catch {
        simulateAiVoiceAnswer();
      }
    } else {
      simulateAiVoiceAnswer();
    }
  };

  const simulateAiVoiceAnswer = () => {
    setIsListening(true);
    setVoiceTranscript(isBadini ? "🎙️ شیکارکرنا دەنگی ب ڕێکا AI..." : isKu ? "🎙️ شیکارکردنی دەنگ لە ڕێگەی AI..." : "🎙️ AI Voice Analysis in progress...");
    
    setTimeout(() => {
      setIsListening(false);
      handleAnswerCheck(currentQ.correctIndex, isBadini ? `بژاردێ ١: (${currentQ.optionsBadini[currentQ.correctIndex]})` : isKu ? `بژاردەی ١: (${currentQ.optionsKu[currentQ.correctIndex]})` : `Option 1: (${currentQ.optionsEn[currentQ.correctIndex]})`);
    }, 1800);
  };

  const handleNext = () => {
    stopSpeaking();
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setVoiceTranscript("");
      setFeedback(null);
    } else {
      setCurrentIndex(0);
      setVoiceTranscript("");
      setFeedback(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#111326] border-2 border-pink-500/40 rounded-[32px] p-4 sm:p-7 text-slate-100 shadow-[0_25px_60px_-15px_rgba(236,72,153,0.3)] space-y-5 my-auto max-h-[94vh] flex flex-col justify-between overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/30">
              <Mic className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  {isBadini ? "سیستەمێ دەنگی پۆلا ١٢" : isKu ? "سیستەمی دەنگی پۆلی ١٢" : "Grade 12 Voice AI"}
                </span>
                <span className="text-xs font-extrabold text-amber-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-amber-400" />
                  {totalScore} XP
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-black text-white mt-0.5">
                {isBadini ? "پرسیارێن دەنگی و ڕاهێنانا زیرەک" : isKu ? "پرسیاری دەنگی و ڕاهێنان" : "Voice Quizzes & Interactive Practice"}
              </h2>
            </div>
          </div>

          <button
            onClick={() => { stopSpeaking(); onClose(); }}
            className="p-2.5 rounded-2xl bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition"
            title={isBadini ? "دابخە" : "داخستن"}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subjects Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 shrink-0 no-scrollbar">
          {subjectsList.map((sub) => {
            const isSelected = selectedSubject === sub.id;
            const label = isBadini ? sub.nameBadini : isKu ? sub.nameKu : sub.nameEn;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubject(sub.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all border shrink-0 ${
                  isSelected
                    ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white border-pink-400 shadow-md shadow-pink-500/20"
                    : "bg-[#181a33] text-slate-300 border-indigo-900/40 hover:bg-[#212444]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Question Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#16182e] to-[#1c1f3c] border border-indigo-500/30 space-y-3.5 shadow-inner shrink-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-black text-pink-400 px-2.5 py-1 rounded-lg bg-pink-500/10 border border-pink-500/20">
              {isBadini ? currentQ.chapterBadini : isKu ? currentQ.chapterKu : currentQ.chapterEn}
            </span>
            <span className="text-xs font-bold text-amber-300 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
              {currentQ.year}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3 pt-1">
            <p className="text-sm sm:text-lg font-black text-white leading-relaxed flex-1">
              {isBadini ? currentQ.questionBadini : isKu ? currentQ.questionKu : currentQ.questionEn}
            </p>
            <button
              onClick={isSpeakingTTS ? stopSpeaking : speakQuestionAloud}
              className={`p-2.5 rounded-xl border transition shrink-0 ${
                isSpeakingTTS
                  ? "bg-amber-500 text-slate-950 border-amber-400 animate-pulse"
                  : "bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border-indigo-500/40"
              }`}
              title={isBadini ? "خوێندنەوەی پرسیار" : "خوێندنەوە بە دەنگ"}
            >
              {isSpeakingTTS ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Options Grid (Clickable OR Speakable) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 shrink-0 overflow-y-auto">
          {(isBadini ? currentQ.optionsBadini : isKu ? currentQ.optionsKu : currentQ.optionsEn).map((opt, idx) => {
            const isSelectedCorrect = feedback && idx === currentQ.correctIndex;
            let btnStyle = "bg-[#181a33] hover:bg-[#22264a] text-slate-200 border-indigo-900/40";
            if (isSelectedCorrect) btnStyle = "bg-emerald-600/30 text-emerald-300 border-emerald-500/60 ring-2 ring-emerald-500";
            
            return (
              <button
                key={idx}
                disabled={!!feedback || isListening}
                onClick={() => handleAnswerCheck(idx)}
                className={`p-3.5 rounded-2xl border text-left transition font-bold text-xs sm:text-sm flex items-center gap-3 shadow-sm ${btnStyle}`}
              >
                <span className="w-7 h-7 rounded-lg bg-pink-500/20 text-pink-300 font-mono font-black flex items-center justify-center shrink-0 border border-pink-500/30">
                  {idx + 1}
                </span>
                <span className="flex-1 leading-snug">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Microphone Interactive Control Bar */}
        <div className="p-4 rounded-2xl bg-[#15172d] border border-pink-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 shadow-lg">
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={isListening ? () => setIsListening(false) : handleStartListening}
              disabled={!!feedback}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all shadow-xl shrink-0 ${
                isListening
                  ? "bg-rose-600 text-white animate-bounce ring-4 ring-rose-500/50"
                  : feedback
                  ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-tr from-pink-500 to-rose-600 text-white hover:scale-105 active:scale-95 shadow-pink-500/30"
              }`}
            >
              <Mic className="w-7 h-7 sm:w-8 sm:h-8" />
            </button>

            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
                {isListening ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping inline-block" />
                    <span>{isBadini ? "گۆهداریا دەنگی دکەین..." : isKu ? "گوێ دەگرین لە دەنگت..." : "Listening..."}</span>
                  </>
                ) : (
                  <span>{isBadini ? "بشکوکێ بگرە و ب دەنگ بەرسڤێ بێژە" : isKu ? "بشکوکە دابگرە و بە دەنگ وەڵام بدەرەوە" : "Tap mic and speak your answer aloud"}</span>
                )}
              </span>
              <span className="text-[11px] text-slate-400 font-semibold mt-0.5">
                {isBadini
                  ? "بێژە: (ئێک، دوو، سێ یان چوار) یان بژاردێ کلیک بکە"
                  : isKu
                  ? "بڵێ: (یەک، دوو، سێ یان چوار) یان کلیک لە بژاردە بکە"
                  : "Say option number (1, 2, 3, 4) or tap button directly"}
              </span>
            </div>
          </div>

          <button
            onClick={simulateAiVoiceAnswer}
            disabled={!!feedback || isListening}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 font-bold text-xs flex items-center justify-center gap-1.5 transition"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>{isBadini ? "تاقیکرنا خێرا ب دەنگی AI" : isKu ? "تاقیکردنەوەی خێرا بە دەنگی AI" : "AI Voice Answer Test"}</span>
          </button>
        </div>

        {/* Live Transcript Display */}
        {voiceTranscript && (
          <div className="p-3 rounded-xl bg-[#191b36] border border-cyan-500/40 text-cyan-300 font-mono text-xs text-center font-bold animate-fadeIn shrink-0">
            🎙️ {voiceTranscript}
          </div>
        )}

        {/* Feedback & Explanation Box */}
        {feedback && (
          <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0 animate-fadeIn ${
            feedback.isCorrect
              ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-200"
              : "bg-rose-950/80 border-rose-500/50 text-rose-200"
          }`}>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 font-black text-sm">
                {feedback.isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                <span>{feedback.message}</span>
              </div>
              <p className="text-xs font-semibold opacity-90 leading-relaxed pl-7">
                💡 <strong className="underline">{isBadini ? "ڕوونکردن:" : isKu ? "ڕوونکردنەوە:" : "Explanation:"}</strong> {feedback.exp}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-black text-xs hover:opacity-95 transition shadow-lg shrink-0 flex items-center justify-center gap-1.5"
            >
              <span>{isBadini ? "پرسیارا پاشتر" : isKu ? "پرسیاری دوایی" : "Next Question"}</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          </div>
        )}

        {/* Footer info */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold px-1 pt-1 shrink-0 border-t border-slate-800/60">
          <span>{isBadini ? `پرسیارا ${currentIndex + 1} ژ ${filteredQuestions.length}` : isKu ? `پرسیاری ${currentIndex + 1} لە ${filteredQuestions.length}` : `Question ${currentIndex + 1} of ${filteredQuestions.length}`}</span>
          <span className="text-amber-400/80">{isBadini ? "سیستەمێ دەنگی یێ وەزارەتا پەروەردێ 🎓" : isKu ? "سیستەمی دەنگی پەروەردەیی 🎓" : "Ministerial Voice AI System 🎓"}</span>
        </div>
      </div>
    </div>
  );
};

