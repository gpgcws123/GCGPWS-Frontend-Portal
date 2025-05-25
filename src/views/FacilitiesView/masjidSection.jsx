import React from 'react';
import masjid from '../../assets/masjid.jpg';
import FacilitySection from './FacilitySection';

const MasjidSection = () => {
    const defaultDescription = "Our college masjid serves as a peaceful sanctuary for prayer and spiritual reflection. The spacious facility accommodates daily prayers and Friday congregations. Well-maintained with proper ablution areas and separate sections for male and female students, it provides a serene environment for worship. The masjid also serves as a center for Islamic studies and religious guidance.";

    return (
        <FacilitySection 
            facilityId="masjid"
            defaultTitle="Masjid"
            defaultImage={masjid}
            defaultDescription={defaultDescription}
        />
    );
};

export default MasjidSection;
