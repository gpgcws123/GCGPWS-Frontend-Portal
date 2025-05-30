import React, { useState, useEffect } from "react";
import axios from "axios";
import BaseCard from "../../components/card";
import ContentSection from "../../components/contextSection";
import fallbackImage from "../../assets/heroImage7.jpg";
import Button from "../../components/button";
import ImageCard from "../../components/imageCard";
import Heading from "../../components/heading";
import StatsSection from "./studentRecord";

const BACKEND_URL = 'http://localhost:5000';

export default function Message() {
  const [principalData, setPrincipalData] = useState({
    title: "Principal's Message",
    description: "Welcome to Government Post Graduate College for Women...",
    image: "",
    buttonText: "Read More",
    buttonLink: "/academic/Detailpage"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrincipalData = async () => {
      try {
        console.log('Fetching principal data from:', `${BACKEND_URL}/api/homepage/principal`);
        const timestamp = new Date().getTime();
        const response = await axios.get(`${BACKEND_URL}/api/homepage/principal?t=${timestamp}`);
        console.log('Principal data response:', response.data);
        
        if (response.data && response.data.success && response.data.data) {
          setPrincipalData({
            title: response.data.data.title || "Principal's Message",
            description: response.data.data.description || "Welcome to Government Post Graduate College for Women...",
            image: response.data.data.image || "",
            buttonText: response.data.data.buttonText || "Read More",
            buttonLink: response.data.data.buttonLink || "/academic/Detailpage"
          });
        }
      } catch (error) {
        console.error('Error fetching principal data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrincipalData();
  }, []);

  return (
    <>
      <div className="bg-[#ffff] flex flex-col h-[100%] items-center py-8 text-black">
        <div className="my-8">
          <Heading title="Principal Message" />
        </div>
        {/* Wrapper div to center content */}
        <div className="flex flex-col mt-8 lg:flex-row gap-6 max-w-4xl items-center justify-center">
          {/* First BaseCard with image */}
          <div className="flex justify-center">
            <ImageCard 
              src={principalData.image 
                ? (principalData.image.startsWith('http') 
                  ? principalData.image 
                  : principalData.image.startsWith('/') 
                    ? `${BACKEND_URL}${principalData.image}` 
                    : `${BACKEND_URL}/${principalData.image}`)
                : fallbackImage} 
              width="516px" 
              height="330px" 
              onError={(e) => {
                console.error('Failed to load principal image');
                e.target.src = fallbackImage;
              }}
            />
          </div>

          {/* Second BaseCard with ContentSection */}
          <div className="flex justify-center">
            <BaseCard height="518px" width="563px" bgColor="#b2b2b2" isFlexible>
              <div className="text-center mt-6">
                <ContentSection
                  title={principalData.title}
                  description={principalData.description}
                />
                <div className="mt-7">
                  <Button 
                    height="43px" 
                    width="145px" 
                    boxShadow={false} 
                    title={principalData.buttonText} 
                    to={principalData.buttonLink} 
                  />
                </div>
              </div>
            </BaseCard>
          </div>
        </div>

      </div>
      <div className="mt-[38px]">
        <StatsSection />
      </div>
    </>
  );
}
