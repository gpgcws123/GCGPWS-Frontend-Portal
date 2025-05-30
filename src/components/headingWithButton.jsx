import React from "react";
import { Link } from "react-router-dom";
import RightArrowIcon from "../assets/rightIcon.svg";

const HeadingWithButton = ({
  headingText = "Upcoming Events in GPGCWS",
  buttonText = "All Events in GPGCWS",
  to = "/all-events",
  height = "50px",
  width = "auto",
  bgColor = "#eff111",
  hoverBgColor = "#b2b2b2",
  hoverTextColor = "white",
  activeColor = "#b2b2b2",
  boxShadow = true,
  rounded = "rounded-[10px]",
  onClick = null,
}) => {
  return (
    <div className="container flex items-center justify-between mb-8">
      <h1 className="text-4xl font-bold font-jakarta text-black">
        {headingText}
      </h1>

      {/* ✅ Render button only if buttonText is provided */}
      {buttonText && (
        <Link to={onClick ? "#" : to} onClick={onClick || null}>
          <button
            className={`font-jakarta text-[20px] font-[500] px-6 py-2 ${rounded} flex items-center gap-2`}
            style={{
              backgroundColor: bgColor,
              color: "black",
              height: height,
              width: width,
              transition: "all 0.2s ease-in-out",
              boxShadow: boxShadow
                ? "4px 10px 30px 0px rgba(0, 0, 0, 0.3)"
                : "none",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = hoverBgColor;
              e.target.style.color = hoverTextColor;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = bgColor;
              e.target.style.color = "black";
            }}
            onMouseDown={(e) => {
              e.target.style.backgroundColor = activeColor;
            }}
            onMouseUp={(e) => {
              e.target.style.backgroundColor = hoverBgColor;
              e.target.style.color = hoverTextColor;
            }}
          >
            {buttonText}
            <img src={RightArrowIcon} alt="arrow" className="w-5 h-5 ml-1" />
          </button>
        </Link>
      )}
    </div>
  );
};

export default HeadingWithButton;
