
"use client";

import React from 'react';
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <main className="flex-1 overflow-auto bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Today's Appointments</h2>
          <p className="text-3xl font-bold">5</p>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Pending Tasks</h2>
          <p className="text-3xl font-bold">3</p>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">New Messages</h2>
          <p className="text-3xl font-bold">7</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Patients</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">Last visit: Today</p>
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
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
          <div className="space-y-3">
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
          </div>
        </Card>
      </div>
    </main>
  );
}

function Button({ children, variant = "default", size = "default" }) {
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 hover:bg-gray-50"
  };
  
  const sizeClasses = {
    default: "px-4 py-2",
    sm: "px-3 py-1 text-sm"
  };
  
  return (
    <button 
      className={`rounded-md transition-colors ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </button>
  );
}
