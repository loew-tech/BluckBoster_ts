import { render, screen, fireEvent } from "@testing-library/react";
import { CheckoutTableRow } from "../CheckoutTableRow";
import { Movie } from "../../../types/types";
import { testMovies } from "../../../../test/test-data";

describe("CheckoutTableRow", () => {
  const dummyMovie: Movie = testMovies[0];

  const mockCartRemove = jest.fn();

  beforeEach(() => {
    mockCartRemove.mockClear();
  });

  it("renders the movie title", () => {
    render(<CheckoutTableRow movie={dummyMovie} cartRemove={mockCartRemove} />);
    expect(screen.getByText(dummyMovie.title)).toBeInTheDocument();
  });

  it("calls cartRemove when button clicked", () => {
    render(<CheckoutTableRow movie={dummyMovie} cartRemove={mockCartRemove} />);
    const removeButton = screen.getByRole("button", {
      name: /remove from cart/i,
    });
    fireEvent.click(removeButton);
    expect(mockCartRemove).toHaveBeenCalledWith(dummyMovie.id);
  });

  it("disables button if movie is out of stock", () => {
    const outOfStockMovie = { ...dummyMovie, inventory: 0 };
    render(
      <CheckoutTableRow movie={outOfStockMovie} cartRemove={mockCartRemove} />
    );
    const outOfStockButton = screen.getByRole("button");
    expect(outOfStockButton).toBeDisabled();
  });
});
