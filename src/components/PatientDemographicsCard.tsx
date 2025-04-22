
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

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
          {/* Avatar collapsed view */}
          <Avatar className="mb-2 h-10 w-10">
            <AvatarImage src={avatarSrc} />
            <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-500 mt-3" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>{patient.name.split(" ")[0]}</span>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={avatarSrc} />
              <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-lg text-gray-800 font-semibold">{patient.name}</span>
              <span className="text-sm text-gray-500">{patient.age} • DOB {patient.dob}</span>
            </div>
          </div>
          <div className="text-xs text-blue-600 mt-1 cursor-pointer">Add pronouns • {patient.gender}</div>
          <div className="py-1">
            <span className="bg-blue-100 px-2 py-1 rounded-full text-xs text-blue-700">{patient.status}</span>
          </div>
          {patient.tags.length > 0 && (
            <div className="mt-2 text-xs text-blue-700 underline cursor-pointer">{patient.tags.join(", ")}</div>
          )}
          <div className="mt-2 text-xs text-yellow-800">{"$"}{patient.copay} Copay</div>
          <div className="mt-2 text-xs">Flags ({patient.flags})</div>
          <div className="border-b my-2" />

          <div>
            <div className="font-semibold mb-1">Contact</div>
            <div className="text-xs text-gray-600">Phone <span className="font-mono">{patient.phone}</span> (mobile)</div>
            <div className="text-xs text-gray-600">Email <a href={`mailto:${patient.email}`} className="underline">{patient.email}</a></div>
          </div>
          <div className="border-b my-2" />
          <div>
            <div className="font-semibold mb-1">Appointments</div>
            {patient.appointments.map((appt, idx) =>
              <div key={idx} className="text-xs text-gray-700 flex flex-col mb-2">
                <span className="font-semibold">{appt.label}</span>
                <span>{appt.date} • {appt.time}</span>
                <span className="text-[11px] text-gray-400">{appt.clinician} • {appt.location}</span>
              </div>
            )}
            <span className="font-semibold">Last</span>
            <span className="text-xs">{patient.lastAppointment || "--"}</span>
          </div>
          <div className="border-b my-2" />

          {/* Demographics section, editable */}
          <div>
            <div className="font-semibold mb-1 mt-2">Demographics</div>

            <div className="space-y-2">
              <Label className="text-xs">Legal name</Label>
              <div className="flex gap-2">
                <Input
                  value={legalName.first}
                  onChange={e => setLegalName({ ...legalName, first: e.target.value })}
                  className="w-1/3"
                  placeholder="First"
                />
                <Input
                  value={legalName.middle}
                  onChange={e => setLegalName({ ...legalName, middle: e.target.value })}
                  className="w-1/3"
                  placeholder="Middle"
                />
                <Input
                  value={legalName.last}
                  onChange={e => setLegalName({ ...legalName, last: e.target.value })}
                  className="w-1/3"
                  placeholder="Last"
                />
              </div>
              <Label className="text-xs">Name to use</Label>
              <div className="flex gap-2">
                <Input
                  value={nameToUse.first}
                  onChange={e => setNameToUse({ ...nameToUse, first: e.target.value })}
                  className="w-1/3"
                  placeholder="First"
                />
                <Input
                  value={nameToUse.middle}
                  onChange={e => setNameToUse({ ...nameToUse, middle: e.target.value })}
                  className="w-1/3"
                  placeholder="Middle"
                />
                <Input
                  value={nameToUse.last}
                  onChange={e => setNameToUse({ ...nameToUse, last: e.target.value })}
                  className="w-1/3"
                  placeholder="Last"
                />
              </div>
              <Label className="text-xs">Former name</Label>
              <div className="flex gap-2">
                <Input
                  value={formerName.first}
                  onChange={e => setFormerName({ ...formerName, first: e.target.value })}
                  className="w-1/3"
                  placeholder="First"
                />
                <Input
                  value={formerName.middle}
                  onChange={e => setFormerName({ ...formerName, middle: e.target.value })}
                  className="w-1/3"
                  placeholder="Middle"
                />
                <Input
                  value={formerName.last}
                  onChange={e => setFormerName({ ...formerName, last: e.target.value })}
                  className="w-1/3"
                  placeholder="Last"
                />
              </div>
              <Label className="text-xs">Background</Label>
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <Input
                    value={background.dob}
                    onChange={e => setBackground({ ...background, dob: e.target.value })}
                    className="w-1/2"
                    placeholder="Date of birth"
                  />
                  <Input
                    value={background.birthSex}
                    onChange={e => setBackground({ ...background, birthSex: e.target.value })}
                    className="w-1/2"
                    placeholder="Birth sex"
                  />
                </div>
                <div className="flex gap-2">
                  <Input
                    value={background.legalSex}
                    onChange={e => setBackground({ ...background, legalSex: e.target.value })}
                    className="w-1/2"
                    placeholder="Legal sex"
                  />
                  <Input
                    value={background.pronouns}
                    onChange={e => setBackground({ ...background, pronouns: e.target.value })}
                    className="w-1/2"
                    placeholder="Pronouns"
                  />
                </div>
                <Input
                  value={background.genderIdentity}
                  onChange={e => setBackground({ ...background, genderIdentity: e.target.value })}
                  className="w-full"
                  placeholder="Gender identity"
                />
                <div className="flex gap-2">
                  <Input
                    value={background.race}
                    onChange={e => setBackground({ ...background, race: e.target.value })}
                    className="w-1/2"
                    placeholder="Race"
                  />
                  <Input
                    value={background.raceSub}
                    onChange={e => setBackground({ ...background, raceSub: e.target.value })}
                    className="w-1/2"
                    placeholder="Race subcategory"
                  />
                </div>
                <Input
                  value={background.ethnicity}
                  onChange={e => setBackground({ ...background, ethnicity: e.target.value })}
                  className="w-full"
                  placeholder="Ethnicity"
                />
                <Input
                  value={background.specificEthnicity}
                  onChange={e => setBackground({ ...background, specificEthnicity: e.target.value })}
                  className="w-full"
                  placeholder="Specific ethnicity"
                />
                <Input
                  value={background.ethnicityRequired}
                  onChange={e => setBackground({ ...background, ethnicityRequired: e.target.value })}
                  className="w-full"
                  placeholder="Ethnicity required"
                />
                <Input
                  value={background.notes}
                  onChange={e => setBackground({ ...background, notes: e.target.value })}
                  className="w-full"
                  placeholder="Additional notes"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDemographicsCard;
