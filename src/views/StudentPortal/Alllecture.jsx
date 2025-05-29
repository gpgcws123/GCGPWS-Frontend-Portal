import React, { useState, useEffect } from 'react';
import heroImage from '../../assets/heroImage1.jpg';
import SimpleCard from '../../components/simpleCard';
import HeadingTitle from '../../components/heading';
import Button from '../../components/button';
import HeadingWithButton from '../../components/headingWithButton';
import PlayIcon from "../../assets/mdi_play.svg";
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const AllLecture = () => {
  const [intermediateLectures, setIntermediateLectures] = useState([]);
  const [graduateLectures, setGraduateLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/student-portal?type=lecture`);
        if (response.data.success) {
          // Separate lectures by academic level
          const intermediate = response.data.data.filter(lecture => lecture.level === 'Intermediate');
          const graduate = response.data.data.filter(lecture => lecture.level === 'Graduate');
          
          setIntermediateLectures(intermediate);
          setGraduateLectures(graduate);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lectures:', error);
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/placeholder-image.jpg';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${BACKEND_URL}/${imageUrl}`;
  };

  const openVideoModal = (videoUrl) => {
    setCurrentVideo(`${BACKEND_URL}/${videoUrl}`);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideo("");
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div>
      {/* ✅ Hero Section */}
      <div
        className="relative w-full h-screen mt-16 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold sm:text-6xl font-jakarta text-white px-4 md:px-8">
            Watch Video Lectures <br />
            Learn at Your Own Pace
          </h1>
        </div>
      </div>

      {/* ✅ Intermediate Lectures Section */}
      <div className="bg-white h-auto flex flex-col items-center px-8 pb-8 mb-7 text-black relative w-auto">
        <div className="w-full flex items-center justify-center relative mb-12 mt-12">
          <HeadingTitle title="Intermediate Level Lectures" width="320px" />
        </div>
        <HeadingWithButton headingText="Lecture Series" buttonText="" />

        <div className="w-full flex flex-wrap justify-center gap-10">
          {intermediateLectures.map((lecture, index) => (
            <SimpleCard
              padding="0px"
              bgColor="bg-gray"
              key={index}
              className="w-[400px] h-[500px] flex flex-col justify-between items-center cursor-pointer"
            >
              <div
                className="bg-white shadow-lg rounded-lg overflow-hidden relative w-full h-[320px] cursor-pointer"
                onClick={() => openVideoModal(lecture.file)}
              >
                <img 
                  src={getImageUrl(lecture.image)} 
                  alt={lecture.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <img src={PlayIcon} alt="Play" className="w-12 h-12" />
                </div>
              </div>

              <div className="p-4 text-center">
                <h3 className="text-[20px] font-jakarta font-semibold mb-2">{lecture.title}</h3>
                <p className="text-gray-600">{lecture.subject}</p>
                <p className="text-gray-500 text-sm mt-2">Duration: {lecture.duration} minutes</p>
              </div>
            </SimpleCard>
          ))}
        </div>
      </div>

      {/* ✅ Graduate Lectures Section */}
      <div className="bg-gray h-auto flex flex-col items-center px-8 pb-8 mb-7 text-black relative w-auto">
        <div className="w-full flex items-center justify-center relative mb-12 mt-12">
          <HeadingTitle title="Graduate Level Lectures" width="320px" />
        </div>
        <HeadingWithButton headingText="Lecture Series" buttonText="" />

        <div className="w-full flex flex-wrap justify-center gap-10">
          {graduateLectures.map((lecture, index) => (
            <SimpleCard
              padding="0px"
              bgColor="bg-white"
              key={index}
              className="w-[400px] h-[500px] flex flex-col justify-between items-center cursor-pointer"
            >
              <div
                className="bg-white shadow-lg rounded-lg overflow-hidden relative w-full h-[320px] cursor-pointer"
                onClick={() => openVideoModal(lecture.file)}
              >
                <img 
                  src={getImageUrl(lecture.image)} 
                  alt={lecture.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <img src={PlayIcon} alt="Play" className="w-12 h-12" />
                </div>
              </div>

              <div className="p-4 text-center">
                <h3 className="text-[20px] font-jakarta font-semibold mb-2">{lecture.title}</h3>
                <p className="text-gray-600">{lecture.subject}</p>
                <p className="text-gray-500 text-sm mt-2">Duration: {lecture.duration} minutes</p>
              </div>
            </SimpleCard>
          ))}
        </div>
      </div>

      {/* ✅ Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white p-9 rounded-lg relative w-full max-w-[800px]">
            <button
              onClick={closeModal}
              className="absolute z-20 top-2 right-2 text-black text-2xl font-bold"
            >
              ✖
            </button>
            <video
              src={currentVideo}
              className="w-full h-[400px] rounded"
              controls
              autoPlay
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllLecture;
