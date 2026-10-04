import React from 'react';
import { ActiveScreen, Workshop, Mentor, Challenge } from '../../types';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  MapPin, 
  Award, 
  Trophy, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  Flame, 
  Users, 
  CalendarCheck, 
  Compass, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface StudentDashboardProps {
  currentUser?: import('../../types').UserProfile | null;
  onNavigate: (screen: ActiveScreen) => void;
  workshops: Workshop[];
  mentor: Mentor;
  challenge: Challenge;
  creditsEarned: number;
  onOpenWorkshopDetails: (workshopId: string) => void;
  onOpenTimetable: () => void;
  onOpenMentorChat: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentUser,
  onNavigate,
  workshops,
  mentor,
  challenge,
  creditsEarned,
  onOpenWorkshopDetails,
  onOpenTimetable,
  onOpenMentorChat,
}) => {
  const upcomingWorkshop = workshops.find(w => w.id === 'ws-ai-tools') || workshops[0];
  const creditsRemaining = 60 - creditsEarned;
  const progressPercent = Math.min(100, Math.round((creditsEarned / 60) * 100));

  const userName = currentUser ? currentUser.name.split(' ')[0] : 'Priya';
  const userDept = currentUser ? `${currentUser.year || '3rd Year'} · ${currentUser.department}` : 'Third Year · Computer Science & Engineering';
  const userAvatar = currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Student Welcome Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={userAvatar}
                alt={currentUser?.name || "Student"}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-sky-500/20"
              />
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 ring-2 ring-white">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Hi {userName} 👋
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                {userDept}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('pathway')}
            className="inline-flex items-center justify-between sm:justify-start gap-3 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors text-xs font-semibold self-start sm:self-auto"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>Your Profile 75% complete</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Your Skill Path Banner */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div>
              <h2 className="text-base font-bold text-slate-900">Your Skill Path</h2>
              <p className="text-xs text-slate-500">
                Continue your journey to earn credits and get placement ready.
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm font-extrabold text-sky-600">{creditsEarned} / 60 credits</span>
              <span className="text-xs text-slate-400 ml-1">({progressPercent}%)</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
            <div
              className="bg-sky-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 mt-2">
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified for University Degree Honours &amp; Placement Day Priority
            </span>
            <span className="font-semibold text-slate-700">
              Only {creditsRemaining} credits left to full certification!
            </span>
          </div>
        </div>
      </div>

      {/* 3 Core Highlight Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Upcoming Workshop */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-sky-300 transition-all group">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-3">
              <div className="flex items-center gap-1.5 text-sky-600">
                <Calendar className="w-4 h-4" />
                <span>Upcoming Workshop</span>
              </div>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                +{upcomingWorkshop.credits} credits
              </span>
            </div>

            <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors line-clamp-1">
              {upcomingWorkshop.title}
            </h3>

            <div className="mt-3 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{upcomingWorkshop.date} · {upcomingWorkshop.time.split('-')[0].trim()}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{upcomingWorkshop.location}</span>
              </div>
            </div>

            <div className="mt-3 p-2 bg-slate-50 rounded-lg text-[11px] text-slate-600 flex items-center gap-1.5 border border-slate-200/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">Clash-free: Fits after OS lab</span>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">5 peers going</span>
            <button
              onClick={() => onOpenWorkshopDetails(upcomingWorkshop.id)}
              className="text-xs font-bold text-sky-600 hover:text-sky-800 inline-flex items-center gap-1"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Mentor Recommendation */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-sky-300 transition-all group">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-3">
              <div className="flex items-center gap-1.5 text-indigo-600">
                <Users className="w-4 h-4" />
                <span>Mentor Recommendation</span>
              </div>
              <span className="text-slate-400 text-[11px]">Class of &apos;21</span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{mentor.name}</h3>
                <p className="text-xs text-slate-500">{mentor.title.split(',')[0]}</p>
                <div className="flex items-center gap-1 mt-0.5 text-[11px] text-amber-600 font-semibold">
                  <span>★ {mentor.rating}</span>
                  <span className="text-slate-400 font-normal">({mentor.reviewsCount} reviews)</span>
                </div>
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {mentor.bio}
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-emerald-700 font-medium">15-min quick chat</span>
            <button
              onClick={() => onNavigate('mentors')}
              className="text-xs font-bold text-sky-600 hover:text-sky-800 inline-flex items-center gap-1"
            >
              <span>View Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3: Weekly Challenge */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-amber-300 transition-all group">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-3">
              <div className="flex items-center gap-1.5 text-amber-600">
                <Trophy className="w-4 h-4" />
                <span>Weekly Challenge</span>
              </div>
              <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                {challenge.completedSteps}/{challenge.totalSteps} steps
              </span>
            </div>

            <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-700 transition-colors">
              {challenge.title}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Complete 3 sections · Earn 5 points + 5 credits
            </p>

            {/* Micro Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                <span>Progress</span>
                <span>{Math.round((challenge.completedSteps / challenge.totalSteps) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full"
                  style={{ width: `${(challenge.completedSteps / challenge.totalSteps) * 100}%` }}
                />
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>3-day streak active! Submit link to complete.</span>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">48 peers enrolled</span>
            <button
              onClick={() => onNavigate('challenge')}
              className="text-xs font-bold text-amber-700 hover:text-amber-900 inline-flex items-center gap-1"
            >
              <span>Continue Challenge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate('discover')}
            className="flex flex-col items-center justify-center p-4 bg-white hover:bg-sky-50/50 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-sky-300 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-100/70 text-sky-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800">Find Workshops</span>
            <span className="text-[11px] text-slate-500 mt-0.5">12 campus sessions</span>
          </button>

          <button
            onClick={() => onNavigate('discover')}
            className="flex flex-col items-center justify-center p-4 bg-white hover:bg-sky-50/50 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-sky-300 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-100/70 text-indigo-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800">My Schedule</span>
            <span className="text-[11px] text-slate-500 mt-0.5">April 2025 Calendar</span>
          </button>

          <button
            onClick={() => onNavigate('challenge')}
            className="flex flex-col items-center justify-center p-4 bg-white hover:bg-amber-50/50 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-amber-300 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100/70 text-amber-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Trophy className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800">Challenges</span>
            <span className="text-[11px] text-slate-500 mt-0.5">Earn bonus credits</span>
          </button>

          <button
            onClick={onOpenTimetable}
            className="flex flex-col items-center justify-center p-4 bg-white hover:bg-emerald-50/50 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800">Timetable Clash Check</span>
            <span className="text-[11px] text-slate-500 mt-0.5">0 lecture collisions</span>
          </button>
        </div>
      </div>

      {/* Motivational Bottom Banner specifically tailored to Priya */}
      <div className="bg-gradient-to-r from-sky-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 text-sky-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-sky-300" />
            <span>Placement Readiness Advantage</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight">
            How Priya can convert 2 hours/week into high-paying placement offers
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Recruiters evaluate both CGPA and practical project confidence. Participating in these curated sessions ensures your 8.9 CGPA is backed by hands-on AI deployment and system design experience.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('pathway')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors text-center"
          >
            View Placement Score (78%)
          </button>
          <button
            onClick={onOpenMentorChat}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors border border-white/20 text-center"
          >
            Chat with Rohan Mehta
          </button>
        </div>
      </div>
    </div>
  );
};
