import React from 'react';
import SimpleCard from '../../components/simpleCard'; // Adjust path if needed
import HeadingTitle from '../../components/heading';

// ✅ Import your images here
import studentsImg from '../../assets/Graduate.svg';
import staffImg from '../../assets/Graduate.svg';
import coursesImg from '../../assets/Graduate.svg';
import graduatesImg from '../../assets/Graduate.svg';

const StatsSection = () => {
  return (
    <section className="text-gray-700 mt-[32px] body-font">
      <HeadingTitle title="Our Success Counts" width="390px" />
      <div className="container relative top-[120px] mx-auto">
        <div className="flex flex-wrap -m-4 text-center">

          {/* ✅ Current Students */}
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <SimpleCard padding="p-6" width="w-[308px]" height="h-[250px]" bgColor='bg-gray' >
              <SimpleCard width="w-[80px]" height="h-auto" padding="p-4" className="mx-auto" bgColor='bg-White'>
                <img src={studentsImg} alt="Current Students" className="w-12 h-12 object-contain mx-auto" />
              </SimpleCard>
              <h2 className="title-font font-medium text-3xl text-gray-900 mt-4">3567+</h2>
              <p className="leading-relaxed">Current Students</p>
            </SimpleCard>
          </div>

          {/* ✅ Qualified Staff */}
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <SimpleCard padding="p-6" width="w-[308px]" height="h-[250px]" bgColor='bg-black'>
              <SimpleCard width="w-[80px]" height="h-auto" padding="p-4" className="mx-auto" bgColor='bg-gray' >
                <img src={staffImg} alt="Qualified Staff" className="w-12 h-12 object-contain mx-auto" />
              </SimpleCard>
              <h2 className="title-font font-medium text-3xl text-White mt-4">3567+</h2>
              <p className="leading-relaxed text-White ">Qualified Staff</p>
            </SimpleCard>
          </div>

          {/* ✅ Current Courses */}
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <SimpleCard padding="p-6" width="w-[308px]" height="h-[250px]" bgColor='bg-gray'>
              <SimpleCard width="w-[80px]" height="h-auto" padding="p-4" className="mx-auto" bgColor='bg-White'>
                <img src={coursesImg} alt="Current Courses" className="w-12 h-12 object-contain mx-auto" />
              </SimpleCard>
              <h2 className="title-font font-medium text-3xl text-gray-900 mt-4">3567+</h2>
              <p className="leading-relaxed">Current Courses</p>
            </SimpleCard>
          </div>

          {/* ✅ Passed Graduates */}
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <SimpleCard padding="p-6" width="w-[308px]" height="h-[250px]" bgColor='bg-black'>
              <SimpleCard width="w-[80px]" height="h-auto" padding="p-4" className="mx-auto" bgColor='bg-gray'>
                <img src={graduatesImg} alt="Passed Graduates" className="w-12 h-12 object-contain mx-auto" />
              </SimpleCard>
              <h2 className="title-font font-medium text-3xl text-White mt-4">3567+</h2>
              <p className="leading-relaxed text-White">Passed Graduates</p>
            </SimpleCard>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatsSection;
