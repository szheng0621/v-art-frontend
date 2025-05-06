import React from "react";
import CollectionList from "./CollectionList";

const Collections = () => {
  return (
    <div>
      <h2 className="text-black text-4xl font-black mt-6 px-4">Collections</h2>
      <h3 className="text-black text-xl px-5 mb-6">
      Browse artworks by collections
          </h3>
      <CollectionList />
    </div>
  );
};

export default Collections;
