import { useEffect, useState } from "react";
import Alert from "../Components/Alert";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setAlert({ message: "Message sent successfully!", type: "success" });
    } else {
      setAlert({ message: "Please fill in all fields.", type: "error" });
    }
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactNumber = "+91 1234567890";
  const location = "Thurakkal, Manjeri";

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md mx-auto flex flex-col lg:flex-row">
        <div className="p-4 border-b lg:border-b-0 lg:border-r border-gray-300 bg-gradient-to-br from-blue-50 to-blue-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact Information</h2>
          <p className="text-gray-600 mb-1">
            <strong className="text-gray-800">Contact Number:</strong> {contactNumber}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Location:</strong> {location}
          </p>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="block w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="block w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows="3"
                className="block w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
          className="fixed bottom-4 right-4 max-w-xs"
        />
      )}
    </div>
  );
}

export default Contact;
