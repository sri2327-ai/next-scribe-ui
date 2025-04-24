
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isDoctor: boolean;
}

const PatientMessagesChat = () => {
  const [message, setMessage] = useState("");
  const [messages] = useState<Message[]>([
    {
      id: "1",
      sender: "Dr. Thompson",
      content: "How are you feeling today?",
      timestamp: "10:30 AM",
      isDoctor: true
    },
    {
      id: "2",
      sender: "John Doe",
      content: "Much better, thank you. The new medication seems to be helping.",
      timestamp: "10:32 AM",
      isDoctor: false
    }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    // Handle sending message
    setMessage("");
  };

  return (
    <Card className="flex flex-col h-[600px]">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Messages</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isDoctor ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.isDoctor
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <p className="text-sm font-medium">{msg.sender}</p>
              <p>{msg.content}</p>
              <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg"
          />
          <Button onClick={handleSend}>
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PatientMessagesChat;
