
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Phone, Mail, Calendar, UserCircle, Flag, Tag, DollarSign } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface AppointmentType {
  label: string;
  date: string;
  time: string;
  location: string;
  clinician: string;
}
interface PatientType {
  name: string;
  age: string;
  dob: string;
  pronouns: string;
  gender: string;
  status: string;
  tags: string[];
  copay: number;
  flags: number;
  clinician: string;
  appointments: AppointmentType[];
  lastAppointment: string | null;
  phone: string;
  email: string;
  profileImageUrl?: string;
}

interface PatientDemographicsCardProps {
  patient: PatientType;
  collapsed: boolean;
  onToggle: () => void;
}

const getInitials = (name: string) => {
  const names = name.split(" ");
  if (names.length > 1) return names[0][0] + names[names.length - 1][0];
  return name[0];
};

/**
 * PatientDemographicsCard
 * Shows patient profile/demographics on the left, collapsible panel.
 */
const PatientDemographicsCard: React.FC<PatientDemographicsCardProps> = ({
  patient,
  collapsed,
  onToggle
}) => {
  // Placeholder profile image
  const avatarSrc = patient.profileImageUrl || "/lovable-uploads/53ad6fba-0f2a-42f5-9bb4-e0a5e45188d5.png";

  // State for demographics fields - normally should lift up to context/store for true global changes
  const [legalName, setLegalName] = useState({
    first: "Kelly",
    middle: "Lynn",
    last: "Aceves"
  });
  const [nameToUse, setNameToUse] = useState({ first: "", middle: "", last: "" });
  const [formerName, setFormerName] = useState({ first: "", middle: "", last: "" });
  const [background, setBackground] = useState({
    dob: "07/04/1977",
    birthSex: "F",
    legalSex: "F",
    pronouns: "",
    genderIdentity: "Female",
    race: "White",
    raceSub: "",
    ethnicity: "Non Hispanic or Latino",
    specificEthnicity: "",
    ethnicityRequired: "",
    notes: ""
  });

  return (
    <div
      className={`relative transition-all duration-300 bg-gray-50 border-r overflow-y-auto h-full ${collapsed ? "w-16 px-2" : "w-96 max-w-xs p-6"}`}
    >
      <button
        aria-label="Collapse demographics card"
        onClick={onToggle}
        className="absolute right-2 top-3 z-10 bg-white border border-blue-400 rounded-full shadow transition hover:bg-gray-50 flex items-center justify-center"
        style={{
          width: "32px",
          height: "32px"
        }}
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
      {collapsed ? (
        <div className="flex flex-col items-center pt-8">
          <Avatar className="mb-2 h-10 w-10">
            <AvatarImage src={avatarSrc} />
            <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-500 mt-3" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>{patient.name.split(" ")[0]}</span>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="bg-white rounded-xl border shadow-sm p-4 mb-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14">
                <AvatarImage src={avatarSrc} />
                <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-lg text-gray-800 font-semibold">{patient.name}</span>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={14} className="mr-1" />
                  <span>{patient.age} • DOB {patient.dob}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <UserCircle size={14} className="mr-1" />
                  <span>{patient.pronouns || "No pronouns"} • {patient.gender}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                {patient.status}
              </Badge>
              {patient.tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="bg-gray-50">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="flex items-center text-sm border border-yellow-100 bg-yellow-50 rounded p-2">
                <DollarSign size={14} className="mr-1 text-yellow-700" />
                <span className="text-yellow-800">${patient.copay} Copay</span>
              </div>
              <div className="flex items-center text-sm border border-red-100 bg-red-50 rounded p-2">
                <Flag size={14} className="mr-1 text-red-700" />
                <span className="text-red-800">Flags ({patient.flags})</span>
              </div>
            </div>
          </div>

          <Accordion type="multiple" defaultValue={["contact"]} className="w-full">
            <AccordionItem value="contact" className="border-b">
              <AccordionTrigger className="py-2 hover:no-underline">
                <span className="font-semibold">Contact Info</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Phone size={14} className="mr-2 text-gray-500" />
                    <span className="font-mono">{patient.phone}</span>
                    <Badge className="ml-2 text-[10px] h-4" variant="outline">Mobile</Badge>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail size={14} className="mr-2 text-gray-500" />
                    <a href={`mailto:${patient.email}`} className="underline text-blue-600">{patient.email}</a>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="appointments" className="border-b">
              <AccordionTrigger className="py-2 hover:no-underline">
                <span className="font-semibold">Appointments</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {patient.appointments.map((appt, idx) => (
                    <div key={idx} className={cn(
                      "p-3 rounded-md",
                      appt.label === "Today" ? "bg-blue-50 border border-blue-100" : 
                      appt.label === "Next" ? "bg-green-50 border border-green-100" : 
                      "bg-gray-50 border border-gray-100"
                    )}>
                      <div className="flex justify-between items-start">
                        <span className={cn(
                          "font-medium text-sm",
                          appt.label === "Today" ? "text-blue-700" : 
                          appt.label === "Next" ? "text-green-700" : 
                          "text-gray-700"
                        )}>{appt.label}</span>
                        <span className="text-xs bg-white px-2 py-0.5 rounded border">{appt.date}</span>
                      </div>
                      <div className="text-xs mt-1">{appt.time}</div>
                      <div className="text-[11px] text-gray-500 mt-1">{appt.clinician} • {appt.location}</div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-2 mt-2">
                    <div className="flex items-center">
                      <span className="text-xs font-medium mr-1">Last Visit:</span>
                      <span className="text-xs">{patient.lastAppointment || "--"}</span>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="demographics" className="border-b">
              <AccordionTrigger className="py-2 hover:no-underline">
                <span className="font-semibold">Demographics</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs block mb-1">Legal name</Label>
                    <div className="flex gap-2">
                      <Input
                        value={legalName.first}
                        onChange={e => setLegalName({ ...legalName, first: e.target.value })}
                        className="w-1/3 h-7 text-xs"
                        placeholder="First"
                      />
                      <Input
                        value={legalName.middle}
                        onChange={e => setLegalName({ ...legalName, middle: e.target.value })}
                        className="w-1/3 h-7 text-xs"
                        placeholder="Middle"
                      />
                      <Input
                        value={legalName.last}
                        onChange={e => setLegalName({ ...legalName, last: e.target.value })}
                        className="w-1/3 h-7 text-xs"
                        placeholder="Last"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-xs block mb-1">Name to use</Label>
                    <div className="flex gap-2">
                      <Input
                        value={nameToUse.first}
                        onChange={e => setNameToUse({ ...nameToUse, first: e.target.value })}
                        className="w-1/3 h-7 text-xs"
                        placeholder="First"
                      />
                      <Input
                        value={nameToUse.middle}
                        onChange={e => setNameToUse({ ...nameToUse, middle: e.target.value })}
                        className="w-1/3 h-7 text-xs"
                        placeholder="Middle"
                      />
                      <Input
                        value={nameToUse.last}
                        onChange={e => setNameToUse({ ...nameToUse, last: e.target.value })}
                        className="w-1/3 h-7 text-xs"
                        placeholder="Last"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs block mb-1">Date of birth</Label>
                      <Input
                        value={background.dob}
                        onChange={e => setBackground({ ...background, dob: e.target.value })}
                        className="w-full h-7 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-xs block mb-1">Birth sex</Label>
                      <Input
                        value={background.birthSex}
                        onChange={e => setBackground({ ...background, birthSex: e.target.value })}
                        className="w-full h-7 text-xs"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs block mb-1">Legal sex</Label>
                      <Input
                        value={background.legalSex}
                        onChange={e => setBackground({ ...background, legalSex: e.target.value })}
                        className="w-full h-7 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-xs block mb-1">Pronouns</Label>
                      <Input
                        value={background.pronouns}
                        onChange={e => setBackground({ ...background, pronouns: e.target.value })}
                        className="w-full h-7 text-xs"
                        placeholder="Add pronouns"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-xs block mb-1">Gender identity</Label>
                    <Input
                      value={background.genderIdentity}
                      onChange={e => setBackground({ ...background, genderIdentity: e.target.value })}
                      className="w-full h-7 text-xs"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs block mb-1">Race</Label>
                      <Input
                        value={background.race}
                        onChange={e => setBackground({ ...background, race: e.target.value })}
                        className="w-full h-7 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-xs block mb-1">Race subcategory</Label>
                      <Input
                        value={background.raceSub}
                        onChange={e => setBackground({ ...background, raceSub: e.target.value })}
                        className="w-full h-7 text-xs"
                        placeholder="Add subcategory"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-xs block mb-1">Ethnicity</Label>
                    <Input
                      value={background.ethnicity}
                      onChange={e => setBackground({ ...background, ethnicity: e.target.value })}
                      className="w-full h-7 text-xs"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
};

export default PatientDemographicsCard;
