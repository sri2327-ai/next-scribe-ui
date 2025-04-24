
"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const PatientTimeline = () => {
  const events = [
    {
      date: "2025-04-24",
      type: "Appointment",
      description: "Regular check-up",
      status: "Completed"
    },
    {
      date: "2025-04-20",
      type: "Medication",
      description: "Prescription renewed",
      status: "Active"
    },
    {
      date: "2025-04-15",
      type: "Lab Result",
      description: "Blood work results received",
      status: "Reviewed"
    }
  ];

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Patient Timeline</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="relative border-l border-gray-200 ml-3">
          {events.map((event, index) => (
            <div key={index} className="mb-8 ml-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              </span>
              <div className="p-4 bg-white rounded-lg border shadow-sm">
                <time className="block mb-2 text-sm font-normal leading-none text-gray-500">
                  {event.date}
                </time>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                  {event.type}
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3">
                    {event.status}
                  </span>
                </h3>
                <p className="text-base font-normal text-gray-600">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default PatientTimeline;
