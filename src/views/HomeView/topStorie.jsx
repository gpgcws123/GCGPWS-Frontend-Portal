import React from "react";
import BaseCard from "../../components/card";
import ContentSection from "../../components/contextSection";
import Button from "../../components/button";
import image1 from "../../assets/topstories.jpg";
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
        <div className="col-span-12 lg:col-span-7 flex justify-center whitespace-pre-line">
          <BaseCard height="330px" bgColor="#ffff">
            <ContentSection
              title="Top Stories"
              description="1. College Admissions Open for 2025-2026 Academic Year.
              2. GPGCWS Celebrates Annual Cultural Fest with Amazing Performances.
              3. Important Updates: Exam Schedule & Academic Calendar Released.
              4. Exam Results Declared: Check Your Performance Online Now."
            />
            <Button height="43px" width="145px" boxShadow={false} title="Read More" to='/academic/Detailpage' />

          </BaseCard>
        </div>
      </div>
      <NoticeBoard />
    </div>
  );
}
