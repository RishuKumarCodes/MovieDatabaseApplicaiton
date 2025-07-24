import { Search } from "lucide-react";

const Header = ({
  filteredMovies,
  searchQuery,
  setSearchQuery,
  searchMovies,
  isSearching,
  selectedGenre,
  setSelectedGenre,
  getUniqueGenres,
}) => {
  return (
    <header className="bg-black/20 backdrop-blur-2xl sticky top-0 z-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold text-white">
            Movie Database Applicaiton
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search movies on OMDb (e.g., 'Batman', 'Star Wars')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    searchMovies(searchQuery);
                  }
                }}
                className="w-full pl-10 pr-4 py-3 bg-black/30 border border-gray-500/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-400/20"
              />
            </div>
            <div
              onClick={() => {
                if (!searchQuery.trim() || isSearching) return;
                searchMovies(searchQuery);
              }}
              className={`px-6 py-3 rounded-full font-medium transition-colors text-white 
                ${
                  !searchQuery.trim() || isSearching
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                }
              `}
            >
              {isSearching ? "Searching..." : "Search"}
            </div>

            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-3 bg-black/30 border border-gray-500/30 rounded-full text-white focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-400/20"
            >
              <option value="">All Genres</option>
              {getUniqueGenres().map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-blue-300">
          {filteredMovies.length} movies found
        </div>
      </div>
    </header>
  );
};

export default Header;
