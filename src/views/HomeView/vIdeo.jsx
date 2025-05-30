import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import HeadingTitle from "../../components/heading";
import LeftArrowIcon from "../../assets/left-arrow-svgrepo-com.svg";
import RightArrowIcon from "../../assets/right-arrow-svgrepo-com.svg";
import PlayIcon from "../../assets/mdi_play.svg";
import videoThumbnail from "../../assets/CoursImages.png";

const BACKEND_URL = 'http://localhost:5000';



const VideoSection = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  
  // Fetch latest videos from cultural activities
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log('Fetching cultural videos...');
        const response = await axios.get(`${BACKEND_URL}/api/news-events/cultural/list`);
        
        if (response.data && Array.isArray(response.data.data)) {
          // Filter items with videos and limit to 5
          const videos = response.data.data
            .filter(item => item.video)
            .slice(0, 5)
            .map(item => ({
              title: item.title || 'Cultural Video',
              thumbnail: item.image ? `${BACKEND_URL}${item.image}` : videoThumbnail,
              src: `${BACKEND_URL}${item.video}`
            }));
          setVideoList(videos);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
        setVideoList([]);
      }
    };
    
    fetchVideos();
  }, []);

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
        <HeadingTitle title="Cultural Videos" width="300px" />
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
              <img 
                src={video.thumbnail} 
                alt={video.title || `Video ${index + 1}`} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = videoThumbnail;
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 text-center">
                <p className="truncate text-sm font-medium">{video.title}</p>
              </div>
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
