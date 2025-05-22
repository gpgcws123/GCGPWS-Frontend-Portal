import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import collegelogo from "../assets/formlogo.svg"
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = sessionStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      const role = sessionStorage.getItem('userRole');
      navigate(role === 'admin' ? '/admin' : '/student-portal');
    }
  }, [navigate]);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      // Sign in with Firebase Auth
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Get user role from Firestore
      const q = query(
        collection(db, "students"), 
        where("uid", "==", userCredential.user.uid)
      );
      
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs[0]?.data();
      
      if (!userData) {
        throw new Error('User data not found');
      }

      // Set session data
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('userRole', userData.role);
      sessionStorage.setItem('userId', userCredential.user.uid);
      setIsAuthenticated(true);
      
      // Redirect based on role
      if (userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/student-portal');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(
        error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found'
          ? 'Invalid email or password'
          : 'An error occurred during login'
      );
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-96 h-[500px] bg-gray rounded-[20px] flex items-center justify-center">
        <img src={collegelogo} alt="Logo" className="h-[400px] object-contain" />
      </div>
  
      <div className="w-96 font-jakarta h-[400px] p-8 border-black border-8 rounded-[10px] rounded-l-none border-l-0 flex flex-col justify-center bg-gray">
        <h2 className="text-2xl font-bold text-center mb-8">Welcome to Login</h2>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 placeholder:font-jakarta font-jakarta placeholder:text-[rgb(0 0 0 / 50%)] rounded-md"
              placeholder="Email"
              required
              disabled={loading}
            />
          </div>
          
          <div className="mb-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 placeholder:text-[rgb(0 0 0 / 50%)] placeholder:font-jakarta font-jakarta border-gray-300 rounded-md"
              placeholder="Password"
              required
              disabled={loading}
            />
          </div>
          
          <div className="mb-6 text-left">
            <a href="#" className="text-[#18139B] font-[400] text-sm">
              Forgot Password?
            </a>
          </div>
          
          <div className="mb-4">
            <button
              type="submit"
              disabled={loading}
              className="w-[200px] mx-auto block bg-yellow hover:bg-yellow-500 text-black py-2 rounded-md font-medium disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          
          <div className="text-center">
            <span className="text-sm">Not a member? </span>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-[#18139B] font-medium"
              disabled={loading}
            >
              Signup Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
