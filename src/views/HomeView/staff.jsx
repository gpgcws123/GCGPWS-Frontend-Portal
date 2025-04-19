import React from 'react';
import SimpleCard from '../../components/simpleCard';
import teacher1 from '../../assets/faculty.jpg';
import teacher2 from '../../assets/faculty.jpg';
import teacher3 from '../../assets/faculty.jpg';
import HeadingTitle from '../../components/heading';
import { Link } from "react-router-dom";
const FacultyCardRow = () => {
  const facultyData = [
    {
      name: 'Miss Fareeha',
      designation: 'Lecturer',
      subject: 'Computer',
      image: teacher1,
    },
    {
      name: 'Miss Saba',
      designation: 'Lecturer',
      subject: 'English',
      image: teacher2,
    },
    {
      name: 'Miss Yasemin',
      designation: 'Lecturer',
      subject: 'Mathematics',
      image: teacher3,
    },
  ];

  return (
    <>
    <div className='my-7'>
    <HeadingTitle title="Our Professional Teaching Faculty" width='640px'/>
    </div>
     <div className="flex flex-wrap  justify-center  gap-8 p-6">
      {facultyData.map((teacher, index) => (
        <SimpleCard
        bgColor='bg-gray'
          key={index}
             padding='p-0'
          width="w-[370px]"
          height="h-auto"
        >
          {/* ✅ Teacher Image */}
          <div className="h-[270px]  w-full">
            <img
              src={teacher.image}
              alt={`${teacher.name} - ${teacher.subject}`}
              className="w-full h-full rounded-[10px] object-cover"
            />
          </div>

          {/* ✅ Teacher Details */}
          <div className="p-5 text-center">
            <h2 className="font-bold font-jakarta  text-[32px]">{teacher.name}</h2> {/* 36px */}
            <p className="text-Black font-poppins mb-2 font-medium text-[24px]">{teacher.designation}</p> {/* 28px */}

         
           {/* ✅ Subject Tag */}
        <Link to='/academic/Detailpage'>           <div className="flex justify-center">
              <span className="bg-black text-white px-7 py-1 font-jakarta rounded-[10px] text-[24px] font-bold">
                {teacher.subject}
              </span>
            </div>
            </Link>
 
          </div>
        </SimpleCard>
      ))}
    </div>
    </>
   
  );
};

export default FacultyCardRow;
