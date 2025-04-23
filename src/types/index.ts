export type AppView = "Schedule" | "Patients" | "Reports" | "Billing" | "e-Prescribe" | "Tasks" | "Inbox";
export type ViewMode = "day" | "week" | "month";

export interface Appointment {
  id: number;
  date: string;
  time: string;
  patient?: string;
  provider?: string;
  location?: string;
  title?: string;
  type?: string;
  color?: string;
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
