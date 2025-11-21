import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DuplicateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const DuplicateModal: React.FC<DuplicateModalProps> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-brand-purple">
            <AlertTriangle size={20} />
            <h3 className="font-bold text-lg">Possible Duplicate Found</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <p className="text-gray-600 text-sm leading-relaxed">
            A similar attendee record already exists. Please review before submitting to ensure data integrity.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 flex items-center justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition-colors text-sm"
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-white border border-brand-purple text-brand-purple font-medium rounded-lg hover:bg-brand-light transition-colors text-sm"
          >
            View Match
          </button>
          <button 
            onClick={onSubmit}
            className="px-4 py-2 bg-brand-purple text-white font-medium rounded-lg hover:bg-brand-hover transition-colors shadow-sm text-sm"
          >
            Submit Anyway
          </button>
        </div>
      </div>
    </div>
  );
};