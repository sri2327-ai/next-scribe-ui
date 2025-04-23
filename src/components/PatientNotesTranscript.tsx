
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Filter, Clock, Edit, ArrowDownAZ, ArrowUpAZ, ChevronRight, ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  const [detailView, setDetailView] = useState<{isOpen: boolean, noteId: number | null}>({
    isOpen: false,
    noteId: null
  });

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

  const openDetailView = (note: typeof notes[0]) => {
    setDetailView({
      isOpen: true,
      noteId: note.id
    });
  };

  const currentDetailNote = notes.find(note => note.id === detailView.noteId);

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
                <ArrowUpAZ size={16} />
                <span>Oldest</span>
              </>
            ) : (
              <>
                <ArrowDownAZ size={16} />
                <span>Newest</span>
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {filteredAndSortedNotes.map((note) => (
          <div key={note.id} className="border rounded-lg hover:border-blue-300 transition-colors">
            <div 
              className="p-3 flex justify-between items-center cursor-pointer"
              onClick={() => openDetailView(note)}
            >
              <div>
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
                <div className="mt-2 text-sm line-clamp-2">{note.note}</div>
              </div>
              <Button variant="ghost" size="sm" className="ml-2">
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail View Dialog */}
      <Dialog open={detailView.isOpen} onOpenChange={(open) => setDetailView({...detailView, isOpen: open})}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Note Details</DialogTitle>
          </DialogHeader>
          
          {currentDetailNote && (
            <div className="flex h-full space-x-4 overflow-hidden">
              {/* Notes section */}
              <div className="flex-1 border rounded-lg p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Notes</h3>
                  {editingId !== currentDetailNote.id ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditStart(currentDetailNote.id, currentDetailNote.note)}
                      className="h-8 px-2"
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Button>
                  ) : null}
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="flex items-center mr-3">
                    <Calendar size={14} className="mr-1" />
                    {currentDetailNote.date}
                  </span>
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {currentDetailNote.time}
                  </span>
                </div>

                {editingId === currentDetailNote.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={editedNote}
                      onChange={(e) => setEditedNote(e.target.value)}
                      className="w-full border rounded-md p-3 min-h-32"
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
                        onClick={() => handleEditSave(currentDetailNote.id)}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    <p>{currentDetailNote.note}</p>
                    
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2">Doctor Recommendations</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Continue current medication regimen</li>
                        <li>Practice deep breathing exercises daily</li>
                        <li>Follow up in 2 weeks</li>
                      </ul>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2">Follow-up Tasks</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Schedule lab work</li>
                        <li>Refill prescription</li>
                        <li>Update medical history form</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Transcript section */}
              <div className="flex-1 border rounded-lg p-4 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-3">Transcript</h3>
                <pre className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap text-sm">
                  {currentDetailNote.transcript}
                </pre>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientNotesTranscript;
