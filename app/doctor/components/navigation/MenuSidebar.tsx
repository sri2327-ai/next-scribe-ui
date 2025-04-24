
"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Home,
  Users,
  Calendar,
  MessageSquare,
  FileText,
  Settings,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";

interface MenuSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuSidebar = ({ isOpen, onClose }: MenuSidebarProps) => {
  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/doctor/dashboard" },
    { icon: Users, label: "Patients", href: "/doctor/patients" },
    { icon: Calendar, label: "Calendar", href: "/doctor/calendar" },
    { icon: MessageSquare, label: "Messages", href: "/doctor/messages" },
    { icon: FileText, label: "Documents", href: "/doctor/documents" },
    { icon: Settings, label: "Settings", href: "/doctor/settings" }
  ];

  return (
    <div className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}>
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-semibold">Menu</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link 
            key={item.label} 
            href={item.href}
            className="flex items-center p-2 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600"
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MenuSidebar;
