import React, { useState, useRef } from 'react';
import { Upload, ScanLine, Loader2, CheckCircle, AlertTriangle, XCircle, Save, ArrowRight } from 'lucide-react';
import { extractAttendeeData } from '../services/geminiService';
import { AttendeeForm, ExtractedAttendeeData, ExtractedField } from '../types';
import { DuplicateModal } from './DuplicateModal';

interface AICaptureProps {
  onSave: (data: AttendeeForm) => void;
  submissions: AttendeeForm[];
}

type CaptureStage = 'UPLOAD' | 'ANALYZING' | 'REVIEW';

export const AICapture: React.FC<AICaptureProps> = ({ onSave, submissions }) => {
  const [stage, setStage] = useState<CaptureStage>('UPLOAD');
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [extractedData, setExtractedData] = useState<ExtractedAttendeeData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        analyzeImage(result, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (base64String: string, type: string) => {
    setStage('ANALYZING');
    try {
      const base64Data = base64String.split(',')[1];
      const data = await extractAttendeeData(base64Data, type);
      setExtractedData(data);
      setStage('REVIEW');
    } catch (error) {
      console.error(error);
      alert("Failed to analyze image. Please try again.");
      setStage('UPLOAD');
      setImage(null);
    }
  };

  const handleInputChange = (field: keyof ExtractedAttendeeData, value: string) => {
    if (extractedData) {
      setExtractedData({
        ...extractedData,
        [field]: {
          ...extractedData[field],
          value: value
        }
      });
    }
  };

  const handlePreSaveCheck = () => {
    if (!extractedData) return;

    // Real Duplicate Detection
    const emailToCheck = extractedData.email.value;
    if (emailToCheck) {
        const isDuplicate = submissions.some(sub => 
            sub.email.toLowerCase() === emailToCheck.toLowerCase()
        );
        if (isDuplicate) {
            setIsModalOpen(true);
            return;
        }
    }
    
    handleFinalSave();
  };

  const handleFinalSave = () => {
    if (!extractedData) return;
    setIsModalOpen(false);

    const finalData: AttendeeForm = {
      id: crypto.randomUUID(),
      fullName: extractedData.fullName.value,
      phoneNumber: extractedData.phoneNumber.value,
      email: extractedData.email.value,
      location: extractedData.location.value,
      company: extractedData.company.value,
      jobTitle: extractedData.jobTitle.value,
      source: 'OCR',
      timestamp: new Date()
    };

    onSave(finalData);
    // Reset
    setStage('UPLOAD');
    setImage(null);
    setExtractedData(null);
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 70) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 45) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getConfidenceIcon = (score: number) => {
    if (score >= 70) return <CheckCircle size={14} />;
    if (score >= 45) return <AlertTriangle size={14} />;
    return <XCircle size={14} />;
  };

  const renderField = (key: keyof ExtractedAttendeeData, label: string) => {
    if (!extractedData) return null;
    const field = extractedData[key];
    const score = field.confidence;
    const styleClass = getConfidenceColor(score);

    return (
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border ${styleClass}`}>
            {getConfidenceIcon(score)}
            <span>{score}% Match</span>
          </div>
        </div>
        <input
          type="text"
          value={field.value}
          onChange={(e) => handleInputChange(key, e.target.value)}
          className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all bg-white text-gray-800 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple border-gray-300`}
        />
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white p-8 rounded-3xl shadow-lg shadow-brand-purple/5 border border-white">
        
        {stage === 'UPLOAD' && (
          <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in-95">
            <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-6">
              <ScanLine className="text-brand-purple" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Attendee Form</h2>
            <p className="text-gray-500 mb-8 max-w-md">
              Upload a photo of a business card or registration form. AI will extract the details for you to review.
            </p>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full max-w-lg aspect-video bg-brand-light border-2 border-dashed border-brand-purple rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-pink-100 transition-all group"
            >
              <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                <Upload className="text-brand-purple" size={32} />
              </div>
              <span className="font-bold text-brand-purple">Click to Upload</span>
              <span className="text-xs text-gray-400 mt-1">JPG, PNG supported</span>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        )}

        {stage === 'ANALYZING' && (
          <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in">
             <div className="relative">
               <div className="w-16 h-16 border-4 border-purple-100 border-t-brand-purple rounded-full animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <ScanLine size={20} className="text-brand-purple animate-pulse" />
               </div>
             </div>
             <h3 className="text-xl font-bold text-gray-800 mt-6">Analyzing Document...</h3>
             <p className="text-gray-500 mt-2">Extracting text and validating confidence scores.</p>
          </div>
        )}

        {stage === 'REVIEW' && extractedData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4">
            {/* Left: Image Preview */}
            <div className="lg:col-span-1">
              <h3 className="font-bold text-gray-800 mb-4">Source Document</h3>
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50 sticky top-6">
                 {image && <img src={image} alt="Source" className="w-full h-auto object-contain" />}
              </div>
            </div>

            {/* Right: Form Fields */}
            <div className="lg:col-span-2">
               <div className="flex items-center justify-between mb-6">
                 <div>
                    <h3 className="text-2xl font-bold text-brand-purple">Capture Review</h3>
                    <p className="text-sm text-gray-500">Please correct any fields marked in orange or red.</p>
                 </div>
                 <button 
                   onClick={() => {
                     setStage('UPLOAD');
                     setImage(null);
                   }}
                   className="text-gray-400 hover:text-gray-600 text-sm font-medium"
                 >
                   Discard
                 </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6">
                  {renderField('fullName', 'Full Name')}
                  {renderField('phoneNumber', 'Phone Number')}
                  {renderField('email', 'Email Address')}
                  {renderField('location', 'Location')}
                  {renderField('company', 'Company')}
                  {renderField('jobTitle', 'Job Title')}
               </div>

               <div className="flex justify-end gap-4">
                 <button
                   onClick={handlePreSaveCheck}
                   className="bg-brand-purple hover:bg-brand-hover text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                 >
                   <Save size={18} />
                   Confirm & Save
                   <ArrowRight size={18} />
                 </button>
               </div>
            </div>
          </div>
        )}

        <DuplicateModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onSubmit={handleFinalSave}
        />

      </div>
    </div>
  );
};