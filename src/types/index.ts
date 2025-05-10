
// User related types
export type UserRole = "admin" | "doctor" | "patient";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active?: boolean;
}

export interface Patient extends User {
  role: "patient";
  age: number;
  gender: "male" | "female" | "other";
  address: string;
  medicalHistory: MedicalRecord[];
  assignedDoctorId?: string;
  prescriptions: Prescription[];
}

export interface Doctor extends User {
  role: "doctor";
  specialization: string;
  patients: string[]; // Array of patient IDs
  appointments: string[]; // Array of appointment IDs
}

export interface Admin extends User {
  role: "admin";
}

// Medical related types
export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  diagnosis: string;
  notes: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  medications: Medication[];
  instructions: string;
  isViewed: boolean;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
}

// Form related types
export interface LoginFormData {
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  age?: number;
  gender?: "male" | "female" | "other";
  address?: string;
  specialization?: string;
}
