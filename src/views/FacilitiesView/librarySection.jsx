import React from 'react';
import library from '../../assets/library.jpg';
import ContentSection from '../../components/contextSection';
import HeadingTitle from '../../components/heading';

const LibrarySection = () => {
    return (
        <div className="relative w-full h-auto mt-8 overflow-hidden bg-white flex flex-col items-center justify-center">
            
            {/* Title Section */}
            <div className="w-full text-center mb-6">
                <HeadingTitle title="Library" width='180px' />
            </div>

            {/* Main Content Wrapper */}
            <div className="flex flex-col md:flex-row  justify-between max-w-[1350px] w-full p-8 gap-8">
                
                {/* Text Section */}
                <div className="md:w-1/2">
                    <ContentSection 
                        title=" Library" 
                        description="The GPGCWS library is a vital part of academic life, offering a wide range of books, reference materials, and digital resources. It provides students with a calm and focused environment to study, conduct research, and enhance their knowledge beyond the classroom. Equipped with both traditional and modern facilities, the library supports learning across all departments. Whether preparing for exams or exploring new topics, students find the library a valuable resource throughout their academic journey."
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

export default LibrarySection;
