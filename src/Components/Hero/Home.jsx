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
    <div className="bg-[#F7F7F7] font-poppins">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-8 p-8">
        <div className="text-left space-y-4">
          <h1 className="reveal text-black text-3xl md:text-5xl font-bold mb-5 mt-28">
            Love The Planet
            <p>We Walk On</p>
          </h1>
          <Link
            to="/collection"
            className="reveal bg-[#131842] text-white px-4 py-2 rounded-lg hover:bg-[#2C4E80]"
          >
            Shop Now
          </Link>
        </div>
        <div className="flex justify-center items-center mt-24">
          <img
            src={img}
            alt="hero"
            className="w-full h-auto max-w-lg object-cover object-center"
          />
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="py-12 bg-gradient-to-b from-transparent to-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">
            UpComing Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product Card */}
            <div className="bg-white text-black border rounded-lg shadow-md overflow-hidden">
              <img
                src="https://img.freepik.com/free-photo/view-soccer-shoes_23-2150887398.jpg?semt=ais_hybrid"
                alt="Product"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  Mens and womens colored shoes on store
                </h3>
                <p className="text-lg">₹ 999</p>
              </div>
            </div>
            <div className="bg-white text-black border rounded-lg shadow-md overflow-hidden">
              <img
                src="https://media.istockphoto.com/id/609924218/photo/tying-sports-shoes.jpg?s=612x612&w=0&k=20&c=jDPQy90JEhy8FJYrW-2XHl1hC340wXha8RrQlZpfJaM="
                alt="Product"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  Mens and womens colored shoes on store
                </h3>
                <p className="text-lg">₹ 999</p>
              </div>
            </div>
            <div className="bg-white text-black border rounded-lg shadow-md overflow-hidden">
              <img
                src="https://image.shutterstock.com/image-photo/woman-stylish-sneakers-tying-shoe-260nw-2318464139.jpghttps://image.shutterstock.com/image-illustration/pair-high-top-white-blue-260nw-2287628165.jpg"
                alt="Product"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  Mens and womens colored shoes on store
                </h3>
                <p className="text-lg">₹ 999</p>
              </div>
            </div>
            <div className="bg-white text-black border rounded-lg shadow-md overflow-hidden">
              <img
                src="https://media.istockphoto.com/id/117146355/photo/almost.jpg?s=612x612&w=0&k=20&c=FIgHBDvVYG9oU6_iggZim3zKl4mFcwU43wHJU2bdLys="
                alt="Product"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  Mens and womens colored shoes on store
                </h3>
                <p className="text-lg">₹ 999</p>
              </div>
            </div>
            <div className="bg-white text-black border rounded-lg shadow-md overflow-hidden">
              <img
                src="https://media.istockphoto.com/id/1206659376/vector/vector-illustration-of-a-pair-of-athletic-shoes-on-an-active-retro-style-background.jpg?s=612x612&w=0&k=20&c=IS1Glr_UDlg4PxA0O4aEDLAIgU4t-Dc2GwRBO6mnxNs="
                alt="Product"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  Mens and womens colored shoes on store
                </h3>
                <p className="text-lg">₹ 999</p>
              </div>
            </div>
            <div className="bg-white text-black border rounded-lg shadow-md overflow-hidden">
              <img
                src="https://media.istockphoto.com/id/1243461628/photo/close-up-of-little-girl-in-dress-putting-on-fathers-hiking-shoes.jpg?s=612x612&w=0&k=20&c=cMen32NIfdkk_gMRFxDjThmmlYdwPR1B4QpgDe_D7sg="
                alt="Product"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  Mens and womens colored shoes on store
                </h3>
                <p className="text-lg">₹ 999</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
