/* eslint-disable import/first */
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { testMember, testMovies } from "../../../../test/test-data";

// ✅ MOCK useUser BEFORE importing the component
jest.mock("../../../context/UserContext", () => ({
  useUser: () => ({
    user: testMember,
    setUser: jest.fn(),
    logout: jest.fn(),
    getCartLength: () => 1,
    isInCart: (movieID: string) => testMember.cart?.includes(movieID),
  }),
}));

import { MovieTable } from "../movieTable";
import { renderWithNav } from "../../../../test/renderHelpers";

const mockCartUpdate = jest.fn();
const mockUpdateMovies = jest.fn();

describe("MovieTable", () => {
  beforeEach(() => {
    mockCartUpdate.mockClear();
    mockUpdateMovies.mockClear();
  });

  it("renders table header and movie titles", () => {
    renderWithNav(
      <MovieTable
        movies={testMovies}
        updateMovies={mockUpdateMovies}
        returnRental={jest.fn()}
      />
    );
    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(testMovies[0].title)).toBeInTheDocument();
  });

  it("shows Add to Cart buttons when user is present", () => {
    renderWithNav(
      <MovieTable
        movies={testMovies}
        updateMovies={mockUpdateMovies}
        returnRental={jest.fn()}
      />
    );
    expect(screen.getByText(/add to cart/i)).toBeInTheDocument();
    expect(screen.getByText(/remove from cart/i)).toBeInTheDocument();
  });

  it("calls updateMovies when a page is selected", async () => {
    renderWithNav(
      <MovieTable
        movies={testMovies}
        updateMovies={mockUpdateMovies}
        returnRental={jest.fn()}
      />
    );
    await userEvent.click(screen.getByText("B"));
    expect(mockUpdateMovies).toHaveBeenCalledWith("B");
  });

  it("renders clickable title link", () => {
    renderWithNav(
      <MovieTable
        movies={testMovies}
        updateMovies={mockUpdateMovies}
        returnRental={jest.fn()}
      />
    );

    const link = screen.getByRole("link", { name: testMovies[0].title });
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining(testMovies[0].id)
    );
  });
});
