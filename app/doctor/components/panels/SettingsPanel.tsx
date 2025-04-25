
"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SettingsPanel = () => {
  const [notifications, setNotifications] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [smsNotifications, setSmsNotifications] = React.useState(false);

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-6">Personal Information</h3>
            
            <div className="flex items-center mb-8">
              <Avatar className="h-24 w-24 mr-6">
                <AvatarImage src="/lovable-uploads/20cdf9a7-452f-4cd4-b1d0-5030d6b36ad9.png" />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
              <div>
                <Button size="sm" variant="outline" className="mb-2">
                  Change Photo
                </Button>
                <p className="text-sm text-gray-500">
                  JPG, GIF or PNG. Max size 1MB
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="Dr. Jane Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="doctor@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select defaultValue="cardiology">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="dermatology">Dermatology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">License Number</Label>
                  <Input id="license" defaultValue="MD12345678" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <textarea
                  id="bio"
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                  defaultValue="Board-certified cardiologist with over 10 years of experience in treating cardiovascular diseases."
                />
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-6">Notification Preferences</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive notifications for appointments and messages
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive email updates for important events
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive text messages for urgent updates
                  </p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-6">Account Settings</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="UTC-5">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                      <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                      <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="pt-4 border-t mt-6">
                <h4 className="text-base font-medium mb-4">Password</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-6">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
