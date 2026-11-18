import React, { useState } from 'react';
import { 
  Gauge, 
  Server, 
  ShieldCheck, 
  FileCheck2, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Activity, 
  Cpu, 
  HardDrive, 
  Terminal,
  Zap,
  TrendingUp,
  DollarSign
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
import { BENCHMARK_SCENARIOS, SLA_COMPARISON_DATA } from '../data/mockData';

export const PracticalLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'load_balancer' | 'locust' | 'hardware' | 'security' | 'sla'>('load_balancer');

  // Load Balancer Simulation State
  const [lbAlgorithm, setLbAlgorithm] = useState<'round_robin' | 'least_conn' | 'weighted'>('round_robin');
  const [requestCount, setRequestCount] = useState(0);
  const [serverLoads, setServerLoads] = useState([
    { id: 1, name: 'Web Node 01 (c6i.large)', connections: 14, weight: 3, capacity: 50, requests: 0 },
    { id: 2, name: 'Web Node 02 (c6i.large)', connections: 8, weight: 2, capacity: 50, requests: 0 },
    { id: 3, name: 'Web Node 03 (c6i.xlarge)', connections: 22, weight: 5, capacity: 100, requests: 0 }
  ]);
  const [recentTraffic, setRecentTraffic] = useState<string[]>([]);

  // Locust benchmark runner state
  const [selectedUsers, setSelectedUsers] = useState<10 | 50 | 100>(50);
  const [isRunningLocust, setIsRunningLocust] = useState(false);
  const [locustLogs, setLocustLogs] = useState<string[]>([]);

  // SLA downtime calculator state
  const [uptimePct, setUptimePct] = useState<number>(99.95);
  const [monthlySpend, setMonthlySpend] = useState<number>(5000);

  // Send request through simulated load balancer
  const handleSendTraffic = (count: number = 1) => {
    let targetIndex = 0;
    if (lbAlgorithm === 'round_robin') {
      targetIndex = requestCount % serverLoads.length;
    } else if (lbAlgorithm === 'least_conn') {
      let minConn = Infinity;
      serverLoads.forEach((s, idx) => {
        if (s.connections < minConn) {
          minConn = s.connections;
          targetIndex = idx;
        }
      });
    } else {
      // Weighted
      const totalWeight = serverLoads.reduce((acc, s) => acc + s.weight, 0);
      const rand = Math.random() * totalWeight;
      let cum = 0;
      for (let i = 0; i < serverLoads.length; i++) {
        cum += serverLoads[i].weight;
        if (rand <= cum) {
          targetIndex = i;
          break;
        }
      }
    }

    const updated = [...serverLoads];
    updated[targetIndex].requests += count;
    updated[targetIndex].connections += count;
    setServerLoads(updated);
    setRequestCount(prev => prev + count);

    const log = `[${new Date().toLocaleTimeString()}] HTTP GET /api/ala/query -> Routed to ${serverLoads[targetIndex].name} via ${lbAlgorithm.toUpperCase()}`;
    setRecentTraffic(prev => [log, ...prev.slice(0, 7)]);
  };

  const handleResetLb = () => {
    setRequestCount(0);
    setServerLoads([
      { id: 1, name: 'Web Node 01 (c6i.large)', connections: 0, weight: 3, capacity: 50, requests: 0 },
      { id: 2, name: 'Web Node 02 (c6i.large)', connections: 0, weight: 2, capacity: 50, requests: 0 },
      { id: 3, name: 'Web Node 03 (c6i.xlarge)', connections: 0, weight: 5, capacity: 100, requests: 0 }
    ]);
    setRecentTraffic([]);
  };

  const handleRunLocustTest = () => {
    setIsRunningLocust(true);
    setLocustLogs([`[INIT] Spawning ${selectedUsers} virtual users with spawn-rate ${selectedUsers === 10 ? 2 : selectedUsers === 50 ? 5 : 10} u/s...`]);

    setTimeout(() => {
      setLocustLogs(prev => [...prev, `[BENCHMARK] Warming up connection pool. Target: http://localhost:8080/api/ala`]);
    }, 600);

    setTimeout(() => {
      setLocustLogs(prev => [...prev, `[TELEMETRY] Load generated: ${selectedUsers} concurrent sessions. Error rate: 0.00%`]);
    }, 1200);

    setTimeout(() => {
      const b = selectedUsers === 10 ? BENCHMARK_SCENARIOS.low : selectedUsers === 50 ? BENCHMARK_SCENARIOS.medium : BENCHMARK_SCENARIOS.high;
      setLocustLogs(prev => [
        ...prev,
        `[COMPLETE] Execution Finished: ${b.total_requests} requests handled at ${b.rps} RPS. Avg: ${b.avg_latency_ms}ms, p95: ${b.p95_latency_ms}ms, Server CPU: ${b.cpu_percent}%.`
      ]);
      setIsRunningLocust(false);
    }, 1800);
  };

  // Calculate SLA downtime metrics
  const totalMinutesInMonth = 30 * 24 * 60; // 43,200 minutes
  const allowedDownMinutes = ((100 - uptimePct) / 100) * totalMinutesInMonth;
  const potentialCredit = uptimePct < 99.0 ? monthlySpend * 0.3 : uptimePct < 99.9 ? monthlySpend * 0.1 : 0;

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
        <div>
          <div className="text-[11px] font-bold text-[#5269C9] uppercase tracking-wider mb-1">
            GMIU Cloud Computing Practical Laboratory
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#172033]">
            Interactive Practical Demonstration Suite
          </h1>
          <p className="text-xs sm:text-sm text-[#778198] mt-1.5 leading-relaxed">
            Hands-on sandboxes and diagnostic simulators covering Load Balancing (ALA 5), Locust Concurrency Benchmarking, Hardware Virtualization Telemetry (ALA 2), Cloud Security Posture (ALA 3), and SLA Financial Calculators (ALA 4).
          </p>
        </div>

        {/* Laboratory Tabs */}
        <div className="flex overflow-x-auto border-b border-[#E8EAF2] pt-2 gap-2 text-xs font-bold scrollbar-none">
          {[
            { id: 'load_balancer', label: '1. Load Balancer Simulator', icon: Gauge },
            { id: 'locust', label: '2. Locust Load Tester', icon: Activity },
            { id: 'hardware', label: '3. Host Hardware Audit', icon: Cpu },
            { id: 'security', label: '4. Cloud Security Posture', icon: ShieldCheck },
            { id: 'sla', label: '5. SLA Downtime & Credits', icon: DollarSign },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-3 transition-colors border-b-2 flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#263B80] text-[#263B80]'
                    : 'border-transparent text-[#778198] hover:text-[#172033]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. LOAD BALANCER SIMULATOR */}
      {activeTab === 'load_balancer' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-base text-[#172033]">Layer 7 Load Balancer Algorithm Simulator</h3>
                <p className="text-xs text-[#778198]">Test traffic distribution mechanics between Round Robin, Least Connections, and Weighted algorithms</p>
              </div>

              <div className="flex items-center space-x-2">
                <div className="inline-flex rounded-xl p-1 bg-[#F7F8FC] border border-[#E8EAF2]">
                  {(['round_robin', 'least_conn', 'weighted'] as const).map((algo) => (
                    <button
                      key={algo}
                      onClick={() => setLbAlgorithm(algo)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
                        lbAlgorithm === algo
                          ? 'bg-[#263B80] text-white shadow-sm'
                          : 'text-[#778198] hover:text-[#172033]'
                      }`}
                    >
                      {algo.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleResetLb}
                  className="p-2 rounded-xl text-[#778198] hover:text-[#D94D59] hover:bg-red-50 border border-[#E8EAF2] transition-colors"
                  title="Reset metrics"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 p-4 bg-[#F7F8FC] rounded-xl border border-[#E8EAF2]">
              <button
                onClick={() => handleSendTraffic(1)}
                className="px-4 py-2 rounded-xl bg-[#263B80] hover:bg-[#1f2f66] text-white text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>Send 1 Request</span>
              </button>
              <button
                onClick={() => handleSendTraffic(10)}
                className="px-4 py-2 rounded-xl bg-[#5269C9] hover:bg-[#4359b3] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                Send 10 Requests
              </button>
              <button
                onClick={() => handleSendTraffic(50)}
                className="px-4 py-2 rounded-xl bg-[#8065D9] hover:bg-[#6e54c7] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                Send Burst (50 Requests)
              </button>
              <span className="text-xs font-mono text-[#778198] ml-auto">
                Total Requests Dispatched: <strong className="text-[#172033]">{requestCount}</strong>
              </span>
            </div>

            {/* Server Nodes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {serverLoads.map((server) => {
                const pct = Math.min(100, Math.round((server.connections / server.capacity) * 100));
                return (
                  <div key={server.id} className="p-4 rounded-xl border border-[#E8EAF2] bg-white shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Server className="w-4 h-4 text-[#263B80]" />
                        <h4 className="font-bold text-xs text-[#172033]">{server.name}</h4>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                        Healthy
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#778198]">Load / Utilization</span>
                        <span className="font-bold text-[#172033]">{server.connections} conns ({pct}%)</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            pct > 80 ? 'bg-[#D94D59]' : pct > 50 ? 'bg-[#D99A2B]' : 'bg-[#16865B]'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E8EAF2] flex justify-between text-[11px] text-[#778198]">
                      <span>Processed: <strong className="text-[#172033]">{server.requests}</strong></span>
                      <span>Weight: <strong className="text-[#172033]">{server.weight}x</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Traffic Dispatched Log */}
            <div>
              <h4 className="text-xs font-bold text-[#172033] mb-2 flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#5269C9]" />
                <span>Live Load Balancer Ingress Access Log</span>
              </h4>
              <div className="p-3 bg-[#172033] text-indigo-200 text-xs font-mono rounded-xl space-y-1 min-h-[90px]">
                {recentTraffic.length === 0 ? (
                  <p className="text-gray-400">Click "Send 1 Request" or "Send Burst" above to route traffic...</p>
                ) : (
                  recentTraffic.map((t, i) => <div key={i}>{t}</div>)
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. LOCUST LOAD TESTER */}
      {activeTab === 'locust' && (
        <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-base text-[#172033]">Locust Concurrency Benchmark Execution</h3>
              <p className="text-xs text-[#778198]">Execute headless load tests against the simulated application cluster</p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="inline-flex rounded-xl p-1 bg-[#F7F8FC] border border-[#E8EAF2]">
                {[10, 50, 100].map((u) => (
                  <button
                    key={u}
                    onClick={() => setSelectedUsers(u as any)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      selectedUsers === u
                        ? 'bg-[#263B80] text-white shadow-sm'
                        : 'text-[#778198] hover:text-[#172033]'
                    }`}
                  >
                    {u} Virtual Users
                  </button>
                ))}
              </div>

              <button
                onClick={handleRunLocustTest}
                disabled={isRunningLocust}
                className="px-4 py-2 rounded-xl bg-[#16865B] hover:bg-[#126b48] text-white text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50 flex items-center space-x-1.5"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isRunningLocust ? 'Running Test...' : 'Run Benchmark'}</span>
              </button>
            </div>
          </div>

          {/* Telemetry Output Terminal */}
          <div className="p-4 bg-[#172033] text-emerald-400 font-mono text-xs rounded-xl space-y-1 min-h-[120px]">
            {locustLogs.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>

          {/* Results Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {[
              { title: 'Scenario 1 (Low Load)', users: '10 Users', res: BENCHMARK_SCENARIOS.low },
              { title: 'Scenario 2 (Medium Load)', users: '50 Users', res: BENCHMARK_SCENARIOS.medium },
              { title: 'Scenario 3 (High Load)', users: '100 Users', res: BENCHMARK_SCENARIOS.high },
            ].map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#E8EAF2] bg-[#F7F8FC] space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-xs text-[#263B80]">{s.title}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-[#E8EAF2] text-[#172033]">
                    {s.users}
                  </span>
                </div>
                <div className="text-xs space-y-1 text-[#56627A]">
                  <div className="flex justify-between"><span>Throughput:</span><strong>{s.res.rps} req/sec</strong></div>
                  <div className="flex justify-between"><span>Avg Latency:</span><strong>{s.res.avg_latency_ms} ms</strong></div>
                  <div className="flex justify-between"><span>95th Percentile:</span><strong className="text-amber-600">{s.res.p95_latency_ms} ms</strong></div>
                  <div className="flex justify-between"><span>Server CPU Load:</span><strong>{s.res.cpu_percent}%</strong></div>
                  <div className="flex justify-between"><span>Error Rate:</span><strong>{s.res.error_rate}%</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. HOST HARDWARE AUDIT */}
      {activeTab === 'hardware' && (
        <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#172033]">Host Hardware & Virtualization Audit Telemetry</h3>
              <p className="text-xs text-[#778198]">Direct hardware measurements from the Windows 11 host workstation</p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
              Host Audited
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2]">
              <p className="text-[10px] font-bold text-[#778198] uppercase">Processor Architecture</p>
              <h4 className="text-sm font-extrabold text-[#172033] mt-1">Intel Core i5-12450HX</h4>
              <p className="text-[11px] text-[#778198] mt-0.5">8 Physical / 12 Logical Cores</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2]">
              <p className="text-[10px] font-bold text-[#778198] uppercase">System RAM Allocation</p>
              <h4 className="text-sm font-extrabold text-[#172033] mt-1">12.0 GB Total</h4>
              <p className="text-[11px] text-[#778198] mt-0.5">~3.0 GB Free Physical Memory</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2]">
              <p className="text-[10px] font-bold text-[#778198] uppercase">Virtualization Support</p>
              <h4 className="text-sm font-extrabold text-[#D99A2B] mt-1">VT-x UEFI Disabled</h4>
              <p className="text-[11px] text-[#778198] mt-0.5">Automated scripts & guide provided</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F7F8FC] border border-[#E8EAF2]">
              <p className="text-[10px] font-bold text-[#778198] uppercase">Storage Capacity</p>
              <h4 className="text-sm font-extrabold text-[#172033] mt-1">164.3 GB Free Space</h4>
              <p className="text-[11px] text-[#778198] mt-0.5">C: 39.9 GB | D: 124.4 GB</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. CLOUD SECURITY POSTURE */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-5">
          <div>
            <h3 className="font-bold text-base text-[#172033]">Enterprise Cloud Security Architecture</h3>
            <p className="text-xs text-[#778198]">Cryptographic key management and IAM governance across cloud providers</p>
          </div>

          <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50 space-y-3">
            <h4 className="font-bold text-xs text-[#263B80] flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#263B80]" />
              <span>Envelope Encryption Mechanism (KMS + Data Encryption Keys)</span>
            </h4>
            <div className="font-mono text-xs text-[#56627A] p-3 bg-white rounded-lg border border-[#E8EAF2]">
              Plaintext Data + Data Encryption Key (DEK) -&gt; AES-256-GCM Ciphertext<br/>
              DEK + Key Encryption Key (KEK in Cloud KMS / HSM) -&gt; Encrypted DEK<br/>
              Result: Plaintext DEK discarded immediately from memory. Encrypted DEK stored alongside Ciphertext.
            </div>
          </div>
        </div>
      )}

      {/* 5. SLA DOWNTIME & CREDITS CALCULATOR */}
      {activeTab === 'sla' && (
        <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-6">
          <div>
            <h3 className="font-bold text-base text-[#172033]">Service Level Agreement (SLA) Financial Credit Calculator</h3>
            <p className="text-xs text-[#778198]">Compute monthly permissible downtime and customer service credit eligibility</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1">
                  Target Availability Commitment (Uptime %)
                </label>
                <select
                  value={uptimePct}
                  onChange={(e) => setUptimePct(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8EAF2] font-bold"
                >
                  <option value={99.999}>99.999% ("Five Nines" - Critical Services)</option>
                  <option value={99.99}>99.99% ("Four Nines" - Multi-AZ EC2 / Azure VM)</option>
                  <option value={99.95}>99.95% (RDS Multi-AZ / Cloud SQL HA)</option>
                  <option value={99.9}>99.9% ("Three Nines" - Single VM / S3)</option>
                  <option value={99.0}>99.0% (Single Availability Zone)</option>
                  <option value={95.0}>95.0% (Major Disaster Outage)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1">
                  Monthly Cloud Bill ($ USD)
                </label>
                <input
                  type="number"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8EAF2] font-bold"
                >
                </input>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7F8FC] border border-[#E8EAF2] space-y-3">
              <h4 className="font-bold text-xs text-[#263B80] uppercase tracking-wider">Calculated SLA Impact</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#778198]">Permitted Outage (Monthly):</span>
                  <strong className="text-amber-700">{allowedDownMinutes.toFixed(2)} minutes</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#778198]">Permitted Outage (Annual):</span>
                  <strong className="text-amber-700">{(allowedDownMinutes * 12 / 60).toFixed(2)} hours</strong>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E8EAF2]">
                  <span className="text-[#778198]">Estimated Service Credit:</span>
                  <strong className="text-emerald-700">${potentialCredit.toFixed(2)} USD</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
