import React, { useState } from 'react';
import { Network, Cloud, Server, ShieldCheck, FileCheck2, Gauge, Layers, ArrowRight } from 'lucide-react';

export const Architectures: React.FC = () => {
  const [selectedAla, setSelectedAla] = useState<'ALA-1' | 'ALA-2' | 'ALA-3' | 'ALA-4' | 'ALA-5'>('ALA-1');

  const architectures = {
    'ALA-1': {
      title: 'ALA 1 – Cloud Application Deployment Architecture',
      desc: 'Edge-distributed Single Page Application paired with Serverless PostgreSQL and Row Level Security.',
      nodes: [
        { name: 'End Users / Browsers', type: 'Client Tier', desc: 'HTTPS Requests / Dynamic React SPA' },
        { name: 'Netlify Edge CDN', type: 'Edge Routing', desc: 'Global Anycast DNS, SSL/TLS Termination, Gzip/Brotli Assets' },
        { name: 'React 18 Single Page App', type: 'Presentation Tier', desc: 'TypeScript, Tailwind CSS, Client State & Offline Sync' },
        { name: 'Supabase PostgREST API', type: 'API Gateway', desc: 'JWT Authentication, CORS Validation, Rate Limiting' },
        { name: 'PostgreSQL Database', type: 'Persistence Tier', desc: 'Row Level Security (RLS) Isolation, Automated Backups' }
      ]
    },
    'ALA-2': {
      title: 'ALA 2 – Hypervisor & Dual Virtual Machine Topology',
      desc: 'Type-2 hosted hypervisor architecture isolating guest Linux kernels from Windows 11 host resources.',
      nodes: [
        { name: 'Host Physical Hardware', type: 'Layer 0', desc: 'Intel Core i5-12450HX (8C/12T), 12GB DDR4 RAM, 512GB NVMe' },
        { name: 'Host OS (Windows 11 Home)', type: 'Layer 1', desc: 'Kernel Process Scheduler, NT File System, Device Drivers' },
        { name: 'Oracle VirtualBox 7.x', type: 'Hypervisor', desc: 'Type-2 Virtual Machine Monitor (VMM), VT-x CPU Virtualizer' },
        { name: 'GMIU-Ubuntu-VM-01', type: 'Guest VM 1', desc: '2 vCPUs, 2048 MB RAM, 25GB Dynamic VDI, Isolated NAT' },
        { name: 'GMIU-Ubuntu-VM-02', type: 'Guest VM 2', desc: '1 vCPU, 2048 MB RAM, 20GB Dynamic VDI, Isolated NAT' }
      ]
    },
    'ALA-3': {
      title: 'ALA 3 – Zero-Trust Cloud Security & KMS Envelope Flow',
      desc: 'Multi-layer security perimeter incorporating identity governance, role assumption, and cryptographic envelope key wrapping.',
      nodes: [
        { name: 'Client Identity Request', type: 'Identity', desc: 'OAuth 2.0 / OpenID Connect with Multi-Factor Authentication' },
        { name: 'Cloud IAM Policy Engine', type: 'Authorization', desc: 'Least Privilege RBAC Policy Evaluation & Role Assumption' },
        { name: 'Cloud KMS (AWS / Azure / GCP)', type: 'Cryptography', desc: 'Master Key Encryption Key (KEK) in FIPS 140-2 Level 3 HSM' },
        { name: 'Data Encryption Key (DEK)', type: 'Envelope Layer', desc: 'Ephemeral 256-bit symmetric key generated per payload' },
        { name: 'Storage at Rest (S3/Blob)', type: 'Storage', desc: 'AES-256-GCM Encrypted Ciphertext + Wrapped DEK' }
      ]
    },
    'ALA-4': {
      title: 'ALA 4 – Multi-Region High-Availability & SLA Architecture',
      desc: 'Geographic failover achieving 99.999% composite availability overcoming single-region cloud outages.',
      nodes: [
        { name: 'Global Anycast DNS', type: 'Routing Tier', desc: 'Route 53 / Azure Traffic Manager Latency & Health Probing' },
        { name: 'Region A (Primary - Mumbai)', type: 'Active Region', desc: 'Multi-AZ Auto-Scaled Web Nodes + RDS Primary (99.99%)' },
        { name: 'Real-Time Replication Link', type: 'Sync Tier', desc: 'Cross-Region Storage Replication & Read Replicas' },
        { name: 'Region B (Standby - Singapore)', type: 'DR Region', desc: 'Warm Standby Cluster, RTO < 15 mins, RPO < 1 min' },
        { name: 'Composite Uptime SLA', type: 'Availability', desc: '1 - (0.0001 * 0.0001) = 99.9999% Reliability' }
      ]
    },
    'ALA-5': {
      title: 'ALA 5 – Dynamic Auto-Scaling & Load Balancing Topology',
      desc: 'Elastic traffic distribution across horizontal container clusters with real-time telemetry scaling triggers.',
      nodes: [
        { name: 'Incoming Traffic (Locust)', type: 'Traffic Source', desc: 'Synthetic Workloads (10, 50, 100 Virtual Users)' },
        { name: 'Application Load Balancer', type: 'Layer 7 LB', desc: 'Round Robin & Least Connections Health-Checked Dispatch' },
        { name: 'Auto-Scaling Group', type: 'Compute Fleet', desc: 'Dynamic Scale-Out (CPU > 70%) and Scale-In (CPU < 30%)' },
        { name: 'Application Worker Nodes', type: 'Node Fleet', desc: 'Stateless Node / Python Containers serving HTTP Endpoints' },
        { name: 'Monitoring Telemetry', type: 'Observability', desc: 'CloudWatch / Prometheus tracking RPS, p95 Latency & Memory' }
      ]
    }
  };

  const current = architectures[selectedAla];

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
        <div>
          <div className="text-[11px] font-bold text-[#5269C9] uppercase tracking-wider mb-1">
            Visual Architecture & System Topologies
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#172033]">
            Cloud Computing Practical Architecture Gallery
          </h1>
          <p className="text-xs sm:text-sm text-[#778198] mt-1.5 leading-relaxed">
            Detailed architectural specifications, tier layers, and data-flow models designed for all five university ALA practical projects.
          </p>
        </div>

        {/* ALA Selector Buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          {(['ALA-1', 'ALA-2', 'ALA-3', 'ALA-4', 'ALA-5'] as const).map((ala) => (
            <button
              key={ala}
              onClick={() => setSelectedAla(ala)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedAla === ala
                  ? 'bg-[#263B80] text-white shadow-md shadow-[#263B80]/20'
                  : 'bg-[#F7F8FC] border border-[#E8EAF2] text-[#56627A] hover:text-[#172033]'
              }`}
            >
              {ala}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Architecture Display */}
      <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-[#172033]">{current.title}</h3>
            <p className="text-xs text-[#778198] mt-1">{current.desc}</p>
          </div>
          <a
            href={`/diagrams/${selectedAla.replace('-', '') === 'ALA1' ? 'ALA1_deployment_architecture.svg' : selectedAla.replace('-', '') === 'ALA2' ? 'ALA2_hypervisor_topology.svg' : selectedAla.replace('-', '') === 'ALA3' ? 'ALA3_kms_envelope_flow.svg' : selectedAla.replace('-', '') === 'ALA4' ? 'ALA4_multi_cloud_sla.svg' : 'ALA5_load_balancing_autoscale.svg'}`}
            download
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#E8EAF2] text-xs font-bold text-[#263B80] hover:bg-[#F7F8FC]"
          >
            <span>Download Vector SVG</span>
          </a>
        </div>

        {/* Vector SVG Architecture Render */}
        <div className="p-3 bg-[#F7F8FC] rounded-2xl border border-[#E8EAF2] flex justify-center overflow-hidden">
          <img
            src={`/diagrams/${selectedAla.replace('-', '') === 'ALA1' ? 'ALA1_deployment_architecture.svg' : selectedAla.replace('-', '') === 'ALA2' ? 'ALA2_hypervisor_topology.svg' : selectedAla.replace('-', '') === 'ALA3' ? 'ALA3_kms_envelope_flow.svg' : selectedAla.replace('-', '') === 'ALA4' ? 'ALA4_multi_cloud_sla.svg' : 'ALA5_load_balancing_autoscale.svg'}`}
            alt={current.title}
            className="w-full max-h-[360px] object-contain rounded-xl shadow-sm bg-white p-2"
          />
        </div>

        {/* Interactive Architecture Flow Diagram */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-[#263B80] uppercase tracking-wider">
            Sequential Data & Infrastructure Pipeline
          </h4>

          <div className="space-y-3">
            {current.nodes.map((node, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-[#E8EAF2] bg-[#F7F8FC] hover:bg-white hover:border-[#5269C9] transition-all group">
                <div className="flex items-center space-x-3 sm:w-1/3">
                  <div className="w-8 h-8 rounded-lg bg-[#263B80] text-white flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform flex-shrink-0">
                    0{index + 1}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#172033]">{node.name}</h5>
                    <span className="text-[10px] font-bold text-[#5269C9] uppercase">{node.type}</span>
                  </div>
                </div>

                <div className="flex-1 text-xs text-[#56627A] sm:border-l border-[#E8EAF2] sm:pl-4">
                  {node.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
