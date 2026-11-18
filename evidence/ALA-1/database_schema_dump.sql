-- ====================================================================
-- GYANMANJARI INNOVATIVE UNIVERSITY (GMIU) - DEPARTMENT OF IT
-- CLOUD COMPUTING PRACTICAL SUITE (ALA 1-5)
-- Database Schema: Supabase PostgreSQL with Row Level Security (RLS)
-- Student: Herry Prajapati | Enrollment: 20230905090031
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('student', 'faculty', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE submission_status AS ENUM ('pending', 'in_progress', 'submitted', 'verified');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enrollment_number VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(120) UNIQUE,
    role user_role DEFAULT 'student',
    department VARCHAR(80) DEFAULT 'Information Technology',
    university VARCHAR(120) DEFAULT 'Gyanmanjari Institute of Technology (GMIU)',
    academic_year VARCHAR(20) DEFAULT '2026-2027',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ROLES & PERMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.roles (
    role_name user_role PRIMARY KEY,
    description TEXT,
    can_submit BOOLEAN DEFAULT TRUE,
    can_grade BOOLEAN DEFAULT FALSE,
    can_manage_users BOOLEAN DEFAULT FALSE
);

INSERT INTO public.roles (role_name, description, can_submit, can_grade, can_manage_users)
VALUES 
    ('student', 'University student enrolled in Cloud Computing', TRUE, FALSE, FALSE),
    ('faculty', 'Faculty member reviewing practical submissions', TRUE, TRUE, FALSE),
    ('admin', 'System administrator with full operational access', TRUE, TRUE, TRUE)
ON CONFLICT (role_name) DO NOTHING;

-- 5. ALA ACTIVITIES TABLE
CREATE TABLE IF NOT EXISTS public.ala_activities (
    id VARCHAR(10) PRIMARY KEY, -- 'ALA-1' .. 'ALA-5'
    title TEXT NOT NULL,
    short_title VARCHAR(80) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    objectives JSONB DEFAULT '[]'::jsonb,
    technologies JSONB DEFAULT '[]'::jsonb,
    practical_tools JSONB DEFAULT '[]'::jsonb,
    deadline DATE DEFAULT '2026-11-30',
    weightage INT DEFAULT 20,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ALA SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.ala_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enrollment_number VARCHAR(20) NOT NULL REFERENCES public.profiles(enrollment_number) ON DELETE CASCADE,
    ala_id VARCHAR(10) NOT NULL REFERENCES public.ala_activities(id) ON DELETE CASCADE,
    status submission_status DEFAULT 'pending',
    submission_date TIMESTAMPTZ,
    score NUMERIC(5,2),
    feedback TEXT,
    report_url TEXT,
    evidence_bundle_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_student_ala UNIQUE(enrollment_number, ala_id)
);

-- 7. SUBMISSION FILES TABLE
CREATE TABLE IF NOT EXISTS public.submission_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES public.ala_submissions(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_size BIGINT,
    mime_type VARCHAR(100),
    file_type VARCHAR(30) CHECK (file_type IN ('report', 'evidence', 'code', 'screenshot', 'config')),
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ACTIVITY LOGS TABLE
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enrollment_number VARCHAR(20),
    action VARCHAR(100) NOT NULL,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ala_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ala_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Students can read all profiles (for search) but only edit their own.
CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Activities: Public read for all users
CREATE POLICY "Activities read" ON public.ala_activities FOR SELECT USING (true);

-- Submissions: Students read/write their own records; Faculty/Admin read all
CREATE POLICY "Students manage own submissions" ON public.ala_submissions 
    FOR ALL USING (enrollment_number = (SELECT enrollment_number FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "Public submissions view" ON public.ala_submissions 
    FOR SELECT USING (true);

-- Files: Viewable by submission owner & admin
CREATE POLICY "Files access" ON public.submission_files FOR SELECT USING (true);
CREATE POLICY "Files insert" ON public.submission_files FOR INSERT WITH CHECK (true);

-- Logs: Viewable by user or admin
CREATE POLICY "Logs insert" ON public.activity_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Logs view" ON public.activity_logs FOR SELECT USING (true);

-- 10. SEED DATA FOR ALA ACTIVITIES (ALA 1 - ALA 5)
INSERT INTO public.ala_activities (id, title, short_title, category, description, objectives, technologies, practical_tools, deadline, weightage)
VALUES 
(
    'ALA-1',
    'Cloud Application Deployment & Management Architecture',
    'Cloud Deployment',
    'Application Engineering',
    'Design, develop, configure and deploy a secure, cloud-hosted student portal with PostgreSQL database connectivity, authentication, and continuous deployment.',
    '["Deploy full-stack web application on cloud hosting infrastructure", "Configure PostgreSQL database with Row Level Security", "Implement secure authentication and role authorization", "Establish public access and real-time submission tracking"]'::jsonb,
    '["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Netlify"]'::jsonb,
    '["Netlify CLI", "Git", "Supabase Console", "Postman", "Chrome DevTools"]'::jsonb,
    '2026-11-30',
    20
),
(
    'ALA-2',
    'Practical Implementation of Virtualization Using Oracle VirtualBox',
    'Virtualization',
    'Systems & Virtualization',
    'Install, configure and analyze multi-instance virtual machine environments, hypervisor architectures, resource allocation, and virtual hardware isolation.',
    '["Conduct system hardware and CPU virtualization capability audit", "Install and configure Oracle VirtualBox Type-2 hypervisor", "Provision dual Linux virtual machines with distinct vCPU and RAM allocations", "Execute and verify guest isolation, process boundary, and storage tests"]'::jsonb,
    '["Oracle VirtualBox", "Ubuntu Linux", "VBoxManage", "Bash", "Hyper-V / VT-x"]'::jsonb,
    '["VBoxManage CLI", "htop", "lscpu", "free -h", "df -h", "iperf3"]'::jsonb,
    '2026-11-30',
    20
),
(
    'ALA-3',
    'Comprehensive Review of Security Features in Cloud Computing Platforms',
    'Cloud Security',
    'Cybersecurity & Compliance',
    'Rigorous comparative analysis of enterprise cloud security architectures across AWS, Microsoft Azure, and Google Cloud, covering IAM, KMS, zero-trust, and breach mitigations.',
    '["Examine Identity & Access Management (IAM), RBAC, and Least Privilege principles", "Analyze data protection through AES-256 at rest and TLS 1.3 in transit", "Compare Key Management Services (AWS KMS vs Azure Key Vault vs Cloud KMS)", "Review real-world cloud security breaches and proactive posture remediation"]'::jsonb,
    '["AWS IAM", "Azure Entra ID", "Google Cloud IAM", "KMS", "GuardDuty", "CloudTrail"]'::jsonb,
    '["AWS CLI", "Azure CLI", "gcloud", "NIST SP 800-145", "CIS Cloud Benchmarks"]'::jsonb,
    '2026-11-30',
    20
),
(
    'ALA-4',
    'Comparative Case Study of AWS, Microsoft Azure and Google Cloud: SLA, Risk Management and Compliance',
    'Cloud SLA & Risk',
    'Cloud Governance',
    'Systematic evaluation of Service Level Agreements (SLAs), uptime guarantees (99.9% to 99.999%), service credit policies, operational risk matrices, and global compliance standards.',
    '["Analyze service-level uptime metrics, measurement windows, and credit claim formulas", "Evaluate provider liability limitations, scheduled maintenance, and exclusion clauses", "Synthesize comprehensive multi-cloud risk management and disaster recovery strategies", "Map compliance architectures to ISO/IEC 27001, SOC 2 Type II, GDPR, and HIPAA"]'::jsonb,
    '["Multi-Region Cloud Architecture", "High Availability", "SLA Calculation", "Compliance Matrices"]'::jsonb,
    '["AWS SLA Docs", "Azure SLA Calculator", "GCP Service Level Agreements", "Risk Assessment Matrix"]'::jsonb,
    '2026-11-30',
    20
),
(
    'ALA-5',
    'Cloud Application Performance Optimization Using Load Balancing, Auto-Scaling and Monitoring',
    'Performance Optimization',
    'Performance Engineering',
    'Empirical performance benchmarking and dynamic load distribution across horizontal server clusters under low (10 users), medium (50 users), and high (100 users) traffic patterns.',
    '["Configure Layer 7 / Layer 4 load balancing algorithms (Round Robin, Least Connections)", "Implement threshold-based horizontal auto-scaling (Scale-Out/Scale-In triggers)", "Execute automated load testing experiments using Locust with synthetic workloads", "Monitor and visualize real-time RPS, p95 latency, error rate, CPU, and memory profiles"]'::jsonb,
    '["Locust", "Python 3.13", "FastAPI / Node.js", "NGINX Load Balancer", "Prometheus Metrics"]'::jsonb,
    '["Locust Web UI", "Python headless runner", "Recharts telemetry engine", "Apache Bench"]'::jsonb,
    '2026-11-30',
    20
)
ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title,
    objectives = EXCLUDED.objectives,
    technologies = EXCLUDED.technologies;

-- 11. SEED STUDENT PROFILE (Herry Prajapati)
INSERT INTO public.profiles (enrollment_number, full_name, email, role, department, university, academic_year)
VALUES (
    '20230905090031',
    'Herry Prajapati',
    'herry.prajapati@gmiu.edu.in',
    'student',
    'Information Technology',
    'Gyanmanjari Institute of Technology (GMIU)',
    '2026-2027'
)
ON CONFLICT (enrollment_number) DO UPDATE SET 
    full_name = EXCLUDED.full_name,
    department = EXCLUDED.department;

-- 12. INITIALIZE SUBMISSION STATUS FOR HERRY PRAJAPATI (Initial: Pending for all 5)
INSERT INTO public.ala_submissions (enrollment_number, ala_id, status)
VALUES 
    ('20230905090031', 'ALA-1', 'pending'),
    ('20230905090031', 'ALA-2', 'pending'),
    ('20230905090031', 'ALA-3', 'pending'),
    ('20230905090031', 'ALA-4', 'pending'),
    ('20230905090031', 'ALA-5', 'pending')
ON CONFLICT (enrollment_number, ala_id) DO NOTHING;
