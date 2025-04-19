import React from 'react';
import SimpleCard from '../../components/simpleCard';
import book1 from '../../assets/library.jpg';
import book2 from '../../assets/library.jpg';
import book3 from '../../assets/library.jpg';
import HeadingTitle from '../../components/heading';
import HeadingWithButton from '../../components/headingWithButton';
import Button from '../../components/button';
const BookCollectionCard = () => {
  const bookData = [
    {
      title: 'Physics Fundamentals',
      category: 'Science',
      author: 'Dr. Ayesha Khan',
      image: book1,
    },
    {
      title: 'Organic Chemistry',
      category: 'Chemistry',
      author: 'Prof. Sara Ali',
      image: book2,
    },
    {
      title: 'Algebra Made Easy',
      category: 'Mathematics',
      author: 'Fatima Zahra',
      image: book3,
    },
  ];

  return (
    <div className="my-8 p-4">
    
        <div className="my-8 text-center">
          <HeadingTitle title="Explore Our Featured Books" width="640px" />
        </div>

        <div>
          <HeadingWithButton headingText="Book Collection" buttonText="View All Books"                to='/student-portal/All-Books' />
        </div>

        <div className="flex flex-wrap justify-center gap-8 p-6 pb-7">
          {bookData.map((book, index) => (
          <SimpleCard
          bgColor="bg-white"
          key={index}
          padding="p-0"
          width="w-[370px]"
          height="h-[450px]"
          className="flex flex-col justify-between"
        >
          {/* ✅ Book Image */}
          <div className="w-full flex justify-center p-4">
            <img
              src={book.image}
              alt={book.title}
              className="w-[150px] h-[250px] object-contain"
            />
          </div>
        
          {/* ✅ Border */}
          <div className="border-b-8 border-black w-full my-2" />
        
          {/* ✅ Book Details with Button at Bottom */}
          <div className="flex flex-col justify-between flex-1 px-5 ">
            <div className="text-center">
              <h2 className="font-bold font-jakarta text-[22px]">{book.title}</h2>
              
            </div>
        
            <div className=" flex justify-center">
              <Button
                rounded="rounded-[10px]"
                height="43px"
                width="370px"
                boxShadow={false}
                title="Learn More"
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
