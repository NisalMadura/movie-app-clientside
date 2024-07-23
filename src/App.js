import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieTable from './MovieTable';
import AddMovie from './AddMovie';  // Import the AddMovie component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieTable />} />
        <Route path="/add-movie" element={<AddMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
