
import React, { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  MapPin, 
  Users, 
  FileText, 
  MoreHorizontal, 
  X, 
  Search, 
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Download,
  Edit2,
  Trash2,
  UserPlus,
  Save
} from 'lucide-react';

// Mock Data
const MOCK_STAFF = [
  { id: '1', name: 'Sarah Wilson', role: 'Lead' },
  { id: '2', name: 'Mike Chen', role: 'Staff' },
  { id: '3', name: 'Jessica Taylor', role: 'Staff' },
  { id: '4', name: 'David Kim', role: 'Staff' },
  { id: '5', name: 'Emily Davis', role: 'Staff' },
];

const MOCK_TEMPLATES = [
  'Standard Lead Gen',
  'Workshop Registration',
  'VIP Networking',
  'Basic Contact Collect'
];

interface Event {
  id: string;
  name: string;
  bu: string;
  location: string;
  date: string;
  template: string;
  staffIds: string[];
  status: 'Draft' | 'Active' | 'Closed';
  submissions: number;
  reviewQueue: number;
  preRegImported: boolean;
}

const INITIAL_EVENTS: Event[] = [
  { 
    id: '1', 
    name: 'Tech Summit 2024', 
    bu: 'IT Services', 
    location: 'Convention Center Hall A', 
    date: '2024-10-15', 
    template: 'Standard Lead Gen', 
    staffIds: ['1', '2', '3'], 
    status: 'Active', 
    submissions: 142, 
    reviewQueue: 12, 
    preRegImported: true 
  },
  { 
    id: '2', 
    name: 'HR Networking Night', 
    bu: 'Corporate', 
    location: 'Grand Hotel Ballroom', 
    date: '2024-10-22', 
    template: 'VIP Networking', 
    staffIds: ['1'], 
    status: 'Draft', 
    submissions: 0, 
    reviewQueue: 0, 
    preRegImported: false 
  },
  { 
    id: '3', 
    name: 'Future Skills Workshop', 
    bu: 'Training', 
    location: 'Training Center Room 4', 
    date: '2024-10-10', 
    template: 'Workshop Registration', 
    staffIds: ['4', '5'], 
    status: 'Closed', 
    submissions: 89, 
    reviewQueue: 0, 
    preRegImported: true 
  }
];

