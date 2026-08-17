import { Language } from "../types";

export function getLocalizedText(
  item: any,
  fieldPrefix: string,
  lang: Language
): string {
  if (!item) return "";

  if (lang === "badini") {
    const badiniVal = item[`${fieldPrefix}Badini`];
    if (badiniVal) return badiniVal;
  }

  if (lang === "en") {
    const enVal = item[`${fieldPrefix}En`];
    if (enVal) return enVal;
  }

  // Default to Sorani ("ku")
  return item[`${fieldPrefix}Ku`] || item[`${fieldPrefix}En`] || "";
}

export function getLocalizedArray(
  item: any,
  fieldPrefix: string,
  lang: Language
): string[] {
  if (!item) return [];

  if (lang === "badini") {
    const badiniArr = item[`${fieldPrefix}Badini`];
    if (badiniArr && badiniArr.length > 0) return badiniArr;
  }

  if (lang === "en") {
    const enArr = item[`${fieldPrefix}En`];
    if (enArr && enArr.length > 0) return enArr;
  }

  return item[`${fieldPrefix}Ku`] || item[`${fieldPrefix}En`] || [];
}

// Global UI Translations dictionary
export const uiTranslations = {
  // Navigation & General
  brandSub: {
    ku: "پۆلی ۱۲ - وزاری",
    badini: "پۆلا ۱۲ - وزاری",
    en: "Grade 12 Prep"
  },
  aiTutorBtn: {
    ku: "مامۆستای ژیر AI",
    badini: "مامۆستایێ ژیر AI",
    en: "AI Tutor"
  },
  searchPlaceholder: {
    ku: "گەڕان بۆ پرسیار، بابەت، بیرکاری، فیزیا...",
    badini: "گەڕیان بۆ پرسیاران، بابەتان، بیرکاری، فیزیا...",
    en: "Search for questions, topics..."
  },
  notificationsTitle: {
    ku: "ئاگادارییەکان",
    badini: "ئاگاداری",
    en: "Notifications"
  },
  markRead: {
    ku: "نیشانەی خوێنراوە",
    badini: "نیشانا خواندنێ",
    en: "Mark read"
  },
  loginOrSwitch: {
    ku: "چوونەژوورەوە / خۆتۆمارکردن",
    badini: "چوونا ژوورەڤە / تۆمارکرن",
    en: "Login / Switch Account"
  },
  
  // Theme & Language
  darkMode: {
    ku: "دۆخی تاریک",
    badini: "بارێ تاریک",
    en: "Dark Mode"
  },
  lightMode: {
    ku: "دۆخی ڕووناك",
    badini: "بارێ ڕووناك",
    en: "Light Mode"
  },
  langName: {
    ku: "سۆرانی",
    badini: "بادینی",
    en: "English"
  },

  // Sidebar Tabs
  navHome: { ku: "سەرەتا", badini: "سەرەتا", en: "Home" },
  navSubjects: { ku: "بابەتەکان", badini: "بابەتێن پۆلا ۱۲", en: "Subjects" },
  navExams: { ku: "تاقیکردنەوەکان", badini: "تاقیکرنێن وزاری", en: "Exams" },
  navChallenges: { ku: "چالنجەکان", badini: "ئاڵنگاریێن ڕۆژانە", en: "Challenges" },
  navLeaderboard: { ku: "ڕێزبەند", badini: "ڕیزبەندا گشتی", en: "Leaderboard" },
  navStudyPlan: { ku: "پلانی خوێندن", badini: "پلانا خویندنێ", en: "Study Plan" },
  navNotes: { ku: "تێبینییەکان", badini: "تێبینی و یاسا", en: "Notes" },
  navBookmarks: { ku: "پرسیارە پارێزراوەکان", badini: "پرسیارێن پاراستی", en: "Bookmarks" },
  navStatistics: { ku: "ئامارەکان", badini: "ئامارێن خویندنێ", en: "Statistics" },
  navCommunity: { ku: "کۆمەڵگە", badini: "کۆمەڵگەها قوتابییان", en: "Community" },
  navShop: { ku: "فرۆشگا", badini: "فرۆشگەها خەڵاتان", en: "Shop" },

  // Daily Streak
  dailyStreak: { ku: "بەردەوامی ڕۆژانە", badini: "بەردەوامیا ڕۆژانە", en: "Daily Streak" },
  daysUnit: { ku: "ڕۆژ", badini: "ڕۆژ", en: "days" },

  // Welcome Banner
  welcomeTitle: (name: string, lang: Language) => {
    if (lang === "badini") return `بخێر هاتییەڤە، ${name}! 👋`;
    if (lang === "ku") return `بەخێر بێیتەوە، ${name}! 👋`;
    return `Welcome back, ${name}! 👋`;
  },
  welcomeSub: {
    ku: "بنووسە، ڕاهێنان بکە، بەشداری چالنج بکه، ببە بە یەکەمی وزاری!",
    badini: "بخوێنە، ڕاهێنانێ بکە، پشکداریا ئاڵنگارییان بکە، ببە ئێکەمێ وزاری!",
    en: "Study. Practice. Challenge. Be the top student!"
  },
  startQuestionsBtn: {
    ku: "دەستپێکردنی پرسیارەکان",
    badini: "دەستپێکرنا پرسیاران",
    en: "Start Questions"
  },
  dailyChallengeBtn: {
    ku: "چالنجی ڕۆژانە",
    badini: "ئاڵنگاریا ڕۆژانە",
    en: "Daily Challenge"
  },

  // Subjects Section
  subjectsHeader: {
    ku: "بابەتەکانی پۆلی ۱۲",
    badini: "بابەتێن پۆلا ۱۲ یێن وزاری",
    en: "Grade 12 Kurdistan Subjects"
  },
  subjectsTitle: {
    ku: "بابەتەکانی پۆلی ۱۲",
    badini: "بابەتێن پۆلا ۱۲ یێن وزاری",
    en: "Grade 12 Kurdistan Subjects"
  },
  studyPlanTitle: {
    ku: "پلانی هەفتانەی خوێندنی وزاری",
    badini: "پلانا هەفتانەیا خویندنا وزاری",
    en: "Grade 12 Ministerial Study Schedule"
  },
  dailyChallenge: {
    ku: "چالنجی ڕۆژانە",
    badini: "ئاڵنگاریا ڕۆژانە",
    en: "Daily Challenge"
  },
  subjects: {
    ku: "بابەتەکان",
    badini: "بابەتێن پۆلا ۱۲",
    en: "Subjects"
  },
  questionsCountLabel: {
    ku: "پرسیار",
    badini: "پرسیار",
    en: "Questions"
  },
  challengesTitle: {
    ku: "چالنجە ڕاسپێردراوەکان",
    badini: "ئاڵنگاریێن ڕۆژانە",
    en: "Active Challenges"
  },
  progressTitle: {
    ku: "پێشکەوتنی گشتی",
    badini: "پێشکەفتنا گشتی",
    en: "Overall Progress"
  },
  recentActivity: {
    ku: "چالاکییەکانی ئەم دواییە",
    badini: "چالاکیێن ئەڤرۆ",
    en: "Recent Activity"
  },
  leaderboardTitle: {
    ku: "ڕێزبەندیی گشتیی پۆلی ۱۲",
    badini: "ڕیزبەندا گشتیا پۆلا ۱۲",
    en: "Grade 12 Leaderboard"
  },
  achievementsTitle: {
    ku: "نیشانە و دەستکەوتەکان",
    badini: "نیشانە و دەستکەفتن",
    en: "Achievements & Badges"
  },
  aiTutorTitle: {
    ku: "مامۆستای ژیری پۆلی ۱۲",
    badini: "مامۆستایێ ژیری یێ پۆلا ۱۲",
    en: "AI Grade 12 Tutor"
  },
  examsTitle: {
    ku: "تاقیکردنەوەکانی وزاری پۆلی ۱۲",
    badini: "تاقیکرنێن وزاری یێن پۆلا ۱۲",
    en: "Grade 12 Ministerial Exams"
  },
  notesTitle: {
    ku: "تێبینی و پرسیارە پاشەکەوتکراوەکان",
    badini: "تێبینی و پرسیارێن پاراستی",
    en: "Notes & Bookmarked Questions"
  },
  statsTitle: {
    ku: "ئامار و شیکارییەکانی خوێندن",
    badini: "ئامار و شیکاریا خوێندنێ",
    en: "Performance Analytics"
  },
  communityTitle: {
    ku: "کۆمەڵگەی قوتابییانی پۆلی ۱۲",
    badini: "جڤاکێ قوتابییێن پۆلا ۱۲",
    en: "Grade 12 Student Forum & Q&A"
  },
  login: {
    ku: "چوونەژوورەوە",
    badini: "چوونا ژوورەڤە",
    en: "Login"
  },
  register: {
    ku: "تۆمارکردن",
    badini: "تۆمارکرن",
    en: "Register"
  },
  viewAll: {
    ku: "بینینی هەموویان",
    badini: "دیترنا هەمیان",
    en: "View All"
  },
  questionsAvailable: {
    ku: "پرسیاری وزاری ئامادەکراو",
    badini: "پرسیارێن وزاری یێن ئامادەکری",
    en: "Ministerial questions available"
  },

  // Common Actions
  startQuiz: { ku: "دەستپێکردن", badini: "دەستپێکرن", en: "Start Quiz" },
  practiceChapter: { ku: "تمرین کردنی ئەم بەشە", badini: "ڕاهێنان لسەر ڤی بەشی", en: "Practice Chapter" },
  startGeneralQuiz: { ku: "دەستپێکردنی تاقیکردنەوەی گشتی", badini: "دەستپێکرنا تاقیکرنا گشتی", en: "Start General Quiz" },
  currentProgress: { ku: "پێشکەوتنی هەنووکەیی", badini: "پێشکەفتنا ئەڤرۆ", en: "Current Progress" },
  questionsUnit: { ku: "پرسیار", badini: "پرسیار", en: "Questions" },
  minutesUnit: { ku: "خولەک", badini: "دەقیقە", en: "mins" },

  // Battle Mode
  battleTitle: { ku: "کێبرکێی ڕاستەوخۆ (Battle 1v1)", badini: "کێبڕکێیا ڕاستەوخۆ (Battle 1v1)", en: "1v1 Live Battle Quiz" },
  battleSub: {
    ku: "ڕکابەری بکە لەگەڵ قوتابییەکی دیکەی پۆلی ۱۲ لەسەر خێرایی و دروستی وەڵامدانی پرسیاری وزاری!",
    badini: "ڕکابەریێ بکە دگەل قوتابییەکێ دی یێ پۆلا ۱۲ لسەر خێرایی و دروستیا بەرسڤدانا پرسیارێن وزاری!",
    en: "Challenge another Grade 12 student in real-time speed & accuracy quiz battle!"
  },
  findMatchBtn: { ku: "گەڕان بەدوای ڕکابەر", badini: "گەڕیان بۆ ڕکابەری", en: "Find Match" },
  matchFound: { ku: "ڕکابەر دۆزرایەوە!", badini: "ڕکابەر هاتە دۆزین!", en: "Match Found!" },

  // Shop
  shopTitle: { ku: "فرۆشگای خەڵاتەکان", badini: "فرۆشگەها خەڵاتان", en: "XP Rewards Shop" },
  buyBtn: { ku: "کڕین", badini: "کڕین", en: "Buy" },
  unlockedBtn: { ku: "کڕدراوە", badini: "هاتە کڕین", en: "Unlocked" }
};
