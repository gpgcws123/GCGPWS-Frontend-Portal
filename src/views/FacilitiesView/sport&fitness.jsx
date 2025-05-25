import React from 'react';
import sports from '../../assets/sports.jpg';
import FacilitySection from './FacilitySection';

const SportFitnessSection = () => {
    const defaultDescription = "Our sports and fitness facilities promote physical well-being and athletic excellence. The college offers well-maintained grounds for various sports including cricket, basketball, and volleyball. Indoor facilities include table tennis and fitness equipment. Regular sports events and competitions help develop team spirit and leadership skills among students.";

    return (
        <FacilitySection 
            facilityId="sports"
            defaultTitle="Sports & Fitness"
            defaultImage={sports}
            defaultDescription={defaultDescription}
        />
    );
};

export default SportFitnessSection;
