import {
  Subject,
  Question,
  UserProfile,
  LeaderboardUser,
  ChallengeItem,
  AchievementBadge,
  RecentActivityItem,
  NoteItem,
  ShopItem,
  CommunityPost,
  VideoLesson,
  PdfDocument,
  Mission,
  NotificationItem,
  FriendUser
} from "../types";

export const initialProfile: UserProfile = {
  name: "Mateen",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  level: 18,
  currentXp: 7850,
  nextLevelXp: 10000,
  totalXp: 7850,
  coins: 2450,
  vipLevel: "Gold",
  isPremium: false,
  dailyStreak: 12,
  questionsAnswered: 1250,
  correctAnswers: 812,
  examsTaken: 24,
  rankGlobal: 3,
  schoolName: "Kurdistan High School for Boys",
  city: "Erbil",
  unlockedCertificates: ["cert_math_2024", "cert_physics_2024"]
};

export const subjectsList: Subject[] = [
  {
    id: "math",
    nameKu: "بیرکاری",
    nameBadini: "بیرکاری",
    nameEn: "Mathematics",
    questionsCount: 1250,
    progressPercent: 75,
    color: "#22c55e", // Green
    badgeBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    iconSymbol: "➕ ➖ ✖️ ➗"
  },
  {
    id: "physics",
    nameKu: "فیزیا",
    nameBadini: "فیزیا",
    nameEn: "Physics",
    questionsCount: 980,
    progressPercent: 60,
    color: "#3b82f6", // Blue
    badgeBg: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    iconSymbol: "⚛️"
  },
  {
    id: "chemistry",
    nameKu: "کیمیا",
    nameBadini: "کیمیا",
    nameEn: "Chemistry",
    questionsCount: 870,
    progressPercent: 55,
    color: "#a855f7", // Purple
    badgeBg: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    iconSymbol: "🧪"
  },
  {
    id: "biology",
    nameKu: "زیندەوەر",
    nameBadini: "زیندەوەرناسی",
    nameEn: "Biology",
    questionsCount: 950,
    progressPercent: 65,
    color: "#f97316", // Orange
    badgeBg: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    iconSymbol: "🧬"
  },
  {
    id: "english",
    nameKu: "ئینگلیزی",
    nameBadini: "ئینگلیزی",
    nameEn: "English",
    questionsCount: 760,
    progressPercent: 50,
    color: "#06b6d4", // Cyan
    badgeBg: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    iconSymbol: "Aa"
  },
  {
    id: "arabic",
    nameKu: "عەرەبی",
    nameBadini: "عەرەبی",
    nameEn: "Arabic",
    questionsCount: 650,
    progressPercent: 45,
    color: "#eab308", // Yellow
    badgeBg: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    iconSymbol: "ف"
  },
  {
    id: "kurdish",
    nameKu: "کوردی",
    nameBadini: "کوردی",
    nameEn: "Kurdish",
    questionsCount: 540,
    progressPercent: 40,
    color: "#ec4899", // Pink
    badgeBg: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    iconSymbol: "ێ"
  },
  {
    id: "religion",
    nameKu: "ئاین",
    nameBadini: "ئاین (پەروەردەیا ئیسلامی)",
    nameEn: "Religion Education",
    questionsCount: 480,
    progressPercent: 50,
    color: "#10b981", // Emerald
    badgeBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    iconSymbol: "📖"
  }
];

export const mockQuestions: Question[] = [
  // ==================== KURDISH (کوردی پۆلا ١٢) - پرسیارێن وزاری ====================
  {
    id: "q_k_1",
    subjectId: "kurdish",
    chapterKu: "بەشی یەکەم: ڕێزمان و شیکاریی کار (بوریێ بەردەوام)",
    chapterBadini: "بەشێ ئێکێ: ڕێزمان و شیکاریا کاری (بوریێ بەردەوام)",
    chapterEn: "Chapter 1: Kurdish Grammar & Verb Analysis (Past Continuous)",
    year: "2010 وزاری",
    questionKu: "١- یاسایا ڕێژەیا کاری بورییێ بەردەوام یێ ڕاگەهاندنێ پێکدهێت ژ:",
    questionBadini: "١- یاسایا ڕێژەیا کاری بورییێ بەردەوام یێ ڕاگەهاندنێ پێکدهێت ژ:",
    questionEn: "1- The formula for the Past Continuous Declarative verb consists of:",
    optionsKu: [
      "د + ڕەگێ کاری",
      "د + قەدا چاوگی",
      "دێ + ڕەگێ کاری",
      "دێ + قەدا چاوگی"
    ],
    optionsBadini: [
      "د + ڕەگێ کاری",
      "د + قەدا چاوگی",
      "دێ + ڕەگێ کاری",
      "دێ + قەدا چاوگی"
    ],
    optionsEn: [
      "د + Verb Root (د + ڕەگێ کاری)",
      "د + Verb Stem (د + قەدا چاوگی)",
      "دێ + Verb Root (دێ + ڕەگێ کاری)",
      "دێ + Verb Stem (دێ + قەدا چاوگی)"
    ],
    correctIndex: 1,
    explanationKu: "بەرسڤ: B (د + قەدا چاوگی).\n\nشیکردنەوەی زانستی:\nیاسای کاری بوریی بەردەوامی ڕاگەهاندن پێکدێت لە:\n• [د / دە]: ئامرازی نیشانەی بەردەوامی\n• [قەدا چاوگی / قەدی ڕابردوو]: قەدی کار لە چاوگ\n• [نیشانەی کەسی]: پاشبەندی لکاو\nنموونە: (د + هات + م = دهاتم / دچوو / دنڤیسی).",
    explanationBadini: "بەرسڤ: B (د + قەدا چاوگی).\n\nشڕۆڤەکرنا زانستی:\nیاسایا کارێ بوریێ بەردەوام یێ ڕاگەهاندنێ پێکدهێت ژ:\n• [د / دە]: نیشانا بەردەوامیێ\n• [قەدا چاوگی]: قەدی بوری یێ چاوکی\n• [نیشانا کەسی]: پاشبەندی لکاو\nنموونە: (د + چوو = دچوو / دنڤیسی).",
    explanationEn: "Correct Answer: B (د + قەدا چاوگی).\n\nThe formula for Past Continuous Declarative consists of: Imperfective prefix marker (د / دە) + Past verb stem (قەدا چاوگی) + personal inflection suffix.",
    grammarBreakdown: {
      targetWord: "د + قەدا چاوگی",
      sentenceKu: "یاسایا ڕێژەیا کاری بورییێ بەردەوام یێ ڕاگەهاندنێ",
      sentenceBadini: "یاسایا ڕێژەیا کاری بورییێ بەردەوام یێ ڕاگەهاندنێ",
      verbRootKu: "چاوگ / قەدی ڕابردوو",
      verbRootBadini: "چاوک / قەدا چاوگی",
      steps: [
        {
          segment: "د",
          roleKu: "نیشانەی بەردەوامی",
          roleBadini: "نیشانا بەردەوامیێ",
          descriptionKu: "ئامرازی (د) نیشانەی بەردەوامییە لە کاتی ڕابردوو و ڕانەبردوودا",
          descriptionBadini: "ئامرازێ (د) نیشانا بەردەوامیێ یە د دەمێ بوری دا",
          badgeColor: "blue"
        },
        {
          segment: "قەدا چاوگی",
          roleKu: "قەدی ڕابردوو (بوری)",
          roleBadini: "قەدی بوری (قەدا چاوگی)",
          descriptionKu: "قەدی ڕابردووی چاوگ",
          descriptionBadini: "قەدا چاوگی یا دەمێ بوری",
          badgeColor: "purple"
        }
      ],
      resultFormulaKu: "د + قەدا چاوگی + نیشانەی کەسی",
      resultFormulaBadini: "د + قەدا چاوگی + نیشانا کەسی",
      resultTenseKu: "بوریی بەردەوامی ڕاگەهاندن",
      resultTenseBadini: "بوریێ بەردەوامێ ڕاگەهاندن",
      summaryRuleKu: "یاسا: [د] + قەدا چاوگی = بوریی بەردەوامی ڕاگەهاندن.",
      summaryRuleBadini: "یاسا: [د] + قەدا چاوگی = بوریێ بەردەوامێ ڕاگەهاندن.",
      memoryHookKu: "💡 یاسا: ئامرازی (د) لەگەڵ قەدی ڕابردوو (قەدا چاوگی) = بوریی بەردەوام!",
      memoryHookBadini: "💡 یاسا: نیشانا (د) دگەل قەدا چاوگی = بوریێ بەردەوامێ ڕاگەهاندن!"
    },
    xp: 150
  },
  {
    id: "q_k_2",
    subjectId: "kurdish",
    chapterKu: "بەشی یەکەم: ڕێزمان و شیکاریی کار (نەبوریی نەرێ)",
    chapterBadini: "بەشێ ئێکێ: ڕێزمان و شیکاریا کاری (نەبوریێ نەرێ)",
    chapterEn: "Chapter 1: Kurdish Grammar & Verb Analysis (Negative Non-Past)",
    year: "وزاری",
    questionKu: "٢- (نامەکە نانوسرێ) (نانوسرێ) کارێ:",
    questionBadini: "٢- (نامەکە نانوسرێ) (نانوسرێ) کارێ:",
    questionEn: "2- In the sentence (نامەکە نانوسرێ), what type of verb is (نانوسرێ)?",
    optionsKu: [
      "نە بورییە",
      "نەبورییێ نەرێ",
      "بورییە",
      "بورییێ نەرێ"
    ],
    optionsBadini: [
      "نە بورییە",
      "نەبورییێ نەرێ",
      "بورییە",
      "بورییێ نەرێ"
    ],
    optionsEn: [
      "Non-Past (نە بورییە)",
      "Negative Non-Past (نەبورییێ نەرێ)",
      "Past (بورییە)",
      "Negative Past (بورییێ نەرێ)"
    ],
    correctIndex: 1,
    explanationKu: "بەرسڤ: B (نەبورییێ نەرێ).\n\nشیکردنەوەی زانستی:\nلە کاری (نانوسرێ):\n• [نا]: نیشانەی نەفی و نەرێیە لە کاتی نەبۆری دا\n• [نوسرێ]: قەدی کاری نەبۆریی داڕێژراو (تێپەڕنەکراو)\nبۆیە کاری (نانوسرێ) بریتییە لە: نەبورییێ نەرێ.",
    explanationBadini: "بەرسڤ: B (نەبورییێ نەرێ).\n\nشڕۆڤەکرنا زانستی:\nد کارێ (نانوسرێ) دا:\n• [نا]: نیشانا نەرێکرنێ و نەفیێ یە د دەمێ نەبوری دا\n• [نوسرێ]: قەدی کارێ نەبوری یێ داڕێژراو (تێپەڕنەکری)\nلەوڕا کارێ (نانوسرێ) دبیتە: نەبورییێ نەرێ.",
    explanationEn: "Correct Answer: B (Negative Non-Past / نەبورییێ نەرێ).\n\nIn the verb (نانوسرێ), prefix (نا) is the negation marker for the non-past tense, making it a Negative Non-Past passive/derived verb.",
    grammarBreakdown: {
      targetWord: "نانوسرێ",
      sentenceKu: "نامەکە نانوسرێ",
      sentenceBadini: "نامەکە نانوسرێ",
      verbRootKu: "نوسین / نوسران (چاوگ)",
      verbRootBadini: "نڤیسین / نوسران (چاوک)",
      steps: [
        {
          segment: "نا",
          roleKu: "نیشانەی نەرێ (نەفی)",
          roleBadini: "نیشانا نەرێ (نەفی)",
          descriptionKu: "نیشانەی نەرێکرن لە کاتی نەبۆری دا",
          descriptionBadini: "نیشانا نەرێکرنێ د دەمێ نەبوری دا",
          badgeColor: "rose"
        },
        {
          segment: "نوسرێ",
          roleKu: "ڕەگی کاری نەبۆری",
          roleBadini: "ڕەگێ کاری یێ نەبوری",
          descriptionKu: "قەدی کاری نەبۆریی داڕێژراو",
          descriptionBadini: "قەدی کارێ نەبوری یێ داڕێژراو و تێپەڕنەکری",
          badgeColor: "purple"
        }
      ],
      resultFormulaKu: "نا (نەرێ) + نوسرێ (نەبۆری)",
      resultFormulaBadini: "نا (نەرێ) + نوسرێ (نەبوری)",
      resultTenseKu: "نەبورییێ نەرێ",
      resultTenseBadini: "نەبوریێ نەرێ",
      summaryRuleKu: "یاسا: ئامرازی (نا) نیشانەی نەفیکردنی کاتی نەبۆرییە.",
      summaryRuleBadini: "یاسا: ئامرازا (نا) نیشانا نەفیکرنا دەمێ نەبوری یە.",
      memoryHookKu: "💡 یاسا: پیتی (نا) پێش کار = نیشانەی نەبوریی نەرێ!",
      memoryHookBadini: "💡 یاسا: پیتا (نا) = نەبوریێ نەرێ!"
    },
    xp: 150
  },

  // ==================== MATHEMATICS (بیرکاری) ====================
  {
    id: "q_m1",
    subjectId: "math",
    chapterKu: "بەشی یەکەم: نەخشەکان و سنوورەکان",
    chapterBadini: "بەشێ ئێکێ: نەخشە و سنوور",
    chapterEn: "Chapter 1: Functions and Limits",
    year: "2024 وزاری",
    questionKu: "لایەنگیری تانجێنت (Slope of tangent) بۆ نەخشەی f(x) = 3x² - 4x + 5 لە خاڵی x = 2 بریتییە لە:",
    questionBadini: "لایەنگریا تانجێنت (Slope of tangent) بۆ نەخشەیا f(x) = 3x² - 4x + 5 ل خاڵا x = 2 بریتییە ژ:",
    questionEn: "What is the slope of the tangent line to f(x) = 3x² - 4x + 5 at x = 2?",
    optionsKu: ["8", "10", "12", "6"],
    optionsBadini: ["8", "10", "12", "6"],
    optionsEn: ["8", "10", "12", "6"],
    correctIndex: 0,
    explanationKu: "داتاشراو (Derivative): f'(x) = 6x - 4. دانانی x = 2 : f'(2) = 6(2) - 4 = 12 - 4 = 8.",
    explanationBadini: "داتاشراو (Derivative): f'(x) = 6x - 4. دانانا x = 2 : f'(2) = 6(2) - 4 = 12 - 4 = 8.",
    explanationEn: "Derivative f'(x) = 6x - 4. Substituting x = 2 gives f'(2) = 6(2) - 4 = 8.",
    xp: 150
  },
  {
    id: "q_m2",
    subjectId: "math",
    chapterKu: "بەشی دووەم: تەواوکاری (Integration)",
    chapterBadini: "بەشێ دووێ: تەواوکاری (Integration)",
    chapterEn: "Chapter 2: Integration",
    year: "2023 وزاری",
    questionKu: "تەواوکاریی دیاریکراوی ∫[0 -> 3] (2x + 1) dx یەکسانە بە:",
    questionBadini: "تەواوکاریا دیاریکری يا ∫[0 -> 3] (2x + 1) dx یەکسانە ب:",
    questionEn: "The definite integral ∫[0 -> 3] (2x + 1) dx equals:",
    optionsKu: ["12", "10", "15", "9"],
    optionsBadini: ["12", "10", "15", "9"],
    optionsEn: ["12", "10", "15", "9"],
    correctIndex: 0,
    explanationKu: "دژەداتاشراو F(x) = x² + x. بۆ سنووری [0, 3]: F(3) - F(0) = (3² + 3) - 0 = 9 + 3 = 12.",
    explanationBadini: "دژەداتاشراو F(x) = x² + x. بۆ سنوورێ [0, 3]: F(3) - F(0) = (3² + 3) - 0 = 12.",
    explanationEn: "Antiderivative F(x) = x² + x. Evaluating at boundaries [0, 3]: (3² + 3) - 0 = 12.",
    xp: 150
  },

  // ==================== PHYSICS (فیزیا) ====================
  {
    id: "q_p1",
    subjectId: "physics",
    chapterKu: "بەشی سێیەم: مەیدانی کارەبایی و هێز",
    chapterBadini: "بەشێ سیێ: مەیدانا کارەبایی و هێز",
    chapterEn: "Chapter 3: Electric Field & Force",
    year: "2024 وزاری",
    questionKu: "هێزی کارەبایی لە نێوان دوو بارگەی بڕ نەگۆڕ کاتێک دووری نێوانیان دەبێتە دوو هێندە (Doubled) چۆن دەگۆڕێت؟",
    questionBadini: "هێزا کارەبایی د ناڤبەرا دو بارگەیێن ڕاوەستیاوی کاتەکا دووریا ناڤبەرا وان دبیتە دوو جارا زێدەتر چەوا دگۆڕیت؟",
    questionEn: "How does the electrostatic force between two fixed charges change when the distance between them is doubled?",
    optionsKu: ["کەم دەبێتەوە بۆ ¼ بڕی یەکەم", "دەبێتە دوو هێندە", "کەم دەبێتەوە بۆ ½ بڕی یەکەم", "چوار هێندە زیاد دەکات"],
    optionsBadini: ["کێم دبیت بۆ ¼ بڕێ ئێکێ", "دبیتە دوو جارک", "کێم دبیت بۆ ½ بڕێ ئێکێ", "چوار جارک زێدە دبیت"],
    optionsEn: ["Decreases to 1/4 of initial value", "Doubles", "Halves to 1/2", "Increases 4x"],
    correctIndex: 0,
    explanationKu: "بە پێی یاسای کۆلۆم (Coulomb's Law): F ∝ 1/r². ئەگەر r ببێتە 2r، ئەوا F' = F/4.",
    explanationBadini: "ل گور یاسایا کۆلۆمی (Coulomb's Law): F ∝ 1/r². ئەگەر r ببیتە 2r، وی دەمی F' = F/4.",
    explanationEn: "According to Coulomb's Law F ∝ 1/r². If r doubles, force decreases to 1/2² = 1/4.",
    xp: 150
  },
  {
    id: "q_p2",
    subjectId: "physics",
    chapterKu: "بەشی چوارەم: هاندانی کارۆموگناتیسی",
    chapterBadini: "بەشێ چوارێ: هاندانا کارۆموگناتیسی",
    chapterEn: "Chapter 4: Electromagnetic Induction",
    year: "2023 وزاری",
    questionKu: "یاسای لێنز (Lenz's Law) پشتبەستنە بە کام یاسای پاراستن لە فیزیا دا؟",
    questionBadini: "یاسایا لێنزی (Lenz's Law) پشتبەستنە لسەر کیژ یاسایا پاراستنێ د فیزیایێ دا؟",
    questionEn: "Lenz's Law is a direct consequence of which physical conservation law?",
    optionsKu: ["پاراستنی وزە (Conservation of Energy)", "پاراستنی بارگە", "پاراستنی تەوژم", "پاراستنی بەرهەڵستی"],
    optionsBadini: ["پاراستنا وزەیێ (Conservation of Energy)", "پاراستنا بارگەیێ", "پاراستنا تەڤگەرێ", "پاراستنا بەرهەڵستیێ"],
    optionsEn: ["Conservation of Energy", "Conservation of Charge", "Conservation of Momentum", "Conservation of Resistance"],
    correctIndex: 0,
    explanationKu: "یاسای لێنز جەخت لەسەر ئەوە دەکاتەوە کە بەرهەمهێنانی تەوژمی هاندراو دژایەتی گۆڕانی فیزی موگناتیسی دەکات بە پێی پاراستنی وزە.",
    explanationBadini: "یاسایا لێنزی دیار دکەت کو دروستکرنا تەوژمێ هاندای دژایەتیا گۆڕینا فیزی موگناتیسی دکەت ل گور پاراستنا وزەیێ.",
    explanationEn: "Lenz's law complies directly with the law of Conservation of Energy by opposing field changes.",
    xp: 150
  },

  // ==================== CHEMISTRY (کیمیا) ====================
  {
    id: "q_c1",
    subjectId: "chemistry",
    chapterKu: "بەشی دووەم: ترشەکان و تفتەکان",
    chapterBadini: "بەشێ دووێ: ترش و تفت",
    chapterEn: "Chapter 2: Acids and Bases",
    year: "2024 وزاری",
    questionKu: "محلولێک کە خەستی ئیۆنی هایدرۆنیۆم [H₃O⁺] تێیدا یەکسانە بە 1 × 10⁻⁴ M، بڕی pH ی ئەم محلولە چەندە؟",
    questionBadini: "محلولەک کو خەستیا ئیۆنا هایدرۆنیۆم [H₃O⁺] تێدا یەکسانە ب 1 × 10⁻⁴ M، بڕێ pH یێ ڤی محلولی چەندە؟",
    questionEn: "A solution has a hydronium ion concentration [H₃O⁺] = 1 × 10⁻⁴ M. What is its pH?",
    optionsKu: ["pH = 4", "pH = 10", "pH = 7", "pH = 14"],
    optionsBadini: ["pH = 4", "pH = 10", "pH = 7", "pH = 14"],
    optionsEn: ["pH = 4", "pH = 10", "pH = 7", "pH = 14"],
    correctIndex: 0,
    explanationKu: "یاسای pH: pH = -log[H₃O⁺] = -log(10⁻⁴) = 4.",
    explanationBadini: "یاسایا pH: pH = -log[H₃O⁺] = -log(10⁻⁴) = 4.",
    explanationEn: "pH formula: pH = -log[H₃O⁺] = -log(10⁻⁴) = 4.",
    xp: 150
  },

  // ==================== BIOLOGY (زیندەوەرناسی) ====================
  {
    id: "q_b1",
    subjectId: "biology",
    chapterKu: "بەشی پێنجەم: بۆماوەیی و دی ئێن ئەی (DNA)",
    chapterBadini: "بەشێ پێنجێ: بۆماوەیی و دی ئێن ئەی (DNA)",
    chapterEn: "Chapter 5: Genetics and DNA",
    year: "2024 وزاری",
    questionKu: "لە پەیکەری DNA دا، بەندەکانی نێوان تاقە بنکە نایترۆجینییە تەواوکەرەکان (A-T و G-C) بریتیین لە:",
    questionBadini: "د پەیکەرێ DNA دا، بەندێن ناڤبەرا ئێکەیێن نایترۆجینی یێن تەمامکەر (A-T و G-C) بریتیین ژ:",
    questionEn: "In the structure of DNA, the bonds connecting complementary nitrogenous bases are:",
    optionsKu: ["بەندی هایدرۆجینی (Hydrogen Bonds)", "بەندی کۆڤاڵانت", "بەندی ئیۆنی", "بەندی پێپتایدی"],
    optionsBadini: ["بەندێ هایدرۆجینی (Hydrogen Bonds)", "بەندێ کۆڤاڵانت", "بەندێ ئیۆنی", "بەندێ پێپتایدی"],
    optionsEn: ["Hydrogen Bonds", "Covalent Bonds", "Ionic Bonds", "Peptide Bonds"],
    correctIndex: 0,
    explanationKu: "لە نێوان ئادێنین A و تایمین T دوو بەندی هایدرۆجینی، و لە نێوان گوۆانین G و سیتۆسین C سێ بەندی هایدرۆجینی هەیە.",
    explanationBadini: "د ناڤبەرا ئادێنین A و تایمین T دو بەندێن هایدرۆجینی، و د ناڤبەرا گوۆانین G و سیتۆسین C سێ بەندێن هایدرۆجینی هەنە.",
    explanationEn: "A and T share 2 hydrogen bonds; G and C share 3 hydrogen bonds.",
    xp: 150
  },

  // ==================== ENGLISH ====================
  {
    id: "q_e1",
    subjectId: "english",
    chapterKu: "بەشی سێیەم: ڕێزمان و ڕستەسازی",
    chapterBadini: "بەشێ سیێ: ڕێزمان و ڕستەسازی",
    chapterEn: "Chapter 3: Grammar & Syntax",
    year: "2024 Ministerial",
    questionKu: "Choose the correct sentence in Reported Speech: Azad said, 'I am studying for the exam.'",
    questionBadini: "Choose the correct sentence in Reported Speech: Azad said, 'I am studying for the exam.'",
    questionEn: "Choose the correct sentence in Reported Speech: Azad said, 'I am studying for the exam.'",
    optionsKu: [
      "Azad said that he was studying for the exam.",
      "Azad said that I am studying for the exam.",
      "Azad said that he studied for the exam.",
      "Azad says that he is studying for the exam."
    ],
    optionsBadini: [
      "Azad said that he was studying for the exam.",
      "Azad said that I am studying for the exam.",
      "Azad said that he studied for the exam.",
      "Azad says that he is studying for the exam."
    ],
    optionsEn: [
      "Azad said that he was studying for the exam.",
      "Azad said that I am studying for the exam.",
      "Azad said that he studied for the exam.",
      "Azad says that he is studying for the exam."
    ],
    correctIndex: 0,
    explanationKu: "In reported speech, Present Continuous 'am studying' shifts back to Past Continuous 'was studying', and pronoun 'I' becomes 'he'.",
    explanationBadini: "In reported speech, Present Continuous 'am studying' shifts back to Past Continuous 'was studying', and pronoun 'I' becomes 'he'.",
    explanationEn: "Present Continuous 'am studying' backshifts to Past Continuous 'was studying' with reported speech rules.",
    xp: 150
  },

  // ==================== ARABIC (عەرەبی) ====================
  {
    id: "q_a1",
    subjectId: "arabic",
    chapterKu: "بەشی یەکەم: القواعد والنحو",
    chapterBadini: "بەشێ ئێکێ: القواعد والنحو",
    chapterEn: "Chapter 1: Arabic Grammar Rules",
    year: "2024 وزاری",
    questionKu: "ما هو إعراب كلمة 'طالباً' في الجملة: (يا طالباً العلمَ اجتهدْ)؟",
    questionBadini: "ما هو إعراب كلمة 'طالباً' في الجملة: (يا طالباً العلمَ اجتهدْ)؟",
    questionEn: "What is the grammatical position of 'طالباً' in the sentence (يا طالباً العلمَ اجتهدْ)?",
    optionsKu: [
      "منادى شبيه بالمضاف منصوب وعلامة نصبه تنوين الفتح",
      "منادى مضاف مبني على الضم",
      "منادى نكرة مقصودة مبني",
      "مفعول به منصوب"
    ],
    optionsBadini: [
      "منادى شبيه بالمضاف منصوب وعلامة نصبه تنوين الفتح",
      "منادى مضاف مبني على الضم",
      "منادى نكرة مقصودة مبني",
      "مفعول به منصوب"
    ],
    optionsEn: [
      "Munada Shabih bil-Mudhaf (Accusative with Fatha)",
      "Munada Mudhaf",
      "Munada Nakira Maqsuda",
      "Maf'ul Bihi"
    ],
    correctIndex: 0,
    explanationKu: "كلمة 'طالباً' منادى شبيه بالمضاف لأنه اتصل به شيء من تمام معناه (العلمَ) وجاء منوناً.",
    explanationBadini: "كلمة 'طالباً' منادى شبيه بالمضاف لأنه اتصل به شيء من تمام معناه (العلمَ) وجاء منوناً.",
    explanationEn: "'طالباً' is Shabih bil-Mudhaf because it is followed by a clarifying word ('العلمَ') and carries tanween.",
    xp: 150
  },

  // ==================== RELIGION (ئاین) ====================
  {
    id: "q_r1",
    subjectId: "religion",
    chapterKu: "بەشی یەکەم: بیروباوەڕی ئیسلامی",
    chapterBadini: "بەشێ ئێکێ: بیروباوەڕێ ئیسلامی",
    chapterEn: "Chapter 1: Islamic Beliefs",
    year: "2024 وزاری",
    questionKu: "مەرجی یەکەمی وەرگیرانی ئەعمال و عیبادەت لە ئیسلامدا بریتییە لە:",
    questionBadini: "مەرجێ ئێکێ یێ وەرگرتنا کریار و عیبادەتان د ئیسلامێ دا بریتییە ژ:",
    questionEn: "The primary condition for acceptance of good deeds in Islamic teaching is:",
    optionsKu: ["ئیخلاس و نیازی پاقژ (الإخلاص)", "دەولەمەندی", "ناوبانگ و عەشیرەت", "ژمارەی خزمەکان"],
    optionsBadini: ["ئیخلاس و نیازا پاقژ (الإخلاص)", "دەولەمەندی", "ناڤودەنگی", "ژمارەیا خزمان"],
    optionsEn: ["Sincerity of Intent (Ikhlas)", "Wealth", "Fame", "Family Count"],
    correctIndex: 0,
    explanationKu: "ئیخلاس و تەنها بۆ ڕەزامەندی خودا ئەنجامدانی کردارەکان بنەمای وەرگیرانی کارەکانە.",
    explanationBadini: "ئیخلاس و بتنێ بۆ ڕەزامەندیا خودێ ئەنجامدانا کریاران بنەمایێ وەرگرتنا عیبادەتانە.",
    explanationEn: "Sincerity (Ikhlas) for the sake of God alone is the core condition for accepted deeds.",
    xp: 150
  }
];

