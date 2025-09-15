import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "../Search";
import "@testing-library/jest-dom";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => new URLSearchParams("search=batman"),
}));

jest.mock("lodash.debounce", () => (fn: () => void) => fn);

describe("Search component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input with default search value", () => {
    render(<Search />);
    const input = screen.getByPlaceholderText("Search...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("batman");
  });

  it("calls router.push with updated search param when typing", async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "superman" } });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        expect.stringContaining("search=superman")
      );
    });
  });

  it("removes search param if input is cleared", async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "" } });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dashboard?");
    });
  });
});
