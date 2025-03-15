import React from "react";
import BaseCard from "../../components/simpleCard";

const Programs = () => {
  const degreePrograms = [
    {
      id: 1,
      title: "Inter",
      system: "Annual system",
      duration: "2 Years Degree Program",
    },
    {
      id: 2,
      title: "BS",
      system: "Semester system",
      duration: "4 Years Degree Program",
    },
    {
      id: 3,
      title: "ADP",
      system: "Annual system",
      duration: "2 Years Degree Program",
    },
  ];

  return (
    <div className="bg-[#b2b2b2] text-[#070707] py-10 px-4">
      <h2 className="text-center   text-[#070707] text-3xl font-bold mb-6 underline">Programs</h2>
      <h2 className="text-center  text-[#070707] text-3xl font-bold mb-10 underline">Our Degree Programs</h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {degreePrograms.map((program) => (
          <BaseCard
            key={program.id}
            className="bg-[#ffff] p-6 rounded-lg shadow-md flex flex-col justify-between"
          >
            {/* Placeholder for image/icon */}
            <div className="w-full h-40 bg-rose-400 rounded mb-4"></div>

            {/* Program Info */}
            <div>
              <h3 className="text-xl font-bold mb-2">{program.title}</h3>
              <p className="text-sm mb-1">{program.system}</p>
              <p className="text-sm">{program.duration}</p>
            </div>

            {/* Button */}
            <div className="mt-4">
              <button className="bg-[#efff11] text-[#070707] px-4 py-2 rounded font-semibold hover:bg-[#F5FF70] transition-colors">
                DETAILS &rarr;
              </button>
            </div>
          </BaseCard>
        ))}
      </div>
    </div>
  );
};

export default Programs;
