
import React, { useState, useEffect } from 'react';
import { 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Type, 
  Mail, 
  Phone, 
  List, 
  CheckSquare, 
  Disc, 
  Heading, 
  Smartphone,
  GripVertical
} from 'lucide-react';

type FieldType = 'text' | 'email' | 'phone' | 'select' | 'radio' | 'checkbox' | 'header';

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  options?: string[]; // Comma separated string for simple editing
  placeholder?: string;
}

const FIELD_TYPES: { type: FieldType; label: string; icon: React.ElementType }[] = [
  { type: 'text', label: 'Text Input', icon: Type },
  { type: 'email', label: 'Email', icon: Mail },
  { type: 'phone', label: 'Phone', icon: Phone },
  { type: 'select', label: 'Dropdown', icon: List },
  { type: 'radio', label: 'Radio', icon: Disc },
  { type: 'checkbox', label: 'Checkbox', icon: CheckSquare },
  { type: 'header', label: 'Section Header', icon: Heading },
];

const TEMPLATES = {
  Retail: [
    { id: '1', type: 'header', label: 'Contact Info', required: false },
    { id: '2', type: 'text', label: 'Full Name', required: true, placeholder: 'Jane Doe' },
    { id: '3', type: 'email', label: 'Email Address', required: true, placeholder: 'jane@example.com' },
    { id: '4', type: 'phone', label: 'Mobile Number', required: false, placeholder: '+65 9123 4567' },
  ] as FormField[],
  Enterprise: [
    { id: '1', type: 'header', label: 'Employee Details', required: false },
    { id: '2', type: 'text', label: 'Full Name', required: true, placeholder: 'John Smith' },
    { id: '3', type: 'text', label: 'Company Name', required: true, placeholder: 'Acme Corp' },
    { id: '4', type: 'text', label: 'Job Title', required: true, placeholder: 'CTO' },
    { id: '5', type: 'email', label: 'Work Email', required: true, placeholder: 'john@acme.com' },
  ] as FormField[],
  Alliance: [
    { id: '1', type: 'header', label: 'Partner Information', required: false },
    { id: '2', type: 'text', label: 'Partner Name', required: true, placeholder: 'Partner Ltd' },
    { id: '3', type: 'select', label: 'Partnership Tier', required: true, options: ['Silver', 'Gold', 'Platinum'] },
    { id: '4', type: 'text', label: 'Region', required: false, placeholder: 'APAC' },
  ] as FormField[],
};

