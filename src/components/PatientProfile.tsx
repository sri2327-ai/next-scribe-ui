
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { Plus, Edit, X, Save, ArrowLeft, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
  { code: "Z96.651", description: "Presence of right artificial knee joint" },
  { code: "K21.9", description: "Gastro-esophageal reflux disease without esophagitis" },
  { code: "M54.5", description: "Low back pain" },
  { code: "M79.604", description: "Pain in right leg" },
  { code: "M25.511", description: "Pain in right shoulder" },
  { code: "R42", description: "Dizziness and giddiness" },
  { code: "R05.1", description: "Acute cough" },
  { code: "Z90.49", description: "Acquired absence of other specified parts of digestive tract" },
];

// Sample allergy data
const allergiesDatabase = {
  drug: [
    { id: 1, name: "aspirin", status: "Active", reaction: "Unknown" },
    { id: 2, name: "codeine", status: "Active", reaction: "Unknown" },
    { id: 3, name: "morphine", status: "Active", reaction: "Unknown" },
  ],
  food: [],
  environment: [],
  other: []
};

// Sample medical history data
const medicalHistoryData = {
  conditions: "Asthma, Non-Alcoholic Fatty Liver Disease (NAFLD), Cardiac Arrhythmia, Chronic Post Traumatic Headache, Migraine, Tension Headache, Crohn's Disease, Ulcerative Colitis, Stomach Ulcer, Hiatal Hernia, Gastro-Esophageal Reflux Disease (GERD), Autoimmune Disorders (Including Arthritis), Ear, Nose, or Throat Disorder, Chronic Pain, Gastrointestinal Disorder, Headaches (Including Migraines), Heart Condition, Liver Disease (Including Gallbladder), High Blood Pressure, Obesity, Lung/Respiratory Disorder, Unintentional Weight Gain",
  surgeries: [],
  pregnancies: { isPregnant: false },
  immunizations: [
    { id: 1, date: "Nov 10, 2024", name: "Influenza vaccine", status: "Complete" },
    { id: 2, date: "Aug 15, 2023", name: "COVID-19 Booster", status: "Complete" }
  ],
  notes: "prediabetic."
};

// Sample family history data
const familyHistoryData = [
  { id: 1, member: "Mother", condition: "Hypertension", ageOfOnset: "45" },
  { id: 2, member: "Father", condition: "Type 2 Diabetes", ageOfOnset: "50" },
  { id: 3, member: "Grandmother (maternal)", condition: "Breast Cancer", ageOfOnset: "63" },
];

// Sample social history data
const socialHistoryData = {
  tobaccoUse: "Never smoker",
  alcoholUse: "Non-drinker",
  drugUse: "Denies use",
  physicalActivity: { frequency: "2x weekly", type: "Walking" },
  diet: { type: "No specific dietary pattern", notes: "Patient reports trying to reduce sugar intake" },
  occupation: { current: "Administrative Assistant", status: "Full-time" }
};

// Sample vitals data
const vitalsData = [
  { date: "Apr 22, 2025", bp: "135/85", pulse: "72", resp: "16", temp: "98.6°F", height: "5'6\"", weight: "165 lbs", bmi: "26.6" },
  { date: "Feb 15, 2025", bp: "132/82", pulse: "74", resp: "18", temp: "98.2°F", height: "5'6\"", weight: "168 lbs", bmi: "27.1" },
  { date: "Nov 10, 2024", bp: "128/80", pulse: "76", resp: "16", temp: "97.9°F", height: "5'6\"", weight: "170 lbs", bmi: "27.4" },
];

// Sample care team data
const careTeamData = {
  primaryCare: [],
  mentalHealth: [],
  otherProviders: [
    { id: 1, name: "Frank Hua", specialty: "Primary Care Physician", phone: "(713) 442-1700" },
    { id: 2, name: "Jeffery Junenu", specialty: "Gastroenterologist", phone: "(713) 442-1700" },
  ],
  pharmacy: []
};

// Sample diagnoses data
const diagnosesData = {
  active: [
    { id: 1, date: "April 22, 2025", code: "R53.82", description: "Chronic fatigue, unspecified" },
    { id: 2, date: "April 22, 2025", code: "G43.009", description: "Migraine without aura, not intractable, without status migrainosus" },
    { id: 3, date: "April 22, 2025", code: "G89.4", description: "Chronic pain syndrome" },
    { id: 4, date: "April 22, 2025", code: "F41.1", description: "Generalized anxiety disorder" },
    { id: 5, date: "April 22, 2025", code: "F32.A", description: "Depression, unspecified" },
  ],
  inactive: [],
  resolved: [],
  reported: "Anxiety, Depression, Learning Disorder, Post-Traumatic Stress Disorder (PTSD), Suicidal Ideation\n\nAsthma, Non-Alcoholic Fatty Liver Disease (NAFLD), Cardiac Arrhythmia, Chronic Post Traumatic Headache, Migraine, Tension Headache, Crohn's Disease, Ulcerative Colitis, Stomach Ulcer, Hiatal Hernia, Gastro-Esophageal Reflux Disease (GERD), Autoimmune Disorders (Including Arthritis), Ear, Nose, or Throat Disorder, Chronic Pain, Gastrointestinal Disorder, Headaches (Including Migraines), Heart Condition, Liver Disease (Including Gallbladder), High Blood Pressure, Obesity, Lung/Respiratory Disorder, Unintentional Weight Gain"
};

