
import React from "react";

interface PatientTabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const PatientTabs: React.FC<PatientTabsProps> = ({ tabs, activeTab, setActiveTab }) => (
  <div className="flex border-b mb-1">
    {tabs.map(tab => (
      <button
        key={tab}
        type="button"
        onClick={() => setActiveTab(tab)}
        className={`px-4 py-2 text-sm font-medium border-b-2
          ${activeTab === tab ? "border-blue-600 text-blue-600 underline" : "border-transparent text-gray-500 hover:text-blue-600"}
          transition-colors`}>
        {tab}
      </button>
    ))}
  </div>
);

export default PatientTabs;
