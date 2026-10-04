import React, { useState } from 'react';
import { Mentor } from '../../types';
import { X, Send, CheckCircle2, Sparkles, User } from 'lucide-react';

interface MentorChatModalProps {
  mentor: Mentor;
  onClose: () => void;
  onBookSlot: () => void;
}

interface Message {
  id: string;
  sender: 'priya' | 'rohan';
  text: string;
  time: string;
}

export const MentorChatModal: React.FC<MentorChatModalProps> = ({
  mentor,
  onClose,
  onBookSlot,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'rohan',
      text: "Hi Priya! I saw you're interested in tomorrow's AI Tools workshop. As a CSE alum, I know 3rd year coursework feels intense, but this 2-hour session is built around practical tools that save 10+ hours on your semester project!",
      time: '10:15 AM',
    },
    {
      id: '2',
      sender: 'priya',
      text: "Thanks Rohan! I was nervous about whether taking time for workshops would hurt my revision for next week's DBMS internal exam.",
      time: '10:18 AM',
    },
    {
      id: '3',
      sender: 'rohan',
      text: "Totally get that! The workshop finishes at 4:00 PM and awards 10 activity points that count toward your Degree Honors. Plus, we actually cover automated test generation which is in your 6th sem syllabus.",
      time: '10:20 AM',
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'priya',
      text: inputText.trim(),
      time: 'Just now',
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Quick realistic mentor reply
    setTimeout(() => {
      const replyMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'rohan',
        text: "Great question! Let's also do a quick 15-min 1-on-1 after tomorrow's session to review your resume bullets. You're doing great on credits (45/60 already!).",
        time: 'Just now',
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full h-[600px] flex flex-col shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-slate-900">{mentor.name}</h3>
                <span className="text-[10px] text-sky-700 bg-sky-100 font-bold px-1.5 py-0.2 rounded">Alumni SDE</span>
              </div>
              <p className="text-[11px] text-slate-500">Typically replies within 30 mins</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onBookSlot}
              className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-lg hover:bg-sky-100 transition-colors"
            >
              Book 15 Min
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3 bg-white">
          <div className="text-center py-2">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-100 px-2.5 py-0.5 rounded-full">
              Encrypted Alumni-Student Channel
            </span>
          </div>

          {messages.map((msg) => {
            const isMe = msg.sender === 'priya';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isMe
                      ? 'bg-sky-600 text-white rounded-br-xs'
                      : 'bg-slate-100 text-slate-800 rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
              </div>
            );
          })}
        </div>

        {/* Input Footer */}
        <form onSubmit={handleSend} className="p-3.5 border-t border-slate-200 bg-slate-50 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message to Rohan..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
          />
          <button
            type="submit"
            className="p-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-xs transition-colors shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
