import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dataService } from '../../services/dataService';
import { StudentProfile } from '../../types';
import { 
  GraduationCap, 
  Calendar, 
  UserCheck, 
  RotateCcw
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [profile, setProfile] = useState<StudentProfile>(dataService.getProfile());

  useEffect(() => {
    return dataService.subscribe(() => {
      setProfile(dataService.getProfile());
    });
  }, []);

  const handleReset = () => {
    if (window.confirm('Reset all ALA submissions back to Pending (initial state)?')) {
      dataService.resetSubmissions();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E8EAF2] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & University Brand */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#263B80] to-[#5269C9] flex items-center justify-center text-white shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-base tracking-tight text-[#172033]">GMIU Cloud Suite</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#263B80]/10 text-[#263B80]">
                    ALA 1-5
                  </span>
                </div>
                <p className="text-xs text-[#778198] hidden sm:block">Gyanmanjari Institute of Technology</p>
              </div>
            </Link>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Deadline Reminder */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#F7F8FC] border border-[#E8EAF2] text-xs font-medium text-[#172033]">
              <Calendar className="w-3.5 h-3.5 text-[#5269C9]" />
              <span>Due: <strong className="text-[#263B80]">30 Nov 2026</strong></span>
            </div>

            {/* Student Candidate Badge */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#E8EAF2] bg-[#F7F8FC] text-xs font-semibold text-[#263B80]">
              <UserCheck className="w-3.5 h-3.5 text-[#5269C9]" />
              <span>Student Candidate</span>
            </div>

            {/* Reset State Button */}
            <button
              onClick={handleReset}
              className="p-2 rounded-lg text-[#778198] hover:text-[#D94D59] hover:bg-red-50 transition-colors"
              title="Reset all submission statuses to Pending"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Student Profile Quick View */}
            <Link to="/profile" className="flex items-center space-x-3 pl-2 sm:border-l border-[#E8EAF2]">
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#5269C9]/30 shadow-sm flex-shrink-0 bg-[#263B80] flex items-center justify-center text-white font-bold text-xs">
                <img 
                  src={profile.avatar_url || '/profile_photo.png'} 
                  alt={profile.full_name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) target.parentElement.innerText = 'HP';
                  }}
                />
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-[#172033] leading-none">{profile.full_name}</p>
                <p className="text-[11px] font-mono text-[#778198] mt-1">{profile.enrollment_number}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
