
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { Plus, Edit, X, Save, ArrowLeft, AlertTriangle, Trash2, FileSearch } from "lucide-react";
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

const familyHistoryData = [
  { id: 1, member: "Mother", condition: "Hypertension", ageOfOnset: "45" },
  { id: 2, member: "Father", condition: "Type 2 Diabetes", ageOfOnset: "50" },
  { id: 3, member: "Grandmother (maternal)", condition: "Breast Cancer", ageOfOnset: "63" },
];

const socialHistoryData = {
  tobaccoUse: "Never smoker",
  alcoholUse: "Non-drinker",
  drugUse: "Denies use",
  physicalActivity: { frequency: "2x weekly", type: "Walking" },
  diet: { type: "No specific dietary pattern", notes: "Patient reports trying to reduce sugar intake" },
  occupation: { current: "Administrative Assistant", status: "Full-time" }
};

const vitalsData = [
  { date: "Apr 22, 2025", bp: "135/85", pulse: "72", resp: "16", temp: "98.6°F", height: "5'6\"", weight: "165 lbs", bmi: "26.6" },
  { date: "Feb 15, 2025", bp: "132/82", pulse: "74", resp: "18", temp: "98.2°F", height: "5'6\"", weight: "168 lbs", bmi: "27.1" },
  { date: "Nov 10, 2024", bp: "128/80", pulse: "76", resp: "16", temp: "97.9°F", height: "5'6\"", weight: "170 lbs", bmi: "27.4" },
];

