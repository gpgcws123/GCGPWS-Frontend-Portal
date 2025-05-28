import React, { useState, useEffect } from 'react';
import ImageCard from '../../components/imageCard';
import ContentSection from '../../components/contextSection';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const TransportSection = () => {
    const [transportData, setTransportData] = useState({
        title: "Transport",
        description: "Our college provides reliable transportation services to ensure safe and convenient travel for students. Our fleet of well-maintained buses covers major routes, making daily commute hassle-free. Professional drivers and regular maintenance ensure safety and punctuality.",
        imageUrl: "/images/transport-default.jpg"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransportData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/facility?type=transport`);
                if (response.data && response.data.data) {
                    const data = Array.isArray(response.data.data)
                        ? response.data.data[0]
                        : response.data.data;

                    if (data && data.status === 'active') {
                        setTransportData({
                            title: data.title || transportData.title,
                            description: data.description || transportData.description,
                            imageUrl: data.images && data.images[0] ? `${BACKEND_URL}${data.images[0]}` : transportData.imageUrl
                        });
                    }
                }
            } catch (err) {
                console.error('Error fetching transport data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTransportData();
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
                        title={transportData.title}
                        description={transportData.description}
                    />
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <ImageCard
                        src={transportData.imageUrl}
                        width="580px"
                        height="460px"
                        alt="Transport Facility"
                    />
                </div>
            </div>
        </div>
    );
};

export default TransportSection;
