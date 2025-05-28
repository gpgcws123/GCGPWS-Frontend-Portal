import React, { useState, useEffect } from 'react';
import ImageCard from '../../components/imageCard';
import ContentSection from '../../components/contextSection';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const HostelSection = () => {
    const [hostelData, setHostelData] = useState({
        title: "Hostel",
        description: "Our college hostel provides a safe and comfortable living environment for students. With well-furnished rooms, 24/7 security, and modern amenities, we ensure students feel at home while focusing on their studies. The hostel promotes a community atmosphere that enhances the overall college experience.",
        imageUrl: "/images/hostel-default.jpg"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHostelData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/facility?type=hostel`);
                if (response.data && response.data.data) {
                    const data = Array.isArray(response.data.data)
                        ? response.data.data[0]
                        : response.data.data;

                    if (data && data.status === 'active') {
                        setHostelData({
                            title: data.title || hostelData.title,
                            description: data.description || hostelData.description,
                            imageUrl: data.images && data.images[0] ? `${BACKEND_URL}${data.images[0]}` : hostelData.imageUrl
                        });
                    }
                }
            } catch (err) {
                console.error('Error fetching hostel data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchHostelData();
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
                        title={hostelData.title}
                        description={hostelData.description}
                    />
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <ImageCard
                        src={hostelData.imageUrl}
                        width="580px"
                        height="460px"
                        alt="Hostel Facility"
                    />
                </div>
            </div>
        </div>
    );
};

export default HostelSection;
