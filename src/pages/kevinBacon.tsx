import { useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownProps,
  Input,
} from "semantic-ui-react";
import { HeaderBanner } from "../components/headerBanner";
import { Member, Movie } from "../types/types";
import {
  KEVIN_BACON,
  moviesPath,
  STARRED_IN,
  STARRED_WITH,
} from "../constants/constants";
import { starredWith, starredIn } from "../utils/utils";

const CREATOR_OPTIONS = [
  {
    key: "director",
    text: "director",
    value: "director",
  },
  {
    key: "starredWith",
    text: "starred with",
    value: STARRED_WITH,
  },
  {
    key: "starredIn",
    text: "starred in",
    value: STARRED_IN,
  },
  {
    key: "kevinBacon",
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
      case STARRED_WITH:
        performers = await starredWith(creator);
        break;
      case STARRED_IN:
        movies = await starredIn(creator);
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
        <p>Hello Kevin Bacon</p>
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
