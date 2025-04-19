import React from 'react';
import ImageCard from '../../components/imageCard';
import library from '../../assets/academic.jpg';
import ContentSection from '../../components/contextSection';
import Button from '../../components/button';

const AcademicHeroSection = () => {
    return (
        <div className="relative w-full h-screen mt-8 overflow-hidden bg-gray flex items-center justify-center">
            {/* Main Content Wrapper */}
            <div className="flex flex-col md:flex-row items-center justify-between max-w-[1350px] w-full p-8 gap-8">
                
                {/* Text Section */}
                <div className="md:w-1/2">
                    <ContentSection 
                        title="GPGCWS Academic Details" 
                        description="GPGCWS offers a variety of degree programs across multiple departments. Each department is led by qualified faculty dedicated to academic excellence. Students are guided and supported by experienced staff throughout their educational journey."


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

export default AcademicHeroSection;
