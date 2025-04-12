import React from 'react';
import ImageCard from '../../components/imageCard';
import library from '../../assets/library.jpg';
import ContentSection from '../../components/contextSection';
import Button from '../../components/button';

const AdmissionHeroSection = () => {
    return (
        <div className="relative w-full h-screen mt-8 overflow-hidden bg-gray flex items-center justify-center">
            {/* Main Content Wrapper */}
            <div className="flex flex-col md:flex-row items-center justify-between max-w-[1350px] w-full p-8 gap-8">
                
                {/* Text Section */}
                <div className="md:w-1/2">
                    <ContentSection 
                        title="GPcws college festial event" 
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum felis, sed ullamcorper tempus faucibus in imperdiet. Semper justo mauris sed fusce erat aenean tristique."
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

export default AdmissionHeroSection;
