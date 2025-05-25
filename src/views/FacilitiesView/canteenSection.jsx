import React, { useState, useEffect } from 'react';
import ImageCard from '../../components/imageCard';
import ContentSection from '../../components/contextSection';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:8000';

const CanteenSection = () => {
    const [canteenData, setCanteenData] = useState({
        title: "Canteen",
        description: "Our college canteen provides fresh, hygienic, and affordable food options for students and staff. The spacious dining area offers a comfortable environment for meals and refreshments. We maintain high standards of cleanliness and food quality to ensure a healthy dining experience.",
        imageUrl: "/images/canteen-default.jpg"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCanteenData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/facility?type=canteen`);
                if (response.data && response.data.data) {
                    const data = Array.isArray(response.data.data) 
                        ? response.data.data[0] 
                        : response.data.data;
                    
                    if (data && data.status === 'active') {
                        setCanteenData({
                            title: data.title || canteenData.title,
                            description: data.description || canteenData.description,
                            imageUrl: data.images && data.images[0] ? `${BACKEND_URL}${data.images[0]}` : canteenData.imageUrl
                        });
                    }
                }
            } catch (err) {
                console.error('Error fetching canteen data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCanteenData();
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
                        title={canteenData.title}
                        description={canteenData.description}
                    />
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <ImageCard 
                        src={canteenData.imageUrl}
                        width="580px"
                        height="460px"
                        alt="Canteen Facility"
                    />
                </div>
            </div>
        </div>
    );
};

export default CanteenSection;
