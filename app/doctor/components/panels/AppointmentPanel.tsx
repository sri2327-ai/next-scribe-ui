
"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    },
    {
      id: "3",
      patient: "Robert Johnson",
      date: "2025-04-25",
      time: "9:15 AM",
      type: "New Patient",
      location: "Room 103",
      status: "upcoming"
    },
    {
      id: "4",
      patient: "Emily Davis",
      date: "2025-04-23",
      time: "11:30 AM",
      type: "Follow-up",
      location: "Room 102",
      status: "completed"
    }
  ]);

  const todaysAppointments = appointments.filter(
    app => app.date === "2025-04-24"
  );

  const upcomingAppointments = appointments.filter(
    app => app.status === "upcoming" && app.date !== "2025-04-24"
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Schedule</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Today's Appointments</h3>
        {todaysAppointments.length > 0 ? (
          <div className="space-y-4">
            {todaysAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No appointments scheduled for today.</p>
        )}
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Upcoming Appointments</h3>
        {upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No upcoming appointments.</p>
        )}
      </div>
    </div>
  );
};

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  return (
    <Card>
      <CardContent className="p-4">
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
            <Badge 
              variant={
                appointment.status === "upcoming" 
                  ? "default" 
                  : appointment.status === "completed" 
                  ? "success" 
                  : "destructive"
              }
              className={`${
                appointment.status === "upcoming"
                  ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                  : appointment.status === "completed"
                  ? "bg-green-100 text-green-700 hover:bg-green-100"
                  : "bg-red-100 text-red-700 hover:bg-red-100"
              }`}
            >
              {appointment.status}
            </Badge>
            <Button variant="ghost" size="sm" className="mt-2">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentPanel;
