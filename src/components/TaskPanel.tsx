
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Check, Clock, AlertCircle } from 'lucide-react';
import { toast } from "sonner";

interface Task {
  id: string;
  details: string;
  assignedTo: string;
  patient: string;
  dueDate: string;
  author: string;
  type: string;
  status: 'pending' | 'completed' | 'overdue';
}

const TaskPanel = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      details: 'Call patient to follow up on medication changes',
      assignedTo: 'Dr. Smith',
      patient: 'John Doe',
      dueDate: '2025-04-25',
      author: 'Dr. Johnson',
      type: 'Follow-up',
      status: 'pending'
    },
    {
      id: '2',
      details: 'Review lab results and update patient chart',
      assignedTo: 'Dr. Johnson',
      patient: 'Jane Smith',
      dueDate: '2025-04-24',
      author: 'Dr. Smith',
      type: 'Review',
      status: 'overdue'
    }
  ]);
  
  const [newTask, setNewTask] = useState<Partial<Task>>({
    assignedTo: '',
    patient: '',
    details: '',
    dueDate: new Date().toISOString().split('T')[0],
    type: '',
    status: 'pending'
  });

  const handleAddTask = (event: React.FormEvent) => {
    event.preventDefault();
    
    const task: Task = {
      id: Date.now().toString(),
      details: newTask.details || '',
      assignedTo: newTask.assignedTo || '',
      patient: newTask.patient || '',
      dueDate: newTask.dueDate || '',
      author: 'Current User', // In a real app, get from auth context
      type: newTask.type || '',
      status: 'pending'
    };
    
    setTasks([...tasks, task]);
    toast.success("Task created successfully");
    setShowAddTask(false);
    setNewTask({
      assignedTo: '',
      patient: '',
      details: '',
      dueDate: new Date().toISOString().split('T')[0],
      type: '',
      status: 'pending'
    });
  };

  const updateTaskStatus = (taskId: string, status: 'pending' | 'completed' | 'overdue') => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    );
    setTasks(updatedTasks);
    toast.success(`Task marked as ${status}`);
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
              <Textarea 
                id="details" 
                placeholder="Enter task details" 
                value={newTask.details}
                onChange={(e) => setNewTask({...newTask, details: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="assignTo">Assign To</Label>
              <Select 
                value={newTask.assignedTo} 
                onValueChange={(value) => setNewTask({...newTask, assignedTo: value})}
              >
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
              <Select 
                value={newTask.patient}
                onValueChange={(value) => setNewTask({...newTask, patient: value})}
              >
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
                <Input 
                  type="date" 
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  type="button"
                  onClick={() => {
                    const date = new Date();
                    date.setDate(date.getDate() + 1);
                    setNewTask({
                      ...newTask, 
                      dueDate: date.toISOString().split('T')[0]
                    });
                  }}
                >+1d</Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  type="button"
                  onClick={() => {
                    const date = new Date();
                    date.setDate(date.getDate() + 7);
                    setNewTask({
                      ...newTask, 
                      dueDate: date.toISOString().split('T')[0]
                    });
                  }}
                >+1w</Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  type="button"
                  onClick={() => {
                    const date = new Date();
                    date.setMonth(date.getMonth() + 1);
                    setNewTask({
                      ...newTask, 
                      dueDate: date.toISOString().split('T')[0]
                    });
                  }}
                >+1m</Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  type="button"
                  onClick={() => {
                    const date = new Date();
                    date.setFullYear(date.getFullYear() + 1);
                    setNewTask({
                      ...newTask, 
                      dueDate: date.toISOString().split('T')[0]
                    });
                  }}
                >+1y</Button>
              </div>
            </div>

            <div>
              <Label htmlFor="type">Task Type</Label>
              <Select 
                value={newTask.type}
                onValueChange={(value) => setNewTask({...newTask, type: value})}
              >
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

      <div className="mt-6">
        {tasks.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">No tasks created yet</div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{task.details}</h3>
                  <Badge 
                    className={`
                      ${task.status === 'completed' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 
                        task.status === 'overdue' ? 'bg-red-100 text-red-800 hover:bg-red-200' : 
                        'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}
                    `}
                  >
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="text-sm text-gray-600 mb-4">
                  <div><span className="font-semibold">Patient:</span> {task.patient}</div>
                  <div><span className="font-semibold">Assigned to:</span> {task.assignedTo}</div>
                  <div><span className="font-semibold">Due:</span> {new Date(task.dueDate).toLocaleDateString()}</div>
                  <div><span className="font-semibold">Type:</span> {task.type}</div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1" 
                    onClick={() => updateTaskStatus(task.id, 'completed')}
                  >
                    <Check className="w-4 h-4" /> Complete
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1" 
                    onClick={() => updateTaskStatus(task.id, 'pending')}
                  >
                    <Clock className="w-4 h-4" /> Pending
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1" 
                    onClick={() => updateTaskStatus(task.id, 'overdue')}
                  >
                    <AlertCircle className="w-4 h-4" /> Overdue
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskPanel;
