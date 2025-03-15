import { useState } from "react";
import BaseCard from "../../components/simpleCard";


const StudentRecord = () => {
  const notices = [
    { id: 1, number: "456+", content: "Current Students" },
    { id: 2, number:"654+",content: "Qualified Staff" },
    { id: 3, number:"654+", content: "Current Courses" },
    { id: 4, number:"654+", content: "Passed Graduates" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="bg-[#ffff] text-[#070707] p-6">
      <h2 className="text-3xl font-bold text-center underline text-[#070707]">Records</h2>
      <div className="flex mt-4 space-x-4">
        <div className="flex space-x-4 overflow-hidden">
          {notices.map((notice, index) => (
            <BaseCard
              key={notice.id}
              className={`bg-[#b2b2b2] p-4  font-bold text-center flex-col flex justify-center items-center shadow-lg w-40  transition-opacity duration-300${
                index === currentIndex ? "opacity-100" : "opacity-50"
              }`}
            >
             <span className="text-2xl mb-1">{notice.number}</span>
             <span>{notice.content}</span>
            </BaseCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentRecord;