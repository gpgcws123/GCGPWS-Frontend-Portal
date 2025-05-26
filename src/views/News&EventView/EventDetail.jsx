import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/events/${id}`)
      .then(res => {
        setEvent(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <div className="mb-4 text-gray-500">{new Date(event.date).toLocaleDateString()}</div>
      <img src={event.imageUrl} alt={event.title} className="w-full h-80 object-cover rounded mb-6" />
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: event.content }} />
    </div>
  );
};

export default EventDetail; 