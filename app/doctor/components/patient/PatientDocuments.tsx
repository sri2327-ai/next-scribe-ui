
"use client";

import { Card } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import DocumentScanner from "../DocumentScanner";

const PatientDocuments = () => {
  const documents = [
    { name: "Medical Report - Jan 2025", date: "2025-01-15", type: "PDF" },
    { name: "Lab Results", date: "2025-02-01", type: "PDF" },
    { name: "Insurance Card", date: "2025-01-10", type: "Image" }
  ];

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Documents</h3>
        <DocumentScanner />
      </div>
      
      <div className="space-y-4">
        {documents.map((doc, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-sm text-gray-500">{doc.date} • {doc.type}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PatientDocuments;
