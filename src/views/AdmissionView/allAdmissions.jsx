import React, { useState, useEffect } from 'react';
import SimpleCard from '../../components/simpleCard';
import HeadingTitle from '../../components/heading';
import Button from '../../components/button';
import HeadingWithButton from '../../components/headingWithButton';
import { FaUsers, FaCalendarAlt, FaClock } from "react-icons/fa"; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdmissionHeroSection from './admissionHeroSection';

const BACKEND_URL = 'http://localhost:5000';

const AllAdmisson = () => {
  const [admissionData, setAdmissionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/admissions?type=admission`);
        if (response.data.success) {
          const sortedData = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setAdmissionData(sortedData);
        } else {
          setAdmissionData([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching admissions:', error);
        setAdmissionData([]);
        setLoading(false);
      }
    };

    fetchAdmissions();
  }, []);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/placeholder-image.jpg';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${BACKEND_URL}${imageUrl}`;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <AdmissionHeroSection />

      <div className="my-8 p-4 bg-white">
        <div className="my-8 text-center">
          <HeadingTitle title="Current Admissions" width="640px" />
        </div>
        <HeadingWithButton headingText="Open Admissions" buttonText="" />

        <div className="w-full flex flex-wrap justify-between gap-10">
          {admissionData.map((program) => (
            <SimpleCard
              bgColor="bg-gray"
              key={program._id}
              boxShadow={false}
              width="w-[400px]"
              height="h-[500px]"
              className="!p-0 flex flex-col justify-between rounded-[10px]"
            >
              <div className="relative w-full h-[250px]">
                <img
                  src={getImageUrl(program.image)}
                  alt={program.title}
                  className="w-full h-full object-cover rounded-t-[10px]"
                />
              </div>

              <div className="p-4 border-b-2 flex justify-between items-center bg-gray-200 text-black text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <span className="border border-black p-2 rounded-md"><FaUsers /></span> {program.seats || 'Limited Seats'}
                </div>
                <div className="flex items-center gap-2">
                  <span className="border border-black p-2 rounded-md"><FaCalendarAlt /></span> {new Date(program.endDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <span className="border border-black p-2 rounded-md"><FaClock /></span> {program.duration || '4 years'}
                </div>
              </div>

              <div className="p-6 text-center flex-grow">
                <h2 className="text-[26px] font-jakarta font-semibold leading-8 mb-6">
                  {program.title}
                </h2>
              </div>

              <div className="flex justify-center">
                <Link to={`/admission/details/${program._id}`}>
                  <Button
                    rounded="rounded-none"
                    height="43px"
                    width="400px"
                    className="px-8 bg-yellow-400"
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

export default AllAdmisson;
