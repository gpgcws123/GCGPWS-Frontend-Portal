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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/news-events/events/list`)
      .then(res => {
        console.log('Fetched events data:', res.data);
        setEventData(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
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
            All Your Class Books in One Place <br />
            Download. Read. Learn.
          </h1>
        </div>
      </div>

      <div className=" my-8 p-4 bg-white">
        <div className="my-8 text-center">
          <HeadingTitle title="Explore Our Featured Books" width="640px" />
        </div>
        <HeadingWithButton headingText="hello" buttonText='' />

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
                {/* Optionally, you can show date/monthYear if available in backend */}
                {event.date && (
                  <div className="absolute top-0 left-4 bg-black text-white px-4 py-2 rounded-b-[10px] text-center">
                    <div className="font-bold text-[22px]">{new Date(event.date).getDate().toString().padStart(2, '0')}</div>
                    <div className="text-base">{new Date(event.date).toLocaleString('default', { month: 'short', year: 'numeric' })}</div>
                  </div>
                )}
              </div>

              <div className="p-2 text-center">
                <h2 className="text-[26px] font-jakarta font-semibold leading-8 mb-2">
                  {event.title}
                </h2>
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
    </div>
  );
};

export default AllEventView;
