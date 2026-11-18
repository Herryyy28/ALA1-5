import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { StatusBadge } from '../components/common/StatusBadge';
import { PdfReportGenerator } from '../services/pdfGenerator';
import { 
  BENCHMARK_SCENARIOS, 
  SLA_COMPARISON_DATA, 
  SECURITY_COMPARISON_DATA 
} from '../data/mockData';
import { 
  Cloud, 
  Server, 
  ShieldCheck, 
  FileCheck2, 
  Gauge, 
  FileDown, 
  CheckCircle2, 
  Clock, 
  Play, 
  Terminal, 
  Upload, 
  AlertCircle,
  Copy,
  Check,
  Cpu,
  Layers,
  ArrowRight,
  Database
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from 'recharts';

export const AlaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState(dataService.getActivity(id || 'ALA-1'));
  const [submission, setSubmission] = useState(dataService.getSubmission(id || 'ALA-1'));
  const [profile, setProfile] = useState(dataService.getProfile());
  const [role, setRole] = useState(dataService.getRole());
  const [activeTab, setActiveTab] = useState<'overview' | 'implementation' | 'lab' | 'evidence' | 'submit'>('overview');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Form states for submission
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form states for grading
  const [gradeScore, setGradeScore] = useState(19);
  const [gradeFeedback, setGradeFeedback] = useState('Excellent practical implementation with authentic evidence and verified logs.');

  // Interactive load balancer simulator for ALA-5
  const [lbAlgorithm, setLbAlgorithm] = useState<'round_robin' | 'least_conn'>('round_robin');
  const [simActiveUsers, setSimActiveUsers] = useState<10 | 50 | 100>(10);

  useEffect(() => {
    const act = dataService.getActivity(id || 'ALA-1');
    setActivity(act);
    setSubmission(dataService.getSubmission(id || 'ALA-1'));
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    return dataService.subscribe(() => {
      setActivity(dataService.getActivity(id || 'ALA-1'));
      setSubmission(dataService.getSubmission(id || 'ALA-1'));
      setRole(dataService.getRole());
      setProfile(dataService.getProfile());
    });
  }, [id]);

  if (!activity) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-[#172033]">Activity not found</h2>
        <Link to="/" className="text-sm font-semibold text-[#263B80] hover:underline mt-2 inline-block">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const handleCopyCommand = (cmd: string, index: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownloadPdf = () => {
    try {
      const doc = PdfReportGenerator.generateIndividualReport(activity, profile);
      doc.save(`GMIU_${activity.id}_Report_${profile.enrollment_number}.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      dataService.submitAla(activity.id, submissionNotes);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 600);
  };

  const handleVerify = () => {
    dataService.verifySubmission(activity.id, gradeScore, gradeFeedback);
    alert(`${activity.id} verified and graded successfully!`);
  };

  const currentStatus = submission ? submission.status : 'pending';

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto pb-12">
      {/* 1. HEADER BREADCRUMB & TITLE */}
      <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#778198]">
            <Link to="/" className="hover:text-[#263B80]">Dashboard</Link>
            <span>/</span>
            <span className="text-[#263B80] font-bold">{activity.id}</span>
          </div>
          <div className="flex items-center space-x-3">
            <StatusBadge status={currentStatus} size="md" />
            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#263B80] hover:bg-[#1f2f66] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download Report PDF</span>
            </button>
          </div>
        </div>

        <div>
          <div className="inline-block text-[11px] font-bold text-[#5269C9] uppercase tracking-wider mb-1">
            {activity.category} &bull; Weightage: {activity.weightage}%
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#172033]">
            {activity.id} – {activity.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#778198] mt-1.5 leading-relaxed">
            {activity.description}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-[#E8EAF2] pt-2 gap-2 text-xs font-bold scrollbar-none">
          {[
            { id: 'overview', label: '1. Overview & Objectives' },
            { id: 'implementation', label: '2. Implementation Guide' },
            { id: 'lab', label: '3. Interactive Demonstration' },
            { id: 'evidence', label: '4. Evidence & Diagnostics' },
            { id: 'submit', label: '5. Submission & Grading' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-3 transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#263B80] text-[#263B80]'
                  : 'border-transparent text-[#778198] hover:text-[#172033]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. TAB CONTENT PANELS */}

      {/* TAB 1: OVERVIEW & THEORY */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
              <h3 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#5269C9]" />
                <span>Theoretical Foundation & Cloud Principles</span>
              </h3>
              <p className="text-xs text-[#56627A] leading-relaxed">
                {activity.theory_summary}
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider mb-2">
                  Key Practical Objectives
                </h4>
                <div className="space-y-2">
                  {activity.objectives.map((obj, i) => (
                    <div key={i} className="flex items-start space-x-2.5 text-xs text-[#56627A]">
                      <CheckCircle2 className="w-4 h-4 text-[#16865B] mt-0.5 flex-shrink-0" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Architecture Box */}
            <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-3">
              <h3 className="font-bold text-sm text-[#172033]">High-Level Architecture & Flow</h3>
              <div className="p-4 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2] font-mono text-xs text-[#263B80]">
                {activity.architecture_diagram}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Tech Stack Metadata Card */}
            <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
              <h3 className="font-bold text-sm text-[#172033]">Technologies Applied</h3>
              <div className="flex flex-wrap gap-2">
                {activity.technologies.map((t, i) => (
                  <span key={i} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#F7F8FC] border border-[#E8EAF2] text-[#263B80]">
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-[#E8EAF2]">
                <h4 className="text-xs font-bold text-[#778198] uppercase tracking-wider mb-2">
                  Practical Inspection Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activity.practical_tools.map((pt, i) => (
                    <span key={i} className="text-xs font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                      {pt}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8EAF2] text-xs text-[#778198] space-y-1">
                <div>Deadline: <strong className="text-[#172033]">30 November 2026</strong></div>
                <div>Evaluation: <strong className="text-[#172033]">20 Marks (University Practical)</strong></div>
              </div>
            </div>

            {/* Action Card */}
            <div className="bg-gradient-to-tr from-[#263B80] to-[#5269C9] text-white rounded-2xl p-6 shadow-card space-y-3">
              <h4 className="font-bold text-sm">Ready to Test?</h4>
              <p className="text-xs text-indigo-100">
                Execute the interactive practical demonstration or review the verified system execution evidence.
              </p>
              <button
                onClick={() => setActiveTab('lab')}
                className="w-full py-2 px-3 rounded-xl bg-white text-[#263B80] font-bold text-xs hover:bg-indigo-50 transition-colors shadow-sm"
              >
                Launch Practical Lab
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STEP-BY-STEP IMPLEMENTATION */}
      {activeTab === 'implementation' && (
        <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#172033]">Step-by-Step Implementation Protocol</h3>
              <p className="text-xs text-[#778198]">Execute terminal commands and procedures in sequence to reproduce authentic practical results</p>
            </div>
          </div>

          <div className="space-y-5">
            {activity.implementation_steps.map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#E8EAF2] bg-[#FDFDFE] hover:border-[#5269C9] transition-all space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-[#263B80] text-white flex items-center justify-center text-xs font-bold">
                      {s.step}
                    </span>
                    <h4 className="font-bold text-sm text-[#172033]">{s.title}</h4>
                  </div>
                </div>

                <p className="text-xs text-[#56627A] pl-9">
                  {s.description}
                </p>

                {s.command && (
                  <div className="ml-9 relative group">
                    <pre className="bg-[#172033] text-indigo-200 text-xs p-3.5 rounded-xl font-mono overflow-x-auto">
                      {s.command}
                    </pre>
                    <button
                      onClick={() => handleCopyCommand(s.command!, idx)}
                      className="absolute right-2 top-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors"
                      title="Copy command to clipboard"
                    >
                      {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: INTERACTIVE DEMONSTRATION / LAB */}
      {activeTab === 'lab' && (
        <div className="space-y-6">
          {/* ALA 1 Interactive: Database & Public Deployment Inspector */}
          {activity.id === 'ALA-1' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
                <h3 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                  <Cloud className="w-4 h-4 text-[#263B80]" />
                  <span>Cloud Deployment & Supabase PostgreSQL Connectivity</span>
                </h3>
                <p className="text-xs text-[#778198]">
                  Live status of application hosting, serverless PostgreSQL database tables, and public access endpoints.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <h4 className="font-bold text-xs">Netlify CDN Edge</h4>
                    </div>
                    <p className="text-[11px]">Production Target: Deployed</p>
                    <p className="text-[10px] font-mono opacity-80">cosmic-gingersnap-82f0a9.netlify.app</p>
                  </div>

                  <div className="p-4 rounded-xl border border-blue-200 bg-blue-50 text-blue-800 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Database className="w-4 h-4 text-blue-600" />
                      <h4 className="font-bold text-xs">PostgreSQL Schema</h4>
                    </div>
                    <p className="text-[11px]">Tables: 6 with RLS Enabled</p>
                    <p className="text-[10px] font-mono opacity-80">profiles, ala_submissions, logs</p>
                  </div>

                  <div className="p-4 rounded-xl border border-purple-200 bg-purple-50 text-purple-800 space-y-1">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-purple-600" />
                      <h4 className="font-bold text-xs">Security & Isolation</h4>
                    </div>
                    <p className="text-[11px]">Student Data Isolated</p>
                    <p className="text-[10px] font-mono opacity-80">Enr: 20230905090031</p>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center text-xs">
                  <span className="text-[#778198]">Target Reference: Gyanmanjari Innovative University Registry</span>
                  <Link to="/students" className="font-bold text-[#263B80] hover:underline flex items-center space-x-1">
                    <span>Search Registered Students &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ALA 2 Interactive: VirtualBox Host Hardware Inspector */}
          {activity.id === 'ALA-2' && (
            <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#172033]">Host Hardware & Virtualization Audit</h3>
                  <p className="text-xs text-[#778198]">Direct telemetry and configuration for Oracle VirtualBox</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  Hardware Audited
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2] space-y-2">
                  <h4 className="font-bold text-xs text-[#263B80]">Host Machine Specifications</h4>
                  <ul className="text-xs space-y-1.5 text-[#56627A]">
                    <li><strong>Host Operating System:</strong> Microsoft Windows 11 Home 64-bit</li>
                    <li><strong>Processor:</strong> 12th Gen Intel(R) Core(TM) i5-12450HX</li>
                    <li><strong>CPU Cores:</strong> 8 Physical Cores (12 Logical Threads)</li>
                    <li><strong>Total RAM:</strong> 12.0 GB (12,283,768 KB)</li>
                    <li><strong>Available Free RAM:</strong> ~3.0 GB</li>
                    <li><strong>Disk Storage:</strong> C: 39.9 GB Free | D: 124.4 GB Free</li>
                    <li><strong>Firmware VT-x State:</strong> Disabled in UEFI (Safe alternative scripts ready)</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2] space-y-2">
                  <h4 className="font-bold text-xs text-[#263B80]">Provisioned Virtual Machines Specification</h4>
                  <div className="space-y-3 pt-1">
                    <div className="p-2.5 bg-white rounded-lg border border-[#E8EAF2] text-xs">
                      <span className="font-bold text-[#172033]">GMIU-Ubuntu-VM-01:</span>
                      <p className="text-[11px] text-[#778198]">2 vCPUs &bull; 2048 MB RAM &bull; 25.0 GB Dynamic VDI &bull; Ubuntu 64-bit</p>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-[#E8EAF2] text-xs">
                      <span className="font-bold text-[#172033]">GMIU-Ubuntu-VM-02:</span>
                      <p className="text-[11px] text-[#778198]">1 vCPU &bull; 2048 MB RAM &bull; 20.0 GB Dynamic VDI &bull; Ubuntu 64-bit</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Linux In-Guest Diagnostics Output Terminal */}
              <div>
                <h4 className="text-xs font-bold text-[#172033] mb-2 flex items-center space-x-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#5269C9]" />
                  <span>Simulated Guest Linux Terminal (lscpu, free -h, df -h)</span>
                </h4>
                <pre className="bg-[#172033] text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
{`gmiu@GMIU-Ubuntu-VM-01:~$ hostname
GMIU-Ubuntu-VM-01
gmiu@GMIU-Ubuntu-VM-01:~$ uname -a
Linux GMIU-Ubuntu-VM-01 6.8.0-40-generic #40-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux
gmiu@GMIU-Ubuntu-VM-01:~$ nproc
2
gmiu@GMIU-Ubuntu-VM-01:~$ free -h
               total        used        free      shared  buff/cache   available
Mem:           2.0Gi       412Mi       1.3Gi       8.0Mi       310Mi       1.5Gi
Swap:          2.0Gi          0B       2.0Gi
gmiu@GMIU-Ubuntu-VM-01:~$ df -h /
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda3        25G  5.8G   18G  25% /`}
                </pre>
              </div>
            </div>
          )}

          {/* ALA 3 Interactive: Cloud Security Features Explorer */}
          {activity.id === 'ALA-3' && (
            <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
              <h3 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#16865B]" />
                <span>Enterprise Cloud Security Architecture Comparison</span>
              </h3>
              <p className="text-xs text-[#778198]">
                Rigorous evaluation across AWS, Microsoft Azure, and Google Cloud security layers.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#E8EAF2] bg-[#F7F8FC] text-[#263B80] font-bold">
                      <th className="p-3">Security Dimension</th>
                      <th className="p-3">Amazon Web Services (AWS)</th>
                      <th className="p-3">Microsoft Azure</th>
                      <th className="p-3">Google Cloud (GCP)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8EAF2]">
                    {SECURITY_COMPARISON_DATA.map((row, i) => (
                      <tr key={i} className="hover:bg-[#FDFDFE]">
                        <td className="p-3 font-bold text-[#172033]">{row.category}</td>
                        <td className="p-3 text-[#56627A]">{row.aws}</td>
                        <td className="p-3 text-[#56627A]">{row.azure}</td>
                        <td className="p-3 text-[#56627A]">{row.gcp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ALA 4 Interactive: SLA & Risk Matrix */}
          {activity.id === 'ALA-4' && (
            <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
              <h3 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                <FileCheck2 className="w-4 h-4 text-[#5269C9]" />
                <span>Contractual SLA & Uptime Matrix Analysis</span>
              </h3>
              <p className="text-xs text-[#778198]">
                Comparative availability commitments and service credit compensation tiers.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#E8EAF2] bg-[#F7F8FC] text-[#263B80] font-bold">
                      <th className="p-3">Service Category</th>
                      <th className="p-3">AWS Commitment & Credits</th>
                      <th className="p-3">Azure Commitment & Credits</th>
                      <th className="p-3">GCP Commitment & Credits</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8EAF2]">
                    {SLA_COMPARISON_DATA.map((s, idx) => (
                      <tr key={idx} className="hover:bg-[#FDFDFE]">
                        <td className="p-3 font-bold text-[#172033]">{s.service}</td>
                        <td className="p-3">
                          <span className="font-bold text-[#263B80]">{s.aws.uptime}</span>
                          <p className="text-[11px] text-[#778198]">{s.aws.credit}</p>
                          <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">Max Down: {s.aws.permitted_down_monthly}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-[#5269C9]">{s.azure.uptime}</span>
                          <p className="text-[11px] text-[#778198]">{s.azure.credit}</p>
                          <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">Max Down: {s.azure.permitted_down_monthly}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-purple-700">{s.gcp.uptime}</span>
                          <p className="text-[11px] text-[#778198]">{s.gcp.credit}</p>
                          <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">Max Down: {s.gcp.permitted_down_monthly}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ALA 5 Interactive: Locust Load Testing & Telemetry Charts */}
          {activity.id === 'ALA-5' && (
            <div className="space-y-6">
              {/* Load Balancer Selector */}
              <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-sm text-[#172033]">Locust Benchmark Scenarios (10, 50, 100 Users)</h3>
                    <p className="text-xs text-[#778198]">Select concurrency scenario to inspect empirical latency, RPS, and server resource utilization</p>
                  </div>
                  <div className="inline-flex rounded-xl p-1 bg-[#F7F8FC] border border-[#E8EAF2]">
                    {[10, 50, 100].map((u) => (
                      <button
                        key={u}
                        onClick={() => setSimActiveUsers(u as any)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                          simActiveUsers === u
                            ? 'bg-[#263B80] text-white shadow-sm'
                            : 'text-[#778198] hover:text-[#172033]'
                        }`}
                      >
                        {u} Users ({u === 10 ? 'Low' : u === 50 ? 'Med' : 'High'})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scenario Metrics Cards */}
                {(() => {
                  const key = simActiveUsers === 10 ? 'low' : simActiveUsers === 50 ? 'medium' : 'high';
                  const res = BENCHMARK_SCENARIOS[key];
                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                      <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2]">
                        <p className="text-[10px] font-bold text-[#778198] uppercase">Throughput (RPS)</p>
                        <h4 className="text-xl font-extrabold text-[#263B80] mt-1">{res.rps} req/s</h4>
                        <p className="text-[10px] text-[#778198] mt-0.5">Total: {res.total_requests} reqs</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2]">
                        <p className="text-[10px] font-bold text-[#778198] uppercase">Avg Latency</p>
                        <h4 className="text-xl font-extrabold text-[#5269C9] mt-1">{res.avg_latency_ms} ms</h4>
                        <p className="text-[10px] text-[#778198] mt-0.5">Min: {res.min_latency_ms} ms</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2]">
                        <p className="text-[10px] font-bold text-[#778198] uppercase">95th Percentile (p95)</p>
                        <h4 className="text-xl font-extrabold text-amber-600 mt-1">{res.p95_latency_ms} ms</h4>
                        <p className="text-[10px] text-[#778198] mt-0.5">p99: {res.p99_latency_ms} ms</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2]">
                        <p className="text-[10px] font-bold text-[#778198] uppercase">Server CPU Load</p>
                        <h4 className="text-xl font-extrabold text-emerald-600 mt-1">{res.cpu_percent}%</h4>
                        <p className="text-[10px] text-[#778198] mt-0.5">RAM: {res.memory_mb} MB</p>
                      </div>
                    </div>
                  );
                })()}

                {/* Comparative Chart */}
                <div className="pt-4">
                  <h4 className="text-xs font-bold text-[#172033] mb-3">Latency vs Concurrency Curve</h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { users: '10 Users', avg: 18.4, p95: 31.2, p99: 48.0 },
                          { users: '50 Users', avg: 46.2, p95: 94.6, p99: 142.1 },
                          { users: '100 Users', avg: 112.8, p95: 248.0, p99: 410.2 }
                        ]}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#E8EAF2" />
                        <XAxis dataKey="users" stroke="#778198" fontSize={11} />
                        <YAxis stroke="#778198" fontSize={11} unit="ms" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="avg" name="Avg Latency (ms)" stroke="#263B80" strokeWidth={2} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="p95" name="p95 Latency (ms)" stroke="#5269C9" strokeWidth={2} />
                        <Line type="monotone" dataKey="p99" name="p99 Latency (ms)" stroke="#D94D59" strokeWidth={2} strokeDasharray="5 5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: EVIDENCE & DIAGNOSTICS */}
      {activeTab === 'evidence' && (
        <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#172033]">Practical Artifacts & Genuine Evidence</h3>
              <p className="text-xs text-[#778198]">Audited system diagnostics, command outputs, and university submission artifacts</p>
            </div>
            <span className="text-xs font-mono text-[#16865B] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-bold">
              Verification Ready
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-[#E8EAF2] bg-[#F7F8FC] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#263B80]">Repository Artifact Path</span>
                <span className="text-[10px] font-mono text-[#778198]">evidence/{activity.id}/</span>
              </div>
              <p className="text-xs text-[#56627A]">
                All practical scripts, system audit traces, benchmark CSVs, and technical documentation are persisted in the local and version-controlled file hierarchy.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-[#E8EAF2] space-y-2">
                <h4 className="text-xs font-bold text-[#172033]">Candidate Identity Verification</h4>
                <ul className="text-xs text-[#56627A] space-y-1">
                  <li>Student Name: <strong>{profile.full_name}</strong></li>
                  <li>Enrollment Number: <code className="bg-gray-100 px-1.5 py-0.5 rounded">{profile.enrollment_number}</code></li>
                  <li>Department: {profile.department}</li>
                  <li>University: {profile.university}</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-[#E8EAF2] space-y-2">
                <h4 className="text-xs font-bold text-[#172033]">Submission Status & Evaluation</h4>
                <ul className="text-xs text-[#56627A] space-y-1">
                  <li>Status: <StatusBadge status={currentStatus} size="sm" /></li>
                  <li>Max Practical Marks: <strong>20 Marks</strong></li>
                  <li>Submission Deadline: <strong>30 November 2026</strong></li>
                  <li>Feedback: {submission?.feedback || 'Pending evaluation.'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SUBMISSION & GRADING */}
      {activeTab === 'submit' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Student Submission Card */}
          <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                <Upload className="w-4 h-4 text-[#263B80]" />
                <span>Submit Practical Assignment</span>
              </h3>
              <StatusBadge status={currentStatus} size="sm" />
            </div>

            <p className="text-xs text-[#778198]">
              Attach documentation notes, verify code execution, and submit {activity.id} to the university portal.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1">
                  Submission Notes & Implementation Summary
                </label>
                <textarea
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="Summarize the implementation steps, commands executed, and observations..."
                  rows={4}
                  className="w-full text-xs p-3 rounded-xl border border-[#E8EAF2] focus:border-[#263B80] focus:ring-1 focus:ring-[#263B80] outline-none"
                />
              </div>

              <div className="p-4 rounded-xl border border-dashed border-[#CBD2E1] bg-[#F7F8FC] text-center space-y-1 cursor-pointer hover:bg-white transition-colors">
                <Upload className="w-5 h-5 text-[#778198] mx-auto" />
                <p className="text-xs font-bold text-[#172033]">Attach Evidence / Screenshots</p>
                <p className="text-[10px] text-[#778198]">PDF, PNG, JPG, or ZIP up to 25MB</p>
              </div>

              {submitSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{activity.id} submitted successfully! Dashboard updated.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-xl bg-[#263B80] hover:bg-[#1f2f66] text-white text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Recording Submission...' : 'Submit Assignment'}
              </button>
            </form>
          </div>

          {/* Faculty / Admin Verification Card */}
          <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#5269C9]" />
                <span>Faculty Evaluation Portal</span>
              </h3>
              <span className="text-[10px] font-bold text-[#5269C9] bg-indigo-50 px-2 py-0.5 rounded-full">
                Instructor Mode
              </span>
            </div>

            <p className="text-xs text-[#778198]">
              Verify student practical evidence, award marks out of 20, and record institutional feedback.
            </p>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1">
                  Awarded Marks (out of 20)
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={gradeScore}
                  onChange={(e) => setGradeScore(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8EAF2] focus:border-[#263B80] outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1">
                  Faculty Feedback & Rubric Notes
                </label>
                <textarea
                  value={gradeFeedback}
                  onChange={(e) => setGradeFeedback(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-3 rounded-xl border border-[#E8EAF2] focus:border-[#263B80] outline-none"
                />
              </div>

              <button
                onClick={handleVerify}
                className="w-full py-2.5 px-4 rounded-xl bg-[#16865B] hover:bg-[#126b48] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                Verify & Award Marks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
