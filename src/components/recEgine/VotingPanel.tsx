type VotingPanelProps = {
  movieIDs: string[];
  addVote: (id: string) => void;
};
export const VotingPanel = ({ movieIDs, addVote }: VotingPanelProps) => {
  type MovieIDTitle = {
    id: string;
    title: string;
  };
  const movies: MovieIDTitle[] = movieIDs.map((v) => ({
    id: v,
    title: v.split("_").slice(0, -1).join(" "),
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
