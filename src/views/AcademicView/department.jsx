import React from 'react';
import SimpleCard from '../../components/simpleCard';
import Button from '../../components/button';
import HeadingTitle from '../../components/heading';
import interImg from '../../assets/computer.jpg';
import graduateImg from '../../assets/math.jpg';
import postGradImg from '../../assets/urdu.jpg';
import ContentSection from '../../components/contextSection';
import HeadingWithButton from '../../components/headingWithButton';

const DepartmentSection = () => {
  const programsData = [
    {
      title: 'Department of CS&IT',
      description:
        'Build your tech foundation with programs that combine theoretical knowledge and practical skills, preparing you for the modern digital world.',
      image: interImg,
      link: '/intermediate',
    },
    {
      title: 'Department of Math',
      description:
        'Sharpen your problem-solving and analytical thinking through programs designed to explore both pure and applied mathematics.',
      image: graduateImg,
      link: '/graduate',
    },
    {
      title: 'Department of Urdu',
      description:
        'Delve into the rich literary heritage of Urdu and enhance your skills in language, poetry, and critical analysis.',
      image: postGradImg,
      link: '/postgraduate',
    },
  ];

  return (
    <div className="max-w-[1360px] mx-auto mb-10 bg-white">
      {/* ✅ Heading */}
      <div className='my-7'>
        <HeadingTitle title="Departments" width='220px' />
      </div>
      <div className='px-4'>
        <HeadingWithButton headingText='Our Departments at GPGCWS' buttonText='all programs here' to='/academic/alldepartment' />
      </div>
      
      {/* ✅ Program Cards */}
      <div className="flex flex-wrap justify-center gap-8 p-6">
        {programsData.map((program, index) => (
          <SimpleCard
            bgColor='bg-gray'
            key={index}
            padding='p-0'
            width="w-[380px]"
            height="h-[600px]"
            className="flex flex-col"
          >
            {/* ✅ Program Image */}
            <div className="w-[380px] h-[180px]">
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
                 to='/academic/Detailpage'
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
