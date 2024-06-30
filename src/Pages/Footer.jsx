import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { GiRunningShoe } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ml-20">
        <div>
         <GiRunningShoe />
          <p className="mb-2">Thurakkal, Manjeri</p>
          <p className="mb-2">+91 9744106849</p>
          <p className="mb-6">footfusion@gmail.com</p>
          <h2>Connect with us</h2><br />
          <div className="flex space-x-4">
            <FaInstagram className="text-3xl hover:text-pink-500 transition duration-300" />
            <FaFacebook className="text-3xl hover:text-blue-600 transition duration-300" />
            <FaTwitter className="text-3xl hover:text-blue-400 transition duration-300" />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Customer Service</h2>
          <ul className="space-y-2">
            <li className="hover:text-gray-400 transition duration-300">Contact Us</li>
            <li className="hover:text-gray-400 transition duration-300">Help & FAQ</li>
            <li className="hover:text-gray-400 transition duration-300">Payment Method</li>
            <li className="hover:text-gray-400 transition duration-300">Delivery Information</li>
            <li className="hover:text-gray-400 transition duration-300">Track Your Order</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            <li className="hover:text-gray-400 transition duration-300">Shoe Fashion</li>
            <li className="hover:text-gray-400 transition duration-300">Men</li>
            <li className="hover:text-gray-400 transition duration-300">Women</li>
            <li className="hover:text-gray-400 transition duration-300">New Arrivals</li>
            <li className="hover:text-gray-400 transition duration-300">Fashion</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Our Company</h2>
          <ul className="space-y-2">
            <li className="hover:text-gray-400 transition duration-300">Corporate Information</li>
            <li className="hover:text-gray-400 transition duration-300">Privacy & Cookies Policy</li>
            <li className="hover:text-gray-400 transition duration-300">Promo & Terms</li>
          </ul>
        </div>
      </div>
      <p className="text-center mt-8 text-gray-400">
        &copy; 2024 FootFusion | Powered by FootFusion
      </p>
    </footer>
  );
};

export default Footer;
