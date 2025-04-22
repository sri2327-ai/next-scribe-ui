
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useForm } from "react-hook-form";

interface PatientProfileProps {
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

const PatientProfile: React.FC<PatientProfileProps> = ({ patient }) => {
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
      <Tabs defaultValue="contact" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="contact">Contact Info & Care Team</TabsTrigger>
          <TabsTrigger value="diagnoses">Diagnoses</TabsTrigger>
          <TabsTrigger value="allergies">Allergies</TabsTrigger>
          <TabsTrigger value="history">Medical History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="contact" className="space-y-6">
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
              <CardTitle className="text-xl">Care Coordination</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="family-physician">
                  <AccordionTrigger className="hover:no-underline">
                    Family physician / PCP
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-sm text-gray-500 italic">No provider information available</div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="mental-health">
                  <AccordionTrigger className="hover:no-underline">
                    Mental health provider(s)
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-sm text-gray-500 italic">No provider information available</div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="other-providers">
                  <AccordionTrigger className="hover:no-underline">
                    Other Healthcare provider(s)
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="border p-3 rounded-md">
                        <div className="flex justify-between">
                          <div>
                            <div className="font-medium">Frank Hua</div>
                            <div className="text-sm text-gray-600">Specialty: Primary Care Physician</div>
                            <div className="text-sm">Phone: (713) 442-1700</div>
                          </div>
                          {isEditing && (
                            <Button variant="outline" size="sm">Edit</Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="border p-3 rounded-md">
                        <div className="flex justify-between">
                          <div>
                            <div className="font-medium">Jeffery Junenu</div>
                            <div className="text-sm text-gray-600">Specialty: Gastroenterologist</div>
                            <div className="text-sm">Phone: (713) 442-1700</div>
                          </div>
                          {isEditing && (
                            <Button variant="outline" size="sm">Edit</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="pharmacy">
                  <AccordionTrigger className="hover:no-underline">
                    Preferred pharmacy
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-sm text-gray-500 italic">No pharmacy information available</div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="diagnoses">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Diagnoses</CardTitle>
                <Button>Edit diagnoses</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active">
                <TabsList className="mb-4">
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved</TabsTrigger>
                  <TabsTrigger value="reported">Patient-reported</TabsTrigger>
                </TabsList>
                
                <TabsContent value="active">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>April 22, 2025</TableCell>
                        <TableCell>R53.82</TableCell>
                        <TableCell>Chronic fatigue, unspecified</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>April 22, 2025</TableCell>
                        <TableCell>G43.009</TableCell>
                        <TableCell>Migraine without aura, not intractable, without status migrainosus</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>April 22, 2025</TableCell>
                        <TableCell>G89.4</TableCell>
                        <TableCell>Chronic pain syndrome</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>April 22, 2025</TableCell>
                        <TableCell>F41.1</TableCell>
                        <TableCell>Generalized anxiety disorder</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>April 22, 2025</TableCell>
                        <TableCell>F32.A</TableCell>
                        <TableCell>Depression, unspecified</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="inactive">
                  <div className="text-sm text-gray-500 italic p-4">No inactive diagnoses recorded</div>
                </TabsContent>
                
                <TabsContent value="resolved">
                  <div className="text-sm text-gray-500 italic p-4">No resolved diagnoses recorded</div>
                </TabsContent>
                
                <TabsContent value="reported">
                  <div className="p-4 text-sm">
                    <p className="mb-2">Anxiety, Depression, Learning Disorder, Post-Traumatic Stress Disorder (PTSD), Suicidal Ideation</p>
                    <p className="mb-2">Asthma, Non-Alcoholic Fatty Liver Disease (NAFLD), Cardiac Arrhythmia, Chronic Post Traumatic Headache, Migraine, Tension Headache, Crohn's Disease, Ulcerative Colitis, Stomach Ulcer, Hiatal Hernia, Gastro-Esophageal Reflux Disease (GERD), Autoimmune Disorders (Including Arthritis), Ear, Nose, or Throat Disorder, Chronic Pain, Gastrointestinal Disorder, Headaches (Including Migraines), Heart Condition, Liver Disease (Including Gallbladder), High Blood Pressure, Obesity, Lung/Respiratory Disorder, Unintentional Weight Gain</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="allergies">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Allergies</CardTitle>
                <Button>Edit allergies</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="drug">
                <TabsList className="mb-4">
                  <TabsTrigger value="drug">Drug</TabsTrigger>
                  <TabsTrigger value="food">Food</TabsTrigger>
                  <TabsTrigger value="environment">Environment</TabsTrigger>
                  <TabsTrigger value="other">Other</TabsTrigger>
                </TabsList>
                
                <TabsContent value="drug">
                  <div className="space-y-2">
                    <div className="p-3 border rounded-md">
                      <div className="font-medium">aspirin</div>
                      <div className="text-sm text-gray-600">Status: Active</div>
                      <div className="text-sm text-gray-600">Reaction: Unknown</div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="font-medium">codeine</div>
                      <div className="text-sm text-gray-600">Status: Active</div>
                      <div className="text-sm text-gray-600">Reaction: Unknown</div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="font-medium">morphine</div>
                      <div className="text-sm text-gray-600">Status: Active</div>
                      <div className="text-sm text-gray-600">Reaction: Unknown</div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="food">
                  <div className="text-sm text-gray-500 italic p-4">No food allergies recorded</div>
                </TabsContent>
                
                <TabsContent value="environment">
                  <div className="text-sm text-gray-500 italic p-4">No environment allergies recorded</div>
                </TabsContent>
                
                <TabsContent value="other">
                  <div className="text-sm text-gray-500 italic p-4">No other allergies recorded</div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Medical and Surgical History</CardTitle>
                <Button>Edit record</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="conditions">
                  <AccordionTrigger className="hover:no-underline">
                    Medical issues/conditions/diagnoses
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p className="font-medium">Conditions</p>
                      <p className="text-sm">
                        Asthma, Non-Alcoholic Fatty Liver Disease (NAFLD), Cardiac Arrhythmia, Chronic Post Traumatic Headache, Migraine, Tension Headache, Crohn's Disease, Ulcerative Colitis, Stomach Ulcer, Hiatal Hernia, Gastro-Esophageal Reflux Disease (GERD), Autoimmune Disorders (Including Arthritis), Ear, Nose, or Throat Disorder, Chronic Pain, Gastrointestinal Disorder, Headaches (Including Migraines), Heart Condition, Liver Disease (Including Gallbladder), High Blood Pressure, Obesity, Lung/Respiratory Disorder, Unintentional Weight Gain
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="pregnancies">
                  <AccordionTrigger className="hover:no-underline">
                    Pregnancies
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex">
                        <div className="w-1/3 font-medium">Pregnant or nursing?</div>
                        <div>No</div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="surgical">
                  <AccordionTrigger className="hover:no-underline">
                    Surgical History
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-sm text-gray-500 italic">No surgical history recorded</div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="notes">
                  <AccordionTrigger className="hover:no-underline">
                    Additional notes
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>prediabetic.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientProfile;
