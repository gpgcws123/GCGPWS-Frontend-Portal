import React from "react";

function BaseCard({ 
  children, 
  width = "650px", 
  height = "300px", 
  bgColor = "#ffffff" 
}) {
  return (
    <div
      className="relative p-4"
      style={{
        width: width,
        height: height,
        backgroundColor: bgColor,
        border: "5px solid #070707", // Fixed Border
        borderRadius: "25px", // Fixed Border Radius
        boxShadow: "4px 10px 30px 0px rgba(0, 0, 0, 0.3)", // Fixed Box Shadow
      }}
    >
      {children}
    </div>
  );
}

export default BaseCard;
