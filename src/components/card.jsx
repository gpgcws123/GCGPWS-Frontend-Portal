// import React from "react";

// function BaseCard({ children, isFlexible = false, bgColor = "#ffffff" }) {
//   return (
//     <div
//       className={`relative rounded-xl bg-black shadow-[0_0_10px_4px_rgba(173,216,230,0.6)] border border-[rgba(173,216,230,0.3)] p-2 ${
//         isFlexible ? "flex-1" : ""
//       }`}
//     >
//       <div
//         className={`w-full h-full rounded-lg p-4`}
//         style={{
//           backgroundColor: bgColor, // Customizable inner background
//         }}
//       >
//         {children}
//       </div>
//     </div>
//   );
// }

// export default BaseCard;
import React from "react";

function BaseCard({ children, isFlexible = false, bgColor = "#ffffff", shadowColor = "rgba(173, 216, 230, 0.6)" }) {
  return (
    <div
      className={`relative rounded-xl border border-[rgba(173,216,230,0.3)] p-4 ${
        isFlexible ? "flex-1" : ""
      }`}
      style={{
        backgroundColor: bgColor, // Background color
        boxShadow: `0 0 10px 4px ${shadowColor}`, // Dynamic shadow color
      }}
    >
      {children}
    </div>
  );
}

export default BaseCard;
