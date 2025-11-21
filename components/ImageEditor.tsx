import React, { useState, useRef } from 'react';
import { Camera, Upload, Wand2, Loader2, Download } from 'lucide-react';
import { editImageWithGemini } from '../services/geminiService';

export const ImageEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;
    setLoading(true);
    try {
        // Extract base64 data (remove prefix)
        const base64Data = image.split(',')[1];
        
        const result = await editImageWithGemini(base64Data, mimeType, prompt);
        if (result) {
            setImage(result);
        } else {
            alert("Could not generate image. Try a different prompt.");
        }
    } catch (error) {
        console.error(error);
        alert("Error interacting with Gemini API. Check console.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-brand-purple mb-2">AI Image Assistant</h2>
          <p className="text-gray-500">Upload an image and use Gemini 2.5 Flash to edit it.</p>
        </div>

        <div className="flex flex-col items-center gap-6">
          {!image ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full max-w-md aspect-video bg-brand-light border-2 border-dashed border-brand-purple rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-pink-100 transition-colors group"
            >
              <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                <Upload className="text-brand-purple" size={32} />
              </div>
              <span className="font-medium text-gray-600">Click to upload an image</span>
              <span className="text-xs text-gray-400 mt-1">Supports JPG, PNG</span>
            </div>
          ) : (
            <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <img src={image} alt="Preview" className="w-full h-auto object-contain bg-gray-50" />
              <button 
                onClick={() => setImage(null)}
                className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
              >
                <span className="sr-only">Remove</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          )}
          
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
          />

          {image && (
            <div className="w-full max-w-md space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe how to edit this image..."
                  className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-300 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none shadow-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
                />
                <Wand2 className="absolute right-4 top-3.5 text-brand-purple opacity-50" size={20} />
              </div>
              
              <div className="flex gap-3">
                <button
                    onClick={handleEdit}
                    disabled={loading || !prompt}
                    className="flex-1 bg-brand-purple disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-brand-hover transition-colors flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />}
                    {loading ? 'Processing...' : 'Generate Edit'}
                </button>

                <a 
                  href={image} 
                  download="edited_image.png"
                  className="px-4 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg flex items-center justify-center text-gray-600 transition-colors"
                  title="Download"
                >
                   <Download size={20} />
                </a>
              </div>
              
              <p className="text-xs text-center text-gray-400">
                Powered by Gemini 2.5 Flash Image
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};