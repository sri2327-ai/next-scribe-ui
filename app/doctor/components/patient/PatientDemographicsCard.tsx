"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { Patient } from "@/types";

interface PatientDemographicsCardProps {
  patient: Patient;
}

const PatientDemographicsCard = ({ patient }: PatientDemographicsCardProps) => {
  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{patient.name}</h3>
            <p className="text-sm text-gray-600">DOB: {patient.dob}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Gender</p>
            <p>{patient.gender}</p>
          </div>
          <div>
            <p className="text-gray-600">Phone</p>
            <p>{patient.phone}</p>
          </div>
          <div>
            <p className="text-gray-600">Email</p>
            <p>{patient.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Insurance</p>
            <p>{patient.insurance}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-600">Address</p>
            <p>{patient.address}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PatientDemographicsCard;
