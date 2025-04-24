
"use client";

import React from 'react';
import InboxPanel from '../components/panels/InboxPanel';

export default function Inbox() {
  return (
    <main className="flex-1 overflow-auto bg-gray-100">
      <InboxPanel />
    </main>
  );
}
