import React from "react";

const MovieCard = ({ movie, onClick }) => {
  return (
    <div 
      className="card movie-card" 
      onClick={() => onClick(movie)} 
      style={{ cursor: "pointer" }} 
      aria-label={`Click to view details of ${movie.Title}`}
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
        className="card-img-top img-fluid"
        alt={`Poster of ${movie.Title}`}
      />
      <div className="card-body">
        <h5 className="card-title">{movie.Title}</h5>
        <p className="card-text">Year: {movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
