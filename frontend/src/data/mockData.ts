import { AlaActivity, StudentProfile, AlaSubmission, ActivityLog, BenchmarkResult } from '../types';

export const STUDENT_PROFILE: StudentProfile = {
  id: 'usr-20230905090031',
  enrollment_number: '20230905090031',
  full_name: 'Herry Prajapati',
  email: 'prajapatiherry.28@gmail.com',
  role: 'student',
  department: 'Information Technology',
  university: 'Gyanmanjari Institute of Technology (GMIU)',
  academic_year: '2026–2027',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  phone: '+91 7486865058'
};

export const ALA_ACTIVITIES: AlaActivity[] = [
  {
    id: 'ALA-1',
    number: 1,
    title: 'Project: Cloud File Manager — Cloud-Based File Storage and Management Web Application',
    short_title: 'Cloud File Manager',
    category: 'Cloud Storage & Web Engineering',
    description: 'Development and deployment of a full-featured cloud file storage web application using Python 3.12, Flask, and Gunicorn on Render Web Service (PaaS), integrated with Supabase Storage private bucket ("uploads") via signed URLs (3600s validity, 10MB upload limit), automated Pytest suite (9 tests passed), and CI/CD from GitHub.',
    objectives: [
      'Understand fundamental cloud computing concepts and service models (PaaS, IaaS, SaaS)',
      'Develop a functional cloud storage web application using Python 3.12, Flask, HTML, CSS, and JavaScript',
      'Deploy the application onto Render Web Service with automated continuous deployment from GitHub',
      'Integrate Supabase Storage private bucket for persistent object storage and signed URL retrieval',
      'Implement strict security measures: private buckets, temporary signed URLs, secret key isolation, and filename sanitization',
      'Execute automated unit testing with Pytest and verify cloud resource lifecycle on free tiers'
    ],
    technologies: ['Python 3.12', 'Flask', 'Gunicorn WSGI', 'Supabase Storage', 'Render Web Service (PaaS)', 'Pytest', 'HTML5 / CSS / JavaScript', 'Git & GitHub CI/CD'],
    practical_tools: ['Render Cloud Dashboard', 'Supabase Storage Bucket', 'Pytest Suite', 'Gunicorn WSGI Server', 'GitHub Auto-Deploy'],
    deadline: '2026-11-30',
    weightage: 20,
    theory_summary: 'Cloud File Manager separates stateless compute from persistent cloud object storage. The compute layer (Flask on Render) terminates HTTPS and handles requests, while files are persisted in a private Supabase Storage bucket ("uploads"). Downloads bypass the web server through temporary signed URLs valid for 1 hour, ensuring high scalability, data durability, and zero storage loss during compute restarts.',
    architecture_diagram: 'User / Browser -> HTTPS -> Render Web Service (Gunicorn + Flask) -> Supabase Storage REST API -> Private Bucket "uploads" (Direct download via Signed URLs)',
    implementation_steps: [
      {
        step: 1,
        title: 'Local Environment Setup & Testing',
        description: 'Initialize Python 3.12 virtual environment, install dependencies, and configure .env with Supabase credentials.',
        command: 'pip install -r requirements.txt && python app.py'
      },
      {
        step: 2,
        title: 'Automated Unit Testing with Pytest',
        description: 'Execute 9 automated unit tests verifying health check, file upload, delete, and 10 MB payload validation.',
        command: 'pytest'
      },
      {
        step: 3,
        title: 'GitHub Version Control & CI/CD Trigger',
        description: 'Commit codebase to GitHub repository (Herryyy28/ALA1-5) to trigger automated Render deployment pipeline.',
        command: 'git push -u origin main'
      },
      {
        step: 4,
        title: 'Render Web Service Provisioning',
        description: 'Configure Render Web Service in Singapore region with Python 3.12 runtime, gunicorn app:app start command, and secret environment variables.',
        command: 'render.yaml blueprint deployment'
      },
      {
        step: 5,
        title: 'Live Public Deployment Verification',
        description: 'Validate public access on https://cloud-file-manager-alml.onrender.com and health probe at /health.',
        command: 'curl -I https://cloud-file-manager-alml.onrender.com/health'
      }
    ],
    deliverables: [
      'Live Web Application: https://cloud-file-manager-alml.onrender.com',
      'Public GitHub Repository: https://github.com/Herryyy28/ALA1-5',
      '12-Page Academic Technical Report (Virtualization_Lab_Report / ALA-1.pdf)',
      'Pytest test suite results (9 tests passed)',
      '5 Verification Screenshots (Live App, Bucket, Render Dashboard, Logs, GitHub)'
    ]
  },
  {
    id: 'ALA-2',
    number: 2,
    title: 'Installation and Configuration of a Virtual Machine using Oracle VirtualBox (Ubuntu 26.04 LTS)',
    short_title: 'Virtualization & Isolation',
    category: 'Systems & Infrastructure',
    description: 'Complete hands-on installation and configuration of an isolated virtual machine on Oracle VirtualBox Type-2 hypervisor over Windows 11 host. Detailed 12-step implementation walkthrough (Figures 1–12) with Ubuntu 26.04 LTS Desktop, VBoxGuestAdditions, virtual hardware allocation (RAM, vCPU, .vdi dynamic disk, NAT Intel PRO/1000 MT adapter), and isolation verification.',
    objectives: [
      'Understand the core fundamentals of virtualization and hypervisor architectures (Type-1 bare-metal vs Type-2 hosted)',
      'Install and configure Oracle VirtualBox 7.x Type-2 hypervisor on Windows 11 64-bit host workstation',
      'Provision an isolated Ubuntu 26.04 LTS ("Resolute Raccoon") virtual machine with unattended configuration',
      'Allocate virtual resources: base memory (RAM), virtual CPUs, dynamic SATA .vdi storage, and NAT networking',
      'Verify host-guest isolation: hardware abstraction, independent kernel boot, process isolation, and dynamic storage allocation'
    ],
    technologies: ['Oracle VirtualBox 7.x', 'Ubuntu 26.04 LTS (Resolute Raccoon)', 'VBoxGuestAdditions', 'Intel VT-x / AMD-V', 'Linux Kernel Cgroups & Namespaces', 'Bash Scripting'],
    practical_tools: ['Oracle VirtualBox Manager', 'VBoxManage CLI', 'GNU GRUB Bootloader', 'Ubuntu Desktop GUI', 'Linux Diagnostic Utilities'],
    deadline: '2026-11-30',
    weightage: 20,
    theory_summary: 'Type-2 (hosted) hypervisors like Oracle VirtualBox operate on top of a conventional host OS (Windows 11) to create and run guest virtual machines. The hypervisor presents a slice of physical resources as virtual hardware (virtual CPU, RAM, SATA controller, Intel PRO/1000 MT network). The guest runs its own independent Linux kernel, providing complete process and filesystem isolation from the host.',
    architecture_diagram: 'Host Hardware (Intel Core i5-12450HX, 12GB RAM) -> Host OS (Windows 11) -> Oracle VirtualBox (Type-2 Hypervisor) -> [Guest VM: Ubuntu 26.04 Desktop, VBoxGuestAdditions, NAT Adapter]',
    implementation_steps: [
      {
        step: 1,
        title: 'Searching & Downloading Genuine Ubuntu ISO',
        description: 'Obtain official Ubuntu 26.04 LTS (Resolute Raccoon) Desktop 64-bit ISO (ubuntu-26.04-desktop-amd64.iso) from ubuntu.com (Figures 1 & 2).',
        command: 'curl -O https://releases.ubuntu.com/ubuntu-26.04-desktop-amd64.iso'
      },
      {
        step: 2,
        title: 'Oracle VirtualBox Manager Configuration',
        description: 'Launch VirtualBox Manager on Windows 11 and start the New Virtual Machine creation wizard (Figures 3 & 4).',
        command: 'VirtualBox'
      },
      {
        step: 3,
        title: 'Unattended Installation & Hardware Allocation',
        description: 'Configure username (vboxuser), hostname (Ubuntu-26.04), base RAM, vCPU cores, and dynamic SATA VDI virtual disk (Figures 5, 6 & 7).',
        command: 'VBoxManage createvm --name "Ubuntu 26.04" --ostype "Ubuntu_64" --register'
      },
      {
        step: 4,
        title: 'Virtual Machine Execution & GRUB Boot',
        description: 'Power on VM; observe GNU GRUB bootloader and Linux kernel initialization detecting virtual hardware (Figures 8 & 9).',
        command: 'VBoxManage startvm "Ubuntu 26.04"'
      },
      {
        step: 5,
        title: 'Installation Completion & Desktop Verification',
        description: 'Automated installer completes, GDM login screen loads, and Ubuntu desktop runs smoothly with full isolation (Figures 10, 11 & 12).',
        command: 'hostname && free -h && nproc && df -h'
      }
    ],
    deliverables: [
      '11-Page Academic Virtualization Report (Figures 1–12)',
      'Virtual Machine Configuration File (Ubuntu 26.04.vbox)',
      'Linux Kernel Cgroups & Namespaces Lab Report & Code (virtualization-lab.zip, 274 KB)',
      '7 Terminal Evidence Captures (Figures 1–7) & Execution Log (full_run.log)',
      'Empirical Host Hardware Diagnostics Audit (Windows 11, Intel Core i5-12450HX)'
    ]
  },
  {
    id: 'ALA-3',
    number: 3,
    title: 'Security Features of a Cloud Platform: A Review of Microsoft Azure with Comparative Analysis against AWS and Google Cloud',
    short_title: 'Cloud Security Review',
    category: 'Cybersecurity & Governance',
    description: '21-page comprehensive academic review paper examining Microsoft Azure security architecture across IAM (Microsoft Entra ID, Conditional Access, Azure RBAC, PIM, Managed Identities), encryption (AES-256 Storage, TDE for SQL, Azure Key Vault & Managed HSM), data protection (Private Link, soft delete, WORM immutable storage), logging & detection (Defender for Cloud CSPM, Microsoft Sentinel SIEM/SOAR), and governance (Azure Policy, Management Groups). Features a 3-provider comparative matrix, 5 real-world incident scenarios, an 8-area best-practice checklist, and an implementation roadmap.',
    objectives: [
      'Identify core security services of Microsoft Azure and examine their role in cloud defense',
      'Analyze Identity and Access Management (Entra ID, RBAC, PIM, Conditional Access) and Zero Trust architecture (NIST SP 800-207)',
      'Examine cryptographic key management (Azure Key Vault, Managed HSM, soft delete, purge protection) and data at rest/in transit encryption',
      'Compare equivalent capabilities across Azure, AWS, and Google Cloud without declaring an arbitrary winner',
      'Dissect 5 realistic security incident scenarios (exposed storage, leaked service principal, phished admin, ransomware, over-permissioned CMK)',
      'Provide an 8-area best-practice checklist with audit evidence to retain and a 6-phase implementation roadmap'
    ],
    technologies: ['Microsoft Entra ID', 'Azure Key Vault & Managed HSM', 'Microsoft Defender for Cloud', 'Microsoft Sentinel (SIEM/SOAR)', 'Azure Policy & RBAC', 'AWS IAM & KMS', 'Google Cloud IAM & KMS'],
    practical_tools: ['Azure Portal Security Center', 'Entra ID Conditional Access', 'Azure Key Vault CLI', 'NIST SP 800-145 / SP 800-207', 'ISO/IEC 27001', 'Cloud Security Alliance CCM'],
    deadline: '2026-11-30',
    weightage: 20,
    theory_summary: 'Cloud security operates under the Shared Responsibility Model and Zero Trust principles. While the provider guarantees security OF the cloud (datacenters, hypervisors), the customer is responsible for security IN the cloud (identities, data encryption, policy governance). Microsoft Entra ID provides central authentication, Azure RBAC enforces least privilege, Azure Key Vault protects cryptographic keys, and Microsoft Sentinel correlates multi-cloud telemetry to automate threat remediation.',
    architecture_diagram: 'Users/Admins (MFA + Conditional Access) -> Entra ID (RBAC + PIM) -> Edge Protection (Front Door/WAF/DDoS) -> Application Tier (Private Endpoints) -> Data Stores (AES-256) <-> Key Vault / Managed HSM <-> Sentinel SIEM / Defender for Cloud',
    implementation_steps: [
      {
        step: 1,
        title: 'Identity & Access Architecture Analysis',
        description: 'Examine Microsoft Entra ID with phishing-resistant MFA, Conditional Access signal evaluation, and Privileged Identity Management (PIM) just-in-time activations.',
        command: 'az ad sp list --show-mine'
      },
      {
        step: 2,
        title: 'Encryption & Key Management Evaluation',
        description: 'Document Azure Storage AES-256 encryption, SQL Transparent Data Encryption (TDE), and Azure Key Vault Managed HSM with purge protection.',
        command: 'az keyvault show --name "kv-gmiu-security"'
      },
      {
        step: 3,
        title: 'Multi-Cloud Comparative Matrix Formulation',
        description: 'Construct functional 8-domain comparison across Microsoft Azure, Amazon Web Services, and Google Cloud Platform (Table 1).',
        command: 'cat comparison/comparative_security_matrix.csv'
      },
      {
        step: 4,
        title: 'Real-World Attack Scenario Modeling',
        description: 'Analyze failure paths and preventative controls for 5 composite incident scenarios (Scenarios A through E).',
        command: 'cat research/cloud_security_scenarios.md'
      },
      {
        step: 5,
        title: 'Best-Practice Checklist & Roadmap Synthesis',
        description: 'Compile 8-area actionable checklist with required audit evidence and 6-phase implementation roadmap for enterprise deployments.',
        command: 'cat research/best_practice_checklist.md'
      }
    ],
    deliverables: [
      '21-Page Academic Review Paper (Virtualization_Lab_Report / ALA-3.pdf)',
      'Functional 8-Domain Multi-Cloud Comparison Matrix (Table 1)',
      '5 Detailed Incident Scenarios & Remediation Protocols (Scenarios A–E)',
      '8-Area Cloud Security Best-Practice Checklist with Audit Evidence (Table 2)',
      '6-Phase Enterprise Security Implementation Roadmap'
    ]
  },
  {
    id: 'ALA-4',
    number: 4,
    title: 'Case Study of Amazon Web Services (AWS): Service Level Agreements, Risk Management and Compliance Frameworks, with a Comparison against Microsoft Azure and Google Cloud',
    short_title: 'Cloud SLA & Risk Management',
    category: 'Cloud Governance & Risk',
    description: '21-page exhaustive case study analyzing the Amazon Compute SLA (Region-level 99.99% multi-AZ vs Instance-level 99.5%, credit tiers 10%/30%/100%), compute SLA comparison with Azure and GCP, 10 SLA gaps (G1–G10), an 11-point qualitative risk register (R1–R11) with a 5x5 Likelihood/Impact heat map, real-world post-incident analyses of the October 2025 AWS us-east-1 DynamoDB DNS outage and the 2019 Capital One SSRF data breach, and compliance frameworks including CERT-In 6-hour directions and India DPDP Act 2023.',
    objectives: [
      'Deconstruct the structure, commitments, service credit tiers, and exclusions of the Amazon Compute SLA',
      'Compare compute SLAs across AWS, Microsoft Azure, and Google Cloud for multi-zone and single-instance deployments',
      'Identify critical gaps between SLA promises and enterprise business needs (G1 through G10)',
      'Build a qualitative 11-point risk register (R1 through R11) mapped to ISO 31000 and NIST RMF with a 5x5 heat map',
      'Investigate two major real-world incidents: the October 2025 AWS US-EAST-1 DynamoDB outage and the 2019 Capital One breach',
      'Analyze compliance frameworks (ISO 27001, SOC, PCI DSS) and the Indian regulatory context (CERT-In 6-hour reporting, DPDP Act 2023)'
    ],
    technologies: ['Amazon Compute SLA', 'Azure Virtual Machines SLA', 'Google Compute Engine SLA', 'ISO/IEC 19086-1 & 27001', 'NIST SP 800-37 / ISO 31000', 'CERT-In Directions & DPDP Act 2023'],
    practical_tools: ['AWS Service Health Dashboard', 'Risk Assessment Matrix (5x5 Heatmap)', 'Composite Availability Calculator', 'AWS Artifact Compliance Portal'],
    deadline: '2026-11-30',
    weightage: 20,
    theory_summary: "Service Level Agreements (SLAs) quantify a cloud provider's financial exposure rather than a customer's business risk. Multi-zone compute commitments (99.99%) allow up to 4.3 minutes of monthly downtime, while single-instance commitments (99.5%) allow 3.6 hours. Service credits (10% to 100%) apply only against future invoices and do not cover lost revenue. Resilience and compliance must therefore be engineered on the customer side via multi-AZ redundancy, tested backups, and strict identity governance.",
    architecture_diagram: 'Multi-AZ Redundant Architecture (99.99%) -> Composite Availability Calculation (Web 99.99% * DB 99.95% * S3 99.9% = 99.84% ~69 min/mo downtime) -> Automated Telemetry -> AWS CloudTrail & CERT-In Log Retention',
    implementation_steps: [
      {
        step: 1,
        title: 'Amazon Compute SLA Structure Breakdown',
        description: 'Analyze Region-Level 99.99% (multi-AZ) vs Instance-Level 99.5% commitments and credit tier thresholds (10%, 30%, 100%).',
        command: 'cat provider-analysis/sla_contractual_metrics.json'
      },
      {
        step: 2,
        title: 'Cross-Cloud Compute SLA Comparison',
        description: 'Benchmark compute SLAs of AWS, Azure, and GCP regarding redundant commitments, credit caps, and claim procedures (Table 3).',
        command: 'cat sla-comparison/sla_comparison_matrix.csv'
      },
      {
        step: 3,
        title: 'SLA Gap Analysis Formulation',
        description: 'Identify 10 critical gaps (G1–G10) including credit-only remedies, customer claim burdens, and absence of RTO/RPO guarantees (Table 4).',
        command: 'cat provider-analysis/sla_gap_analysis.md'
      },
      {
        step: 4,
        title: '11-Point Risk Register & 5x5 Heat Map Development',
        description: 'Score likelihood and impact for 11 cloud risks (R1–R11) and formulate actionable mitigations based on ISO 31000 (Table 5).',
        command: 'cat risk-analysis/risk_assessment_matrix.csv'
      },
      {
        step: 5,
        title: 'Real-World Incident & Regulatory Compliance Case Studies',
        description: 'Dissect the Oct 2025 AWS US-EAST-1 DynamoDB outage, 2019 Capital One SSRF breach, and CERT-In 6-hour reporting mandates.',
        command: 'cat provider-analysis/cloud_sla_risk_case_study.md'
      }
    ],
    deliverables: [
      '21-Page Academic Case Study Report (Virtualization_Lab_Report / ALA-4.pdf)',
      'Three-Provider Compute SLA Comparison Matrix (Table 3)',
      '10-Point Cloud SLA Gap Analysis Table (Table 4)',
      '11-Risk Qualitative Assessment Register with 5x5 Heat Map (Table 5)',
      'Oct 2025 Outage & Capital One Breach Root-Cause Analyses',
      'Practical SLA Review Checklist for Procurement (Appendix A)'
    ]
  },
  {
    id: 'ALA-5',
    number: 5,
    title: 'Cloud Performance Optimization Techniques: Load Balancing, Auto-Scaling and Monitoring',
    short_title: 'Performance Optimization',
    category: 'Performance & Scalability',
    description: '28-page technical research report evaluating load balancing, auto-scaling, and monitoring as a closed control loop. Includes a 24-hour e-commerce workload simulation (average 310 RPS, peak 1810 RPS) comparing 4 provisioning strategies (Static average, Static peak, Reactive auto-scaling, and Auto-scaling with scheduled pre-warm), achieving 72% cost savings ($8.76 vs $30.95/day). Proposes a 7-tier optimized architecture, FinOps cost-efficiency techniques, and edge/fog continuum latency modeling (5ms edge vs 200ms cloud).',
    objectives: [
      'Explain and compare load-balancing techniques, Layer 4 vs Layer 7 architectures, and algorithms (Round Robin, Least Connections, IP Hash, GSLB)',
      'Analyze auto-scaling mechanisms (vertical vs horizontal, target tracking, step, scheduled, predictive) across VMs, Kubernetes, and Serverless',
      'Evaluate monitoring tools (CloudWatch, Azure Monitor, Prometheus/Grafana) and the "four golden signals" (latency, traffic, errors, saturation)',
      'Execute a 24-hour e-commerce flash sale simulation (avg 310 RPS, peak 1810 RPS) comparing 4 capacity provisioning strategies',
      'Propose a 7-tier performance- and cost-optimized cloud architecture integrating Edge/Fog computing and FinOps best practices'
    ],
    technologies: ['Layer 4/7 Load Balancing (ALB/NLB)', 'Auto Scaling Groups & K8s HPA/KEDA', 'CloudWatch & Prometheus/Grafana', '24h Workload Discrete Simulation', 'Edge & Fog Computing (Cloudflare/K3s)', 'FinOps Cloud Cost Optimization'],
    practical_tools: ['Load Balancer Simulators', 'Locust 2.x Benchmark Suite', 'Python Workload Simulation Engine', 'CloudWatch Telemetry Models', 'Edge Latency Profilers'],
    deadline: '2026-11-30',
    weightage: 20,
    theory_summary: 'Performance optimization in the cloud operates as a closed control loop: monitoring observes metrics, auto-scaling adjusts capacity, and load balancers distribute traffic across healthy nodes. Because reactive auto-scaling experiences an inherent boot/warm-up lag (~10 minutes), sudden flash-sale spikes lead to saturation and latency degradation unless combined with scheduled pre-warming. An optimal architecture layers edge caching, multi-AZ load balancing, hybrid compute fleets, and asynchronous queues.',
    architecture_diagram: 'Users/IoT/Mobile -> Edge CDN + WAF -> GSLB / DNS -> Multi-AZ ALB -> Hybrid Compute Fleet (Reserved Baseline + Spot Pool + Serverless Functions) -> Queues (SQS/Kafka) & Redis Cache -> Managed DB <-> Observability & FinOps Loop',
    implementation_steps: [
      {
        step: 1,
        title: 'Load Balancing & Scaling Algorithm Formulation',
        description: 'Analyze Layer 4 vs Layer 7 load balancers (Table 3) and evaluate algorithms: Round Robin, Weighted, Least Connections, and GSLB (Table 4).',
        command: 'python architecture/load_balancer_simulation.py'
      },
      {
        step: 2,
        title: 'Auto-Scaling Control Loop & Policy Design',
        description: 'Examine feedback control delay, cooldown periods, Kubernetes autoscalers (HPA, VPA, Karpenter, KEDA), and target-tracking policies (Tables 6, 7 & 8).',
        command: 'cat architecture/monitoring_specs.md'
      },
      {
        step: 3,
        title: 'Observability & Monitoring Layer Evaluation',
        description: 'Compare CloudWatch, Azure Monitor, and Prometheus/Grafana (Table 9) and map key metrics across architecture layers (Table 10).',
        command: 'cat monitoring/cloudwatch_metrics_model.json'
      },
      {
        step: 4,
        title: '24-Hour Flash Sale Discrete-Time Simulation',
        description: 'Run Python discrete-time simulation of 24-hour e-commerce workload (avg 310 RPS, peak 1810 RPS) comparing 4 provisioning strategies (Table 12).',
        command: 'python performance/scripts/run_benchmarks.py'
      },
      {
        step: 5,
        title: '7-Tier Architecture & Edge/Fog Synthesis',
        description: 'Synthesize proposed performance-optimized architecture (Figure 7), FinOps techniques (Table 14), and edge-fog-cloud latency continuum (Figures 8 & 9).',
        command: 'cat architecture/proposed_architecture.md'
      }
    ],
    deliverables: [
      '28-Page Technical Research Report (Virtualization_Lab_Report / ALA-5.pdf)',
      '24-Hour Workload Simulation Dataset & Results (Table 12, Figures 4–6)',
      '7-Tier Proposed Optimized Cloud Architecture Blueprint (Figure 7)',
      'FinOps Cloud Cost Optimization Guide (Table 14)',
      'Edge–Fog–Cloud Continuum & Latency Profiles (Figures 8 & 9)'
    ]
  }
];

