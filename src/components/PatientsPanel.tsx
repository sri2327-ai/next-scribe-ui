import React, { useState } from "react";
import AddPatientPopup from "./popups/AddPatientPopup";
import { Search, Filter } from "lucide-react";
import PatientDetailPanel from "./PatientDetailPanel";
import Sidebar from "./Sidebar";

const panelPatients = [
  {
    name: "Kelly L. Aceves",
    age: "47y 9m",
    dob: "7-4-1977",
    pronouns: "",
    gender: "Female",
    status: "New Patient",
    tags: ["Edit Tags"],
    copay: 15,
    flags: 0,
    clinician: "Katherine Thompson",
    appointments: [
      {
        label: "Today",
        date: "Apr 22, 2025",
        time: "4:00p-5:00p",
        location: "Virtual Room",
        clinician: "Katherine Thompson",
      },
      {
        label: "Next",
        date: "May 6, 2025",
        time: "4:30p-5:30p",
        location: "Virtual Room",
        clinician: "Katherine Thompson",
      },
    ],
    lastAppointment: null,
    phone: "(832) 495-2856",
    email: "kellylynn.aceves@yahoo.com",
  },
  {
    name: "Gonzalo Adolfo Agudelo",
    age: "53y 2m",
    dob: "5-4-1971",
    pronouns: "",
    gender: "Male",
    status: "Follow-up Patient X",
    tags: [],
    copay: 25,
    flags: 1,
    clinician: "Katherine Thompson",
    appointments: [
      {
        label: "Next",
        date: "Apr 28, 2025",
        time: "3:00p-3:45p",
        location: "Virtual Room",
        clinician: "Katherine Thompson",
      },
    ],
    lastAppointment: "Apr 6, 2025",
    phone: "(999) 555-1234",
    email: "gonzalo.a@gmail.com",
  }
];

const filterOptionsInitial = [
  "My patients only",
  "Deactivated patients only",
  "Intake forms to review",
  "Unread messages"
];

const PatientsPanel: React.FC = () => {
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedPatientIdx, setSelectedPatientIdx] = useState<number | null>(null);

  const patientsPerPage = 8;

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const filteredPatients = panelPatients.filter(patient =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  const allSelected = activeFilters.length === filterOptionsInitial.length;
  const toggleFilter = (opt: string) => {
    setActiveFilters(filters =>
      filters.includes(opt)
        ? filters.filter(o => o !== opt)
        : [...filters, opt]
    );
  };
  const handleSelectAll = () => setActiveFilters(allSelected ? [] : [...filterOptionsInitial]);

  return (
    <div className="flex h-[100vh] min-h-0">
      <Sidebar
        collapsed={false}
        onToggleCollapse={() => {}}
        activeView={"Patients"}
        onViewChange={() => {}}
      />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {!selectedPatientIdx && (
          <>
            <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white/80 z-10">
              <h2 className="text-lg font-semibold">Patients</h2>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 min-w-40">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search size={18} />
                  </span>
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search patients..."
                    className="w-full pl-8 pr-4 py-2 border rounded-lg text-sm hover:border-blue-600 focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowFilters(f => !f)}
                    className="px-4 py-2 border rounded-lg text-sm flex items-center gap-2 hover:bg-blue-100"
                  >
                    <Filter className="text-gray-600" size={18} />
                    Filter
                  </button>
                  {showFilters && (
                    <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg p-3 z-50">
                      <button
                        className="text-blue-600 text-xs mb-2 underline"
                        onClick={handleSelectAll}
                        type="button"
                      >
                        {allSelected ? "Unselect all" : "Select all"}
                      </button>
                      <div className="space-y-2">
                        {filterOptionsInitial.map(opt => (
                          <label key={opt} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300"
                              checked={activeFilters.includes(opt)}
                              onChange={() => toggleFilter(opt)}
                            />
                            <span className="text-sm select-none">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => setShowAddPatient(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700"
                >
                  <span className="font-bold text-lg">+</span>
                  Add Patient
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto divide-y">
              {currentPatients.map((patient, i) => (
                <div
                  key={i}
                  className="p-4 hover:bg-blue-50 flex items-center justify-between cursor-pointer"
                  onClick={() => setSelectedPatientIdx(i + indexOfFirstPatient)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="/lovable-uploads/53ad6fba-0f2a-42f5-9bb4-e0a5e45188d5.png"
                      alt="profile"
                      className="w-9 h-9 rounded-full object-cover bg-gray-200"
                    />
                    <div>
                      <h3 className="font-medium">{patient.name}</h3>
                      <div className="text-xs text-gray-500">{patient.clinician}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                      {patient.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t flex justify-between items-center">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="px-4 py-2 border rounded-lg text-sm hover:bg-blue-100"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {Math.ceil(filteredPatients.length / patientsPerPage)}
              </span>
              <button
                onClick={() => setCurrentPage(p => p + 1)}
                className="px-4 py-2 border rounded-lg text-sm hover:bg-blue-100"
                disabled={currentPage === Math.ceil(filteredPatients.length / patientsPerPage)}
              >
                Next
              </button>
            </div>
            <AddPatientPopup isOpen={showAddPatient} onClose={() => setShowAddPatient(false)} onSave={() => {}} />
          </>
        )}
        {selectedPatientIdx !== null && (
          <PatientDetailPanel
            patient={filteredPatients[selectedPatientIdx]}
            onClose={() => setSelectedPatientIdx(null)}
          />
        )}
      </div>
    </div>
  );
};

export default PatientsPanel;
