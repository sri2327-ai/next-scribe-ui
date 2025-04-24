
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Scan } from 'lucide-react';
import { toast } from "sonner";

const DocumentScanner = () => {
  const handleScan = async () => {
    try {
      // This will attempt to launch the system's default scanning application
      // Note: This requires proper system integration and permissions
      window.open('scanner:', '_self');
    } catch (error) {
      toast.error("Unable to access scanner. Please check your system settings.");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Document Scanner</h3>
      <Button onClick={handleScan} className="w-full">
        <Scan className="h-4 w-4 mr-2" />
        Connect to Scanner
      </Button>
      <p className="text-sm text-gray-500">
        Click to connect to your system's default scanning application
      </p>
    </div>
  );
};

export default DocumentScanner;
