import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  phone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const profilePersonalSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
});

export const educationSchema = z.object({
  institution: z.string().min(2, 'Institution name is required'),
  degree: z.string().min(2, 'Degree is required'),
  field: z.string().min(2, 'Field of study is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  cgpa: z.number().min(0).max(10).optional(),
  percentage: z.number().min(0).max(100).optional(),
  current: z.boolean().optional(),
});

export const experienceSchema = z.object({
  company: z.string().min(2, 'Company name is required'),
  position: z.string().min(2, 'Position is required'),
  description: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  location: z.string().optional(),
});

export const preferencesSchema = z.object({
  preferredLocations: z.array(z.string()).optional(),
  preferredDomains: z.array(z.string()).optional(),
  workMode: z.array(z.enum(['remote', 'onsite', 'hybrid'])).optional(),
  expectedStipend: z.number().min(0).optional(),
  availability: z.string().optional(),
});

export const jobFilterSchema = z.object({
  search: z.string().optional(),
  location: z.array(z.string()).optional(),
  workMode: z.array(z.string()).optional(),
  domain: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  isPMScheme: z.boolean().optional(),
  minStipend: z.number().optional(),
  maxStipend: z.number().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});
