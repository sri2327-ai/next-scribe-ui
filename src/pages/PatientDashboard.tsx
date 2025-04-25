
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, Bell, MessageSquare, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PatientDashboard: React.FC = () => {
  // Mock data - in a real app, this would come from your backend
  const upcomingAppointment = {
    date: "May 6, 2025",
    time: "4:30p-5:30p",
    provider: "Dr. Katherine Thompson",
    type: "Follow-up Visit"
  };
  
  const notifications = [
    { id: 1, text: "New message from Dr. Thompson", time: "2 hours ago", type: "message" },
    { id: 2, text: "Your lab results are ready to view", time: "1 day ago", type: "lab" },
    { id: 3, text: "Appointment reminder: May 6, 2025", time: "2 days ago", type: "calendar" }
  ];
  
  const recentMessages = [
    { id: 1, from: "Dr. Katherine Thompson", preview: "How are you feeling today?", time: "2 hours ago" },
    { id: 2, from: "Nurse Williams", preview: "Your prescription has been refilled", time: "3 days ago" }
  ];

  const healthSummary = {
    vitals: {
      bloodPressure: "120/80",
      heartRate: "72 bpm",
      temperature: "98.6°F",
      lastUpdated: "April 23, 2025"
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="w-4 h-4 text-blue-600" />;
      case "lab":
        return <Activity className="w-4 h-4 text-green-600" />;
      case "calendar":
        return <Calendar className="w-4 h-4 text-purple-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6 animate-entrance">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Welcome to Your Health Portal</h1>
        <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-900">
          Patient
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Appointment */}
        <Card className="overflow-hidden border-l-4 border-l-blue-500">
          <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-950 dark:to-transparent">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Upcoming Appointment</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {upcomingAppointment ? (
              <div className="space-y-3">
                <div className="flex items-center text-blue-700 dark:text-blue-400">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="font-medium">{upcomingAppointment.date}, {upcomingAppointment.time}</span>
                </div>
                <p className="text-lg font-medium">{upcomingAppointment.type}</p>
                <p className="text-muted-foreground">{upcomingAppointment.provider}</p>
              </div>
            ) : (
              <p className="text-gray-500">No upcoming appointments</p>
            )}
          </CardContent>
        </Card>
        
        {/* Recent Messages */}
        <Card className="overflow-hidden border-l-4 border-l-indigo-500">
          <CardHeader className="pb-3 bg-gradient-to-r from-indigo-50 to-transparent dark:from-indigo-950 dark:to-transparent">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-100 rounded-full dark:bg-indigo-900">
                <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <CardTitle>Recent Messages</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {recentMessages.length > 0 ? (
              <div className="space-y-4">
                {recentMessages.map(message => (
                  <div key={message.id} className="flex justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <p className="font-medium">{message.from}</p>
                      <p className="text-sm text-muted-foreground truncate">{message.preview}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{message.time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No recent messages</p>
            )}
          </CardContent>
        </Card>
        
        {/* Health Summary */}
        <Card className="overflow-hidden border-l-4 border-l-green-500">
          <CardHeader className="pb-3 bg-gradient-to-r from-green-50 to-transparent dark:from-green-950 dark:to-transparent">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-full dark:bg-green-900">
                <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Health Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Blood Pressure</p>
                  <p className="text-lg font-medium">{healthSummary.vitals.bloodPressure}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Heart Rate</p>
                  <p className="text-lg font-medium">{healthSummary.vitals.heartRate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Temperature</p>
                  <p className="text-lg font-medium">{healthSummary.vitals.temperature}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="text-sm">{healthSummary.vitals.lastUpdated}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Notifications */}
        <Card className="overflow-hidden border-l-4 border-l-purple-500">
          <CardHeader className="pb-3 bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-950 dark:to-transparent">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-full dark:bg-purple-900">
                <Bell className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Your recent notifications and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            {notifications.length > 0 ? (
              <div className="space-y-3">
                {notifications.map(notification => (
                  <div key={notification.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      {getNotificationIcon(notification.type)}
                      <p>{notification.text}</p>
                    </div>
                    <span className="text-xs text-muted-foreground ml-4 whitespace-nowrap">{notification.time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No notifications</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;
