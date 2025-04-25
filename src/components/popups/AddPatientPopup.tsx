
import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}
const steps = [
  { number: 1, title: "Patient Info" },
  { number: 2, title: "Surveys and Forms" },
  { number: 3, title: "Care Team" }
];
const AddPatientPopup: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    phone: "",
    consent: false,
    sendIntake: true,
    invitePortal: true,
    careTeam: []
  });
  const validateStep1 = () =>
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.email &&
    formData.email === formData.confirmEmail &&
    formData.consent;
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl border shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Add new patient</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 font-bold">×</button>
        </div>
        <div className="flex justify-between mb-7">
          {steps.map(step => (
            <div key={step.number} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${currentStep >= step.number ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
                {step.number}
              </div>
              <div className={`ml-2 text-xs ${currentStep === step.number ? "font-bold" : ""}`}>
                {step.title}
              </div>
              {step.number < 3 && <div className="flex-1 h-px bg-gray-200 mx-2"></div>}
            </div>
          ))}
        </div>
        {currentStep === 1 && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="First name"
              value={formData.firstName}
              onChange={e => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full p-2 border rounded text-sm"
            />
            <input
              type="text"
              placeholder="Middle name"
              value={formData.middleName}
              onChange={e => setFormData({ ...formData, middleName: e.target.value })}
              className="w-full p-2 border rounded text-sm"
            />
            <input
              type="text"
              placeholder="Last name"
              value={formData.lastName}
              onChange={e => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full p-2 border rounded text-sm"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border rounded text-sm"
            />
            <input
              type="email"
              placeholder="Confirm Email"
              value={formData.confirmEmail}
              onChange={e => setFormData({ ...formData, confirmEmail: e.target.value })}
              className="w-full p-2 border rounded text-sm"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-2 border rounded text-sm"
            />
            <label className="flex items-center mt-2">
              <input type="checkbox" checked={formData.consent} onChange={e => setFormData({ ...formData, consent: e.target.checked })} className="mr-2" />
              <span className="text-sm">
                Patient has consented to communication from your practice via email and SMS text message
              </span>
            </label>
          </div>
        )}
        {currentStep === 2 && (
          <div className="space-y-4">
            <label className="flex items-center">
              <input type="checkbox" checked={formData.sendIntake} onChange={e => setFormData({ ...formData, sendIntake: e.target.checked })} className="mr-2" />
              Send intake form
            </label>
            <label className="flex items-center">
              <input type="checkbox" checked={formData.invitePortal} onChange={e => setFormData({ ...formData, invitePortal: e.target.checked })} className="mr-2" />
              Invite to patient portal
            </label>
          </div>
        )}
        {currentStep === 3 && (
          <div className="space-y-4">
            <input className="flex-1 p-2 border rounded" placeholder="Search care team members..." />
            {/* Care team members list shown here */}
          </div>
        )}
        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-4 py-2 border rounded text-gray-700">Cancel</button>
          {currentStep > 1 && (
            <button onClick={() => setCurrentStep(s => s - 1)} className="px-4 py-2 border rounded text-gray-700">Back</button>
          )}
          {currentStep < 3 ? (
            <button
              onClick={() => validateStep1() && setCurrentStep(s => s + 1)}
              className={`px-4 py-2 rounded text-white ${validateStep1() ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
              disabled={!validateStep1()}
            >Next</button>
          ) : (
            <button
              onClick={() => { onSave(formData); onClose(); }}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >Create Patient</button>
          )}
        </div>
      </div>
    </div>
  )
};
export default AddPatientPopup;
