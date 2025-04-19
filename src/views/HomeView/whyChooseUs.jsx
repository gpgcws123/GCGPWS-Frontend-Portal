import React from 'react';
import SimpleCard from '../../components/simpleCard'; // Adjust path as needed

// Import your images
import academicsImg from '../../assets/Graduate.svg';
import careerImg from '../../assets/Graduate.svg';
import experiencedImg from '../../assets/Graduate.svg';
import locationImg from '../../assets/Graduate.svg';

const CollegePromoSection = () => {
    return (
        <div className="bg-gray flex flex-col h-full items-center py-8">
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="p-6 max-w-8xl w-full mt-24 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Left Column - Heading and Paragraph */}
                        <div className="flex flex-col ml-14 justify-center">
                            <h2 className="text-[40px] text-Black font-jakarta font-semibold  mb-6">Why Choose Us?</h2>
                            <p className="text-2xl font-normal font-poppins  text-Black">
                                Choosing the right college shapes your future and GPGCWS stands out as the preferred choice for those seeking quality education, personal growth, and career success. With experienced faculty and a dynamic learning environment, we empower students to explore, innovate, and achieve their full potential.
                            </p>
                        </div>

                        {/* Right Column - 2x2 Grid of Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-9 justify-items-center">

                            {/* ✅ Academics Card */}
                            <SimpleCard width='w-full' height='h-[330px]' padding="p-4" className="flex flex-col items-center text-center  max-w-xs">
                                <SimpleCard width="w-20" bgColor='bg-gray' height='h-20' padding="p-4">
                                    <img src={academicsImg} alt="Academics" className="w-12 h-12 object-contain" />
                                </SimpleCard>
                                <h3 className="font-semibold  text-[28px] font-jakarta mt-3  ">Academics</h3>
                                <p className="text-[15px] font-poppins  text-Black">
                                    At GPGCWS, we prioritize academic excellence through a balanced blend of theory and practical learning. Our evolving curriculum ensures students gain relevant knowledge and skills aligned with modern trends and global standards.


                                </p>
                            </SimpleCard>

                            {/* ✅ Career Success Card */}
                            <SimpleCard width='w-full' height='h-[330px]' padding="p-4" className="flex flex-col items-center text-center max-w-xs">
                                <SimpleCard bgColor='bg-gray' width="w-20" height='h-20' padding="p-4">
                                    <img src={careerImg} alt="Career Success" className="w-12 h-12 object-contain" />
                                </SimpleCard>
                                <h3 className="font-semibold  text-[28px] font-jakarta mt-3  ">Career Success</h3>
                                <p className="text-[15px] font-poppins  text-Black">
                                GPGCWS equips students for career success through skill-building, counseling, internships, and job placement support. Our graduates succeed in diverse careers, reflecting the quality education and guidance they receive.

</p>
                            </SimpleCard>

                            {/* ✅ Highly Experienced Card */}
                            <SimpleCard width='w-full' height='h-[330px]' padding="p-4" className="flex flex-col items-center text-center max-w-xs">
                                <SimpleCard width="w-20" bgColor='bg-gray' height='h-20' padding="p-4">
                                    <img src={experiencedImg} alt="Highly Experienced" className="w-12 h-12 object-contain" />
                                </SimpleCard>
                                <h3 className="font-semibold  text-[28px] font-jakarta mt-3  ">Highly Experienced</h3>
                                <p className="text-[15px] font-poppins  text-Black">
                                Our experienced faculty combines academic expertise with real-world insight, guiding and inspiring students at every step to think independently and succeed.
                                </p>
                            </SimpleCard>

                            {/* ✅ Location Card */}
                            <SimpleCard width='w-full' height='h-[330px]' padding="p-4" className="flex flex-col items-center text-center max-w-xs">
                                <SimpleCard width="w-20" bgColor='bg-gray' height='h-20' padding="p-4">
                                    <img src={locationImg} alt="Location" className="w-12 h-12 object-contain" />
                                </SimpleCard>
                                <h3 className="font-semibold  text-[28px] font-jakarta mt-3  ">Location</h3>
                                <p className="text-[15px] font-poppins  text-Black">
                                Ideally located, GPGCWS offers a peaceful learning environment with easy access to city resources, guest lectures, and real-world learning experiences.


                                </p>
                            </SimpleCard>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollegePromoSection;