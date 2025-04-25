
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Home, MessageSquare, FileText, LogOut, User, ChevronRight, ChevronLeft, Settings, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useTheme } from "@/providers/ThemeProvider";
import { toast } from "sonner";

interface PatientLayoutProps {
  children: React.ReactNode;
  onSignOut: () => void;
}

const PatientLayout: React.FC<PatientLayoutProps> = ({ children, onSignOut }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [patientName] = useState(() => {
    return localStorage.getItem("patientEmail")?.split("@")[0] || "Patient";
  });

  const navItems = [
    { name: "Dashboard", path: "/patient", icon: Home, description: "View your health summary" },
    { name: "Messages", path: "/patient/messages", icon: MessageSquare, description: "Contact your healthcare team" },
    { name: "Health Records", path: "/patient/health-records", icon: FileText, description: "Access your medical records" },
    { name: "Health Tracking", path: "/patient/health-tracking", icon: Heart, description: "Track your health metrics" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div 
        className={`bg-sidebar-background border-r shadow-sm transition-all duration-300 flex flex-col z-10
          ${sidebarCollapsed ? 'w-[4.5rem]' : 'w-72'}`}
      >
        <div className="flex flex-col h-full">
          <div className={`p-4 border-b flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!sidebarCollapsed ? (
              <>
                <img 
                  src="/lovable-uploads/20cdf9a7-452f-4cd4-b1d0-5030d6b36ad9.png"
                  alt="S10.AI" 
                  className="h-8" 
                />
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSidebarCollapsed(true)}
                  className="rounded-full hover:bg-sidebar-accent"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSidebarCollapsed(false)}
                className="rounded-full hover:bg-sidebar-accent"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          <div className={`py-6 px-4 border-b ${sidebarCollapsed ? 'text-center' : ''}`}>
            <div className="flex flex-col items-center mb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <User className="w-6 h-6 text-primary" />
              </div>
              {!sidebarCollapsed && (
                <div className="text-center">
                  <p className="font-medium text-lg">{patientName}</p>
                  <p className="text-sm text-muted-foreground">Patient Portal</p>
                </div>
              )}
            </div>
          </div>
          
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-2 rounded-lg transition-all duration-200 ${
                      location.pathname === item.path
                        ? "bg-sidebar-accent text-primary font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-muted"
                    }`}
                  >
                    <div className="flex items-center justify-center w-8 h-8">
                      <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'text-primary' : ''}`} />
                    </div>
                    {!sidebarCollapsed && (
                      <div className="ml-3">
                        <span>{item.name}</span>
                        {location.pathname === item.path && (
                          <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                        )}
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t">
            {!sidebarCollapsed ? (
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => navigate("/patient/settings")}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={onSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  title="Settings"
                  onClick={() => navigate("/patient/settings")}
                >
                  <Settings className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  title="Sign Out"
                  onClick={onSignOut}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t z-10 backdrop-blur-sm bg-opacity-90 shadow-md">
        <div className="flex justify-around p-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`p-3 rounded-md flex flex-col items-center ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
          <button
            onClick={onSignOut}
            className="p-3 rounded-md flex flex-col items-center text-muted-foreground"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-xs mt-1">Sign Out</span>
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden pb-16 md:pb-0">
        <header className="bg-card/60 backdrop-blur-sm p-4 shadow-sm md:hidden">
          <div className="flex items-center justify-between">
            <img 
              src="/lovable-uploads/20cdf9a7-452f-4cd4-b1d0-5030d6b36ad9.png"
              alt="S10.AI" 
              className="h-8" 
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm font-medium">
                  {patientName}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate("/patient/settings")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onSelect={onSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;
