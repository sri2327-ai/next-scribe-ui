
"use client";

import { useState, useEffect } from "react";
import { AppView } from "@/types";
import DoctorSidebar from "./components/DoctorSidebar";
import { useRouter, usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { getCookie } from "cookies-next";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeView, setActiveView] = useState<AppView>("Dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Determine the active view based on pathname
  useEffect(() => {
    if (pathname.includes('/patients')) setActiveView("Patients");
    else if (pathname.includes('/schedule')) setActiveView("Schedule");
    else if (pathname.includes('/tasks')) setActiveView("Tasks");
    else if (pathname.includes('/inbox')) setActiveView("Inbox");
    else if (pathname.includes('/reports')) setActiveView("Reports");
    else if (pathname.includes('/settings')) setActiveView("Settings");
    else if (pathname.includes('/dashboard')) setActiveView("Dashboard");
  }, [pathname]);

  const handleSignOut = () => {
    document.cookie = 'doctorAuth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'doctorEmail=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/doctor/signin');
  };

  const handleViewChange = (view: AppView) => {
    setActiveView(view);
  };

  // Skip rendering the sidebar on auth pages
  const isAuthPage = pathname.includes('/signin') || 
                     pathname.includes('/signup') || 
                     pathname.includes('/forgot-password');

  if (isAuthPage) {
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  }

  return (
    <>
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
      <Toaster />
    </>
  );
}
