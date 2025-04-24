
import React from 'react';
import { X, Calendar, Check, X as XIcon } from 'lucide-react';

interface AppointmentRequest {
  id: string;
  patientName: string;
  date: string;
  time: string;
  type: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
}

const mockRequests: AppointmentRequest[] = [
  {
    id: '1',
    patientName: 'John Smith',
    date: '2025-04-28',
    time: '10:00 AM',
    type: 'Psychotherapy',
    message: 'Requesting an earlier appointment due to worsening symptoms.',
    status: 'pending'
  },
  {
    id: '2',
    patientName: 'Emma Johnson',
    date: '2025-04-30',
    time: '3:30 PM',
    type: 'Medication Management',
    status: 'pending'
  },
  {
    id: '3',
    patientName: 'Michael Brown',
    date: '2025-05-02',
    time: '2:00 PM',
    type: 'Consultation',
    status: 'pending'
  }
];

interface AppointmentRequestsDrawerProps {
  open: boolean;
  onClose: () => void;
}

const AppointmentRequestsDrawer: React.FC<AppointmentRequestsDrawerProps> = ({ open, onClose }) => {
  const [requests, setRequests] = React.useState<AppointmentRequest[]>(mockRequests);

  const handleApprove = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'approved' as const } : req
    ));
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'rejected' as const } : req
    ));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full overflow-auto">
        <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            <h2 className="text-lg font-semibold">Appointment Requests</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          {requests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No pending appointment requests
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map(request => (
                <div key={request.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{request.patientName}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Date:</span>
                      <span>{new Date(request.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Time:</span>
                      <span>{request.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Type:</span>
                      <span>{request.type}</span>
                    </div>
                  </div>
                  
                  {request.message && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                      {request.message}
                    </div>
                  )}
                  
                  {request.status === 'pending' && (
                    <div className="flex justify-end mt-3 gap-2">
                      <button 
                        onClick={() => handleReject(request.id)}
                        className="p-2 border rounded hover:bg-gray-100"
                      >
                        <XIcon className="w-4 h-4 text-red-500" />
                      </button>
                      <button 
                        onClick={() => handleApprove(request.id)}
                        className="p-2 border rounded hover:bg-gray-100"
                      >
                        <Check className="w-4 h-4 text-green-500" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentRequestsDrawer;
