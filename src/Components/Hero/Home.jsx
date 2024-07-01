
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://cdn.shopify.com/s/files/1/0031/1472/9541/files/Crop_Sneakers-Landscape-canvas-M_Banner.jpg?v=1710353199')" }}>
      <div className="absolute top-1/4 left-4 md:left-10 text-left space-y-4">
        <h1 className="text-black text-3xl md:text-5xl font-bold font-serif mb-5 ">Love The Planet<br /> We Walk On</h1>
        <Link to="/collection" className="bg-white text-black px-4 py-2 rounded-lg hover:bg-green-300"> Shop Now</Link>
      </div>
    </div>
  );
};

export default Home;
