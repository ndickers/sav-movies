import MovieGrid from "../components/MovieGrid";
import Navbar from "../components/Navbar";

async function getMovies() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?api_key=${process.env.TMDB_API_KEY}`,
    {
      cache: "no-store",
    }
  );
  return res.json();
}

export default async function Home() {
  const movies = await getMovies();
  console.log({ movies });

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div>
        <h1 className="text-3xl font-bold mb-6">🎬 Recommended Movies</h1>
        <Navbar />
      </div>
      <MovieGrid movies={movies} loading={!movies} />
    </main>
  );
}
