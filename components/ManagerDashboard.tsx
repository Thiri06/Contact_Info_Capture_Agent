
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { SidebarItem, UserRole } from '../types';
import { ManageEvents } from './ManageEvents';
import { FormBuilder } from './FormBuilder';
import { ImportPreRegistration } from './ImportPreRegistration';
import { ReviewQueue } from './ReviewQueue';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  FileText, 
  BarChart2, 
  AlertCircle, 
  Clock,
  ArrowUpRight,
  MoreHorizontal,
  FileInput,
  Layers,
  CheckCircle2
} from 'lucide-react';

export const ManagerDashboard: React.FC = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState<SidebarItem>(SidebarItem.DASHBOARD);

  // Mock Data
  const metrics = [
    { label: 'Active Events', value: '8', icon: <Calendar className="text-blue-600" size={24} />, bg: 'bg-blue-50' },
    { label: 'Total Staff Assigned', value: '24', icon: <Users className="text-purple-600" size={24} />, bg: 'bg-purple-50' },
    { label: 'Forms in Use', value: '5', icon: <FileText className="text-orange-600" size={24} />, bg: 'bg-orange-50' },
    { label: 'Submissions Today', value: '142', icon: <BarChart2 className="text-green-600" size={24} />, bg: 'bg-green-50' },
    { label: 'Records in Review', value: '18', icon: <AlertCircle className="text-red-600" size={24} />, bg: 'bg-red-50' },
    { label: 'Pending Imports', value: '3', icon: <Clock className="text-indigo-600" size={24} />, bg: 'bg-indigo-50' },
  ];

  const events = [
    { id: 1, name: 'Tech Summit 2024', date: 'Oct 15, 2024', bu: 'IT Services', staff: 12, submissions: 45, queue: 5, status: 'Active' },
    { id: 2, name: 'EduCLaaS Open Day', date: 'Oct 20, 2024', bu: 'Education', staff: 8, submissions: 32, queue: 2, status: 'Active' },
    { id: 3, name: 'HR Networking Night', date: 'Oct 22, 2024', bu: 'Corporate', staff: 4, submissions: 0, queue: 0, status: 'Upcoming' },
    { id: 4, name: 'Future Skills Workshop', date: 'Oct 10, 2024', bu: 'Training', staff: 6, submissions: 89, queue: 0, status: 'Completed' },
    { id: 5, name: 'Digital Marketing Bootcamp', date: 'Oct 18, 2024', bu: 'Marketing', staff: 3, submissions: 12, queue: 1, status: 'Active' },
  ];

  const chartData = [
    { label: 'Tech Summit', value: 45, height: '60%' },
    { label: 'Open Day', value: 32, height: '45%' },
    { label: 'HR Night', value: 0, height: '2%' },
    { label: 'Workshop', value: 12, height: '20%' },
    { label: 'Bootcamp', value: 53, height: '75%' },
  ];

  const lineChartPoints = "0,100 20,80 40,90 60,50 80,40 100,60 120,20 140,30";

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      <Sidebar 
        activeItem={activeSidebarItem} 
        onNavigate={setActiveSidebarItem} 
        userRole={UserRole.MANAGER}
      />
      
      <main className="flex-1 md:ml-64 p-6 md:p-10 overflow-y-auto h-full bg-brand-light">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
            
            {activeSidebarItem === SidebarItem.DASHBOARD && (
               <div className="flex justify-between items-end mb-8 shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Dashboard Overview
                    </h1>
                    <p className="text-gray-500 mt-1">Global overview of all ongoing events and data health.</p>
                </div>
                <div className="text-sm text-gray-500 font-medium">
                    Last updated: Just now
                </div>
            </div>
            )}

            {activeSidebarItem === SidebarItem.DASHBOARD && (
                <div className="space-y-6">
                    {/* A. Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                        {metrics.map((metric, index) => (
                            <div key={index} className="bg-white p-4 rounded-2xl shadow-sm border border-white hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`p-2.5 rounded-lg ${metric.bg}`}>
                                        {metric.icon}
                                    </div>
                                    {index === 3 && (
                                        <span className="flex items-center text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                                            <ArrowUpRight size={10} className="mr-0.5" /> 12%
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wide">{metric.label}</h3>
                                <p className="text-2xl font-bold text-gray-800 mt-1">{metric.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* B. Event Overview Table */}
                    <div className="bg-white rounded-3xl shadow-sm border border-white overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <Layers size={20} className="text-brand-purple" />
                                Event Overview
                            </h2>
                            <button className="text-sm font-medium text-brand-purple hover:text-brand-hover">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Event Name</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Business Unit</th>
                                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Staff</th>
                                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Subs. Today</th>
                                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">In Queue</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {events.map((event) => (
                                        <tr key={event.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 font-semibold text-gray-800 text-sm">{event.name}</td>
                                            <td className="px-6 py-4 text-gray-500 text-sm">{event.date}</td>
                                            <td className="px-6 py-4 text-gray-500 text-sm">
                                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                                                    {event.bu}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center text-gray-600 text-sm font-medium">{event.staff}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="font-bold text-brand-purple">{event.submissions}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {event.queue > 0 ? (
                                                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                                                        {event.queue}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400 text-xs">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {event.status === 'Active' && (
                                                    <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full w-fit">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                                        Active
                                                    </span>
                                                )}
                                                {event.status === 'Upcoming' && (
                                                    <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full w-fit">
                                                        <Clock size={10} />
                                                        Upcoming
                                                    </span>
                                                )}
                                                {event.status === 'Completed' && (
                                                    <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full w-fit">
                                                        <CheckCircle2 size={10} />
                                                        Completed
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-gray-400 hover:text-brand-purple transition-colors">
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* C. Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* Bar Chart: Submissions per event */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-white">
                            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <BarChart2 size={20} className="text-brand-purple" />
                                Submissions per Event (Today)
                            </h3>
                            <div className="flex items-end justify-between h-48 gap-4 pt-4">
                                {chartData.map((item, idx) => (
                                    <div key={idx} className="flex flex-col items-center flex-1 gap-2 group">
                                        <div className="w-full relative h-40 flex items-end justify-center rounded-xl bg-gray-50 overflow-hidden">
                                            <div 
                                                className="w-full bg-brand-purple/80 group-hover:bg-brand-purple transition-all duration-500 rounded-t-lg mx-2"
                                                style={{ height: item.height }}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-medium text-gray-500 truncate w-20 text-center">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Line Chart: Submissions over time */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-white">
                            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <ArrowUpRight size={20} className="text-brand-purple" />
                                Submissions Trend (7 Days)
                            </h3>
                            <div className="h-48 relative pt-4 flex items-end">
                                {/* Simple SVG Line Chart */}
                                <svg className="w-full h-full overflow-visible" viewBox="0 0 140 100" preserveAspectRatio="none">
                                    {/* Grid Lines */}
                                    <line x1="0" y1="0" x2="140" y2="0" stroke="#f3f4f6" strokeWidth="1" />
                                    <line x1="0" y1="25" x2="140" y2="25" stroke="#f3f4f6" strokeWidth="1" />
                                    <line x1="0" y1="50" x2="140" y2="50" stroke="#f3f4f6" strokeWidth="1" />
                                    <line x1="0" y1="75" x2="140" y2="75" stroke="#f3f4f6" strokeWidth="1" />
                                    <line x1="0" y1="100" x2="140" y2="100" stroke="#f3f4f6" strokeWidth="1" />
                                    
                                    {/* The Line */}
                                    <polyline 
                                        fill="none" 
                                        stroke="#8A1452" 
                                        strokeWidth="3" 
                                        points={lineChartPoints} 
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="drop-shadow-lg"
                                    />
                                    
                                    {/* Area under the curve (optional) */}
                                    <polygon 
                                        fill="url(#gradient)" 
                                        fillOpacity="0.1" 
                                        points={`0,100 ${lineChartPoints} 140,100`} 
                                    />
                                    
                                    <defs>
                                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#8A1452" />
                                            <stop offset="100%" stopColor="white" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                
                                {/* X-Axis Labels positioned roughly */}
                                <div className="absolute bottom-[-20px] left-0 w-full flex justify-between text-xs text-gray-400 font-medium px-1">
                                    <span>Mon</span>
                                    <span>Tue</span>
                                    <span>Wed</span>
                                    <span>Thu</span>
                                    <span>Fri</span>
                                    <span>Sat</span>
                                    <span>Sun</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {activeSidebarItem === SidebarItem.MANAGE_EVENTS && (
                <ManageEvents />
            )}

            {activeSidebarItem === SidebarItem.FORM_BUILDER && (
                <FormBuilder />
            )}

            {activeSidebarItem === SidebarItem.IMPORT_PRE_REGISTRATION && (
                <ImportPreRegistration />
            )}

            {activeSidebarItem === SidebarItem.REVIEW_QUEUE && (
                <ReviewQueue />
            )}

            {activeSidebarItem !== SidebarItem.DASHBOARD && 
             activeSidebarItem !== SidebarItem.MANAGE_EVENTS && 
             activeSidebarItem !== SidebarItem.FORM_BUILDER && 
             activeSidebarItem !== SidebarItem.IMPORT_PRE_REGISTRATION &&
             activeSidebarItem !== SidebarItem.REVIEW_QUEUE && (
                <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
                     <div className="p-4 bg-gray-50 rounded-full mb-4">
                        <LayoutDashboard className="text-gray-400" size={32} />
                     </div>
                     <h3 className="text-lg font-semibold text-gray-800">Module Under Development</h3>
                     <p className="text-gray-500 mt-1">Select "Dashboard" to see the active view.</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};
