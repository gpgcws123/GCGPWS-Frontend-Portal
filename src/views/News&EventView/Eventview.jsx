import React, { useEffect, useState } from "react";
import HeadingTitle from "../../components/heading";
import SimpleCard from "../../components/simpleCard";
import Button from "../../components/button";
import HeadingWithButton from "../../components/headingWithButton";
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const EventSection = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/news-events/events/list`)
      .then(res => {
        console.log('Raw events response:', res);
        let events = [];
        if (res.data && Array.isArray(res.data.data)) {
          events = res.data.data;
        } else if (res.data && Array.isArray(res.data)) {
          events = res.data;
        }
        // Sort by date and take latest 3
        events.sort((a, b) => new Date(b.date) - new Date(a.date));
        setEventData(events.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
        setLoading(false);
      });
  }, []);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/placeholder-image.jpg';
    return imageUrl.startsWith('http') ? imageUrl : `${BACKEND_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  };

  if (loading) return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="bg-white h-auto flex flex-col items-center px-8 py-8 text-black relative w-auto">
      {/* ✅ Heading */}
      <div className="w-full flex items-center justify-center relative mb-8">
        <HeadingTitle title="Events" width="220px" />
      </div>
      <HeadingWithButton 
        headingText="Upcoming Events in GPGCWS" 
        width="auto" 
        buttonText="All Events in GPGCWS" 
        to="/news/allevents" 
      />
  
      {/* ✅ Simple Cards Layout (No Swiper) */}
      <div className="w-full flex flex-wrap justify-center gap-6">
        {eventData.length > 0 ? (
          eventData.map((event, index) => (
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
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">No events available</div>
        )}
      </div>
    </div>
  );
};

export default EventSection;
