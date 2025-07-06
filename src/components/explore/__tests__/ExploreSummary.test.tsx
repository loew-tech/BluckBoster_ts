import { render, screen } from "@testing-library/react";
import { ExploreSummary } from "../ExploreSummary";
import { testMovies } from "../../../../test/test-data";

describe("ExploreSummary", () => {
  it("renders counts and percentages", () => {
    render(
      <ExploreSummary
        starData={["Kevin", "Tom"]}
        starsPercentage={40}
        movieData={testMovies}
        moviesPercentage={10}
        directorData={["Steven Spielberg"]}
        directorPercentage={50}
      />
    );

    expect(screen.getByText(/Stars Explored: 2/)).toBeInTheDocument();
    expect(screen.getByText(/40.00%/)).toBeInTheDocument();
    expect(screen.getByText(/Movies Explored: 2/)).toBeInTheDocument();
    expect(screen.getByText(/10.00%/)).toBeInTheDocument();
    expect(screen.getByText(/Directors Explored: 1/)).toBeInTheDocument();
    expect(screen.getByText(/50.00%/)).toBeInTheDocument();
  });
});
