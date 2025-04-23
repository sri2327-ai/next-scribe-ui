
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
import { Dialog, DialogContent } from "./ui/dialog";

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
  "Settings"
];

const PatientDetailPanel: React.FC<PatientDetailPanelProps> = ({ patient, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>(panelTabs[0]);
  const [demographicsCollapsed, setDemographicsCollapsed] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  const handleAskAI = () => {
    setIsAIChatOpen(true);
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
                <div className="space-y-6">
                  <PatientProfile patient={patient} />
                  <MedicalHistory />
                  <SocialHistory />
                </div>
              ) : activeTab === "Documents" ? (
                <PatientDocuments patient={patient} />
              ) : activeTab === "Settings" ? (
                <PatientSettings patient={patient} />
              ) : (
                <div className="text-sm text-gray-500">Content: {activeTab}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Dialog */}
      <Dialog open={isAIChatOpen} onOpenChange={setIsAIChatOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="p-4">
            <h3 className="text-lg font-medium mb-4">Ask AI about {patient.name}</h3>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                What would you like to know about this patient?
              </div>
              <div className="flex">
                <input 
                  type="text" 
                  className="flex-1 border rounded-l-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Ask a question..." 
                />
                <Button className="rounded-l-none">Ask</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientDetailPanel;
