import React, { useState } from 'react';
import { dataService } from '../services/dataService';
import { isSupabaseConfigured } from '../services/supabaseClient';
import { 
  Settings as SettingsIcon, 
  Database, 
  ShieldCheck, 
  RotateCcw, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  Server
} from 'lucide-react';

export const Settings: React.FC = () => {
  const [profile] = useState(dataService.getProfile());
  const [showExportSuccess, setShowExportSuccess] = useState(false);

  const handleExportData = () => {
    const data = {
      profile: dataService.getProfile(),
      submissions: dataService.getSubmissions(),
      logs: dataService.getLogs(),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GMIU_ALA_Backup_${profile.enrollment_number}.json`;
    a.click();
    setShowExportSuccess(true);
    setTimeout(() => setShowExportSuccess(false), 3000);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all submission states and logs to default?')) {
      dataService.resetSubmissions();
      alert('Workspace reset complete.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-2">
        <div className="text-[11px] font-bold text-[#5269C9] uppercase tracking-wider">
          Configuration & Cloud Integration
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#172033]">
          System Settings & Cloud APIs
        </h1>
        <p className="text-xs sm:text-sm text-[#778198] leading-relaxed">
          Manage Supabase backend credentials, local storage state backups, and university submission parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Supabase Cloud Connection Card */}
        <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
              <Database className="w-4 h-4 text-[#263B80]" />
              <span>Supabase PostgreSQL Backend</span>
            </h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isSupabaseConfigured ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
            }`}>
              {isSupabaseConfigured ? 'Connected (Cloud)' : 'Local Offline Mode'}
            </span>
          </div>

          <p className="text-xs text-[#778198]">
            {isSupabaseConfigured
              ? 'Connected to live cloud PostgreSQL instance with Row Level Security active.'
              : 'Operating in self-contained local state mode with instant browser persistence and zero external dependencies.'}
          </p>

          <div className="p-3 bg-[#F7F8FC] rounded-xl border border-[#E8EAF2] space-y-1.5 text-xs font-mono text-[#56627A]">
            <div className="flex justify-between">
              <span>Host:</span>
              <strong className="text-[#172033]">{isSupabaseConfigured ? 'db.supabase.co' : 'browser.localStorage'}</strong>
            </div>
            <div className="flex justify-between">
              <span>RLS Security:</span>
              <strong className="text-emerald-700">Enforced (Student Isolation)</strong>
            </div>
            <div className="flex justify-between">
              <span>Sync Status:</span>
              <strong className="text-[#263B80]">Active & Resilient</strong>
            </div>
          </div>
        </div>

        {/* Local Storage & Backup Card */}
        <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
          <h3 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
            <Server className="w-4 h-4 text-[#5269C9]" />
            <span>State Backup & Diagnostics</span>
          </h3>

          <p className="text-xs text-[#778198]">
            Export complete submission records, activity logs, and evidence links as a JSON file or restore default pending states.
          </p>

          <div className="space-y-3 pt-1">
            <button
              onClick={handleExportData}
              className="w-full py-2.5 px-4 rounded-xl border border-[#E8EAF2] hover:border-[#263B80] bg-white text-xs font-bold text-[#263B80] hover:bg-[#F7F8FC] transition-all flex items-center justify-center space-x-2 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON State Backup</span>
            </button>

            <button
              onClick={handleResetData}
              className="w-full py-2.5 px-4 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-xs font-bold text-red-600 transition-all flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Records to Pending</span>
            </button>
          </div>

          {showExportSuccess && (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Backup file downloaded successfully!</span>
            </div>
          )}
        </div>
      </div>

      {/* University Metadata Card */}
      <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-3">
        <h4 className="font-bold text-xs text-[#263B80] uppercase tracking-wider">
          University & Environment Metadata
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#56627A]">
          <div className="p-3 bg-[#F7F8FC] rounded-xl border border-[#E8EAF2]">
            <span className="text-[10px] text-[#778198] block">Candidate</span>
            <strong className="text-[#172033]">{profile.full_name}</strong>
          </div>
          <div className="p-3 bg-[#F7F8FC] rounded-xl border border-[#E8EAF2]">
            <span className="text-[10px] text-[#778198] block">Enrollment</span>
            <strong className="font-mono text-[#263B80]">{profile.enrollment_number}</strong>
          </div>
          <div className="p-3 bg-[#F7F8FC] rounded-xl border border-[#E8EAF2]">
            <span className="text-[10px] text-[#778198] block">Department</span>
            <strong className="text-[#172033]">Information Technology</strong>
          </div>
          <div className="p-3 bg-[#F7F8FC] rounded-xl border border-[#E8EAF2]">
            <span className="text-[10px] text-[#778198] block">Academic Year</span>
            <strong className="text-[#172033]">2026-2027</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