export const ManageEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Create Form State
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    name: '',
    bu: 'IT Services',
    location: '',
    date: '',
    template: 'Standard Lead Gen',
    staffIds: [],
    status: 'Draft'
  });

  const handleCreateEvent = () => {
    const event: Event = {
      id: crypto.randomUUID(),
      name: newEvent.name || 'New Event',
      bu: newEvent.bu || 'IT Services',
      location: newEvent.location || '',
      date: newEvent.date || new Date().toISOString().split('T')[0],
      template: newEvent.template || 'Standard Lead Gen',
      staffIds: newEvent.staffIds || [],
      status: 'Draft',
      submissions: 0,
      reviewQueue: 0,
      preRegImported: false
    };
    
    setEvents([event, ...events]);
    setIsCreateModalOpen(false);
    setNewEvent({
        name: '',
        bu: 'IT Services',
        location: '',
        date: '',
        template: 'Standard Lead Gen',
        staffIds: [],
        status: 'Draft'
    });
  };

  const toggleStaffSelection = (staffId: string) => {
    const currentStaff = newEvent.staffIds || [];
    if (currentStaff.includes(staffId)) {
      setNewEvent({ ...newEvent, staffIds: currentStaff.filter(id => id !== staffId) });
    } else {
      setNewEvent({ ...newEvent, staffIds: [...currentStaff, staffId] });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700 border-green-200';
      case 'Draft': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Closed': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="relative h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Events</h1>
          <p className="text-gray-500 mt-1">Create, modify, and manage your event portfolio.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-brand-purple hover:bg-brand-hover text-white font-semibold px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          Create Event
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search events..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 font-medium">
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Event Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Event Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Business Unit</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Staff</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Template</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map((event) => (
                <tr 
                  key={event.id} 
                  className="hover:bg-purple-50/30 transition-colors group cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-800">{event.name}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin size={10} />
                      {event.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        {event.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                      {event.bu}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-1">
                        <Users size={14} className="text-gray-400" />
                        <span className="font-medium text-gray-700">{event.staffIds.length}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {event.template}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-brand-purple" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-brand-purple" title="View Details">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Event Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">Create New Event</h2>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                    <input 
                      type="text" 
                      value={newEvent.name}
                      onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none"
                      placeholder="e.g. Annual Tech Conference"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input 
                      type="date" 
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Unit</label>
                    <select 
                      value={newEvent.bu}
                      onChange={(e) => setNewEvent({...newEvent, bu: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none bg-white"
                    >
                        <option>IT Services</option>
                        <option>Education</option>
                        <option>Corporate</option>
                        <option>Training</option>
                        <option>Marketing</option>
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input 
                      type="text" 
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none"
                      placeholder="Venue name and room"
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Form Template</label>
                    <select 
                      value={newEvent.template}
                      onChange={(e) => setNewEvent({...newEvent, template: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none bg-white"
                    >
                        {MOCK_TEMPLATES.map(t => <option key={t}>{t}</option>)}
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assign Staff</label>
                    <div className="border border-gray-200 rounded-lg p-3 max-h-32 overflow-y-auto space-y-2">
                        {MOCK_STAFF.map(staff => (
                            <label key={staff.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  checked={newEvent.staffIds?.includes(staff.id)}
                                  onChange={() => toggleStaffSelection(staff.id)}
                                  className="w-4 h-4 text-brand-purple rounded border-gray-300 focus:ring-brand-purple"
                                />
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-800">{staff.name}</div>
                                    <div className="text-xs text-gray-500">{staff.role}</div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition-colors text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateEvent}
                className="px-6 py-2 bg-brand-purple text-white font-medium rounded-lg hover:bg-brand-hover transition-colors shadow-sm text-sm"
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Slide-over Panel */}
      {selectedEvent && (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity" 
                onClick={() => setSelectedEvent(null)}
            ></div>
            
            {/* Panel */}
            <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-800">Event Details</h2>
                    <button onClick={() => setSelectedEvent(null)} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-brand-purple mb-1">{selectedEvent.name}</h3>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <Calendar size={14} />
                                {selectedEvent.date}
                            </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedEvent.status)}`}>
                            {selectedEvent.status}
                        </span>
                    </div>

                    <div className="space-y-6">
                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-purple-50 p-3 rounded-xl border border-purple-100">
                                <div className="text-xs text-purple-700 font-bold uppercase mb-1">Submissions</div>
                                <div className="text-2xl font-bold text-gray-800">{selectedEvent.submissions}</div>
                            </div>
                            <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                                <div className="text-xs text-red-700 font-bold uppercase mb-1">Review Queue</div>
                                <div className="text-2xl font-bold text-gray-800">{selectedEvent.reviewQueue}</div>
                            </div>
                        </div>

                        {/* Info Sections */}
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <FileText size={16} className="text-gray-400" />
                                Configuration
                            </h4>
                            <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Business Unit</span>
                                    <span className="font-medium text-gray-800">{selectedEvent.bu}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Location</span>
                                    <span className="font-medium text-gray-800">{selectedEvent.location}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Template</span>
                                    <span className="font-medium text-gray-800">{selectedEvent.template}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Pre-Registration</span>
                                    <span className="font-medium text-gray-800">
                                        {selectedEvent.preRegImported ? 'Imported' : 'Not Imported'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <Users size={16} className="text-gray-400" />
                                Assigned Staff ({selectedEvent.staffIds.length})
                            </h4>
                            <div className="bg-gray-50 rounded-xl border border-gray-100 divide-y divide-gray-100">
                                {selectedEvent.staffIds.map(staffId => {
                                    const staff = MOCK_STAFF.find(s => s.id === staffId);
                                    if (!staff) return null;
                                    return (
                                        <div key={staffId} className="p-3 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-brand-purple/10 text-brand-purple flex items-center justify-center text-xs font-bold">
                                                    {staff.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-800">{staff.name}</div>
                                                    <div className="text-xs text-gray-500">{staff.role}</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <button className="w-full mt-2 py-2 text-sm text-brand-purple font-medium hover:bg-purple-50 rounded-lg transition-colors flex items-center justify-center gap-1">
                                <UserPlus size={16} />
                                Manage Staff
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-3">
                    <button className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm">
                        <Download size={16} />
                        Export Data
                    </button>
                    <div className="flex gap-3">
                        <button className="flex-1 py-2.5 bg-brand-purple text-white font-medium rounded-lg hover:bg-brand-hover transition-colors flex items-center justify-center gap-2 text-sm shadow-sm">
                            <Edit2 size={16} />
                            Edit Event
                        </button>
                        <button className="px-4 py-2.5 bg-white border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center text-sm">
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </>
      )}
    </div>
  );
};
