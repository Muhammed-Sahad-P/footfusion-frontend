import { FaInstagram, FaFacebook} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GiRunningShoe } from "react-icons/gi";

const Footer = () => {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  return (
    <div>
    {!isAdmin && (
      <>
      <footer className="bg-gray-100 text-gray-800 py-4">
      <div className="container mx-auto text-center">
        <div className="flex justify-center items-center space-x-4 mb-4">
          <GiRunningShoe className="text-3xl" />
          <p className="text-lg font-bold">FootFusion</p>
        </div>
        <p className="mb-2">Thurakkal, Manjeri | +91 1234567890 | footfusion@gmail.com</p>
        <div className="flex justify-center space-x-4 mb-4">
          <FaInstagram className="text-2xl hover:text-pink-500 transition duration-300" />
          <FaFacebook className="text-2xl hover:text-blue-600 transition duration-300" />
          <FaXTwitter  className="text-2xl hover:text-blue-400 transition duration-300" />
        </div>
        <p className="text-gray-600">&copy; 2024 FootFusion</p>
      </div>
    </footer>
    </>
    )}
   </div>
  );
};

export default Footer;
