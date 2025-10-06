import { useEffect, useState } from "react";

import { HeaderBanner } from "../components/headerBanner/headerBanner";
import { VotingPanel } from "../components/recEngine/VotingPanel";
import { getVotingInitialSlate, iterateVote } from "../utils/utils";
import { Mood } from "../types/types";
import { ErrorMessage } from "../components/common/errorMessage";

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
  const [iteration, setIteration] = useState(1);
  const [recEngineErr, setRecEngineErr] = useState<boolean>(false);

  const iterate = () => {
    setIteration(iteration + 1);
    setVotedMovieIDs(new Set<string>());
  };

  useEffect(() => {
    async function fetchInitialMovies() {
      const votingResult = await getVotingInitialSlate();
      if (votingResult !== null) {
        setMovieIDs(votingResult.movies ?? []);
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
      if (result.movies && result.movies.length > 0) {
        setMovieIDs(result.movies);
      }
      if (result.newMood) {
        setMood(result.newMood);
      }
    });
    iterate();
  };

  return (
    <>
      <HeaderBanner />
      <VotingPanel toggleVote={toggleVote} movieIDs={movieIDs} />
      <button onClick={vote}>{iteration < 5 ? "VOTE" : "PICK MOVIES"}</button>
      {recEngineErr && (
        <ErrorMessage msg="Error in recommendation engine. Please try again later." />
      )}
    </>
  );
};
