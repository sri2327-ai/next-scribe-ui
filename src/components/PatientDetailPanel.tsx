
import React, { useState } from "react";
import { MessageCircle, Mail } from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

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
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswering, setAiAnswering] = useState(false);

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
      setAiAnswering(true);
      setTimeout(() => {
        toast.success(`Invite sent to ${inviteEmail}`);
        setInviteSent(true);
        setAiAnswering(false);
      }, 800);
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  const handleSubmitAiQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    
    setAiAnswering(true);
    // Simulate AI processing
    setTimeout(() => {
      toast.success("AI response generated");
      setAiAnswering(false);
      setAiQuestion("");
    }, 1500);
  };

  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className="flex flex-1 h-full overflow-hidden">
        <PatientDemographicsCard
          patient={patient}
          collapsed={demographicsCollapsed}
          onToggle={() => setDemographicsCollapsed((c) => !c)}
        />
        <div className="flex-1 flex flex-col overflow-hidden bg-card relative">
          <div className="absolute bottom-8 right-8 flex flex-col space-y-3 z-10">
            <Button
              onClick={handleInvitePatient}
              className="rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-shadow bg-green-500 hover:bg-green-600 text-white"
              size="icon"
              title="Invite to Patient Portal"
            >
              <Mail className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleAskAI}
              className="rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-shadow bg-primary"
              size="icon"
              title="Ask AI"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="border-b relative px-4 pt-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">{patient.name}</h2>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:border-blue-900 dark:text-blue-300">
                    {patient.gender}
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:border-purple-900 dark:text-purple-300">
                    {patient.status}
                  </Badge>
                </div>
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-6 w-full">
                  {panelTabs.map((tab) => (
                    <TabsTrigger 
                      key={tab} 
                      value={tab}
                      className="data-[state=active]:bg-background data-[state=active]:shadow-none"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-background">
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
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Ask AI about {patient.name}
            </DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <div className="space-y-4">
              <div className="p-4 bg-accent rounded-lg text-sm">
                What would you like to know about this patient?
              </div>
              <form onSubmit={handleSubmitAiQuestion} className="flex space-x-2">
                <Input 
                  type="text" 
                  className="flex-1" 
                  placeholder="Ask a question..." 
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  disabled={aiAnswering}
                />
                <Button type="submit" disabled={aiAnswering || !aiQuestion.trim()}>
                  {aiAnswering ? "Processing..." : "Ask"}
                </Button>
              </form>
              {aiAnswering && (
                <div className="text-center text-sm text-muted-foreground animate-pulse mt-4">
                  AI is analyzing patient data...
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Patient Portal Invite Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Invite {patient.name} to Patient Portal
            </DialogTitle>
          </DialogHeader>
          
          {!inviteSent ? (
            <div className="py-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-label">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    id="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full"
                    placeholder="patient@example.com"
                    disabled={aiAnswering}
                  />
                </div>
                
                <div>
                  <label htmlFor="inviteCode" className="block text-sm font-medium mb-1 text-label">
                    Invitation Code
                  </label>
                  <div className="flex">
                    <Input
                      type="text"
                      id="inviteCode"
                      value={generatedInviteCode}
                      readOnly
                      className="flex-1 rounded-r-none bg-muted/30"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      className="rounded-l-none"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedInviteCode);
                        toast.success("Invitation code copied to clipboard");
                      }}
                      disabled={aiAnswering}
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Share this code with the patient to use during sign-up
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300 p-4 rounded-md text-sm">
                  An email will be sent to the patient with instructions on how to create their account.
                </div>
              </div>
              
              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)} disabled={aiAnswering}>
                  Cancel
                </Button>
                <Button onClick={handleSendInvite} disabled={aiAnswering}>
                  {aiAnswering ? "Sending..." : "Send Invitation"}
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <div className="py-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                <svg className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium">Invitation Sent!</h3>
              <p className="mt-2 text-sm text-muted-foreground">
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
