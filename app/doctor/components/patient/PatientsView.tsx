"use client";

import React, { useState } from 'react';
import AddPatientPopup from '../popups/AddPatientPopup';
import { mockPatientData } from '@/data/mockData';

const PatientsView: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const patientsPerPage = 8;
  const [showAddPatient, setShowAddPatient] = useState<boolean>(false);
  
  // Pagination calculations
  const allPatients = mockPatientData;
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = allPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-lg font-semibold">Patients</h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full pl-8 pr-4 py-2 border rounded-lg text-sm hover:border-blue-600"
            />
            <i className="fas fa-search absolute left-2 top-3 text-gray-400"></i>
          </div>
          
          {/* Filters Dropdown */}
          <div className="relative">
            <button className="px-4 py-2 border rounded-lg text-sm flex items-center gap-2 hover:bg-blue-100">
              <i className="fas fa-filter text-gray-600"></i>
              Filters
            </button>
            
            {/* Dropdown Content (hidden by default) */}
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-3 z-10 hidden">
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm">My patients only</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm">Deactivated patients only</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm">Intake forms to review</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm">Unread messages</span>
                </label>
              </div>
            </div>
          </div>

          {/* Add Patient Button */}
          <button 
            onClick={() => setShowAddPatient(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700"
          >
            <i className="fas fa-plus"></i>
            Add Patient
          </button>
        </div>
      </div>

      {/* Patients List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y">
          {currentPatients.map((patient, index) => (
            <div key={index} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{patient.name}</h3>
                  <p className="text-sm text-gray-500">{patient.clinician}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-800">
                    <i className="fas fa-user-plus"></i>
                    Add care team
                  </button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm hover:bg-blue-200">
                    {patient.status}
                  </button>
                  <button className="text-gray-600 hover:text-blue-600">
                    <i className="fas fa-tag"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t flex justify-between items-center">
        <button 
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          className="px-4 py-2 border rounded-lg text-sm hover:bg-blue-100"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        <span className="text-sm text-gray-600">
          Page {currentPage} of {Math.ceil(allPatients.length / patientsPerPage)}
        </span>

        <button 
          onClick={() => setCurrentPage(p => p + 1)}
          className="px-4 py-2 border rounded-lg text-sm hover:bg-blue-100"
          disabled={currentPage === Math.ceil(allPatients.length / patientsPerPage)}
        >
          Next
        </button>
      </div>

      {showAddPatient && (
        <AddPatientPopup
          isOpen={showAddPatient}
          onClose={() => setShowAddPatient(false)}
          onSave={(data) => console.log('Save patient:', data)}
        />
      )}
    </div>
  );
};

export default PatientsView;
