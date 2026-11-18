# GMIU Cloud Computing ALA 1–5: Master Implementation Progress Tracker

**Student Name:** Herry Prajapati  
**Enrollment Number:** 20230905090031  
**Institute:** Gyanmanjari Institute of Technology (GMIU), Department of Information Technology  
**Subject:** Cloud Computing (Academic Year 2026–2027)  
**Last Updated:** 2026-11-18  

---

## Overall Status Summary

| Activity | Title | Status | Evidence Collected | PDF Report | Verification |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Phase 1** | Inspection & Environment Audit | **Completed** | Hardware JSON, Tool Versions | Yes | Verified |
| **ALA 1** | Cloud Application Development & Deployment | **Completed** | Vite Build, Supabase Schema, Compute API | `GMIU_ALA1_Report_20230905090031.pdf` | Verified |
| **ALA 2** | Virtualization Using VMs or Containers | **Completed** | Host Audit, Dual VM Specs, Linux Logs | `GMIU_ALA2_Report_20230905090031.pdf` | Verified |
| **ALA 3** | Cloud Platform Security Review Paper | **Completed** | Comparative Matrix, IAM Audit, Diagrams | `GMIU_ALA3_Report_20230905090031.pdf` | Verified |
| **ALA 4** | Cloud Provider SLA & Risk Case Study | **Completed** | SLA Metrics JSON, 5x5 Risk Matrix CSV | `GMIU_ALA4_Report_20230905090031.pdf` | Verified |
| **ALA 5** | Cloud Performance Optimization | **Completed** | Locust Load Tests, Scaling Simulation | `GMIU_ALA5_Report_20230905090031.pdf` | Verified |
| **Portfolio**| Master Consolidated Submission Dossier | **Completed** | All 5 Practicals & Research Papers | `GMIU_Cloud_Computing_Complete_Portfolio_20230905090031.pdf` | Verified |

---

## Detailed Activity Progress Breakdown

### Phase 1: Environment Inspection & Preparation
- **Task Name:** Host Hardware, Hypervisor, and Toolchain Audit
- **Status:** **Completed**
- **Files Created / Modified:**
  - `student-details.md`
  - `PROGRESS.md`
  - `virtualization/scripts/system_audit.ps1`
  - `evidence/ALA-2/hardware_audit_report.json`
- **Commands Executed:**
  - `node -v` (Node v20.18.0)
  - `python --version` (Python 3.13.5)
  - `git status` (Git 2.54.0.windows.1)
  - `powershell -ExecutionPolicy Bypass -File virtualization/scripts/system_audit.ps1`
- **Tests Performed:**
  - Audit of host CPU (Intel Core i5-12450HX, 8 cores / 12 threads), visible RAM (11.71 GB), disk space (C: 36.87 GB free, D: 115.93 GB free), and UEFI virtualization flag check.
- **Evidence Captured:**
  - System hardware audit JSON captured in `evidence/ALA-2/hardware_audit_report.json`.
- **Remaining Work:** None.

---

### ALA 1: Cloud Application Development and Deployment
- **Task Name:** Full-Stack Cloud Academic Management Suite
- **Status:** **Completed**
- **Files Created / Modified:**
  - `frontend/src/App.tsx`, `frontend/src/main.tsx`, `frontend/src/index.css`
  - `frontend/src/pages/Dashboard.tsx`, `frontend/src/pages/AlaDetail.tsx`, `frontend/src/pages/PracticalLab.tsx`
  - `frontend/src/pages/Architectures.tsx`, `frontend/src/pages/Analytics.tsx`, `frontend/src/pages/Submissions.tsx`
  - `frontend/src/pages/Reports.tsx`, `frontend/src/pages/StudentSearch.tsx`, `frontend/src/pages/Profile.tsx`
  - `backend/server.py` (Local/Cloud Compute Python API on port 8080)
  - `database/schema.sql`, `database/migrations/01_initial_schema.sql`, `database/migrations/02_seed_students.sql`
  - `database/students_dataset.json` (96 official GMIU students)
  - `netlify.toml` (Netlify SPA redirect & build headers)
- **Commands Executed:**
  - `npm run build` (Executed in `frontend/`: Rollup bundled production artifacts with 0 errors)
  - `python database/parse_students.py` (Parsed 96 records from official GMIU reference portal)
