
"use client";

import React from 'react';
import TaskPanel from '../components/panels/TaskPanel';

export default function Tasks() {
  return (
    <main className="flex-1 overflow-auto bg-gray-100">
      <TaskPanel />
    </main>
  );
}
