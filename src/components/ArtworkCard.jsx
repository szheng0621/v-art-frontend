import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function ArtworkCard(props) {
  const {
    artwork,
    onAddToFavourites,
    isPosting,
    username,
    exhibitionTitle,
    exhibitionId,
    hideAddButton = false,
    deleteArtwork,
  } = props;
  console.log("ArtworkCard: username =", username);
  console.log("ArtworkCard: artwork.exhibition_title =", exhibitionTitle);
  console.log("ArtworkCard: artwork.exhibition_id =", exhibitionId);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = () => {
    if (!username || !exhibitionId || !artwork.artwork_id) {
      
      return;
    }

    deleteArtwork(username, artwork.exhibition_id, artwork.artwork_id)
      .then(() => {
        setIsDeleted(true);
      })
      .catch((error) => {
        console.error("Delete failed:", error);
      });
  };

  return (
    <>
      {isDeleted ? (
        <p className="text-sm text-green-600">
          Your artwork is successfully deleted!
        </p>
      ) : (
        <div className="max-w-sm bg-white shadow-md p-0 hover:shadow-lg transition">
          <Link to={`/artworks/${artwork.artwork_id}`}>
            <img
              src={artwork.artwork_img_url}
              alt={artwork.title || "Artwork image"}
              className="w-full h-64 object-cover"
            />
            <h3 className="mt-2 text-xl font-semibold text-gray-800 pl-6 pb-2">
              {artwork.title}
            </h3>
          </Link>

          
          <p className="text-sm text-gray-600 pl-6">
            {artwork.artist || "Unknown Artist"}
          </p>

          <div className="ml-6">  
          {username && exhibitionTitle && (
            <p className="text-xs italic text-gray-500">
              Exhibition:{" "}
              <Link
                to={`/users/${username}/exhibitions`}
                className="text-rose-500 hover:underline"
              >
                {exhibitionTitle}
              </Link>
            </p>
          )}</div>

          {!hideAddButton && (
            <button
              onClick={() => onAddToFavourites(artwork.artwork_id)}
              disabled={isPosting}
              className={`flex items-center text-sm pl-6 pb-4 mt-2 ${
                isPosting
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-rose-500 hover:underline"
              }`}
            >
              <Heart className="w-4 h-4 mr-1" />
              {isPosting ? "Adding..." : "Add to My Favourite"}
            </button>
          )}

          
          <div className="mr-4 mb-4 flex justify-end">
          {username && artwork.exhibition_id && (
            <button
              onClick={handleDelete}
              className="flex items-center justify-between px-1 py-1 border rounded border-rose-200 text-rose-500 hover:text-gray-600 w-full max-w-[100px]"
            >
              <span>Remove</span>
              <Trash2 className="w-4 h-5 ml-2" />
            </button>
          )}
          </div>
        </div>
      )}
    </>
  );
}
