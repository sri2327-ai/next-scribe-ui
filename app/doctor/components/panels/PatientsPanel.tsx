
"use client";

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, User } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: string;
  lastVisit: string;
  nextAppointment: string | null;
  status: 'active' | 'inactive';
}

const PatientsPanel = () => {
  const [patients] = React.useState<Patient[]>([
    {
      id: "1",
      name: "John Doe",
      age: "45",
      lastVisit: "2025-04-15",
      nextAppointment: "2025-04-24",
      status: "active"
    },
    {
      id: "2",
      name: "Jane Smith",
      age: "32",
      lastVisit: "2025-04-10",
      nextAppointment: null,
      status: "active"
    }
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Patients</h2>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Patient
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search patients..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-4">
        {patients.map((patient) => (
          <Card key={patient.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">{patient.name}</h3>
                  <p className="text-sm text-gray-500">Age: {patient.age}</p>
                  <p className="text-xs text-gray-400">
                    Last visit: {patient.lastVisit}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 rounded-full text-xs
                  ${patient.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  {patient.status}
                </span>
                {patient.nextAppointment && (
                  <p className="text-xs text-blue-600 mt-1">
                    Next: {patient.nextAppointment}
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientsPanel;
