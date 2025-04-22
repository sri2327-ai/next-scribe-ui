import React, { useState } from "react";
import PatientTabs from "./PatientTabs";
import { ChevronLeft } from "lucide-react";
import PatientDemographicsCard from "./PatientDemographicsCard";

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
  const [demographicsCollapsed, setDemographicsCollapsed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden">
      <div className="flex items-center px-6 py-4 border-b">
        <button className="mr-4 text-gray-500 hover:text-blue-600" onClick={onClose}>
          <ChevronLeft size={28} />
        </button>
        <h2 className="text-2xl font-semibold">{patient.name}</h2>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <PatientDemographicsCard
          patient={patient}
          collapsed={demographicsCollapsed}
          onToggle={() => setDemographicsCollapsed((c) => !c)}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="border-b">
            <PatientTabs tabs={panelTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="p-6 overflow-y-auto flex-1">
            <div className="text-sm text-gray-500">Content: {activeTab}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailPanel;
