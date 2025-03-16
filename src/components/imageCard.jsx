import React from "react";

function ImageCard({ src, alt = "Image", width = "492px", height = "335px" }) {
  return (
    <div
      style={{
        width,
        height,
        boxShadow: "4px 10px 30px 0px rgba(0, 0, 0, 0.3)", // Added Box Shadow
        borderRadius: "10px", // Fixed Border Radius
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{
          border: "5px solid #070707", // Fixed Border
          borderRadius: "10px", // Fixed Border Radius
        }}
      />
    </div>
  );
}

export default ImageCard;
