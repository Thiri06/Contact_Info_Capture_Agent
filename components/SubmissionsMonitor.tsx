
import React, { useState, useEffect } from 'react';
import { 
  Filter, 
  Search, 
  Download, 
  RefreshCcw, 
  PenTool, 
  ScanLine, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  MoreHorizontal,
  Calendar,
  User,
  Zap
} from 'lucide-react';

// Mock Data Types
interface SubmissionRecord {
  id: string;
  event: string;
  staffName: string;
  attendeeName: string;
  email: string;
  phone: string;
  mode: 'MANUAL' | 'OCR';
  timestamp: string;
  status: 'SYNCED' | 'REVIEW' | 'DUPLICATE' | 'ERROR';
}

interface ActivityLog {
  id: string;
  message: string;
  time: string;
  type: 'SUBMISSION' | 'SYNC' | 'ALERT';
}

const MOCK_DATA: SubmissionRecord[] = [
  { id: '1', event: 'Tech Summit 2024', staffName: 'Sarah Wilson', attendeeName: 'James Miller', email: 'j.miller@corp.com', phone: '91234567', mode: 'OCR', timestamp: '10:42 AM', status: 'SYNCED' },
  { id: '2', event: 'Tech Summit 2024', staffName: 'Mike Chen', attendeeName: 'Linda Wu', email: 'linda.w@tech.sg', phone: '98765432', mode: 'MANUAL', timestamp: '10:40 AM', status: 'SYNCED' },
  { id: '3', event: 'HR Networking', staffName: 'Jessica Taylor', attendeeName: 'Robert Tan', email: 'bob.tan@hr.com', phone: '88889999', mode: 'OCR', timestamp: '10:38 AM', status: 'REVIEW' },
  { id: '4', event: 'Tech Summit 2024', staffName: 'Sarah Wilson', attendeeName: 'Alice Lim', email: 'alice.l@start.up', phone: '91112222', mode: 'OCR', timestamp: '10:35 AM', status: 'SYNCED' },
  { id: '5', event: 'Open Day', staffName: 'David Kim', attendeeName: 'John Smith', email: 'john@gmail.com', phone: '81234123', mode: 'MANUAL', timestamp: '10:30 AM', status: 'DUPLICATE' },
  { id: '6', event: 'Tech Summit 2024', staffName: 'Mike Chen', attendeeName: 'Peter Parker', email: 'spidey@web.net', phone: '99998888', mode: 'OCR', timestamp: '10:28 AM', status: 'SYNCED' },
  { id: '7', event: 'HR Networking', staffName: 'Jessica Taylor', attendeeName: 'Mary Jane', email: 'mj@daily.com', phone: '97776666', mode: 'MANUAL', timestamp: '10:25 AM', status: 'SYNCED' },
  { id: '8', event: 'Open Day', staffName: 'David Kim', attendeeName: 'Harry Osborn', email: 'harry@oscorp.com', phone: '95554444', mode: 'MANUAL', timestamp: '10:20 AM', status: 'SYNCED' },
];

const MOCK_ACTIVITY: ActivityLog[] = [
  { id: '1', message: 'Sarah Wilson submitted new OCR contact', time: 'Just now', type: 'SUBMISSION' },
  { id: '2', message: 'System auto-synced 5 records to CRM', time: '2 mins ago', type: 'SYNC' },
  { id: '3', message: 'Duplicate detected from David Kim', time: '12 mins ago', type: 'ALERT' },
  { id: '4', message: 'Mike Chen submitted manual entry', time: '15 mins ago', type: 'SUBMISSION' },
  { id: '5', message: 'Jessica Taylor uploaded batch', time: '22 mins ago', type: 'SUBMISSION' },
];

