import { FormEvent, useCallback, useEffect, useState } from "react";
import { Container, Header } from "semantic-ui-react";

import { HeaderBanner } from "../components/headerBanner/headerBanner";
import { ErrorMessage } from "../components/common/errorMessage";
import { Spinner } from "../components/common/Spinner";
import { TriviaHint } from "../components/triviaGame/TriviaHint";
import { fallbackTriviaMovies } from "../data/triviaGameMovies";
import { Movie } from "../types/types";
import { fetchMovies } from "../utils/utils";
import {
  calculateRoundScore,
  hasPlayableTrivia,
  HINT_COST,
  isCorrectGuess,
  parseTriviaClues,
  shuffle,
} from "../utils/triviaGame";

import "./triviaGame.css";

export const MAX_ATTEMPTS = 3;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type RoundStatus = "playing" | "correct" | "revealed";

const loadPool = async (): Promise<{
  pool: Movie[];
  fromFallback: boolean;
}> => {
  const collected = new Map<string, Movie>();
  try {
    for (const letter of shuffle(LETTERS)) {
      const movies = (await fetchMovies(letter)) ?? [];
      for (const movie of movies) {
        if (movie && movie.id && hasPlayableTrivia(movie)) {
          collected.set(movie.id, movie);
        }
      }
      if (collected.size >= 8) {
        break;
      }
    }
  } catch {
    // Fall through to the bundled pool below.
  }
  // @TODO: should this use truthy?
  if (collected.size > 0) {
    return {
      pool: shuffle(Array.from(collected.values())),
      fromFallback: false,
    };
  }
  return { pool: shuffle(fallbackTriviaMovies), fromFallback: true };
};

