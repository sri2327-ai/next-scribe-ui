
import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from "sonner";

interface SocialHistoryEntry {
  id: number;
  detail: string;
}

const SocialHistory = () => {
  const [entries, setEntries] = useState<SocialHistoryEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');

  const handleAdd = () => {
    if (newEntry.trim()) {
      setEntries([...entries, { id: Date.now(), detail: newEntry }]);
      setNewEntry('');
      toast.success('Social history entry added');
    }
  };

  const handleDelete = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
    toast.success('Social history entry deleted');
  };

  const handleSave = () => {
    toast.success('Social history saved successfully');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Social History</h3>
        <Button onClick={handleSave} size="sm" variant="outline">
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md"
          placeholder="Add new social history entry"
        />
        <Button onClick={handleAdd} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      <div className="space-y-2">
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
            <span>{entry.detail}</span>
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
      </div>
    </div>
  );
};

export default SocialHistory;
