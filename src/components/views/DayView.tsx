
import React from "react";
import { Appointment } from "../../types";
import { formatDate } from "../../utils/dateUtils";
import { Calendar } from "lucide-react"; // Add this import for the Calendar icon

const DayView: React.FC<{ currentDate: Date; appointments: Appointment[] }> = ({
  currentDate,
  appointments
}) => {
  const dateStr = formatDate(currentDate);
  const dayAppointments = appointments.filter(a => a.date === dateStr);

  return (
    <div className="max-w-4xl mx-auto space-y-3">
      {dayAppointments.length > 0 ? (
        dayAppointments.map(appt => (
          <div 
            key={appt.id} 
            className={`p-4 rounded-lg shadow-sm border-l-4 bg-white transition-all hover:shadow-md
              ${appt.color ? `border-l-${appt.color} hover:border-l-${appt.color}/80` : "border-l-blue-500 hover:border-l-blue-400"}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-lg font-medium mb-1">{appt.time}</div>
                {appt.patient && (
                  <div className="text-gray-900 font-medium">{appt.patient}</div>
                )}
                {appt.title && (
                  <div className="text-gray-700">{appt.title}</div>
                )}
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium 
                ${appt.color ? 
                  `bg-${appt.color}/10 text-${appt.color}` : 
                  "bg-blue-100 text-blue-700"}`}
              >
                {appt.type}
              </div>
            </div>
            {appt.location && (
              <div className="mt-2 text-sm text-gray-500 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {appt.location}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No Appointments</h3>
          <p className="text-gray-500">Click anywhere to create a new appointment</p>
        </div>
      )}
    </div>
  );
};

export default DayView;
