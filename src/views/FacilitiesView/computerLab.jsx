import React from 'react';
import computerLab from '../../assets/computer.jpg';
import FacilitySection from './FacilitySection';

const CompLabSection = () => {
    const defaultDescription = "Our state-of-the-art computer laboratory is equipped with modern computers and essential software, providing students with hands-on experience in various computer applications. The lab supports both academic coursework and practical skill development, ensuring students stay current with technological advancements. With high-speed internet access and regular maintenance, the facility offers an optimal environment for computer-based learning and research.";

    return (
        <FacilitySection 
            facilityId="computer-lab"
            defaultTitle="Computer Laboratory"
            defaultImage={computerLab}
            defaultDescription={defaultDescription}
        />
    );
};

export default CompLabSection;
