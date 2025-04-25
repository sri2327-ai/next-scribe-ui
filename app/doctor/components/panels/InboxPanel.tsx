
"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, User, PaperclipIcon, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  sender: string;
  avatar?: string;
  preview: string;
  date: string;
  unread: boolean;
  subject: string;
  fullMessage?: string;
}

const InboxPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  
  const [messages] = useState<Message[]>([
    {
      id: "1",
      sender: "John Doe",
      preview: "Question about my medication...",
      date: "10:30 AM",
      unread: true,
      subject: "Medication Concerns",
      fullMessage: "Hello Doctor, I've been experiencing some side effects from the medication you prescribed last week. I'm noticing dizziness and slight nausea, especially in the morning. Is this normal or should I stop taking it? Please advise. Thank you, John"
    },
    {
      id: "2",
      sender: "Lab Results",
      preview: "New lab results for patient Smith...",
      date: "Yesterday",
      unread: true,
      subject: "Lab Results: Jane Smith",
      fullMessage: "Lab results for Jane Smith (DOB: 04/15/1985) are now available. Blood tests show normal levels across all markers. Cholesterol is slightly improved from previous test."
    },
    {
      id: "3",
      sender: "Dr. Johnson",
      preview: "Regarding the patient referral...",
      date: "Apr 23",
      unread: false,
      subject: "Patient Referral - Robert Williams",
      fullMessage: "Hi, I wanted to discuss the patient referral you sent over for Mr. Williams. I've reviewed his case and believe we should consider additional testing before proceeding with the recommended treatment plan. Are you available for a quick call tomorrow morning? Best, Dr. Johnson"
    },
    {
      id: "4",
      sender: "Appointment System",
      preview: "Reminder: 3 appointments tomorrow",
      date: "Apr 22",
      unread: false,
      subject: "Tomorrow's Schedule",
      fullMessage: "This is a reminder that you have 3 appointments scheduled for tomorrow, April 26:\n\n9:00 AM - Sarah Johnson (New Patient)\n11:30 AM - Michael Brown (Follow-up)\n2:15 PM - Emma Davis (Consultation)\n\nPlease login to the portal for more details."
    }
  ]);

  const filteredMessages = messages.filter(message =>
    message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedMessage = messages.find(m => m.id === selectedMessageId);

  const handleSendReply = () => {
    if (replyText.trim()) {
      // In a real app, this would send the reply
      setReplyText("");
      // Show success notification
    }
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Message List */}
      <div className="w-1/3 border-r overflow-y-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Inbox</h2>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search messages..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          {filteredMessages.map((message) => (
            <Card 
              key={message.id}
              className={`cursor-pointer hover:bg-gray-50 ${selectedMessageId === message.id ? 'bg-blue-50' : ''}`}
              onClick={() => setSelectedMessageId(message.id)}
            >
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className={`font-medium ${message.unread ? 'font-bold' : ''}`}>{message.sender}</h3>
                      {message.unread && <Badge className="ml-2 bg-blue-100 text-blue-700">New</Badge>}
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{message.subject}</p>
                    <p className="text-xs text-gray-500 truncate">{message.preview}</p>
                  </div>
                  <span className="text-xs text-gray-500">{message.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Message View */}
      <div className="w-2/3 flex flex-col h-full overflow-hidden">
        {selectedMessage ? (
          <>
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">{selectedMessage.subject}</h2>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback>{selectedMessage.sender[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedMessage.sender}</p>
                    <p className="text-xs text-gray-500">{selectedMessage.date}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <p className="whitespace-pre-line">{selectedMessage.fullMessage}</p>
            </div>
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2 mb-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
                <span className="font-medium">Reply</span>
              </div>
              <div className="flex">
                <Input
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 mr-2"
                />
                <Button onClick={handleSendReply} className="ml-2">
                  <SendHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <MessageCircle className="h-12 w-12 mb-4" />
            <p>Select a message to view</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxPanel;
