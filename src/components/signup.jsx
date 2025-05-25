import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { CLOUDINARY_CONFIG } from '../config/cloudinary';
import collegelogo from "../assets/formlogo.svg";

const validateImage = (file) => {
  // Check file size
  if (file.size > CLOUDINARY_CONFIG.MAX_FILE_SIZE) {
    throw new Error('File size must be less than 5MB');
  }

  // Check file type
  const fileType = file.type.split('/')[1];
  if (!CLOUDINARY_CONFIG.ALLOWED_FORMATS.includes(fileType)) {
    throw new Error('File must be JPG, PNG or JPEG');
  }

  return true;
};

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    class: '',
    rollNumber: '',
    role: 'student',
    studentImage: null
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      studentImage: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Create authentication user
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      let imageUrl = null;
      if (formData.studentImage) {
        validateImage(formData.studentImage);
        const imageFormData = new FormData();
        imageFormData.append('file', formData.studentImage);
        imageFormData.append('upload_preset', CLOUDINARY_CONFIG.UPLOAD_PRESET);
        imageFormData.append('folder', CLOUDINARY_CONFIG.FOLDER);

        const response = await axios.post(
          CLOUDINARY_CONFIG.API_URL,
          imageFormData
        );
        imageUrl = response.data.secure_url;
      }

      // Use setDoc with user UID as the document ID to match security rules
      await setDoc(doc(db, "students", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: formData.email,
        name: formData.name,
        class: formData.class,
        rollNumber: formData.rollNumber,
        role: formData.role,
        imageUrl: imageUrl,
        createdAt: new Date()
      });

      alert('Signup successful!');
      navigate('/login');
    } catch (error) {
      console.error('Error during signup:', error);
      alert(error.message || 'Error during signup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-96 h-[600px] bg-gray rounded-[20px] flex items-center justify-center">
        <img src={collegelogo} alt="Logo" className="h-[400px] object-contain" />
      </div>

      <div className="w-96 font-jakarta h-[600px] p-8 border-black border-8 rounded-[10px] rounded-l-none border-l-0 flex flex-col justify-center bg-gray">
        <h2 className="text-2xl font-bold text-center mb-8">Welcome to Signup</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-gray-300 rounded-md"
              placeholder="Full Name"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-gray-300 rounded-md"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-gray-300 rounded-md"
              placeholder="Password"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="confirmPassword"
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-gray-300 rounded-md"
              placeholder="Confirm Password"
              required
            />
          </div>

          <div className="mb-4">
            <select
              name="class"
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-gray-300 rounded-md"
              required
            >
              <option value="">Select Class</option>
              <option value="FSC-1">FSC-1</option>
              <option value="FSC-2">FSC-2</option>
              <option value="BSC-1">BSC-1</option>
              <option value="BSC-2">BSC-2</option>
              <option value="BCS-1">BCS-1</option>
              <option value="BCS-2">BCS-2</option>
            </select>
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="rollNumber"
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-gray-300 rounded-md"
              placeholder="Roll Number"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-[200px] block mx-auto bg-yellow hover:bg-yellow-500 text-black py-2 rounded-md font-medium"
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>

          <div className="text-center mt-4">
            <span className="text-sm">Already have an account? </span>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-blue-600 font-medium"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
