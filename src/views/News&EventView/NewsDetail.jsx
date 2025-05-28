import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HeadingTitle from '../../components/heading';

const BACKEND_URL = 'http://localhost:5000';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/news-events/${id}`)
      .then(res => {
        console.log('Fetched news data:', res.data);
        setNews(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
  if (!news) return <div className="w-full h-screen flex items-center justify-center">News not found.</div>;

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/placeholder-image.jpg';
    return `${BACKEND_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative w-full h-screen mt-16 bg-cover bg-center"
        style={{
          backgroundImage: `url(${getImageUrl(news.image)})`,
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold sm:text-6xl font-jakarta text-white px-4 md:px-8 mb-4">
            {news.title}
          </h1>
          <p className="text-xl sm:text-2xl text-white px-4 md:px-8">
            {new Date(news.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <HeadingTitle title="News Details" width="220px" className="mb-8" />
            
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: news.content }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;