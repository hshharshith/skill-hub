import React, { useState, useEffect } from 'react';
import { ActiveScreen, Workshop, Mentor, Challenge, UserProfile } from './types';
import { initialWorkshops, mockMentors, initialChallenges, leaderboardData, priyaTimetable, defaultUsers } from './data/mockData';
import { PersonaBanner } from './components/PersonaBanner';
import { Navbar } from './components/Navbar';
import { WelcomeOnboarding } from './components/screens/WelcomeOnboarding';
import { StudentDashboard } from './components/screens/StudentDashboard';
import { DiscoverSchedule } from './components/screens/DiscoverSchedule';
import { WorkshopDetailsModal } from './components/screens/WorkshopDetailsModal';
import { MentorPeerSupport } from './components/screens/MentorPeerSupport';
import { GamificationChallenge } from './components/screens/GamificationChallenge';
import { SkillsPathway } from './components/screens/SkillsPathway';
import { BookMentorModal } from './components/modals/BookMentorModal';
import { MentorChatModal } from './components/modals/MentorChatModal';
import { TimetableSyncModal } from './components/modals/TimetableSyncModal';
import { CertificateModal } from './components/modals/CertificateModal';
import { AuthModal } from './components/modals/AuthModal';
import { BottomNavBar } from './components/BottomNavBar';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('dashboard');
  
  // Auth state persisted in localStorage
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('campus_skills_user');
      if (saved) return JSON.parse(saved);
      // Default to Priya Sharma (the target persona from brief)
      return defaultUsers[0];
    } catch {
      return defaultUsers[0];
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  const [workshops, setWorkshops] = useState<Workshop[]>(initialWorkshops);
  const [mentors] = useState<Mentor[]>(mockMentors);
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [creditsEarned, setCreditsEarned] = useState<number>(currentUser?.creditsEarned ?? 45);
  const [streakDays, setStreakDays] = useState<number>(currentUser?.streakDays ?? 3);
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<string>('ws-ai-tools');
  
  // Modals
  const [isBookMentorOpen, setIsBookMentorOpen] = useState(false);
  const [isMentorChatOpen, setIsMentorChatOpen] = useState(false);
  const [isTimetableOpen, setIsTimetableOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [activeMentor, setActiveMentor] = useState<Mentor>(mockMentors[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Auth Handlers
  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    setCreditsEarned(user.creditsEarned);
    setStreakDays(user.streakDays);
    try {
      localStorage.setItem('campus_skills_user', JSON.stringify(user));
    } catch {
      // ignore
    }
    showToast(`Signed in successfully as ${user.name}!`);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('campus_skills_user');
    } catch {
      // ignore
    }
    showToast('Signed out of Campus Skills Hub.');
    setActiveScreen('welcome');
  };

  const handleSwitchUser = (user: UserProfile) => {
    handleLogin(user);
  };

  const handleOpenSignIn = () => {
    setAuthModalMode('signin');
    setIsAuthModalOpen(true);
  };

  const handleOpenSignUp = () => {
    setAuthModalMode('signup');
    setIsAuthModalOpen(true);
  };

  const handleToggleSchedule = (workshopId: string) => {
    setWorkshops((prev) =>
      prev.map((w) => {
        if (w.id === workshopId) {
          const nextState = !w.isRegistered;
          if (nextState) {
            setCreditsEarned((c) => Math.min(60, c + w.credits));
            showToast(`Added "${w.title}" to schedule! (+${w.credits} Credits reserved)`);
          } else {
            setCreditsEarned((c) => Math.max(30, c - w.credits));
            showToast(`Removed "${w.title}" from schedule.`);
          }
          return {
            ...w,
            isRegistered: nextState,
            enrolledSeats: nextState ? w.enrolledSeats + 1 : Math.max(0, w.enrolledSeats - 1),
          };
        }
        return w;
      })
    );
  };

  const handleOpenWorkshopDetails = (workshopId: string) => {
    setSelectedWorkshopId(workshopId);
    setActiveScreen('workshop-details');
  };

  const handleOpenBookMentor = (mentor: Mentor) => {
    setActiveMentor(mentor);
    setIsBookMentorOpen(true);
  };

  const handleOpenMentorChat = (mentor?: Mentor) => {
    if (mentor) setActiveMentor(mentor);
    setIsMentorChatOpen(true);
  };

  const handleSubmitProof = (url: string) => {
    setChallenges((prev) =>
      prev.map((ch) => {
        if (ch.id === 'ch-portfolio') {
          return {
            ...ch,
            completedSteps: 3,
            submittedUrl: url,
            steps: ch.steps.map((s) => ({ ...s, status: 'completed' })),
          };
        }
        return ch;
      })
    );
    setCreditsEarned((c) => Math.min(60, c + 5));
    setStreakDays((s) => s + 1);
    showToast('Challenge verified! +5 Credits added to your transcript.');
  };

  const selectedWorkshop = workshops.find((w) => w.id === selectedWorkshopId) || workshops[0];
  const activeChallenge = challenges.find((ch) => ch.id === 'ch-portfolio') || challenges[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Persona Context Banner */}
      <PersonaBanner />

      {/* Main Navbar with functional Sign In and Sign Out */}
      <Navbar
        activeScreen={activeScreen}
        onNavigate={setActiveScreen}
        currentUser={currentUser}
        creditsEarned={creditsEarned}
        streakDays={streakDays}
        onOpenTimetable={() => setIsTimetableOpen(true)}
        onOpenSignIn={handleOpenSignIn}
        onOpenSignUp={handleOpenSignUp}
        onSignOut={handleSignOut}
        onSwitchUser={handleSwitchUser}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Screen Routing */}
      <main className="flex-1 pb-20 sm:pb-24">
        {activeScreen === 'welcome' && (
          <WelcomeOnboarding
            currentUser={currentUser}
            onGetStarted={() => setActiveScreen('dashboard')}
            onExplorePersona={(screen) => {
              if (!currentUser) {
                handleLogin(defaultUsers[0]);
              }
              setActiveScreen(screen);
            }}
            onOpenSignIn={handleOpenSignIn}
            onSignOut={handleSignOut}
          />
        )}

        {activeScreen === 'dashboard' && (
          <StudentDashboard
            currentUser={currentUser}
            onNavigate={setActiveScreen}
            workshops={workshops}
            mentor={mockMentors[0]}
            challenge={activeChallenge}
            creditsEarned={creditsEarned}
            onOpenWorkshopDetails={handleOpenWorkshopDetails}
            onOpenTimetable={() => setIsTimetableOpen(true)}
            onOpenMentorChat={() => handleOpenMentorChat(mockMentors[0])}
          />
        )}

        {activeScreen === 'discover' && (
          <DiscoverSchedule
            workshops={workshops}
            onToggleSchedule={handleToggleSchedule}
            onOpenWorkshopDetails={handleOpenWorkshopDetails}
            onNavigate={setActiveScreen}
            onOpenTimetable={() => setIsTimetableOpen(true)}
          />
        )}

        {activeScreen === 'workshop-details' && (
          <WorkshopDetailsModal
            workshop={selectedWorkshop}
            onBack={() => setActiveScreen('discover')}
            onToggleRegister={handleToggleSchedule}
            onOpenMentorChat={() => handleOpenMentorChat(mockMentors[0])}
          />
        )}

        {activeScreen === 'mentors' && (
          <MentorPeerSupport
            mentors={mentors}
            challenges={challenges}
            onNavigate={setActiveScreen}
            onOpenBookMentor={handleOpenBookMentor}
            onOpenMentorChat={handleOpenMentorChat}
            onOpenChallengeDetails={(chId) => {
              setActiveScreen('challenge');
            }}
          />
        )}

        {activeScreen === 'challenge' && (
          <GamificationChallenge
            challenge={activeChallenge}
            leaderboard={leaderboardData}
            onBack={() => setActiveScreen('dashboard')}
            onSubmitProof={handleSubmitProof}
            onNavigate={setActiveScreen}
          />
        )}

        {activeScreen === 'pathway' && (
          <SkillsPathway
            creditsEarned={creditsEarned}
            onNavigate={setActiveScreen}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}
      </main>

      {/* Auth Modal (Sign In / Create Account) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        initialMode={authModalMode}
      />

      {/* Interactive Modals */}
      {isBookMentorOpen && (
        <BookMentorModal
          mentor={activeMentor}
          onClose={() => setIsBookMentorOpen(false)}
          onConfirmed={(slot, topic) => {
            setIsBookMentorOpen(false);
            showToast(`15-min chat booked with ${activeMentor.name} for ${slot}!`);
          }}
        />
      )}

      {isMentorChatOpen && (
        <MentorChatModal
          mentor={activeMentor}
          onClose={() => setIsMentorChatOpen(false)}
          onBookSlot={() => {
            setIsMentorChatOpen(false);
            setIsBookMentorOpen(true);
          }}
        />
      )}

      {isTimetableOpen && (
        <TimetableSyncModal
          classes={priyaTimetable}
          workshops={workshops}
          onClose={() => setIsTimetableOpen(false)}
        />
      )}

      {isCertificateOpen && (
        <CertificateModal
          creditsEarned={creditsEarned}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}

      {/* Quick View Bottom Bar */}
      <BottomNavBar
        activeScreen={activeScreen}
        onNavigate={setActiveScreen}
        creditsEarned={creditsEarned}
        streakDays={streakDays}
        upcomingWorkshop={selectedWorkshop}
        onOpenTimetable={() => setIsTimetableOpen(true)}
        onOpenWorkshopDetails={handleOpenWorkshopDetails}
      />
    </div>
  );
}
