
"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ReportsPanel = () => {
  const data = [
    { name: 'Jan', appointments: 65, newPatients: 28 },
    { name: 'Feb', appointments: 59, newPatients: 25 },
    { name: 'Mar', appointments: 80, newPatients: 36 },
    { name: 'Apr', appointments: 81, newPatients: 30 },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Reports & Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Patients</h3>
          <p className="text-2xl font-bold">248</p>
          <span className="text-green-500 text-sm">↑ 12% from last month</span>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Appointments This Month</h3>
          <p className="text-2xl font-bold">81</p>
          <span className="text-green-500 text-sm">↑ 5% from last month</span>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">New Patients This Month</h3>
          <p className="text-2xl font-bold">30</p>
          <span className="text-red-500 text-sm">↓ 3% from last month</span>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Appointments Overview</h3>
        <div className="w-full h-[300px]">
          <BarChart
            width={800}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="appointments" fill="#3b82f6" />
            <Bar dataKey="newPatients" fill="#60a5fa" />
          </BarChart>
        </div>
      </Card>
    </div>
  );
};

export default ReportsPanel;