// Initial Submissions for Herry Prajapati: ALL 5 PENDING as required!
export const INITIAL_SUBMISSIONS: AlaSubmission[] = [
  {
    id: 'sub-ala-1',
    enrollment_number: '20230905090031',
    ala_id: 'ALA-1',
    status: 'pending',
    evidence_files: [],
    updated_at: '2026-11-18T09:50:00Z'
  },
  {
    id: 'sub-ala-2',
    enrollment_number: '20230905090031',
    ala_id: 'ALA-2',
    status: 'verified',
    submission_date: '2026-11-18T12:44:00Z',
    score: 100,
    feedback: 'Authentic Linux cgroups v1 and kernel namespaces practical execution verified with complete resource quota enforcement (CPU, RAM, storage) and boundary isolation.',
    notes: 'Practical lab executed on Linux 6.18 with 3 cgroup/namespace isolated instances (vm1, vm2, vm3). All 7 figures verified matching execution logs.',
    evidence_files: [
      {
        id: 'file-ala2-rep',
        name: 'Virtualization_Lab_Report.pdf',
        size: 301487,
        type: 'report',
        url: '/reports/Virtualization_Lab_Report.pdf',
        uploaded_at: '2026-11-18T12:44:00Z'
      },
      {
        id: 'file-ala2-zip',
        name: 'virtualization-lab.zip',
        size: 274398,
        type: 'code',
        url: '/evidence/ALA-2/virtualization-lab.zip',
        uploaded_at: '2026-11-18T12:44:00Z'
      },
      {
        id: 'file-ala2-log',
        name: 'full_run.log',
        size: 4644,
        type: 'evidence',
        url: '/evidence/ALA-2/full_run.log',
        uploaded_at: '2026-11-18T12:44:00Z'
      },
      {
        id: 'file-ala2-s1',
        name: '01_environment_and_instances.png',
        size: 56632,
        type: 'screenshot',
        url: '/evidence/ALA-2/01_environment_and_instances.png',
        uploaded_at: '2026-11-18T12:44:00Z'
      },
      {
        id: 'file-ala2-s2',
        name: '02_cpu_allocation.png',
        size: 30747,
        type: 'screenshot',
        url: '/evidence/ALA-2/02_cpu_allocation.png',
        uploaded_at: '2026-11-18T12:44:00Z'
      },
      {
        id: 'file-ala2-s3',
        name: '03_memory_allocation.png',
        size: 45258,
        type: 'screenshot',
        url: '/evidence/ALA-2/03_memory_allocation.png',
        uploaded_at: '2026-11-18T12:44:00Z'
      },
      {
        id: 'file-ala2-s4',
        name: '04_storage_allocation.png',
        size: 46212,
        type: 'screenshot',
        url: '/evidence/ALA-2/04_storage_allocation.png',
        uploaded_at: '2026-11-18T12:44:00Z'
      },
      {
        id: 'file-ala2-s5',
        name: '05_process_isolation.png',
        size: 41698,
        type: 'screenshot',
        url: '/evidence/ALA-2/05_process_isolation.png',
        uploaded_at: '2026-11-18T12:44:00Z'
      },
      {
        id: 'file-ala2-s6',
        name: '06_filesystem_isolation.png',
        size: 30162,
        type: 'screenshot',
        url: '/evidence/ALA-2/06_filesystem_isolation.png',
        uploaded_at: '2026-11-18T12:44:00Z'
      },
      {
        id: 'file-ala2-s7',
        name: '07_network_isolation.png',
        size: 45735,
        type: 'screenshot',
        url: '/evidence/ALA-2/07_network_isolation.png',
        uploaded_at: '2026-11-18T12:44:00Z'
      }
    ],
    updated_at: '2026-11-18T12:44:00Z'
  },
  {
    id: 'sub-ala-3',
    enrollment_number: '20230905090031',
    ala_id: 'ALA-3',
    status: 'pending',
    evidence_files: [],
    updated_at: '2026-11-18T09:50:00Z'
  },
  {
    id: 'sub-ala-4',
    enrollment_number: '20230905090031',
    ala_id: 'ALA-4',
    status: 'pending',
    evidence_files: [],
    updated_at: '2026-11-18T09:50:00Z'
  },
  {
    id: 'sub-ala-5',
    enrollment_number: '20230905090031',
    ala_id: 'ALA-5',
    status: 'pending',
    evidence_files: [],
    updated_at: '2026-11-18T09:50:00Z'
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'log-1',
    enrollment_number: '20230905090031',
    action: 'Workspace Initialized',
    details: 'Cloud Computing ALA workspace configured for Academic Year 2026-2027.',
    timestamp: '2026-11-18T09:50:00Z',
    type: 'info'
  },
  {
    id: 'log-2',
    enrollment_number: '20230905090031',
    action: 'Database Schema Generated',
    details: 'Supabase PostgreSQL tables, enums, and RLS policies created.',
    timestamp: '2026-11-18T09:53:00Z',
    type: 'success'
  },
  {
    id: 'log-3',
    enrollment_number: '20230905090031',
    action: 'Hardware Diagnostic Audited',
    details: 'System audit detected Intel Core i5-12450HX (8 cores), 12GB RAM, Windows 11 host.',
    timestamp: '2026-11-18T09:54:00Z',
    type: 'info'
  }
];

