import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import parse from 'html-react-parser';

const BACKEND_URL = 'http://localhost:5000';

const AdmissionDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/admissions/${id}`);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching admission details:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/placeholder-image.jpg';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${BACKEND_URL}${imageUrl}`;
  };

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div className="mt-16">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img
          src={getImageUrl(data.image)}
          alt={data.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center px-4">
            {data.title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Description */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Overview</h2>
          <p className="text-gray-700 text-lg">{data.description}</p>
        </div>

        {/* Requirements Section (for criteria and admissions) */}
        {data.requirements && data.requirements.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Requirements</h2>
            <ul className="list-disc list-inside space-y-2">
              {data.requirements.map((req, index) => (
                <li key={index} className="text-gray-700 text-lg">{req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Documents Section (for admissions) */}
        {data.documents && data.documents.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Required Documents</h2>
            <ul className="list-disc list-inside space-y-2">
              {data.documents.map((doc, index) => (
                <li key={index} className="text-gray-700 text-lg">{doc}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Dates Section (for admissions) */}
        {data.startDate && data.endDate && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Important Dates</h2>
            <div className="space-y-2">
              <p className="text-gray-700 text-lg">
                <strong>Start Date:</strong> {new Date(data.startDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700 text-lg">
                <strong>End Date:</strong> {new Date(data.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        {/* Main Content */}
        {data.content && (
          <div className="prose max-w-none">
            <h2 className="text-3xl font-bold mb-4">Details</h2>
            <div className="text-gray-700 text-lg">
              {parse(data.content)}
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className="mt-8">
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
            data.status === 'active' ? 'bg-green-100 text-green-800' :
            data.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
            data.status === 'closed' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            Status: {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdmissionDetail; 