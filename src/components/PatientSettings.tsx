
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Contact, Save, User, Bell, Calendar, MessageSquare, Upload, Settings, Mail } from "lucide-react";
import { toast } from "sonner";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PatientSettingsProps {
  patient: {
    name: string;
    phone: string;
    email: string;
  };
}

interface AddressInfo {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ContactInfo {
  email: string;
  cellPhone: string;
  homePhone: string;
  workPhone: string;
  emergencyContact: {
    name: string;
    phone: string;
    email: string;
    relationship: string;
  };
}

const PatientSettings: React.FC<PatientSettingsProps> = ({ patient }) => {
  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    addressLine1: "3111 Hummingbird Ln",
    addressLine2: "",
    city: "Humble",
    state: "Texas",
    zipCode: "77396"
  });
  
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: patient.email || "kellylynn.aceves@yahoo.com",
    cellPhone: patient.phone || "(832) 495-2856",
    homePhone: "",
    workPhone: "",
    emergencyContact: {
      name: "Destiny aceves",
      phone: "(832) 874-7976",
      email: "destiny.aceves@yahoo.com",
      relationship: "Daughter"
    }
  });

  const handleAddressChange = (field: keyof AddressInfo, value: string) => {
    setAddressInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field: keyof Omit<ContactInfo, 'emergencyContact'>, value: string) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmergencyContactChange = (field: keyof ContactInfo['emergencyContact'], value: string) => {
    setContactInfo(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }));
  };

  const handleToggleChange = (settingName: string, value: boolean) => {
    toast.success(`${settingName} ${value ? "enabled" : "disabled"}`);
  };

  const handleContactSave = () => {
    toast.success("Contact information updated successfully");
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="contact" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="contact">Contact Information</TabsTrigger>
          <TabsTrigger value="access">Portal Access</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Contact className="h-5 w-5" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="addressLine1">Address Line 1</Label>
                  <Input
                    id="addressLine1"
                    value={addressInfo.addressLine1}
                    onChange={(e) => handleAddressChange('addressLine1', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addressLine2">Address Line 2</Label>
                  <Input
                    id="addressLine2"
                    value={addressInfo.addressLine2}
                    onChange={(e) => handleAddressChange('addressLine2', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={addressInfo.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={addressInfo.state}
                      onChange={(e) => handleAddressChange('state', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                      id="zipCode"
                      value={addressInfo.zipCode}
                      onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cellPhone">Cell Phone</Label>
                  <Input
                    id="cellPhone"
                    value={contactInfo.cellPhone}
                    onChange={(e) => handleContactChange('cellPhone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="homePhone">Home Phone</Label>
                  <Input
                    id="homePhone"
                    value={contactInfo.homePhone}
                    onChange={(e) => handleContactChange('homePhone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workPhone">Work Phone</Label>
                  <Input
                    id="workPhone"
                    value={contactInfo.workPhone}
                    onChange={(e) => handleContactChange('workPhone', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="h-5 w-5" />
                Emergency Contact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Name</Label>
                  <Input
                    id="emergencyName"
                    value={contactInfo.emergencyContact.name}
                    onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Phone</Label>
                  <Input
                    id="emergencyPhone"
                    value={contactInfo.emergencyContact.phone}
                    onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyEmail">Email</Label>
                  <Input
                    id="emergencyEmail"
                    type="email"
                    value={contactInfo.emergencyContact.email}
                    onChange={(e) => handleEmergencyContactChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyRelationship">Relationship</Label>
                  <Input
                    id="emergencyRelationship"
                    value={contactInfo.emergencyContact.relationship}
                    onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
                  />
                </div>

                <Button onClick={handleContactSave} className="mt-4 w-full sm:w-auto">
                  <Save className="h-4 w-4 mr-2" />
                  Save Contact Info
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Patient Portal Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="portal-access" className="font-medium">Patient Portal Access</Label>
                    <p className="text-sm text-gray-500">Enable access to the online patient portal</p>
                  </div>
                  <Switch 
                    id="portal-access" 
                    defaultChecked 
                    onCheckedChange={(checked) => handleToggleChange("Patient Portal Access", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-messaging" className="font-medium">Allow Messaging</Label>
                    <p className="text-sm text-gray-500">Enable messaging capabilities within the portal</p>
                  </div>
                  <Switch 
                    id="allow-messaging" 
                    defaultChecked 
                    onCheckedChange={(checked) => handleToggleChange("Messaging", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-appointment" className="font-medium">Allow Appointment Scheduling</Label>
                    <p className="text-sm text-gray-500">Enable appointment scheduling through the portal</p>
                  </div>
                  <Switch 
                    id="allow-appointment" 
                    defaultChecked 
                    onCheckedChange={(checked) => handleToggleChange("Appointment Scheduling", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Document Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="view-documents" className="font-medium">View Documents</Label>
                    <p className="text-sm text-gray-500">Allow patient to view shared documents</p>
                  </div>
                  <Switch 
                    id="view-documents" 
                    defaultChecked 
                    onCheckedChange={(checked) => handleToggleChange("Document Viewing", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="upload-documents" className="font-medium">Upload Documents</Label>
                    <p className="text-sm text-gray-500">Allow patient to upload documents to their portal</p>
                  </div>
                  <Switch 
                    id="upload-documents" 
                    defaultChecked={false}
                    onCheckedChange={(checked) => handleToggleChange("Document Upload", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="appt-reminders" className="font-medium">Appointment Reminders</Label>
                    <p className="text-sm text-gray-500">Send reminders before scheduled appointments</p>
                  </div>
                  <Switch 
                    id="appt-reminders" 
                    defaultChecked 
                    onCheckedChange={(checked) => handleToggleChange("Appointment Reminders", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="med-reminders" className="font-medium">Medication Reminders</Label>
                    <p className="text-sm text-gray-500">Send reminders for medication schedules</p>
                  </div>
                  <Switch 
                    id="med-reminders" 
                    defaultChecked 
                    onCheckedChange={(checked) => handleToggleChange("Medication Reminders", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="result-updates" className="font-medium">Test Result Updates</Label>
                    <p className="text-sm text-gray-500">Notify when new test results are available</p>
                  </div>
                  <Switch 
                    id="result-updates" 
                    defaultChecked 
                    onCheckedChange={(checked) => handleToggleChange("Test Result Updates", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="billing-updates" className="font-medium">Billing Updates</Label>
                    <p className="text-sm text-gray-500">Send notifications about billing and payments</p>
                  </div>
                  <Switch 
                    id="billing-updates" 
                    defaultChecked 
                    onCheckedChange={(checked) => handleToggleChange("Billing Updates", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="shared-data" className="font-medium">Data Sharing Consent</Label>
                    <p className="text-sm text-gray-500">Allow sharing data with other healthcare providers</p>
                  </div>
                  <Switch 
                    id="shared-data" 
                    defaultChecked 
                    onCheckedChange={(checked) => handleToggleChange("Data Sharing Consent", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="research" className="font-medium">Research Participation</Label>
                    <p className="text-sm text-gray-500">Allow anonymized data to be used for research</p>
                  </div>
                  <Switch 
                    id="research" 
                    defaultChecked={false}
                    onCheckedChange={(checked) => handleToggleChange("Research Participation", checked)}
                  />
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="mt-4 px-2 py-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
                <p>Patient last accepted privacy policy: <strong>January 17, 2025</strong></p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientSettings;
