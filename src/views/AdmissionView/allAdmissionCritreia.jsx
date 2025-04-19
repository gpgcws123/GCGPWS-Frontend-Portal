import React from 'react';
import heroImage from '../../assets/heroImage1.jpg';
import SimpleCard from '../../components/simpleCard';
import policyImg1 from "../../assets/notice.jpg";
import policyImg2 from "../../assets/office.jpg";
import policyImg3 from "../../assets/lists.jpg";
import HeadingTitle from '../../components/heading';
import Button from '../../components/button';
import HeadingWithButton from '../../components/headingWithButton';
import { FaUsers, FaCalendarAlt, FaClock } from "react-icons/fa"; 

const AllAdmissionCritreia = () => {
  const policiesData = [
     {
       title: "Admisssion Notice",
       image: policyImg1,
       link: "/policy-details",
     },
     {
        title: "Admisssion Notice",
        image: policyImg1,
        link: "/policy-details",
      },
      {
        title: "Admisssion Notice",
        image: policyImg1,
        link: "/policy-details",
      },
      {
        title: "Admisssion Notice",
        image: policyImg1,
        link: "/policy-details",
      },
     {
       title: "Admission Office",
       image: policyImg2,
       link: "/policy-details",
     },
     {
       title: "Last Years merit",
       image: policyImg3,
       link: "/policy-details",
     },
   ];
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
            All Your Class Books in One Place <br />
            Download. Read. Learn.
          </h1>
        </div>
      </div>

      
      <div className=" my-8 p-4 bg-white">
  <div className="my-8 text-center">
    <HeadingTitle title="Explore Our Featured Books" width="640px" />
  </div>
  <HeadingWithButton headingText="hello" buttonText='' />

  <div className="w-full flex flex-wrap justify-between gap-10">
        {policiesData.map((policy, index) => (
          <SimpleCard
          bgColor="bg-gray"
            key={index}
            boxShadow={false}
            width="w-[400px]"
            height="h-[500px]"
            className="!p-0 flex flex-col justify-between rounded-[10px]"
          >
            <div className="relative w-full h-[250px] ">
              <img
                src={policy.image}
                alt={policy.title}
                className="w-full h-full object-cover rounded-t-[10px]"
              />
            </div>

            <div className="p-6 text-center ">
              <h2 className="text-[30px] font-jakarta font-semibold leading-8 mb-6">
                {policy.title}
              </h2>
            </div>

            <div className="flex justify-center">
              <Button
                rounded="rounded-t-[10px]"
                height="43px"
                width="400px"
                className="px-8"
                boxShadow={false}
                title="Learn More"
               to='/academic/Detailpage'
              />
            </div>
          </SimpleCard>
        ))}
      </div>
</div>
    </div>
  );
};

export default AllAdmissionCritreia;
