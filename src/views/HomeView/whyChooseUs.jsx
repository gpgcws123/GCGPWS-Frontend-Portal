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
                                Choosing Govt. Queen Mary Graduate College empowers female students of all age groups
                                from class one to graduate level to embark on a transformative educational journey where
                                they can acquire knowledge, skills, and experiences that will shape their future
                                success. It offers diverse academic programs with accommodation.
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
                                    Unlock your potential at our exceptional all-age girl's institution, featuring state-of-the-art facilities and extensive libraries.Unlock your potential at our exceptional all-age girl's institution, featuring state-of-the-art facilities and extensive libraries.
                                </p>
                            </SimpleCard>

                            {/* ✅ Career Success Card */}
                            <SimpleCard width='w-full' height='h-[330px]' padding="p-4" className="flex flex-col items-center text-center max-w-xs">
                                <SimpleCard bgColor='bg-gray' width="w-20" height='h-20' padding="p-4">
                                    <img src={careerImg} alt="Career Success" className="w-12 h-12 object-contain" />
                                </SimpleCard>
                                <h3 className="font-semibold  text-[28px] font-jakarta mt-3  ">Academics</h3>
                                <p className="text-[15px] font-poppins  text-Black">
                                    Unlock your potential at our exceptional all-age girl's institution, featuring state-of-the-art facilities and extensive libraries.Unlock your potential at our exceptional all-age girl's institution, featuring state-of-the-art facilities and extensive libraries.
                                </p>
                            </SimpleCard>

                            {/* ✅ Highly Experienced Card */}
                            <SimpleCard width='w-full' height='h-[330px]' padding="p-4" className="flex flex-col items-center text-center max-w-xs">
                                <SimpleCard width="w-20" bgColor='bg-gray' height='h-20' padding="p-4">
                                    <img src={experiencedImg} alt="Highly Experienced" className="w-12 h-12 object-contain" />
                                </SimpleCard>
                                <h3 className="font-semibold  text-[28px] font-jakarta mt-3  ">Academics</h3>
                                <p className="text-[15px] font-poppins  text-Black">
                                    Unlock your potential at our exceptional all-age girl's institution, featuring state-of-the-art facilities and extensive libraries.Unlock your potential at our exceptional all-age girl's institution, featuring state-of-the-art facilities and extensive libraries.
                                </p>
                            </SimpleCard>

                            {/* ✅ Location Card */}
                            <SimpleCard width='w-full' height='h-[330px]' padding="p-4" className="flex flex-col items-center text-center max-w-xs">
                                <SimpleCard width="w-20" bgColor='bg-gray' height='h-20' padding="p-4">
                                    <img src={locationImg} alt="Location" className="w-12 h-12 object-contain" />
                                </SimpleCard>
                                <h3 className="font-semibold  text-[28px] font-jakarta mt-3  ">Academics</h3>
                                <p className="text-[15px] font-poppins  text-Black">
                                    Unlock your potential at our exceptional all-age girl's institution, featuring state-of-the-art facilities and extensive libraries.Unlock your potential at our exceptional all-age girl's institution, featuring state-of-the-art facilities and extensive libraries.
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