export const globalLeaderboard: LeaderboardUser[] = [
  {
    id: "u1",
    rank: 1,
    name: "Ahmed",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    xp: 9850,
    city: "Erbil",
    school: "Koya Excellence School",
    streakDays: 45
  },
  {
    id: "u2",
    rank: 2,
    name: "Sara",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    xp: 9700,
    city: "Sulaymaniyah",
    school: "Slemani High School for Girls",
    streakDays: 32
  },
  {
    id: "u3",
    rank: 3,
    name: "Mateen",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    xp: 9550,
    city: "Erbil",
    school: "Kurdistan High School for Boys",
    streakDays: 12,
    isCurrentUser: true
  },
  {
    id: "u4",
    rank: 4,
    name: "Ali",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    xp: 9400,
    city: "Duhok",
    school: "Duhok International School",
    streakDays: 28
  },
  {
    id: "u5",
    rank: 5,
    name: "Roj",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    xp: 9250,
    city: "Halabja",
    school: "Shahid High School",
    streakDays: 19
  },
  {
    id: "u6",
    rank: 6,
    name: "Daria",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    xp: 8900,
    city: "Erbil",
    school: "Chuefat Erbil",
    streakDays: 14
  },
  {
    id: "u7",
    rank: 7,
    name: "Zana",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    xp: 8650,
    city: "Sulaymaniyah",
    school: "Azmar High School for Boys",
    streakDays: 21
  }
];

