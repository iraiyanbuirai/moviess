import React from "react";

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="card" onClick={onClick} style={{ cursor: "pointer" }}>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
        className="card-img-top img-fluid"
        alt={movie.Title}
      />
      <div className="card-body">
        <h5 className="card-title">{movie.Title}</h5>
        <p className="card-text">Year: {movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
