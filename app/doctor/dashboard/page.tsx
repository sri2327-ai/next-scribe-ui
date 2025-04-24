
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DoctorSidebar from "@/components/doctor/DoctorSidebar";
import { removeCookie } from "cookies-next";
import { AppView } from "@/types";

export default function DoctorDashboard() {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState<AppView>("Patients");

  const handleSignOut = () => {
    removeCookie('doctorAuth');
    removeCookie('doctorEmail');
    router.push('/doctor/signin');
  };

  const renderView = () => {
    switch (activeView) {
      case "Patients":
        return <div className="p-6">Patients View will be implemented here</div>;
      case "Schedule":
        return <div className="p-6">Schedule View will be implemented here</div>;
      case "Tasks":
        return <div className="p-6">Tasks View will be implemented here</div>;
      case "Inbox":
        return <div className="p-6">Inbox View will be implemented here</div>;
      case "Reports":
        return <div className="p-6">Reports View will be implemented here</div>;
      case "Settings":
        return <div className="p-6">Settings View will be implemented here</div>;
      default:
        return <div className="p-6">Patients View will be implemented here</div>;
    }
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
          {renderView()}
        </main>
      </div>
    </div>
  );
}
