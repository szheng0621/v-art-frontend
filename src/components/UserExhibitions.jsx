import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { getUserExhibitionsWithArtworks, deleteArtworkById } from "../apiCall";
import { Link } from "react-router-dom";
import ArtworkCard from "./ArtworkCard";

const UserExhibitions = () => {
  const { user } = useContext(UserContext);
  const [exhibitions, setExhibitions] = useState([]);
  const [groupedArtworks, setGroupedArtworks] = useState([]);
  const [filters, setFilters] = useState({
    collection: "All",
    sort_by: "title",
    order: "asc",
  });
  console.log("user here", user)

  const deleteArtwork = (username, exhibition_id, artwork_id) => {
    return deleteArtworkById(username, exhibition_id, artwork_id).then(() => {
      setGroupedArtworks((currentGroups) =>
        currentGroups.map((group) => ({
          ...group,
          artworks: group.artworks.filter(
            (artwork) => artwork.artwork_id !== artwork_id
          ),
        })).filter(group => group.artworks.length > 0)
      );
    });
  };
  

  useEffect(() => {
    if (user) {
      getUserExhibitionsWithArtworks({
        username: user.username,
        collection: filters.collection !== "All" ? filters.collection : undefined,
        sort_by: filters.sort_by,
        order: filters.order,
      }).then(({ exhibitions, groupedArtworks }) => {
        console.log("///groupedArtworks data:", groupedArtworks); 

        setExhibitions(exhibitions);
        setGroupedArtworks(groupedArtworks);
      });
    }
  }, [user, filters]);

  if (!user) return <p>Please log in.</p>;

  return (
    <div className="ccontainer mx-auto p-4 md:p-8">
      <h2 className="text-xl">{user.username}'s Exhibition</h2>

      
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 mb-6 mt-6">
        <select
          value={filters.collection}
          onChange={(e) => setFilters({ ...filters, collection: e.target.value })}
          className="border rounded px-2 py-1 border-gray-200 w-full md:w-auto"
        >
          <option value="All">All Collections</option>
          <option value="painting">Painting</option>
          <option value="photography">Photography</option>
          <option value="sculpture">Sculpture</option>
          <option value="installation">Installation</option>
          <option value="manuscript">Manuscript</option>
          <option value="misc">Misc</option>
        </select>

        <select
          value={filters.sort_by}
          onChange={(e) => setFilters({ ...filters, sort_by: e.target.value })}
          className="border rounded px-2 py-1 border-gray-200 w-full md:w-auto"
        >
          <option value="title">Title</option>
          <option value="created_at">Created At</option>
        </select>

        <select
          value={filters.order}
          onChange={(e) => setFilters({ ...filters, order: e.target.value })}
          className="border rounded px-2 py-1 border-gray-200 w-full md:w-auto"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>

        

        <Link
          to="/artworks"
          className="inline-block px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 text-center w-full md:w-auto"
        >
          View All Artworks
        </Link>
      
      </div>


      
      <div className="">
        {exhibitions.map((exhibition) => (
          <div
            key={exhibition.exhibition_id}
            className="p-4 text-center"
          >
            <h3 className="text-4xl font-bold mb-2">{exhibition.title}</h3>
            <p className="text-md text-gray-600 font-medium">Created: {new Date(exhibition.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      
      {groupedArtworks.map((group) => (
  <div key={group.collection} className="mb-8">
    <h3 className="text-xl font-bold capitalize mb-3">{group.collection}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {group.artworks.map((artwork) => (
        <ArtworkCard
          key={artwork.artwork_id}
          artwork={artwork}
          username={user.username}
          exhibitionTitle={artwork.exhibition_title}
          exhibitionId={artwork.exhibition_id}
          hideAddButton={true}
          deleteArtwork={deleteArtwork}
        />
      ))}
    </div>
  </div>
))}
    </div>
  );
};

export default UserExhibitions;
