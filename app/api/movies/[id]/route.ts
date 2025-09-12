import { fetchMovies } from "@/app/lib/tmCacheDB";
import { NextResponse } from "next/server";


export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const data = await fetchMovies(`/movie/${params.id}`);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch movie details" },
            { status: 500 }
        );
    }
}
