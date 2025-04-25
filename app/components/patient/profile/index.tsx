
"use client";

import React from "react";
import { User } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PatientProfileProps {
  patient: {
    name: string;
    email: string;
    phone: string;
    address: string;
    dob: string;
    gender: string;
  };
  onEdit?: () => void;
}

export function PatientProfile({ patient, onEdit }: PatientProfileProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
          <User className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold">{patient.name}</h3>
          <p className="text-sm text-muted-foreground">Patient Profile</p>
        </div>
        {onEdit && (
          <Button variant="outline" className="ml-auto" onClick={onEdit}>
            Edit Profile
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Email</dt>
            <dd className="text-sm">{patient.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
            <dd className="text-sm">{patient.phone}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Address</dt>
            <dd className="text-sm">{patient.address}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Date of Birth</dt>
            <dd className="text-sm">{patient.dob}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Gender</dt>
            <dd className="text-sm">{patient.gender}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
