
"use client";

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, MapPin } from "lucide-react";

interface Appointment {
  id: string;
  patient: string;
  date: string;
  time: string;
  type: string;
  location: string;
  status: "upcoming" | "completed" | "cancelled";
}

const AppointmentPanel = () => {
  const [appointments] = useState<Appointment[]>([
    {
      id: "1",
      patient: "John Doe",
      date: "2025-04-24",
      time: "10:00 AM",
      type: "Check-up",
      location: "Room 101",
      status: "upcoming"
    },
    {
      id: "2",
      patient: "Jane Smith",
      date: "2025-04-24",
      time: "2:30 PM",
      type: "Follow-up",
      location: "Virtual",
      status: "upcoming"
    }
  ]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Today's Appointments</h2>
      
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center">
                  <User className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium">{appointment.patient}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{appointment.date}</span>
                  <Clock className="w-4 h-4 mx-2" />
                  <span className="text-sm">{appointment.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{appointment.location}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  appointment.status === "upcoming"
                    ? "bg-blue-100 text-blue-700"
                    : appointment.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {appointment.status}
                </span>
                <Button variant="ghost" size="sm" className="mt-2">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AppointmentPanel;
