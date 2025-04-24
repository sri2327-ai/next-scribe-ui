
"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PatientSettings = () => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Patient Settings</h2>

      <Tabs defaultValue="preferences">
        <TabsList>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="preferences" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Appointment Reminders</Label>
                <p className="text-sm text-gray-500">Receive reminders before appointments</p>
              </div>
              <Switch />
            </div>

            <div className="space-y-2">
              <Label>Preferred Contact Method</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">Email</Button>
                <Button variant="outline">SMS</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>SMS Notifications</Label>
                <p className="text-sm text-gray-500">Receive updates via SMS</p>
              </div>
              <Switch />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Data Sharing Preferences</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Share medical history with other providers</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Allow anonymous data use for research</Label>
                  <Switch />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </Card>
  );
};

export default PatientSettings;
