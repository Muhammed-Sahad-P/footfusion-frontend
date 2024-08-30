import { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import useFetch from "../utils/useFetch";

const SearchField = () => {
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { data, loading, error } = useFetch("http://localhost:3000/users/products");
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
        setValue("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (inputValue.trim() === "") {
      setSearchResults([]);
    } else {
      const filteredResults = data.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative w-full max-w-xs mx-auto" ref={searchRef}>
      <form className="flex items-center">
        <input
          autoComplete="off"
          className="h-8 p-2 w-full outline-none border border-gray-300 rounded-l-md bg-white text-gray-700 placeholder-gray-500 shadow-sm transition-all duration-300 ease-in-out focus:border-[#131842] focus:ring-1 focus:ring-[#131842]"
          placeholder="Search..."
          type="text"
          value={value}
          onChange={handleChange}
        />
        <button
          className="bg-[#131842] text-white p-2 h-8 w-8 flex justify-center items-center rounded-r-md shadow-sm hover:bg-[#0f1436] transition-all duration-300 ease-in-out"
          type="submit"
        >
          <FaSearch className="text-lg" />
        </button>
      </form>
      {searchResults.length > 0 && (
        <div
          id="search-results"
          className="absolute z-10 overflow-y-auto bg-white shadow-lg rounded-lg mt-1 w-full max-h-48 border border-gray-200"
        >
          {searchResults.map((item) => (
            <Link
              key={item.id}
              to={`/collection/${item.id}`}
              className="block p-2 hover:bg-[#e0e1f6] hover:text-[#131842] transition-all duration-200 ease-in-out"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 h-6 w-6 bg-gray-200 rounded-full"></div>
                <div className="ml-2">
                  <p className="text-sm font-medium">{item.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchField;
