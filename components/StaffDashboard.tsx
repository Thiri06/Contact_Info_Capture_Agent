import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ManualEntryForm } from './ManualEntryForm';
import { AICapture } from './AICapture';
import { SubmissionsList } from './SubmissionsList';
import { Tab, SidebarItem, AttendeeForm, UserRole } from '../types';
import { PenTool, ScanLine } from 'lucide-react';

interface StaffDashboardProps {
    // No specific props needed as state is local for now, 
    // but could accept user object if needed later
}

export const StaffDashboard: React.FC<StaffDashboardProps> = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.MANUAL_ENTRY);
  const [activeSidebarItem, setActiveSidebarItem] = useState<SidebarItem>(SidebarItem.MY_EVENTS);
  const [submissions, setSubmissions] = useState<AttendeeForm[]>([]);

  const handleSaveSubmission = (data: AttendeeForm) => {
    setSubmissions(prev => [data, ...prev]);
    setActiveSidebarItem(SidebarItem.MY_SUBMISSIONS);
  };

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      <Sidebar 
        activeItem={activeSidebarItem} 
        onNavigate={setActiveSidebarItem} 
        userRole={UserRole.STAFF}
      />
      
      <main className="flex-1 md:ml-64 p-6 md:p-12 overflow-y-auto h-full bg-brand-light">
        <div className="max-w-5xl mx-auto">
          
          {activeSidebarItem === SidebarItem.MY_EVENTS ? (
            <>
              {/* Screen Title & Tabs */}
              <div className="text-center mb-8">
                <div className="inline-flex bg-white p-1 rounded-xl shadow-sm border border-gray-200 mb-6">
                  <button
                    onClick={() => setActiveTab(Tab.MANUAL_ENTRY)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      activeTab === Tab.MANUAL_ENTRY
                        ? 'bg-brand-purple text-white shadow-sm'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <PenTool size={16} />
                    Manual Entry
                  </button>
                  <button
                    onClick={() => setActiveTab(Tab.OCR_CAPTURE)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      activeTab === Tab.OCR_CAPTURE
                        ? 'bg-brand-purple text-white shadow-sm'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <ScanLine size={16} />
                    AI Capture
                  </button>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                  {activeTab === Tab.MANUAL_ENTRY ? 'Manual Attendee Entry' : 'AI Form Capture'}
                </h1>
              </div>

              {/* Content Area */}
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === Tab.MANUAL_ENTRY ? (
                  <div className="bg-white p-8 rounded-3xl shadow-lg shadow-brand-purple/5 border border-white">
                    <ManualEntryForm 
                      onSave={handleSaveSubmission} 
                      submissions={submissions}
                    />
                  </div>
                ) : (
                  <AICapture 
                    onSave={handleSaveSubmission} 
                    submissions={submissions}
                  />
                )}
              </div>
            </>
          ) : (
            // Submissions View
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SubmissionsList submissions={submissions} />
            </div>
          )}
          
        </div>
      </main>
    </div>
  );
};