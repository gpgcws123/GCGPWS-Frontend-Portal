
import React from 'react';
import HeroSection from './heroSection';
import TopStories from './topStorie';
import NoticeBoard from './noticeboard';
import Message from './Message';
import StudentRecord from './studentRecord';
import DegreePrograms from './programs';
import ProfessionalStaff from './staff';
const Home = () => {
    return <div>
        <HeroSection/>
        <TopStories/>
        <NoticeBoard/>
        <Message/>
        <StudentRecord/>
        <DegreePrograms/>
        <ProfessionalStaff/>
    
        
    </div>
};

export default Home;