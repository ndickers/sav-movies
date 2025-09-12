import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-6 max-w-md">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </main>
  );
}
