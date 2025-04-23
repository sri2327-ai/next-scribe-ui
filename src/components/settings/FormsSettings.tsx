
import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Plus, Upload, Trash2 } from "lucide-react";

interface FormTemplate {
  id: string;
  name: string;
  fileName: string;
  requiresCountersignature: boolean;
  createdAt: string;
}

const FormsSettings = () => {
  const [forms, setForms] = useState<FormTemplate[]>([
    {
      id: '1',
      name: 'New Patient Intake',
      fileName: 'new_patient_intake.pdf',
      requiresCountersignature: true,
      createdAt: '2023-04-15'
    },
    {
      id: '2',
      name: 'Consent for Treatment',
      fileName: 'consent_for_treatment.pdf',
      requiresCountersignature: true,
      createdAt: '2023-04-15'
    }
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newForm, setNewForm] = useState<Omit<FormTemplate, 'id' | 'fileName' | 'createdAt'>>({
    name: '',
    requiresCountersignature: false
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setNewForm(prev => ({ ...prev, requiresCountersignature: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error("Only PDF files are allowed");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleAddForm = () => {
    if (!newForm.name) {
      toast.error("Please enter a template name");
      return;
    }
    
    if (!selectedFile) {
      toast.error("Please upload a PDF file");
      return;
    }
    
    const id = Date.now().toString();
    setForms(prev => [
      ...prev, 
      {
        ...newForm,
        id,
        fileName: selectedFile.name,
        createdAt: new Date().toISOString().split('T')[0]
      }
    ]);
    
    setNewForm({
      name: '',
      requiresCountersignature: false
    });
    setSelectedFile(null);
    setIsDialogOpen(false);
    toast.success("Form template added successfully");
  };

  const handleDeleteForm = (id: string) => {
    setForms(prev => prev.filter(form => form.id !== id));
    toast.success("Form template deleted successfully");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Custom Forms</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Form
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Form Template</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Template Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={newForm.name}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label className="block mb-2">Upload PDF Form</Label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed rounded-md p-6 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50"
                  >
                    {selectedFile ? (
                      <>
                        <FileText className="h-10 w-10 text-blue-500" />
                        <p className="font-medium text-blue-500">{selectedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Click to change file
                        </p>
                      </>
                    ) : (
                      <>
                        <Upload className="h-10 w-10 text-gray-400" />
                        <p className="font-medium text-blue-500">Click or drag file to this area to upload</p>
                        <p className="text-xs text-muted-foreground">.pdf files only</p>
                      </>
                    )}
                    <Input 
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="requiresCountersignature">Clinic countersignature required</Label>
                  <Switch 
                    id="requiresCountersignature"
                    checked={newForm.requiresCountersignature}
                    onCheckedChange={handleSwitchChange}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleAddForm} 
                className="mt-6 w-full"
                disabled={!newForm.name || !selectedFile}
              >
                Add Form Template
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-4">
        {forms.map(form => (
          <Card key={form.id}>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-blue-600" />
                <div>
                  <CardTitle className="text-base">{form.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {form.fileName} • {form.requiresCountersignature ? 'Requires countersignature' : 'No countersignature required'}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleDeleteForm(form.id)}
              >
                <Trash2 size={16} className="text-red-500" />
              </Button>
            </CardHeader>
          </Card>
        ))}
      </div>
      
      {forms.length === 0 && (
        <div className="text-center p-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium mb-2">No Form Templates Yet</h4>
          <p className="text-muted-foreground mb-4">Create your first custom form template</p>
          <Button onClick={() => setIsDialogOpen(true)}>Add Form Template</Button>
        </div>
      )}
    </div>
  );
};

export default FormsSettings;
