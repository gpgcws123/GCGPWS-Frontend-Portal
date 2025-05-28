import React, { useState, useEffect } from "react";
import HeadingTitle from "../../components/heading";
import HeadingWithButton from "../../components/headingWithButton";
import SimpleCard from "../../components/simpleCard";
import PlayIcon from "../../assets/mdi_play.svg";
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const CulturalSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [culturalData, setCulturalData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCulturalData();
  }, []);

  const fetchCulturalData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/news-events/cultural/list`);
      // Get only the latest 3 activities
      const latestActivities = response.data?.data?.slice(0, 3) || [];
      setCulturalData(latestActivities);
    } catch (error) {
      console.error('Error fetching cultural data:', error);
    } finally {
      setLoading(false);
    }
  };

  const openVideoModal = (videoUrl) => {
    setCurrentVideo(`${BACKEND_URL}${videoUrl}`);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideo("");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white h-auto flex flex-col items-center px-8 pb-8 mb-7 text-black relative w-auto">
      {/* Section Title */}
      <div className="w-full flex items-center justify-center relative mb-12 mt-12">
        <HeadingTitle title="Cultural Activities" width="220px" />
      </div>
      <HeadingWithButton headingText="Latest Activities" buttonText="All Cultural" to="/news/allcultural" />

      {/* Cultural Cards */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {culturalData.map((item) => (
            <SimpleCard
              key={item._id}
              padding="0px"
              bgColor="bg-gray"
              className="flex flex-col h-[400px] shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden"
            >
              <div className="relative group h-[320px]">
                {item.image ? (
                  <img
                    src={`${BACKEND_URL}${item.image}`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
                {item.video && (
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-black hover:bg-opacity-40 transition-all duration-300"
                    onClick={() => openVideoModal(item.video)}
                  >
                    <div className="bg-black bg-opacity-50 p-4 rounded-full transform hover:scale-110 transition-transform duration-300">
                      <img src={PlayIcon} alt="Play" className="w-12 h-12" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-center">{item.title}</h3>
              </div>
            </SimpleCard>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white p-9 rounded-lg relative w-full max-w-[800px]">
            <button
              onClick={closeModal}
              className="absolute z-20 top-2 right-2 text-black text-2xl font-bold"
            >
              ✖
            </button>
            <video
              src={currentVideo}
              className="w-full h-[400px] rounded"
              controls
              autoPlay
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CulturalSection;
