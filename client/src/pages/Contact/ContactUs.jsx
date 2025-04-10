import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [submitted, setSubmitted] = useState(false);
  // const [accountDetails, setAccountDetails] = useState({
  //   email: `${localStorage.getItem("email")}`,
  //   fullName: `${localStorage.getItem("fullName")}`
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setSubmitted(false);
  
    try {
      const response = await axios.post("http://localhost:5000/api/v1/users/contact", formData,{withCredentials:true});
      console.log(response);
      if (response.data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-gray-200">
      <Sidebar />
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-2xl transform transition duration-300 hover:scale-105">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h1>
          {submitted && (
            <p className="text-green-600 text-center mb-4">Thank you for your message! We'll get back to you soon.</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none transition duration-300 shadow-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
