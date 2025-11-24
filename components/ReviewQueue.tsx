
import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  ScanLine, 
  Copy, 
  Users, 
  Eye, 
  ArrowRight, 
  GitMerge, 
  Search,
  Filter,
  MoreHorizontal,
  FileText,
  X
} from 'lucide-react';

type IssueType = 'OCR_FLAGGED' | 'DUPLICATE' | 'UNCERTAIN_MATCH';

interface ReviewItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  issueType: IssueType;
  confidenceScore?: number;
  suggestedMatch?: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    company: string;
    source: string;
  };
  submittedBy: string;
  timestamp: string;
  // Field-level data for OCR checking
  fields?: {
    label: string;
    value: string;
    confidence: number;
  }[];
}

const MOCK_QUEUE: ReviewItem[] = [
  {
    id: '1',
    fullName: 'Jhn Doe',
    email: 'john.doe@gmail.co',
    phone: '91234567',
    issueType: 'OCR_FLAGGED',
    confidenceScore: 42,
    submittedBy: 'Mike Chen',
    timestamp: '10 mins ago',
    fields: [
      { label: 'Full Name', value: 'Jhn Doe', confidence: 45 },
      { label: 'Email', value: 'john.doe@gmail.co', confidence: 30 },
      { label: 'Company', value: 'Acme Inc', confidence: 90 }
    ]
  },
  {
    id: '2',
    fullName: 'Sarah Tan',
    email: 'sarah.tan@tech.com',
    phone: '88776655',
    issueType: 'DUPLICATE',
    submittedBy: 'Jessica Taylor',
    timestamp: '1 hour ago',
    suggestedMatch: {
      id: 'existing-123',
      fullName: 'Sarah Tan',
      email: 'sarah.t@tech.com',
      phone: '88776655',
      company: 'Tech Solutions',
      source: 'Pre-Registration'
    }
  },
  {
    id: '3',
    fullName: 'David Wong',
    email: 'd.wong@finance.sg',
    phone: '99887766',
    issueType: 'UNCERTAIN_MATCH',
    submittedBy: 'System Import',
    timestamp: '2 hours ago',
    suggestedMatch: {
      id: 'existing-456',
      fullName: 'Dave Wong',
      email: 'david.wong@finance.sg',
      phone: '99887766',
      company: 'Finance SG',
      source: 'CRM Database'
    }
  },
];

