import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { Plus, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PatientProfileProps {
  patient: {
    name: string;
    phone: string;
    email: string;
  };
}

// ICD-10 database sample
const icdCodesDatabase = [
  { code: "R53.82", description: "Chronic fatigue, unspecified" },
  { code: "G43.009", description: "Migraine without aura, not intractable, without status migrainosus" },
  { code: "G89.4", description: "Chronic pain syndrome" },
  { code: "F41.1", description: "Generalized anxiety disorder" },
  { code: "F32.A", description: "Depression, unspecified" },
  { code: "I10", description: "Essential (primary) hypertension" },
  { code: "E11.9", description: "Type 2 diabetes mellitus without complications" },
  { code: "J45.909", description: "Unspecified asthma, uncomplicated" },
];

const PatientProfile: React.FC<PatientProfileProps> = ({ patient }) => {
  const [activeTab, setActiveTab] = useState("diagnoses");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredIcdCodes, setFilteredIcdCodes] = useState(icdCodesDatabase);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredIcdCodes(
      icdCodesDatabase.filter(
        (code) => 
          code.code.toLowerCase().includes(term.toLowerCase()) || 
          code.description.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const openDialog = (type: string) => {
    setDialogType(type);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="diagnoses">Diagnoses</TabsTrigger>
          <TabsTrigger value="allergies">Allergies</TabsTrigger>
          <TabsTrigger value="medicalHistory">Medical History</TabsTrigger>
          <TabsTrigger value="socialHistory">Social History</TabsTrigger>
          <TabsTrigger value="familyHistory">Family History</TabsTrigger>
          <TabsTrigger value="vitals">Flow Sheet (Vital Trends)</TabsTrigger>
          <TabsTrigger value="careTeam">Care Coordination</TabsTrigger>
        </TabsList>
        
        {/* Diagnoses Tab */}
        <TabsContent value="diagnoses" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Diagnoses</CardTitle>
                <Button onClick={() => openDialog("diagnoses")}>
                  <Plus className="mr-2 h-4 w-4" /> Add diagnosis
                </Button>
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
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>April 22, 2025</TableCell>
                        <TableCell>R53.82</TableCell>
                        <TableCell>Chronic fatigue, unspecified</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>April 22, 2025</TableCell>
                        <TableCell>G43.009</TableCell>
                        <TableCell>Migraine without aura, not intractable, without status migrainosus</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>April 22, 2025</TableCell>
                        <TableCell>G89.4</TableCell>
                        <TableCell>Chronic pain syndrome</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>April 22, 2025</TableCell>
                        <TableCell>F41.1</TableCell>
                        <TableCell>Generalized anxiety disorder</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>April 22, 2025</TableCell>
                        <TableCell>F32.A</TableCell>
                        <TableCell>Depression, unspecified</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
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
        
        {/* Allergies Tab */}
        <TabsContent value="allergies">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Allergies</CardTitle>
                <Button onClick={() => openDialog("allergies")}>
                  <Plus className="mr-2 h-4 w-4" /> Add allergy
                </Button>
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
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">aspirin</div>
                          <div className="text-sm text-gray-600">Status: Active</div>
                          <div className="text-sm text-gray-600">Reaction: Unknown</div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">codeine</div>
                          <div className="text-sm text-gray-600">Status: Active</div>
                          <div className="text-sm text-gray-600">Reaction: Unknown</div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">morphine</div>
                          <div className="text-sm text-gray-600">Status: Active</div>
                          <div className="text-sm text-gray-600">Reaction: Unknown</div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
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
        
        {/* Medical History Tab */}
        <TabsContent value="medicalHistory">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Medical History</CardTitle>
                <Button onClick={() => openDialog("medicalHistory")}>
                  <Plus className="mr-2 h-4 w-4" /> Add medical history
                </Button>
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
                      <div className="flex justify-between mb-4">
                        <p className="font-medium">Conditions</p>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-2" /> Edit
                        </Button>
                      </div>
                      <p className="text-sm">
                        Asthma, Non-Alcoholic Fatty Liver Disease (NAFLD), Cardiac Arrhythmia, Chronic Post Traumatic Headache, Migraine, Tension Headache, Crohn's Disease, Ulcerative Colitis, Stomach Ulcer, Hiatal Hernia, Gastro-Esophageal Reflux Disease (GERD), Autoimmune Disorders (Including Arthritis), Ear, Nose, or Throat Disorder, Chronic Pain, Gastrointestinal Disorder, Headaches (Including Migraines), Heart Condition, Liver Disease (Including Gallbladder), High Blood Pressure, Obesity, Lung/Respiratory Disorder, Unintentional Weight Gain
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="surgeries">
                  <AccordionTrigger className="hover:no-underline">
                    Surgical History
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex justify-between mb-4">
                      <p>Surgical Procedures</p>
                      <Button variant="outline" size="sm">
                        <Plus className="h-3 w-3 mr-2" /> Add surgery
                      </Button>
                    </div>
                    <div className="text-sm text-gray-500 italic">No surgical history recorded</div>
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
                
                <AccordionItem value="immunizations">
                  <AccordionTrigger className="hover:no-underline">
                    Immunization History
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex justify-between mb-4">
                      <p>Immunizations</p>
                      <Button variant="outline" size="sm">
                        <Plus className="h-3 w-3 mr-2" /> Add immunization
                      </Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Immunization</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Nov 10, 2024</TableCell>
                          <TableCell>Influenza vaccine</TableCell>
                          <TableCell>Complete</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Aug 15, 2023</TableCell>
                          <TableCell>COVID-19 Booster</TableCell>
                          <TableCell>Complete</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="notes">
                  <AccordionTrigger className="hover:no-underline">
                    Additional notes
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex justify-between mb-4">
                      <p>Medical Notes</p>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-2" /> Edit
                      </Button>
                    </div>
                    <p>prediabetic.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Social History Tab */}
        <TabsContent value="socialHistory">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Social History</CardTitle>
                <Button onClick={() => openDialog("socialHistory")}>
                  <Edit className="mr-2 h-4 w-4" /> Edit social history
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Tobacco Use</h3>
                  <div className="p-3 border rounded-md">
                    <div className="text-sm">Status: Never smoker</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Alcohol Use</h3>
                  <div className="p-3 border rounded-md">
                    <div className="text-sm">Status: Non-drinker</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Recreational Drug Use</h3>
                  <div className="p-3 border rounded-md">
                    <div className="text-sm">Status: Denies use</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Physical Activity</h3>
                  <div className="p-3 border rounded-md">
                    <div className="text-sm">Frequency: 2x weekly</div>
                    <div className="text-sm">Type: Walking</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Diet</h3>
                  <div className="p-3 border rounded-md">
                    <div className="text-sm">Type: No specific dietary pattern</div>
                    <div className="text-sm">Notes: Patient reports trying to reduce sugar intake</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Occupation</h3>
                  <div className="p-3 border rounded-md">
                    <div className="text-sm">Current: Administrative Assistant</div>
                    <div className="text-sm">Status: Full-time</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Family History Tab */}
        <TabsContent value="familyHistory">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Family History</CardTitle>
                <Button onClick={() => openDialog("familyHistory")}>
                  <Plus className="mr-2 h-4 w-4" /> Add family history
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Family Member</TableHead>
                    <TableHead>Medical Condition</TableHead>
                    <TableHead>Age of Onset</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Mother</TableCell>
                    <TableCell>Hypertension</TableCell>
                    <TableCell>45</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Father</TableCell>
                    <TableCell>Type 2 Diabetes</TableCell>
                    <TableCell>50</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Grandmother (maternal)</TableCell>
                    <TableCell>Breast Cancer</TableCell>
                    <TableCell>63</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Vitals Tab */}
        <TabsContent value="vitals">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Flow Sheet (Vital Trends)</CardTitle>
                <Button onClick={() => openDialog("vitals")}>
                  <Plus className="mr-2 h-4 w-4" /> Add vitals
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chart">
                <TabsList className="mb-4">
                  <TabsTrigger value="chart">Chart View</TabsTrigger>
                  <TabsTrigger value="table">Table View</TabsTrigger>
                </TabsList>
                
                <TabsContent value="chart">
                  <div className="h-64 border rounded-md p-4 flex items-center justify-center bg-gray-50">
                    <p className="text-gray-500">[Vital signs chart visualization would appear here]</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="table">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>BP</TableHead>
                        <TableHead>Pulse</TableHead>
                        <TableHead>Resp</TableHead>
                        <TableHead>Temp</TableHead>
                        <TableHead>Height</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>BMI</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Apr 22, 2025</TableCell>
                        <TableCell>135/85</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell>16</TableCell>
                        <TableCell>98.6°F</TableCell>
                        <TableCell>5'6"</TableCell>
                        <TableCell>165 lbs</TableCell>
                        <TableCell>26.6</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Feb 15, 2025</TableCell>
                        <TableCell>132/82</TableCell>
                        <TableCell>74</TableCell>
                        <TableCell>18</TableCell>
                        <TableCell>98.2°F</TableCell>
                        <TableCell>5'6"</TableCell>
                        <TableCell>168 lbs</TableCell>
                        <TableCell>27.1</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Nov 10, 2024</TableCell>
                        <TableCell>128/80</TableCell>
                        <TableCell>76</TableCell>
                        <TableCell>16</TableCell>
                        <TableCell>97.9°F</TableCell>
                        <TableCell>5'6"</TableCell>
                        <TableCell>170 lbs</TableCell>
                        <TableCell>27.4</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Care Coordination Tab */}
        <TabsContent value="careTeam">
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
                    <div className="flex justify-between mb-4">
                      <div className="text-sm text-gray-500 italic">No provider information available</div>
                      <Button variant="outline" size="sm">
                        <Plus className="h-3 w-3 mr-2" /> Add provider
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="mental-health">
                  <AccordionTrigger className="hover:no-underline">
                    Mental health provider(s)
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex justify-between mb-4">
                      <div className="text-sm text-gray-500 italic">No provider information available</div>
                      <Button variant="outline" size="sm">
                        <Plus className="h-3 w-3 mr-2" /> Add provider
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="other-providers">
                  <AccordionTrigger className="hover:no-underline">
                    Other Healthcare provider(s)
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex justify-between mb-4">
                        <div>Current providers</div>
                        <Button variant="outline" size="sm">
                          <Plus className="h-3 w-3 mr-2" /> Add provider
                        </Button>
                      </div>
                      <div className="border p-3 rounded-md">
                        <div className="flex justify-between">
                          <div>
                            <div className="font-medium">Frank Hua</div>
                            <div className="text-sm text-gray-600">Specialty: Primary Care Physician</div>
                            <div className="text-sm">Phone: (713) 442-1700</div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border p-3 rounded-md">
                        <div className="flex justify-between">
                          <div>
                            <div className="font-medium">Jeffery Junenu</div>
                            <div className="text-sm text-gray-600">Specialty: Gastroenterologist</div>
                            <div className="text-sm">Phone: (713) 442-1700</div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
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
                    <div className="flex justify-between mb-4">
                      <div className="text-sm text-gray-500 italic">No pharmacy information available</div>
                      <Button variant="outline" size="sm">
                        <Plus className="h-3 w-3 mr-2" /> Add pharmacy
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Dialog for adding new items */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {dialogType === "diagnoses" && "Add New Diagnosis"}
              {dialogType === "allergies" && "Add New Allergy"}
              {dialogType === "medicalHistory" && "Add Medical History"}
              {dialogType === "socialHistory" && "Edit Social History"}
              {dialogType === "familyHistory" && "Add Family History"}
              {dialogType === "vitals" && "Add Vital Signs"}
            </DialogTitle>
          </DialogHeader>
          
          {dialogType === "diagnoses" && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="search-icd" className="text-sm font-medium">
                  Search ICD-10 Code or Description
                </label>
                <Input 
                  id="search-icd"
                  placeholder="Start typing to search..." 
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              
              <div className="border rounded-md max-h-60 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIcdCodes.map((code, i) => (
                      <TableRow key={i}>
                        <TableCell>{code.code}</TableCell>
                        <TableCell>{code.description}</TableCell>
                        <TableCell>
                          <Button size="sm" onClick={() => setIsDialogOpen(false)}>
                            Select
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
          
          {/* Other dialog types would go here */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientProfile;
