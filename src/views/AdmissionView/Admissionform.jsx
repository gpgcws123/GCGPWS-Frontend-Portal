import { useState } from 'react';
import { Upload, SendHorizontal, UserCircle, BookOpen, GraduationCap, Phone, Mail, Calendar, MapPin, Loader } from 'lucide-react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const API_URL = 'http://localhost:5000/api'; // Updated to the correct port

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    // Course selection
    course: 'btech',
    admissionYear: '',
    // Matriculation (10th) details
    matricSchool: '',
    matricBoard: '',
    matricPassingYear: '',
    matricPercentage: '',
    // Intermediate (12th) details
    interCollege: '',
    interBoard: '',
    interPassingYear: '',
    interPercentage: '',
  });

  const [documents, setDocuments] = useState({
    photo: null,
    matricMarksheet: null,
    interMarksheet: null,
    idProof: null,
  });

  const [documentPreviews, setDocumentPreviews] = useState({
    photo: null,
    matricMarksheet: null,
    interMarksheet: null,
    idProof: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applicationId, setApplicationId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      // Create a preview URL for the image
      const preview = URL.createObjectURL(files[0]);
      setDocumentPreviews({
        ...documentPreviews,
        [name]: preview
      });

      // Store the file for later upload
      setDocuments({
        ...documents,
        [name]: files[0]
      });
    }
  };

  const uploadToCloudinary = async (file) => {
    try {
      const uploadPreset = 'student_profiles_unsigned'; // Update with your Cloudinary upload preset
      const cloudName = 'dkcdjdlqs'; // Update with your Cloudinary cloud name

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Error('Failed to upload document');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Upload documents to Cloudinary
      const uploadPromises = [];
      const uploadedUrls = {};

      for (const [key, file] of Object.entries(documents)) {
        if (file) {
          uploadPromises.push(
            uploadToCloudinary(file).then(url => {
              uploadedUrls[`${key}Url`] = url;
            })
          );
        }
      }

      await Promise.all(uploadPromises);

      // Submit form data with document URLs to API
      const submissionData = {
        ...formData,
        ...uploadedUrls,
      };

      // Get Firebase auth token if user is logged in
      let authHeader = {};
      const auth = getAuth();

      if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken();
        authHeader = { Authorization: `Bearer ${token}` };
      }

      // Submit to backend with authentication (if available)
      const response = await axios.post(
        `${API_URL}/admissions/submit`,
        submissionData,
        { headers: authHeader }
      );

      console.log('Application submitted:', response.data);
      setApplicationId(response.data.applicationId);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const degreeCourses = ['btech', 'bsc', 'mtech', 'mba', 'msc', 'mca'];

  // Courses that need ONLY Matric details
  const intermediateCourses = ['fsc', 'premedical', 'ics', 'icom'];

  const showMatricDetails =
    degreeCourses.includes(formData.course) ||
    intermediateCourses.includes(formData.course);

  const showInterDetails = degreeCourses.includes(formData.course);

  if (submitted) {
    return (
      <div className="container mt-10 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center my-12">
          <GraduationCap className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">Application Submitted Successfully!</h2>
          <p className="mt-2 text-gray-600">Thank you for submitting your application to our college.</p>
          <p className="mt-1 text-gray-600">Your application reference number is: <strong>{applicationId}</strong></p>
          <p className="mt-1 text-gray-600">Your application will be reviewed, and you will be contacted via email shortly.</p>
          <button
            onClick={() => {
              setSubmitted(false);
              // Reset form
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                dob: '',
                address: '',
                city: '',
                state: '',
                zipCode: '',
                course: 'btech',
                admissionYear: '',
                matricSchool: '',
                matricBoard: '',
                matricPassingYear: '',
                matricPercentage: '',
                interCollege: '',
                interBoard: '',
                interPassingYear: '',
                interPercentage: '',
              });
              setDocuments({
                photo: null,
                matricMarksheet: null,
                interMarksheet: null,
                idProof: null,
              });
              setDocumentPreviews({
                photo: null,
                matricMarksheet: null,
                interMarksheet: null,
                idProof: null,
              });
            }}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 mt-24 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-6">
        <GraduationCap className="h-8 w-8 text-blue-600 mr-2" />
        <h1 className="text-2xl font-bold text-center text-gray-800">College Admission Form</h1>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-medium">Error: {error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Personal Information - First Section */}
        <div className="p-4 bg-gray-50 rounded-md">
          <h2 className="flex items-center text-lg font-semibold text-gray-700 mb-4">
            <UserCircle className="h-5 w-5 mr-2 text-blue-600" />
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1 text-blue-600" />
                  Email Address *
                </div>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1 text-blue-600" />
                  Phone Number *
                </div>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-blue-600" />
                  Date of Birth *
                </div>
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-blue-600" />
                Address *
              </div>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code *</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 2. Apply For Section - Second Section */}
        <div className="p-4 bg-gray-50 rounded-md">
          <h2 className="flex items-center text-lg font-semibold text-gray-700 mb-4">
            <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
            Apply For
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="btech">B.Tech</option>
                <option value="bsc">B.Sc</option>
                <option value="fsc">FSC</option>
                <option value="premedical">Pre-Medical</option>
                <option value="ics">ICS</option>
                <option value="icom">ICOM</option>
                <option value="mca">MCA</option>
                <option value="mtech">M.Tech</option>
                <option value="mba">MBA</option>
                <option value="msc">M.Sc</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Admission Year *</label>
              <input
                type="number"
                name="admissionYear"
                value={formData.admissionYear}
                onChange={handleInputChange}
                required
                min="2024"
                max="2027"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 3. Academic Information - Third Section */}
        <div className="p-4 bg-gray-50 rounded-md">
          <h2 className="flex items-center text-lg font-semibold text-gray-700 mb-4">
            <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
            Academic Information
          </h2>

          {/* Matriculation (10th) Details - Only shown for non-FSC/Pre-Medical/ICS/ICOM courses */}
          {showMatricDetails && (
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-3 border-b border-gray-200 pb-2">Matriculation (10th) Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">School Name *</label>
                  <input
                    type="text"
                    name="matricSchool"
                    value={formData.matricSchool}
                    onChange={handleInputChange}
                    required={showMatricDetails}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Board *</label>
                  <input
                    type="text"
                    name="matricBoard"
                    value={formData.matricBoard}
                    onChange={handleInputChange}
                    required={showMatricDetails}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year of Passing *</label>
                  <input
                    type="number"
                    name="matricPassingYear"
                    value={formData.matricPassingYear}
                    onChange={handleInputChange}
                    required={showMatricDetails}
                    min="1990"
                    max="2025"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Percentage/CGPA *</label>
                  <input
                    type="number"
                    name="matricPercentage"
                    value={formData.matricPercentage}
                    onChange={handleInputChange}
                    required={showMatricDetails}
                    min="0"
                    max="100"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Intermediate (12th) Details - Always shown */}
          {showInterDetails && (
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-3 border-b border-gray-200 pb-2">Intermediate (12th) Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">College/School Name *</label>
                  <input
                    type="text"
                    name="interCollege"
                    value={formData.interCollege}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Board *</label>
                  <input
                    type="text"
                    name="interBoard"
                    value={formData.interBoard}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year of Passing *</label>
                  <input
                    type="number"
                    name="interPassingYear"
                    value={formData.interPassingYear}
                    onChange={handleInputChange}
                    required
                    min="1990"
                    max="2025"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Percentage/CGPA *</label>
                  <input
                    type="number"
                    name="interPercentage"
                    value={formData.interPercentage}
                    onChange={handleInputChange}
                    required
                    min="0"
                    max="100"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. Document Upload - Fourth Section */}
        <div className="p-4 bg-gray-50 rounded-md">
          <h2 className="flex items-center text-lg font-semibold text-gray-700 mb-4">
            <Upload className="h-5 w-5 mr-2 text-blue-600" />
            Document Upload
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Passport Size Photo *</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  {documentPreviews.photo ? (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 h-full">
                      <img
                        src={documentPreviews.photo}
                        alt="Photo preview"
                        className="max-h-20 mb-2"
                      />
                      <p className="text-xs text-gray-500">Click to change</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-1 text-sm text-gray-500">
                        Click to upload
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 1MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    name="photo"
                    className="hidden"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    required
                  />
                </label>
              </div>
            </div>

            {/* Only show Matric Marksheet upload if needed */}
            {showMatricDetails && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Matriculation (10th) Marksheet *</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    {documentPreviews.matricMarksheet ? (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 h-full">
                        <img
                          src={documentPreviews.matricMarksheet}
                          alt="Document preview"
                          className="max-h-20 mb-2"
                        />
                        <p className="text-xs text-gray-500">Click to change</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="mb-1 text-sm text-gray-500">
                          Click to upload
                        </p>
                        <p className="text-xs text-gray-500">PDF, JPG up to 2MB</p>
                      </div>
                    )}
                    <input
                      type="file"
                      name="matricMarksheet"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      required={showMatricDetails}
                    />
                  </label>
                </div>
              </div>
            )}
            {showInterDetails && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Intermediate (12th) Marksheet *</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    {documentPreviews.interMarksheet ? (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 h-full">
                        <img
                          src={documentPreviews.interMarksheet}
                          alt="Document preview"
                          className="max-h-20 mb-2"
                        />
                        <p className="text-xs text-gray-500">Click to change</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="mb-1 text-sm text-gray-500">
                          Click to upload
                        </p>
                        <p className="text-xs text-gray-500">PDF, JPG up to 2MB</p>
                      </div>
                    )}
                    <input
                      type="file"
                      name="interMarksheet"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ID Proof *</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  {documentPreviews.idProof ? (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 h-full">
                      <img
                        src={documentPreviews.idProof}
                        alt="Document preview"
                        className="max-h-20 mb-2"
                      />
                      <p className="text-xs text-gray-500">Click to change</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-1 text-sm text-gray-500">
                        Click to upload
                      </p>
                      <p className="text-xs text-gray-500">PDF, JPG up to 2MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    name="idProof"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    required
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader className="h-5 w-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <SendHorizontal className="h-5 w-5 mr-2" />
                Submit Application
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}