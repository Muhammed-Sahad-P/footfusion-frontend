import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "scrollreveal";
import Spinner from "../../Components/Spinner";
import img from "../../assets/shoe bg.png";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sr = ScrollReveal({
      distance: "50px",
      duration: 1000,
      delay: 400,
      reset: true,
    });

    sr.reveal(".reveal", { origin: "left" });

    // Simulating API call to fetch products
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: "New Balance 530 Sneakers",
          price: 1799,
          image:
            "https://i.pinimg.com/564x/46/12/87/4612872035bb7e4d477e9663b78bc507.jpg",
          rating: 4.5,
          isNew: true,
          discount: 20,
        },
        {
          id: 2,
          name: "Casual Sneakers",
          price: 799,
          image:
            "https://i.pinimg.com/564x/ed/d9/9c/edd99ce7affd57c08fc4c75b0dffaa8b.jpg",
          rating: 4.0,
          isNew: false,
        },
        {
          id: 3,
          name: "Women's Running Shoes",
          price: 1299,
          image:
            "https://i.pinimg.com/564x/51/0d/5a/510d5aee56f0496366317642702fe52a.jpg",
          rating: 5.0,
          isNew: true,
        },
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="bg-[#F7F7F7] font-poppins">
      <section className="py-16 bg-[#131842] text-white min-h-[80vh] flex items-center justify-center">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-evenly text-center md:text-left">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h2 className="text-4xl md:text-6xl md:ml-5 lg:text-7xl font-bold mb-4 animate-text-float leading-tight">
              Discover Our Collection
            </h2>
            <p className="text-lg md:text-xl md:ml-5 mb-6 animate-text-slide">
              Explore the latest trends in fashion and find your new favorite
              pieces. From stylish shoes to elegant accessories, we have
              everything you need to step up your wardrobe game.
            </p>
            <Link
              to="/collection"
              className="bg-[#f38e41] text-[#0c0f30] font-medium md:ml-5 px-6 py-4 mt-6 inline-block rounded-lg hover:bg-[#d68b40] transition duration-300 ease-in-out"
            >
              Browse Collection
            </Link>
          </div>

          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
            <img
              src={img}
              alt="hero"
              className="w-full h-auto md:mt-10 md:mr-5 max-w-xs md:max-w-lg object-contain"
            />
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#F7F7F7] text-[#131842]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-poppins mb-12 text-center uppercase">
            Featured Products
          </h2>

          {isLoading ? (
            <div className="flex justify-center">
              <div>
                <Spinner />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white text-black border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative group"
                >
                  {product.discount && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                      -{product.discount}%
                    </span>
                  )}

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  <div className="p-4">
                    <h3 className="text-xl font-poppins mb-2">
                      {product.name}
                    </h3>
                    <p className="text-lg font-semibold">₹ {product.price}</p>

                    <div className="flex items-center mt-2">
                      <span className="text-yellow-500 mr-2">
                        {Array(Math.round(product.rating)).fill("★").join("")}
                      </span>
                      <span className="text-gray-400 text-sm">
                        ({product.rating})
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

                  <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      to="/collection"
                      className="bg-[#f38e41] text-[#0c0f30] font-medium px-6 py-2 rounded-lg hover:bg-[#d68b40] transition duration-300 ease-in-out"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
