
"use client";

import React, { useState } from 'react';
import { Appointment, ViewMode } from '@/types';
import DayView from './views/DayView';
import WeekView from './views/WeekView';
import MonthView from './views/MonthView';

interface AppointmentViewProps {
  viewMode: ViewMode;
  currentDate: Date;
  appointments: Appointment[];
  onCreateAppointment: () => void;
  onViewModeChange: (mode: ViewMode) => void;
  patients: string[];
}

const AppointmentView: React.FC<AppointmentViewProps> = ({ 
  viewMode, 
  currentDate, 
  appointments, 
  onCreateAppointment,
  onViewModeChange,
  patients
}) => {
  const [selectedPatient, setSelectedPatient] = useState<string>('all');

  const filteredAppointments = selectedPatient === 'all' 
    ? appointments 
    : appointments.filter(appt => 
        appt.patient?.toLowerCase().includes(selectedPatient.toLowerCase()) ||
        appt.title?.toLowerCase().includes(selectedPatient.toLowerCase())
      );

  const renderView = () => {
    switch (viewMode) {
      case 'day': return <DayView currentDate={currentDate} appointments={filteredAppointments} />;
      case 'week': return <WeekView currentDate={currentDate} appointments={filteredAppointments} />;
      case 'month': return <MonthView currentDate={currentDate} appointments={filteredAppointments} />;
      default: return <div className="p-4 text-center text-gray-500">Select a view mode</div>;
    }
  };

  const getWeekDates = (date: Date) => {
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - date.getDay());
    
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
    return { start: startDate, end: endDate };
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center space-x-2">
          <button 
            onClick={onCreateAppointment}
            className="px-4 py-2 bg-blue-600 text-white rounded flex items-center hover:bg-blue-700"
          >
            <i className="fas fa-plus mr-2"></i> Add Appointment
          </button>
          <select 
            value={selectedPatient} 
            onChange={(e) => setSelectedPatient(e.target.value)} 
            className="p-2 border rounded text-sm hover:border-blue-600"
          >
            <option value="all">All Patients</option>
            {patients.map(patient => (
              <option key={patient} value={patient}>{patient}</option>
            ))}
          </select>
        </div>
        <div className="flex space-x-1">
          <button 
            onClick={() => onViewModeChange('day')} 
            className={`px-3 py-1 rounded text-sm ${viewMode === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-blue-100'}`}
          >
            Day
          </button>
          <button 
            onClick={() => onViewModeChange('week')} 
            className={`px-3 py-1 rounded text-sm ${viewMode === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-blue-100'}`}
          >
            Week
          </button>
          <button 
            onClick={() => onViewModeChange('month')} 
            className={`px-3 py-1 rounded text-sm ${viewMode === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-blue-100'}`}
          >
            Month
          </button>
        </div>
      </div>
      <div className="p-4 overflow-y-auto flex-1">
        <h2 className="text-lg font-semibold mb-4">
          {viewMode === 'day' && currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          {viewMode === 'week' && (
            (() => {
              const { start, end } = getWeekDates(currentDate);
              return `Week of ${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
            })()
          )}
          {viewMode === 'month' && currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        {renderView()}
      </div>
    </div>
  );
};

export default AppointmentView;
