import React, { useState } from 'react';
import { BookOpen, ShieldCheck, FileCheck2, FileDown, Search, ArrowRight, ExternalLink } from 'lucide-react';
import { SECURITY_COMPARISON_DATA, SLA_COMPARISON_DATA } from '../data/mockData';

export const ResearchPapers: React.FC = () => {
  const [activePaper, setActivePaper] = useState<'ala3' | 'ala4'>('ala3');

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold text-[#5269C9] uppercase tracking-wider mb-1">
              Peer-Reviewed Academic & Case Research
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#172033]">
              Cloud Computing Research Papers & Case Studies
            </h1>
            <p className="text-xs sm:text-sm text-[#778198] mt-1.5 leading-relaxed">
              Formal academic research papers covering Enterprise Cloud Security (ALA 3) and Provider SLA & Multi-Cloud Risk Governance (ALA 4).
            </p>
          </div>

          <div className="inline-flex rounded-xl p-1 bg-[#F7F8FC] border border-[#E8EAF2]">
            <button
              onClick={() => setActivePaper('ala3')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center space-x-2 ${
                activePaper === 'ala3'
                  ? 'bg-[#263B80] text-white shadow-sm'
                  : 'text-[#778198] hover:text-[#172033]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ALA 3 Security Paper</span>
            </button>
            <button
              onClick={() => setActivePaper('ala4')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center space-x-2 ${
                activePaper === 'ala4'
                  ? 'bg-[#263B80] text-white shadow-sm'
                  : 'text-[#778198] hover:text-[#172033]'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>ALA 4 SLA Case Study</span>
            </button>
          </div>
        </div>
      </div>

      {/* PAPER 1: ALA 3 SECURITY REVIEW PAPER (25 SECTIONS) */}
      {activePaper === 'ala3' && (
        <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 sm:p-8 shadow-card space-y-8 text-xs sm:text-sm text-[#172033] leading-relaxed">
          <div className="border-b border-[#E8EAF2] pb-6 space-y-2 text-center">
            <span className="text-[11px] font-bold text-[#263B80] uppercase tracking-wider">
              Research Review Paper &bull; Cloud Security Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#172033]">
              Comprehensive Review of Security Features in Cloud Computing Platforms
            </h2>
            <p className="text-xs text-[#778198]">
              Author: <strong>Herry Prajapati</strong> &bull; Enrollment No: <strong>20230905090031</strong><br/>
              Department of Information Technology, Gyanmanjari Institute of Technology (GMIU)
            </p>
          </div>

          {/* Section 1: Abstract & Keywords */}
          <section className="space-y-2">
            <h3 className="font-bold text-sm text-[#263B80]">1. Abstract</h3>
            <p className="text-[#56627A]">
              Cloud computing has transformed institutional and commercial digital operations by offering on-demand scalability, ubiquitous network accessibility, and elastic resource virtualization. However, transferring mission-critical workloads to multi-tenant environments introduces severe vulnerabilities spanning unauthorized data exfiltration, identity privilege escalation, and cryptographic implementation lapses. This research paper conducts a rigorous comparative architectural evaluation of security features across the three premier cloud service providers: Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). Focusing primarily on AWS as the reference platform, we investigate Identity and Access Management (IAM), envelope key encryption architectures (KMS), zero-trust network boundaries, posture management, and compliance auditing. Finally, real-world breach analyses (including the Capital One SSRF metadata incident and exposed storage buckets) demonstrate essential enterprise hardening blueprints.
            </p>
            <p className="text-xs text-[#778198] pt-1">
              <strong>Keywords:</strong> Cloud Security, AWS IAM, Azure Entra ID, Google Cloud KMS, Envelope Encryption, Principle of Least Privilege, Zero-Trust Architecture, Posture Management.
            </p>
          </section>

          {/* Section 2: Introduction */}
          <section className="space-y-2">
            <h3 className="font-bold text-sm text-[#263B80]">2. Introduction</h3>
            <p className="text-[#56627A]">
              The proliferation of Infrastructure-as-a-Service (IaaS), Platform-as-a-Service (PaaS), and Software-as-a-Service (SaaS) necessitates a paradigm shift from traditional perimeter firewalls to software-defined, identity-centric protection. According to the Cloud Security Alliance (CSA), over 82% of security breaches originate from customer misconfigurations rather than hypervisor hardware flaws. Understanding the granular mechanics of cloud security features is therefore paramount for enterprise cloud architects and security engineers.
            </p>
          </section>

          {/* Section 3: Shared Responsibility Model */}
          <section className="space-y-2">
            <h3 className="font-bold text-sm text-[#263B80]">3. The Shared Responsibility Model</h3>
            <p className="text-[#56627A]">
              Security in the cloud functions under an explicit division of accountability between the Cloud Service Provider (CSP) and the tenant. The CSP assumes responsibility for security "OF" the cloud—physical data centers, host hypervisors, server hardware, and edge network backbones. Conversely, the tenant retains strict liability for security "IN" the cloud—identity lifecycle, password policies, Role-Based Access Control (RBAC), data encryption keys, and network security group firewalls.
            </p>
          </section>

          {/* Section 4: Identity & Access Management (IAM) */}
          <section className="space-y-2">
            <h3 className="font-bold text-sm text-[#263B80]">4. Identity and Access Management (IAM) & Least Privilege</h3>
            <p className="text-[#56627A]">
              IAM serves as the foundational control plane in modern cloud security. AWS IAM utilizes declarative JSON policy documents evaluated via deterministic algorithms that default to explicit denial. Under the <em>Principle of Least Privilege</em> (PoLP), identities are granted solely the minimal permissions required to complete specific operational tasks for a bounded duration.
            </p>
            <div className="bg-[#172033] text-indigo-200 p-3 rounded-xl font-mono text-xs">
{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "EnforceLeastPrivilegeS3ReadOnly",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::gmiu-student-ala-evidence",
        "arn:aws:s3:::gmiu-student-ala-evidence/*"
      ],
      "Condition": {
        "Bool": { "aws:SecureTransport": "true" }
      }
    }
  ]
}`}
            </div>
          </section>

          {/* Section 5: Cryptographic Key Management (KMS) & Envelope Encryption */}
          <section className="space-y-2">
            <h3 className="font-bold text-sm text-[#263B80]">5. Data Protection: Envelope Encryption Mechanics</h3>
            <p className="text-[#56627A]">
              Directly sending massive data payloads over networks to Key Management Services introduces significant latency and bandwidth constraints. Modern cloud security solves this via <strong>Envelope Encryption</strong>:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-[#56627A]">
              <li>The application requests a Data Encryption Key (DEK) from AWS KMS using a Customer Master Key (CMK / KEK).</li>
              <li>KMS returns two versions: a plaintext DEK and a ciphertext DEK encrypted under the KEK.</li>
              <li>The application encrypts local data with the plaintext DEK using AES-256-GCM.</li>
              <li>The plaintext DEK is permanently purged from host volatile memory; only the encrypted DEK is persisted alongside ciphertext.</li>
            </ol>
          </section>

          {/* Section 6: Comparative Platform Matrix */}
          <section className="space-y-3">
            <h3 className="font-bold text-sm text-[#263B80]">6. Comparative Matrix: AWS vs Microsoft Azure vs Google Cloud</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-[#E8EAF2]">
                <thead>
                  <tr className="bg-[#F7F8FC] text-[#263B80] font-bold border-b border-[#E8EAF2]">
                    <th className="p-2.5">Domain</th>
                    <th className="p-2.5">AWS</th>
                    <th className="p-2.5">Microsoft Azure</th>
                    <th className="p-2.5">Google Cloud</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8EAF2]">
                  {SECURITY_COMPARISON_DATA.map((s, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-bold text-[#172033]">{s.category}</td>
                      <td className="p-2.5 text-[#56627A]">{s.aws}</td>
                      <td className="p-2.5 text-[#56627A]">{s.azure}</td>
                      <td className="p-2.5 text-[#56627A]">{s.gcp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 7: Incident Case Studies & Conclusion */}
          <section className="space-y-2">
            <h3 className="font-bold text-sm text-[#263B80]">7. Real-World Breach Analysis & Lessons Learned</h3>
            <p className="text-[#56627A]">
              <strong>Capital One Incident (2019):</strong> An attacker exploited a Server-Side Request Forgery (SSRF) flaw in a misconfigured WAF instance to query the AWS EC2 instance metadata service (169.254.169.254), stealing temporary IAM role session tokens that permitted excessive read permissions across hundreds of S3 buckets. <em>Mitigation:</em> Mandating IMDSv2 (session-oriented metadata tokens) and applying fine-grained IAM permission boundaries.
            </p>
            <p className="text-[#56627A] pt-2">
              <strong>Conclusion:</strong> Enterprise cloud security requires defense-in-depth, continuous IAM audit telemetry through CloudTrail and GuardDuty, strict envelope encryption, and automated compliance testing.
            </p>
          </section>
        </div>
      )}

      {/* PAPER 2: ALA 4 SLA & RISK MANAGEMENT CASE STUDY */}
      {activePaper === 'ala4' && (
        <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 sm:p-8 shadow-card space-y-8 text-xs sm:text-sm text-[#172033] leading-relaxed">
          <div className="border-b border-[#E8EAF2] pb-6 space-y-2 text-center">
            <span className="text-[11px] font-bold text-[#263B80] uppercase tracking-wider">
              Comparative Case Study &bull; SLA Governance & Risk Management
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#172033]">
              Comparative Case Study of AWS, Microsoft Azure and Google Cloud: SLA, Risk Management and Compliance
            </h2>
            <p className="text-xs text-[#778198]">
              Candidate: <strong>Herry Prajapati</strong> &bull; Enrollment No: <strong>20230905090031</strong><br/>
              Gyanmanjari Institute of Technology (GMIU) &bull; Cloud Computing
            </p>
          </div>

          <section className="space-y-2">
            <h3 className="font-bold text-sm text-[#263B80]">1. Executive Summary</h3>
            <p className="text-[#56627A]">
              Service Level Agreements (SLAs) represent the contractual backbone defining reliability commitments, uptime measurement metrics, and financial compensation protocols between cloud providers and customers. This case study evaluates published SLA documents across AWS, Microsoft Azure, and Google Cloud, detailing uptime tiers from 99.0% to 99.999%, service credit claim schedules, exclusions, and multi-cloud risk governance frameworks.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-bold text-sm text-[#263B80]">2. SLA Commitment Comparison Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-[#E8EAF2]">
                <thead>
                  <tr className="bg-[#F7F8FC] text-[#263B80] font-bold border-b border-[#E8EAF2]">
                    <th className="p-2.5">Service Type</th>
                    <th className="p-2.5">AWS SLA</th>
                    <th className="p-2.5">Azure SLA</th>
                    <th className="p-2.5">Google Cloud SLA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8EAF2]">
                  {SLA_COMPARISON_DATA.map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-bold text-[#172033]">{row.service}</td>
                      <td className="p-2.5">
                        <strong className="text-[#263B80]">{row.aws.uptime}</strong>
                        <p className="text-[10px] text-[#778198]">{row.aws.credit}</p>
                      </td>
                      <td className="p-2.5">
                        <strong className="text-[#5269C9]">{row.azure.uptime}</strong>
                        <p className="text-[10px] text-[#778198]">{row.azure.credit}</p>
                      </td>
                      <td className="p-2.5">
                        <strong className="text-purple-700">{row.gcp.uptime}</strong>
                        <p className="text-[10px] text-[#778198]">{row.gcp.credit}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-sm text-[#263B80]">3. Uptime Percentage Mathematical Analysis</h3>
            <p className="text-[#56627A]">
              Permitted monthly downtime is calculated on a standard 30-day billing cycle (43,200 total minutes):
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#56627A]">
              <li><strong>99.0% ("Two Nines"):</strong> Up to 432.0 minutes (7.2 hours) downtime / month.</li>
              <li><strong>99.9% ("Three Nines"):</strong> Up to 43.2 minutes downtime / month.</li>
              <li><strong>99.95%:</strong> Up to 21.6 minutes downtime / month.</li>
              <li><strong>99.99% ("Four Nines"):</strong> Up to 4.32 minutes downtime / month.</li>
              <li><strong>99.999% ("Five Nines"):</strong> Up to 25.9 seconds downtime / month.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-sm text-[#263B80]">4. Risk Matrix & Regulatory Alignment</h3>
            <p className="text-[#56627A]">
              Key operational hazards include vendor lock-in, cross-region network partitioning, and cryptographic key leakage. Compliance frameworks such as ISO/IEC 27001:2022, SOC 2 Type II, and GDPR require independent annual third-party audits. While providers maintain certified infrastructure, tenant compliance remains contingent on internal access controls, data retention rules, and disaster recovery testing.
            </p>
          </section>
        </div>
      )}
    </div>
  );
};
