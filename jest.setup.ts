import '@testing-library/jest-dom';
jest.mock("next/server", () => {
    return {
        NextRequest: class {
            url: string;
            constructor(url: string) {
                this.url = url;
            }
        },
        NextResponse: {
            json: jest.fn((data, init) => {
                return {
                    status: init?.status ?? 200,
                    json: async () => data, // ✅ simulate real Response.json()
                };
            }),
        },
    };
});





