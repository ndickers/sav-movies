import { GET } from "./route";
import { NextRequest } from "next/server";

jest.mock("next/server", () => {
    return {
        NextRequest: class {
            url: string;
            constructor(url: string) {
                this.url = url;
            }
        },
        NextResponse: {
            json: jest.fn((data, init) => ({
                status: init?.status ?? 200,
                json: async () => data,
            })),
        },
    };
});

describe("GET /api/movies", () => {
    const OLD_ENV = process.env;
    const mockFetch = (data: { results: { id: number, title: string }[] }, ok = true) => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok,
                json: () => Promise.resolve(data),
            })
        ) as jest.Mock;
    };

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV, TMDB_API_KEY: "fake-api-key" };
        jest.clearAllMocks();
    });

    afterAll(() => {
        process.env = OLD_ENV;
    });

    it("fetches popular movies when no search param", async () => {
        mockFetch({ results: [{ id: 1, title: "Inception" }] });

        const req = new NextRequest("http://localhost/api/movies");
        const res = await GET(req);

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining("movie/popular?api_key=fake-api-key&page=1")
        );

        const data = await res.json();
        expect(res.status).toBe(200);
        expect(data.results).toHaveLength(1);
        expect(data.results[0].title).toBe("Inception");
    });

    it("fetches search results when search param is present", async () => {
        mockFetch({ results: [{ id: 2, title: "Interstellar" }] });

        const req = new NextRequest("http://localhost/api/movies?search=space&page=2");
        const res = await GET(req);

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining("search/movie?api_key=fake-api-key&query=space&page=2")
        );

        const data = await res.json();
        expect(res.status).toBe(200);
        expect(data.results[0].title).toBe("Interstellar");
    });

    it("returns 500 when TMDB_API_KEY is missing", async () => {
        process.env.TMDB_API_KEY = "";

        const req = new NextRequest("http://localhost/api/movies");
        const res = await GET(req);

        const data = await res.json();
        expect(res.status).toBe(500);
        expect(data.error).toBe("Missing TMDB_API_KEY");
    });

    it("returns 500 when fetch fails", async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error("Network error"))) as jest.Mock;

        const req = new NextRequest("http://localhost/api/movies");
        const res = await GET(req);

        const data = await res.json();
        expect(res.status).toBe(500);
        expect(typeof data.error).toBe("string");
        expect(data.error).toMatch(/Network error|Failed to fetch movies/);

    });
});
