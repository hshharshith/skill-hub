import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { defaultUsers } from '../../data/mockData';
import { X, LogIn, UserPlus, CheckCircle2, ShieldCheck, Sparkles, KeyRound, Mail, User, School } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  initialMode = 'signin',
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  
  // Sign In fields
  const [identifier, setIdentifier] = useState('priya.sharma@campus.edu');
  const [password, setPassword] = useState('••••••••');
  
  // Sign Up fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [year, setYear] = useState('3rd Year');

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if identifier matches one of the preset users
    const matched = defaultUsers.find(
      (u) =>
        u.email.toLowerCase() === identifier.toLowerCase() ||
        (u.rollNo && u.rollNo.toLowerCase() === identifier.toLowerCase())
    );

    const userToLogin: UserProfile = matched || {
      id: `user-${Date.now()}`,
      name: identifier.split('@')[0] || 'Campus Student',
      email: identifier.includes('@') ? identifier : `${identifier}@campus.edu`,
      rollNo: identifier.includes('@') ? '21CSE099' : identifier,
      role: 'student',
      department: 'Computer Science & Engineering',
      year: '3rd Year',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
      creditsEarned: 45,
      streakDays: 3,
    };

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    onLogin(userToLogin);
    onClose();
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: fullName.trim(),
      email: email.trim(),
      rollNo: rollNo.trim() || `24${department.slice(0, 3).toUpperCase()}001`,
      role: 'student',
      department,
      year,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80',
      creditsEarned: 0,
      streakDays: 1,
    };

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });

    onLogin(newUser);
    onClose();
  };

  const handleQuickPersona = (user: UserProfile) => {
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 }
    });
    onLogin(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab switch */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl mb-6 max-w-xs">
          <button
            onClick={() => setMode('signin')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
              mode === 'signin'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
              mode === 'signup'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {mode === 'signin' ? (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Welcome to Campus Skills Hub
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Sign in with your university credentials or choose a quick demo account.
              </p>
            </div>

            {/* Quick Demo Switchers */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Quick Demo Sign-In
              </span>
              <div className="space-y-1.5">
                {defaultUsers.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => handleQuickPersona(u)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 flex items-center justify-between text-left transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-sky-600">
                            {u.name}
                          </span>
                          {u.id === 'user-priya' && (
                            <span className="text-[10px] font-extrabold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                              Target Persona
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 block">
                          {u.department} · {u.year}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Select &rarr;
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Or Enter University Credentials
              </span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <form onSubmit={handleSignIn} className="space-y-3.5">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Campus Email or Roll Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="21CSE084 or priya.sharma@campus.edu"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Password</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your campus portal password"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In to Campus Skills Hub</span>
              </button>
            </form>
          </div>
        ) : (
          /* Sign Up Flow */
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Create Student Account
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Join 1,200+ students earning degree activity credits.
              </p>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">College Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@campus.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Roll Number</label>
                <input
                  type="text"
                  placeholder="e.g. 21CSE084"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                >
                  <option value="Computer Science & Engineering">CSE</option>
                  <option value="Electronics & Communication">ECE</option>
                  <option value="Information Technology">IT</option>
                  <option value="Mechanical Engineering">Mech</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Instantly links with University Co-Curricular Credit Ledger.</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register &amp; Start Upskilling</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
