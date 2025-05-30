import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const HeroSection = () => {
  const [heroData, setHeroData] = useState({
    title: '',
    description: '',
    images: []
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching hero data from:', `${BACKEND_URL}/api/homepage/hero`);
        const response = await axios.get(`${BACKEND_URL}/api/homepage/hero`);
        console.log('Full API response:', response);
        if (response.data.success && response.data.data) {
          console.log('Hero data received:', response.data.data);
          console.log('Images array:', response.data.data.images);
          setHeroData(response.data.data);
        } else {
          console.warn('No data or success false:', response.data);
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
        console.error('Error details:', error.response || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  useEffect(() => {
    if (!heroData.images || heroData.images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroData.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroData.images]);

  const currentImage =
    heroData.images && heroData.images.length > 0
      ? heroData.images[currentImageIndex].startsWith('http')
        ? heroData.images[currentImageIndex]
        : heroData.images[currentImageIndex].startsWith('/')
          ? `${BACKEND_URL}${heroData.images[currentImageIndex]}`
          : `${BACKEND_URL}/${heroData.images[currentImageIndex]}`
      : '';
  
  console.log('Current image index:', currentImageIndex);
  console.log('Total images:', heroData.images ? heroData.images.length : 0);
  console.log('Full image URL:', currentImage);

  console.log('Current image URL:', currentImage);

  return (
    <div className="relative w-full h-screen mt-16 overflow-hidden">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <AnimatePresence>
            {currentImage && (
              <motion.div
                key={currentImageIndex}
                className="absolute inset-0 w-full h-full z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <img
                  src={currentImage}
                  alt={`Slide ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Image load error:', e);
                    e.target.src = '/fallback-image.jpg'; // Make sure this exists in public folder
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {(heroData.title || heroData.description) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50 z-10">
              <h1 className="text-4xl font-bold sm:text-6xl font-jakarta text-white px-4 md:px-8">
                {heroData.title}
                {heroData.description && <br />}
                {heroData.description}
              </h1>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HeroSection;
