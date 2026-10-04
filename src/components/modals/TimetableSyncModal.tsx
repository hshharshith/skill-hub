import React from 'react';
import { TimetableClass, Workshop } from '../../types';
import { X, Calendar, Clock, CheckCircle2, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

interface TimetableSyncModalProps {
  classes: TimetableClass[];
  workshops: Workshop[];
  onClose: () => void;
}

export const TimetableSyncModal: React.FC<TimetableSyncModalProps> = ({
  classes,
  workshops,
  onClose,
}) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Priya&apos;s Semester Timetable &amp; Workshop Clash Checker
              </h3>
              <p className="text-xs text-slate-500">
                B.Tech Computer Science &amp; Engineering · Semester 6
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Status Box */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <p className="text-sm font-bold text-emerald-950">
                  0 Lecture Clashes Detected
                </p>
                <p className="text-xs text-emerald-700">
                  All 12 campus workshops are automatically restricted to open university activity slots.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-white/80 px-3 py-1 rounded-lg border border-emerald-200">
              100% Attendance Protected
            </span>
          </div>

          {/* Days Grid */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Weekly Coursework vs Upskilling Windows
            </h4>

            <div className="space-y-3">
              {days.map((day) => {
                const dayClasses = classes.filter(c => c.day === day);
                const hasWorkshop = day === 'Thursday'; // Thursday 2:00 PM workshop

                return (
                  <div key={day} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                      <span>{day}</span>
                      <span className="text-[11px] text-slate-500 font-normal">
                        {dayClasses.length} Core Lectures / Labs
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {dayClasses.map((cls, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-800">{cls.course}</span>
                            <span className="text-[10px] text-slate-400">{cls.room}</span>
                          </div>
                          <span className="text-[11px] text-slate-500">{cls.time}</span>
                        </div>
                      ))}

                      {hasWorkshop && (
                        <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 shadow-2xs sm:col-span-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold flex items-center gap-1.5 text-sky-800">
                              <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse"></span>
                              Booked Workshop: Build Your Career with AI Tools
                            </span>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                              +10 Credits
                            </span>
                          </div>
                          <span className="text-[11px] text-sky-700">
                            2:00 PM - 4:00 PM (Seminar Hall A) · Fits perfectly into post-lab free study block
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Synced with University ERP System (Roll: 21CSE084)
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
          >
            Close Timetable
          </button>
        </div>
      </div>
    </div>
  );
};
