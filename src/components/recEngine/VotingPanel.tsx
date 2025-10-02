type VotingPanelProps = {
  movieIDs: string[];
  addVote: (id: string) => void;
};
export const VotingPanel = ({ movieIDs, addVote }: VotingPanelProps) => {
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
    <div>
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id} onClick={() => addVote(movie.id)}>
              {movie.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
