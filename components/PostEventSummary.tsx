
import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  FileText, 
  ScanLine, 
  PenTool, 
  AlertCircle, 
  CheckCircle2, 
  BarChart2, 
  Send, 
  Mail, 
  MessageSquare,
  ArrowRight,
  PieChart
} from 'lucide-react';

// Mock Data structure
interface EventSummaryData {
  id: string;
  name: string;
  date: string;
  totalAttendees: number;
  staffCount: number;
  avgSubmissionsPerStaff: number;
  manualCount: number;
  ocrCount: number;
  validationErrors: number;
  reviewQueueItems: number;
  cleanEntries: number;
  duplicates: number;
  trendData: number[]; // Simple array for sparkline
}

const MOCK_EVENTS: EventSummaryData[] = [
  {
    id: '1',
    name: 'Tech Summit 2024',
    date: 'Oct 15, 2024',
    totalAttendees: 142,
    staffCount: 12,
    avgSubmissionsPerStaff: 11.8,
    manualCount: 45,
    ocrCount: 97,
    validationErrors: 8,
    reviewQueueItems: 12,
    cleanEntries: 138,
    duplicates: 4,
    trendData: [10, 25, 45, 80, 110, 135, 142]
  },
  {
    id: '2',
    name: 'HR Networking Night',
    date: 'Oct 22, 2024',
    totalAttendees: 78,
    staffCount: 5,
    avgSubmissionsPerStaff: 15.6,
    manualCount: 60,
    ocrCount: 18,
    validationErrors: 2,
    reviewQueueItems: 5,
    cleanEntries: 75,
    duplicates: 3,
    trendData: [5, 15, 30, 45, 60, 70, 78]
  },
  {
    id: '3',
    name: 'Future Skills Workshop',
    date: 'Oct 10, 2024',
    totalAttendees: 210,
    staffCount: 15,
    avgSubmissionsPerStaff: 14.0,
    manualCount: 20,
    ocrCount: 190,
    validationErrors: 15,
    reviewQueueItems: 25,
    cleanEntries: 195,
    duplicates: 15,
    trendData: [20, 50, 90, 120, 160, 190, 210]
  }
];

