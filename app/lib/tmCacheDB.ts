const BASE_URL = "https://api.themoviedb.org/3";
const cache: Record<string, any> = {};

export async function fetchMovies(endpoint: string) {
    if (cache[endpoint]) {
        console.log("Serving from cache:", endpoint);
        return cache[endpoint];
    }

    const res = await fetch(`${BASE_URL}${endpoint}?api_key=${process.env.TMDB_API_KEY}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Failed to fetch movies");

    const data = await res.json();
    cache[endpoint] = data;
    return data;
}
