
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from 'lucide-react';
import { toast } from "sonner";

const InboxPanel = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateForm = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, this would save to the backend
    toast.success("Form created and sent to patient");
    setShowCreateForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Forms Inbox</h2>
        <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
          <Plus className="w-5 h-5" /> Create Form
        </Button>
      </div>

      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleCreateForm} className="space-y-4">
            <div>
              <Label htmlFor="formType">Form Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select form type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="intake">Patient Intake Form</SelectItem>
                  <SelectItem value="feedback">Feedback Survey</SelectItem>
                  <SelectItem value="custom">Custom Form</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="patient">Send to Patient</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-doe">John Doe</SelectItem>
                  <SelectItem value="jane-smith">Jane Smith</SelectItem>
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

      <div className="mt-4">
        <div className="grid gap-4">
          {/* Form submissions will be listed here */}
          <div className="text-center text-gray-500 mt-8">No form submissions yet</div>
        </div>
      </div>
    </div>
  );
};

export default InboxPanel;
