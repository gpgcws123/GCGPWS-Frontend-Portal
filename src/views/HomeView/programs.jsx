import React from 'react';
import SimpleCard from '../../components/simpleCard';
import Button from '../../components/button';
import HeadingTitle from '../../components/heading';
import interImg from '../../assets/intemediate.jpg';
import graduateImg from '../../assets/graduate.jpg';
import postGradImg from '../../assets/postgraduate.jpg';
import ContentSection from '../../components/contextSection';
import FacultyCardRow from './staff';

const ProgramsSection = () => {
  const programsData = [
    {
      title: 'Intermediate',
      description:
        'Begin your academic journey with our well-structured intermediate programs, designed to build a solid foundation in Science, Arts, and Commerce for future success.',
      image: interImg,
      link: '/intermediate',
    },
    {
      title: 'Graduate',
      description:
        'Gain valuable knowledge and practical skills through our graduate programs, structured to prepare students for academic excellence and professional success.',
      image: graduateImg,
      link: '/graduate',
    },
    {
      title: 'Post Graduate',
      description:
        'Enhance your academic profile with our postgraduate degrees, offering advanced learning, research opportunities, and professional growth in a supportive environment.'

        ,
      image: postGradImg,
      link: '/postgraduate',
    },
  ];

  return (
    <>
      {/* ✅ Heading */}
      <div className='my-7'>
        <HeadingTitle title="Programs" width='220px' />
      </div>

      {/* ✅ Program Cards */}
      <div className="flex flex-wrap justify-center gap-8 p-6">
        {programsData.map((program, index) => (
          <SimpleCard
          bgColor='bg-gray'
            key={index}
              padding='p-0'
            width="w-[380px]"
            height="h-auto"
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
            <div className="p-5 text-left">
              <ContentSection 
                title={program.title} 
                description={program.description} 
              />

              {/* ✅ Button */}
              <div className="mt-4">
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
      <FacultyCardRow/>
    </>
  );
};

export default ProgramsSection;
