import React from 'react';
import { ActiveScreen, UserProfile } from '../../types';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Clock, Target, Award, ArrowUpRight, LogIn, LogOut } from 'lucide-react';

interface WelcomeOnboardingProps {
  currentUser: UserProfile | null;
  onGetStarted: () => void;
  onExplorePersona: (screen: ActiveScreen) => void;
  onOpenSignIn: () => void;
  onSignOut: () => void;
}

export const WelcomeOnboarding: React.FC<WelcomeOnboardingProps> = ({
  currentUser,
  onGetStarted,
  onExplorePersona,
  onOpenSignIn,
  onSignOut,
}) => {
  return (
    <div className="min-h-[calc(100vh-65px)] bg-radial from-sky-50/50 via-white to-slate-50 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 w-full">
        {/* Top Header Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-white shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight text-lg">
              Campus Skills Hub
            </span>
          </div>

          {/* Quick Sign In / Sign Out status on the welcome screen */}
          {currentUser ? (
            <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-6 h-6 rounded-full object-cover" />
              <span className="text-xs font-semibold text-slate-700">Signed in as {currentUser.name}</span>
              <button
                onClick={onSignOut}
                className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 ml-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenSignIn}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs"
            >
              <LogIn className="w-3.5 h-3.5 text-sky-600" />
              <span>Sign In</span>
            </button>
          )}
        </div>

        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brief & Action */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/70 text-sky-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>University Accredited Skill Ecosystem</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.1]">
              Build skills. <br />
              <span className="text-sky-600">Earn credits.</span> <br />
              Get career-ready.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Campus Skills Hub connects you with workshops, mentors, challenges and credit-bearing learning — all in one place. Learn, grow and turn your skills into real opportunities.
            </p>

            {/* Value Pillars */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">
                  <strong className="font-semibold text-slate-900">Direct Academic Credit:</strong> Earn 60 university-recognized activity points needed for graduation honors.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">
                  <strong className="font-semibold text-slate-900">Zero Schedule Clashes:</strong> Work around your semester timetable with automated lecture collision alerts.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">
                  <strong className="font-semibold text-slate-900">15-Min Alumni Mentorship:</strong> Fast-track career guidance without losing valuable study hours.
                </span>
              </div>
            </div>

            {/* CTAs matching Screen 1 in mockup */}
            <div className="space-y-3 pt-2 max-w-md">
              <button
                onClick={onGetStarted}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-600 text-white font-semibold text-sm shadow-md hover:bg-sky-700 hover:shadow-lg transition-all"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                {currentUser ? (
                  <button
                    onClick={onSignOut}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50 font-bold text-xs transition-colors shadow-2xs"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign out ({currentUser.name.split(' ')[0]})</span>
                  </button>
                ) : (
                  <button
                    onClick={onOpenSignIn}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    <LogIn className="w-3.5 h-3.5 text-sky-600" />
                    <span>Sign in</span>
                  </button>
                )}

                <button
                  onClick={() => onExplorePersona('dashboard')}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold text-xs transition-colors"
                >
                  <span>Explore as Priya</span>
                </button>
              </div>
            </div>

            {/* Trust metric */}
            <div className="pt-4 flex items-center gap-4 text-xs text-slate-500 border-t border-slate-200/80">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified by Campus Placement Cell</span>
              </div>
              <span>·</span>
              <span>1,200+ Students Upskilled</span>
              <span>·</span>
              <span>40+ Industry Mentors</span>
            </div>
          </div>

          {/* Right Column: Visual Showcase matching Screen 1 */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Background Glow */}
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-sky-200/50 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

              {/* Central Card with Illustration aesthetic */}
              <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 overflow-hidden">
                {/* Decorative floating sticker */}
                <div className="absolute top-6 right-6 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 rotate-2 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Better Skills, Brighter Future</span>
                </div>

                {/* Hero Illustration / Graphic */}
                <div className="mt-8 mb-6 flex justify-center">
                  <div className="relative w-64 h-56 flex items-center justify-center">
                    {/* Stylized geometric campus backdrop */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-sky-100 via-indigo-50 to-amber-50 rounded-2xl border border-slate-100 flex flex-col justify-end p-4">
                      <div className="w-full flex items-end justify-between gap-2 opacity-60">
                        <div className="w-8 h-20 bg-sky-300/60 rounded-t-md"></div>
                        <div className="w-12 h-28 bg-indigo-300/60 rounded-t-md"></div>
                        <div className="w-10 h-24 bg-sky-400/60 rounded-t-md"></div>
                        <div className="w-14 h-32 bg-slate-300/60 rounded-t-md"></div>
                        <div className="w-8 h-16 bg-amber-300/60 rounded-t-md"></div>
                      </div>
                    </div>

                    {/* Central student avatar */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="relative">
                        <img
                          src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80"}
                          alt={currentUser?.name || "Priya"}
                          className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full ring-2 ring-white">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="mt-2 text-center bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full shadow-sm border border-slate-200">
                        <p className="text-xs font-bold text-slate-800">{currentUser?.name || "Priya Sharma"}</p>
                        <p className="text-[10px] text-slate-500">{currentUser?.department || "CS Engineering"} · {currentUser?.year || "3rd Year"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Persona Context Card */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Student Progress Snapshot</span>
                    <span className="text-xs font-semibold text-sky-600">
                      {currentUser?.creditsEarned ?? 45} / 60 Credits
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-sky-600 h-2.5 rounded-full"
                      style={{ width: `${Math.round(((currentUser?.creditsEarned ?? 45) / 60) * 100)}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                    <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                      <div className="text-base font-extrabold text-slate-900">6</div>
                      <div className="text-[10px] text-slate-500 font-medium">Workshops</div>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                      <div className="text-base font-extrabold text-slate-900">4</div>
                      <div className="text-[10px] text-slate-500 font-medium">Challenges</div>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                      <div className="text-base font-extrabold text-slate-900">78%</div>
                      <div className="text-[10px] text-slate-500 font-medium">Ready Score</div>
                    </div>
                  </div>
                </div>

                {/* Quick Persona Hook */}
                <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs text-amber-900">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Worried about internal tests? Clash-free scheduler active.</span>
                  </div>
                  <button 
                    onClick={() => onExplorePersona('discover')}
                    className="text-amber-800 hover:text-amber-950 font-bold text-xs inline-flex items-center gap-0.5"
                  >
                    <span>View</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="border-t border-slate-200 bg-white/70 py-4 text-center text-xs text-slate-500">
        Campus Skills Hub · Tailored for engineering students to build verifiable, credit-bearing industry skills.
      </footer>
    </div>
  );
};
