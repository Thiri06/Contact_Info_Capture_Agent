import React from 'react';
import { User, LogOut } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-2">
        {/* Logo Placeholder using Text as requested */}
        <div className="flex flex-col leading-tight">
          <span className="text-2xl font-bold text-brand-purple tracking-tighter">eCLaaS</span>
          <span className="text-xs font-medium text-brand-purple uppercase tracking-wider">Contact Management</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-brand-purple rounded-full flex items-center justify-center text-white">
            <User size={20} />
          </div>
        </div>
        <button className="flex items-center gap-2 text-gray-600 hover:text-brand-purple transition-colors font-medium">
          <span>Log Out</span>
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};