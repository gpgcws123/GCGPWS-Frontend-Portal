import React from 'react';
import canteen from '../../assets/canteen.jpg';
import FacilitySection from './FacilitySection';

const CanteenSection = () => {
    const defaultDescription = "Our college canteen offers fresh, hygienic, and affordable food options to students and staff. The spacious dining area provides a comfortable environment for meals and social interaction. With a diverse menu of snacks and beverages, the canteen caters to various tastes while maintaining quality standards. Regular cleanliness inspections and feedback systems ensure consistent service quality.";

    return (
        <FacilitySection 
            facilityId="canteen"
            defaultTitle="Canteen"
            defaultImage={canteen}
            defaultDescription={defaultDescription}
        />
    );
};

export default CanteenSection;
