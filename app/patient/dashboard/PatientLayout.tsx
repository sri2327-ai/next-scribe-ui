
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, MessageSquare, FileText, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { getCookie, deleteCookie } from "cookies-next";

interface PatientLayoutProps {
  children: React.ReactNode;
}

const PatientLayout = ({ children }: PatientLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [patientName] = useState(() => {
    const email = getCookie('patientEmail');
    return email ? email.toString().split("@")[0] : "Patient";
  });

  const handleSignOut = () => {
    deleteCookie('patientAuth');
    deleteCookie('patientEmail');
    router.push('/patient/signin');
  };

  const navItems = [
    { name: "Dashboard", path: "/patient/dashboard", icon: Home },
    { name: "Messages", path: "/patient/messages", icon: MessageSquare },
    { name: "Health Records", path: "/patient/health-records", icon: FileText },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm hidden md:block">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <img 
              src="/lovable-uploads/20cdf9a7-452f-4cd4-b1d0-5030d6b36ad9.png"
              alt="S10.AI" 
              className="w-24 mx-auto mb-4" 
            />
            <div className="text-center">
              <p className="font-medium">Welcome,</p>
              <p className="text-blue-600">{patientName}</p>
            </div>
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center p-3 rounded-lg ${
                      pathname === item.path
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full flex items-center justify-center">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => router.push("/patient/settings")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-10">
        <div className="flex justify-around p-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`p-2 rounded-md flex flex-col items-center ${
                pathname === item.path
                  ? "text-blue-600"
                  : "text-gray-500"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
          <button
            onClick={handleSignOut}
            className="p-2 rounded-md flex flex-col items-center text-gray-500"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-xs mt-1">Sign Out</span>
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden pb-16 md:pb-0">
        <header className="bg-white p-4 shadow-sm md:hidden">
          <img 
            src="/lovable-uploads/20cdf9a7-452f-4cd4-b1d0-5030d6b36ad9.png"
            alt="S10.AI" 
            className="h-8" 
          />
        </header>
        
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;
