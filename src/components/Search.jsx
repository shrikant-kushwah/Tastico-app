import { useEffect, useState } from "react";
import { useGlobalContext } from "../Utils/GlobalContext";
import Navbar from "./Navbar";
import SearchSkeleton from "./SearchSkeleton";
import defaultFood from "../assets/food.jpg";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { cdn, lat, long } = useGlobalContext();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  const saveRecentSearch = (term) => {
    if (!term.trim()) return;
    setRecentSearches((prev) => {
      const updated = [term, ...prev.filter((item) => item !== term)];
      const trimmed = updated.slice(0, 8);
      localStorage.setItem("recentSearches", JSON.stringify(trimmed));
      return trimmed;
    });
  };

  const clearRecentSearches = () => {
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
  };

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      const fetchSuggestions = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=${lat}&lng=${long}&str=${query}&trackingId=null&includeIMItem=true`
          );
          const data = await response.json();
          const result = data.data?.suggestions || [];
          setSuggestions(result);
          if (result.length) saveRecentSearch(query);
        } catch (err) {
          console.error("Failed to fetch suggestions:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchSuggestions();
    }, 800);

    return () => clearTimeout(timer);
  }, [query, lat, long]);

 

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="flex flex-col items-center mt-28 px-4">
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search items, restaurants, or food"
            className="w-full h-12 px-5 pr-12 text-base border border-pink-500 rounded-full outline-none"
          />
          {query ? (
            <i
              onClick={() => setQuery("")}
              className="fa-solid fa-xmark absolute top-4 right-5 text-pink-500 hover:text-red-500 cursor-pointer"
            ></i>
          ) : (
            <i className="fa-solid fa-magnifying-glass absolute top-4 right-5 text-gray-400"></i>
          )}
        </div>

        {!query && recentSearches.length > 0 && (
          <div className="mt-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-800 font-semibold text-sm">Recent Searches</h3>
              <button
                onClick={clearRecentSearches}
                className="text-xs text-red-500 hover:underline"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(item)}
                  className="px-3 py-1 bg-gray-100 rounded-full hover:bg-pink-100 text-sm transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && <SearchSkeleton />}

        {!loading && suggestions.length > 0 && (
          <div className="mt-6 w-full max-w-2xl space-y-4">
            {suggestions.map((item, index) => (
              <div
                key={index}
                className="flex items-center p-3 gap-4 bg-white rounded-lg hover:bg-pink-50 transition duration-200 cursor-pointer"
              >
                <img
                  src={item.cloudinaryId ? cdn + item.cloudinaryId : defaultFood}
                  alt={item.text}
                  className="h-20 w-20 object-cover rounded-lg"
                />
                <div>
                  <p className="text-gray-800 text-lg font-medium">{item.text}</p>
                  <p className="text-gray-500 text-sm">{item.type}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && query && suggestions.length === 0 && (
          <p className="mt-10 text-center text-gray-500">
            No results found for <strong>{query}</strong>.
          </p>
        )}
      </div>
    </div>
  );
};

export default Search;
