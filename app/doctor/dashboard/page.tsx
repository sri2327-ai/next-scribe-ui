"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarWrapper } from "@/components/ui/calendar-wrapper";
import { formatDate } from "@/lib/utils";

export default function Dashboard() {
  return (
    <main className="flex-1 overflow-auto bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>New Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">7</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">Last visit: {formatDate(new Date())}</p>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">Jane Smith</p>
                <p className="text-sm text-gray-500">Last visit: Yesterday</p>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">2:00 PM - Michael Johnson</p>
                <p className="text-sm text-gray-500">Initial Consultation</p>
              </div>
              <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                Today
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">9:30 AM - Sarah Williams</p>
                <p className="text-sm text-gray-500">Follow-up</p>
              </div>
              <div className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                Tomorrow
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
