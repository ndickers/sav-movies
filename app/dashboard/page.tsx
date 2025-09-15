import MovieGrid from "@/components/MovieGrid";
import Navbar from "../../components/Navbar";
import Link from "next/link";
async function getMovies(search: string, page: number) {
  const params = new URLSearchParams();
  params.set("api_key", process.env.TMDB_API_KEY as string);
  params.set("page", page.toString());
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
  searchParams: { search: string; page: number };
}) {
  const getParams = searchParams;
  const page = Number(searchParams?.page) || 1;
  const movies = await getMovies(getParams.search, page);
  return (
    <main className="max-w-6xl mx-auto p-6">
      <div>
        <h1 className="text-base md:text-3xl font-bold mb-6">
          🎬 Recommended Movies
        </h1>
        <Navbar />
      </div>
      <MovieGrid movies={movies.results} />

      {movies.results.length !== 0 && (
        <div className="flex justify-center items-center gap-8 mt-6">
          <Link
            href={`/dashboard?page=${movies.page - 1}`}
            className={`px-4 py-2 rounded bg-gray-200 ${
              movies.page === 1 ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Prev
          </Link>
          <span>
            Page {movies.page} of {movies.total_pages}
          </span>
          <Link
            href={`/dashboard?page=${movies.page + 1}`}
            className={`px-4 py-2 rounded bg-gray-200 ${
              movies.page === movies.total_pages
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          >
            Next
          </Link>
        </div>
      )}
    </main>
  );
}
