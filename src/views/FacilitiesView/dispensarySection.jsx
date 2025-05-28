import React, { useState, useEffect } from 'react';
import ImageCard from '../../components/imageCard';
import ContentSection from '../../components/contextSection';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const DispensarySection = () => {
    const [dispensaryData, setDispensaryData] = useState({
        title: "Dispensary",
        description: "Our college dispensary is equipped to handle basic medical needs and emergencies. Staffed with qualified healthcare professionals, it provides immediate medical attention and basic healthcare services. The facility maintains essential medicines and first-aid supplies to ensure student and staff well-being.",
        imageUrl: "/images/dispensary-default.jpg"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDispensaryData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/facility?type=dispensary`);
                if (response.data && response.data.data) {
                    const data = Array.isArray(response.data.data)
                        ? response.data.data[0]
                        : response.data.data;

                    if (data && data.status === 'active') {
                        setDispensaryData({
                            title: data.title || dispensaryData.title,
                            description: data.description || dispensaryData.description,
                            imageUrl: data.images && data.images[0] ? `${BACKEND_URL}${data.images[0]}` : dispensaryData.imageUrl
                        });
                    }
                }
            } catch (err) {
                console.error('Error fetching dispensary data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDispensaryData();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray">
            <div className="flex flex-col md:flex-row-reverse items-center justify-between max-w-[1350px] w-full p-8 gap-8">
                <div className="md:w-1/2">
                    <ContentSection
                        title={dispensaryData.title}
                        description={dispensaryData.description}
                    />
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <ImageCard
                        src={dispensaryData.imageUrl}
                        width="580px"
                        height="460px"
                        alt="Dispensary Facility"
                    />
                </div>
            </div>
        </div>
    );
};

export default DispensarySection;