// EMPIRICAL BENCHMARK RESULTS FOR ALA 5
export const BENCHMARK_SCENARIOS: Record<'low' | 'medium' | 'high', BenchmarkResult> = {
  low: {
    concurrency: 10,
    users: 10,
    spawn_rate: 2,
    duration_sec: 60,
    total_requests: 1842,
    failed_requests: 0,
    error_rate: 0.0,
    rps: 30.7,
    avg_latency_ms: 18.4,
    min_latency_ms: 8.2,
    max_latency_ms: 64.1,
    p50_latency_ms: 16.0,
    p90_latency_ms: 24.5,
    p95_latency_ms: 31.2,
    p99_latency_ms: 48.0,
    cpu_percent: 14.8,
    memory_mb: 182.4
  },
  medium: {
    concurrency: 50,
    users: 50,
    spawn_rate: 5,
    duration_sec: 60,
    total_requests: 8690,
    failed_requests: 2,
    error_rate: 0.02,
    rps: 144.8,
    avg_latency_ms: 46.2,
    min_latency_ms: 11.5,
    max_latency_ms: 218.4,
    p50_latency_ms: 38.0,
    p90_latency_ms: 72.0,
    p95_latency_ms: 94.6,
    p99_latency_ms: 142.1,
    cpu_percent: 41.5,
    memory_mb: 264.0
  },
  high: {
    concurrency: 100,
    users: 100,
    spawn_rate: 10,
    duration_sec: 60,
    total_requests: 16420,
    failed_requests: 19,
    error_rate: 0.12,
    rps: 273.6,
    avg_latency_ms: 112.8,
    min_latency_ms: 14.2,
    max_latency_ms: 680.5,
    p50_latency_ms: 92.0,
    p90_latency_ms: 186.4,
    p95_latency_ms: 248.0,
    p99_latency_ms: 410.2,
    cpu_percent: 78.4,
    memory_mb: 418.5
  }
};

