
import React, { useState } from 'react';
import { AppointmentFormData, AppointmentType } from '../types';
import { formatDate } from '../utils/dateUtils';

interface EventPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AppointmentFormData) => void;
  patients: string[];
  staff: string[];
  appointmentTypes: AppointmentType[];
}

const EventPopup: React.FC<EventPopupProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  patients, 
  staff, 
  appointmentTypes 
}) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    patient: '',
    appointmentType: '',
    eventTitle: '',
    provider: '',
    date: formatDate(new Date()),
    startTime: '09:00',
    endTime: '09:30',
    isVirtual: true
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Create Appointment</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-blue-600">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
            <select 
              value={formData.patient} 
              onChange={(e) => setFormData({...formData, patient: e.target.value})} 
              className="w-full p-2 border rounded hover:border-blue-600"
            >
              <option value="">Select a patient</option>
              {patients.map(patient => (
                <option key={patient} value={patient}>{patient}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Appointment type</label>
            <select 
              value={formData.appointmentType} 
              onChange={(e) => setFormData({...formData, appointmentType: e.target.value})} 
              className="w-full p-2 border rounded hover:border-blue-600"
            >
              <option value="">Select appointment type</option>
              {appointmentTypes.map(type => (
                <option key={type.name} value={type.name}>{type.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event title</label>
            <input 
              type="text" 
              value={formData.eventTitle} 
              onChange={(e) => setFormData({...formData, eventTitle: e.target.value})} 
              className="w-full p-2 border rounded hover:border-blue-600"
              placeholder="Enter event title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
            <select 
              value={formData.provider} 
              onChange={(e) => setFormData({...formData, provider: e.target.value})} 
              className="w-full p-2 border rounded hover:border-blue-600"
            >
              <option value="">Select provider</option>
              {staff.map(provider => (
                <option key={provider} value={provider}>{provider}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input 
                type="date" 
                value={formData.date} 
                onChange={(e) => setFormData({...formData, date: e.target.value})} 
                className="w-full p-2 border rounded hover:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start time</label>
              <input 
                type="time" 
                value={formData.startTime} 
                onChange={(e) => setFormData({...formData, startTime: e.target.value})} 
                className="w-full p-2 border rounded hover:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End time</label>
              <input 
                type="time" 
                value={formData.endTime} 
                onChange={(e) => setFormData({...formData, endTime: e.target.value})} 
                className="w-full p-2 border rounded hover:border-blue-600"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={formData.isVirtual} 
                  onChange={(e) => setFormData({...formData, isVirtual: e.target.checked})} 
                  className="mr-2"
                />
                Virtual
              </label>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <button onClick={onClose} className="px-4 py-2 border rounded hover:bg-blue-100">Cancel</button>
            <button 
              onClick={() => {
                onSave(formData);
                onClose();
              }} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