export const TriviaGamePage = () => {
  const [pool, setPool] = useState<Movie[]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const [guess, setGuess] = useState("");
  const [status, setStatus] = useState<RoundStatus>("playing");
  const [feedback, setFeedback] = useState("");
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [guessedTitles, setGuessedTitles] = useState<string[]>([]);
  const [showCast, setShowCast] = useState(false);
  const [showDirector, setShowDirector] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [finished, setFinished] = useState(false);

  const resetRound = () => {
    setGuess("");
    setStatus("playing");
    setFeedback("");
    setWrongGuesses(0);
    setGuessedTitles([]);
    setShowCast(false);
    setShowDirector(false);
  };

  const startGame = useCallback(async () => {
    setIsLoading(true);
    setLoadError(false);
    try {
      const { pool: nextPool, fromFallback } = await loadPool();
      if (nextPool.length === 0) {
        setLoadError(true);
        return;
      }
      setPool(nextPool);
      setUsingFallback(fromFallback);
      setRoundIndex(0);
      setScore(0);
      setStreak(0);
      setBestStreak(0);
      setFinished(false);
      resetRound();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    startGame();
  }, [startGame]);

  const movie = pool[roundIndex] ?? null;
  const clues = movie ? parseTriviaClues(movie.trivia) : [];
  const hintsUsed = (showCast ? 1 : 0) + (showDirector ? 1 : 0);
  const attemptsLeft = MAX_ATTEMPTS - wrongGuesses;
  const roundOver = status !== "playing";

  const submitGuess = (event: FormEvent) => {
    event.preventDefault();
    if (!movie || roundOver || guess.trim() === "") {
      return;
    }
    if (isCorrectGuess(guess, movie)) {
      const points = calculateRoundScore(hintsUsed, wrongGuesses);
      setScore((prev) => prev + points);
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setBestStreak((best) => Math.max(best, nextStreak));
      setStatus("correct");
      setFeedback(`Correct! You earned ${points} points.`);
      return;
    }
    const nextWrong = wrongGuesses + 1;
    setWrongGuesses(nextWrong);
    setGuessedTitles((prev) => [...prev, guess.trim()]);
    setGuess("");
    if (nextWrong >= MAX_ATTEMPTS) {
      setStatus("revealed");
      setStreak(0);
      setFeedback("Out of attempts — here is the answer.");
    } else {
      setFeedback(
        `Not quite. ${MAX_ATTEMPTS - nextWrong} attempt${
          MAX_ATTEMPTS - nextWrong === 1 ? "" : "s"
        } left.`,
      );
    }
  };

  const giveUp = () => {
    setStatus("revealed");
    setStreak(0);
    setFeedback("You gave up — here is the answer.");
  };

  const nextMovie = () => {
    if (roundIndex + 1 >= pool.length) {
      setFinished(true);
      return;
    }
    setRoundIndex((prev) => prev + 1);
    resetRound();
  };

  if (isLoading) {
    return (
      <>
        <HeaderBanner />
        <Spinner message="Loading trivia..." />
      </>
    );
  }

  if (loadError || !movie) {
    return (
      <>
        <HeaderBanner />
        <ErrorMessage msg="Failed to load trivia movies. Please try again later." />
      </>
    );
  }

  if (finished) {
    return (
      <>
        <HeaderBanner />
        <Container text className="trivia-game-container">
          <Header as="h2" className="title-field">
            Game Over
          </Header>
          <p className="trivia-game-final">
            Final score: {score} points. Best streak: {bestStreak}.
          </p>
          <button type="button" onClick={startGame}>
            Play Again
          </button>
        </Container>
      </>
    );
  }

  return (
    <>
      <HeaderBanner />
      <Container text className="trivia-game-container">
        <Header as="h2" className="title-field">
          Guess the Movie
        </Header>
        <p className="trivia-game-intro">
          Read the trivia, then name the movie. Reveal the starring performers
          or the director for help — each hint costs {HINT_COST} points.
        </p>
        {usingFallback && (
          <p className="trivia-game-fallback-note">
            The movie library is unavailable, so this game is using a bundled
            set of trivia movies.
          </p>
        )}

        <div className="trivia-game-scoreboard">
          <span>
            Round {roundIndex + 1} of {pool.length}
          </span>
          <span>Score: {score}</span>
          <span>Streak: {streak}</span>
          <span>Attempts left: {attemptsLeft}</span>
        </div>

        <section aria-label="Movie trivia">
          <h3 className="trivia-game-section">Trivia</h3>
          <ol className="trivia-game-clues">
            {clues.map((clue, index) => (
              <li key={index}>
                <p>{clue.question}</p>
                {clue.answer && (
                  <p className="trivia-game-clue-answer">
                    Answer: {clue.answer}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section aria-label="Hints" className="trivia-game-hints">
          <h3 className="trivia-game-section">Need a hint?</h3>
          <TriviaHint
            label="Starring performers"
            cost={HINT_COST}
            revealed={showCast}
            onReveal={() => setShowCast(true)}
          >
            {movie.cast && movie.cast.length > 0
              ? movie.cast.join(", ")
              : "Not listed"}
          </TriviaHint>
          <TriviaHint
            label="Director"
            cost={HINT_COST}
            revealed={showDirector}
            onReveal={() => setShowDirector(true)}
          >
            {movie.director || "Not listed"}
          </TriviaHint>
        </section>

        {roundOver ? (
          <div className="trivia-game-result" role="status">
            <p>{feedback}</p>
            <p className="trivia-game-answer">
              The movie was {movie.title} ({movie.year})
            </p>
            <button type="button" onClick={nextMovie}>
              Next Movie
            </button>
          </div>
        ) : (
          <form className="trivia-game-form" onSubmit={submitGuess}>
            <label htmlFor="movie-guess">Your guess</label>
            <input
              id="movie-guess"
              type="text"
              value={guess}
              onChange={(event) => setGuess(event.target.value)}
              placeholder="Type the movie title"
              autoComplete="off"
            />
            <div className="trivia-game-actions">
              <button type="submit" disabled={guess.trim() === ""}>
                Submit Guess
              </button>
              <button type="button" onClick={giveUp}>
                Give Up
              </button>
            </div>
            {feedback && (
              <p className="trivia-game-feedback" role="status">
                {feedback}
              </p>
            )}
            {guessedTitles.length > 0 && (
              <p className="trivia-game-guessed">
                Already guessed: {guessedTitles.join(", ")}
              </p>
            )}
          </form>
        )}
      </Container>
    </>
  );
};
