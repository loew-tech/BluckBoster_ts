import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";

import { MovieTable } from "../movieTable";
import { testCart, testMember, testMovies } from "../../../../test/test-data";
import { renderWithNav } from "../../../../test/renderHelpers";

const cartUpdateSpy = jest.fn();
const updateMoviesSpy = jest.fn();

describe("movie table", () => {
  it("should render when user is null", async () => {
    renderWithNav(
      <MovieTable
        user={null}
        movies={testMovies}
        cart={testCart}
        cartUpdate={cartUpdateSpy}
        updateMovies={updateMoviesSpy}
      />
    );
    expect(screen.getByText("Title")).toBeTruthy();
    expect(screen.getAllByText("Director:")).toHaveLength(2);
    expect(screen.queryByText("Add to cart")).toBeFalsy();
  });
  it("should render cart when user is not null", () => {
    renderWithNav(
      <MovieTable
        user={testMember}
        movies={testMovies}
        cart={testCart}
        cartUpdate={cartUpdateSpy}
        updateMovies={updateMoviesSpy}
      />
    );
    expect(screen.getByText(/Cart:/)).toBeTruthy();
    expect(screen.getByText("Add to cart")).toBeTruthy();
    expect(screen.getByText("Remove from cart")).toBeTruthy();
  });
  it("calls updateCart when button is clicked", async () => {
    renderWithNav(
      <MovieTable
        user={testMember}
        movies={testMovies}
        cart={testCart}
        cartUpdate={cartUpdateSpy}
        updateMovies={updateMoviesSpy}
      />
    );
    await userEvent.click(screen.getByText("Add to cart"));
    await waitFor(() => {
      expect(cartUpdateSpy).toHaveBeenCalled();
    });
    await userEvent.click(screen.getByText("Remove from cart"));
    await waitFor(() => {
      expect(cartUpdateSpy).toHaveBeenCalled();
    });
  });
  // @TODO: implement test
  //   it("navigates when cart button is clicked", () => {})
});
