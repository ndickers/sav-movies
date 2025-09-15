// app/movies/[id]/loading.tsx
export default function Loading() {
  return (
    <main className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8 animate-pulse">
      {/* Left column (poster placeholder) */}
      <div className="flex justify-center">
        <div className="bg-gray-300 rounded-2xl shadow-lg w-[300px] h-[500px]" />
      </div>

      {/* Right column (details placeholder) */}
      <div>
        {/* Title */}
        <div className="h-8 bg-gray-300 rounded w-2/3 mb-3"></div>

        {/* Release date & runtime */}
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>

        {/* Rating */}
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>

        {/* Overview text */}
        <div className="space-y-3 mb-6">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className="px-6 py-2 bg-gray-200 rounded-full h-6 w-20"
            ></span>
          ))}
        </div>
      </div>
    </main>
  );
}
