import { Star, Calendar, Clock } from "lucide-react";
import { formatRating } from "../utils/helpers";

const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      className="bg-black/20 backdrop-blur-sm border border-blue-500/20 rounded-xl overflow-hidden hover:border-blue-400/50 transition-all duration-300  hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer"
      onClick={() => onClick(movie)}
    >
      <div className="aspect-[2/3] bg-gradient-to-br from-blue-900/50 to-slate-900/50 flex items-center justify-center">
        {movie.image ? (
          <img
            src={movie.image}
            alt={movie.movie}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
      </div>

      <div className="p-4">
        <h3 className="text-white text-lg font-bold mb-2 line-clamp-2">
          {movie.movie}
        </h3>

        <div className="flex items-center justify-between mb-3">
          {movie.rating && (
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-yellow-400 font-semibold">
                {formatRating(movie.rating)}
              </span>
            </div>
          )}
          {movie.year && (
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{movie.year}</span>
            </div>
          )}
        </div>

        {movie.director && (
          <p className="text-gray-300 text-sm mb-2">
            <span className="text-gray-400">Director:</span> {movie.director}
          </p>
        )}

        {movie.genre && movie.genre.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {movie.genre.slice(0, 3).map((genre, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-600/30 text-blue-200 text-xs rounded-full border border-blue-500/30"
              >
                {genre}
              </span>
            ))}
            {movie.genre.length > 3 && (
              <span className="px-2 py-1 bg-gray-600/30 text-gray-300 text-xs rounded-full">
                +{movie.genre.length - 3}
              </span>
            )}
          </div>
        )}

        {movie.duration && (
          <div className="flex items-center space-x-1 text-gray-400 text-sm">
            <Clock className="w-4 h-4" />
            <span>{movie.duration}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
