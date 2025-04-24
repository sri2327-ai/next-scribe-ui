
"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const PatientNotesTranscript = () => {
  const notes = [
    {
      date: "2025-04-24",
      provider: "Dr. Smith",
      content: "Patient reported improved sleep patterns. Medication adjustment seems effective.",
      type: "Progress Note"
    },
    {
      date: "2025-04-17",
      provider: "Dr. Smith",
      content: "Discussed anxiety management techniques. Patient is receptive to cognitive behavioral strategies.",
      type: "Therapy Note"
    }
  ];

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Notes & Transcripts</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {notes.map((note, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-medium">{note.type}</span>
                  <p className="text-sm text-gray-600">{note.provider}</p>
                </div>
                <span className="text-sm text-gray-500">{note.date}</span>
              </div>
              <p className="text-sm">{note.content}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default PatientNotesTranscript;
