import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    transform: {
        "^.+\\.(ts|tsx)$": [
            "ts-jest",
            {
                tsconfig: "tsconfig.jest.json",
            },
        ],
    },
    transformIgnorePatterns: [
        "/node_modules/(?!(next|@next|@mui)/)",
    ],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1"
    },
};

export default config;
