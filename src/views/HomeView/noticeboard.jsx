import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BaseCard from "../../components/simpleCard";
import Button from "../../components/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Import Swiper Navigation
import "swiper/css";
import "swiper/css/navigation"; // Import Navigation CSS
import LeftArrowIcon from "../../assets/left-arrow-svgrepo-com.svg";
import RightArrowIcon from "../../assets/right-arrow-svgrepo-com.svg";
import { useRef } from "react";

const NoticeBoard = () => {
  const notices = [
    "Notice for Orientation of BS Morning Program to be held on 22-October-2024 at college hall",
    "Notice for Orientation of BS Evening Program to be held on 24-October-2024 at college hall",
    "Public Holiday Notification",
    "Sports Event Details",
  ];

  const swiperRef = useRef(null);

  return (
    <div className="bg-[#b2b2b2] text-[#070707] p-6 relative">
      <h1 className="text-3xl font-bold text-center underline text-[#070707]">Notice Board</h1>
      <div className="flex mt-4 space-x-4">
        
        {/* Fixed Notice Board */}
        <BaseCard 
          className="bg-white flex justify-center items-center p-4 flex-col text-[#070707] h-[280px] "  
        >
          <div>
            <p className="text-base">Recent Updates</p>
            <h3 className="font-bold text-[24px]">Notice Board</h3>
          </div>
          <Button title="View More" bgColor="#efff11" hoverColor="#F5FF70" className="mt-2 text-[#070707] py-1 px-3 " />
        </BaseCard>

        {/* Swiper for Moving Cards */}
        <div className="relative w-3/4">
          <Swiper
            slidesPerView={3}
            loop={true}
            spaceBetween={20}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Navigation]}
            className="w-full"
          >
            {notices.map((notice, index) => (
              <SwiperSlide key={index}>
                <BaseCard className="bg-[#ffff] font-bold  h-[150px] flex items-center justify-center">
                  {notice}
                </BaseCard>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons in Bottom-Right */}
          <div className="absolute  bottom-0 right-[50px] flex space-x-2">
            <button
              className=" p-3   text-black hover:bg-gray-300"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <img src={LeftArrowIcon} alt="Left Arrow" className="w-8 h-8" />
            </button>
            <button
              className=" p-3   text-black hover:bg-gray-300"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <img src={RightArrowIcon} alt="Right Arrow" className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
