jest.mock("../../components/headerBanner/headerBanner", () => ({
  HeaderBanner: () => <div>Mock Header</div>,
}));

jest.mock("../../utils/utils", () => ({
  fetchMovies: jest.fn(),
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TriviaGamePage } from "../triviaGame";
import { fetchMovies } from "../../utils/utils";
import { Movie } from "../../types/types";

const casablanca: Movie = {
  id: "casablanca_1942",
  title: "Casablanca",
  cast: ["Humphrey Bogart", "Ingrid Bergman"],
  director: "Michael Curtiz",
  year: "1942",
  synopsis: "Rick's cafe.",
  trivia:
    ":Which song does Sam play again?: As Time Goes By.&:&:What was the working title?: Everyone Comes to Rick's.",
};

const pulpFiction: Movie = {
  id: "pulp_fiction_1994",
  title: "Pulp Fiction",
  cast: ["John Travolta", "Uma Thurman"],
  director: "Quentin Tarantino",
  year: "1994",
  synopsis: "Intertwined crime tales.",
  trivia: ":What contest do Vincent and Mia enter?: A twist contest.",
};

const mockFetch = fetchMovies as jest.Mock;

describe("TriviaGamePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows trivia questions with their answers, but hides hints until revealed", async () => {
    mockFetch.mockResolvedValue([casablanca]);
    render(<TriviaGamePage />);

    expect(await screen.findByText("Which song does Sam play again?")).toBeInTheDocument();
    expect(screen.getByText(/Answer: As Time Goes By/)).toBeInTheDocument();
    expect(
      screen.getByText(/Answer: Everyone Comes to Rick's/)
    ).toBeInTheDocument();
    expect(screen.queryByText(/Humphrey Bogart/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Michael Curtiz/)).not.toBeInTheDocument();
    expect(screen.getByText("Round 1 of 1")).toBeInTheDocument();
    expect(screen.getByText("Attempts left: 3")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /Reveal Starring performers/i }));
    expect(screen.getByText(/Humphrey Bogart, Ingrid Bergman/)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /Reveal Director/i }));
    expect(screen.getByText(/Michael Curtiz/)).toBeInTheDocument();
  });

  it("awards reduced points for a correct guess after using both hints", async () => {
    mockFetch.mockResolvedValue([casablanca]);
    render(<TriviaGamePage />);
    await screen.findByText("Which song does Sam play again?");

    await userEvent.click(screen.getByRole("button", { name: /Reveal Starring performers/i }));
    await userEvent.click(screen.getByRole("button", { name: /Reveal Director/i }));
    await userEvent.type(screen.getByLabelText(/Your guess/i), "casablanca (1942)");
    await userEvent.click(screen.getByRole("button", { name: /Submit Guess/i }));

    expect(await screen.findByText(/Correct! You earned 60 points/)).toBeInTheDocument();
    expect(screen.getByText("Score: 60")).toBeInTheDocument();
    expect(screen.getByText(/The movie was Casablanca \(1942\)/)).toBeInTheDocument();
    expect(screen.getByText(/Answer: As Time Goes By/)).toBeInTheDocument();
  });

  it("counts down attempts and reveals the answer after three wrong guesses", async () => {
    mockFetch.mockResolvedValue([casablanca]);
    render(<TriviaGamePage />);
    await screen.findByText("Which song does Sam play again?");

    const input = screen.getByLabelText(/Your guess/i);
    for (const wrong of ["Jaws", "Psycho", "Vertigo"]) {
      await userEvent.type(input, wrong);
      await userEvent.click(screen.getByRole("button", { name: /Submit Guess/i }));
    }

    expect(await screen.findByText(/Out of attempts/)).toBeInTheDocument();
    expect(screen.getByText(/The movie was Casablanca \(1942\)/)).toBeInTheDocument();
    expect(screen.getByText("Score: 0")).toBeInTheDocument();
  });

  it("reveals the answer when the player gives up", async () => {
    mockFetch.mockResolvedValue([casablanca]);
    render(<TriviaGamePage />);
    await screen.findByText("Which song does Sam play again?");

    await userEvent.click(screen.getByRole("button", { name: /Give Up/i }));

    expect(await screen.findByText(/You gave up/)).toBeInTheDocument();
    expect(screen.getByText(/The movie was Casablanca \(1942\)/)).toBeInTheDocument();
  });

  it("advances to the next round after a correct guess", async () => {
    mockFetch.mockResolvedValue([casablanca, pulpFiction]);
    render(<TriviaGamePage />);
    await screen.findByText(/Round 1 of 2/);

    await userEvent.click(screen.getByRole("button", { name: /Reveal Director/i }));
    const title = screen.queryByText(/Michael Curtiz/) ? "Casablanca" : "Pulp Fiction";
    await userEvent.type(screen.getByLabelText(/Your guess/i), title);
    await userEvent.click(screen.getByRole("button", { name: /Submit Guess/i }));
    await userEvent.click(await screen.findByRole("button", { name: /Next Movie/i }));

    expect(await screen.findByText(/Round 2 of 2/)).toBeInTheDocument();
    expect(screen.getByText("Attempts left: 3")).toBeInTheDocument();
  });

  it("falls back to bundled movies when the library returns no trivia movies", async () => {
    mockFetch.mockResolvedValue([]);
    render(<TriviaGamePage />);

    expect(
      await screen.findByText(/using a bundled set of trivia movies/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Your guess/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reveal Director/i })).toBeInTheDocument();
  });
});
