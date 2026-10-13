import { Movie } from "../../types/types";
import {
  calculateRoundScore,
  hasPlayableTrivia,
  isCorrectGuess,
  normalizeTitle,
  parseTriviaClues,
} from "../triviaGame";

const movie: Movie = {
  id: "the_godfather_1972",
  title: "The Godfather",
  cast: ["Marlon Brando", "Al Pacino"],
  director: "Francis Ford Coppola",
  year: "1972",
  synopsis: "Crime dynasty.",
  trivia:
    ":What does a producer find in his bed?: A horse head.&:&:What fruit foreshadows danger?: Oranges.",
};

describe("parseTriviaClues", () => {
  it("splits stored trivia into questions and answers", () => {
    expect(parseTriviaClues(movie.trivia)).toEqual([
      { question: "What does a producer find in his bed?", answer: "A horse head." },
      { question: "What fruit foreshadows danger?", answer: "Oranges." },
    ]);
  });

  it("parses the catalog's stored trivia format verbatim", () => {
    const stored =
      ':What object does Gelsomina constantly carry with her, symbolizing her connection to Zampanò and a source of comfort?: A broken trumpet (or a trumpet with a broken reed).&:&:Besides the titular "La Strada" (The Road), what is the alternative English translation of the film\'s title?: The Street.&:&:What kind of performance art is Zampanò known for?: He is a traveling strongman who breaks a chain wrapped around his chest.';
    expect(parseTriviaClues(stored)).toEqual([
      {
        question:
          "What object does Gelsomina constantly carry with her, symbolizing her connection to Zampanò and a source of comfort?",
        answer: "A broken trumpet (or a trumpet with a broken reed).",
      },
      {
        question:
          'Besides the titular "La Strada" (The Road), what is the alternative English translation of the film\'s title?',
        answer: "The Street.",
      },
      {
        question: "What kind of performance art is Zampanò known for?",
        answer:
          "He is a traveling strongman who breaks a chain wrapped around his chest.",
      },
    ]);
  });

  it("strips a leading Question: label", () => {
    expect(parseTriviaClues(":Question: What year is it?: 1972.")).toEqual([
      { question: "What year is it?", answer: "1972." },
    ]);
  });

  it("returns an answerless clue for plain text and [] for empty trivia", () => {
    expect(parseTriviaClues("Filmed in Sicily")).toEqual([
      { question: "Filmed in Sicily", answer: "" },
    ]);
    expect(parseTriviaClues("")).toEqual([]);
    expect(parseTriviaClues(undefined)).toEqual([]);
  });
});

describe("title matching", () => {
  it("normalizes case, punctuation, articles, and trailing years", () => {
    expect(normalizeTitle("  The Godfather (1972) ")).toBe("godfather");
    expect(normalizeTitle("L.A. Confidential")).toBe("l a confidential");
  });

  it("accepts equivalent guesses and rejects different titles", () => {
    expect(isCorrectGuess("godfather", movie)).toBe(true);
    expect(isCorrectGuess("The Godfather 1972", movie)).toBe(true);
    expect(isCorrectGuess("Goodfellas", movie)).toBe(false);
    expect(isCorrectGuess("", movie)).toBe(false);
  });
});

describe("scoring and playability", () => {
  it("deducts for hints and wrong guesses with a floor", () => {
    expect(calculateRoundScore(0, 0)).toBe(100);
    expect(calculateRoundScore(2, 1)).toBe(45);
    expect(calculateRoundScore(2, 10)).toBe(10);
  });

  it("requires at least one trivia clue", () => {
    expect(hasPlayableTrivia(movie)).toBe(true);
    expect(hasPlayableTrivia({ ...movie, trivia: undefined })).toBe(false);
  });
});
