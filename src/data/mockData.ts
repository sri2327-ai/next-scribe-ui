
import { Appointment } from "../types";

export const mockAppointments: Appointment[] = [
  {
    id: 1,
    date: "2025-04-22",
    time: "9:00 AM - 9:30 AM",
    type: "Psychotherapy",
    patient: "Ole Thomas Mosnes",
    provider: "Katherine Thompson",
    location: "Virtual/Video Visit",
    color: "purple-500"
  },
  {
    id: 2,
    date: "2025-04-22",
    time: "12:00 PM - 12:00 PM",
    type: "Blocked",
    title: "OUT OF OFFICE",
    color: "gray-500"
  },
  {
    id: 3,
    date: "2025-04-22",
    time: "12:30 PM - 1:30 PM",
    type: "Reservation",
    title: "Reservation at Botanic",
    color: "green-500"
  },
  {
    id: 4,
    date: "2025-04-23",
    time: "1:00 PM - 1:30 PM",
    type: "Medication Management",
    patient: "Dennis Eugene Chastain",
    provider: "Katherine Thompson",
    location: "Virtual/Video Visit",
    color: "blue-600"
  }
];

export const patients = [
  "Kyle Hunter",
  "Alex Hund",
  "Kyle Michael Johnson",
  "Pamela Britez",
  "Dennis Eugene Chastain",
  "Thelma Davila",
  "Tooba Safeer",
  "Sherry Buggs"
];

export const appointmentTypes = [
  { name: "Initial Evaluation" },
  { name: "Psychotherapy" },
  { name: "Medication Management" }
];

export const providers = [
  "Katherine Thompson", "Devon Smith"
];

export const mockPatientData = [
  {
    name: "Kyle Hunter",
    clinician: "Katherine Thompson",
    status: "Active"
  },
  {
    name: "Alex Hund",
    clinician: "Devon Smith",
    status: "Active"
  },
  {
    name: "Kyle Michael Johnson",
    clinician: "Katherine Thompson",
    status: "Active"
  },
  {
    name: "Pamela Britez",
    clinician: "Devon Smith",
    status: "Active"
  },
  {
    name: "Dennis Eugene Chastain",
    clinician: "Katherine Thompson", 
    status: "Active"
  },
  {
    name: "Thelma Davila",
    clinician: "Devon Smith",
    status: "Inactive"
  },
  {
    name: "Tooba Safeer",
    clinician: "Katherine Thompson",
    status: "Active"
  },
  {
    name: "Sherry Buggs",
    clinician: "Devon Smith",
    status: "Active"
  },
  {
    name: "John Smith",
    clinician: "Katherine Thompson",
    status: "Inactive"
  },
  {
    name: "Emma Johnson",
    clinician: "Devon Smith",
    status: "Active"
  }
];
