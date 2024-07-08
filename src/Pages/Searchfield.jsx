import { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link} from "react-router-dom";
import useFetch from "../utils/useFetch";

const SearchField = () => {
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { data } = useFetch("http://localhost:3000/products");
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

  return (
    <div className="relative" ref={searchRef}>
      <form className="flex items-center">
        <input
          autoComplete="off"
          className="h-7 p-1 w-full outline-none border-b border-gray-700 bg-transparent"
          placeholder="Search..."
          type="text"
          value={value}
          onChange={handleChange}
        />
        <button className="-m-7" type="submit">
          <FaSearch className="text-gray-700 text-2xl" />
        </button>
      </form>
      {searchResults.length > 0 && (
        <div id="search-results" className="absolute overflow-scroll bg-white h-64 shadow-md rounded-md mt-1 w-full">
          {searchResults.map((item) => (
            <Link key={item.id} to={`/collection/${item.id}`}>
              <div className="p-2 hover:bg-gray-100">{item.name}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchField;
