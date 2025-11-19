import { render, screen, fireEvent } from "@testing-library/react";

import { RentalTableHeader } from "../rentalTableHeader";
import { mockMovies } from "../../../../test/test-data";

describe("RentalTableHeader", () => {
  it("renders the Return All Movies button", () => {
    render(<RentalTableHeader rentals={mockMovies} rentalReturn={jest.fn()} />);
    expect(
      screen.getByRole("button", { name: /return all movies/i })
    ).toBeInTheDocument();
  });
  it("calls rentalReturn with all movie IDs", () => {
    const rentalReturn = jest.fn();
    render(
      <RentalTableHeader rentals={mockMovies} rentalReturn={rentalReturn} />
    );
    fireEvent.click(screen.getByRole("button", { name: /return all movies/i }));
    expect(rentalReturn).toHaveBeenCalledWith([
      mockMovies[0].id,
      mockMovies[1].id,
      mockMovies[2].id,
    ]);
  });
  it("disables button when rentals is empty", () => {
    render(<RentalTableHeader rentals={[]} rentalReturn={jest.fn()} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
