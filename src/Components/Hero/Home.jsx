import  { useEffect, useState } from "react";
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
          name: "Stylish Sport Shoes",
          price: 999,
          image: "https://img.freepik.com/free-photo/view-soccer-shoes_23-2150887398.jpg?semt=ais_hybrid",
          rating: 4.5,
          isNew: true,
          discount: 20,
        },
        {
          id: 2,
          name: "Casual Sneakers",
          price: 799,
          image: "https://media.istockphoto.com/id/609924218/photo/tying-sports-shoes.jpg?s=612x612&w=0&k=20&c=jDPQy90JEhy8FJYrW-2XHl1hC340wXha8RrQlZpfJaM=",
          rating: 4.0,
          isNew: false,
        },
        {
          id: 3,
          name: "Women's Running Shoes",
          price: 1299,
          image: "https://image.shutterstock.com/image-photo/woman-stylish-sneakers-tying-shoe-260nw-2318464139.jpg",
          rating: 5.0,
          isNew: true,
        },
      ]);
      setIsLoading(false);
    }, 2000); 
  }, []);

  return (
    <div className="bg-[#F7F7F7] font-poppins">
      {/* Hero Section */}
      <section className="py-16 bg-[#131842] text-white h-[100vh] flex items-center justify-center">
        <div className="container mx-auto h-full px-4 flex flex-col md:flex-row items-center justify-evenly">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
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
              className="bg-[#f38e41] text-[#0c0f30] font-medium px-6 py-4 mt-6 inline-block rounded-lg hover:bg-[#d68b40] transition duration-300 ease-in-out"
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

      {/* Featured Products Section */}
      <section className="py-12 bg-[#F7F7F7] text-[#131842]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-poppins mb-12 text-center uppercase">
            Featured Products
          </h2>
          
          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center">
              <div><Spinner /></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white text-black border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative group"
                >
                  {/* Discount Badge */}
                  {product.discount && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                      -{product.discount}%
                    </span>
                  )}
                  
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  <div className="p-4">
                    <h3 className="text-xl font-poppins mb-2">
                      {product.name}
                    </h3>
                    <p className="text-lg font-semibold">₹ {product.price}</p>

                    {/* Star Ratings */}
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-500 mr-2">
                        {Array(Math.round(product.rating)).fill("★").join("")}
                      </span>
                      <span className="text-gray-400 text-sm">
                        ({product.rating})
                      </span>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

                  {/* Button */}
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
