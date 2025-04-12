import React from "react";
import HeadingTitle from "../../components/heading";
import SimpleCard from "../../components/simpleCard";
import Button from "../../components/button";

// ✅ Gallery Images
import galleryImg1 from "../../assets/CoursImages.png";
import galleryImg2 from "../../assets/CoursImages.png";
import galleryImg3 from "../../assets/CoursImages.png";
import HeadingWithButton from "../../components/headingWithButton";

const EventSection = () => {
  const sessionData = [
    {
      date: "06",
      monthYear: "Mar 2024",
      title: "MSN Psychiatric Nurse Practitioner Program Info Session",
      description:
        "Join us for an interactive virtual information session about Alverno's Psychiatric Mental Health Nurse Practitioner program.",
      image: galleryImg1,
      link: "/session-details",
    },
    {
      date: "12",
      monthYear: "Apr 2024",
      title: "Business Management Virtual Info Session",
      description:
        "Learn about the Business Management programs and career opportunities in this virtual session.",
      image: galleryImg2,
      link: "/session-details",
    },
    {
      date: "20",
      monthYear: "May 2024",
      title: "Computer Science Advanced Program Info Session",
      description:
        "Explore the Computer Science program designed to boost your career with modern technologies.",
      image: galleryImg3,
      link: "/session-details",
    },
  ];

  return (
    <div className="bg-white h-auto flex flex-col items-center px-8 py-8 text-black relative w-auto">
      {/* ✅ Heading */}
      <div className="w-full flex items-center justify-center relative mb-8">
        <HeadingTitle title="Gallery" width="220px" />
      </div>
      <HeadingWithButton headingText="Upcoming Events in GPGCWS"  width="auto" buttonText="All Events in GPGCWS" />
  
      {/* ✅ Simple Cards Layout (No Swiper) */}
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
              to={session.link}
            />
          </SimpleCard>
        ))}
      </div>
    </div>
  );
};

export default EventSection;
