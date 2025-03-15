import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import heroImage from '../../assets/heroImage.svg';
import heroImage1 from '../../assets/heroImage1.jpg';
import heroImage2 from '../../assets/heroImage3.jpg';
import heroImage3 from '../../assets/heroImage4.jpg';
import heroImage4 from '../../assets/heroImage5.jpg';
import heroImage5 from '../../assets/heroImage6.jpg';
import heroImage6 from '../../assets/heroImage7.jpg';

const HeroSection = () => {
  const images = [
    heroImage,
    heroImage1,
    heroImage2,
    heroImage3,
    heroImage4,
    heroImage5,
    heroImage6,
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-screen mt-16 overflow-hidden">
      <AnimatePresence>
        {images.map((image, index) =>
          index === currentImageIndex ? (
            <motion.div
              key={index}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
              
              }}
            />
          ) : null
        )}
      </AnimatePresence>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50">
        <h1 className="text-4xl font-bold sm:text-6xl text-white px-4 md:px-8">
          Welcome to Govt Post Graduate College For Girls, Sheikhupura
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
