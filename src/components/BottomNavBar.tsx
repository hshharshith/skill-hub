import React, { useState } from 'react';
import { ActiveScreen, Workshop } from '../types';
import { 
  Home, 
  Compass, 
  Trophy, 
  Users, 
  TrendingUp, 
  CalendarCheck2, 
  Sparkles,
  X,
  Clock,
  MapPin,
  ChevronUp,
  ArrowRight
} from 'lucide-react';

interface BottomNavBarProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  creditsEarned: number;
  streakDays: number;
  upcomingWorkshop?: Workshop;
  onOpenTimetable: () => void;
  onOpenWorkshopDetails: (id: string) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeScreen,
  onNavigate,
  creditsEarned,
  streakDays,
  upcomingWorkshop,
  onOpenTimetable,
  onOpenWorkshopDetails,
}) => {
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const navItems: {
    id: ActiveScreen;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    badgeColor?: string;
  }[] = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'discover', label: 'Workshops', icon: Compass, badge: '12' },
    { id: 'challenge', label: 'Challenges', icon: Trophy, badge: `${streakDays}d`, badgeColor: 'bg-amber-500' },
    { id: 'mentors', label: 'Mentors', icon: Users },
    { id: 'pathway', label: 'Pathway', icon: TrendingUp, badge: `${creditsEarned}c`, badgeColor: 'bg-emerald-600' },
  ];

  return (
    <>
      {/* Quick View Mini Drawer / Peek Sheet */}
      {quickViewOpen && (
        <div className="fixed inset-x-0 bottom-16 sm:bottom-20 z-40 max-w-lg mx-auto px-4 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-slate-200/90 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Quick View &amp; Schedule Peek
                </span>
              </div>
              <button
                onClick={() => setQuickViewOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Next Workshop preview */}
            {upcomingWorkshop && (
              <div className="p-3 bg-sky-50/70 border border-sky-100 rounded-2xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider">
                    Next Up on Schedule
                  </span>
                  <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100/70 px-2 py-0.2 rounded">
                    +{upcomingWorkshop.credits} credits
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{upcomingWorkshop.title}</h4>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{upcomingWorkshop.date} · {upcomingWorkshop.time.split('-')[0].trim()}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{upcomingWorkshop.location}</span>
                  </span>
                </div>
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[10px] text-emerald-700 font-semibold">
                    ✓ Verified 0 timetable clashes
                  </span>
                  <button
                    onClick={() => {
                      setQuickViewOpen(false);
                      onOpenWorkshopDetails(upcomingWorkshop.id);
                    }}
                    className="text-[11px] font-bold text-sky-600 hover:text-sky-800 flex items-center gap-0.5"
                  >
                    <span>View details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* 2 Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  setQuickViewOpen(false);
                  onOpenTimetable();
                }}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <CalendarCheck2 className="w-3.5 h-3.5 text-sky-600" />
                <span>Class Timetable</span>
              </button>

              <button
                onClick={() => {
                  setQuickViewOpen(false);
                  onNavigate('pathway');
                }}
                className="py-2.5 px-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Progress: {creditsEarned}/60</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Fixed Bottom Dock */}
      <nav 
        aria-label="Quick Access Navigation" 
        className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] print:hidden"
      >
        <div className="max-w-2xl mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-around h-16 sm:h-18">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeScreen === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative flex flex-col items-center justify-center w-14 sm:w-16 h-13 rounded-2xl transition-all duration-200 ${
                    isActive
                      ? 'text-sky-600 font-bold scale-105'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                  aria-label={item.label}
                >
                  <div className="relative">
                    <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                    
                    {/* Badge */}
                    {item.badge && (
                      <span className={`absolute -top-1.5 -right-2 px-1 py-0.2 rounded-full text-[9px] font-extrabold text-white leading-none shadow-2xs ${item.badgeColor || 'bg-sky-600'}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <span className={`text-[10px] tracking-tight mt-1 transition-all ${
                    isActive ? 'font-extrabold text-sky-600' : 'font-medium text-slate-500'
                  }`}>
                    {item.label}
                  </span>

                  {/* Active dot indicator */}
                  {isActive && (
                    <span className="absolute -bottom-1 w-1.5 h-1.5 bg-sky-600 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Quick View Trigger Button */}
            <button
              onClick={() => setQuickViewOpen(!quickViewOpen)}
              className={`relative flex flex-col items-center justify-center w-14 sm:w-16 h-13 rounded-2xl transition-all ${
                quickViewOpen
                  ? 'text-sky-700 bg-sky-50 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title="Quick Schedule Peek"
            >
              <div className="relative">
                <CalendarCheck2 className="w-5 h-5 stroke-2" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
              </div>
              <span className="text-[10px] font-semibold text-slate-600 mt-1 flex items-center gap-0.5">
                <span>Peek</span>
                <ChevronUp className={`w-2.5 h-2.5 transition-transform ${quickViewOpen ? 'rotate-180' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
