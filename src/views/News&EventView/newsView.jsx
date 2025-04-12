import React from "react";
import HeadingTitle from "../../components/heading";
import SimpleCard from "../../components/simpleCard";
import Button from "../../components/button";

// ✅ News Images
import newsImg1 from "../../assets/CoursImages.png";
import newsImg2 from "../../assets/CoursImages.png";
import newsImg3 from "../../assets/CoursImages.png";
import HeadingWithButton from "../../components/headingWithButton";

const NewsSection = () => {
  const newsData = [
    {
      title: "Breakthrough in AI Technology",
      image: newsImg1,
      link: "/news-details",
    },
    {
      title: "Stock Market Reaches New Heights",
      image: newsImg2,
      link: "/news-details",
    },
    {
      title: "New Environmental Policies Announced",
      image: newsImg3,
      link: "/news-details",
    },
  ];

  return (
    <div className="bg-gray h-auto flex flex-col items-center px-8 py-16 text-black relative w-auto">
      {/* ✅ Heading */}
      <div className="w-full flex items-center justify-center relative mb-12">
        <HeadingTitle title="Latest News" width="220px" />
      </div>
        <HeadingWithButton headingText="Trending News" width="auto" buttonText="All News" />
      

      {/* ✅ Simple Cards Layout (No Swiper) */}
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
                to={news.link}
              />
            </div>
          </SimpleCard>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
