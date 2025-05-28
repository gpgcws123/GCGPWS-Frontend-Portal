import React, { useEffect, useState } from 'react';
import axios from 'axios';
import heroImage from '../../assets/heroImage1.jpg';
import SimpleCard from '../../components/simpleCard';
import HeadingTitle from '../../components/heading';
import HeadingWithButton from '../../components/headingWithButton';
import PlayIcon from "../../assets/mdi_play.svg";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const BACKEND_URL = 'http://localhost:5000';
const ITEMS_PER_PAGE = 9;

const AllCulturals = () => {
  const [culturalData, setCulturalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCulturalData();
  }, []);

  const fetchCulturalData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/news-events/cultural/list`);
      const allData = response.data?.data || [];
      setCulturalData(allData);
      setTotalPages(Math.ceil(allData.length / ITEMS_PER_PAGE));
    } catch (error) {
      console.error('Error fetching cultural data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return culturalData.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openVideoModal = (videoUrl) => {
    setCurrentVideo(`${BACKEND_URL}${videoUrl}`);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideo("");
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>
    );

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="dots1" className="px-3 py-2">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === i
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-50'
            }`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="dots2" className="px-3 py-2">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    );

    return pages;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative w-full h-screen mt-16 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold sm:text-6xl font-jakarta text-white px-4 md:px-8">
            Cultural Activities <br />
            View All Activities
          </h1>
        </div>
      </div>

      <div className="my-8 p-4 bg-white">
        <div className="my-8 text-center">
          <HeadingTitle title="Cultural Activities" width="640px" />
        </div>
        <HeadingWithButton headingText="Latest Activities" buttonText="" />

        <div className="w-full flex flex-wrap justify-center gap-6">
          {getCurrentPageData().map((item) => (
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8 bg-white px-4 py-3 rounded-lg shadow">
            {renderPagination()}
          </div>
        )}

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
    </div>
  );
};

export default AllCulturals;
