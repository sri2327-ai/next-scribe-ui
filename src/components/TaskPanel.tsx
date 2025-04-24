
import React, { useState } from 'react';
import { Check, Clock, Calendar, AlertCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete patient assessment for John Doe',
    dueDate: '2025-04-25',
    priority: 'high',
    completed: false
  },
  {
    id: '2',
    title: 'Review treatment plan for Sarah Williams',
    dueDate: '2025-04-26',
    priority: 'medium',
    completed: false
  },
  {
    id: '3',
    title: 'Schedule follow-up with David Johnson',
    dueDate: '2025-04-27',
    priority: 'low',
    completed: true
  }
];

const TaskPanel: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="border-b p-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <div className="flex mt-4 space-x-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('incomplete')}
            className={`px-3 py-1 rounded-full text-sm ${filter === 'incomplete' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
          >
            Incomplete
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded-full text-sm ${filter === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No tasks found
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map(task => (
              <div 
                key={task.id} 
                className={`p-4 border rounded-lg ${task.completed ? 'bg-gray-50' : 'bg-white'}`}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className={`w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer ${task.completed ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}
                    onClick={() => toggleTaskCompletion(task.id)}
                  >
                    {task.completed && <Check className="w-3 h-3 text-white" />}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                      {task.title}
                    </h3>
                    
                    <div className="flex items-center mt-2 text-sm gap-4">
                      <span className="flex items-center text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                      
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="border-t p-4">
        <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add New Task
        </button>
      </div>
    </div>
  );
};

export default TaskPanel;
