import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  BENCHMARK_SCENARIOS,
  SLA_COMPARISON_DATA,
  SECURITY_COMPARISON_DATA,
  ALA2_LAB_INSTANCES,
  ALA2_LAB_SCREENSHOTS,
  ALA1_APP_DETAILS,
  ALA2_VBOX_STEPS,
  ALA3_AZURE_REVIEW,
  ALA4_AWS_CASE_STUDY,
  ALA5_PERF_OPTIMIZATION
} from '../data/mockData';
import {
  Cloud,
  Server,
  ShieldCheck,
  FileCheck2,
  FileText,
  Gauge,
  FileDown,
  CheckCircle2,
  Play,
  Terminal,
  AlertCircle,
  Copy,
  Check,
  Cpu,
  Layers,
  ArrowRight,
  Database,
  Maximize2,
  X,
  Download,
  HardDrive,
  ExternalLink,
  Globe,
  Sliders,
  Eye,
  BookOpen,
  ShieldAlert,
  ServerCrash
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export const AlaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState(dataService.getActivity(id || 'ALA-1'));
  const [submission, setSubmission] = useState(dataService.getSubmission(id || 'ALA-1'));
  const [profile, setProfile] = useState(dataService.getProfile());
  const [activeTab, setActiveTab] = useState<'overview' | 'implementation' | 'lab' | 'evidence'>('overview');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; description: string } | null>(null);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);

  // ALA-1 Interactive State
  const [testEndpoint, setTestEndpoint] = useState<string>('/health');
  const [apiResponse, setApiResponse] = useState<any>({
    status: 200,
    time: '14ms',
    data: { status: 'ok', service: 'cloud-file-manager', storage: 'supabase', uptime: '99.98%', version: '1.0.0' }
  });

  // ALA-2 Interactive State
  const [ala2SubTab, setAla2SubTab] = useState<'vbox' | 'cgroups'>('vbox');

  // ALA-3 Interactive State
  const [selectedScenario, setSelectedScenario] = useState<string>('A');

  // ALA-4 Interactive State
  const [selectedRiskRating, setSelectedRiskRating] = useState<string>('ALL');

  // ALA-5 Interactive State
  const [ala5StrategyIdx, setAla5StrategyIdx] = useState<number>(3);

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
    const link = document.createElement('a');
    link.href = `/reports/${activity.id}.pdf`;
    link.download = `GMIU_${activity.id}_Report_${profile.enrollment_number}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRunApiTest = (endpoint: string) => {
    setTestEndpoint(endpoint);
    if (endpoint === '/health') {
      setApiResponse({
        status: 200,
        time: '14ms',
        data: {
          status: 'ok',
          service: 'cloud-file-manager',
          storage: 'supabase',
          uptime: '99.98%',
          version: '1.0.0',
          provider: 'Render PaaS (Singapore Edge)'
        }
      });
    } else if (endpoint === '/') {
      setApiResponse({
        status: 200,
        time: '42ms',
        data: {
          files: [
            { name: 'sample_dataset.csv', size: '142.9 KB', uploaded_at: '2026-11-15T09:30:00Z', download_url: 'https://wkmffevsptubegbcvqtg.supabase.co/storage/v1/object/sign/uploads/sample_dataset.csv?token=ey...' },
            { name: 'architecture_diagram.png', size: '843.2 KB', uploaded_at: '2026-11-16T14:15:22Z', download_url: 'https://wkmffevsptubegbcvqtg.supabase.co/storage/v1/object/sign/uploads/architecture_diagram.png?token=ey...' },
            { name: 'benchmark_results.log', size: '28.4 KB', uploaded_at: '2026-11-17T11:05:40Z', download_url: 'https://wkmffevsptubegbcvqtg.supabase.co/storage/v1/object/sign/uploads/benchmark_results.log?token=ey...' }
          ],
          total_count: 3,
          bucket: 'uploads'
        }
      });
    } else if (endpoint === '/upload') {
      setApiResponse({
        status: 201,
        time: '91ms',
        data: {
          message: 'File uploaded successfully to Supabase private storage',
          filename: 'production_manifest.json',
          storage_path: 'uploads/production_manifest.json',
          signed_url: 'https://wkmffevsptubegbcvqtg.supabase.co/storage/v1/object/sign/uploads/production_manifest.json?token=ey...',
          expires_in_seconds: 3600
        }
      });
    } else if (endpoint.includes('delete')) {
      setApiResponse({
        status: 200,
        time: '34ms',
        data: {
          message: 'File removed successfully from Supabase bucket',
          filename: 'temp_log.txt',
          status: 'deleted'
        }
      });
    }
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
          <div className="flex items-center space-x-2 sm:space-x-3">
            <StatusBadge status={currentStatus} size="md" />
            <button
              onClick={() => setPdfModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-[#263B80] text-[#263B80] hover:bg-indigo-50 text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Official PDF</span>
              <span className="sm:hidden">View</span>
            </button>
            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#263B80] hover:bg-[#1f2f66] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download Report PDF</span>
              <span className="sm:hidden">Download</span>
            </button>
          </div>
        </div>

        <div>
          <div className="inline-block text-[11px] font-bold text-[#5269C9] uppercase tracking-wider mb-1">
            {activity.category} &bull; Weightage: {activity.weightage}% &bull; Candidate: Herry Prajapati ({profile.enrollment_number})
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
            { id: 'overview', label: '1. Overview & Theory' },
            { id: 'implementation', label: '2. Implementation Guide' },
            { id: 'lab', label: '3. Interactive Demonstration' },
            { id: 'evidence', label: '4. Evidence & Diagnostics' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-3 transition-colors border-b-2 whitespace-nowrap ${activeTab === tab.id
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
              <div className="p-4 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2] font-mono text-xs text-[#263B80] overflow-x-auto whitespace-pre">
                {activity.architecture_diagram}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Tech Stack Metadata Card */}
            <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
              <h3 className="font-bold text-sm text-[#172033]">Technologies Applied</h3>
              <div className="flex flex-wrap gap-2">
                {activity.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2] text-xs font-semibold text-[#263B80]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Metrics Card */}
            <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
              <h3 className="font-bold text-sm text-[#172033]">Academic Audit Card</h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#E8EAF2]">
                  <span className="text-[#778198]">Course:</span>
                  <span className="font-bold text-[#172033]">Cloud Computing (GMIU-IT)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E8EAF2]">
                  <span className="text-[#778198]">Candidate:</span>
                  <span className="font-bold text-[#172033]">Herry Prajapati</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E8EAF2]">
                  <span className="text-[#778198]">Enrollment:</span>
                  <span className="font-mono font-bold text-[#263B80]">20230905090031</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E8EAF2]">
                  <span className="text-[#778198]">Deliverables:</span>
                  <span className="font-bold text-emerald-600">Verified & Ready</span>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('lab')}
                    className="w-full py-2.5 rounded-xl bg-[#263B80] hover:bg-[#1f2f66] text-white text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>Launch Interactive Demonstration</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: IMPLEMENTATION GUIDE */}
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

          {/* ======================= ALA-1 INTERACTIVE SHOWCASE ======================= */}
          {activity.id === 'ALA-1' && (
            <div className="space-y-6">
              {/* App Banner */}
              <div className="bg-gradient-to-r from-[#172033] via-[#263B80] to-[#5269C9] text-white rounded-2xl p-6 shadow-card space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Production Web Application Live on Render PaaS</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white">
                      {ALA1_APP_DETAILS.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-indigo-100 max-w-2xl mt-1 leading-relaxed">
                      {ALA1_APP_DETAILS.subtitle} &bull; Python Flask + Gunicorn WSGI on Render PaaS with Supabase private storage bucket and secure 3600-second pre-signed URLs.
                    </p>
                  </div>

                  <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
                    <a
                      href={ALA1_APP_DETAILS.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-white text-[#263B80] hover:bg-indigo-50 font-extrabold text-xs transition-all shadow-md active:scale-95"
                    >
                      <ExternalLink className="w-4 h-4 text-[#263B80]" />
                      <span>Open Live App</span>
                    </a>
                    <a
                      href={ALA1_APP_DETAILS.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-indigo-900/60 hover:bg-indigo-900 text-white border border-indigo-400/30 font-bold text-xs transition-all shadow-sm"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>GitHub Repository</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Multi-Tier Cloud Deployment Topology Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 space-y-1.5">
                  <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs">
                    <Cloud className="w-4 h-4 text-emerald-600" />
                    <span>PaaS Compute Layer</span>
                  </div>
                  <p className="text-xs text-emerald-950 font-semibold">{ALA1_APP_DETAILS.platform}</p>
                  <p className="text-[11px] text-emerald-800 font-mono">cloud-file-manager-alml.onrender.com</p>
                  <p className="text-[10px] text-emerald-700">Gunicorn WSGI &bull; Auto Deploy &bull; TLS 1.3</p>
                </div>

                <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/60 space-y-1.5">
                  <div className="flex items-center space-x-2 text-blue-900 font-bold text-xs">
                    <Database className="w-4 h-4 text-blue-600" />
                    <span>Cloud Storage Layer</span>
                  </div>
                  <p className="text-xs text-blue-950 font-semibold">{ALA1_APP_DETAILS.storage}</p>
                  <p className="text-[11px] text-blue-800 font-mono">Bucket: uploads (Private)</p>
                  <p className="text-[10px] text-blue-700">Pre-signed URLs (3600s TTL) &bull; Zero Key Exposure</p>
                </div>

                <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/60 space-y-1.5">
                  <div className="flex items-center space-x-2 text-purple-900 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    <span>Automated Verification</span>
                  </div>
                  <p className="text-xs text-purple-950 font-semibold">9 Pytest Tests Passed (100%)</p>
                  <p className="text-[11px] text-purple-800 font-mono">{ALA1_APP_DETAILS.runtime}</p>
                  <p className="text-[10px] text-purple-700">Candidate: Herry Prajapati (20230905090031)</p>
                </div>
              </div>

              {/* Interactive REST API Testing Console */}
              <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                      <Terminal className="w-4 h-4 text-[#263B80]\" />
                      <span>Interactive REST API Console & Payload Simulator</span>
                    </h4>
                    <p className="text-xs text-[#778198]">
                      Click any endpoint below to inspect real HTTP request execution and JSON response payloads
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-blue-50 text-[#263B80] font-bold border border-blue-200">
                    4 Production Endpoints
                  </span>
                </div>

                {/* Endpoint Selection Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-[#E8EAF2] bg-[#F7F8FC] text-[#263B80] font-bold">
                        <th className="p-2.5">Method</th>
                        <th className="p-2.5">Endpoint Path</th>
                        <th className="p-2.5">Purpose & Function</th>
                        <th className="p-2.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8EAF2]">
                      {ALA1_APP_DETAILS.endpoints.map((ep, idx) => (
                        <tr
                          key={idx}
                          className={`hover:bg-[#FDFDFE] transition-colors ${testEndpoint === ep.endpoint ? 'bg-indigo-50/40' : ''}`}
                        >
                          <td className="p-2.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              ep.method === 'GET' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {ep.method}
                            </span>
                          </td>
                          <td className="p-2.5 font-mono font-bold text-[#172033]">{ep.endpoint}</td>
                          <td className="p-2.5 text-[#56627A]">{ep.description}</td>
                          <td className="p-2.5 text-right">
                            <button
                              onClick={() => handleRunApiTest(ep.endpoint)}
                              className="px-3 py-1 rounded-lg bg-[#263B80] hover:bg-[#1f2f66] text-white text-[11px] font-bold transition-all shadow-sm active:scale-95 inline-flex items-center space-x-1"
                            >
                              <Play className="w-3 h-3" />
                              <span>Test Request</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Live Response Box */}
                {apiResponse && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2 font-mono">
                        <span className="font-bold text-[#172033]">Target: {testEndpoint}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          HTTP {apiResponse.status} OK
                        </span>
                        <span className="text-[#778198] text-[11px]">Latency: {apiResponse.time}</span>
                      </div>
                      <span className="text-[11px] text-[#778198]">Content-Type: application/json</span>
                    </div>
                    <pre className="bg-[#172033] text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-gray-800">
                      {JSON.stringify(apiResponse.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              {/* 9 Automated Pytest Test Cases Table */}
              <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16865B]" />
                      <span>Automated Test Verification Matrix (Pytest Suite)</span>
                    </h4>
                    <p className="text-xs text-[#778198]">
                      All 9 unit and integration tests executing against Flask application factory & mock Supabase client
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    9 Passed (100%)
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-[#E8EAF2] bg-[#F7F8FC] text-[#263B80] font-bold">
                        <th className="p-2.5">Test Function</th>
                        <th className="p-2.5">Expected Behavior</th>
                        <th className="p-2.5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8EAF2]">
                      {ALA1_APP_DETAILS.tests.map((t, idx) => (
                        <tr key={idx} className="hover:bg-[#FDFDFE]">
                          <td className="p-2.5 font-mono font-bold text-[#172033]">{t.name}</td>
                          <td className="p-2.5 text-[#56627A]">{t.expected}</td>
                          <td className="p-2.5 text-right">
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                              <Check className="w-3 h-3" />
                              <span>{t.status.toUpperCase()}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================= ALA-2 INTERACTIVE SHOWCASE ======================= */}
          {activity.id === 'ALA-2' && (
            <div className="space-y-6">
              {/* Sub-Tab Selector for ALA-2: VirtualBox vs Cgroups */}
              <div className="flex p-1 rounded-xl bg-[#E8EAF2]/60 border border-[#E8EAF2] w-fit">
                <button
                  onClick={() => setAla2SubTab('vbox')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center space-x-2 ${
                    ala2SubTab === 'vbox' ? 'bg-[#263B80] text-white shadow-sm' : 'text-[#56627A] hover:text-[#172033]'
                  }`}
                >
                  <Server className="w-3.5 h-3.5" />
                  <span>1. Oracle VirtualBox VM Walkthrough (12 Steps)</span>
                </button>
                <button
                  onClick={() => setAla2SubTab('cgroups')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center space-x-2 ${
                    ala2SubTab === 'cgroups' ? 'bg-[#263B80] text-white shadow-sm' : 'text-[#56627A] hover:text-[#172033]'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>2. Linux Cgroups & Namespaces Isolation Lab</span>
                </button>
              </div>

              {/* Sub-View 1: Oracle VirtualBox 12 Steps */}
              {ala2SubTab === 'vbox' && (
                <div className="space-y-6">
                  {/* VirtualBox Banner */}
                  <div className="bg-gradient-to-r from-[#172033] via-[#263B80] to-[#5269C9] text-white rounded-2xl p-6 shadow-card space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Ubuntu 26.04 LTS Installation & Configuration Verified</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-white">
                          Installation and Configuration of a Virtual Machine using Oracle VirtualBox
                        </h3>
                        <p className="text-xs sm:text-sm text-indigo-100 max-w-2xl mt-1 leading-relaxed">
                          11-page academic report detailing 12 implementation steps: VM creation, 2 vCPUs / 2048 MB RAM provisioning, 25 GB VDI dynamic storage, dual network adapter topology (NAT + Host-Only), Guest Additions, and snapshot backup.
                        </p>
                      </div>

                      <a
                        href="/reports/ALA-2.pdf"
                        download="GMIU_ALA2_Report_20230905090031.pdf"
                        className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-white text-[#263B80] hover:bg-indigo-50 font-extrabold text-xs transition-all shadow-md active:scale-95 shrink-0"
                      >
                        <FileDown className="w-4 h-4 text-[#263B80]" />
                        <span>Download 11-Page PDF</span>
                      </a>
                    </div>
                  </div>

                  {/* 12 Implementation Steps Grid */}
                  <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                        <Layers className="w-4 h-4 text-[#263B80]" />
                        <span>12 Implementation Steps with Report Figures (Figures 1–12)</span>
                      </h4>
                      <span className="text-xs font-mono font-bold text-[#263B80] bg-blue-50 px-2 py-0.5 rounded">
                        12 Verified Steps
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {ALA2_VBOX_STEPS.map((step) => (
                        <div key={step.step} className="p-4 rounded-xl border border-[#E8EAF2] bg-[#F7F8FC] space-y-2 hover:border-[#263B80] transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="w-6 h-6 rounded-full bg-[#263B80] text-white flex items-center justify-center text-xs font-bold">
                                {step.step}
                              </span>
                              <h5 className="font-bold text-xs text-[#172033]">{step.title}</h5>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                              {step.figure}
                            </span>
                          </div>
                          <p className="text-xs text-[#56627A] pl-8 leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Host Hardware Specifications */}
                  <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
                    <h4 className="font-bold text-xs text-[#263B80] uppercase tracking-wider">
                      Host Hardware Baseline & Dual Virtual Machine Topology
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2] space-y-2">
                        <h5 className="font-bold text-xs text-[#172033]">Physical Workstation Baseline</h5>
                        <ul className="text-xs space-y-1 text-[#56627A]">
                          <li><strong>OS:</strong> Microsoft Windows 11 Home 64-bit</li>
                          <li><strong>CPU:</strong> 12th Gen Intel Core i5-12450HX (8 cores / 12 threads)</li>
                          <li><strong>RAM:</strong> 12.0 GB Physical RAM</li>
                          <li><strong>Storage:</strong> C: 36.87 GB Free | D: 115.93 GB Free</li>
                          <li><strong>Hypervisor:</strong> Oracle VirtualBox 7.x Type-2 with Extension Pack</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2] space-y-2">
                        <h5 className="font-bold text-xs text-[#172033]">Configured Virtual Machine Topology</h5>
                        <ul className="text-xs space-y-1 text-[#56627A]">
                          <li><strong>VM Name:</strong> GMIU-Ubuntu-VM-01 (Ubuntu 26.04 LTS 64-bit)</li>
                          <li><strong>vCPUs / RAM:</strong> 2 vCPUs &bull; 2048 MB RAM</li>
                          <li><strong>Virtual Storage:</strong> 25.0 GB VDI dynamically allocated</li>
                          <li><strong>Dual Network:</strong> Adapter 1 (NAT) &bull; Adapter 2 (Host-Only 192.168.56.0/24)</li>
                          <li><strong>Integrations:</strong> VirtualBox Guest Additions + Shared Host Folder</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-View 2: Linux Cgroups & Namespaces Lab */}
              {ala2SubTab === 'cgroups' && (
                <div className="space-y-6">
                  {/* Lab Banner & Report Download Bar */}
                  <div className="bg-gradient-to-r from-[#172033] via-[#263B80] to-[#5269C9] text-white rounded-2xl p-6 shadow-card space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Linux Kernel Cgroups & Namespaces Empirical Enforcement</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-white">
                          Virtualization: Resource Allocation & Boundary Isolation
                        </h3>
                        <p className="text-xs sm:text-sm text-indigo-100 max-w-2xl mt-1 leading-relaxed">
                          Hands-on execution on Linux 6.18 kernel demonstrating CPU quota throttling (CFS), memory containment (OOM SIGKILL 137), tmpfs storage limits, and full process, hostname, filesystem, and network namespace segregation across 3 isolated instances.
                        </p>
                      </div>

                      <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
                        <a
                          href="/reports/Virtualization_Lab_Report.pdf"
                          download="Virtualization_Lab_Report.pdf"
                          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-white text-[#263B80] hover:bg-indigo-50 font-extrabold text-xs transition-all shadow-md active:scale-95"
                        >
                          <FileDown className="w-4 h-4 text-[#263B80]" />
                          <span>Lab Report PDF (301 KB)</span>
                        </a>
                        <a
                          href="/evidence/ALA-2/virtualization-lab.zip"
                          download="virtualization-lab.zip"
                          className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-indigo-900/60 hover:bg-indigo-900 text-white border border-indigo-400/30 font-bold text-xs transition-all shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Code & Logs ZIP (274 KB)</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Provisioned Instances Topology */}
                  <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                          <Server className="w-4 h-4 text-[#263B80]" />
                          <span>Provisioned Virtual Instances (Cgroups & Namespaces)</span>
                        </h4>
                        <p className="text-xs text-[#778198]">
                          Three isolated process trees spawned using <code>unshare</code> with custom resource cgroups
                        </p>
                      </div>
                      <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-bold">
                        3 Active Instances
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {ALA2_LAB_INSTANCES.map((vm) => (
                        <div key={vm.name} className="p-4 rounded-xl border border-[#E8EAF2] bg-[#F7F8FC] space-y-3 hover:border-[#263B80] transition-colors">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-sm text-[#263B80] font-mono">{vm.name}</span>
                            <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
                              PID {vm.host_pid}
                            </span>
                          </div>
                          <div className="space-y-1.5 text-xs text-[#56627A]">
                            <div className="flex justify-between">
                              <span className="text-[#778198]">CPU Limit:</span>
                              <strong className="text-[#172033]">{vm.cpu_limit}</strong>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#778198]">CFS Quota:</span>
                              <span className="font-mono text-[11px]">{vm.cpu_quota}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#778198]">RAM Limit:</span>
                              <strong className="text-[#172033]">{vm.ram_limit}</strong>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#778198]">Storage (/data):</span>
                              <span>{vm.storage}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#778198]">Network:</span>
                              <span className="text-[11px] font-semibold">{vm.network}</span>
                            </div>
                            <div className="pt-2 border-t border-[#E8EAF2] flex justify-between items-center text-[11px]">
                              <span className="text-[#778198]">Effective CPU:</span>
                              <span className="font-mono font-bold text-emerald-700">{vm.measured_cpu.split(' ')[0]}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4 Empirical Enforcement Experiments */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2">
                      <div className="flex items-center space-x-2 text-blue-900 font-bold text-xs">
                        <Cpu className="w-4 h-4 text-blue-600" />
                        <span>1. CPU CFS Quota Throttling</span>
                      </div>
                      <p className="text-xs text-blue-950 leading-relaxed">
                        6s busy-loop executed via <code>burn.py</code>. Cgroups throttled CPU perfectly to assigned shares: <strong>vm1: 50%</strong> (3.01s cpu), <strong>vm2: 99%</strong> (5.96s cpu), <strong>vm3: 25%</strong> (1.51s cpu).
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2">
                      <div className="flex items-center space-x-2 text-rose-900 font-bold text-xs">
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        <span>2. Kernel OOM Memory Containment</span>
                      </div>
                      <p className="text-xs text-rose-950 leading-relaxed">
                        <code>memhog.py</code> attempted to allocate 600 MB in vm1 (limit: 256 MB). Kernel terminated process at 250 MB with <strong>exit code 137 (SIGKILL)</strong> and <code>oom_kill=1</code>. Host memory stayed untouched.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2">
                      <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs">
                        <HardDrive className="w-4 h-4 text-amber-600" />
                        <span>3. Storage Quota Enforcement</span>
                      </div>
                      <p className="text-xs text-amber-950 leading-relaxed">
                        <code>dd</code> wrote 100 MB into vm3 50 MB <code>/data</code> tmpfs. Writing failed at exactly 50 MB (52,428,800 bytes) with <strong>"No space left on device"</strong>. vm2 retains independent 200 MB volume.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
                      <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>4. Multi-Namespace Segregation</span>
                      </div>
                      <p className="text-xs text-emerald-950 leading-relaxed">
                        <strong>PID:</strong> Inside VM sees PID 1 only (host has 66). <strong>UTS:</strong> Isolated hostnames. <strong>Mount:</strong> Confidential file invisible to others. <strong>Net:</strong> vm3 has <code>lo</code> only (8.8.8.8 unreachable).
                      </p>
                    </div>
                  </div>

                  {/* 7 Figures Screenshot Gallery */}
                  <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                          <Layers className="w-4 h-4 text-[#263B80]" />
                          <span>Empirical Evidence Gallery: Terminal Captures (Figures 1–7)</span>
                        </h4>
                        <p className="text-xs text-[#778198]">
                          Click any figure to expand high-resolution terminal capture matching the academic report
                        </p>
                      </div>
                      <span className="text-xs text-[#778198]">7 Figures</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {ALA2_LAB_SCREENSHOTS.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedImage({ url: item.url, title: `${item.figure}: ${item.title}`, description: item.description })}
                          className="group border border-[#E8EAF2] hover:border-[#263B80] rounded-xl overflow-hidden bg-[#F7F8FC] cursor-pointer transition-all hover:shadow-card flex flex-col justify-between"
                        >
                          <div className="relative aspect-[16/9] bg-[#172033] overflow-hidden flex items-center justify-center">
                            <img
                              src={item.url}
                              alt={item.title}
                              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1.5 text-white text-xs font-bold">
                              <Maximize2 className="w-4 h-4" />
                              <span>View Fullsize</span>
                            </div>
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#172033]/90 text-white font-mono text-[10px] font-bold border border-gray-700">
                              {item.figure}
                            </span>
                          </div>
                          <div className="p-3 space-y-1">
                            <h5 className="font-bold text-xs text-[#172033] line-clamp-1 group-hover:text-[#263B80]">
                              {item.title}
                            </h5>
                            <p className="text-[11px] text-[#778198] line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Execution Log Terminal */}
                  <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#172033] flex items-center space-x-1.5">
                        <Terminal className="w-3.5 h-3.5 text-[#5269C9]" />
                        <span>Raw Lab Console Execution Log (full_run.log excerpt)</span>
                      </h4>
                      <a
                        href="/evidence/ALA-2/full_run.log"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#263B80] hover:underline font-bold flex items-center space-x-1"
                      >
                        <span>Open Raw Log</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                    <pre className="bg-[#172033] text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-64 leading-relaxed">
{`=================== STEP 2: CREATE 3 INSTANCES (cgroup limits) ===================
NAME  HOST_PID  CPU_LIMIT  RAM_LIMIT NETWORK      STATE
vm1   2516      50% core   256 MB    shared       running(S)
vm2   2517      100% core  512 MB    shared       running(S)
vm3   2518      25% core   128 MB    isolated     running(S)

=================== STEP 3: CPU ALLOCATION (same 6s busy-loop) ===================
--- vm1 (quota 50%)  : wall=6.00s  cpu_time=3.01s => effective CPU use = 50%
--- vm2 (quota 100%) : wall=6.00s  cpu_time=5.96s => effective CPU use = 99%
--- vm3 (quota 25%)  : wall=6.02s  cpu_time=1.51s => effective CPU use = 25%

=================== STEP 4: MEMORY ALLOCATION (vm1 limit 256 MB) =================
allocated 50 MB ... 250 MB
bash: line 1:     6 Killed                  python3 memhog.py 600
python exit code: 137   (137 = SIGKILL from OOM killer)
memory.limit_in_bytes: 256 MB | max_usage: 256 MB (peak) | oom_kill: 1

=================== STEP 5: STORAGE ALLOCATION (vm3 50 MB /data volume) ===========
dd: error writing '/data/big': No space left on device
52428800 bytes (52 MB, 50 MiB) copied, 0.0147953 s, 3.5 GB/s`}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================= ALA-3 INTERACTIVE SHOWCASE ======================= */}
          {activity.id === 'ALA-3' && (
            <div className="space-y-6">
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-[#172033] via-[#263B80] to-[#5269C9] text-white rounded-2xl p-6 shadow-card space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>21-Page Comprehensive Cloud Security Review</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white">
                      Security Features of a Cloud Platform: Microsoft Azure vs AWS and Google Cloud
                    </h3>
                    <p className="text-xs sm:text-sm text-indigo-100 max-w-2xl mt-1 leading-relaxed">
                      Rigorous evaluation across 8 enterprise security domains, 5 real-world incident simulations (Scenarios A–E), Table 2 implementation checklist with audit evidence, and 6-phase Zero-Trust roadmap.
                    </p>
                  </div>

                  <a
                    href="/reports/ALA-3.pdf"
                    download="GMIU_ALA3_Report_20230905090031.pdf"
                    className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-white text-[#263B80] hover:bg-indigo-50 font-extrabold text-xs transition-all shadow-md active:scale-95 shrink-0"
                  >
                    <FileDown className="w-4 h-4 text-[#263B80]" />
                    <span>Download 21-Page PDF</span>
                  </a>
                </div>
              </div>

              {/* 8-Domain Cross-Cloud Security Comparison Table */}
              <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-[#16865B]" />
                      <span>Table 1: Cross-Platform Enterprise Security Architecture Comparison</span>
                    </h4>
                    <p className="text-xs text-[#778198]">
                      Side-by-side comparative mapping across Microsoft Azure, Amazon Web Services, and Google Cloud Platform
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                    8 Security Dimensions
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-[#E8EAF2] bg-[#F7F8FC] text-[#263B80] font-bold">
                        <th className="p-3">Security Dimension</th>
                        <th className="p-3">Microsoft Azure</th>
                        <th className="p-3">Amazon Web Services (AWS)</th>
                        <th className="p-3">Google Cloud Platform (GCP)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8EAF2]">
                      {SECURITY_COMPARISON_DATA.map((row, i) => (
                        <tr key={i} className="hover:bg-[#FDFDFE]">
                          <td className="p-3 font-bold text-[#172033]">{row.category}</td>
                          <td className="p-3 text-[#56627A] font-medium bg-indigo-50/20">{row.azure}</td>
                          <td className="p-3 text-[#56627A]">{row.aws}</td>
                          <td className="p-3 text-[#56627A]">{row.gcp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 5 Real-World Incident Scenarios (A to E) */}
              <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                      <ShieldAlert className="w-4 h-4 text-amber-600" />
                      <span>5 Real-World Incident Scenarios & Azure Defensive Resolution</span>
                    </h4>
                    <p className="text-xs text-[#778198]">
                      Click any scenario below to inspect threat situation and Azure native technical resolution
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-bold border border-amber-200">
                    5 Scenarios (A–E)
                  </span>
                </div>

                {/* Scenario Navigation Tabs */}
                <div className="flex overflow-x-auto gap-2 pb-2">
                  {ALA3_AZURE_REVIEW.scenarios.map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => setSelectedScenario(sc.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                        selectedScenario === sc.id
                          ? 'bg-[#263B80] text-white border-[#263B80] shadow-sm'
                          : 'bg-[#F7F8FC] text-[#56627A] border-[#E8EAF2] hover:text-[#172033]'
                      }`}
                    >
                      {sc.name.split(':')[0]}
                    </button>
                  ))}
                </div>

                {/* Active Scenario Card */}
                {(() => {
                  const sc = ALA3_AZURE_REVIEW.scenarios.find(s => s.id === selectedScenario) || ALA3_AZURE_REVIEW.scenarios[0];
                  return (
                    <div className="p-5 rounded-xl border border-indigo-200 bg-indigo-50/30 space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-sm text-[#263B80]">{sc.name}</h5>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                          Defense Architecture Verified
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="p-3.5 rounded-lg bg-white border border-rose-200 space-y-1.5">
                          <span className="font-bold text-rose-800 flex items-center space-x-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                            <span>Threat Vector & Vulnerability Context</span>
                          </span>
                          <p className="text-[#56627A] leading-relaxed">{sc.situation}</p>
                        </div>

                        <div className="p-3.5 rounded-lg bg-white border border-emerald-200 space-y-1.5">
                          <span className="font-bold text-emerald-800 flex items-center space-x-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Azure Native Technical Resolution</span>
                          </span>
                          <p className="text-[#56627A] leading-relaxed">{sc.solution}</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Table 2: Implementation Checklist with Audit Evidence */}
              <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                      <FileCheck2 className="w-4 h-4 text-[#263B80]" />
                      <span>Table 2: Enterprise Cloud Security Implementation Checklist</span>
                    </h4>
                    <p className="text-xs text-[#778198]">
                      Specific baseline controls and audit evidence to retain for SOC2 / ISO 27001 validation
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    100% Audit Ready
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-[#E8EAF2] bg-[#F7F8FC] text-[#263B80] font-bold">
                        <th className="p-2.5">Security Area</th>
                        <th className="p-2.5">Security Baseline & Control</th>
                        <th className="p-2.5">Audit Evidence to Retain</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8EAF2]">
                      {ALA3_AZURE_REVIEW.checklist.map((item, idx) => (
                        <tr key={idx} className="hover:bg-[#FDFDFE]">
                          <td className="p-2.5 font-bold text-[#172033]">{item.area}</td>
                          <td className="p-2.5 text-[#56627A]">{item.baseline}</td>
                          <td className="p-2.5 font-mono text-[11px] text-emerald-800 bg-emerald-50/50">{item.evidence}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 6-Phase Cloud Security Roadmap */}
              <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
                <h4 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-[#5269C9]" />
                  <span>6-Phase Enterprise Cloud Security Implementation Roadmap</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {ALA3_AZURE_REVIEW.roadmap.map((ph, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-[#E8EAF2] bg-[#F7F8FC] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#263B80]">{ph.phase}</span>
                        <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">Verified</span>
                      </div>
                      <p className="text-xs text-[#56627A] leading-relaxed">{ph.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================= ALA-4 INTERACTIVE SHOWCASE ======================= */}
          {activity.id === 'ALA-4' && (
            <div className="space-y-6">
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-[#172033] via-[#263B80] to-[#5269C9] text-white rounded-2xl p-6 shadow-card space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>21-Page Empirical Case Study & Risk Analysis</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white">
                      Amazon Web Services: Service Level Agreements, Risk Management & Compliance
                    </h3>
                    <p className="text-xs sm:text-sm text-indigo-100 max-w-2xl mt-1 leading-relaxed">
                      Rigorous analysis of EC2 multi-AZ (99.99%) vs single-instance (99.5%) SLAs, 10 SLA gaps (G1–G10), 11-risk register (R1–R11), real-world outages (Oct 2025 outage & Capital One SSRF), and CERT-In / DPDP Act 2023 compliance.
                    </p>
                  </div>

                  <a
                    href="/reports/ALA-4.pdf"
                    download="GMIU_ALA4_Report_20230905090031.pdf"
                    className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-white text-[#263B80] hover:bg-indigo-50 font-extrabold text-xs transition-all shadow-md active:scale-95 shrink-0"
                  >
                    <FileDown className="w-4 h-4 text-[#263B80]" />
                    <span>Download 21-Page PDF</span>
                  </a>
                </div>
              </div>

              {/* Amazon Compute SLA Commitment & Downtime Cards */}
              <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                      <FileCheck2 className="w-4 h-4 text-[#263B80]" />
                      <span>Amazon Compute SLA Commitments & Downtime Mathematics</span>
                    </h4>
                    <p className="text-xs text-[#778198]">
                      Calculated monthly downtime threshold based on 30-day (43,200 minute) billing cycle
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    EC2 SLA Standard
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-emerald-900">Multi-AZ EC2 SLA</span>
                      <span className="font-mono font-extrabold text-emerald-700 text-sm">99.99%</span>
                    </div>
                    <p className="text-xs text-emerald-950 font-semibold">{ALA4_AWS_CASE_STUDY.ec2_sla.region_commitment}</p>
                    <div className="p-2.5 rounded-lg bg-white border border-emerald-200 text-xs space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-[#778198]">Max Allowed Down:</span>
                        <strong className="text-emerald-800">4m 23s / month</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#778198]">Permitted Minutes:</span>
                        <span>4.38 mins</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-amber-900">Single-Instance EC2 SLA</span>
                      <span className="font-mono font-extrabold text-amber-700 text-sm">99.50%</span>
                    </div>
                    <p className="text-xs text-amber-950 font-semibold">{ALA4_AWS_CASE_STUDY.ec2_sla.instance_commitment}</p>
                    <div className="p-2.5 rounded-lg bg-white border border-amber-200 text-xs space-y-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-[#778198]">Max Allowed Down:</span>
                        <strong className="text-amber-800">3h 39m 04s / month</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#778198]">Permitted Minutes:</span>
                        <span>219.1 mins</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-purple-900">SLA Credit Compensation</span>
                      <span className="font-mono font-extrabold text-purple-700 text-sm">Up to 100%</span>
                    </div>
                    <p className="text-xs text-purple-950 font-semibold">{ALA4_AWS_CASE_STUDY.ec2_sla.remedy}</p>
                    <div className="p-2.5 rounded-lg bg-white border border-purple-200 text-[11px] space-y-1 font-mono text-[#56627A]">
                      {ALA4_AWS_CASE_STUDY.ec2_sla.credit_tiers.map((t, i) => (
                        <div key={i}>&bull; {t.uptime}: <strong>{t.credit} Credit</strong></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 10 SLA Gaps (G1 through G10) */}
              <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>10 Enterprise SLA Gaps & Exclusion Clauses (G1–G10)</span>
                    </h4>
                    <p className="text-xs text-[#778198]">
                      Contractual carve-outs where enterprise downtime is deemed non-compensable by AWS
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    10 Gaps Identified
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {ALA4_AWS_CASE_STUDY.gaps.map((gap) => (
                    <div key={gap.id} className="p-4 rounded-xl border border-[#E8EAF2] bg-[#FDFDFE] hover:border-[#263B80] transition-colors space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded bg-[#172033] text-white font-mono text-[10px] font-bold">
                            {gap.id}
                          </span>
                          <h5 className="font-bold text-xs text-[#172033]">{gap.gap}</h5>
                        </div>
                      </div>
                      <p className="text-xs text-[#56627A] leading-relaxed">{gap.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 11-Risk Enterprise Register (R1 through R11) */}
              <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                      <Sliders className="w-4 h-4 text-[#5269C9]" />
                      <span>Enterprise Risk Register (R1–R11 with 5&times;5 Heatmap Scores)</span>
                    </h4>
                    <p className="text-xs text-[#778198]">
                      Likelihood (1–5) &times; Impact (1–5) = Risk Score (1–25) with AWS native defensive controls
                    </p>
                  </div>

                  {/* Rating Filter */}
                  <div className="flex gap-1 overflow-x-auto">
                    {['ALL', 'Critical', 'High', 'Medium'].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setSelectedRiskRating(rating)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          selectedRiskRating === rating
                            ? 'bg-[#263B80] text-white'
                            : 'bg-[#F7F8FC] text-[#56627A] hover:text-[#172033]'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-[#E8EAF2] bg-[#F7F8FC] text-[#263B80] font-bold">
                        <th className="p-2.5">Risk ID</th>
                        <th className="p-2.5">Risk Description</th>
                        <th className="p-2.5 text-center">Likelihood</th>
                        <th className="p-2.5 text-center">Impact</th>
                        <th className="p-2.5 text-center">Score</th>
                        <th className="p-2.5 text-center">Rating</th>
                        <th className="p-2.5">AWS Native Mitigation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8EAF2]">
                      {ALA4_AWS_CASE_STUDY.risk_register
                        .filter(r => selectedRiskRating === 'ALL' || r.rating === selectedRiskRating)
                        .map((r) => (
                          <tr key={r.id} className="hover:bg-[#FDFDFE]">
                            <td className="p-2.5 font-mono font-bold text-[#172033]">{r.id}</td>
                            <td className="p-2.5 font-semibold text-[#172033]">{r.risk}</td>
                            <td className="p-2.5 text-center font-mono">{r.l}/5</td>
                            <td className="p-2.5 text-center font-mono">{r.i}/5</td>
                            <td className="p-2.5 text-center font-mono font-bold">{r.score}</td>
                            <td className="p-2.5 text-center">
                              <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                                r.rating === 'Critical' ? 'bg-rose-100 text-rose-800' :
                                r.rating === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {r.rating}
                              </span>
                            </td>
                            <td className="p-2.5 text-[#56627A] text-[11px]">{r.mitigation}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Real Incident Dissections */}
              <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
                <h4 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                  <ServerCrash className="w-4 h-4 text-rose-600" />
                  <span>Real-World Outage & Breach Incident Case Studies</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ALA4_AWS_CASE_STUDY.incidents.map((inc, i) => (
                    <div key={i} className="p-4 rounded-xl border border-rose-200 bg-rose-50/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-xs text-[#172033]">{inc.name}</h5>
                        <span className="text-[10px] font-mono bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold">Documented Incident</span>
                      </div>
                      <div className="text-xs space-y-1.5 bg-white p-3 rounded-lg border border-rose-200">
                        <div><strong className="text-rose-800">Root Cause:</strong> <span className="text-[#56627A]">{inc.cause}</span></div>
                        <div className="pt-1 border-t border-rose-100"><strong className="text-[#16865B]">Architectural Lesson:</strong> <span className="text-[#56627A]">{inc.lesson}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================= ALA-5 INTERACTIVE SHOWCASE ======================= */}
          {activity.id === 'ALA-5' && (
            <div className="space-y-6">
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-[#172033] via-[#263B80] to-[#5269C9] text-white rounded-2xl p-6 shadow-card space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>28-Page Flash Sale Benchmark & Optimization Study</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white">
                      Cloud Performance Optimization: Load Balancing, Auto-Scaling & Monitoring
                    </h3>
                    <p className="text-xs sm:text-sm text-indigo-100 max-w-2xl mt-1 leading-relaxed">
                      24-hour e-commerce diurnal simulation peaking at 1,810 RPS, comparing 4 capacity provisioning strategies (72% cost savings), Proposed 7-Tier High-Performance Architecture, and Edge-to-Cloud Continuum.
                    </p>
                  </div>

                  <a
                    href="/reports/ALA-5.pdf"
                    download="GMIU_ALA5_Report_20230905090031.pdf"
                    className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-white text-[#263B80] hover:bg-indigo-50 font-extrabold text-xs transition-all shadow-md active:scale-95 shrink-0"
                  >
                    <FileDown className="w-4 h-4 text-[#263B80]" />
                    <span>Download 28-Page PDF</span>
                  </a>
                </div>
              </div>

              {/* 24-Hour Flash Sale Simulation Strategy Comparator */}
              <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                      <Gauge className="w-4 h-4 text-[#263B80]" />
                      <span>24-Hour E-Commerce Simulation: 4 Provisioning Strategies</span>
                    </h4>
                    <p className="text-xs text-[#778198]">
                      Peak traffic: {ALA5_PERF_OPTIMIZATION.simulation.peak_rps} RPS &bull; Avg: {ALA5_PERF_OPTIMIZATION.simulation.avg_rps} RPS &bull; Capacity: {ALA5_PERF_OPTIMIZATION.simulation.instance_cap}
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                    72% Cost Reduction
                  </span>
                </div>

                {/* Strategy Selection Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
                  {ALA5_PERF_OPTIMIZATION.simulation.strategies.map((strat, idx) => (
                    <button
                      key={idx}
                      onClick={() => setAla5StrategyIdx(idx)}
                      className={`p-3 rounded-xl border text-left transition-all space-y-1 ${
                        ala5StrategyIdx === idx
                          ? 'bg-[#263B80] text-white border-[#263B80] shadow-md'
                          : 'bg-[#F7F8FC] text-[#172033] border-[#E8EAF2] hover:border-[#263B80]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          ala5StrategyIdx === idx ? 'text-indigo-200' : 'text-[#778198]'
                        }`}>
                          Strategy {idx + 1}
                        </span>
                        {idx === 3 && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white font-bold text-[9px]">
                            OPTIMAL
                          </span>
                        )}
                      </div>
                      <h5 className="font-bold text-xs line-clamp-1">{strat.name}</h5>
                      <p className={`text-[11px] line-clamp-1 ${ala5StrategyIdx === idx ? 'text-indigo-100' : 'text-[#778198]'}`}>
                        {strat.vms} &bull; {strat.cost}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Selected Strategy Metrics Cards */}
                {(() => {
                  const s = ALA5_PERF_OPTIMIZATION.simulation.strategies[ala5StrategyIdx];
                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2]">
                        <span className="text-[10px] text-[#778198] font-bold uppercase">Provisioning</span>
                        <h5 className="text-sm font-extrabold text-[#172033] mt-0.5">{s.vms}</h5>
                      </div>
                      <div className="p-3 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2]">
                        <span className="text-[10px] text-[#778198] font-bold uppercase">Total Cost</span>
                        <h5 className="text-sm font-extrabold text-emerald-600 mt-0.5">{s.cost}</h5>
                      </div>
                      <div className="p-3 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2]">
                        <span className="text-[10px] text-[#778198] font-bold uppercase">Avg CPU Load</span>
                        <h5 className="text-sm font-extrabold text-[#5269C9] mt-0.5">{s.avg_cpu}</h5>
                      </div>
                      <div className="p-3 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2]">
                        <span className="text-[10px] text-[#778198] font-bold uppercase">p95 Latency</span>
                        <h5 className="text-sm font-extrabold text-[#172033] mt-0.5">{s.p95_latency}</h5>
                      </div>
                      <div className="p-3 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2]">
                        <span className="text-[10px] text-[#778198] font-bold uppercase">Time Over 80%</span>
                        <h5 className="text-sm font-extrabold text-amber-600 mt-0.5">{s.time_over_80}</h5>
                      </div>
                      <div className="p-3 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2]">
                        <span className="text-[10px] text-[#778198] font-bold uppercase">Time Saturated</span>
                        <h5 className={`text-sm font-extrabold mt-0.5 ${s.time_saturated === '0.0%' ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {s.time_saturated}
                        </h5>
                      </div>
                    </div>
                  );
                })()}

                {/* Verdict Callout */}
                <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-[#263B80] font-semibold">
                  <strong>Evaluation Verdict:</strong> {ALA5_PERF_OPTIMIZATION.simulation.strategies[ala5StrategyIdx].verdict}
                </div>

                {/* Latency vs Concurrency Curve Chart */}
                <div className="pt-3">
                  <h5 className="text-xs font-bold text-[#172033] mb-2">Concurrency vs Latency Profile (Locust Simulation)</h5>
                  <div className="h-60 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { users: '10 Users (120 RPS)', avg: 18.4, p95: 31.2, p99: 48.0 },
                          { users: '50 Users (640 RPS)', avg: 46.2, p95: 94.6, p99: 142.1 },
                          { users: '100 Users (1,810 RPS)', avg: 112.8, p95: 248.0, p99: 410.2 }
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

              {/* Proposed 7-Tier High-Performance Architecture */}
              <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                      <Layers className="w-4 h-4 text-[#263B80]" />
                      <span>Proposed High-Performance Cloud Architecture Layers</span>
                    </h4>
                    <p className="text-xs text-[#778198]">
                      Complete end-to-end multi-tier pipeline engineered for sub-second flash sale latency
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#263B80] bg-blue-50 px-2 py-0.5 rounded">
                    7 Active Layers
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {ALA5_PERF_OPTIMIZATION.architecture_layers.map((layer, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-[#E8EAF2] bg-[#F7F8FC] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-[#263B80]">Layer {idx + 1}</span>
                        <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
                          Active
                        </span>
                      </div>
                      <h5 className="font-bold text-xs text-[#172033]">{layer.layer}</h5>
                      <p className="text-[11px] text-[#56627A] leading-relaxed"><strong>Role:</strong> {layer.role}</p>
                      <p className="text-[11px] text-emerald-800 font-medium"><strong>Benefit:</strong> {layer.benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Edge-to-Cloud Continuum Latency Tiers */}
              <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
                <h4 className="font-bold text-sm text-[#172033] flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-[#16865B]" />
                  <span>Edge-to-Cloud Continuum Latency Distribution</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {ALA5_PERF_OPTIMIZATION.edge_fog_latency.map((ef, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-emerald-900">{ef.tier.split('(')[0]}</span>
                        <span className="text-xs font-mono font-extrabold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                          {ef.latency}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#56627A]">{ef.description}</p>
                    </div>
                  ))}
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
              <h3 className="font-bold text-base text-[#172033]">Official Practical Deliverables & Academic Evidence</h3>
              <p className="text-xs text-[#778198]">Direct view and verified download of authentic university report PDFs, source archives, and execution traces</p>
            </div>
            <span className="text-xs font-mono text-[#16865B] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-bold">
              Audited & Ready
            </span>
          </div>

          {/* Interactive Direct PDF Reader Frame */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-[#263B80]" />
                <h4 className="font-bold text-xs text-[#172033]">
                  Direct Embedded PDF Reader: {activity.id}.pdf
                </h4>
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href={`/reports/${activity.id}.pdf`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-[#263B80] hover:underline inline-flex items-center space-x-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Full Tab</span>
                </a>
                <button
                  onClick={handleDownloadPdf}
                  className="px-2.5 py-1 rounded-lg bg-[#263B80] text-white font-bold text-xs hover:bg-[#1f2f66] inline-flex items-center space-x-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </button>
              </div>
            </div>
            <div className="rounded-xl border border-[#E8EAF2] overflow-hidden bg-gray-100 shadow-inner">
              <iframe
                src={`/reports/${activity.id}.pdf`}
                title={`${activity.id} Official Academic Report`}
                className="w-full h-[650px] border-none"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#E8EAF2]">
            <div className="p-4 rounded-xl border border-[#E8EAF2] bg-[#F7F8FC] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#263B80]">Repository Artifact Root</span>
                <span className="text-[10px] font-mono text-[#778198]">evidence/{activity.id}/</span>
              </div>
              <p className="text-xs text-[#56627A]">
                All empirical scripts, system audit traces, benchmark CSVs, and technical documentation are persisted in the local and version-controlled file hierarchy.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-[#E8EAF2] space-y-2">
                <h4 className="text-xs font-bold text-[#172033]">Candidate Identity Verification</h4>
                <ul className="text-xs text-[#56627A] space-y-1">
                  <li>Student Name: <strong>{profile.full_name}</strong></li>
                  <li>Enrollment Number: <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono font-bold text-[#263B80]">{profile.enrollment_number}</code></li>
                  <li>Department: {profile.department}</li>
                  <li>University: {profile.university}</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-[#E8EAF2] space-y-2">
                <h4 className="text-xs font-bold text-[#172033]">Submission Details</h4>
                <ul className="text-xs text-[#56627A] space-y-1">
                  <li>Current Status: <StatusBadge status={currentStatus} size="sm" /></li>
                  <li>Academic Weightage: <strong>{activity.weightage}%</strong></li>
                  <li>Submission Deadline: <strong>30 November 2026</strong></li>
                  <li>Target Department: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[11px]">Information Technology (GMIU)</code></li>
                </ul>
              </div>
            </div>

            {/* Audited Deliverables Grid */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-[#172033] flex items-center space-x-1.5">
                <FileText className="w-4 h-4 text-[#263B80]" />
                <span>Verified Practical Deliverables & Evidence Archive</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-[#263B80]" />
                      <span className="font-bold text-xs text-[#172033]">{activity.id}.pdf</span>
                    </div>
                    <p className="text-[10px] text-[#778198]">Official academic report for examination submission</p>
                  </div>
                  <button
                    onClick={handleDownloadPdf}
                    className="px-2.5 py-1.5 rounded-lg bg-[#263B80] hover:bg-[#5269C9] text-white text-xs font-bold transition-colors inline-flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/40 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <Layers className="w-4 h-4 text-purple-700" />
                      <span className="font-bold text-xs text-[#172033]">Master_Portfolio.pdf</span>
                    </div>
                    <p className="text-[10px] text-[#778198]">Complete 93-page compilation of all 5 ALAs (3.68 MB)</p>
                  </div>
                  <a
                    href="/reports/GMIU_Cloud_Computing_Master_Portfolio_20230905090031.pdf"
                    download={`GMIU_Cloud_Computing_Master_Portfolio_${profile.enrollment_number}.pdf`}
                    className="px-2.5 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-colors inline-flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Master PDF</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Fullsize Image Zoom */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#172033] rounded-2xl border border-gray-700 overflow-hidden shadow-2xl p-4 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-white border-b border-gray-700 pb-3">
              <h4 className="font-bold text-sm">{selectedImage.title}</h4>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[75vh] overflow-auto flex items-center justify-center bg-black/50 rounded-xl p-2">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto object-contain rounded-lg"
              />
            </div>
            <p className="text-xs text-indigo-200 text-center pt-1">
              {selectedImage.description}
            </p>
          </div>
        </div>
      )}

      {/* MODAL: Fullscreen PDF Reader */}
      {pdfModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPdfModalOpen(false)}
        >
          <div
            className="relative max-w-6xl w-full h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-3 border-b border-[#E8EAF2] bg-[#F7F8FC]">
              <div className="flex items-center space-x-2 text-[#172033]">
                <FileText className="w-4 h-4 text-[#263B80]" />
                <h4 className="font-bold text-sm">{activity.id} Official Academic Report</h4>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDownloadPdf}
                  className="px-3 py-1.5 rounded-lg bg-[#263B80] text-white text-xs font-bold hover:bg-[#1f2f66] inline-flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => setPdfModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-gray-200">
              <iframe
                src={`/reports/${activity.id}.pdf`}
                title={`${activity.id} Fullscreen PDF`}
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
