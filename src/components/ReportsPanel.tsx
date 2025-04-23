
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type ReportType = 'appointments' | 'notes';

const ReportsPanel = () => {
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGenerateReport = (type: ReportType) => {
    setSelectedReport(type);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Clinical Reports</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Appointment Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Generate comprehensive reports for patient appointments, including attendance, types of visits, and scheduling patterns.
            </p>
            <Button onClick={() => handleGenerateReport('appointments')}>
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Clinical Notes Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Generate reports for clinical notes, including treatment progress, diagnoses, and patient outcomes.
            </p>
            <Button onClick={() => handleGenerateReport('notes')}>
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedReport === 'appointments' ? 'Appointment Report' : 'Clinical Notes Report'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedReport === 'appointments' ? (
            <AppointmentReportContent />
          ) : (
            <NotesReportContent />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const AppointmentReportContent = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
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
      <Button className="w-full">Generate Report</Button>
    </div>
  );
};

const NotesReportContent = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
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
      <Button className="w-full">Generate Report</Button>
    </div>
  );
};

export default ReportsPanel;
