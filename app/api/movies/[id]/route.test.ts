import { GET } from "./route";
import { fetchMovies } from "@/app/lib/tmCacheDB";
import { NextResponse } from "next/server";

jest.mock("@/app/lib/tmCacheDB", () => ({
    fetchMovies: jest.fn(),
}));

jest.mock("next/server", () => ({
    NextResponse: {
        json: jest.fn((data, init) => ({ json: data, status: init?.status ?? 200 })),
    },
}));

describe("GET /api/movies/[id]", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("returns movie details when fetchMovies succeeds", async () => {
        (fetchMovies as jest.Mock).mockResolvedValue({
            id: 123,
            title: "Inception",
        });

        const params = Promise.resolve({ id: "123" });
        const req = {} as any;

        const res = await GET(req, { params });
        expect(fetchMovies).toHaveBeenCalledWith("/movie/123");

        expect(NextResponse.json).toHaveBeenCalledWith(
            { id: 123, title: "Inception" },
        );
        expect(res.status).toBe(200);
        expect(res.json).toEqual({ id: 123, title: "Inception" });
    });

    it("returns 500 when fetchMovies throws", async () => {
        (fetchMovies as jest.Mock).mockRejectedValue(new Error("API Error"));

        const params = Promise.resolve({ id: "999" });
        const req = {} as any;

        const res = await GET(req, { params });

        expect(fetchMovies).toHaveBeenCalledWith("/movie/999");
        expect(NextResponse.json).toHaveBeenCalledWith(
            { error: new Error("API Error") },
            { status: 500 }
        );
        expect(res.status).toBe(500);
    });
});