import React from 'react';
import heroImage2 from '../../assets/heroImage2.jpg';
import ContentSection from '../../components/contextSection';
import HeadingTitle from '../../components/heading';

const CompLabSection = () => {
    return (
        <div className="relative w-full h-auto mt-8 overflow-hidden bg-gray flex flex-col items-center justify-center">
            
            {/* Title Section */}
            <div className="w-full text-center mt-5 mb-6">
                <HeadingTitle title="Computer Lab" width='300px' />
            </div>

            {/* Main Content Wrapper */}
            <div className="flex flex-col md:flex-row  justify-between max-w-[1350px] w-full p-8 gap-8">
                
                {/* Text Section */}
                <div className="md:w-1/2">
                    <ContentSection 
                        title="Computer Lab" 
                        description="GPGCWS computer lab is fully equipped with modern systems and high-speed internet to support students in learning and practicing digital skills. It provides access to programming tools, online courses, and academic software essential for various disciplines. Whether it's coding, research, or working on projects, the lab offers a productive and tech-friendly space. Regular practical sessions ensure students gain hands-on experience and stay updated with current technologies.

                        "
                    />
                </div>

                {/* Image Section */}
                <div className="md:w-1/2 flex justify-center">
                    <img 
                        src={heroImage2} 
                        alt="College Library"
                        className="w-[580px] h-[400px] rounded-[10px] shadow-[4_10px_15px_rgba(0,0,0,0.3)]"
                    />
                </div>
            </div>
        </div>
    );
};

export default CompLabSection;