export const challengesList: ChallengeItem[] = [
  {
    id: "c_daily",
    titleKu: "چالنجی ڕۆژانە",
    titleEn: "Daily Challenge",
    descriptionKu: "بە ڕاستی وەڵامی ۲۰ پرسیار بدەرەوە ئەمڕۆ",
    descriptionEn: "Answer 20 questions correctly today",
    current: 15,
    target: 20,
    rewardXp: 500,
    iconName: "Target",
    badgeColor: "from-purple-600 to-indigo-600",
    completed: false
  },
  {
    id: "c_weekly",
    titleKu: "چالنجی هەفتانە",
    titleEn: "Weekly Challenge",
    descriptionKu: "وەڵامی ۱۰۰ پرسیار بدەرەوە لەم هەفتەیەدا",
    descriptionEn: "Answer 100 questions this week",
    current: 65,
    target: 100,
    rewardXp: 1500,
    iconName: "Award",
    badgeColor: "from-blue-600 to-cyan-600",
    completed: false
  },
  {
    id: "c_perfect",
    titleKu: "نمرەی تەواو (Perfect Score)",
    titleEn: "Perfect Score",
    descriptionKu: "۱۰ تاقیکردنەوە بە نمرەی ۱۰۰٪ تەواو بکە",
    descriptionEn: "Get 10 perfect scores in quizzes",
    current: 4,
    target: 10,
    rewardXp: 2000,
    iconName: "Star",
    badgeColor: "from-amber-500 to-orange-600",
    completed: false
  },
  {
    id: "c_speed",
    titleKu: "مایستۆی خێرایی (Speed Master)",
    titleEn: "Speed Master",
    descriptionKu: "وەڵامی ۵۰ پرسیار بدەرەوە لە کەمتر لە ۱۰ خولەکدا",
    descriptionEn: "Answer 50 questions in less than 10 min",
    current: 12,
    target: 50,
    rewardXp: 2500,
    iconName: "Zap",
    badgeColor: "from-emerald-500 to-teal-600",
    completed: false
  }
];

