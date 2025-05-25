import React from 'react';
import hostel from '../../assets/hostel.jpg';
import FacilitySection from './FacilitySection';

const HostelSection = () => {
    const defaultDescription = "Our college hostel provides a comfortable and secure living environment for students from distant areas. The facility offers well-furnished rooms, clean washrooms, and regular maintenance services. With 24/7 security, dedicated wardens, and proper mess facilities, we ensure students feel at home. The hostel environment promotes academic focus while fostering community living and lifelong friendships.";

    return (
        <FacilitySection 
            facilityId="hostel"
            defaultTitle="Hostel"
            defaultImage={hostel}
            defaultDescription={defaultDescription}
        />
    );
};

export default HostelSection;
