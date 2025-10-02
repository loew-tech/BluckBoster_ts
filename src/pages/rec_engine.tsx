import { useEffect, useState } from "react";

import { HeaderBanner } from "../components/headerBanner/headerBanner";
import { VotingPanel } from "../components/recEngine/VotingPanel";
import { getVotingInitialSlate } from "../utils/utils";

export const RecEnginePage = () => {
  const [movies, setMovies] = useState<string[]>([]);
  useEffect(() => {
    async function fetchMovies() {
      const votingResult = await getVotingInitialSlate();
      if (votingResult !== null) {
        setMovies(votingResult.movies);
      }
    }
    fetchMovies();
  }, []);
  return (
    <>
      <HeaderBanner />
      <VotingPanel
        toggleVote={(id: string) => {
          console.log(id);
        }}
        movieIDs={movies}
      />
    </>
  );
};
