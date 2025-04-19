import React, { useState } from "react";
import HeadingTitle from "../../components/heading";
import HeadingWithButton from "../../components/headingWithButton";
import SimpleCard from "../../components/simpleCard";
import PlayIcon from "../../assets/mdi_play.svg";
import Button from "../../components/button"
// ✅ Lecture Thumbnails (Placeholder images)
import lectureImg1 from "../../assets/CoursImages.png";
import lectureImg2 from "../../assets/CoursImages.png";
import lectureImg3 from "../../assets/CoursImages.png";

// ✅ Lecture Video List
const videoList = [
  {
    thumbnail: lectureImg1,
    src: "/videos/lecture1.mp4",
    title: "Introduction to Physics - Lecture 01"
  },
  {
    thumbnail: lectureImg2,
    src: "/videos/lecture2.mp4",
    title: "Organic Chemistry - Lecture 02"
  },
  {
    thumbnail: lectureImg3,
    src: "/videos/lecture3.mp4",
    title: "Mathematics Algebra - Lecture 03"
  },
];

const LectureSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");

  const openVideoModal = (videoSrc) => {
    setCurrentVideo(videoSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideo("");
  };

  return (
    <div className="bg-white h-auto flex flex-col items-center px-8 pb-8 mb-7 text-black relative w-auto">
      {/* ✅ Section Title */}
      <div className="w-full flex items-center justify-center relative mb-12 mt-12">
        <HeadingTitle title="Lecture Videos" width="220px" />
      </div>
      <HeadingWithButton headingText="Lecture Series" width="auto" buttonText="View All Lectures" to="/student-portal/All-Lecture" />

      {/* ✅ Lecture Cards */}
      <div className="w-full flex flex-wrap justify-center gap-10">
        {videoList.map((video, index) => (
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
           <img src={video.thumbnail} alt={`Lecture ${index + 1}`} className="w-full h-full object-cover" />
           <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
             <img src={PlayIcon} alt="Play" className="w-12 h-12" />
           </div>
         </div>
       
         {/* Title */}
         <p className="p-3 text-center text-[20px] font-jakarta font-semibold">
           {video.title}
         </p>
       
         {/* Learn More Button */}
     
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
  );
};

export default LectureSection;
