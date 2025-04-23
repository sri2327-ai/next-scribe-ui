
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, ChevronRight, ChevronLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type ReportType = 'appointments' | 'notes';

const appointmentData = [
  { name: 'Mon', count: 4 },
  { name: 'Tue', count: 6 },
  { name: 'Wed', count: 8 },
  { name: 'Thu', count: 5 },
  { name: 'Fri', count: 7 },
];

const notesData = [
  { name: 'Progress Notes', count: 15 },
  { name: 'Treatment Plans', count: 8 },
  { name: 'Assessments', count: 12 },
  { name: 'Follow-ups', count: 10 },
];

const ReportsPanel = () => {
  const [selectedReport, setSelectedReport] = useState<ReportType>('appointments');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showGraph, setShowGraph] = useState(false);

  return (
    <div className="flex h-full">
      {/* Left sidebar */}
      <Collapsible
        open={!sidebarCollapsed}
        onOpenChange={(isOpen) => setSidebarCollapsed(!isOpen)}
        className="min-h-full border-r bg-gray-50 relative"
      >
        <div className="w-64 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Report Types</h2>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon">
                {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            <Card
              className={`hover:bg-gray-100 cursor-pointer transition ${
                selectedReport === 'appointments' ? 'bg-blue-50 border-blue-200' : ''
              }`}
              onClick={() => setSelectedReport('appointments')}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="h-5 w-5" />
                  Appointment Reports
                </CardTitle>
              </CardHeader>
            </Card>
            <Card
              className={`hover:bg-gray-100 cursor-pointer transition ${
                selectedReport === 'notes' ? 'bg-blue-50 border-blue-200' : ''
              }`}
              onClick={() => setSelectedReport('notes')}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-5 w-5" />
                  Clinical Notes Reports
                </CardTitle>
              </CardHeader>
            </Card>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <h1 className="text-2xl font-bold mb-6">
            {selectedReport === 'appointments' ? 'Appointment Report' : 'Clinical Notes Report'}
          </h1>
          
          <div className="mb-8 bg-white p-4 md:p-6 rounded-lg shadow-sm border">
            {selectedReport === 'appointments' ? (
              <AppointmentReportContent onGenerate={() => setShowGraph(true)} />
            ) : (
              <NotesReportContent onGenerate={() => setShowGraph(true)} />
            )}
          </div>

          {showGraph && (
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={selectedReport === 'appointments' ? appointmentData : notesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="count"
                      fill={selectedReport === 'appointments' ? '#8884d8' : '#82ca9d'}
                      name={selectedReport === 'appointments' ? 'Appointments' : 'Notes'}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AppointmentReportContent = ({ onGenerate }: { onGenerate: () => void }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date Range</label>
          <select className="w-full p-2 border rounded">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Custom range</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Provider</label>
          <select className="w-full p-2 border rounded">
            <option>All Providers</option>
            <option>Dr. Smith</option>
            <option>Dr. Johnson</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Appointment Type</label>
          <select className="w-full p-2 border rounded">
            <option>All Types</option>
            <option>Initial Consultation</option>
            <option>Follow-up</option>
            <option>Medication Review</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select className="w-full p-2 border rounded">
            <option>All Statuses</option>
            <option>Completed</option>
            <option>Cancelled</option>
            <option>No-show</option>
          </select>
        </div>
      </div>
      <Button onClick={onGenerate} className="w-full">Generate Report</Button>
    </div>
  );
};

const NotesReportContent = ({ onGenerate }: { onGenerate: () => void }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date Range</label>
          <select className="w-full p-2 border rounded">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Custom range</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Note Type</label>
          <select className="w-full p-2 border rounded">
            <option>All Types</option>
            <option>Progress Notes</option>
            <option>Treatment Plans</option>
            <option>Assessment Notes</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Provider</label>
          <select className="w-full p-2 border rounded">
            <option>All Providers</option>
            <option>Dr. Smith</option>
            <option>Dr. Johnson</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Include Categories</label>
          <select className="w-full p-2 border rounded" multiple>
            <option>Diagnoses</option>
            <option>Medications</option>
            <option>Treatment Progress</option>
            <option>Recommendations</option>
          </select>
        </div>
      </div>
      <Button onClick={onGenerate} className="w-full">Generate Report</Button>
    </div>
  );
};

export default ReportsPanel;