- **Tests Performed:**
  - Verified TypeScript compilation and JSX bundle generation.
  - Verified Supabase SQL table schemas (RLS policies, profiles, ala_activities, ala_submissions).
  - Verified real-time search and filter with 15-second polling in StudentSearch.tsx.
- **Evidence Captured:**
  - Frontend production build in `frontend/dist/`.
  - Database schema and 96-student seed dataset in `database/`.
  - Compute API endpoints (`/api/health`, `/api/compute/status`, `/api/students`) in `backend/server.py`.
- **Remaining Work:** None.

---

### ALA 2: Virtualization Using Virtual Machines or Containers
- **Task Name:** Hypervisor Provisioning, Dual-VM Specification, and Linux Kernel Virtualization Lab (Cgroups & Namespaces)
- **Status:** **Completed**
- **Files Created / Modified:**
  - `evidence/ALA-2/Virtualization_Lab_Report.pdf` (301 KB, 6-page comprehensive academic report with 7 terminal figures)
  - `evidence/ALA-2/virtualization-lab.zip` (274 KB archive with native bash/python scripts, docker compose, execution log)
  - `evidence/ALA-2/01_environment_and_instances.png` to `07_network_isolation.png` (7 verified figure screenshots)
  - `evidence/ALA-2/full_run.log` (Raw console execution output of the complete 9-step lab run)
  - `FINAL-SUBMISSION/ALA-2.pdf` & `FINAL-SUBMISSION/Virtualization_Lab_Report.pdf`
  - `virtualization/scripts/provision_vms.ps1`
  - `virtualization/configurations/Vagrantfile`
  - `virtualization/configurations/GMIU-Ubuntu-VM-01.json`
  - `virtualization/configurations/GMIU-Ubuntu-VM-02.json`
  - `evidence/ALA-2/vm_diagnostics_comparison.csv`
  - `evidence/ALA-2/vm_isolation_evidence.txt`
  - `virtualization/scripts/enable_vtx_bios_guide.md`
- **Commands Executed:**
  - `native/enter.sh` (cgroup creation, cpu.cfs_quota_us / memory.limit_in_bytes, unshare namespaces, tmpfs mounts)
  - `native/run_lab.sh` (9-step automated lab execution and verification pipeline)
  - `native/burn.py` (CPU load generator measuring CFS throttle across 50%, 99%, 25%)
  - `native/memhog.py` (RAM load generator verifying kernel OOM killer containment at 256MB boundary)
  - `dd if=/dev/zero of=/data/big bs=1M count=100` (Verifying 50MB storage quota enforcement)
  - Execution of PowerShell automation scripts generating Vagrant and VirtualBox configurations for `GMIU-Ubuntu-VM-01` (2 vCPU, 2048 MB RAM) and `GMIU-Ubuntu-VM-02` (1 vCPU, 2048 MB RAM).
- **Tests Performed:**
  - **CPU Quota Enforcement:** vm1 50% core (3.01s / 6s), vm2 99% core (5.96s / 6s), vm3 25% core (1.51s / 6s).
  - **Memory Containment:** vm1 process terminated with exit code 137 (SIGKILL) by kernel OOM killer at 250MB (limit 256MB), max_usage 256MB, oom_kill=1. Host memory unaffected (3747 MB available).
  - **Storage Bounds:** tmpfs mount capped write at exactly 50 MB (52,428,800 bytes) with "No space left on device".
  - **Boundary Isolation:** Process isolation (PID 1 inside instance vs 66 host processes), UTS hostname isolation, mount namespace file confidentiality (`secret from vm1` invisible to vm2 and host), and network namespace segregation (vm3 loopback only, 8.8.8.8 unreachable).
- **Evidence Captured:**
  - 6-Page Academic PDF report (`Virtualization_Lab_Report.pdf`), 7 high-res terminal captures (Figures 1–7), raw execution trace (`full_run.log`), and 274 KB source archive (`virtualization-lab.zip`).
- **Remaining Work:** None.

---

### ALA 3: Cloud Platform Security Review Paper
- **Task Name:** Comprehensive Academic Review on Cloud Security Architectures
- **Status:** **Completed**
- **Files Created / Modified:**
  - `research/ALA-3/cloud_security_research_paper.md` (25 academic sections, 15+ peer-reviewed citations)
  - `research/ALA-3/comparative_security_matrix.csv`
  - `evidence/ALA-3/iam_policy_audit.json`
  - `diagrams/ala3_security_architecture.svg`
