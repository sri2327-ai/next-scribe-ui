
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus } from 'lucide-react';
import { toast } from "sonner";

const TaskPanel = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);

  const handleAddTask = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, this would save to the backend
    toast.success("Task created successfully");
    setShowAddTask(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Button onClick={() => setShowAddTask(true)} className="flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add Task
        </Button>
      </div>

      <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleAddTask} className="space-y-4">
            <div>
              <Label htmlFor="details">Details</Label>
              <Textarea id="details" placeholder="Enter task details" />
            </div>

            <div>
              <Label htmlFor="assignTo">Assign To</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                  <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="patient">Regarding Patient</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-doe">John Doe</SelectItem>
                  <SelectItem value="jane-smith">Jane Smith</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Reminder Date</Label>
              <div className="flex gap-2">
                <Input type="date" />
                <Button variant="outline" size="sm">+1d</Button>
                <Button variant="outline" size="sm">+1w</Button>
                <Button variant="outline" size="sm">+1m</Button>
                <Button variant="outline" size="sm">+1y</Button>
              </div>
            </div>

            <div>
              <Label htmlFor="type">Task Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select task type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reminder">Reminder</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowAddTask(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Task</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="mt-4">
        {tasks.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">No tasks created yet</div>
        ) : (
          <div className="space-y-4">
            {/* Task list will be implemented here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskPanel;
