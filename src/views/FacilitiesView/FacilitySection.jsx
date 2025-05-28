import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const FacilitySection = () => {
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { type } = useParams();

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/api/facility?type=${type}`);
        if (response.data && response.data.data) {
          // Get the first facility of this type
          const facilityData = Array.isArray(response.data.data)
            ? response.data.data[0]
            : response.data.data;
          setFacility(facilityData);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching facility:', err);
        setError('Failed to load facility information');
      } finally {
        setLoading(false);
      }
    };

    if (type) {
      fetchFacility();
    }
  }, [type]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">No facility information available</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{facility.title}</h1>

        {facility.images && facility.images.length > 0 && (
          <div className="mb-8">
            <img
              src={`${BACKEND_URL}${facility.images[0]}`}
              alt={facility.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Available';
              }}
            />
          </div>
        )}

        <div className="prose max-w-none">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700">{facility.description}</p>
          </div>

          {facility.content && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">Details</h2>
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: facility.content }}
              />
            </div>
          )}

          {facility.status === 'active' && (
            <div className="mt-4">
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                Available
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilitySection;