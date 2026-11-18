# GMIU Cloud Computing Academic Submission Checklist (ALA 1 to ALA 5)

**Student Name:** Herry Prajapati  
**Enrollment Number:** 20230905090031  
**Institute:** Gyanmanjari Institute of Technology (GMIU)  
**Department:** Information Technology  
**Subject:** Cloud Computing (`IT-CC-2026`)  
**Academic Year:** 2026–2027  
**Submission Deadline:** 30 November 2026  
**Reference Website:** [https://cosmic-gingersnap-82f0a9.netlify.app/](https://cosmic-gingersnap-82f0a9.netlify.app/)  

---

## 1. Submission Deliverables Verification

| # | Required Deliverable | Target Location | Verification Status | File Details |
| :-: | :--- | :--- | :---: | :--- |
| **1** | **ALA 1 Report** (Cloud Application Deployment) | `FINAL-SUBMISSION/ALA-1.pdf` | **VERIFIED** | 12-page comprehensive academic report &bull; 929 KB &bull; Cloud File Manager (Flask + Gunicorn + Render PaaS + Supabase Storage, 9 passing Pytest tests, live URL: `https://cloud-file-manager-alml.onrender.com`) |
| **2** | **ALA 2 Report** (Virtualization & VM Configuration) | `FINAL-SUBMISSION/ALA-2.pdf` | **VERIFIED** | 11-page academic report &bull; 1.01 MB &bull; Oracle VirtualBox 7.x Ubuntu 26.04 LTS VM installation across 12 implementation steps with Figures 1–12 |
| **2b** | **ALA 2 Cgroups Lab Report** (Resource Allocation & Isolation) | `FINAL-SUBMISSION/Virtualization_Lab_Report.pdf` | **VERIFIED** | 6-page academic report &bull; 301 KB &bull; Linux 6.18 cgroups v1 & namespaces 3-instance container lab with 7 high-res terminal captures and empirical enforcement |
| **2c** | **ALA 2 Source & Evidence Archive** | `FINAL-SUBMISSION/virtualization-lab.zip` | **VERIFIED** | 274 KB &bull; Complete code archive: native bash/python scripts (`burn.py`, `memhog.py`), docker-compose, execution logs, and 7 screenshot figures |
| **3** | **ALA 3 Report** (Cloud Platform Security Review Paper) | `FINAL-SUBMISSION/ALA-3.pdf` | **VERIFIED** | 21-page academic review paper &bull; 421 KB &bull; Microsoft Azure security architecture evaluation vs AWS & GCP across 8 domains, 5 real incident scenarios (A–E), Table 2 checklist, and 6-phase Zero-Trust roadmap |
| **4** | **ALA 4 Report** (Cloud Provider SLA & Risk Management Case Study) | `FINAL-SUBMISSION/ALA-4.pdf` | **VERIFIED** | 21-page case study &bull; 373 KB &bull; AWS EC2 99.99% multi-AZ vs 99.5% single instance SLA, 10 SLA gaps (G1–G10), 11-risk register (R1–R11), Oct 2025 outage & Capital One breach, CERT-In / DPDP Act 2023 |
| **5** | **ALA 5 Report** (Cloud Performance Optimization) | `FINAL-SUBMISSION/ALA-5.pdf` | **VERIFIED** | 28-page empirical benchmark report &bull; 1.06 MB &bull; 24-hr e-commerce flash sale simulation (1,810 peak RPS), Table 12 comparing 4 provisioning strategies (72.3% cost reduction), Proposed 7-Tier Architecture, Edge-to-Cloud Continuum |
| **6** | **Master Consolidated Portfolio** | `FINAL-SUBMISSION/GMIU_Cloud_Computing_Master_Portfolio_20230905090031.pdf` | **VERIFIED** | Complete unified 93-page master academic portfolio &bull; 3.68 MB &bull; Compiling all 5 authentic continuous assessment reports into a single examination volume |
| **7** | **Student Details Dossier** | `student-details.md` | **VERIFIED** | Herry Prajapati (Enrollment: `20230905090031`), IT Department, Gyanmanjari Institute of Technology (GMIU) |
| **8** | **Progress Tracker** | `PROGRESS.md` | **VERIFIED** | Complete project execution log, deliverables audit, and empirical verification states |

---

## 2. Technical Implementation Audit

- [x] **Frontend Web Application:** React 18 + Vite 5 + TypeScript + Tailwind CSS built with 0 errors (`frontend/dist/`).
- [x] **Database & Cloud Storage:** PostgreSQL 15 schema with RLS policies, 6 relational tables, and 96 GMIU student records seeded (`database/students_dataset.json`).
- [x] **Compute Service:** Python 3.13 microservice API configured on port 8080 (`backend/server.py`) with health check endpoints.
- [x] **Virtualization & Isolation:** Dual VM configurations generated (`virtualization/configurations/`), Vagrantfile defined, container virtualization demonstrated (`Dockerfile`, `docker-compose.yml`), and network isolation tested.
- [x] **Empirical Benchmarking:** Locust load tests executed across 10, 50, and 100 concurrent user cohorts with latency percentiles recorded (`performance/results/`).
- [x] **Academic Reports:** Generated via ReportLab with A4 standard, professional typography, tables, and references.
- [x] **Ethical Standards:** No fabricated faculty signatures, marks, or fake approvals included.

---

## 3. Upload & Portal Submission Procedure

1. Log in to the official GMIU Student Portal with enrollment `20230905090031`.
2. Navigate to: **Academics** -> **Continuous Assessment** -> **Cloud Computing (IT-CC-2026)** -> **ALA Submissions**.
3. Upload individual activity reports (`ALA-1.pdf` to `ALA-5.pdf`) or the consolidated `GMIU_Cloud_Computing_Master_Portfolio_20230905090031.pdf` as instructed by the course coordinator.
4. Provide the project repository link and deployment URL in the submission remarks field.