export const ReviewQueue: React.FC = () => {
  const [queue, setQueue] = useState<ReviewItem[]>(MOCK_QUEUE);
  const [selectedItem, setSelectedItem] = useState<ReviewItem | null>(null);

  const handleAction = (id: string, action: 'approve' | 'reject' | 'merge') => {
    // In a real app, this would make an API call
    setQueue(queue.filter(item => item.id !== id));
    setSelectedItem(null);
  };

  const getIssueBadge = (type: IssueType) => {
    switch (type) {
      case 'OCR_FLAGGED':
        return <span className="flex items-center gap-1 bg-red-50 text-red-700 px-2.5 py-1 rounded-full text-xs font-bold border border-red-100"><ScanLine size={12} /> OCR Flagged</span>;
      case 'DUPLICATE':
        return <span className="flex items-center gap-1 bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full text-xs font-bold border border-orange-100"><Copy size={12} /> Duplicate</span>;
      case 'UNCERTAIN_MATCH':
        return <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-bold border border-yellow-100"><AlertTriangle size={12} /> Uncertain Match</span>;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Review Queue</h1>
          <p className="text-gray-500 mt-1">Resolve flagged submissions, duplicates, and data conflicts.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           Queue live updating
        </div>
      </div>

      {/* A. Queue Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 shrink-0">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-red-100 relative overflow-hidden">
            <div className="absolute right-0 top-0 p-4 opacity-10"><ScanLine size={60} className="text-red-500" /></div>
            <div className="text-2xl font-bold text-gray-800">{queue.filter(i => i.issueType === 'OCR_FLAGGED').length}</div>
            <div className="text-xs font-bold text-red-600 uppercase tracking-wide mt-1">OCR Flagged</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100 relative overflow-hidden">
            <div className="absolute right-0 top-0 p-4 opacity-10"><Copy size={60} className="text-orange-500" /></div>
            <div className="text-2xl font-bold text-gray-800">{queue.filter(i => i.issueType === 'DUPLICATE').length}</div>
            <div className="text-xs font-bold text-orange-600 uppercase tracking-wide mt-1">Duplicates</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-yellow-100 relative overflow-hidden">
            <div className="absolute right-0 top-0 p-4 opacity-10"><AlertTriangle size={60} className="text-yellow-500" /></div>
            <div className="text-2xl font-bold text-gray-800">{queue.filter(i => i.issueType === 'UNCERTAIN_MATCH').length}</div>
            <div className="text-xs font-bold text-yellow-600 uppercase tracking-wide mt-1">Uncertain Matches</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 relative overflow-hidden">
            <div className="absolute right-0 top-0 p-4 opacity-10"><Users size={60} className="text-blue-500" /></div>
            <div className="text-2xl font-bold text-gray-800">{queue.length}</div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mt-1">Pending Decisions</div>
        </div>
      </div>

      {/* B. Review Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col min-h-0">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
            <div className="flex gap-4">
                 <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input type="text" placeholder="Search queue..." className="pl-9 pr-4 py-2 bg-gray-50 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-purple/20" />
                 </div>
                 <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 text-sm font-medium">
                    <Filter size={16} /> Filter
                 </button>
            </div>
        </div>
        
        <div className="overflow-auto flex-1">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact Details</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Issue Type</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Confidence / Match</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Submitted By</th>
                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {queue.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                <div className="flex flex-col items-center justify-center">
                                    <CheckCircle size={32} className="text-green-500 mb-3" />
                                    <p className="font-medium">All caught up!</p>
                                    <p className="text-sm">No items in the review queue.</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        queue.map((item) => (
                            <tr key={item.id} className="hover:bg-purple-50/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                                            {item.fullName.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-800 text-sm">{item.fullName}</div>
                                            <div className="text-xs text-gray-500">{item.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {getIssueBadge(item.issueType)}
                                </td>
                                <td className="px-6 py-4">
                                    {item.issueType === 'OCR_FLAGGED' ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-red-500" style={{ width: `${item.confidenceScore}%` }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-red-600">{item.confidenceScore}%</span>
                                        </div>
                                    ) : (
                                        <div className="text-xs text-gray-600 flex items-center gap-1">
                                            <span className="font-medium">Match:</span> {item.suggestedMatch?.fullName}
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    <div>{item.submittedBy}</div>
                                    <div className="text-xs text-gray-400">{item.timestamp}</div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button 
                                            onClick={() => handleAction(item.id, 'approve')}
                                            className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 border border-transparent hover:border-green-200 transition-all" 
                                            title="Quick Approve"
                                        >
                                            <CheckCircle size={18} />
                                        </button>
                                        <button 
                                            onClick={() => setSelectedItem(item)}
                                            className="px-3 py-1.5 bg-brand-purple text-white text-xs font-bold rounded-lg hover:bg-brand-hover shadow-sm transition-colors"
                                        >
                                            Review
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
      </div>

      {/* C. Detailed Compare View (Popup) */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in zoom-in-95 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            Resolution Required
                            {getIssueBadge(selectedItem.issueType)}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Compare and resolve discrepancies.</p>
                    </div>
                    <button onClick={() => setSelectedItem(null)} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                    <div className="flex flex-col md:flex-row gap-6">
                        
                        {/* Left: New Submission */}
                        <div className="flex-1 bg-white p-5 rounded-xl border-2 border-brand-purple/20 shadow-sm relative">
                            <div className="absolute -top-3 left-4 bg-brand-purple text-white text-xs font-bold px-3 py-1 rounded-full">
                                New Submission
                            </div>
                            <div className="mt-2 space-y-4">
                                {selectedItem.fields ? (
                                    // OCR View
                                    selectedItem.fields.map((field, idx) => (
                                        <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            <div className="flex justify-between items-center mb-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase">{field.label}</label>
                                                <span className={`text-[10px] font-bold px-1.5 rounded ${field.confidence < 50 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                                    {field.confidence}% Conf.
                                                </span>
                                            </div>
                                            <input 
                                                defaultValue={field.value}
                                                className={`w-full bg-white border rounded px-2 py-1 text-sm text-gray-800 ${field.confidence < 50 ? 'border-red-300 ring-2 ring-red-50' : 'border-gray-300'}`}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    // Standard View
                                    <>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                                            <div className="text-gray-900 font-medium">{selectedItem.fullName}</div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                                            <div className="text-gray-900 font-medium">{selectedItem.email}</div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase">Phone</label>
                                            <div className="text-gray-900 font-medium">{selectedItem.phone}</div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Middle: Action Indicator */}
                        <div className="hidden md:flex flex-col items-center justify-center text-gray-400">
                             <ArrowRight size={24} />
                        </div>

                        {/* Right: Existing / Matched Data */}
                        <div className="flex-1 bg-gray-100 p-5 rounded-xl border-2 border-dashed border-gray-300 relative opacity-80">
                            {selectedItem.suggestedMatch ? (
                                <>
                                    <div className="absolute -top-3 left-4 bg-gray-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        Existing Record ({selectedItem.suggestedMatch.source})
                                    </div>
                                    <div className="mt-2 space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                                            <div className="text-gray-900 font-medium">{selectedItem.suggestedMatch.fullName}</div>
                                        </div>
                                        <div className={`p-2 rounded ${selectedItem.email !== selectedItem.suggestedMatch.email ? 'bg-yellow-100 border border-yellow-200' : ''}`}>
                                            <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                                            <div className="text-gray-900 font-medium">{selectedItem.suggestedMatch.email}</div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase">Phone</label>
                                            <div className="text-gray-900 font-medium">{selectedItem.suggestedMatch.phone}</div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase">Company</label>
                                            <div className="text-gray-900 font-medium">{selectedItem.suggestedMatch.company}</div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                                    <FileText size={32} className="mb-2 opacity-50" />
                                    <p className="text-sm font-medium">No direct match found.</p>
                                    <p className="text-xs">Reviewing standalone data quality.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t border-gray-100 bg-white flex justify-between items-center">
                    <button 
                        onClick={() => handleAction(selectedItem.id, 'reject')}
                        className="px-4 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 text-sm"
                    >
                        <XCircle size={18} />
                        Reject Submission
                    </button>
                    
                    <div className="flex gap-3">
                        {selectedItem.issueType === 'DUPLICATE' && (
                             <button 
                                onClick={() => handleAction(selectedItem.id, 'merge')}
                                className="px-4 py-2 bg-orange-100 text-orange-700 font-medium rounded-lg hover:bg-orange-200 transition-colors flex items-center gap-2 text-sm"
                            >
                                <GitMerge size={18} />
                                Merge Records
                            </button>
                        )}
                        <button 
                            onClick={() => handleAction(selectedItem.id, 'approve')}
                            className="px-6 py-2 bg-brand-purple text-white font-medium rounded-lg hover:bg-brand-hover transition-colors shadow-sm flex items-center gap-2 text-sm"
                        >
                            <CheckCircle size={18} />
                            Approve Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
