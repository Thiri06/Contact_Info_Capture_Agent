
import { AttendeeForm, User } from '../types';

// The URL of your backend server (e.g., Node.js, Python, Go)
const API_BASE_URL = 'http://localhost:3000/api';

export const api = {
  // 1. GET: Fetch all submissions
  getSubmissions: async (): Promise<AttendeeForm[]> => {
    try {
      // UNCOMMENT THIS WHEN BACKEND IS READY:
      /*
      const response = await fetch(`${API_BASE_URL}/submissions`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // If you use auth
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch');
      return await response.json();
      */

      // FOR NOW: Return Mock Data so the app doesn't break
      return []; 
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // 2. POST: Create a new submission (Manual or OCR)
  createSubmission: async (data: AttendeeForm): Promise<AttendeeForm> => {
    try {
      // UNCOMMENT THIS WHEN BACKEND IS READY:
      /*
      const response = await fetch(`${API_BASE_URL}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to save');
      return await response.json();
      */

      console.log("Mock Save to Database:", data);
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // 3. POST: Upload Image for Backend Processing (Alternative to frontend Gemini)
  uploadCapture: async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('image', file);

    // const response = await fetch(`${API_BASE_URL}/upload`, {
    //   method: 'POST',
    //   body: formData,
    // });
    // return await response.json();
    return { success: true };
  }
};
