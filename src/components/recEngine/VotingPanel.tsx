import { useState } from "react";

import { Container } from "semantic-ui-react";

type VotingPanelProps = {
  movieIDs: string[];
  toggleVote: (id: string) => void;
};
export const VotingPanel = ({ movieIDs, toggleVote }: VotingPanelProps) => {
  const [selected, setSelected] = useState<Set<string>>(new Set<string>());

  const toggleSelection = (id: string) => {
    if (selected.has(id)) {
      selected.delete(id);
    } else {
      const newSet = new Set(selected);
      newSet.add(id);
      setSelected(newSet);
    }
    toggleVote(id);
  };

  type MovieIDTitle = {
    id: string;
    title: string;
  };
  // Helper to safely extract the title from the movie ID
  const parseMovieTitle = (id: string): string => {
    if (!id || typeof id !== "string") return "Unknown Title";
    const parts = id.split("_");
    if (parts.length < 2) return id; // fallback if format is unexpected
    return parts.slice(0, -1).join(" ");
  };

  const movies: MovieIDTitle[] = movieIDs.map((v) => ({
    id: v,
    title: parseMovieTitle(v),
  }));

  return (
    <Container text className="explore-container">
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id} onClick={() => toggleSelection(movie.id)}>
              {movie.title}
            </li>
          );
        })}
      </ul>
    </Container>
  );
};