export const achievementsList: AchievementBadge[] = [
  {
    id: "b1",
    titleKu: "یەکەم تاقیکردنەوە",
    titleEn: "First Quiz",
    descriptionKu: "یەکەم تاقیکردنەوەت بە سەرکەوتوویی تەواو کرد",
    descriptionEn: "Completed your first quiz successfully",
    icon: "🥇",
    unlocked: true,
    unlockedDate: "2026-07-01",
    color: "from-emerald-500 to-green-600"
  },
  {
    id: "b2",
    titleKu: "۱۰ تاقیکردنەوە",
    titleEn: "10 Quizzes",
    descriptionKu: "۱۰ تاقیکردنەوەت بە سەرکەوتوویی ئەنجام دا",
    descriptionEn: "Passed 10 full ministerial quizzes",
    icon: "🛡️",
    unlocked: true,
    unlockedDate: "2026-07-10",
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "b3",
    titleKu: "نمرەی ۱۰۰٪",
    titleEn: "Perfect 10",
    descriptionKu: "دەستکەوتنی نمرەی تەواو ۱۰۰٪ لە تاقیکردنەوەدا",
    descriptionEn: "Scored 100% on a ministerial mock quiz",
    icon: "⭐",
    unlocked: true,
    unlockedDate: "2026-07-15",
    color: "from-amber-400 to-yellow-600"
  },
  {
    id: "b4",
    titleKu: "مامۆستای خێرایی",
    titleEn: "Speed Master",
    descriptionKu: "وەڵامدانەوەی پرسیارەکان بە خێرایی بەرز",
    descriptionEn: "Answered 20 questions in record speed",
    icon: "⚡",
    unlocked: true,
    unlockedDate: "2026-07-20",
    color: "from-purple-500 to-pink-600"
  },
  {
    id: "b5",
    titleKu: "بەردەوامی هەفتانە",
    titleEn: "Week Streak",
    descriptionKu: "۷ ڕۆژ بەردەوام بەشداریت کرد",
    descriptionEn: "Maintained a 7-day practice streak",
    icon: "🔥",
    unlocked: true,
    unlockedDate: "2026-07-22",
    color: "from-red-500 to-rose-600"
  },
  {
    id: "b6",
    titleKu: "شای چالنجەکان",
    titleEn: "Challenge King",
    descriptionKu: "هەموو چالنجەکانی هەفتەت تەواو کرد",
    descriptionEn: "Crowned king of weekly student challenges",
    icon: "👑",
    unlocked: true,
    unlockedDate: "2026-07-25",
    color: "from-amber-500 to-orange-500"
  }
];

