
import React, { useMemo } from "react";
import DayView from "./views/DayView";
import WeekView from "./views/WeekView";
import MonthView from "./views/MonthView";
import { ViewMode, Appointment } from "../types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  viewMode: ViewMode;
  currentDate: Date;
  appointments: Appointment[];
  onCreateAppointment: () => void;
  onViewModeChange: (m: ViewMode) => void;
  onDateChange: (d: Date) => void;
  patients: string[];
  showWeekends: boolean;
  onToggleWeekends: () => void;
}

const AppointmentPanel: React.FC<Props> = ({
  viewMode,
  currentDate,
  appointments,
  onCreateAppointment,
  onViewModeChange,
  onDateChange,
  patients,
  showWeekends,
  onToggleWeekends
}) => {
  // Appointment filter
  const [selectedPatient, setSelectedPatient] = React.useState("all");
  const filteredAppointments = useMemo(() =>
    selectedPatient === "all"
      ? appointments
      : appointments.filter(appt =>
          appt.patient?.toLowerCase().includes(selectedPatient.toLowerCase()) ||
          appt.title?.toLowerCase().includes(selectedPatient.toLowerCase())
        ),
    [appointments, selectedPatient]
  );

  // Forward/back navigation for modes
  function handleNav(direction: "back" | "forward") {
    const base = new Date(currentDate);
    if (viewMode === "day") {
      base.setDate(base.getDate() + (direction === "forward" ? 1 : -1));
    } else if (viewMode === "week") {
      base.setDate(base.getDate() + (direction === "forward" ? 7 : -7));
    } else if (viewMode === "month") {
      base.setMonth(base.getMonth() + (direction === "forward" ? 1 : -1));
    }
    onDateChange(base);
  }

  // Today button
  function goToToday() {
    onDateChange(new Date());
  }

  // Title for current range
  let panelTitle: string = "";
  if (viewMode === "day") {
    panelTitle = currentDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  } else if (viewMode === "week") {
    const s = new Date(currentDate);
    const start = new Date(s.setDate(s.getDate() - s.getDay()));
    const end = new Date(start); end.setDate(start.getDate() + 6);
    panelTitle = `Week of ${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  } else if (viewMode === "month") {
    panelTitle = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white/80">
        <div className="flex items-center space-x-2">
          <button
            onClick={onCreateAppointment}
            className="px-4 py-2 bg-blue-600 text-white rounded flex items-center hover:bg-blue-700"
          >
            <span className="font-bold mr-2 text-lg">+</span>
            Add Appointment
          </button>
          <select
            value={selectedPatient}
            onChange={e => setSelectedPatient(e.target.value)}
            className="p-2 border rounded text-sm hover:border-blue-600"
          >
            <option value="all">All Patients</option>
            {patients.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showWeekends}
              onChange={onToggleWeekends}
              className="rounded border-gray-300"
            />
            Show Weekends
          </label>
          <button onClick={goToToday}
            className="ml-2 px-2 py-1 border rounded text-blue-600 border-blue-300 bg-white hover:bg-blue-100">
            Today
          </button>
          <div className="flex items-center space-x-1 ml-2">
            <button
              onClick={() => handleNav("back")}
              className="px-2 py-1 rounded-full hover:bg-blue-100"
            >
              <ChevronLeft stroke="black" />
            </button>
            <button
              onClick={() => handleNav("forward")}
              className="px-2 py-1 rounded-full hover:bg-blue-100"
            >
              <ChevronRight stroke="black" />
            </button>
          </div>
          <div className="flex space-x-1 ml-4">
            {(["day", "week", "month"] as ViewMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                className={`px-3 py-1 rounded text-sm capitalize
                  ${viewMode === mode
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-blue-100"}`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 overflow-y-auto flex-1">
        <h2 className="text-lg font-semibold mb-3">
          {panelTitle}
        </h2>
        {viewMode === "day" && (
          <DayView currentDate={currentDate} appointments={filteredAppointments} />
        )}
        {viewMode === "week" && (
          <WeekView currentDate={currentDate} appointments={filteredAppointments} showWeekends={showWeekends} />
        )}
        {viewMode === "month" && (
          <MonthView currentDate={currentDate} appointments={filteredAppointments} showWeekends={showWeekends} />
        )}
      </div>
    </main>
  );
};

export default AppointmentPanel;
