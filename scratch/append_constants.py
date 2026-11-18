append_code = '''
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
'''

with open('frontend/src/data/mockData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

if 'ALA1_APP_DETAILS' not in text:
    text += '\n' + append_code
    with open('frontend/src/data/mockData.ts', 'w', encoding='utf-8') as f:
        f.write(text)
    print('Appended ALA constants successfully!')
else:
    print('ALA constants already exist in mockData.ts')
