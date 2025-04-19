import React from "react";
import BaseCard from "../../components/card";
import ContentSection from "../../components/contextSection";
import image1 from "../../assets/heroImage7.jpg";
import Button from "../../components/button";
import ImageCard from "../../components/imageCard";
import Heading from "../../components/heading";
import StatsSection from "./studentRecord";

export default function Message() {
  return (
    <>
      <div className="bg-[#ffff] flex flex-col h-[100%] items-center py-8 text-black">
        <div className="my-8">
          <Heading title="Principal Message" />
        </div>
        {/* Wrapper div to center content */}
        <div className="flex flex-col mt-8 lg:flex-row gap-6 max-w-4xl items-center justify-center">
          {/* First BaseCard with image */}
          <div className="flex justify-center">
            <ImageCard src={image1} width="516px" height="330px" />
          </div>

          {/* Second BaseCard with ContentSection */}
          <div className="flex justify-center">
            <BaseCard height="518px" width="563px" bgColor="#b2b2b2" isFlexible>
              <div className="text-center mt-6">
                <ContentSection
                  title="Principal's Message"
                  description="Welcome to Government Post Graduate College for Women. At GPGCWS, we are committed to nurturing academic excellence, character development, and future leadership. We firmly believe that education is the key to unlocking potential and creating a brighter tomorrow. Our college not only delivers quality education but also promotes skill enhancement, extracurricular growth, and career readiness. With a team of dedicated and experienced faculty, we strive to guide and empower each student to realize her full potential and achieve her goals."
                />
                <div className="mt-7">
                  <Button height="43px" width="145px" boxShadow={false} title="Read More" to='/academic/Detailpage' />
                </div>
              </div>
            </BaseCard>
          </div>
        </div>

      </div>
      <div className="mt-[38px]">
        <StatsSection />
      </div>
    </>
  );
}
