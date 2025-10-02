import { useEffect } from "react";
import { HeaderBanner } from "../components/headerBanner/headerBanner";
import { VotingPanel } from "../components/recEngine/VotingPanel";

export const RecEnginePage = () => {
  useEffect(() => {
    // @TODO: load initial movies
  }, []);
  return (
    <>
      <HeaderBanner />
      <VotingPanel
        addVote={(id: string) => {
          console.log(id);
        }}
        movieIDs={["m1_1999", "m2_1999"]}
      />
    </>
  );
};
