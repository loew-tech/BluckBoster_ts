import { useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownProps,
  Header,
} from "semantic-ui-react";
import { HeaderBanner } from "../components/headerBanner";
import { Member, Movie } from "../types/types";
import {
  DIRECTOR,
  KEVIN_BACON,
  moviesPath,
  STAR,
} from "../constants/constants";
import {
  starredWith,
  starredIn,
  directedActors,
  directedMovies,
  kevinBacon,
} from "../utils/utils";

const CREATOR_OPTIONS = [
  {
    key: DIRECTOR,
    text: DIRECTOR,
    value: DIRECTOR,
  },
  {
    key: STAR,
    text: STAR,
    value: STAR,
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
  const [starData, setStarData] = useState<string[] | null>(null);
  const [movieData, setMovieData] = useState<Movie[] | null>(null);
  const [directorData, setDirectorData] = useState<string[] | null>(null);

  const handleSelectionChange = async (
    _: React.SyntheticEvent<HTMLElement>,
    { value }: DropdownProps
  ) => {
    setExploreType(value as string);
  };

  const explore = async () => {
    let stars: string[] | null = null;
    let movies: Movie[] | null = null;
    switch (exploreType) {
      case STAR:
        stars = await starredWith(creator);
        movies = await starredIn(creator);
        break;
      case DIRECTOR:
        stars = await directedActors(creator);
        movies = await directedMovies(creator);
        break;
      case KEVIN_BACON:
        const kb = await kevinBacon(creator);
        setStarData(kb?.stars ?? null);
        setMovieData(kb?.movies ?? null);
        setDirectorData(kb?.directors ?? null);
        return;
      default:
        console.warn("Unknown explore request:", exploreType);
    }
    setStarData(stars);
    setMovieData(movies);
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
      {starData ? (
        // @TODO: style this properly
        <Container text className="movie-container">
          <Header as="h2" className="title-field">
            Co-Stars
          </Header>
          <ul>
            {starData.map((p) => (
              <li>{p}</li>
            ))}
          </ul>
        </Container>
      ) : null}
      {movieData ? (
        // @TODO: style this properly
        <Container text className="movie-container">
          <Header as="h2" className="title-field">
            Movies
          </Header>
          <ul>
            {movieData.map((m) => (
              <li key={m.id}>
                <a href={`${moviesPath}/${m.id}`}>{m.title}</a>
              </li>
            ))}
          </ul>
        </Container>
      ) : null}
      {directorData ? (
        // @TODO: style this properly
        <Container text className="movie-container">
          <Header as="h2" className="title-field">
            Directors
          </Header>
          <ul>
            {directorData.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </Container>
      ) : null}
    </>
  );
};
