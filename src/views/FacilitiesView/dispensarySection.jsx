import React from 'react';
import FacilitySection from './FacilitySection';

const DispensarySection = () => {
    const defaultDescription = "Our college dispensary provides essential medical care and first aid services to students and staff. Equipped with basic medical supplies and staffed by qualified healthcare professionals, it ensures immediate attention for health concerns. The facility maintains proper hygiene standards and keeps detailed medical records. Regular health check-ups and awareness programs are conducted to promote student wellness.";

    return (
        <FacilitySection 
            facilityId="dispensary"
            defaultTitle="Dispensary"
            defaultImage={dispensary}
            defaultDescription={defaultDescription}
        />
    );
};

export default DispensarySection;
