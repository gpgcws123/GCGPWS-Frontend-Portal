import React from "react";
import BaseCard from "../../components/simpleCard";

const Staff = () => {
  const degreePrograms = [
    {
      id: 1,
      title: "Miss Ume Hani",
      system: "Professor",
      duration: "(Computer)",
    },
    {
      id: 2,
      title: "Miss Fareeha",
      system: "Professor",
      duration: "(Computer)",
    },
    {
      id: 3,
      title: "Miss Saba",
      system: "Professor",
      duration: "(English)",
    },
  ];

  return (
    <div className="bg-[#b2b2b2] text-[#070707] py-10 px-4">
      <h2 className="text-center   text-[#070707] text-3xl underline font-bold mb-6">Our Professional Staff</h2>
      <h2 className="text-center  text-[#070707] text-3xl underline font-bold mb-10">Faculty</h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {degreePrograms.map((program) => (
          <BaseCard
            key={program.id}
            className="bg-[#ffff] p-6 rounded-lg shadow-md flex flex-col justify-between text-center" >
            <div>
              <h3 className="text-xl font-bold mb-2">{program.title}</h3>
              <p className="text-sm mb-1">{program.system}</p>
              <p className="text-sm">{program.duration}</p>
            </div>
          </BaseCard>
        ))}
      </div>
    </div>
  );
};

export default Staff;
