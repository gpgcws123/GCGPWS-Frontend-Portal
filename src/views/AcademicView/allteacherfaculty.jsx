import React from 'react';
import heroImage from '../../assets/heroImage1.jpg';
import SimpleCard from '../../components/simpleCard';
import teacher1 from '../../assets/faculty.jpg';
import teacher2 from '../../assets/faculty.jpg';
import teacher3 from '../../assets/faculty.jpg';
import HeadingTitle from '../../components/heading';
import Button from '../../components/button';
import HeadingWithButton from '../../components/headingWithButton';
import { Link } from 'react-router-dom';
const AllTeacherFaculty = () => {
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
      }, {
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
    <div>
      {/* ✅ Hero Section */}
      <div
        className="relative w-full h-screen mt-16 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold sm:text-6xl font-jakarta text-white px-4 md:px-8">
            All Your Class Books in One Place <br />
            Download. Read. Learn.
          </h1>
        </div>
      </div>

      
      <div className=" my-8 p-4 bg-white">
  <div className="my-8 text-center">
    <HeadingTitle title="Explore Our Featured Books" width="640px" />
  </div>
  <HeadingWithButton headingText="hello" buttonText='' />
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
    </div>
  );
};

export default AllTeacherFaculty;
