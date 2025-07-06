import { render, screen } from "@testing-library/react";
import { CheckoutTable } from "../CheckoutTable";
import { Movie } from "../../../types/types";
import { testMovies } from "../../../../test/test-data";

describe("CheckoutTable", () => {
  const mockMovies: Movie[] = testMovies;

  const mockCartRemove = jest.fn();

  it("renders a row for each movie", () => {
    render(<CheckoutTable movies={mockMovies} cartRemove={mockCartRemove} />);

    // There should be two movie titles rendered
    expect(screen.getByText(testMovies[0].title)).toBeInTheDocument();
    expect(screen.getByText(testMovies[1].title)).toBeInTheDocument();
  });

  it("displays 'Remove From Cart' button for in-stock items", () => {
    render(<CheckoutTable movies={mockMovies} cartRemove={mockCartRemove} />);

    const removeButtons = screen.getAllByRole("button", {
      name: /Remove From Cart/i,
    });
    expect(removeButtons).toHaveLength(1);
  });

  it("disables button if movie is out of stock", () => {
    const outOfStockMovie = mockMovies[1];
    render(
      <CheckoutTable movies={[outOfStockMovie]} cartRemove={mockCartRemove} />
    );
    const outOfStockButton = screen.getByRole("button");
    expect(outOfStockButton).toBeDisabled();
  });
});
