
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar as CalendarIcon, Clock, Plus, Trash2 } from "lucide-react";

interface AppointmentType {
  id: string;
  name: string;
  hours: number;
  minutes: number;
  providers: string[];
  location: string;
  enableOnlineBooking: boolean;
  patientInstructions: string;
  internalNotes: string;
  color: string;
}

const CalendarSettings = () => {
  const [timezone, setTimezone] = useState("US/Central");
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([
    {
      id: '1',
      name: 'Initial Consultation',
      hours: 1,
      minutes: 0,
      providers: ['Dr. Alex Smith'],
      location: 'Main Office',
      enableOnlineBooking: true,
      patientInstructions: 'Please arrive 15 minutes early to fill out paperwork.',
      internalNotes: 'Prepare intake forms',
      color: '#6E59A5'
    },
    {
      id: '2',
      name: 'Follow-up',
      hours: 0,
      minutes: 30,
      providers: ['Dr. Alex Smith'],
      location: 'Main Office',
      enableOnlineBooking: true,
      patientInstructions: '',
      internalNotes: '',
      color: '#0EA5E9'
    }
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAppointmentType, setNewAppointmentType] = useState<AppointmentType>({
    id: '',
    name: '',
    hours: 0,
    minutes: 0,
    providers: [],
    location: '',
    enableOnlineBooking: false,
    patientInstructions: '',
    internalNotes: '',
    color: '#6E59A5'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAppointmentType(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (name: 'hours' | 'minutes', value: string) => {
    const numValue = parseInt(value) || 0;
    setNewAppointmentType(prev => ({ ...prev, [name]: numValue }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setNewAppointmentType(prev => ({ ...prev, enableOnlineBooking: checked }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewAppointmentType(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAppointmentType = () => {
    const id = Date.now().toString();
    setAppointmentTypes(prev => [...prev, { ...newAppointmentType, id }]);
    setNewAppointmentType({
      id: '',
      name: '',
      hours: 0,
      minutes: 0,
      providers: [],
      location: '',
      enableOnlineBooking: false,
      patientInstructions: '',
      internalNotes: '',
      color: '#6E59A5'
    });
    setIsDialogOpen(false);
    toast.success("Appointment type added successfully");
  };

  const handleDeleteAppointmentType = (id: string) => {
    setAppointmentTypes(prev => prev.filter(apt => apt.id !== id));
    toast.success("Appointment type deleted successfully");
  };
  
  const handleSaveSettings = () => {
    toast.success("Calendar settings saved successfully");
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-6">Calendar Settings</h3>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>Manage calendar connections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">G</span>
                </div>
                <div>
                  <p className="font-medium">Google Calendar</p>
                  <p className="text-sm text-gray-500">alex.smith@example.com</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Disconnect</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">M</span>
                </div>
                <div>
                  <p className="font-medium">Connect Google Meet</p>
                  <p className="text-sm text-gray-500">Not connected</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">O</span>
                </div>
                <div>
                  <p className="font-medium">Connect Outlook</p>
                  <p className="text-sm text-gray-500">Not connected</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Practice Timezone</CardTitle>
          <CardDescription>Set your practice timezone</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger>
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US/Eastern">Eastern Time (ET)</SelectItem>
              <SelectItem value="US/Central">Central Time (CT)</SelectItem>
              <SelectItem value="US/Mountain">Mountain Time (MT)</SelectItem>
              <SelectItem value="US/Pacific">Pacific Time (PT)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Appointment Types</CardTitle>
            <CardDescription>Manage appointment types and duration</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Type
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Appointment Type</DialogTitle>
              </DialogHeader>
              
              <div className="py-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name"
                      name="name"
                      value={newAppointmentType.name}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="flex items-end gap-4">
                    <div className="flex-1">
                      <Label htmlFor="hours">Duration</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex flex-col flex-1">
                          <Select 
                            value={newAppointmentType.hours.toString()} 
                            onValueChange={(value) => handleNumberChange('hours', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Hours" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 13 }, (_, i) => (
                                <SelectItem key={i} value={i.toString()}>
                                  {i} {i === 1 ? 'hour' : 'hours'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <span className="text-xs text-center mt-1">Hours</span>
                        </div>
                        <div className="flex flex-col flex-1">
                          <Select 
                            value={newAppointmentType.minutes.toString()} 
                            onValueChange={(value) => handleNumberChange('minutes', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Minutes" />
                            </SelectTrigger>
                            <SelectContent>
                              {[0, 15, 30, 45].map((min) => (
                                <SelectItem key={min} value={min.toString()}>
                                  {min}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <span className="text-xs text-center mt-1">Minutes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select 
                      value={newAppointmentType.location} 
                      onValueChange={(value) => handleSelectChange('location', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Main Office">Main Office</SelectItem>
                        <SelectItem value="Virtual">Virtual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableOnlineBooking">Enable online booking requests</Label>
                    <Switch 
                      id="enableOnlineBooking"
                      checked={newAppointmentType.enableOnlineBooking}
                      onCheckedChange={handleSwitchChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="patientInstructions">Patient instructions</Label>
                    <Textarea 
                      id="patientInstructions"
                      name="patientInstructions"
                      value={newAppointmentType.patientInstructions}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Instructions for patients"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="internalNotes">Internal notes</Label>
                    <Textarea 
                      id="internalNotes"
                      name="internalNotes"
                      value={newAppointmentType.internalNotes}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Notes for staff only"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="color">Calendar color</Label>
                    <div className="flex mt-1 gap-2">
                      {['#6E59A5', '#0EA5E9', '#F97316', '#D946EF'].map(color => (
                        <button
                          key={color}
                          type="button"
                          className={`w-8 h-8 rounded-full ${newAppointmentType.color === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setNewAppointmentType(prev => ({ ...prev, color }))}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleAddAppointmentType} className="mt-6 w-full">
                  Add Appointment Type
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointmentTypes.map(apt => (
              <div key={apt.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-start gap-3">
                  <div 
                    className="w-4 h-4 rounded-full mt-1.5" 
                    style={{ backgroundColor: apt.color }}
                  />
                  <div>
                    <p className="font-medium">{apt.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock size={14} />
                      <span>
                        {apt.hours > 0 && `${apt.hours} ${apt.hours === 1 ? 'hour' : 'hours'}`} 
                        {apt.hours > 0 && apt.minutes > 0 && ' '}
                        {apt.minutes > 0 && `${apt.minutes} min`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteAppointmentType(apt.id)}
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Button onClick={handleSaveSettings} className="mt-6">
        Save Calendar Settings
      </Button>
    </div>
  );
};

export default CalendarSettings;
