
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, EyeOff, Calendar, Filter } from "lucide-react";
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

  // Add select all/unselect all for each filter group
  // Store checked set for each filter section for toggling all/none
  const [roomChecks, setRoomChecks] = useState<string[]>([]);
  const [apptTypeChecks, setApptTypeChecks] = useState<string[]>([]);
  const [provChecks, setProvChecks] = useState<string[]>([]);

  const filterOptions = {
    rooms: ["Room 1", "Room 2", "Virtual Room"],
    apptTypes: ["Initial Evaluation", "Psychotherapy", "Medication Management"],
    providers: ["Katherine Thompson", "Devon Smith"],
  };

  function handleToggleSection(
    section: "rooms" | "apptTypes" | "providers",
    checked: boolean
  ) {
    if (section === "rooms")
      setRoomChecks(checked ? [...filterOptions.rooms] : []);
    if (section === "apptTypes")
      setApptTypeChecks(checked ? [...filterOptions.apptTypes] : []);
    if (section === "providers")
      setProvChecks(checked ? [...filterOptions.providers] : []);
  }

  function handleToggleOption(
    section: "rooms" | "apptTypes" | "providers",
    opt: string
  ) {
    if (section === "rooms") {
      setRoomChecks((prev) =>
        prev.includes(opt)
          ? prev.filter((v) => v !== opt)
          : [...prev, opt]
      );
    }
    if (section === "apptTypes") {
      setApptTypeChecks((prev) =>
        prev.includes(opt)
          ? prev.filter((v) => v !== opt)
          : [...prev, opt]
      );
    }
    if (section === "providers") {
      setProvChecks((prev) =>
        prev.includes(opt)
          ? prev.filter((v) => v !== opt)
          : [...prev, opt]
      );
    }
  }

  return (
    <aside
      className={`bg-white h-full flex flex-col border-r transition-all duration-300
      ${collapsed ? "w-12" : "w-72"} z-10 relative`}
      style={{ minWidth: collapsed ? "3rem" : "18rem" }}
    >
      <div className="p-4 flex items-center border-b justify-between">
        {/* Tabs with icons */}
        {!collapsed && (
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("calendar")}
              className={`px-2 py-1 text-sm rounded flex gap-1 items-center
                ${activeTab === "calendar" ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-blue-50"}`}
              tabIndex={0}
            >
              <Calendar className="w-4 h-4" />
              Calendar
            </button>
            <button
              onClick={() => setActiveTab("filters")}
              className={`px-2 py-1 text-sm rounded flex gap-1 items-center
              ${activeTab === "filters" ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-blue-50"}`}
              tabIndex={0}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
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
      {collapsed ? null : (
        <div className="flex-1 overflow-y-auto">
          {activeTab === "calendar" ? (
            <>
              <div className="p-4 border-b">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">
                    {currentDate.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
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
                      if (prev.getDate() !== currentDate.getDate())
                        prev.setDate(1);
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
                      if (next.getDate() !== currentDate.getDate())
                        next.setDate(1);
                      onDateChange(next);
                    }}
                    aria-label="Next month"
                  >
                    <ChevronRight stroke="black" />
                  </button>
                </div>
                <label className="flex items-center mt-3">
                  <input
                    type="checkbox"
                    checked={showWeekends}
                    onChange={onToggleWeekends}
                    className="mr-2"
                  />
                  Show Weekends
                </label>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-7 text-center font-bold text-xs text-gray-500 mb-1">
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <div key={i} className="py-1">
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarCells}
                </div>
              </div>
            </>
          ) : (
            <div className="p-4 space-y-6">
              <FilterSection
                title="Rooms"
                options={filterOptions.rooms}
                checked={roomChecks}
                onCheckChange={(opt) => handleToggleOption("rooms", opt)}
                onSelectAll={isAll => handleToggleSection("rooms", isAll)}
              />
              <FilterSection
                title="Appointment Types"
                options={filterOptions.apptTypes}
                checked={apptTypeChecks}
                onCheckChange={(opt) => handleToggleOption("apptTypes", opt)}
                onSelectAll={isAll => handleToggleSection("apptTypes", isAll)}
              />
              <FilterSection
                title="Providers"
                options={filterOptions.providers}
                checked={provChecks}
                onCheckChange={(opt) => handleToggleOption("providers", opt)}
                onSelectAll={isAll => handleToggleSection("providers", isAll)}
              />
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

const FilterSection: React.FC<{
  title: string;
  options: string[];
  checked: string[];
  onCheckChange: (opt: string) => void;
  onSelectAll: (isAll: boolean) => void;
}> = ({ title, options, checked, onCheckChange, onSelectAll }) => {
  const allChecked = options.every(opt => checked.includes(opt));
  const noneChecked = options.every(opt => !checked.includes(opt));
  return (
    <div>
      <h4 className="font-semibold text-xs text-gray-700 mb-2 flex items-center justify-between">
        <span>{title}</span>
        <button
          className="text-xs text-blue-600 hover:underline ml-2"
          onClick={() => onSelectAll(!allChecked)}
        >
          {allChecked ? "Unselect All" : "Select All"}
        </button>
      </h4>
      <div className="space-y-2">
        {options.map(opt => (
          <label key={opt} className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={checked.includes(opt)}
              onChange={() => onCheckChange(opt)}
            />
            <span className="text-xs hover:text-blue-600">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CalendarSidebar;
