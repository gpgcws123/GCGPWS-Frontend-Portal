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
const AllDepartment = () => {
   const programsData = [
      {
        title: 'Department of CS&IT',
        description:
          'Build your tech foundation with programs that combine theoretical knowledge and practical skills, preparing you for the modern digital world.',
        image: interImg,
        link: '/intermediate',
      },
      {
        title: 'Department of CS&IT',
        description:
          'Build your tech foundation with programs that combine theoretical knowledge and practical skills, preparing you for the modern digital world.',
        image: interImg,
        link: '/intermediate',
      },
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
    </div>
  );
};

export default AllDepartment;
