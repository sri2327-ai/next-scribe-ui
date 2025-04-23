
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface FormSubmission {
  id: string;
  patientName: string;
  formType: string;
  submittedDate: string;
  status: 'completed' | 'pending' | 'new';
}

interface FormTemplate {
  id: string;
  name: string;
  type: string;
}

const InboxPanel = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeTab, setActiveTab] = useState("received");
  
  // Mock data for form submissions
  const [formSubmissions, setFormSubmissions] = useState<FormSubmission[]>([
    {
      id: '1',
      patientName: 'John Doe',
      formType: 'Patient Intake Form',
      submittedDate: '2025-04-20',
      status: 'new'
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      formType: 'Feedback Survey',
      submittedDate: '2025-04-19',
      status: 'completed'
    },
    {
      id: '3',
      patientName: 'Mike Johnson',
      formType: 'Medical History',
      submittedDate: '2025-04-18',
      status: 'pending'
    }
  ]);
  
  // Mock data for form templates
  const formTemplates: FormTemplate[] = [
    { id: '1', name: 'Patient Intake Form', type: 'intake' },
    { id: '2', name: 'Feedback Survey', type: 'feedback' },
    { id: '3', name: 'Medical History', type: 'medical' },
    { id: '4', name: 'Insurance Information', type: 'insurance' },
    { id: '5', name: 'Consent Form', type: 'consent' }
  ];
  
  const [newForm, setNewForm] = useState({
    formType: '',
    patient: ''
  });

  const handleCreateForm = (event: React.FormEvent) => {
    event.preventDefault();
    
    // In a real app, this would save to the backend
    toast.success("Form created and sent to patient");
    setShowCreateForm(false);
    
    // Reset form values
    setNewForm({
      formType: '',
      patient: ''
    });
  };
  
  const updateFormStatus = (formId: string, status: 'completed' | 'pending' | 'new') => {
    const updatedForms = formSubmissions.map(form => 
      form.id === formId ? { ...form, status } : form
    );
    setFormSubmissions(updatedForms);
    toast.success(`Form marked as ${status}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Forms Inbox</h2>
        <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
          <Plus className="w-5 h-5" /> Create Form
        </Button>
      </div>

      <Tabs defaultValue="received" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="received">Received Forms</TabsTrigger>
          <TabsTrigger value="sent">Sent Forms</TabsTrigger>
          <TabsTrigger value="templates">Form Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="received" className="pt-4">
          {formSubmissions.length > 0 ? (
            <div className="space-y-4">
              {formSubmissions.map((form) => (
                <div key={form.id} className="border rounded-lg p-4 bg-white shadow-sm flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <h3 className="font-medium">{form.formType}</h3>
                      <Badge 
                        className={`ml-2 ${
                          form.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          form.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {form.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span>From: {form.patientName}</span>
                      <span className="mx-2">•</span>
                      <span>Received: {new Date(form.submittedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateFormStatus(form.id, 'completed')}
                    >
                      Mark Complete
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast.success("Form opened for review");
                      }}
                    >
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-8">No form submissions yet</div>
          )}
        </TabsContent>
        
        <TabsContent value="sent" className="pt-4">
          <div className="text-center text-gray-500 mt-8">No sent forms yet</div>
        </TabsContent>
        
        <TabsContent value="templates" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formTemplates.map(template => (
              <div key={template.id} className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">{template.name}</h3>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowCreateForm(true);
                      setNewForm({...newForm, formType: template.id});
                    }}
                  >
                    Send to Patient
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      toast.success("Template opened for editing");
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleCreateForm} className="space-y-4">
            <div>
              <Label htmlFor="formType">Form Type</Label>
              <Select
                value={newForm.formType}
                onValueChange={(value) => setNewForm({...newForm, formType: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select form type" />
                </SelectTrigger>
                <SelectContent>
                  {formTemplates.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="patient">Send to Patient</Label>
              <Select
                value={newForm.patient}
                onValueChange={(value) => setNewForm({...newForm, patient: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-doe">John Doe</SelectItem>
                  <SelectItem value="jane-smith">Jane Smith</SelectItem>
                  <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button type="submit">Send Form</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InboxPanel;
