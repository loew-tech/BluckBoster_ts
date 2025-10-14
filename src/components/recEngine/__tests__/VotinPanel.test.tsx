import { render, screen, fireEvent } from "@testing-library/react";

import { VotingPanel } from "../VotingPanel";

describe("VotingPanel", () => {
  const sampleMovieIDs = [
    "The_Matrix_1999",
    "Jurassic_Park_1993",
    "Die_Hard_1988",
  ];

  const sampleVotedIDs = new Set<string>(["Jurassic_Park_1993"]);

  it("renders all movie titles parsed correctly", () => {
    const mockToggle = jest.fn();
    render(
      <VotingPanel
        movieIDs={sampleMovieIDs}
        toggleVote={mockToggle}
        votedMovieIDs={sampleVotedIDs}
      />
    );
    expect(screen.getByText("The Matrix (1999)")).toBeInTheDocument();
    expect(screen.getByText("Jurassic Park (1993)")).toBeInTheDocument();
    expect(screen.getByText("Die Hard (1988)")).toBeInTheDocument();
  });

  it("calls toggleVote when a movie is clicked", () => {
    const mockToggle = jest.fn();
    render(
      <VotingPanel
        movieIDs={sampleMovieIDs}
        toggleVote={mockToggle}
        votedMovieIDs={sampleVotedIDs}
      />
    );

    const matrix = screen.getByText("The Matrix (1999)");
    fireEvent.click(matrix);

    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith("The_Matrix_1999");
  });

  it("renders 'Unknown Title' for invalid movie IDs", () => {
    const mockToggle = jest.fn();
    render(
      <VotingPanel
        movieIDs={["", "BadFormatID"]}
        toggleVote={mockToggle}
        votedMovieIDs={new Set()}
      />
    );

    expect(screen.getByText("Unknown Title")).toBeInTheDocument();
    expect(screen.getByText("BadFormatID")).toBeInTheDocument();
  });

  it("renders nothing if movieIDs is empty", () => {
    const mockToggle = jest.fn();
    render(
      <VotingPanel
        movieIDs={[]}
        toggleVote={mockToggle}
        votedMovieIDs={new Set()}
      />
    );

    expect(screen.queryAllByRole("heading")).toHaveLength(0);
  });
});
