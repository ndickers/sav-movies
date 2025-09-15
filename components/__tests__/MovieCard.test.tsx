import React from "react";
import { render, screen } from "@testing-library/react";
import MovieCard from "../MovieCard";
import "@testing-library/jest-dom";

jest.mock("next/link", () => {
  return ({ href, children }: { href: string; children: React.ReactNode }) =>
    React.createElement("a", { href }, children);
});

jest.mock("next/image", () => {
  return function Image({ src, alt }: { src: string; alt: string }) {
    return React.createElement("img", { src, alt });
  };
});

describe("MovieCard", () => {
  const mockMovie = {
    id: 123,
    poster_path: "/test-poster.jpg",
    title: "Inception",
    overview: "A thief who steals corporate secrets through dream-sharing.",
  };

  it("renders the movie title, overview, and poster", () => {
    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(
      screen.getByText(/A thief who steals corporate secrets/i)
    ).toBeInTheDocument();

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(mockMovie.poster_path)
    );
    expect(image).toHaveAttribute("alt", "Inception");
  });

  it("links to the correct movie details page", () => {
    render(<MovieCard movie={mockMovie} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/dashboard/movies/${mockMovie.id}`);
  });
});
