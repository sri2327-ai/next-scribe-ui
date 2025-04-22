
import React, { useState } from "react";

interface AppointmentType {
  label: string;
  date: string;
  time: string;
  location: string;
  clinician: string;
}
interface PatientType {
  appointments: AppointmentType[];
  name: string;
}

const sampleNotes = [
  {
    id: 1,
    appointmentLabel: "Today",
    date: "Apr 22, 2025",
    time: "4:00p-5:00p",
    note: "Patient presented with mild anxiety, discussed coping techniques.",
    transcript:
      "Clinician: Hello Kelly, how are you feeling today?\nPatient: A bit anxious lately, especially due to work stress...\n[Transcript continues]"
  },
  {
    id: 2,
    appointmentLabel: "Next",
    date: "May 6, 2025",
    time: "4:30p-5:30p",
    note: "Planned to review progress with anxiety management.",
    transcript:
      "Clinician: Let's follow up next time on your journal entries...\nPatient: Sounds good. I'll keep track as discussed."
  }
];

interface PatientNotesTranscriptProps {
  patient: PatientType;
}

const PatientNotesTranscript: React.FC<PatientNotesTranscriptProps> = ({ patient }) => {
  const [openId, setOpenId] = useState<number | null>(sampleNotes[0].id);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Session Notes</h3>
      <div className="space-y-2">
        {sampleNotes.map((note) => (
          <div key={note.id} className="border rounded-lg">
            <button
              className="w-full text-left p-3 flex justify-between items-center hover:bg-gray-50"
              onClick={() => setOpenId(openId === note.id ? null : note.id)}
            >
              <span>
                <span className="text-blue-700 font-medium">{note.appointmentLabel}</span>
                <span className="mx-2 text-xs text-gray-400">
                  {note.date} • {note.time}
                </span>
              </span>
              <span className="text-sm text-gray-400">{openId === note.id ? "▲" : "▼"}</span>
            </button>
            {openId === note.id && (
              <div className="p-4 bg-blue-50 border-t space-y-2">
                <div>
                  <div className="font-medium mb-1">Note:</div>
                  <div className="mb-2">{note.note}</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Transcript:</div>
                  <pre className="bg-gray-100 rounded px-3 py-2 whitespace-pre-wrap text-xs">{note.transcript}</pre>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientNotesTranscript;
