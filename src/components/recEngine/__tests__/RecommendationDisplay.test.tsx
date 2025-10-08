import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RecommendationDisplay } from "../RecommendationDisplay";
import { Recommendation } from "../../../types/types";

// Mock recommendation data
const mockRecommendation: Recommendation = {
  bestPick: "The_Matrix_1999",
  goodPicks: ["Jurassic_Park_1993", "Die_Hard_1988", "Titanic_1997"],
};

describe("RecommendationDisplay", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<RecommendationDisplay recommendation={mockRecommendation} />);
  });

  it("renders the main Bluck-Boster header", () => {
    const header = screen.getByRole("heading", {
      name: /BLUCK-BOSTER PICKS/i,
    });
    expect(header).toBeInTheDocument();
  });

  it("renders the fun tagline", () => {
    expect(screen.getByText(/rewind your vibes/i)).toBeInTheDocument();
  });

  it("displays the Best Pick section and movie title", () => {
    expect(screen.getByText(/Best Pick/i)).toBeInTheDocument();
    // The title parser should transform underscores into spaces + year in parentheses
    expect(screen.getByText("🎬 The Matrix (1999)")).toBeInTheDocument();
  });

  it("renders the Good Picks section", () => {
    expect(screen.getByText(/Good Picks/i)).toBeInTheDocument();
  });

  it("renders all good picks correctly", () => {
    const goodPickTitles = [
      "Jurassic Park (1993)",
      "Die Hard (1988)",
      "Titanic (1997)",
    ];

    goodPickTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("applies expected styling classes", () => {
    const container = screen.getByTestId("rec-display");
    expect(container).toHaveClass("rec-display");
  });
});
