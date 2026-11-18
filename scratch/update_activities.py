import re

new_activities = '''export const ALA_ACTIVITIES: AlaActivity[] = [
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
    theory_summary: 'Service Level Agreements (SLAs) quantify a cloud provider\'s financial exposure rather than a customer\'s business risk. Multi-zone compute commitments (99.99%) allow up to 4.3 minutes of monthly downtime, while single-instance commitments (99.5%) allow 3.6 hours. Service credits (10% to 100%) apply only against future invoices and do not cover lost revenue. Resilience and compliance must therefore be engineered on the customer side via multi-AZ redundancy, tested backups, and strict identity governance.',
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
];'''

with open('frontend/src/data/mockData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

idx_start = text.find('export const ALA_ACTIVITIES')
idx_end = text.find('// Initial Submissions for Herry Prajapati')

if idx_start != -1 and idx_end != -1:
    text = text[:idx_start] + new_activities + '\n\n' + text[idx_end:]
    print('Replaced ALA_ACTIVITIES successfully!')
else:
    print('Failed to find boundaries:', idx_start, idx_end)

with open('frontend/src/data/mockData.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated mockData.ts')
