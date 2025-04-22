
import React from "react";
import { User, Calendar, BarChart, DollarSign, Pill, ChevronLeft, ChevronRight } from "lucide-react";
import { AppView } from "../types";

const menuItems: { icon: React.ReactNode; label: string; view: AppView }[] = [
  { icon: <User stroke="black" />, label: "Patients", view: "Patients" },
  { icon: <Calendar stroke="black" />, label: "Schedule", view: "Schedule" },
  { icon: <BarChart stroke="black" />, label: "Reports", view: "Reports" },
  { icon: <DollarSign stroke="black" />, label: "Billing", view: "Billing" },
  { icon: <Pill stroke="black" />, label: "e-Prescribe", view: "e-Prescribe" }
];

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
}) => (
  <aside className={`h-full bg-white shadow-lg flex flex-col transition-all duration-300
    ${collapsed ? "w-16" : "w-64"} z-20 relative`}
  >
    <div className="flex flex-col items-center px-3 pb-2 pt-5">
      <button
        aria-label="Collapse sidebar"
        onClick={onToggleCollapse}
        className="absolute top-4 right-3 text-gray-700 border border-gray-200 bg-white hover:bg-gray-50 p-1 rounded-full shadow-sm transition"
      >
        {collapsed
          ? <ChevronRight stroke="black" />
          : <ChevronLeft stroke="black" />}
      </button>
      <img
        src="/lovable-uploads/20cdf9a7-452f-4cd4-b1d0-5030d6b36ad9.png"
        alt="S10.AI"
        className={`mb-4 transition-all ${collapsed ? "w-9" : "w-32"}`}
        style={{
          filter: "drop-shadow(0 1px 3px rgba(16,16,20,0.08))",
          borderRadius: collapsed ? "12px" : "16px"
        }}
      />
    </div>
    <nav className="mt-7 flex-1 flex flex-col space-y-1 items-center">
      {menuItems.map(item => (
        <button
          key={item.label}
          onClick={() => onViewChange(item.view)}
          className={`w-full flex items-center transition cursor-pointer px-3 py-2 rounded-lg mb-1
            hover:bg-blue-50
            ${collapsed ? "justify-center" : ""}
            ${activeView === item.view ? "bg-blue-100 text-blue-600 font-semibold" : "text-slate-800"}
          `}
        >
          <span className="">{item.icon}</span>
          {!collapsed &&
            <span className="ml-4 text-base">{item.label}</span>
          }
        </button>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
