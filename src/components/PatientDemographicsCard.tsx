import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, UserCircle, Flag, Tag, DollarSign } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
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

const PatientDemographicsCard: React.FC<PatientDemographicsCardProps> = ({
  patient,
  collapsed,
  onToggle
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [background, setBackground] = useState({
    dob: patient.dob || "",
    birthSex: "F",
    legalSex: "F",
    pronouns: patient.pronouns || "",
    genderIdentity: patient.gender || "",
    race: "White",
    raceSub: "",
    ethnicity: "Non Hispanic or Latino",
    specificEthnicity: "",
    ethnicityRequired: "",
    notes: ""
  });

  const handleSave = () => {
    // Here you would typically save to an API
    setIsEditing(false);
  };

  const avatarSrc = patient.profileImageUrl || "/lovable-uploads/53ad6fba-0f2a-42f5-9bb4-e0a5e45188d5.png";

  if (collapsed) {
    return (
      <div className="relative transition-all duration-300 w-16 px-2">
        <button
          onClick={onToggle}
          className="absolute right-2 top-3 z-10 bg-white border border-blue-400 rounded-full shadow transition hover:bg-gray-50 flex items-center justify-center w-8 h-8"
        >
          <ChevronRight size={20} />
        </button>
        <div className="flex flex-col items-center pt-8">
          <Avatar className="mb-2 h-10 w-10">
            <AvatarImage src={avatarSrc} />
            <AvatarFallback>{patient.name.split(" ")[0][0]}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-500 mt-3" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
            {patient.name.split(" ")[0]}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative transition-all duration-300 bg-gray-50 border-r overflow-y-auto h-full w-96 max-w-xs p-6">
      <button
        onClick={onToggle}
        className="absolute right-2 top-3 z-10 bg-white border border-blue-400 rounded-full shadow transition hover:bg-gray-50 flex items-center justify-center w-8 h-8"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex flex-col gap-3">
        <div className="bg-white rounded-xl border shadow-sm p-4 mb-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14">
                <AvatarImage src={avatarSrc} />
                <AvatarFallback>{patient.name.split(" ")[0][0]}</AvatarFallback>
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

          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              {isEditing ? "Cancel" : "Edit Demographics"}
            </Button>
          </div>
        </div>

        <Accordion type="multiple" defaultValue={["demographics"]} className="w-full">
          <AccordionItem value="demographics" className="border-b">
            <AccordionTrigger className="py-2 hover:no-underline">
              <span className="font-semibold">Demographics</span>
            </AccordionTrigger>
            <AccordionContent>
              {isEditing ? (
                <div className="space-y-4">
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

                  <div className="flex justify-end">
                    <Button
                      onClick={handleSave}
                      size="sm"
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-500">Date of birth</Label>
                      <p className="text-sm">{background.dob}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Birth sex</Label>
                      <p className="text-sm">{background.birthSex}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-500">Legal sex</Label>
                      <p className="text-sm">{background.legalSex}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Pronouns</Label>
                      <p className="text-sm">{background.pronouns || "Not specified"}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-500">Gender identity</Label>
                    <p className="text-sm">{background.genderIdentity}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-500">Race</Label>
                      <p className="text-sm">{background.race}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Race subcategory</Label>
                      <p className="text-sm">{background.raceSub || "Not specified"}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-500">Ethnicity</Label>
                    <p className="text-sm">{background.ethnicity}</p>
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default PatientDemographicsCard;
