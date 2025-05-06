import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getArtworkById, postArtworkToUserExhibition } from "../apiCall";
import { UserContext } from "../context/userContext";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function SingleArtwork() {
  const [singleArtwork, setSingleArtwork] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { artwork_id } = useParams();
  const { user } = useContext(UserContext);
  const [isPosting, setIsPosting] = useState(false);
  const [postSuccessMessage, setPostSuccessMessage] = useState("");

  useEffect(() => {
    getArtworkById(artwork_id)
      .then((artworkData) => {
        setSingleArtwork(artworkData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [artwork_id]);

  const handleAddToFavourites = () => {
    if (!user) {
      alert("You must be logged in to add to favourites.");
      return;
    }

    const { username, exhibition_id } = user;

    setIsPosting(true);
    setPostSuccessMessage("");

    postArtworkToUserExhibition(
      username,
      exhibition_id,
      singleArtwork.artwork_id
    )
      .then(({ addedArtwork }) => {
        setPostSuccessMessage("Artwork added to your favourites!");
        setIsPosting(false);
      })
      .catch((err) => {
        console.error("Error adding artwork:", err);
        setIsPosting(false);
        alert("Failed to add artwork to your favourites.");
      });
  };

  if (isLoading) {
    return <p className="text-gray-500">…Loading the artwork…</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-2">{singleArtwork.title}</h2>
      <p className="text-lg text-gray-700 mb-4 italic">
        by {singleArtwork.artist}
      </p>

      <div className="mb-6">
        <img
          src={singleArtwork.artwork_img_url}
          alt={singleArtwork.title}
          className="w-full rounded shadow-md object-cover"
        />
      </div>

      <div className="space-y-2 text-gray-800 text-base">
        <p>
          <strong>Collection:</strong> {singleArtwork.collection}
        </p>
        <p>
          <strong>Size:</strong> {singleArtwork.size}
        </p>
        <p>
          <strong>Location:</strong> {singleArtwork.location}
        </p>
        <p>
          <strong>Description:</strong> {singleArtwork.description}
        </p>
        <p>
          <strong>Created at:</strong>{" "}
          {new Date(singleArtwork.created_at).toLocaleDateString()}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 items-center">
      <button
        onClick={handleAddToFavourites}
        disabled={isPosting}
        className="flex items-center text-sm  px-2 pb-2 pt-2 bg-rose-500 text-white rounded hover:bg-rose-600"
      >
        <Heart className="w-4 h-4 mr-1" />
        {isPosting ? "Adding..." : "Add to My Favourite"}
      </button>
      {postSuccessMessage && (
        <p className="text-rose-500 mt-4">{postSuccessMessage}</p>
      )}

      {user && (
        <div className="ml-6">
          <Link
            to={`/users/${user.username}/exhibitions`}
            className="px-3 py-2 text-sm bg-rose-500 text-white rounded hover:bg-rose-600 hover:!text-white"
          >
            ← Back to My Exhibition
          </Link>
        </div>
      )}
      </div>
    </section>
  );
}
