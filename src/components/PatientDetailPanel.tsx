import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import PatientTabs from "./PatientTabs";
import PatientDemographicsCard from "./PatientDemographicsCard";
import PatientNotesTranscript from "./PatientNotesTranscript";
import PatientMessagesChat from "./PatientMessagesChat";
import PatientTimeline from "./PatientTimeline";
import PatientProfile from "./PatientProfile";
import PatientDocuments from "./PatientDocuments";
import PatientSettings from "./PatientSettings";
import MedicalHistory from "./MedicalHistory";
import SocialHistory from "./SocialHistory";
import { toast } from "sonner";

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
  "Summary",
  "Documents",
  "Messages",
  "Medical History",
  "Social History",
  "Settings"
];

const PatientDetailPanel: React.FC<PatientDetailPanelProps> = ({ patient, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>(panelTabs[0]);
  const [demographicsCollapsed, setDemographicsCollapsed] = useState(false);

  const handleAskAI = () => {
    toast.info("AI Assistant coming soon");
  };

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-1 h-full overflow-hidden">
        <PatientDemographicsCard
          patient={patient}
          collapsed={demographicsCollapsed}
          onToggle={() => setDemographicsCollapsed((c) => !c)}
        />
        <div className="flex-1 flex flex-col overflow-hidden bg-white relative">
          <Button
            onClick={handleAskAI}
            className="absolute bottom-6 right-6 rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-shadow"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="border-b">
              <PatientTabs tabs={panelTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {activeTab === "Notes / Transcript" ? (
                <PatientNotesTranscript patient={patient} />
              ) : activeTab === "Messages" ? (
                <PatientMessagesChat patient={patient} />
              ) : activeTab === "Timeline" ? (
                <PatientTimeline patient={patient} />
              ) : activeTab === "Summary" ? (
                <PatientProfile patient={patient} />
              ) : activeTab === "Documents" ? (
                <PatientDocuments patient={patient} />
              ) : activeTab === "Medical History" ? (
                <MedicalHistory />
              ) : activeTab === "Social History" ? (
                <SocialHistory />
              ) : activeTab === "Settings" ? (
                <PatientSettings patient={patient} />
              ) : (
                <div className="text-sm text-gray-500">Content: {activeTab}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailPanel;
