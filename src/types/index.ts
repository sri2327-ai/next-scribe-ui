
export type AppView = "Patients" | "Schedule" | "Tasks" | "Inbox" | "Reports" | "Settings";

export type ViewMode = "day" | "week" | "month";

export interface Appointment {
  id: string;
  date: string;
  time: string;
  type: string;
  patient?: string;
  title?: string;
  location?: string;
  color?: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  insurance: string;
  clinician: string;
  status: string;
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
