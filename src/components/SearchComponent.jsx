import { Search } from "lucide-react";

function SearchComponent({ query, setQuery }) {
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
    <form className="mt-4 md:mt-0 w-full md:w-auto">
          <label htmlFor="site-search" className="sr-only">
            Search
          </label>
          <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        id="site-search"
        name="search"
        type="search"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
        className="w-full md:w-84 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      </div>
      </form>
    </>
  );
}

export default SearchComponent;
