import React, { useState, useEffect } from 'react';
import heroImage from '../../assets/heroImage1.jpg';
import SimpleCard from '../../components/simpleCard';
import HeadingTitle from '../../components/heading';
import Button from '../../components/button';
import HeadingWithButton from '../../components/headingWithButton';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const AllAdmissionCritreia = () => {
  const [criteriaData, setCriteriaData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/admissions?type=criteria`);
        if (response.data.success) {
          const sortedData = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setCriteriaData(sortedData);
        } else {
          setCriteriaData([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching admission criteria:', error);
        setCriteriaData([]);
        setLoading(false);
      }
    };

    fetchCriteria();
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
            Admission Criteria <br />
            Eligibility Requirements
          </h1>
        </div>
      </div>

      <div className="my-8 p-4 bg-white">
        <div className="my-8 text-center">
          <HeadingTitle title="Admission Requirements" width="640px" />
        </div>
        <HeadingWithButton headingText="Program Requirements" buttonText="" />

        <div className="w-full flex flex-wrap justify-between gap-10">
          {criteriaData.map((criteria) => (
            <SimpleCard
              key={criteria._id}
              boxShadow={false}
              width="w-[400px]"
              height="h-[500px]"
              className="!p-0 flex flex-col justify-between rounded-[10px]"
            >
              <div className="relative w-full h-[250px] border-b-8 border-solid border-black">
                <img
                  src={getImageUrl(criteria.image)}
                  alt={criteria.title}
                  className="w-full h-full object-cover rounded-t-[10px]"
                />
              </div>

              <div className="p-6 text-center flex-grow">
                <h2 className="text-[26px] font-jakarta font-semibold leading-8 mb-6">
                  {criteria.title}
                </h2>
                <p className="text-gray-700 mb-4">{criteria.description}</p>
              </div>

              <div className="flex justify-center">
                <Link to={`/admission/criteria/${criteria._id}`}>
                  <Button
                    rounded="rounded-t-[10px]"
                    height="43px"
                    width="400px"
                    className="px-8"
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

export default AllAdmissionCritreia;
