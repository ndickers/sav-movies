import MovieGrid from "@/components/MovieGrid";
import Navbar from "../../components/Navbar";
async function getMovies(search: string) {
  const params = new URLSearchParams();
  params.set("api_key", process.env.TMDB_API_KEY as string);

  if (search) {
    params.set("search", search);
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?${params.toString()}`,
    {
      cache: "no-store",
    }
  );
  return res.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const getParams = await searchParams;
  const movies = await getMovies(getParams.search);
  return (
    <main className="max-w-6xl mx-auto p-6">
      <div>
        <h1 className="text-3xl font-bold mb-6">🎬 Recommended Movies</h1>
        <Navbar />
      </div>
      <MovieGrid movies={movies} />
    </main>
  );
}
