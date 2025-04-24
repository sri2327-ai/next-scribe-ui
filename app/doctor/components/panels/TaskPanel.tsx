"use client";

import React from 'react';
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, CheckSquare } from "lucide-react";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

const TaskPanel = () => {
  const [tasks] = useState<Task[]>([
    {
      id: "1",
      title: "Review patient lab results",
      dueDate: "2025-04-25",
      priority: "high",
      completed: false
    },
    {
      id: "2",
      title: "Update treatment plans",
      dueDate: "2025-04-26",
      priority: "medium",
      completed: false
    }
  ]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Tasks</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <CheckSquare className="w-5 h-5 mt-1 text-blue-600" />
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    Due: {task.dueDate}
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                task.priority === "high" 
                  ? "bg-red-100 text-red-700"
                  : task.priority === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}>
                {task.priority}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TaskPanel;
