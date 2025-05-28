import React, { useState, useEffect } from 'react';
import SimpleCard from '../../components/simpleCard';
import Button from '../../components/button';
import HeadingTitle from '../../components/heading';
import ContentSection from '../../components/contextSection';
import HeadingWithButton from '../../components/headingWithButton';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const DepartmentSection = () => {
  const [departmentsData, setDepartmentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/academic?type=department`);
        const sortedData = response.data.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);
        setDepartmentsData(sortedData);
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
    <div className="max-w-[1360px] mx-auto mb-10 bg-white">
      {/* ✅ Heading */}
      <div className='my-7'>
        <HeadingTitle title="Departments" width='220px' />
      </div>
      <div className='px-4'>
        <HeadingWithButton headingText='Our Departments at GPGCWS' buttonText='all departments here' to='/academic/alldepartment' />
      </div>
      
      {/* ✅ Department Cards */}
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
  );
};

export default DepartmentSection;
