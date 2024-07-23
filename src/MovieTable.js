import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieTable.css';

const MovieTable = () => {
  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies(); // Fetch movies on component mount
  }, []);

  const fetchMovies = () => {
    axios.get('http://localhost:3000/api/movies')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the movies!', error);
      });
  };

  const fetchMovieById = () => {
    axios.get(`http://localhost:3000/api/movies/${movieId}`)
      .then(response => {
        setSelectedMovie(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the movie details!', error);
      });
  };

  const deleteMovieById = () => {
    axios.delete(`http://localhost:3000/api/movies/${movieId}`)
      .then(() => {
        // Remove the movie from the local state
        setMovies(movies.filter(movie => movie.ID !== parseInt(movieId)));
        setSelectedMovie(null);
        setMovieId('');
      })
      .catch(error => {
        console.error('There was an error deleting the movie!', error);
      });
  };

  return (
    <div>
      <h1>Movie List</h1>
      
      {/* Input and Button for fetching movie details by ID */}
      <div>
        <input
          type="text"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          placeholder="Enter Movie ID"
        />
        <button onClick={fetchMovieById}>Get Movie Details</button>
        <button onClick={deleteMovieById}>Delete Movie</button>
      </div>
      
      {/* Movie Details Section */}
      {selectedMovie && (
        <div>
          <h2>Movie Details</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Runtime</th>
                <th>Year</th>
                <th>Director</th>
                <th>Country</th>
                <th>Cast</th>
                <th>Genre</th>
                <th>Synopsis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedMovie.ID}</td>
                <td>{selectedMovie.Title}</td>
                <td>{selectedMovie.Runtime}</td>
                <td>{selectedMovie.Year}</td>
                <td>{selectedMovie.Director}</td>
                <td>{selectedMovie.Country}</td>
                <td>{(selectedMovie.Cast || []).join(', ')}</td>
                <td>{(selectedMovie.Genre || []).join(', ')}</td>
                <td>{selectedMovie.Synopsis}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      
      {/* Movie List Table */}
      <h2>All Movies</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Runtime</th>
            <th>Year</th>
            <th>Director</th>
            <th>Country</th>
            <th>Cast</th>
            <th>Genre</th>
            <th>Synopsis</th>
          </tr>
        </thead>
        <tbody>
          {movies.length > 0 ? (
            movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.ID}</td>
                <td>{movie.Title}</td>
                <td>{movie.Runtime}</td>
                <td>{movie.Year}</td>
                <td>{movie.Director}</td>
                <td>{movie.Country}</td>
                <td>{(movie.Cast || []).join(', ')}</td>
                <td>{(movie.Genre || []).join(', ')}</td>
                <td>{movie.Synopsis}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No movies found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;
