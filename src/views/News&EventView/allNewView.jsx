import React, { useEffect, useState } from 'react';
import axios from 'axios';
import heroImage from '../../assets/heroImage1.jpg';
import SimpleCard from '../../components/simpleCard';
import HeadingTitle from '../../components/heading';
import HeadingWithButton from '../../components/headingWithButton';
import Button from '../../components/button';

const BACKEND_URL = 'http://localhost:5000';

const AllNewsView = () => {
  const [newsData, setNewsData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`${BACKEND_URL}/api/news-events/news/list`),
      axios.get(`${BACKEND_URL}/api/news-events/events/list`)
    ])
    .then(([newsRes, eventsRes]) => {
      console.log('Raw News API response:', newsRes);
      console.log('Raw Events API response:', eventsRes);
      
      // Handle news data
      if (newsRes.data && Array.isArray(newsRes.data.data)) {
        setNewsData(newsRes.data.data);
      } else if (newsRes.data && Array.isArray(newsRes.data)) {
        setNewsData(newsRes.data);
      }

      // Handle events data
      if (eventsRes.data && Array.isArray(eventsRes.data.data)) {
        setEventsData(eventsRes.data.data);
      } else if (eventsRes.data && Array.isArray(eventsRes.data)) {
        setEventsData(eventsRes.data);
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
    return imageUrl.startsWith('http') ? imageUrl : `${BACKEND_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  };

  if (loading) return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative w-full h-screen mt-16 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold sm:text-6xl font-jakarta text-white px-4 md:px-8">
            Latest News and Updates
          </h1>
        </div>
      </div>

      {/* News Section */}
      <div className="my-8 p-4 bg-white">
        <div className="my-8 text-center">
          <HeadingTitle title="Latest News" width="640px" />
        </div>
        <HeadingWithButton headingText="Stay Updated with GPGCWS" buttonText="" />

        <div className="w-full flex flex-wrap justify-center gap-10">
          {newsData.length > 0 ? (
            newsData.map((news, index) => (
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
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">No news available</div>
          )}
        </div>
      </div>

      {/* Events Section */}
      <div className="my-8 p-4 bg-gray-50">
        <div className="my-8 text-center">
          <HeadingTitle title="Latest Events" width="640px" />
        </div>
        <HeadingWithButton headingText="Upcoming Events" buttonText="" />

        <div className="w-full flex flex-wrap justify-center gap-10">
          {eventsData.length > 0 ? (
            eventsData.map((event, index) => (
              <SimpleCard
                key={event._id || index}
                boxShadow={false}
                width="w-[400px]"
                height="h-[500px]"
                className="!p-0 flex flex-col justify-between rounded-[10px]"
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
                    <div className="absolute top-0 left-4 bg-black text-white px-4 py-2 rounded-b-lg">
                      <div className="text-lg font-bold">
                        {new Date(event.date).getDate().toString().padStart(2, '0')}
                      </div>
                      <div className="text-base">
                        {new Date(event.date).toLocaleString('default', { month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 text-center">
                  <h2 className="text-[26px] font-jakarta font-semibold leading-8 mb-2">
                    {event.title}
                  </h2>
                  <p className="text-[18px] font-light font-poppins leading-6">
                    {event.description}
                  </p>
                </div>

                <div className="pb-6 flex justify-center">
                  <Button
                    rounded="rounded-[10px]"
                    height="43px"
                    width="auto"
                    className="px-8"
                    boxShadow={false}
                    title="Learn More"
                    to={`/events/${event._id}`}
                  />
                </div>
              </SimpleCard>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">No events available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllNewsView; 