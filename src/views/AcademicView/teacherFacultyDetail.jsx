import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import heroImage from '../../assets/heroImage1.jpg';
import ContentSection from '../../components/contextSection';

const BACKEND_URL = 'http://localhost:5000';

const TeacherFacultyDetail = () => {
    const { id } = useParams();
    const [faculty, setFaculty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFacultyDetail = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/academic/${id}`);
                if (response.data.success) {
                    setFaculty(response.data.data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching faculty details:', error);
                setLoading(false);
            }
        };

        if (id) {
            fetchFacultyDetail();
        }
    }, [id]);

    if (loading) {
        return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!faculty) {
        return <div className="w-full h-screen flex items-center justify-center">Faculty member not found</div>;
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
                    backgroundImage: `url(${getImageUrl(faculty.image)})`
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{faculty.title}</h1>
                        <p className="text-xl md:text-2xl">{faculty.description}</p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto py-12 px-4">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Faculty Info */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-4">{faculty.title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Field:</span> {faculty.description?.split(' - ')[0]}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Course:</span> {faculty.description?.split(' - ')[1]}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* TinyMCE Content */}
                    <div className="prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: faculty.content }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherFacultyDetail; 