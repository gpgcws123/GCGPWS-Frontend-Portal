import React, { useEffect, useState } from 'react';
import axios from 'axios';
import heroImage from '../../assets/heroImage1.jpg';
import SimpleCard from '../../components/simpleCard';
import HeadingTitle from '../../components/heading';
import Button from '../../components/button';
import HeadingWithButton from '../../components/headingWithButton';
import PlayIcon from "../../assets/mdi_play.svg";
import lectureImg1 from "../../assets/CoursImages.png";
import lectureImg2 from "../../assets/CoursImages.png";
import lectureImg3 from "../../assets/CoursImages.png";

const AllCulturals = () => {
  const [culturalData, setCulturalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8000/api/cultural/list')
      .then(res => {
        setCulturalData(res.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const openVideoModal = (videoSrc) => {
    setCurrentVideo(videoSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideo("");
  };

  if (loading) return <div>Loading...</div>;

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
            All Your Class Books in One Place <br />
            Download. Read. Learn.
          </h1>
        </div>
      </div>

      <div className="bg-white h-auto flex flex-col items-center px-8 pb-8 mb-7 text-black relative w-auto">
        {/* ✅ Section Title */}
        <div className="w-full flex items-center justify-center relative mb-12 mt-12">
          <HeadingTitle title="Lecture Videos" width="220px" />
        </div>
        <HeadingWithButton headingText="Lecture Series" buttonText="" />

        {/* ✅ Lecture Cards */}
        <div className="w-full flex flex-wrap justify-center gap-10">
          {culturalData.map((video, index) => (
            <SimpleCard
              padding="0px"
              bgColor="bg-gray"
              key={index}
              className="w-[400px] h-[500px] flex flex-col justify-between items-center cursor-pointer"
            >
              <div
                className="bg-white shadow-lg rounded-lg overflow-hidden relative w-full h-[320px] cursor-pointer"
                onClick={() => openVideoModal(video.src)}
              >
                <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <img src={PlayIcon} alt="Play" className="w-12 h-12" />
                </div>
              </div>
              {/* Title */}
              <p className="p-3 text-center text-[20px] font-jakarta font-semibold">
                {video.title}
              </p>
              {/* Learn More Button */}
              <div className="w-full ">
                <Button
                  rounded="rounded-b-[10px]"
                  height="43px"
                  width="400px"
                  boxShadow={false}
                  title="Learn More"
                  to={`/cultural/${video._id}`}
                />
              </div>
            </SimpleCard>
          ))}
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
    </div>
  );
};

export default AllCulturals;
