
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
  const hour = Math.floor(i / 4);
  const minute = (i % 4) * 15;
  const ampm = hour < 12 ? 'am' : 'pm';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return {
    value: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
    label: `${displayHour}:${minute.toString().padStart(2, '0')}${ampm}`
  };
});

const AvailabilitySettings = () => {
  const [timezone, setTimezone] = useState("US/Central");
  const [availability, setAvailability] = useState(
    daysOfWeek.map(day => ({
      day,
      available: true,
      startTime: '06:00',
      endTime: '21:00'
    }))
  );

  const handleAvailabilityChange = (
    index: number,
    field: 'available' | 'startTime' | 'endTime',
    value: boolean | string
  ) => {
    const newAvailability = [...availability];
    newAvailability[index] = { ...newAvailability[index], [field]: value };
    setAvailability(newAvailability);
  };

  const handleSave = () => {
    toast.success("Availability settings saved successfully");
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-6">My Availability</h3>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Set your availability</CardTitle>
          <p className="text-muted-foreground">
            Patients will only be able to book during available hours. Your available hours combined with calendar events will determine your online booking availability.
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="timezone">Practice time zone:</Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="w-[200px] mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="US/Eastern">US/Eastern</SelectItem>
                <SelectItem value="US/Central">US/Central</SelectItem>
                <SelectItem value="US/Mountain">US/Mountain</SelectItem>
                <SelectItem value="US/Pacific">US/Pacific</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <h4 className="font-medium mb-4">Set your available weekly hours</h4>
          
          <div className="space-y-4">
            {availability.map((day, index) => (
              <div key={day.day} className="flex items-center gap-4">
                <div className="w-12 font-medium">{day.day}</div>
                
                <div className="flex items-center gap-2">
                  <Select
                    value={day.startTime}
                    onValueChange={(value) => handleAvailabilityChange(index, 'startTime', value)}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {timeOptions.map(time => (
                        <SelectItem key={time.value} value={time.value}>
                          {time.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <span>to</span>
                  
                  <Select
                    value={day.endTime}
                    onValueChange={(value) => handleAvailabilityChange(index, 'endTime', value)}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {timeOptions.map(time => (
                        <SelectItem key={time.value} value={time.value}>
                          {time.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default AvailabilitySettings;
