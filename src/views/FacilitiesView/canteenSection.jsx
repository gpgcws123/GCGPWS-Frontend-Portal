import React from 'react';
import library from '../../assets/canteen.jpg';
import ContentSection from '../../components/contextSection';
import HeadingTitle from '../../components/heading';

const CanteenSection = () => {
    return (
        <div className="relative w-full h-auto mt-8 overflow-hidden bg-white flex flex-col items-center justify-center">
            
            {/* Title Section */}
            <div className="w-full text-center mb-6">
                <HeadingTitle title="Canteen" width='180px' />
            </div>

            {/* Main Content Wrapper */}
            <div className="flex flex-col md:flex-row  justify-between max-w-[1350px] w-full p-8 gap-8">
                
                {/* Text Section */}
                <div className="md:w-1/2">
                    <ContentSection 
                        title="Canteen" 
                        description="The GPGCWS canteen provides hygienic and affordable food options to students and staff throughout the day. It offers a variety of snacks, meals, and beverages to suit different tastes. The seating area is clean, spacious, and designed for comfort during breaks. It serves as a popular spot for relaxation, social interaction, and refreshing in-between classes. Strict quality checks ensure that food safety and cleanliness are always maintained."
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

export default CanteenSection;
