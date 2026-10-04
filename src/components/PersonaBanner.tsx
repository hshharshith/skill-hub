import React, { useState } from 'react';
import { Sparkles, Clock, Target, Award, ChevronDown, ChevronUp, UserCheck, BookOpen } from 'lucide-react';

export const PersonaBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside aria-label="Student persona context" className="bg-slate-900 text-slate-100 border-b border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500/20 text-amber-400 font-semibold text-xs shrink-0">
              <UserCheck className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Target Persona</span>
                <span className="text-slate-400 text-xs hidden sm:inline">·</span>
                <span className="text-xs font-medium text-slate-200 truncate">Priya (3rd Year CSE)</span>
                <span className="text-slate-400 text-xs hidden md:inline">·</span>
                <span className="text-xs text-slate-300 hidden md:inline">Academic-focused, anxious about grades & time</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 px-2.5 py-1 rounded transition-colors"
            >
              <span>{isExpanded ? 'Hide Solution Blueprint' : 'How We Solve Priya’s Problem'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 animate-fadeIn">
            <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
              <div className="flex items-center gap-2 text-amber-300 font-medium mb-1.5">
                <Award className="w-4 h-4" />
                <span>1. Overcoming Motivation Deficit</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Workshops award <strong className="text-white">Academic Activity Credits (45/60 earned)</strong> required for degree honors. Skill growth directly bolsters her university transcript instead of feeling like a distraction from studies.
              </p>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
              <div className="flex items-center gap-2 text-sky-300 font-medium mb-1.5">
                <Target className="w-4 h-4" />
                <span>2. Fixing Awareness Gaps</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Workshops are curated to her semester syllabus (Algorithms, DBMS, AI) with peer indicators (<strong className="text-white">&ldquo;5 batchmates interested&rdquo;</strong>) and direct alumni mentorship matches like Rohan Mehta.
              </p>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
              <div className="flex items-center gap-2 text-emerald-300 font-medium mb-1.5">
                <Clock className="w-4 h-4" />
                <span>3. Time Management & Clash-Free Scheduling</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Automatic <strong className="text-white">Timetable Clash Checker</strong> pins workshops only into confirmed lecture-free windows, plus bite-sized <strong className="text-white">15-minute alumni mentor chats</strong> that fit tight study schedules.
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
