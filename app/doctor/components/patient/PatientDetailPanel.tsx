"use client";

import React, { useState } from "react";
import { MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import PatientTabs from "./PatientTabs";
import PatientDemographicsCard from "./PatientDemographicsCard";
import PatientNotesTranscript from "./PatientNotesTranscript";
import PatientMessagesChat from "./PatientMessagesChat";
import PatientTimeline from "./PatientTimeline";
import PatientProfile from "./PatientProfile";
import PatientDocuments from "./PatientDocuments";
import PatientSettings from "./PatientSettings";
import MedicalHistory from "@/app/doctor/components/MedicalHistory";
import SocialHistory from "@/app/doctor/components/SocialHistory";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

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
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState(patient.email || "");
  const [inviteSent, setInviteSent] = useState(false);
  const [generatedInviteCode, setGeneratedInviteCode] = useState("");

  const handleAskAI = () => {
    setIsAIChatOpen(true);
  };
  
  const handleInvitePatient = () => {
    setIsInviteDialogOpen(true);
    // Generate a random invite code
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setGeneratedInviteCode(code);
  };
  
  const handleSendInvite = () => {
    // In a real app, this would connect to your backend to send the invite
    if (inviteEmail) {
      toast.success(`Invite sent to ${inviteEmail}`);
      setInviteSent(true);
    } else {
      toast.error("Please enter a valid email address");
    }
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
          <div className="absolute bottom-6 right-6 flex flex-col space-y-2 z-10">
            <Button
              onClick={handleInvitePatient}
              className="rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-shadow bg-green-500 hover:bg-green-600"
              size="icon"
              title="Invite to Patient Portal"
            >
              <Mail className="h-6 w-6" />
            </Button>
            <Button
              onClick={handleAskAI}
              className="rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-shadow"
              size="icon"
              title="Ask AI"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </div>
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
      
      {/* Patient Portal Invite Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite {patient.name} to Patient Portal</DialogTitle>
          </DialogHeader>
          
          {!inviteSent ? (
            <div className="py-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="patient@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="inviteCode" className="block text-sm font-medium mb-1">
                    Invitation Code
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="inviteCode"
                      value={generatedInviteCode}
                      readOnly
                      className="flex-1 border rounded-l-md px-3 py-2 bg-gray-50"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-l-none"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedInviteCode);
                        toast.success("Invitation code copied to clipboard");
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Share this code with the patient to use during sign-up
                  </p>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-md text-sm">
                  An email will be sent to the patient with instructions on how to create their account.
                </div>
              </div>
              
              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendInvite}>Send Invitation</Button>
              </DialogFooter>
            </div>
          ) : (
            <div className="py-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Invitation Sent!</h3>
              <p className="mt-2 text-sm text-gray-500">
                An invitation has been sent to {inviteEmail}
              </p>
              <div className="mt-6">
                <Button onClick={() => setIsInviteDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientDetailPanel;
