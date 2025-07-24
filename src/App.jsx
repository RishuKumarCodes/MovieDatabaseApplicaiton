import { useEffect, useState } from "react";
import { useMovies } from "./hooks/useMovies.jsx";
import { useMovieFilters } from "./hooks/useMovieFilters.jsx";
import MovieModal from "./components/MovieModal";
import Header from "./components/Header";
import MovieGrid from "./components/MovieGrid";
import { ErrorMessage } from "./components/UIComponents";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    movies,
    loading,
    error,
    isSearching,
    searchMovies,
    fetchPopularMovies,
  } = useMovies();

  const {
    filteredMovies,
    selectedGenre,
    searchQuery,
    setSelectedGenre,
    setSearchQuery,
    getUniqueGenres,
  } = useMovieFilters(movies);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-screen overflow-hidden bg-gray-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-black text-lg">Loading movies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-screen overflow-hidden bg-gray-300 flex items-center justify-center">
        <div className="text-center bg-red-900/20 border border-red-500/30 rounded-lg p-8">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-2xl font-bold mb-2">
            Error Loading Movies
          </h2>
          <p className="text-red-300 mb-4">{fetchPopularMovies}</p>
          <button
            onClick={fetchPopularMovies}
            className="text-black px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App min-h-screen bg-gray-600 w-[calc(100vw-10px)]">
      <Header
        filteredMovies={filteredMovies}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchMovies={searchMovies}
        isSearching={isSearching}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        getUniqueGenres={getUniqueGenres}
      />
      <MovieGrid movies={filteredMovies} onMovieClick={handleMovieClick} />
      <footer className="container mx-auto px-4 py-6 text-center">
        <p className="text-gray-400 mb-2">
          Created By Rishu Kumar • Powered by OMDb API
        </p>
      </footer>
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
