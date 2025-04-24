
"use client";

import React from "react";
import { Appointment } from "@/types";
import { getDaysInMonth } from "@/utils/dateUtils";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeekView: React.FC<{ currentDate: Date; appointments: Appointment[]; showWeekends?: boolean }> = ({
  currentDate, appointments, showWeekends = true
}) => {
  // Week start is Sunday
  const weekStart = new Date(currentDate);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const days: Date[] = [];
  for (let i = 0; i < 7; ++i) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    days.push(d);
  }

  return (
    <div className="grid grid-cols-7 gap-3">
      {days.map((date, idx) => {
        if (!showWeekends && (date.getDay() === 0 || date.getDay() === 6)) {
          return <div key={idx} />;
        }
        const dateStr = date.toISOString().split("T")[0];
        const dayAppointments = appointments.filter(a => a.date === dateStr);
        const isToday = date.toDateString() === new Date().toDateString();
        return (
          <div key={idx} className={`bg-white rounded-lg border shadow-sm p-2 flex flex-col min-h-[110px] ${isToday ? "ring-2 ring-blue-500" : ""}`}>
            <div className="font-bold text-xs mb-1 text-blue-700">{daysOfWeek[date.getDay()]}<span className="ml-1 text-gray-500 font-normal">{date.getDate()}</span></div>
            {dayAppointments.length > 0 ? dayAppointments.map(appt => (
              <div key={appt.id} className={`mb-1 px-2 py-1 rounded border-l-4 ${appt.color ? `border-l-${appt.color}` : ""} bg-blue-50`}>
                <div className="text-xs">{appt.time}</div>
                <div className="text-xs font-semibold">{appt.type}</div>
                {appt.patient && <div className="italic text-xs">{appt.patient}</div>}
              </div>
            )) : <div className="text-xs text-gray-400 mt-4 text-center">No appts</div>}
          </div>
        );
      })}
    </div>
  );
};

export default WeekView;
