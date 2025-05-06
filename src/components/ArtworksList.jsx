import { useEffect, useState, useContext } from "react";
import { getArtworks, postArtworkToUserExhibition } from "../apiCall.js";
import ArtworkCard from "./ArtworkCard";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";

export default function ArtworksList() {
  const [artworks, setArtworks] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const { user } = useContext(UserContext);
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    setError(null);
    setIsLoading(true);

    getArtworks({ sort_by: sortBy, order, limit, page })
      .then((fetched) => {
        setArtworks(fetched);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [sortBy, order, page]);

  const handleAddToFavourites = (artworkId) => {
    if (!user) {
      alert("You must be logged in to add to favourites.");
      return;
    }

    const { username, exhibition_id } = user;

    setIsPosting(true);

    postArtworkToUserExhibition(username, exhibition_id, artworkId)
      .then(() => {
        setIsPosting(false);
        alert("Artwork added to your favourites!");
      })
      .catch((err) => {
        console.error("Error adding artwork:", err);
        setIsPosting(false);
        alert("Failed to add artwork to your favourites.");
      });
  };
  

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
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  return (
    <section>
      <div className="container mx-auto flex flex-wrap items-center mb-4 space-x-4 mt-6">
        <div className="flex items-center space-x-2 mb-4">
          <label htmlFor="sort-by">Sort by:</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={handleSorting}
            className="border rounded px-2 py-1  border-gray-200"
          >
            <option value="created_at">Date</option>
            <option value="title">Title</option>
            <option value="collection">Collection</option>
            <option value="location">Location</option>
          </select>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <label htmlFor="order">Order:</label>
          <select
            id="order"
            value={order}
            onChange={handleOrdering}
            className="border rounded px-2 py-1  border-gray-200"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          
      {user && (
        <div className="ml-6">
          <Link
            to={`/users/${user.username}/exhibitions`}
            className="inline-block px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
          >
            ← Back to My Exhibition
          </Link>
        </div>
      )}

        </div>
      </div>

      <ul className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.artwork_id}
            artwork={artwork}
            username={user?.username}
            onAddToFavourites={handleAddToFavourites}
          />
        ))}
      </ul>

      <div className="pagination-controls flex gap-4 mt-8 my-10 justify-center">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="text-sm font-medium px-4"
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
}
