
import React from 'react';
import HeroSection from './heroSection';
import TopStories from './topStorie';
import Message from './principalMessae';
import CollegePromoSection from './whyChooseUs';
import Programs from './programs';
import GallerySection from './Gallery';
import VideoSection from './vIdeo';
import ContactForm from './contactus';

const Home = () => {
    return <div>
        <HeroSection />
        <TopStories />
        <Message />
        <CollegePromoSection />
        <Programs />
        
<GallerySection/>
<VideoSection/>
<ContactForm/>
    </div>
};

export default Home;