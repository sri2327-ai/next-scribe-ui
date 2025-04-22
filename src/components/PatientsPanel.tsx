
import React, { useState } from "react";
import AddPatientPopup from "./popups/AddPatientPopup";

const panelPatients = [
  {
    name: "Kelly L. Aceves",
    clinician: "Katherine Thompson",
    status: "New Patient X",
    tags: []
  },
  {
    name: "Gonzalo Adolfo Agudelo",
    clinician: "Katherine Thompson",
    status: "Follow-up Patient X",
    tags: []
  }
];

const PatientsPanel: React.FC = () => {
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 8;

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = panelPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white/80">
        <h2 className="text-lg font-semibold">Patients</h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full pl-8 pr-4 py-2 border rounded-lg text-sm hover:border-blue-600"
            />
            <span className="absolute left-2 top-3 text-gray-400">
              <i className="fas fa-search"></i>
            </span>
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
          <div key={i} className="p-4 hover:bg-gray-50 flex items-center justify-between">
            <div>
              <h3 className="font-medium">{patient.name}</h3>
              <div className="text-xs text-gray-500">{patient.clinician}</div>
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
          Page {currentPage} of {Math.ceil(panelPatients.length / patientsPerPage)}
        </span>
        <button
          onClick={() => setCurrentPage(p => p + 1)}
          className="px-4 py-2 border rounded-lg text-sm hover:bg-blue-100"
          disabled={currentPage === Math.ceil(panelPatients.length / patientsPerPage)}
        >
          Next
        </button>
      </div>
      <AddPatientPopup isOpen={showAddPatient} onClose={() => setShowAddPatient(false)} onSave={() => {}} />
    </div>
  );
};

export default PatientsPanel;
