import React, { useState, useEffect } from 'react';
import ImageCard from '../../components/imageCard';
import ContentSection from '../../components/contextSection';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const SportFitnessSection = () => {
    const [sportsData, setSportsData] = useState({
        title: "Sports & Fitness",
        description: "Our college offers comprehensive sports and fitness facilities to promote physical well-being and athletic excellence. With well-maintained grounds, modern equipment, and dedicated coaching staff, students can participate in various sports activities and fitness programs.",
        imageUrl: "/images/sports-default.jpg"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSportsData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/facility?type=sports`);
                if (response.data && response.data.data) {
                    const data = Array.isArray(response.data.data)
                        ? response.data.data[0]
                        : response.data.data;

                    if (data && data.status === 'active') {
                        setSportsData({
                            title: data.title || sportsData.title,
                            description: data.description || sportsData.description,
                            imageUrl: data.images && data.images[0] ? `${BACKEND_URL}${data.images[0]}` : sportsData.imageUrl
                        });
                    }
                }
            } catch (err) {
                console.error('Error fetching sports data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSportsData();
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
                        title={sportsData.title}
                        description={sportsData.description}
                    />
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <ImageCard
                        src={sportsData.imageUrl}
                        width="580px"
                        height="460px"
                        alt="Sports & Fitness Facility"
                    />
                </div>
            </div>
        </div>
    );
};

export default SportFitnessSection;
