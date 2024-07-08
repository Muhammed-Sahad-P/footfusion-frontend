import { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "scrollreveal";

const Home = () => {
  useEffect(() => {
    const sr = ScrollReveal({
      distance: '50px',
      duration: 1000,
      delay: 400,
      reset: true,
    });

    sr.reveal('.reveal', { origin: 'left' });
  }, []);

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://img.freepik.com/free-photo/men-s-fashion-wallpaper-wooden-background-leather-shoes-with-polishing-tools_53876-145655.jpg?t=st=1719817833~exp=1719821433~hmac=38f2235795a994321c4bdf528bb706fbeffdf2d6ba86d73a5281d4a7db1020e0&w=1480')", objectFit: "cover" }}
    >
      <div className="absolute top-1/4 left-4 md:left-10 text-left space-y-4">
        <h1 className="reveal text-black text-3xl md:text-5xl font-bold mb-5 mt-28" style={{ fontFamily: "'Playfair Display', serif" }}>
          Love The Planet<br /> We Walk On
        </h1>
        <Link to="/collection" className="reveal bg-[#131842] text-white px-4 py-2 rounded-lg hover:bg-[#2C4E80]">
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Home;
