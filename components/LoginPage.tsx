import React, { useState } from 'react';
import { UserRole } from '../types';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email === 'staff@educlaas.com' && password === 'password') {
      onLogin(UserRole.STAFF);
    } else if (email === 'manager@educlaas.com' && password === 'password') {
      onLogin(UserRole.MANAGER);
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-purple p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center text-center">
        
        {/* Logo Area */}
        <div className="mb-8">
           <div className="flex flex-col leading-tight items-center">
             <span className="text-4xl font-bold text-brand-purple tracking-tighter">eCLaaS</span>
           </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to Contact Capture System
        </h1>
        <p className="text-gray-500 mb-8 font-light">
          Sign in to access manage contacts
        </p>

        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div className="text-left">
            <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none transition-all"
            />
          </div>

          <div className="text-left">
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none transition-all"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors shadow-md"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center w-full my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <button
          onClick={() => alert("SSO is not configured for this demo. Please use the credentials provided.")}
          className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg hover:bg-brand-hover transition-colors shadow-md flex items-center justify-center gap-2"
        >
            <div className="grid grid-cols-2 gap-0.5 mr-2">
                <div className="w-2 h-2 bg-orange-500"></div>
                <div className="w-2 h-2 bg-green-500"></div>
                <div className="w-2 h-2 bg-blue-500"></div>
                <div className="w-2 h-2 bg-yellow-500"></div>
            </div>
            Sign in with Microsoft
        </button>
        
        <div className="mt-8 text-xs text-gray-400">
           <p>Test Credentials:</p>
           <p>Staff: staff@educlaas.com / password</p>
           <p>Manager: manager@educlaas.com / password</p>
        </div>
      </div>
    </div>
  );
};