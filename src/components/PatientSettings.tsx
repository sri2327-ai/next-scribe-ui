
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface PatientSettingsProps {
  patient: {
    name: string;
    phone: string;
    email: string;
  };
}

interface ContactFormValues {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  cellPhone: string;
  homePhone: string;
  workPhone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactEmail: string;
  emergencyContactRelationship: string;
  emergencyContactAuth: boolean;
}

const PatientSettings: React.FC<PatientSettingsProps> = ({ patient }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const form = useForm<ContactFormValues>({
    defaultValues: {
      addressLine1: "3111 Hummingbird Ln",
      addressLine2: "",
      city: "Humble",
      state: "Texas",
      zipCode: "77396",
      email: "kellylynn.aceves@yahoo.com",
      cellPhone: "(832) 495-2856",
      homePhone: "",
      workPhone: "",
      emergencyContactName: "Destiny aceves",
      emergencyContactPhone: "(832) 874-7976",
      emergencyContactEmail: "destiny.aceves@yahoo.com",
      emergencyContactRelationship: "Daughter",
      emergencyContactAuth: true
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log(data);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Contact Information</CardTitle>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly={!isEditing} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 2</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly={!isEditing} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly={!isEditing} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly={!isEditing} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly={!isEditing} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly={!isEditing} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cellPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cell Phone</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly={!isEditing} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="homePhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home Phone</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly={!isEditing} placeholder="Add" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="workPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Phone</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly={!isEditing} placeholder="Add" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-4">Emergency Contact</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="emergencyContactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly={!isEditing} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergencyContactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly={!isEditing} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergencyContactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly={!isEditing} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergencyContactRelationship"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relationship</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly={!isEditing} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Patient Portal Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="portal-access">Patient Portal Access</Label>
              <Switch id="portal-access" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="allow-messaging">Allow Messaging</Label>
              <Switch id="allow-messaging" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="allow-appointment">Allow Appointment Scheduling</Label>
              <Switch id="allow-appointment" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Notifications Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="appt-reminders">Appointment Reminders</Label>
              <Switch id="appt-reminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="med-reminders">Medication Reminders</Label>
              <Switch id="med-reminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="result-updates">Test Result Updates</Label>
              <Switch id="result-updates" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="billing-updates">Billing Updates</Label>
              <Switch id="billing-updates" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Privacy Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="shared-data">Data Sharing Consent</Label>
              <Switch id="shared-data" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="research">Research Participation</Label>
              <Switch id="research" />
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="mt-4 px-2 py-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
            <p>Patient last accepted privacy policy: <strong>January 17, 2025</strong></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientSettings;
