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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/news-events/news/list`)
      .then(res => {
        console.log('Raw API response:', res);
        if (res.data && Array.isArray(res.data.data)) {
          setNewsData(res.data.data);
        } else if (res.data && Array.isArray(res.data)) {
          setNewsData(res.data);
        } else {
          console.error('Unexpected data structure:', res.data);
          setNewsData([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news:', err);
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
    </div>
  );
};

export default AllNewsView; 