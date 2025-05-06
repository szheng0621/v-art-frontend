import React from 'react'

const ExhibitionCard = ({ exhibition }) => {
    return (
      <div >
        <h3 className="text-lg font-semibold">{exhibition.title}</h3>
      </div>
    );
  };
  

export default ExhibitionCard