export const recentActivities: RecentActivityItem[] = [
  {
    id: "a1",
    type: "quiz",
    titleKu: "تاقیکردنەوەی بیرکاری تەواو بوو",
    titleEn: "Completed Mathematics Quiz",
    timeAgoKu: "۲ خولەک پێش ئێستا",
    timeAgoEn: "2 min ago",
    xpGained: 150,
    iconBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    icon: "➕"
  },
  {
    id: "a2",
    type: "badge",
    titleKu: "نیشانەی مایستڕۆی خێرایی بەدەستهات",
    titleEn: "Earned Speed Master Badge",
    timeAgoKu: "۱ کاتژمێر پێش ئێستا",
    timeAgoEn: "1 hour ago",
    xpGained: 200,
    iconBg: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    icon: "⚡"
  },
  {
    id: "a3",
    type: "challenge",
    titleKu: "چالنجی ڕۆژانە تەواو کرا",
    titleEn: "Completed Daily Challenge",
    timeAgoKu: "۳ کاتژمێر پێش ئێستا",
    timeAgoEn: "3 hours ago",
    xpGained: 500,
    iconBg: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    icon: "🎯"
  },
  {
    id: "a4",
    type: "level",
    titleKu: "گەی شت بە ئاستی ۱۸ (Level 18)",
    titleEn: "Reached Level 18",
    timeAgoKu: "۱ ڕۆژ پێش ئێستا",
    timeAgoEn: "1 day ago",
    xpGained: 1000,
    iconBg: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    icon: "👑"
  }
];

export const mockNotes: NoteItem[] = [
  {
    id: "n1",
    subjectId: "math",
    titleKu: "یاساکانی تەواوکاری و داتاشراو (Formulas of Derivatives)",
    titleEn: "Derivatives & Integrals Key Formulas",
    contentKu: "1. d/dx(xⁿ) = n·xⁿ⁻¹\n2. ∫ xⁿ dx = (xⁿ⁺¹)/(n+1) + C\n3. d/dx(sin x) = cos x\n4. ∫ cos x dx = sin x + C",
    contentEn: "1. d/dx(xⁿ) = n·xⁿ⁻¹\n2. ∫ xⁿ dx = (xⁿ⁺¹)/(n+1) + C\n3. d/dx(sin x) = cos x\n4. ∫ cos x dx = sin x + C",
    date: "2026-07-20",
    isFavorite: true
  },
  {
    id: "n2",
    subjectId: "physics",
    titleKu: "یاسای کۆلۆم و مەیدانی کارەبایی",
    titleEn: "Coulomb's Law & Electric Field Summary",
    contentKu: "یاسای کۆلۆم: F = k·(|q₁q₂|)/r²\nکە k = 8.99 × 10⁹ N·m²/C²\nمەیدانی کارەبایی: E = F/q",
    contentEn: "Coulomb's Law: F = k·(|q₁q₂|)/r²\nk = 8.99 × 10⁹ N·m²/C²\nElectric Field: E = F/q",
    date: "2026-07-22",
    isFavorite: true
  },
  {
    id: "n3",
    subjectId: "chemistry",
    titleKu: "یاسای pH و pOH بۆ ترش و تفتە بەهێزەکان",
    titleEn: "pH & pOH Equations for Strong Acids/Bases",
    contentKu: "pH + pOH = 14\npH = -log[H₃O⁺]\n[H₃O⁺] × [OH⁻] = 1.0 × 10⁻¹⁴ (Kw)",
    contentEn: "pH + pOH = 14\npH = -log[H₃O⁺]\n[H₃O⁺] × [OH⁻] = 1.0 × 10⁻¹⁴ (Kw)",
    date: "2026-07-24",
    isFavorite: false
  }
];

