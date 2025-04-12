import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import HeadingTitle from "../../components/heading";
import LeftArrowIcon from "../../assets/left-arrow-svgrepo-com.svg";
import RightArrowIcon from "../../assets/right-arrow-svgrepo-com.svg";
import PlayIcon from "../../assets/mdi_play.svg";
// ✅ Dummy Video Thumbnails (Replace with your images)
import videoThumbnail from "../../assets/CoursImages.png";

// ✅ Dummy Video Source (Replace with your video links)
const videoList = [
  { thumbnail: videoThumbnail, src: "/videos/sample1.mp4" },
  { thumbnail: videoThumbnail, src: "/videos/sample2.mp4" },
  { thumbnail: videoThumbnail, src: "/videos/sample3.mp4" },
  { thumbnail: videoThumbnail, src: "/videos/sample4.mp4" },
];

const VideoSection = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");

  useEffect(() => {
    if (swiperInstance && swiperInstance.navigation && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  const openVideoModal = (videoSrc) => {
    setCurrentVideo(videoSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideo("");
  };

  return (
    <div className="bg-gray h-auto flex flex-col items-center px-8 py-8 text-black relative w-auto">
      {/* ✅ Heading with Arrows */}
      <div className="w-full flex items-center justify-center relative mb-8">
        <HeadingTitle title="Videos" width="220px" />
        <div className="absolute right-0 flex gap-4">
          <div ref={prevRef} className="cursor-pointer z-10">
            <img src={LeftArrowIcon} alt="Left" className="w-8 h-8" />
          </div>
          <div ref={nextRef} className="cursor-pointer z-10">
            <img src={RightArrowIcon} alt="Right" className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* ✅ Swiper */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={setSwiperInstance}
        className="w-full"
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {videoList.map((video, index) => (
          <SwiperSlide key={index}>
            <div
              className="bg-white shadow-lg rounded-lg overflow-hidden relative w-[400px] h-[250px] mx-auto cursor-pointer"
              onClick={() => openVideoModal(video.src)}
            >
              <img src={video.thumbnail} alt={`Video ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <img src={PlayIcon} alt="Play" className="w-12 h-12" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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

export default VideoSection;
