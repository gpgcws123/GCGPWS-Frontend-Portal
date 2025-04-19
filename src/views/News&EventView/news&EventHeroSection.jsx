import React from 'react';
import ImageCard from '../../components/imageCard';
import library from '../../assets/newsandevents.jpg';
import ContentSection from '../../components/contextSection';
import Button from '../../components/button';

const NewsEventsHeroSection = () => {
    return (
        <div className="relative w-full h-screen mt-8 overflow-hidden bg-gray flex items-center justify-center">
            {/* Main Content Wrapper */}
            <div className="flex flex-col md:flex-row items-center justify-between max-w-[1350px] w-full p-8 gap-8">
                
                {/* Text Section */}
                <div className="md:w-1/2">
                    <ContentSection 
                        title="News&Events Details" 
                        description="Stay updated with the latest news, cultural videos, and upcoming events at GPGCWS. From campus highlights to exciting activities, this section keeps you connected with all that’s happening on campus."


                    />
                    <div className="mt-4">
                        <Button height="43px" width="145px" boxShadow={false} title="Read More" to="/download" />
                    </div>
                </div>

                {/* Image Section */}
                <div className="md:w-1/2 flex justify-center">
                    <ImageCard src={library} width="580px" height="460px" />
                </div>
            </div>
        </div>
    );
};

export default NewsEventsHeroSection;