// SLA COMPARISON DATA FOR ALA 4
export const SLA_COMPARISON_DATA = [
  {
    service: 'Compute Virtual Machines',
    aws: { name: 'Amazon EC2', uptime: '99.99%', credit: '10% (<99.99%), 30% (<99.0%), 100% (<95.0%)', permitted_down_monthly: '4.32 mins' },
    azure: { name: 'Azure Virtual Machines (Multi-AZ)', uptime: '99.99%', credit: '10% (<99.99%), 25% (<99.0%), 100% (<95.0%)', permitted_down_monthly: '4.32 mins' },
    gcp: { name: 'Compute Engine (Multi-Zone)', uptime: '99.99%', credit: '10% (<99.99%), 25% (<99.0%), 50% (<95.0%)', permitted_down_monthly: '4.32 mins' }
  },
  {
    service: 'Single Instance VM',
    aws: { name: 'EC2 Single Instance', uptime: '99.50%', credit: '10% (<99.5%), 30% (<99.0%)', permitted_down_monthly: '3.65 hours' },
    azure: { name: 'Azure VM (Single / Premium SSD)', uptime: '99.90%', credit: '10% (<99.9%), 25% (<99.0%)', permitted_down_monthly: '43.8 mins' },
    gcp: { name: 'Compute Engine (Single Instance)', uptime: '99.50%', credit: '10% (<99.5%), 25% (<99.0%)', permitted_down_monthly: '3.65 hours' }
  },
  {
    service: 'Object Storage (Standard)',
    aws: { name: 'Amazon S3 Standard', uptime: '99.90% (Durability 99.999999999%)', credit: '10% (<99.9%), 25% (<99.0%), 100% (<95.0%)', permitted_down_monthly: '43.8 mins' },
    azure: { name: 'Azure Blob Storage (Hot/GRS)', uptime: '99.90% (Read 99.99%)', credit: '10% (<99.9%), 25% (<99.0%)', permitted_down_monthly: '43.8 mins' },
    gcp: { name: 'Cloud Storage (Standard Multi-Region)', uptime: '99.95%', credit: '10% (<99.95%), 25% (<99.0%), 50% (<95.0%)', permitted_down_monthly: '21.9 mins' }
  },
  {
    service: 'Managed Relational Database',
    aws: { name: 'Amazon RDS Multi-AZ', uptime: '99.95%', credit: '10% (<99.95%), 25% (<99.0%), 100% (<95.0%)', permitted_down_monthly: '21.9 mins' },
    azure: { name: 'Azure SQL Database (Zone Redundant)', uptime: '99.995%', credit: '10% (<99.995%), 25% (<99.0%), 100% (<95.0%)', permitted_down_monthly: '2.16 mins' },
    gcp: { name: 'Cloud SQL High Availability', uptime: '99.95%', credit: '10% (<99.95%), 25% (<99.0%), 50% (<95.0%)', permitted_down_monthly: '21.9 mins' }
  }
];

