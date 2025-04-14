
  import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex overflow-hidden bg-white shadow-lg rounded-lg">
        {/* Left section with logo */}
        <div className="flex items-center justify-center w-96 bg-gray-300 p-8">
          <div className="relative w-64 h-64">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center p-4 border-4 border-yellow-400">
              <div className="text-center">
                <div className="text-white text-xl font-bold tracking-widest mb-2">G P G C W S</div>
                <div className="bg-white p-2 rounded-lg mb-2">
                  <div className="flex justify-center">
                    <svg className="w-28 h-28" viewBox="0 0 100 100">
                      <rect x="25" y="25" width="50" height="50" fill="none" stroke="black" strokeWidth="2" />
                      <polygon points="30,30 70,30 50,50" fill="none" stroke="black" strokeWidth="2" />
                      <rect x="40" y="55" width="20" height="15" fill="none" stroke="black" strokeWidth="2" />
                      <line x1="35" y1="75" x2="65" y2="75" stroke="black" strokeWidth="2" />
                      <line x1="40" y1="70" x2="40" y2="80" stroke="black" strokeWidth="2" />
                      <line x1="60" y1="70" x2="60" y2="80" stroke="black" strokeWidth="2" />
                      <line x1="45" y1="70" x2="45" y2="80" stroke="black" strokeWidth="2" />
                      <line x1="55" y1="70" x2="55" y2="80" stroke="black" strokeWidth="2" />
                      <line x1="50" y1="70" x2="50" y2="80" stroke="black" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <div className="text-white font-bold tracking-widest text-lg">WEB PORTAL</div>
              </div>
            </div>
            <div className="absolute h-4 w-4 bg-yellow-400 rounded-full top-4 left-4"></div>
            <div className="absolute h-4 w-4 bg-yellow-400 rounded-full top-4 right-4"></div>
          </div>
        </div>

        {/* Right section with login form */}
        <div className="w-96 p-8 border-t border-b border-r border-gray-800">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center">Welcome to Login</h2>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Password"
                required
              />
            </div>
            <div className="mb-6 text-right">
              <a href="#" className="text-blue-600 text-sm">Forgot Password?</a>
            </div>
            <div className="mb-4">
              <button
              
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-md font-medium"
              >
                Login
              </button>
            </div>
            <div className="text-center">
              <span className="text-sm">Not a member? </span>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-blue-600 font-medium"
              >
                Signup Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
