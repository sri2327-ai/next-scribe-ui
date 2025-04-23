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
    { id: 1, name: "Frank Hua", specialty: "Primary Care Physician", phone: "(713) 442-1700", email: "", address: "" },
    { id: 2, name: "Jeffery Junenu", specialty: "Gastroenterologist", phone: "(713) 442-1700", email: "", address: "" },
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
