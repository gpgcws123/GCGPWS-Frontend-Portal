import React, { useState, useEffect } from 'react';
import ImageCard from '../../components/imageCard';
import library from '../../assets/newsandevents.jpg';
import ContentSection from '../../components/contextSection';
import Button from '../../components/button';
import SimpleCard from '../../components/simpleCard';
import HeadingTitle from '../../components/heading';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const NewsEventsHeroSection = () => {
    const [newsData, setNewsData] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [heroData, setHeroData] = useState({
        title: "News & Events Details",
        description: "Stay updated with the latest news, cultural videos, and upcoming events at GPGCWS. From campus highlights to exciting activities, this section keeps you connected with all that's happening on campus.",
        buttonText: "Read More",
        buttonLink: "/news/allnews",
        imageUrl: null
    });

    useEffect(() => {
        Promise.all([
            axios.get(`${BACKEND_URL}/api/news-events/news/list`),
            axios.get(`${BACKEND_URL}/api/news-events/events/list`),
            axios.get(`${BACKEND_URL}/api/hero-section`)
        ])
        .then(([newsRes, eventsRes, heroRes]) => {
            // Process news data
            let news = [];
            if (newsRes.data && Array.isArray(newsRes.data.data)) {
                news = newsRes.data.data;
            } else if (newsRes.data && Array.isArray(newsRes.data)) {
                news = newsRes.data;
            }
            news.sort((a, b) => new Date(b.date) - new Date(a.date));
            setNewsData(news.slice(0, 3));

            // Process events data
            let events = [];
            if (eventsRes.data && Array.isArray(eventsRes.data.data)) {
                events = eventsRes.data.data;
            } else if (eventsRes.data && Array.isArray(eventsRes.data)) {
                events = eventsRes.data;
            }
            events.sort((a, b) => new Date(b.date) - new Date(a.date));
            setEventData(events.slice(0, 3));

            // Process hero data
            if (heroRes.data && heroRes.data.data) {
                const hero = heroRes.data.data;
                setHeroData({
                    title: hero.title || heroData.title,
                    description: hero.description || heroData.description,
                    buttonText: hero.buttonText || heroData.buttonText,
                    buttonLink: hero.buttonLink || heroData.buttonLink,
                    imageUrl: hero.imageUrl || null
                });
            }

            setLoading(false);
        })
        .catch((err) => {
            console.error('Error fetching data:', err);
            setLoading(false);
        });
    }, []);

    const getImageUrl = (imageUrl) => {
        if (!imageUrl) return '/placeholder-image.jpg';
        return imageUrl.startsWith('http') ? imageUrl : `${BACKEND_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
    };

    if (loading) return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
        <div className="relative w-full h-screen mt-8 overflow-hidden bg-gray flex items-center justify-center">
            {/* Main Content Wrapper */}
            <div className="flex flex-col md:flex-row items-center justify-between max-w-[1350px] w-full p-8 gap-8">
                {/* Text Section */}
                <div className="md:w-1/2">
                    <ContentSection 
                            title={heroData.title}
                            description={heroData.description}
                    />
                    <div className="mt-4">
                            <Button 
                                height="43px" 
                                width="145px" 
                                boxShadow={false} 
                                title={heroData.buttonText} 
                                to={heroData.buttonLink}
                            />
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="md:w-1/2 flex justify-center">
                        <ImageCard 
                            src={heroData.imageUrl ? getImageUrl(heroData.imageUrl) : library}
                            width="580px" 
                            height="460px" 
                            alt="News and Events"
                        />
                    </div>
                </div>
            </div>

            {/* News Section */}
            <div className="py-16 px-8">
                <HeadingTitle title="Latest News" width="220px" className="mb-8 text-center" />
                <div className="w-full flex flex-wrap justify-center gap-10">
                    {newsData.map((news, index) => (
                        <SimpleCard
                            key={news._id || index}
                            boxShadow={false}
                            width="w-[400px]"
                            height="h-[500px]"
                            className="!p-0 flex flex-col justify-between rounded-[10px]"
                        >
                            <div className="relative w-full h-[250px] border-b-8 border-solid border-black">
                                <img
                                    src={getImageUrl(news.image)}
                                    alt={news.title}
                                    className="w-full h-full object-cover rounded-t-[10px]"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/placeholder-image.jpg';
                                    }}
                                />
                            </div>

                            <div className="p-6 text-center">
                                <h2 className="text-[26px] font-jakarta font-semibold leading-8 mb-6">
                                    {news.title}
                                </h2>
                            </div>

                            <div className="pb-6 flex justify-center">
                                <Button
                                    rounded="rounded-[10px]"
                                    height="43px"
                                    width="auto"
                                    className="px-8"
                                    boxShadow={false}
                                    title="Read More"
                                    to={`/news/${news._id}`}
                                />
                            </div>
                        </SimpleCard>
                    ))}
                </div>
            </div>

            {/* Events Section */}
            <div className="py-16 px-8 bg-white">
                <HeadingTitle title="Upcoming Events" width="220px" className="mb-8 text-center" />
                <div className="w-full flex flex-wrap justify-center gap-6">
                    {eventData.map((event, index) => (
                        <SimpleCard
                            bgColor="bg-gray"
                            key={event._id || index}
                            boxShadow={false}
                            width="w-[400px]"
                            height="h-[500px]"
                            className="!p-0 flex flex-col justify-between"
                        >
                            <div className="relative w-full h-[250px]">
                                <img
                                    src={getImageUrl(event.image)}
                                    alt={event.title}
                                    className="w-full h-full object-cover rounded-t-[10px]"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/placeholder-image.jpg';
                                    }}
                                />
                                {event.date && (
                                    <div className="absolute top-0 left-4 bg-black text-white px-4 py-2 rounded-b-[10px] text-center">
                                        <div className="font-bold text-[22px]">
                                            {new Date(event.date).getDate().toString().padStart(2, '0')}
                                        </div>
                                        <div className="text-base">
                                            {new Date(event.date).toLocaleString('default', { month: 'short', year: 'numeric' })}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-2 text-center">
                                <h2 className="text-[26px] font-jakarta font-semibold leading-8 mb-2">
                                    {event.title}
                                </h2>
                                <p className="text-[18px] font-light font-poppins leading-6">
                                    {event.description}
                                </p>
                </div>

                            <Button
                                rounded="rounded-b-[10px]"
                                height="43px"
                                width="400px"
                                boxShadow={false}
                                title="Learn More"
                                to={`/events/${event._id}`}
                            />
                        </SimpleCard>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsEventsHeroSection;
