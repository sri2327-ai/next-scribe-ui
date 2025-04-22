
export type AppView = "Patients" | "Schedule" | "Reports" | "Billing" | "e-Prescribe";
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
