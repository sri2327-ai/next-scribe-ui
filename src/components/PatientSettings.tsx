
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PatientSettingsProps {
  patient: {
    name: string;
    phone: string;
    email: string;
  };
}

const PatientSettings: React.FC<PatientSettingsProps> = ({ patient }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Phone Number</Label>
              <Input defaultValue={patient.phone} className="mt-1" />
            </div>
            <div>
              <Label>Email Address</Label>
              <Input defaultValue={patient.email} className="mt-1" />
            </div>
            <div className="flex justify-end">
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Update Contact Info
              </Button>
            </div>
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
              <Switch id="portal-access" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="allow-messaging">Allow Messaging</Label>
              <Switch id="allow-messaging" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="allow-appointment">Allow Appointment Scheduling</Label>
              <Switch id="allow-appointment" defaultChecked />
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
              <Switch id="appt-reminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="med-reminders">Medication Reminders</Label>
              <Switch id="med-reminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="result-updates">Test Result Updates</Label>
              <Switch id="result-updates" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="billing-updates">Billing Updates</Label>
              <Switch id="billing-updates" defaultChecked />
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
              <Switch id="shared-data" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="research">Research Participation</Label>
              <Switch id="research" />
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
