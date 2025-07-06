import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PagePicker } from "../pagePicker/pagePicker";

describe("PagePicker", () => {
  const mockUpdateMovies = jest.fn();

  beforeEach(() => {
    mockUpdateMovies.mockClear();
  });

  it("renders all default page letters and special symbol", () => {
    render(<PagePicker updateMovies={mockUpdateMovies} />);
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    letters.forEach((letter) => {
      expect(screen.getByText(letter)).toBeInTheDocument();
    });

    expect(screen.getByText("#123?!")).toBeInTheDocument();
  });

  it("highlights the default selected page (A)", () => {
    render(<PagePicker updateMovies={mockUpdateMovies} />);
    const selected = screen.getByText("A");
    expect(selected).toHaveClass("active-page"); // assumes your selected button has this class
  });

  it("calls updateMovies when a new letter is clicked", async () => {
    render(<PagePicker updateMovies={mockUpdateMovies} />);
    const user = userEvent.setup();

    await user.click(screen.getByText("W"));

    expect(mockUpdateMovies).toHaveBeenCalledWith("W");
  });

  it("does NOT call updateMovies when clicking current page again", async () => {
    render(<PagePicker updateMovies={mockUpdateMovies} />);
    const user = userEvent.setup();

    await user.click(screen.getByText("A")); // "A" is default
    expect(mockUpdateMovies).not.toHaveBeenCalled();
  });
});
