
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Clock, FileImage, MessageSquare, Settings, User, FileSearch } from "lucide-react";

interface PatientTabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const PatientTabs: React.FC<PatientTabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "Notes / Transcript":
        return <FileText className="w-4 h-4" strokeWidth={1.5} />;
      case "Timeline":
        return <Clock className="w-4 h-4" strokeWidth={1.5} />;
      case "Summary":
        return <User className="w-4 h-4" strokeWidth={1.5} />;
      case "Documents":
        return <FileImage className="w-4 h-4" strokeWidth={1.5} />;
      case "Messages":
        return <MessageSquare className="w-4 h-4" strokeWidth={1.5} />;
      case "Settings":
        return <Settings className="w-4 h-4" strokeWidth={1.5} />;
      default:
        return <FileSearch className="w-4 h-4" strokeWidth={1.5} />;
    }
  };

  return (
    <div className="border-b bg-gray-50">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="h-11 w-full justify-start gap-1 bg-transparent p-0 pl-2">
          {tabs.map(tab => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 rounded-none px-4 py-2"
            >
              <span className="mr-2">{getTabIcon(tab)}</span>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default PatientTabs;
