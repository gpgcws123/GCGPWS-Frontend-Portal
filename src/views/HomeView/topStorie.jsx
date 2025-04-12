import React from "react";
import BaseCard from "../../components/card";
import ContentSection from "../../components/contextSection";
import Button from "../../components/button";
import image1 from "../../assets/heroImage2.jpg";
import ImageCard from "../../components/imageCard";
import NoticeBoard from "./noticeboard";
import HeadingTitle from "../../components/heading";

export default function TopStories() {
  return (
    <div className="bg-gray h-[100%]  flex flex-col items-center py-8 text-black ">
      {/* Heading Section with Border */}
      <HeadingTitle title="Top Stories" />

      {/* Spacing Between Heading & Cards */}
      <div className="mt-[40px] h-full grid grid-cols-12 gap-x-10 w-full max-w-[85%] items-center">
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
            <Button height="43px" width="145px" boxShadow={false} title="Read More" to="/download" />

          </BaseCard>
        </div>
      </div>
      <NoticeBoard />
    </div>
  );
}
