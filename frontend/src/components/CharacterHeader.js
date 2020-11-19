import React from "react";

const CharacterHeader = ({ characterPic, name, description }) => {
  return (
    <div className="characterHeader">
      <img src={characterPic} alt={name} />
      <div>
        <h1>{name}</h1>
        <div>{description}</div>
      </div>
    </div>
  );
};

export default CharacterHeader;
