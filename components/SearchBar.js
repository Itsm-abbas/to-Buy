// components/SearchBar.js
import { useRouter } from "next/router";
import { useState } from "react";
import { category } from "../utils/products";
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Show the dropdown only when there is a query
    setShowDropdown(query.length > 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add your search functionality here
    console.log(`Search submitted: ${searchQuery}`);
  };

  const handleCategoryClick = (category) => {
    setSearchQuery(category);
    setShowDropdown(false);
    // Navigate to the search page with the selected category
    router.push(`/search/${encodeURIComponent(category)}`);
  };
  const filteredCategories = category.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="py-2 px-4 pr-10 w-full leading-tight text-black bg-gray-100 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500"
        />
        {showDropdown && (
          <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md overflow-hidden">
            {filteredCategories.length === 0 ? (
              <div className="px-4 py-2 text-black cursor-pointer hover:bg-gray-200">
                Not found
              </div>
            ) : (
              filteredCategories.map((category) => (
                <div
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className="px-4 py-2 cursor-pointer text-black hover:bg-gray-200"
                >
                  {category}
                </div>
              ))
            )}
          </div>
        )}
        <button type="submit" className="absolute right-0 top-0 mt-2 mr-3">
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M21 21l-6-6M3 9a8 8 0 018-8 8 8 0 018 8 8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8h1"></path>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
