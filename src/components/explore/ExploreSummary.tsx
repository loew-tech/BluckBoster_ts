import { Container } from "semantic-ui-react";
import { Movie } from "../../types/types";

interface Props {
  starData: string[];
  starsPercentage: number | null;
  movieData: Movie[];
  moviesPercentage: number | null;
  directorData: string[];
  directorPercentage: number | null;
}

export const ExploreSummary = ({
  starData,
  starsPercentage,
  movieData,
  moviesPercentage,
  directorData,
  directorPercentage,
}: Props) => {
  return (
    <Container text className="explore-container">
      <h2>SUMMARY</h2>
      <div>
        Stars Explored: {starData.length}; {starsPercentage?.toFixed(2)}% of
        total
      </div>
      <div>
        Movies Explored: {movieData.length}; {moviesPercentage?.toFixed(2)}% of
        total
      </div>
      <div>
        Directors Explored: {directorData.length};{" "}
        {directorPercentage?.toFixed(2)}% of total
      </div>
    </Container>
  );
};
