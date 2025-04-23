import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Contact, Save } from "lucide-react";
import { toast } from "sonner";

interface PatientSettingsProps {
  patient: {
    name: string;
    phone: string;
    email: string;
  };
}

const PatientSettings: React.FC<PatientSettingsProps> = ({ patient }) => {
  const [contactInfo, setContactInfo] = useState({
    phone: patient.phone,
    email: patient.email
  });

  const handleToggleChange = (settingName: string, value: boolean) => {
    toast.success(`${settingName} ${value ? "enabled" : "disabled"}`);
  };

  const handleContactSave = () => {
    toast.success("Contact information updated successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Contact className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              />
            </div>
            <Button onClick={handleContactSave} className="mt-4">
              <Save className="h-4 w-4 mr-2" />
              Save Contact Info
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Patient Portal Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="portal-access">Patient Portal Access</Label>
              <Switch 
                id="portal-access" 
                defaultChecked 
                onCheckedChange={(checked) => handleToggleChange("Patient Portal Access", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="allow-messaging">Allow Messaging</Label>
              <Switch 
                id="allow-messaging" 
                defaultChecked 
                onCheckedChange={(checked) => handleToggleChange("Messaging", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="allow-appointment">Allow Appointment Scheduling</Label>
              <Switch 
                id="allow-appointment" 
                defaultChecked 
                onCheckedChange={(checked) => handleToggleChange("Appointment Scheduling", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Notifications Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="appt-reminders">Appointment Reminders</Label>
              <Switch 
                id="appt-reminders" 
                defaultChecked 
                onCheckedChange={(checked) => handleToggleChange("Appointment Reminders", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="med-reminders">Medication Reminders</Label>
              <Switch 
                id="med-reminders" 
                defaultChecked 
                onCheckedChange={(checked) => handleToggleChange("Medication Reminders", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="result-updates">Test Result Updates</Label>
              <Switch 
                id="result-updates" 
                defaultChecked 
                onCheckedChange={(checked) => handleToggleChange("Test Result Updates", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="billing-updates">Billing Updates</Label>
              <Switch 
                id="billing-updates" 
                defaultChecked 
                onCheckedChange={(checked) => handleToggleChange("Billing Updates", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Privacy Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="shared-data">Data Sharing Consent</Label>
              <Switch 
                id="shared-data" 
                defaultChecked 
                onCheckedChange={(checked) => handleToggleChange("Data Sharing Consent", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="research">Research Participation</Label>
              <Switch 
                id="research" 
                defaultChecked={false}
                onCheckedChange={(checked) => handleToggleChange("Research Participation", checked)}
              />
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="mt-4 px-2 py-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
            <p>Patient last accepted privacy policy: <strong>January 17, 2025</strong></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientSettings;
