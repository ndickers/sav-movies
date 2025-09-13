import Navbar from "../../components/Navbar";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";

export default async function Loading() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <div>
        <h1 className="text-3xl font-bold mb-6">🎬 Recommended Movies</h1>
        <Navbar />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center items-stretch lg:justify-items-start">
        {Array.from({ length: 8 }).map((_, idx) => (
          <MovieCardSkeleton key={idx} />
        ))}
      </div>
    </main>
  );
}
