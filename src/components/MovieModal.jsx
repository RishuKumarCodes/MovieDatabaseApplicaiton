import {
  X,
  Star,
  Calendar,
  Clock,
  Film,
  User,
  Award,
  Globe,
} from "lucide-react";
import { formatRating } from "../utils/helpers";

const MovieModal = ({ movie, isOpen, onClose }) => {
  if (!isOpen || !movie) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-neutral-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className=" p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white truncate mr-4">
            {movie.movie}
          </h2>
          <button onClick={onClose} className="text-black">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Movie Poster */}
            <div className="md:col-span-1">
              <div className="aspect-[2/3] bg-gradient-to-br from-gray-900/50 to-slate-900/50 rounded-xl overflow-hidden flex items-center justify-center">
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
            </div>

            {/* Movie Details */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl font-light text-white mb-6">
                  {movie.movie}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-4">
                  {movie.rating && (
                    <div className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/30">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-yellow-400 font-semibold text-lg">
                        {formatRating(movie.rating)}
                      </span>
                      <span className="text-yellow-300 text-sm">/10</span>
                    </div>
                  )}

                  {movie.year && (
                    <div className="flex items-center space-x-2 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-300 font-medium">
                        {movie.year}
                      </span>
                    </div>
                  )}

                  {movie.duration && (
                    <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
                      <Clock className="w-4 h-4 text-green-400" />
                      <span className="text-green-300 font-medium">
                        {movie.duration}
                      </span>
                    </div>
                  )}
                </div>

                {movie.genre && movie.genre.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {movie.genre.map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-600/30 text-gray-200 text-sm rounded-full border border-gray-500/30 font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {movie.director && (
                <div className="bg-black/20 rounded-lg p-4 border border-gray-500/20">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wide">
                        Director
                      </p>
                      <p className="text-white font-semibold">
                        {movie.director}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {movie.plot && movie.plot !== "N/A" && (
                <div className="bg-black/20 rounded-lg p-4 border border-gray-500/20">
                  <div className="flex items-start space-x-3">
                    <Film className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">
                        Plot
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        {movie.plot}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {movie.rated && (
                  <div className="bg-black/20 rounded-lg p-4 border border-gray-500/20">
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-orange-400" />
                      <div>
                        <p className="text-sm text-gray-400 uppercase tracking-wide">
                          Rated
                        </p>
                        <p className="text-white font-semibold">
                          {movie.rated}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {movie.country && (
                  <div className="bg-black/20 rounded-lg p-4 border border-gray-500/20">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-sm text-gray-400 uppercase tracking-wide">
                          Country
                        </p>
                        <p className="text-white font-semibold">
                          {movie.country}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
