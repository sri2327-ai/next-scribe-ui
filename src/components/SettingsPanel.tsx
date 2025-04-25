import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import MyAccountSettings from './settings/MyAccountSettings';
import AvailabilitySettings from './settings/AvailabilitySettings';
import PracticeDetailsSettings from './settings/PracticeDetailsSettings';
import LocationsSettings from './settings/LocationsSettings';
import CalendarSettings from './settings/CalendarSettings';
import TeamManagementSettings from './settings/TeamManagementSettings';
import NoteTemplateSettings from './settings/NoteTemplateSettings';
import BillingSettings from './settings/BillingSettings';
import FormsSettings from './settings/FormsSettings';
import EmailTemplateSettings from './settings/EmailTemplateSettings';
import NotificationSettings from './settings/NotificationSettings';
import PasswordSettings from './settings/PasswordSettings';
import ThemeSettings from './settings/ThemeSettings';

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

              <AccordionItem value="appearance">
                <AccordionTrigger className="px-4 py-3">Appearance</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-1 px-4">
                    <Button 
                      variant="ghost" 
                      className="justify-start font-normal" 
                      onClick={() => setActiveTab("theme")}
                    >
                      Theme settings
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        <div className="flex-1 bg-white shadow rounded-lg">
          {activeTab === "account" && <MyAccountSettings />}
          {activeTab === "availability" && <AvailabilitySettings />}
          {activeTab === "password" && <PasswordSettings />}
          {activeTab === "practice-details" && <PracticeDetailsSettings />}
          {activeTab === "locations" && <LocationsSettings />}
          {activeTab === "calendar" && <CalendarSettings />}
          {activeTab === "team" && <TeamManagementSettings />}
          {activeTab === "note-templates" && <NoteTemplateSettings />}
          {activeTab === "billing" && <BillingSettings />}
          {activeTab === "forms" && <FormsSettings />}
          {activeTab === "email" && <EmailTemplateSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "theme" && <ThemeSettings />}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
