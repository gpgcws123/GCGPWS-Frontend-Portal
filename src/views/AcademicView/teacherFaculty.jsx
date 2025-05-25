import React, { useState, useEffect } from 'react';
import ImageCard from '../../components/imageCard';
import ContentSection from '../../components/contextSection';
import axios from 'axios';
import SimpleCard from '../../components/simpleCard';
import teacher1 from '../../assets/faculty.jpg';
import teacher2 from '../../assets/faculty.jpg';
import teacher3 from '../../assets/faculty.jpg';
import HeadingTitle from '../../components/heading';
import HeadingWithButton from '../../components/headingWithButton';
import { Link } from "react-router-dom";

const BACKEND_URL = 'http://localhost:8000';

const TeacherFacultySection = () => {
    const [facultyData, setFacultyData] = useState({
        title: "Teaching Faculty",
        description: "Our distinguished faculty comprises experienced educators and subject matter experts dedicated to academic excellence. They bring extensive knowledge and innovative teaching methods to provide students with quality education and mentorship.",
        imageUrl: "/images/faculty-default.jpg"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFacultyData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/academic/faculty`);
                if (response.data && response.data.data) {
                    const data = Array.isArray(response.data.data) 
                        ? response.data.data[0] 
                        : response.data.data;
                    
                    if (data && data.status === 'active') {
                        setFacultyData({
                            title: data.title || facultyData.title,
                            description: data.description || facultyData.description,
                            imageUrl: data.images && data.images[0] ? `${BACKEND_URL}${data.images[0]}` : facultyData.imageUrl
                        });
                    }
                }
            } catch (err) {
                console.error('Error fetching faculty data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFacultyData();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    const facultyDataCard = [
        {
            name: 'Miss Fareeha',
            designation: 'Lecturer',
            subject: 'Computer',
            image: teacher1,
        },
        {
            name: 'Miss Saba',
            designation: 'Lecturer',
            subject: 'English',
            image: teacher2,
        },
        {
            name: 'Miss Yasemin',
            designation: 'Lecturer',
            subject: 'Mathematics',
            image: teacher3,
        },
    ];

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray">
            <div className="flex flex-col md:flex-row-reverse items-center justify-between max-w-[1350px] w-full p-8 gap-8">
                <div className="md:w-1/2">
                    <ContentSection 
                        title={facultyData.title}
                        description={facultyData.description}
                    />
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <ImageCard 
                        src={facultyData.imageUrl}
                        width="580px"
                        height="460px"
                        alt="Teaching Faculty"
                    />
                </div>
            </div>
            <div className="bg-gray  my-16 p-4">
                <div className='my-8 text-center'>
                    <HeadingTitle title="Our Professional Teaching Faculty" width='640px'/>
                </div>
                <div >
                    <HeadingWithButton headingText='Our Teachers Faculty at GPGCWS' buttonText='Meet Our Faculty' to='/academic/allteacherfaculty'/> 
                </div>
                <div className="flex flex-wrap justify-center gap-8 p-6 pb-7">
                    {facultyDataCard.map((teacher, index) => (
                        <SimpleCard
                            bgColor='bg-white'
                            key={index}
                            padding='p-0'
                            width="w-[370px]"
                            height="h-auto"
                        >
                            {/* ✅ Teacher Image */}
                            <div className="h-[270px] w-full">
                                <img
                                    src={teacher.image}
                                    alt={`${teacher.name} - ${teacher.subject}`}
                                    className="w-full h-full rounded-[10px] object-cover"
                                />
                            </div>

                            {/* ✅ Teacher Details */}
                            <div className="p-5 text-center">
                                <h2 className="font-bold font-jakarta text-[32px]">{teacher.name}</h2>
                                <p className="text-black font-poppins mb-2 font-medium text-[24px]">{teacher.designation}</p>
                                <Link to='/academic/Detailpage'>
                                    {/* ✅ Subject Tag */}
                                    <div className="flex justify-center">
                                        <span className="bg-black text-white px-7 py-1 font-jakarta rounded-[10px] text-[24px] font-bold">
                                            {teacher.subject}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </SimpleCard>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeacherFacultySection;