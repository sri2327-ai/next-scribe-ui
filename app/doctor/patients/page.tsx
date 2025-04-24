
"use client";

import React from 'react';
import PatientsPanel from '../components/panels/PatientsPanel';

export default function Patients() {
  return (
    <main className="flex-1 overflow-auto bg-gray-100">
      <PatientsPanel />
    </main>
  );
}
