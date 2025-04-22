
// Type definitions for the application

export interface Appointment {
  id: number;
  date: string;
  time: string;
  type: string;
  patient?: string;
  provider?: string;
  location?: string;
  title?: string;
  color: string;
}

export interface AppointmentFormData {
  patient: string;
  appointmentType: string;
  eventTitle: string;
  provider: string;
  date: string;
  startTime: string;
  endTime: string;
  isVirtual: boolean;
}

export interface PatientFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  phone: string;
  consent: boolean;
  sendIntake: boolean;
  invitePortal: boolean;
  careTeam: string[];
}

export interface AppointmentType {
  name: string;
}

export interface Patient {
  name: string;
  clinician: string;
  status: string;
  tags: string[];
}

export type ViewMode = 'day' | 'week' | 'month';
export type AppView = 'Patients' | 'Schedule' | 'Reports' | 'Billing' | 'e-Prescribe';
