import React from 'react';
import DocumentScanner from './DocumentScanner';

interface PatientDocumentsProps {
  patient: {
    name: string;
  };
}

const PatientDocuments: React.FC<PatientDocumentsProps> = ({ patient }) => {
  return (
    <div className="space-y-6">
      <DocumentScanner />
    </div>
  );
};

export default PatientDocuments;
