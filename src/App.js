import React, { useState, useEffect, useCallback } from 'react';
import MoviesList from './Component/Movies/MoviesList';
import AddMovie from './Component/Movies/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteMovieHandler = async (id) => {
    try {
      const response = await fetch(
        `https://react-hp-325a3-default-rtdb.firebaseio.com/movies/${id}.json`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong while deleting the movie.');
      }

      // Update the UI by removing the deleted movie from the movies state
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://react-hp-325a3-default-rtdb.firebaseio.com/movies.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          ...data[key], // Spread the movie data
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = async (movie) => {
    try {
      const response = await fetch(
        'https://react-hp-325a3-default-rtdb.firebaseio.com/movies.json',
        {
          method: 'POST',
          body: JSON.stringify(movie),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add the movie.');
      }

      const data = await response.json();

      // Update the UI by adding the new movie to the movies state
      setMovies((prevMovies) => [
        ...prevMovies,
        {
          id: data.name,
          ...movie, // Spread the movie data
        },
      ]);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='background'>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler} />
      </section>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default App;
