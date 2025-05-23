import React from 'react';
import heroImage from '../../assets/heroImage1.jpg';
import SimpleCard from '../../components/simpleCard';

// ✅ News Images
import newsImg1 from "../../assets/schedule.jpg";
import newsImg2 from "../../assets/holiday.jpg";
import newsImg3 from "../../assets/planting.jpg";
import HeadingTitle from '../../components/heading';
import Button from '../../components/button';
import HeadingWithButton from '../../components/headingWithButton';
import { FaUsers, FaCalendarAlt, FaClock } from "react-icons/fa"; 

const AllNewsView = () => {
    const newsData = [
       {
         title: "Exam Schedule",
         image: newsImg1,
         link: "/news-details",
       },
       {
         title: "Public Holiday",
         image: newsImg2,
         link: "/news-details",
       },
       {
         title: "Tree Planting Campaign",
         image: newsImg3,
         link: "/news-details",
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

  <div className="w-full flex flex-wrap justify-center gap-10">
        {newsData.map((news, index) => (
          <SimpleCard
            key={index}
            boxShadow={false}
            width="w-[400px]"
            height="h-[500px]"
            className="!p-0 flex flex-col justify-between rounded-[10px]"
          >
             <div className="relative w-full h-[250px] border-b-8 border-solid border-black">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover rounded-t-[10px]"
              />
            </div>

            <div className="p-6 text-center">
              <h2 className="text-[26px] font-jakarta font-semibold leading-8 mb-6">
                {news.title}
              </h2>
            </div>

            <div className="pb-6 flex justify-center">
              <Button
                rounded="rounded-[10px]"
                height="43px"
                width="auto"
                className="px-8"
                boxShadow={false}
                title="Read More"
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

export default AllNewsView;
