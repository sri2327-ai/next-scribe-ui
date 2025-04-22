
import React, { useState } from 'react';
import MenuSidebar from './components/MenuSidebar';
import CalendarAndFilters from './components/CalendarAndFilters';
import AppointmentView from './components/AppointmentView';
import PatientsView from './components/PatientsView';
import EventPopup from './components/EventPopup';
import { mockAppointments, patients, appointmentTypes, providers } from './data/mockData';
import { Appointment, AppView, ViewMode } from './types';
import { formatDate } from './utils/dateUtils';
import './index.css';

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [activeView, setActiveView] = useState<AppView>('Schedule');
  const [menuCollapsed, setMenuCollapsed] = useState<boolean>(false);
  const [calendarCollapsed, setCalendarCollapsed] = useState<boolean>(false);
  const [showWeekends, setShowWeekends] = useState<boolean>(true);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [showEventPopup, setShowEventPopup] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>('day');

  const handleCreateAppointment = (newAppointment: any) => {
    setAppointments([...appointments, {
      ...newAppointment,
      id: Math.max(...appointments.map(a => a.id)) + 1,
      date: newAppointment.date,
      time: `${newAppointment.startTime} - ${newAppointment.endTime}`,
      color: newAppointment.appointmentType === 'Psychotherapy' ? 'purple-500' : 
              newAppointment.appointmentType === 'Medication Management' ? 'blue-600' : 'teal-500',
      type: newAppointment.appointmentType
    }]);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <MenuSidebar
        isCollapsed={menuCollapsed}
        onToggleCollapse={() => setMenuCollapsed(!menuCollapsed)}
        activeView={activeView}
        onViewChange={setActiveView}
      />
      
      {activeView === 'Schedule' ? (
        <>
          <CalendarAndFilters
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            isCollapsed={calendarCollapsed}
            onToggleCollapse={() => setCalendarCollapsed(!calendarCollapsed)}
            showWeekends={showWeekends}
            onToggleWeekends={() => setShowWeekends(!showWeekends)}
          />
          <AppointmentView
            viewMode={viewMode}
            currentDate={currentDate}
            appointments={appointments}
            onCreateAppointment={() => setShowEventPopup(true)}
            onViewModeChange={setViewMode}
          />
        </>
      ) : activeView === 'Patients' ? (
        <PatientsView />
      ) : (
        <div className="flex-1 p-4">
          <h2 className="text-xl font-semibold mb-4">{activeView} View</h2>
          <p>This is the {activeView.toLowerCase()} view content</p>
        </div>
      )}

      {showEventPopup && (
        <EventPopup
          isOpen={showEventPopup}
          onClose={() => setShowEventPopup(false)}
          onSave={handleCreateAppointment}
          patients={patients}
          staff={providers}
          appointmentTypes={appointmentTypes}
        />
      )}
    </div>
  );
};

export default App;
