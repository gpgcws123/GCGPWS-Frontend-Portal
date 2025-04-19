import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SimpleCard from "../../components/simpleCard";
import Button from "../../components/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Import Swiper Navigation
import "swiper/css";
import "swiper/css/navigation"; // Import Navigation CSS
import LeftArrowIcon from "../../assets/left-arrow-svgrepo-com.svg";
import RightArrowIcon from "../../assets/right-arrow-svgrepo-com.svg";
import { useRef } from "react";
import HeadingTitle from "../../components/heading";
const NoticeBoard = () => {
  const notices = [
    "Notice for Orientation ",
    "Cultural Day at GPGCWS",
    "Public Holiday Notification",
    "Sports Event Details",
  ];

  const swiperRef = useRef(null);

  return (
    <div className=" text-black w-full p-6 ">
      <HeadingTitle title="Notice Board" width="250px" />
      <div className="flex mt-4 space-x-4">

        {/* Fixed Notice Board */}
        <SimpleCard
          className="bg-white flex justify-center items-center p-4 flex-col text-black h-[280px] "
        >
          <div>
            <p className="text-base">Recent Updates</p>
            <h3 className="font-bold text-[24px]">Notice Board</h3>

          </div>
          <Button title="View More" bgColor="#efff11" hoverColor="#F5FF70" className="mt-2 text-black py-1 px-3 " />
        </SimpleCard>

        {/* Swiper for Moving Cards */}
        <div className="relative w-3/4 h-32 ">
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
                <SimpleCard boxShadow={false} className="bg-white font-bold  h-[150px] flex items-center justify-center">
                  {notice}
                </SimpleCard>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons in Bottom-Right */}
          <div className="absolute   right-[50px] flex space-x-2">
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
