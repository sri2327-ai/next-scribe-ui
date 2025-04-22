
import React from "react";
import { Appointment } from "../../types";
import { getDaysInMonth } from "../../utils/dateUtils";

const daysHeader = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MonthView: React.FC<{ currentDate: Date; appointments: Appointment[]; showWeekends?: boolean }> = ({
  currentDate, appointments, showWeekends = true
}) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month + 1);
  const firstDay = new Date(year, month, 1).getDay();

  // Generate grid, omitting weekends if needed
  const weeks: JSX.Element[][] = [];
  let cells: JSX.Element[] = [];
  let dayNum = 1;
  // For the correct number of cells in grid
  let totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7;

  for (let i = 0; i < totalCells; ++i) {
    const weekDay = (i % 7);
    // Omit weekends if needed
    if (!showWeekends && (weekDay === 0 || weekDay === 6)) {
      if (i < firstDay || dayNum > daysInMonth) cells.push(<td key={i} />);
      else { dayNum++; }
      if ((i + 1) % 7 === 0) { weeks.push(cells); cells = []; }
      continue;
    }
    if (i < firstDay || dayNum > daysInMonth) {
      cells.push(<td key={i} className="py-2" />);
    } else {
      const dateObj = new Date(year, month, dayNum);
      const dateStr = dateObj.toISOString().split("T")[0];
      const count = appointments.filter(a => a.date === dateStr).length;
      const isToday = dateObj.toDateString() === new Date().toDateString();
      cells.push(
        <td key={i} className="align-top h-16">
          <div className={`rounded-lg p-2 border min-h-[46px] ${isToday ? "ring-2 ring-blue-400" : ""}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-700">{dayNum}</span>
              {count > 0 && <span className="inline-block min-w-[21px] text-center bg-blue-100 rounded-full px-2 text-xs font-bold text-blue-700">{count}</span>}
            </div>
          </div>
        </td>
      );
      dayNum++;
    }
    if ((i + 1) % 7 === 0) {
      weeks.push(cells);
      cells = [];
    }
  }

  return (
    <table className="table-fixed w-full border-separate border-spacing-1 bg-white rounded shadow-sm">
      <thead>
        <tr>
          {daysHeader.map((d, i) =>
            (!showWeekends && (i === 0 || i === 6)) ? null : (
              <th key={d} className="py-1 text-xs font-bold text-gray-500">{d}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {weeks.map((row, i) => (
          <tr key={i}>{row}</tr>
        ))}
      </tbody>
    </table>
  )
};
export default MonthView;
