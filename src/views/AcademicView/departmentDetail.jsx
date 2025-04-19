import React from 'react';
import heroImage from '../../assets/heroImage1.jpg';
import HeadingTitle from '../../components/heading';

const DetailPage = () => {
  // Sample data for the table
  const educationalResources = [
    { id: 1, name: 'Physics Fundamentals', type: 'Textbook', author: 'Dr. Ayesha Khan', year: 2023 },
    { id: 2, name: 'Organic Chemistry', type: 'Textbook', author: 'Prof. Sara Ali', year: 2022 },
    { id: 3, name: 'Algebra Made Easy', type: 'Workbook', author: 'Fatima Zahra', year: 2024 },
    { id: 4, name: 'History of Science', type: 'Reference', author: 'Ahmed Hassan', year: 2021 },
    { id: 5, name: 'Introduction to Literature', type: 'Anthology', author: 'Zainab Malik', year: 2023 }
  ];

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

      {/* ✅ Heading and Paragraphs Section */}
      <div className="container mx-auto my-12 px-4">
        <div className="text-center mb-8">
          <HeadingTitle title="Educational Resources for Every Student" width="640px" />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-6">
            Our comprehensive collection of educational materials is designed to support learners at every level. From foundational textbooks to advanced research materials, we provide resources that empower students to excel in their academic pursuits.
          </p>
          
          <p className="text-lg mb-6">
            Each resource has been carefully selected and reviewed by educational experts to ensure accuracy, relevance, and alignment with modern curriculum standards. Our mission is to make quality education accessible to all students regardless of their background or location.
          </p>
          
          <p className="text-lg mb-8">
            Explore our catalog below to find materials suitable for your educational needs. Whether you're studying for exams, conducting research, or simply expanding your knowledge, our collection has something valuable for you.
          </p>
        </div>
      </div>

      {/* ✅ Table Section */}
      <div className="container mx-auto my-12 px-4">
        <div className="text-center mb-8">
          <HeadingTitle title="Available Educational Resources" width="640px" />
        </div>
        
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Resource Name</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Author</th>
                <th className="py-3 px-4 text-left">Publication Year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {educationalResources.map((resource) => (
                <tr key={resource.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">{resource.id}</td>
                  <td className="py-4 px-4 font-medium">{resource.name}</td>
                  <td className="py-4 px-4">{resource.type}</td>
                  <td className="py-4 px-4">{resource.author}</td>
                  <td className="py-4 px-4">{resource.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;