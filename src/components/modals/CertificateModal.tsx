import React from 'react';
import { X, Award, ShieldCheck, Printer, CheckCircle2, QrCode } from 'lucide-react';

interface CertificateModalProps {
  creditsEarned: number;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  creditsEarned,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Header Controls */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-sky-600" />
            <span className="text-sm font-bold text-slate-800">
              Official University Co-Curricular Activity Transcript
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Paper Sheet */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-slate-50">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border-4 border-double border-slate-300 shadow-sm space-y-6">
            {/* Institute Header */}
            <div className="text-center pb-4 border-b border-slate-200 space-y-1">
              <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                National Institute of Engineering &amp; Technology
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                VERIFIED SKILLS &amp; CO-CURRICULAR TRANSCRIPT
              </h2>
              <p className="text-xs text-slate-500">
                Issued by University Placement Cell &amp; Campus Skills Board
              </p>
            </div>

            {/* Student Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-xl text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Student Name</span>
                <span className="font-bold text-slate-800 text-sm">Priya Sharma</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Roll / Student ID</span>
                <span className="font-semibold text-slate-800">21CSE084</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Program</span>
                <span className="font-semibold text-slate-800">B.Tech (CSE) 3rd Year</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Cumulative GPA</span>
                <span className="font-bold text-sky-700 text-sm">8.92 / 10.0</span>
              </div>
            </div>

            {/* Transcript Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Earned Industry Competencies ({creditsEarned} / 60 Activity Credits)
              </h4>

              <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Program / Workshop Title</th>
                    <th className="p-2.5">Facilitator</th>
                    <th className="p-2.5">Verified Date</th>
                    <th className="p-2.5 text-right">Credits Awarded</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="p-2.5 font-medium text-slate-900">Build Your Career with AI Tools</td>
                    <td className="p-2.5">Rohan Mehta (Senior SDE)</td>
                    <td className="p-2.5">Apr 24, 2025</td>
                    <td className="p-2.5 text-right font-bold text-emerald-700">+10 Credits</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-slate-900">Effective Communication for Engineers</td>
                    <td className="p-2.5">Dr. Anita Roy</td>
                    <td className="p-2.5">Apr 26, 2025</td>
                    <td className="p-2.5 text-right font-bold text-emerald-700">+8 Credits</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-slate-900">Career Readiness &amp; Resume Building</td>
                    <td className="p-2.5">Vikas Sen (Campus Recruiter)</td>
                    <td className="p-2.5">Apr 28, 2025</td>
                    <td className="p-2.5 text-right font-bold text-emerald-700">+8 Credits</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-slate-900">Weekly Challenge: Portfolio Website</td>
                    <td className="p-2.5">Peer Review Board</td>
                    <td className="p-2.5">Apr 2025</td>
                    <td className="p-2.5 text-right font-bold text-emerald-700">+5 Credits</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-slate-900">Foundational Git &amp; Open Source Sprint</td>
                    <td className="p-2.5">Campus Tech Club</td>
                    <td className="p-2.5">Mar 2025</td>
                    <td className="p-2.5 text-right font-bold text-emerald-700">+14 Credits</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Verification Signatures & Stamp */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-300">
                  <QrCode className="w-8 h-8 text-slate-700" />
                </div>
                <div className="text-[11px] text-slate-500">
                  <p className="font-bold text-slate-800">Verification Hash: #CAMPUS-CS-98421</p>
                  <p>Digitally signed via Campus Skills Hub Ledger</p>
                </div>
              </div>

              <div className="text-center sm:text-right">
                <div className="inline-flex items-center gap-1 text-emerald-700 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded-md mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approved for Placement Day Priority</span>
                </div>
                <p className="text-[10px] text-slate-400">Dr. K. Srinivas · Dean of Student Affairs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
