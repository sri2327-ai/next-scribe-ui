
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { getDaysInMonth } from "../utils/dateUtils";

interface CalendarPanelProps {
  currentDate: Date;
  onDateChange: (d: Date) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const years = Array.from({length: 16}, (_,i) => 2018 + i);
const monthsLong = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const CalendarPanel: React.FC<CalendarPanelProps> = ({
  currentDate, onDateChange, collapsed, onToggleCollapse
}) => {
  const [selectMonth, setSelectMonth] = useState(currentDate.getMonth());
  const [selectYear, setSelectYear] = useState(currentDate.getFullYear());
  const daysInMonth = getDaysInMonth(selectYear, selectMonth + 1);
  const firstDay = new Date(selectYear, selectMonth, 1).getDay();

  // Handle picking a month/year and updating calendar
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

  // Grid
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
        <div className="flex flex-col flex-1">
          <div className="p-4 border-b">
            <div className="flex items-center justify-center mb-2 space-x-2">
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
              {/* Month Dropdown */}
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
                <ChevronDown className="pointer-events-none absolute top-2 right-2 w-4 h-4 text-gray-400"/>
              </div>
              {/* Year Dropdown */}
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

export default CalendarPanel;
