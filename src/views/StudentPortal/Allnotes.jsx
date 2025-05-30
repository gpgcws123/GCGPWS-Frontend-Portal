import React, { useState, useEffect } from 'react';
import heroImage from '../../assets/heroImage1.jpg';
import SimpleCard from '../../components/simpleCard';
import HeadingTitle from '../../components/heading';
import Button from '../../components/button';
import HeadingWithButton from '../../components/headingWithButton';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

const AllNotes = () => {
  const [intermediateNotes, setIntermediateNotes] = useState([]);
  const [graduateNotes, setGraduateNotes] = useState([]);
  const [postGraduateNotes, setPostGraduateNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/student-portal?type=note`);
        if (response.data.success) {
          // Separate notes by academic level
          const intermediate = response.data.data.filter(note => note.level === 'Intermediate');
          const graduate = response.data.data.filter(note => note.level === 'Graduate');
          const postGraduate = response.data.data.filter(note => note.level === 'Post Graduate');
          
          setIntermediateNotes(intermediate);
          setGraduateNotes(graduate);
          setPostGraduateNotes(postGraduate);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notes:', error);
        setLoading(false);
      }
    };

    fetchNotes();
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
            Download Study Notes <br />
            Learn and Excel
          </h1>
        </div>
      </div>

      {/* ✅ Intermediate Notes Section */}
      <div className="mt-6 bg-white">
        <div className="my-9 pt-4 text-center">
          <HeadingTitle title="Intermediate Level Notes" width="640px" />
        </div>
        <HeadingWithButton headingText="Notes Collection" buttonText="" />

        <div className="flex flex-wrap justify-center gap-8 p-6 pb-7">
          {intermediateNotes.map((note, index) => (
            <SimpleCard
              bgColor="bg-white"
              key={index}
              padding="p-0"
              width="w-[370px]"
              height="h-[400px]"
              className="flex flex-col justify-between"
            >
              <div className="w-full h-[220px]">
                <img
                  src={getImageUrl(note.image)}
                  alt={note.title}
                  className="w-full h-full object-cover rounded-t-[10px]"
                />
              </div>

              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="border-b-8 border-black w-full" />
                  <h2 className="font-bold font-jakarta text-[22px] text-center mt-2">{note.title}</h2>
                  <p className="text-black font-poppins mb-2 font-medium text-[17px] text-center">
                    {note.subject}
                  </p>
                  <p className="text-gray-600 px-4 text-center">{note.description}</p>
                </div>

                <div className="flex justify-center mb-4">
                  <Button
                    onClick={() => window.open(`${BACKEND_URL}/${note.file}`, '_blank')}
                    rounded="rounded-b-[10px]"
                    height="43px"
                    width="370px"
                    boxShadow={false}
                    title="Download Notes"
                  />
                </div>
              </div>
            </SimpleCard>
          ))}
        </div>
      </div>

      {/* ✅ Graduate Notes Section */}
      <div className="mt-6 bg-gray">
        <div className="my-9 pt-4 text-center">
          <HeadingTitle title="Graduate Level Notes" width="640px" />
        </div>
        <HeadingWithButton headingText="Notes Collection" buttonText="" />

        <div className="flex flex-wrap justify-center gap-8 p-6 pb-7">
          {graduateNotes.map((note, index) => (
            <SimpleCard
              bgColor="bg-white"
              key={index}
              padding="p-0"
              width="w-[370px]"
              height="h-[400px]"
              className="flex flex-col justify-between"
            >
              <div className="w-full h-[220px]">
                <img
                  src={getImageUrl(note.image)}
                  alt={note.title}
                  className="w-full h-full object-cover rounded-t-[10px]"
                />
              </div>

              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="border-b-8 border-black w-full" />
                  <h2 className="font-bold font-jakarta text-[22px] text-center mt-2">{note.title}</h2>
                  <p className="text-black font-poppins mb-2 font-medium text-[17px] text-center">
                    {note.subject}
                  </p>
                  <p className="text-gray-600 px-4 text-center">{note.description}</p>
                </div>

                <div className="flex justify-center mb-4">
                  <Button
                    onClick={() => window.open(`${BACKEND_URL}/${note.file}`, '_blank')}
                    rounded="rounded-b-[10px]"
                    height="43px"
                    width="370px"
                    boxShadow={false}
                    title="Download Notes"
                  />
                </div>
              </div>
            </SimpleCard>
          ))}
        </div>
      </div>

      {/* ✅ Post Graduate Notes Section */}
      <div className="mt-6 bg-white">
        <div className="my-9 pt-4 text-center">
          <HeadingTitle title="Post Graduate Level Notes" width="640px" />
        </div>
        <HeadingWithButton headingText="Notes Collection" buttonText="" />

        <div className="flex flex-wrap justify-center gap-8 p-6 pb-7">
          {postGraduateNotes.map((note, index) => (
            <SimpleCard
              bgColor="bg-white"
              key={index}
              padding="p-0"
              width="w-[370px]"
              height="h-[400px]"
              className="flex flex-col justify-between"
            >
              <div className="w-full h-[220px]">
                <img
                  src={getImageUrl(note.image)}
                  alt={note.title}
                  className="w-full h-full object-cover rounded-t-[10px]"
                />
              </div>

              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="border-b-8 border-black w-full" />
                  <h2 className="font-bold font-jakarta text-[22px] text-center mt-2">{note.title}</h2>
                  <p className="text-black font-poppins mb-2 font-medium text-[17px] text-center">
                    {note.subject}
                  </p>
                  <p className="text-gray-600 px-4 text-center">{note.description}</p>
                </div>

                <div className="flex justify-center mb-4">
                  <Button
                    onClick={() => window.open(`${BACKEND_URL}/${note.file}`, '_blank')}
                    rounded="rounded-b-[10px]"
                    height="43px"
                    width="370px"
                    boxShadow={false}
                    title="Download Notes"
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

export default AllNotes;
