import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './Component/Movies/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [error, setError] = useState(null);
 

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
    throw new Error ('Something went wrong!');
 
   }
   const data = await response.json();

  const transformedMovies = data.results.map((moviesData) => {
      return {
        id: moviesData.episode_id,
        title: moviesData.title,
        openingText: moviesData.opening_crawl,
        releaseDate: moviesData.release_date
      };
    });
    setMovies(transformedMovies);
  } catch (error) {
    setError(error.message);
}
  setIsLoading(false);
}, []);

useEffect(() => {
  fetchMoviesHandler();

}, [fetchMoviesHandler]);


let content = <p>Found no movies.</p>

if (movies.length>0) {
  content = <MoviesList movies = {movies} />;
}

if (error) {
  content = <p>{error}</p>
}
if (isLoading){
  content = <p>Loading...</p>;
}

  return (
    <React.Fragment>
      <html className='background'>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content} </section>
      </html>
    </React.Fragment>
  );
}

export default App;