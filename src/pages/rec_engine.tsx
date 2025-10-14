import { useEffect, useState } from "react";

import { HeaderBanner } from "../components/headerBanner/headerBanner";
import { VotingPanel } from "../components/recEngine/VotingPanel";
import {
  getFinalRecommendations,
  getVotingInitialSlate,
  iterateVote,
} from "../utils/utils";
import { Mood, Recommendation } from "../types/types";
import { ErrorMessage } from "../components/common/errorMessage";
import { RecommendationDisplay } from "../components/recEngine/RecommendationDisplay";
import { Spinner } from "../components/common/Spinner";

const getNewMood = (): Mood => {
  return {
    id: 0,
    acting: 0,
    action: 0,
    cinematography: 0,
    comedy: 0,
    directing: 0,
    drama: 0,
    fantasy: 0,
    horror: 0,
    romance: 0,
    story_telling: 0,
    suspense: 0,
    writing: 0,
  };
};

export const RecEnginePage = () => {
  const [movieIDs, setMovieIDs] = useState<string[]>([]);
  const [votedMovieIDs, setVotedMovieIDs] = useState<Set<string>>(new Set());
  const [prevVoted, setPrevVoted] = useState<Set<string>>(new Set());
  const [mood, setMood] = useState<Mood>(getNewMood());
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );
  const [iteration, setIteration] = useState(1);
  const [recEngineErr, setRecEngineErr] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [numPrevSelected, setNumPrevSelected] = useState(0);

  const iterate = () => {
    setIteration(iteration + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    async function fetchInitialMovies() {
      setIsLoading(true);
      const votingResult = await getVotingInitialSlate();
      if (votingResult !== null) {
        setMovieIDs(votingResult.movies ?? []);
      } else {
        setRecEngineErr(true);
      }
      setIsLoading(false);
    }
    fetchInitialMovies();
  }, []);

  const toggleVote = (id: string) => {
    const newVotedMovieIDs = new Set(votedMovieIDs);
    if (newVotedMovieIDs.has(id)) {
      newVotedMovieIDs.delete(id);
    } else {
      newVotedMovieIDs.add(id);
    }
    setVotedMovieIDs(newVotedMovieIDs);
  };

  const vote = async () => {
    setIsLoading(true);
    const votingResult = iterateVote(
      mood,
      iteration,
      numPrevSelected,
      votedMovieIDs ? Array.from(votedMovieIDs) : []
    );
    if (votingResult === null) {
      setIsLoading(false);
      setRecEngineErr(true);
      return;
    }

    await votingResult.then((result) => {
      if (result === null) {
        setIsLoading(false);
        setRecEngineErr(true);
        return;
      }
      const newPrevVoted = new Set(prevVoted);
      votedMovieIDs.forEach((id) => newPrevVoted.add(id));
      setPrevVoted(newPrevVoted);
      setRecEngineErr(false);
      setNumPrevSelected(numPrevSelected + votedMovieIDs.size);
      if (result.movies && result.movies.length > 0) {
        setVotedMovieIDs(
          new Set(result.movies.filter((id) => prevVoted.has(id)))
        );
        setMovieIDs(result.movies);
      }
      if (result.newMood) {
        setMood(result.newMood);
      }
    });
    iterate();
  };

  const getFinalRecommendation = async () => {
    const finalRecommendation = await getFinalRecommendations(mood);
    if (finalRecommendation === null) {
      setRecEngineErr(true);
      return;
    }
    setRecommendation(finalRecommendation);
  };

  const renderContent = () => {
    if (isLoading) {
      return <Spinner message="📼 Loading recommendations..." />;
    }
    if (recEngineErr) {
      return (
        <ErrorMessage msg="Error in recommendation engine. Please try again later." />
      );
    }
    if (recommendation) {
      return <RecommendationDisplay recommendation={recommendation} />;
    }
    return (
      <>
        <VotingPanel
          toggleVote={toggleVote}
          movieIDs={movieIDs}
          votedMovieIDs={votedMovieIDs}
        />
        <button onClick={iteration < 5 ? vote : getFinalRecommendation}>
          {iteration < 5 ? "VOTE" : "PICK MOVIES"}
        </button>
      </>
    );
  };

  return (
    <>
      <HeaderBanner />
      {renderContent()}
    </>
  );
};
