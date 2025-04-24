"use client";

import React, { useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

interface MedicalHistoryEntry {
  id: number;
  condition: string;
  diagnosis: string;
  date: string;
}

const MedicalHistory = () => {
  const [entries, setEntries] = useState<MedicalHistoryEntry[]>([]);

  const handleAdd = () => {
    const newEntry = {
      id: Date.now(),
      condition: 'New Condition',
      diagnosis: 'Initial diagnosis',
      date: new Date().toISOString().split('T')[0]
    };
    setEntries([...entries, newEntry]);
    toast.success('Medical history entry added');
  };

  const handleDelete = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
    toast.success('Medical history entry deleted');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Medical History</h3>
        <Button onClick={handleAdd} size="sm" variant="outline" className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Add Entry
        </Button>
      </div>

      <div className="space-y-2">
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <div>
              <div className="font-medium">{entry.condition}</div>
              <div className="text-sm text-gray-600">{entry.diagnosis}</div>
              <div className="text-xs text-gray-500">{entry.date}</div>
            </div>
            <Button
              onClick={() => handleDelete(entry.id)}
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {entries.length === 0 && (
          <div className="text-center text-gray-500 p-4">
            No medical history entries yet
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalHistory;
