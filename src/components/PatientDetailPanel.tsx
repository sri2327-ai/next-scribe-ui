
import React from 'react';
import { ArrowLeft, Phone, Mail, Calendar } from 'lucide-react';

interface Patient {
  name: string;
  age: string;
  dob: string;
  pronouns?: string;
  gender: string;
  status: string;
  tags: string[];
  copay: number;
  flags: number;
  clinician: string;
  appointments: {
    label?: string;
    date: string;
    time: string;
    location: string;
    clinician: string;
  }[];
  lastAppointment: string | null;
  phone: string;
  email: string;
}

interface PatientDetailPanelProps {
  patient: Patient;
  onClose: () => void;
}

const PatientDetailPanel: React.FC<PatientDetailPanelProps> = ({ patient, onClose }) => {
  const [activeTab, setActiveTab] = React.useState('profile');
  
  return (
    <div className="flex-1 bg-white flex flex-col overflow-hidden">
      <div className="p-4 border-b flex items-center">
        <button 
          onClick={onClose}
          className="p-1 mr-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold">{patient.name}</h2>
        <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
          {patient.status}
        </span>
      </div>
      
      <div className="p-4 border-b">
        <div className="flex items-center">
          <img
            src="/lovable-uploads/53ad6fba-0f2a-42f5-9bb4-e0a5e45188d5.png" 
            alt={patient.name}
            className="w-16 h-16 rounded-full object-cover bg-gray-100"
          />
          <div className="ml-4">
            <div className="text-sm">
              <span className="text-gray-500">DOB:</span> {patient.dob} ({patient.age})
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Gender:</span> {patient.gender}
              {patient.pronouns && <span className="ml-2">({patient.pronouns})</span>}
            </div>
            <div className="flex items-center gap-4 mt-2">
              <a href={`tel:${patient.phone}`} className="text-blue-600 flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                <span className="text-sm">Call</span>
              </a>
              <a href={`mailto:${patient.email}`} className="text-blue-600 flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                <span className="text-sm">Email</span>
              </a>
              <button className="text-blue-600 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-sm">Schedule</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-b">
        <div className="flex overflow-x-auto">
          {['Profile', 'Notes', 'Chart', 'Documents', 'Timeline', 'Billing', 'Messages'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeTab === tab.toLowerCase()
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'profile' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Patient Information</h3>
            
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-2">Contact Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{patient.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{patient.email}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-2">Appointments</h4>
              <div className="space-y-3">
                {patient.appointments.map((appointment, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    {appointment.label && (
                      <div className="text-xs font-semibold text-blue-600 mb-1">
                        {appointment.label}
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{appointment.date}</div>
                        <div className="text-sm text-gray-500">{appointment.time}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">{appointment.location}</div>
                        <div className="text-xs text-gray-500">with {appointment.clinician}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {patient.lastAppointment && (
                <div className="mt-2 text-sm text-gray-500">
                  Last appointment: {patient.lastAppointment}
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-2">Billing Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Copay</p>
                  <p>${patient.copay}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {patient.tags.length > 0 ? (
                  patient.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 rounded text-sm">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">No tags added</span>
                )}
              </div>
            </div>
          </div>
        )}
        
        {activeTab !== 'profile' && (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>This {activeTab} tab is under development</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetailPanel;
