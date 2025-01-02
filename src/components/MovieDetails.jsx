import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from './Loading';
const MovieDetail = () => {
  const { imdbID } = useParams(); 
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarMovies, setSimilarMovies] = useState([]);
  const API_KEY = '4c168bd1';

  const fetchMovieDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }

      const data = await response.json();

      if (data) {
        setMovieDetail(data);
        fetchSimilarMovies(data.Genre); 
      } else {
        console.error('Movie details not found');
      }
    } catch (error) {
      console.error('Error fetching movie details:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarMovies = async (genre) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${genre}&type=movie`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch similar movies');
      }

      const data = await response.json();
      if (data.Search) {
        setSimilarMovies(data.Search);
      }
    } catch (error) {
      console.error('Error fetching similar movies:', error.message);
    }
  };

  useEffect(() => {
    fetchMovieDetail();
  }, [imdbID]);

  if (loading) {
    return <div><Loading/></div>;
  }

  if (!movieDetail) {
    return <p>No details found for this movie.</p>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center">
          {movieDetail.Title} ({movieDetail.Year})
        </h1>
      </div>
      <div className="row">
        <div className="col-md-4">
          <img
            src={movieDetail.Poster !== 'N/A' ? movieDetail.Poster : 'https://via.placeholder.com/300'}
            alt={movieDetail.Title}
            className="img-fluid"
          />
        </div>
        <div className="col-md-8">
          <h3>Full Synopsis:</h3>
          <p>{movieDetail.Plot}</p>

          <h5>Director:</h5>
          <p>{movieDetail.Director}</p>

          <h5>Cast:</h5>
          <p>{movieDetail.Actors}</p>

          <h5>Writer:</h5>
          <p>{movieDetail.Writer}</p>

          <h5>Genre:</h5>
          <p>{movieDetail.Genre}</p>

          <h5>Rating:</h5>
          <p>{movieDetail.imdbRating}</p>

         
          {movieDetail.Trailer && (
            <div className="mt-4">
              <h5>Watch Trailer:</h5>
              <iframe
                width="560"
                height="315"
                src={movieDetail.Trailer}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h3>Similar Movies:</h3>
        <div className="row">
          {similarMovies.map((movie) => (
            <div key={movie.imdbID} className="col-md-3 mb-4">
              <div className="card">
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'}
                  className="card-img-top"
                  alt={movie.Title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="card-text">Year: {movie.Year}</p>
                 
                  <Link to={`/movie/${movie.imdbID}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
