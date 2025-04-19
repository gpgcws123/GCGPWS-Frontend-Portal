import React from 'react';
import heroImage from '../../assets/heroImage1.jpg';
import SimpleCard from '../../components/simpleCard';
import note1 from '../../assets/library.jpg';
import note2 from '../../assets/library.jpg';
import note3 from '../../assets/library.jpg';
import HeadingTitle from '../../components/heading';
import Button from '../../components/button';
import HeadingWithButton from '../../components/headingWithButton';

const AllNotes= () => {
   const notesData = [
      {
        title: 'Class 9 Physics Notes',
        subject: 'Physics',
        author: 'Prof. Ayesha Khan',
        image: note1,
      },
      {
        title: 'Organic Chemistry Notes',
        subject: 'Chemistry',
        author: 'Dr. Sara Ali',
        image: note2,
      },
      {
        title: 'Maths Algebra Notes',
        subject: 'Mathematics',
        author: 'Fatima Zahra',
        image: note3,
      },
    ];
    const notesCollegeData = [
        {
          title: 'Class 9 Physics Notes',
          subject: 'Physics',
          author: 'Prof. Ayesha Khan',
          image: note1,
        },
        {
          title: 'Organic Chemistry Notes',
          subject: 'Chemistry',
          author: 'Dr. Sara Ali',
          image: note2,
        },
        {
          title: 'Maths Algebra Notes',
          subject: 'Mathematics',
          author: 'Fatima Zahra',
          image: note3,
        },
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

      {/* ✅ Book Section */}
       <div className="mt-6  bg-white ">
           
              <div className="my-9 pt-4 text-center">
                <HeadingTitle title="Download Handwritten Notes" width="640px" />
              </div>
      
              <div>
                <HeadingWithButton headingText="Notes Collection" buttonText="" />
              </div>
      
              <div className="flex flex-wrap justify-center gap-8 p-6 pb-7">
                {notesData.map((note, index) => (
                  <SimpleCard
                  bgColor="bg-white"
                  key={index}
                  padding="p-0"
                  width="w-[370px]"
                  height="h-[400px]" // Give fixed height for consistent layout
                  className="flex flex-col justify-between"
                >
                  {/* ✅ Note Image - full width */}
                  <div className="w-full h-[220px]">
                    <img
                      src={note.image}
                      alt={note.title}
                      className="w-full h-full object-cover rounded-t-[10px]"
                    />
                  </div>
                
                  {/* ✅ Note Content */}
                  <div className="flex flex-col justify-between h-full ">
                    <div>
                      <div className="border-b-8 border-black w-full " />
                
                      <h2 className="font-bold font-jakarta text-[22px] text-center">{note.title}</h2>
                      <p className="text-black font-poppins mb-2 font-medium text-[17px] text-center">
                        {note.author}
                      </p>
                
      
                    </div>
                
                    {/* ✅ Button pinned at the bottom */}
                    <div className="flex justify-center">
                      <Button
                        rounded="rounded-b-[10px]"
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
          <div className="mt-6  bg-gray ">
           
           <div className="my-9 pt-4 text-center">
             <HeadingTitle title="Download Handwritten Notes" width="640px" />
           </div>
   
           <div>
             <HeadingWithButton headingText="Notes Collection" buttonText="" />
           </div>
   
           <div className="flex flex-wrap justify-center gap-8 p-6 pb-7">
             {notesCollegeData.map((note, index) => (
               <SimpleCard
               bgColor="bg-white"
               key={index}
               padding="p-0"
               width="w-[370px]"
               height="h-[400px]" // Give fixed height for consistent layout
               className="flex flex-col justify-between"
             >
               {/* ✅ Note Image - full width */}
               <div className="w-full h-[220px]">
                 <img
                   src={note.image}
                   alt={note.title}
                   className="w-full h-full object-cover rounded-t-[10px]"
                 />
               </div>
             
               {/* ✅ Note Content */}
               <div className="flex flex-col justify-between h-full ">
                 <div>
                   <div className="border-b-8 border-black w-full " />
             
                   <h2 className="font-bold font-jakarta text-[22px] text-center">{note.title}</h2>
                   <p className="text-black font-poppins mb-2 font-medium text-[17px] text-center">
                     {note.author}
                   </p>
             
   
                 </div>
             
                 {/* ✅ Button pinned at the bottom */}
                 <div className="flex justify-center">
                   <Button
                     rounded="rounded-b-[10px]"
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

export default AllNotes;
