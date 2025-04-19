import React from 'react';
import { useNavigate } from 'react-router-dom';
import collegelogo from "../assets/formlogo.svg"
export default function SignupPage() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen ">
      
    {/* 🔵 Left: Image Section */}
    <div className="w-96 h-[600px] bg-gray rounded-[20px] flex items-center justify-center">
      <img
        src={collegelogo}
        alt="Logo"
        className="h-[400px] object-contain"
      />
    </div>
        {/* Right section with signup form */}
        <div className="w-96 font-jakarta h-[500px] p-8 border-black border-8 rounded-[10px] rounded-l-none border-l-0 flex flex-col justify-center  bg-gray">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center">Welcome to Signup</h2>
          </div>

          <form>
            <div className="mb-4">
              <input
                type="email"
                className="w-full px-3 py-2  border-gray-300 rounded-md"
                placeholder="Enter your Email"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="w-full px-3 py-2  border-gray-300 rounded-md"
                placeholder="Create Password"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="w-full px-3 py-2  border-gray-300 rounded-md"
                placeholder="Confirm Password"
              />
            </div>

            {/* 🔵 Roll Number Field */}
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-3 py-2  border-gray-300 rounded-md"
                placeholder="Enter your Roll Number"
              />
            </div>

            {/* 🟡 Class Field */}
            <div className="mb-6">
              <input
                type="text"
                className="w-full px-3 py-2  border-gray-300 rounded-md"
                placeholder="Enter your Class"
              />
            </div>

            <div className="mb-4">
              <button
                className="w-[200px] block mx-auto bg-yellow hover:bg-yellow-500 text-black py-2 rounded-md font-medium"
              >
                Signup
              </button>
            </div>

            <div className="text-center">
              <span className="text-sm">Already have an account? </span>
              <button onClick={() => navigate('/login')} className="text-blue-600 font-medium">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

  );
}
