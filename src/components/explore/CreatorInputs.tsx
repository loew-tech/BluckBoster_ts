import { KEVIN_BACON } from "../../constants/constants";

interface Props {
  exploreType: string;
  creator: string;
  setCreator: (value: string) => void;
  movieTitle: string;
  setMovieTitle: (value: string) => void;
  director: string;
  setDirector: (value: string) => void;
}

export const CreatorInputs = ({
  exploreType,
  creator,
  setCreator,
  movieTitle,
  setMovieTitle,
  director,
  setDirector,
}: Props) => {
  if (exploreType === KEVIN_BACON) {
    return (
      <div>
        <div className="ui focus input">
          Star:
          <input
            type="text"
            placeholder="Enter Star Name"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
          />
        </div>
        <div className="ui focus input">
          Movie:
          <input
            type="text"
            placeholder="Enter Movie Title"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
        </div>
        <div className="ui focus input">
          Director:
          <input
            type="text"
            placeholder="Enter Director Name"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="ui focus input">
      <input
        type="text"
        placeholder="Enter Creator Name"
        value={creator}
        onChange={(e) => setCreator(e.target.value)}
      />
    </div>
  );
};
