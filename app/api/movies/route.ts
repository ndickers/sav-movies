import { fetchMovies } from "@/app/lib/tmCacheDB";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const data = await fetchMovies("/movie/popular");
        return NextResponse.json(data.results);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
    }
}

