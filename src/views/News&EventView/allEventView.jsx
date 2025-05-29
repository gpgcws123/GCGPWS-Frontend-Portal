import React, { useEffect, useState } from 'react';
import axios from 'axios';
import heroImage from '../../assets/heroImage1.jpg';
import SimpleCard from '../../components/simpleCard';
import HeadingTitle from '../../components/heading';
import Button from '../../components/button';
import HeadingWithButton from '../../components/headingWithButton';
import { FaUsers, FaCalendarAlt, FaClock } from "react-icons/fa";

// ✅ Gallery Images
import galleryImg1 from "../../assets/Sport.jpg";
import galleryImg2 from "../../assets/Culture.jpg";
import galleryImg3 from "../../assets/convocation.jpg";

const BACKEND_URL = 'http://localhost:5000';

const AllEventView = () => {
  const [eventData, setEventData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`${BACKEND_URL}/api/news-events/events/list`),
      axios.get(`${BACKEND_URL}/api/news-events/news/list`)
    ])
    .then(([eventsRes, newsRes]) => {
      console.log('Raw events response:', eventsRes);
      console.log('Raw news response:', newsRes);
      
      // Handle events data
      if (eventsRes.data && Array.isArray(eventsRes.data.data)) {
        setEventData(eventsRes.data.data);
      } else if (eventsRes.data && Array.isArray(eventsRes.data)) {
        setEventData(eventsRes.data);
      }

      // Handle news data
      if (newsRes.data && Array.isArray(newsRes.data.data)) {
        setNewsData(newsRes.data.data);
      } else if (newsRes.data && Array.isArray(newsRes.data)) {
        setNewsData(newsRes.data);
      }

      setLoading(false);
    })
    .catch((err) => {
      console.error('Error fetching data:', err);
      setLoading(false);
    });
  }, []);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/placeholder-image.jpg';
    return `${BACKEND_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  };

  if (loading) return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;

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
            Events & Activities
          </h1>
        </div>
      </div>

      {/* Events Section */}
      <div className="my-8 p-4 bg-white">
        <div className="my-8 text-center">
          <HeadingTitle title="Upcoming Events" width="640px" />
        </div>
        <HeadingWithButton headingText="Events at GPGCWS" buttonText="" />

        <div className="w-full flex flex-wrap justify-center gap-6">
          {eventData.map((event, index) => (
            <SimpleCard
              bgColor="bg-gray"
              key={event._id || index}
              boxShadow={false}
              width="w-[400px]"
              height="h-[500px]"
              className="!p-0 flex flex-col justify-between"
            >
              <div className="relative w-full h-[250px]">
                <img
                  src={getImageUrl(event.image)}
                  alt={event.title}
                  className="w-full h-full object-cover rounded-t-[10px]"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
                {event.date && (
                  <div className="absolute top-0 left-4 bg-black text-white px-4 py-2 rounded-b-[10px] text-center">
                    <div className="font-bold text-[22px]">
                      {new Date(event.date).getDate().toString().padStart(2, '0')}
                    </div>
                    <div className="text-base">
                      {new Date(event.date).toLocaleString('default', { month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-2 text-center">
                <h2 className="text-[26px] font-jakarta font-semibold leading-8 mb-2">
                  {event.title}
                </h2>
                {event.date && (
                  <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                    <FaCalendarAlt />
                    <span>
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}
                <p className="text-[18px] font-light font-poppins leading-6">
                  {event.description}
                </p>
              </div>

              <Button
                rounded="rounded-b-[10px]"
                height="43px"
                width="400px"
                boxShadow={false}
                title="Learn More"
                to={`/events/${event._id}`}
              />
            </SimpleCard>
          ))}
        </div>
      </div>

      {/* News Section */}
      <div className="my-8 p-4 bg-gray-50">
        <div className="my-8 text-center">
          <HeadingTitle title="Related News" width="640px" />
        </div>
        <HeadingWithButton headingText="Latest Updates" buttonText="" />

        <div className="w-full flex flex-wrap justify-center gap-10">
          {newsData.map((news, index) => (
            <SimpleCard
              key={news._id || index}
              boxShadow={false}
              width="w-[400px]"
              height="h-[500px]"
              className="!p-0 flex flex-col justify-between rounded-[10px]"
            >
              <div className="relative w-full h-[250px] border-b-8 border-solid border-black">
                <img
                  src={getImageUrl(news.image)}
                  alt={news.title}
                  className="w-full h-full object-cover rounded-t-[10px]"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
              </div>

              <div className="p-6 text-center">
                <h2 className="text-[26px] font-jakarta font-semibold leading-8 mb-6">
                  {news.title}
                </h2>
              </div>

              <div className="pb-6 flex justify-center">
                <Button
                  rounded="rounded-[10px]"
                  height="43px"
                  width="auto"
                  className="px-8"
                  boxShadow={false}
                  title="Read More"
                  to={`/news/${news._id}`}
                />
              </div>
            </SimpleCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllEventView;
