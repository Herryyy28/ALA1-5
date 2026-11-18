import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { StatusBadge } from '../components/common/StatusBadge';
import { PdfReportGenerator } from '../services/pdfGenerator';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileDown, 
  Calendar, 
  ArrowRight, 
  Play, 
  ExternalLink,
  ShieldCheck,
  Server,
  Cloud,
  Gauge,
  FileCheck2,
  Sparkles,
  Info
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [profile, setProfile] = useState(dataService.getProfile());
  const [activities, setActivities] = useState(dataService.getActivities());
  const [submissions, setSubmissions] = useState(dataService.getSubmissions());
  const [stats, setStats] = useState(dataService.getProgressStats());
  const [logs, setLogs] = useState(dataService.getLogs());
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    return dataService.subscribe(() => {
      setProfile(dataService.getProfile());
      setActivities(dataService.getActivities());
      setSubmissions(dataService.getSubmissions());
      setStats(dataService.getProgressStats());
      setLogs(dataService.getLogs());
    });
  }, []);

  const handleDownloadCombined = () => {
    setIsGeneratingPdf(true);
    try {
      const doc = PdfReportGenerator.generateCombinedPortfolio(profile);
      doc.save(`GMIU_Cloud_Computing_Complete_Portfolio_${profile.enrollment_number}.pdf`);
    } catch (err) {
      console.error('PDF Generation failed:', err);
      alert('PDF generation error. Check console for details.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDownloadIndividual = (alaId: string) => {
    const act = activities.find(a => a.id === alaId);
    if (!act) return;
    try {
      const doc = PdfReportGenerator.generateIndividualReport(act, profile);
      doc.save(`GMIU_${alaId}_Report_${profile.enrollment_number}.pdf`);
    } catch (err) {
      console.error('Error generating report:', err);
    }
  };

  const getAlaStatus = (alaId: string) => {
    const sub = submissions.find(s => s.ala_id === alaId);
    return sub ? sub.status : 'pending';
  };

  const getAlaIcon = (id: string) => {
    switch (id) {
      case 'ALA-1': return Cloud;
      case 'ALA-2': return Server;
      case 'ALA-3': return ShieldCheck;
      case 'ALA-4': return FileCheck2;
      case 'ALA-5': return Gauge;
      default: return Cloud;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. WELCOME BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#263B80] via-[#354ea6] to-[#5269C9] text-white p-6 sm:p-8 shadow-card">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white/90">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Gyanmanjari Institute of Technology (GMIU) &bull; Department of IT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {profile.full_name}
            </h1>
            <p className="text-sm text-indigo-100 max-w-2xl">
              Cloud Computing Practical Suite (ALA 1–5). Complete all five activities, verify genuine practical evidence, and generate submission-ready university reports.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-indigo-100">
              <div>
                <span className="opacity-75">Enrollment:</span>{' '}
                <strong className="font-mono text-white bg-black/20 px-2 py-0.5 rounded">{profile.enrollment_number}</strong>
              </div>
              <div>
                <span className="opacity-75">Academic Year:</span>{' '}
                <strong className="text-white">{profile.academic_year}</strong>
              </div>
              <div className="flex items-center space-x-1.5 text-amber-200 font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span>Deadline: 30 November 2026</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDownloadCombined}
              disabled={isGeneratingPdf}
              className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-white text-[#263B80] font-bold text-xs shadow-lg hover:bg-indigo-50 transition-all active:scale-95 disabled:opacity-50"
            >
              <FileDown className="w-4 h-4" />
              <span>{isGeneratingPdf ? 'Compiling PDF...' : 'Download Full Portfolio PDF'}</span>
            </button>
            <Link
              to="/submissions"
              className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs transition-all active:scale-95"
            >
              <span>Manage Submissions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Ambient background decorative circles */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-1/3 -top-10 w-48 h-48 bg-indigo-400/10 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* 2. PROGRESS METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Overall Progress */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8EAF2] shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#778198] uppercase tracking-wider">Overall Progress</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172033] mt-1">{stats.percentage}%</h3>
            <p className="text-xs text-[#778198] mt-1">{stats.completed} of {stats.total} ALAs Submitted</p>
          </div>
          <div className="w-14 h-14 rounded-full border-4 border-[#E8EAF2] border-t-[#263B80] flex items-center justify-center text-xs font-bold text-[#263B80]">
            {stats.percentage}%
          </div>
        </div>

        {/* Metric 2: Completed / Submitted */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8EAF2] shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#778198] uppercase tracking-wider">Submitted / Verified</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#16865B] mt-1">{stats.completed}</h3>
            <p className="text-xs text-[#778198] mt-1">{stats.verified} evaluated by faculty</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16865B] flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3: Pending */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8EAF2] shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#778198] uppercase tracking-wider">Pending Activities</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#D99A2B] mt-1">{stats.pending}</h3>
            <p className="text-xs text-[#778198] mt-1">Due before 30 Nov 2026</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#D99A2B] flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4: Academic Weightage */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8EAF2] shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#778198] uppercase tracking-wider">Total Weightage</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#5269C9] mt-1">100%</h3>
            <p className="text-xs text-[#778198] mt-1">5 Activities &times; 20% each</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-[#5269C9] flex items-center justify-center">
            <Gauge className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 3. FIVE ALA ACTIVITY CARDS */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-lg font-bold text-[#172033]">Cloud Computing ALA Practicals</h2>
            <p className="text-xs text-[#778198]">Five independent practical projects for university examination and portfolio submission</p>
          </div>
          <span className="text-xs font-medium text-[#778198]">
            {stats.completed} of {stats.total} activities submitted
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((ala) => {
            const status = getAlaStatus(ala.id);
            const Icon = getAlaIcon(ala.id);

            return (
              <div 
                key={ala.id}
                className="bg-white rounded-2xl border border-[#E8EAF2] shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-5 space-y-4">
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2] text-[#263B80] group-hover:bg-[#263B80] group-hover:text-white transition-colors flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#263B80]">{ala.id}</span>
                        <p className="text-xs font-medium text-[#778198]">{ala.category}</p>
                      </div>
                    </div>
                    <StatusBadge status={status} size="sm" />
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-bold text-sm text-[#172033] line-clamp-1 group-hover:text-[#263B80] transition-colors">
                      {ala.title}
                    </h3>
                    <p className="text-xs text-[#778198] mt-1 line-clamp-2">
                      {ala.description}
                    </p>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ala.technologies.slice(0, 3).map((tech, i) => (
                      <span 
                        key={i} 
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F7F8FC] text-[#56627A] border border-[#E8EAF2]"
                      >
                        {tech}
                      </span>
                    ))}
                    {ala.technologies.length > 3 && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-[#F7F8FC] text-[#778198]">
                        +{ala.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 bg-[#FAFAFC] border-t border-[#E8EAF2] flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleDownloadIndividual(ala.id)}
                    className="p-2 rounded-lg text-[#778198] hover:text-[#263B80] hover:bg-white transition-colors"
                    title={`Download ${ala.id} PDF Report`}
                  >
                    <FileDown className="w-4 h-4" />
                  </button>

                  <Link
                    to={`/ala/${ala.id}`}
                    className="flex-1 inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E8EAF2] hover:border-[#263B80] text-xs font-bold text-[#263B80] hover:bg-[#263B80] hover:text-white transition-all shadow-sm"
                  >
                    <span>Open Practical</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. PRACTICAL LABORATORY & QUICK ACTION LAUNCHERS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E8EAF2] shadow-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#172033]">Practical Demonstration Laboratory</h3>
              <p className="text-xs text-[#778198]">Direct access to interactive diagnostic tools and practical simulations</p>
            </div>
            <Link to="/practical-lab" className="text-xs font-bold text-[#263B80] hover:underline flex items-center space-x-1">
              <span>View All Labs</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link 
              to="/practical-lab" 
              className="p-4 rounded-xl border border-[#E8EAF2] hover:border-[#5269C9] bg-[#F7F8FC] hover:bg-white transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#263B80] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#172033]">Locust Load Tester</h4>
                  <p className="text-[11px] text-[#778198]">10, 50, 100 user benchmarks</p>
                </div>
              </div>
            </Link>

            <Link 
              to="/ala/ALA-2" 
              className="p-4 rounded-xl border border-[#E8EAF2] hover:border-[#5269C9] bg-[#F7F8FC] hover:bg-white transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 text-[#5269C9] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#172033]">Host & VM Diagnostics</h4>
                  <p className="text-[11px] text-[#778198]">CPU VT-x, RAM, VBoxManage</p>
                </div>
              </div>
            </Link>

            <Link 
              to="/ala/ALA-3" 
              className="p-4 rounded-xl border border-[#E8EAF2] hover:border-[#5269C9] bg-[#F7F8FC] hover:bg-white transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-[#16865B] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#172033]">Security Matrix Explorer</h4>
                  <p className="text-[11px] text-[#778198]">AWS vs Azure vs GCP IAM & KMS</p>
                </div>
              </div>
            </Link>

            <Link 
              to="/architectures" 
              className="p-4 rounded-xl border border-[#E8EAF2] hover:border-[#5269C9] bg-[#F7F8FC] hover:bg-white transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-purple-100 text-[#8065D9] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#172033]">System Architectures</h4>
                  <p className="text-[11px] text-[#778198]">High-res diagrams & topologies</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Activity Logs Stream */}
        <div className="bg-white rounded-2xl border border-[#E8EAF2] shadow-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-[#172033]">Recent Activity</h3>
              <span className="text-[10px] font-mono text-[#778198]">Live Session</span>
            </div>

            <div className="space-y-3">
              {logs.slice(0, 4).map((log) => (
                <div key={log.id} className="flex items-start space-x-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-[#5269C9] mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-[#172033] leading-tight">{log.action}</p>
                    <p className="text-[#778198] text-[11px] mt-0.5">{log.details}</p>
                    <p className="text-[10px] text-[#778198] opacity-75 mt-0.5">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E8EAF2] text-[11px] text-[#778198] flex items-center justify-between">
            <span>Student: Herry Prajapati</span>
            <span className="font-mono">20230905090031</span>
          </div>
        </div>
      </div>
    </div>
  );
};
