import React, { useState } from 'react';
import { Mentor } from '../../types';
import { X, Calendar, Clock, Check, Sparkles, User, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookMentorModalProps {
  mentor: Mentor;
  onClose: () => void;
  onConfirmed: (slot: string, topic: string) => void;
}

export const BookMentorModal: React.FC<BookMentorModalProps> = ({
  mentor,
  onClose,
  onConfirmed,
}) => {
  const [selectedSlot, setSelectedSlot] = useState('Thursday 4:15 PM - 4:30 PM');
  const [selectedTopic, setSelectedTopic] = useState('Balancing 8.5+ CGPA with System Design Projects');
  const [notes, setNotes] = useState('Hi Rohan, I want advice on how to showcase my DBMS lab project in software engineering placement rounds.');
  const [isSuccess, setIsSuccess] = useState(false);

  const availableSlots = [
    'Thursday 4:15 PM - 4:30 PM (Clash-Free after OS Lab)',
    'Friday 1:30 PM - 1:45 PM (Post Lunch)',
    'Saturday 11:00 AM - 11:15 AM (Weekend Coffee Chat)',
  ];

  const topics = [
    'Balancing 8.5+ CGPA with System Design Projects',
    'Tier-1 Placement Tech Interview Strategy',
    'Resume Review & Project Highlighting',
    'Overcoming Coding Imposter Syndrome',
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      onConfirmed(selectedSlot, selectedTopic);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4 animate-fadeIn">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">15-Min Chat Confirmed!</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Google Meet invite sent to your student email. Rohan has received your preparation note.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 max-w-xs mx-auto border border-slate-200">
              <p className="font-bold">{selectedSlot}</p>
              <p className="text-slate-500 mt-0.5">{selectedTopic}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="space-y-5">
            <div className="flex items-center gap-3">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200"
              />
              <div>
                <h3 className="text-base font-bold text-slate-900">Book 15 Min with {mentor.name}</h3>
                <p className="text-xs text-slate-500">{mentor.title.split(',')[0]} · Alumni Class of &apos;21</p>
              </div>
            </div>

            <div className="p-3 bg-sky-50/70 border border-sky-100 rounded-xl text-xs text-sky-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Designed for Priya&apos;s schedule: Focused 15-minute high-yield mentorship slots.</span>
            </div>

            {/* Select Slot */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Choose a Clash-Free Time Slot
              </label>
              <div className="space-y-1.5">
                {availableSlots.map((slot) => (
                  <label
                    key={slot}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedSlot === slot
                        ? 'border-sky-500 bg-sky-50/60 font-semibold text-sky-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="slot"
                      value={slot}
                      checked={selectedSlot === slot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      className="text-sky-600 focus:ring-sky-500"
                    />
                    <span>{slot}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Select Topic */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Discussion Focus
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-sky-500/20"
              >
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Note */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Your Specific Question for Rohan
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Clock className="w-4 h-4" />
                <span>Confirm 15-Min Slot</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
