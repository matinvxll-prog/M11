import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  initialProfile,
  subjectsList,
  mockQuestions,
  globalLeaderboard,
  mockCommunityPosts,
  mockShopItems,
  mockNotes,
  mockFriends,
  mockMissions,
  recentActivities,
  achievementsList
} from "./data/mockData";
import {
  BookmarkItem,
  CommunityPost,
  Language,
  NoteItem,
  Question,
  ShopItem,
  SubjectId,
  UserProfile
} from "./types";
import { Navbar } from "./components/Navbar";
import { GlobalSearchResults } from "./components/GlobalSearchResults";
import { Sidebar, NavTab } from "./components/Sidebar";
import { TopNav } from "./components/TopNav";
import { WelcomeBanner } from "./components/WelcomeBanner";
import { AllSectionsTopHub } from "./components/AllSectionsTopHub";
import { DailyChallengeWidget } from "./components/DailyChallengeWidget";
import { MissionsWidget } from "./components/MissionsWidget";
import { ProgressOverview } from "./components/ProgressOverview";
import { SmartFeaturesWidget } from "./components/SmartFeaturesWidget";
import { SubjectsGrid } from "./components/SubjectsGrid";
import { SubjectDetailView } from "./components/SubjectDetailView";
import { RecentActivity } from "./components/RecentActivity";
import { AchievementsRow } from "./components/AchievementsRow";
import { CommunityWidget } from "./components/CommunityWidget";
import { LeaderboardWidget } from "./components/LeaderboardWidget";
import { ExamsView } from "./components/ExamsView";
import { Grade12SpecialView } from "./components/Grade12SpecialView";
import { StudyToolsView } from "./components/StudyToolsView";
import { VideoLessonsView } from "./components/VideoLessonsView";
import { PdfLibraryView } from "./components/PdfLibraryView";
import { LeaderboardView } from "./components/LeaderboardView";
import { CommunityView } from "./components/CommunityView";
import { FriendsAndChatView } from "./components/FriendsAndChatView";
import { StatisticsView } from "./components/StatisticsView";
import { NotesAndBookmarksView } from "./components/NotesAndBookmarksView";
import { ShopView } from "./components/ShopView";
import { Grade12PrepSystemHub } from "./components/Grade12PrepSystemHub";
import { RevisionView } from "./components/RevisionView";
import { PomodoroView } from "./components/PomodoroView";

// Modals
import { StudyPlannerModal } from "./components/StudyPlannerModal";
import { AITutorModal } from "./components/AITutorModal";
import { CameraOcrModal } from "./components/CameraOcrModal";
import { QuizRunnerModal } from "./components/QuizRunnerModal";
import { VoiceQuizModal } from "./components/VoiceQuizModal";
import { CalculatorModal } from "./components/CalculatorModal";
import { CertificateModal } from "./components/CertificateModal";
import { DictionaryModal } from "./components/DictionaryModal";
import { LevelUpModal } from "./components/LevelUpModal";
import { LuckyWheelModal } from "./components/LuckyWheelModal";
import { MysteryBoxModal } from "./components/MysteryBoxModal";
import { ParentTeacherPortalModal } from "./components/ParentTeacherPortalModal";
import { PremiumModal } from "./components/PremiumModal";
import { SavedQuestionsPdfModal } from "./components/SavedQuestionsPdfModal";
import { AuthModal } from "./components/AuthModal";
import { AdminPanelModal } from "./components/AdminPanelModal";
import { ProfileModal } from "./components/ProfileModal";
import { supabase } from "./supabaseClient";

interface DashboardProps {
  onReplaySplash?: () => void;
}

