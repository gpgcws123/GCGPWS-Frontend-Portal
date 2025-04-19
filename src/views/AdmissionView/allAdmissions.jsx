import React from 'react';
import heroImage from '../../assets/heroImage1.jpg';
import SimpleCard from '../../components/simpleCard';
// ✅ Admission Images
import Computer from "../../assets/computer.jpg";
import Math from "../../assets/math.jpg";
import Engneering from "../../assets/enginereing.jpg";
import HeadingTitle from '../../components/heading';
import Button from '../../components/button';
import HeadingWithButton from '../../components/headingWithButton';
import { FaUsers, FaCalendarAlt, FaClock } from "react-icons/fa"; 

const AllAdmisson = () => {
 const admissionData = [
     {
       title: "BS Computer Science",
       image: Computer,
       link: "/admission-details",
       seats: "56 seats",
       date: "16 August, 2024",
       duration: "4 years",
     },
     {
       title: "BSC Math",
       image: Math,
       link: "/admission-details",
       seats: "60 seats",
       date: "20 August, 2024",
       duration: "4 years",
     },
     {
       title: "Fsc Pre Engineering",
       image: Engneering,
       link: "/admission-details",
       seats: "50 seats",
       date: "18 August, 2024",
       duration: "4 years",
     },
     {
        title: "Fsc Pre Engineering",
        image: Engneering,
        link: "/admission-details",
        seats: "50 seats",
        date: "18 August, 2024",
        duration: "4 years",
      },
      {
        title: "Fsc Pre Engineering",
        image: Engneering,
        link: "/admission-details",
        seats: "50 seats",
        date: "18 August, 2024",
        duration: "4 years",
      },
      {
        title: "Fsc Pre Engineering",
        image: Engneering,
        link: "/admission-details",
        seats: "50 seats",
        date: "18 August, 2024",
        duration: "4 years",
      },
      {
        title: "Fsc Pre Engineering",
        image: Engneering,
        link: "/admission-details",
        seats: "50 seats",
        date: "18 August, 2024",
        duration: "4 years",
      },
      {
        title: "Fsc Pre Engineering",
        image: Engneering,
        link: "/admission-details",
        seats: "50 seats",
        date: "18 August, 2024",
        duration: "4 years",
      },

      {
        title: "Fsc Pre Engineering",
        image: Engneering,
        link: "/admission-details",
        seats: "50 seats",
        date: "18 August, 2024",
        duration: "4 years",
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
                className="px-8 bg-yellow-400"
                boxShadow={false}
                title="Apply Online Now"
                to='/admission/admissionform'
              />
            </div>
          </SimpleCard>
        ))}
      </div>
</div>
    </div>
  );
};

export default AllAdmisson;
