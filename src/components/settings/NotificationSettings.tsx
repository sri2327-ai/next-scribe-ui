
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Bell } from "lucide-react";

const NotificationSettings = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    secureMessages: true,
    appointmentRequests: true,
    appointmentReminders: true,
    newPatientRegistrations: true,
    taskAssignments: true,
    documentUploads: false
  });

  const handleToggle = (setting: string, checked: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: checked }));
  };

  const handleSave = () => {
    toast.success("Notification settings saved successfully");
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-6">Notifications</h3>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Email Notifications
          </CardTitle>
          <CardDescription>
            Configure which events will send you email notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="secureMessages" className="font-medium">Secure messages</Label>
                <p className="text-sm text-muted-foreground">Get notified when you receive new secure messages</p>
              </div>
              <Switch 
                id="secureMessages"
                checked={notificationSettings.secureMessages}
                onCheckedChange={(checked) => handleToggle('secureMessages', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="appointmentRequests" className="font-medium">Appointment requests</Label>
                <p className="text-sm text-muted-foreground">Get notified when patients request appointments</p>
              </div>
              <Switch 
                id="appointmentRequests"
                checked={notificationSettings.appointmentRequests}
                onCheckedChange={(checked) => handleToggle('appointmentRequests', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="appointmentReminders" className="font-medium">Appointment reminders</Label>
                <p className="text-sm text-muted-foreground">Get reminders about upcoming appointments</p>
              </div>
              <Switch 
                id="appointmentReminders"
                checked={notificationSettings.appointmentReminders}
                onCheckedChange={(checked) => handleToggle('appointmentReminders', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newPatientRegistrations" className="font-medium">New patient registrations</Label>
                <p className="text-sm text-muted-foreground">Get notified when new patients register</p>
              </div>
              <Switch 
                id="newPatientRegistrations"
                checked={notificationSettings.newPatientRegistrations}
                onCheckedChange={(checked) => handleToggle('newPatientRegistrations', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="taskAssignments" className="font-medium">Task assignments</Label>
                <p className="text-sm text-muted-foreground">Get notified when tasks are assigned to you</p>
              </div>
              <Switch 
                id="taskAssignments"
                checked={notificationSettings.taskAssignments}
                onCheckedChange={(checked) => handleToggle('taskAssignments', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="documentUploads" className="font-medium">Document uploads</Label>
                <p className="text-sm text-muted-foreground">Get notified when patients upload documents</p>
              </div>
              <Switch 
                id="documentUploads"
                checked={notificationSettings.documentUploads}
                onCheckedChange={(checked) => handleToggle('documentUploads', checked)}
              />
            </div>
            
            <Button onClick={handleSave} className="mt-4">Save Preferences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
