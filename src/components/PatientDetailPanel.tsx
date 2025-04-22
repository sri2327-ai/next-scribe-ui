
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
    <div className="flex h-full w-full">
      <div className="flex flex-1 h-full overflow-hidden">
        <PatientDemographicsCard
          patient={patient}
          collapsed={demographicsCollapsed}
          onToggle={() => setDemographicsCollapsed((c) => !c)}
        />
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          <div className="flex items-center px-6 py-4 border-b bg-white">
            <button className="mr-4 text-gray-500 hover:text-blue-600" onClick={onClose}>
              <ChevronLeft size={28} />
            </button>
            <div className="flex items-center">
              <img
                src="/lovable-uploads/53ad6fba-0f2a-42f5-9bb4-e0a5e45188d5.png"
                alt="profile"
                className="w-10 h-10 rounded-full object-cover bg-gray-200 mr-3"
              />
              <h2 className="text-2xl font-semibold">{patient.name}</h2>
            </div>
          </div>
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
    </div>
  );
};

export default PatientDetailPanel;
