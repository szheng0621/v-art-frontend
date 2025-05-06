import React, { useEffect, useState } from "react";
import { getCollections } from "../apiCall";
import CollectionCard from "./CollectionCard";


const CollectionList = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCollections()
      .then((collections) => {
        setCollections(collections);
        console.log("Fetched set collections:", collections);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;
 
  return (
    <div className="collection-grid">
      {collections.map((collection) => (
        <CollectionCard key={collection.slug} collection={collection} />
      ))}
    </div>
  );
};

export default CollectionList;
