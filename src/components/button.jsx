import React from "react";

function Button({
  title,
  onClick,
  height = "50px",
  width = "150px",
  bgColor = "#181CBF", // Default background color
  hoverColor = "#0F1294", // Default hover color
  activeColor = "#0A0D73", // Default active color
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-[10px] text-white font-medium shadow-lg"
      style={{
        backgroundColor: bgColor,
        height: height,
        width: width,
        transition: "background-color 0.2s, transform 0.2s",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = hoverColor)} // Hover effect
      onMouseLeave={(e) => (e.target.style.backgroundColor = bgColor)} // Reset to default
      onMouseDown={(e) => (e.target.style.backgroundColor = activeColor)} // Active effect
      onMouseUp={(e) => (e.target.style.backgroundColor = hoverColor)} // Return to hover on release
    >
      {title}
    </button>
  );
}

export default Button;
