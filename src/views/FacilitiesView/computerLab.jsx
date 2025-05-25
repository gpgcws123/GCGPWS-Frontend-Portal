import React, { useState, useEffect } from 'react';
import ImageCard from '../../components/imageCard';
import ContentSection from '../../components/contextSection';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:8000';

const CompLabSection = () => {
    const [labData, setLabData] = useState({
        title: "Computer Lab",
        description: "Our state-of-the-art computer lab is equipped with modern computers and necessary software to support students' learning needs. The lab provides hands-on experience with latest technology and software tools essential for academic and professional development.",
        imageUrl: "/images/computer-lab-default.jpg"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLabData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/facility?type=computerLab`);
                if (response.data && response.data.data) {
                    const data = Array.isArray(response.data.data) 
                        ? response.data.data[0] 
                        : response.data.data;
                    
                    if (data && data.status === 'active') {
                        setLabData({
                            title: data.title || labData.title,
                            description: data.description || labData.description,
                            imageUrl: data.images && data.images[0] ? `${BACKEND_URL}${data.images[0]}` : labData.imageUrl
                        });
                    }
                }
            } catch (err) {
                console.error('Error fetching computer lab data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLabData();
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
                        title={labData.title}
                        description={labData.description}
                    />
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <ImageCard 
                        src={labData.imageUrl}
                        width="580px"
                        height="460px"
                        alt="Computer Lab Facility"
                    />
                </div>
            </div>
        </div>
    );
};

export default CompLabSection;
