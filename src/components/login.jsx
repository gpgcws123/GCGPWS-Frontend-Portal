import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import collegelogo from "../assets/formlogo.svg"
export default function LoginPage({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // If already logged in, redirect to student portal
  useEffect(() => {
    const auth = sessionStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      navigate('/student-portal');
    }
  }, [navigate]);
  
  const handleLogin = (e) => {
    e.preventDefault();
  
    if (email === 'student@example.com' && password === '123456') {
      sessionStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
  
      // ✅ First go to Home, then push to student-portal
      navigate('/', { replace: true }); // clear login from stack
      setTimeout(() => {
        navigate('/student-portal'); // now "Back" will go to "/"
      }, 0);
    } else {
      alert('Invalid credentials');
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen ">
      
      {/* 🔵 Left: Image Section */}
      <div className="w-96 h-[500px] bg-gray rounded-[20px] flex items-center justify-center">
        <img
          src={collegelogo}
          alt="Logo"
          className="h-[400px] object-contain"
        />
      </div>
  
      {/* 🟡 Right: Login Section */}
      <div className="w-96 font-jakarta h-[400px] p-8 border-black border-8 rounded-[10px] rounded-l-none border-l-0 flex flex-col justify-center  bg-gray">
        <h2 className="text-2xl font-bold text-center mb-8">Welcome to Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 placeholder:font-jakarta font-jakarta  placeholder:text-[rgb(0 0 0 / 50%)]  rounded-md"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 placeholder:text-[rgb(0 0 0 / 50%)]  placeholder:font-jakarta font-jakarta border-gray-300 rounded-md"
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-6 text-left">
            <a href="#" className="text-[#18139B] font-[400] text-sm">Forgot Password ?</a>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-[200px] mx-auto block bg-yellow  hover:bg-yellow-500 text-black py-2 rounded-md font-medium"
            >
              Login
            </button>
          </div>
          <div className="text-center">
            <span className="text-sm">Not a member? </span>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-[#18139B] font-medium"
            >
              Signup Now
            </button>
          </div>
        </form>
      </div>
  
    </div>

  
    
  );
}
