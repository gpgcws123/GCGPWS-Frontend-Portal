import React from "react";
import { Link } from "react-router-dom";

function Button({
  title,
  to = "/",                      // Default route
  height = "50px",
  width = "150px",
  bgColor = "bg-[#efff11]",           // Default background color
  hoverBgColor = "hover:bg-[#b2b2b2]",  // Hover background color (Tailwind class)
  hoverTextColor = "hover:text-white",  // Hover text color (Tailwind class)
  boxShadow = true,              // Shadow enabled by default
  rounded = "rounded-[10px]",    // Tailwind border radius (dynamic)
  onClick = null,                // Optional click
}) {
  return (
    <Link to={onClick ? "#" : to} onClick={onClick || null}>
      <button
        className={`font-jakarta text-[20px] font-[500] px-4 lg:px-5 transition duration-300 ease-in-out ${rounded} ${bgColor} text-black ${hoverBgColor} ${hoverTextColor} ${boxShadow ? "shadow-lg" : "shadow-none"}`}
        style={{
          height: height,
          width: width,
        }}
      >
        {title}
      </button>
    </Link>
  );
}

export default Button;
