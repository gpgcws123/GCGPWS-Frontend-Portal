import React from 'react';
import heroImage from '../../assets/heroImage1.jpg';
import SimpleCard from '../../components/simpleCard';
import interImg from '../../assets/computer.jpg';
import graduateImg from '../../assets/math.jpg';
import postGradImg from '../../assets/urdu.jpg';
import HeadingTitle from '../../components/heading';
import Button from '../../components/button';
import HeadingWithButton from '../../components/headingWithButton';
import ContentSection from '../../components/contextSection';
const AllPrograms = () => {
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
         'Enhance your academic profile with our postgraduate degrees, offering advanced learning, research opportunities, and professional growth in a supportive environment.',
       image: postGradImg,
       link: '/postgraduate',
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
    
</div>
    </div>
  );
};

export default AllPrograms;