export const FormBuilder: React.FC = () => {
  const [activeTemplate, setActiveTemplate] = useState<string>('Retail');
  const [fields, setFields] = useState<FormField[]>(TEMPLATES.Retail);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  // Load template when selection changes
  const handleTemplateChange = (templateName: string) => {
    setActiveTemplate(templateName);
    if (templateName === 'Custom') {
      setFields([]);
    } else {
      // Deep copy to avoid mutating the constant
      setFields(JSON.parse(JSON.stringify(TEMPLATES[templateName as keyof typeof TEMPLATES])));
    }
    setSelectedFieldId(null);
  };

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: crypto.randomUUID(),
      type,
      label: type === 'header' ? 'New Section' : `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      required: false,
      options: type === 'select' || type === 'radio' ? ['Option 1', 'Option 2'] : undefined,
      placeholder: ''
    };
    setFields([...fields, newField]);
    setSelectedFieldId(newField.id);
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
    if (selectedFieldId === id) setSelectedFieldId(null);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const moveField = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === fields.length - 1) return;
    
    const newFields = [...fields];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newFields[index], newFields[swapIndex]] = [newFields[swapIndex], newFields[index]];
    setFields(newFields);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Form Builder</h1>
          <p className="text-gray-500 mt-1">Design and configure data collection templates.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => handleTemplateChange(activeTemplate)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            <RotateCcw size={16} />
            Reset
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-brand-purple text-white rounded-lg hover:bg-brand-hover transition-colors font-medium text-sm shadow-sm">
            <Save size={16} />
            Save Template
          </button>
        </div>
      </div>

      <div className="flex gap-6 h-full overflow-hidden">
        
        {/* LEFT PANEL: Editor */}
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          
          {/* Template Selection */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 shrink-0">
            <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Select Base Template</h3>
            <div className="flex gap-2">
              {['Retail', 'Enterprise', 'Alliance', 'Custom'].map((t) => (
                <button
                  key={t}
                  onClick={() => handleTemplateChange(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTemplate === t
                      ? 'bg-brand-purple text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Builder Area */}
          <div className="flex-1 flex gap-4 min-h-0">
            
            {/* Field Toolbox */}
            <div className="w-48 bg-white p-4 rounded-xl shadow-sm border border-gray-200 overflow-y-auto shrink-0">
              <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase">Drag Fields</h3>
              <div className="space-y-2">
                {FIELD_TYPES.map((ft) => (
                  <button
                    key={ft.type}
                    onClick={() => addField(ft.type)}
                    className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-purple-50 border border-transparent hover:border-purple-100 rounded-lg text-left transition-all group"
                  >
                    <ft.icon size={18} className="text-gray-500 group-hover:text-brand-purple" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{ft.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col min-h-0">
              <div className="p-4 border-b border-gray-100 bg-gray-50 rounded-t-xl flex justify-between items-center">
                <h3 className="font-bold text-gray-700">Form Structure</h3>
                <span className="text-xs text-gray-500">{fields.length} fields</span>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {fields.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                    <List size={40} className="mb-2 opacity-50" />
                    <p className="font-medium">Form is empty</p>
                    <p className="text-sm">Add fields from the left panel</p>
                  </div>
                ) : (
                  fields.map((field, index) => (
                    <div 
                      key={field.id}
                      onClick={() => setSelectedFieldId(field.id)}
                      className={`group relative p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        selectedFieldId === field.id
                          ? 'border-brand-purple bg-purple-50/30'
                          : 'border-gray-100 hover:border-purple-100 bg-white hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-2 text-gray-300 cursor-grab">
                          <GripVertical size={20} />
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-4">
                            <input
                              type="text"
                              value={field.label}
                              onChange={(e) => updateField(field.id, { label: e.target.value })}
                              className={`font-bold bg-transparent outline-none focus:border-b-2 focus:border-brand-purple w-full ${
                                field.type === 'header' ? 'text-lg text-brand-purple' : 'text-gray-800'
                              }`}
                            />
                            {field.type !== 'header' && (
                              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  checked={field.required}
                                  onChange={(e) => updateField(field.id, { required: e.target.checked })}
                                  className="w-4 h-4 text-brand-purple rounded focus:ring-brand-purple"
                                />
                                Required
                              </label>
                            )}
                          </div>

                          {(field.type === 'select' || field.type === 'radio') && (
                             <div className="text-sm">
                               <label className="block text-xs font-semibold text-gray-500 mb-1">Options (comma separated)</label>
                               <input 
                                 className="w-full p-2 border border-gray-200 rounded text-gray-700 text-sm focus:border-brand-purple outline-none bg-white"
                                 value={field.options?.join(', ')}
                                 onChange={(e) => updateField(field.id, { options: e.target.value.split(',').map(s => s.trim()) })}
                               />
                             </div>
                          )}
                          
                          {field.type !== 'header' && (
                            <div className="text-xs text-gray-400 font-mono">
                                Type: {field.type}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={(e) => { e.stopPropagation(); moveField(index, 'up'); }}
                                disabled={index === 0}
                                className="p-1.5 hover:bg-gray-100 rounded text-gray-500 disabled:opacity-30"
                            >
                                <MoveUp size={16} />
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); moveField(index, 'down'); }}
                                disabled={index === fields.length - 1}
                                className="p-1.5 hover:bg-gray-100 rounded text-gray-500 disabled:opacity-30"
                            >
                                <MoveDown size={16} />
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); removeField(field.id); }}
                                className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded mt-2"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT PANEL: Live Preview - COMMENTED OUT */}
        {/* 
            The following block is commented out using a conditional check.
            To enable the live preview, remove the {false && (...)} wrapper.
        */}
        {false && (
        <div className="w-[340px] shrink-0 flex flex-col items-center justify-center bg-gray-100 rounded-3xl p-4 border border-gray-200 shadow-inner">
          <div className="flex items-center gap-2 mb-4 text-gray-500 font-medium">
             <Smartphone size={18} />
             <span>Live Mobile Preview</span>
          </div>
          
          {/* Phone Frame */}
          <div className="w-[300px] h-[600px] bg-white rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden relative flex flex-col">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20"></div>
            
            {/* App Header */}
            <div className="h-16 bg-brand-purple flex items-end p-4 shrink-0 z-10">
                <span className="text-white font-bold text-lg">Event Entry</span>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 no-scrollbar">
               {fields.length === 0 ? (
                 <div className="text-center text-gray-400 text-sm mt-10">Form Content</div>
               ) : (
                 fields.map(field => (
                   <div key={field.id} className="animate-in fade-in zoom-in-95 duration-200">
                     {field.type === 'header' ? (
                       <h3 className="text-brand-purple font-bold text-lg border-b border-purple-100 pb-1 mt-4">{field.label}</h3>
                     ) : (
                       <div className="space-y-1">
                         <label className="text-xs font-semibold text-gray-600">
                           {field.label} {field.required && <span className="text-red-500">*</span>}
                         </label>
                         
                         {field.type === 'text' || field.type === 'email' || field.type === 'phone' ? (
                           <div className="w-full h-9 bg-white border border-gray-200 rounded px-2 flex items-center text-xs text-gray-400 shadow-sm">
                             {field.placeholder || `Enter ${field.label.toLowerCase()}`}
                           </div>
                         ) : field.type === 'select' ? (
                           <div className="w-full h-9 bg-white border border-gray-200 rounded px-2 flex items-center justify-between text-xs text-gray-700 shadow-sm">
                             <span>Select option...</span>
                             <div className="border-l-[4px] border-l-transparent border-t-[4px] border-t-gray-400 border-r-[4px] border-r-transparent"></div>
                           </div>
                         ) : (
                           <div className="space-y-1">
                             {field.options?.map((opt, i) => (
                               <div key={i} className="flex items-center gap-2">
                                 <div className={`w-3 h-3 rounded-${field.type === 'radio' ? 'full' : 'sm'} border border-gray-300 bg-white`}></div>
                                 <span className="text-xs text-gray-600">{opt}</span>
                                </div>
                             ))}
                           </div>
                         )}
                       </div>
                     )}
                   </div>
                 ))
               )}
               {/* Submit Button Preview */}
               <div className="mt-8">
                 <div className="w-full h-10 bg-brand-purple rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md">
                   Submit
                 </div>
               </div>
            </div>
            
            {/* Home Indicator */}
            <div className="h-1 bg-gray-300 w-1/3 mx-auto my-2 rounded-full shrink-0"></div>
          </div>
        </div>
        )}

      </div>
    </div>
  );
};
