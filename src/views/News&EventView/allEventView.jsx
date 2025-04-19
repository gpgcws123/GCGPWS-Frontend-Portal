import React from 'react';
import heroImage from '../../assets/heroImage1.jpg';
import SimpleCard from '../../components/simpleCard';

// ✅ Gallery Images
import galleryImg1 from "../../assets/Sport.jpg";
import galleryImg2 from "../../assets/Culture.jpg";
import galleryImg3 from "../../assets/convocation.jpg";
import HeadingTitle from '../../components/heading';
import Button from '../../components/button';
import HeadingWithButton from '../../components/headingWithButton';
import { FaUsers, FaCalendarAlt, FaClock } from "react-icons/fa"; 

const AllEventView = () => {
   const sessionData = [
      {
        date: "06",
        monthYear: "Mar 2024",
        title: "Sports Day Celebration",
        description:
          "Join us for an energetic day filled with fun games, competitions, and team spirit at the annual GPGCWS Sports Day.",
        image: galleryImg1,
        link: "/session-details",
      },
      {
        date: "12",
        monthYear: "Apr 2024",
        title: "Cultural Festival at GPGCWS",
        description:
          "Celebrate the rich traditions and diversity of our campus with music, art, and colorful performances. ",
        image: galleryImg2,
        link: "/session-details",
      },
      {
        date: "20",
        monthYear: "May 2024",
        title: "Convocation",
        description:
          "Celebrate academic success as we honor the graduating students in a formal ceremony filled with pride and achievement.",
        image: galleryImg3,
        link: "/session-details",
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

  <div className="w-full flex flex-wrap justify-center gap-6">
        {sessionData.map((session, index) => (
          <SimpleCard
          bgColor="bg-gray"
            key={index}
            boxShadow={false}
            width="w-[400px]"
            height="h-[500px]"
            className="!p-0 flex flex-col justify-between"
          >
            <div className="relative w-full h-[250px]">
              <img
                src={session.image}
                alt={session.title}
                className="w-full h-full object-cover rounded-t-[10px]"
              />
              <div className="absolute top-0 left-4 bg-black text-white px-4 py-2 rounded-b-[10px] text-center">
                <div className="font-bold text-[22px]">{session.date}</div>
                <div className="text-base">{session.monthYear}</div>
              </div>
            </div>

            <div className="p-2 text-center">
              <h2 className="text-[26px] font-jakarta font-semibold leading-8 mb-2">
                {session.title}
              </h2>
              <p className="text-[18px] font-light font-poppins leading-6">
                {session.description}
              </p>
            </div>

            <Button
              rounded="rounded-b-[10px]"
              height="43px"
              width="400px"
              boxShadow={false}
              title="Learn More"
              to='/academic/Detailpage'
            />
          </SimpleCard>
        ))}
      </div>
</div>
    </div>
  );
};

export default AllEventView;
