import React, { useState, useEffect } from 'react';
import ImageCard from '../../components/imageCard';
import ContentSection from '../../components/contextSection';
import axios from 'axios';
import SimpleCard from '../../components/simpleCard';
import Button from '../../components/button';
import HeadingTitle from '../../components/heading';
import interImg from '../../assets/computer.jpg';
import graduateImg from '../../assets/math.jpg';
import postGradImg from '../../assets/urdu.jpg';
import HeadingWithButton from '../../components/headingWithButton';

const BACKEND_URL = 'http://localhost:8000';

const DepartmentSection = () => {
    const [departmentData, setDepartmentData] = useState({
        title: "Departments",
        description: "Our college offers diverse academic departments, each specializing in different fields of study. With experienced faculty and modern facilities, our departments provide quality education and research opportunities to students.",
        imageUrl: "/images/departments-default.jpg"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDepartmentData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/academic/departments`);
                if (response.data && response.data.data) {
                    const data = Array.isArray(response.data.data) 
                        ? response.data.data[0] 
                        : response.data.data;
                    
                    if (data && data.status === 'active') {
                        setDepartmentData({
                            title: data.title || departmentData.title,
                            description: data.description || departmentData.description,
                            imageUrl: data.images && data.images[0] ? `${BACKEND_URL}${data.images[0]}` : departmentData.imageUrl
                        });
                    }
                }
            } catch (err) {
                console.error('Error fetching department data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartmentData();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

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
        <div className="w-full min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col md:flex-row items-center justify-between max-w-[1350px] w-full p-8 gap-8">
                <div className="md:w-1/2">
                    <ContentSection 
                        title={departmentData.title}
                        description={departmentData.description}
                    />
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <ImageCard 
                        src={departmentData.imageUrl}
                        width="580px"
                        height="460px"
                        alt="Department Overview"
                    />
                </div>
            </div>
            <div className="max-w-[1360px] mx-auto mb-10 bg-white">
                <div className='my-7'>
                    <HeadingTitle title="Departments" width='220px' />
                </div>
                <div className='px-4'>
                    <HeadingWithButton headingText='Our Departments at GPGCWS' buttonText='all programs here' to='/academic/alldepartment' />
                </div>
                
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
                            <div className="w-[380px] h-[180px]">
                                <img
                                    src={program.image}
                                    alt={program.title}
                                    className="w-full h-full rounded-t-[10px] object-cover"
                                />
                            </div>

                            <div className="p-5 text-left flex flex-col flex-grow">
                                <ContentSection 
                                    title={program.title} 
                                    description={program.description} 
                                />
                                
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

export default DepartmentSection;
