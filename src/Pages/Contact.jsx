import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Sended in successfully");
  };

  const contactNumber = "123-456-7890";
  const location = "123 Main St, Anytown, USA"; 

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center bg-fixed bg-cover" >
      <div className="bg-white p-6 rounded-xl shadow-lg w-full lg:w-2/3 mx-auto flex flex-col lg:flex-row">
        <div className="lg:w-1/3 p-4 border-r border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Information</h2>
          <p className="mb-2"><strong>Contact Number:</strong> {contactNumber}</p>
          <p><strong>Location:</strong> {location}</p>
        </div>
        <div className="lg:w-2/3 p-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="shadow appearance-none border border-gray-300 rounded-lg w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow appearance-none border border-gray-300 rounded-lg w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="block text-gray-700 font-semibold mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="shadow appearance-none border border-gray-300 rounded-lg w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="shadow appearance-none border border-gray-300 rounded-lg w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
