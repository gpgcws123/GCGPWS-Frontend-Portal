import React from 'react';
import SimpleCard from '../../components/simpleCard'; // Adjust the path if needed
import HeadingTitle from '../../components/heading';

// ✅ Import your images
import downloadImg from '../../assets/download.png';
import usersImg from '../../assets/users.png';
import filesImg from '../../assets/files.png';
import placesImg from '../../assets/places.png';

const StatsSection = () => {
  const stats = [
    {
      count: '2.7K',
      label: 'Downloads',
      img: downloadImg,
    },
    {
      count: '1.3K',
      label: 'Users',
      img: usersImg,
    },
    {
      count: '74',
      label: 'Files',
      img: filesImg,
    },
    {
      count: '46',
      label: 'Places',
      img: placesImg,
    },
  ];

  return (
    <section className="text-gray-700 body-font">
      <HeadingTitle title="Our Successful Count" width='420px' />
      <div className="container px-5 relative top-[76px] mx-auto">
        <div className="flex flex-wrap -m-4 text-center">
          {stats.map((item, index) => (
            <div key={index} className="p-4 md:w-1/4 sm:w-1/2 w-full">

              {/* ✅ Whole Card */}
              <SimpleCard padding="p-6" width="w-full" height="h-auto" >

                {/* ✅ Image inside SimpleCard with width 80px and center aligned */}
                <SimpleCard width="w-[80px]" height="h-auto" bgColor='black' padding="p-4" className="mx-auto">
                  <img 
                    src={item.img} 
                    alt={item.label} 
                    className="w-16 h-16 object-contain mx-auto"
                  />
                </SimpleCard >

                {/* ✅ Count and Label */}
                <h2 className="title-font font-medium text-3xl text-gray-900 mt-4">{item.count}</h2>
                <p className="leading-relaxed">{item.label}</p>

              </SimpleCard>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