export const mockShopItems: ShopItem[] = [
  {
    id: "shop_1",
    nameKu: "چوارچێوەی تاجدار (Golden Crown Frame)",
    nameEn: "Golden Crown Profile Frame",
    descriptionKu: "پڕۆفایلەکەت بە تاجێکی زێڕینی وزاری دەڕازێنێتەوە",
    descriptionEn: "Adorn your avatar with a shining ministerial crown",
    priceXp: 1500,
    category: "avatar",
    icon: "👑",
    purchased: false
  },
  {
    id: "shop_2",
    nameKu: "پاراستنی بەردەوامی (Streak Freeze)",
    nameEn: "Streak Freeze Powerup",
    descriptionKu: "پاراستنی ڕۆژانی بەردەوامیت لە حاڵەتی بیرچوونەوەی یەک ڕۆژدا",
    descriptionEn: "Protects your daily streak if you miss practicing 1 day",
    priceXp: 1000,
    category: "powerup",
    icon: "❄️",
    purchased: true
  },
  {
    id: "shop_3",
    nameKu: "ناونیشانی 'پاشای بیرکاری'",
    nameEn: "Title: Math Wizard",
    descriptionKu: "ناونیشانێکی سەرنجڕاکێش لە تەنیشت ناوت لە ڕێزبەنددا",
    descriptionEn: "Display 'Math Wizard' title next to your profile in leaderboard",
    priceXp: 2000,
    category: "badge",
    icon: "🧙‍♂️",
    purchased: false
  },
  {
    id: "shop_4",
    nameKu: "تیمای تاریکی سەرمەدی (Neon Cyber Theme)",
    nameEn: "Neon Cyber Dark Theme",
    descriptionKu: "تیمای تایبەتی نەیۆنی لە ڕەنگەکانی وەنەوشەیی و شین",
    descriptionEn: "Unlock dynamic neon ambient accents for your interface",
    priceXp: 3000,
    category: "theme",
    icon: "🔮",
    purchased: false
  }
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: "post_1",
    authorName: "Rebin Kardo",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    authorCity: "Erbil",
    subjectId: "math",
    questionText: "تکایە کێ دەتوانێت یاسای L'Hôpital لە سنوورەکاندا بە شێوەیەکی ئاسان لە بیرکاریدا ڕوون بکاتەوە؟",
    likesCount: 24,
    commentsCount: 3,
    createdAt: "3 کاتژمێر پێش ئێستا",
    isLiked: false,
    answers: [
      {
        id: "ans_1",
        authorName: "Kakarash (Teacher)",
        authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
        text: "کاتی سنوورەکەت 0/0 یان ∞/∞ دەردەچێت، تەنها داتاشراوی (Derivative) سەر و داتاشراوی ژێر بە جیا وەربگرە پاشان x دابنێوە!",
        isVerifiedTeacher: true,
        likes: 18
      }
    ]
  },
  {
    id: "post_2",
    authorName: "Avesta Soran",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    authorCity: "Sulaymaniyah",
    subjectId: "physics",
    questionText: "پرسیاری وزاری ۲۰۲۳ خولی یەکەم: یاسای فارادای لە هاندانی کارۆموگناتیسی دا؟",
    likesCount: 15,
    commentsCount: 2,
    createdAt: "5 کاتژمێر پێش ئێستا",
    isLiked: true,
    answers: [
      {
        id: "ans_2",
        authorName: "Amed",
        authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        text: "هێزی دافعەی کارەبایی هاندراو y = -N (ΔΦ/Δt). هێمای نەرێنی دژایەتیی یاسای لێنز نیشان دەدات.",
        isVerifiedTeacher: false,
        likes: 9
      }
    ]
  }
];

export const mockVideos: VideoLesson[] = [
  {
    id: "v1",
    subjectId: "math",
    titleKu: "شیکردنەوەی تەواوی نەخشەکان و سنوورەکان (کۆرسی کامل)",
    titleBadini: "شیکارکرنا دەستپێکا نەخشە و سنووران ب کوردی",
    titleEn: "Mastering Functions and Limits for Grade 12",
    chapterKu: "بەشی یەکەم: نەخشەکان",
    chapterBadini: "بەشێ ئێکێ: نەخشە",
    chapterEn: "Chapter 1: Functions",
    duration: "24:15",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80",
    teacherName: "م. بڵند هەولێری",
    views: 14200,
    isHd: true,
    isPremium: false
  },
  {
    id: "v2",
    subjectId: "physics",
    titleKu: "یاساکانی کۆلۆم و مەیدانی کارەبایی بە ئاسانترین شێوە",
    titleBadini: "یاسایا کۆلۆمی و مەیدانا کارەبایی ب تێگەهشتنا وزاری",
    titleEn: "Coulomb's Law & Electric Fields Made Easy",
    chapterKu: "بەشی سێیەم: مەیدانی کارەبایی",
    chapterBadini: "بەشێ سیێ: مەیدانا کارەبایی",
    chapterEn: "Chapter 3: Electric Field",
    duration: "18:40",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80",
    teacherName: "م. پشتیوان سلێمانی",
    views: 11800,
    isHd: true,
    isPremium: false
  },
  {
    id: "v3",
    subjectId: "chemistry",
    titleKu: "ترشەکان، تفتەکان و دۆزینەوەی pH لە پرسیاری وزاری",
    titleBadini: "ترش و تفت و شیکارکرنا pH د ئەزموونێن وزاری دا",
    titleEn: "Acids, Bases & pH Calculation Step-by-Step",
    chapterKu: "بەشی دووەم: ترش و تفت",
    chapterBadini: "بەشێ دووێ: ترش و تفت",
    chapterEn: "Chapter 2: Acids & Bases",
    duration: "22:10",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80",
    teacherName: "م. ئازاد دهۆکی",
    views: 9500,
    isHd: true,
    isPremium: true
  },
  {
    id: "v4",
    subjectId: "biology",
    titleKu: "شیکردنەوەی پێکهاتەی DNA و دووهێندەبوون (Replication)",
    titleBadini: "شیکارکرنا پەیکەرێ DNA و بۆماوەیی پۆلا ۱۲",
    titleEn: "DNA Replication & Genetics Overview",
    chapterKu: "بەشی پێنجەم: بۆماوەیی",
    chapterBadini: "بەشێ پێنجێ: بۆماوەیی",
    chapterEn: "Chapter 5: Genetics",
    duration: "19:55",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&auto=format&fit=crop&q=80",
    teacherName: "م. ڕێژین هۆشیار",
    views: 13100,
    isHd: true,
    isPremium: false
  }
];

