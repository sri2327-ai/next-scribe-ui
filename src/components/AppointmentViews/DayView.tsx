
import React from 'react';
import { Appointment } from '../../types';
import { formatDate } from '../../utils/dateUtils';

interface DayViewProps {
  currentDate: Date;
  appointments: Appointment[];
}

const DayView: React.FC<DayViewProps> = ({ currentDate, appointments }) => {
  const dateStr = formatDate(currentDate);
  const dayAppointments = appointments.filter(a => a.date === dateStr);
  
  return (
    <div className="space-y-3">
      {dayAppointments.length > 0 ? (
        dayAppointments.map(appt => (
          <div key={appt.id} className={`p-3 border rounded ${appt.color ? `border-l-4 border-l-${appt.color}` : ''}`}>
            <div className="flex justify-between">
              <div className="font-medium">{appt.time}</div>
              <div className={`text-${appt.color}`}>{appt.type}</div>
            </div>
            {appt.patient && <div className="font-semibold mt-1">{appt.patient}</div>}
            {appt.title && <div className="font-semibold mt-1">{appt.title}</div>}
            {appt.location && <div className="text-sm text-gray-500 mt-1">{appt.location}</div>}
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-500">No appointments for this day</div>
      )}
    </div>
  );
};

export default DayView;
