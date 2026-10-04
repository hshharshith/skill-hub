import React, { useState } from 'react';
import { ActiveScreen } from '../../types';
import { 
  TrendingUp, 
  Award, 
  Calendar, 
  Trophy, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Download, 
  FileText, 
  ChevronRight,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

interface SkillsPathwayProps {
  creditsEarned: number;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenCertificate: () => void;
}

export const SkillsPathway: React.FC<SkillsPathwayProps> = ({
  creditsEarned,
  onNavigate,
  onOpenCertificate,
}) => {
  const percent = Math.min(100, Math.round((creditsEarned / 60) * 100));

  const milestones = [
    { id: 1, title: 'Awareness', desc: 'Discovered high-impact campus sessions', status: 'completed' },
    { id: 2, title: 'Motivation', desc: 'Syllabus credit alignment & streak rewards', status: 'completed' },
    { id: 3, title: 'Participation', desc: 'Enrolled in weekly hands-on labs', status: 'completed' },
    { id: 4, title: 'Skills Credit', desc: `${creditsEarned}/60 Degree Honors credits`, status: 'active' },
    { id: 5, title: 'Placement Ready', desc: '78% Placement Readiness index', status: 'upcoming' },
  ];

  const skillMaturity = [
    { name: 'Problem Solving', score: 90, color: 'bg-sky-600' },
    { name: 'Technical Skills', score: 88, color: 'bg-indigo-600' },
    { name: 'Communication', score: 82, color: 'bg-emerald-600' },
    { name: 'Adaptability', score: 80, color: 'bg-amber-600' },
    { name: 'Teamwork', score: 75, color: 'bg-purple-600' },
    { name: 'Leadership', score: 65, color: 'bg-rose-600' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Title & Introduction */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-semibold mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-sky-600" />
            <span>Lifelong Competency Tracker</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Your Skills Pathway
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            From awareness to placement — every step counts!
          </p>
        </div>

        {/* Milestone Steps Journey matching Screen 7 */}
        <div className="pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {milestones.map((m, idx) => {
              const isDone = m.status === 'completed';
              const isActive = m.status === 'active';
              return (
                <div
                  key={m.id}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col justify-between ${
                    isActive
                      ? 'bg-sky-50 border-sky-400 text-sky-950 ring-2 ring-sky-300'
                      : isDone
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="flex justify-center mb-2">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      isDone ? 'bg-emerald-600 text-white' :
                      isActive ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {isDone ? '✓' : m.id}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold">{m.title}</h3>
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">{m.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Total Skills Credits Progress Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white space-y-4 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center shadow-xs">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-300">Total Skills Credits Earned</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-white">{creditsEarned} / 60</span>
                  <span className="text-xs text-sky-300 font-bold">({percent}%)</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenCertificate}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <FileText className="w-4 h-4 text-sky-300" />
              <span>Generate Official Transcript</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <div className="flex items-center justify-center gap-1 text-sky-300 font-bold">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-base sm:text-lg">6</span>
              </div>
              <p className="text-[10px] text-slate-300 mt-0.5">Workshops Completed</p>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <div className="flex items-center justify-center gap-1 text-amber-300 font-bold">
                <Trophy className="w-3.5 h-3.5" />
                <span className="text-base sm:text-lg">4</span>
              </div>
              <p className="text-[10px] text-slate-300 mt-0.5">Challenges Completed</p>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <div className="flex items-center justify-center gap-1 text-emerald-300 font-bold">
                <Users className="w-3.5 h-3.5" />
                <span className="text-base sm:text-lg">2</span>
              </div>
              <p className="text-[10px] text-slate-300 mt-0.5">Mentor Sessions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Breakdown: Employability Skills & Placement Readiness */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Employability Skills */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Employability Skills Radar</h2>
            <span className="text-xs text-slate-400 font-medium">Mapped to Tier-1 hiring bars</span>
          </div>

          <div className="space-y-3.5">
            {skillMaturity.map((skill) => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{skill.name}</span>
                  <span className="text-slate-900 font-bold">{skill.score}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`${skill.color} h-full rounded-full`} style={{ width: `${skill.score}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 flex items-start gap-2 border border-slate-200/70">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Verified by autonomous project grading, facilitator attendance logs, and peer code reviews.
            </span>
          </div>
        </div>

        {/* Placement Readiness Gauge */}
        <div className="md:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">Placement Readiness</h2>
            <p className="text-xs text-slate-500 mt-0.5">Campus placement day index</p>

            <div className="mt-6 flex flex-col items-center justify-center">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-sky-600"
                    strokeDasharray="78, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-slate-900">78%</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded mt-0.5">
                    On track
                  </span>
                </div>
              </div>
              <p className="text-xs font-semibold text-slate-700 mt-4 text-center">
                High probability of shortlisting in Day-1 tech placement drives.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => onNavigate('discover')}
              className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <span>Explore Next Skill</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenCertificate}
              className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors"
            >
              Preview University Activity Transcript
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
