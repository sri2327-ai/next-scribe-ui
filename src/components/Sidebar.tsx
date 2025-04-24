
import React from 'react';
import { AppView } from '../types';
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  activeView: AppView;
  onViewChange: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  activeView,
  onViewChange
}) => {
  const menuItems = [
    { icon: "fa-calendar", label: "Schedule", view: "Schedule" as AppView },
    { icon: "fa-user", label: "Patients", view: "Patients" as AppView },
    { icon: "fa-tasks", label: "Tasks", view: "Tasks" as AppView },
    { icon: "fa-inbox", label: "Inbox", view: "Inbox" as AppView },
    { icon: "fa-chart-bar", label: "Reports", view: "Reports" as AppView },
    { icon: "fa-cog", label: "Settings", view: "Settings" as AppView },
  ];

  return (
    <div className={`bg-white h-full shadow-lg transition-all duration-300 ${collapsed ? "w-16" : "w-64"} flex-shrink-0`}>
      <div className="p-4 flex items-center justify-between">
        <div>
          <button onClick={onToggleCollapse} className="text-black">
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>
        {!collapsed && <h1 className="text-xl font-bold text-purple-600 mt-2 ml-3">osmind</h1>}
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onViewChange(item.view)}
            className={`w-full text-left p-2 text-black hover:bg-blue-100 flex items-center ${activeView === item.view ? "bg-blue-200 text-blue-600" : ""} ${collapsed ? "justify-center" : ""}`}
          >
            <i className={`far ${item.icon} text-black ${collapsed ? "" : "mr-2"}`}></i>
            {!collapsed && item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