- **Commands Executed:**
  - `python diagrams/generate_diagrams.py` (Generated high-resolution architectural SVG)
- **Tests Performed:**
  - Evaluated least-privilege JSON IAM policies, Envelope Encryption (DEK/KEK key hierarchy in AWS KMS vs Azure Key Vault vs Google Cloud KMS), and real-world breach root-cause analysis (Capital One SSRF).
- **Evidence Captured:**
  - 25-section comprehensive academic paper, comparative security matrix CSV, IAM security policy audit JSON, security architecture SVG.
- **Remaining Work:** None.

---

### ALA 4: Cloud Provider SLA and Risk Management Case Study
- **Task Name:** Multi-Cloud SLA Evaluation, Quantitative Downtime Costing, and 5x5 Risk Matrix
- **Status:** **Completed**
- **Files Created / Modified:**
  - `research/ALA-4/cloud_sla_risk_case_study.md`
  - `evidence/ALA-4/sla_contractual_metrics.json`
  - `evidence/ALA-4/risk_assessment_matrix.csv`
  - `diagrams/ala4_sla_risk_matrix.svg`
- **Commands Executed:**
  - Automated mathematical evaluation of SLA availability levels (99.0% down to 99.999%).
  - Risk scoring calculation: $Risk Score = Severity \times Likelihood$.
- **Tests Performed:**
  - Downtime calculations for monthly, quarterly, and annual windows.
  - Verification of service credit schedules across AWS, Azure, and GCP.
  - Mapping of compliance controls to ISO/IEC 27001:2022, SOC 2 Type II, HIPAA, and GDPR.
- **Evidence Captured:**
  - SLA contractual metrics JSON, 5x5 quantitative risk matrix CSV, SLA risk diagram SVG.
- **Remaining Work:** None.

---

### ALA 5: Cloud Performance Optimization
- **Task Name:** Locust Synthetic Load Benchmarking, Layer-7 Load Balancing, and Auto-Scaling Simulation
- **Status:** **Completed**
- **Files Created / Modified:**
  - `performance/locust/locustfile.py`
  - `performance/scripts/run_benchmarks.py`
  - `performance/results/benchmark_summary.json`
  - `performance/results/benchmark_comparison.csv`
  - `evidence/ALA-5/benchmark_execution_log.txt`
  - `diagrams/ala5_performance_architecture.svg`
- **Commands Executed:**
  - `python performance/scripts/run_benchmarks.py` (Executed synthetic load tests across 10, 50, and 100 concurrent user cohorts)
- **Tests Performed:**
  - Response time latency distribution measurement (p50, p95, p99, median, max).
  - Throughput (Requests Per Second) measurement under varying load.
  - Failure rate verification under stress conditions (0.00% error rate verified).
- **Evidence Captured:**
  - Benchmark summary JSON, comparative test results CSV, Locust execution logs.
- **Remaining Work:** None.

---

### Phase 7: Final Verification & Portfolio Compilation
- **Task Name:** Report Generation, Asset Verification, and Submission Checklist
- **Status:** **Completed**
- **Files Created / Modified:**
  - `reports/generate_all_reports.py`
  - `reports/GMIU_ALA1_Report_20230905090031.pdf`
  - `reports/GMIU_ALA2_Report_20230905090031.pdf`
  - `reports/GMIU_ALA3_Report_20230905090031.pdf`
  - `reports/GMIU_ALA4_Report_20230905090031.pdf`
  - `reports/GMIU_ALA5_Report_20230905090031.pdf`
  - `reports/GMIU_Cloud_Computing_Complete_Portfolio_20230905090031.pdf`
  - `FINAL-SUBMISSION/submission-checklist.md`
- **Commands Executed:**
  - `python reports/generate_all_reports.py`
- **Tests Performed:**
  - Verified all 6 PDF files are generated without truncation or formatting glitches.
  - Confirmed all 5 individual activities and the master portfolio contain student Herry Prajapati (20230905090031), GMIU department headers, professional styling, table of contents, diagrams, and complete references.
- **Evidence Captured:**
  - Complete PDF deliverables located in `reports/`, `frontend/public/reports/`, and `FINAL-SUBMISSION/`.
- **Remaining Work:** None.
