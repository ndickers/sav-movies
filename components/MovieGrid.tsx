import MovieCard from "./MovieCard";

export default function MovieGrid({
  movies,
}: {
  movies: {
    id: number;
    poster_path: string;
    title: string;
    overview: string;
  }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center items-stretch lg:justify-items-start">
      {movies.length === 0 ? (
        <p className="text-center mt-5">No results</p>
      ) : (
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      )}
    </div>
  );
}
