import React, { useState, useEffect } from 'react';
import ImageCard from '../../components/imageCard';
import library from '../../assets/academic.jpg';
import ContentSection from '../../components/contextSection';
import Button from '../../components/button';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const AcademicHeroSection = () => {
    const [heroData, setHeroData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/academic-hero`);
                if (response.data.success && response.data.data) {
                    setHeroData(response.data.data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching hero data:', error);
                setLoading(false);
            }
        };

        fetchHeroData();
    }, []);

    if (loading) {
        return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
    }

    // If no hero data, show default content
    const title = heroData?.title || "GPGCWS Academic Details";
    const description = heroData?.description || 
        "GPGCWS offers a variety of degree programs across multiple departments. Each department is led by qualified faculty dedicated to academic excellence. Students are guided and supported by experienced staff throughout their educational journey.";
    const buttonText = heroData?.buttonText || "Read More";
    const buttonLink = heroData?.buttonLink || "/academic";
    const imageUrl = heroData?.imageUrl ? `${BACKEND_URL}${heroData.imageUrl}` : library;

    return (
        <div className="relative w-full h-screen mt-8 overflow-hidden bg-gray flex items-center justify-center">
            {/* Main Content Wrapper */}
            <div className="flex flex-col md:flex-row items-center justify-between max-w-[1350px] w-full p-8 gap-8">
                
                {/* Text Section */}
                <div className="md:w-1/2">
                    <ContentSection 
                        title={title}
                        description={description}
                    />
                    <div className="mt-4">
                        <Button 
                            height="43px" 
                            width="145px" 
                            boxShadow={false} 
                            title={buttonText} 
                            to={buttonLink} 
                        />
                    </div>
                </div>

                {/* Image Section */}
                <div className="md:w-1/2 flex justify-center">
                    <ImageCard src={imageUrl} width="580px" height="460px" />
                </div>
            </div>
        </div>
    );
};

export default AcademicHeroSection;
