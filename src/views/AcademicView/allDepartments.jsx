import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/heroImage1.jpg';
import SimpleCard from '../../components/simpleCard';
import interImg from '../../assets/computer.jpg';
import graduateImg from '../../assets/math.jpg';
import postGradImg from '../../assets/urdu.jpg';
import HeadingTitle from '../../components/heading';
import Button from '../../components/button';
import HeadingWithButton from '../../components/headingWithButton';
import ContentSection from '../../components/contextSection';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const AllDepartment = () => {
  const [departmentsData, setDepartmentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/academic?type=department`);
        setDepartmentsData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setLoading(false);
      }
    };

    fetchDepartments();
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
            Explore Our Academic Departments <br />
            Centers of Excellence
          </h1>
        </div>
      </div>

      <div className="my-8 p-4 bg-white">
        <div className="my-8 text-center">
          <HeadingTitle title="Academic Departments" width="640px" />
        </div>
        <HeadingWithButton headingText="Departments" buttonText='' />

        <div className="flex flex-wrap justify-center gap-8 p-6">
          {departmentsData.map((department) => (
            <SimpleCard
              bgColor='bg-gray'
              key={department._id}
              padding='p-0'
              width="w-[380px]"
              height="h-[600px]"
              className="flex flex-col"
            >
              {/* ✅ Department Image */}
              <div className="w-[380px] h-[180px]">
                <img
                  src={getImageUrl(department.image)}
                  alt={department.title}
                  className="w-full h-full rounded-t-[10px] object-cover"
                />
              </div>

              {/* ✅ Department Details */}
              <div className="p-5 text-left flex flex-col flex-grow">
                <ContentSection 
                  title={department.title} 
                  description={department.description} 
                />
                
                {/* ✅ Button at the Bottom */}
                <div className="mt-auto pt-4">
                  <Link to={`/academic/department/${department._id}`}>
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
      </div>
    </div>
  );
};

export default AllDepartment;
