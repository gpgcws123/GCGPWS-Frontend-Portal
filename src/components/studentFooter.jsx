import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import logo from "../assets/logo.svg";
import instaIcon from "../assets/Instagram.svg";
const StudentFooter = () => {
  return (
    <footer className="bg-black text-white w-full">
      <div className="max-w-[1360px] mx-auto px-7 pt-7 pb-4">
        {/* Main Flex Row */}
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Left - Logo and Description */}
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <img src={logo} alt="Logo" className="w-[70px] h-[70px] mr-3" />
              <h2 className="text-[24px] font-jakarta font-bold">GPGCWS WEB PORTAL</h2>
            </div>
            <p className="text-white font-poppins  text-lg leading-relaxed">
              Welcome to Estrella, where brilliance meets innovation! We are a leading company
              dedicated to delivering exceptional products and services to cater to your needs.
            </p>
          </div>

          {/* Center - Links Section */}
          <div className="flex flex-1 mt-6 justify-between gap-10">
            {/* Quick Links */}
            <div>
              <h4 className="text-base font-jakarta font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3 font-poppins text-white text-sm">
                <li><a href="#" className="hover:text-yellow">Facilities</a></li>
                <li><a href="#" className="hover:text-yellow">Admission</a></li>
                <li><a href="#" className="hover:text-yellow">Academic</a></li>
                <li><a href="#" className="hover:text-yellow">News & Events</a></li>
              </ul>
            </div>

            {/* Popular Links */}
            <div>
              <h4 className="text-base font-jakarta font-semibold mb-4">Popular Links</h4>
              <ul className="space-y-3 font-poppins text-white text-sm">
                <li><a href="#" className="hover:text-yellow">Top Stories</a></li>
                <li><a href="#" className="hover:text-yellow">About us</a></li>
                <li><a href="#" className="hover:text-yellow">Fee Structure</a></li>
                <li><a href="#" className="hover:text-yellow">Notice Board</a></li>
              </ul>
            </div>

            {/* Faculty & Staff */}
            <div>
              <h4 className="text-base font-jakarta font-semibold mb-4">Faculty & Staff</h4>
              <ul className="space-y-3  font-poppinstext-white text-sm">
                <li><a href="#" className="hover:text-yellow">Principal</a></li>
                <li><a href="#" className="hover:text-yellow">Teaching Faculty</a></li>
                <li><a href="#" className="hover:text-yellow">Policy & Guidelines</a></li>
                <li><a href="#" className="hover:text-yellow">Rules & Regulations</a></li>
              </ul>
            </div>
          </div>

          {/* Right - Get in Touch */}
          <div className="flex-1 mt-4">
            <h4 className="text-[24px] text-center font-jakarta  font-bold mb-4">Get In Touch</h4>
            <div className="space-y-5 text-whitetext-sm">
              {/* Address */}
              <div className="flex items-start">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#B2B2B2]">
                  <MapPin size={24} color="white" />
                </div>
                <span className="ml-3 flex font-poppins text-[14px] items-center mt-3">NEAR HOCKEY STADIUM, FEROZPUR ROAD, LAHORE</span>
              </div>

              {/* Email */}
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#B2B2B2]">
                  <Mail size={24} color="white" />
                </div>
                <span className="ml-3 flex text-[18px] font-poppins items-center ">gcbgulberg@gmail.com</span>
              </div>

              {/* Phone */}
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#B2B2B2]">
                  <Phone size={24} color="white" />
                </div>
                <span className="ml-3 flex text-[18px] font-poppins items-center">04299232116</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 border-t border-gray-700 pt-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="text-white font-poppins  text-[18px]">© 2023 Estrella Inc. All rights reserved.</p>

          {/* Social Icons with Official Background Colors */}
          <div className="flex space-x-4 mr-12">
            {/* Facebook */}
            <a href="#" className="hover:opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="#1877F2" />
                <path fill="#FFF" d="M26.5 38V26h4l1-5h-5v-3c0-1.3.4-2.2 2.2-2.2H32V11c-.4-.1-1.9-.2-3.7-.2-3.7 0-6.3 2.3-6.3 6.5v3.5h-4v5h4v12h5.5z" />
              </svg>
            </a>

            {/* Twitter */}
            <a href="#" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0 0 48 48">
                <path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path>
              </svg>
            </a>

            {/* Instagram */}
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={instaIcon}
                alt="Instagram" className="w-9 h-9" />
            </a>

            {/* LinkedIn */}
            <a href="#" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0 0 48 48">
                <path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"></path>
              </svg>
            </a>
          </div>
          {/* Policies */}
          <div className="flex space-x-8 font-normal ml-11 text-whitetext-[16px] font-poppins">
            <a href="#" className="hover:text-yellow">Terms</a>
            <a href="#" className="hover:text-yellow">Privacy</a>
            <a href="#" className="hover:text-yellow">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StudentFooter;
