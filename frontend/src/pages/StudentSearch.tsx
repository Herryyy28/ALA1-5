import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { RegisteredStudent } from '../data/studentsData';
import { 
  Search, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Filter, 
  RotateCw, 
  Activity, 
  Clock, 
  ExternalLink,
  X,
  Send,
  Calendar,
  Layers
} from 'lucide-react';

export const StudentSearch: React.FC = () => {
  const [students, setStudents] = useState<RegisteredStudent[]>(dataService.getRegisteredStudents());
  const [query, setQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'submitted' | 'pending'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [selectedStudent, setSelectedStudent] = useState<RegisteredStudent | null>(null);

  // Subscribe to real-time changes in dataService
  useEffect(() => {
    return dataService.subscribe(() => {
      setStudents(dataService.getRegisteredStudents());
    });
  }, []);

  // Real-time periodic auto-refresh timer (every 15 seconds when active)
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      handleRefreshData(false);
    }, 15000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleRefreshData = async (showSpinner = true) => {
    if (showSpinner) setIsRefreshing(true);
    try {
      await dataService.refreshStudentRegistry();
      setStudents(dataService.getRegisteredStudents());
      setLastRefreshed(new Date());
    } finally {
      if (showSpinner) {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  };

  const filtered = students.filter(s => {
    const matchesQuery = s.id.toLowerCase().includes(query.toLowerCase()) || 
                         s.name.toLowerCase().includes(query.toLowerCase());
    if (!matchesQuery) return false;

    const count = (s.statusBitmask.match(/1/g) || []).length;
    if (filterMode === 'submitted') return count === 5;
    if (filterMode === 'pending') return count < 5;
    return true;
  });

  const totalCompletedCount = students.filter(s => (s.statusBitmask.match(/1/g) || []).length === 5).length;
  const totalPendingCount = students.length - totalCompletedCount;

  const alaLabels = [
    { id: 'ALA-1', title: 'Cloud Application Deployment' },
    { id: 'ALA-2', title: 'Virtualization using VirtualBox' },
    { id: 'ALA-3', title: 'Cloud Security Features Review' },
    { id: 'ALA-4', title: 'Cloud SLA & Risk Management' },
    { id: 'ALA-5', title: 'Performance Optimization' },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto pb-12">
      {/* 1. TITLE & REAL-TIME REFRESH CONTROLS */}
      <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-bold text-[#5269C9] uppercase tracking-wider mb-1">
              <span>GMIU University Registry Database</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#16865B] animate-pulse" />
              <span className="text-[#16865B] font-bold">Live Synced</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#172033]">
              Student Enrollment & Real-Time Directory
            </h1>
            <p className="text-xs sm:text-sm text-[#778198] mt-1 leading-relaxed">
              Live status across all 96 Information Technology classmates. Reflects practical submissions and university verification in real time.
            </p>
          </div>

          {/* Real-time Refresh Buttons & Indicators */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                autoRefresh
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-gray-50 text-gray-500 border-gray-200'
              }`}
              title="Toggle automatic periodic synchronization"
            >
              <span className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-emerald-500 animate-ping' : 'bg-gray-400'}`} />
              <span>{autoRefresh ? 'Live Polling: 15s' : 'Auto-Sync Paused'}</span>
            </button>

            <button
              onClick={() => handleRefreshData(true)}
              disabled={isRefreshing}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#263B80] hover:bg-[#1f2f66] text-white text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Syncing...' : 'Refresh Now'}</span>
            </button>
          </div>
        </div>

        {/* Real-time Registry Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 bg-[#F7F8FC] rounded-xl border border-[#E8EAF2]">
            <span className="text-[10px] font-bold text-[#778198] uppercase">Total Enrolled</span>
            <h4 className="text-lg font-extrabold text-[#172033] mt-0.5">{students.length} Students</h4>
          </div>
          <div className="p-3 bg-[#F7F8FC] rounded-xl border border-[#E8EAF2]">
            <span className="text-[10px] font-bold text-[#778198] uppercase">All 5 Submitted</span>
            <h4 className="text-lg font-extrabold text-[#16865B] mt-0.5">{totalCompletedCount} Students</h4>
          </div>
          <div className="p-3 bg-[#F7F8FC] rounded-xl border border-[#E8EAF2]">
            <span className="text-[10px] font-bold text-[#778198] uppercase">Submissions Pending</span>
            <h4 className="text-lg font-extrabold text-[#D99A2B] mt-0.5">{totalPendingCount} Students</h4>
          </div>
          <div className="p-3 bg-[#F7F8FC] rounded-xl border border-[#E8EAF2]">
            <span className="text-[10px] font-bold text-[#778198] uppercase">Last Real-Time Refresh</span>
            <h4 className="text-xs font-extrabold text-[#263B80] mt-1.5 font-mono">
              {lastRefreshed.toLocaleTimeString()}
            </h4>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-[#E8EAF2]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#778198] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by enrollment number (e.g. 20230905090031) or student name..."
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-[#E8EAF2] focus:border-[#263B80] focus:ring-1 focus:ring-[#263B80] outline-none"
            />
          </div>

          <div className="inline-flex rounded-xl p-1 bg-[#F7F8FC] border border-[#E8EAF2]">
            {(['all', 'submitted', 'pending'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
                  filterMode === mode
                    ? 'bg-[#263B80] text-white shadow-sm'
                    : 'text-[#778198] hover:text-[#172033]'
                }`}
              >
                {mode === 'all' ? `All (${students.length})` : mode === 'submitted' ? `All 5 Done (${totalCompletedCount})` : `Pending (${totalPendingCount})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. DIRECTORY TABLE */}
      <div className="bg-white rounded-2xl border border-[#E8EAF2] shadow-card overflow-hidden">
        <div className="p-4 border-b border-[#E8EAF2] flex justify-between items-center text-xs font-bold text-[#778198]">
          <span>Showing {filtered.length} of {students.length} Students</span>
          <span className="text-[11px] font-mono text-[#5269C9]">Click any row for detailed submission modal</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#E8EAF2] bg-[#F7F8FC] text-[#263B80] font-bold">
                <th className="p-3.5">Enrollment No.</th>
                <th className="p-3.5">Student Full Name</th>
                <th className="p-3.5 text-center">ALA 1</th>
                <th className="p-3.5 text-center">ALA 2</th>
                <th className="p-3.5 text-center">ALA 3</th>
                <th className="p-3.5 text-center">ALA 4</th>
                <th className="p-3.5 text-center">ALA 5</th>
                <th className="p-3.5 text-right">Total Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EAF2]">
              {filtered.map((s) => {
                const isCurrent = s.id === '20230905090031';
                const count = (s.statusBitmask.match(/1/g) || []).length;

                return (
                  <tr 
                    key={s.id}
                    onClick={() => setSelectedStudent(s)}
                    className={`cursor-pointer transition-colors ${
                      isCurrent 
                        ? 'bg-indigo-50/70 hover:bg-indigo-100/60 font-semibold' 
                        : 'hover:bg-[#F7F8FC]'
                    }`}
                  >
                    <td className="p-3.5 font-mono text-[#172033]">
                      <div className="flex items-center space-x-2">
                        <span>{s.id}</span>
                        {isCurrent && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#263B80] text-white">
                            YOU
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 text-[#172033] font-bold">
                      {s.name}
                    </td>
                    {[0, 1, 2, 3, 4].map((idx) => {
                      const done = s.statusBitmask[idx] === '1';
                      return (
                        <td key={idx} className="p-3.5 text-center">
                          {done ? (
                            <span className="inline-flex items-center text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                              &#10003; Done
                            </span>
                          ) : (
                            <span className="inline-flex items-center text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 text-[10px]">
                              Pending
                            </span>
                          )}
                        </td>
                      );
                    })}
                    <td className="p-3.5 text-right font-bold text-[#172033]">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] ${
                        count === 5 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {count} of 5 Submitted
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. STUDENT DETAIL MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-[#E8EAF2] shadow-2xl p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5269C9] bg-indigo-50 px-2 py-0.5 rounded">
                    Student Submission Record
                  </span>
                  {selectedStudent.id === '20230905090031' && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#263B80] text-white">
                      YOUR PROFILE
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-extrabold text-[#172033] mt-1">
                  {selectedStudent.name}
                </h3>
                <p className="text-xs font-mono text-[#778198]">
                  Enrollment: {selectedStudent.id} &bull; Information Technology &bull; GMIU
                </p>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 rounded-lg text-[#778198] hover:text-[#172033] hover:bg-[#F7F8FC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Five ALA Breakdown List */}
            <div className="space-y-2.5">
              {alaLabels.map((ala, idx) => {
                const done = selectedStudent.statusBitmask[idx] === '1';
                return (
                  <div key={ala.id} className="p-3 rounded-xl border border-[#E8EAF2] bg-[#F7F8FC] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#263B80]">{ala.id}</span>
                      <p className="text-xs text-[#56627A] font-medium">{ala.title}</p>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                      done 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {done ? '&#10003; Submitted' : 'Pending Submission'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-[#778198] flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Due Date: 30 Nov 2026</span>
              </span>

              {selectedStudent.id === '20230905090031' ? (
                <Link
                  to="/submissions"
                  className="px-4 py-2 rounded-xl bg-[#263B80] hover:bg-[#1f2f66] text-white text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit / Update ALAs</span>
                </Link>
              ) : (
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#172033] text-xs font-bold"
                >
                  Close View
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
