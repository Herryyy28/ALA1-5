import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Cloud, 
  Server, 
  ShieldCheck, 
  FileCheck2, 
  Gauge, 
  FlaskConical, 
  Network, 
  BarChart3, 
  Send, 
  FileDown, 
  Users, 
  UserCircle, 
  Settings as SettingsIcon,
  BookOpen
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { label: 'Overview', to: '/', icon: LayoutDashboard },
    { header: 'ALA PRACTICALS' },
    { label: 'ALA 1 – Cloud Deployment', to: '/ala/ALA-1', icon: Cloud },
    { label: 'ALA 2 – Virtualization', to: '/ala/ALA-2', icon: Server },
    { label: 'ALA 3 – Cloud Security', to: '/ala/ALA-3', icon: ShieldCheck },
    { label: 'ALA 4 – SLA & Risk Case Study', to: '/ala/ALA-4', icon: FileCheck2 },
    { label: 'ALA 5 – Performance Opt', to: '/ala/ALA-5', icon: Gauge },
    { header: 'PRACTICAL & RESEARCH' },
    { label: 'Practical Laboratory', to: '/practical-lab', icon: FlaskConical },
    { label: 'Architecture & Diagrams', to: '/architectures', icon: Network },
    { label: 'Results & Analytics', to: '/analytics', icon: BarChart3 },
    { label: 'Research Papers', to: '/research', icon: BookOpen },
    { header: 'MANAGEMENT & PORTAL' },
    { label: 'Submission Tracker', to: '/submissions', icon: Send },
    { label: 'Reports & Downloads', to: '/reports', icon: FileDown },
    { label: 'Student Directory', to: '/students', icon: Users },
    { label: 'Student Profile', to: '/profile', icon: UserCircle },
    { label: 'Settings & Cloud API', to: '/settings', icon: SettingsIcon },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E8EAF2] min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 flex-shrink-0">
      <div className="space-y-1">
        {navItems.map((item, index) => {
          if (item.header) {
            return (
              <div 
                key={`header-${index}`} 
                className="pt-4 pb-1 px-3 text-[10px] font-bold tracking-wider text-[#778198] uppercase"
              >
                {item.header}
              </div>
            );
          }

          const Icon = item.icon!;
          return (
            <NavLink
              key={item.to}
              to={item.to!}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#263B80] text-white shadow-sm shadow-[#263B80]/20'
                    : 'text-[#56627A] hover:bg-[#F7F8FC] hover:text-[#172033]'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* University Accreditation Footer Box */}
      <div className="mt-6 pt-4 border-t border-[#E8EAF2] text-[11px] text-[#778198]">
        <div className="p-3 bg-[#F7F8FC] rounded-xl border border-[#E8EAF2]">
          <p className="font-bold text-[#172033]">GMIU IT Department</p>
          <p className="text-[10px] mt-0.5">Cloud Computing (2026-27)</p>
          <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
            <span>Enr: 20230905090031</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
