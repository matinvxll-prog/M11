export interface SyllabusSection {
  id: string;
  titleBadini: string;
  titleKu: string;
  titleEn: string;
  weightMinisterial: string;
}

export interface SyllabusChapter {
  id: string;
  chapterNumber: number | string;
  titleBadini: string;
  titleKu: string;
  titleEn: string;
  sectionsCount: number;
  sections: SyllabusSection[];
}

export interface SyllabusSubject {
  id: string;
  nameBadini: string;
  nameKu: string;
  nameEn: string;
  color: string;
  icon: string;
  totalSections: number;
  chapters: SyllabusChapter[];
  dailyRecommendationBadini: string;
  dailyRecommendationKu: string;
  dailyRecommendationEn: string;
  monthlyTargetBadini: string;
  monthlyTargetKu: string;
  monthlyTargetEn: string;
  ministerialStrategyBadini: string;
  ministerialStrategyKu: string;
  ministerialStrategyEn: string;
}

export const grade12SyllabusData: SyllabusSubject[] = [
  {
    id: "biology",
    nameBadini: "زیندەوەر (Biology)",
    nameKu: "زیندەوەرزانی (Biology)",
    nameEn: "Biology",
    color: "#FFDD94",
    icon: "🧬",
    totalSections: 27,
    dailyRecommendationBadini: "ڕۆژانە ١ پشک + پێداچوونەڤا پرسیارێن وزاری یێن سالێن دەربازبووی.",
    dailyRecommendationKu: "ڕۆژانە ١ پشک + پێداچوونەوەی پرسیاری وزاری ساڵانی پێشوو.",
    dailyRecommendationEn: "Daily 1 section + review past ministerial questions.",
    monthlyTargetBadini: "تەمامکردنا ٢ بۆ ٣ بەندان د هەیڤەکێ دا دگەل تاقیکردنەڤا گشتی.",
    monthlyTargetKu: "تەواوکردنی ٢ بۆ ٣ بەند لە مانگێکدا لەگەڵ تاقیکردنەوەی گشتی.",
    monthlyTargetEn: "Complete 2 to 3 chapters per month with a comprehensive test.",
    ministerialStrategyBadini: "بەندێن ٤، ٥، و ٨ زۆرترین پرسیار ل سەر دهێن د وزاری دا (پتریا نمران ل سەرن).",
    ministerialStrategyKu: "بەندەکانی ٤، ٥، و ٨ زۆرترین پرسیاریان لەسەر دێت لە وزاری دا.",
    ministerialStrategyEn: "Chapters 4, 5, and 8 carry the highest ministerial weight.",
    chapters: [
      {
        id: "bio-ch1",
        chapterNumber: "بەندێ ١",
        titleBadini: "بەندێ ئێکێ (٣ پشک)",
        titleKu: "بەندێ یەکەم (٣ پشک)",
        titleEn: "Chapter 1 (3 Sections)",
        sectionsCount: 3,
        sections: [
          { id: "bio-ch1-s1", titleBadini: "پشکا ١: پێکهاتە و فەرمانێن خانێ", titleKu: "پشکی ١: پێکهاتە و فەرمانەکانی خانە", titleEn: "Section 1: Cell Structure & Function", weightMinisterial: "٨٪ وزاری" },
          { id: "bio-ch1-s2", titleBadini: "پشکا ٢: گواستنەڤا ماددان", titleKu: "پشکی ٢: گواستنەوەی ماددەکان", titleEn: "Section 2: Transport of Materials", weightMinisterial: "٧٪ وزاری" },
          { id: "bio-ch1-s3", titleBadini: "پشکا ٣: دابەشبوونا خانێ", titleKu: "پشکی ٣: دابەشبوونی خانە", titleEn: "Section 3: Cell Division", weightMinisterial: "١٠٪ وزاری" },
        ]
      },
      {
        id: "bio-ch2",
        chapterNumber: "بەندێ ٢",
        titleBadini: "بەندێ دووێ (٣ پشک)",
        titleKu: "بەندێ دووەم (٣ پشک)",
        titleEn: "Chapter 2 (3 Sections)",
        sectionsCount: 3,
        sections: [
          { id: "bio-ch2-s1", titleBadini: "پشکا ١: شەپۆلا دەماری و هەستەوەر", titleKu: "پشکی ١: شەپۆلی دەماری و هەستەوەر", titleEn: "Section 1: Nerve Impulse", weightMinisterial: "٨٪ وزاری" },
          { id: "bio-ch2-s2", titleBadini: "پشکا ٢: کۆئەندامێ دەماری یێ ناوەندی", titleKu: "پشکی ٢: کۆئەندامی دەماری ناوەندی", titleEn: "Section 2: Central Nervous System", weightMinisterial: "٩٪ وزاری" },
          { id: "bio-ch2-s3", titleBadini: "پشکا ٣: هەستەوەرێن تایبەت", titleKu: "پشکی ٣: هەستەوەرە تایبەتەکان", titleEn: "Section 3: Special Senses", weightMinisterial: "٨٪ وزاری" },
        ]
      },
      {
        id: "bio-ch3",
        chapterNumber: "بەندێ ٣",
        titleBadini: "بەندێ سیێ (٣ پشک)",
        titleKu: "بەندێ سێیەم (٣ پشک)",
        titleEn: "Chapter 3 (3 Sections)",
        sectionsCount: 3,
        sections: [
          { id: "bio-ch3-s1", titleBadini: "پشکا ١: کۆئەندامێ کوێرە ڕژێن", titleKu: "پشکی ١: کۆئەندامی کوێرە ڕژێن", titleEn: "Section 1: Endocrine System", weightMinisterial: "٨٪ وزاری" },
          { id: "bio-ch3-s2", titleBadini: "پشکا ٢: هۆرمۆنێن سەرەکی", titleKu: "پشکی ٢: هۆرمۆنە سەرەکییەکان", titleEn: "Section 2: Major Hormones", weightMinisterial: "٩٪ وزاری" },
          { id: "bio-ch3-s3", titleBadini: "پشکا ٣: ڕێکخستنا هۆرمۆنی", titleKu: "پشکی ٣: ڕێکخستنی هۆرمۆنی", titleEn: "Section 3: Hormonal Regulation", weightMinisterial: "٨٪ وزاری" },
        ]
      },
      {
        id: "bio-ch4",
        chapterNumber: "بەندێ ٤",
        titleBadini: "بەندێ چارێ (٤ پشک)",
        titleKu: "بەندێ چوارەم (٤ پشک)",
        titleEn: "Chapter 4 (4 Sections)",
        sectionsCount: 4,
        sections: [
          { id: "bio-ch4-s1", titleBadini: "پشکا ١: زۆربوون د زیندەوەران دا", titleKu: "پشکی ١: زۆربوون لە زیندەوەراندا", titleEn: "Section 1: Reproduction", weightMinisterial: "٩٪ وزاری" },
          { id: "bio-ch4-s2", titleBadini: "پشکا ٢: کۆئەندامێ زۆربوونێ یێ نێرینە", titleKu: "پشکی ٢: کۆئەندامی زۆربوونی نێرینە", titleEn: "Section 2: Male Reproductive System", weightMinisterial: "٨٪ وزاری" },
          { id: "bio-ch4-s3", titleBadini: "پشکا ٣: کۆئەندامێ زۆربوونێ یێ مێیینە", titleKu: "پشکی ٣: کۆئەندامی زۆربوونی مێیینە", titleEn: "Section 3: Female Reproductive System", weightMinisterial: "١٠٪ وزاری" },
          { id: "bio-ch4-s4", titleBadini: "پشکا ٤: پیتین و گەشەکردن", titleKu: "پشکی ٤: پیتین و گەشەکردن", titleEn: "Section 4: Fertilization & Development", weightMinisterial: "٩٪ وزاری" },
        ]
      },
      {
        id: "bio-ch5",
        chapterNumber: "بەندێ ٥",
        titleBadini: "بەندێ پێنچێ (٥ پشک)",
        titleKu: "بەندێ پێنجەم (٥ پشک)",
        titleEn: "Chapter 5 (5 Sections)",
        sectionsCount: 5,
        sections: [
          { id: "bio-ch5-s1", titleBadini: "پشکا ١: بۆماوەزانی و مندل", titleKu: "پشکی ١: بۆماوەزانی و مندل", titleEn: "Section 1: Genetics & Mendel", weightMinisterial: "١٢٪ وزاری" },
          { id: "bio-ch5-s2", titleBadini: "پشکا ٢: یاسایا دووێ یا مندل", titleKu: "پشکی ٢: یاسای دووەمی مندل", titleEn: "Section 2: Mendel's Second Law", weightMinisterial: "١٠٪ وزاری" },
          { id: "bio-ch5-s3", titleBadini: "پشکا ٣: بۆماوەیا نە-مندلی", titleKu: "پشکی ٣: بۆماوەی نە-مندلی", titleEn: "Section 3: Non-Mendelian Genetics", weightMinisterial: "٩٪ وزاری" },
          { id: "bio-ch5-s4", titleBadini: "پشکا ٤: بۆماوەیا ڕەگەزی", titleKu: "پشکی ٤: بۆماوەی ڕەگەزی", titleEn: "Section 4: Sex-Linked Traits", weightMinisterial: "١١٪ وزاری" },
          { id: "bio-ch5-s5", titleBadini: "پشکا ٥: بازدان و گۆڕان د کڕۆمۆسۆمان دا", titleKu: "پشکی ٥: بازدان و گۆڕان لە کڕۆمۆسۆمەکاندا", titleEn: "Section 5: Mutations & Chromosomal Aberrations", weightMinisterial: "١٠٪ وزاری" },
        ]
      },
      {
        id: "bio-ch6",
        chapterNumber: "بەندێ ٦",
        titleBadini: "بەندێ شەشێ (٣ پشک)",
        titleKu: "بەندێ شەشەم (٣ پشک)",
        titleEn: "Chapter 6 (3 Sections)",
        sectionsCount: 3,
        sections: [
          { id: "bio-ch6-s1", titleBadini: "پشکا ١: ماددێ بۆماوەیی DNA", titleKu: "پشکی ١: ماددەی بۆماوەیی DNA", titleEn: "Section 1: DNA Genetic Material", weightMinisterial: "١٠٪ وزاری" },
          { id: "bio-ch6-s2", titleBadini: "پشکا ٢: لێکچوونا DNA و RNA", titleKu: "پشکی ٢: لەبەرگرتنەوەی DNA و RNA", titleEn: "Section 2: DNA Replication & RNA", weightMinisterial: "٩٪ وزاری" },
          { id: "bio-ch6-s3", titleBadini: "پشکا ٣: دروستبوونا پڕۆتینی", titleKu: "پشکی ٣: دروستبوونی پڕۆتین", titleEn: "Section 3: Protein Synthesis", weightMinisterial: "١٠٪ وزاری" },
        ]
      },
      {
        id: "bio-ch7",
        chapterNumber: "بەندێ ٧",
        titleBadini: "بەندێ حەفتێ (٢ پشک)",
        titleKu: "بەندێ حەوتەم (٢ پشک)",
        titleEn: "Chapter 7 (2 Sections)",
        sectionsCount: 2,
        sections: [
          { id: "bio-ch7-s1", titleBadini: "پشکا ١: تەکنەلۆژیا بۆماوەیی", titleKu: "پشکی ١: تەکنەلۆجیای بۆماوەیی", titleEn: "Section 1: Genetic Engineering", weightMinisterial: "٩٪ وزاری" },
          { id: "bio-ch7-s2", titleBadini: "پشکا ٢: بۆماوەیا مرۆڤی و کلۆنکردن", titleKu: "پشکی ٢: بۆماوەی مرۆڤ و کلۆنکردن", titleEn: "Section 2: Human Genetics & Cloning", weightMinisterial: "٨٪ وزاری" },
        ]
      },
      {
        id: "bio-ch8",
        chapterNumber: "بەندێ ٨",
        titleBadini: "بەندێ هەشتێ (٤ پشک)",
        titleKu: "بەندێ هەشتەم (٤ پشک)",
        titleEn: "Chapter 8 (4 Sections)",
        sectionsCount: 4,
        sections: [
          { id: "bio-ch8-s1", titleBadini: "پشکا ١: پەرەسەندن و بیردۆزا داروین", titleKu: "پشکی ١: پەرەسەندن و بیردۆزی داروین", titleEn: "Section 1: Evolution & Darwin", weightMinisterial: "٨٪ وزاری" },
          { id: "bio-ch8-s2", titleBadini: "پشکا ٢: بەڵگەیێن پەرەسەندنێ", titleKu: "پشکی ٢: بەڵگەکانی پەرەسەندن", titleEn: "Section 2: Evidence of Evolution", weightMinisterial: "٨٪ وزاری" },
          { id: "bio-ch8-s3", titleBadini: "پشکا ٣: دروستبوونا جۆران", titleKu: "پشکی ٣: دروستبوونی جۆرەکان", titleEn: "Section 3: Speciation", weightMinisterial: "٧٪ وزاری" },
          { id: "bio-ch8-s4", titleBadini: "پشکا ٤: پەرەسەندنا مرۆڤی", titleKu: "پشکی ٤: پەرەسەندنی مرۆڤ", titleEn: "Section 4: Human Evolution", weightMinisterial: "٨٪ وزاری" },
        ]
      }
    ]
  },
  {
    id: "math",
    nameBadini: "بیرکاری (Math)",
    nameKu: "بیرکاری (Math)",
    nameEn: "Mathematics",
    color: "#86E3CE",
    icon: "📐",
    totalSections: 20,
    dailyRecommendationBadini: "ڕۆژانە شیکارکردنا ٢٠ بۆ ٣٠ پرسیارێن وزاری و ڕاهێنانان.",
    dailyRecommendationKu: "ڕۆژانە شیکارکردنی ٢٠ بۆ ٣٠ پرسیاری وزاری و ڕاهێنان.",
    dailyRecommendationEn: "Solve 20 to 30 practice and ministerial questions daily.",
    monthlyTargetBadini: "تەمامکردنا ١ بۆ ٢ بەشان ب شێوەیەکێ کوور دگەل شیکاریا تەواو.",
    monthlyTargetKu: "تەواوکردنی ١ بۆ ٢ بەش بە شێوەیەکی قووڵ لەگەڵ شیکاری تەواو.",
    monthlyTargetEn: "Complete 1 to 2 parts with deep problem solving monthly.",
    ministerialStrategyBadini: "بەشێ ٣ (تەواوکاری) و بەشێ ٤ زۆرترین کێش و نمرە د پرسیارێن وزاری دا هەنە.",
    ministerialStrategyKu: "بەشی ٣ و ٤ زۆرترین کێش و نمرەیان هەیە لە وزاری دا.",
    ministerialStrategyEn: "Parts 3 and 4 have the highest number of questions in ministerial exams.",
    chapters: [
      {
        id: "math-p1",
        chapterNumber: "بەشێ ١",
        titleBadini: "بەشێ ئێکێ (٣ وانە)",
        titleKu: "بەشی یەکەم (٣ وانە)",
        titleEn: "Part 1 (3 Lessons)",
        sectionsCount: 3,
        sections: [
          { id: "math-p1-l1", titleBadini: "وانە ١: نەخشە و بوار و مەودا", titleKu: "وانەی ١: نەخشە و بوار و مەودا", titleEn: "Lesson 1: Functions, Domain & Range", weightMinisterial: "٨٪ وزاری" },
          { id: "math-p1-l2", titleBadini: "وانە ٢: لیمیت (ئەنجام) و بەردەوامی", titleKu: "وانەی ٢: لیمیت و بەردەوامی", titleEn: "Lesson 2: Limits & Continuity", weightMinisterial: "٩٪ وزاری" },
          { id: "math-p1-l3", titleBadini: "وانە ٣: لیمیت د بێکوتا دا", titleKu: "وانەی ٣: لیمیت لە بێکۆتاییدا", titleEn: "Lesson 3: Limits at Infinity", weightMinisterial: "٨٪ وزاری" },
        ]
      },
      {
        id: "math-p2",
        chapterNumber: "بەشێ ٢",
        titleBadini: "بەشێ دووێ (٤ وانە)",
        titleKu: "بەشی دووەم (٤ وانە)",
        titleEn: "Part 2 (4 Lessons)",
        sectionsCount: 4,
        sections: [
          { id: "math-p2-l1", titleBadini: "وانە ١: گرتە و یاسایێن گرتێ", titleKu: "وانەی ١: گرتە و یاساکانی گرتە", titleEn: "Lesson 1: Derivative & Rules", weightMinisterial: "١٠٪ وزاری" },
          { id: "math-p2-l2", titleBadini: "وانە ٢: گرتەیا نەخشێن سێگۆشەیی", titleKu: "وانەی ٢: گرتەی نەخشە سێگۆشەییەکان", titleEn: "Lesson 2: Trigonometric Derivatives", weightMinisterial: "٩٪ وزاری" },
          { id: "math-p2-l3", titleBadini: "وانە ٣: یاسایا زنجیرەیی و گرتەیا ناڤەکی", titleKu: "وانەی ٣: یاسای زنجیرەیی و گرتەی ناوەکی", titleEn: "Lesson 3: Chain Rule & Implicit Diff", weightMinisterial: "١٠٪ وزاری" },
          { id: "math-p2-l4", titleBadini: "وانە ٤: گرتەیا بلندتر", titleKu: "وانەی ٤: گرتەی بەرزتر", titleEn: "Lesson 4: Higher Order Derivatives", weightMinisterial: "٨٪ وزاری" },
        ]
      },
      {
        id: "math-p3",
        chapterNumber: "بەشێ ٣",
        titleBadini: "بەشێ سیێ (٤ وانە)",
        titleKu: "بەشی سێیەم (٤ وانە)",
        titleEn: "Part 3 (4 Lessons)",
        sectionsCount: 4,
        sections: [
          { id: "math-p3-l1", titleBadini: "وانە ١: بکارئینانا گرتێ د ئەندازێ دا", titleKu: "وانەی ١: بەکارهێنانی گرتە لە ئەندازەدا", titleEn: "Lesson 1: Geometric Applications", weightMinisterial: "١١٪ وزاری" },
          { id: "math-p3-l2", titleBadini: "وانە ٢: خاڵا وەرچەرخانێ و قۆقز و چاڵ", titleKu: "وانەی ٢: خاڵی وەرچەرخان و قۆقز و چاڵ", titleEn: "Lesson 2: Inflection Points & Concavity", weightMinisterial: "١٠٪ وزاری" },
          { id: "math-p3-l3", titleBadini: "وانە ٣: وێنەکردنا نەخشەیان", titleKu: "وانەی ٣: وێنەکردنی نەخشەکان", titleEn: "Lesson 3: Curve Sketching", weightMinisterial: "١٢٪ وزاری" },
          { id: "math-p3-l4", titleBadini: "وانە ٤: پرسیارێن بەرزترین و نزمترین نرخ", titleKu: "وانەی ٤: پرسیارەکانی بەرزترین و نزمترین نرخ", titleEn: "Lesson 4: Optimization Problems", weightMinisterial: "١٢٪ وزاری" },
        ]
      },
      {
        id: "math-p4",
        chapterNumber: "بەشێ ٤",
        titleBadini: "بەشێ چارێ (٥ وانە)",
        titleKu: "بەشی چوارەم (٥ وانە)",
        titleEn: "Part 4 (5 Lessons)",
        sectionsCount: 5,
        sections: [
          { id: "math-p4-l1", titleBadini: "وانە ١: تەواوکاری (ئەنتێگرال) یێ نەدیار", titleKu: "وانەی ١: تەواوکاری (ئەنتێگرال) ی نەدیار", titleEn: "Lesson 1: Indefinite Integral", weightMinisterial: "١٠٪ وزاری" },
          { id: "math-p4-l2", titleBadini: "وانە ٢: تەواوکاریا نەخشێن سێگۆشەیی", titleKu: "وانەی ٢: تەواوکاری نەخشە سێگۆشەییەکان", titleEn: "Lesson 2: Trigonometric Integrals", weightMinisterial: "١٠٪ وزاری" },
          { id: "math-p4-l3", titleBadini: "وانە ٣: تەواوکاری ب گۆڕین (سەبستیتوشن)", titleKu: "وانەی ٣: تەواوکاری بە گۆڕین", titleEn: "Lesson 3: Integration by Substitution", weightMinisterial: "١١٪ وزاری" },
          { id: "math-p4-l4", titleBadini: "وانە ٤: تەواوکاریا دیارکراو", titleKu: "وانەی ٤: تەواوکاری دیاریکراو", titleEn: "Lesson 4: Definite Integral", weightMinisterial: "١٠٪ وزاری" },
          { id: "math-p4-l5", titleBadini: "وانە ٥: بکارئینانێن تەواوکاریێ (ڕووبەر و قەبارە)", titleKu: "وانەی ٥: بەکارهێنانەکانی تەواوکاری (ڕووبەر و قەبارە)", titleEn: "Lesson 5: Applications (Area & Volume)", weightMinisterial: "١٢٪ وزاری" },
        ]
      },
      {
        id: "math-p5",
        chapterNumber: "بەشێ ٥",
        titleBadini: "بەشێ پێنچێ (٤ وانە)",
        titleKu: "بەشی پێنجەم (٤ وانە)",
        titleEn: "Part 5 (4 Lessons)",
        sectionsCount: 4,
        sections: [
          { id: "math-p5-l1", titleBadini: "وانە ١: هاوکێشێن جیوازکاری", titleKu: "وانەی ١: هاوکێشە جیاوازکارییەکان", titleEn: "Lesson 1: Differential Equations", weightMinisterial: "٩٪ وزاری" },
          { id: "math-p5-l2", titleBadini: "وانە ٢: بڕگەیێن قوچەکی (بازنە و هێلکەیی)", titleKu: "وانەی ٢: بڕگە قوچەکییەکان (بازنە و هێلکەیی)", titleEn: "Lesson 2: Conic Sections (Circle & Ellipse)", weightMinisterial: "١٠٪ وزاری" },
          { id: "math-p5-l3", titleBadini: "وانە ٣: بڕگێ کەوانەیی و هاودژ", titleKu: "وانەی ٣: بڕگەی کەوانەیی و هاودژ", titleEn: "Lesson 3: Parabola & Hyperbola", weightMinisterial: "١٠٪ وزاری" },
          { id: "math-p5-l4", titleBadini: "وانە ٤: هاوکێشەیا گشتی یا بڕگەیان دگەل وزاری", titleKu: "وانەی ٤: هاوکێشەی گشتی بڕگەکان لەگەڵ وزاری", titleEn: "Lesson 4: General Equation of Conics", weightMinisterial: "٩٪ وزاری" },
        ]
      }
    ]
  },
  {
    id: "physics",
    nameBadini: "فیزیا (Physics)",
    nameKu: "فیزیا (Physics)",
    nameEn: "Physics",
    color: "#60A5FA",
    icon: "⚡",
    totalSections: 19,
    dailyRecommendationBadini: "ڕۆژانە ١ پشک + شیکارکردنا ١٥ پرسیارێن بژاردنێ یێن وزاری.",
    dailyRecommendationKu: "ڕۆژانە ١ پشک + شیکارکردنی ١٥ پرسیاری هەڵبژاردنی وزاری.",
    dailyRecommendationEn: "Daily 1 section + 15 multiple choice past papers.",
    monthlyTargetBadini: "تەمامکردنا ٢ بەندان ب تەواوی دگەل حەفتیانە تاقیکردنەڤەکا کورت.",
    monthlyTargetKu: "تەواوکردنی ٢ بەند بە تەواوی لەگەڵ هەفتانە تاقیکردنەوەیەکی کورت.",
    monthlyTargetEn: "Complete 2 chapters fully with a weekly quiz.",
    ministerialStrategyBadini: "بەندێ ٣ (کارەبا جوڵاو و کارۆگروپی) و بەندێ ٥ زۆرترین کێش ل سەرە.",
    ministerialStrategyKu: "بەندی ٣ و ٥ زۆرترین کێشی لەسەرە لە تاقیکردنەوەی وزاری.",
    ministerialStrategyEn: "Chapters 3 and 5 are tested most heavily in ministerial exams.",
    chapters: [
      {
        id: "phys-ch1",
        chapterNumber: "بەندێ ١",
        titleBadini: "بەندێ ئێکێ (٣ پشک)",
        titleKu: "بەندێ یەکەم (٣ پشک)",
        titleEn: "Chapter 1 (3 Sections)",
        sectionsCount: 3,
        sections: [
          { id: "phys-ch1-s1", titleBadini: "پشکا ١: باریگەیا کارەبایی و یاسایا کۆلۆم", titleKu: "پشکی ١: بارگەی کارەبایی و یاسای کۆلۆم", titleEn: "Section 1: Electric Charge & Coulomb's Law", weightMinisterial: "٨٪ وزاری" },
          { id: "phys-ch1-s2", titleBadini: "پشکا ٢: بوارێ کارەبایی", titleKu: "پشکی ٢: بواری کارەبایی", titleEn: "Section 2: Electric Field", weightMinisterial: "٩٪ وزاری" },
          { id: "phys-ch1-s3", titleBadini: "پشکا ٣: هێزا کارەبایی و شاڕێیا گاوس", titleKu: "پشکی ٣: هێزی کارەبایی و شاڕێی گاوس", titleEn: "Section 3: Electric Flux & Gauss Law", weightMinisterial: "٩٪ وزاری" },
        ]
      },
      {
        id: "phys-ch2",
        chapterNumber: "بەندێ ٢",
        titleBadini: "بەندێ دووێ (٣ پشک)",
        titleKu: "بەندێ دووەم (٣ پشک)",
        titleEn: "Chapter 2 (3 Sections)",
        sectionsCount: 3,
        sections: [
          { id: "phys-ch2-s1", titleBadini: "پشکا ١: ئەرکەوزەیا کارەبایی و ئاستێ ئەرکەوزەیێ", titleKu: "پشکی ١: ئەرکەوزەی کارەبایی و ئاستی ئەرکەوزە", titleEn: "Section 1: Electric Potential Energy", weightMinisterial: "٨٪ وزاری" },
          { id: "phys-ch2-s2", titleBadini: "پشکا ٢: توانستی و بوخچەیا کارەبایی", titleKu: "پشکی ٢: توانستی و بوخچەی کارەبایی", titleEn: "Section 2: Capacitance & Capacitors", weightMinisterial: "١٠٪ وزاری" },
          { id: "phys-ch2-s3", titleBadini: "پشکا ٣: گرێدانا بوخچەیان و وزەیا پاشکەوتکری", titleKu: "پشکی ٣: گرێدانی بوخچەکان و وزەی پاشەکەوتکراو", titleEn: "Section 3: Capacitor Combinations & Energy", weightMinisterial: "٩٪ وزاری" },
        ]
      },
      {
        id: "phys-ch3",
        chapterNumber: "بەندێ ٣",
        titleBadini: "بەندێ سیێ (٤ پشک)",
        titleKu: "بەندێ سێیەم (٤ پشک)",
        titleEn: "Chapter 3 (4 Sections)",
        sectionsCount: 4,
        sections: [
          { id: "phys-ch3-s1", titleBadini: "پشکا ١: تەژوویێ کارەبایی و بەرگری", titleKu: "پشکی ١: تەژووی کارەبایی و بەرگری", titleEn: "Section 1: Electric Current & Resistance", weightMinisterial: "٩٪ وزاری" },
          { id: "phys-ch3-s2", titleBadini: "پشکا ٢: یاسایا ئۆم و هێزا پاڵنەرا کارەبایی", titleKu: "پشکی ٢: یاسای ئۆم و هێزی پاڵنەری کارەبایی", titleEn: "Section 2: Ohm's Law & Electromotive Force", weightMinisterial: "١٠٪ وزاری" },
          { id: "phys-ch3-s3", titleBadini: "پشکا ٣: سوڕێن کارەبایی و یاسایێن کێرشۆف", titleKu: "پشکی ٣: سووڕە کارەباییەکان و یاساکانی کێرشۆف", titleEn: "Section 3: Circuits & Kirchhoff's Rules", weightMinisterial: "١١٪ وزاری" },
          { id: "phys-ch3-s4", titleBadini: "پشکا ٤: پێوانەکرنا تەژوویێ و پۆتەنشێل د سوڕان دا", titleKu: "پشکی ٤: پێوانەکردنی تەژوو و پۆتەنشێل لە سووڕەکاندا", titleEn: "Section 4: Electrical Measurements", weightMinisterial: "٩٪ وزاری" },
        ]
      },
      {
        id: "phys-ch4",
        chapterNumber: "بەندێ ٤",
        titleBadini: "بەندێ چارێ (٣ پشک)",
        titleKu: "بەندێ چوارەم (٣ پشک)",
        titleEn: "Chapter 4 (3 Sections)",
        sectionsCount: 3,
        sections: [
          { id: "phys-ch4-s1", titleBadini: "پشکا ١: بوارێ موگناتیسی و هێزا موگناتیسی", titleKu: "پشکی ١: بواری موگناتیسی و هێزی موگناتیسی", titleEn: "Section 1: Magnetic Field & Magnetic Force", weightMinisterial: "٩٪ وزاری" },
          { id: "phys-ch4-s2", titleBadini: "پشکا ٢: هێزا سەر تەژوویێ کارەبایی د بوارێ موگناتیسی دا", titleKu: "پشکی ٢: هێزی سەر تەژووی کارەبایی لە بواری موگناتیسی", titleEn: "Section 2: Magnetic Force on Current", weightMinisterial: "٩٪ وزاری" },
          { id: "phys-ch4-s3", titleBadini: "پشکا ٣: یاسایا بیۆ-ساڤار و ئەمپێر", titleKu: "پشکی ٣: یاسای بیۆ-ساڤار و ئەمپێر", titleEn: "Section 3: Biot-Savart & Ampere's Law", weightMinisterial: "١٠٪ وزاری" },
        ]
      },
      {
        id: "phys-ch5",
        chapterNumber: "بەندێ ٥",
        titleBadini: "بەندێ پێنچێ (٣ پشک)",
        titleKu: "بەندێ پێنجەم (٣ پشک)",
        titleEn: "Chapter 5 (3 Sections)",
        sectionsCount: 3,
        sections: [
          { id: "phys-ch5-s1", titleBadini: "پشکا ١: هەڵمژین و دیاردەیا کارۆموگناتیسی (یاسایا فارادای)", titleKu: "پشکی ١: هەڵمژین و دیاردەی کارۆموگناتیسی (یاسای فارادای)", titleEn: "Section 1: Electromagnetic Induction & Faraday", weightMinisterial: "١١٪ وزاری" },
          { id: "phys-ch5-s2", titleBadini: "پشکا ٢: یاسایا لێنز و خۆ-هەڵمژین", titleKu: "پشکی ٢: یاسای لێنز و خۆ-هەڵمژین", titleEn: "Section 2: Lenz's Law & Self Induction", weightMinisterial: "١٠٪ وزاری" },
          { id: "phys-ch5-s3", titleBadini: "پشکا ٣: مۆلیدە و ترانسفۆرمەر (گوێزەرەڤە)", titleKu: "پشکی ٣: مۆلیدە و گۆڕەر (ترانسفۆرمەر)", titleEn: "Section 3: Generators & Transformers", weightMinisterial: "١٠٪ وزاری" },
        ]
      },
      {
        id: "phys-ch6",
        chapterNumber: "بەندێ ٦",
        titleBadini: "بەندێ شەشێ (٣ پشک)",
        titleKu: "بەندێ شەشەم (٣ پشک)",
        titleEn: "Chapter 6 (3 Sections)",
        sectionsCount: 3,
        sections: [
          { id: "phys-ch6-s1", titleBadini: "پشکا ١: شەپۆلێن کارۆموگناتیسی و ڕۆشنایی", titleKu: "پشکی ١: شەپۆلە کارۆموگناتیسییەکان و ڕووناکی", titleEn: "Section 1: Electromagnetic Waves & Light", weightMinisterial: "٨٪ وزاری" },
          { id: "phys-ch6-s2", titleBadini: "پشکا ٢: شکین و پەرڤەبوونا ڕۆشناییێ", titleKu: "پشکی ٢: شکان و پەرشبوونی ڕووناکی", titleEn: "Section 2: Refraction & Interference", weightMinisterial: "٩٪ وزاری" },
          { id: "phys-ch6-s3", titleBadini: "پشکا ٣: لادان و جەمسەرگیری د ڕۆشناییێ دا", titleKu: "پشکی ٣: لادان و جەمسەرگیری لە ڕووناکیدا", titleEn: "Section 3: Diffraction & Polarization", weightMinisterial: "٩٪ وزاری" },
        ]
      }
    ]
  },
  {
    id: "chemistry",
    nameBadini: "کیمیا (Chemistry)",
    nameKu: "کیمیا (Chemistry)",
    nameEn: "Chemistry",
    color: "#CCABD8",
    icon: "🧪",
    totalSections: 23,
    dailyRecommendationBadini: "ڕۆژانە ١ پشک + حفظکردنا هاوکێشە و ڕاهێنان ل سەر کێش و مۆل.",
    dailyRecommendationKu: "ڕۆژانە ١ پشک + لەبەردکردنی هاوکێشە و ڕاهێنان لەسەر مۆل.",
    dailyRecommendationEn: "Daily 1 section + memorize reactions and mole calculations.",
    monthlyTargetBadini: "تەمامکردنا ٢ بۆ ٣ بەندان ب تەواوی دگەل پێداچوونەڤا وزاری.",
    monthlyTargetKu: "تەواوکردنی ٢ بۆ ٣ بەند بە تەواوی لەگەڵ پێداچوونەوەی وزاری.",
    monthlyTargetEn: "Complete 2-3 chapters per month with full past paper review.",
    ministerialStrategyBadini: "بەندێن ٦، ٩، و ١٠ (ئۆرگانیک و کارلێک) گرنگترینن و زۆرترین نمرە ل سەرن د وزاری دا.",
    ministerialStrategyKu: "بەندی ٦، ٩، و ١٠ زۆرترین نمرەیان لەسەرە لە تاقیکردنەوەی وزاری.",
    ministerialStrategyEn: "Chapters 6, 9, and 10 carry the highest point value in ministerial exams.",
    chapters: [
      {
        id: "chem-ch1",
        chapterNumber: "بەندێ ١",
        titleBadini: "بەندێ ئێکێ (٢ پشک)",
        titleKu: "بەندێ یەکەم (٢ پشک)",
        titleEn: "Chapter 1 (2 Sections)",
        sectionsCount: 2,
        sections: [
          { id: "chem-ch1-s1", titleBadini: "پشکا ١: پێکهاتەیا گەردیلێ و بیردۆزا بۆهر", titleKu: "پشکی ١: پێکهاتەی گەردیلە و بیردۆزی بۆهر", titleEn: "Section 1: Atomic Structure & Bohr Theory", weightMinisterial: "٨٪ وزاری" },
          { id: "chem-ch1-s2", titleBadini: "پشکا ٢: دابەشبوونا ئەلیکترۆنی و خشتێ خولی", titleKu: "پشکی ٢: دابەشبوونی ئەلیکترۆنی و خشتەی خولی", titleEn: "Section 2: Electron Configuration & Periodic Table", weightMinisterial: "٨٪ وزاری" },
        ]
      },
      {
        id: "chem-ch2",
        chapterNumber: "بەندێ ٢",
        titleBadini: "بەندێ دووێ (٣ پشک)",
        titleKu: "بەندێ دووەم (٣ پشک)",
        titleEn: "Chapter 2 (3 Sections)",
        sectionsCount: 3,
        sections: [
          { id: "chem-ch2-s1", titleBadini: "پشکا ١: یەکگرتنا کیمیایی و جۆرێن بەندان", titleKu: "پشکی ١: یەکگرتنی کیمیایی و جۆرەکانی بەند", titleEn: "Section 1: Chemical Bonding", weightMinisterial: "٨٪ وزاری" },
          { id: "chem-ch2-s2", titleBadini: "پشکا ٢: بەندێ کۆڤالێنت و شێوەیێ گەردان", titleKu: "پشکی ٢: بەندی کۆڤالێنت و شێوەی گەردەکان", titleEn: "Section 2: Covalent Bond & Molecular Geometry", weightMinisterial: "٩٪ وزاری" },
          { id: "chem-ch2-s3", titleBadini: "پشکا ٣: هێزێن نێوان گەردان و تایبەتمەندی", titleKu: "پشکی ٣: هێزەکانی نێوان گەردەکان و تایبەتمەندی", titleEn: "Section 3: Intermolecular Forces", weightMinisterial: "٨٪ وزاری" },
        ]
      },
      {
        id: "chem-ch3",
        chapterNumber: "بەندێ ٣",
        titleBadini: "بەندێ سیێ (٢ پشک)",
        titleKu: "بەندێ سێیەم (٢ پشک)",
        titleEn: "Chapter 3 (2 Sections)",
        sectionsCount: 2,
        sections: [
          { id: "chem-ch3-s1", titleBadini: "پشکا ١: گاز و یاسایێن گازان (بۆیل و چارلز)", titleKu: "پشکی ١: گاز و یاساکانی گاز (بۆیل و چارلز)", titleEn: "Section 1: Gases & Gas Laws", weightMinisterial: "٨٪ وزاری" },
          { id: "chem-ch3-s2", titleBadini: "پشکا ٢: هاوکێشەیا گازێ نموونەیی و بکارئینان", titleKu: "پشکی ٢: هاوکێشەی گازی نموونەیی", titleEn: "Section 2: Ideal Gas Equation", weightMinisterial: "٩٪ وزاری" },
        ]
      },
      {
        id: "chem-ch4",
        chapterNumber: "بەندێ ٤",
        titleBadini: "بەندێ چارێ (٢ پشک)",
        titleKu: "بەندێ چوارەم (٢ پشک)",
        titleEn: "Chapter 4 (2 Sections)",
        sectionsCount: 2,
        sections: [
          { id: "chem-ch4-s1", titleBadini: "پشکا ١: گیراوەکان و جۆرێن وان", titleKu: "پشکی ١: گیراوەکان و جۆرەکانیان", titleEn: "Section 1: Solutions & Types", weightMinisterial: "٨٪ وزاری" },
          { id: "chem-ch4-s2", titleBadini: "پشکا ٢: خەستییا گیراوەیان (مۆلاری و مۆلالیتە)", titleKu: "پشکی ٢: خەستی گیراوەکان (مۆلاری و مۆلالیتە)", titleEn: "Section 2: Solution Concentration", weightMinisterial: "٩٪ وزاری" },
        ]
      },
      {
        id: "chem-ch5",
        chapterNumber: "بەندێ ٥",
        titleBadini: "بەندێ پێنچێ (٢ پشک)",
        titleKu: "بەندێ پێنجەم (٢ پشک)",
        titleEn: "Chapter 5 (2 Sections)",
        sectionsCount: 2,
        sections: [
          { id: "chem-ch5-s1", titleBadini: "پشکا ١: وزە و گۆڕانکاریێن کیمیایی (تەرمۆکیمیا)", titleKu: "پشکی ١: وزە و گۆڕانکارییە کیمیاییەکان (تەرمۆکیمیا)", titleEn: "Section 1: Thermochemistry", weightMinisterial: "٩٪ وزاری" },
          { id: "chem-ch5-s2", titleBadini: "پشکا ٢: ئانتالپی و یاسایا هێس د کارلێکان دا", titleKu: "پشکی ٢: ئەنتالپی و یاسای هێس لە کارلێکەکاندا", titleEn: "Section 2: Enthalpy & Hess's Law", weightMinisterial: "١٠٪ وزاری" },
        ]
      },
      {
        id: "chem-ch6",
        chapterNumber: "بەندێ ٦",
        titleBadini: "بەندێ شەشێ (٤ پشک)",
        titleKu: "بەندێ شەشەم (٤ پشک)",
        titleEn: "Chapter 6 (4 Sections)",
        sectionsCount: 4,
        sections: [
          { id: "chem-ch6-s1", titleBadini: "پشکا ١: خێرایی کارلێکێن کیمیایی", titleKu: "پشکی ١: خێرایی کارلێکە کیمیاییەکان", titleEn: "Section 1: Reaction Rates", weightMinisterial: "٩٪ وزاری" },
          { id: "chem-ch6-s2", titleBadini: "پشکا ٢: یاسایێن خێراییێ و پلەیا کارلێکێ", titleKu: "پشکی ٢: یاساکانی خێرایی و پلەی کارلێک", titleEn: "Section 2: Rate Laws & Order of Reaction", weightMinisterial: "١٠٪ وزاری" },
          { id: "chem-ch6-s3", titleBadini: "پشکا ٣: هاوسەنگییا کیمیایی و نەگۆڕێ هاوسەنگیێ", titleKu: "پشکی ٣: هاوسەنگی کیمیایی و نەگۆڕی هاوسەنگی", titleEn: "Section 3: Chemical Equilibrium & Keq", weightMinisterial: "١١٪ وزاری" },
          { id: "chem-ch6-s4", titleBadini: "پشکا ٤: بنەمایێ لۆشاتلێ و گۆڕانکاریێن هاوسەنگیێ", titleKu: "پشکی ٤: بنەمای لۆشاتلێ و گۆڕانکارییەکانی هاوسەنگی", titleEn: "Section 4: Le Chatelier's Principle", weightMinisterial: "١١٪ وزاری" },
        ]
      },
      {
        id: "chem-ch9",
        chapterNumber: "بەندێ ٩",
        titleBadini: "بەندێ نەهێ (٤ پشک)",
        titleKu: "بەندێ نۆهەم (٤ پشک)",
        titleEn: "Chapter 9 (4 Sections)",
        sectionsCount: 4,
        sections: [
          { id: "chem-ch9-s1", titleBadini: "پشکا ١: ترش و تفتەکان (پێناسە و تایبەتمەندی)", titleKu: "پشکی ١: ترش و تفتەکان (پێناسە و تایبەتمەندی)", titleEn: "Section 1: Acids & Bases Definition", weightMinisterial: "١٠٪ وزاری" },
          { id: "chem-ch9-s2", titleBadini: "پشکا ٢: هێزا ترش و تفتان و پێوەرێ pH", titleKu: "پشکی ٢: هێزی ترش و تفتەکان و پێوەری pH", titleEn: "Section 2: Acid-Base Strength & pH Scale", weightMinisterial: "١١٪ وزاری" },
          { id: "chem-ch9-s3", titleBadini: "پشکا ٣: کارلێکا هاوتارکردن و بفر (Buffer)", titleKu: "پشکی ٣: کارلێکی هاوتارکردن و بفر (Buffer)", titleEn: "Section 3: Neutralization & Buffers", weightMinisterial: "١١٪ وزاری" },
          { id: "chem-ch9-s4", titleBadini: "پشکا ٤: پێوانەکرنا ترشێتی و شیکاریا لەکە", titleKu: "پشکی ٤: پێوانەکردنی ترشێتی و تیتراسیۆن", titleEn: "Section 4: Titration & Calculations", weightMinisterial: "١٠٪ وزاری" },
        ]
      },
      {
        id: "chem-ch10",
        chapterNumber: "بەندێ ١٠",
        titleBadini: "بەندێ دەهێ (٤ پشک)",
        titleKu: "بەندێ دەهەم (٤ پشک)",
        titleEn: "Chapter 10 (4 Sections)",
        sectionsCount: 4,
        sections: [
          { id: "chem-ch10-s1", titleBadini: "پشکا ١: دەسپێکەک بۆ کیمیا ئەندامی (هیدڕۆکاربۆن)", titleKu: "پشکی ١: دەستپێک بۆ کیمیا ئەندامی (هیدڕۆکاربۆن)", titleEn: "Section 1: Intro to Organic Chemistry", weightMinisterial: "٩٪ وزاری" },
          { id: "chem-ch10-s2", titleBadini: "پشکا ٢: ئەلکان و ئەلکین و ئەلکایینەکان", titleKu: "پشکی ٢: ئەلکان و ئەلکین و ئەلکایینەکان", titleEn: "Section 2: Alkanes, Alkenes & Alkynes", weightMinisterial: "١٠٪ وزاری" },
          { id: "chem-ch10-s3", titleBadini: "پشکا ٣: ئاوێتێن ئەندامی یێن ئۆکسیجیندار (کحول و ئەلدەهید)", titleKu: "پشکی ٣: ئاوێتە ئەندامییە ئۆکسیجیندارەکان", titleEn: "Section 3: Alcohols, Aldehydes & Ketones", weightMinisterial: "١١٪ وزاری" },
          { id: "chem-ch10-s4", titleBadini: "پشکا ٤: ترشێن کاربۆکسیلی و ئەستەرەکان د وزاری دا", titleKu: "پشکی ٤: ترشە کاربۆکسیلییەکان و ئەستەرەکان لە وزاری", titleEn: "Section 4: Carboxylic Acids & Esters", weightMinisterial: "١١٪ وزاری" },
        ]
      }
    ]
  },
  {
    id: "english",
    nameBadini: "ئینگلیزی (English)",
    nameKu: "ئینگلیزی (English)",
    nameEn: "English Language",
    color: "#A3E1D4",
    icon: "🇬🇧",
    totalSections: 29,
    dailyRecommendationBadini: "ڕۆژانە ١ بابەتێ گرامەر یان ١ رێدینگ + حلکردنا ئەکتێڤی تی بۆک و دەنگ.",
    dailyRecommendationKu: "ڕۆژانە ١ بابەتی گرامەر یان ١ ڕیدینگ + شیکارکردنی ئەکتیڤیتی بووک و دەنگ.",
    dailyRecommendationEn: "Daily 1 grammar point or Reading + Activity Book & Sounds exercises.",
    monthlyTargetBadini: "تەمامکردنا ٢ یونتان ب تەواوی (ڕێدینگ، گرامەر، ئەکتێڤی تی بۆک، ئێپسود، دەنگ).",
    monthlyTargetKu: "تەواوکردنی ٢ یونت بە تەواوی (ڕیدینگ، گرامەر، ئەکتیڤیتی بووک، ئێپسود، دەنگ).",
    monthlyTargetEn: "Complete 2 full units (Reading, Grammar, Activity Book, Episodes, Sounds).",
    ministerialStrategyBadini: "پرسیارێن وزاری ل سەر رێدینگ، گرامەر و پرسیارێن دەنگی (Phonetics) یێن یونتا ١، ٣، ٥، و ٦ زۆرترین نمرەنە.",
    ministerialStrategyKu: "پرسیارەکانی وزاری لەسەر ڕیدینگ، گرامەر و پرسیاری دەنگ (Phonetics) ی یونتی ١، ٣، ٥، و ٦ زۆرترین نمرەن.",
    ministerialStrategyEn: "Units 1, 3, 5, and 6 (Reading, Grammar & Sounds) carry the highest ministerial exam scores.",
    chapters: [
      {
        id: "eng-reading",
        chapterNumber: "ئەدەب و ڕێدینگ",
        titleBadini: "ڕێدینگ (Reading - ٥ یونت)",
        titleKu: "ڕێدینگ (Reading - ٥ یونت)",
        titleEn: "Reading Comprehension (5 Units)",
        sectionsCount: 5,
        sections: [
          { id: "eng-read-u1", titleBadini: "Unit 1 Reading: Communication & Language", titleKu: "Unit 1 Reading: Communication & Language", titleEn: "Unit 1 Reading", weightMinisterial: "١٠٪ وزاری" },
          { id: "eng-read-u2", titleBadini: "Unit 2 Reading: Education & Society", titleKu: "Unit 2 Reading: Education & Society", titleEn: "Unit 2 Reading", weightMinisterial: "٨٪ وزاری" },
          { id: "eng-read-u3", titleBadini: "Unit 3 Reading: Science & Technology", titleKu: "Unit 3 Reading: Science & Technology", titleEn: "Unit 3 Reading", weightMinisterial: "١٠٪ وزاری" },
          { id: "eng-read-u5", titleBadini: "Unit 5 Reading: Economy & Trade", titleKu: "Unit 5 Reading: Economy & Trade", titleEn: "Unit 5 Reading", weightMinisterial: "١٠٪ وزاری" },
          { id: "eng-read-u6", titleBadini: "Unit 6 Reading: Culture & Heritage", titleKu: "Unit 6 Reading: Culture & Heritage", titleEn: "Unit 6 Reading", weightMinisterial: "١٠٪ وزاری" },
        ]
      },
      {
        id: "eng-grammar",
        chapterNumber: "ڕێزمان (Grammar)",
        titleBadini: "گرامەر (لدیڤ وێنێن مامۆستای)",
        titleKu: "گرامەر (بەپێی وێنەکانی مامۆستا)",
        titleEn: "Grammar (Teacher's Notes Reference)",
        sectionsCount: 6,
        sections: [
          { id: "eng-gram-u1", titleBadini: "Unit 1: Giving instructions, Advice, Suggestions, Comparative/Superlative, Tag Questions, Tenses (Past simple, Past Perfect, Past Cont, Present Perf, Present Cont), Conjunctions, uses of (when)", titleKu: "Unit 1: Giving instructions, Advice, Suggestions, Tenses & Conjunctions", titleEn: "Unit 1 Grammar Mastery", weightMinisterial: "١٥٪ وزاری" },
          { id: "eng-gram-u2", titleBadini: "Unit 2: Prepositions of Time, Negative Questions, Future Continuous, too...to, enough...to", titleKu: "Unit 2: Prepositions of Time, Negative Questions, Future Continuous, too/enough", titleEn: "Unit 2 Grammar", weightMinisterial: "١٠٪ وزاری" },
          { id: "eng-gram-u3", titleBadini: "Unit 3: Active and Passive, Formal - Informal, Certainty, Possibility, Cause and Effect", titleKu: "Unit 3: Active and Passive, Formal/Informal, Certainty, Possibility, Cause/Effect", titleEn: "Unit 3 Grammar", weightMinisterial: "١٢٪ وزاری" },
          { id: "eng-gram-u5", titleBadini: "Unit 5: Ways of Comparing Quantities, Conjunctions, Conditional Forms", titleKu: "Unit 5: Ways of Comparing Quantities, Conjunctions, Conditional Forms", titleEn: "Unit 5 Grammar", weightMinisterial: "١٢٪ وزاری" },
          { id: "eng-gram-u6", titleBadini: "Unit 6: Full and Reduced Relative Clauses (when, where and why), Re/clu with Extra informations, Purpose", titleKu: "Unit 6: Relative Clauses, Re/clu with Extra info, Purpose", titleEn: "Unit 6 Grammar", weightMinisterial: "١٢٪ وزاری" },
          { id: "eng-gram-rev", titleBadini: "مراجەعەیا گرامەرێ و ڕاهێنانێن وزاری یێن گشتی", titleKu: "پێداچوونەوەی گشتی گرامەر و ڕاهێنانە وزارییەکان", titleEn: "General Grammar Review & Past Papers", weightMinisterial: "١٠٪ وزاری" },
        ]
      },
      {
        id: "eng-episodes",
        chapterNumber: "ئێپسود (Episodes)",
        titleBadini: "ئێپسود (٧ ئێپسودێن کامل)",
        titleKu: "ئێپسود (٧ ئێپسودی تەواو)",
        titleEn: "Episodes (7 Complete Episodes)",
        sectionsCount: 7,
        sections: [
          { id: "eng-ep1", titleBadini: "Episode 1: Storyline & Vocabulary", titleKu: "Episode 1: Storyline & Vocabulary", titleEn: "Episode 1", weightMinisterial: "٥٪ وزاری" },
          { id: "eng-ep2", titleBadini: "Episode 2: Key Events & Characters", titleKu: "Episode 2: Key Events & Characters", titleEn: "Episode 2", weightMinisterial: "٥٪ وزاری" },
          { id: "eng-ep3", titleBadini: "Episode 3: Plot Development & Ministerial Questions", titleKu: "Episode 3: Plot & Ministerial Questions", titleEn: "Episode 3", weightMinisterial: "٥٪ وزاری" },
          { id: "eng-ep4", titleBadini: "Episode 4: Mid-story Climax & Vocabulary", titleKu: "Episode 4: Climax & Vocabulary", titleEn: "Episode 4", weightMinisterial: "٥٪ وزاری" },
          { id: "eng-ep5", titleBadini: "Episode 5: Resolution & Theme Analysis", titleKu: "Episode 5: Resolution & Theme Analysis", titleEn: "Episode 5", weightMinisterial: "٥٪ وزاری" },
          { id: "eng-ep6", titleBadini: "Episode 6: Final Events & Review", titleKu: "Episode 6: Final Events & Review", titleEn: "Episode 6", weightMinisterial: "٥٪ وزاری" },
          { id: "eng-ep7", titleBadini: "Episode 7: Comprehensive Summary & Past Papers", titleKu: "Episode 7: Comprehensive Summary", titleEn: "Episode 7", weightMinisterial: "٥٪ وزاری" },
        ]
      },
      {
        id: "eng-activity",
        chapterNumber: "کتابێ ڕاهێنانان",
        titleBadini: "ئەکتێڤی تی بۆک (Unit 1 بۆ 6)",
        titleKu: "ئەکتیڤیتی بووک (Unit 1 بۆ 6)",
        titleEn: "Activity Book (Units 1 to 6)",
        sectionsCount: 6,
        sections: [
          { id: "eng-act-u1", titleBadini: "Activity Book Unit 1: Vocabulary & Grammar Exercises", titleKu: "Activity Book Unit 1 Exercises", titleEn: "Activity Book Unit 1", weightMinisterial: "١٠٪ وزاری" },
          { id: "eng-act-u2", titleBadini: "Activity Book Unit 2: Vocabulary & Grammar Exercises", titleKu: "Activity Book Unit 2 Exercises", titleEn: "Activity Book Unit 2", weightMinisterial: "٨٪ وزاری" },
          { id: "eng-act-u3", titleBadini: "Activity Book Unit 3: Vocabulary & Grammar Exercises", titleKu: "Activity Book Unit 3 Exercises", titleEn: "Activity Book Unit 3", weightMinisterial: "١٠٪ وزاری" },
          { id: "eng-act-u4", titleBadini: "Activity Book Unit 4: Review Exercises & Practice Tests", titleKu: "Activity Book Unit 4 Exercises", titleEn: "Activity Book Unit 4", weightMinisterial: "٨٪ وزاری" },
          { id: "eng-act-u5", titleBadini: "Activity Book Unit 5: Vocabulary & Grammar Exercises", titleKu: "Activity Book Unit 5 Exercises", titleEn: "Activity Book Unit 5", weightMinisterial: "١٠٪ وزاری" },
          { id: "eng-act-u6", titleBadini: "Activity Book Unit 6: Comprehensive Final Practice", titleKu: "Activity Book Unit 6 Exercises", titleEn: "Activity Book Unit 6", weightMinisterial: "١٠٪ وزاری" },
        ]
      },
      {
        id: "eng-sounds",
        chapterNumber: "دەنگ و فۆنەتیک",
        titleBadini: "دەنگ (Sounds & Pronunciation)",
        titleKu: "دەنگ (Sounds & Pronunciation)",
        titleEn: "Sounds & Pronunciation (Phonetics)",
        sectionsCount: 5,
        sections: [
          { id: "eng-snd-u1", titleBadini: "Pronunciation of (-s / -es) Endings (/s/, /z/, /ɪz/) & Word Stress", titleKu: "گوتنی کۆتاییەکانی (-s / -es) و سەنگیی وشە", titleEn: "Unit 1 Sounds: (-s / -es) Endings", weightMinisterial: "٨٪ وزاری" },
          { id: "eng-snd-u2", titleBadini: "Pronunciation of (-ed) Past Endings (/t/, /d/, /ɪd/) & Consonants", titleKu: "گوتنی کۆتاییەکانی ڕابردوو (-ed)", titleEn: "Unit 2 Sounds: (-ed) Endings", weightMinisterial: "٨٪ وزاری" },
          { id: "eng-snd-u3", titleBadini: "Vowel Sounds (Short & Long Vowels) & Diphthongs", titleKu: "دەنگە بزوێنەرەکان و جووتەبزوێنەر", titleEn: "Unit 3 Sounds: Vowels & Diphthongs", weightMinisterial: "٨٪ وزاری" },
          { id: "eng-snd-u5", titleBadini: "Silent Letters & Consonant Clusters in Sunrise 12", titleKu: "پیتە بێدەنگەکان و کۆمەڵە نەبزوێنەرەکان", titleEn: "Unit 5 Sounds: Silent Letters & Clusters", weightMinisterial: "٨٪ وزاری" },
          { id: "eng-snd-u6", titleBadini: "Sentence Stress, Intonation & Ministerial Phonetics Past Papers", titleKu: "سەنگیی ڕستە، ئاوازی گوتن و پرسیاری وزاری", titleEn: "Unit 6 Sounds: Intonation & Review", weightMinisterial: "٨٪ وزاری" },
        ]
      }
    ]
  },
  {
    id: "kurdish",
    nameBadini: "زمان و ئەدەبێ کوردی",
    nameKu: "زمان و ئەدەبی کوردی",
    nameEn: "Kurdish Language & Literature",
    color: "#F687B3",
    icon: "☀️",
    totalSections: 20,
    dailyRecommendationBadini: "ڕۆژانە ١ بابەتێ ڕێزمان یان شیکارکرنا دەقەکێ ئەدەبی.",
    dailyRecommendationKu: "ڕۆژانە ١ بابەتی ڕێزمان یان شیکارکردنی دەقێکی ئەدەبی.",
    dailyRecommendationEn: "Daily 1 grammar lesson or literary text analysis.",
    monthlyTargetBadini: "تەمامکردنا ڕێزمانی و نیڤا شاعیر و دەقێن ئەدەبی.",
    monthlyTargetKu: "تەواوکردنی ڕێزمان و نیوەی شاعیر و دەقە ئەدەبییەکان.",
    monthlyTargetEn: "Complete all grammar topics and half of literature poets.",
    ministerialStrategyBadini: "پرسیارێن وزاری ل سەر شاعیران و یاسایێن ڕێزمانی زۆرترین نمرەنە.",
    ministerialStrategyKu: "پرسیارەکانی وزاری لەسەر شاعیران و یاساکانی ڕێزمان زۆرترین نمرەن.",
    ministerialStrategyEn: "Grammar rules and poet biographies carry the highest marks in ministerial exams.",
    chapters: [
      {
        id: "kurd-grammar",
        chapterNumber: "بەشی یەکەم: ڕێزمان",
        titleBadini: "ڕێزمانی کوردی (Grammar)",
        titleKu: "ڕێزمانی کوردی (Grammar)",
        titleEn: "Kurdish Grammar",
        sectionsCount: 8,
        sections: [
          { id: "kurd-gram-1", titleBadini: "ئامرازێن پەیوەندی و لێکدەر (ئامرازەکان)", titleKu: "ئامرازەکانی پەیوەندی و لێکدەر", titleEn: "Conjunctions & Linking Words", weightMinisterial: "١٠٪ وزاری" },
          { id: "kurd-gram-2", titleBadini: "کاری تێپەڕ و تێنەپەڕ و بکەر نادیار", titleKu: "کاری تێپەڕ، تێنەپەڕ و بکەر نادیار", titleEn: "Transitive, Intransitive & Passive Verbs", weightMinisterial: "١٢٪ وزاری" },
          { id: "kurd-gram-3a", titleBadini: "ئەڕکێن جهناڤێن کەسی ئێن لکاو: أ- وەکی بکەر", titleKu: "ئەرکەکانی جێناوی کەسی لکاو: أ- وەک بکەر", titleEn: "Attached Pronouns: a- As Subject", weightMinisterial: "٤٪ وزاری" },
          { id: "kurd-gram-3b", titleBadini: "ئەڕکێن جهناڤێن کەسی ئێن لکاو: ب- وەکی بەرکار", titleKu: "ئەرکەکانی جێناوی کەسی لکاو: ب- وەک بەرکار", titleEn: "Attached Pronouns: b- As Object", weightMinisterial: "٤٪ وزاری" },
          { id: "kurd-gram-3c", titleBadini: "ئەڕکێن جهناڤێن کەسی ئێن لکاو: ت- وەکی تەماکەرێ بەریاری", titleKu: "ئەرکەکانی جێناوی کەسی لکاو: ت- وەک تەواوکەر", titleEn: "Attached Pronouns: c- As Prepositional Complement", weightMinisterial: "٤٪ وزاری" },
          { id: "kurd-gram-4", titleBadini: "دەمێن کاری (ڕابردوو، ڕانەبووری، داهاتوو)", titleKu: "کاتەکانی کار (ڕابردوو، ئێستا، داهاتوو)", titleEn: "Verb Tenses (Past, Present, Future)", weightMinisterial: "١٢٪ وزاری" },
          { id: "kurd-gram-5", titleBadini: "ئاوەڵناو و ئاوەڵکار و جۆرێن وان", titleKu: "ئاوەڵناو، ئاوەڵکار و جۆرەکانیان", titleEn: "Adjectives & Adverbs", weightMinisterial: "٨٪ وزاری" },
          { id: "kurd-gram-6", titleBadini: "ڕستەیا سادە و لێکدراو و ئاڵۆز", titleKu: "ڕستەی سادە، لێکدراو و ئاڵۆز", titleEn: "Simple, Compound & Complex Sentences", weightMinisterial: "١٠٪ وزاری" },
          { id: "kurd-gram-7", titleBadini: "پاشگر و پێشگر و دروستکرنا وشان", titleKu: "پاشگر، پێشگر و وشەسازی", titleEn: "Prefixes, Suffixes & Word Formation", weightMinisterial: "٨٪ وزاری" },
          { id: "kurd-gram-8", titleBadini: "پێداچوونەڤەیا گشتی و پرسیارێن وزاری یێن ڕێزمانێ", titleKu: "پێداچوونەوەی گشتی و پرسیارە وزارییەکانی ڕێزمان", titleEn: "Grammar Review & Ministerial Past Papers", weightMinisterial: "١٠٪ وزاری" },
        ]
      },
      {
        id: "kurd-lit",
        chapterNumber: "بەشی دووەم: ئەدەب",
        titleBadini: "ئەدەب و شاعیران (Literature & Poets)",
        titleKu: "ئەدەب و شاعیران (Literature & Poets)",
        titleEn: "Literature & Poets",
        sectionsCount: 7,
        sections: [
          { id: "kurd-lit-1", titleBadini: "قۆناغێن ئەدەبێ کوردی و تایبەتمەندی", titleKu: "قۆناغەکانی ئەدەبی کوردی و تایبەتمەندییەکان", titleEn: "Stages of Kurdish Literature", weightMinisterial: "١٠٪ وزاری" },
          { id: "kurd-lit-2", titleBadini: "شعرایێ کلاسیک: نالی و مەحوی (ژیان و هۆنراوە)", titleKu: "شاعیرانی کلاسیک: نالی و مەحوی (ژیان و هۆنراوە)", titleEn: "Classical Poets: Nali & Mahwi", weightMinisterial: "١٥٪ وزاری" },
          { id: "kurd-lit-3", titleBadini: "شعرایێ نیشتمانی: حاجی قادری کۆیی و ئەحمەد موختار جاف", titleKu: "شاعیرانی نیشتمانی: حاجی قادری کۆیی و ئەحمەد موختار جاف", titleEn: "Patriotic Poets: Haji Qadir & Ahmad Mukhtar", weightMinisterial: "١٢٪ وزاری" },
          { id: "kurd-lit-4", titleBadini: "نوێگەری د شعرێ دا: گۆران و پیرەمێرد", titleKu: "نوێگەری لە شیعردا: گۆران و پیرەمێرد", titleEn: "Modern Poetry: Goran & Piremerd", weightMinisterial: "١٥٪ وزاری" },
          { id: "kurd-lit-5", titleBadini: "پەخشان و چیرۆک د ئەدەبێ کوردی دا", titleKu: "پەخشان و چیرۆک لە ئەدەبی کوردیدا", titleEn: "Prose and Fiction in Kurdish Literature", weightMinisterial: "٨٪ وزاری" },
          { id: "kurd-lit-6", titleBadini: "شیکارکرنا دەقێن شعری یێن بڕیاردراو", titleKu: "شیکارکردنی دەقە شیعرییە بڕیاردراوەکان", titleEn: "Analysis of Prescribed Poetic Texts", weightMinisterial: "١٠٪ وزاری" },
          { id: "kurd-lit-7", titleBadini: "پرسیارێن وزاری ل سەر شاعیر و دەقێن ئەدەبی", titleKu: "پرسیارە وزارییەکان لەسەر شاعیر و دەقە ئەدەبییەکان", titleEn: "Literature Ministerial Past Papers", weightMinisterial: "١٠٪ وزاری" },
        ]
      },
      {
        id: "kurd-rhetoric",
        chapterNumber: "بەشی سێیەم: ڕەوانبێژی",
        titleBadini: "ڕەوانبێژی و داڕشتن (Rhetoric & Composition)",
        titleKu: "ڕەوانبێژی و داڕشتن (Rhetoric & Composition)",
        titleEn: "Rhetoric & Composition",
        sectionsCount: 5,
        sections: [
          { id: "kurd-rhet-1", titleBadini: "زانستێ ڕەوانبێژی: خواستن (ئەستعارا) و جۆرێن وێ", titleKu: "زانستی ڕەوانبێژی: خواستن و جۆرەکانی", titleEn: "Rhetoric: Metaphor & Its Types", weightMinisterial: "١٠٪ وزاری" },
          { id: "kurd-rhet-2", titleBadini: "لێکچواندن (تشبیە) و کۆڵەکێن وێ", titleKu: "لێکچواندن و کۆڵەکەکانی لە شیعردا", titleEn: "Simile & Its Pillars in Poetry", weightMinisterial: "١٠٪ وزاری" },
          { id: "kurd-rhet-3", titleBadini: "کنایە و جوانکاریێن لەفزی و مەعنەوی", titleKu: "کنایە و جوانکارییە لەفزی و مەعنەوییەکان", titleEn: "Metonymy & Aesthetic Devices", weightMinisterial: "٨٪ وزاری" },
          { id: "kurd-rhet-4", titleBadini: "یاسایێن نڤیسنا داڕشتنێ (پێشەکی، ناوەڕۆک، کۆتایی)", titleKu: "یاساکانی نووسینی داڕشتن (پێشەکی، ناوەڕۆک، کۆتایی)", titleEn: "Essay Writing Rules & Structure", weightMinisterial: "٨٪ وزاری" },
          { id: "kurd-rhet-5", titleBadini: "راهێنان و پرسیارێن وزاری یێن ڕەوانبێژیێ", titleKu: "ڕاهێنان و پرسیارە وزارییەکانی ڕەوانبێژی", titleEn: "Rhetoric Ministerial Questions", weightMinisterial: "٨٪ وزاری" },
        ]
      }
    ]
  },
  {
    id: "arabic",
    nameBadini: "زمانێ عەرەبی",
    nameKu: "زمانی عەرەبی",
    nameEn: "Arabic Language",
    color: "#FBD38D",
    icon: "📖",
    totalSections: 18,
    dailyRecommendationBadini: "ڕۆژانە ١ بابەتێ قواعد یان شیکارکرنا دەقەکێ ئەدەبیێ عەرەبی.",
    dailyRecommendationKu: "ڕۆژانە ١ بابەتی قواعد یان شیکارکردنی دەقێکی ئەدەبی عەرەبی.",
    dailyRecommendationEn: "Daily 1 grammar (Qawa'id) topic or literary text study.",
    monthlyTargetBadini: "تەمامکردنا قواعدێن النفي، الاستثناء و التقديم و التأخير دگەل ئەدەبی.",
    monthlyTargetKu: "تەواوکردنی قواعدی النفي، الاستثناء و التقديم والتأخير لەگەڵ ئەدەب.",
    monthlyTargetEn: "Complete Negation, Exception, and Word Order grammar with literature.",
    ministerialStrategyBadini: "بابەتێن النفي و الاستثناء و التقديم و التأخير زۆرترین نمرە د پرسیارێن وزاری دا هەنە.",
    ministerialStrategyKu: "بابەتەکانی النفي، الاستثناء و التقديم والتأخير زۆرترین نمرەیان لە وزاری هەیە.",
    ministerialStrategyEn: "Negation, Exception, and Word Order carry the highest marks in ministerial exams.",
    chapters: [
      {
        id: "arab-grammar",
        chapterNumber: "الفصل الأول: القواعد",
        titleBadini: "قواعدێ عەرەبی (Arabic Grammar)",
        titleKu: "قواعدی عەرەبی (Arabic Grammar)",
        titleEn: "Arabic Grammar (Qawa'id)",
        sectionsCount: 7,
        sections: [
          { id: "arab-gram-1", titleBadini: "أدوات النفي (ليس، ما، لا، لم، لما، لن، غير، هتد)", titleKu: "ئامرازەکانی نەفی (النفي وأدواته)", titleEn: "Style of Negation (An-Nafi)", weightMinisterial: "١٥٪ وزاری" },
          { id: "arab-gram-2", titleBadini: "أسلوب الاستثناء (بـ إلا، غير، سوى، خلا، عدا)", titleKu: "ئەسلووبی ئیستسنا (الاستثناء وأحكامه)", titleEn: "Style of Exception (Al-Istithna)", weightMinisterial: "١٥٪ وزاری" },
          { id: "arab-gram-3", titleBadini: "التقديم والتأخير (تقديم الخبر على المبتدأ والمفعول به)", titleKu: "پێشخستن و دواخستن (التقديم والتأخير)", titleEn: "Word Order (Advance and Delay)", weightMinisterial: "١٤٪ وزاری" },
          { id: "arab-gram-4", titleBadini: "أسلوب التوكيد (التوكيد اللفظي والمعنوي وبـ قد، إنّ، هتد)", titleKu: "ئەسلووبی تەوکید (التوكيد اللفظي والمعنوي)", titleEn: "Style of Emphasis (At-Tawkid)", weightMinisterial: "١٠٪ وزاری" },
          { id: "arab-gram-5", titleBadini: "أسلوب المدح والذم (نعم، بئس، حبذا، لا حبذا)", titleKu: "ئەسلووبی مەدح و زەم (المدح والذم)", titleEn: "Praise & Blame Expressions", weightMinisterial: "٨٪ وزاری" },
          { id: "arab-gram-6", titleBadini: "أسلوب التعجب (ما أفعله وأفعل به والتعجب السماعي)", titleKu: "ئەسلووبی تەعەجب (التعجب القياسي والسماعي)", titleEn: "Exclamation Style (At-Ta'ajjub)", weightMinisterial: "٨٪ وزاری" },
          { id: "arab-gram-7", titleBadini: "حل أسئلة البكالوريا السابقة لقواعد اللغة العربية", titleKu: "شیکاری پرسیارە وزارییەکانی پێشووی قواعد", titleEn: "Ministerial Past Papers for Grammar", weightMinisterial: "١٠٪ وزاری" },
        ]
      },
      {
        id: "arab-lit",
        chapterNumber: "الفصل الثاني: الأدب والنصوص",
        titleBadini: "ئەدەب و دەقێن عەرەبی (Literature & Texts)",
        titleKu: "ئەدەب و دەقە عەرەبییەکان (Literature & Texts)",
        titleEn: "Arabic Literature & Texts",
        sectionsCount: 6,
        sections: [
          { id: "arab-lit-1", titleBadini: "الأدب في العصر الحديث وخصائصه العامة", titleKu: "ئەدەب لە سەردەمی نوێ و تایبەتمەندییەکانی", titleEn: "Modern Arabic Literature & Characteristics", weightMinisterial: "١٠٪ وزاری" },
          { id: "arab-lit-2", titleBadini: "مدرسة الإحياء والمحافظين وشعراؤها البارزون", titleKu: "قوتابخانەی ئیحیا و شاعیرە دیارەکانی", titleEn: "The Revivalist School of Poetry", weightMinisterial: "١٢٪ وزاری" },
          { id: "arab-lit-3", titleBadini: "مدرسة الرومانسية والمهجر (جبران خليل جبران وإيليا أبو ماضي)", titleKu: "قوتابخانەی ڕۆمانسی و مەهجەر", titleEn: "Romantic & Mahjar Schools of Poetry", weightMinisterial: "١٢٪ وزاری" },
          { id: "arab-lit-4", titleBadini: "الشعر الحر والواقعية (بدر شاكر السياب ونزار قباني)", titleKu: "شیعری ئازاد و واقیعی (سەییاب و قەببانی)", titleEn: "Free Verse & Realism Poetry", weightMinisterial: "١٢٪ وزاری" },
          { id: "arab-lit-5", titleBadini: "النثر العربي الحديث: القصة القصيرة والمقالة", titleKu: "پەخشانی نوێی عەرەبی: چیرۆکی کورت و وتار", titleEn: "Modern Arabic Prose: Short Stories & Essays", weightMinisterial: "٨٪ وزاری" },
          { id: "arab-lit-6", titleBadini: "أسئلة البكالوريا الشاملة في الأدب والنصوص", titleKu: "پرسیارە وزارییە گشتییەکانی ئەدەب و دەقەکان", titleEn: "Ministerial Past Papers for Literature", weightMinisterial: "١٠٪ وزاری" },
        ]
      },
      {
        id: "arab-reading",
        chapterNumber: "الفصل الثالث: المطالعة والإنشاء",
        titleBadini: "خوێندنەڤە و داڕشتن (Reading & Composition)",
        titleKu: "خوێندنەوە و داڕشتن (Reading & Composition)",
        titleEn: "Reading Comprehension & Composition",
        sectionsCount: 5,
        sections: [
          { id: "arab-read-1", titleBadini: "نصوص المطالعة المقررة في المنهج وتحليلها", titleKu: "دەقە بڕیاردراوەکانی خوێندنەوە و شیکارییان", titleEn: "Prescribed Reading Texts Analysis", weightMinisterial: "١٠٪ وزاری" },
          { id: "arab-read-2", titleBadini: "معاني المفردات والمترادفات والأضداد الوزارية المهمة", titleKu: "مانای وشەکان، هاوماناکان و دژەکان لە وزاری", titleEn: "Ministerial Vocabulary, Synonyms & Antonyms", weightMinisterial: "١٠٪ وزاری" },
          { id: "arab-read-3", titleBadini: "أساسيات وطرق كتابة الإنشاء العربي الممتاز", titleKu: "بنەما و ڕێگاکانی نووسینی داڕشتنی عەرەبی نایاب", titleEn: "Principles of Excellent Arabic Essay Writing", weightMinisterial: "٨٪ وزاری" },
          { id: "arab-read-4", titleBadini: "الموضوعات الإنشائية الأكثر تكراراً في الامتحانات الوزارية", titleKu: "بابەتە داڕشتنە زۆر دووبارەبووەکانی وزاری", titleEn: "Most Frequent Ministerial Essay Topics", weightMinisterial: "٨٪ وزاری" },
          { id: "arab-read-5", titleBadini: "تمارين وتدريبات شاملة للمطالعة والإنشاء", titleKu: "ڕاهێنان و ڕاهێنانە گشتییەکان بۆ خوێندنەوە و داڕشتن", titleEn: "Comprehensive Reading & Essay Exercises", weightMinisterial: "٨٪ وزاری" },
        ]
      }
    ]
  },
  {
    id: "islamic",
    nameBadini: "پەروەردەیا ئیسلامی",
    nameKu: "پەروەردەی ئیسلامی",
    nameEn: "Islamic Education",
    color: "#81E6D9",
    icon: "🕌",
    totalSections: 16,
    dailyRecommendationBadini: "ڕۆژانە ١ سورەتێ قورئانێ دگەل تەفسیرێ یان ١ فەرموودە بخوێنە.",
    dailyRecommendationKu: "ڕۆژانە ١ سورەتی قورئان لەگەڵ تەفسیر یان ١ فەرموودە بخوێنە.",
    dailyRecommendationEn: "Daily study 1 Quranic Surah interpretation or 1 Hadith.",
    monthlyTargetBadini: "تەمامکردنا سورەتێن بڕیاردراو و فەرموودە و سیرەیا پێغەمبەری (د.خ).",
    monthlyTargetKu: "تەواوکردنی سورەتە بڕیاردراوەکان و فەرموودە و سیرەی پێغەمبەر (د.خ).",
    monthlyTargetEn: "Complete prescribed Quranic Surahs, Hadith, and Seerah.",
    ministerialStrategyBadini: "پرسیارێن تەفسیرێ و فەرموودەیان و سیرە زۆرترین و ئاسانترین نمرەنە بۆ مسۆگەرکردنا ١٠٠.",
    ministerialStrategyKu: "پرسیارەکانی تەفسیر، فەرموودە و سیرە ئاسانترین نمرەن بۆ مسۆگەرکردنی ١٠٠.",
    ministerialStrategyEn: "Quranic exegesis and Hadith questions are the easiest way to secure a full 100 mark.",
    chapters: [
      {
        id: "rel-quran",
        chapterNumber: "بەشی یەکەم: قورئانی پیرۆز",
        titleBadini: "قورئان و تەفسیر (Holy Quran & Exegesis)",
        titleKu: "قورئان و تەفسیر (Holy Quran & Exegesis)",
        titleEn: "Holy Quran & Exegesis",
        sectionsCount: 5,
        sections: [
          { id: "rel-qur-1", titleBadini: "ئەحکامێن تەجویدێ و جوانخوێندنەڤەیا قورئانێ", titleKu: "ئەحکامەکانی تەجوید و جوانخوێندنەوەی قورئان", titleEn: "Tajweed Rules & Quran Recitation", weightMinisterial: "١٠٪ وزاری" },
          { id: "rel-qur-2", titleBadini: "تەفسیرا سورەتا (الحجرات) و وانەیێن ئەخلاقی و کۆمەڵایەتی", titleKu: "تەفسیری سورەتی (الحجرات) و وانە ئەخلاقییەکان", titleEn: "Surah Al-Hujurat Exegesis & Lessons", weightMinisterial: "١٥٪ وزاری" },
          { id: "rel-qur-3", titleBadini: "تەفسیرا سورەتا (الإسراء) و بنەما و ئامۆژگاریێن هەمەجۆر", titleKu: "تەفسیری سورەتی (الإسراء) و ئامۆژگارییەکان", titleEn: "Surah Al-Isra Exegesis & Guidance", weightMinisterial: "١٥٪ وزاری" },
          { id: "rel-qur-4", titleBadini: "تەفسیرا سورەتا (لقمان) و ئامۆژگاریێن باوکەکی بۆ کوڕێ خۆ", titleKu: "تەفسیری سورەتی (لقمان) و وانەکانی", titleEn: "Surah Luqman Exegesis & Wisdom", weightMinisterial: "١٠٪ وزاری" },
          { id: "rel-qur-5", titleBadini: "پرسیارێن وزاری ل سەر سورەت و تەفسیر و تەجویدێ", titleKu: "پرسیارە وزارییەکان لەسەر سورەت و تەفسیر و تەجوید", titleEn: "Ministerial Past Papers for Quran & Exegesis", weightMinisterial: "١٠٪ وزاری" },
        ]
      },
      {
        id: "rel-hadith",
        chapterNumber: "بەشی دووەم: فەرموودە و سیرە",
        titleBadini: "فەرموودە و سیرە (Hadith & Seerah)",
        titleKu: "فەرموودە و سیرە (Hadith & Seerah)",
        titleEn: "Hadith & Prophetic Biography",
        sectionsCount: 5,
        sections: [
          { id: "rel-had-1", titleBadini: "فەرموودەیا ڕەوشت و ڕاستگۆیی و ئەمانەت", titleKu: "فەرموودەی ڕەوشت، ڕاستگۆیی و ئەمانەت", titleEn: "Hadith on Truthfulness and Trustworthiness", weightMinisterial: "١٢٪ وزاری" },
          { id: "rel-had-2", titleBadini: "فەرموودەیا برایەتی و مافێ موسڵمانان ل سەر ئێکدوو", titleKu: "فەرموودەی برایەتی و مافی موسڵمانان", titleEn: "Hadith on Brotherhood and Muslim Rights", weightMinisterial: "١٢٪ وزاری" },
          { id: "rel-had-3", titleBadini: "فەرموودەیا کارکردن و بەدەستئێنانا حەلال و زانستێ", titleKu: "فەرموودەی کارکردن، بژێوی حەڵاڵ و زانست", titleEn: "Hadith on Lawful Earning and Knowledge", weightMinisterial: "١٠٪ وزاری" },
          { id: "rel-had-4", titleBadini: "سیرەیا پێغەمبەری (د.خ): قۆناغێن دەعوەتێ و فەتحا مەکتێ", titleKu: "سیرەی پێغەمبەر (د.خ): قۆناغەکان و فەتحی مەککە", titleEn: "Prophetic Biography: Mission & Conquest of Makkah", weightMinisterial: "١٢٪ وزاری" },
          { id: "rel-had-5", titleBadini: "پرسیارێن وزاری ل سەر فەرموودە و ژیانا پێغەمبەری (د.خ)", titleKu: "پرسیارە وزارییەکان لەسەر فەرموودە و سیرە", titleEn: "Ministerial Past Papers for Hadith & Seerah", weightMinisterial: "١٠٪ وزاری" },
        ]
      },
      {
        id: "rel-fiqh",
        chapterNumber: "بەشی سێیەم: بیروباوەڕ و فیقهـ",
        titleBadini: "بیروباوەڕ و ئەخلاق و فیقهـ (Beliefs & Fiqh)",
        titleKu: "بیروباوەڕ، ئەخلاق و فیقهـ (Beliefs & Fiqh)",
        titleEn: "Islamic Beliefs, Ethics & Fiqh",
        sectionsCount: 6,
        sections: [
          { id: "rel-fiq-1", titleBadini: "بیروباوەڕا ئیسلامی: باوەڕی ب خوا و ڕۆژا دوماهییێ", titleKu: "بیروباوەڕی ئیسلامی: باوەڕ بە خوا و ڕۆژی دوایی", titleEn: "Islamic Creed: Belief in God and Hereafter", weightMinisterial: "١٠٪ وزاری" },
          { id: "rel-fiq-2", titleBadini: "ئەحکامێن فیقهی: ماف و ئەرک د خێزانێ دا و پێگەهێ ئافرەتێ", titleKu: "ئەحکامە فیقهییەکان: خێزان و پێگەی ئافرەت", titleEn: "Fiqh: Family Rights & Women's Status", weightMinisterial: "١٠٪ وزاری" },
          { id: "rel-fiq-3", titleBadini: "ئەخلاقێ جوان: لێبوردن، دان بەخۆداگرتن، و ڕێزگرتن", titleKu: "ئەخلاقی جوان: لێبوردەیی، دان بەخۆداگرتن و ڕێز", titleEn: "Islamic Ethics: Tolerance, Patience & Respect", weightMinisterial: "٨٪ وزاری" },
          { id: "rel-fiq-4", titleBadini: "سیستەمێ ئابووری د ئیسلامێ دا و حەرامکرنا ڕیبا و قۆمارێ", titleKu: "سیستەمی ئابووری لە ئیسلام و حەرامکردنی ڕیبا", titleEn: "Economic System: Prohibition of Usury & Gambling", weightMinisterial: "٨٪ وزاری" },
          { id: "rel-fiq-5", titleBadini: "پاراستنا ژینگەهێ و تەندروستی د تێڕوانینا ئیسلامێ دا", titleKu: "پاراستنی ژینگە و تەندروستی لە ڕوانگەی ئیسلامەوە", titleEn: "Environmental Preservation & Health in Islam", weightMinisterial: "٨٪ وزاری" },
          { id: "rel-fiq-6", titleBadini: "پرسیارێن وزاری یێن گشتی بۆ بەشێ بیروباوەڕ و فیقهی", titleKu: "پرسیارە وزارییە گشتییەکانی بیروباوەڕ و فیقهـ", titleEn: "Ministerial Past Papers for Beliefs & Fiqh", weightMinisterial: "١٠٪ وزاری" },
        ]
      }
    ]
  }
];

