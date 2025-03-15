import React from "react";

function SimpleCard({
  children,
  isFlexible = false,
  width = "w-[300px]",  // Default Tailwind width
  height = "h-[200px]", // Default Tailwind height
  padding = "p-4", // Default Tailwind padding
  className = "", // Additional custom Tailwind classes
}) {
  return (
    <div
      className={`relative rounded-[10px]  border-gray-300 bg-[#b2b2b2] ${padding}  ${width} ${height} ${
        isFlexible ? "flex-1" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default SimpleCard;
