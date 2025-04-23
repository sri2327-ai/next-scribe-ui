
import React, { useState } from 'react';
import { Plus, Trash2, Edit, Save } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface MedicalHistoryEntry {
  id: number;
  condition: string;
  diagnosis: string;
  date: string;
}

const MedicalHistory = () => {
  const [entries, setEntries] = useState<MedicalHistoryEntry[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<MedicalHistoryEntry>({
    id: 0,
    condition: '',
    diagnosis: '',
    date: ''
  });

  const handleAdd = () => {
    setCurrentEntry({
      id: 0,
      condition: '',
      diagnosis: '',
      date: ''
    });
    setIsAddDialogOpen(true);
  };

  const handleEdit = (entry: MedicalHistoryEntry) => {
    setCurrentEntry(entry);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
    toast.success('Medical history entry deleted');
  };

  const handleSaveNew = () => {
    if (currentEntry.condition.trim() && currentEntry.diagnosis.trim()) {
      const newEntry = {
        ...currentEntry,
        id: Date.now()
      };
      setEntries([...entries, newEntry]);
      setIsAddDialogOpen(false);
      toast.success('Medical history entry added');
    }
  };

  const handleSaveEdit = () => {
    if (currentEntry.condition.trim() && currentEntry.diagnosis.trim()) {
      setEntries(entries.map(entry => 
        entry.id === currentEntry.id ? currentEntry : entry
      ));
      setIsEditDialogOpen(false);
      toast.success('Medical history entry updated');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Medical History</h3>
        <Button onClick={handleAdd} size="sm" variant="outline" className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Add Condition
        </Button>
      </div>

      <div className="space-y-2">
        {entries.length === 0 ? (
          <div className="p-4 bg-gray-50 rounded-md text-gray-500 text-center">
            No medical history entries yet
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div className="flex-1">
                <div className="font-medium">{entry.condition}</div>
                <div className="text-sm text-gray-600">{entry.diagnosis}</div>
                <div className="text-xs text-gray-500">{entry.date}</div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(entry)}
                  variant="ghost"
                  size="sm"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleDelete(entry.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Medical Condition</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Input
                id="condition"
                value={currentEntry.condition}
                onChange={(e) => setCurrentEntry({ ...currentEntry, condition: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="diagnosis">Details/Diagnosis</Label>
              <Textarea
                id="diagnosis"
                value={currentEntry.diagnosis}
                onChange={(e) => setCurrentEntry({ ...currentEntry, diagnosis: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date Diagnosed</Label>
              <Input
                id="date"
                type="date"
                value={currentEntry.date}
                onChange={(e) => setCurrentEntry({ ...currentEntry, date: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveNew}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Medical Condition</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-condition">Condition</Label>
              <Input
                id="edit-condition"
                value={currentEntry.condition}
                onChange={(e) => setCurrentEntry({ ...currentEntry, condition: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-diagnosis">Details/Diagnosis</Label>
              <Textarea
                id="edit-diagnosis"
                value={currentEntry.diagnosis}
                onChange={(e) => setCurrentEntry({ ...currentEntry, diagnosis: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-date">Date Diagnosed</Label>
              <Input
                id="edit-date"
                type="date"
                value={currentEntry.date}
                onChange={(e) => setCurrentEntry({ ...currentEntry, date: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MedicalHistory;
