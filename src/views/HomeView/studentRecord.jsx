import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SimpleCard from '../../components/simpleCard';
import HeadingTitle from '../../components/heading';

const BACKEND_URL = 'http://localhost:5000';

const StatsSection = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log('Fetching stats from:', `${BACKEND_URL}/api/homepage/stats`);
        // Add timestamp to prevent caching
        const timestamp = new Date().getTime();
        const response = await axios.get(`${BACKEND_URL}/api/homepage/stats?t=${timestamp}`);
        console.log('Full API response:', response);
        
        if (response.data) {
          console.log('Response data:', response.data);
          if (response.data.success && response.data.data) {
            console.log('Stats data:', response.data.data);
            if (response.data.data.items) {
              console.log('Stats items:', response.data.data.items);
              setStats(response.data.data.items);
            } else {
              console.warn('No items array in data:', response.data.data);
              // Try to use the data directly if it's an array
              if (Array.isArray(response.data.data)) {
                console.log('Using data array directly');
                setStats(response.data.data);
              }
            }
          } else {
            console.error('No success or data in response:', response.data);
          }
        } else {
          console.error('No data in response');
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        console.error('Error details:', error.response || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="text-gray-700 body-font">
        <HeadingTitle title="Our Successful Count" width='420px' />
        <div className="container px-5 relative top-[76px] mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!stats || stats.length === 0) {
    return null;
  }

  // Only show stats from backend
  if (!stats || stats.length === 0) {
    return (
      <section className="text-gray-700 body-font">
        <HeadingTitle title="Our Successful Count" width='420px' />
        <div className="container px-5 relative top-[76px] mx-auto">
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">No statistics available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="text-gray-700 mt-[32px] body-font">
      <HeadingTitle title="Our Success Counts" width="390px" />
      <div className="container relative top-[120px] mx-auto">
        <div className="flex flex-wrap -m-4 text-center">
          {stats.map((item, index) => (
            <div key={index} className="p-4 md:w-1/4 sm:w-1/2 w-full">

              {/* ✅ Whole Card */}
              <SimpleCard 
                padding="p-6" 
                width="w-[308px]" 
                height="h-[250px]" 
                bgColor={index % 2 === 0 ? 'bg-gray' : 'bg-black'}
              >

                {/* ✅ Image inside SimpleCard with width 80px and center aligned */}
                <SimpleCard 
                  width="w-[80px]" 
                  height="h-auto" 
                  padding="p-4" 
                  className="mx-auto" 
                  bgColor={index % 2 === 0 ? 'bg-White' : 'bg-gray'}
                >
                  <img 
                    src={item.image.startsWith('http') ? item.image : item.image.startsWith('/') ? `${BACKEND_URL}${item.image}` : `${BACKEND_URL}/${item.image}`}
                    alt={item.title} 
                    className="w-12 h-12 object-contain mx-auto"
                    onError={(e) => {
                      console.error('Failed to load image:', item.image);
                      e.target.src = '/assets/Graduate.svg';
                    }}
                  />
                </SimpleCard >

                {/* ✅ Count and Label */}
                <h2 className={`title-font font-medium text-3xl mt-4 ${index % 2 === 0 ? 'text-gray-900' : 'text-White'}`}>
                  {item.number || '0'}
                </h2>
                <p className={`leading-relaxed ${index % 2 === 0 ? 'text-gray-600' : 'text-White'}`}>
                  {item.title}
                </p>

              </SimpleCard>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
