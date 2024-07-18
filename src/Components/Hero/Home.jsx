import { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "scrollreveal";
import img from "../../assets/shoe.jpg";

const Home = () => {
  useEffect(() => {
    const sr = ScrollReveal({
      distance: "50px",
      duration: 1000,
      delay: 400,
      reset: true,
    });

    sr.reveal(".reveal", { origin: "left" });
  }, []);

  return (
    <div className="bg-[#F7F7F7] h-screen bg-cover bg-center grid md:grid-cols-2 justify-items-center gap-30 font-poppins">
      <div className=" left-10 text-left space-y-4 md:ml-52">
        <h1 className="reveal text-black text-3xl md:text-5xl font-bold mb-5 mt-28 font-poppins">
          Love The Planet
          <p>We Walk On</p>
        </h1>
        <Link
          to="/collection"
          className="reveal bg-[#131842] text-white px-4 py-2 rounded-lg hover:bg-[#2C4E80] font-poppins"
        >
          Shop Now
        </Link>
      </div>
      <div className="align-self-start ">
        <img
          src={img}
          alt="hero"
          className="w-full h-2/3 object-cover object-center"
        />
      </div>
    </div>
  );
};

export default Home;
