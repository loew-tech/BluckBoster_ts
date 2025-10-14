import { Container, Grid } from "semantic-ui-react";

import "./votingPanel.css";

type VotingPanelProps = {
  movieIDs: string[];
  toggleVote: (id: string) => void;
  votedMovieIDs: Set<string>;
};
export const VotingPanel = ({
  movieIDs,
  toggleVote,
  votedMovieIDs,
}: VotingPanelProps) => {
  const toggleSelection = (id: string) => {
    toggleVote(id);
  };

  type Canidate = {
    id: string;
    title: string;
  };
  // Helper to safely extract the title from the movie ID
  const parseMovieTitle = (id: string): string => {
    if (!id || typeof id !== "string") return "Unknown Title";
    const parts = id.split("_");
    if (parts.length < 2) return id; // fallback if format is unexpected
    return parts.slice(0, -1).join(" ") + ` (${parts[parts.length - 1]})`;
  };

  const movies: Canidate[] = movieIDs.map((v) => ({
    id: v,
    title: parseMovieTitle(v),
  }));

  return (
    <Container text className="explore-container">
      <Grid stackable columns={3} textAlign="center">
        {movies.map((movie) => (
          <Grid.Column key={movie.id}>
            <h3
              className={
                votedMovieIDs.has(movie.id) ? "candidate selected" : "candidate"
              }
              onClick={() => toggleSelection(movie.id)}
            >
              {movie.title}
            </h3>
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  );
};