const careTeamData = {
  primaryCare: [],
  mentalHealth: [],
  otherProviders: [
    { id: 1, name: "Frank Hua", specialty: "Primary Care Physician", phone: "(713) 442-1700", email: "", address: "" },
    { id: 2, name: "Jeffery Junenu", specialty: "Gastroenterologist", phone: "(713) 442-1700", email: "", address: "" },
  ],
  pharmacy: []
};

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
  const [activeTab, setActiveTab] = useState("diagnoses");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredIcdCodes, setFilteredIcdCodes] = useState(icdCodesDatabase);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [detailItem, setDetailItem] = useState<any>(null);

  const [diagnoses, setDiagnoses] = useState(diagnosesData);
  const [allergies, setAllergies] = useState(allergiesDatabase);
  const [medicalHistory, setMedicalHistory] = useState(medicalHistoryData);
  const [socialHistory, setSocialHistory] = useState(socialHistoryData);
  const [familyHistory, setFamilyHistory] = useState(familyHistoryData);
  const [vitals, setVitals] = useState(vitalsData);
  const [careTeam, setCareTeam] = useState(careTeamData);

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
      type: "primaryCare"
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
                    <FormLabel>Notes</FormLabel>
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
                    <FormLabel>Immunization Name</FormLabel>
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
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Failed">Failed</SelectItem>
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

      case "familyHistory":
        return (
          <Form {...familyHistoryForm}>
            <form onSubmit={familyHistoryForm.handleSubmit(handleAddFamilyHistory)} className="space-y-4 py-4">
              <FormField
                control={familyHistoryForm.control}
                name="member"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Member</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter member name" required />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={familyHistoryForm.control}
                name="relationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter relationship" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={familyHistoryForm.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter condition" />
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
                      <Input {...field} placeholder="Enter age of onset" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={familyHistoryForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Add any notes about this family history entry..." />
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

      case "socialHistory":
        return (
          <Form {...socialHistoryForm}>
            <form onSubmit={socialHistoryForm.handleSubmit(handleUpdateSocialHistory)} className="space-y-4 py-4">
              <FormField
                control={socialHistoryForm.control}
                name="tobaccoUse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tobacco Use</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter tobacco use status" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={socialHistoryForm.control}
                name="alcoholUse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alcohol Use</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter alcohol use status" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={socialHistoryForm.control}
                name="drugUse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Drug Use</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter drug use status" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={socialHistoryForm.control}
                name="activityFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Frequency</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter activity frequency" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={socialHistoryForm.control}
                name="activityType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Type</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter activity type" />
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
                    <FormControl>
                      <Input {...field} placeholder="Enter diet type" />
                    </FormControl>
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
                      <Textarea {...field} placeholder="Add any notes about this social history entry..." />
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
                      <Input {...field} placeholder="Enter occupation" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Social History</Button>
              </div>
            </form>
          </Form>
        );

      case "vital":
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

              <FormField
                control={vitalForm.control}
                name="bp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blood Pressure</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter blood pressure" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={vitalForm.control}
                name="pulse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pulse</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter pulse" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={vitalForm.control}
                name="resp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Respiratory Rate</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter respiratory rate" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={vitalForm.control}
                name="temp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temperature</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter temperature" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={vitalForm.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter height" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={vitalForm.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter weight" />
                    </FormControl>
                  </FormItem>
                )}
              />

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
                      <Input {...field} placeholder="Enter provider specialty" />
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
                      <Input {...field} placeholder="Enter provider phone number" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={providerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter provider email" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={providerForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter provider address" />
                    </FormControl>
                  </FormItem>
                )}
              />

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
                        <SelectItem value="otherProviders">Other Providers</SelectItem>
                        <SelectItem value="pharmacy">Pharmacy</SelectItem>
                      </SelectContent>
                    </Select>
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

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {dialogType === "diagnoses" && "Add Diagnosis"}
              {dialogType === "allergies" && "Add Allergy"}
              {dialogType === "medicalHistory" && "Edit Medical History"}
              {dialogType === "surgery" && "Add Surgery"}
              {dialogType === "immunization" && "Add Immunization"}
              {dialogType === "familyHistory" && "Add Family History"}
              {dialogType === "socialHistory" && "Edit Social History"}
              {dialogType === "vital" && "Add Vital Signs"}
              {dialogType === "provider" && "Add Provider"}
            </DialogTitle>
          </DialogHeader>
          {renderDialog()}
        </DialogContent>
      </Dialog>

      <Dialog open={isDetailView} onOpenChange={setIsDetailView}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Details</DialogTitle>
          </DialogHeader>
          {detailItem && (
            <div className="space-y-4">
              {Object.entries(detailItem).map(([key, value]) => 
                key !== 'type' && key !== 'id' ? (
                  <div key={key} className="grid grid-cols-2 gap-2">
                    <div className="font-medium capitalize">{key}:</div>
                    <div>{String(value)}</div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="diagnoses">Diagnoses</TabsTrigger>
            <TabsTrigger value="allergies">Allergies</TabsTrigger>
            <TabsTrigger value="medicalHistory">Medical History</TabsTrigger>
            <TabsTrigger value="socialHistory">Social History</TabsTrigger>
            <TabsTrigger value="familyHistory">Family History</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="careTeam">Care Team</TabsTrigger>
          </TabsList>

          <TabsContent value="diagnoses" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Diagnoses</h2>
              <Button
                size="sm"
                onClick={() => openDialog("diagnoses")}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add Diagnosis
              </Button>
            </div>

            {diagnoses.active.length > 0 && (
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-md">Active Diagnoses</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {diagnoses.active.map((diagnosis) => (
                        <TableRow key={diagnosis.id}>
                          <TableCell>{diagnosis.date}</TableCell>
                          <TableCell>{diagnosis.code}</TableCell>
                          <TableCell>{diagnosis.description}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => viewDetails(diagnosis, "diagnosis")}
                              className="h-8 w-8 p-0 mr-2"
                            >
                              <FileSearch className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteDiagnosis(diagnosis.id, "active")}
                              className="h-8 w-8 p-0 text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {diagnoses.inactive.length > 0 && (
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-md">Inactive Diagnoses</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {diagnoses.inactive.map((diagnosis) => (
                        <TableRow key={diagnosis.id}>
                          <TableCell>{diagnosis.date}</TableCell>
                          <TableCell>{diagnosis.code}</TableCell>
                          <TableCell>{diagnosis.description}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => viewDetails(diagnosis, "diagnosis")}
                              className="h-8 w-8 p-0 mr-2"
                            >
                              <FileSearch className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteDiagnosis(diagnosis.id, "inactive")}
                              className="h-8 w-8 p-0 text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {diagnoses.resolved.length > 0 && (
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-md">Resolved Diagnoses</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {diagnoses.resolved.map((diagnosis) => (
                        <TableRow key={diagnosis.id}>
                          <TableCell>{diagnosis.date}</TableCell>
                          <TableCell>{diagnosis.code}</TableCell>
                          <TableCell>{diagnosis.description}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => viewDetails(diagnosis, "diagnosis")}
                              className="h-8 w-8 p-0 mr-2"
                            >
                              <FileSearch className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteDiagnosis(diagnosis.id, "resolved")}
                              className="h-8 w-8 p-0 text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {diagnoses.active.length === 0 && diagnoses.inactive.length === 0 && diagnoses.resolved.length === 0 && (
              <Card>
                <CardContent className="py-8 flex flex-col items-center justify-center text-center">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Diagnoses Found</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    No diagnoses have been added to this patient's record.
                  </p>
                  <Button onClick={() => openDialog("diagnoses")}>
                    <Plus className="h-4 w-4 mr-2" /> Add Diagnosis
                  </Button>
                </CardContent>
              </Card>
            )}

            {diagnoses.reported && (
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-md">Patient Reported Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    readOnly
                    value={diagnoses.reported}
                    className="min-h-[150px]"
                  />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="allergies" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Allergies</h2>
              <Button
                size="sm"
                onClick={() => openDialog("allergies")}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add Allergy
              </Button>
            </div>

            <Accordion type="multiple" className="w-full">
              {Object.entries(allergies).map(([type, items]) => (
                <AccordionItem key={type} value={type}>
                  <AccordionTrigger className="capitalize">
                    {type} Allergies {items.length > 0 && <Badge className="ml-2">{items.length}</Badge>}
                  </AccordionTrigger>
                  <AccordionContent>
                    {items.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Reaction</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {items.map((allergy) => (
                            <TableRow key={allergy.id}>
                              <TableCell>{allergy.name}</TableCell>
                              <TableCell>{allergy.reaction || "Not recorded"}</TableCell>
                              <TableCell>{allergy.status}</TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => viewDetails(allergy, "allergy")}
                                  className="h-8 w-8 p-0 mr-2"
                                >
                                  <FileSearch className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteAllergy(allergy.id, type)}
                                  className="h-8 w-8 p-0 text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="py-4 text-center text-sm text-muted-foreground">
                        No {type} allergies recorded
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {Object.values(allergies).flat().length === 0 && (
              <Card>
                <CardContent className="py-8 flex flex-col items-center justify-center text-center">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Allergies Found</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    No allergies have been added to this patient's record.
                  </p>
                  <Button onClick={() => openDialog("allergies")}>
                    <Plus className="h-4 w-4 mr-2" /> Add Allergy
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="medicalHistory" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Medical History</h2>
              {isEditing === "medicalHistory" ? (
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    form="medical-history-form"
                    type="submit"
                  >
                    <Save className="h-4 w-4 mr-2" /> Save
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditing("medicalHistory")}
                  >
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => openDialog("surgery")}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Surgery
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => openDialog("immunization")}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Immunization
                  </Button>
                </div>
              )}
            </div>

            {isEditing === "medicalHistory" ? (
              <Form {...medicalHistoryForm}>
                <form
                  id="medical-history-form"
                  onSubmit={medicalHistoryForm.handleSubmit(handleUpdateMedicalHistory)}
                  className="space-y-4"
                >
                  <FormField
                    control={medicalHistoryForm.control}
                    name="conditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical Conditions</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={6} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={medicalHistoryForm.control}
                    name="isPregnant"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Currently pregnant or nursing</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={medicalHistoryForm.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            ) : (
              <div className="space-y-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-md">Medical Conditions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      readOnly
                      value={medicalHistory.conditions}
                      className="min-h-[100px]"
                    />
                  </CardContent>
                </Card>

                {medicalHistory.pregnancies.isPregnant && (
                  <div className="flex items-center p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                    Patient is currently pregnant or nursing
                  </div>
                )}

                <Card>
                  <CardHeader className="py-3">
                    <div className="flex justify-between">
                      <CardTitle className="text-md">Surgeries</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {medicalHistory.surgeries.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Procedure</TableHead>
                            <TableHead>Provider</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {medicalHistory.surgeries.map((surgery) => (
                            <TableRow key={surgery.id}>
                              <TableCell>{surgery.date}</TableCell>
                              <TableCell>{surgery.procedure}</TableCell>
                              <TableCell>{surgery.provider}</TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => viewDetails(surgery, "surgery")}
                                  className="h-8 w-8 p-0 mr-2"
                                >
                                  <FileSearch className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteSurgery(surgery.id)}
                                  className="h-8 w-8 p-0 text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="py-4 text-center text-sm text-muted-foreground">
                        No surgeries recorded
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-3">
                    <div className="flex justify-between">
                      <CardTitle className="text-md">Immunizations</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {medicalHistory.immunizations.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Immunization</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {medicalHistory.immunizations.map((immunization) => (
                            <TableRow key={immunization.id}>
                              <TableCell>{immunization.date}</TableCell>
                              <TableCell>{immunization.name}</TableCell>
                              <TableCell>
                                <Badge variant={immunization.status === "Complete" ? "default" : "outline"}>
                                  {immunization.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteImmunization(immunization.id)}
                                  className="h-8 w-8 p-0 text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="py-4 text-center text-sm text-muted-foreground">
                        No immunizations recorded
                      </div>
                    )}
                  </CardContent>
                </Card>

                {medicalHistory.notes && (
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-md">Additional Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{medicalHistory.notes}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="socialHistory" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Social History</h2>
              {isEditing === "socialHistory" ? (
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    form="social-history-form"
                    type="submit"
                  >
                    <Save className="h-4 w-4 mr-2" /> Save
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing("socialHistory")}
                >
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
              )}
            </div>

            {isEditing === "socialHistory" ? (
              <Form {...socialHistoryForm}>
                <form
                  id="social-history-form"
                  onSubmit={socialHistoryForm.handleSubmit(handleUpdateSocialHistory)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={socialHistoryForm.control}
                      name="tobaccoUse"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tobacco Use</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={socialHistoryForm.control}
                      name="alcoholUse"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alcohol Use</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={socialHistoryForm.control}
                      name="drugUse"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Drug Use</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={socialHistoryForm.control}
                      name="occupationStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employment Status</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={socialHistoryForm.control}
                      name="activityFrequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Activity Frequency</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={socialHistoryForm.control}
                      name="activityType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Activity Type</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
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
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            ) : (
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium">Tobacco Use</h3>
                        <p>{socialHistory.tobaccoUse}</p>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium">Alcohol Use</h3>
                        <p>{socialHistory.alcoholUse}</p>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium">Drug Use</h3>
                        <p>{socialHistory.drugUse}</p>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium">Occupation</h3>
                        <p>{socialHistory.occupation.current} ({socialHistory.occupation.status})</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-md">Lifestyle</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium">Physical Activity</h3>
                        <p>{socialHistory.physicalActivity.type}, {socialHistory.physicalActivity.frequency}</p>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium">Diet</h3>
                        <p>{socialHistory.diet.type}</p>
                        <p className="text-sm text-muted-foreground">{socialHistory.diet.notes}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="familyHistory" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Family History</h2>
              <Button
                size="sm"
                onClick={() => openDialog("familyHistory")}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add Family History
              </Button>
            </div>

            <Card>
              <CardContent className="pt-6">
                {familyHistory.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Family Member</TableHead>
                        <TableHead>Condition</TableHead>
                        <TableHead>Age of Onset</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {familyHistory.map((history) => (
                        <TableRow key={history.id}>
                          <TableCell>{history.member}</TableCell>
                          <TableCell>{history.condition}</TableCell>
                          <TableCell>{history.ageOfOnset}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => viewDetails(history, "familyHistory")}
                              className="h-8 w-8 p-0 mr-2"
                            >
                              <FileSearch className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteFamilyHistory(history.id)}
                              className="h-8 w-8 p-0 text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="py-4 text-center text-sm text-muted-foreground">
                    No family history recorded
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vitals" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Vitals</h2>
              <Button
                size="sm"
                onClick={() => openDialog("vital")}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add Vitals
              </Button>
            </div>

            <Card>
              <CardContent className="pt-6">
                {vitals.length > 0 ? (
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
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vitals.map((vital) => (
                        <TableRow key={vital.date}>
                          <TableCell>{vital.date}</TableCell>
                          <TableCell>{vital.bp}</TableCell>
                          <TableCell>{vital.pulse}</TableCell>
                          <TableCell>{vital.resp}</TableCell>
                          <TableCell>{vital.temp}</TableCell>
                          <TableCell>{vital.height}</TableCell>
                          <TableCell>{vital.weight}</TableCell>
                          <TableCell>{vital.bmi}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => viewDetails(vital, "vital")}
                              className="h-8 w-8 p-0 mr-2"
                            >
                              <FileSearch className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteVital(vital.date)}
                              className="h-8 w-8 p-0 text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="py-4 text-center text-sm text-muted-foreground">
                    No vital signs recorded
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="careTeam" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Care Team</h2>
              <Button
                size="sm"
                onClick={() => openDialog("provider")}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add Provider
              </Button>
            </div>

            <Accordion type="multiple" className="w-full">
              {Object.entries(careTeam).map(([type, providers]) => (
                <AccordionItem key={type} value={type}>
                  <AccordionTrigger className="capitalize">
                    {type === "primaryCare"
                      ? "Primary Care"
                      : type === "mentalHealth"
                      ? "Mental Health"
                      : type === "otherProviders"
                      ? "Other Providers"
                      : "Pharmacy"}
                    {providers.length > 0 && <Badge className="ml-2">{providers.length}</Badge>}
                  </AccordionTrigger>
                  <AccordionContent>
                    {providers.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Specialty</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {providers.map((provider) => (
                            <TableRow key={provider.id}>
                              <TableCell>{provider.name}</TableCell>
                              <TableCell>{provider.specialty}</TableCell>
                              <TableCell>{provider.phone}</TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => viewDetails(provider, "provider")}
                                  className="h-8 w-8 p-0 mr-2"
                                >
                                  <FileSearch className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteProvider(provider.id, type)}
                                  className="h-8 w-8 p-0 text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="py-4 text-center text-sm text-muted-foreground">
                        No providers recorded
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default PatientProfile;
