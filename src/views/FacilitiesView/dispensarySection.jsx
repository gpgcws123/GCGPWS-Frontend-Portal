import React from 'react';
import library from '../../assets/dispansary.jpg';
import ContentSection from '../../components/contextSection';
import HeadingTitle from '../../components/heading';

const DispensarySection = () => {
    return (
        <div className="relative w-full h-auto mt-8 overflow-hidden bg-gray flex flex-col items-center justify-center">
            
            {/* Title Section */}
            <div className="w-full text-center mt-5 mb-6">
                <HeadingTitle title="Dispensary" width='300px' />
            </div>

            {/* Main Content Wrapper */}
            <div className="flex flex-col md:flex-row  justify-between max-w-[1350px] w-full p-8 gap-8">
                
                {/* Text Section */}
                <div className="md:w-1/2">
                    <ContentSection 
                        title="Dispensary" 
                        description="The GPGCWS dispensary provides basic medical facilities and first aid to students and staff during college hours. It is managed by a qualified medical professional who handles minor health issues and emergencies on campus. The dispensary ensures prompt care and maintains essential medicines and equipment. Health awareness sessions and regular checkups are also organized to promote well-being. It serves as a reliable support system for students' physical health needs."
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

export default DispensarySection;
