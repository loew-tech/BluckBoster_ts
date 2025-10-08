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
  const [mood, setMood] = useState<Mood>(getNewMood());
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );
  const [iteration, setIteration] = useState(1);
  const [recEngineErr, setRecEngineErr] = useState<boolean>(false);
  const [numPrevSelected, setNumPrevSelected] = useState(0);

  const iterate = () => {
    setIteration(iteration + 1);
    setVotedMovieIDs(new Set<string>());
  };

  useEffect(() => {
    async function fetchInitialMovies() {
      const votingResult = await getVotingInitialSlate();
      if (votingResult !== null) {
        setMovieIDs(votingResult.movies ?? []);
      } else {
        setRecEngineErr(true);
      }
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

  const vote = () => {
    const votingResult = iterateVote(
      mood,
      iteration,
      numPrevSelected,
      votedMovieIDs ? Array.from(votedMovieIDs) : []
    );
    if (votingResult === null) {
      setRecEngineErr(true);
      return;
    }
    votingResult.then((result) => {
      if (result === null) {
        return;
      }
      setNumPrevSelected(numPrevSelected + votedMovieIDs.size);
      if (result.movies && result.movies.length > 0) {
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

  if (recEngineErr) {
    return (
      <>
        <HeaderBanner />
        <ErrorMessage msg="Error in recommendation engine. Please try again later." />
      </>
    );
  }

  return (
    <>
      <HeaderBanner />
      {!recommendation ? (
        <>
          <VotingPanel toggleVote={toggleVote} movieIDs={movieIDs} />
          <button onClick={iteration < 5 ? vote : getFinalRecommendation}>
            {iteration < 5 ? "VOTE" : "PICK MOVIES"}
          </button>
        </>
      ) : (
        <RecommendationDisplay recommendation={recommendation} />
      )}
    </>
  );
};
