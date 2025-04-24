
"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User, Clock } from "lucide-react";

interface AppointmentViewProps {
  appointment: {
    id: string;
    patient: string;
    date: string;
    time: string;
    type: string;
    location: string;
    status: 'upcoming' | 'completed' | 'cancelled';
  };
  onClose: () => void;
}

const AppointmentView = ({ appointment, onClose }: AppointmentViewProps) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-semibold">Appointment Details</h2>
        <Button variant="outline" onClick={onClose}>Close</Button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <User className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium">{appointment.patient}</p>
            <p className="text-sm text-gray-500">{appointment.type}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium">{appointment.date}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Clock className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium">{appointment.time}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <MapPin className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium">{appointment.location}</p>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline">Reschedule</Button>
          <Button>Start Appointment</Button>
        </div>
      </div>
    </Card>
  );
};

export default AppointmentView;
