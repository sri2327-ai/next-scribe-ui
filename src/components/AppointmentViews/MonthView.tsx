
import React from 'react';
import { Appointment } from '../../types';

interface MonthViewProps {
  currentDate: Date;
  appointments: Appointment[];
}

const MonthView: React.FC<MonthViewProps> = ({ currentDate, appointments }) => {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const monthAppointments = appointments.filter(a => {
    const apptDate = new Date(a.date);
    return apptDate.getMonth() === month && apptDate.getFullYear() === year;
  });

  return (
    <div className="space-y-3">
      {monthAppointments.length > 0 ? (
        monthAppointments.map(appt => (
          <div key={appt.id} className={`p-3 border rounded ${appt.color ? `border-l-4 border-l-${appt.color}` : ''}`}>
            <div className="flex justify-between">
              <div>
                <span className="font-medium">
                  {new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <span className="ml-2">{appt.time}</span>
              </div>
              <div className={`text-${appt.color}`}>{appt.type}</div>
            </div>
            {appt.patient && <div className="font-semibold mt-1">{appt.patient}</div>}
            {appt.title && <div className="font-semibold mt-1">{appt.title}</div>}
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-500">No appointments this month</div>
      )}
    </div>
  );
};

export default MonthView;
