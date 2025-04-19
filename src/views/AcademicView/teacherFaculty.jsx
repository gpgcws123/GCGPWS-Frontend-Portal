import React from 'react';
import SimpleCard from '../../components/simpleCard';
import teacher1 from '../../assets/faculty.jpg';
import teacher2 from '../../assets/faculty.jpg';
import teacher3 from '../../assets/faculty.jpg';
import HeadingTitle from '../../components/heading';
import HeadingWithButton from '../../components/headingWithButton';
import { Link } from "react-router-dom";
const TeacherFacultyCard = () => {
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
    <div className="bg-gray  my-16 p-4">
      <div className='my-8 text-center'>
        <HeadingTitle title="Our Professional Teaching Faculty" width='640px'/>
      </div>
      <div >
        <HeadingWithButton headingText='Our Teachers Faculty at GPGCWS' buttonText='Meet Our Faculty' to='/academic/allteacherfaculty'/> 
      </div>
      <div className="flex flex-wrap justify-center gap-8 p-6 pb-7">
        {facultyData.map((teacher, index) => (
          <SimpleCard
            bgColor='bg-white'
            key={index}
            padding='p-0'
            width="w-[370px]"
            height="h-auto"
          >
            {/* ✅ Teacher Image */}
            <div className="h-[270px] w-full">
              <img
                src={teacher.image}
                alt={`${teacher.name} - ${teacher.subject}`}
                className="w-full h-full rounded-[10px] object-cover"
              />
            </div>

            {/* ✅ Teacher Details */}
            <div className="p-5 text-center">
              <h2 className="font-bold font-jakarta text-[32px]">{teacher.name}</h2>
              <p className="text-black font-poppins mb-2 font-medium text-[24px]">{teacher.designation}</p>
<Link to='/academic/Detailpage'>
              {/* ✅ Subject Tag */}
              <div className="flex justify-center">
                <span className="bg-black text-white px-7 py-1 font-jakarta rounded-[10px] text-[24px] font-bold">
                  {teacher.subject}
                </span>
              </div>
              </Link>
            </div>
          </SimpleCard>
        ))}
      </div>
    </div>
  );
};

export default TeacherFacultyCard;