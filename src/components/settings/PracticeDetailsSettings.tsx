
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";

const PracticeDetailsSettings = () => {
  const [formData, setFormData] = useState({
    practiceName: 'Smith Medical Group',
    logoUrl: '/lovable-uploads/20cdf9a7-452f-4cd4-b1d0-5030d6b36ad9.png',
    phone: '(555) 987-6543',
    address1: '456 Healthcare Ave',
    address2: 'Building C',
    city: 'Austin',
    state: 'Texas',
    zipCode: '78701',
    billingNpi: '9876543210',
    ein: '98-7654321',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    toast.success("Practice details saved successfully");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server and get back a URL
      const fakeUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, logoUrl: fakeUrl }));
    }
  };

  const handleRemoveLogo = () => {
    setFormData(prev => ({ ...prev, logoUrl: '' }));
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-6">Practice Details</h3>
      
      <Card className="p-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label htmlFor="practiceName">Practice Name</Label>
            <Input 
              id="practiceName"
              name="practiceName"
              value={formData.practiceName}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Practice Logo (5MB or smaller)</Label>
            {formData.logoUrl ? (
              <div className="flex flex-col items-center gap-4">
                <img 
                  src={formData.logoUrl} 
                  alt="Practice Logo" 
                  className="h-24 object-contain"
                />
                <Button variant="outline" onClick={handleRemoveLogo}>
                  Remove
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center gap-2">
                <Upload size={24} />
                <Label htmlFor="logo-upload" className="cursor-pointer text-blue-500">
                  Click to upload
                </Label>
                <Input 
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address1">Address 1</Label>
            <Input 
              id="address1"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address2">Address 2</Label>
            <Input 
              id="address2"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select 
                value={formData.state}
                onValueChange={(value) => handleSelectChange('state', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Texas">Texas</SelectItem>
                  <SelectItem value="California">California</SelectItem>
                  <SelectItem value="Florida">Florida</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input 
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="billingNpi">Billing NPI</Label>
            <Input 
              id="billingNpi"
              name="billingNpi"
              value={formData.billingNpi}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ein">EIN</Label>
            <Input 
              id="ein"
              name="ein"
              value={formData.ein}
              onChange={handleChange}
            />
          </div>
        </div>
      </Card>
      
      <Button onClick={handleSave} className="mt-6">Save</Button>
    </div>
  );
};

export default PracticeDetailsSettings;
