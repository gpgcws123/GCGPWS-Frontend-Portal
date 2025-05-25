import React, { useState, useEffect } from 'react';
import ImageCard from '../../components/imageCard';
import ContentSection from '../../components/contextSection';
import axios from 'axios';
import SimpleCard from '../../components/simpleCard';
import Button from '../../components/button';
import HeadingTitle from '../../components/heading';
import interImg from '../../assets/intemediate.jpg';
import graduateImg from '../../assets/graduate.jpg';
import postGradImg from '../../assets/postgraduate.jpg';
import HeadingWithButton from '../../components/headingWithButton';

const BACKEND_URL = 'http://localhost:8000';

const ProgramSection = () => {
    const [programData, setProgramData] = useState({
        title: "Academic Programs",
        description: "Our college offers a wide range of academic programs designed to meet diverse educational needs. From undergraduate to postgraduate levels, our programs combine theoretical knowledge with practical skills to prepare students for successful careers.",
        imageUrl: "/images/programs-default.jpg"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgramData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/academic/programs`);
                if (response.data && response.data.data) {
                    const data = Array.isArray(response.data.data) 
                        ? response.data.data[0] 
                        : response.data.data;
                    
                    if (data && data.status === 'active') {
                        setProgramData({
                            title: data.title || programData.title,
                            description: data.description || programData.description,
                            imageUrl: data.images && data.images[0] ? `${BACKEND_URL}${data.images[0]}` : programData.imageUrl
                        });
                    }
                }
            } catch (err) {
                console.error('Error fetching program data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProgramData();
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
        <div className="w-full min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col md:flex-row items-center justify-between max-w-[1350px] w-full p-8 gap-8">
                <div className="md:w-1/2">
                    <ContentSection 
                        title={programData.title}
                        description={programData.description}
                    />
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <ImageCard 
                        src={programData.imageUrl}
                        width="580px"
                        height="460px"
                        alt="Academic Programs"
                    />
                </div>
            </div>
            <div className='my-7'>
                <HeadingTitle title="Programs" width='220px' />
            </div>
            <div className='px-4'>
                <HeadingWithButton headingText='Our Degree Programs at GPGCWS' buttonText='all programs here' to='/academic/allprograms' />
            </div>
            <div className="flex flex-wrap justify-center gap-8 p-6">
                {programsData.map((program, index) => (
                    <SimpleCard
                        bgColor='bg-gray'
                        key={index}
                        padding='p-0'
                        width="w-[380px]"
                        height="h-auto"
                    >
                        <div className="w-[380px] h-[180px]">
                            <img
                                src={program.image}
                                alt={program.title}
                                className="w-full h-full rounded-t-[10px] object-cover"
                            />
                        </div>
                        <div className="p-5 text-left">
                            <ContentSection 
                                title={program.title} 
                                description={program.description} 
                            />
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
    );
};

export default ProgramSection;
