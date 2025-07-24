import { useState } from "react";
import { omdbService } from "../services/omdbService";

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      setError(null);

      const popularSearchTerms = [
        "avengers",
        "batman",
        "spider",
        "star wars",
        "harry potter",
        "lord of the rings",
        "matrix",
        "inception",
        "godfather",
        "pulp fiction",
      ];

      const moviePromises = popularSearchTerms.map(async (term) => {
        try {
          const data = await omdbService.searchMovies(term);
          if (data.Response === "True" && data.Search) {
            return data.Search.slice(0, 2); // Get first 2 results per search
          }
          return [];
        } catch (err) {
          console.error(`Error fetching ${term}:`, err);
          return [];
        }
      });

      const results = await Promise.all(moviePromises);
      const allMovies = results.flat();

      const uniqueMovies = allMovies.filter(
        (movie, index, self) =>
          index === self.findIndex((m) => m.imdbID === movie.imdbID)
      );

      const detailedMovies = await Promise.all(
        uniqueMovies.slice(0, 20).map(async (movie) => {
          try {
            const detailData = await omdbService.getMovieDetails(movie.imdbID);
            if (detailData.Response === "True") {
              return omdbService.formatMovieData(detailData);
            }
            return null;
          } catch (err) {
            console.error(`Error fetching details for ${movie.imdbID}:`, err);
            return null;
          }
        })
      );

      const validMovies = detailedMovies.filter((movie) => movie !== null);
      setMovies(validMovies);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query) => {
    if (!query.trim()) return;

    try {
      setIsSearching(true);
      setError(null);

      const data = await omdbService.searchMovies(query);

      if (data.Response === "True" && data.Search) {
        const detailedMovies = await Promise.all(
          data.Search.slice(0, 10).map(async (movie) => {
            try {
              const detailData = await omdbService.getMovieDetails(
                movie.imdbID
              );
              if (detailData.Response === "True") {
                return omdbService.formatMovieData(detailData);
              }
              return null;
            } catch (err) {
              console.error(`Error fetching details for ${movie.imdbID}:`, err);
              return null;
            }
          })
        );

        const validMovies = detailedMovies.filter((movie) => movie !== null);
        setMovies(validMovies);
      } else {
        setMovies([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSearching(false);
    }
  };

  return {
    movies,
    loading,
    error,
    isSearching,
    searchMovies,
    fetchPopularMovies,
  };
};
