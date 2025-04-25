import React, { useState } from 'react';
import { Plus, Trash2, Edit, Save } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface SocialHistoryEntry {
  id: number;
  detail: string;
  description?: string;
}

const SocialHistory = () => {
  const [entries, setEntries] = useState<SocialHistoryEntry[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<SocialHistoryEntry>({
    id: 0,
    detail: '',
    description: ''
  });

  const handleAdd = () => {
    setCurrentEntry({
      id: 0,
      detail: '',
      description: ''
    });
    setIsAddDialogOpen(true);
  };

  const handleEdit = (entry: SocialHistoryEntry) => {
    setCurrentEntry(entry);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
    toast.success('Social history entry deleted');
  };

  const handleSaveNew = () => {
    if (currentEntry.detail.trim()) {
      const newEntry = {
        ...currentEntry,
        id: Date.now()
      };
      setEntries([...entries, newEntry]);
      setIsAddDialogOpen(false);
      toast.success('Social history entry added');
    }
  };

  const handleSaveEdit = () => {
    if (currentEntry.detail.trim()) {
      setEntries(entries.map(entry => 
        entry.id === currentEntry.id ? currentEntry : entry
      ));
      setIsEditDialogOpen(false);
      toast.success('Social history entry updated');
    }
  };

  const handleSave = () => {
    toast.success('Social history saved successfully');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Social History</h3>
        <div className="flex gap-2">
          <Button onClick={handleAdd} size="sm" variant="outline" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add Entry
          </Button>
          <Button onClick={handleSave} size="sm" variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {entries.length === 0 ? (
          <div className="p-4 bg-gray-50 rounded-md text-gray-500 text-center">
            No social history entries yet
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div className="flex-1">
                <div className="font-medium">{entry.detail}</div>
                {entry.description && <div className="text-sm text-gray-600">{entry.description}</div>}
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
            <DialogTitle>Add Social History</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="detail">Entry Detail</Label>
              <Input
                id="detail"
                value={currentEntry.detail}
                onChange={(e) => setCurrentEntry({ ...currentEntry, detail: e.target.value })}
                placeholder="e.g., Smoking, Alcohol use, Exercise habits"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={currentEntry.description}
                onChange={(e) => setCurrentEntry({ ...currentEntry, description: e.target.value })}
                placeholder="Additional details"
                rows={3}
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
            <DialogTitle>Edit Social History</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-detail">Entry Detail</Label>
              <Input
                id="edit-detail"
                value={currentEntry.detail}
                onChange={(e) => setCurrentEntry({ ...currentEntry, detail: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description (Optional)</Label>
              <Textarea
                id="edit-description"
                value={currentEntry.description}
                onChange={(e) => setCurrentEntry({ ...currentEntry, description: e.target.value })}
                rows={3}
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

export default SocialHistory;
