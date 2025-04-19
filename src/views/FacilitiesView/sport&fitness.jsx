import React from 'react';
import library from '../../assets/sports.jpg';
import ContentSection from '../../components/contextSection';
import HeadingTitle from '../../components/heading';

const SportFitnessSection = () => {
    return (
        <div className="relative w-full h-auto mt-8 overflow-hidden bg-gray flex flex-col items-center justify-center">
            
            {/* Title Section */}
            <div className="w-full text-center mt-5 mb-6">
                <HeadingTitle title="Sport&Fitness" width='300px' />
            </div>

            {/* Main Content Wrapper */}
            <div className="flex flex-col md:flex-row  justify-between max-w-[1350px] w-full p-8 gap-8">
                
                {/* Text Section */}
                <div className="md:w-1/2">
                    <ContentSection 
                        title="Sport&Fitness" 
                        description="The GPGCWS promotes physical well-being through a variety of sports and fitness activities. Students have access to playgrounds, indoor games, and basic gym facilities to stay active and healthy. Regular tournaments and practice sessions are organized to encourage team spirit and discipline. Sports events are an integral part of campus life, boosting confidence and leadership skills. The college ensures students maintain a balanced lifestyle alongside academics."
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

export default SportFitnessSection;