export default function Dashboard({ onReplaySplash }: DashboardProps) {
  const [language, setLanguage] = useState<Language>("badini");
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // User state
  const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile);

  // Dynamic collections
  const [missions, setMissions] = useState(mockMissions);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [notes, setNotes] = useState<NoteItem[]>(mockNotes);
  const [posts, setPosts] = useState<CommunityPost[]>(mockCommunityPosts);
  const [shopItems, setShopItems] = useState<ShopItem[]>(mockShopItems);

  // Modals visibility
  const [showAiTutor, setShowAiTutor] = useState(false);
  const [showCameraOcr, setShowCameraOcr] = useState(false);
  const [showVoiceQuiz, setShowVoiceQuiz] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showLuckyWheel, setShowLuckyWheel] = useState(false);
  const [showMysteryBox, setShowMysteryBox] = useState(false);
  const [showParentPortal, setShowParentPortal] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showQuizRunner, setShowQuizRunner] = useState(false);
  const [quizSubjectName, setQuizSubjectName] = useState("بیرکاری");
  const [quizQuestions, setQuizQuestions] = useState<Question[]>(mockQuestions);
  const [hasVisitedPomodoro, setHasVisitedPomodoro] = useState<boolean>(false);

  useEffect(() => {
    if (activeTab === "pomodoro") {
      setHasVisitedPomodoro(true);
    }
  }, [activeTab]);

  useEffect(() => {
    // Check if user is logged in via Supabase
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserProfile((prev) => ({
          ...prev,
          name: user.user_metadata?.full_name || prev.name,
          schoolName: user.user_metadata?.school_name || prev.schoolName,
          city: user.user_metadata?.city || prev.city,
        }));
      }
    }).catch((err) => {
      console.warn("Supabase auth check failed or offline:", err);
    });
  }, []);

  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (tab !== "subjects") {
      setSelectedSubjectId(null);
    }
    if (tab === "luckyWheel") setShowLuckyWheel(true);
    if (tab === "premium") setShowPremium(true);
    if (tab === "admin") setShowAdmin(true);
  };

  const handleStartQuizForSubject = (subjectId: SubjectId | string, chapterTitle?: string) => {
    const subObj = subjectsList.find((s) => s.id === subjectId);
    setQuizSubjectName(subObj ? subObj.nameBadini || subObj.nameKu : "تست");
    const subQuestions = mockQuestions.filter((q) => q.subjectId === subjectId);
    setQuizQuestions(subQuestions.length > 0 ? subQuestions : mockQuestions);
    setShowQuizRunner(true);
  };

  const handleQuizComplete = (score: number, xpGained: number, correctCount: number) => {
    setShowQuizRunner(false);
    setUserProfile((prev) => {
      const newXp = prev.currentXp + xpGained;
      let newLevel = prev.level;
      let showUp = false;
      if (newXp >= prev.nextLevelXp) {
        newLevel += 1;
        showUp = true;
      }
      if (showUp) setShowLevelUp(true);
      return {
        ...prev,
        currentXp: newXp,
        totalXp: prev.totalXp + xpGained,
        coins: prev.coins + Math.floor(score * 10),
        questionsAnswered: prev.questionsAnswered + 10,
        correctAnswers: prev.correctAnswers + correctCount,
        level: newLevel,
      };
    });
  };

  const handleToggleBookmark = (question: Question) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === question.id);
      if (exists) {
        return prev.filter((b) => b.id !== question.id);
      }
      return [
        ...prev,
        {
          id: question.id,
          question,
          addedAt: new Date().toLocaleDateString("ku-IQ"),
        },
      ];
    });
  };

  const handleClaimMissionReward = (missionId: string) => {
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === missionId && !m.claimed) {
          setUserProfile((p) => ({
            ...p,
            currentXp: p.currentXp + m.xpReward,
            coins: p.coins + m.coinsReward,
          }));
          return { ...m, claimed: true };
        }
        return m;
      })
    );
  };

  const handleBuyShopItem = (itemId: string, price: number) => {
    if (userProfile.coins < price) {
      alert(language === "badini" ? "کۆینێن تە تێرا ناکەن!" : "کۆینەکانت بەش ناکات!");
      return;
    }
    setUserProfile((prev) => ({ ...prev, coins: prev.coins - price }));
    setShopItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, purchased: true } : item))
    );
  };

  const selectedSubjectObject = subjectsList.find((s) => s.id === selectedSubjectId);

  // Dedicated full-page view for QuizRunner without background content or scrollbar
  if (showQuizRunner) {
    return (
      <div dir="rtl" className="fixed inset-0 z-[9999] bg-[#f8f6fe] text-slate-800 w-screen h-screen h-[100dvh] max-h-screen overflow-hidden select-none">
        <QuizRunnerModal
          subjectName={quizSubjectName}
          questions={quizQuestions}
          language={language}
          onClose={() => setShowQuizRunner(false)}
          onQuizComplete={handleQuizComplete}
          onToggleBookmark={handleToggleBookmark}
          bookmarkedQuestionIds={bookmarks.map((b) => b.id)}
        />
      </div>
    );
  }

  if (selectedSubjectObject) {
    return (
      <div dir="rtl" className="fixed inset-0 z-[9999] bg-slate-50 text-slate-800 w-screen h-screen h-[100dvh] overflow-y-auto overflow-x-hidden font-sans select-none">
        <SubjectDetailView
          subject={selectedSubjectObject}
          language={language}
          userName={userProfile.name}
          user={userProfile}
          onBack={() => setSelectedSubjectId(null)}
          onStartQuiz={(chapter) => handleStartQuizForSubject(selectedSubjectObject.id, chapter)}
          onOpenAiTutor={() => setShowAiTutor(true)}
        />
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className={`min-h-screen ${isDarkMode ? "bg-[#090a16] text-slate-100" : "bg-[#f7f5fc] text-slate-900"} font-sans flex flex-col selection:bg-purple-500 selection:text-white`}
    >
      {/* Top Header Navbar */}
      {activeTab !== "studyPlan" && activeTab !== "pomodoro" && activeTab !== "exams" && activeTab !== "subjects" && (
        <Navbar
          user={userProfile}
          language={language}
          onLanguageChange={setLanguage}
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode(!isDarkMode)}
          onOpenAiTutor={() => setShowAiTutor(true)}
          onOpenAuth={() => setShowAuthModal(true)}
          onSearch={setSearchTerm}
          searchTerm={searchTerm}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onOpenCameraOcr={() => setShowCameraOcr(true)}
          onOpenLuckyWheel={() => setShowLuckyWheel(true)}
          onOpenPremium={() => setShowPremium(true)}
          onOpenVoiceQuiz={() => setShowVoiceQuiz(true)}
          onOpenCertificate={() => setShowCertificate(true)}
          onOpenProfile={() => setShowProfile(true)}
        />
      )}

      {/* Body Layout */}
      <div className="flex flex-col flex-1">
        {/* Top Navigation Bar with Quick Actions and Section Tabs */}
        {activeTab !== "studyPlan" && activeTab !== "pomodoro" && activeTab !== "exams" && activeTab !== "subjects" && (
          <TopNav
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            user={userProfile}
            language={language}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            isOpenMobile={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
            onOpenVoiceQuiz={() => setShowVoiceQuiz(true)}
            onOpenCameraOcr={() => setShowCameraOcr(true)}
            onOpenAiTutor={() => setShowAiTutor(true)}
            onOpenCalculator={() => setShowCalculator(true)}
            onOpenDictionary={() => setShowDictionary(true)}
            onOpenProfile={() => setShowProfile(true)}
            onOpenLuckyWheel={() => setShowLuckyWheel(true)}
            onOpenPremium={() => setShowPremium(true)}
          />
        )}

        {/* Main Content View with Framer Motion Page Transitions */}
        <main className={`flex-1 w-full ${activeTab === "pomodoro" || activeTab === "subjects" ? "p-0 max-w-none" : activeTab === "exams" ? "p-3 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto" : "p-3 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto"}`}>
          {searchTerm.trim().length > 0 ? (
            <GlobalSearchResults
              searchTerm={searchTerm}
              language={language}
              isDarkMode={isDarkMode}
              onClearSearch={() => setSearchTerm("")}
              onSelectTab={(tab) => {
                handleSelectTab(tab);
                setSearchTerm("");
              }}
              onSelectSubject={(subId) => {
                setSelectedSubjectId(subId as SubjectId);
                handleSelectTab("subjects");
                setSearchTerm("");
              }}
              onOpenAiTutor={() => {
                setShowAiTutor(true);
                setSearchTerm("");
              }}
              onOpenVoiceQuiz={() => {
                setShowVoiceQuiz(true);
                setSearchTerm("");
              }}
              onOpenCameraOcr={() => {
                setShowCameraOcr(true);
                setSearchTerm("");
              }}
              onOpenCalculator={() => {
                setShowCalculator(true);
                setSearchTerm("");
              }}
              onOpenDictionary={() => {
                setShowDictionary(true);
                setSearchTerm("");
              }}
              onOpenLuckyWheel={() => {
                setShowLuckyWheel(true);
                setSearchTerm("");
              }}
              onOpenPremium={() => {
                setShowPremium(true);
                setSearchTerm("");
              }}
              onOpenProfile={() => {
                setShowProfile(true);
                setSearchTerm("");
              }}
              subjectsList={subjectsList}
            />
          ) : (
            <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (selectedSubjectId || "")}
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.99 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* HOME TAB */}
              {activeTab === "home" && (
                <div className="space-y-6 sm:space-y-8">
                  {/* Hero Welcome Banner */}
                  <WelcomeBanner
                    user={userProfile}
                    language={language}
                    isDarkMode={isDarkMode}
                    onStartQuiz={() => handleStartQuizForSubject("math")}
                    onStartDailyChallenge={() => handleStartQuizForSubject("physics")}
                    onOpenAiTutor={() => setShowAiTutor(true)}
                    onOpenPremium={() => setShowPremium(true)}
                  />

                  {/* All DEGEL QUTABI Sections & Tools */}
                  <AllSectionsTopHub
                    language={language}
                    isDarkMode={isDarkMode}
                    activeTab={activeTab}
                    onSelectTab={handleSelectTab}
                    onOpenAiTutor={() => setShowAiTutor(true)}
                    onOpenVoiceQuiz={() => setShowVoiceQuiz(true)}
                    onOpenCameraOcr={() => setShowCameraOcr(true)}
                    onOpenCalculator={() => setShowCalculator(true)}
                    onOpenDictionary={() => setShowDictionary(true)}
                  />

                  {/* 8 SUBJECTS GRID (Directly matching User's Reference Design) */}
                  <div className="w-full">
                    <SubjectsGrid
                      subjects={subjectsList}
                      language={language}
                      isDarkMode={isDarkMode}
                      onSelectSubject={(id) => {
                        setSelectedSubjectId(id);
                        setActiveTab("subjects");
                      }}
                      onStartQuiz={(id) => handleStartQuizForSubject(id)}
                      onOpenStudyPlan={() => handleSelectTab("studyPlan")}
                      onViewAll={() => handleSelectTab("subjects")}
                      showBanner={false}
                      onOpenAiTutor={() => setShowAiTutor(true)}
                    />
                  </div>

                  {/* Grade 12 Ministry Exam System Hub */}
                  <Grade12PrepSystemHub
                    user={userProfile}
                    language={language}
                    isDarkMode={isDarkMode}
                    onOpenAiTutor={() => setShowAiTutor(true)}
                    onStartQuiz={(subId) => handleStartQuizForSubject(subId as SubjectId)}
                    onOpenPdfLibrary={() => handleSelectTab("pdfLibrary")}
                    onOpenVideoLessons={() => handleSelectTab("videos")}
                    onClaimDailyReward={() => {
                      setUserProfile((prev) => ({
                        ...prev,
                        currentXp: prev.currentXp + 50,
                        totalXp: prev.totalXp + 50,
                        coins: prev.coins + 20
                      }));
                    }}
                  />

                  {/* Quick Widgets Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      <DailyChallengeWidget
                        language={language}
                        isDarkMode={isDarkMode}
                        onStartChallenge={() => handleStartQuizForSubject("math")}
                      />
                      <SmartFeaturesWidget
                        language={language}
                        isDarkMode={isDarkMode}
                        onOpenVoiceQuiz={() => setShowVoiceQuiz(true)}
                        onOpenCameraOcr={() => setShowCameraOcr(true)}
                        onOpenAiTutor={() => setShowAiTutor(true)}
                        onOpenStudyPlan={() => handleSelectTab("studyPlan")}
                        onOpenCertificate={() => setShowCertificate(true)}
                        onOpenCalculator={() => setShowCalculator(true)}
                        onOpenDictionary={() => setShowDictionary(true)}
                      />
                    </div>

                    <div className="space-y-6">
                      <ProgressOverview user={userProfile} language={language} isDarkMode={isDarkMode} />
                      <MissionsWidget
                        missions={missions}
                        language={language}
                        isDarkMode={isDarkMode}
                        onClaimReward={handleClaimMissionReward}
                      />
                    </div>
                  </div>


                </div>
              )}

              {/* SUBJECTS TAB */}
              {activeTab === "subjects" && (
                selectedSubjectId ? (
                  <SubjectDetailView
                    subject={subjectsList.find((s) => s.id === selectedSubjectId) || subjectsList[0]}
                    user={userProfile}
                    language={language}
                    onBack={() => setSelectedSubjectId(null)}
                    onStartQuiz={(topicName) => handleStartQuizForSubject(selectedSubjectId, topicName)}
                    onOpenAiTutor={() => setShowAiTutor(true)}
                  />
                ) : (
                  <div className="w-full min-h-screen bg-[#f7f5fc] dark:bg-[#0c0926] p-3 sm:p-6 lg:p-8">
                    <div className="w-full max-w-7xl 2xl:max-w-[1550px] mx-auto">
                      <SubjectsGrid
                        subjects={subjectsList}
                        language={language}
                        isDarkMode={isDarkMode}
                        onSelectSubject={(id) => setSelectedSubjectId(id)}
                        onStartQuiz={(id) => handleStartQuizForSubject(id)}
                        onOpenStudyPlan={() => setActiveTab("studyPlan")}
                        onViewAll={() => {}}
                        onBackToHome={() => handleSelectTab("home")}
                        onOpenAiTutor={() => setShowAiTutor(true)}
                      />
                    </div>
                  </div>
                )
              )}

              {/* EXAMS TAB */}
              {activeTab === "exams" && (
                <ExamsView
                  language={language}
                  onStartExam={(title, subjectId) => {
                    if (subjectId) {
                      setSelectedSubjectId(subjectId);
                    } else {
                      handleStartQuizForSubject("kurdish");
                    }
                  }}
                  onBackToHome={() => handleSelectTab("home")}
                />
              )}

              {/* GRADE 12 SPECIAL TAB */}
              {activeTab === "grade12Special" && (
                <Grade12SpecialView
                  language={language}
                  user={userProfile}
                  onOpenAiTutor={() => setShowAiTutor(true)}
                  onStartQuiz={(subId) => handleStartQuizForSubject(subId as SubjectId)}
                  onOpenPdfLibrary={() => handleSelectTab("pdfLibrary")}
                  onOpenVideoLessons={() => handleSelectTab("videos")}
                  onOpenStudyPlan={() => handleSelectTab("studyPlan")}
                />
              )}

              {/* POMODORO FOCUS TIMER TAB & FLOATING MINI WIDGET */}
              {(activeTab === "pomodoro" || hasVisitedPomodoro) && (
                <PomodoroView
                  user={userProfile}
                  language={language}
                  isDarkMode={isDarkMode}
                  onBackToHome={() => handleSelectTab("home")}
                  isFloatingMini={activeTab !== "pomodoro"}
                  onExpandFromMini={() => handleSelectTab("pomodoro")}
                />
              )}

              {/* REVISION TAB */}
              {activeTab === "revision" && (
                <RevisionView
                  language={language}
                  user={userProfile}
                  onStartQuiz={(subId) => handleStartQuizForSubject(subId as SubjectId)}
                />
              )}

              {/* STUDY TOOLS TAB */}
              {activeTab === "studyTools" && (
                <StudyToolsView
                  language={language}
                  initialSubTab="pomodoro"
                  onOpenStudyPlan={() => handleSelectTab("studyPlan")}
                />
              )}

              {/* STUDY PLANNER TAB (Corporate Clean / Flat UI following site design) */}
              {activeTab === "studyPlan" && (
                <StudyPlannerModal
                  language={language}
                  onClose={() => handleSelectTab("home")}
                  user={userProfile}
                  isDarkMode={isDarkMode}
                  onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                />
              )}

              {/* VIDEOS TAB */}
              {activeTab === "videos" && <VideoLessonsView language={language} />}

              {/* PDF LIBRARY TAB */}
              {activeTab === "pdfLibrary" && <PdfLibraryView language={language} />}

              {/* LEADERBOARD TAB */}
              {activeTab === "leaderboard" && (
                <LeaderboardView users={globalLeaderboard} language={language} />
              )}

              {/* COMMUNITY TAB */}
              {activeTab === "community" && (
                <CommunityView
                  posts={posts}
                  user={userProfile}
                  language={language}
                  onAddPost={(text, subId) => {
                    const newP: CommunityPost = {
                      id: "p_" + Date.now(),
                      authorName: userProfile.name,
                      authorAvatar: userProfile.avatar,
                      authorCity: userProfile.city,
                      subjectId: subId || "math",
                      questionText: text,
                      likesCount: 0,
                      commentsCount: 0,
                      createdAt: language === "badini" ? "نوکە" : "ئێستا",
                      answers: []
                    };
                    setPosts([newP, ...posts]);
                  }}
                  onLikePost={(postId) => {
                    setPosts((prev) =>
                      prev.map((p) =>
                        p.id === postId
                          ? { ...p, likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1, isLiked: !p.isLiked }
                          : p
                      )
                    );
                  }}
                />
              )}

              {/* FRIENDS & CHAT TAB */}
              {activeTab === "friends" && (
                <FriendsAndChatView friends={mockFriends} user={userProfile} language={language} />
              )}

              {/* STATISTICS TAB */}
              {activeTab === "statistics" && (
                <StatisticsView user={userProfile} language={language} />
              )}

              {/* NOTES & BOOKMARKS TAB */}
              {activeTab === "notes" || activeTab === "bookmarks" ? (
                <NotesAndBookmarksView
                  notes={notes}
                  bookmarks={bookmarks}
                  language={language}
                  onRemoveBookmark={(qid) => setBookmarks(bookmarks.filter((b) => b.id !== qid))}
                  onAddBookmark={handleToggleBookmark}
                />
              ) : null}

              {/* SHOP TAB */}
              {activeTab === "shop" && (
                <ShopView
                  user={userProfile}
                  shopItems={shopItems}
                  language={language}
                  onBuyItem={handleBuyShopItem}
                />
              )}
            </motion.div>
          </AnimatePresence>
          )}
        </main>
      </div>

      {/* Global Interactive Modals */}
      {showAiTutor && <AITutorModal language={language} onClose={() => setShowAiTutor(false)} />}
      {showCameraOcr && <CameraOcrModal language={language} onClose={() => setShowCameraOcr(false)} />}
      {showVoiceQuiz && <VoiceQuizModal language={language} onClose={() => setShowVoiceQuiz(false)} />}
      {showCalculator && <CalculatorModal language={language} onClose={() => setShowCalculator(false)} />}
      {showCertificate && <CertificateModal language={language} user={userProfile} onClose={() => setShowCertificate(false)} />}
      {showDictionary && <DictionaryModal language={language} onClose={() => setShowDictionary(false)} />}
      {showLevelUp && <LevelUpModal level={userProfile.level} language={language} onClose={() => setShowLevelUp(false)} />}
      {showLuckyWheel && (
        <LuckyWheelModal
          language={language}
          onClose={() => setShowLuckyWheel(false)}
          onWinReward={(coins, xp) => {
            setUserProfile((prev) => ({
              ...prev,
              coins: prev.coins + coins,
              currentXp: prev.currentXp + xp,
            }));
          }}
        />
      )}
      {showMysteryBox && <MysteryBoxModal language={language} onClose={() => setShowMysteryBox(false)} />}
      {showParentPortal && <ParentTeacherPortalModal language={language} onClose={() => setShowParentPortal(false)} />}
      {showPremium && <PremiumModal language={language} onClose={() => setShowPremium(false)} />}
      {showAdmin && <AdminPanelModal language={language} onClose={() => setShowAdmin(false)} />}
      {showAuthModal && <AuthModal language={language} onClose={() => setShowAuthModal(false)} />}
      {showProfile && (
        <ProfileModal
          user={userProfile}
          language={language}
          onClose={() => setShowProfile(false)}
          onUpdateUser={(updated) => setUserProfile((prev) => ({ ...prev, ...updated }))}
        />
      )}
    </div>
  );
}
