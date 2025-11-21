import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { SidebarItem, UserRole } from '../types';
import { LayoutDashboard, ArrowUpRight, Users, Calendar } from 'lucide-react';

export const ManagerDashboard: React.FC = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState<SidebarItem>(SidebarItem.DASHBOARD);

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      <Sidebar 
        activeItem={activeSidebarItem} 
        onNavigate={setActiveSidebarItem} 
        userRole={UserRole.MANAGER}
      />
      
      <main className="flex-1 md:ml-64 p-6 md:p-12 overflow-y-auto h-full bg-brand-light">
        <div className="max-w-6xl mx-auto">
            
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                {activeSidebarItem === SidebarItem.DASHBOARD && "Manager Dashboard"}
                {activeSidebarItem === SidebarItem.MANAGE_EVENTS && "Manage Events"}
                {activeSidebarItem === SidebarItem.FORM_BUILDER && "Form Builder"}
                {activeSidebarItem === SidebarItem.IMPORT_PRE_REGISTRATION && "Import Pre-Registration"}
                {activeSidebarItem === SidebarItem.REVIEW_QUEUE && "Review Queue"}
                {activeSidebarItem === SidebarItem.SUBMISSIONS_MONITOR && "Submissions Monitor"}
                {activeSidebarItem === SidebarItem.EXPORT_DATA && "Export Data"}
                {activeSidebarItem === SidebarItem.POST_EVENT_SUMMARY && "Post-Event Summary"}
            </h1>

            {activeSidebarItem === SidebarItem.DASHBOARD ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Stats Cards */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-white">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <Users className="text-brand-purple" size={24} />
                            </div>
                            <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                <ArrowUpRight size={12} className="mr-1" /> +12%
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Total Attendees</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-1">2,543</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-white">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <Calendar className="text-blue-600" size={24} />
                            </div>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Active Events</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-1">8</p>
                    </div>
                    
                    {/* Placeholder content for the dashboard view */}
                    <div className="col-span-full mt-8 bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center">
                        <LayoutDashboard className="mx-auto text-gray-300 mb-4" size={64} />
                        <h3 className="text-xl font-bold text-gray-700">Dashboard Overview</h3>
                        <p className="text-gray-500 mt-2">Select an item from the sidebar to manage content.</p>
                    </div>
                </div>
            ) : (
                <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
                     <div className="p-4 bg-gray-50 rounded-full mb-4">
                        <LayoutDashboard className="text-gray-400" size={32} />
                     </div>
                     <h3 className="text-lg font-semibold text-gray-800">Module Under Development</h3>
                     <p className="text-gray-500 mt-1">This section is coming soon.</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};