export const mockPdfs: PdfDocument[] = [
  {
    id: "pdf1",
    subjectId: "math",
    titleKu: "کورتکراوە و تەواوی فرمۆلاکانی بیرکاری پۆلی ۱۲ (مەلزەمەی زێڕین)",
    titleBadini: "مەلزەما زێڕینا بیرکاریێ بۆ پۆلا ۱۲ یێن وزاری",
    titleEn: "Grade 12 Math Complete Formulas & Shortcuts PDF",
    pages: 42,
    fileSize: "8.4 MB",
    downloadUrl: "#",
    authorTeacher: "م. هەڵکەوت مامەند",
    year: "2024-2025",
    isExclusive: true
  },
  {
    id: "pdf2",
    subjectId: "physics",
    titleKu: "مەلزەمەی پرسیارە شیکارکراوەکانی فیزیا ۱۰ ساڵی ڕابردووی وزاری",
    titleBadini: "مەلزەما پرسیارێن وزاری یێن فیزیا ۱۰ ساڵێن بورین",
    titleEn: "Physics 10-Year Ministerial Solved Papers PDF",
    pages: 88,
    fileSize: "15.2 MB",
    downloadUrl: "#",
    authorTeacher: "م. پشتیوان سلێمانی",
    year: "2015-2024",
    isExclusive: false
  },
  {
    id: "pdf3",
    subjectId: "chemistry",
    titleKu: "پوختەی کیمیای ئەندامی و هاوکێشە گرنگەکان",
    titleBadini: "کورتیا کیمیا ئەندامی و هاوکێشەیێن گرنگ",
    titleEn: "Organic Chemistry Essentials & Reactions PDF",
    pages: 36,
    fileSize: "6.1 MB",
    downloadUrl: "#",
    authorTeacher: "م. ئازاد دهۆکی",
    year: "2024",
    isExclusive: false
  },
  {
    id: "pdf4",
    subjectId: "english",
    titleKu: "ڕێزمانی کامل + وشەسازیی کتێبی Sunrise 12",
    titleBadini: "ڕێزمانا کامل و پەیڤێن کتێبا Sunrise 12",
    titleEn: "Sunrise 12 Grammar & Vocabulary Master PDF",
    pages: 50,
    fileSize: "9.8 MB",
    downloadUrl: "#",
    authorTeacher: "Mr. Karwan English",
    year: "2024",
    isExclusive: true
  }
];

export const mockMissions: Mission[] = [
  {
    id: "m1",
    titleKu: "شیکارکردنی ۱۰ پرسیاری بیرکاری",
    titleBadini: "شیکارکرنا ۱۰ پرسیارێن بیرکاریێ",
    titleEn: "Solve 10 Math Questions",
    xpReward: 300,
    coinsReward: 100,
    currentProgress: 7,
    target: 10,
    completed: false,
    claimed: false,
    iconName: "Calculator"
  },
  {
    id: "m2",
    titleKu: "سەیرکردنی ۱ وانەی ڤیدیۆیی",
    titleBadini: "دیترنا ۱ وانەیا ڤیدیۆیی",
    titleEn: "Watch 1 Full Video Lesson",
    xpReward: 200,
    coinsReward: 50,
    currentProgress: 1,
    target: 1,
    completed: true,
    claimed: false,
    iconName: "Video"
  },
  {
    id: "m3",
    titleKu: "پێشکەشکردنی ۱ تاقیکردنەوەی وزاری",
    titleBadini: "تەواوکرنا ۱ تاقیکرنا وزاری",
    titleEn: "Complete 1 Full Ministerial Mock Exam",
    xpReward: 500,
    coinsReward: 250,
    currentProgress: 1,
    target: 1,
    completed: true,
    claimed: true,
    iconName: "Award"
  }
];

export const mockFriends: FriendUser[] = [
  {
    id: "f1",
    name: "Amed Soran",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    level: 19,
    isOnline: true,
    streak: 22,
    city: "Erbil",
    lastMessage: "سڵاو برایم، پرسیاری ۱۲ی فیزیات شیکار کرد؟"
  },
  {
    id: "f2",
    name: "Sara Barzani",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    level: 21,
    isOnline: false,
    streak: 40,
    city: "Duhok",
    lastMessage: "دەستت خۆش بێت بۆ نۆتەکان!"
  },
  {
    id: "f3",
    name: "Karzan Slemani",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    level: 16,
    isOnline: true,
    streak: 15,
    city: "Sulaymaniyah",
    lastMessage: "وەرە 1vs1 چالنجی کیمیا بکەین!"
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: "n1",
    titleKu: "تاقیکردنەوەی ڕاستەوخۆی وزاری هەفتانە سەعات ٨ی ئێوارەیە!",
    titleBadini: "تاقیکرنا ڕاستەوخۆ یا وزاری سەعەت ٨ دەستپێدکەت!",
    titleEn: "Weekly Ministerial Live Exam starts at 8:00 PM!",
    time: "۱۰ خولەک پێش ئێستا",
    read: false,
    type: "exam"
  },
  {
    id: "n2",
    titleKu: "مەلزەمەی تازەی بیرکاری م. بڵند زێدە کرا بۆ کتێبخانەی PDF",
    titleBadini: "مەلزەما نوی یا بیرکاریێ زێدە بوو بۆ کتێبخانێ",
    titleEn: "New Math Formula PDF released in PDF Library",
    time: "۲ کاتژمێر پێش ئێستا",
    read: false,
    type: "video"
  },
  {
    id: "n3",
    titleKu: "هاوڕێت Karzan بانگهێشتی کردی بۆ چالنجی 1vs1",
    titleBadini: "کارتۆن بانگهێشتا تە کر بۆ 1vs1",
    titleEn: "Karzan invited you to a 1vs1 Quiz Battle",
    time: "۵ کاتژمێر پێش ئێستا",
    read: true,
    type: "challenge"
  }
];
