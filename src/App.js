import React, { useState, useEffect, useCallback } from 'react';
import MoviesList from './Component/Movies/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/film/');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();

      const transformedMovies = data.results.map((moviesData) => {
        return {
          id: moviesData.episode_id,
          title: moviesData.title,
          openingText: moviesData.opening_crawl,
          releaseDate: moviesData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
      if (!retrying) {
        setRetrying(true);
      }
    }
    setIsLoading(false);
  }, [retrying]);

  useEffect(() => {
    if (retrying) {
      const timerId = setTimeout(() => {
        fetchMoviesHandler(); 
      }, 5000);

      return () => clearTimeout(timerId); 
    }
  }, [retrying, fetchMoviesHandler]); 

  function cancelRetry() {
    setRetrying(false); 
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = (
      <div>
        <p>{error}</p>
        {retrying && (
          <button onClick={cancelRetry}>Cancel Retrying</button>
        )}
      </div>
    );
  }

  if (isLoading) {
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
