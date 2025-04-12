import React from "react";

function BaseCard({
  children,
  width = "650px",
  height = "300px",
  bgColor = "#ffffff",
  padding = "16px", // Default padding added
  borderRadius = "25px" // Default Border Radius
}) {
  return (
    <div
      className="relative"
      style={{
        width: width,
        height: height,
        backgroundColor: bgColor,
        border: "5px solid #070707", // Fixed Border
        borderRadius: borderRadius, // Now customizable
        boxShadow: "4px 10px 30px 0px rgba(0, 0, 0, 0.3)", // Fixed Box Shadow
        padding: padding, // Apply default padding
      }}
    >
      {children}
    </div>
  );
}

export default BaseCard;
