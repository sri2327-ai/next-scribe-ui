
import React from 'react';
import { Appointment } from '../../types';
import { getWeekDates } from '../../utils/dateUtils';

interface WeekViewProps {
  currentDate: Date;
  appointments: Appointment[];
}

const WeekView: React.FC<WeekViewProps> = ({ currentDate, appointments }) => {
  const { start, end } = getWeekDates(currentDate);
  const weekAppointments = appointments.filter(a => {
    const apptDate = new Date(a.date);
    return apptDate >= start && apptDate <= end;
  });

  return (
    <div className="space-y-3">
      {weekAppointments.length > 0 ? (
        weekAppointments.map(appt => (
          <div key={appt.id} className={`p-3 border rounded ${appt.color ? `border-l-4 border-l-${appt.color}` : ''}`}>
            <div className="flex justify-between">
              <div>
                <span className="font-medium">
                  {new Date(appt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
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
        <div className="p-4 text-center text-gray-500">No appointments this week</div>
      )}
    </div>
  );
};

export default WeekView;
