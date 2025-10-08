import { useState } from "react";

import { Container, Grid } from "semantic-ui-react";

import "./votingPanel.css";

type VotingPanelProps = {
  movieIDs: string[];
  toggleVote: (id: string) => void;
};
export const VotingPanel = ({ movieIDs, toggleVote }: VotingPanelProps) => {
  const [selected, setSelected] = useState<Set<string>>(new Set<string>());

  const toggleSelection = (id: string) => {
    if (selected.has(id)) {
      const newSet = new Set(selected);
      newSet.delete(id);
      setSelected(newSet);
    } else {
      const newSet = new Set(selected);
      newSet.add(id);
      setSelected(newSet);
    }
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
                selected.has(movie.id) ? "candidate selected" : "candidate"
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
