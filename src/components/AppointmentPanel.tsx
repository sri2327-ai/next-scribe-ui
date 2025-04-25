import React, { useMemo, useState } from "react";
import { ViewMode, Appointment } from "../types";
import DayView from "./views/DayView";
import WeekView from "./views/WeekView";
import MonthView from "./views/MonthView";
import { ChevronLeft, ChevronRight, Plus, Calendar, Filter, CalendarDays, Printer, FileDown } from "lucide-react";
import AppointmentRequestsDrawer from "./AppointmentRequestsDrawer";
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
    <main className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <div className="p-4 border-b bg-white shadow-sm">
        <div className="flex flex-wrap justify-between gap-x-3 gap-y-2 items-center">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onCreateAppointment}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" /> New Appointment
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              title="Print Schedule"
            >
              <Printer className="w-5 h-5" />
              Print
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              title="Export Appointments"
            >
              <FileDown className="w-5 h-5" />
              Export
            </button>
            <select
              value={selectedPatient}
              onChange={e => setSelectedPatient(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:border-blue-400 transition-colors min-w-[140px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Patients</option>
              {patients.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={goToToday}
              className="px-3 py-1.5 text-sm border rounded-lg text-blue-600 border-blue-300 bg-white hover:bg-blue-50 transition-colors"
            >
              Today
            </button>
            <div className="flex items-center rounded-lg border border-gray-200 bg-white p-1">
              <button
                onClick={() => handleNav("back")}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleNav("forward")}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex space-x-1">
              {(["day", "week", "month"] as ViewMode[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => onViewModeChange(mode)}
                  className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors
                    ${viewMode === mode
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white border border-gray-200 hover:bg-gray-50"}`}
                  aria-current={viewMode === mode ? "page" : undefined}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-light text-gray-900">
              {panelTitle}
            </h1>
            <span className="text-sm text-gray-500">({timeZone})</span>
            <button
              title="View Appointment Requests"
              className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
              onClick={() => setShowRequests(true)}
            >
              <CalendarDays className="w-5 h-5 text-blue-700" />
            </button>
          </div>
        </div>
      </div>
      
      <AppointmentRequestsDrawer open={showRequests} onClose={() => setShowRequests(false)} />
      
      <div className="p-4 overflow-y-auto flex-1 bg-gray-50" onClick={handlePanelBgClick}>
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
