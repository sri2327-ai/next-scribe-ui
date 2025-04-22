
import { Appointment, Patient } from '../types';

// Mock appointment data
export const mockAppointments: Appointment[] = [
  { 
    id: 1, 
    date: '2025-04-22', 
    time: '9:00 AM - 9:30 AM', 
    type: 'Psychotherapy', 
    patient: 'Ole Thomas Mosnes',
    provider: 'Katherine Thompson', 
    location: 'Virtual/Video Visit', 
    color: 'purple-500'
  },
  { 
    id: 2, 
    date: '2025-04-22', 
    time: '12:00 PM - 12:00 PM', 
    type: 'Blocked', 
    title: 'OUT OF OFFICE', 
    color: 'gray-500'
  },
  { 
    id: 3, 
    date: '2025-04-22', 
    time: '12:30 PM - 1:30 PM', 
    type: 'Reservation', 
    title: 'Reservation at Botanic', 
    color: 'green-500'
  },
  { 
    id: 4, 
    date: '2025-04-23', 
    time: '1:00 PM - 1:30 PM', 
    type: 'Medication Management', 
    patient: 'Dennis Eugene Chastain',
    provider: 'Katherine Thompson', 
    location: 'Virtual/Video Visit', 
    color: 'blue-600'
  }
];

// Mock patient list
export const patients: string[] = [
  'Kyle Hunter', 
  'Alex Hund', 
  'Kyle Michael Johnson', 
  'Pamela Britez', 
  'Dennis Eugene Chastain', 
  'Thelma Davila', 
  'Tooba Safeer', 
  'Sherry Buggs'
];

// Mock patient data for patients view
export const mockPatientData: Patient[] = [
  { 
    name: "Kelly L. Aceves", 
    clinician: "Katherine Thompson",
    status: "New Patient X",
    tags: []
  },
  { 
    name: "Gonzalo Adolfo Agudelo", 
    clinician: "Katherine Thompson",
    status: "Follow-up Patient X",
    tags: []
  },
];

// Mock appointment types
export const appointmentTypes = [
  { name: 'Initial Evaluation' },
  { name: 'Psychotherapy' },
  { name: 'Medication Management' }
];

// Mock staff/providers
export const providers = ['Katherine Thompson', 'Devon Smith'];
