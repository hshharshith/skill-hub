import React, { useState } from 'react';
import { Mentor, Challenge, ActiveScreen } from '../../types';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Star, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Trophy, 
  Sparkles, 
  Award,
  ChevronRight
} from 'lucide-react';

interface MentorPeerSupportProps {
  mentors: Mentor[];
  challenges: Challenge[];
  onNavigate: (screen: ActiveScreen) => void;
  onOpenBookMentor: (mentor: Mentor) => void;
  onOpenMentorChat: (mentor: Mentor) => void;
  onOpenChallengeDetails: (challengeId: string) => void;
}

export const MentorPeerSupport: React.FC<MentorPeerSupportProps> = ({
  mentors,
  challenges,
  onNavigate,
  onOpenBookMentor,
  onOpenMentorChat,
  onOpenChallengeDetails,
}) => {
  const [activeTab, setActiveTab] = useState<'mentor' | 'peer'>('mentor');
  const primaryMentor = mentors[0]; // Rohan Mehta

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Segmented Controls */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200">
          <button
            onClick={() => setActiveTab('mentor')}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'mentor'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mentor Support
          </button>
          <button
            onClick={() => setActiveTab('peer')}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'peer'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Peer Challenges
          </button>
        </div>
      </div>

      {activeTab === 'mentor' ? (
        <div className="space-y-8">
          {/* Featured Primary Match: Rohan Mehta */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Your Mentor Match</h2>
                <p className="text-xs text-slate-500">
                  Matched based on your 3rd year CSE subjects and placement goals
                </p>
              </div>
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full">
                98% Match Score
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-start gap-4">
                <img
                  src={primaryMentor.avatar}
                  alt={primaryMentor.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white shadow-sm"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                      {primaryMentor.name}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">· Senior SDE, Alumni</span>
                  </div>
                  <p className="text-xs text-slate-500">{primaryMentor.dept} (Class of 2021)</p>
                  
                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {primaryMentor.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{primaryMentor.availableSlot}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <button
                  onClick={() => onOpenMentorChat(primaryMentor)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-sky-600" />
                  <span>Message Mentor</span>
                </button>

                <button
                  onClick={() => onOpenBookMentor(primaryMentor)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book 15 min</span>
                </button>
              </div>
            </div>

            {/* Why 15-Minute Mentorship solves Priya's time-management */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-100 space-y-1">
                <p className="font-bold text-sky-950">Zero Exam Guilt</p>
                <p className="text-slate-600">Quick 15-minute focused agendas without marathon calls.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                <p className="font-bold text-emerald-950">Direct Resume Feedback</p>
                <p className="text-slate-600">Alumni review your projects against real hiring bars.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100 space-y-1">
                <p className="font-bold text-amber-950">Study-to-Job Translation</p>
                <p className="text-slate-600">Learn which textbook concepts matter for interview coding.</p>
              </div>
            </div>
          </div>

          {/* More Campus Mentors */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Explore More Alumni Mentors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mentors.slice(1).map((m) => (
                <div
                  key={m.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={m.avatar}
                      alt={m.name}
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{m.name}</h4>
                      <p className="text-xs text-slate-500">{m.title}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {m.tags.map(t => (
                          <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-emerald-700 font-medium">{m.availableSlot}</span>
                    <button
                      onClick={() => onOpenBookMentor(m)}
                      className="font-bold text-sky-600 hover:text-sky-800"
                    >
                      Book 15 min &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Peer-Led Challenges Tab */
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Peer-Led Challenges</h2>
                <p className="text-xs text-slate-500">
                  Build habits with batchmates. Small daily tasks with big placement payoff.
                </p>
              </div>
              <button
                onClick={() => onNavigate('challenge')}
                className="text-xs font-bold text-sky-600 hover:text-sky-800"
              >
                View Active Challenge &rarr;
              </button>
            </div>

            <div className="space-y-4">
              {challenges.map((ch) => {
                const percent = Math.round((ch.completedSteps / ch.totalSteps) * 100);
                return (
                  <div
                    key={ch.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-amber-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                          +{ch.points} points
                        </span>
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                          +{ch.credits} credits
                        </span>
                        <span className="text-slate-400 text-xs">·</span>
                        <span className="text-xs text-slate-500">{ch.participantsCount} participants</span>
                      </div>

                      <h3 className="font-extrabold text-slate-900 text-base">{ch.title}</h3>
                      <p className="text-xs text-slate-600">{ch.description}</p>

                      {/* Progress bar */}
                      <div className="max-w-md">
                        <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                          <span>Progress ({ch.completedSteps}/{ch.totalSteps} steps completed)</span>
                          <span className="font-bold text-slate-700">{percent}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenChallengeDetails(ch.id)}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 self-start md:self-auto shrink-0 shadow-xs"
                    >
                      <Trophy className="w-4 h-4 text-slate-950" />
                      <span>{ch.completedSteps > 0 ? 'Continue Challenge' : 'Join Challenge'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
