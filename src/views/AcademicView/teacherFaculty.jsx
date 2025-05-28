import React, { useState, useEffect } from 'react';
import SimpleCard from '../../components/simpleCard';
import HeadingTitle from '../../components/heading';
import HeadingWithButton from '../../components/headingWithButton';
import { Link } from "react-router-dom";
import Button from '../../components/button';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const TeacherFacultyCard = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/academic?type=faculty`);
        const sortedData = response.data.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);
        setFacultyData(sortedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching faculty:', error);
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/placeholder-image.jpg';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${BACKEND_URL}${imageUrl}`;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-gray my-16 p-4">
      <div className='my-8 text-center'>
        <HeadingTitle title="Our Professional Teaching Faculty" width='640px'/>
      </div>
      <div>
        <HeadingWithButton headingText='Our Teachers Faculty at GPGCWS' buttonText='Meet Our Faculty' to='/academic/allteacherfaculty'/> 
      </div>
      <div className="flex flex-wrap justify-center gap-8 p-6 pb-7">
        {facultyData.map((teacher) => (
          <SimpleCard
            bgColor='bg-white'
            key={teacher._id}
            padding='p-0'
            width="w-[370px]"
            height="h-auto"
          >
            {/* ✅ Teacher Image */}
            <div className="h-[270px] w-full">
              <img
                src={getImageUrl(teacher.image)}
                alt={teacher.title}
                className="w-full h-full rounded-[10px] object-cover"
              />
            </div>

            {/* ✅ Teacher Details */}
            <div className="p-5 text-center">
              <h2 className="font-bold font-jakarta text-[32px]">{teacher.title}</h2>
              <p className="text-black font-poppins mb-2 font-medium text-[24px]">{teacher.description?.split(' - ')[0]}</p>
              <div className="flex justify-center mb-4">
                <span className="bg-black text-white px-7 py-1 font-jakarta rounded-[10px] text-[24px] font-bold">
                  {teacher.description?.split(' - ')[1] || 'Course'}
                </span>
              </div>
              <Link to={`/academic/faculty/${teacher._id}`}>
                <Button
                  height="43px"
                  width="145px"
                  boxShadow={false}
                  title="View Details"
                />
              </Link>
            </div>
          </SimpleCard>
        ))}
      </div>
    </div>
  );
};

export default TeacherFacultyCard;