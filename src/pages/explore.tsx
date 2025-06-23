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

const DEPTH_OPTIONS = Array.from({ length: 10 }, (_, i) => ({
  key: i + 1,
  text: `${i + 1}`,
  value: i + 1,
}));

export const Explore = () => {
  const data = localStorage.getItem("user");
  const user = data ? (JSON.parse(data) as Member) : null;

  const [creator, setCreator] = useState<string>("");
  const [director, setDirector] = useState<string>("");
  const [movieTitle, setMovieTitle] = useState("");
  const [depth, setDepth] = useState<number>(1);
  const [exploreType, setExploreType] = useState<string>("");
  const [starData, setStarData] = useState<string[] | null>(null);
  const [movieData, setMovieData] = useState<Movie[] | null>(null);
  const [directorData, setDirectorData] = useState<string[] | null>(null);

  const handleSelectionChange = async (
    _: React.SyntheticEvent<HTMLElement>,
    { value }: DropdownProps
  ) => {
    if (value === KEVIN_BACON) {
      setCreator("");
    }
    setExploreType(value as string);
  };

  const handleDepthSelectionChange = async (
    _: React.SyntheticEvent<HTMLElement>,
    { value }: DropdownProps
  ) => {
    setDepth(value as number);
  };

  // @TODO: add loader?
  const explore = async () => {
    console.log("exploreType=", exploreType);
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
        const kb = await kevinBacon(creator, movieTitle, director, depth);
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
        <Dropdown
          placeholder="Select Search"
          fluid
          selection
          options={CREATOR_OPTIONS}
          onChange={handleSelectionChange}
        />
        {exploreType !== KEVIN_BACON ? (
          // @TODO: add css for this file
          <div className="ui focus input">
            <input
              type="text"
              placeholder="Enter Creator Name"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
            />
          </div>
        ) : (
          <div>
            <div className="ui focus input">
              Star:
              <input
                type="text"
                placeholder="Enter STAR Name"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
              />
            </div>
            <div className="ui focus input">
              Movie
              <input
                type="text"
                placeholder="Enter Movie Title"
                value={movieTitle}
                onChange={(e) => setMovieTitle(e.target.value)}
              />
            </div>
            <div className="ui focus input">
              DIRECTOR:
              <input
                type="text"
                placeholder="Enter Director Name"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
              />
            </div>
            <Dropdown
              placeholder="Select SEarch Depth"
              fluid
              selection
              options={DEPTH_OPTIONS}
              onChange={handleDepthSelectionChange}
            />
          </div>
        )}
        <Button onClick={explore}>Go!</Button>
      </Container>
      {starData ? (
        // @TODO: style this properly
        <Container text className="movie-container">
          <Header as="h2" className="title-field">
            Co-Stars
          </Header>
          <ul>
            {starData.map((s) => (
              <li key={s}>{s}</li>
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
            {directorData.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </Container>
      ) : null}
    </>
  );
};
