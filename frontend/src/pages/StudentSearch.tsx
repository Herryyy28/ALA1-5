import React, { useState } from 'react';
import { REGISTERED_STUDENTS, RegisteredStudent } from '../data/studentsData';
import { Search, Users, CheckCircle2, AlertCircle, Sparkles, Filter } from 'lucide-react';

export const StudentSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'submitted' | 'pending'>('all');

  const filtered = REGISTERED_STUDENTS.filter(s => {
    const matchesQuery = s.id.toLowerCase().includes(query.toLowerCase()) || 
                         s.name.toLowerCase().includes(query.toLowerCase());
    if (!matchesQuery) return false;

    const count = (s.statusBitmask.match(/1/g) || []).length;
    if (filterMode === 'submitted') return count === 5;
    if (filterMode === 'pending') return count < 5;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
        <div>
          <div className="text-[11px] font-bold text-[#5269C9] uppercase tracking-wider mb-1">
            GMIU University Registry Database
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#172033]">
            Student Enrollment & ALA Status Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#778198] mt-1.5 leading-relaxed">
            Search through the official Gyanmanjari Innovative University Information Technology enrollment registry. Validate submission statuses across all five Cloud Computing ALAs.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
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
                {mode === 'all' ? 'All (96)' : mode === 'submitted' ? 'All 5 Done' : 'Pending'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-2xl border border-[#E8EAF2] shadow-card overflow-hidden">
        <div className="p-4 border-b border-[#E8EAF2] flex justify-between items-center text-xs font-bold text-[#778198]">
          <span>Showing {filtered.length} of {REGISTERED_STUDENTS.length} Students</span>
          <span>Academic Year: 2026-2027</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#E8EAF2] bg-[#F7F8FC] text-[#263B80] font-bold">
                <th className="p-3.5">Enrollment No.</th>
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5 text-center">ALA 1</th>
                <th className="p-3.5 text-center">ALA 2</th>
                <th className="p-3.5 text-center">ALA 3</th>
                <th className="p-3.5 text-center">ALA 4</th>
                <th className="p-3.5 text-center">ALA 5</th>
                <th className="p-3.5 text-right">Total Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EAF2]">
              {filtered.map((s) => {
                const isCurrent = s.id === '20230905090031';
                const count = (s.statusBitmask.match(/1/g) || []).length;

                return (
                  <tr 
                    key={s.id} 
                    className={`hover:bg-[#FDFDFE] transition-colors ${isCurrent ? 'bg-indigo-50/50 font-bold' : ''}`}
                  >
                    <td className="p-3.5 font-mono text-[#172033]">
                      <div className="flex items-center space-x-2">
                        <span>{s.id}</span>
                        {isCurrent && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#263B80] text-white">
                            YOU
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 font-semibold text-[#172033]">{s.name}</td>
                    {[0, 1, 2, 3, 4].map((idx) => {
                      const done = s.statusBitmask[idx] === '1';
                      return (
                        <td key={idx} className="p-3.5 text-center">
                          {done ? (
                            <span className="inline-flex items-center text-emerald-600 font-bold">
                              &#10003;
                            </span>
                          ) : (
                            <span className="inline-flex items-center text-amber-500 font-bold opacity-60">
                              &bull;
                            </span>
                          )}
                        </td>
                      );
                    })}
                    <td className="p-3.5 text-right font-bold text-[#172033]">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] ${
                        count === 5 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {count} of 5
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
