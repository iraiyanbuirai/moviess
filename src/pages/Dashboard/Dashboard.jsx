import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeSessionCookie } from "../../utils/auth";
import { setUser } from "../../redux/store";
import MovieCard from "../../components/MovieCard";
import SearchBar from "../../components/Searchbar";
import Loading from "../../components/Loading";

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const API_KEY = "4c168bd1";

  const fetchMovies = async () => {
    if (!hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=movie&page=${page}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Movies:", data);

      if (data.Search && Array.isArray(data.Search)) {
        setMovies((prevMovies) => [...prevMovies, ...data.Search]);
        if (data.Search.length < 10) setHasMore(false);
      } else {
        console.error("Unexpected response structure:", data);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !loading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const handleSearch = async (query) => {
    if (!query) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Search Results:", data);

      if (data.Search && Array.isArray(data.Search)) {
        setMovies(data.Search);
        setPage(1);
        setHasMore(true); 
      } else {
        setMovies([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error during search:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    removeSessionCookie();
    dispatch(setUser(null));
    localStorage.removeItem("user_token"); 
    navigate("/login"); 
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center">Movies Dashboard</h1>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <SearchBar onSearch={handleSearch} />
      <div className="row g-3">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="col-md-4">
            <MovieCard
              movie={movie}
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
            />
          </div>
        ))}
      </div>
      {loading && <div><Loading/></div>}
      {!hasMore && !loading && <p className="text-center mt-4">No more movies!</p>}
    </div>
  );
};

export default Dashboard;
