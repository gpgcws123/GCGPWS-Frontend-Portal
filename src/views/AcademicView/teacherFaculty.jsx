import React from 'react';
import SimpleCard from '../../components/simpleCard';
import teacher1 from '../../assets/CoursImages.png';
import teacher2 from '../../assets/CoursImages.png';
import teacher3 from '../../assets/CoursImages.png';
import HeadingTitle from '../../components/heading';
import HeadingWithButton from '../../components/headingWithButton';

const TeacherFacultyCard = () => {
  const facultyData = [
    {
      name: 'Miss Ayesha',
      designation: 'Assistant Professor',
      subject: 'Physics',
      image: teacher1,
    },
    {
      name: 'Miss Sara',
      designation: 'Senior Lecturer',
      subject: 'Chemistry',
      image: teacher2,
    },
    {
      name: 'Miss Fatima',
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
        <HeadingWithButton headingText='Teacher Faculty' buttonText='Meet Our Faculty'/> 
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

              {/* ✅ Subject Tag */}
              <div className="flex justify-center">
                <span className="bg-black text-white px-7 py-1 font-jakarta rounded-[10px] text-[24px] font-bold">
                  {teacher.subject}
                </span>
              </div>
            </div>
          </SimpleCard>
        ))}
      </div>
    </div>
  );
};

export default TeacherFacultyCard;