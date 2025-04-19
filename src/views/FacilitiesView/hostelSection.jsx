import React from 'react';
import library from '../../assets/hostel.jpg';
import ContentSection from '../../components/contextSection';
import HeadingTitle from '../../components/heading';

const HostelSection = () => {
    return (
        <div className="relative w-full h-auto mt-8 overflow-hidden bg-white flex flex-col items-center justify-center">
            
            {/* Title Section */}
            <div className="w-full text-center mb-6">
                <HeadingTitle title="Hostel" width='180px' />
            </div>

            {/* Main Content Wrapper */}
            <div className="flex flex-col md:flex-row  justify-between max-w-[1350px] w-full p-8 gap-8">
                
                {/* Text Section */}
                <div className="md:w-1/2">
                    <ContentSection 
                        title="Hostel" 
                        description="The GPGCWS hostel offers a safe and comfortable stay for students coming from distant areas. Rooms are well-ventilated, clean, and furnished with essential amenities. The hostel environment promotes discipline and encourages a focused academic routine. With regular supervision, healthy meals, and a friendly atmosphere, students feel right at home. Common areas for study and recreation help build a sense of community and belonging."
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

export default HostelSection;
