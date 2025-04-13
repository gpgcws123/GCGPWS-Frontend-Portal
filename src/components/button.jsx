import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  title,
  to = "/",
  height = "50px",
  width = "150px",
  bgColor = "#efff11",
  hoverBgColor = "#b2b2b2",
  textColor = "black",
  hoverTextColor = "white",
  activeColor = "#b2b2b2",
  boxShadow = true,
  rounded = "rounded-[10px]",
  onClick,
  className = "",
}) => {
  const buttonStyle = {
    height,
    width,
    backgroundColor: bgColor,
    color: textColor,
    boxShadow: boxShadow ? "4px 10px 30px 0px rgba(0, 0, 0, 0.3)" : "none",
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = hoverBgColor;
    e.target.style.color = hoverTextColor;
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = bgColor;
    e.target.style.color = textColor;
  };

  const buttonElement = (
    <button
      className={`font-jakarta text-[20px] font-[500] px-4 lg:px-5 transition duration-300 ease-in-out ${rounded} ${className}`}
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => (buttonStyle.backgroundColor = activeColor)}
      onClick={onClick}
    >
      {title}
    </button>
  );

  return onClick ? (
    buttonElement
  ) : (
    <Link to={to} style={{ display: 'inline-block', textDecoration: 'none' }}>
      {buttonElement}
    </Link>
  );
};

export default Button;