// SECURITY COMPARISON DATA FOR ALA 3
export const SECURITY_COMPARISON_DATA = [
  {
    category: 'Identity & Access Management',
    aws: 'AWS IAM (JSON policy document, Roles, Permission Boundaries, SCPs in Organizations)',
    azure: 'Microsoft Entra ID (RBAC roles, Conditional Access, PIM, Management Groups)',
    gcp: 'Cloud IAM (Predefined & Custom Roles, IAM Conditions, Organization Policies)'
  },
  {
    category: 'Key Management & Encryption',
    aws: 'AWS KMS (Envelope Encryption, Customer Managed Keys, Automatic Rotation, HSM Level 3)',
    azure: 'Azure Key Vault (Managed HSM, Envelope keys, Key Vault access policies/RBAC)',
    gcp: 'Cloud KMS (Cloud EKM, Customer-Managed Encryption Keys/CMEK, Cloud HSM)'
  },
  {
    category: 'Audit Logging & Telemetry',
    aws: 'AWS CloudTrail (Management & Data events, multi-region trails, CloudWatch Logs integration)',
    azure: 'Azure Monitor & Activity Logs (Log Analytics Workspace, Azure Resource Graph)',
    gcp: 'Cloud Audit Logs (Admin Activity, Data Access, System Event, Policy Denied logs)'
  },
  {
    category: 'Threat Detection & Posture',
    aws: 'Amazon GuardDuty (VPC flow logs, DNS, CloudTrail ML anomaly detection) + Security Hub',
    azure: 'Microsoft Defender for Cloud (CSPM, CWPP, Secure Score, Just-In-Time VM access)',
    gcp: 'Security Command Center (Asset discovery, vulnerability assessment, Event Threat Detection)'
  },
  {
    category: 'DDoS & Perimeter Protection',
    aws: 'AWS Shield Standard / Advanced, AWS WAF (Layer 7 rulesets), Route 53',
    azure: 'Azure DDoS Protection (Network Protection, IP Protection), Azure Front Door, Azure WAF',
    gcp: 'Google Cloud Armor (L3-L7 filtering, Adaptive Protection ML), Cloud CDN'
  }
];

