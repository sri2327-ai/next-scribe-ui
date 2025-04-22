
import React from 'react';
import { AppView } from '../types';

interface MenuSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  activeView: AppView;
  onViewChange: (view: AppView) => void;
}

const MenuSidebar: React.FC<MenuSidebarProps> = ({ 
  isCollapsed, 
  onToggleCollapse, 
  activeView, 
  onViewChange 
}) => {
  const menuItems = [
    { icon: "fa-user", label: "Patients", view: "Patients" as AppView },
    { icon: "fa-calendar", label: "Schedule", view: "Schedule" as AppView },
    { icon: "fa-chart-bar", label: "Reports", view: "Reports" as AppView },
    { icon: "fa-dollar-sign", label: "Billing", view: "Billing" as AppView },
    { icon: "fa-prescription-bottle", label: "e-Prescribe", view: "e-Prescribe" as AppView },
  ];

  return (
    <div className={`bg-white h-full shadow-lg transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"} flex-shrink-0`}>
      <div className="p-4">
        <button onClick={onToggleCollapse} className="text-black">
          <i className={`fas fa-angle-${isCollapsed ? "right" : "left"}`}></i>
        </button>
        {!isCollapsed && <h1 className="text-xl font-bold text-purple-600 mt-2">osmind</h1>}
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onViewChange(item.view)}
            className={`w-full text-left p-2 text-black hover:bg-blue-100 flex items-center ${activeView === item.view ? "bg-blue-200 text-blue-600" : ""} ${isCollapsed ? "justify-center" : ""}`}
          >
            <i className={`far ${item.icon} text-black ${isCollapsed ? "" : "mr-2"}`}></i>
            {!isCollapsed && item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default MenuSidebar;
