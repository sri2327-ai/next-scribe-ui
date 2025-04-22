
import React, { useState } from 'react';
import { getDaysInMonth } from '../utils/dateUtils';

interface CalendarAndFiltersProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  showWeekends: boolean;
  onToggleWeekends: () => void;
}

const CalendarAndFilters: React.FC<CalendarAndFiltersProps> = ({
  currentDate,
  onDateChange,
  isCollapsed,
  onToggleCollapse,
  showWeekends,
  onToggleWeekends
}) => {
  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth() + 1);
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const [activeFilterTab, setActiveFilterTab] = useState<'calendar' | 'filters'>('calendar');

  return (
    <div className={`bg-white h-full flex flex-col ${isCollapsed ? "w-16" : "w-64"} transition-all duration-300 border-r`}>
      <div className="p-4 flex justify-between items-center border-b">
        {!isCollapsed && (
          <div className="flex space-x-2">
            <button 
              onClick={() => setActiveFilterTab('calendar')}
              className={`px-2 py-1 text-sm ${activeFilterTab === 'calendar' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 hover:bg-blue-100'}`}
            >
              Calendar
            </button>
            <button 
              onClick={() => setActiveFilterTab('filters')}
              className={`px-2 py-1 text-sm ${activeFilterTab === 'filters' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 hover:bg-blue-100'}`}
            >
              Filters
            </button>
          </div>
        )}
        <button 
          onClick={onToggleCollapse}
          className="text-black p-1 hover:text-blue-600"
        >
          <i className={`fas fa-chevron-${isCollapsed ? 'right' : 'left'}`}></i>
        </button>
      </div>

      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto">
          {activeFilterTab === 'calendar' ? (
            <>
              <div className="p-4 border-b">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button 
                    onClick={() => onDateChange(new Date())}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Today
                  </button>
                </div>
                <div className="flex justify-between mb-2">
                  <button 
                    onClick={() => {
                      const prevMonth = new Date(currentDate);
                      prevMonth.setMonth(prevMonth.getMonth() - 1);
                      onDateChange(prevMonth);
                    }}
                    className="p-1 hover:bg-blue-100 rounded"
                  >
                    <i className="fas fa-chevron-left text-blue-600"></i>
                  </button>
                  <button 
                    onClick={() => {
                      const nextMonth = new Date(currentDate);
                      nextMonth.setMonth(nextMonth.getMonth() + 1);
                      onDateChange(nextMonth);
                    }}
                    className="p-1 hover:bg-blue-100 rounded"
                  >
                    <i className="fas fa-chevron-right text-blue-600"></i>
                  </button>
                </div>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={showWeekends} 
                    onChange={onToggleWeekends}
                    className="mr-2"
                  />
                  Show Weekends
                </label>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-7 text-center font-semibold text-gray-700 text-sm">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <div key={`${day}-${index}`} className="p-1">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 mt-1">
                  {Array.from({ length: daysInMonth + firstDay }, (_, i) => {
                    const day = i - firstDay + 1;
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                    const isCurrent = date.toDateString() === currentDate.toDateString();
                    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                    
                    if (!showWeekends && isWeekend) return null;

                    return (
                      <div 
                        key={`day-${i}`}
                        onClick={() => day > 0 && onDateChange(date)}
                        className={`p-1 text-center text-sm cursor-pointer ${day > 0 ? '' : 'invisible'} ${
                          isCurrent ? 'bg-blue-100 rounded-full' : 'hover:bg-blue-100'
                        } ${isWeekend ? 'text-gray-400' : ''}`}
                      >
                        {day > 0 ? day : ''}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-medium text-sm">Rooms</h4>
                <div className="space-y-1 mt-2">
                  {['Room 1', 'Room 2', 'Virtual Room'].map(room => (
                    <label key={room} className="flex items-center">
                      <input type="checkbox" className="mr-2" /> 
                      <span className="text-sm hover:text-blue-600">{room}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm">Appointment Types</h4>
                <div className="space-y-1 mt-2">
                  {['Initial Evaluation', 'Psychotherapy', 'Medication Management'].map(type => (
                    <label key={type} className="flex items-center">
                      <input type="checkbox" className="mr-2" /> 
                      <span className="text-sm hover:text-blue-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm">Providers</h4>
                <div className="space-y-1 mt-2">
                  {['Katherine Thompson', 'Devon Smith'].map(provider => (
                    <label key={provider} className="flex items-center">
                      <input type="checkbox" className="mr-2" /> 
                      <span className="text-sm hover:text-blue-600">{provider}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarAndFilters;
