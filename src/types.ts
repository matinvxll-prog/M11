export type Language = "ku" | "badini" | "en";

export type SubjectId = "math" | "physics" | "chemistry" | "biology" | "english" | "arabic" | "kurdish" | "religion";

export interface Subject {
  id: SubjectId;
  nameKu: string;
  nameBadini?: string;
  nameEn: string;
  questionsCount: number;
  progressPercent: number;
  color: string; // hex or tailwind class
  badgeBg: string;
  iconSymbol: string; // e.g. "+ - × ÷", "⚛", "🧪", "🧬", "Aa", "ف", "ێ"
}

export interface GrammarStep {
  segment: string;
  roleKu: string;
  roleBadini: string;
  descriptionKu: string;
  descriptionBadini: string;
  badgeColor?: string; // "purple" | "indigo" | "amber" | "emerald" | "rose" | "blue" | "cyan"
}

export interface GrammarBreakdown {
  targetWord: string;
  sentenceKu?: string;
  sentenceBadini?: string;
  verbRootKu?: string;
  verbRootBadini?: string;
  steps: GrammarStep[];
  resultFormulaKu: string;
  resultFormulaBadini: string;
  resultTenseKu: string;
  resultTenseBadini: string;
  summaryRuleKu?: string;
  summaryRuleBadini?: string;
  memoryHookKu?: string;
  memoryHookBadini?: string;
}

export interface Question {
  id: string;
  subjectId: SubjectId;
  chapterKu: string;
  chapterBadini?: string;
  chapterEn: string;
  year?: string; // e.g., "2024 الوزاري"
  questionKu: string;
  questionBadini?: string;
  questionEn: string;
  optionsKu: string[];
  optionsBadini?: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationKu: string;
  explanationBadini?: string;
  explanationEn: string;
  grammarBreakdown?: GrammarBreakdown;
  xp: number;
}

export interface UserProfile {
  name: string;
  avatar: string;
  level: number;
  currentXp: number;
  nextLevelXp: number;
  totalXp: number;
  coins: number;
  vipLevel: "Bronze" | "Silver" | "Gold" | "VIP Master";
  isPremium: boolean;
  dailyStreak: number;
  questionsAnswered: number;
  correctAnswers: number;
  examsTaken: number;
  rankGlobal: number;
  schoolName: string;
  city: string; // Erbil, Sulaymaniyah, Duhok, Halabja, Kirkuk
  unlockedCertificates?: string[];
}

export interface VideoLesson {
  id: string;
  subjectId: SubjectId;
  titleKu: string;
  titleBadini?: string;
  titleEn: string;
  chapterKu: string;
  chapterBadini?: string;
  chapterEn: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl: string;
  teacherName: string;
  views: number;
  isHd: boolean;
  isPremium?: boolean;
}

export interface PdfDocument {
  id: string;
  subjectId: SubjectId;
  titleKu: string;
  titleBadini?: string;
  titleEn: string;
  pages: number;
  fileSize: string;
  downloadUrl: string;
  authorTeacher: string;
  year?: string;
  isExclusive?: boolean;
}

export interface Mission {
  id: string;
  titleKu: string;
  titleBadini?: string;
  titleEn: string;
  xpReward: number;
  coinsReward: number;
  currentProgress: number;
  target: number;
  completed: boolean;
  claimed: boolean;
  iconName: string;
}

export interface NotificationItem {
  id: string;
  titleKu: string;
  titleBadini?: string;
  titleEn: string;
  time: string;
  read: boolean;
  type: "exam" | "video" | "challenge" | "message" | "system";
}

export interface FriendUser {
  id: string;
  name: string;
  avatar: string;
  level: number;
  isOnline: boolean;
  streak: number;
  city: string;
  lastMessage?: string;
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  city: string;
  school: string;
  streakDays: number;
  isCurrentUser?: boolean;
}

export interface ChallengeItem {
  id: string;
  titleKu: string;
  titleBadini?: string;
  titleEn: string;
  descriptionKu: string;
  descriptionBadini?: string;
  descriptionEn: string;
  current: number;
  target: number;
  rewardXp: number;
  iconName: string;
  badgeColor: string;
  completed: boolean;
}

export interface AchievementBadge {
  id: string;
  titleKu: string;
  titleBadini?: string;
  titleEn: string;
  descriptionKu: string;
  descriptionBadini?: string;
  descriptionEn: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  color: string;
}

export interface RecentActivityItem {
  id: string;
  type: "quiz" | "badge" | "challenge" | "level";
  titleKu: string;
  titleBadini?: string;
  titleEn: string;
  timeAgoKu: string;
  timeAgoBadini?: string;
  timeAgoEn: string;
  xpGained: number;
  iconBg: string;
  icon: string;
}

export interface NoteItem {
  id: string;
  subjectId: SubjectId;
  titleKu: string;
  titleBadini?: string;
  titleEn: string;
  contentKu: string;
  contentBadini?: string;
  contentEn: string;
  date: string;
  isFavorite: boolean;
}

export interface BookmarkItem {
  id: string;
  question: Question;
  addedAt: string;
  personalNotes?: string;
}

export interface ShopItem {
  id: string;
  nameKu: string;
  nameBadini?: string;
  nameEn: string;
  descriptionKu: string;
  descriptionBadini?: string;
  descriptionEn: string;
  priceXp: number;
  category: "avatar" | "badge" | "powerup" | "theme";
  icon: string;
  purchased: boolean;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorCity: string;
  subjectId: SubjectId;
  questionText: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  isLiked?: boolean;
  answers: {
    id: string;
    authorName: string;
    authorAvatar: string;
    text: string;
    isVerifiedTeacher?: boolean;
    likes: number;
  }[];
}
