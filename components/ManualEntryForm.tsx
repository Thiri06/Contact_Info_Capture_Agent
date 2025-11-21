import React, { useState } from 'react';
import { AlertCircle, Save } from 'lucide-react';
import { AttendeeForm } from '../types';
import { DuplicateModal } from './DuplicateModal';

interface ManualEntryFormProps {
  onSave: (data: AttendeeForm) => void;
  submissions: AttendeeForm[];
}

export const ManualEntryForm: React.FC<ManualEntryFormProps> = ({ onSave, submissions }) => {
  const [formState, setFormState] = useState<Partial<AttendeeForm>>({
    fullName: '',
    phoneNumber: '',
    email: '',
    location: '',
    company: '',
    jobTitle: ''
  });

  const [showValidation, setShowValidation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (field: keyof AttendeeForm, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  // Validation Logic
  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isNameInvalid = showValidation && (!formState.fullName || formState.fullName.trim() === '');
  const isEmailInvalid = showValidation && (!formState.email || !validateEmail(formState.email));

  const handleSaveClick = () => {
    setShowValidation(true);

    if (!formState.fullName || formState.fullName.trim() === '' || !formState.email || !validateEmail(formState.email)) {
      // Stop if invalid
      return;
    }

    // Real Duplicate Detection
    // Check if email already exists in submissions
    const isDuplicate = submissions.some(sub => 
      sub.email.toLowerCase() === formState.email?.toLowerCase()
    );

    if (isDuplicate) {
      setIsModalOpen(true);
    } else {
      handleConfirmSave();
    }
  };

  const handleConfirmSave = () => {
    setIsModalOpen(false);
    
    const dataToSave: AttendeeForm = {
      id: crypto.randomUUID(),
      fullName: formState.fullName || '',
      phoneNumber: formState.phoneNumber || '',
      email: formState.email || '',
      location: formState.location || '',
      company: formState.company || '',
      jobTitle: formState.jobTitle || '',
      source: 'MANUAL',
      timestamp: new Date()
    };

    onSave(dataToSave);
    
    // Reset form
    setFormState({
      fullName: '',
      phoneNumber: '',
      email: '',
      location: '',
      company: '',
      jobTitle: ''
    });
    setShowValidation(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Validation Banner */}
      {showValidation && (isEmailInvalid || isNameInvalid) && (
        <div className="mb-6 bg-pink-100 border border-pink-200 text-brand-purple px-4 py-3 rounded-lg flex items-center gap-3 animate-in slide-in-from-top-2">
          <AlertCircle size={20} className="text-brand-purple" />
          <span className="font-medium text-sm">Some fields need correction before submission.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Full Name Field */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={formState.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border outline-none transition-all bg-gray-800 text-white placeholder-gray-400 ${
              isNameInvalid 
                ? 'border-red-500 ring-2 ring-red-200' 
                : 'border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100'
            }`}
            placeholder="Enter full name"
          />
          {isNameInvalid && (
            <span className="text-xs text-red-500 font-medium mt-1 flex items-center gap-1">
              This field is required.
            </span>
          )}
        </div>

        {/* Phone Number Field */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            value={formState.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none transition-all bg-gray-800 text-white placeholder-gray-400"
            placeholder="Enter phone number"
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="text"
            value={formState.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border outline-none transition-all bg-gray-800 text-white placeholder-gray-400 ${
              isEmailInvalid 
                ? 'border-red-500 ring-2 ring-red-200' 
                : 'border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100'
            }`}
            placeholder="Enter email address"
          />
          {isEmailInvalid && (
            <span className="text-xs text-red-500 font-medium mt-1 flex items-center gap-1">
              <AlertCircle size={12} />
              Invalid email format. Please correct.
            </span>
          )}
        </div>

        {/* Location Field */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={formState.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none transition-all bg-gray-800 text-white placeholder-gray-400"
            placeholder="Enter location"
          />
        </div>

        {/* Company Field */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Company</label>
          <input
            type="text"
            value={formState.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none transition-all bg-gray-800 text-white placeholder-gray-400"
            placeholder="Enter company name"
          />
        </div>

        {/* Job Title Field */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            value={formState.jobTitle}
            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none transition-all bg-gray-800 text-white placeholder-gray-400"
            placeholder="Enter job title"
          />
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleSaveClick}
          className="bg-brand-purple hover:bg-brand-hover text-white font-semibold px-10 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          <Save size={18} />
          Save
        </button>
      </div>

      <DuplicateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleConfirmSave}
      />
    </div>
  );
};