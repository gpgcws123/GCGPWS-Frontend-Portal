import React from 'react';
import SimpleCard from '../../components/simpleCard';
import Button from '../../components/button';
import HeadingTitle from '../../components/heading';
import interImg from '../../assets/CoursImages.png';
import graduateImg from '../../assets/CoursImages.png';
import postGradImg from '../../assets/CoursImages.png';
import ContentSection from '../../components/contextSection';
import HeadingWithButton from '../../components/headingWithButton';

const DepartmentSection = () => {
  const programsData = [
    {
      title: 'department of Intermediate',
      description:
        'Explore NUST’s intermediate programs designed to build your foundation for a successful academic career.',
      image: interImg,
      link: '/intermediate',
    },
    {
      title: 'department of bs cs',
      description:
        'NUST offers diverse graduate programs with modern facilities and experienced faculty to guide your future.',
      image: graduateImg,
      link: '/graduate',
    },
    {
      title: 'department of Chemistry',
      description:
        'Advance your knowledge with NUST’s competitive postgraduate programs in various disciplines.',
      image: postGradImg,
      link: '/postgraduate',
    },
  ];

  return (
    <div className="max-w-[1360px] mx-auto mb-10 bg-white">
      {/* ✅ Heading */}
      <div className='my-7'>
        <HeadingTitle title="Programs" width='220px' />
      </div>
      <div className='px-4'>
        <HeadingWithButton headingText='all department program' buttonText='all programs here' />
      </div>
      
      {/* ✅ Program Cards */}
      <div className="flex flex-wrap justify-center gap-8 p-6">
        {programsData.map((program, index) => (
          <SimpleCard
            bgColor='bg-gray'
            key={index}
            padding='p-0'
            width="w-[412px]"
            height="h-[500px]"
            className="flex flex-col"
          >
            {/* ✅ Program Image */}
            <div className="w-[412px] h-[180px]">
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-full rounded-t-[10px] object-cover"
              />
            </div>

            {/* ✅ Program Details */}
            <div className="p-5 text-left flex flex-col flex-grow">
              <ContentSection 
                title={program.title} 
                description={program.description} 
              />
              
              {/* ✅ Button at the Bottom */}
              <div className="mt-auto pt-4">
                <Button
                  height="43px"
                  width="145px"
                  boxShadow={false}
                  title="Read More"
                  to={program.link}
                />
              </div>
            </div>
          </SimpleCard>
        ))}
      </div>
    </div>
  );
};

export default DepartmentSection;