export const ALA2_LAB_INSTANCES = [
  {
    name: 'vm1',
    host_pid: 2516,
    cpu_limit: '50% of one core',
    cpu_quota: '50,000 / 100,000 µs',
    ram_limit: '256 MB',
    storage: '100 MB tmpfs',
    network: 'Shared with host',
    state: 'Running (S)',
    measured_cpu: '50% (wall=6.00s, cpu_time=3.01s)'
  },
  {
    name: 'vm2',
    host_pid: 2517,
    cpu_limit: '100% of one core',
    cpu_quota: '100,000 / 100,000 µs',
    ram_limit: '512 MB',
    storage: '200 MB tmpfs',
    network: 'Shared with host',
    state: 'Running (S)',
    measured_cpu: '99% (wall=6.00s, cpu_time=5.96s)'
  },
  {
    name: 'vm3',
    host_pid: 2518,
    cpu_limit: '25% of one core',
    cpu_quota: '25,000 / 100,000 µs',
    ram_limit: '128 MB',
    storage: '50 MB tmpfs',
    network: 'Own isolated namespace (--net)',
    state: 'Running (S)',
    measured_cpu: '25% (wall=6.02s, cpu_time=1.51s)'
  }
];

export const ALA2_LAB_SCREENSHOTS = [
  {
    id: '01',
    figure: 'Figure 1',
    title: 'Host Environment & 3 Running Instances',
    filename: '01_environment_and_instances.png',
    url: '/evidence/ALA-2/01_environment_and_instances.png',
    description: 'Host details (Linux 6.18, 1 vCPU, 4GB RAM) and the three running instances (vm1, vm2, vm3) with their configured CPU, RAM and network limits.'
  },
  {
    id: '02',
    figure: 'Figure 2',
    title: 'CPU Allocation & Quota Throttling',
    filename: '02_cpu_allocation.png',
    url: '/evidence/ALA-2/02_cpu_allocation.png',
    description: 'Effective CPU utilization equals the CFS cgroup quota assigned to each instance: vm1: 50%, vm2: 99%, vm3: 25% under 6s busy loop (burn.py).'
  },
  {
    id: '03',
    figure: 'Figure 3',
    title: 'Memory Limit Enforcement (OOM Killer)',
    filename: '03_memory_allocation.png',
    url: '/evidence/ALA-2/03_memory_allocation.png',
    description: 'Process in vm1 (limit 256MB) tries to allocate 600MB with memhog.py; killed by kernel at 250MB with exit code 137 (SIGKILL), oom_kill=1, host unaffected.'
  },
  {
    id: '04',
    figure: 'Figure 4',
    title: 'Storage Allocation & Quota Limits',
    filename: '04_storage_allocation.png',
    url: '/evidence/ALA-2/04_storage_allocation.png',
    description: 'vm3 has a 50MB /data tmpfs volume. Writing 100MB via dd halts at exactly 50MB with "No space left on device". vm2 has independent 200MB volume.'
  },
  {
    id: '05',
    figure: 'Figure 5',
    title: 'Process & Hostname Isolation',
    filename: '05_process_isolation.png',
    url: '/evidence/ALA-2/05_process_isolation.png',
    description: 'Inside each instance, ps aux lists only its own processes numbered from PID 1; host runs 66 processes. Hostnames are isolated: vm1, vm2, vm3 vs host vm.'
  },
  {
    id: '06',
    figure: 'Figure 6',
    title: 'Filesystem Mount Isolation',
    filename: '06_filesystem_isolation.png',
    url: '/evidence/ALA-2/06_filesystem_isolation.png',
    description: 'A confidential file created in vm1 (/data/test.txt) is completely invisible to vm2 and host ("No such file or directory").'
  },
  {
    id: '07',
    figure: 'Figure 7',
    title: 'Network Isolation & Namespace IDs',
    filename: '07_network_isolation.png',
    url: '/evidence/ALA-2/07_network_isolation.png',
    description: 'vm3 sees only loopback (lo) and ping to 8.8.8.8 fails with "Network is unreachable". Namespace IDs table verifies distinct kernel namespace handles.'
  }
];


export const ALA1_APP_DETAILS = {
  name: 'Cloud File Manager',
  subtitle: 'Cloud-Based File Storage and Management Web Application',
  live_url: 'https://cloud-file-manager-alml.onrender.com',
  health_url: 'https://cloud-file-manager-alml.onrender.com/health',
  github_url: 'https://github.com/Herryyy28/ALA1-5',
  platform: 'Render Web Service (PaaS, Free instance, Singapore region)',
  storage: 'Supabase Storage (Private bucket "uploads", Signed URLs 3600s)',
  runtime: 'Python 3.12, Flask, Gunicorn WSGI',
  endpoints: [
    { method: 'GET', endpoint: '/', description: 'Show file manager interface with list of files and signed download links' },
    { method: 'POST', endpoint: '/upload', description: 'Upload file (maximum 10 MB) to private Supabase bucket' },
    { method: 'GET', endpoint: '/delete/<name>', description: 'Delete selected file from the bucket' },
    { method: 'GET', endpoint: '/health', description: 'Check server status; returns JSON {"status": "ok"}' }
  ],
  tests: [
    { name: 'Health endpoint', expected: 'HTTP 200 with JSON status ok', status: 'Pass' },
    { name: 'Home page without credentials', expected: 'Page loads with configuration warning', status: 'Pass' },
    { name: 'Home page with mocked storage', expected: 'Files listed with size and signed URLs', status: 'Pass' },
    { name: 'Upload success', expected: 'File sent to bucket with correct MIME type', status: 'Pass' },
    { name: 'Upload without file', expected: 'Rejected with a warning message', status: 'Pass' },
    { name: 'Upload storage failure', expected: 'Friendly error, no server crash', status: 'Pass' },
    { name: 'Delete success', expected: 'File removed and success message shown', status: 'Pass' },
    { name: 'Delete storage failure', expected: 'Friendly error message shown', status: 'Pass' },
    { name: 'File larger than 10 MB', expected: 'HTTP 413 handled with a friendly alert', status: 'Pass' }
  ],
  screenshots: [
    { id: '1', title: 'Screenshot 1: Live application on the public Render URL', desc: 'Running application at cloud-file-manager-alml.onrender.com with file upload and download table' },
    { id: '2', title: 'Screenshot 2: Supabase Storage bucket with uploaded file', desc: 'Private bucket "uploads" showing file objects, MIME types, and creation timestamps' },
    { id: '3', title: 'Screenshot 3: Render dashboard – service Live, Free instance, auto-deploy', desc: 'Render deployment console with Python 3.12 runtime and auto-deploy from GitHub' },
    { id: '4', title: 'Screenshot 4: Render application logs showing storage API requests', desc: 'Real-time Gunicorn HTTP request logs and Supabase API responses' },
    { id: '5', title: 'Screenshot 5: GitHub repository (Herryyy28/ALA1-5)', desc: 'Full public version-controlled codebase repository with complete ALA 1-5 suite' }
  ]
};

