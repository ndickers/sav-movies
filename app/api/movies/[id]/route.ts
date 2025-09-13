import { fetchMovies } from "@/app/lib/tmCacheDB";
import { type NextRequest, NextResponse } from "next/server";


export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const param = await params
        const data = await fetchMovies(`/movie/${param.id}`);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: error || "Failed to fetch movie details" },
            { status: 500 }
        );
    }
}
