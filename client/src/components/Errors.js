import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const EpisodesList = () => {
  const errors = useSelector((state) => state.errors);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <h1>{errors.error}</h1>
      </div>
    </div>
  );
};

export default EpisodesList;
