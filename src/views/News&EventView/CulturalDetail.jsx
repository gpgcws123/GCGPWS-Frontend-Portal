import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CulturalDetail = () => {
  const { id } = useParams();
  const [cultural, setCultural] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/cultural/${id}`)
      .then(res => {
        setCultural(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!cultural) return <div>Cultural activity not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{cultural.title}</h1>
      <div className="mb-4 text-gray-500">{cultural.date ? new Date(cultural.date).toLocaleDateString() : ''}</div>
      <img src={cultural.imageUrl || cultural.thumbnailUrl} alt={cultural.title} className="w-full h-80 object-cover rounded mb-6" />
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: cultural.content }} />
    </div>
  );
};

export default CulturalDetail;