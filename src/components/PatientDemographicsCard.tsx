
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface AppointmentType {
  label: string;
  date: string;
  time: string;
  location: string;
  clinician: string;
}
interface PatientType {
  name: string;
  age: string;
  dob: string;
  pronouns: string;
  gender: string;
  status: string;
  tags: string[];
  copay: number;
  flags: number;
  clinician: string;
  appointments: AppointmentType[];
  lastAppointment: string | null;
  phone: string;
  email: string;
  profileImageUrl?: string; // For possible future extension
}

interface PatientDemographicsCardProps {
  patient: PatientType;
  collapsed: boolean;
  onToggle: () => void;
}

const getInitials = (name: string) => {
  const names = name.split(" ");
  if (names.length > 1) return names[0][0] + names[names.length - 1][0];
  return name[0];
};

/**
 * PatientDemographicsCard
 * Shows patient profile/demographics on the left, collapsible panel.
 */
const PatientDemographicsCard: React.FC<PatientDemographicsCardProps> = ({
  patient,
  collapsed,
  onToggle
}) => {
  // Placeholder profile image
  const placeholderPhoto = "/lovable-uploads/photo-1618160702438-9b02ab6515c9";
  // Could later use patient.profileImageUrl if available
  return (
    <div className={`relative transition-all duration-300 bg-gray-50 border-r overflow-y-auto h-full ${collapsed ? "w-16 px-2" : "w-72 md:w-1/4 p-6"}`}>
      <button
        aria-label="Collapse demographics card"
        onClick={onToggle}
        className="absolute -right-4 top-4 z-10 bg-white border rounded-full shadow transition hover:bg-gray-50"
        style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
      {collapsed ? (
        <div className="flex flex-col items-center pt-8">
          {/* Avatar collapsed view */}
          <Avatar className="mb-2 h-10 w-10">
            <AvatarImage src={placeholderPhoto} />
            <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-500 mt-3" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>{patient.name.split(" ")[0]}</span>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={placeholderPhoto} />
              <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-lg text-gray-800 font-semibold">{patient.name}</span>
              <span className="text-sm text-gray-500">{patient.age} • DOB {patient.dob}</span>
            </div>
          </div>
          <div className="text-xs text-blue-600 mt-1 cursor-pointer">Add pronouns • {patient.gender}</div>
          <div className="py-1">
            <span className="bg-blue-100 px-2 py-1 rounded-full text-xs text-blue-700">{patient.status}</span>
          </div>
          {patient.tags.length > 0 && (
            <div className="mt-2 text-xs text-blue-700 underline cursor-pointer">{patient.tags.join(", ")}</div>
          )}
          <div className="mt-2 text-xs text-yellow-800">{"$"}{patient.copay} Copay</div>
          <div className="mt-2 text-xs">Flags ({patient.flags})</div>
          <div className="border-b my-2" />
          <div>
            <div className="font-semibold mb-1">Contact</div>
            <div className="text-xs text-gray-600">Phone <span className="font-mono">{patient.phone}</span> (mobile)</div>
            <div className="text-xs text-gray-600">Email <a href={`mailto:${patient.email}`} className="underline">{patient.email}</a></div>
          </div>
          <div className="border-b my-2" />
          <div>
            <div className="font-semibold mb-1">Appointments</div>
            {patient.appointments.map((appt, idx) =>
              <div key={idx} className="text-xs text-gray-700 flex flex-col mb-2">
                <span className="font-semibold">{appt.label}</span>
                <span>{appt.date} • {appt.time}</span>
                <span className="text-[11px] text-gray-400">{appt.clinician} • {appt.location}</span>
              </div>
            )}
            <span className="font-semibold">Last</span>
            <span className="text-xs">{patient.lastAppointment || "--"}</span>
          </div>
          <div className="border-b my-2" />
          <div>
            <div className="font-semibold mb-1">Demographics</div>
            {/* more details can go here */}
            <div className="text-xs text-gray-400">Demographics data...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDemographicsCard;

