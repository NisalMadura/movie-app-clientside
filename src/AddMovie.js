import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddMovie() {
  const [movie, setMovie] = useState({
    Title: '',
    Runtime: '',
    Year: '',
    Director: '',
    Country: '',
    Cast: '',
    Genre: '',
    Synopsis: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data for POST request
    const data = {
      Title: movie.Title,
      Runtime: parseInt(movie.Runtime),
      Year: parseInt(movie.Year),
      Director: movie.Director,
      Country: movie.Country,
      Cast: movie.Cast.split(',').map(c => c.trim()), // Convert to array
      Genre: movie.Genre.split(',').map(g => g.trim()), // Convert to array
      Synopsis: movie.Synopsis
    };

    // Make POST request
    axios.post('http://localhost:3000/api/movies', data)
      .then(response => {
        alert('Movie added successfully!');
        navigate('/');
      })
      .catch(error => {
        console.error('There was an error adding the movie!', error);
      });
  };

  return (
    <div>
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="Title" value={movie.Title} onChange={handleChange} required />
        </div>
        <div>
          <label>Runtime (minutes):</label>
          <input type="number" name="Runtime" value={movie.Runtime} onChange={handleChange} required />
        </div>
        <div>
          <label>Year:</label>
          <input type="number" name="Year" value={movie.Year} onChange={handleChange} required />
        </div>
        <div>
          <label>Director:</label>
          <input type="text" name="Director" value={movie.Director} onChange={handleChange} required />
        </div>
        <div>
          <label>Country:</label>
          <input type="text" name="Country" value={movie.Country} onChange={handleChange} required />
        </div>
        <div>
          <label>Cast (comma separated):</label>
          <input type="text" name="Cast" value={movie.Cast} onChange={handleChange} required />
        </div>
        <div>
          <label>Genre (comma separated):</label>
          <input type="text" name="Genre" value={movie.Genre} onChange={handleChange} required />
        </div>
        <div>
          <label>Synopsis:</label>
          <textarea name="Synopsis" value={movie.Synopsis} onChange={handleChange} required />
        </div>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default AddMovie;
