import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/news/${id}`)
      .then(res => {
        setNews(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!news) return <div>News not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
      <div className="mb-4 text-gray-500">{new Date(news.date).toLocaleDateString()}</div>
      <img src={news.imageUrl} alt={news.title} className="w-full h-80 object-cover rounded mb-6" />
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: news.content }} />
    </div>
  );
};

export default NewsDetail; 