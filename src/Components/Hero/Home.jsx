import { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "scrollreveal";
import img from "../../assets/shoe bg.png";

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
      {/* Highlighted Text and Button Section */}
      <section className="py-16 bg-[#131842] text-white h-[100vh] flex items-center justify-center">
        <div className="container mx-8  h-full px-4 flex flex-col md:flex-row items-center justify-evenly">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0 ">
            <h2 className="text-5xl md:text-7xl font-bold mb-4 animate-text-float">
              Discover Our Collection
            </h2>
            <p className="text-xl mb-6 animate-text-slide">
              Explore the latest trends in fashion and find your new favorite
              pieces. From stylish shoes to elegant accessories, we have
              everything you need to step up your wardrobe game.
            </p>
            <Link
              to="/collection"
              className="bg-[#f38e41] text-[#0c0f30] font-medium px-6 py-4 mt-6 inline-block  rounded-lg hover:bg-[#d68b40] transition duration-300 ease-in-out"
            >
              Browse Collection
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-end">
            <img
              src={img}
              alt="hero"
              className="w-full mb-10 h-full max-w-lg mt-6 object-contain object-center"
            />
          </div>
        </div>
      </section>

      {/* Caption Section */}
      <section className="relative py-16 pt-10 bg-[#131842] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-[#00000080]"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl mt-10 md:text-5xl font-bold text-white mb-4 transition-transform transform hover:scale-105 hover:text-yellow-500">
            Discover the Latest Trends in Footwear
          </h2>
          <p className="text-xl text-[#a9a7a7]">
            Elevate your style with our new collection
          </p>
        </div>
      </section>
      {/* Caption Section */}

      {/* Featured Products Section */}
      <section className="py-12 bg-gradient-to-b from-transparent to-black text-[#131842]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl  font-bold mb-12 text-center uppercase">
            Upcoming Products
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
