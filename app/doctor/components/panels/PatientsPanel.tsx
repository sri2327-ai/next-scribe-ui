
"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Patient {
  id: string;
  name: string;
  age: string;
  lastVisit: string;
  nextAppointment: string | null;
  status: 'active' | 'inactive';
}

const PatientsPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [patients] = useState<Patient[]>([
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
    },
    {
      id: "3",
      name: "Robert Johnson",
      age: "56",
      lastVisit: "2025-04-01",
      nextAppointment: "2025-04-28",
      status: "active"
    },
    {
      id: "4",
      name: "Emily Davis",
      age: "28",
      lastVisit: "2025-03-22",
      nextAppointment: null,
      status: "inactive"
    }
  ]);

  // Filter patients based on search query
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No patients found matching your search.</p>
        )}
      </div>
    </div>
  );
};

const PatientCard = ({ patient }: { patient: Patient }) => {
  return (
    <Card>
      <CardContent className="p-4">
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
            <Badge 
              variant={patient.status === 'active' ? 'success' : 'secondary'}
              className={patient.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}
            >
              {patient.status}
            </Badge>
            {patient.nextAppointment && (
              <p className="text-xs text-blue-600 mt-1">
                Next: {patient.nextAppointment}
              </p>
            )}
            <Button variant="ghost" size="sm" className="mt-1">View Details</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientsPanel;
