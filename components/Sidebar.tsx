import React from 'react';
import { 
  Calendar, 
  FileText, 
  LayoutDashboard, 
  FileEdit, 
  Users, 
  Inbox, 
  BarChart2, 
  Download, 
  FileCheck 
} from 'lucide-react';
import { SidebarItem, UserRole } from '../types';

interface SidebarProps {
  activeItem: SidebarItem;
  onNavigate: (item: SidebarItem) => void;
  userRole: UserRole;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeItem, onNavigate, userRole }) => {
  
  const renderButton = (item: SidebarItem, label: string, icon: React.ReactNode) => (
    <button
      onClick={() => onNavigate(item)}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 font-bold transition-all text-sm ${
        activeItem === item
          ? 'bg-brand-purple text-white border-brand-purple shadow-md'
          : 'bg-white text-gray-700 border-white hover:border-brand-purple hover:bg-brand-light'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <aside className="w-64 bg-white h-[calc(100vh-64px)] border-r border-gray-200 flex flex-col p-4 gap-2 fixed left-0 bottom-0 hidden md:flex z-10 overflow-y-auto">
      
      {userRole === UserRole.STAFF && (
        <>
          {renderButton(SidebarItem.MY_EVENTS, 'My Events', <Calendar size={18} />)}
          {renderButton(SidebarItem.MY_SUBMISSIONS, 'My Submissions', <FileText size={18} />)}
        </>
      )}

      {userRole === UserRole.MANAGER && (
        <>
          {renderButton(SidebarItem.DASHBOARD, 'Dashboard', <LayoutDashboard size={18} />)}
          {renderButton(SidebarItem.MANAGE_EVENTS, 'Manage Events', <Calendar size={18} />)}
          {renderButton(SidebarItem.FORM_BUILDER, 'Form Builder', <FileEdit size={18} />)}
          {renderButton(SidebarItem.IMPORT_PRE_REGISTRATION, 'Import Pre-Registration', <Users size={18} />)}
          {renderButton(SidebarItem.REVIEW_QUEUE, 'Review Queue', <Inbox size={18} />)}
          {renderButton(SidebarItem.SUBMISSIONS_MONITOR, 'Submissions Monitor', <BarChart2 size={18} />)}
          {renderButton(SidebarItem.EXPORT_DATA, 'Export Data', <Download size={18} />)}
          {renderButton(SidebarItem.POST_EVENT_SUMMARY, 'Post-Event Summary', <FileCheck size={18} />)}
        </>
      )}
      
    </aside>
  );
};