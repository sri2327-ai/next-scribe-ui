
"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EventPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (val: any) => void;
}

const EventPopup: React.FC<EventPopupProps> = ({ isOpen, onClose, onSave }) => {
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

  const patients = ["John Doe", "Jane Smith", "Robert Johnson"];
  const appointmentTypes = [
    { name: "Initial Consultation", duration: 60 },
    { name: "Follow-up", duration: 30 },
    { name: "Therapy Session", duration: 45 }
  ];
  const providers = ["Dr. Smith", "Dr. Johnson", "Dr. Williams"];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Appointment</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Patient</Label>
            <Select
              value={form.patient}
              onValueChange={(value) => setForm({ ...form, patient: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map(p => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Appointment Type</Label>
            <Select
              value={form.appointmentType}
              onValueChange={(value) => setForm({ ...form, appointmentType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map(type => (
                  <SelectItem key={type.name} value={type.name}>
                    {type.name} ({type.duration} min)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Event title</Label>
            <Input
              value={form.eventTitle}
              onChange={(e) => setForm({ ...form, eventTitle: e.target.value })}
              placeholder="Event title"
            />
          </div>

          <div className="space-y-2">
            <Label>Provider</Label>
            <Select
              value={form.provider}
              onValueChange={(value) => setForm({ ...form, provider: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                {providers.map(provider => (
                  <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input
                type="time"
                value={form.startTime}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label>End Time</Label>
              <Input
                type="time"
                value={form.endTime}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
              />
            </div>
            
            <div className="flex items-end">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.isVirtual}
                  onChange={(e) => setForm({ ...form, isVirtual: e.target.checked })}
                />
                <span>Virtual</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                onSave(form);
                onClose();
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventPopup;
