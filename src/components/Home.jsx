import React, { useState } from "react";
import { Search } from "lucide-react";
import ArtworksList from "./ArtworksList";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div className="container mx-auto mt-6 px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-black text-4xl font-black">Welcome</h2>
          <h3 className="text-black text-xl font-bold mt-2">
            Explore art and ideas at V-Art.
          </h3>
        </div>

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
              placeholder="Search Artworks"
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-84 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </form>
      </div>
      <ArtworksList search={search} />
    </div>
  );
}
