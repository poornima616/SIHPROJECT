export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: 'student' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;

  education: Education[];
  experience: Experience[];
  skills: string[];

  resumeUrl?: string;
  resumeParsedData?: ParsedResumeData;

  preferences?: JobPreferences;
  completeness: number;

  createdAt: string;
  updatedAt: string;
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  cgpa?: number;
  percentage?: number;
  current?: boolean;
}

export interface Experience {
  id?: string;
  company: string;
  position: string;
  description?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  location?: string;
}

export interface JobPreferences {
  preferredLocations?: string[];
  preferredDomains?: string[];
  workMode?: ('remote' | 'onsite' | 'hybrid')[];
  expectedStipend?: number;
  availability?: string;
}

export interface ParsedResumeData {
  name?: string;
  email?: string;
  phone?: string;
  skills?: string[];
  education?: Education[];
  experience?: Experience[];
  summary?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  workMode: 'remote' | 'onsite' | 'hybrid';
  domain: string;
  requiredSkills: string[];
  preferredSkills?: string[];
  stipend?: number;
  duration?: string;
  startDate?: string;
  applicationDeadline?: string;

  openings?: number;
  applicants?: number;

  isPMScheme?: boolean;
  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface Recommendation {
  id: string;
  jobId: string;
  userId: string;
  job: Job;

  matchScore: number;
  skillMatch: SkillMatchDetail;
  locationMatch: boolean;
  domainMatch: boolean;
  workModeMatch: boolean;

  analysis: string;
  strengths: string[];
  gaps: string[];
  suggestions: string[];

  createdAt: string;
}

export interface SkillMatchDetail {
  matchedSkills: string[];
  missingSkills: string[];
  matchPercentage: number;
}

export interface Application {
  id: string;
  userId: string;
  jobId: string;
  job?: Job;

  status: 'pending' | 'under_review' | 'shortlisted' | 'rejected' | 'accepted';
  coverLetter?: string;

  appliedAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  profileCompleteness: number;
  totalApplications: number;
  recommendationsCount: number;
  pendingApplications: number;
  shortlistedApplications: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface JobFilters {
  search?: string;
  location?: string[];
  workMode?: string[];
  domain?: string[];
  skills?: string[];
  isPMScheme?: boolean;
  minStipend?: number;
  maxStipend?: number;
  page?: number;
  limit?: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface ResumeUploadResponse {
  url: string;
  parsedData?: ParsedResumeData;
  message: string;
}
