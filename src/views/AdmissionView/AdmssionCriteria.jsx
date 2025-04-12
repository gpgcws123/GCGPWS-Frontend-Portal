import React from "react";
import HeadingTitle from "../../components/heading";
import SimpleCard from "../../components/simpleCard";
import Button from "../../components/button";

// ✅ Policy Images
import policyImg1 from "../../assets/CoursImages.png";
import policyImg2 from "../../assets/CoursImages.png";
import policyImg3 from "../../assets/CoursImages.png";
import HeadingWithButton from "../../components/headingWithButton";

const AdmissionCariteriaSection = () => {
  const policiesData = [
    {
      title: "Last Years merit",
      image: policyImg1,
      link: "/policy-details",
    },
    {
      title: "Last Years merit",
      image: policyImg2,
      link: "/policy-details",
    },
    {
      title: "Last Years merit",
      image: policyImg3,
      link: "/policy-details",
    },
  ];

  return (
    <div className="bg-white h-auto flex flex-col items-center px-8 py-16 text-black relative w-auto">
      {/* ✅ Heading */}
      <div className="w-full flex items-center justify-center relative mb-12">
        <HeadingTitle title="Admission Ceritria" width="350px" />
      </div>
      <HeadingWithButton headingText="Important Policies" width="auto" buttonText="View All Policies" />

      {/* ✅ Simple Cards Layout (No Swiper) */}
      <div className="w-full flex flex-wrap justify-between gap-10">
        {policiesData.map((policy, index) => (
          <SimpleCard
          bgColor="bg-gray"
            key={index}
            boxShadow={false}
            width="w-[400px]"
            height="h-[500px]"
            className="!p-0 flex flex-col justify-between rounded-[10px]"
          >
            <div className="relative w-full h-[250px] ">
              <img
                src={policy.image}
                alt={policy.title}
                className="w-full h-full object-cover rounded-t-[10px]"
              />
            </div>

            <div className="p-6 text-center ">
              <h2 className="text-[30px] font-jakarta font-semibold leading-8 mb-6">
                {policy.title}
              </h2>
            </div>

            <div className="flex justify-center">
              <Button
                rounded="rounded-t-[10px]"
                height="43px"
                width="400px"
                className="px-8"
                boxShadow={false}
                title="Learn More"
                to={policy.link}
              />
            </div>
          </SimpleCard>
        ))}
      </div>
    </div>
  );
};

export default AdmissionCariteriaSection;
