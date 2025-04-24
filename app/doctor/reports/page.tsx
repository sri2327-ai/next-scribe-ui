
"use client";

import React from 'react';
import { Card } from "@/components/ui/card";

export default function Reports() {
  return (
    <main className="flex-1 overflow-auto bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Patient Statistics</h2>
          <p className="text-gray-600">Patient statistics and analytics will be displayed here.</p>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Clinical Outcomes</h2>
          <p className="text-gray-600">Clinical outcomes and metrics will be displayed here.</p>
        </Card>
      </div>
    </main>
  );
}
