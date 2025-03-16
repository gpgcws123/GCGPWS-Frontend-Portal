import React from "react";
import BaseCard from "../../components/card";
import ContentSection from "../../components/contextSection";
import Button from "../../components/button";
import image1 from "../../assets/heroImage2.jpg";
import ImageCard from "../../components/imageCard";

export default function TopStories() {
  return (
    <div className="bg-[#b2b2b2] min-h-screen flex flex-col items-center py-8 text-[#070707] w-full">
      {/* Heading Section with Border */}
      <div className="w-fit text-center">
        <h2 className="text-3xl font-medium text-black">Top Stories</h2>
        <div className="w-[180px] h-[10px] bg-[#070707] ml-[5px] rounded-full mt-[6px]"></div> 
      </div>

      {/* Spacing Between Heading & Cards */}
      <div className="mt-[40px] grid grid-cols-12 gap-x-10 w-full max-w-[85%] items-center">
        {/* ImageCard Section */}
        <div className="col-span-12 lg:col-span-5 flex justify-center">
          <ImageCard src={image1} width="100%" height="330px" />
        </div>

        {/* Content Card Section */}
        <div className="col-span-12 lg:col-span-7 flex justify-center">
          <BaseCard height="330px" bgColor="#ffff">
            <ContentSection
              title="GPGCWS Lab Renovation"
              description="The computer lab has been upgraded with modern high-performance systems, high-speed internet, and an interactive smart board. With improved furniture and ventilation, the renovation aims to enhance the learning environment, supporting students in coding, research, and projects. This upgrade reflects a commitment to providing students with the best technological resources."
            />
                        <Button height="43px" width="130px" boxShadow={false} title="Read More" to="/download" />
            
          </BaseCard>
        </div>
      </div>
    </div>
  );
}
