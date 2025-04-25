
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import PatientLayout from "../dashboard/PatientLayout";

interface Message {
  id: number;
  sender: "patient" | "doctor";
  senderName: string;
  text: string;
  timestamp: string;
}

export default function PatientMessages() {
  // Mock data - in a real app, this would sync with your backend
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "doctor",
      senderName: "Dr. Katherine Thompson",
      text: "Thank you for your message. I'll process your request shortly. Is there anything else you need?",
      timestamp: "Today, 2:30 PM"
    },
    {
      id: 2,
      sender: "patient",
      senderName: "You",
      text: "Hi, I need a refill on my anxiety medication please.",
      timestamp: "Today, 2:15 PM"
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: Date.now(),
        sender: "patient",
        senderName: "You",
        text: newMessage,
        timestamp: new Date().toLocaleString([], { 
          hour: '2-digit', 
          minute: '2-digit', 
          hour12: true
        }),
      };
      
      setMessages([...messages, newMsg]);
      setNewMessage("");
      
      // Simulate doctor's response after a delay
      setTimeout(() => {
        const response: Message = {
          id: Date.now() + 1,
          sender: "doctor",
          senderName: "Dr. Katherine Thompson",
          text: "I've submitted your refill request. You should be able to pick it up tomorrow.",
          timestamp: new Date().toLocaleString([], { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true
          }),
        };
        setMessages(prevMessages => [...prevMessages, response]);
      }, 10000);
    }
  };

  return (
    <PatientLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        
        <Card className="h-[calc(100vh-200px)]">
          <CardHeader className="border-b">
            <CardTitle>Dr. Katherine Thompson</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col p-0 h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex max-w-[80%]">
                    {message.sender === 'doctor' && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarImage src="/lovable-uploads/53ad6fba-0f2a-42f5-9bb4-e0a5e45188d5.png" />
                        <AvatarFallback>KT</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.sender === 'patient'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        {message.text}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t mt-auto">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  className="flex-1"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-5 w-5" />
                  <span className="ml-2">Send</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PatientLayout>
  );
}
