
import React, { useState } from "react";
import PatientTabs from "./PatientTabs";
import { ChevronLeft } from "lucide-react";

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
}

interface PatientDetailPanelProps {
  patient: PatientType;
  onClose: () => void;
}

const panelTabs = [
  "Notes / Transcript",
  "Timeline",
  "Profile",
  "Documents",
  "Messages",
  "Settings"
];

const PatientDetailPanel: React.FC<PatientDetailPanelProps> = ({ patient, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>(panelTabs[0]);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden">
      <div className="flex items-center px-6 py-4 border-b">
        <button className="mr-4 text-gray-500 hover:text-blue-600" onClick={onClose}>
          <ChevronLeft size={28} />
        </button>
        <h2 className="text-2xl font-semibold">{patient.name}</h2>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Patient demographic card */}
        <div className="w-1/4 border-r bg-gray-50 p-6 overflow-y-auto">
          <div className="flex flex-col gap-3">
            <div>
              <div className="text-lg text-gray-800 font-semibold">{patient.name}</div>
              <div className="text-sm text-gray-500">{patient.age} • DOB {patient.dob}</div>
              <div className="text-xs text-blue-600 mt-1 cursor-pointer">Add pronouns • {patient.gender}</div>
              <div className="py-1">
                <span className="bg-blue-100 px-2 py-1 rounded-full text-xs text-blue-700">{patient.status}</span>
              </div>
              {patient.tags.length > 0 && (
                <div className="mt-2 text-xs text-blue-700 underline cursor-pointer">{patient.tags.join(", ")}</div>
              )}
              <div className="mt-2 text-xs text-yellow-800">{"$"}{patient.copay} Copay</div>
              <div className="mt-2 text-xs">Flags ({patient.flags})</div>
            </div>
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
                  <span className="">{appt.date} • {appt.time}</span>
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
        </div>
        {/* Right: Tabs area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="border-b">
            <PatientTabs tabs={panelTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="p-6 overflow-y-auto flex-1">
            {/* Panel content based on tab */}
            <div className="text-sm text-gray-500">Content: {activeTab}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailPanel;