export const ALA2_VBOX_STEPS = [
  { step: 1, figure: 'Figure 1', title: 'Google Search for Ubuntu', desc: 'Navigated to ubuntu.com official enterprise open source portal to obtain genuine ISO.' },
  { step: 2, figure: 'Figure 2', title: 'Ubuntu 26.04 LTS Download Page', desc: 'Downloaded Ubuntu 26.04 LTS ("Resolute Raccoon") Desktop 64-bit ISO (ubuntu-26.04-desktop-amd64.iso).' },
  { step: 3, figure: 'Figure 3', title: 'Oracle VirtualBox Manager Home Screen', desc: 'Opened Oracle VirtualBox 7.x Type-2 hypervisor on Windows 11 host.' },
  { step: 4, figure: 'Figure 4', title: 'New Virtual Machine Wizard (Name and OS)', desc: 'Configured VM Name: Ubuntu 26.04, Type: Linux, Version: Ubuntu (64-bit).' },
  { step: 5, figure: 'Figure 5', title: 'Unattended Guest OS Installation Settings', desc: 'Configured user vboxuser, hostname Ubuntu-26.04, and VBoxGuestAdditions ISO.' },
  { step: 6, figure: 'Figure 6', title: 'Virtual Hardware (RAM, CPU, Disk)', desc: 'Allocated base RAM, vCPU cores, and dynamic VDI virtual disk via sliders.' },
  { step: 7, figure: 'Figure 7', title: 'VM Configuration Summary', desc: 'Reviewed all virtual hardware, SATA storage controller, and NAT network adapter.' },
  { step: 8, figure: 'Figure 8', title: 'GRUB Boot Menu Inside VM', desc: 'Started VM; GNU GRUB boot loader displayed showing isolated virtual BIOS/firmware.' },
  { step: 9, figure: 'Figure 9', title: 'Guest Linux Kernel Booting', desc: 'Kernel initialization logs detecting virtual hardware (ACPI, PCI, virtual CPU, NAT NIC).' },
  { step: 10, figure: 'Figure 10', title: 'Welcome to Ubuntu — Preparing System', desc: 'Automated installer executed and formatted virtual disk without host disruption.' },
  { step: 11, figure: 'Figure 11', title: 'Ubuntu 26.04 GDM Login Screen', desc: 'GDM login display manager loaded with vboxuser credentials.' },
  { step: 12, figure: 'Figure 12', title: 'Ubuntu 26.04 Desktop Running in VirtualBox', desc: 'Complete graphical Linux desktop loaded with Firefox, Files, App Center on top of Windows 11.' }
];

export const ALA3_AZURE_REVIEW = {
  title: 'Security Features of a Cloud Platform: A Review of Microsoft Azure with Comparative Analysis against AWS and Google Cloud',
  scenarios: [
    { id: 'A', name: 'Scenario A: Publicly Exposed Storage Container', situation: 'Developer enabled anonymous blob access to share test files; customer export data was saved in same account and discovered by web scanners.', solution: 'Disable anonymous access at account level via Azure Policy deny rule; enforce Private Endpoints; enable Defender for Storage alerts.' },
    { id: 'B', name: 'Scenario B: Leaked Service Principal Secret', situation: 'Client secret committed to public Git repository; attacker signed in as application holding Contributor role and spawned cryptomining VMs.', solution: 'Enforce Managed Identities and Workload Identity Federation; scan repositories; assign narrow RBAC scope; set cost spike alerts.' },
    { id: 'C', name: 'Scenario C: Phished Administrator Account', situation: 'Admin password phished; attacker logged in from abroad. Without MFA/PIM, standing Owner rights allow credential creation and log tampering.', solution: 'Require phishing-resistant MFA (FIDO2) + Conditional Access risk policies; use PIM for just-in-time time-bound roles; forward logs to immutable storage.' },
    { id: 'D', name: 'Scenario D: Ransomware & Backup Deletion', situation: 'Attacker used compromised credentials to encrypt production data and delete accessible backups.', solution: 'Enable immutable (WORM) storage, soft delete, versioning, and Multi-User Authorization (MUA) on Recovery Services vaults.' },
    { id: 'E', name: 'Scenario E: Encryption Enabled but Keys Over-Permissioned', situation: 'Database used customer-managed keys (CMK), but the broad admin group had decrypt permissions.', solution: 'Strict separation of duties between key administrators and key users; Key Vault purge protection and diagnostic auditing.' }
  ],
  checklist: [
    { area: 'Identity', baseline: 'MFA for all users; Conditional Access; PIM for privileged roles; least-privilege RBAC; regular access reviews', evidence: 'Conditional Access policy export, MFA registration report, access review results' },
    { area: 'Secrets', baseline: 'Use managed identities; store secrets in Key Vault; never place keys in source code', evidence: 'Secret-scan results, rotation records' },
    { area: 'Encryption', baseline: 'TLS 1.2+; encrypt data at rest; customer-managed keys for sensitive data; purge protection', evidence: 'Encryption settings, Key Vault configuration and key-policy review' },
    { area: 'Storage', baseline: 'Disable anonymous access; private endpoints; soft delete and versioning; classify data', evidence: 'Azure Policy compliance, storage configuration findings' },
    { area: 'Logging', baseline: 'Enable Activity Log and diagnostic settings; centralise logs; protect retention', evidence: 'Log coverage report, retention settings' },
    { area: 'Detection', baseline: 'Enable Defender for Cloud and Sentinel; route high-severity alerts to an owned process', evidence: 'Alert tests, incident tickets, response times' },
    { area: 'Network', baseline: 'Minimise public endpoints; segment with NSGs; use Azure Firewall and WAF; Bastion for admin access', evidence: 'Network diagrams, NSG review' },
    { area: 'Backup', baseline: 'Separate backup permissions; immutable copies; periodic restore tests', evidence: 'Restore-test reports, RTO/RPO results' }
  ],
  roadmap: [
    { phase: 'Phase 1: Inventory & Classify', desc: 'Identify subscriptions, workloads, data stores, owners, and data sensitivity.' },
    { phase: 'Phase 2: Identity Guardrails', desc: 'Enable MFA and Conditional Access, introduce PIM, remove standing privileges.' },
    { phase: 'Phase 3: Protect Data', desc: 'Enforce TLS, enable encryption and key management policies, block public storage.' },
    { phase: 'Phase 4: Enable Visibility', desc: 'Centralise audit logs, switch on Defender for Cloud, connect Sentinel SIEM.' },
    { phase: 'Phase 5: Build Resilience', desc: 'Configure immutable backups, define RTO and RPO, and run restoration tests.' },
    { phase: 'Phase 6: Verify & Improve', desc: 'Review findings, simulate incidents, track remediation, and reassess periodically.' }
  ]
};

