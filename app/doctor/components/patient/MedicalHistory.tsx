
"use client";

import { Card } from "@/components/ui/card";

const MedicalHistory = () => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Medical History</h3>
      <div className="space-y-6">
        <section>
          <h4 className="font-medium text-gray-600 mb-2">Current Medications</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Medication A - 10mg daily</li>
            <li>Medication B - 20mg twice daily</li>
          </ul>
        </section>
        
        <section>
          <h4 className="font-medium text-gray-600 mb-2">Allergies</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Penicillin</li>
            <li>Peanuts</li>
          </ul>
        </section>
        
        <section>
          <h4 className="font-medium text-gray-600 mb-2">Past Surgeries</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Appendectomy (2018)</li>
            <li>Knee Surgery (2020)</li>
          </ul>
        </section>
        
        <section>
          <h4 className="font-medium text-gray-600 mb-2">Chronic Conditions</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Hypertension</li>
            <li>Type 2 Diabetes</li>
          </ul>
        </section>
      </div>
    </Card>
  );
};

export default MedicalHistory;
