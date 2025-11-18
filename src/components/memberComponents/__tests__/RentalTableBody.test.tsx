import { render, screen, fireEvent } from "@testing-library/react";
import { RentalTableBody } from "../RentaTableBody";
import { mockMovies } from "../../../../test/test-data";

describe("RentalTableBody", () => {
  it("renders movie titles and links", () => {
    render(<RentalTableBody rentals={mockMovies} rentalReturn={jest.fn()} />);
    expect(screen.getByText(mockMovies[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockMovies[1].title)).toBeInTheDocument();
  });

  it("calls rentalReturn on button click", () => {
    const mockReturn = jest.fn();
    render(<RentalTableBody rentals={mockMovies} rentalReturn={mockReturn} />);
    fireEvent.click(screen.getAllByText("Return Movie")[0]);
    expect(mockReturn).toHaveBeenCalledWith([mockMovies[0].id]);
  });
});
