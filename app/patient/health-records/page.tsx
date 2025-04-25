
"use client";

import React from "react";
import PatientLayout from "../dashboard/PatientLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Calendar, Plus } from "lucide-react";

interface HealthRecord {
  id: string;
  title: string;
  date: string;
  type: string;
  provider: string;
}

const mockRecords: HealthRecord[] = [
  {
    id: "1",
    title: "Annual Physical Examination",
    date: "2024-03-15",
    type: "Examination",
    provider: "Dr. Katherine Thompson"
  },
  {
    id: "2",
    title: "Blood Test Results",
    date: "2024-02-28",
    type: "Laboratory",
    provider: "City Medical Lab"
  },
  {
    id: "3",
    title: "X-Ray Report - Chest",
    date: "2024-01-12",
    type: "Radiology",
    provider: "Metro Imaging Center"
  },
  {
    id: "4",
    title: "Vaccination Record - COVID-19",
    date: "2023-11-05",
    type: "Immunization",
    provider: "Community Health Clinic"
  }
];

export default function HealthRecords() {
  return (
    <PatientLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Health Records</h1>
          <Button variant="outline" className="flex items-center">
            <Plus className="w-4 h-4 mr-2" /> Upload Record
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Medical Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Provider</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {mockRecords.map((record) => (
                    <tr key={record.id}>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-2 text-blue-600" />
                          {record.title}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                          {new Date(record.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 py-3">{record.type}</td>
                      <td className="px-4 py-3">{record.provider}</td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" className="text-blue-600">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PatientLayout>
  );
}
