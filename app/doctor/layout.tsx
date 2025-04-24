
"use client";

import { useState } from "react";
import { AppView } from "@/types";
import DoctorSidebar from "./components/DoctorSidebar";
import { useRouter } from "next/navigation";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [activeView, setActiveView] = useState<AppView>("Dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSignOut = () => {
    document.cookie = 'doctorAuth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'doctorEmail=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/doctor/signin');
  };

  const handleViewChange = (view: AppView) => {
    setActiveView(view);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <DoctorSidebar 
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeView={activeView}
        onViewChange={handleViewChange}
        onSignOut={handleSignOut}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
