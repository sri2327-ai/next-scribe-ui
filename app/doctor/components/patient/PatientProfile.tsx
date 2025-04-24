
"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { User, Phone, Mail, MapPin, Flag } from "lucide-react";

interface PatientProfileProps {
  patient: {
    name: string;
    age: string;
    gender: string;
    phone: string;
    email: string;
    address: string;
    nationality: string;
  };
}

const PatientProfile = ({ patient }: PatientProfileProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-start space-x-6">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="w-12 h-12 text-blue-600" />
        </div>
        
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">{patient.name}</h2>
            <p className="text-gray-600">{patient.age} • {patient.gender}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              <span>{patient.phone}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span>{patient.email}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{patient.address}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Flag className="w-4 h-4 mr-2" />
              <span>{patient.nationality}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PatientProfile;
