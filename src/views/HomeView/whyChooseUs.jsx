import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SimpleCard from '../../components/simpleCard'; // Adjust path as needed

// Fallback image
import fallbackImg from '../../assets/Graduate.svg';

const BACKEND_URL = 'http://localhost:5000';

const CollegePromoSection = () => {
    const [whyChooseData, setWhyChooseData] = useState({
        title: "Why Choose Us?",
        description: "Choosing the right college shapes your future and GPGCWS stands out as the preferred choice for those seeking quality education, personal growth, and career success. With experienced faculty and a dynamic learning environment, we empower students to explore, innovate, and achieve their full potential.",
        items: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWhyChooseData = async () => {
            try {
                console.log('Fetching why choose us data from:', `${BACKEND_URL}/api/homepage/whychooseus`);
                const timestamp = new Date().getTime();
                const response = await axios.get(`${BACKEND_URL}/api/homepage/whychooseus?t=${timestamp}`);
                console.log('Why choose us data response:', response.data);
                
                if (response.data && response.data.success && response.data.data) {
                    const data = response.data.data;
                    setWhyChooseData({
                        title: data.title || "Why Choose Us?",
                        description: data.description || "Choosing the right college shapes your future...",
                        items: Array.isArray(data.items) ? data.items : []
                    });
                }
            } catch (error) {
                console.error('Error fetching why choose us data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWhyChooseData();
    }, []);

    // Default items if no data is loaded from API
    const defaultItems = [
        {
            title: "Academics",
            description: "At GPGCWS, we prioritize academic excellence through a balanced blend of theory and practical learning.",
            image: fallbackImg
        },
        {
            title: "Career Success",
            description: "GPGCWS equips students for career success through skill-building, counseling, internships, and job placement support.",
            image: fallbackImg
        },
        {
            title: "Highly Experienced",
            description: "Our experienced faculty combines academic expertise with real-world insight, guiding and inspiring students.",
            image: fallbackImg
        },
        {
            title: "Location",
            description: "Ideally located, GPGCWS offers a peaceful learning environment with easy access to city resources.",
            image: fallbackImg
        }
    ];

    // Use items from API if available, otherwise use defaults
    const displayItems = whyChooseData.items && whyChooseData.items.length > 0 
        ? whyChooseData.items 
        : defaultItems;

    if (loading) {
        return (
            <div className="bg-gray flex flex-col h-full items-center py-8">
                <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-gray flex flex-col h-full items-center py-8">
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="p-6 max-w-8xl w-full mt-24 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Left Column - Heading and Paragraph */}
                        <div className="flex flex-col ml-14 justify-center">
                            <h2 className="text-[40px] text-Black font-jakarta font-semibold mb-6">{whyChooseData.title}</h2>
                            <p className="text-2xl font-normal font-poppins text-Black">
                                {whyChooseData.description}
                            </p>
                        </div>

                        {/* Right Column - 2x2 Grid of Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-9 justify-items-center">
                            {displayItems.map((item, index) => (
                                <SimpleCard 
                                    key={index}
                                    width='w-full' 
                                    height='h-[330px]' 
                                    padding="p-4" 
                                    className="flex flex-col items-center text-center max-w-xs"
                                >
                                    <SimpleCard 
                                        width="w-20" 
                                        bgColor='bg-gray' 
                                        height='h-20' 
                                        padding="p-4"
                                    >
                                        <img 
                                            src={item.image 
                                                ? (item.image.startsWith('http') 
                                                    ? item.image 
                                                    : item.image.startsWith('/') 
                                                        ? `${BACKEND_URL}${item.image}` 
                                                        : `${BACKEND_URL}/${item.image}`)
                                                : fallbackImg} 
                                            alt={item.title} 
                                            className="w-12 h-12 object-contain"
                                            onError={(e) => {
                                                console.error('Failed to load image:', item.image);
                                                e.target.src = fallbackImg;
                                            }}
                                        />
                                    </SimpleCard>
                                    <h3 className="font-semibold text-[28px] font-jakarta mt-3">{item.title}</h3>
                                    <p className="text-[15px] font-poppins text-Black">
                                        {item.description}
                                    </p>
                                </SimpleCard>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollegePromoSection;