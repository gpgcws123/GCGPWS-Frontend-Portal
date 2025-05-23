import React from "react";
import HeadingTitle from "../../components/heading";
import SimpleCard from "../../components/simpleCard";
import Button from "../../components/button";

// ✅ Gallery Images
import galleryImg1 from "../../assets/Sport.jpg";
import galleryImg2 from "../../assets/Culture.jpg";
import galleryImg3 from "../../assets/convocation.jpg";
import HeadingWithButton from "../../components/headingWithButton";

const EventSection = () => {
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
    <div className="bg-white h-auto flex flex-col items-center px-8 py-8 text-black relative w-auto">
      {/* ✅ Heading */}
      <div className="w-full flex items-center justify-center relative mb-8">
        <HeadingTitle title="Events" width="220px" />
      </div>
      <HeadingWithButton headingText="Upcoming Events in GPGCWS"  width="auto" buttonText="All Events in GPGCWS" to="/news/allevents" />
  
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
              to='/academic/Detailpage'
            />
          </SimpleCard>
        ))}
      </div>
    </div>
  );
};

export default EventSection;
