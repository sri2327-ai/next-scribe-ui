
import React, { useState } from "react";
import DayView from "./views/DayView";
import WeekView from "./views/WeekView";
import MonthView from "./views/MonthView";
import { ViewMode, Appointment } from "../types";

interface Props {
  viewMode: ViewMode;
  currentDate: Date;
  appointments: Appointment[];
  onCreateAppointment: () => void;
  onViewModeChange: (m: ViewMode) => void;
  patients: string[];
}

const AppointmentPanel: React.FC<Props> = ({
  viewMode,
  currentDate,
  appointments,
  onCreateAppointment,
  onViewModeChange,
  patients
}) => {
  const [selectedPatient, setSelectedPatient] = useState("all");
  const filteredAppointments = selectedPatient === "all"
    ? appointments
    : appointments.filter(appt =>
        appt.patient?.toLowerCase().includes(selectedPatient.toLowerCase()) ||
        appt.title?.toLowerCase().includes(selectedPatient.toLowerCase())
      );

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
        <div className="flex space-x-1">
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
      <div className="p-4 overflow-y-auto flex-1">
        <h2 className="text-lg font-semibold mb-3">
          {viewMode === "day"
            ? currentDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
            : viewMode === "week"
              ? (() => {
                  const s = new Date(currentDate);
                  const start = new Date(s.setDate(s.getDate() - s.getDay()));
                  const end = new Date(start);
                  end.setDate(start.getDate() + 6);
                  return `Week of ${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
                })()
              : viewMode === "month"
                ? currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })
                : null}
        </h2>
        {viewMode === "day" && (
          <DayView currentDate={currentDate} appointments={filteredAppointments} />
        )}
        {viewMode === "week" && (
          <WeekView currentDate={currentDate} appointments={filteredAppointments} />
        )}
        {viewMode === "month" && (
          <MonthView currentDate={currentDate} appointments={filteredAppointments} />
        )}
      </div>
    </main>
  );
};
export default AppointmentPanel;
