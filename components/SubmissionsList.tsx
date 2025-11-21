import React from 'react';
import { AttendeeForm } from '../types';
import { FileText, PenTool, ScanLine } from 'lucide-react';

interface SubmissionsListProps {
  submissions: AttendeeForm[];
}

export const SubmissionsList: React.FC<SubmissionsListProps> = ({ submissions }) => {
  if (submissions.length === 0) {
    return (
      <div className="bg-white p-12 rounded-3xl shadow-lg shadow-brand-purple/5 border border-white flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-6">
          <FileText className="text-brand-purple" size={40} />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">No Submissions Yet</h3>
        <p className="text-gray-500 max-w-md">Complete the manual entry form or use the AI capture tool to add attendees to your list.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg shadow-brand-purple/5 overflow-hidden border border-white">
      <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">My Submissions</h2>
        <span className="bg-purple-100 text-brand-purple px-3 py-1 rounded-full text-sm font-bold">
          {submissions.length} Record{submissions.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name / Contact</th>
              <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Capture Mode</th>
              <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {submissions.map((sub, index) => (
              <tr key={sub.id || index} className="hover:bg-purple-50/30 transition-colors group">
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-base">{sub.fullName}</span>
                    <span className="text-sm text-gray-500">{sub.email}</span>
                    <span className="text-xs text-gray-400">{sub.phoneNumber}</span>
                  </div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                   <div className="flex flex-col">
                    <span className="font-medium text-gray-700">{sub.jobTitle}</span>
                    <span className="text-sm text-gray-500">{sub.company}</span>
                  </div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-purple"></span>
                    {sub.location}
                  </div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {sub.source === 'OCR' ? (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                        <ScanLine size={12} />
                        OCR Capture
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-bold border border-gray-200">
                        <PenTool size={12} />
                        Manual Entry
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                     Verified
                   </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};