import React , { useState, useEffect} from 'react';

import MovieCard from './MovieCard';

import logo from './logo.svg';
import './App.css';
//import SearchIcon from "./search.svg";

const API_URL = 'http://www.omdbapi.com?apikey=d2dfec2';

  
  const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);


  useEffect (() => {
    searchMovies('pirate');
  }, []);

  const searchMovies = async (search, pages = 100) => {
    let allMovies = [];
    for (let page = 1; page <= pages; page++) {
      const response = await fetch(`${API_URL}&s=${search}&page=${page}`);
      const data = await response.json();
      if (data.Search) {
        allMovies = allMovies.concat(data.Search);
      } else {
        break; // Stop if no more results
      }
    }
    setMovies(allMovies);
  };

  return (
    <div className="app">
      <h1>ZazaMovies</h1>

      
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for zaza movies"
        />


      
        <img src="https://raw.githubusercontent.com/gist/adrianhajdin/997a8cdf94234e889fa47be89a4759f1/raw/f13e5a9a0d1e299696aa4a0fe3a0026fa2a387f7/search.svg"
        alt="search"
        onClick={() => searchMovies(searchTerm)}
        />

      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
          </div>
        ) : (
          <div className="empty">
          <h2>No movies found</h2>
        </div>
        )

      }

    </div>
    
  );
};

export default App;
