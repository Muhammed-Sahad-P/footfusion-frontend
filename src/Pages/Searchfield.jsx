import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ProductData } from "../Components/Products/Product";
import { Link, useNavigate } from "react-router-dom";

export default function Searchfield() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    if (value.trim() === "") {
      return;
    }
    navigate(`/search/${value}`);
  }

  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (inputValue.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filteredResults = ProductData.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchResults(filteredResults);
    setIsOpen(true);
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#search-container") && !e.target.closest("#search-results")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex">
        <input
          autoComplete="off"
          id="search-container"
          className="h-7 p-1 w-full outline-none border-b border-gray-700 bg-transparent"
          placeholder="Search.."
          type="text"
          value={value}
          onChange={handleChange}
          onClick={() => setIsOpen(true)}
        />
        <button className="-m-7" type="submit">
          <FaSearch className="text-gray-700 text-2xl" />
        </button>
      </form>
      {searchResults.length > 0 && isOpen && (
        <div id="search-results" className="h-52 overflow-y-scroll py-2 mt-2 rounded-md bg-stone-100 shadow-md absolute z-10 w-full">
          {searchResults.map((item) => (
            <Link key={item.id} to={`/products/${item.id}`} onClick={() => setIsOpen(false)}>
              <p className="p-1 hover:bg-red-100">{item.name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