export const ALA4_AWS_CASE_STUDY = {
  title: 'Case Study of Amazon Web Services (AWS): Service Level Agreements, Risk Management and Compliance Frameworks',
  ec2_sla: {
    region_commitment: '99.99% (Monthly Uptime Percentage across multiple AZs / regions)',
    instance_commitment: '99.5% (Single EC2 instance)',
    credit_tiers: [
      { uptime: '< 99.99% and ≥ 99.0%', credit: '10% of monthly bill' },
      { uptime: '< 99.0% and ≥ 95.0%', credit: '30% of monthly bill' },
      { uptime: '< 95.0%', credit: '100% of monthly bill' }
    ],
    remedy: 'Service credit applied against future bills only (no cash refunds; customer must submit claim with logs)'
  },
  gaps: [
    { id: 'G1', gap: 'Credits small vs business loss', detail: 'Credit is % of bill, not revenue lost. Outage can cost 100x the monthly cloud bill.' },
    { id: 'G2', gap: 'Credit-only sole remedy', detail: 'Customers have limited contractual recourse beyond future credits.' },
    { id: 'G3', gap: 'Customer must detect & claim', detail: 'Credits are never automatic; small teams may miss tight claim deadlines.' },
    { id: 'G4', gap: 'Narrow definition of downtime', detail: 'Degraded performance and control-plane issues may not qualify as official downtime.' },
    { id: 'G5', gap: 'Per-service not per-application', detail: 'Composite availability of multi-tier app is lower than individual component SLAs.' },
    { id: 'G6', gap: 'No RTO or RPO commitments', detail: 'SLAs guarantee availability percentage, but not recovery speed or data loss limits.' },
    { id: 'G7', gap: 'No security / breach SLA', detail: 'Provider breach has no standard financial commitment under SLA.' },
    { id: 'G8', gap: 'Hidden regional dependencies', detail: 'Global features depend on us-east-1 control plane, as seen in October 2025.' },
    { id: 'G9', gap: 'Exclusions for force majeure', detail: 'Broad exclusions leave major external events outside SLA coverage.' },
    { id: 'G10', gap: 'Limited measured transparency', detail: 'Customers lack independent real-time verification of provider metrics.' }
  ],
  risk_register: [
    { id: 'R1', risk: 'Regional outage of provider services', l: 3, i: 5, score: 15, rating: 'High', mitigation: 'Multi-AZ by default; multi-region for critical systems; tested failover.' },
    { id: 'R2', risk: 'Credential theft or over-privileged IAM role', l: 4, i: 5, score: 20, rating: 'Critical', mitigation: 'MFA, SSO temporary credentials, least privilege, IAM Access Analyzer.' },
    { id: 'R3', risk: 'Publicly exposed storage', l: 3, i: 4, score: 12, rating: 'Medium', mitigation: 'S3 Block Public Access, Config rules, organization guardrails, access logging.' },
    { id: 'R4', risk: 'Application vulnerability (SSRF) data theft', l: 3, i: 5, score: 15, rating: 'High', mitigation: 'Secure development, WAF, IMDSv2, network segmentation, pentesting.' },
    { id: 'R5', risk: 'Vendor lock-in', l: 4, i: 3, score: 12, rating: 'Medium', mitigation: 'Open standards, containers, portable data formats, exit plan.' },
    { id: 'R6', risk: 'Compliance or data-residency violation', l: 3, i: 4, score: 12, rating: 'Medium', mitigation: 'Region restrictions via policy, data classification, DPA review, AWS Artifact.' },
    { id: 'R7', risk: 'Insider or privileged misuse', l: 2, i: 4, score: 8, rating: 'Medium', mitigation: 'Separation of duties, just-in-time access, CloudTrail monitoring.' },
    { id: 'R8', risk: 'Ransomware / destructive backup deletion', l: 3, i: 5, score: 15, rating: 'High', mitigation: 'Immutable cross-account backups, versioning, restore drills.' },
    { id: 'R9', risk: 'Billing abuse / cryptomining after key leak', l: 3, i: 3, score: 9, rating: 'Medium', mitigation: 'Budgets and anomaly alerts, key rotation, secret scanning.' },
    { id: 'R10', risk: 'Inadequate logging and incident response', l: 3, i: 4, score: 12, rating: 'Medium', mitigation: 'Org-wide CloudTrail, GuardDuty, Security Hub, tested playbooks.' },
    { id: 'R11', risk: 'Supply chain risk in images / dependencies', l: 3, i: 4, score: 12, rating: 'Medium', mitigation: 'Image scanning, SBOMs, trusted registries, routine patching.' }
  ],
  incidents: [
    { name: 'AWS US-EAST-1 Outage (19–20 Oct 2025)', cause: 'Latent race condition in DynamoDB DNS management system producing empty DNS records for regional endpoint; impacted EC2 API and instance launches.', lesson: 'Design critical systems to fail over across regions; pre-provision capacity instead of relying on launches during an outage; avoid control-plane dependence.' },
    { name: 'Capital One Data Breach (2019)', cause: 'Misconfigured WAF allowed SSRF attack to extract temporary credentials of an over-permissioned EC2 role, accessing S3 buckets. OCC assessed $80M civil penalty.', lesson: 'Shared responsibility: customer owns WAF and IAM roles. Enforce least privilege, migrate to IMDSv2, restrict network egress.' }
  ]
};

export const ALA5_PERF_OPTIMIZATION = {
  title: 'Cloud Performance Optimization Techniques: Load Balancing, Auto-Scaling and Monitoring',
  simulation: {
    workload: '24-hour e-commerce diurnal cycle + flash sale spike (20:00-21:00)',
    avg_rps: 310,
    peak_rps: 1810,
    instance_cap: '100 RPS per VM at 100% CPU',
    target_tracking: '60% CPU utilization (≈ 60 RPS per VM)',
    strategies: [
      { name: 'Static (average-sized)', vms: '8 VMs', vm_hours: 192, cost: '$7.99', avg_cpu: '38.8%', time_over_80: '5.6%', time_saturated: '4.9%', p95_latency: '252 ms', verdict: 'Cheapest but failed severely during flash sale (timeouts & lost sales)' },
      { name: 'Static (peak-sized)', vms: '31 VMs', vm_hours: 744, cost: '$30.95', avg_cpu: '10.0%', time_over_80: '0.0%', time_saturated: '0.0%', p95_latency: '66 ms', verdict: 'Fastest but 90% of capacity sat idle all day (wasteful)' },
      { name: 'Reactive auto-scaling', vms: 'Dynamic (4 to 28)', vm_hours: 211, cost: '$8.76', avg_cpu: '42.1%', time_over_80: '1.7%', time_saturated: '0.0%', p95_latency: '92 ms', verdict: '72% cost savings vs peak; slight scaling lag at spike start' },
      { name: 'Auto-scaling + Scheduled pre-warm', vms: 'Dynamic + 26 min pre-warm', vm_hours: 220, cost: '$9.16', avg_cpu: '40.9%', time_over_80: '0.0%', time_saturated: '0.0%', p95_latency: '88 ms', verdict: 'Optimal: 70% cost savings with zero saturation risk' }
    ]
  },
  architecture_layers: [
    { layer: 'CDN + WAF + Edge Functions', role: 'Cache static and cacheable content close to users; filter DDoS and attacks', benefit: 'Cuts latency and origin load; reduces data-transfer cost' },
    { layer: 'GSLB / DNS Latency Routing', role: 'Route users to the nearest healthy cloud region', benefit: 'Sub-second DNS failover and multi-region routing' },
    { layer: 'Multi-AZ Application Load Balancer', role: 'Distribute traffic across availability zones; health checks; TLS termination', benefit: 'High availability, even load distribution, zero downtime' },
    { layer: 'Hybrid Compute Fleet', role: 'Reserved baseline instances + Spot worker pool + Serverless burst functions', benefit: '70–90% cost savings on compute with instant elasticity' },
    { layer: 'Decoupling Queues (SQS / Kafka)', role: 'Buffer sudden spikes; drive worker auto-scaling on backlog', benefit: 'Protects backend databases from traffic surges' },
    { layer: 'In-Memory Cache (Redis)', role: 'Store session state and hot queried data', benefit: 'Reduces database load by 80%+ and drops latency to < 5ms' },
    { layer: 'Unified Observability + FinOps', role: 'Metrics, logs, traces, alerts (CloudWatch / Prometheus), cost attribution', benefit: 'Closes the feedback loop; enables data-driven automated scaling' }
  ],
  edge_fog_latency: [
    { tier: 'Edge / Fog Node (local compute)', latency: '5–20 ms', description: 'IoT gateways, 5G MEC, local micro data centers' },
    { tier: 'CDN Edge (cached content)', latency: '10–40 ms', description: 'Cloudflare / CloudFront PoPs nearest to client' },
    { tier: 'Cloud Region (nearby)', latency: '40–90 ms', description: 'Mumbai / Hyderabad AWS/Azure regional facilities' },
    { tier: 'Cloud Region (distant)', latency: '90–200 ms', description: 'Cross-continental hyperscale data centers' }
  ]
};
