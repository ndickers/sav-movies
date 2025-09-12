import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }: { movie: any }) {
  return (
    <Link href={`/dashboard/movies/${movie.id}`}>
      <div className="bg-white rounded-2xl w-[250px] h-full shadow-md overflow-hidden hover:scale-105 transition p-2">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={300}
          className="rounded-lg w-full h-auto"
        />
        <h4 className="mt-2 text-base font-semibold">{movie.title}</h4>
        <p className="text-gray-600 text-xs line-clamp-2">{movie.overview}</p>
      </div>
    </Link>
  );
}
