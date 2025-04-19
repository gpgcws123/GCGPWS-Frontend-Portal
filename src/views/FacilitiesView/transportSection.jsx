import React from 'react';
import library from '../../assets/transport.jpg';
import ContentSection from '../../components/contextSection';
import HeadingTitle from '../../components/heading';

const TransportSection = () => {
    return (
        <div className="relative w-full h-auto mt-8 overflow-hidden bg-gray flex flex-col items-center justify-center">
            
            {/* Title Section */}
            <div className="w-full text-center mt-5 mb-6">
                <HeadingTitle title="Transport" width='300px' />
            </div>

            {/* Main Content Wrapper */}
            <div className="flex flex-col md:flex-row  justify-between max-w-[1350px] w-full p-8 gap-8">
                
                {/* Text Section */}
                <div className="md:w-1/2">
                    <ContentSection 
                        title="Transport" 
                        description="The GPGCWS provides reliable transport facilities for students and staff, covering major routes in and around the city. Buses are well-maintained and operated on a fixed schedule to ensure timely arrival and departure. The service offers a safe and convenient travel option, reducing the stress of daily commuting. Experienced drivers and regular supervision ensure a smooth and disciplined journey. Transport support plays a key role in improving access to education for many students."
                        
                    />
                </div>

                {/* Image Section */}
                <div className="md:w-1/2 flex justify-center">
                    <img 
                        src={library} 
                        alt="College Library"
                        className="w-[580px] h-[400px] rounded-[10px] shadow-[4_10px_15px_rgba(0,0,0,0.3)]"
                    />
                </div>
            </div>
        </div>
    );
};

export default TransportSection;
