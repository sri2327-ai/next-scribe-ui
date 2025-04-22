
import React from "react";
import { Timeline } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PatientTimelineProps {
  patient: {
    name: string;
  };
}

const timelineEvents = [
  {
    id: 1,
    date: "Apr 22, 2025",
    time: "4:00 PM",
    type: "Appointment",
    title: "Therapy Session",
    description: "Standard 60-minute therapy session",
    details: "Discussed anxiety management techniques"
  },
  {
    id: 2,
    date: "Apr 15, 2025",
    time: "10:30 AM",
    type: "Medication",
    title: "Prescription Refill",
    description: "Refilled anxiety medication",
    details: "90-day supply"
  },
  {
    id: 3,
    date: "Apr 8, 2025",
    time: "3:00 PM",
    type: "Appointment",
    title: "Therapy Session",
    description: "Standard 60-minute therapy session",
    details: "Adjusted medication dosage"
  },
  {
    id: 4,
    date: "Mar 25, 2025",
    time: "9:15 AM",
    type: "Lab Work",
    title: "Blood Test",
    description: "Regular monitoring",
    details: "Results normal"
  },
  {
    id: 5,
    date: "Mar 11, 2025",
    time: "4:30 PM",
    type: "Appointment",
    title: "Therapy Session",
    description: "Standard 60-minute therapy session",
    details: "Introduced new coping strategies"
  },
  {
    id: 6,
    date: "Feb 28, 2025",
    time: "2:45 PM",
    type: "Document",
    title: "Medical Records Update",
    description: "Updated patient history",
    details: "Added new diagnoses"
  }
];

const getEventColor = (type: string) => {
  switch (type) {
    case "Appointment":
      return "bg-blue-100 border-blue-300 text-blue-800";
    case "Medication":
      return "bg-green-100 border-green-300 text-green-800";
    case "Lab Work":
      return "bg-purple-100 border-purple-300 text-purple-800";
    case "Document":
      return "bg-orange-100 border-orange-300 text-orange-800";
    default:
      return "bg-gray-100 border-gray-300 text-gray-800";
  }
};

const PatientTimeline: React.FC<PatientTimelineProps> = ({ patient }) => {
  return (
    <div className="h-full">
      <div className="flex items-center mb-4">
        <Timeline className="mr-2" />
        <h3 className="text-lg font-semibold">Patient Timeline</h3>
      </div>
      
      <ScrollArea className="h-[calc(100vh-250px)]">
        <div className="relative pl-8 space-y-6 before:absolute before:left-3 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-200">
          {timelineEvents.map((event) => (
            <div key={event.id} className="relative">
              <div className="absolute left-[-28px] top-3 w-6 h-6 bg-white border-2 border-blue-500 rounded-full"></div>
              <Card className={`${getEventColor(event.type)} border`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold">{event.title}</span>
                    <div className="text-xs text-gray-600">
                      {event.date} {event.time}
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white border">
                      {event.type}
                    </span>
                  </div>
                  <p className="text-sm">{event.description}</p>
                  <p className="text-xs text-gray-600 mt-1">{event.details}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PatientTimeline;
