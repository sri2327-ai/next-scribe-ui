
"use client";

import { useState } from "react";
import { AppView } from "@/types";
import Sidebar from "./components/Sidebar";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeView, setActiveView] = useState<AppView>("Schedule");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSignOut = () => {
    document.cookie = 'doctorAuth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'doctorEmail=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = '/doctor/signin';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeView={activeView}
        onViewChange={setActiveView}
        onSignOut={handleSignOut}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
};
