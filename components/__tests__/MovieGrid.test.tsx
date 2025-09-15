import { render, screen } from "@testing-library/react";
import MovieGrid from "../MovieGrid";
import "@testing-library/jest-dom";

jest.mock("../MovieCard", () => {
  return function MockMovieCard({ movie }: { movie: { title: string } }) {
    return <div data-testid="movie-card">{movie.title}</div>;
  };
});

describe("MovieGrid", () => {
  const mockMovies = [
    {
      id: 1,
      poster_path: "/path1.jpg",
      title: "Movie One",
      overview: "Overview 1",
    },
    {
      id: 2,
      poster_path: "/path2.jpg",
      title: "Movie Two",
      overview: "Overview 2",
    },
    {
      id: 3,
      poster_path: "/path3.jpg",
      title: "Movie Three",
      overview: "Overview 3",
    },
  ];

  it("renders one MovieCard per movie", () => {
    render(<MovieGrid movies={mockMovies} />);
    const cards = screen.getAllByTestId("movie-card");
    expect(cards).toHaveLength(mockMovies.length);

    mockMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });
});
