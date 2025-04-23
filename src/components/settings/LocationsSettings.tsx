
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";

interface Location {
  id: string;
  type: 'Physical' | 'Virtual';
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  billingNpi: string;
  ein: string;
  placeOfService: string;
}

const LocationsSettings = () => {
  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      type: 'Physical',
      name: 'Main Office',
      address1: '456 Healthcare Ave',
      address2: 'Building C',
      city: 'Austin',
      state: 'Texas',
      zipCode: '78701',
      phone: '(555) 987-6543',
      billingNpi: '9876543210',
      ein: '98-7654321',
      placeOfService: '11'
    }
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newLocation, setNewLocation] = useState<Location>({
    id: '',
    type: 'Physical',
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    billingNpi: '',
    ein: '',
    placeOfService: ''
  });

  const handleNewLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLocation(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: 'Physical' | 'Virtual') => {
    setNewLocation(prev => ({ ...prev, type: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewLocation(prev => ({ ...prev, [name]: value }));
  };

  const handleAddLocation = () => {
    const id = Date.now().toString();
    setLocations(prev => [...prev, { ...newLocation, id }]);
    setNewLocation({
      id: '',
      type: 'Physical',
      name: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      billingNpi: '',
      ein: '',
      placeOfService: ''
    });
    setIsDialogOpen(false);
    toast.success("Location added successfully");
  };

  const handleDeleteLocation = (id: string) => {
    setLocations(prev => prev.filter(location => location.id !== id));
    toast.success("Location deleted successfully");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Locations</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Location</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <div className="mb-4">
                <Label className="mb-2 block">Location Type</Label>
                <RadioGroup 
                  value={newLocation.type}
                  onValueChange={(value: 'Physical' | 'Virtual') => handleTypeChange(value)}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Physical" id="physical" />
                    <Label htmlFor="physical">Physical</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Virtual" id="virtual" />
                    <Label htmlFor="virtual">Virtual</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Location Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={newLocation.name}
                    onChange={handleNewLocationChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="address1">Address 1</Label>
                  <Input 
                    id="address1"
                    name="address1"
                    value={newLocation.address1}
                    onChange={handleNewLocationChange}
                    className="mt-1"
                    disabled={newLocation.type === 'Virtual'}
                  />
                </div>
                
                <div>
                  <Label htmlFor="address2">Address 2</Label>
                  <Input 
                    id="address2"
                    name="address2"
                    value={newLocation.address2}
                    onChange={handleNewLocationChange}
                    className="mt-1"
                    disabled={newLocation.type === 'Virtual'}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city"
                      name="city"
                      value={newLocation.city}
                      onChange={handleNewLocationChange}
                      className="mt-1"
                      disabled={newLocation.type === 'Virtual'}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select 
                      value={newLocation.state}
                      onValueChange={(value) => handleSelectChange('state', value)}
                      disabled={newLocation.type === 'Virtual'}
                    >
                      <SelectTrigger className="mt-1">
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
                  
                  <div>
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input 
                      id="zipCode"
                      name="zipCode"
                      value={newLocation.zipCode}
                      onChange={handleNewLocationChange}
                      className="mt-1"
                      disabled={newLocation.type === 'Virtual'}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    type="tel"
                    value={newLocation.phone}
                    onChange={handleNewLocationChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="billingNpi">Billing NPI</Label>
                  <Input 
                    id="billingNpi"
                    name="billingNpi"
                    value={newLocation.billingNpi}
                    onChange={handleNewLocationChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="ein">EIN</Label>
                  <Input 
                    id="ein"
                    name="ein"
                    value={newLocation.ein}
                    onChange={handleNewLocationChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="placeOfService">Place of Service (POS)</Label>
                  <Input 
                    id="placeOfService"
                    name="placeOfService"
                    value={newLocation.placeOfService}
                    onChange={handleNewLocationChange}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <Button onClick={handleAddLocation} className="mt-6 w-full">
                Add Location
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-6">
        {locations.map(location => (
          <Card key={location.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{location.name}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDeleteLocation(location.id)}
                >
                  <Trash2 size={16} className="text-red-500" />
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                {location.type}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {location.type === 'Physical' && (
                  <>
                    <div>
                      <span className="text-sm text-muted-foreground">Address:</span>
                      <p>
                        {location.address1}
                        {location.address2 && <span>, {location.address2}</span>}
                      </p>
                      <p>{location.city}, {location.state} {location.zipCode}</p>
                    </div>
                  </>
                )}
                <div>
                  <span className="text-sm text-muted-foreground">Phone:</span>
                  <p>{location.phone}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Billing NPI:</span>
                  <p>{location.billingNpi}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">EIN:</span>
                  <p>{location.ein}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Place of Service (POS):</span>
                  <p>{location.placeOfService}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LocationsSettings;
