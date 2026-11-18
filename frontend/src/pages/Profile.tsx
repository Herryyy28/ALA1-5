import React, { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';
import { StudentProfile } from '../types';
import { 
  UserCircle, 
  GraduationCap, 
  Mail, 
  Phone, 
  Calendar, 
  Building2, 
  ShieldCheck, 
  Clock, 
  Save, 
  CheckCircle2 
} from 'lucide-react';

export const Profile: React.FC = () => {
  const [profile, setProfile] = useState<StudentProfile>(dataService.getProfile());
  const [stats, setStats] = useState(dataService.getProgressStats());
  const [email, setEmail] = useState(profile.email || 'prajapatiherry.28@gmail.com');
  const [phone, setPhone] = useState(profile.phone || '+91 7486865058');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    return dataService.subscribe(() => {
      setProfile(dataService.getProfile());
      setStats(dataService.getProgressStats());
    });
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dataService.updateProfile({ email, phone });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      {/* Profile Banner */}
      <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-lg shadow-indigo-100 flex-shrink-0 border-2 border-[#263B80] bg-[#172033]">
          <img
            src={profile.avatar_url || '/profile_photo.png'}
            alt={profile.full_name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center sm:text-left space-y-1">
          <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#263B80] text-xs font-bold">
            <span>Verified Candidate</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#172033]">{profile.full_name}</h1>
          <p className="text-xs font-mono text-[#5269C9] font-bold">
            Enrollment No: {profile.enrollment_number}
          </p>
          <p className="text-xs text-[#778198]">
            {profile.department} &bull; {profile.university}
          </p>
        </div>
      </div>

      {/* Academic Credentials & Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
          <h3 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
            <GraduationCap className="w-4 h-4 text-[#263B80]" />
            <span>Academic Registry Details</span>
          </h3>

          <div className="space-y-3 text-xs text-[#56627A]">
            <div className="flex justify-between py-1.5 border-b border-[#E8EAF2]">
              <span className="text-[#778198]">Full Legal Name:</span>
              <strong className="text-[#172033]">{profile.full_name}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#E8EAF2]">
              <span className="text-[#778198]">Enrollment Number:</span>
              <strong className="font-mono text-[#263B80]">{profile.enrollment_number}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#E8EAF2]">
              <span className="text-[#778198]">Department:</span>
              <strong className="text-[#172033]">{profile.department}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#E8EAF2]">
              <span className="text-[#778198]">University:</span>
              <strong className="text-[#172033]">{profile.university}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#E8EAF2]">
              <span className="text-[#778198]">Academic Year:</span>
              <strong className="text-[#172033]">{profile.academic_year}</strong>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#778198]">Submission Deadline:</span>
              <strong className="text-amber-700">30 November 2026</strong>
            </div>
          </div>
        </div>

        {/* Contact & Preferences Update Form */}
        <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
          <h3 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
            <UserCircle className="w-4 h-4 text-[#5269C9]" />
            <span>Candidate Communication Profile</span>
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1">
                Institutional Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#E8EAF2] focus:border-[#263B80] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1">
                Contact Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#E8EAF2] focus:border-[#263B80] outline-none"
              />
            </div>

            {isSaved && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Profile preferences updated successfully!</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#263B80] hover:bg-[#1f2f66] text-white text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center space-x-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Contact Preferences</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
