import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const page = searchParams.get("page") ?? "1";
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
            )}&page=${page}`;
        } else {
            tmdbUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;
        }

        const res = await fetch(tmdbUrl);
        if (!res.ok) {
            throw new Error(`TMDb API returned ${res.status}`);
        }

        const data = await res.json();

        return NextResponse.json(data);
    } catch (error) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : typeof error === "string"
                    ? error
                    : typeof error === "object" && error !== null
                        ? JSON.stringify(error)
                        : "Failed to fetch movies";

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
}

}