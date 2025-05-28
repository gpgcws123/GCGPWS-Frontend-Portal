import React, { useState, useEffect } from 'react';
import ImageCard from '../../components/imageCard';
import ContentSection from '../../components/contextSection';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const MasjidSection = () => {
    const [masjidData, setMasjidData] = useState({
        title: "Masjid",
        description: "Our college masjid serves as a peaceful sanctuary for prayer and spiritual reflection. The spacious and well-maintained facility accommodates daily prayers and special religious occasions. It provides a serene environment for students and staff to fulfill their religious obligations.",
        imageUrl: "/images/masjid-default.jpg"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMasjidData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/facility?type=masjid`);
                if (response.data && response.data.data) {
                    const data = Array.isArray(response.data.data)
                        ? response.data.data[0]
                        : response.data.data;

                    if (data && data.status === 'active') {
                        setMasjidData({
                            title: data.title || masjidData.title,
                            description: data.description || masjidData.description,
                            imageUrl: data.images && data.images[0] ? `${BACKEND_URL}${data.images[0]}` : masjidData.imageUrl
                        });
                    }
                }
            } catch (err) {
                console.error('Error fetching masjid data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMasjidData();
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
                        title={masjidData.title}
                        description={masjidData.description}
                    />
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <ImageCard
                        src={masjidData.imageUrl}
                        width="580px"
                        height="460px"
                        alt="Masjid Facility"
                    />
                </div>
            </div>
        </div>
    );
};

export default MasjidSection;
