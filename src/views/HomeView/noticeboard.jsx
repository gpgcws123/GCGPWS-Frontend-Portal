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
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import HeadingTitle from "../../components/heading";

const BACKEND_URL = 'http://localhost:5000';
const NoticeBoard = () => {
  const [noticeData, setNoticeData] = useState({
    title: "Notice Board",
    description: "Recent Updates",
    buttonText: "View More",
    buttonLink: "/notices",
    items: [
      "Notice for Orientation",
      "Cultural Day at GPGCWS",
      "Public Holiday Notification",
      "Sports Event Details",
    ]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoticeData = async () => {
      try {
        console.log('Fetching notice data from:', `${BACKEND_URL}/api/homepage/noticeboard`);
        const timestamp = new Date().getTime();
        const response = await axios.get(`${BACKEND_URL}/api/homepage/noticeboard?t=${timestamp}`);
        console.log('Notice data response:', response.data);
        
        if (response.data && response.data.success && response.data.data) {
          const data = response.data.data;
          setNoticeData({
            title: data.title || "Notice Board",
            description: data.description || "Recent Updates",
            buttonText: data.buttonText || "View More",
            buttonLink: data.buttonLink || "/notices",
            items: Array.isArray(data.items) && data.items.length > 0
              ? data.items.map(item => item.title || item.description || "Notice")
              : [
                "Notice for Orientation",
                "Cultural Day at GPGCWS",
                "Public Holiday Notification",
                "Sports Event Details",
              ]
          });
        }
      } catch (error) {
        console.error('Error fetching notice data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticeData();
  }, []);

  const swiperRef = useRef(null);

  if (loading) {
    return (
      <div className="text-black w-full p-6">
        <HeadingTitle title="Notice Board" width="250px" />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className=" text-black w-full p-6 ">
      <HeadingTitle title={noticeData.title} width="250px" />
      <div className="flex mt-4 space-x-4">

        {/* Fixed Notice Board */}
        <SimpleCard
          className="bg-white flex justify-center items-center p-4 flex-col text-black h-[280px] "
        >
          <div>
            <p className="text-base">{noticeData.description}</p>
            <h3 className="font-bold text-[24px]">{noticeData.title}</h3>

          </div>
          <Button 
            title={noticeData.buttonText} 
            bgColor="#efff11" 
            hoverBgColor="#F5FF70" 
            className="mt-2 text-black py-1 px-3" 
            to={noticeData.buttonLink}
          />
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
            {noticeData.items.map((notice, index) => (
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
