
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const EmailTemplateSettings = () => {
  const [template, setTemplate] = useState(
    "Dear {{patient_name}},\n\nHere is an update on your recent progress and treatment. Your next appointment is scheduled for {{next_appointment_date}}.\n\nPlease let me know if you have any questions.\n\nBest regards,\nDr. {{provider_name}}"
  );

  const handleTemplateChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTemplate(e.target.value);
  };

  const handleSave = () => {
    toast.success("Email template saved successfully");
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-6">Email Templates</h3>
      
      <Card>
        <CardHeader>
          <CardTitle>Email Template</CardTitle>
          <CardDescription>
            This template will be used as the starting text in the message body of Share Patient Progress (located in Patient Settings).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea 
              value={template}
              onChange={handleTemplateChange}
              className="min-h-[200px]"
              placeholder="Enter email template content here..."
            />
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Available Variables</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="text-sm">
                  <code className="bg-gray-100 px-1 py-0.5 rounded">{"{{patient_name}}"}</code> - Patient's full name
                </div>
                <div className="text-sm">
                  <code className="bg-gray-100 px-1 py-0.5 rounded">{"{{provider_name}}"}</code> - Provider's name
                </div>
                <div className="text-sm">
                  <code className="bg-gray-100 px-1 py-0.5 rounded">{"{{next_appointment_date}}"}</code> - Next appointment date
                </div>
                <div className="text-sm">
                  <code className="bg-gray-100 px-1 py-0.5 rounded">{"{{practice_name}}"}</code> - Practice name
                </div>
              </div>
            </div>
            
            <Button onClick={handleSave}>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailTemplateSettings;
