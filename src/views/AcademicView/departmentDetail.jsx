import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import heroImage from '../../assets/heroImage1.jpg';
import ContentSection from '../../components/contextSection';

const BACKEND_URL = 'http://localhost:5000';

const DepartmentDetail = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDepartmentDetail = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/academic/${id}`);
                if (response.data.success) {
                    setDepartment(response.data.data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching department details:', error);
                setLoading(false);
            }
        };

        if (id) {
            fetchDepartmentDetail();
        }
    }, [id]);

    if (loading) {
        return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!department) {
        return <div className="w-full h-screen flex items-center justify-center">Department not found</div>;
    }

    const getImageUrl = (imageUrl) => {
        if (!imageUrl) return '/placeholder-image.jpg';
        if (imageUrl.startsWith('http')) return imageUrl;
        return `${BACKEND_URL}${imageUrl}`;
    };

  return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
      <div
                className="relative w-full h-[60vh] bg-cover bg-center"
        style={{
                    backgroundImage: `url(${getImageUrl(department.image)})`
        }}
      >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{department.title}</h1>
                        <p className="text-xl md:text-2xl">{department.description}</p>
                    </div>
        </div>
      </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto py-12 px-4">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Department Info */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-4">{department.title}</h2>
                        <p className="text-gray-600 mb-6">{department.description}</p>
        </div>
        
                    {/* TinyMCE Content */}
                    <div className="prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: department.content }} />
        </div>
      </div>
      </div>
    </div>
  );
};

export default DepartmentDetail; 