import { render, screen } from "@testing-library/react";
import MovieCardSkeleton from "../MovieCardSkeleton";
import "@testing-library/jest-dom";

describe("MovieCardSkeleton", () => {
  it("renders a container with correct classes", () => {
    render(<MovieCardSkeleton />);

    const wrapper = screen.getByTestId("movie-card-skeleton-wrapper");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass("w-[250px]");
    expect(wrapper).toHaveClass("rounded-2xl");
  });

  it("renders three skeleton elements", () => {
    render(<MovieCardSkeleton />);
    // Just ensure we have 3 skeletons (no need to check their internals)
    const skeletons = screen.getAllByTestId("movie-card-skeleton-item");
    expect(skeletons).toHaveLength(3);
  });
});
