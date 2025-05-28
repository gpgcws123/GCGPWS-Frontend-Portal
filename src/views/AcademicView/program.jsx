import React, { useState, useEffect } from 'react';
import SimpleCard from '../../components/simpleCard';
import Button from '../../components/button';
import HeadingTitle from '../../components/heading';
import ContentSection from '../../components/contextSection';
import HeadingWithButton from '../../components/headingWithButton';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const ProgramSection = () => {
  const [programsData, setProgramsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/academic?type=program`);
        const sortedData = response.data.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);
        setProgramsData(sortedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching programs:', error);
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/placeholder-image.jpg';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${BACKEND_URL}${imageUrl}`;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {/* ✅ Heading */}
      <div className='my-7'>
        <HeadingTitle title="Programs" width='220px' />
      </div>
      <div className='px-4'>
        <HeadingWithButton headingText='Our Degree Programs at GPGCWS' buttonText='all programs here' to='/academic/allprograms' />
      </div>
      {/* ✅ Program Cards */}
      <div className="flex flex-wrap justify-center gap-8 p-6">
        {programsData.map((program) => (
          <SimpleCard
            bgColor='bg-gray'
            key={program._id}
            padding='p-0'
            width="w-[380px]"
            height="h-auto"
          >
            {/* ✅ Program Image */}
            <div className="w-[380px] h-[180px]">
              <img
                src={getImageUrl(program.image)}
                alt={program.title}
                className="w-full h-full rounded-t-[10px] object-cover"
              />
            </div>

            {/* ✅ Program Details */}
            <div className="p-5 text-left">
              <ContentSection 
                title={program.title} 
                description={program.description} 
              />

              {/* ✅ Button */}
              <div className="mt-4">
                <Link to={`/academic/program/${program._id}`}>
                  <Button
                    height="43px"
                    width="145px"
                    boxShadow={false}
                    title="View Details"
                  />
                </Link>
              </div>
            </div>
          </SimpleCard>
        ))}
      </div>
    </>
  );
};

export default ProgramSection;
