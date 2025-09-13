import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

export default function MovieGrid({
  movies,
  loading,
}: {
  movies: {
    id: number;
    poster_path: string;
    title: string;
    overview: string;
  }[];
  loading: boolean;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center items-stretch lg:justify-items-start">
      {loading
        ? Array.from({ length: 8 }).map((_, idx) => (
            <MovieCardSkeleton key={idx} />
          ))
        : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
}
