import React from 'react';
import heroImage from '../../assets/heroImage1.jpg';
import SimpleCard from '../../components/simpleCard';
import book1 from '../../assets/library.jpg';
import book2 from '../../assets/library.jpg';
import book3 from '../../assets/library.jpg';
import HeadingTitle from '../../components/heading';
import Button from '../../components/button';
import HeadingWithButton from '../../components/headingWithButton';

const AllBooks = () => {
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
    {
        title: 'Algebra Made Easy',
        category: 'Mathematics',
        author: 'Fatima Zahra',
        image: book3,
      },
      {
        title: 'Algebra Made Easy',
        category: 'Mathematics',
        author: 'Fatima Zahra',
        image: book3,
      },
      {
        title: 'Algebra Made Easy',
        category: 'Mathematics',
        author: 'Fatima Zahra',
        image: book3,
      },
      
      
  ];
  const GraduatebookData = [
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
    {
        title: 'Algebra Made Easy',
        category: 'Mathematics',
        author: 'Fatima Zahra',
        image: book3,
      },
      {
        title: 'Algebra Made Easy',
        category: 'Mathematics',
        author: 'Fatima Zahra',
        image: book3,
      },
      {
        title: 'Algebra Made Easy',
        category: 'Mathematics',
        author: 'Fatima Zahra',
        image: book3,
      },];

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

      {/* ✅ Book Section */}
      <div className="my-8 p-4">
        <div className="my-8 text-center">
          <HeadingTitle title="Explore Our Featured Books" width="640px" />
        </div>
        <HeadingWithButton headingText="Hello" buttonText="" />

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
              <div className="w-full flex justify-center p-4">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-[150px] h-[250px] object-contain"
                />
              </div>

              <div className="border-b-8 border-black w-full my-2" />

              <div className="flex flex-col justify-between flex-1 px-5">
                <div className="text-center">
                  <h2 className="font-bold font-jakarta text-[22px]">{book.title}</h2>
                </div>

                <div className="flex justify-center">
                  <Button
                  to='/academic/Detailpage'
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
        {/* ✅ Book Section */}


      </div>
      <div className="my-8 p-4 bg-gray">
  <div className="my-8 text-center">
    <HeadingTitle title="Explore Our Featured Books" width="640px" />
  </div>
  <HeadingWithButton headingText="hello" buttonText='' />

  <div className="flex flex-wrap justify-center gap-8 p-6 pb-7">
    {GraduatebookData.map((book, index) => (
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
            src={book.image}
            alt={book.title}
            className="w-[150px] h-[250px] object-contain"
          />
        </div>

        <div className="border-b-8 border-black w-full my-2" />

        <div className="flex flex-col justify-between flex-1 px-5">
          <div className="text-center">
            <h2 className="font-bold font-jakarta text-[22px]">{book.title}</h2>
          </div>

          <div className="flex justify-center">
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
    </div>
  );
};

export default AllBooks;
