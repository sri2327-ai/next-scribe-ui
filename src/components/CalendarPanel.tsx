import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { getDaysInMonth } from "../utils/dateUtils";

const years = Array.from({length: 16}, (_,i) => 2018 + i);
const monthsLong = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface CalendarPanelProps {
  currentDate: Date;
  onDateChange: (d: Date) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const CalendarPanel: React.FC<CalendarPanelProps> = ({
  currentDate, onDateChange, collapsed, onToggleCollapse
}) => {
  const [selectMonth, setSelectMonth] = useState(currentDate.getMonth());
  const [selectYear, setSelectYear] = useState(currentDate.getFullYear());
  const [activeTab, setActiveTab] = useState<"calendar" | "filters">("calendar");
  const daysInMonth = getDaysInMonth(selectYear, selectMonth + 1);
  const firstDay = new Date(selectYear, selectMonth, 1).getDay();

  function handleMonthChange(monthIdx: number) {
    setSelectMonth(monthIdx);
    const newDate = new Date(selectYear, monthIdx, 1);
    onDateChange(newDate);
  }
  function handleYearChange(year: number) {
    setSelectYear(year);
    const newDate = new Date(year, selectMonth, 1);
    onDateChange(newDate);
  }
  React.useEffect(() => {
    setSelectMonth(currentDate.getMonth());
    setSelectYear(currentDate.getFullYear());
  }, [currentDate]);

  const calendarCells = [];
  for (let i = 0; i < firstDay; ++i) {
    calendarCells.push(<div key={`empty-${i}`} />);
  }
  for (let day = 1; day <= daysInMonth; ++day) {
    const dateObj = new Date(selectYear, selectMonth, day);
    const isCurrent = dateObj.toDateString() === currentDate.toDateString();
    calendarCells.push(
      <div
        key={day}
        onClick={() => onDateChange(dateObj)}
        className={`p-1 text-center text-sm cursor-pointer select-none
          ${isCurrent ? "bg-blue-100 rounded-full font-bold text-blue-700" : "hover:bg-blue-100"}`
        }
      >
        {day}
      </div>
    );
  }

  return (
    <aside className={`bg-white h-full flex flex-col border-r transition-all duration-300
      ${collapsed ? "w-12" : "w-72"} z-10 relative shadow-lg`}
      style={{ minWidth: collapsed ? "3rem" : "18rem" }}>
      {!collapsed &&
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex flex-row border-b pl-2 pt-2 gap-2 mb-2">
            <button
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                activeTab === "calendar" 
                  ? "bg-blue-100 text-blue-700 font-medium shadow-sm" 
                  : "hover:bg-blue-50"
              }`}
              onClick={() => setActiveTab("calendar")}
            >
              Calendar
            </button>
            <button
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                activeTab === "filters" 
                  ? "bg-blue-100 text-blue-700 font-medium shadow-sm" 
                  : "hover:bg-blue-50"
              }`}
              onClick={() => setActiveTab("filters")}
            >
              Filters
            </button>
          </div>
          <div className="flex-1 min-h-0 overflow-auto">
            {activeTab === "calendar" ? (
              <div className="p-4 pb-2 border-b">
                <div className="flex flex-row items-center justify-between mb-4">
                  <button
                    className="p-2 rounded-lg hover:bg-blue-100 transition-colors"
                    onClick={() => {
                      const prev = new Date(currentDate);
                      prev.setMonth(prev.getMonth() - 1);
                      onDateChange(prev);
                    }}
                  >
                    <ChevronLeft className="w-5 h-5 text-blue-700" />
                  </button>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <select
                        value={selectMonth}
                        onChange={e => handleMonthChange(Number(e.target.value))}
                        className="appearance-none font-medium px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:border-blue-400 transition-colors cursor-pointer pr-8"
                      >
                        {monthsLong.map((m, i) => (
                          <option value={i} key={m}>{m}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute top-2.5 right-2 w-4 h-4 text-gray-400" />
                    </div>
                    <div className="relative">
                      <select
                        value={selectYear}
                        onChange={e => handleYearChange(Number(e.target.value))}
                        className="appearance-none font-medium px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:border-blue-400 transition-colors cursor-pointer pr-8"
                      >
                        {years.map(y => (
                          <option value={y} key={y}>{y}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute top-2.5 right-2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <button
                    className="p-2 rounded-lg hover:bg-blue-100 transition-colors"
                    onClick={() => {
                      const next = new Date(currentDate);
                      next.setMonth(next.getMonth() + 1);
                      onDateChange(next);
                    }}
                  >
                    <ChevronRight className="w-5 h-5 text-blue-700" />
                  </button>
                </div>
                <div className="grid grid-cols-7 text-center font-semibold text-sm text-gray-600 mb-2">
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <div key={i} className="py-2">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarCells}
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-6">
                <FilterSection
                  title="Rooms"
                  options={["Room 1", "Room 2", "Virtual Room"]}
                />
                <FilterSection
                  title="Appointment Types"
                  options={["Initial Evaluation", "Psychotherapy", "Medication Management"]}
                />
                <FilterSection
                  title="Providers"
                  options={["Katherine Thompson", "Devon Smith"]}
                />
              </div>
            )}
          </div>
        </div>
      }
      <button
        aria-label="Collapse calendar"
        className="mt-auto mb-3 mx-auto border border-gray-300 rounded-full p-2 hover:bg-blue-100 transition-colors"
        onClick={onToggleCollapse}
      >
        {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>
    </aside>
  );
};

const FilterSection: React.FC<{ title: string; options: string[] }> = ({ title, options }) => {
  const [checked, setChecked] = React.useState<boolean[]>(Array(options.length).fill(false));
  const allChecked = checked.every(Boolean);
  const someChecked = checked.some(Boolean);

  function setAll(val: boolean) {
    setChecked(Array(options.length).fill(val));
  }
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <h4 className="font-semibold text-sm text-gray-700 mb-3 flex items-center justify-between">
        <span>{title}</span>
        <div className="flex gap-2">
          <button
            onClick={() => setAll(true)}
            className={`px-2 py-1 text-xs rounded-md transition-colors ${
              allChecked 
                ? "bg-gray-100 text-gray-500" 
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
            disabled={allChecked}
          >
            Select All
          </button>
          <button
            onClick={() => setAll(false)}
            className={`px-2 py-1 text-xs rounded-md transition-colors ${
              !someChecked 
                ? "bg-gray-100 text-gray-500" 
                : "bg-red-100 text-red-700 hover:bg-red-200"
            }`}
            disabled={!someChecked}
          >
            Clear All
          </button>
        </div>
      </h4>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <label key={opt} className="flex items-center group">
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() => {
                const newChecked = [...checked];
                newChecked[i] = !newChecked[i];
                setChecked(newChecked);
              }}
              className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out border-2 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
              {opt}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CalendarPanel;
