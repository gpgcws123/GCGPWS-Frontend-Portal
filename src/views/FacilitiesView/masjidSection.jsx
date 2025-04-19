import React from 'react';
import library from '../../assets/masjid.jpg';
import ContentSection from '../../components/contextSection';
import HeadingTitle from '../../components/heading';

const MasjidSection = () => {
    return (
        <div className="relative w-full h-auto mt-8 overflow-hidden bg-white flex flex-col items-center justify-center">
            
            {/* Title Section */}
            <div className="w-full text-center mb-6">
                <HeadingTitle title="Masjid" width='180px' />
            </div>

            {/* Main Content Wrapper */}
            <div className="flex flex-col md:flex-row  justify-between max-w-[1350px] w-full p-8 gap-8">
                
                {/* Text Section */}
                <div className="md:w-1/2">
                    <ContentSection 
                        title="Masjid" 
                        description="The GPGCWS masjid provides a peaceful and respectful space for students and staff to offer prayers during the day. It is centrally located on campus and remains open during all prayer times. The masjid promotes spiritual growth and encourages a sense of discipline and community among students. Clean and well-maintained, it accommodates congregational prayers and occasional religious gatherings. It serves as a calm retreat within the academic environment."
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

export default MasjidSection;
