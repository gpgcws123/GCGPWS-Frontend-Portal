import React from "react";
import BaseCard from "../../components/card";
import ContentSection from "../../components/contextSection";
import image1 from "../../assets/heroImage7.jpg";

export default function Message() {
  return (
    <div className="bg-[#ffff] min-h-screen flex flex-col items-center py-8 text-white">
      <h2 className="text-3xl font-bold mb-6 underline text-[#070707]">Principal Message</h2>
      <div className="flex gap-6 max-w-4xl">
        {/* First BaseCard with image */}
        <BaseCard isFlexible>
          <div className="w-full h-full">
            <img
              src={image1}
              alt="Principal pic"
              className="w-full h-full object-cover"
            />
          </div>
        </BaseCard>

        {/* Second BaseCard with ContentSection */}
        <BaseCard bgColor="#b2b2b2" isFlexible>
          <ContentSection
            title="Principal's Message"
            description="Welcome to Government Post Graduate College for Women.We uphold values of merit, honor, and hard work, providing quality education that empowers women for successful careers and leadership. Along with academics, we offer extracurricular activities, sports, and career guidance for a well-rounded experience. I encourage students to utilize our excellent faculty and facilities, choose a path that suits their strengths, and strive for excellence. Explore our website for information on programs, faculty, and activities."
          />
        </BaseCard>
      </div>
    </div>
  );
}
