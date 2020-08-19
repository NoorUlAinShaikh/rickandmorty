import React from "react";

export const Episode = ({ ep }) => {
  const getRandom = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const { air_date, characters, episode, name } = ep;

  const getCharacter = () => {
    let avatarURL = "";
    if (characters.length > 0) {
      const url = characters[getRandom(0, characters.length - 1)];
      if (url) {
        const position = url.lastIndexOf("/");
        avatarURL = `${url.slice(0, position)}/avatar${url.slice(
          position
        )}.jpeg`;
      }
    }

    return avatarURL;
  };

  return (
    <div className="card mb-3">
      <img className="card-img-top" src={getCharacter()} alt="character" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{episode}</p>
        <p className="card-text">
          <small className="text-muted">{`Aired on ${air_date}`}</small>
        </p>
      </div>
    </div>
  );
};
