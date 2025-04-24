
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';

interface EventPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (appt: any) => void;
}

const EventPopup: React.FC<EventPopupProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [patient, setPatient] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('Psychotherapy');
  const [location, setLocation] = useState('Virtual');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !date || !startTime || !endTime) {
      toast.error('Please fill all required fields');
      return;
    }

    onSave({
      title,
      patient,
      date,
      startTime,
      endTime,
      appointmentType,
      location,
      notes
    });
    
    resetForm();
    onClose();
    toast.success('Appointment created successfully');
  };

  const resetForm = () => {
    setTitle('');
    setPatient('');
    setDate('');
    setStartTime('');
    setEndTime('');
    setAppointmentType('Psychotherapy');
    setLocation('Virtual');
    setNotes('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Create New Appointment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title*</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Patient</label>
            <input
              type="text"
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date*</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Appointment Type*</label>
              <select
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="Psychotherapy">Psychotherapy</option>
                <option value="Medication Management">Medication Management</option>
                <option value="Consultation">Consultation</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Time*</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">End Time*</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Virtual">Virtual</option>
              <option value="Office">Office</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border rounded"
              rows={3}
            ></textarea>
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventPopup;
