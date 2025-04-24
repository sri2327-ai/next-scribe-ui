
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Star, Trash2 } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  starred: boolean;
}

const InboxPanel = () => {
  const [messages] = useState<Message[]>([
    {
      id: "1",
      sender: "Lab Results",
      subject: "New test results available",
      preview: "Patient test results are now available for review...",
      date: "10:30 AM",
      read: false,
      starred: true
    },
    {
      id: "2",
      sender: "Appointment System",
      subject: "Upcoming appointments",
      preview: "You have 3 new appointments scheduled for tomorrow...",
      date: "Yesterday",
      read: true,
      starred: false
    }
  ]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Inbox</h2>
      
      <div className="space-y-4">
        {messages.map((message) => (
          <Card 
            key={message.id}
            className={`p-4 ${!message.read ? "bg-blue-50" : ""}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Mail className={`w-5 h-5 ${!message.read ? "text-blue-600" : "text-gray-400"}`} />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">{message.sender}</h3>
                    {message.starred && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                  </div>
                  <p className="font-medium">{message.subject}</p>
                  <p className="text-sm text-gray-500">{message.preview}</p>
                  <p className="text-xs text-gray-400 mt-1">{message.date}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Trash2 className="w-4 h-4 text-gray-400" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InboxPanel;
