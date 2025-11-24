
import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Download, 
  RefreshCw, 
  ArrowRight, 
  AlertTriangle 
} from 'lucide-react';

interface ValidationError {
  row: number;
  column: string;
  issue: string;
  data: any;
}

export const ImportPreRegistration: React.FC = () => {
  const [step, setStep] = useState<'UPLOAD' | 'VALIDATING' | 'SUMMARY'>('UPLOAD');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock Validation Results
  const [stats, setStats] = useState({ total: 0, success: 0, errors: 0, duplicates: 0 });
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      startSimulation();
    }
  };

  const startSimulation = () => {
    setStep('VALIDATING');
    // Simulate processing delay
    setTimeout(() => {
      setStats({
        total: 154,
        success: 142,
        errors: 8,
        duplicates: 4
      });
      setValidationErrors([
        { row: 12, column: 'Email', issue: 'Invalid format', data: { name: 'John Doe', email: 'john.doe@' } },
        { row: 45, column: 'Phone', issue: 'Missing country code', data: { name: 'Sarah Lee', phone: '91234567' } },
        { row: 88, column: 'Required', issue: 'Missing Full Name', data: { name: '', email: 'test@test.com' } },
      ]);
      setStep('SUMMARY');
    }, 2000);
  };

  const handleReset = () => {
    setFile(null);
    setStep('UPLOAD');
    setValidationErrors([]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Import Pre-Registration</h1>
          <p className="text-gray-500 mt-1">Bulk upload attendees from CSV or Excel files.</p>
        </div>
        {step === 'SUMMARY' && (
             <button 
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors"
             >
                 <RefreshCw size={16} />
                 Import Another File
             </button>
        )}
      </div>

      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col p-8">
        
        {step === 'UPLOAD' && (
          <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in-95">
             <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                 <FileSpreadsheet className="text-indigo-600" size={40} />
             </div>
             <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Attendee List</h2>
             <p className="text-gray-500 mb-8 max-w-md text-center">
                Drag and drop your CSV or Excel file here. Ensure your file matches the template structure.
             </p>

             <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full max-w-xl aspect-[3/1] bg-gray-50 border-2 border-dashed border-indigo-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50/50 transition-all group"
             >
                 <Upload className="text-indigo-400 group-hover:scale-110 transition-transform mb-3" size={32} />
                 <span className="font-bold text-indigo-600">Click to Upload File</span>
                 <span className="text-xs text-gray-400 mt-1">.CSV, .XLSX supported</span>
             </div>
             <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".csv,.xlsx"
                onChange={handleFileChange}
             />

             <button className="mt-8 flex items-center gap-2 text-indigo-600 font-medium hover:underline text-sm">
                 <Download size={16} />
                 Download CSV Template
             </button>
          </div>
        )}

        {step === 'VALIDATING' && (
            <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in">
                <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-indigo-600 animate-[shimmer_1.5s_infinite] w-full origin-left-right"></div>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Processing Data...</h3>
                <p className="text-gray-500 text-sm mt-1">Validating {file?.name}</p>
            </div>
        )}

        {step === 'SUMMARY' && (
            <div className="flex-1 flex flex-col gap-8 animate-in slide-in-from-bottom-4">
                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <span className="text-xs font-bold text-gray-500 uppercase">Total Rows</span>
                        <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                        <span className="text-xs font-bold text-green-700 uppercase">Ready to Import</span>
                        <div className="text-2xl font-bold text-gray-800">{stats.success}</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                        <span className="text-xs font-bold text-orange-700 uppercase">Duplicates</span>
                        <div className="text-2xl font-bold text-gray-800">{stats.duplicates}</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                        <span className="text-xs font-bold text-red-700 uppercase">Errors Found</span>
                        <div className="text-2xl font-bold text-gray-800">{stats.errors}</div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex gap-8 min-h-0">
                    {/* Error Table */}
                    <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
                        <div className="px-6 py-4 border-b border-gray-100 bg-red-50 flex justify-between items-center">
                            <h3 className="font-bold text-red-800 flex items-center gap-2">
                                <AlertCircle size={18} />
                                Validation Errors ({validationErrors.length})
                            </h3>
                            <span className="text-xs text-red-600 font-medium">Please correct these before finalizing</span>
                        </div>
                        <div className="flex-1 overflow-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 sticky top-0">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Row</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Column</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Issue</th>
                                        <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {validationErrors.map((err, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-6 py-3 text-gray-600 text-sm font-mono">#{err.row}</td>
                                            <td className="px-6 py-3 text-gray-800 text-sm font-medium">{err.column}</td>
                                            <td className="px-6 py-3 text-red-600 text-sm">{err.issue}</td>
                                            <td className="px-6 py-3 text-right">
                                                <button className="text-indigo-600 hover:text-indigo-800 text-xs font-bold">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    {/* Summary/Action Panel */}
                    <div className="w-80 shrink-0 bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col h-full">
                         <h3 className="font-bold text-gray-800 mb-4">Import Summary</h3>
                         
                         <div className="space-y-4 mb-8">
                             <div className="flex items-start gap-3">
                                 <CheckCircle size={20} className="text-green-500 mt-0.5" />
                                 <div>
                                     <div className="text-sm font-medium text-gray-800">142 Records Clean</div>
                                     <div className="text-xs text-gray-500">Will be added directly to database</div>
                                 </div>
                             </div>
                             <div className="flex items-start gap-3">
                                 <AlertTriangle size={20} className="text-orange-500 mt-0.5" />
                                 <div>
                                     <div className="text-sm font-medium text-gray-800">4 Duplicates</div>
                                     <div className="text-xs text-gray-500">Will be sent to Review Queue</div>
                                 </div>
                             </div>
                             <div className="flex items-start gap-3">
                                 <X size={20} className="text-red-500 mt-0.5" />
                                 <div>
                                     <div className="text-sm font-medium text-gray-800">8 Errors</div>
                                     <div className="text-xs text-gray-500">Must be fixed or discarded</div>
                                 </div>
                             </div>
                         </div>

                         <div className="mt-auto space-y-3">
                             <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                                 Finalize Import
                                 <ArrowRight size={18} />
                             </button>
                             <button className="w-full bg-white border border-gray-200 text-gray-600 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                 Download Error Report
                             </button>
                         </div>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};
