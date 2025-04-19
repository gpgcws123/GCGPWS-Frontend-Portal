// src/components/StudentNavbar.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import logo from "../assets/logo.svg";
import Button from "./button";
const StudentNavbar = ({ setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle state
    const [dropdownOpen, setDropdownOpen] = useState(null); // Track which dropdown is open
  
    const toggleDropdown = (menu) => {
      setDropdownOpen(dropdownOpen === menu ? null : menu);
    };
    const navigate = useNavigate();
    const handleLogout = () => {
        // Clear session storage and set authentication state to false
        sessionStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
        
        // Redirect to Home Page
        navigate('/', { replace: true }); // Redirect to home without allowing back navigation to student portal
      };
      
      
  return (
    <nav className="bg-black text-white fixed top-0 left-0 w-full z-10">
    <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-1 mx-auto">
      {/* Logo */}
      <Link to="/student-portal" className="flex items-center">
        <img src={logo} className="w-[70px] h-[70px] mr-3" alt="GPGCWS Logo" />
        <span className="text-[20px] font-[400] font-poppins text-white">GPGCWS WEB PORTAL</span>
      </Link>

      {/* Right-side controls */}
      <div className="flex items-center lg:order-2">
        <Button onClick={handleLogout} height="43px" width="125px" title="Logout" to="/" />

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center p-2 ml-4 text-white rounded-lg lg:hidden"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
        >
          <FaChevronDown size={20} />
        </button>
      </div>

      {/* Navbar Links (Desktop + Mobile) */}
      <div className={`lg:flex lg:items-center lg:w-auto lg:order-1 w-full ${isOpen ? "block" : "hidden"}`} id="mobile-menu">
        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-12 lg:mt-0">
          <li>
            <Link to="/student-portal" className="block text-[16px] font-[400] font-jakarta py-2 pl-3 pr-4 text-white hover:text-[#efff11] lg:p-0">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/student-portal/All-Books" className="block text-[16px] font-[400] font-jakarta py-2 pl-3 pr-4 text-white hover:text-[#efff11] lg:p-0">
              BOOKS
            </Link>
          </li>
          <li>
            <Link to="/student-portal/All-Notes" className="block text-[16px] font-[400] font-jakarta py-2 pl-3 pr-4 text-white hover:text-[#efff11] lg:p-0">
              NOTES
            </Link>
          </li>
          <li>
            <Link to="/student-portal/All-Lecture" className="block text-[16px] font-[400] font-jakarta py-2 pl-3 pr-4 text-white hover:text-[#efff11] lg:p-0">
              LECTURE
            </Link>
          </li>

          
        </ul>
      </div>
    </div>
  </nav>
    );
};

export default StudentNavbar;