export const SubmissionsMonitor: React.FC = () => {
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(MOCK_DATA);
  const [loading, setLoading] = useState(false);

  // Filters
  const [filterEvent, setFilterEvent] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SYNCED': return <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100"><CheckCircle2 size={10} /> Synced</span>;
      case 'REVIEW': return <span className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100"><Clock size={10} /> Review</span>;
      case 'DUPLICATE': return <span className="flex items-center gap-1 text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100"><AlertCircle size={10} /> Duplicate</span>;
      case 'ERROR': return <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100"><AlertCircle size={10} /> Error</span>;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Submissions Monitor</h1>
          <p className="text-gray-500 mt-1">Real-time view of data collection across all active events.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100 animate-pulse">
             <div className="w-2 h-2 rounded-full bg-green-500"></div>
             Live Stream Active
          </div>
          <button 
            onClick={handleRefresh}
            className={`p-2 text-gray-500 hover:text-brand-purple hover:bg-gray-100 rounded-lg transition-all ${loading ? 'animate-spin' : ''}`}
            title="Refresh Data"
          >
            <RefreshCcw size={20} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 shadow-sm transition-colors text-sm">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        
        {/* Main Content: Filters & Table */}
        <div className="flex-1 flex flex-col min-h-0 bg-white rounded-2xl shadow-sm border border-gray-200">
            
            {/* A. Filters Toolbar */}
            <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 items-center bg-gray-50/50 rounded-t-2xl">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search records..." 
                        className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-purple w-64" 
                    />
                </div>
                
                <div className="h-8 w-px bg-gray-300 mx-2 hidden md:block"></div>

                <div className="flex items-center gap-2">
                    <Filter size={16} className="text-gray-500" />
                    <select 
                        className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-brand-purple focus:border-brand-purple block p-2 outline-none"
                        value={filterEvent}
                        onChange={(e) => setFilterEvent(e.target.value)}
                    >
                        <option value="All">All Events</option>
                        <option value="Tech Summit 2024">Tech Summit 2024</option>
                        <option value="HR Networking">HR Networking</option>
                        <option value="Open Day">Open Day</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-500" />
                    <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-brand-purple focus:border-brand-purple block p-2 outline-none">
                        <option>All Staff</option>
                        <option>Sarah Wilson</option>
                        <option>Mike Chen</option>
                        <option>Jessica Taylor</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <ScanLine size={16} className="text-gray-500" />
                    <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-brand-purple focus:border-brand-purple block p-2 outline-none">
                        <option>All Modes</option>
                        <option>OCR Capture</option>
                        <option>Manual Entry</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-gray-500" />
                    <select 
                        className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-brand-purple focus:border-brand-purple block p-2 outline-none"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="SYNCED">Synced</option>
                        <option value="REVIEW">In Review</option>
                        <option value="DUPLICATE">Duplicate</option>
                    </select>
                </div>
            </div>

            {/* B. Large Data Table */}
            <div className="flex-1 overflow-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Event Name</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Staff</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Attendee</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact Details</th>
                            <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Mode</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {submissions
                            .filter(s => filterEvent === 'All' || s.event === filterEvent)
                            .filter(s => filterStatus === 'All' || s.status === filterStatus)
                            .map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{row.event}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-brand-purple/10 text-brand-purple text-xs flex items-center justify-center font-bold">
                                            {row.staffName.charAt(0)}
                                        </div>
                                        <div className="text-sm text-gray-600">{row.staffName}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-bold text-gray-800">{row.attendeeName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-600">{row.email}</span>
                                        <span className="text-xs text-gray-400">{row.phone}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {row.mode === 'OCR' ? (
                                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100" title="OCR Capture">
                                            <ScanLine size={10} /> OCR
                                        </div>
                                    ) : (
                                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs font-bold border border-gray-200" title="Manual Entry">
                                            <PenTool size={10} /> Key
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                    {row.timestamp}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getStatusBadge(row.status)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <button className="text-gray-400 hover:text-brand-purple transition-colors opacity-0 group-hover:opacity-100">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 flex justify-between rounded-b-2xl">
                <span>Showing {submissions.length} records</span>
                <span>Page 1 of 1</span>
            </div>
        </div>

        {/* C. Activity Feed (Right Panel) */}
        <div className="w-80 shrink-0 flex flex-col min-h-0">
             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                    <Zap size={16} className="text-brand-purple fill-current" />
                    <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Live Activity</h3>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {MOCK_ACTIVITY.map((log) => (
                        <div key={log.id} className="relative pl-4 border-l-2 border-gray-100 hover:border-brand-purple transition-colors">
                            <div className={`absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                                log.type === 'ALERT' ? 'bg-red-500' : 
                                log.type === 'SYNC' ? 'bg-green-500' : 'bg-brand-purple'
                            }`}></div>
                            <p className="text-sm text-gray-700 leading-snug">{log.message}</p>
                            <span className="text-xs text-gray-400 mt-1 block">{log.time}</span>
                        </div>
                    ))}
                    
                    <div className="relative pl-4 border-l-2 border-transparent">
                         <div className="text-xs text-center text-gray-400 italic">End of recent activity</div>
                    </div>
                </div>
             </div>
        </div>

      </div>
    </div>
  );
};
