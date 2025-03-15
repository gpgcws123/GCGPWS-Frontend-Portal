import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/colleglogo.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu toggle

  return (
    <nav className="bg-[#070707] text-white fixed top-0 left-0 w-full z-10"> {/* fixed and z-index to ensure navbar stays on top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side: Logo and Name */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-12 rounded-full invert"
            />
            <span className="ml-2 text-xl font-bold">
              Govt Post Graduate College For Girls, Sheikhupura
            </span>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-500 focus:outline-none"
            >
              {/* Hamburger Icon */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Right Side: Navigation Links (Desktop) */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/home"
              className="hover:text-yellow-500 transition duration-200"
            >
              HOME
            </Link>
            <Link
              to="/facilities"
              className="hover:text-yellow-500 transition duration-200"
            >
              FACILITIES
            </Link>
            <Link
              to="/admission"
              className="hover:text-yellow-500 transition duration-200"
            >
              ADMISSION
            </Link>
            <Link
              to="/academic"
              className="hover:text-yellow-500 transition duration-200"
            >
              ACADEMIC
            </Link>
            <Link
              to="/news-media"
              className="hover:text-yellow-500 transition duration-200"
            >
              NEWS & EVENTS
            </Link>
            <Link
              to="/login"
              className="hover:text-yellow-500 transition duration-200"
            >
              LOGIN
            </Link>
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {isOpen && (
          <div className="md:hidden">
            <div className="space-y-2 py-2">
              <Link
                to="/home"
                className="block px-3 py-2 hover:bg-yellow-500 hover:text-white transition duration-200"
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                HOME
              </Link>
              <Link
                to="/facilities"
                className="block px-3 py-2 hover:bg-yellow-500 hover:text-white transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                FACILITIES
              </Link>
              <Link
                to="/admission"
                className="block px-3 py-2 hover:bg-yellow-500 hover:text-white transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                ADMISSION
              </Link>
              <Link
                to="/academic"
                className="block px-3 py-2 hover:bg-yellow-500 hover:text-white transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                ACADEMIC
              </Link>
              <Link
                to="/news-media"
                className="block px-3 py-2 hover:bg-yellow-500 hover:text-white transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                NEWS & EVENTS
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 hover:bg-yellow-500 hover:text-white transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                LOGIN
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
