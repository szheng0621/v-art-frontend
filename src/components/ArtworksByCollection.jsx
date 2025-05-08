import { useParams } from "react-router-dom";
import { getArtworksByCollection } from "../apiCall";
import ArtworkCard from "./ArtworkCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const navItems = [
  { name: "painting", to: "/collections/painting" },
  { name: "photography", to: "/collections/photography" },
  { name: "sculpture", to: "/collections/sculpture" },
  { name: "installation", to: "/collections/installation" },
  { name: "manuscript", to: "/collections/manuscript" },
  { name: "misc", to: "/collections/misc" },
];

const ArtworksByCollection = () => {
  const [artworks, setArtworks] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1); // Add page state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { collection } = useParams();

  useEffect(() => {
    console.log("Fetching artworks for collection:", collection);
    setError("");
    setIsLoading(true);
    getArtworksByCollection({
      sort_by: sortBy,
      order,
      collection,
      limit: 9,
      page,
    })
      .then((artworks) => {
        setArtworks(artworks);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load artworks. Please try again.");
        setIsLoading(false);
      });
  }, [sortBy, order, collection, page]);

  const handleSorting = (event) => {
    setSortBy(event.target.value);
  };

  const handleOrdering = (event) => {
    setOrder(event.target.value);
  };

  if (isLoading) {
    return <p className="text-gray-500">…Loading artworks…</p>;
  }

  if (error) {
    return (
      <p className="text-red-500">
        Error: {typeof error === "string" ? error : error.message}
      </p>
    );
  }

  if (artworks.length === 0) {
    return <p>No artworks found for the "{collection}" collection.</p>;
  }

  return (
    <section className="container mx-auto mt-6 px-6">
      <h2 className="text-black text-4xl font-black">
        Explore {collection} artworks
      </h2>

      <nav className="mb-6 pb-2 mt-6">
        <ul className="flex flex-wrap gap-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.to}
                className={`capitalize text-base sm:text-lg tracking-wide hover:text-gray-600 transition-colors ${
                  item.name === collection ? "font-semibold underline" : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-wrap items-center mb-4 space-x-4 mt-6">
        <div className="flex items-center space-x-2">
          <label htmlFor="sort-by">Sort by:</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={handleSorting}
            className="border rounded px-2 py-1"
          >
            <option value="created_at">Date</option>
            <option value="title">Title</option>
            <option value="collection">Collection</option>
            <option value="location">Location</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="order">Order:</label>
          <select
            id="order"
            value={order}
            onChange={handleOrdering}
            className="border rounded px-2 py-1"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.artwork_id || artwork.id}
            artwork={artwork}
          />
        ))}
      </ul>

      <div className="pagination-controls flex gap-4 mt-8 my-10 justify-center">
        <button
          disabled={page === 1}
          className={`text-sm font-medium px-4 ${
            page === 1 ? "text-gray-400 cursor-not-allowed" : ""
          }`}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </button>
        <span className="text-sm font-medium">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="text-sm font-medium px-4"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ArtworksByCollection;
