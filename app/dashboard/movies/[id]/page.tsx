import Image from "next/image";
import { notFound } from "next/navigation";

async function getMovie(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function MovieDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovie(params.id);

  if (!movie) return notFound();

  return (
    <main className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      <div className="flex justify-center">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={500}
          className="rounded-2xl shadow-lg"
          priority
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
        <p className="text-gray-500 mb-4">
          {movie.release_date} • {movie.runtime} min
        </p>

        {movie.vote_average && (
          <p className="mb-4">
            ⭐{" "}
            <span className="font-semibold">
              {movie.vote_average.toFixed(1)}
            </span>{" "}
            / 10
          </p>
        )}

        <p className="text-lg leading-relaxed text-gray-700 mb-6">
          {movie.overview}
        </p>
        {movie.genres && (
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre: { id: number; name: string }) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
