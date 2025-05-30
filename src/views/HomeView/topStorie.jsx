import React, { useState, useEffect } from "react";
import BaseCard from "../../components/card";
import ContentSection from "../../components/contextSection";
import Button from "../../components/button";
import image1 from "../../assets/topstories.jpg";
import ImageCard from "../../components/imageCard";
import NoticeBoard from "./noticeboard";
import HeadingTitle from "../../components/heading";
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const fallbackStories = [
  {
    image: image1,
    title: "Top Stories",
    description: "1. College Admissions Open for 2025-2026 Academic Year.\n2. GPGCWS Celebrates Annual Cultural Fest with Amazing Performances.\n3. Important Updates: Exam Schedule & Academic Calendar Released.\n4. Exam Results Declared: Check Your Performance Online Now."
  },
  {
    image: image1,
    title: "Academic News",
    description: "1. New Research Programs Launched for Advanced Students.\n2. Faculty Development Workshop Successfully Conducted.\n3. International Collaboration Programs Now Available.\n4. Scholarship Opportunities for Deserving Students Announced."
  },
  {
    image: image1,
    title: "Campus Updates",
    description: "1. New Library Wing Inaugurated with Modern Facilities.\n2. Sports Complex Renovation Project Completed.\n3. Digital Learning Resources Upgraded Successfully.\n4. Campus WiFi Infrastructure Enhanced for Better Connectivity."
  },
  {
    image: image1,
    title: "Student Activities",
    description: "1. Annual Sports Meet Scheduled for Next Month.\n2. Student Council Elections Campaign Begins.\n3. Career Guidance Sessions Organized for Final Year Students.\n4. Inter-College Competition Registrations Now Open."
  },
  {
    image: image1,
    title: "Important Notices",
    description: "1. Fee Payment Deadline Extended by Two Weeks.\n2. COVID-19 Safety Protocols Updated for Campus.\n3. Parent-Teacher Meeting Scheduled for This Weekend.\n4. Holiday Schedule Released for Academic Session."
  }
];

export default function TopStories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [stories, setStories] = useState(fallbackStories);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/homepage/topstories`);
        if (response.data.success && response.data.data.items) {
          const items = response.data.data.items.map(item => ({
            ...item,
            image: item.image ? `${BACKEND_URL}/${item.image}` : image1
          }));
          setStories(items);
        }
      } catch (error) {
        console.error('Error fetching top stories:', error);
        // Using fallback stories
        setStories(fallbackStories);
      }
    };
    fetchStories();
  }, []);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && stories.length > 0) {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
          setIsAnimating(false);
        }, 300);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating, stories.length]);

  const currentStory = stories[currentIndex] || fallbackStories[0];

  return (
    <div className="bg-gray h-[100%] flex flex-col items-center py-8 text-black">
      <HeadingTitle title="Top Stories" />

      <div className="mt-[40px] h-full grid grid-cols-12 gap-x-10 w-full max-w-[85%] items-center">
        <div className="col-span-12 lg:col-span-5 flex justify-center overflow-hidden">
          <div
            className={`transform transition-transform duration-300 ease-in-out ${isAnimating ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}
            style={{
              animation: isAnimating 
                ? 'slideOutLeft 0.3s ease-in-out forwards' 
                : 'slideInLeft 0.3s ease-in-out forwards'
            }}
          >
            <ImageCard src={currentStory.image} width="100%" height="330px" />
          </div>
        </div>

        {/* Content Card Section with Right Animation */}
        <div className="col-span-12 lg:col-span-7 flex justify-center whitespace-pre-line overflow-hidden">
          <div
            className={`transform transition-transform duration-300 ease-in-out ${isAnimating ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}
            style={{
              animation: isAnimating 
                ? 'slideOutRight 0.3s ease-in-out forwards' 
                : 'slideInRight 0.3s ease-in-out forwards'
            }}
          >
            <BaseCard height="330px" bgColor="#ffff">
              <ContentSection
                title={currentStory.title}
                description={currentStory.description}
              />
              <Button 
                height="43px" 
                width="145px" 
                boxShadow={false} 
                title="Read More" 
                to='/academic/Detailpage' 
              />
            </BaseCard>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="flex space-x-2 mt-6">
        {stories.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsAnimating(false);
                }, 300);
              }
            }}
          />
        ))}
      </div>

      <NoticeBoard />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutLeft {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-100%);
            opacity: 0;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}