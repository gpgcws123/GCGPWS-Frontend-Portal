import React, { useState } from "react";
import axios from "axios";
import BaseCard from "../../components/card";
import HeadingTitle from "../../components/heading";
import Button from "../../components/button";

const BACKEND_URL = 'http://localhost:5000';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ **Live Validation Function**
  const validateForm = () => {
    let newErrors = {};

    // ✅ **Name Validation (Only Letters)**
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Only alphabets are allowed in Name.";
    }

    // ✅ **Email Validation**
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // ✅ **Message Validation (Max 500 Characters)**
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.length > 500) {
      newErrors.message = "Message cannot exceed 500 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ If no errors, return true
  };

  // ✅ **Handle Input Change (Live Validation)**
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // ✅ Revalidate individual field
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  // ✅ **Handle Form Submit**
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Get token from localStorage if available
        const token = localStorage.getItem('token');
        
        // Set up headers with token if it exists
        const config = token ? {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        } : {};
        
        // Send form data to backend with config
        const response = await axios.post(
          `${BACKEND_URL}/api/contact/submit`,
          formData,
          config
        );
        
        if (response.data.success) {
          alert("Form submitted successfully!");
          // Reset form after submission
          setFormData({ name: "", email: "", message: "" });
          setErrors({});
        } else {
          alert(response.data.message || "Failed to submit form. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form. Please try again later.");
      }
    }
  };

  return (
    <section className="bg-white flex font-jakarta justify-between flex-col py-8 lg:py-16  mx-auto max-w-screen-lg">
      <div className="mb-6">
        <HeadingTitle title="Contact us" width="220px" />
      </div>

      <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-8">
        {/* Contact Form inside BaseCard */}
        <BaseCard width="500px" height="620px" bgColor="gray" borderRadius="10px">
          <form onSubmit={handleSubmit} className="space-y-4 p-4">
            {/* ✅ Heading Centered */}
            <h2 className="text-center text-[24px] font-bold text-black">Get In Touch With Us</h2>

            {/* ✅ Name Field */}
            <div>
              <label htmlFor="name" className="block mb-2 text-[18px] font-medium text-black">
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={`shadow-sm bg-gray-50 outline-none border ${errors.name ? "border-red-500" : "border-gray-300"
                  } text-black text-[18px] rounded-lg block w-full p-2.5 placeholder-black/50`}
                placeholder="Enter your Name"
              />
              {errors.name && <p className="text-red-500 text-[16px]">{errors.name}</p>}
            </div>

            {/* ✅ Email Field */}
            <div>
              <label htmlFor="email" className="block mb-2 text-[18px] font-medium text-black">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`shadow-sm bg-gray-50 outline-none border ${errors.email ? "border-red-500" : "border-gray-300"
                  } text-black text-[18px] rounded-lg block w-full p-2.5 placeholder-black/50`}
                placeholder="Enter your Email"
              />
              {errors.email && <p className="text-red-500 text-[16px]">{errors.email}</p>}
            </div>

            {/* ✅ Message Field (Error Properly Below) */}
            <div>
              <label htmlFor="message" className="block mb-2 text-[18px] font-medium text-black">
                Message:
              </label>
              <textarea
                id="message"
                rows="4"
                maxLength="500" // ⬅️ Limits to 500 characters
                value={formData.message}
                onChange={handleChange}
                className={`block p-2.5 w-full text-[18px] outline-none text-black bg-gray-50 rounded-lg border ${errors.message ? "border-red-500" : "border-gray-300"
                  } placeholder-black/50`}
                placeholder="Type your Query here..."
              ></textarea>
              {/* ✅ Error Below the Message Field */}
              {errors.message && <p className="text-red-500 text-[16px] ">{errors.message}</p>}
            </div>

            {/* ✅ Button Centered */}
            <div className="flex  justify-center">
              <Button
                title="Submit"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default button behavior
                  handleSubmit(e);
                }}
                width="180px"
                height="50px"
              />
            </div>
          </form>
        </BaseCard>

        {/* Google Map inside ImageCard */}
        <iframe
          className="w-[550px] h-full border-black border-[5px] rounded-[10px]  shadow-[4px_10px_30px_0px_rgba(0,0,0,0.3)] "
          src="https://www.google.com/maps/embed/v1/place?q=Sheikhupura,+Pakistan&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactForm;
