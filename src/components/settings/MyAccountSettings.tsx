
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

const MyAccountSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    middleName: '',
    lastName: 'Smith',
    credential: 'MD',
    signatureStyle: 'Standard',
    email: 'alex.smith@example.com',
    phone: '(555) 123-4567',
    npi: '1234567890',
    ein: '12-3456789',
    ssn: '123-45-6789',
    taxIdPreference: 'ein',
    address1: '123 Medical Plaza',
    address2: 'Suite 100',
    city: 'Princeton',
    state: 'New Jersey',
    zipCode: '08540'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    toast.success("Account details saved successfully");
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">My Account</h3>
        <Button variant={isEditing ? "ghost" : "default"} onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="middleName">Middle Name</Label>
            <Input 
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="credential">Credential</Label>
            <Input 
              id="credential"
              name="credential"
              value={formData.credential}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signatureStyle">Digital Signature Style</Label>
            <Select 
              value={formData.signatureStyle} 
              onValueChange={(value) => handleSelectChange('signatureStyle', value)}
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select signature style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Cursive">Cursive</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="npi">NPI</Label>
            <Input 
              id="npi"
              name="npi"
              value={formData.npi}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ein">EIN</Label>
            <Input 
              id="ein"
              name="ein"
              value={formData.ein}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ssn">SSN</Label>
            <Input 
              id="ssn"
              name="ssn"
              type="password"
              value={formData.ssn}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="mt-6">
          <Label className="block mb-2">Do you want your EIN or SSN to be reflected on claims?</Label>
          <RadioGroup 
            value={formData.taxIdPreference}
            onValueChange={(value) => handleSelectChange('taxIdPreference', value)}
            disabled={!isEditing}
            className="flex space-x-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ein" id="ein-option" />
              <Label htmlFor="ein-option">EIN</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ssn" id="ssn-option" />
              <Label htmlFor="ssn-option">SSN</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="address1">Address 1</Label>
            <Input 
              id="address1"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address2">Address 2</Label>
            <Input 
              id="address2"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input 
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Select 
              value={formData.state}
              onValueChange={(value) => handleSelectChange('state', value)}
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New Jersey">New Jersey</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Pennsylvania">Pennsylvania</SelectItem>
                <SelectItem value="Connecticut">Connecticut</SelectItem>
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
              disabled={!isEditing}
            />
          </div>
        </div>
      </Card>

      {isEditing && (
        <Button onClick={handleSave} className="mt-4">Save</Button>
      )}
    </div>
  );
};

export default MyAccountSettings;
