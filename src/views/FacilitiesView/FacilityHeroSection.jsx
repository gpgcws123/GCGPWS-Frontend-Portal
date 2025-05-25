import React, { useState, useEffect } from 'react';
import ImageCard from '../../components/imageCard';
import ContentSection from '../../components/contextSection';
import Button from '../../components/button';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:8000';

const FacilitiesHeroSection = () => {
    const [heroData, setHeroData] = useState({
        title: "Facilities Provide at GPGCWS",
        description: "GPGCWS offers a wide range of modern facilities to support student life and learning. Our well-stocked library, advanced computer labs, secure hostel, clean canteen, and peaceful masjid ensure a comfortable and enriching campus experience for all students.",
        buttonText: "Read More",
        buttonLink: "/facilities"
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/facility-hero`);
                if (response.data && response.data.data) {
                    const data = Array.isArray(response.data.data) 
                        ? response.data.data[0] 
                        : response.data.data;
                    
                    if (data && data.status === 'active') {
                        setHeroData({
                            title: data.title || heroData.title,
                            description: data.description || heroData.description,
                            imageUrl: data.imageUrl ? `${BACKEND_URL}${data.imageUrl}` : heroData.imageUrl,
                            buttonText: data.buttonText || heroData.buttonText,
                            buttonLink: data.buttonLink || heroData.buttonLink
                        });
                    }
                }
                setError(null);
            } catch (err) {
                console.error('Error fetching hero section:', err);
                setError('Failed to load hero section');
            } finally {
                setLoading(false);
            }
        };

        fetchHeroData();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen mt-8 overflow-hidden bg-gray flex items-center justify-center">
            {/* Main Content Wrapper */}
            <div className="flex flex-col md:flex-row items-center justify-between max-w-[1350px] w-full p-8 gap-8">
                {/* Text Section */}
                <div className="md:w-1/2">
                    <ContentSection 
                        title={heroData.title}
                        description={heroData.description}
                    />
                    <div className="mt-4">
                        <Button 
                            height="43px" 
                            width="145px" 
                            boxShadow={false} 
                            title={heroData.buttonText} 
                            to={heroData.buttonLink} 
                        />
                    </div>
                </div>

                {/* Image Section */}
                <div className="md:w-1/2 flex justify-center">
                    <ImageCard 
                        src={heroData.imageUrl} 
                        width="580px" 
                        height="460px" 
                        alt="Facilities Overview"
                    />
                </div>
            </div>
        </div>
    );
};

export default FacilitiesHeroSection;
