import React, { useState, useEffect } from 'react';
import ImageCard from '../../components/imageCard';
import ContentSection from '../../components/contextSection';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:8000';

const LibrarySection = () => {
    const [libraryData, setLibraryData] = useState({
        title: "Library",
        description: "Our college library is a hub of knowledge and learning, featuring an extensive collection of academic resources, textbooks, research materials, and digital resources. The peaceful environment provides an ideal space for study and research.",
        imageUrl: "/images/library-default.jpg"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLibraryData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/facility?type=library`);
                if (response.data && response.data.data) {
                    const data = Array.isArray(response.data.data) 
                        ? response.data.data[0] 
                        : response.data.data;
                    
                    if (data && data.status === 'active') {
                        setLibraryData({
                            title: data.title || libraryData.title,
                            description: data.description || libraryData.description,
                            imageUrl: data.images && data.images[0] ? `${BACKEND_URL}${data.images[0]}` : libraryData.imageUrl
                        });
                    }
                }
            } catch (err) {
                console.error('Error fetching library data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLibraryData();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col md:flex-row items-center justify-between max-w-[1350px] w-full p-8 gap-8">
                <div className="md:w-1/2">
                    <ContentSection 
                        title={libraryData.title}
                        description={libraryData.description}
                    />
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <ImageCard 
                        src={libraryData.imageUrl}
                        width="580px"
                        height="460px"
                        alt="Library Facility"
                    />
                </div>
            </div>
        </div>
    );
};

export default LibrarySection;
