import React, { useEffect, useState } from "react";
import HeadingTitle from "../../components/heading";
import SimpleCard from "../../components/simpleCard";
import Button from "../../components/button";
import HeadingWithButton from "../../components/headingWithButton";
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const NewsSection = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/news-events/news/list`)
      .then(res => {
        console.log('Raw news response:', res);
        let news = [];
        if (res.data && Array.isArray(res.data.data)) {
          news = res.data.data;
        } else if (res.data && Array.isArray(res.data)) {
          news = res.data;
        }
        // Sort by date and take latest 3
        news.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
        setNewsData(news.slice(0, 3));
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
    <div className="bg-gray h-auto flex flex-col items-center px-8 py-16 text-black relative w-auto">
      {/* ✅ Heading */}
      <div className="w-full flex items-center justify-center relative mb-12">
        <HeadingTitle title="Latest News" width="220px" />
      </div>
      <HeadingWithButton 
        headingText="Trending News" 
        width="auto" 
        buttonText="All News" 
        to="/news/allnews" 
      />

      {/* ✅ Simple Cards Layout (No Swiper) */}
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
  );
};

export default NewsSection;
