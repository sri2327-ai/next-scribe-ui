
import React, { useState } from "react";
import { X } from "lucide-react";

interface DummyAppt {
  id: number;
  patient: string;
  type: string;
  forMe: boolean;
}

const dummyRequests: DummyAppt[] = [
  { id: 1, patient: "Alex Smith", type: "Psychotherapy", forMe: true },
  { id: 2, patient: "Jane Williams", type: "Medication Management", forMe: false },
  { id: 3, patient: "Michael Lee", type: "Initial Evaluation", forMe: true },
  { id: 4, patient: "Sophie Brown", type: "Psychotherapy", forMe: false }
];

const AppointmentRequestsDrawer: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState<"all" | "mine">("all");
  const [requests, setRequests] = useState(dummyRequests);

  // Approve appointment: removes it from requests
  function handleApprove(id: number) {
    setRequests(prev => prev.filter(r => r.id !== id));
  }

  const shown =
    activeTab === "all"
      ? requests
      : requests.filter(r => r.forMe);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg z-50 transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ minWidth: 340 }}
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-blue-900">Appointment Requests</span>
        </div>
        <button
          onClick={onClose}
          title="Close"
          className="p-2 rounded hover:bg-blue-100"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-2 text-center text-sm font-medium transition ${
            activeTab === "all"
              ? "border-b-2 border-blue-700 text-blue-800 bg-blue-100"
              : "text-gray-500 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Requests
        </button>
        <button
          className={`flex-1 py-2 text-center text-sm font-medium transition ${
            activeTab === "mine"
              ? "border-b-2 border-blue-700 text-blue-800 bg-blue-100"
              : "text-gray-500 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("mine")}
        >
          My Requests
        </button>
      </div>
      <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 115px)" }}>
        {shown.length === 0 && (
          <div className="text-sm text-gray-400 mt-6 text-center">No appointment requests</div>
        )}
        {shown.map(r => (
          <div key={r.id} className="flex items-center justify-between mb-4 p-3 rounded border bg-gray-50">
            <div>
              <div className="font-semibold text-gray-700">{r.patient}</div>
              <div className="text-xs text-gray-500">{r.type}</div>
            </div>
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
              onClick={() => handleApprove(r.id)}
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentRequestsDrawer;
