import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ContentSection from '../../components/contextSection';

const BACKEND_URL = 'http://localhost:5000';

const PolicyDetail = () => {
    const { id } = useParams();
    const [policy, setPolicy] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPolicyDetail = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/admissions/${id}`);
                if (response.data.success) {
                    setPolicy(response.data.data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching policy details:', error);
                setLoading(false);
            }
        };

        if (id) {
            fetchPolicyDetail();
        }
    }, [id]);

    if (loading) {
        return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!policy) {
        return <div className="w-full h-screen flex items-center justify-center">Policy not found</div>;
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
                    backgroundImage: `url(${getImageUrl(policy.image)})`
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{policy.title}</h1>
                        <p className="text-xl md:text-2xl">{policy.description}</p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto py-12 px-4">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Policy Info */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-4">{policy.title}</h2>
                        <p className="text-gray-600 mb-6">{policy.description}</p>
                    </div>
                    
                    {/* TinyMCE Content with proper styling */}
                    <div className="prose prose-lg max-w-none">
                        <div 
                            className="rich-text-content"
                            dangerouslySetInnerHTML={{ __html: policy.content }} 
                            style={{
                                '& h1': { fontSize: '2em', fontWeight: 'bold', marginBottom: '0.5em' },
                                '& h2': { fontSize: '1.5em', fontWeight: 'bold', marginBottom: '0.5em' },
                                '& h3': { fontSize: '1.25em', fontWeight: 'bold', marginBottom: '0.5em' },
                                '& p': { marginBottom: '1em', lineHeight: '1.6' },
                                '& ul': { listStyleType: 'disc', marginLeft: '1.5em', marginBottom: '1em' },
                                '& ol': { listStyleType: 'decimal', marginLeft: '1.5em', marginBottom: '1em' },
                                '& li': { marginBottom: '0.5em' },
                                '& a': { color: '#2563eb', textDecoration: 'underline' },
                                '& img': { maxWidth: '100%', height: 'auto', margin: '1em 0' },
                                '& blockquote': { 
                                    borderLeft: '4px solid #e5e7eb',
                                    paddingLeft: '1em',
                                    marginLeft: '0',
                                    marginRight: '0',
                                    fontStyle: 'italic'
                                },
                                '& table': {
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    marginBottom: '1em'
                                },
                                '& th, & td': {
                                    border: '1px solid #e5e7eb',
                                    padding: '0.5em',
                                    textAlign: 'left'
                                },
                                '& th': {
                                    backgroundColor: '#f3f4f6',
                                    fontWeight: 'bold'
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PolicyDetail; 