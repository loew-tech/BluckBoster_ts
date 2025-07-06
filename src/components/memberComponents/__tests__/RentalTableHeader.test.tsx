import { render, screen, fireEvent } from "@testing-library/react";

import { RentalTableHeader } from "../rentalTableHeader";
import { testMovies } from "../../../../test/test-data";

describe("RentalTableHeader", () => {
  const rentals = testMovies;

  it("renders the Return All Movies button", () => {
    render(<RentalTableHeader rentals={rentals} rentalReturn={jest.fn()} />);
    expect(
      screen.getByRole("button", { name: /return all movies/i })
    ).toBeInTheDocument();
  });

  it("calls rentalReturn with all movie IDs", () => {
    const rentalReturn = jest.fn();
    render(<RentalTableHeader rentals={rentals} rentalReturn={rentalReturn} />);
    fireEvent.click(screen.getByRole("button", { name: /return all movies/i }));
    expect(rentalReturn).toHaveBeenCalledWith([
      testMovies[0].id,
      testMovies[1].id,
    ]);
  });

  it("disables button when rentals is empty", () => {
    render(<RentalTableHeader rentals={[]} rentalReturn={jest.fn()} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
