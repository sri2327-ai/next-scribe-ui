
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

  // Month/year change handlers
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

  // Calendar grid
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
      ${collapsed ? "w-12" : "w-72"} z-10 relative`}
      style={{ minWidth: collapsed ? "3rem" : "18rem" }}>
      {!collapsed &&
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Tabs */}
          <div className="flex flex-row border-b pl-2 pt-2 gap-2 mb-2">
            <button
              className={`px-2 py-1 text-xs rounded ${activeTab === "calendar" ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-blue-50"}`}
              onClick={() => setActiveTab("calendar")}
            >Calendar</button>
            <button
              className={`px-2 py-1 text-xs rounded ${activeTab === "filters" ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-blue-50"}`}
              onClick={() => setActiveTab("filters")}
            >Filters</button>
          </div>
          <div className="flex-1 min-h-0 overflow-auto">
            {activeTab === "calendar" ? (
              <div className="p-4 pb-2 border-b">
                <div className="flex flex-row items-center justify-between mb-2">
                  <button
                    className="p-1.5 rounded hover:bg-blue-100"
                    onClick={() => {
                      const prev = new Date(currentDate);
                      prev.setMonth(prev.getMonth() - 1);
                      onDateChange(prev);
                    }}
                    aria-label="Previous month"
                  >
                    <ChevronLeft stroke="black" />
                  </button>
                  <div className="flex items-center gap-1">
                    <div className="relative">
                      <select
                        value={selectMonth}
                        onChange={e => handleMonthChange(Number(e.target.value))}
                        className="appearance-none font-semibold px-2 pr-5 py-1 rounded border border-gray-200 bg-white mr-1"
                      >
                        {monthsLong.map((m, i) => (
                          <option value={i} key={m}>{m}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute top-2 right-2 w-4 h-4 text-gray-400" />
                    </div>
                    <div className="relative">
                      <select
                        value={selectYear}
                        onChange={e => handleYearChange(Number(e.target.value))}
                        className="appearance-none font-semibold px-2 pr-5 py-1 rounded border border-gray-200 bg-white"
                      >
                        {years.map(y => (
                          <option value={y} key={y}>{y}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute top-2 right-2 w-4 h-4 text-gray-400"/>
                    </div>
                  </div>
                  <button
                    className="p-1.5 rounded hover:bg-blue-100"
                    onClick={() => {
                      const next = new Date(currentDate);
                      next.setMonth(next.getMonth() + 1);
                      onDateChange(next);
                    }}
                    aria-label="Next month"
                  >
                    <ChevronRight stroke="black" />
                  </button>
                </div>
                <div className="grid grid-cols-7 text-center font-bold text-xs text-gray-500 mb-1">
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <div key={i} className="py-1">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarCells}
                </div>
              </div>
            ) : (
              <div className="p-4 pt-0 space-y-6">
                {/* Filters just below calendar in scrollable panel (move FilterSection here) */}
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
      {/* Collapse Button at bottom */}
      <button
        aria-label="Collapse calendar"
        className="mt-auto mb-3 mx-auto border border-gray-300 rounded-full p-2 hover:bg-gray-200"
        onClick={onToggleCollapse}
      >
        {collapsed ? <ChevronRight stroke="black" /> : <ChevronLeft stroke="black" />}
      </button>
    </aside>
  );
};

// Enhanced FilterSection with Select All/Unselect All
const FilterSection: React.FC<{ title: string; options: string[] }> = ({ title, options }) => {
  const [checked, setChecked] = React.useState<boolean[]>(Array(options.length).fill(false));
  const allChecked = checked.every(Boolean);
  const someChecked = checked.some(Boolean);

  function setAll(val: boolean) {
    setChecked(Array(options.length).fill(val));
  }
  function handleOpt(idx: number) {
    setChecked(checked => checked.map((v, i) => i === idx ? !v : v));
  }

  return (
    <div>
      <h4 className="font-semibold text-xs text-gray-700 mb-2">{title}</h4>
      <div className="flex items-center gap-2 mb-1">
        <button
          onClick={() => setAll(true)}
          className="px-2 py-0.5 rounded bg-blue-100 text-xs text-blue-700 hover:bg-blue-200"
          disabled={allChecked}
        >
          Select All
        </button>
        <button
          onClick={() => setAll(false)}
          className="px-2 py-0.5 rounded bg-gray-100 text-xs text-gray-700 hover:bg-gray-200"
          disabled={!someChecked}
        >
          Unselect All
        </button>
      </div>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <label key={opt} className="flex items-center">
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() => handleOpt(i)}
              className="mr-2"
            />
            <span className="text-xs hover:text-blue-600">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CalendarPanel;
