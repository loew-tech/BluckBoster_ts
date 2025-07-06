import { render, screen, fireEvent } from "@testing-library/react";
import { RentalTableBody } from "../RentaTableBody";
import { testMovies } from "../../../../test/test-data";

const mockRentals = testMovies;

describe("RentalTableBody", () => {
  it("renders movie titles and links", () => {
    render(<RentalTableBody rentals={mockRentals} rentalReturn={jest.fn()} />);
    expect(screen.getByText(testMovies[0].title)).toBeInTheDocument();
    expect(screen.getByText(testMovies[1].title)).toBeInTheDocument();
  });

  it("calls rentalReturn on button click", () => {
    const mockReturn = jest.fn();
    render(<RentalTableBody rentals={mockRentals} rentalReturn={mockReturn} />);
    fireEvent.click(screen.getAllByText("Return Movie")[0]);
    expect(mockReturn).toHaveBeenCalledWith([testMovies[0].id]);
  });
});
