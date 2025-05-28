import React, { useState, useEffect } from "react";
import HeadingTitle from "../../components/heading";
import SimpleCard from "../../components/simpleCard";
import Button from "../../components/button";
import axios from 'axios';
import HeadingWithButton from "../../components/headingWithButton";

const BACKEND_URL = 'http://localhost:5000';

const AdmissionPoliciesSection = () => {
  const [policiesData, setPoliciesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/admissions?type=policy`);
        if (response.data.success) {
          // Sort by date and get latest 3
          const sortedData = response.data.data
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3);
          setPoliciesData(sortedData);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching policies:', error);
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/placeholder-image.jpg';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${BACKEND_URL}${imageUrl}`;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-gray h-auto flex flex-col items-center px-8 py-16 text-black relative w-auto">
      {/* ✅ Heading */}
      <div className="w-full flex items-center justify-center relative mb-12">
        <HeadingTitle title="Admission Policies" width="220px" />
      </div>
      <HeadingWithButton headingText="Important Policies" width="auto" buttonText="View All Policies" to="/admisson/alladmissonpolicies" />

      {/* ✅ Simple Cards Layout (No Swiper) */}
      <div className="w-full flex flex-wrap justify-between gap-10">
        {policiesData.map((policy) => (
          <SimpleCard
            key={policy._id}
            boxShadow={false}
            width="w-[400px]"
            height="h-[500px]"
            className="!p-0 flex flex-col justify-between rounded-[10px]"
          >
            <div className="relative w-full h-[250px] border-b-8 border-solid border-black">
              <img
                src={getImageUrl(policy.image)}
                alt={policy.title}
                className="w-full h-full object-cover rounded-t-[10px]"
              />
            </div>

            <div className="p-6 text-center">
              <h2 className="text-[26px] font-jakarta font-semibold leading-8 mb-6">
                {policy.title}
              </h2>
              <p className="text-gray-700 mb-4">{policy.description}</p>
            </div>

            <div className="flex justify-center">
              <Button
                rounded="rounded-t-[10px]"
                height="43px"
                width="400px"
                className="px-8"
                boxShadow={false}
                title="Read More"
                to={`/admission/policy/${policy._id}`}
              />
            </div>
          </SimpleCard>
        ))}
      </div>
    </div>
  );
};

export default AdmissionPoliciesSection;
