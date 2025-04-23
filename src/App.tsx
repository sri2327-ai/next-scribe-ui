
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CalendarPanel from "./components/CalendarPanel";
import AppointmentPanel from "./components/AppointmentPanel";
import PatientsPanel from "./components/PatientsPanel";
import EventPopup from "./components/EventPopup";
import { Appointment, AppView, ViewMode } from "./types";
import { mockAppointments, patients } from "./data/mockData";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import "./index.css";
import ReportsPanel from "./components/ReportsPanel";
import PatientPortal from "./pages/PatientPortal";

const MainApp = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [activeView, setActiveView] = useState<AppView>("Schedule");
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [calendarCollapsed, setCalendarCollapsed] = useState(false);
  const [showWeekends, setShowWeekends] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("day");

  const handleCreateAppointment = (newAppt: any) => {
    setAppointments([
      ...appointments,
      {
        ...newAppt,
        id: Math.max(0, ...appointments.map(a => a.id)) + 1,
        date: newAppt.date,
        time: `${newAppt.startTime} - ${newAppt.endTime}`,
        color: newAppt.appointmentType === "Psychotherapy"
          ? "purple-500"
          : newAppt.appointmentType === "Medication Management"
            ? "blue-600"
            : "teal-500",
        type: newAppt.appointmentType
      }
    ]);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-slate-100 to-purple-50">
      <Sidebar
        collapsed={menuCollapsed}
        onToggleCollapse={() => setMenuCollapsed((c) => !c)}
        activeView={activeView}
        onViewChange={setActiveView}
      />
      {activeView === "Schedule" ? (
        <>
          <CalendarPanel
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            collapsed={calendarCollapsed}
            onToggleCollapse={() => setCalendarCollapsed(c => !c)}
          />
          <AppointmentPanel
            viewMode={viewMode}
            currentDate={currentDate}
            appointments={appointments}
            onCreateAppointment={() => setShowEventPopup(true)}
            onViewModeChange={setViewMode}
            onDateChange={setCurrentDate}
            patients={patients}
            showWeekends={showWeekends}
            onToggleWeekends={() => setShowWeekends(w => !w)}
          />
        </>
      ) : activeView === "Patients" ? (
        <PatientsPanel />
      ) : activeView === "Reports" ? (
        <ReportsPanel />
      ) : (
        <div className="flex-1 flex justify-center items-center">
          <div className="bg-white shadow mt-24 p-12 rounded-xl text-center">
            <h2 className="text-2xl font-semibold mb-4">{activeView} View</h2>
            <p>This is the {activeView.toLowerCase()} view content.</p>
          </div>
        </div>
      )}
      <EventPopup
        isOpen={showEventPopup}
        onClose={() => setShowEventPopup(false)}
        onSave={handleCreateAppointment}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/patient/*" element={<PatientPortal />} />
      <Route path="/" element={<MainApp />} />
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
};

export default App;
