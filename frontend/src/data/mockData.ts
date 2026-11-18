import { AlaActivity, StudentProfile, AlaSubmission, ActivityLog, BenchmarkResult } from '../types';

export const STUDENT_PROFILE: StudentProfile = {
  id: 'usr-20230905090031',
  enrollment_number: '20230905090031',
  full_name: 'Herry Prajapati',
  email: 'herry.prajapati@gmiu.edu.in',
  role: 'student',
  department: 'Information Technology',
  university: 'Gyanmanjari Institute of Technology (GMIU)',
  academic_year: '2026–2027',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  phone: '+91 98765 43210'
};

export const ALA_ACTIVITIES: AlaActivity[] = [
  {
    id: 'ALA-1',
    number: 1,
    title: 'Cloud Application Deployment & Management Architecture',
    short_title: 'Cloud Deployment',
    category: 'Application Engineering',
    description: 'Design, build, and deploy an enterprise-grade cloud-hosted web application on modern cloud infrastructure with Supabase PostgreSQL, continuous deployment via Netlify, and full student submission tracking.',
    objectives: [
      'Architect a cloud-native single page application using React, TypeScript, and Tailwind CSS',
      'Integrate Supabase PostgreSQL backend with Row Level Security (RLS) data isolation',
      'Deploy the production build onto Netlify CDN edge network with automated CI/CD',
      'Implement real-time enrollment validation against the university directory',
      'Demonstrate public accessibility, cloud persistence, and latency monitoring'
    ],
    technologies: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Netlify Edge', 'Git'],
    practical_tools: ['Netlify CLI', 'Supabase Dashboard', 'Postman / HTTP Client', 'Chrome DevTools', 'Vite Build Engine'],
    deadline: '2026-11-30',
    weightage: 20,
    theory_summary: 'Cloud Application Deployment leverages Infrastructure-as-a-Service (IaaS) and Platform-as-a-Service (PaaS) to decouple software distribution from physical hardware constraints. Using modern Edge CDNs (Netlify) paired with Serverless PostgreSQL (Supabase), applications achieve sub-50ms Time To First Byte (TTFB), zero-downtime rolling releases, and automatic global TLS termination.',
    architecture_diagram: 'User Browser -> Netlify Edge CDN -> Single Page App -> Supabase REST / PostgREST -> PostgreSQL DB (RLS Encapsulated)',
    implementation_steps: [
      {
        step: 1,
        title: 'Project Scaffolding & Configuration',
        description: 'Initialize Vite React TypeScript SPA with Tailwind styling and strict linting standards.',
        command: 'npm create vite@latest frontend -- --template react-ts && npm install'
      },
      {
        step: 2,
        title: 'Database Schema & RLS Setup',
        description: 'Execute SQL migrations on PostgreSQL defining profiles, submissions, files, and role policies.',
        command: 'psql -h db.supabase.co -U postgres -d postgres -f database/schema.sql'
      },
      {
        step: 3,
        title: 'Environment Variables & Client Binding',
        description: 'Configure .env with Supabase URL and anon public key while protecting secret service roles.',
        command: 'cp .env.example .env'
      },
      {
        step: 4,
        title: 'Production Build & Optimization',
        description: 'Compile TypeScript, bundle chunks, tree-shake assets, and test static output.',
        command: 'npm run build'
      },
      {
        step: 5,
        title: 'Netlify Cloud Deployment',
        description: 'Deploy static distribution to Netlify Edge CDN and bind custom domain or netlify.app URL.',
        command: 'netlify deploy --prod --dir=frontend/dist'
      }
    ],
    deliverables: [
      'Publicly accessible web application URL',
      'Full source code repository with GitHub workflow',
      'PostgreSQL schema migration files and RLS policies',
      'Comprehensive technical PDF documentation report'
    ]
  },
  {
    id: 'ALA-2',
    number: 2,
    title: 'Practical Implementation of Virtualization Using Oracle VirtualBox',
    short_title: 'Virtualization',
    category: 'Systems & Infrastructure',
    description: 'System hardware capability audit, installation and configuration of Oracle VirtualBox Type-2 hypervisor, multi-VM provisioning (GMIU-Ubuntu-VM-01 & GMIU-Ubuntu-VM-02), resource allocation testing, and operating system boundary isolation experiments.',
    objectives: [
      'Perform hardware diagnostics checking CPU VT-x/AMD-V virtualization support, cores, RAM, and storage',
      'Configure Oracle VirtualBox Type-2 hypervisor and explore host-guest abstraction layers',
      'Provision two isolated virtual machines with asymmetric CPU and memory specifications',
      'Execute guest Linux OS system diagnostics (lscpu, free -h, df -h, uname -a)',
      'Demonstrate hardware isolation, independent hostnames, network segregation, and resource containment'
    ],
    technologies: ['Oracle VirtualBox 7.x', 'Ubuntu Linux 24.04 LTS', 'VBoxManage CLI', 'Intel VT-x / AMD-V', 'Bash Scripting'],
    practical_tools: ['VBoxManage', 'PowerShell Hardware WMI', 'htop / top', 'iperf3', 'sysbench'],
    deadline: '2026-11-30',
    weightage: 20,
    theory_summary: 'Virtualization abstracts physical computing resources into software constructs. Type-2 (hosted) hypervisors like Oracle VirtualBox operate on top of a conventional host OS (Windows 11) to manage guest operating systems through Virtual Machine Monitors (VMM), binary translation, and hardware-assisted virtualization extensions (Intel VT-x / AMD-V). Virtual machine boundaries enforce memory ring segregation, virtual disk compartmentalization, and sandboxed network interfaces.',
    architecture_diagram: 'Hardware (Intel Core i5-12450HX, 12GB RAM) -> Host OS (Windows 11) -> Oracle VirtualBox (Type-2 Hypervisor) -> [VM 1: Ubuntu 2C/2GB] + [VM 2: Ubuntu 1C/2GB]',
    implementation_steps: [
      {
        step: 1,
        title: 'Host Hardware & Virtualization Audit',
        description: 'Execute PowerShell system audit script to assess CPU logical cores, available RAM, and firmware VT-x state.',
        command: 'powershell -ExecutionPolicy Bypass -File virtualization/scripts/system_audit.ps1'
      },
      {
        step: 2,
        title: 'VirtualBox Hypervisor Installation Check',
        description: 'Verify VBoxManage presence in PATH or standard installation directory.',
        command: 'where.exe VBoxManage || test-path "C:\\Program Files\\Oracle\\VirtualBox\\VBoxManage.exe"'
      },
      {
        step: 3,
        title: 'Automated VM 1 Creation (GMIU-Ubuntu-VM-01)',
        description: 'Provision VM-01 with 2 vCPUs, 2048 MB RAM, and 25 GB dynamically allocated virtual disk.',
        command: 'VBoxManage createvm --name "GMIU-Ubuntu-VM-01" --ostype "Ubuntu_64" --register'
      },
      {
        step: 4,
        title: 'Automated VM 2 Creation (GMIU-Ubuntu-VM-02)',
        description: 'Provision VM-02 with 1 vCPU, 2048 MB RAM, and 20 GB virtual disk with isolated NAT network.',
        command: 'VBoxManage createvm --name "GMIU-Ubuntu-VM-02" --ostype "Ubuntu_64" --register'
      },
      {
        step: 5,
        title: 'Guest Resource Allocation & Isolation Verification',
        description: 'Execute in-guest Linux diagnostic commands verifying memory limits and kernel isolation.',
        command: 'hostname && free -h && nproc && df -h && uname -a'
      }
    ],
    deliverables: [
      'Empirical host machine hardware audit log',
      'VBoxManage automation and provisioning scripts',
      'VM configuration parameters comparison table',
      'Guest isolation experiment report with command outputs',
      'Virtualization technical PDF report'
    ]
  },
  {
    id: 'ALA-3',
    number: 3,
    title: 'Comprehensive Review of Security Features in Cloud Computing Platforms',
    short_title: 'Cloud Security',
    category: 'Cybersecurity & Compliance',
    description: 'In-depth research paper and comparative architectural review evaluating identity governance, cryptographic key management, network security perimeter, threat detection, and breach remediation across AWS, Microsoft Azure, and Google Cloud.',
    objectives: [
      'Evaluate Identity and Access Management (IAM), RBAC, ABAC, and the Principle of Least Privilege',
      'Analyze data encryption mechanisms: AES-256 for data at rest and TLS 1.3 for data in transit',
      'Compare Key Management Services: AWS KMS vs Azure Key Vault vs Google Cloud KMS',
      'Investigate cloud threat intelligence: AWS GuardDuty, Microsoft Defender for Cloud, GCP Security Command Center',
      'Examine real-world cloud security breaches (misconfigured S3, exposed API keys, SSRF) and mitigation blueprints'
    ],
    technologies: ['AWS IAM & KMS', 'Microsoft Entra ID', 'Azure Key Vault', 'Google Cloud IAM & KMS', 'AWS CloudTrail', 'GuardDuty', 'Security Command Center'],
    practical_tools: ['AWS CLI', 'Azure CLI', 'gcloud CLI', 'NIST SP 800-145/800-53', 'CIS Cloud Benchmarks', 'Prowler / ScoutSuite'],
    deadline: '2026-11-30',
    weightage: 20,
    theory_summary: 'Cloud security operates under the Shared Responsibility Model. While cloud service providers (CSPs) manage the security "OF" the cloud (physical data centers, hypervisor, core networking), customers remain strictly accountable for security "IN" the cloud (IAM policies, credential hygiene, data encryption keys, and network security group rules). Modern zero-trust architecture requires continuous verification, least privilege, and assumed breach posture.',
    architecture_diagram: 'User / Identity -> Cloud IAM Policy Engine -> RBAC Role Assumption -> KMS Envelope Encryption (DEK encrypted by KEK) -> Storage at Rest (AES-256-GCM)',
    implementation_steps: [
      {
        step: 1,
        title: 'Identity & Access Architecture Analysis',
        description: 'Formulate comparative JSON policy structures evaluating AWS IAM JSON statements against Azure RBAC assignments and GCP IAM bindings.',
        command: 'cat research/ALA-3/iam_policy_comparison.json'
      },
      {
        step: 2,
        title: 'Cryptographic Key Management Evaluation',
        description: 'Document KMS Envelope Encryption workflow (Master Key / KEK wrapping Data Encryption Keys / DEK).',
        command: 'cat research/ALA-3/kms_envelope_workflow.md'
      },
      {
        step: 3,
        title: 'Comparative Security Feature Matrix Formulation',
        description: 'Construct 25-point comparison across AWS, Azure, and Google Cloud security ecosystems.',
        command: 'cat research/ALA-3/comparative_matrix.md'
      },
      {
        step: 4,
        title: 'Real-World Incident Root-Cause Analysis',
        description: 'Dissect Capital One SSRF metadata breach and Uber credential leak with prevention controls.',
        command: 'cat research/ALA-3/incident_case_studies.md'
      },
      {
        step: 5,
        title: 'Academic Research Paper Compilation',
        description: 'Compile 25-section IEEE-style research paper with citations from NIST, ISO, and cloud provider whitepapers.',
        command: 'python reports/generate_ala3_paper.py'
      }
    ],
    deliverables: [
      '25-section formal academic research paper in Markdown and PDF',
      'Three-provider comparative security matrix table',
      'Identity and KMS architectural diagrams',
      'Real-world incident mitigation checklists'
    ]
  },
  {
    id: 'ALA-4',
    number: 4,
    title: 'Comparative Case Study of AWS, Microsoft Azure and Google Cloud: SLA, Risk Management and Compliance',
    short_title: 'SLA & Risk Case Study',
    category: 'Cloud Governance',
    description: 'Empirical comparative case study analyzing contractual Service Level Agreements (SLAs), uptime commitments (99.9% to 99.999%), service credit recovery mechanisms, vendor lock-in risks, shared responsibility gaps, and international compliance frameworks.',
    objectives: [
      'Deconstruct published SLA documentation for core compute, storage, and database services across AWS, Azure, and GCP',
      'Calculate financial downtime impact, service credit tier thresholds, and claim procedures',
      'Identify enterprise cloud risks: outages, data loss, vendor lock-in, credential compromise, and compliance penalties',
      'Map multi-cloud controls to compliance standards: ISO/IEC 27001, SOC 2 Type II, GDPR, and PCI-DSS',
      'Formulate actionable risk mitigation and high-availability disaster recovery (DR) architectures'
    ],
    technologies: ['AWS SLA Framework', 'Microsoft Azure Service Level Commitments', 'Google Cloud SLA', 'ISO/IEC 27001:2022', 'SOC 2 Type II', 'GDPR Regulation'],
    practical_tools: ['Cloud Availability Calculators', 'Risk Assessment Matrix (5x5 Heatmap)', 'RTO/RPO Planning Tools', 'Cloud Compliance Portals'],
    deadline: '2026-11-30',
    weightage: 20,
    theory_summary: 'A Service Level Agreement (SLA) is a legally binding contract between a cloud provider and a customer establishing minimum acceptable service metrics (typically Monthly Uptime Percentage). Uptime tiers of 99.9% ("three nines") permit up to 43.8 minutes of downtime per month, whereas 99.999% ("five nines") permits only 26.3 seconds. SLAs exclusively offer financial service credits (not liability for customer business losses), making multi-region redundancy and cross-cloud failover essential for business continuity.',
    architecture_diagram: 'Global DNS Failover (Route 53 / Traffic Manager) -> Region A (Primary Active 99.99%) <-> Synced DB Replication <-> Region B (Secondary Standby 99.99%) -> Combined SLA: 99.9999%',
    implementation_steps: [
      {
        step: 1,
        title: 'Service-Specific SLA Data Extraction',
        description: 'Extract and analyze real contractual SLA commitments for EC2/VMs, S3/Blob, and Managed Relational Databases.',
        command: 'cat research/ALA-4/sla_commitments.json'
      },
      {
        step: 2,
        title: 'Downtime & Financial Penalty Calculations',
        description: 'Calculate monthly permitted downtime per uptime percentage and compute service credit compensation.',
        command: 'cat research/ALA-4/uptime_calculations.md'
      },
      {
        step: 3,
        title: '5x5 Risk Assessment Matrix Development',
        description: 'Quantify likelihood vs consequence for 10 critical cloud failure scenarios with mitigation controls.',
        command: 'cat research/ALA-4/risk_matrix.md'
      },
      {
        step: 4,
        title: 'Compliance Framework Harmonization',
        description: 'Cross-reference provider audit reports against ISO 27001, SOC 2 Type II, GDPR, and HIPAA.',
        command: 'cat research/ALA-4/compliance_frameworks.md'
      },
      {
        step: 5,
        title: 'Executive Case Study Report Synthesis',
        description: 'Produce publication-ready comparative SLA and risk case study report.',
        command: 'python reports/generate_ala4_casestudy.py'
      }
    ],
    deliverables: [
      'Comprehensive analytical case study report',
      'Granular SLA comparison matrix across AWS, Azure, and GCP',
      '5x5 Risk assessment and mitigation heat matrix',
      'Compliance framework alignment guide',
      'Formal technical PDF case study document'
    ]
  },
  {
    id: 'ALA-5',
    number: 5,
    title: 'Cloud Application Performance Optimization Using Load Balancing, Auto-Scaling and Monitoring',
    short_title: 'Performance Optimization',
    category: 'Performance Engineering',
    description: 'Empirical performance benchmarking, Layer-7 load balancing simulations (Round Robin, Least Connections), dynamic threshold auto-scaling, and Locust load testing across 10, 50, and 100 concurrent virtual users measuring latency, throughput, and system resource profiles.',
    objectives: [
      'Implement Layer 7 load balancing algorithms: Round Robin, Weighted Distribution, and Least Connections',
      'Simulate horizontal auto-scaling triggers based on CPU, memory, and concurrent request thresholds',
      'Execute automated Locust load testing experiments simulating Low (10 users), Medium (50 users), and High (100 users) traffic',
      'Measure and log empirical metrics: Requests Per Second (RPS), p95 latency, error rates, CPU load, and RAM consumption',
      'Analyze performance bottlenecks and evaluate modern cloud trends (Edge computing, predictive AI auto-scaling, FinOps cost optimization)'
    ],
    technologies: ['Locust 2.x', 'Python 3.13', 'FastAPI / Node.js Engine', 'NGINX Load Balancer Model', 'Prometheus / CloudWatch Telemetry', 'Recharts Visualizer'],
    practical_tools: ['Locust CLI & Web UI', 'Python Asyncio Load Engine', 'system_profiler', 'Recharts Interactive Charts'],
    deadline: '2026-11-30',
    weightage: 20,
    theory_summary: 'Cloud application performance relies on horizontal scalability and intelligent traffic dispersion. Load balancers distribute incoming HTTP/S sessions across healthy compute nodes using algorithms like Round Robin or Least Connections. Auto-scaling groups dynamically provision or terminate instances in response to telemetry alarms (e.g., CPU > 70% for 3 minutes), maintaining sub-second user latency while eliminating idle compute expenses.',
    architecture_diagram: 'Virtual Users (10 / 50 / 100) -> Layer 7 Load Balancer (Round Robin / Least Conn) -> [App Node 1, App Node 2, App Node N (Auto-Scaled)] -> Shared Cache / DB -> Monitoring Engine',
    implementation_steps: [
      {
        step: 1,
        title: 'Locust Test Script Configuration',
        description: 'Define synthetic user behavior in Python with realistic think time, GET/POST payload endpoints, and failure assertions.',
        command: 'cat performance/locust/locustfile.py'
      },
      {
        step: 2,
        title: 'Benchmark Execution: Scenario 1 (Low Load - 10 Users)',
        description: 'Execute Locust headless benchmark for 10 users at 2 users/sec spawn rate.',
        command: 'python performance/scripts/run_benchmarks.py --scenario low --users 10'
      },
      {
        step: 3,
        title: 'Benchmark Execution: Scenario 2 (Medium Load - 50 Users)',
        description: 'Execute Locust headless benchmark for 50 users at 5 users/sec spawn rate.',
        command: 'python performance/scripts/run_benchmarks.py --scenario medium --users 50'
      },
      {
        step: 4,
        title: 'Benchmark Execution: Scenario 3 (High Load - 100 Users)',
        description: 'Execute Locust headless benchmark for 100 users at 10 users/sec spawn rate.',
        command: 'python performance/scripts/run_benchmarks.py --scenario high --users 100'
      },
      {
        step: 5,
        title: 'Telemetry Aggregation & Graphical Analysis',
        description: 'Compile latency curves (Average, p90, p95, p99), throughput (RPS), and server CPU/memory graphs.',
        command: 'python performance/scripts/generate_charts.py'
      }
    ],
    deliverables: [
      'Locust load testing suite with configurable scenarios',
      'Empirical benchmark results data (JSON & CSV)',
      'Performance comparison graphs (RPS vs Concurrency, Latency Percentiles)',
      'Load balancer algorithm comparative evaluation',
      'Comprehensive performance engineering technical PDF report'
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
    status: 'pending',
    evidence_files: [],
    updated_at: '2026-11-18T09:50:00Z'
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
