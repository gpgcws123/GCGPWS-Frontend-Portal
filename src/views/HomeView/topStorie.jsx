import React from "react";
import BaseCard from "../../components/card";
import ContentSection from "../../components/contextSection";
import Button from "../../components/button";
import SimpleCard from "../../components/simpleCard"
import image1 from "../../assets/heroImage2.jpg"
export default function TopStories() {
  return (
    <div className="bg-[#b2b2b2] min-h-screen flex flex-col items-center py-8 text-[#070707]">
      <h2 className="text-3xl font-bold mb-6 underline text-[#070707]">Top Stories</h2>
      <div className="flex gap-6 max-w-4xl">
        {/* First BaseCard with image */}
        <BaseCard isFlexible>
          <div className=" w-full h-full">
            <img
              src={image1} // Replace with actual image URL
              alt="Top Story Image"
              className="w-full h-full object-cover"
            />
          </div>
        </BaseCard>

        {/* Second BaseCard with ContentSection and Read More button */}
        <BaseCard bgColor="#ffff" isFlexible>
          <ContentSection
            title="GPGCWS Lab Renovation"
            description="The computer lab has been upgraded with modern high-performance systems, high-speed internet, and an interactive smart board. With improved furniture and ventilation, the renovation aims to enhance the learning environment, supporting students in coding, research, and projects. This upgrade reflects a commitment to providing students with the best technological resources."
          />
          {/* Date and Read More button */}
          <div className="mt-4 flex justify-between items-center">
          
            <Button
            width="125px"
            text="#070707"
            height="40px"
            bgColor="#efff11"
            hoverColor="#F5FF70"
              title="Read More"
              onClick={() => alert("Redirect to full story")} // Replace with navigation logic
            />
           <SimpleCard height="h-[40px]" width="w-[125px]" padding='p-2' className="flex justify-center"><h1 className="font-semibold" >Date:</h1><p className="font-normal" >2/02/2003</p></SimpleCard>  
          </div>
        </BaseCard>
      </div>
    </div>
  );
}
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import BaseCard from "../../components/card";
// import ContentSection from "../../components/contextSection";
// import Button from "../../components/button";
// import SimpleCard from "../../components/simpleCard";
// import image1 from "../../assets/pic1.jpg";

// export default function TopStories() {
//   const [currentStory, setCurrentStory] = useState(0);

//   // Stories data
//   const stories = [
//     {
//       image: image1,
//       title: "GCU, Civil Services Academy sign accord for academic collaboration",
//       description:
//         "A two-day conference titled “Innovations and Interventions: Enhancing Mental Health through Clinical Psychology” concluded at GC University Lahore. Addressing the closing ceremony, Vice Chancellor Prof. Dr. Muhammad Ali emphasized the critical importance of mental health in developing countries.",
//       date: "02/02/2003",
//     },
//     {
//       image: image1,
//       title: "Second Story Title Here",
//       description:
//         "This is a brief description of the second story. Add relevant information to make it engaging for the readers.",
//       date: "03/03/2004",
//     },
//     {
//       image: image1,
//       title: "Third Story Title Here",
//       description:
//         "This is a brief description of the third story. Add relevant information to make it engaging for the readers.",
//       date: "04/04/2005",
//     },
//   ];

//   // Update the current story every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentStory((prev) => (prev + 1) % stories.length); // Cycle through stories
//     }, 5000); // 5 seconds

//     return () => clearInterval(interval);
//   }, [stories.length]);

//   // Animation Variants
//   const imageVariant = {
//     hidden: { opacity: 0, x: -200 }, // Start fully off-screen (left)
//     visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }, // Slide in from left
//     exit: { opacity: 0, x: -200, transition: { duration: 0.6 } }, // Slide out to the left
//   };

//   const contentVariant = {
//     hidden: { opacity: 0, x: 200 }, // Start fully off-screen (right)
//     visible: { opacity: 1, x: 0, transition: { duration: 1 } }, // Slide in from right
//     exit: { opacity: 0, x: 200, transition: { duration: 1 } }, // Slide out to the right
//   };

//   return (
//     <div className="bg-white min-h-screen flex flex-col items-center py-8 text-black">
//       <h2 className="text-2xl font-bold mb-6 text-black">Top Stories</h2>
//       <div className="flex flex-col gap-8 max-w-4xl">
//         <AnimatePresence>
//           {/* Only render the current story */}
//           <div key={currentStory} className="flex gap-6">
//             {/* Image Section */}
//             <motion.div
//               className="flex-1"
//               variants={imageVariant}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//             >
//               <BaseCard isFlexible>
//                 <img
//                   src={stories[currentStory].image}
//                   alt={`Story ${currentStory + 1}`}
//                   className="w-full h-full object-cover"
//                 />
//               </BaseCard>
//             </motion.div>

//             {/* Content Section */}
//             <motion.div
//               className="flex-1"
//               variants={contentVariant}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//             >
//               <BaseCard bgColor="#FFD700" isFlexible>
//                 <ContentSection
//                   title={stories[currentStory].title}
//                   description={stories[currentStory].description}
//                 />
//                 {/* Date and Read More button */}
//                 <div className="mt-4 flex justify-between items-center">
//                   <Button
//                     width="125px"
//                     height="40px"
//                     bgColor="#98002e"
//                     hoverColor="#740426"
//                     title="Read More"
//                     onClick={() => alert("Redirect to full story")} // Replace with navigation logic
//                   />
//                   <SimpleCard
//                     height="h-[40px]"
//                     width="w-[125px]"
//                     padding="p-2"
//                     className="flex justify-center"
//                   >
//                     <h1 className="font-semibold">Date:</h1>
//                     <p className="font-normal">{stories[currentStory].date}</p>
//                   </SimpleCard>
//                 </div>
//               </BaseCard>
//             </motion.div>
//           </div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }
