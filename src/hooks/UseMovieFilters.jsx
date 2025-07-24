import { useState, useEffect } from "react";

export const useMovieFilters = (movies) => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    filterMovies();
  }, [searchTerm, selectedGenre, movies]);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const filterMovies = () => {
    let filtered = movies;

    if (searchTerm) {
      filtered = filtered.filter(
        (movie) =>
          movie.movie.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.director?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.genre?.some((g) =>
            g.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter((movie) =>
        movie.genre?.some(
          (g) => g.toLowerCase() === selectedGenre.toLowerCase()
        )
      );
    }

    setFilteredMovies(filtered);
  };

  const getUniqueGenres = () => {
    const genres = new Set();
    movies.forEach((movie) => {
      if (movie.genre) {
        movie.genre.forEach((g) => genres.add(g));
      }
    });
    return Array.from(genres).sort();
  };

  return {
    filteredMovies,
    searchTerm,
    selectedGenre,
    searchQuery,
    setSearchTerm,
    setSelectedGenre,
    setSearchQuery,
    getUniqueGenres,
  };
};