import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import logo from "../assets/logo.svg";
import Button from "./button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle state
  const [dropdownOpen, setDropdownOpen] = useState(null); // Track which dropdown is open

  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  return (
    <nav className="bg-black text-white fixed top-0 left-0 w-full z-10">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-1 mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} className="w-[70px] h-[70px] mr-3" alt="GPGCWS Logo" />
          <span className="text-[20px] font-[400] font-poppins text-white">GPGCWS WEB PORTAL</span>
        </Link>

        {/* Right-side controls */}
        <div className="flex items-center lg:order-2">
          <Button height="43px" width="125px" title="LOGIN" to="/login" />

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
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <Link to="/" className="block text-[16px] font-[400] font-jakarta py-2 pl-3 pr-4 text-white hover:text-[#efff11] lg:p-0">
                HOME
              </Link>
            </li>

            {/* Reusable Dropdown */}
            {[
              {
                title: "FACILITIES", link: "/facilities", links: [
                  { to: "/facilities/lab", label: "Computer Lab" },
                  { to: "facilities/library", label: "Library" },
                  { to: "facilities/canteen", label: "Canteen" }
                ]
              },
              {
                title: "ADMISSION", link: "/admission", links: [
                  { to: "/admission/criteria", label: "Criteria" },
                  { to: "/admission/process", label: "Process" },
                  { to: "/admission/fees", label: "Fees" }
                ]
              },
              {
                title: "ACADEMIC", link: "/academic", links: [
                  { to: "/academic/departments", label: "Departments" },
                  { to: "/academic/courses", label: "Courses" },
                  { to: "/academic/faculty", label: "Faculty" }
                ]
              },
              {
                title: "NEWS & EVENTS", link: "/news", links: [
                  { to: "/news/latest", label: "Latest News" },
                  { to: "/news/events", label: "Events" }
                ]
              }
            ].map(({ title, link, links }) => (
              <li key={title} className="relative">
                {/* Text should be a Link with Icon Next to it */}
                <div className="flex items-center gap-1 py-2 pl-3 pr-4 text-[16px] font-[400] font-[Plus Jakarta Sans] text-white hover:text-[#efff11] lg:p-0">
                  <Link to={link}>{title}</Link>
                  <button onClick={() => toggleDropdown(title)} className="focus:outline-none">
                    {dropdownOpen === title ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                  </button>
                </div>
                {/* Dropdown Menu */}
                {dropdownOpen === title && (
                  <ul className="absolute left-0 mt-2 w-48 bg-[#222] rounded-lg shadow-lg">
                    {links.map(({ to, label }) => (
                      <li key={to}>
                        <Link to={to} className="block px-4 py-2 text-white hover:bg-[#efff11] hover:text-black">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
