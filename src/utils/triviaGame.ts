import { Movie } from "../types/types";

export type TriviaClue = {
  question: string;
  answer: string;
};

/**
 * Parses the trivia string stored on a Movie into question/answer clues.
 * Stored format: "&:&" delineates each question/answer pair, the question
 * ends in "?:", and the answer follows that string, e.g.
 * ":What ... comfort?: A broken trumpet.&:&:What ... known for?: He is ...".
 * A leading ":" (and an occasional "Question:" label) precedes each question.
 * Tolerates plain-text trivia by returning it as a single answerless clue.
 */
export const parseTriviaClues = (trivia?: string): TriviaClue[] => {
  if (!trivia || trivia.trim() === "") {
    return [];
  }
  return trivia
    .split("&:&")
    .map((segment) => {
      let text = segment.trim().replace(/^:+/, "").trim();
      text = text.replace(/^question\s*:/i, "").trim();
      if (!text) {
        return null;
      }
      // Canonical split: the question ends in "?:", the answer follows it.
      const qaSplit = text.indexOf("?:");
      if (qaSplit >= 0) {
        return {
          question: text.slice(0, qaSplit + 1).trim(),
          answer: text.slice(qaSplit + 2).trim(),
        };
      }
      const questionEnd = text.indexOf("?");
      if (questionEnd >= 0) {
        const question = text.slice(0, questionEnd + 1).trim();
        const answer = text
          .slice(questionEnd + 1)
          .replace(/^[:\s]+/, "")
          .trim();
        return { question, answer };
      }
      const colon = text.indexOf(":");
      if (colon > 0) {
        return {
          question: text.slice(0, colon).trim(),
          answer: text.slice(colon + 1).trim(),
        };
      }
      return { question: text, answer: "" };
    })
    .filter((clue): clue is TriviaClue => clue !== null && clue.question !== "");
};

/** Lowercases, strips punctuation/articles and a trailing year. */
export const normalizeTitle = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/\((?:19|20)\d{2}\)/g, " ")
    .replace(/\b(19|20)\d{2}\b\s*$/g, " ")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^(the|a|an)\s+/, "");
};

export const isCorrectGuess = (guess: string, movie: Movie): boolean => {
  const normalizedGuess = normalizeTitle(guess);
  if (!normalizedGuess) {
    return false;
  }
  if (normalizedGuess === normalizeTitle(movie.title)) {
    return true;
  }
  // Accept the title as derived from the id, e.g. "seven_samurai_1954".
  const idTitle = movie.id
    ? movie.id.replace(/_(?:19|20)\d{2}$/, "").replace(/_/g, " ")
    : "";
  return idTitle !== "" && normalizedGuess === normalizeTitle(idTitle);
};

export const BASE_ROUND_SCORE = 100;
export const HINT_COST = 20;
export const WRONG_GUESS_COST = 15;
export const MIN_ROUND_SCORE = 10;

export const calculateRoundScore = (
  hintsUsed: number,
  wrongGuesses: number
): number => {
  const raw =
    BASE_ROUND_SCORE - hintsUsed * HINT_COST - wrongGuesses * WRONG_GUESS_COST;
  return Math.max(MIN_ROUND_SCORE, raw);
};

export const hasPlayableTrivia = (movie: Movie): boolean =>
  parseTriviaClues(movie.trivia).length > 0;

export const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};
