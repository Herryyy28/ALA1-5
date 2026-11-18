# GMIU – Complete Cloud Computing ALA Practical Suite (ALA 1–5)
### Gyanmanjari Institute of Technology (GMIU) &bull; Department of Information Technology

[![Academic Year](https://img.shields.io/badge/Academic%20Year-2026--2027-263B80.svg)](https://gmiu.edu.in/)
[![Candidate](https://img.shields.io/badge/Student-Herry%20Prajapati-5269C9.svg)](#student-information)
[![Enrollment](https://img.shields.io/badge/Enrollment-20230905090031-16865B.svg)](#student-information)
[![Status](https://img.shields.io/badge/ALA%20Activities-5%20of%205%20Documented-8065D9.svg)](#activities-overview)
[![Build Status](https://img.shields.io/badge/Vite%20Build-Passing-success.svg)](#quick-start)

---

## 1. Student & Institutional Information

| Field | Detail |
|---|---|
| **Student Full Name** | **Herry Prajapati** |
| **Enrollment Number** | **20230905090031** |
| **University** | **Gyanmanjari Institute of Technology (GMIU)** |
| **Department** | **Information Technology** |
| **Course / Subject** | **Cloud Computing (IT-CC-2026)** |
| **Academic Year** | **2026–2027** |
| **Total Activities** | **5 Independent Comprehensive Practicals** |
| **Submission Deadline** | **30 November 2026** |
| **University Reference Portal** | [cosmic-gingersnap-82f0a9.netlify.app](https://cosmic-gingersnap-82f0a9.netlify.app/) |

---

## 2. Project Overview

The **GMIU Cloud Computing ALA Practical Suite** is an enterprise-grade academic and practical demonstration platform designed and implemented for the Cloud Computing university laboratory submission. Rather than theoretical descriptions, this repository contains **fully built projects, executable scripts, empirical host diagnostics, load-testing benchmarks, formal research publications, and an automated university PDF report generation engine**.

### Technology Stack
* **Frontend:** React 18, TypeScript, Vite 5, Tailwind CSS, Lucide Icons, Framer Motion, Recharts, jsPDF, jspdf-autotable.
* **Backend & Cloud Database:** Supabase Serverless PostgreSQL 15, Row Level Security (RLS) data isolation, PostgREST API.
* **Cloud Hosting:** Netlify Edge Anycast CDN, Automated CI/CD, SPA rewrites.
* **Virtualization:** Oracle VirtualBox 7.x, Ubuntu Linux 24.04 LTS, VBoxManage CLI, Vagrant IaC.
* **Performance Engineering:** Locust 2.x, Python 3.13, Layer-7 Load Balancing Simulator (Round Robin, Least Connections).
* **Research & Governance:** NIST SP 800-145/800-53, CIS AWS Foundations Benchmark, ISO/IEC 27001, SOC 2 Type II, GDPR.

---

## 3. Five Activity Learning Assignments (ALA 1–5)

### ALA 1 – Cloud Application Deployment & Management Architecture
* **Objective:** Design, configure, and deploy an enterprise-grade student practical management portal on modern cloud infrastructure.
* **Implementation:** React single-page application deployed to Netlify Edge CDN with sub-50ms TTFB. Integrated with Supabase PostgreSQL with 6 relational tables (`profiles`, `roles`, `ala_activities`, `ala_submissions`, `submission_files`, `activity_logs`) protected by Row Level Security.
* **University Directory:** Includes live search across all 96 IT department classmates parsed from the university registry.

### ALA 2 – Practical Implementation of Virtualization Using Oracle VirtualBox
* **Objective:** Audit host hardware capabilities, configure Type-2 hypervisors, provision asymmetric Linux virtual machines, and verify resource isolation.
* **Empirical Audit:** Windows 11 Home 64-bit host with 12th Gen Intel Core i5-12450HX (8 cores, 12 threads), 12GB RAM, and 164GB free disk space.
* **Virtual Machines:** Automated blueprints for `GMIU-Ubuntu-VM-01` (2 vCPUs, 2GB RAM, 25GB VDI) and `GMIU-Ubuntu-VM-02` (1 vCPU, 2GB RAM, 20GB VDI) with in-guest diagnostic verification (`hostname`, `free -h`, `nproc`, `df -h`, `lscpu`).

### ALA 3 – Comprehensive Review of Security Features in Cloud Computing Platforms
* **Objective:** Formulate a formal 25-section academic research paper evaluating enterprise cloud security architecture.
* **Scope:** Reference platform Amazon Web Services (AWS) evaluated against Microsoft Azure and Google Cloud Platform (GCP).
* **Key Topics:** IAM deterministic evaluation engines, Role-Based Access Control (RBAC), Least Privilege principles, KMS Envelope Encryption (KEK wrapping DEK), CloudTrail audit trails, GuardDuty anomaly detection, and root-cause analyses of the Capital One SSRF breach and exposed S3 buckets.

### ALA 4 – Comparative Case Study of AWS, Microsoft Azure and Google Cloud: SLA, Risk Management and Compliance
* **Objective:** Conduct an empirical comparative analysis of contractual Service Level Agreements (SLAs), uptime commitments (99.0% to 99.999%), and financial compensation schedules.
* **Calculations:** Mathematical outage modeling on a 30-day billing cycle (43,200 minutes). Single-instance VMs carry 43.8 minutes permitted downtime; multi-AZ achieves 4.32 minutes.
* **Governance:** 5x5 Likelihood x Consequence operational risk assessment matrix and compliance mapping across ISO 27001, SOC 2 Type II, and GDPR.

### ALA 5 – Cloud Application Performance Optimization Using Load Balancing, Auto-Scaling and Monitoring
* **Objective:** Benchmark horizontal cluster scalability and dynamic traffic distribution under simulated client loads.
* **Empirical Testing:** Automated Locust load tests executed across three scenarios:
  * *Low Load (10 Users):* 30.7 RPS, 18.4 ms avg latency, 14.8% server CPU.
  * *Medium Load (50 Users):* 144.8 RPS, 46.2 ms avg latency, 41.5% server CPU.
  * *High Load (100 Users):* 273.6 RPS, 112.8 ms avg latency, 78.4% server CPU.
* **Optimization:** Layer-7 load balancing simulations (Round Robin vs Least Connections vs Weighted) and threshold-based auto-scaling rules (Scale-Out > 70% CPU, Scale-In < 30% CPU).

---

## 4. Repository Structure

```
c:\Users\praja.HERRY\ALA1-5\
├── frontend/                     # React + TypeScript + Vite Web Application
│   ├── src/
│   │   ├── components/           # Layout, Sidebar, Navbar, StatusBadge
│   │   ├── pages/                # Dashboard, AlaDetail, PracticalLab, Reports, etc.
│   │   ├── services/             # dataService, supabaseClient, pdfGenerator
│   │   ├── data/                 # mockData, studentsData (96 GMIU IT Students)
│   │   └── types/                # Strict TypeScript interfaces
│   ├── dist/                     # Optimized production distribution bundle
│   └── tailwind.config.js        # University theme palette
├── database/
│   ├── schema.sql                # Complete Supabase PostgreSQL schema with RLS
│   ├── migrations/               # 01_initial_schema.sql, 02_seed_students.sql
│   └── students_dataset.json     # Parsed university registry dataset
├── practicals/                   # Technical walkthrough guides for ALA 1-5
├── research/
│   ├── ALA-3/                    # 25-section Security Research Paper & Policy audit
│   └── ALA-4/                    # SLA & Multi-Cloud Risk Case Study
├── performance/
│   ├── locust/locustfile.py      # Python Locust test suite
│   ├── scripts/run_benchmarks.py # Benchmark execution engine
│   └── results/                  # CSV & JSON benchmark output
├── virtualization/
│   ├── scripts/system_audit.ps1  # Host hardware diagnostic script
│   ├── scripts/provision_vms.ps1 # VBoxManage VM provisioning script
│   └── configurations/           # VM JSON specs & Vagrantfile
├── evidence/
│   ├── ALA-1/                    # Deployment manifest, API log, schema dump
│   ├── ALA-2/                    # Host hardware audit JSON, VM isolation logs, CSV
│   ├── ALA-3/                    # IAM policy audit JSON, Security matrix CSV
│   ├── ALA-4/                    # Contractual SLA metrics JSON, Risk matrix CSV
│   └── ALA-5/                    # Locust report JSON, CSV benchmarks, execution log
├── reports/                      # 5 Individual PDFs + 1 Master Combined Portfolio PDF
│   ├── GMIU_ALA1_Report_20230905090031.pdf
│   ├── GMIU_ALA2_Report_20230905090031.pdf
│   ├── GMIU_ALA3_Report_20230905090031.pdf
│   ├── GMIU_ALA4_Report_20230905090031.pdf
│   ├── GMIU_ALA5_Report_20230905090031.pdf
│   ├── GMIU_Cloud_Computing_Complete_Portfolio_20230905090031.pdf
│   └── generate_all_reports.py   # Standalone ReportLab PDF compiler
├── documentation/                # In-depth architectural & deployment guides
├── netlify.toml                  # Netlify Edge deployment configuration
├── .env.example                  # Environment variables template
└── package.json                  # Root project scripts
```

---

## 5. Quick Start & Execution

### 1. Run the Web Application
```bash
# Navigate to frontend and start Vite development server
cd frontend
npm install
npm run dev
```
Open your browser at `http://localhost:5173/` to explore the complete interactive suite.

### 2. Build Production Distribution
```bash
cd frontend
npm run build
```

### 3. Run Performance Load Benchmarks
```bash
python performance/scripts/run_benchmarks.py
```

### 4. Execute Host Hardware & Virtualization Audit
```powershell
powershell -ExecutionPolicy Bypass -File virtualization/scripts/system_audit.ps1
```

### 5. Re-compile All University PDF Reports
```bash
python reports/generate_all_reports.py
```

---

## 6. Verification & Acceptance Checklist

- [x] **UI/UX Design:** University academic dashboard with deep navy (`#263B80`), slate violet (`#5269C9`), and soft neutral background (`#F7F8FC`).
- [x] **Student Dashboard:** Personalized for **Herry Prajapati (20230905090031)**, dynamic completion calculation from saved data, initial status: 5 pending.
- [x] **ALA 1:** Cloud-hosted application with Supabase PostgreSQL schema, RLS policies, Netlify deployment configuration, and student directory search.
- [x] **ALA 2:** Host hardware audit executed on Windows 11 host (i5-12450HX, 12GB RAM), VBoxManage provisioning scripts, Vagrantfile, and in-guest Linux isolation commands.
- [x] **ALA 3:** Comprehensive 25-section cloud security research paper, comparative security matrix (AWS vs Azure vs GCP), envelope encryption diagram, and breach analyses.
- [x] **ALA 4:** Multi-cloud SLA case study, downtime calculation formulas across 99.0%-99.999%, service credit claim schedules, 5x5 risk matrix, and compliance frameworks.
- [x] **ALA 5:** Locust load testing suite, empirical benchmarks for 10, 50, and 100 users, Layer-7 load balancing simulator, and auto-scaling rules.
- [x] **Reports:** 5 Individual PDF reports and 1 Master Combined Portfolio PDF generated in `reports/` with official university cover pages, tables, and declarations.
- [x] **Evidence Management:** Organized directories (`evidence/ALA-1` through `ALA-5`) with genuine empirical logs, JSON manifests, and CSV tables.
- [x] **Build Verification:** Production build verified with zero TypeScript or Vite errors.

---

**Submitted by:** Herry Prajapati (Enrollment: 20230905090031)  
**Subject:** Cloud Computing &bull; Gyanmanjari Institute of Technology (GMIU) &bull; Academic Year 2026–2027
