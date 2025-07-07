import { screen, waitFor } from "@testing-library/react";
import { renderWithRouter } from "../../../test/renderHelpers";
import { MoviePage } from "../movie";

jest.mock("../../utils/utils", () => ({
  fetchMovie: jest.fn().mockResolvedValue({
    id: "m1",
    title: "Fake Movie",
    review: "Great movie!",
    synopsis: "A very exciting movie",
    trivia: ":Q1?: A1&:&:Q2?: A2&:&:Q3?: A3",
  }),
}));

describe("MoviePage", () => {
  it("renders Spinner and then movie details on success", async () => {
    renderWithRouter(<MoviePage />, {
      route: "/movies/m1",
      path: "/movies/:movieID",
    });

    // Initially shows Spinner
    expect(screen.getByText(/loading movie data/i)).toBeInTheDocument();

    // Then waits for content
    await waitFor(() => {
      expect(screen.getByText(/Fake Movie/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/Review:/i)).toBeInTheDocument();
    expect(screen.getByText(/Great movie!/i)).toBeInTheDocument();
    expect(screen.getByText(/Trivia:/i)).toBeInTheDocument();
  });

  it("renders error if fetchMovie fails", async () => {
    const utils = await import("../../utils/utils");
    (utils.fetchMovie as jest.Mock).mockResolvedValueOnce(null);

    renderWithRouter(<MoviePage />, {
      route: "/movies/bad-id",
      path: "/movies/:movieID",
    });

    await waitFor(() => {
      expect(
        screen.getByText(/failed to retrieve movies from cloud/i)
      ).toBeInTheDocument();
    });
  });
});
