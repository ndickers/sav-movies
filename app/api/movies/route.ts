import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { error: "Missing TMDB_API_KEY" },
            { status: 500 }
        );
    }
    try {
        let tmdbUrl: string;
        if (search && search.trim()) {
            tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
                search
            )}`;
        } else {
            tmdbUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
        }

        const res = await fetch(tmdbUrl);
        if (!res.ok) {
            throw new Error(`TMDb API returned ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json(data.results);
    } catch (error) {
        console.error("Failed to fetch movies:", error);
        return NextResponse.json(
            { error: "Failed to fetch movies" },
            { status: 500 }
        );
    }
}
