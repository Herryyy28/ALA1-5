import { 
  STUDENT_PROFILE, 
  ALA_ACTIVITIES, 
  INITIAL_SUBMISSIONS, 
  INITIAL_ACTIVITY_LOGS 
} from '../data/mockData';
import { REGISTERED_STUDENTS, RegisteredStudent } from '../data/studentsData';
import { 
  AlaSubmission, 
  StudentProfile, 
  ActivityLog, 
  SubmissionFile, 
  UserRole 
} from '../types';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const STORAGE_KEYS = {
  PROFILE: 'gmiu_ala_profile',
  SUBMISSIONS: 'gmiu_ala_submissions',
  LOGS: 'gmiu_ala_logs',
  ROLE: 'gmiu_current_role'
};

class DataService {
  private profile: StudentProfile;
  private submissions: AlaSubmission[];
  private logs: ActivityLog[];
  private currentRole: UserRole;
  private listeners: Set<() => void> = new Set();

  constructor() {
    // Load Profile
    const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
    this.profile = savedProfile ? JSON.parse(savedProfile) : STUDENT_PROFILE;

    // Load Submissions (Default is ALL 5 PENDING)
    const savedSubmissions = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    this.submissions = savedSubmissions ? JSON.parse(savedSubmissions) : INITIAL_SUBMISSIONS;

    // Load Logs
    const savedLogs = localStorage.getItem(STORAGE_KEYS.LOGS);
    this.logs = savedLogs ? JSON.parse(savedLogs) : INITIAL_ACTIVITY_LOGS;

    // Load Role
    const savedRole = localStorage.getItem(STORAGE_KEYS.ROLE) as UserRole | null;
    this.currentRole = savedRole || 'student';

    // Synchronize if Supabase is active
    if (isSupabaseConfigured) {
      this.syncFromSupabase();
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  private persist() {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(this.profile));
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(this.submissions));
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(this.logs));
    localStorage.setItem(STORAGE_KEYS.ROLE, this.currentRole);
    this.notify();
  }

  private async syncFromSupabase() {
    if (!supabase) return;
    try {
      const { data: remoteSubs, error } = await supabase
        .from('ala_submissions')
        .select('*')
        .eq('enrollment_number', this.profile.enrollment_number);

      if (!error && remoteSubs && remoteSubs.length > 0) {
        this.submissions = this.submissions.map(localSub => {
          const match = remoteSubs.find(r => r.ala_id === localSub.ala_id);
          return match ? { ...localSub, ...match } : localSub;
        });
        this.persist();
      }
    } catch (err) {
      console.warn('Supabase sync skipped, continuing with local store:', err);
    }
  }

  // Profile operations
  public getProfile(): StudentProfile {
    return { ...this.profile };
  }

  public updateProfile(updated: Partial<StudentProfile>) {
    this.profile = { ...this.profile, ...updated };
    this.addLog('Profile Updated', 'Student contact details and preferences modified.', 'info');
    this.persist();
  }

  // Role operations
  public getRole(): UserRole {
    return this.currentRole;
  }

  public setRole(role: UserRole) {
    this.currentRole = role;
    this.addLog('Role Switched', `Switched active viewpoint to ${role.toUpperCase()}.`, 'info');
    this.persist();
  }

  // Activities
  public getActivities() {
    return ALA_ACTIVITIES;
  }

  public getActivity(id: string) {
    return ALA_ACTIVITIES.find(a => a.id.toLowerCase() === id.toLowerCase());
  }

  // Submissions
  public getSubmissions(): AlaSubmission[] {
    return [...this.submissions];
  }

  public getSubmission(alaId: string): AlaSubmission | undefined {
    return this.submissions.find(s => s.ala_id.toLowerCase() === alaId.toLowerCase());
  }

  public submitAla(alaId: string, notes?: string, files?: SubmissionFile[]) {
    const existing = this.submissions.find(s => s.ala_id.toLowerCase() === alaId.toLowerCase());
    const now = new Date().toISOString();

    if (existing) {
      existing.status = 'submitted';
      existing.submission_date = now;
      existing.updated_at = now;
      if (notes) existing.notes = notes;
      if (files && files.length > 0) {
        existing.evidence_files = [...(existing.evidence_files || []), ...files];
      }
    } else {
      this.submissions.push({
        id: `sub-${alaId.toLowerCase()}-${Date.now()}`,
        enrollment_number: this.profile.enrollment_number,
        ala_id: alaId,
        status: 'submitted',
        submission_date: now,
        notes,
        evidence_files: files || [],
        updated_at: now
      });
    }

    this.addLog(
      `Submitted ${alaId}`,
      `Practical report & evidence bundle submitted for ${alaId}.`,
      'success'
    );
    this.persist();

    // Async write to Supabase if configured
    if (supabase) {
      supabase.from('ala_submissions').upsert({
        enrollment_number: this.profile.enrollment_number,
        ala_id: alaId,
        status: 'submitted',
        submission_date: now,
        notes: notes || null,
        updated_at: now
      }).then();
    }
  }

  public verifySubmission(alaId: string, score: number, feedback: string) {
    const sub = this.submissions.find(s => s.ala_id.toLowerCase() === alaId.toLowerCase());
    if (sub) {
      sub.status = 'verified';
      sub.score = score;
      sub.feedback = feedback;
      sub.updated_at = new Date().toISOString();
      this.addLog(
        `Verified ${alaId}`,
        `Faculty verified and scored submission: ${score}/20 marks.`,
        'success'
      );
      this.persist();
    }
  }

  public resetSubmissions() {
    this.submissions = INITIAL_SUBMISSIONS.map(s => ({ ...s, status: 'pending', evidence_files: [] }));
    this.addLog('Workspace Reset', 'Reset all ALA submission statuses to Pending.', 'warning');
    this.persist();
  }

  // Progress metrics calculation
  public getProgressStats() {
    const total = this.submissions.length;
    const completed = this.submissions.filter(s => s.status === 'submitted' || s.status === 'verified').length;
    const verified = this.submissions.filter(s => s.status === 'verified').length;
    const inProgress = this.submissions.filter(s => s.status === 'in_progress').length;
    const pending = this.submissions.filter(s => s.status === 'pending').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      verified,
      inProgress,
      pending,
      percentage
    };
  }

  // Logs
  public getLogs(): ActivityLog[] {
    return [...this.logs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  public addLog(action: string, details: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') {
    const log: ActivityLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      enrollment_number: this.profile.enrollment_number,
      action,
      details,
      timestamp: new Date().toISOString(),
      type
    };
    this.logs.unshift(log);
    if (this.logs.length > 50) this.logs.pop();
  }

  // University Student Directory Search
  public searchStudents(query: string): RegisteredStudent[] {
    const clean = query.trim().toLowerCase();
    if (!clean) return REGISTERED_STUDENTS.slice(0, 20);
    return REGISTERED_STUDENTS.filter(s => 
      s.id.toLowerCase().includes(clean) || 
      s.name.toLowerCase().includes(clean)
    );
  }

  public getStudentByEnrollment(enrollment: string): RegisteredStudent | undefined {
    return REGISTERED_STUDENTS.find(s => s.id === enrollment.replace(/\D/g, ''));
  }
}

export const dataService = new DataService();
