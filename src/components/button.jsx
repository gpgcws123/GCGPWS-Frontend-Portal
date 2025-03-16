import React from "react";
import { Link } from "react-router-dom";

function Button({
  title,
  to = "/", // Default route if not provided
  height = "50px",
  width = "150px",
  bgColor = "#efff11", // Default background color
  hoverColor = "#b2b2b2", // Hover color
  activeColor = "#a0a0a0", // Active color
  boxShadow = true, // Default: Shadow is enabled
}) {
  return (
    <Link to={to}>
      <button
        className="font-[Poppins] text-[20px] font-[400] rounded-[10px] px-4 lg:px-5 transition duration-300 ease-in-out"
        style={{
          backgroundColor: bgColor,
          color: "black", // Default text color
          height: height,
          width: width,
          borderRadius: "10px",
          transition: "background-color 0.2s, transform 0.2s",
          boxShadow: boxShadow ? "4px 10px 30px 0px rgba(0, 0, 0, 0.3)" : "none", // Conditional shadow
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = hoverColor)} // Hover effect
        onMouseLeave={(e) => (e.target.style.backgroundColor = bgColor)} // Reset to default
        onMouseDown={(e) => (e.target.style.backgroundColor = activeColor)} // Active effect
        onMouseUp={(e) => (e.target.style.backgroundColor = hoverColor)} // Return to hover on release
      >
        {title}
      </button>
    </Link>
  );
}

export default Button;