const PatientProfile: React.FC<PatientProfileProps> = ({ patient }) => {
  // State management
  const [activeTab, setActiveTab] = useState("diagnoses");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredIcdCodes, setFilteredIcdCodes] = useState(icdCodesDatabase);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [detailItem, setDetailItem] = useState<any>(null);

  // State for each data type
  const [diagnoses, setDiagnoses] = useState(diagnosesData);
  const [allergies, setAllergies] = useState(allergiesDatabase);
  const [medicalHistory, setMedicalHistory] = useState(medicalHistoryData);
  const [socialHistory, setSocialHistory] = useState(socialHistoryData);
  const [familyHistory, setFamilyHistory] = useState(familyHistoryData);
  const [vitals, setVitals] = useState(vitalsData);
  const [careTeam, setCareTeam] = useState(careTeamData);

  // Forms
  const diagnosisForm = useForm({
    defaultValues: {
      code: "",
      description: "",
      status: "active",
      notes: ""
    }
  });

  const allergyForm = useForm({
    defaultValues: {
      name: "",
      type: "drug",
      status: "Active",
      reaction: "",
      severity: "Moderate",
      notes: ""
    }
  });

  const medicalHistoryForm = useForm({
    defaultValues: {
      conditions: medicalHistory.conditions,
      isPregnant: medicalHistory.pregnancies.isPregnant,
      notes: medicalHistory.notes
    }
  });

  const surgeryForm = useForm({
    defaultValues: {
      procedure: "",
      date: "",
      provider: "",
      facility: "",
      notes: ""
    }
  });

  const immunizationForm = useForm({
    defaultValues: {
      name: "",
      date: "",
      status: "Complete"
    }
  });

  const familyHistoryForm = useForm({
    defaultValues: {
      member: "",
      relationship: "",
      condition: "",
      ageOfOnset: "",
      notes: ""
    }
  });

  const socialHistoryForm = useForm({
    defaultValues: {
      tobaccoUse: socialHistory.tobaccoUse,
      alcoholUse: socialHistory.alcoholUse,
      drugUse: socialHistory.drugUse,
      activityFrequency: socialHistory.physicalActivity.frequency,
      activityType: socialHistory.physicalActivity.type,
      dietType: socialHistory.diet.type,
      dietNotes: socialHistory.diet.notes,
      occupation: socialHistory.occupation.current,
      occupationStatus: socialHistory.occupation.status
    }
  });

  const vitalForm = useForm({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      bp: "",
      pulse: "",
      resp: "",
      temp: "",
      height: "",
      weight: "",
      bmi: ""
    }
  });

  const providerForm = useForm({
    defaultValues: {
      name: "",
      specialty: "",
      phone: "",
      email: "",
      address: "",
      type: "primaryCare" // primaryCare, mentalHealth, otherProviders, pharmacy
    }
  });

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

  const openDialog = (type: string, item?: any) => {
    setDialogType(type);
    setIsDialogOpen(true);

    if (item) {
      switch (type) {
        case "diagnoses":
          diagnosisForm.reset({
            code: item.code,
            description: item.description,
            status: "active",
            notes: ""
          });
          setSelectedDiagnosis(item);
          break;
        case "allergies":
          allergyForm.reset({
            name: item.name,
            type: "drug",
            status: item.status,
            reaction: item.reaction || "",
            severity: "Moderate",
            notes: ""
          });
          break;
        case "familyHistory":
          familyHistoryForm.reset({
            member: item.member,
            relationship: "",
            condition: item.condition,
            ageOfOnset: item.ageOfOnset,
            notes: ""
          });
          break;
        default:
          break;
      }
    }
  };

  const handleAddDiagnosis = (data: any) => {
    const today = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const newDiagnosis = {
      id: diagnoses.active.length > 0 ? Math.max(...diagnoses.active.map(d => d.id)) + 1 : 1,
      date: today,
      code: selectedDiagnosis.code,
      description: selectedDiagnosis.description,
      notes: data.notes
    };

    if (data.status === "active") {
      setDiagnoses(prev => ({
        ...prev,
        active: [...prev.active, newDiagnosis]
      }));
    } else if (data.status === "inactive") {
      setDiagnoses(prev => ({
        ...prev,
        inactive: [...prev.inactive, newDiagnosis]
      }));
    } else if (data.status === "resolved") {
      setDiagnoses(prev => ({
        ...prev,
        resolved: [...prev.resolved, newDiagnosis]
      }));
    }

    toast.success("Diagnosis added successfully");
    setIsDialogOpen(false);
    diagnosisForm.reset();
    setSelectedDiagnosis(null);
  };

  const handleAddAllergy = (data: any) => {
    const newAllergy = {
      id: allergies[data.type as keyof typeof allergies].length > 0 
        ? Math.max(...allergies[data.type as keyof typeof allergies].map(a => a.id)) + 1 
        : 1,
      name: data.name,
      status: data.status,
      reaction: data.reaction,
      severity: data.severity,
      notes: data.notes
    };

    setAllergies(prev => ({
      ...prev,
      [data.type]: [...prev[data.type as keyof typeof allergies], newAllergy]
    }));

    toast.success("Allergy added successfully");
    setIsDialogOpen(false);
    allergyForm.reset();
  };

  const handleAddFamilyHistory = (data: any) => {
    const newFamilyHistory = {
      id: familyHistory.length > 0 ? Math.max(...familyHistory.map(f => f.id)) + 1 : 1,
      member: data.member,
      condition: data.condition,
      ageOfOnset: data.ageOfOnset,
      notes: data.notes
    };

    setFamilyHistory(prev => [...prev, newFamilyHistory]);
    toast.success("Family history added successfully");
    setIsDialogOpen(false);
    familyHistoryForm.reset();
  };

  const handleAddSurgery = (data: any) => {
    const newSurgery = {
      id: medicalHistory.surgeries.length > 0 ? Math.max(...medicalHistory.surgeries.map(s => s.id)) + 1 : 1,
      procedure: data.procedure,
      date: data.date,
      provider: data.provider,
      facility: data.facility,
      notes: data.notes
    };

    setMedicalHistory(prev => ({
      ...prev,
      surgeries: [...prev.surgeries, newSurgery]
    }));

    toast.success("Surgery history added successfully");
    setIsDialogOpen(false);
    surgeryForm.reset();
  };

  const handleAddImmunization = (data: any) => {
    const newImmunization = {
      id: medicalHistory.immunizations.length > 0 ? Math.max(...medicalHistory.immunizations.map(i => i.id)) + 1 : 1,
      name: data.name,
      date: data.date,
      status: data.status
    };

    setMedicalHistory(prev => ({
      ...prev,
      immunizations: [...prev.immunizations, newImmunization]
    }));

    toast.success("Immunization added successfully");
    setIsDialogOpen(false);
    immunizationForm.reset();
  };

  const handleAddVital = (data: any) => {
    const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });

    const weight = parseFloat(data.weight);
    const heightInches = parseFloat(data.height);
    const calculatedBMI = (weight / (heightInches * heightInches)) * 703;

    const newVital = {
      date: formattedDate,
      bp: data.bp,
      pulse: data.pulse,
      resp: data.resp,
      temp: data.temp,
      height: data.height,
      weight: data.weight,
      bmi: calculatedBMI.toFixed(1)
    };

    setVitals(prev => [newVital, ...prev]);
    toast.success("Vital signs added successfully");
    setIsDialogOpen(false);
    vitalForm.reset();
  };

  const handleAddProvider = (data: any) => {
    const newProvider = {
      id: careTeam[data.type as keyof typeof careTeam].length > 0 
        ? Math.max(...careTeam[data.type as keyof typeof careTeam].map(p => p.id)) + 1 
        : 1,
      name: data.name,
      specialty: data.specialty,
      phone: data.phone,
      email: data.email || "",
      address: data.address || ""
    };

    setCareTeam(prev => ({
      ...prev,
      [data.type]: [...prev[data.type as keyof typeof careTeam], newProvider]
    }));

    toast.success("Provider added successfully");
    setIsDialogOpen(false);
    providerForm.reset();
  };

  const handleUpdateMedicalHistory = (data: any) => {
    setMedicalHistory(prev => ({
      ...prev,
      conditions: data.conditions,
      pregnancies: { isPregnant: data.isPregnant },
      notes: data.notes
    }));

    toast.success("Medical history updated successfully");
    setIsEditing(null);
  };

  const handleUpdateSocialHistory = (data: any) => {
    setSocialHistory({
      tobaccoUse: data.tobaccoUse,
      alcoholUse: data.alcoholUse,
      drugUse: data.drugUse,
      physicalActivity: {
        frequency: data.activityFrequency,
        type: data.activityType
      },
      diet: {
        type: data.dietType,
        notes: data.dietNotes
      },
      occupation: {
        current: data.occupation,
        status: data.occupationStatus
      }
    });

    toast.success("Social history updated successfully");
    setIsEditing(null);
  };

  const handleDeleteDiagnosis = (id: number, status: string) => {
    if (status === "active") {
      setDiagnoses(prev => ({
        ...prev,
        active: prev.active.filter(d => d.id !== id)
      }));
    } else if (status === "inactive") {
      setDiagnoses(prev => ({
        ...prev,
        inactive: prev.inactive.filter(d => d.id !== id)
      }));
    } else if (status === "resolved") {
      setDiagnoses(prev => ({
        ...prev,
        resolved: prev.resolved.filter(d => d.id !== id)
      }));
    }

    toast.success("Diagnosis removed successfully");
  };

  const handleDeleteAllergy = (id: number, type: string) => {
    setAllergies(prev => ({
      ...prev,
      [type]: prev[type as keyof typeof allergies].filter(a => a.id !== id)
    }));

    toast.success("Allergy removed successfully");
  };

  const handleDeleteFamilyHistory = (id: number) => {
    setFamilyHistory(prev => prev.filter(f => f.id !== id));
    toast.success("Family history removed successfully");
  };

  const handleDeleteSurgery = (id: number) => {
    setMedicalHistory(prev => ({
      ...prev,
      surgeries: prev.surgeries.filter(s => s.id !== id)
    }));

    toast.success("Surgery history removed successfully");
  };

  const handleDeleteImmunization = (id: number) => {
    setMedicalHistory(prev => ({
      ...prev,
      immunizations: prev.immunizations.filter(i => i.id !== id)
    }));

    toast.success("Immunization removed successfully");
  };

  const handleDeleteVital = (date: string) => {
    setVitals(prev => prev.filter(v => v.date !== date));
    toast.success("Vital signs removed successfully");
  };

  const handleDeleteProvider = (id: number, type: string) => {
    setCareTeam(prev => ({
      ...prev,
      [type]: prev[type as keyof typeof careTeam].filter(p => p.id !== id)
    }));

    toast.success("Provider removed successfully");
  };

  const viewDetails = (item: any, type: string) => {
    setDetailItem({ ...item, type });
    setIsDetailView(true);
  };

  const renderDialog = () => {
    switch (dialogType) {
      case "diagnoses":
        return (
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
                    <TableRow key={i} className={selectedDiagnosis?.code === code.code ? "bg-blue-50" : ""}>
                      <TableCell>{code.code}</TableCell>
                      <TableCell>{code.description}</TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          onClick={() => setSelectedDiagnosis(code)}
                          variant={selectedDiagnosis?.code === code.code ? "default" : "outline"}
                        >
                          Select
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {selectedDiagnosis && (
              <Form {...diagnosisForm}>
                <form onSubmit={diagnosisForm.handleSubmit(handleAddDiagnosis)} className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded-md">
                    <div className="font-medium">{selectedDiagnosis.code} - {selectedDiagnosis.description}</div>
                  </div>

                  <FormField
                    control={diagnosisForm.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <RadioGroup 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            className="flex flex-row gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="active" id="active" />
                              <Label htmlFor="active">Active</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="inactive" id="inactive" />
                              <Label htmlFor="inactive">Inactive</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="resolved" id="resolved" />
                              <Label htmlFor="resolved">Resolved</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={diagnosisForm.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes (optional)</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Add any notes about this diagnosis..." />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" onClick={() => {
                      setIsDialogOpen(false);
                      setSelectedDiagnosis(null);
                    }}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Diagnosis</Button>
                  </div>
                </form>
              </Form>
            )}

            {!selectedDiagnosis && (
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button disabled>Select a diagnosis first</Button>
              </div>
            )}
          </div>
        );
      
      case "allergies":
        return (
          <Form {...allergyForm}>
            <form onSubmit={allergyForm.handleSubmit(handleAddAllergy)} className="space-y-4 py-4">
              <FormField
                control={allergyForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allergy Type</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        className="flex flex-row gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="drug" id="drug" />
                          <Label htmlFor="drug">Drug</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="food" id="food" />
                          <Label htmlFor="food">Food</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="environment" id="environment" />
                          <Label htmlFor="environment">Environment</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={allergyForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter allergy name" required />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={allergyForm.control}
                name="reaction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reaction</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Describe reaction (e.g. Hives, Anaphylaxis)" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={allergyForm.control}
                name="severity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Severity</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mild">Mild</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="Severe">Severe</SelectItem>
                        <SelectItem value="Unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={allergyForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={allergyForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (optional)</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Add any notes about this allergy..." />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Allergy</Button>
              </div>
            </form>
          </Form>
        );

      case "medicalHistory":
        return (
          <Form {...medicalHistoryForm}>
            <form onSubmit={medicalHistoryForm.handleSubmit(handleUpdateMedicalHistory)} className="space-y-4 py-4">
              <FormField
                control={medicalHistoryForm.control}
                name="conditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medical Conditions</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="List medical conditions..." rows={6} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={medicalHistoryForm.control}
                name="isPregnant"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Switch 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                          id="pregnancy-status" 
                        />
                      </FormControl>
                      <Label htmlFor="pregnancy-status">Currently pregnant or nursing</Label>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={medicalHistoryForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Medical Notes</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Additional notes..." />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Medical History</Button>
              </div>
            </form>
          </Form>
        );

      case "surgery":
        return (
          <Form {...surgeryForm}>
            <form onSubmit={surgeryForm.handleSubmit(handleAddSurgery)} className="space-y-4 py-4">
              <FormField
                control={surgeryForm.control}
                name="procedure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Procedure</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter procedure name" required />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={surgeryForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={surgeryForm.control}
                name="provider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provider</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter provider name" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={surgeryForm.control}
                name="facility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facility</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter facility name" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={surgeryForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (optional)</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Additional notes..." />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Surgery</Button>
              </div>
            </form>
          </Form>
        );

      case "immunization":
        return (
          <Form {...immunizationForm}>
            <form onSubmit={immunizationForm.handleSubmit(handleAddImmunization)} className="space-y-4 py-4">
              <FormField
                control={immunizationForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Immunization</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter immunization name" required />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={immunizationForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={immunizationForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Complete">Complete</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Not Done">Not Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Immunization</Button>
              </div>
            </form>
          </Form>
        );

      case "socialHistory":
        return (
          <Form {...socialHistoryForm}>
            <form onSubmit={socialHistoryForm.handleSubmit(handleUpdateSocialHistory)} className="space-y-4 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={socialHistoryForm.control}
                  name="tobaccoUse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tobacco Use</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Never smoker">Never smoker</SelectItem>
                          <SelectItem value="Former smoker">Former smoker</SelectItem>
                          <SelectItem value="Current every day smoker">Current every day smoker</SelectItem>
                          <SelectItem value="Current some day smoker">Current some day smoker</SelectItem>
                          <SelectItem value="Smoker, status unknown">Smoker, status unknown</SelectItem>
                          <SelectItem value="Unknown if ever smoked">Unknown if ever smoked</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={socialHistoryForm.control}
                  name="alcoholUse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alcohol Use</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Non-drinker">Non-drinker</SelectItem>
                          <SelectItem value="Occasional">Occasional</SelectItem>
                          <SelectItem value="Moderate">Moderate</SelectItem>
                          <SelectItem value="Heavy">Heavy</SelectItem>
                          <SelectItem value="Former drinker">Former drinker</SelectItem>
                          <SelectItem value="Unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={socialHistoryForm.control}
                  name="drugUse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recreational Drug Use</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Denies use">Denies use</SelectItem>
                          <SelectItem value="Current use">Current use</SelectItem>
                          <SelectItem value="Former use">Former use</SelectItem>
                          <SelectItem value="Unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={socialHistoryForm.control}
                  name="activityFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Physical Activity Frequency</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. 2x weekly" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={socialHistoryForm.control}
                  name="activityType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Physical Activity Type</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. Walking, Swimming" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={socialHistoryForm.control}
                  name="dietType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diet Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select diet type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="No specific dietary pattern">No specific dietary pattern</SelectItem>
                          <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="Vegan">Vegan</SelectItem>
                          <SelectItem value="Gluten-free">Gluten-free</SelectItem>
                          <SelectItem value="Dairy-free">Dairy-free</SelectItem>
                          <SelectItem value="Low carb">Low carb</SelectItem>
                          <SelectItem value="Low sodium">Low sodium</SelectItem>
                          <SelectItem value="Low fat">Low fat</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={socialHistoryForm.control}
                  name="dietNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diet Notes</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Additional diet information" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={socialHistoryForm.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupation</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Current occupation" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={socialHistoryForm.control}
                  name="occupationStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Unemployed">Unemployed</SelectItem>
                          <SelectItem value="Retired">Retired</SelectItem>
                          <SelectItem value="Disabled">Disabled</SelectItem>
                          <SelectItem value="Student">Student</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Social History</Button>
              </div>
            </form>
          </Form>
        );
        
      case "familyHistory":
        return (
          <Form {...familyHistoryForm}>
            <form onSubmit={familyHistoryForm.handleSubmit(handleAddFamilyHistory)} className="space-y-4 py-4">
              <FormField
                control={familyHistoryForm.control}
                name="member"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Family Member</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select family member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mother">Mother</SelectItem>
                        <SelectItem value="Father">Father</SelectItem>
                        <SelectItem value="Sister">Sister</SelectItem>
                        <SelectItem value="Brother">Brother</SelectItem>
                        <SelectItem value="Daughter">Daughter</SelectItem>
                        <SelectItem value="Son">Son</SelectItem>
                        <SelectItem value="Grandmother (maternal)">Grandmother (maternal)</SelectItem>
                        <SelectItem value="Grandfather (maternal)">Grandfather (maternal)</SelectItem>
                        <SelectItem value="Grandmother (paternal)">Grandmother (paternal)</SelectItem>
                        <SelectItem value="Grandfather (paternal)">Grandfather (paternal)</SelectItem>
                        <SelectItem value="Aunt">Aunt</SelectItem>
                        <SelectItem value="Uncle">Uncle</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={familyHistoryForm.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medical Condition</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter medical condition" required />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={familyHistoryForm.control}
                name="ageOfOnset"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age of Onset</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter age" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={familyHistoryForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (optional)</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Additional notes..." />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Family History</Button>
              </div>
            </form>
          </Form>
        );

      case "vitals":
        return (
          <Form {...vitalForm}>
            <form onSubmit={vitalForm.handleSubmit(handleAddVital)} className="space-y-4 py-4">
              <FormField
                control={vitalForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={vitalForm.control}
                  name="bp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Pressure (mmHg)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. 120/80" required />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={vitalForm.control}
                  name="pulse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pulse (bpm)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. 72" required />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={vitalForm.control}
                  name="resp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Respiratory Rate (breaths/min)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. 16" required />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={vitalForm.control}
                  name="temp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temperature (°F)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. 98.6" required />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={vitalForm.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (inches)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. 66" required />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={vitalForm.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (lbs)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. 165" required />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Vital Signs</Button>
              </div>
            </form>
          </Form>
        );

      case "provider":
        return (
          <Form {...providerForm}>
            <form onSubmit={providerForm.handleSubmit(handleAddProvider)} className="space-y-4 py-4">
              <FormField
                control={providerForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provider Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primaryCare">Primary Care</SelectItem>
                        <SelectItem value="mentalHealth">Mental Health</SelectItem>
                        <SelectItem value="otherProviders">Other Provider</SelectItem>
                        <SelectItem value="pharmacy">Pharmacy</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={providerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter provider name" required />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={providerForm.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialty</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter specialty" required />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={providerForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter phone number" required />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={providerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter email address" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={providerForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address (optional)</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Enter address" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Provider</Button>
              </div>
            </form>
          </Form>
        );

      default:
        return null;
    }
  };

  // Detail view content
  const renderDetailView = () => {
    if (!detailItem) return null;

    const handleBack = () => {
      setIsDetailView(false);
      setDetailItem(null);
    };

    switch (detailItem.type) {
      case "diagnosis":
        return (
          <div>
            <Button variant="outline" className="mb-4" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Diagnoses
            </Button>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{detailItem.code} - {detailItem.description}</span>
                  <Badge variant={detailItem.status === "active" ? "default" : "outline"}>
                    {detailItem.status === "active" ? "Active" : detailItem.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="font-medium text-sm text-gray-500">Date Added</div>
                    <div>{detailItem.date}</div>
                  </div>
                  
                  {detailItem.notes && (
                    <div>
                      <div className="font-medium text-sm text-gray-500">Notes</div>
                      <div>{detailItem.notes}</div>
                    </div>
                  )}
                  
                  <div className="pt-4 flex justify-end space-x-2">
                    <Button variant="outline" onClick={handleBack}>Close</Button>
                    <Button variant="destructive" onClick={() => {
                      handleDeleteDiagnosis(detailItem.id, detailItem.status);
                      handleBack();
                    }}>
                      Delete Diagnosis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      default:
        return (
          <div>
            <Button variant="outline" className="mb-4" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <Card>
              <CardHeader>
                <CardTitle>Detail View</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-50 p-4 rounded-md overflow-auto">
                  {JSON.stringify(detailItem, null, 2)}
                </pre>
                
                <div className="pt-4 flex justify-end">
                  <Button variant="outline" onClick={handleBack}>Close</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  if (isDetailView) {
    return renderDetailView();
  }

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
                      {diagnoses.active.length > 0 ? (
                        diagnoses.active.map((diagnosis) => (
                          <TableRow key={diagnosis.id}>
                            <TableCell>{diagnosis.date}</TableCell>
                            <TableCell>{diagnosis.code}</TableCell>
                            <TableCell>{diagnosis.description}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => viewDetails({...diagnosis, status: "active"}, "diagnosis")}
                                >
                                  View
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-500"
                                  onClick={() => handleDeleteDiagnosis(diagnosis.id, "active")}
                                >
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                            No active diagnoses found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="inactive">
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
                      {diagnoses.inactive.length > 0 ? (
                        diagnoses.inactive.map((diagnosis) => (
                          <TableRow key={diagnosis.id}>
                            <TableCell>{diagnosis.date}</TableCell>
                            <TableCell>{diagnosis.code}</TableCell>
                            <TableCell>{diagnosis.description}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => viewDetails({...diagnosis, status: "inactive"}, "diagnosis")}
                                >
                                  View
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-500"
                                  onClick={() => handleDeleteDiagnosis(diagnosis.id, "inactive")}
                                >
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                            No inactive diagnoses found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="resolved">
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
                      {diagnoses.resolved.length > 0 ? (
                        diagnoses.resolved.map((diagnosis) => (
                          <TableRow key={diagnosis.id}>
                            <TableCell>{diagnosis.date}</TableCell>
                            <TableCell>{diagnosis.code}</TableCell>
                            <TableCell>{diagnosis.description}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => viewDetails({...diagnosis, status: "resolved"}, "diagnosis")}
                                >
                                  View
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-500"
                                  onClick={() => handleDeleteDiagnosis(diagnosis.id, "resolved")}
                                >
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                            No resolved diagnoses found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="reported">
                  <div className="p-4 text-sm">
                    <p className="mb-2">{diagnoses.reported}</p>
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
                    {allergies.drug.length > 0 ? (
                      allergies.drug.map(allergy => (
                        <div key={allergy.id} className="p-3 border rounded-md">
                          <div className="flex justify-between">
                            <div>
                              <div className="font-medium">{allergy.name}</div>
                              <div className="text-sm text-gray-600">Status: {allergy.status}</div>
                              <div className="text-sm text-gray-600">Reaction: {allergy.reaction || "Unknown"}</div>
                            </div>
                            <div className="flex">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-500"
                                onClick={() => handleDeleteAllergy(allergy.id, "drug")}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500 italic p-4">No drug allergies recorded</div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="food">
                  <div className="space-y-2">
                    {allergies.food.length > 0 ? (
                      allergies.food.map(allergy => (
                        <div key={allergy.id} className="p-3 border rounded-md">
                          <div className="flex justify-between">
                            <div>
                              <div className="font-medium">{allergy.name}</div>
                              <div className="text-sm text-gray-600">Status: {allergy.status}</div>
                              <div className="text-sm text-gray-600">Reaction: {allergy.reaction || "Unknown"}</div>
                            </div>
                            <div className="flex">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-500"
                                onClick={() => handleDeleteAllergy(allergy.id, "food")}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500 italic p-4">No food allergies recorded</div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="environment">
                  <div className="space-y-2">
                    {allergies.environment.length > 0 ? (
                      allergies.environment.map(allergy => (
                        <div key={allergy.id} className="p-3 border rounded-md">
                          <div className="flex justify-between">
                            <div>
                              <div className="font-medium">{allergy.name}</div>
                              <div className="text-sm text-gray-600">Status: {allergy.status}</div>
                              <div className="text-sm text-gray-600">Reaction: {allergy.reaction || "Unknown"}</div>
                            </div>
                            <div className="flex">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-500"
                                onClick={() => handleDeleteAllergy(allergy.id, "environment")}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500 italic p-4">No environment allergies recorded</div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="other">
                  <div className="space-y-2">
                    {allergies.other.length > 0 ? (
                      allergies.other.map(allergy => (
                        <div key={allergy.id} className="p-3 border rounded-md">
                          <div className="flex justify-between">
                            <div>
                              <div className="font-medium">{allergy.name}</div>
                              <div className="text-sm text-gray-600">Status: {allergy.status}</div>
                              <div className="text-sm text-gray-600">Reaction: {allergy.reaction || "Unknown"}</div>
                            </div>
                            <div className="flex">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-500"
                                onClick={() => handleDeleteAllergy(allergy.id, "other")}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500 italic p-4">No other allergies recorded</div>
                    )}
                  </div>
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
                  <Edit className="mr-2 h-4 w-4" /> Edit medical history
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
                        <Button variant="outline" size="sm" onClick={() => openDialog("medicalHistory")}>
                          <Edit className="h-3 w-3 mr-2" /> Edit
                        </Button>
                      </div>
                      <p className="text-sm">
                        {medicalHistory.conditions}
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
                      <Button variant="outline" size="sm" onClick={() => openDialog("surgery")}>
                        <Plus className="h-3 w-3 mr-2" /> Add surgery
                      </Button>
                    </div>
                    {medicalHistory.surgeries.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Procedure</TableHead>
                            <TableHead>Provider</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {medicalHistory.surgeries.map(surgery => (
                            <TableRow key={surgery.id}>
                              <TableCell>{surgery.date}</TableCell>
                              <TableCell>{surgery.procedure}</TableCell>
                              <TableCell>{surgery.provider}</TableCell>
                              <TableCell>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-500"
                                  onClick={() => handleDeleteSurgery(surgery.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-sm text-gray-500 italic">No surgical history recorded</div>
                    )}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="pregnancies">
                  <AccordionTrigger className="hover:no-underline">
                    Pregnancies
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="w-1/3 font-medium">Pregnant or nursing?</div>
                        <div>
                          {medicalHistory.pregnancies.isPregnant ? "Yes" : "No"}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="ml-4"
                            onClick={() => openDialog("medicalHistory")}
                          >
                            <Edit className="h-3 w-3 mr-2" /> Edit
                          </Button>
                        </div>
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
                      <Button variant="outline" size="sm" onClick={() => openDialog("immunization")}>
                        <Plus className="h-3 w-3 mr-2" /> Add immunization
                      </Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Immunization</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {medicalHistory.immunizations.map(immunization => (
                          <TableRow key={immunization.id}>
                            <TableCell>{immunization.date}</TableCell>
                            <TableCell>{immunization.name}</TableCell>
                            <TableCell>{immunization.status}</TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-500"
                                onClick={() => handleDeleteImmunization(immunization.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
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
                      <Button variant="outline" size="sm" onClick={() => openDialog("medicalHistory")}>
                        <Edit className="h-3 w-3 mr-2" /> Edit
                      </Button>
                    </div>
                    <p>{medicalHistory.notes}</p>
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
                    <div className="text-sm">Status: {socialHistory.tobaccoUse}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Alcohol Use</h3>
                  <div className="p-3 border rounded-md">
                    <div className="text-sm">Status: {socialHistory.alcoholUse}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Recreational Drug Use</h3>
                  <div className="p-3 border rounded-md">
                    <div className="text-sm">Status: {socialHistory.drugUse}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Physical Activity</h3>
                  <div className="p-3 border rounded-md">
                    <div className="text-sm">Frequency: {socialHistory.physicalActivity.frequency}</div>
                    <div className="text-sm">Type: {socialHistory.physicalActivity.type}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Diet</h3>
                  <div className="p-3 border rounded-md">
                    <div className="text-sm">Type: {socialHistory.diet.type}</div>
                    <div className="text-sm">Notes: {socialHistory.diet.notes}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Occupation</h3>
                  <div className="p-3 border rounded-md">
                    <div className="text-sm">Current: {socialHistory.occupation.current}</div>
                    <div className="text-sm">Status: {socialHistory.occupation.status}</div>
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
                  {familyHistory.length > 0 ? (
                    familyHistory.map((history) => (
                      <TableRow key={history.id}>
                        <TableCell>{history.member}</TableCell>
                        <TableCell>{history.condition}</TableCell>
                        <TableCell>{history.ageOfOnset}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => openDialog("familyHistory", history)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500"
                              onClick={() => handleDeleteFamilyHistory(history.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                        No family history recorded
                      </TableCell>
                    </TableRow>
                  )}
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
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vitals.map((vital, index) => (
                        <TableRow key={index}>
                          <TableCell>{vital.date}</TableCell>
                          <TableCell>{vital.bp}</TableCell>
                          <TableCell>{vital.pulse}</TableCell>
                          <TableCell>{vital.resp}</TableCell>
                          <TableCell>{vital.temp}</TableCell>
                          <TableCell>{vital.height}</TableCell>
                          <TableCell>{vital.weight}</TableCell>
                          <TableCell>{vital.bmi}</TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500"
                              onClick={() => handleDeleteVital(vital.date)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
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
                      {careTeam.primaryCare.length > 0 ? (
                        <div>Primary Care Providers</div>
                      ) : (
                        <div className="text-sm text-gray-500 italic">No provider information available</div>
                      )}
                      <Button variant="outline" size="sm" onClick={() => {
                        providerForm.setValue("type", "primaryCare");
                        openDialog("provider");
                      }}>
                        <Plus className="h-3 w-3 mr-2" /> Add provider
                      </Button>
                    </div>
                    
                    {careTeam.primaryCare.length > 0 && (
                      <div className="space-y-4">
                        {careTeam.primaryCare.map(provider => (
                          <div key={provider.id} className="border p-3 rounded-md">
                            <div className="flex justify-between">
                              <div>
                                <div className="font-medium">{provider.name}</div>
                                <div className="text-sm text-gray-600">Specialty: {provider.specialty}</div>
                                <div className="text-sm">Phone: {provider.phone}</div>
                                {provider.email && <div className="text-sm">Email: {provider.email}</div>}
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-500"
                                onClick={() => handleDeleteProvider(provider.id, "primaryCare")}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="mental-health">
                  <AccordionTrigger className="hover:no-underline">
                    Mental health provider(s)
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex justify-between mb-4">
                      {careTeam.mentalHealth.length > 0 ? (
                        <div>Mental Health Providers</div>
                      ) : (
                        <div className="text-sm text-gray-500 italic">No provider information available</div>
                      )}
                      <Button variant="outline" size="sm" onClick={() => {
                        providerForm.setValue("type", "mentalHealth");
                        openDialog("provider");
                      }}>
                        <Plus className="h-3 w-3 mr-2" /> Add provider
                      </Button>
                    </div>
                    
                    {careTeam.mentalHealth.length > 0 && (
                      <div className="space-y-4">
                        {careTeam.mentalHealth.map(provider => (
                          <div key={provider.id} className="border p-3 rounded-md">
                            <div className="flex justify-between">
                              <div>
                                <div className="font-medium">{provider.name}</div>
                                <div className="text-sm text-gray-600">Specialty: {provider.specialty}</div>
                                <div className="text-sm">Phone: {provider.phone}</div>
                                {provider.email && <div className="text-sm">Email: {provider.email}</div>}
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-500"
                                onClick={() => handleDeleteProvider(provider.id, "mentalHealth")}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
                        <Button variant="outline" size="sm" onClick={() => {
                          providerForm.setValue("type", "otherProviders");
                          openDialog("provider");
                        }}>
                          <Plus className="h-3 w-3 mr-2" /> Add provider
                        </Button>
                      </div>
                      
                      {careTeam.otherProviders.map(provider => (
                        <div key={provider.id} className="border p-3 rounded-md">
                          <div className="flex justify-between">
                            <div>
                              <div className="font-medium">{provider.name}</div>
                              <div className="text-sm text-gray-600">Specialty: {provider.specialty}</div>
                              <div className="text-sm">Phone: {provider.phone}</div>
                              {provider.email && <div className="text-sm">Email: {provider.email}</div>}
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500"
                              onClick={() => handleDeleteProvider(provider.id, "otherProviders")}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="pharmacy">
                  <AccordionTrigger className="hover:no-underline">
                    Preferred pharmacy
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex justify-between mb-4">
                      {careTeam.pharmacy.length > 0 ? (
                        <div>Pharmacy Information</div>
                      ) : (
                        <div className="text-sm text-gray-500 italic">No pharmacy information available</div>
                      )}
                      <Button variant="outline" size="sm" onClick={() => {
                        providerForm.setValue("type", "pharmacy");
                        openDialog("provider");
                      }}>
                        <Plus className="h-3 w-3 mr-2" /> Add pharmacy
                      </Button>
                    </div>
                    
                    {careTeam.pharmacy.length > 0 && (
                      <div className="space-y-4">
                        {careTeam.pharmacy.map(provider => (
                          <div key={provider.id} className="border p-3 rounded-md">
                            <div className="flex justify-between">
                              <div>
                                <div className="font-medium">{provider.name}</div>
                                <div className="text-sm text-gray-600">Type: {provider.specialty}</div>
                                <div className="text-sm">Phone: {provider.phone}</div>
                                {provider.email && <div className="text-sm">Email: {provider.email}</div>}
                                {provider.address && <div className="text-sm">Address: {provider.address}</div>}
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-500"
                                onClick={() => handleDeleteProvider(provider.id, "pharmacy")}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Dialog for adding new items */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle>
              {dialogType === "diagnoses" && "Add New Diagnosis"}
              {dialogType === "allergies" && "Add New Allergy"}
              {dialogType === "medicalHistory" && "Edit Medical History"}
              {dialogType === "surgery" && "Add Surgical History"}
              {dialogType === "immunization" && "Add Immunization"}
              {dialogType === "socialHistory" && "Edit Social History"}
              {dialogType === "familyHistory" && "Add Family History"}
              {dialogType === "vitals" && "Add Vital Signs"}
              {dialogType === "provider" && "Add Provider"}
            </DialogTitle>
          </DialogHeader>
          
          {renderDialog()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientProfile;
