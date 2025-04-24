
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DoctorSidebar from "@/app/doctor/components/DoctorSidebar";
import { AppView } from "@/types";
import { mockPatientData } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DoctorDashboard() {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState<AppView>("Patients");

  const handleSignOut = () => {
    document.cookie = 'doctorAuth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'doctorEmail=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/doctor/signin');
  };

  const renderDashboardContent = () => {
    // Active patients count
    const activePatients = mockPatientData.filter(p => p.status === "Active").length;
    // Count patients by clinician
    const clinicianCounts = mockPatientData.reduce((acc: Record<string, number>, patient) => {
      acc[patient.clinician] = (acc[patient.clinician] || 0) + 1;
      return acc;
    }, {});

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{mockPatientData.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{activePatients}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Recent Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">5</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(clinicianCounts).map(([clinician, count]) => (
                  <div key={clinician} className="flex justify-between items-center">
                    <span>{clinician}</span>
                    <span className="font-medium">{count} patients</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="p-2 bg-blue-50 rounded-md">Review lab results - Today</li>
                <li className="p-2 bg-blue-50 rounded-md">Patient follow-up calls - Tomorrow</li>
                <li className="p-2 bg-blue-50 rounded-md">Team meeting - Apr 26</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <DoctorSidebar 
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeView={activeView}
        onViewChange={setActiveView}
        onSignOut={handleSignOut}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {renderDashboardContent()}
        </main>
      </div>
    </div>
  );
}
