import React, { useState } from 'react';
import { Coffee, UserPlus, LogIn, AlertCircle } from 'lucide-react'; 
import { Role } from '../types';

interface LoginProps {
  onLogin: (role: Role) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const endpoint = isLoginView ? '/api/v1/auth/login' : '/api/v1/auth/signup';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // SUCCESS
      localStorage.setItem('token', data.token); 
      
      // === ROLE HANDLING ===
      // 1. If it's a LOGIN, the backend sends the role in data.data.user.role
      if (isLoginView && data.data && data.data.user) {
         const userRole = data.data.user.role;
         onLogin(userRole as Role);
      } 
      // 2. If it's a SIGNUP, they are always a customer by default
      else {
         onLogin('customer'); 
      }
      
      alert(isLoginView ? 'Successfully Logged In!' : 'Account Created Successfully!');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-coffee-50 overflow-hidden">
      {/* Left Side - Brand */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-coffee-900 to-coffee-700 flex-col items-center justify-center text-white relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="z-10 flex flex-col items-center">
          <div className="bg-coffee-300/20 p-8 rounded-full mb-6 backdrop-blur-sm">
            <Coffee size={120} className="text-coffee-200" strokeWidth={1} />
          </div>
          <h1 className="text-6xl font-bold font-serif mb-2 text-coffee-100">96</h1>
          <h2 className="text-2xl font-light tracking-wider text-coffee-200 mb-4">Your One-stop Cafe</h2>
          <p className="text-coffee-300/80 text-sm tracking-widest uppercase">Say no to Waiting in a Queue</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-20 bg-cream">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-8 text-coffee-800">
            <Coffee size={64} />
          </div>
          
          <h2 className="text-4xl font-bold text-coffee-900 mb-2">
            {isLoginView ? 'Welcome back,' : 'Create Account'}
          </h2>
          <p className="text-coffee-500 mb-8">
            {isLoginView ? 'Please sign in to continue.' : 'Enter your details below.'}
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2 mb-6 text-sm border border-red-100 animate-pulse">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-full bg-white border border-transparent focus:border-coffee-400 focus:ring-4 focus:ring-coffee-100 focus:outline-none transition-all text-coffee-800 placeholder-coffee-300 shadow-sm"
              />
            </div>
            <div>
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 rounded-full bg-white border border-transparent focus:border-coffee-400 focus:ring-4 focus:ring-coffee-100 focus:outline-none transition-all text-coffee-800 placeholder-coffee-300 shadow-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-full bg-gradient-to-r from-coffee-800 to-coffee-600 text-white font-bold text-lg shadow-lg shadow-coffee-800/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 active:scale-95 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : isLoginView ? (
                 <>Sign In <LogIn size={20} /></> 
              ) : ( 
                 <>Create Account <UserPlus size={20} /></>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center text-coffee-400 text-sm">
            <button 
                onClick={() => {
                    setIsLoginView(!isLoginView);
                    setError(null);
                }}
                className="hover:text-coffee-800 transition-colors underline"
            >
                {isLoginView ? (
                    <>New to 96 Cafe? <span className="font-bold text-coffee-600">Create an account</span></>
                ) : (
                    <>Already have an account? <span className="font-bold text-coffee-600">Sign in here</span></>
                )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};