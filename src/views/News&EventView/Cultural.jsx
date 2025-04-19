import React, { useState } from "react";
import HeadingTitle from "../../components/heading";
import HeadingWithButton from "../../components/headingWithButton";
import SimpleCard from "../../components/simpleCard";
import PlayIcon from "../../assets/mdi_play.svg";

// ✅ Cultural Images
import culturalImg1 from "../../assets/CoursImages.png";
import culturalImg2 from "../../assets/CoursImages.png";
import culturalImg3 from "../../assets/CoursImages.png";

// ✅ Dummy Video Source (Replace with your video links)
const videoList = [
  { thumbnail: culturalImg1, src: "/videos/sample1.mp4", title: "MSN Psychiatric Nurse Practitioner Program Info Session" },
  { thumbnail: culturalImg2, src: "/videos/sample2.mp4", title: "MSN Psychiatric Nurse Practitioner Program Info Session" },
  { thumbnail: culturalImg3, src: "/videos/sample3.mp4", title: "MSN Psychiatric Nurse Practitioner Program Info Session" },
];

const CulturalSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");

  const openVideoModal = (videoSrc) => {
    console.log("Opening Video Modal for:", videoSrc); // Debugging log
    setCurrentVideo(videoSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideo("");
  };

  return (
    <div className="bg-white h-auto flex flex-col items-center px-8 pb-8 mb-7 text-black relative w-auto">
      {/* ✅ Video Section */}
      <div className="w-full flex items-center justify-center relative mb-12 mt-12">
        <HeadingTitle title="Cultural Videos" width="220px" />
      </div>
      <HeadingWithButton headingText="Cultural Title" width="auto" buttonText="All Cultural"  to="/news/allcultural"/>
      
      <div className="w-full flex flex-wrap justify-center gap-10">
        {videoList.map((video, index) => (
          <SimpleCard padding="0px" bgColor="bg-gray" key={index} className="w-[400px] h-[500px] flex flex-col items-center cursor-pointer">
            <div 
              className="bg-white shadow-lg rounded-lg overflow-hidden relative w-full h-[370px] cursor-pointer"
              onClick={() => openVideoModal(video.src)}
            >
              <img src={video.thumbnail} alt={`Video ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <img src={PlayIcon} alt="Play" className="w-12 h-12" />
              </div>
            </div>
            <p className="mt-2 p-3 text-center text-[24px] font-jakarta font-semibold">{video.title}</p>
          </SimpleCard>
        ))}
      </div>

      {/* ✅ Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white p-9 rounded-lg relative w-[100%] max-w-[800px]">
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

export default CulturalSection;
