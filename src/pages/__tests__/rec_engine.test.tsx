import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RecEnginePage } from "../rec_engine";
import {
  getVotingInitialSlate,
  iterateVote,
  getFinalRecommendations,
} from "../../utils/utils";

// Mock child components so we don’t depend on their inner logic
jest.mock("../../components/headerBanner/headerBanner", () => ({
  HeaderBanner: () => <div data-testid="header-banner">HeaderBanner</div>,
}));
jest.mock("../../components/recEngine/VotingPanel", () => ({
  VotingPanel: ({ movieIDs, toggleVote }: any) => (
    <div data-testid="voting-panel">
      {movieIDs.map((id: string) => (
        <div key={id} onClick={() => toggleVote(id)}>
          Movie: {id}
        </div>
      ))}
    </div>
  ),
}));
jest.mock("../../components/common/errorMessage", () => ({
  ErrorMessage: ({ msg }: any) => <div data-testid="error-msg">{msg}</div>,
}));
jest.mock("../../components/recEngine/RecommendationDisplay", () => ({
  RecommendationDisplay: ({ recommendation }: any) => (
    <div data-testid="recommendation-display">
      Best: {recommendation.bestPick}, Goods:{" "}
      {recommendation.goodPicks.join(", ")}
    </div>
  ),
}));

// Mock the async util functions
jest.mock("../../utils/utils", () => ({
  getVotingInitialSlate: jest.fn(),
  iterateVote: jest.fn(),
  getFinalRecommendations: jest.fn(),
}));

describe("RecEnginePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders HeaderBanner and VotingPanel after successful initial fetch", async () => {
    (getVotingInitialSlate as jest.Mock).mockResolvedValue({
      movies: ["Matrix_1999", "Titanic_1997"],
    });

    render(<RecEnginePage />);

    expect(screen.getByTestId("header-banner")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("voting-panel")).toBeInTheDocument();
    });
    expect(screen.getByText("VOTE")).toBeInTheDocument();
  });

  it("shows ErrorMessage if getVotingInitialSlate returns null", async () => {
    (getVotingInitialSlate as jest.Mock).mockResolvedValue(null);

    render(<RecEnginePage />);

    await waitFor(() => {
      expect(screen.getByTestId("error-msg")).toHaveTextContent(
        "Error in recommendation engine"
      );
    });
  });

  it("calls iterateVote and updates state on vote click", async () => {
    (getVotingInitialSlate as jest.Mock).mockResolvedValue({
      movies: ["Matrix_1999", "Titanic_1997"],
    });
    (iterateVote as jest.Mock).mockResolvedValue({
      movies: ["JurassicPark_1993"],
      newMood: { id: 1, acting: 1, action: 1 },
    });

    render(<RecEnginePage />);

    await screen.findByTestId("voting-panel");

    const movie = screen.getByText("Movie: Matrix_1999");
    fireEvent.click(movie);

    const voteBtn = screen.getByText("VOTE");
    fireEvent.click(voteBtn);

    await waitFor(() => {
      expect(iterateVote).toHaveBeenCalled();
    });
  });

  it("displays RecommendationDisplay after 5 iterations", async () => {
    (getVotingInitialSlate as jest.Mock).mockResolvedValue({
      movies: ["Matrix_1999"],
    });
    (getFinalRecommendations as jest.Mock).mockResolvedValue({
      bestPick: "Matrix_1999",
      goodPicks: ["Titanic_1997", "JurassicPark_1993"],
    });

    render(<RecEnginePage />);

    await screen.findByTestId("voting-panel");

    // simulate reaching 5th iteration
    for (let i = 1; i < 5; i++) {
      const voteButton = screen.getByText("VOTE");
      fireEvent.click(voteButton);
    }

    // now button label should change
    const pickButton = screen.getByText("PICK MOVIES");
    fireEvent.click(pickButton);

    await waitFor(() => {
      expect(screen.getByTestId("recommendation-display")).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText(/Best:/)).toHaveTextContent("Matrix_1999");
    });
  });

  it("shows error message if getFinalRecommendations returns null", async () => {
    (getVotingInitialSlate as jest.Mock).mockResolvedValue({
      movies: ["Matrix_1999"],
    });
    (getFinalRecommendations as jest.Mock).mockResolvedValue(null);

    render(<RecEnginePage />);

    await screen.findByTestId("voting-panel");

    // simulate reaching last iteration
    for (let i = 1; i < 5; i++) {
      fireEvent.click(screen.getByText("VOTE"));
    }

    fireEvent.click(screen.getByText("PICK MOVIES"));

    await waitFor(() => {
      expect(screen.getByTestId("error-msg")).toBeInTheDocument();
    });
  });
});
