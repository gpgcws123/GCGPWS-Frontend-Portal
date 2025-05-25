import React from 'react';
import library from '../../assets/library.jpg';
import FacilitySection from './FacilitySection';

const LibrarySection = () => {
    const defaultDescription = "The GPGCWS library is a vital part of academic life, offering a wide range of books, reference materials, and digital resources. It provides students with a calm and focused environment to study, conduct research, and enhance their knowledge beyond the classroom. Equipped with both traditional and modern facilities, the library supports learning across all departments. Whether preparing for exams or exploring new topics, students find the library a valuable resource throughout their academic journey.";

    return (
        <FacilitySection 
            facilityType="library"
            defaultTitle="Library"
            defaultImage={library}
            defaultDescription={defaultDescription}
        />
    );
};

export default LibrarySection;
