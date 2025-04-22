
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, EyeOff } from "lucide-react";
import { getDaysInMonth } from "../utils/dateUtils";

interface Props {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  showWeekends: boolean;
  onToggleWeekends: () => void;
}

const CalendarSidebar: React.FC<Props> = ({
  currentDate,
  onDateChange,
  collapsed,
  onToggleCollapse,
  showWeekends,
  onToggleWeekends
}) => {
  const [activeTab, setActiveTab] = useState<"calendar" | "filters">("calendar");
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month + 1);
  const firstDay = new Date(year, month, 1).getDay();

  // For improved UX, create a full grid, mark today, allow navigating freely.
  const calendarCells: JSX.Element[] = [];
  for (let i = 0; i < firstDay; ++i) {
    calendarCells.push(<div key={`empty-${i}`} />);
  }
  for (let day = 1; day <= daysInMonth; ++day) {
    const dateObj = new Date(year, month, day);
    const isToday = dateObj.toDateString() === new Date().toDateString();
    const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
    if (!showWeekends && isWeekend) continue;
    calendarCells.push(
      <div
        key={day}
        className={`p-1 text-center text-sm cursor-pointer rounded-lg select-none
          ${isToday ? "bg-blue-200 font-bold text-blue-800" : "hover:bg-blue-100"}
          ${isWeekend ? "text-gray-400" : ""}
        `}
        onClick={() => onDateChange(dateObj)}
        tabIndex={0}
        aria-label={`Select ${dateObj.toDateString()}`}
      >
        {day}
      </div>
    );
  }

  return (
    <aside className={`bg-white h-full flex flex-col border-r transition-all duration-300
      ${collapsed ? "w-12" : "w-72"} z-10 relative`}
      style={{ minWidth: collapsed ? "3rem" : "18rem" }}
    >
      <div className="p-4 flex justify-between items-center border-b">
        {!collapsed && (
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("calendar")}
              className={`px-2 py-1 text-sm rounded
                ${activeTab === "calendar" ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-blue-50"}`}
              tabIndex={0}
            >Calendar</button>
            <button
              onClick={() => setActiveTab("filters")}
              className={`px-2 py-1 text-sm rounded
              ${activeTab === "filters" ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-blue-50"}`}
              tabIndex={0}
            >Filters</button>
          </div>
        )}
        <button
          aria-label="Collapse calendar"
          className="ml-auto rounded-full p-2 border border-gray-200 hover:bg-gray-100"
          onClick={onToggleCollapse}
        >
          <EyeOff stroke="black" />
        </button>
      </div>
      {collapsed ? null :
        <div className="flex-1 overflow-y-auto">
          {activeTab === "calendar" ? (
            <>
              <div className="p-4 border-b">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">
                    {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </h3>
                  <button
                    onClick={() => onDateChange(new Date())}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Today
                  </button>
                </div>
                <div className="flex justify-between mb-2">
                  <button
                    className="p-1.5 rounded hover:bg-blue-100"
                    onClick={() => {
                      const prev = new Date(currentDate);
                      prev.setMonth(prev.getMonth() - 1);
                      // Go to last valid day if needed
                      if (prev.getDate() !== currentDate.getDate()) prev.setDate(1);
                      onDateChange(prev);
                    }}
                    aria-label="Previous month"
                  >
                    <ChevronLeft stroke="black" />
                  </button>
                  <button
                    className="p-1.5 rounded hover:bg-blue-100"
                    onClick={() => {
                      const next = new Date(currentDate);
                      next.setMonth(next.getMonth() + 1);
                      if (next.getDate() !== currentDate.getDate()) next.setDate(1);
                      onDateChange(next);
                    }}
                    aria-label="Next month"
                  >
                    <ChevronRight stroke="black" />
                  </button>
                </div>
                <label className="flex items-center mt-3">
                  <input type="checkbox" checked={showWeekends} onChange={onToggleWeekends} className="mr-2" />
                  Show Weekends
                </label>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-7 text-center font-bold text-xs text-gray-500 mb-1">
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <div key={i} className="py-1">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarCells}
                </div>
              </div>
            </>
          ) : (
            <div className="p-4 space-y-6">
              <FilterSection title="Rooms" options={["Room 1", "Room 2", "Virtual Room"]} />
              <FilterSection title="Appointment Types" options={["Initial Evaluation", "Psychotherapy", "Medication Management"]} />
              <FilterSection title="Providers" options={["Katherine Thompson", "Devon Smith"]} />
            </div>
          )}
        </div>
      }
    </aside>
  );
};

const FilterSection: React.FC<{ title: string; options: string[] }> = ({ title, options }) => (
  <div>
    <h4 className="font-semibold text-xs text-gray-700 mb-2">{title}</h4>
    <div className="space-y-2">
      {options.map(opt => (
        <label key={opt} className="flex items-center">
          <input type="checkbox" className="mr-2"/>
          <span className="text-xs hover:text-blue-600">{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

export default CalendarSidebar;
