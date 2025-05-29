import React, { useState, useEffect } from 'react';
import heroImage from '../../assets/heroImage1.jpg';
import SimpleCard from '../../components/simpleCard';
import HeadingTitle from '../../components/heading';
import Button from '../../components/button';
import HeadingWithButton from '../../components/headingWithButton';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const AllBooks = () => {
  const [intermediateBooks, setIntermediateBooks] = useState([]);
  const [graduateBooks, setGraduateBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log('Fetching books...');
        const response = await axios.get(`${BACKEND_URL}/api/student-portal?type=book`);
        console.log('Response:', response.data);
        if (response.data.success) {
          // Separate books by academic level
          const intermediate = response.data.data.filter(book => book.level === 'Intermediate');
          const graduate = response.data.data.filter(book => book.level === 'Graduate');
          
          console.log('Intermediate books:', intermediate);
          console.log('Graduate books:', graduate);
          
          setIntermediateBooks(intermediate);
          setGraduateBooks(graduate);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/placeholder-image.jpg';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${BACKEND_URL}/${imageUrl}`;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div>
      {/* ✅ Hero Section */}
      <div
        className="relative w-full h-screen mt-16 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold sm:text-6xl font-jakarta text-white px-4 md:px-8">
            All Your Class Books in One Place <br />
            Download. Read. Learn.
          </h1>
        </div>
      </div>

      {/* ✅ Intermediate Books Section */}
      <div className="my-8 p-4">
        <div className="my-8 text-center">
          <HeadingTitle title="Intermediate Books Collection" width="640px" />
        </div>
        <HeadingWithButton headingText="Intermediate Level" buttonText="" />

        <div className="flex flex-wrap justify-center gap-8 p-6 pb-7">
          {intermediateBooks.map((book, index) => (
            <SimpleCard
              bgColor="bg-white"
              key={index}
              padding="p-0"
              width="w-[370px]"
              height="h-[450px]"
              className="flex flex-col justify-between"
            >
              <div className="w-full flex justify-center p-4">
                <img
                  src={getImageUrl(book.image)}
                  alt={book.title}
                  className="w-[150px] h-[250px] object-contain"
                />
              </div>

              <div className="border-b-8 border-black w-full my-2" />

              <div className="flex flex-col justify-between flex-1 px-5">
                <div className="text-center">
                  <h2 className="font-bold font-jakarta text-[22px]">{book.title}</h2>
                  <p className="text-gray-600 mt-2">{book.author}</p>
                </div>

                <div className="flex justify-center mb-4">
                  <Button
                    onClick={() => window.open(`${BACKEND_URL}/${book.file}`, '_blank')}
                    rounded="rounded-[10px]"
                    height="43px"
                    width="370px"
                    boxShadow={false}
                    title="View PDF"
                  />
                </div>
              </div>
            </SimpleCard>
          ))}
        </div>
      </div>

      {/* ✅ Graduate Books Section */}
      <div className="my-8 p-4 bg-gray">
        <div className="my-8 text-center">
          <HeadingTitle title="Graduate Books Collection" width="640px" />
        </div>
        <HeadingWithButton headingText="Graduate Level" buttonText="" />

        <div className="flex flex-wrap justify-center gap-8 p-6 pb-7">
          {graduateBooks.map((book, index) => (
            <SimpleCard
              bgColor="bg-white"
              key={index}
              padding="p-0"
              width="w-[370px]"
              height="h-[450px]"
              className="flex flex-col justify-between"
            >
              <div className="w-full flex justify-center p-4">
                <img
                  src={getImageUrl(book.image)}
                  alt={book.title}
                  className="w-[150px] h-[250px] object-contain"
                />
              </div>

              <div className="border-b-8 border-black w-full my-2" />

              <div className="flex flex-col justify-between flex-1 px-5">
                <div className="text-center">
                  <h2 className="font-bold font-jakarta text-[22px]">{book.title}</h2>
                  <p className="text-gray-600 mt-2">{book.author}</p>
                </div>

                <div className="flex justify-center mb-4">
                  <Button
                    onClick={() => window.open(`${BACKEND_URL}/${book.file}`, '_blank')}
                    rounded="rounded-[10px]"
                    height="43px"
                    width="370px"
                    boxShadow={false}
                    title="View PDF"
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

export default AllBooks;
