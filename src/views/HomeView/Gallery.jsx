import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HeadingTitle from "../../components/heading";
import SimpleCard from "../../components/simpleCard";
import Button from "../../components/button";

// ✅ Arrow Icons
import LeftArrowIcon from "../../assets/left-arrow-svgrepo-com.svg";
import RightArrowIcon from "../../assets/right-arrow-svgrepo-com.svg";

// ✅ Gallery Images (fallback)
import galleryImg1 from "../../assets/Sport.jpg";
import galleryImg2 from "../../assets/Culture.jpg";
import galleryImg3 from "../../assets/convocation.jpg";
import galleryImg4 from "../../assets/independence.jpg";
import galleryImg5 from "../../assets/planting.jpg";

const BACKEND_URL = 'http://localhost:5000';

const GallerySection = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [eventList, setEventList] = useState([]);
  
  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log('Fetching events data...');
        const response = await axios.get(`${BACKEND_URL}/api/news-events/events/list`);
        
        if (response.data && Array.isArray(response.data.data)) {
          // Get top 5 events
          const events = response.data.data.slice(0, 5).map(item => ({
            date: item.date ? new Date(item.date).getDate().toString().padStart(2, '0') : '',
            monthYear: item.date ? new Date(item.date).toLocaleString('default', { month: 'short', year: 'numeric' }) : '',
            title: item.title,
            description: item.description,
            image: item.image ? `${BACKEND_URL}${item.image.startsWith('/') ? '' : '/'}${item.image}` : galleryImg1,
            _id: item._id
          }));
          setEventList(events);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setEventList(sessionData);
      }
    };
    
    fetchEvents();
  }, []);

  useEffect(() => {
    if (swiperInstance && swiperInstance.navigation && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  const sessionData = [
    {
      date: "06",
      monthYear: "Mar 2024",
      title: "Sport Day Celebration",
      description:
        "Join us for an energetic day filled with fun games, competitions, and team spirit at the annual GPGCWS Sports Day. ",
      image: galleryImg1,
      link: "/session-details",
    },
    {
      date: "12",
      monthYear: "Apr 2024",
      title: "Cultural Festival at GPGCWS",
      description:
        "Celebrate the rich traditions and diversity of our campus with music, art, and colorful performances. ",
      image: galleryImg2,
      link: "/session-details",
    },
    {
      date: "20",
      monthYear: "May 2024",
      title: "Convocation",
      description:
        "Celebrate academic success as we honor the graduating students in a formal ceremony filled with pride and achievement.",
      image: galleryImg3,
      link: "/session-details",
    },
    {
      date: "25",
      monthYear: "Jun 2024",
      title: "Engineering Innovations Seminar",
      description:
        "Discover the latest trends in engineering and how our program prepares you for success.",
      image: galleryImg4,
      link: "/session-details",
    },
    {
      date: "10",
      monthYear: "Jul 2024",
      title: "Data Science Career Opportunities",
      description:
        "Join us to learn about career prospects and advancements in Data Science.",
      image: galleryImg5,
      link: "/session-details",
    },
  ];

  return (
    <div className="bg-gray h-auto flex flex-col items-center px-8 py-8 text-black relative w-auto">
      {/* ✅ Centered Heading with Navigation Arrows on the Right */}
      <div className="w-full flex items-center justify-center relative mb-8">
        <HeadingTitle title="Gallery" width="220px" />

        {/* ✅ Navigation Arrows Positioned on the Right */}
        <div className="absolute right-0 flex gap-4">
          <div ref={prevRef} className="cursor-pointer z-10">
            <img src={LeftArrowIcon} alt="Left Arrow" className="w-10 h-10" />
          </div>
          <div ref={nextRef} className="cursor-pointer z-10">
            <img src={RightArrowIcon} alt="Right Arrow" className="w-10 h-10" />
          </div>
        </div>
      </div>

      {/* ✅ Swiper Slider with Pagination & Autoplay */}
      <Swiper
        modules={[Navigation, Pagination]}
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
        {(eventList.length > 0 ? eventList : sessionData).map((session, index) => (
          <SwiperSlide key={index} className="transition-transform duration-500 ease-in-out">
            <SimpleCard boxShadow={false} width="w-[400px]" height="h-[500px]" className="!p-0 flex flex-col justify-between">
              <div className="relative w-full h-[250px]">
                <img
                  src={session.image}
                  alt={session.title}
                  className="w-full h-full object-cover rounded-t-[10px]"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = galleryImg1;
                  }}
                />
                <div className="absolute top-0 left-4 bg-black text-white px-4 py-2 rounded-b-[10px] text-center">
                  <div className="font-bold  text-[22px]">{session.date}</div>
                  <div className="text-base">{session.monthYear}</div>
                </div>
              </div>

              <div className="p-2 text-center">
                <h2 className="text-[26px] font-jakarta font-semibold leading-8 mb-2">
                  {session.title}
                </h2>
                <p className="text-[18px] font-light font-poppins leading-6">
                  {session.description}
                </p>
              </div>

              <Button
                rounded="rounded-b-[10px]"
                height="43px"
                width="400px"
                boxShadow={false}
                title="Learn More"
                to={session._id ? `/events/${session._id}` : '/academic/Detailpage'}
              />
            </SimpleCard>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};

export default GallerySection;
