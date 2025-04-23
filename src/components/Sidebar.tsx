
import React, { useState } from "react";
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  ListChecks, 
  Inbox,
  BarChart 
} from "lucide-react";
import { AppView } from "../types";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const menuItems: { icon: React.ReactNode; label: string; view: AppView }[] = [
  { icon: <User stroke="black" fill="none" />, label: "Patients", view: "Patients" },
  { icon: <Calendar stroke="black" fill="none" />, label: "Schedule", view: "Schedule" },
  { icon: <ListChecks stroke="black" fill="none" />, label: "Tasks", view: "Tasks" },
  { icon: <Inbox stroke="black" fill="none" />, label: "Inbox", view: "Inbox" }
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
}) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/signin');
  };

  return (
    <aside className={`h-full bg-white shadow-lg flex flex-col transition-all duration-300
      ${collapsed ? "w-16" : "w-64"} z-20 relative`}
    >
      {!collapsed && (
        <div className="flex flex-col items-center px-3 pb-2 pt-5">
          <img
            src="/lovable-uploads/20cdf9a7-452f-4cd4-b1d0-5030d6b36ad9.png"
            alt="S10.AI"
            className="mb-4 transition-all w-32"
            style={{
              filter: "drop-shadow(0 1px 3px rgba(16,16,20,0.08))",
              borderRadius: "16px"
            }}
          />
        </div>
      )}
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
            <span>{item.icon}</span>
            {!collapsed &&
              <span className="ml-4 text-base">{item.label}</span>
            }
          </button>
        ))}
      </nav>
      <div className={`mt-auto flex flex-col items-end gap-0.5 ${collapsed ? "mb-2 pr-1" : "mb-6 px-3"}`}>
        <DropdownMenu open={profileMenuOpen} onOpenChange={setProfileMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="mb-1">
              <User className="text-gray-700" />
              <span className="sr-only">Profile menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mb-1">
            <DropdownMenuItem onClick={() => {
              setProfileMenuOpen(false);
              // You could navigate to a real profile page here
            }}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2" size={16} /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon">
          <Settings className="text-gray-700" />
          <span className="sr-only">Settings</span>
        </Button>
      </div>
      <button
        aria-label="Collapse sidebar"
        onClick={onToggleCollapse}
        className="mt-2 mb-4 self-center text-gray-700 border border-gray-200 bg-white hover:bg-gray-50 p-1 rounded-full shadow-sm transition"
        style={{ display: "flex", alignItems: "center" }}
      >
        {collapsed
          ? <ChevronRight stroke="black" />
          : <ChevronLeft stroke="black" />}
      </button>
    </aside>
  );
};

export default Sidebar;
