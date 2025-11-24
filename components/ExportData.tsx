
import React, { useState } from 'react';
import { 
  Download, 
  FileSpreadsheet, 
  FileJson, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Calendar, 
  Filter, 
  CheckSquare, 
  Square,
  AlertCircle
} from 'lucide-react';

export const ExportData: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('CSV');
  const [includeCompletedOnly, setIncludeCompletedOnly] = useState(false);
  
  // Field Selection State
  const [selectedFields, setSelectedFields] = useState({
    fullName: true,
    email: true,
    phone: true,
    company: true,
    jobTitle: true,
    location: false,
    timestamp: true,
    source: true
  });

  // Mock Integrity Status
  const integrityStatus = {
    reviewQueuePending: 18, // Items still in review
    duplicatesDetected: 4,
    isClean: false // Set to true to see clean state
  };

  const toggleField = (field: keyof typeof selectedFields) => {
    setSelectedFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleExport = () => {
    if (!integrityStatus.isClean) {
      const confirm = window.confirm(`Warning: There are ${integrityStatus.reviewQueuePending} unresolved items in the Review Queue. These will not be included in the export. Continue?`);
      if (!confirm) return;
    }
    alert(`Exporting data in ${selectedFormat} format...`);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Export Data</h1>
          <p className="text-gray-500 mt-1">Download reviewed and verified attendee lists.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 h-full overflow-hidden">
        
        {/* Left Column: Configuration */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          
          {/* A. Export Options */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-6 text-lg">
              <Filter size={20} className="text-brand-purple" />
              Export Configuration
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Event</label>
                <select 
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none bg-white"
                >
                  <option value="All">All Events</option>
                  <option value="Tech Summit 2024">Tech Summit 2024</option>
                  <option value="HR Networking Night">HR Networking Night</option>
                  <option value="Future Skills Workshop">Future Skills Workshop</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Business Unit</label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none bg-white">
                  <option value="All">All Business Units</option>
                  <option value="IT Services">IT Services</option>
                  <option value="Education">Education</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date Range</label>
                <div className="relative">
                   <Calendar size={18} className="absolute left-3 top-2.5 text-gray-400" />
                   <select className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none bg-white">
                     <option>Last 30 Days</option>
                     <option>Last 7 Days</option>
                     <option>This Quarter</option>
                     <option>Custom Range</option>
                   </select>
                </div>
              </div>

              <div className="flex items-end pb-2">
                 <label className="flex items-center gap-3 cursor-pointer select-none">
                    <div 
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${includeCompletedOnly ? 'bg-brand-purple border-brand-purple text-white' : 'border-gray-300 bg-white'}`}
                      onClick={() => setIncludeCompletedOnly(!includeCompletedOnly)}
                    >
                      {includeCompletedOnly && <CheckSquare size={14} />}
                    </div>
                    <span className="text-sm font-medium text-gray-700">Completed events only</span>
                 </label>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
               <label className="block text-sm font-semibold text-gray-700 mb-4">Included Fields</label>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {Object.entries(selectedFields).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer group">
                       <div 
                         className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${value ? 'bg-brand-purple border-brand-purple text-white' : 'border-gray-300 bg-white group-hover:border-purple-300'}`}
                         onClick={() => toggleField(key as keyof typeof selectedFields)}
                       >
                         {value && <CheckSquare size={12} />}
                       </div>
                       <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </label>
                  ))}
               </div>
            </div>
          </div>

          {/* B. File Options */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
             <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-6 text-lg">
              <Download size={20} className="text-brand-purple" />
              File Format
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               <div 
                 onClick={() => setSelectedFormat('CSV')}
                 className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${selectedFormat === 'CSV' ? 'border-brand-purple bg-purple-50' : 'border-gray-100 hover:border-purple-100 bg-white'}`}
               >
                  <FileText size={32} className={selectedFormat === 'CSV' ? 'text-brand-purple' : 'text-gray-400'} />
                  <span className={`font-bold ${selectedFormat === 'CSV' ? 'text-brand-purple' : 'text-gray-600'}`}>CSV</span>
               </div>

               <div 
                 onClick={() => setSelectedFormat('Excel')}
                 className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${selectedFormat === 'Excel' ? 'border-brand-purple bg-purple-50' : 'border-gray-100 hover:border-purple-100 bg-white'}`}
               >
                  <FileSpreadsheet size={32} className={selectedFormat === 'Excel' ? 'text-brand-purple' : 'text-gray-400'} />
                  <span className={`font-bold ${selectedFormat === 'Excel' ? 'text-brand-purple' : 'text-gray-600'}`}>Excel</span>
               </div>

               <div 
                 onClick={() => setSelectedFormat('JSON')}
                 className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${selectedFormat === 'JSON' ? 'border-brand-purple bg-purple-50' : 'border-gray-100 hover:border-purple-100 bg-white'}`}
               >
                  <FileJson size={32} className={selectedFormat === 'JSON' ? 'text-brand-purple' : 'text-gray-400'} />
                  <span className={`font-bold ${selectedFormat === 'JSON' ? 'text-brand-purple' : 'text-gray-600'}`}>JSON</span>
               </div>
            </div>
          </div>

        </div>

        {/* Right Column: Integrity Summary & Action */}
        <div className="w-full lg:w-96 shrink-0 flex flex-col gap-6">
           
           {/* C. Integrity Summary */}
           <div className={`rounded-2xl shadow-sm border p-6 ${integrityStatus.isClean ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'}`}>
              <div className="flex items-start gap-3 mb-4">
                 {integrityStatus.isClean ? (
                    <CheckCircle className="text-green-600 shrink-0" size={24} />
                 ) : (
                    <AlertTriangle className="text-orange-600 shrink-0" size={24} />
                 )}
                 <div>
                    <h3 className={`font-bold text-lg ${integrityStatus.isClean ? 'text-green-800' : 'text-orange-800'}`}>
                       {integrityStatus.isClean ? 'Data Ready for Export' : 'Data Integrity Warning'}
                    </h3>
                    <p className={`text-sm mt-1 ${integrityStatus.isClean ? 'text-green-700' : 'text-orange-700'}`}>
                       {integrityStatus.isClean 
                         ? 'All items have been reviewed and resolved.' 
                         : 'There are pending items that require attention.'}
                    </p>
                 </div>
              </div>

              {!integrityStatus.isClean && (
                 <div className="space-y-3 bg-white/60 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-gray-700">Review Queue Pending</span>
                       <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">{integrityStatus.reviewQueuePending} items</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-gray-700">Possible Duplicates</span>
                       <span className="font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">{integrityStatus.duplicatesDetected} items</span>
                    </div>
                 </div>
              )}
              
              {!integrityStatus.isClean && (
                  <div className="text-xs text-orange-800 flex gap-2">
                     <AlertCircle size={14} className="shrink-0 mt-0.5" />
                     Pending items will be excluded from this export.
                  </div>
              )}
           </div>

           {/* Export Action Card */}
           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex-1 flex flex-col">
              <h3 className="font-bold text-gray-800 mb-2">Download Summary</h3>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                 <div className="flex justify-between">
                    <span>Selected Event:</span>
                    <span className="font-medium text-gray-800">{selectedEvent}</span>
                 </div>
                 <div className="flex justify-between">
                    <span>File Format:</span>
                    <span className="font-medium text-gray-800">{selectedFormat}</span>
                 </div>
                 <div className="flex justify-between">
                    <span>Est. Records:</span>
                    <span className="font-medium text-gray-800">142</span>
                 </div>
              </div>

              <div className="mt-auto">
                 <button 
                   onClick={handleExport}
                   className="w-full bg-brand-purple hover:bg-brand-hover text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-200 transition-all flex items-center justify-center gap-2"
                 >
                    <Download size={20} />
                    Download Data
                 </button>
                 <p className="text-center text-xs text-gray-400 mt-3">
                    Secure download via TLS encryption
                 </p>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};
