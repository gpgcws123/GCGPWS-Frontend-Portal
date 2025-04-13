import React from "react";
import HeadingTitle from "../../components/heading";
import SimpleCard from "../../components/simpleCard";
import Button from "../../components/button";
import { FaUsers, FaCalendarAlt, FaClock } from "react-icons/fa"; 

// ✅ Admission Images
import admissionImg1 from "../../assets/CoursImages.png";
import admissionImg2 from "../../assets/CoursImages.png";
import admissionImg3 from "../../assets/CoursImages.png";
import HeadingWithButton from "../../components/headingWithButton";
import AdmissionForm from "./Admissionform";

const AdmissionSection = () => {
  const admissionData = [
    {
      title: "BS Computer Science",
      image: admissionImg1,
      link: "/admission-details",
      seats: "56 seats",
      date: "16 August, 2024",
      duration: "4 years",
    },
    {
      title: "BS Information Technology",
      image: admissionImg2,
      link: "/admission-details",
      seats: "60 seats",
      date: "20 August, 2024",
      duration: "4 years",
    },
    {
      title: "BS Software Engineering",
      image: admissionImg3,
      link: "/admission-details",
      seats: "50 seats",
      date: "18 August, 2024",
      duration: "4 years",
    },
  ];

  return (
    <div className="bg-white h-auto flex flex-col items-center px-8 py-16 text-black relative container">
      {/* ✅ Heading */}
      <div className="w-full flex items-center justify-center relative mb-12">
        <HeadingTitle title="Admissions Open" width="320px" />
      </div>
      <HeadingWithButton headingText="Available Programs" width="auto" buttonText="View All Programs" />

      {/* ✅ Simple Cards Layout (No Swiper) */}
      <div className="w-full flex flex-wrap justify-between gap-10">
        {admissionData.map((program, index) => (
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
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover rounded-t-[10px]"
              />
            </div>

            {/* ✅ Information Section with Border around Each Icon */}
            <div className=" p-4 border-b-2  flex justify-between items-center bg-gray-200 text-black text-sm font-semibold">
              <div className="flex items-center gap-2">
                <span className="border border-black p-2 rounded-md"><FaUsers /></span> {program.seats}
              </div>
              <div className="flex items-center gap-2">
                <span className="border border-black p-2 rounded-md"><FaCalendarAlt /></span> {program.date}
              </div>
              <div className="flex items-center gap-2">
                <span className="border border-black p-2 rounded-md"><FaClock /></span> {program.duration}
              </div>
            </div>

            <div className="p-6 text-center flex-grow">
              <h2 className="text-[26px] font-jakarta font-semibold leading-8 mb-6">
                {program.title}
              </h2>
            </div>

            <div className=" flex justify-center">
            <Button
  rounded="rounded-none"
  height="43px"
  width="400px"
  className="px-8 bg-yellow-400 hover:bg-yellow-500" // Added hover effect
  boxShadow={false}
  title="Apply Online Now"
  to="/admission/admissionform" // This should match your route path
/>
            </div>
          </SimpleCard>
        ))}
      </div>
    </div>
  );
};

export default AdmissionSection;
