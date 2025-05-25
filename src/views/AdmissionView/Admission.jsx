import React, { useState, useEffect } from 'react';
import ImageCard from '../../components/imageCard';
import ContentSection from '../../components/contextSection';
import axios from 'axios';
import HeadingTitle from "../../components/heading";
import SimpleCard from "../../components/simpleCard";
import Button from "../../components/button";
import { FaUsers, FaCalendarAlt, FaClock } from "react-icons/fa"; 
import HeadingWithButton from "../../components/headingWithButton";

const BACKEND_URL = 'http://localhost:8000';

const AdmissionSection = () => {
    const [admissionData, setAdmissionData] = useState({
        title: "Admissions",
        description: "Join our prestigious institution for quality education and personal growth. Our admission process is designed to be transparent and student-friendly. We welcome talented students who are eager to learn and excel in their chosen fields.",
        imageUrl: "/images/admission-default.jpg"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdmissionData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/admissions`);
                if (response.data && response.data.data) {
                    const data = Array.isArray(response.data.data) 
                        ? response.data.data[0] 
                        : response.data.data;
                    
                    if (data && data.status === 'active') {
                        setAdmissionData({
                            title: data.title || admissionData.title,
                            description: data.description || admissionData.description,
                            imageUrl: data.images && data.images[0] ? `${BACKEND_URL}${data.images[0]}` : admissionData.imageUrl
                        });
                    }
                }
            } catch (err) {
                console.error('Error fetching admission data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAdmissionData();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col md:flex-row items-center justify-between max-w-[1350px] w-full p-8 gap-8">
                <div className="md:w-1/2">
                    <ContentSection 
                        title={admissionData.title}
                        description={admissionData.description}
                    />
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <ImageCard 
                        src={admissionData.imageUrl}
                        width="580px"
                        height="460px"
                        alt="Admissions"
                    />
                </div>
            </div>
        </div>
    );
};

export default AdmissionSection;
