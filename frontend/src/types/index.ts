export type UserRole = 'student' | 'faculty' | 'admin';

export type SubmissionStatus = 'pending' | 'in_progress' | 'submitted' | 'verified';

export interface StudentProfile {
  id: string;
  enrollment_number: string;
  full_name: string;
  email: string;
  role: UserRole;
  department: string;
  university: string;
  academic_year: string;
  avatar_url?: string;
  phone?: string;
}

export interface AlaActivity {
  id: string; // 'ALA-1' through 'ALA-5'
  number: number;
  title: string;
  short_title: string;
  category: string;
  description: string;
  objectives: string[];
  technologies: string[];
  practical_tools: string[];
  deadline: string;
  weightage: number;
  theory_summary: string;
  architecture_diagram?: string;
  implementation_steps: {
    step: number;
    title: string;
    description: string;
    command?: string;
    expected_output?: string;
  }[];
  deliverables: string[];
}

export interface AlaSubmission {
  id: string;
  enrollment_number: string;
  ala_id: string;
  status: SubmissionStatus;
  submission_date?: string;
  score?: number;
  feedback?: string;
  report_url?: string;
  evidence_files: SubmissionFile[];
  notes?: string;
  updated_at: string;
}

export interface SubmissionFile {
  id: string;
  name: string;
  size: number;
  type: 'report' | 'evidence' | 'code' | 'screenshot' | 'config';
  url: string;
  uploaded_at: string;
}

export interface ActivityLog {
  id: string;
  enrollment_number: string;
  action: string;
  details: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface BenchmarkResult {
  concurrency: number;
  users: number;
  spawn_rate: number;
  duration_sec: number;
  total_requests: number;
  failed_requests: number;
  error_rate: number;
  rps: number;
  avg_latency_ms: number;
  min_latency_ms: number;
  max_latency_ms: number;
  p50_latency_ms: number;
  p90_latency_ms: number;
  p95_latency_ms: number;
  p99_latency_ms: number;
  cpu_percent: number;
  memory_mb: number;
}
