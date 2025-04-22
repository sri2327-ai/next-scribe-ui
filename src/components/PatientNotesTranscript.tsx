
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Filter, Clock, Edit, SortDescending, SortAscending } from "lucide-react";

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
  },
  {
    id: 3,
    appointmentLabel: "Previous",
    date: "Apr 8, 2025",
    time: "3:00p-4:00p",
    note: "Discussed medication side effects and adjusted dosage.",
    transcript:
      "Clinician: How have you been feeling with the current medication?\nPatient: I've been experiencing some drowsiness...\n[Transcript continues]"
  }
];

interface PatientNotesTranscriptProps {
  patient: PatientType;
}

const PatientNotesTranscript: React.FC<PatientNotesTranscriptProps> = ({ patient }) => {
  const [openId, setOpenId] = useState<number | null>(sampleNotes[0].id);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedNote, setEditedNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [notes, setNotes] = useState(sampleNotes);

  const handleEditStart = (id: number, note: string) => {
    setEditingId(id);
    setEditedNote(note);
  };

  const handleEditSave = (id: number) => {
    setNotes(
      notes.map(note => 
        note.id === id ? { ...note, note: editedNote } : note
      )
    );
    setEditingId(null);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredAndSortedNotes = notes
    .filter(note => 
      note.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.appointmentLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.date.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" 
        ? dateA.getTime() - dateB.getTime() 
        : dateB.getTime() - dateA.getTime();
    });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Session Notes</h3>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              className="pl-8 h-9 w-64"
              placeholder="Filter notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleSortOrder}
            className="gap-1"
          >
            {sortOrder === "asc" ? (
              <>
                <SortAscending size={16} />
                <span>Oldest</span>
              </>
            ) : (
              <>
                <SortDescending size={16} />
                <span>Newest</span>
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        {filteredAndSortedNotes.map((note) => (
          <div key={note.id} className="border rounded-lg">
            <button
              className="w-full text-left p-3 flex justify-between items-center hover:bg-gray-50"
              onClick={() => setOpenId(openId === note.id ? null : note.id)}
            >
              <div className="flex items-center">
                <span className="text-blue-700 font-medium">{note.appointmentLabel}</span>
                <span className="mx-2 text-xs text-gray-400 flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {note.date}
                </span>
                <span className="text-xs text-gray-400 flex items-center">
                  <Clock size={14} className="mr-1" />
                  {note.time}
                </span>
              </div>
              <span className="text-sm text-gray-400">{openId === note.id ? "▲" : "▼"}</span>
            </button>
            {openId === note.id && (
              <div className="p-4 bg-blue-50 border-t space-y-3">
                <div>
                  <div className="font-medium mb-2 flex items-center justify-between">
                    <span>Note:</span>
                    {editingId !== note.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditStart(note.id, note.note)}
                        className="h-8 px-2"
                      >
                        <Edit size={16} className="mr-1" />
                        Edit
                      </Button>
                    )}
                  </div>
                  {editingId === note.id ? (
                    <div className="space-y-2">
                      <Input
                        value={editedNote}
                        onChange={(e) => setEditedNote(e.target.value)}
                        className="w-full"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleEditSave(note.id)}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-3">{note.note}</div>
                  )}
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
