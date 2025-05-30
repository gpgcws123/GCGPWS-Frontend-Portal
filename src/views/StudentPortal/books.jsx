import React, { useState, useEffect } from 'react';
import SimpleCard from '../../components/simpleCard';
import HeadingTitle from '../../components/heading';
import HeadingWithButton from '../../components/headingWithButton';
import Button from '../../components/button';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const BookCollectionCard = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/student-portal?type=book`);
        if (response.data.success) {
          // Get only the first 3 books for featured section
          setFeaturedBooks(response.data.data.slice(0, 3));
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
    <div className="my-8 p-4">
      <div className="my-8 text-center">
        <HeadingTitle title="Explore Our Featured Books" width="640px" />
      </div>

      <div>
        <HeadingWithButton headingText="Book Collection" buttonText="View All Books" to='/student-portal/All-Books' />
      </div>

      <div className="flex flex-wrap justify-center gap-8 p-6 pb-7">
        {featuredBooks.map((book, index) => (
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
  );
};

export default BookCollectionCard;
