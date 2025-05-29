import React, { useState, useEffect } from 'react';
import ImageCard from '../../components/imageCard';
import ContentSection from '../../components/contextSection';
import Button from '../../components/button';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const StudentHeroSection = () => {
    const [heroData, setHeroData] = useState({
        title: '',
        description: '',
        image: '',
        buttonText: 'Read More',
        buttonLink: '/student-portal'
    });

    useEffect(() => {
        fetchHeroData();
    }, []);

    const fetchHeroData = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/student-portal-hero`);
            if (response.data.success && response.data.data) {
                setHeroData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching hero data:', error);
        }
    };

    return (
        <div className="relative w-full mt-8 overflow-hidden bg-gray flex items-center justify-center">
            {/* Main Content Wrapper */}
            <div className='w-max-screen-[1280px] mx-auto'>
                <div className="flex flex-col md:flex-row mt-10 items-center justify-between max-w-screen-xl w-full py-8 gap-8">
                    {/* Text Section */}
                    <div className="md:w-1/2">
                        <ContentSection 
                            title={heroData.title || "Student Learning Portal"} 
                            description={heroData.description || "Access all your educational resources in one place. Download books, notes, and watch lecture videos to enhance your learning experience."}
                        />
                        <div className="mt-4">
                            <Button 
                                height="43px" 
                                width="145px" 
                                boxShadow={false} 
                                title={heroData.buttonText || "Read More"} 
                                to={heroData.buttonLink || "/student-portal"} 
                            />
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="md:w-1/2 flex justify-center">
                        <ImageCard 
                            src={heroData.image ? `${BACKEND_URL}/${heroData.image}` : '/placeholder-image.jpg'} 
                            width="580px" 
                            height="460px"
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentHeroSection;
