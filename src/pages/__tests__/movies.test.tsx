/* eslint-disable import/first */

// ✅ Mock react-router-dom for movieID param
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    movieID: "test_movie_id",
  }),
}));

// ✅ Mock fetchMovie
const mockMovie = {
  id: "test_movie_id",
  title: "Test Movie",
  review: "Great movie!",
  synopsis: "This is a synopsis.",
  trivia: "Interesting trivia.",
};

jest.mock("../../utils/utils", () => ({
  fetchMovie: jest.fn(),
}));

// ✅ Mock subcomponents to focus on logic
jest.mock("../../components/headerBanner/headerBanner", () => ({
  HeaderBanner: () => <div>Mock Header</div>,
}));

jest.mock("../../components/movieComponents/movieElementRow", () => ({
  MovieElementRow: ({ sectionTitle }: any) => (
    <div>{`Section: ${sectionTitle}`}</div>
  ),
}));

jest.mock("../../components/movieComponents/triviaContainer", () => ({
  TriviaContainer: ({ trivia }: any) => <div>{`Trivia: ${trivia}`}</div>,
}));

// ✅ Imports after mocks
import { render, screen, waitFor } from "@testing-library/react";
import { MoviePage } from "../movie";
import { fetchMovie } from "../../utils/utils";

describe("MoviePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders loading spinner initially", () => {
    render(<MoviePage />);
    expect(screen.getByText(/loading movie data/i)).toBeInTheDocument();
  });
  it("renders movie details on successful fetch", async () => {
    (fetchMovie as jest.Mock).mockResolvedValueOnce(mockMovie);
    render(<MoviePage />);

    await waitFor(() => {
      expect(screen.getByText("Test Movie")).toBeInTheDocument();
    });

    expect(screen.getByText(/Section: Review/i)).toBeInTheDocument();
    expect(screen.getByText(/Section: Synopsis/i)).toBeInTheDocument();
    expect(screen.getByText(/Trivia:/i)).toBeInTheDocument();
  });
  it("shows error if movieID is missing", async () => {
    // Re-mock useParams with undefined movieID
    jest.doMock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useParams: () => ({ movieID: undefined }),
    }));

    const { MoviePage } = await import("../movie");
    render(<MoviePage />);

    await waitFor(() => {
      expect(
        screen.getByText(/failed to retrieve movies/i)
      ).toBeInTheDocument();
    });
  });
  it("shows error if fetchMovie returns null", async () => {
    (fetchMovie as jest.Mock).mockResolvedValueOnce(null);
    render(<MoviePage />);

    await waitFor(() => {
      expect(
        screen.getByText(/failed to retrieve movies/i)
      ).toBeInTheDocument();
    });
  });
});
