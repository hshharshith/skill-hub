import React, { useState } from 'react';
import { ActiveScreen, UserProfile } from '../types';
import { defaultUsers } from '../data/mockData';
import { 
  GraduationCap, 
  LayoutDashboard, 
  Compass, 
  BookMarked, 
  Users, 
  Trophy, 
  TrendingUp, 
  Bell, 
  Flame, 
  Award,
  CalendarCheck2,
  Menu,
  X,
  LogIn,
  LogOut,
  UserCheck,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  currentUser: UserProfile | null;
  creditsEarned: number;
  streakDays: number;
  onOpenTimetable: () => void;
  onOpenSignIn: () => void;
  onOpenSignUp: () => void;
  onSignOut: () => void;
  onSwitchUser: (user: UserProfile) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeScreen,
  onNavigate,
  currentUser,
  creditsEarned,
  streakDays,
  onOpenTimetable,
  onOpenSignIn,
  onOpenSignUp,
  onSignOut,
  onSwitchUser,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems: { id: ActiveScreen; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'welcome', label: 'Welcome', icon: GraduationCap },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'discover', label: 'Discover & Schedule', icon: Compass },
    { id: 'workshop-details', label: 'Workshop Details', icon: BookMarked },
    { id: 'mentors', label: 'Mentors & Peers', icon: Users },
    { id: 'challenge', label: 'Challenges', icon: Trophy },
    { id: 'pathway', label: 'Skills Pathway', icon: TrendingUp },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm ring-1 ring-sky-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg block leading-none">
                Campus Skills Hub
              </span>
              <span className="text-[11px] font-medium text-slate-500 tracking-normal block mt-1">
                Beyond the Classroom
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Stats & Profile Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Timetable Sync Button */}
            {currentUser && (
              <button
                onClick={onOpenTimetable}
                title="View Academic Timetable & Clash-free Slots"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors"
              >
                <CalendarCheck2 className="w-3.5 h-3.5 text-sky-600" />
                <span>Timetable Sync</span>
              </button>
            )}

            {/* Streak Counter */}
            {currentUser && (
              <div className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 rounded-lg">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{streakDays}d Streak</span>
              </div>
            )}

            {/* Credit Pill */}
            {currentUser && (
              <div 
                onClick={() => onNavigate('pathway')}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 rounded-lg cursor-pointer hover:bg-emerald-100 transition-colors"
                title="Click to view full skills transcript & breakdown"
              >
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                <span>{creditsEarned}/60 Credits</span>
              </div>
            )}

            {/* Notifications */}
            {currentUser && (
              <div className="relative">
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-sky-500 ring-2 ring-white"></span>
                </button>

                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Campus Alerts</span>
                      <span className="text-[11px] text-sky-600 font-medium cursor-pointer" onClick={() => setNotifOpen(false)}>Close</span>
                    </div>
                    <div className="space-y-2.5 mt-2.5 text-xs">
                      <div className="p-2 rounded-lg bg-sky-50/70 border border-sky-100">
                        <p className="font-semibold text-slate-800">Workshop Tomorrow!</p>
                        <p className="text-slate-600 mt-0.5">Build Your Career with AI Tools at 2:00 PM (Seminar Hall A). +10 credits pending.</p>
                        <span className="text-[10px] text-sky-600 font-medium mt-1 block">No lecture clash detected</span>
                      </div>
                      <div className="p-2 rounded-lg bg-amber-50/60 border border-amber-100">
                        <p className="font-semibold text-slate-800">Mentor Slot Confirmed</p>
                        <p className="text-slate-600 mt-0.5">Rohan Mehta accepted your 15-min System Design & Placement prep coffee chat.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile / Auth State Controls */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full hover:bg-slate-100 border border-slate-200 transition-all text-left"
                  title="Account Menu"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-sky-500/20"
                  />
                  <span className="text-xs font-semibold text-slate-800 hidden md:inline">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Account Dropdown with Sign Out */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-fadeIn">
                    <div className="pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                          <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                          <span className="inline-block mt-0.5 text-[10px] font-semibold text-sky-700 bg-sky-50 px-1.5 py-0.2 rounded">
                            {currentUser.department} {currentUser.year ? `· ${currentUser.year}` : ''}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Switch Persona option */}
                    <div className="py-2 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                        Switch Account
                      </span>
                      {defaultUsers.map((u) => (
                        <button
                          key={u.id}
                          onClick={() => {
                            onSwitchUser(u);
                            setUserDropdownOpen(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between hover:bg-slate-50 ${
                            currentUser.id === u.id ? 'bg-sky-50/70 text-sky-700 font-bold' : 'text-slate-700'
                          }`}
                        >
                          <span className="truncate">{u.name} ({u.role})</span>
                          {currentUser.id === u.id && <span className="text-[10px]">Active</span>}
                        </button>
                      ))}
                    </div>

                    {/* Functional Sign Out Button */}
                    <div className="pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onSignOut();
                        }}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Signed Out State: Sign In & Register Buttons */
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenSignIn}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={onOpenSignUp}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  <span>Register</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="pt-3 border-t border-slate-100 space-y-2">
            {currentUser ? (
              <>
                <div className="flex items-center justify-between px-2 text-xs">
                  <span className="font-bold text-slate-800">{currentUser.name}</span>
                  <span className="text-emerald-700 font-semibold">{creditsEarned}/60 credits</span>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSignOut();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSignIn();
                  }}
                  className="flex-1 py-2.5 bg-sky-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSignUp();
                  }}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
