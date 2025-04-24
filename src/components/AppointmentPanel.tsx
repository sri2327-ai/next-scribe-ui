
import React, { useMemo, useState } from "react";
import { ViewMode, Appointment } from "../types";
import DayView from "./views/DayView";
import WeekView from "./views/WeekView";
import MonthView from "./views/MonthView";
import { ChevronLeft, ChevronRight, Plus, Calendar, Filter, CalendarDays, Printer, FileDown } from "lucide-react";
import AppointmentRequestsDrawer from "@/app/doctor/components/AppointmentRequestsDrawer";
import { toast } from "sonner";

function getTimezoneDisplay() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Local Time";
  } catch {
    return "Local Time";
  }
}

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
  const [selectedPatient, setSelectedPatient] = React.useState("all");
  const [showRequests, setShowRequests] = useState(false);

  const filteredAppointments = useMemo(
    () =>
      selectedPatient === "all"
        ? appointments
        : appointments.filter(
            (appt) =>
              appt.patient?.toLowerCase().includes(selectedPatient.toLowerCase()) ||
              appt.title?.toLowerCase().includes(selectedPatient.toLowerCase())
          ),
    [appointments, selectedPatient]
  );

  let panelTitle: string = "";
  if (viewMode === "day") {
    panelTitle = currentDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } else if (viewMode === "week") {
    const s = new Date(currentDate);
    const start = new Date(s.setDate(s.getDate() - s.getDay()));
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    panelTitle = `Week of ${start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  } else if (viewMode === "month") {
    panelTitle = currentDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }

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
  function goToToday() {
    onDateChange(new Date());
  }

  function handlePanelBgClick(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest("[data-appt]")) return;
    onCreateAppointment();
  }

  const timeZone = getTimezoneDisplay();

  const handlePrint = () => {
    window.print();
    toast.success("Printing schedule...");
  };

  const handleExport = () => {
    const appointmentsData = appointments.map(apt => ({
      date: apt.date,
      time: apt.time,
      patient: apt.patient,
      type: apt.type,
      location: apt.location
    }));

    const blob = new Blob([JSON.stringify(appointmentsData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `appointments-${currentDate.toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success("Appointments exported successfully");
  };

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 border-b bg-white/80">
        <div className="flex flex-wrap justify-between gap-x-3 gap-y-2 items-center">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onCreateAppointment}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
            >
              <Plus className="w-5 h-5" /> Add Appointment
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              title="Print Schedule"
            >
              <Printer className="w-5 h-5" />
              Print
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              title="Export Appointments"
            >
              <FileDown className="w-5 h-5" />
              Export
            </button>
            <select
              value={selectedPatient}
              onChange={e => setSelectedPatient(e.target.value)}
              className="p-2 border rounded text-sm hover:border-blue-600 min-w-[140px]"
            >
              <option value="all">All Patients</option>
              {patients.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <label className="flex items-center gap-1 ml-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={showWeekends}
                onChange={onToggleWeekends}
                className="rounded border-gray-300"
              />
              Show Weekends
            </label>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={goToToday}
              className="px-3 py-1 border rounded text-blue-600 border-blue-300 bg-white hover:bg-blue-100 text-sm mr-1"
            >
              Today
            </button>
            <button
              onClick={() => handleNav("back")}
              className="px-2 py-1 rounded-full hover:bg-blue-100"
              aria-label="Back"
            >
              <ChevronLeft stroke="black" />
            </button>
            <button
              onClick={() => handleNav("forward")}
              className="px-2 py-1 rounded-full hover:bg-blue-100"
              aria-label="Forward"
            >
              <ChevronRight stroke="black" />
            </button>
            <div className="flex space-x-1 ml-2">
              {(["day", "week", "month"] as ViewMode[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => onViewModeChange(mode)}
                  className={`px-3 py-1 rounded text-sm capitalize
                    ${viewMode === mode
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-blue-100"}`}
                  aria-current={viewMode === mode ? "page" : undefined}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 gap-y-2">
          <span className="flex items-center gap-2">
            <span
              className="text-3xl sm:text-4xl font-light leading-tight text-gray-900"
              style={{ letterSpacing: "0.01em" }}
            >
              {panelTitle}
              <span className="ml-3 text-base font-normal text-gray-500 whitespace-nowrap">
                ({timeZone})
              </span>
            </span>
            <button
              title="View Appointment Requests"
              className="ml-4 p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition"
              onClick={() => setShowRequests(true)}
            >
              <CalendarDays className="w-6 h-6 text-blue-700" />
            </button>
          </span>
        </div>
      </div>
      <AppointmentRequestsDrawer open={showRequests} onClose={() => setShowRequests(false)} />
      <div
        className="p-4 overflow-y-auto flex-1"
        onClick={handlePanelBgClick}
        style={{ cursor: "pointer" }}
      >
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