export const PostEventSummary: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>(MOCK_EVENTS[0].id);
  const [reportSent, setReportSent] = useState<'NONE' | 'EMAIL' | 'TEAMS'>('NONE');

  const currentEvent = MOCK_EVENTS.find(e => e.id === selectedEventId) || MOCK_EVENTS[0];

  // Helper to calculate percentages
  const getPercent = (val: number, total: number) => Math.round((val / total) * 100) || 0;

  const handleSendReport = (type: 'EMAIL' | 'TEAMS') => {
    setReportSent(type);
    setTimeout(() => setReportSent('NONE'), 3000);
  };

  // SVG Chart Helper
  const renderTrendLine = (data: number[]) => {
    const max = Math.max(...data);
    const points = data.map((val, idx) => {
        const x = (idx / (data.length - 1)) * 100;
        const y = 100 - (val / max) * 100;
        return `${x},${y}`;
    }).join(' ');
    
    return (
        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline 
                fill="none" 
                stroke="#8A1452" 
                strokeWidth="3" 
                points={points} 
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
             <polygon 
                fill="url(#gradient-summary)" 
                fillOpacity="0.1" 
                points={`0,100 ${points} 100,100`} 
            />
            <defs>
                <linearGradient id="gradient-summary" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#8A1452" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
    );
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header & Controls */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Post-Event Summary</h1>
          <p className="text-gray-500 mt-1">Consolidated analysis of event performance and data quality.</p>
        </div>
        
        <div className="flex items-center gap-4">
             <div className="relative">
                 <Calendar className="absolute left-3 top-2.5 text-gray-500" size={18} />
                 <select 
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    className="pl-10 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-700 font-medium focus:ring-2 focus:ring-brand-purple focus:border-brand-purple outline-none appearance-none min-w-[240px]"
                 >
                    {MOCK_EVENTS.map(evt => (
                        <option key={evt.id} value={evt.id}>{evt.name}</option>
                    ))}
                 </select>
             </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        
        {/* B. Summary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
                <div className="flex justify-between items-start">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <Users size={20} />
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Total</span>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-gray-800">{currentEvent.totalAttendees}</h3>
                    <p className="text-sm text-gray-500">Attendees Collected</p>
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
                 <div className="flex justify-between items-start">
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                        <BarChart2 size={20} />
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Productivity</span>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-gray-800">{currentEvent.avgSubmissionsPerStaff}</h3>
                    <p className="text-sm text-gray-500">Avg. Submissions / Staff</p>
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
                 <div className="flex justify-between items-start">
                    <div className="p-2 bg-red-50 rounded-lg text-red-600">
                        <AlertCircle size={20} />
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Data Quality</span>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-gray-800">{currentEvent.validationErrors}</h3>
                    <p className="text-sm text-gray-500">Validation Errors</p>
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
                 <div className="flex justify-between items-start">
                    <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                        <ScanLine size={20} />
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Review Queue</span>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-gray-800">{currentEvent.reviewQueueItems}</h3>
                    <p className="text-sm text-gray-500">Items Flagged</p>
                </div>
            </div>
        </div>

        {/* C. Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: Submission Trend */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <BarChart2 size={20} className="text-brand-purple" />
                        Submission Velocity
                    </h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Event Duration</span>
                </div>
                <div className="h-64 w-full bg-gray-50/50 rounded-xl p-4 relative">
                     {renderTrendLine(currentEvent.trendData)}
                     <div className="absolute bottom-2 left-4 right-4 flex justify-between text-xs text-gray-400 font-medium">
                        <span>Day 1</span>
                        <span>Mid Event</span>
                        <span>Closing</span>
                     </div>
                </div>
            </div>

            {/* Chart 2 & 3: Distributions (Stacked) */}
            <div className="flex flex-col gap-6">
                
                {/* Source Distribution */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex-1">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
                        <PieChart size={20} className="text-brand-purple" />
                        Capture Mode Distribution
                    </h3>
                    
                    <div className="flex items-center gap-4 mb-2">
                        <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="flex items-center gap-2 font-medium text-gray-700"><ScanLine size={14}/> OCR Capture</span>
                                <span className="font-bold">{getPercent(currentEvent.ocrCount, currentEvent.totalAttendees)}%</span>
                            </div>
                            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500" style={{ width: `${getPercent(currentEvent.ocrCount, currentEvent.totalAttendees)}%` }}></div>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">{currentEvent.ocrCount} records</div>
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="flex items-center gap-2 font-medium text-gray-700"><PenTool size={14}/> Manual Entry</span>
                                <span className="font-bold">{getPercent(currentEvent.manualCount, currentEvent.totalAttendees)}%</span>
                            </div>
                            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500" style={{ width: `${getPercent(currentEvent.manualCount, currentEvent.totalAttendees)}%` }}></div>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">{currentEvent.manualCount} records</div>
                        </div>
                    </div>
                </div>

                {/* Duplicates vs Clean */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex-1">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
                        <CheckCircle2 size={20} className="text-brand-purple" />
                        Data Integrity
                    </h3>
                    
                    <div className="flex h-12 w-full rounded-xl overflow-hidden font-bold text-white text-sm">
                        <div 
                            className="bg-green-500 flex items-center justify-center relative group" 
                            style={{ width: `${getPercent(currentEvent.cleanEntries, currentEvent.totalAttendees)}%` }}
                        >
                            <span className="z-10">{getPercent(currentEvent.cleanEntries, currentEvent.totalAttendees)}% Clean</span>
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div 
                            className="bg-orange-400 flex items-center justify-center relative group" 
                            style={{ width: `${getPercent(currentEvent.duplicates, currentEvent.totalAttendees)}%` }}
                        >
                             <span className="z-10">{getPercent(currentEvent.duplicates, currentEvent.totalAttendees)}% DUP</span>
                             <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>{currentEvent.cleanEntries} Unique Records</span>
                        <span>{currentEvent.duplicates} Duplicates Resolved</span>
                    </div>
                </div>

            </div>
        </div>

        {/* D. Send Report Actions */}
        <div className="bg-gray-900 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
                <h2 className="text-xl font-bold text-white mb-1">Share Performance Report</h2>
                <p className="text-gray-400 text-sm">Send this summary to key stakeholders or archive it for future reference.</p>
            </div>

            <div className="flex items-center gap-3">
                 {reportSent === 'NONE' ? (
                     <>
                        <button 
                            onClick={() => handleSendReport('TEAMS')}
                            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors flex items-center gap-2 border border-white/10"
                        >
                            <MessageSquare size={18} />
                            Send to Teams
                        </button>
                        <button 
                            onClick={() => handleSendReport('EMAIL')}
                            className="px-6 py-3 bg-brand-purple hover:bg-brand-hover text-white font-bold rounded-xl transition-colors shadow-lg shadow-purple-900/50 flex items-center gap-2"
                        >
                            <Mail size={18} />
                            Email Report
                        </button>
                     </>
                 ) : (
                     <div className="px-8 py-3 bg-green-500/20 border border-green-500/50 text-green-300 rounded-xl flex items-center gap-2 font-medium animate-in fade-in slide-in-from-right">
                         <CheckCircle2 size={20} />
                         Report sent via {reportSent === 'EMAIL' ? 'Email' : 'Microsoft Teams'}!
                     </div>
                 )}
            </div>
        </div>

        {/* Spacer */}
        <div className="h-4"></div>
      </div>
    </div>
  );
};
