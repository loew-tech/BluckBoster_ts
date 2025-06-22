import { useState } from "react";
import { Button, Container, Dropdown, DropdownProps } from "semantic-ui-react";
import { HeaderBanner } from "../components/headerBanner";
import { Member, Movie } from "../types/types";
import {
  DIRECTOR,
  KEVIN_BACON,
  moviesPath,
  PERFORMER,
} from "../constants/constants";
import {
  starredWith,
  starredIn,
  directedActors,
  directedMovies,
} from "../utils/utils";

const CREATOR_OPTIONS = [
  {
    key: DIRECTOR,
    text: DIRECTOR,
    value: DIRECTOR,
  },
  {
    key: PERFORMER,
    text: PERFORMER,
    value: PERFORMER,
  },
  {
    key: KEVIN_BACON,
    text: "Kevin Bacon",
    value: KEVIN_BACON,
  },
];

export const KevinBacon = () => {
  const data = localStorage.getItem("user");
  const user = data ? (JSON.parse(data) as Member) : null;

  const [creator, setCreator] = useState<string>("");
  const [exploreType, setExploreType] = useState<string>("");
  const [performerData, setPerformerData] = useState<string[] | null>(null);
  const [movieData, setMovieData] = useState<Movie[] | null>(null);

  const handleSelectionChange = async (
    _: React.SyntheticEvent<HTMLElement>,
    { value }: DropdownProps
  ) => {
    console.log("Here", value);
    setExploreType(value as string);
    console.log("creatorType is", exploreType);
  };

  const explore = async () => {
    console.log("Go!", exploreType, creator);
    let performers: string[] | null = null;
    let movies: Movie[] | null = null;
    switch (exploreType) {
      case PERFORMER:
        performers = await starredWith(creator);
        movies = await starredIn(creator);
        break;
      case DIRECTOR:
        performers = await directedActors(creator);
        movies = await directedMovies(creator);
        break;
      case KEVIN_BACON:
        // @TODO: implement case
        break;
      default:
        console.warn("Unknown explore request:", exploreType);
    }
    setPerformerData(performers);
    setMovieData(movies);
    console.log("KevinBacon", performers);
  };

  return (
    <>
      <HeaderBanner user={user} />
      <Container text className="movie-container">
        <div style={{ display: "flex" }}>
          <Dropdown
            placeholder="Select Search"
            fluid
            selection
            options={CREATOR_OPTIONS}
            onChange={handleSelectionChange}
          />
          <div className="ui focus input">
            <input
              type="text"
              placeholder="Enter Creator Name"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
            />
          </div>
          <Button onClick={explore}>Go!</Button>
        </div>
      </Container>
      {performerData ? (
        // @TODO: style this properly
        <Container text className="movie-container">
          <ul>
            {performerData.map((p) => (
              <li>{p}</li>
            ))}
          </ul>
        </Container>
      ) : null}
      {movieData ? (
        // @TODO: style this properly
        <Container text className="movie-container">
          <ul>
            {movieData.map((m) => (
              <li>
                <a href={`${moviesPath}/${m.id}`}>{m.title}</a>
              </li>
            ))}
          </ul>
        </Container>
      ) : null}
    </>
  );
};
