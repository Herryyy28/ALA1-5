import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  Send, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  Upload, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Submissions: React.FC = () => {
  const [activities, setActivities] = useState(dataService.getActivities());
  const [submissions, setSubmissions] = useState(dataService.getSubmissions());
  const [profile, setProfile] = useState(dataService.getProfile());
  const [stats, setStats] = useState(dataService.getProgressStats());
  const [selectedAla, setSelectedAla] = useState('ALA-1');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return dataService.subscribe(() => {
      setActivities(dataService.getActivities());
      setSubmissions(dataService.getSubmissions());
      setProfile(dataService.getProfile());
      setStats(dataService.getProgressStats());
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      dataService.submitAla(selectedAla, notes);
      setIsSubmitting(false);
      setNotes('');
      // Fire celebration confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }, 600);
  };

  const handleReset = () => {
    if (window.confirm('Reset all submission records to Pending (0% completion)?')) {
      dataService.resetSubmissions();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold text-[#5269C9] uppercase tracking-wider mb-1">
              Submission Verification & Management
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#172033]">
              ALA Submission Tracker
            </h1>
            <p className="text-xs sm:text-sm text-[#778198] mt-1.5 leading-relaxed">
              Manage assignment states, submit practical evidence bundles, review faculty grades, and verify compliance with university deadlines.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 text-xs font-bold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All to Pending</span>
          </button>
        </div>

        {/* Progress Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2]">
            <span className="text-[10px] font-bold text-[#778198] uppercase">Completion</span>
            <h4 className="text-xl font-extrabold text-[#263B80] mt-0.5">{stats.percentage}%</h4>
          </div>
          <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2]">
            <span className="text-[10px] font-bold text-[#778198] uppercase">Submitted</span>
            <h4 className="text-xl font-extrabold text-[#16865B] mt-0.5">{stats.completed} of 5</h4>
          </div>
          <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2]">
            <span className="text-[10px] font-bold text-[#778198] uppercase">Pending</span>
            <h4 className="text-xl font-extrabold text-[#D99A2B] mt-0.5">{stats.pending} of 5</h4>
          </div>
          <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2]">
            <span className="text-[10px] font-bold text-[#778198] uppercase">Final Deadline</span>
            <h4 className="text-xs font-extrabold text-[#172033] mt-2">30 Nov 2026</h4>
          </div>
        </div>
      </div>

      {/* Main Grid: Submissions Table & Quick Submit Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions Status Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
          <h3 className="font-bold text-sm text-[#172033]">Five ALA Activity Status Table</h3>

          <div className="divide-y divide-[#E8EAF2]">
            {activities.map((act) => {
              const sub = submissions.find(s => s.ala_id === act.id);
              const status = sub ? sub.status : 'pending';

              return (
                <div key={act.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-[#263B80]">{act.id}</span>
                      <StatusBadge status={status} size="sm" />
                      {sub?.score && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                          {sub.score}/20 Marks
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-xs text-[#172033]">{act.title}</h4>
                    <p className="text-[11px] text-[#778198]">
                      {sub?.submission_date 
                        ? `Submitted on ${new Date(sub.submission_date).toLocaleString()}`
                        : 'No submission recorded yet.'}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/ala/${act.id}`}
                      className="px-3 py-1.5 rounded-lg border border-[#E8EAF2] hover:border-[#263B80] text-xs font-bold text-[#263B80] hover:bg-[#263B80] hover:text-white transition-all"
                    >
                      View Practical
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Submit Form Card */}
        <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
          <h3 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
            <Send className="w-4 h-4 text-[#263B80]" />
            <span>Fast Submission Form</span>
          </h3>
          <p className="text-xs text-[#778198]">
            Directly submit an ALA activity to update dashboard metrics and persist logs.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1">
                Select Activity
              </label>
              <select
                value={selectedAla}
                onChange={(e) => setSelectedAla(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#E8EAF2] font-bold focus:border-[#263B80] outline-none"
              >
                {activities.map(a => (
                  <option key={a.id} value={a.id}>{a.id} – {a.short_title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1">
                Implementation Summary / Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Briefly state your results, commands tested, and key observations..."
                className="w-full text-xs p-2.5 rounded-xl border border-[#E8EAF2] focus:border-[#263B80] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-xl bg-[#263B80] hover:bg-[#1f2f66] text-white text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? 'Recording Submission...' : `Mark ${selectedAla} Submitted`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
