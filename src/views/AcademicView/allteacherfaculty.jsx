import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/heroImage1.jpg';
import SimpleCard from '../../components/simpleCard';
import HeadingTitle from '../../components/heading';
import HeadingWithButton from '../../components/headingWithButton';
import Button from '../../components/button';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const AllTeacherFaculty = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/academic?type=faculty`);
        // Sort by date and get latest 3
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
    <div>
      {/* ✅ Hero Section */}
      <div
        className="relative w-full h-screen mt-16 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold sm:text-6xl font-jakarta text-white px-4 md:px-8">
            Meet Our Faculty Members <br />
            Excellence in Education
          </h1>
        </div>
      </div>

      <div className="my-8 p-4 bg-white">
        <div className="my-8 text-center">
          <HeadingTitle title="Our Distinguished Faculty" width="640px" />
        </div>
        <HeadingWithButton headingText="Faculty Members" buttonText='' />
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
                {/* Add View Details Button */}
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
    </div>
  );
};

export default AllTeacherFaculty;
