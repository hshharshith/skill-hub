import React, { useState } from 'react';
import { Challenge, LeaderboardEntry, ActiveScreen } from '../../types';
import { 
  ArrowLeft, 
  Trophy, 
  Flame, 
  Award, 
  Star, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Send, 
  Lightbulb, 
  TrendingUp,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GamificationChallengeProps {
  challenge: Challenge;
  leaderboard: LeaderboardEntry[];
  onBack: () => void;
  onSubmitProof: (url: string) => void;
  onNavigate: (screen: ActiveScreen) => void;
}

export const GamificationChallenge: React.FC<GamificationChallengeProps> = ({
  challenge,
  leaderboard,
  onBack,
  onSubmitProof,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'steps' | 'leaderboard'>('steps');
  const [proofUrl, setProofUrl] = useState(challenge.submittedUrl || '');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const percent = Math.round((challenge.completedSteps / challenge.totalSteps) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofUrl.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onSubmitProof(proofUrl);
      setShowSuccessToast(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => setShowSuccessToast(false), 5000);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
          Weekly Skill Sprint
        </span>
      </div>

      {showSuccessToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs font-bold">Proof Verified! Challenge Completed!</p>
              <p className="text-[11px] text-emerald-700">+1 Point and +5 Skills Credits added to your University Transcript.</p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('pathway')}
            className="text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
          >
            Check Skills Pathway &rarr;
          </button>
        </div>
      )}

      {/* Main Challenge Card matching Screen 6 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
        {/* Title & Status */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Trophy className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {challenge.title}
              </h1>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Active
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {challenge.description}
            </p>
          </div>
        </div>

        {/* Progress & Big Stats */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>{challenge.completedSteps}/{challenge.totalSteps} steps completed</span>
            <span>{percent}%</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/70 text-center">
            <div className="flex items-center justify-center gap-1 text-amber-600 font-extrabold text-sm sm:text-base">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{challenge.completedSteps === 3 ? '5/5' : '4/5'}</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Points</p>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/70 text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-700 font-extrabold text-sm sm:text-base">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>+{challenge.completedSteps === 3 ? '5/5' : '4/5'}</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Credits</p>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/70 text-center">
            <div className="flex items-center justify-center gap-1 text-amber-600 font-extrabold text-sm sm:text-base">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{challenge.streakDays} days</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Streak</p>
          </div>
        </div>

        {/* Segmented Tabs: Challenge Steps vs Leaderboard */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('steps')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold transition-all relative ${
              activeTab === 'steps' ? 'text-sky-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Challenge Steps</span>
            {activeTab === 'steps' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold transition-all relative ${
              activeTab === 'leaderboard' ? 'text-sky-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Leaderboard</span>
            {activeTab === 'leaderboard' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600" />
            )}
          </button>
        </div>

        {/* Tab 1 Content: Challenge Steps */}
        {activeTab === 'steps' ? (
          <div className="space-y-6">
            <div className="space-y-3">
              {challenge.steps.map((step, idx) => {
                const isStepCompleted = step.status === 'completed' || (idx === 2 && challenge.completedSteps === 3);
                return (
                  <div
                    key={step.id}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      isStepCompleted
                        ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-950'
                        : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        isStepCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {step.id}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold">{step.title}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      {isStepCompleted ? (
                        <span className="flex items-center gap-1 text-emerald-700 font-bold text-xs">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Completed</span>
                          <span className="text-slate-400 font-normal">· +{step.points} pts</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-sky-700 font-bold text-xs bg-sky-50 px-2.5 py-1 rounded-md">
                          <span>In Progress</span>
                          <span className="text-slate-400 font-normal">· +{step.points} pt</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Motivational Action Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200/80 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎉</span>
                <div>
                  <h3 className="text-sm font-bold text-amber-950">
                    {challenge.completedSteps === 3 ? "Outstanding Job, Priya!" : "Great Progress, Priya!"}
                  </h3>
                  <p className="text-xs text-amber-800">
                    {challenge.completedSteps === 3 
                      ? "All steps verified. Your 5 skills credits have been minted."
                      : "You've completed 2 steps. Keep going to earn more credits!"}
                  </p>
                </div>
              </div>

              {challenge.completedSteps < 3 ? (
                <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Step 3: Submit your GitHub/Portfolio URL
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="url"
                      required
                      placeholder="https://github.com/priyasharma/portfolio or Vercel link"
                      value={proofUrl}
                      onChange={(e) => setProofUrl(e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-white border border-amber-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all shrink-0"
                    >
                      <Send className="w-4 h-4" />
                      <span>{submitting ? 'Verifying...' : 'Submit Proof'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-200 text-xs text-slate-700 flex items-center justify-between">
                  <span>Submitted Portfolio: <strong className="text-sky-700">{proofUrl || 'https://github.com/priyasharma/portfolio'}</strong></span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Verified
                  </span>
                </div>
              )}

              {/* Tip Pill */}
              <div className="flex items-start gap-2 text-xs text-amber-900 bg-white/70 p-3 rounded-xl border border-amber-200/60">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Tip:</strong> Share a clean screenshot or link from your portfolio. Our campus placement rubric scores clean READMEs and deployed demos highest.
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Tab 2 Content: Leaderboard */
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 px-2">
              <span>Rank &amp; Student</span>
              <div className="flex items-center gap-6">
                <span>Points</span>
                <span>Credits</span>
              </div>
            </div>

            <div className="space-y-2">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
                    entry.isCurrentUser
                      ? 'bg-sky-50 border-sky-300 font-bold text-sky-950 ring-1 ring-sky-400'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${
                      entry.rank === 1 ? 'bg-amber-400 text-amber-950' :
                      entry.rank === 2 ? 'bg-slate-300 text-slate-800' :
                      entry.rank === 3 ? 'bg-amber-700/60 text-white' : 'text-slate-500'
                    }`}>
                      {entry.rank}
                    </span>
                    <img
                      src={entry.avatar}
                      alt={entry.name}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <span>{entry.name}</span>
                  </div>

                  <div className="flex items-center gap-8 pr-2">
                    <span className="font-extrabold text-slate-900">{entry.points}</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {entry.credits}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 text-center pt-2">
              Leaderboards reset bi-weekly. Top 5 earn priority 1-on-1 mock interviews with visiting FAANG alumni.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
