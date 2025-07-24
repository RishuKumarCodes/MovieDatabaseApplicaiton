import MovieCard from "./MovieCard";

const MovieGrid = ({ movies, onMovieClick }) => {
  if (movies.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="text-gray-400 text-6xl mb-4">🎬</div>
          <h2 className="text-white text-2xl font-bold mb-2">
            No movies found
          </h2>
          <p className="text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
        ))}
      </div>
    </main>
  );
};

export default MovieGrid;
