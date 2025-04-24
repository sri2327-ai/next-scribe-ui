
"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, Bell, MessageSquare } from "lucide-react";
import PatientLayout from "@/components/patient/PatientLayout";
import { removeCookie } from "cookies-next";

export default function PatientDashboard() {
  const router = useRouter();
  
  // Mock data - in a real app, this would come from your backend
  const upcomingAppointment = {
    date: "May 6, 2025",
    time: "4:30p-5:30p",
    provider: "Dr. Katherine Thompson",
    type: "Follow-up Visit"
  };
  
  const notifications = [
    { id: 1, text: "New message from Dr. Thompson", time: "2 hours ago" },
    { id: 2, text: "Your lab results are ready to view", time: "1 day ago" },
    { id: 3, text: "Appointment reminder: May 6, 2025", time: "2 days ago" }
  ];
  
  const recentMessages = [
    { id: 1, from: "Dr. Katherine Thompson", preview: "How are you feeling today?", time: "2 hours ago" },
    { id: 2, from: "Nurse Williams", preview: "Your prescription has been refilled", time: "3 days ago" }
  ];

  const handleSignOut = () => {
    removeCookie('patientAuth');
    removeCookie('patientEmail');
    router.push('/patient/signin');
  };

  return (
    <PatientLayout onSignOut={handleSignOut}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Patient Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Appointment */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Upcoming Appointment
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingAppointment ? (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{upcomingAppointment.date}, {upcomingAppointment.time}</span>
                  </div>
                  <p className="font-medium">{upcomingAppointment.type}</p>
                  <p className="text-gray-600">{upcomingAppointment.provider}</p>
                </div>
              ) : (
                <p className="text-gray-500">No upcoming appointments</p>
              )}
            </CardContent>
          </Card>
          
          {/* Recent Messages */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
                Recent Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentMessages.length > 0 ? (
                <div className="space-y-3">
                  {recentMessages.map(message => (
                    <div key={message.id} className="flex justify-between border-b pb-2 last:border-0">
                      <div>
                        <p className="font-medium">{message.from}</p>
                        <p className="text-sm text-gray-600 truncate">{message.preview}</p>
                      </div>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No recent messages</p>
              )}
            </CardContent>
          </Card>
          
          {/* Notifications */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-blue-600" />
                Notifications
              </CardTitle>
              <CardDescription>Your recent notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              {notifications.length > 0 ? (
                <div className="space-y-3">
                  {notifications.map(notification => (
                    <div key={notification.id} className="flex justify-between border-b pb-2 last:border-0">
                      <p>{notification.text}</p>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No notifications</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PatientLayout>
  );
}
