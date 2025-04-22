
import React, { useState } from 'react';
import { PatientFormData } from '../types';

interface AddPatientPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PatientFormData) => void;
}

const AddPatientPopup: React.FC<AddPatientPopupProps> = ({ isOpen, onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<PatientFormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    phone: '',
    consent: false,
    sendIntake: true,
    invitePortal: true,
    careTeam: []
  });

  const steps = [
    { number: 1, title: 'Patient Info' },
    { number: 2, title: 'Surveys and Forms' },
    { number: 3, title: 'Care Team' }
  ];

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  const validateStep1 = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email &&
      formData.email === formData.confirmEmail &&
      formData.consent
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Add new patient</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {steps.map(step => (
            <div key={step.number} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${currentStep >= step.number ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                {step.number}
              </div>
              <div className={`ml-2 text-sm ${currentStep === step.number ? 'font-medium' : ''}`}>
                {step.title}
              </div>
              {step.number < 3 && <div className="flex-1 h-px bg-gray-200 mx-2"></div>}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              The patient's account will be created, and they will receive an email and text message 
              containing information to join Osmind with you as their provider.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  * Patient first name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Patient middle name
                </label>
                <input
                  type="text"
                  value={formData.middleName}
                  onChange={(e) => setFormData({...formData, middleName: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  * Patient last name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  * Patient email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  * Confirm email
                </label>
                <input
                  type="email"
                  value={formData.confirmEmail}
                  onChange={(e) => setFormData({...formData, confirmEmail: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <label className="flex items-center mt-4">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                className="mr-2"
              />
              <span className="text-sm">
                Patient has consented to communication from your practice via email and SMS text message
              </span>
            </label>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h4 className="font-medium mb-4">Select forms to send:</h4>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.sendIntake}
                onChange={(e) => setFormData({...formData, sendIntake: e.target.checked})}
                className="mr-2"
              />
              Send intake form
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.invitePortal}
                onChange={(e) => setFormData({...formData, invitePortal: e.target.checked})}
                className="mr-2"
              />
              Invite to patient portal
            </label>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search care team members..."
                className="flex-1 p-2 border rounded"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded">
                <i className="fas fa-plus mr-2"></i>Add Member
              </button>
            </div>
            <div className="mt-4 space-y-2">
              {formData.careTeam.map(member => (
                <div key={member} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>{member}</span>
                  <button className="text-red-500">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-700"
          >
            Cancel
          </button>
          
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(s => s - 1)}
              className="px-4 py-2 border rounded text-gray-700"
            >
              Back
            </button>
          )}

          {currentStep < 3 ? (
            <button
              onClick={() => validateStep1() && setCurrentStep(s => s + 1)}
              className={`px-4 py-2 rounded text-white ${
                validateStep1() ? 'bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!validateStep1()}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Create Patient
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPatientPopup;
