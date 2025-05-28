import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import heroImage from '../../assets/heroImage1.jpg';
import ContentSection from '../../components/contextSection';

const BACKEND_URL = 'http://localhost:5000';

const ProgramDetail = () => {
    const { id } = useParams();
    const [program, setProgram] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgramDetail = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/academic/${id}`);
                if (response.data.success) {
                    setProgram(response.data.data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching program details:', error);
                setLoading(false);
            }
        };

        if (id) {
            fetchProgramDetail();
        }
    }, [id]);

    if (loading) {
        return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!program) {
        return <div className="w-full h-screen flex items-center justify-center">Program not found</div>;
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
                    backgroundImage: `url(${getImageUrl(program.image)})`
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{program.title}</h1>
                        <p className="text-xl md:text-2xl">{program.description}</p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto py-12 px-4">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Program Info */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-4">{program.title}</h2>
                        <p className="text-gray-600 mb-6">{program.description}</p>
                    </div>

                    {/* TinyMCE Content */}
                    <div className="prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: program.content }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgramDetail; 