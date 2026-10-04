import React, { useState } from 'react';
import { Workshop, ActiveScreen } from '../../types';
import { 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  MapPin, 
  Calendar, 
  Clock, 
  Award, 
  Users, 
  CheckCircle2, 
  Bell, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  Building,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WorkshopDetailsModalProps {
  workshop: Workshop;
  onBack: () => void;
  onToggleRegister: (workshopId: string) => void;
  onOpenMentorChat: () => void;
}

export const WorkshopDetailsModal: React.FC<WorkshopDetailsModalProps> = ({
  workshop,
  onBack,
  onToggleRegister,
  onOpenMentorChat,
}) => {
  const [reminder, setReminder] = useState(workshop.reminderEnabled ?? true);
  const [copied, setCopied] = useState(false);

  const handleJoin = () => {
    if (!workshop.isRegistered) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    onToggleRegister(workshop.id);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Workshops</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-lg shadow-2xs transition-colors"
            title="Share workshop link"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-lg shadow-2xs transition-colors"
            title="Bookmark"
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>

      {copied && (
        <div className="mb-4 p-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs text-center font-medium">
          Workshop link copied to clipboard! Share with your study group.
        </div>
      )}

      {/* Main Workshop Card matching Screen 4 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
        {/* Header Section */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm font-black text-xl">
            AI
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded">
                {workshop.category}
              </span>
              <span className="text-slate-400 text-xs">·</span>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded">
                +{workshop.credits} University Credits
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
              {workshop.title}
            </h1>
          </div>
        </div>

        {/* Facilitator Card */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={workshop.facilitator.avatar}
              alt={workshop.facilitator.name}
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-2xs"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-bold text-slate-900 text-sm">{workshop.facilitator.name}</h2>
                <span className="text-[11px] text-sky-700 bg-sky-100/60 font-semibold px-2 py-0.2 rounded-md">Alumni Mentor</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{workshop.facilitator.role}</p>
            </div>
          </div>

          <button
            onClick={onOpenMentorChat}
            className="text-xs font-bold text-sky-700 hover:text-sky-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs transition-colors self-start sm:self-auto"
          >
            Ask Question Before Joining &rarr;
          </button>
        </div>

        {/* Date, Time & Venue */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
              <Calendar className="w-4 h-4 text-sky-600" />
              <span>Date &amp; Time</span>
            </div>
            <p className="text-sm font-bold text-slate-900">{workshop.date}</p>
            <p className="text-slate-600">{workshop.time} ({workshop.duration})</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
              <MapPin className="w-4 h-4 text-sky-600" />
              <span>Location</span>
            </div>
            <p className="text-sm font-bold text-slate-900">{workshop.location}</p>
            <p className="text-slate-600">{workshop.building}</p>
          </div>
        </div>

        {/* Skills You'll Gain */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Skills You&apos;ll Gain
          </h2>
          <div className="flex flex-wrap gap-2">
            {workshop.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-200/60 text-xs font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Reward Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-amber-500/10 border border-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-emerald-900">+{workshop.credits} Skills Credits</p>
              <p className="text-xs text-emerald-700">Auto-credited to your University Activity record after completion</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-800 hidden sm:inline">Verified by Placement Cell</span>
        </div>

        {/* Capacity & Peers Stack */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-y border-slate-100">
          <div className="flex items-center gap-3">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-800">{workshop.enrolledSeats} / {workshop.totalSeats} seats filled</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&auto=format&fit=crop&q=80" alt="Peer 1" />
              <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80" alt="Peer 2" />
              <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=60&auto=format&fit=crop&q=80" alt="Peer 3" />
            </div>
            <span className="text-xs font-medium text-slate-600">{workshop.peersCount} batchmates interested</span>
          </div>
        </div>

        {/* Interactive Campus Map Preview */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Building className="w-4 h-4 text-sky-600" />
              <span>Campus Map: {workshop.building}</span>
            </div>
            <span className="text-[11px] text-slate-500">2-minute walk from Computer Science Block</span>
          </div>
          {/* Visual Mini Map schematic */}
          <div className="relative h-28 bg-slate-200 rounded-xl overflow-hidden border border-slate-300/80 flex items-center justify-center">
            {/* Map Roads / campus pathways */}
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-1/2 left-0 right-0 h-4 bg-white -translate-y-1/2"></div>
              <div className="absolute left-1/3 top-0 bottom-0 w-4 bg-white"></div>
              <div className="absolute right-1/4 top-0 bottom-0 w-3 bg-white"></div>
            </div>
            {/* Pin */}
            <div className="relative z-10 flex flex-col items-center animate-bounce">
              <div className="bg-sky-600 text-white p-1.5 rounded-full shadow-md">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold bg-white/95 px-2 py-0.5 rounded shadow-xs mt-1 text-slate-800">
                Seminar Hall A
              </span>
            </div>
          </div>
        </div>

        {/* Reminder Toggle */}
        <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70">
          <div className="flex items-center gap-2.5">
            <Bell className="w-4 h-4 text-sky-600" />
            <span className="text-xs font-bold text-slate-800">Get reminder (1 hour before via campus email &amp; SMS)</span>
          </div>
          <button
            onClick={() => setReminder(!reminder)}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
              reminder ? 'bg-sky-600 justify-end' : 'bg-slate-300 justify-start'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
          </button>
        </div>

        {/* Main CTA Join Button */}
        <button
          onClick={handleJoin}
          className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
            workshop.isRegistered
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-sky-600 hover:bg-sky-700 text-white'
          }`}
        >
          {workshop.isRegistered ? (
            <>
              <Check className="w-5 h-5" />
              <span>You are Registered! (Click to cancel)</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Join Workshop (+{workshop.credits} Credits)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
