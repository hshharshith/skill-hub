import React, { useState } from 'react';
import { Workshop, WorkshopCategory, ActiveScreen } from '../../types';
import { 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Plus, 
  Sparkles, 
  Info, 
  CalendarCheck,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface DiscoverScheduleProps {
  workshops: Workshop[];
  onToggleSchedule: (workshopId: string) => void;
  onOpenWorkshopDetails: (workshopId: string) => void;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenTimetable: () => void;
}

export const DiscoverSchedule: React.FC<DiscoverScheduleProps> = ({
  workshops,
  onToggleSchedule,
  onOpenWorkshopDetails,
  onNavigate,
  onOpenTimetable,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<WorkshopCategory>('All');
  const [onlyClashFree, setOnlyClashFree] = useState(true);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // 0 = April 2025, 1 = May 2025

  const categories: WorkshopCategory[] = ['All', 'Engineering', 'Communication', 'Career', 'AI'];

  const filteredWorkshops = workshops.filter((workshop) => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      workshop.facilitator.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || workshop.category === selectedCategory;
    const matchesClash = !onlyClashFree || workshop.academicFit.clashStatus === 'none';

    return matchesSearch && matchesCategory && matchesClash;
  });

  const scheduledWorkshops = workshops.filter(w => w.isRegistered);

  // Calendar dates for April 2025
  const aprilDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const aprilStartOffset = 2; // Tuesday is 1st of April 2025

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search workshops, topics, skills or facilitators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            />
          </div>

          {/* Clash-Free Switch for Priya's time-management */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-sky-50/70 border border-sky-100 px-3 py-2 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <label className="text-xs font-semibold text-slate-700 cursor-pointer select-none flex items-center gap-2">
              <span>Syllabus Clash-Free only</span>
              <input
                type="checkbox"
                checked={onlyClashFree}
                onChange={(e) => setOnlyClashFree(e.target.checked)}
                className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4"
              />
            </label>
          </div>
        </div>

        {/* Filter categories tabs */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <button
            onClick={onOpenTimetable}
            className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>View Priya&apos;s Class Timetable</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Campus Workshops List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Campus Workshops</h2>
              <p className="text-xs text-slate-500">
                {filteredWorkshops.length} workshops available · Direct university credit awarded
              </p>
            </div>
            <span className="text-xs font-medium text-slate-500">
              Showing filtered by: <strong className="text-slate-800">{selectedCategory}</strong>
            </span>
          </div>

          {filteredWorkshops.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <Info className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No workshops match your filters</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try unchecking &apos;Syllabus Clash-Free only&apos; or changing your search terms.
              </p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setOnlyClashFree(false); }}
                className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredWorkshops.map((ws) => {
              const isAdded = ws.isRegistered;
              return (
                <div
                  key={ws.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-sky-300 hover:shadow-sm transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                          {ws.category}
                        </span>
                        <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          +{ws.credits} credits
                        </span>
                        <span className="text-slate-300 text-xs hidden sm:inline">·</span>
                        <span className="text-xs text-slate-500">{ws.duration}</span>
                        <span className="text-slate-300 text-xs hidden sm:inline">·</span>
                        <span className="text-xs text-slate-500">{ws.enrolledSeats}/{ws.totalSeats} seats</span>
                      </div>

                      <h3 
                        onClick={() => onOpenWorkshopDetails(ws.id)}
                        className="text-base font-bold text-slate-900 hover:text-sky-600 cursor-pointer transition-colors"
                      >
                        {ws.title}
                      </h3>

                      {/* Quiet unboxed metadata */}
                      <div className="flex items-center gap-2 text-xs text-slate-600 flex-wrap">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>{ws.date}</span>
                        </span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{ws.time}</span>
                        </span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span>{ws.location}</span>
                      </div>

                      <p className="text-xs text-slate-500 line-clamp-2 pt-1 leading-relaxed">
                        {ws.description}
                      </p>

                      {/* Timetable fit indicator */}
                      <div className="pt-1 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{ws.academicFit.freeSlot}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0 shrink-0">
                      <button
                        onClick={() => onToggleSchedule(ws.id)}
                        className={`w-full sm:w-36 py-2 px-3 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                          isAdded
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-sky-600 text-white hover:bg-sky-700 shadow-2xs'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Added to Schedule</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Schedule</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => onOpenWorkshopDetails(ws.id)}
                        className="text-xs font-medium text-slate-500 hover:text-sky-600 py-1"
                      >
                        View Full Details &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: My Schedule & Calendar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">My Schedule</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentMonthIndex(0)}
                  className={`p-1 rounded-md text-slate-500 hover:bg-slate-100 ${currentMonthIndex === 0 ? 'opacity-40' : ''}`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-slate-800">
                  {currentMonthIndex === 0 ? 'April 2025' : 'May 2025'}
                </span>
                <button
                  onClick={() => setCurrentMonthIndex(1)}
                  className={`p-1 rounded-md text-slate-500 hover:bg-slate-100 ${currentMonthIndex === 1 ? 'opacity-40' : ''}`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="mt-4">
              <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 mb-2">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {/* Empty offset days for April (starts on Tuesday = 2 blank) */}
                {Array.from({ length: aprilStartOffset }).map((_, idx) => (
                  <div key={`blank-${idx}`} className="h-7 w-7" />
                ))}

                {aprilDays.map((day) => {
                  const isWorkshop24 = day === 24;
                  const isWorkshop26 = day === 26;
                  const isWorkshop28 = day === 28;
                  const hasEvent = isWorkshop24 || isWorkshop26 || isWorkshop28;

                  return (
                    <div
                      key={`day-${day}`}
                      className={`h-7 w-7 mx-auto flex items-center justify-center rounded-lg text-xs font-medium cursor-pointer transition-all ${
                        isWorkshop24
                          ? 'bg-sky-600 text-white font-bold shadow-xs'
                          : isWorkshop26 || isWorkshop28
                          ? 'bg-sky-100 text-sky-800 font-semibold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Timeline List */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Upcoming</span>
                <span className="text-[11px] text-sky-600 font-normal">
                  {scheduledWorkshops.length} booked
                </span>
              </div>

              {scheduledWorkshops.length === 0 ? (
                <p className="text-xs text-slate-500 py-3 text-center">
                  No workshops on your schedule yet. Click &apos;Add to Schedule&apos; to reserve a seat!
                </p>
              ) : (
                <div className="space-y-2.5">
                  {scheduledWorkshops.map((w) => (
                    <div
                      key={w.id}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs flex items-start justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <p className="font-bold text-slate-800 line-clamp-1">{w.title}</p>
                        <p className="text-[11px] text-slate-500">
                          {w.date} · {w.time.split('-')[0].trim()}
                        </p>
                        <span className="text-[10px] text-emerald-700 font-semibold block">
                          +{w.credits} academic credits
                        </span>
                      </div>
                      <button
                        onClick={() => onToggleSchedule(w.id)}
                        className="text-slate-400 hover:text-red-500 text-[11px] font-semibold shrink-0"
                        title="Remove from schedule"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Free hours reminder */}
            <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs text-amber-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                All scheduled workshops are placed in verified non-academic hours. No lecture attendance lost.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
