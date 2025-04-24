
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarPanelProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const CalendarPanel: React.FC<CalendarPanelProps> = ({ 
  currentDate, 
  onDateChange,
  collapsed,
  onToggleCollapse 
}) => {
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onDateChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onDateChange(newDate);
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(day);
    onDateChange(newDate);
  };

  if (collapsed) {
    return (
      <div className="w-14 h-full bg-white border-r flex flex-col items-center pt-4">
        <button
          onClick={onToggleCollapse}
          className="mb-4 p-2 rounded-full hover:bg-gray-200"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-64 h-full bg-white border-r overflow-auto flex-shrink-0">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="font-medium">{monthName} {year}</div>
          <div className="flex">
            <button 
              onClick={handlePrevMonth}
              className="p-2 rounded-full hover:bg-gray-200 mr-1"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button 
              onClick={handleNextMonth}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1 mt-2">
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="h-8 w-8"></div>
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const isSelected = day === currentDate.getDate();
            return (
              <button
                key={day}
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm
                  ${isSelected ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}
                onClick={() => handleDateClick(day)}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarPanel;
