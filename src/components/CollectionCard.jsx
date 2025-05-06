import React from "react";
import { Link } from "react-router-dom";

const CollectionCard = ({ collection }) => {
    return (
        <Link to={`/collections/${collection.slug}`} className={`collection-box ${collection.slug}`}>
          <div className="collection-text">
            <h3 className="collection-title">{collection.slug}</h3>
            <p className="collection-description">{collection.description}</p>
          </div>
        </Link>
      );
    };

export default CollectionCard;
