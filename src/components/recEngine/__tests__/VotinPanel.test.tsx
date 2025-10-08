import { render, screen, fireEvent } from "@testing-library/react";

import { VotingPanel } from "../VotingPanel";

describe("VotingPanel", () => {
  const sampleMovieIDs = [
    "The_Matrix_1999",
    "Jurassic_Park_1993",
    "Die_Hard_1988",
  ];

  it("renders all movie titles parsed correctly", () => {
    const mockToggle = jest.fn();
    render(<VotingPanel movieIDs={sampleMovieIDs} toggleVote={mockToggle} />);

    expect(screen.getByText("The Matrix (1999)")).toBeInTheDocument();
    expect(screen.getByText("Jurassic Park (1993)")).toBeInTheDocument();
    expect(screen.getByText("Die Hard (1988)")).toBeInTheDocument();
  });

  it("calls toggleVote when a movie is clicked", () => {
    const mockToggle = jest.fn();
    render(<VotingPanel movieIDs={sampleMovieIDs} toggleVote={mockToggle} />);

    const matrix = screen.getByText("The Matrix (1999)");
    fireEvent.click(matrix);

    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith("The_Matrix_1999");
  });

  it("toggles selected class when clicked multiple times", () => {
    const mockToggle = jest.fn();
    render(<VotingPanel movieIDs={sampleMovieIDs} toggleVote={mockToggle} />);

    const matrix = screen.getByText("The Matrix (1999)");

    // First click -> should add "selected"
    fireEvent.click(matrix);
    expect(matrix).toHaveClass("selected");

    // Second click -> should remove "selected"
    fireEvent.click(matrix);
    expect(matrix).not.toHaveClass("selected");
  });

  it("renders 'Unknown Title' for invalid movie IDs", () => {
    const mockToggle = jest.fn();
    render(
      <VotingPanel movieIDs={["", "BadFormatID"]} toggleVote={mockToggle} />
    );

    expect(screen.getByText("Unknown Title")).toBeInTheDocument();
    expect(screen.getByText("BadFormatID")).toBeInTheDocument();
  });

  it("renders nothing if movieIDs is empty", () => {
    const mockToggle = jest.fn();
    render(<VotingPanel movieIDs={[]} toggleVote={mockToggle} />);

    expect(screen.queryAllByRole("heading")).toHaveLength(0);
  });
});
