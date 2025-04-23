import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const SettingsPanel = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Settings</h2>
      </div>

      <div className="flex gap-6">
        <div className="w-64 shrink-0">
          <div className="bg-white shadow rounded-lg">
            <Accordion type="single" collapsible defaultValue="personal" className="w-full">
              <AccordionItem value="personal">
                <AccordionTrigger className="px-4 py-3">Personal</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-1 px-4">
                    <Button 
                      variant="ghost" 
                      className="justify-start font-normal" 
                      onClick={() => setActiveTab("account")}
                    >
                      My account
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start font-normal" 
                      onClick={() => setActiveTab("availability")}
                    >
                      My availability
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start font-normal" 
                      onClick={() => setActiveTab("password")}
                    >
                      Change password
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="practice">
                <AccordionTrigger className="px-4 py-3">Practice Settings</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-1 px-4">
                    <Button 
                      variant="ghost" 
                      className="justify-start font-normal" 
                      onClick={() => setActiveTab("practice-details")}
                    >
                      Practice details
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start font-normal" 
                      onClick={() => setActiveTab("locations")}
                    >
                      Locations
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start font-normal" 
                      onClick={() => setActiveTab("calendar")}
                    >
                      Calendar
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start font-normal" 
                      onClick={() => setActiveTab("team")}
                    >
                      Team management
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start font-normal" 
                      onClick={() => setActiveTab("note-templates")}
                    >
                      Note templates
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start font-normal" 
                      onClick={() => setActiveTab("billing")}
                    >
                      Billing settings
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start font-normal" 
                      onClick={() => setActiveTab("forms")}
                    >
                      Custom forms
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start font-normal" 
                      onClick={() => setActiveTab("email")}
                    >
                      Email templates
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start font-normal" 
                      onClick={() => setActiveTab("notifications")}
                    >
                      Notifications
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        <div className="flex-1 bg-white shadow rounded-lg">
          {/* Account Settings */}
          {activeTab === "account" && (
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-6">My Account</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" defaultValue="Alex" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" defaultValue="Smith" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="alex.smith@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
                  </div>
                </div>
                <Button onClick={() => toast.success("Account details updated")}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
          
          {/* Availability Settings */}
          {activeTab === "availability" && (
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-6">My Availability</h3>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Working Hours</CardTitle>
                    <CardDescription>Set your regular working hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Monday</p>
                          <p className="text-sm text-gray-500">9:00 AM - 5:00 PM</p>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Tuesday</p>
                          <p className="text-sm text-gray-500">9:00 AM - 5:00 PM</p>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Wednesday</p>
                          <p className="text-sm text-gray-500">9:00 AM - 5:00 PM</p>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Thursday</p>
                          <p className="text-sm text-gray-500">9:00 AM - 5:00 PM</p>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Friday</p>
                          <p className="text-sm text-gray-500">9:00 AM - 3:00 PM</p>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Saturday</p>
                          <p className="text-sm text-gray-500">Unavailable</p>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Sunday</p>
                          <p className="text-sm text-gray-500">Unavailable</p>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {/* Calendar Settings */}
          {activeTab === "calendar" && (
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-6">Calendar Settings</h3>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Connected Accounts</CardTitle>
                  <CardDescription>Manage calendar connections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-bold">G</span>
                        </div>
                        <div>
                          <p className="font-medium">Google Calendar</p>
                          <p className="text-sm text-gray-500">alex.smith@example.com</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Disconnect</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-bold">O</span>
                        </div>
                        <div>
                          <p className="font-medium">Connect Outlook</p>
                          <p className="text-sm text-gray-500">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Practice Timezone</CardTitle>
                  <CardDescription>Set your practice timezone</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select defaultValue="america-new_york">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-new_york">Eastern Time (ET)</SelectItem>
                      <SelectItem value="america-chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="america-denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="america-los_angeles">Pacific Time (PT)</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Types</CardTitle>
                  <CardDescription>Manage appointment types and duration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Initial Consultation</p>
                        <p className="text-sm text-gray-500">60 minutes</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Follow Up</p>
                        <p className="text-sm text-gray-500">30 minutes</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Medication Review</p>
                        <p className="text-sm text-gray-500">15 minutes</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    
                    <Button className="mt-4">+ Add Appointment Type</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Button className="mt-6" onClick={() => toast.success("Calendar settings updated")}>Save Changes</Button>
            </div>
          )}
          
          {/* Other Settings Sections */}
          {activeTab !== "account" && 
           activeTab !== "availability" && 
           activeTab !== "calendar" && (
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-6">
                {activeTab === "password" && "Change Password"}
                {activeTab === "practice-details" && "Practice Details"}
                {activeTab === "locations" && "Practice Locations"}
                {activeTab === "team" && "Team Management"}
                {activeTab === "note-templates" && "Note Templates"}
                {activeTab === "billing" && "Billing Settings"}
                {activeTab === "forms" && "Custom Forms"}
                {activeTab === "email" && "Email Templates"}
                {activeTab === "notifications" && "Notifications"}
              </h3>
              
              {activeTab === "password" && (
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
                  <Button onClick={() => toast.success("Password updated successfully")}>
                    Update Password
                  </Button>
                </div>
              )}
              
              {(activeTab === "practice-details" || 
                activeTab === "locations" || 
                activeTab === "team" || 
                activeTab === "note-templates" || 
                activeTab === "billing" || 
                activeTab === "forms" || 
                activeTab === "email" || 
                activeTab === "notifications") && (
                <div className="text-center p-16 text-gray-500">
                  <p>Settings for {activeTab} will be implemented soon.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
