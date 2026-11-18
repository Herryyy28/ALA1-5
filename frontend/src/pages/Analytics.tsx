import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { BENCHMARK_SCENARIOS, SLA_COMPARISON_DATA } from '../data/mockData';
import { BarChart3, TrendingUp, Cpu, Activity, Clock, ShieldCheck } from 'lucide-react';

export const Analytics: React.FC = () => {
  // Telemetry chart data for load testing
  const benchmarkChartData = [
    { users: '10 Users (Low)', rps: 30.7, avg_ms: 18.4, p95_ms: 31.2, cpu_pct: 14.8, ram_mb: 182 },
    { users: '50 Users (Med)', rps: 144.8, avg_ms: 46.2, p95_ms: 94.6, cpu_pct: 41.5, ram_mb: 264 },
    { users: '100 Users (High)', rps: 273.6, avg_ms: 112.8, p95_ms: 248.0, cpu_pct: 78.4, ram_mb: 418 }
  ];

  // SLA downtime comparison (minutes/month)
  const slaDowntimeData = [
    { name: 'EC2 / Azure / GCP VM', permittedMins: 4.32, commitment: '99.99%' },
    { name: 'Single VM Instance', permittedMins: 43.8, commitment: '99.90%' },
    { name: 'S3 / Blob Storage', permittedMins: 43.8, commitment: '99.90%' },
    { name: 'GCP Cloud Storage', permittedMins: 21.9, commitment: '99.95%' },
    { name: 'Azure SQL DB (Zone)', permittedMins: 2.16, commitment: '99.995%' }
  ];

  // VM Resource Allocation
  const vmAllocationData = [
    { name: 'Host Windows 11', totalGb: 12.0, allocatedGb: 8.0, freeGb: 4.0 },
    { name: 'GMIU-Ubuntu-VM-01', totalGb: 2.0, allocatedGb: 0.6, freeGb: 1.4 },
    { name: 'GMIU-Ubuntu-VM-02', totalGb: 2.0, allocatedGb: 0.5, freeGb: 1.5 }
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-2">
        <div className="text-[11px] font-bold text-[#5269C9] uppercase tracking-wider">
          Experimental Data & Observability
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#172033]">
          Practical Analytics & Telemetry Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-[#778198] leading-relaxed">
          Comprehensive empirical measurements, Locust benchmark graphs, SLA availability models, and host virtualization resource containment profiles.
        </p>
      </div>

      {/* Chart 1: Locust Latency & Throughput Curves */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#172033]">Locust Throughput (RPS) vs CPU Load</h3>
              <p className="text-xs text-[#778198]">Requests per second and server compute saturation</p>
            </div>
            <Activity className="w-4 h-4 text-[#263B80]" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarkChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EAF2" />
                <XAxis dataKey="users" stroke="#778198" fontSize={11} />
                <YAxis stroke="#778198" fontSize={11} />
                <Tooltip />
                <Legend />
                <Bar dataKey="rps" name="Throughput (Req/Sec)" fill="#263B80" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cpu_pct" name="Server CPU Load (%)" fill="#5269C9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#172033]">Latency Percentiles (Avg vs p95)</h3>
              <p className="text-xs text-[#778198]">Sub-millisecond degradation under rising concurrent load</p>
            </div>
            <TrendingUp className="w-4 h-4 text-[#5269C9]" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={benchmarkChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EAF2" />
                <XAxis dataKey="users" stroke="#778198" fontSize={11} />
                <YAxis stroke="#778198" fontSize={11} unit="ms" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avg_ms" name="Average Latency (ms)" stroke="#263B80" strokeWidth={2} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="p95_ms" name="95th Percentile (ms)" stroke="#D94D59" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart 2: SLA Permitted Outage & Memory Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#172033]">SLA Maximum Permitted Downtime (Minutes / Month)</h3>
              <p className="text-xs text-[#778198]">Calculated threshold before provider service credit liability triggers</p>
            </div>
            <Clock className="w-4 h-4 text-[#D99A2B]" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={slaDowntimeData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EAF2" />
                <XAxis type="number" stroke="#778198" fontSize={11} unit="m" />
                <YAxis dataKey="name" type="category" stroke="#778198" fontSize={10} width={100} />
                <Tooltip />
                <Bar dataKey="permittedMins" name="Permitted Down (Mins/Mo)" fill="#D99A2B" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#172033]">Virtualization RAM Allocation (GB)</h3>
              <p className="text-xs text-[#778198]">Host vs Guest VM memory reservation</p>
            </div>
            <Cpu className="w-4 h-4 text-[#16865B]" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vmAllocationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EAF2" />
                <XAxis dataKey="name" stroke="#778198" fontSize={11} />
                <YAxis stroke="#778198" fontSize={11} unit="GB" />
                <Tooltip />
                <Legend />
                <Bar dataKey="allocatedGb" name="In-Use Memory (GB)" fill="#263B80" radius={[4, 4, 0, 0]} />
                <Bar dataKey="freeGb" name="Available Memory (GB)" fill="#CBD2E1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
