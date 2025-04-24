
"use client";

import React from 'react';
import { AppView } from '@/types';
import DoctorSidebar from './DoctorSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = () => {
  const [activeView, setActiveView] = React.useState<AppView>("Patients");
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  
  const handleSignOut = () => {
    // Remove auth cookies
    document.cookie = 'doctorAuth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'doctorEmail=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // Redirect to sign in page
    window.location.href = '/doctor/signin';
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
          {/* Page content will be inserted here */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
