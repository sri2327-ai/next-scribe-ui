
import React, { useState } from "react";
import { patients, providers, appointmentTypes } from "../data/mockData";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (val: any) => void;
}
const EventPopup: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({
    patient: "",
    appointmentType: "",
    eventTitle: "",
    provider: "",
    date: new Date().toISOString().slice(0, 10),
    startTime: "09:00",
    endTime: "09:30",
    isVirtual: true
  });
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg border">
        <div className="flex justify-between mb-3">
          <h3 className="text-lg font-semibold">Create Appointment</h3>
          <button onClick={onClose} className="text-gray-500 font-bold">×</button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Patient</label>
            <select value={form.patient} onChange={e => setForm({ ...form, patient: e.target.value })} className="w-full p-2 border rounded">
              <option value="">Select a patient</option>
              {patients.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Appointment Type</label>
            <select value={form.appointmentType} onChange={e => setForm({ ...form, appointmentType: e.target.value })} className="w-full p-2 border rounded">
              <option value="">Select appointment type</option>
              {appointmentTypes.map(type => <option key={type.name} value={type.name}>{type.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Event title</label>
            <input type="text" value={form.eventTitle} onChange={e => setForm({ ...form, eventTitle: e.target.value })} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Provider</label>
            <select value={form.provider} onChange={e => setForm({ ...form, provider: e.target.value })} className="w-full p-2 border rounded">
              <option value="">Select provider</option>
              {providers.map(staff => <option key={staff} value={staff}>{staff}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Date</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm mb-1">Start</label>
              <input type="time" value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm mb-1">End</label>
              <input type="time" value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })} className="w-full p-2 border rounded" />
            </div>
            <div className="flex items-end">
              <label className="flex items-center">
                <input type="checkbox" checked={form.isVirtual} onChange={e => setForm({ ...form, isVirtual: e.target.checked })} className="mr-2" />
                Virtual
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button onClick={onClose} className="px-4 py-2 border rounded hover:bg-blue-100">Cancel</button>
            <button
              onClick={() => {
                onSave(form);
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventPopup;
