import { useState } from "react";
import { Button, Container } from "semantic-ui-react";

import { HeaderBanner } from "../components/headerBanner/headerBanner";
import { Movie } from "../types/types";
import {
  DIRECTOR,
  KEVIN_BACON,
  STAR,
  moviesPath,
} from "../constants/constants";
import {
  starredWith,
  starredIn,
  directedActors,
  directedMovies,
  kevinBacon,
} from "../utils/utils";
import { SearchSelector } from "../components/explore/SearchSelector";
import { CreatorInputs } from "../components/explore/CreatorInputs";
import { ExploreSummary } from "../components/explore/ExploreSummary";
import { ResultList } from "../components/explore/ResultList";
import { Spinner } from "../components/Spinner";

import "./explore.css";

export const Explore = () => {
  const [creator, setCreator] = useState<string>("");
  const [starsPercentage, setStarsPercentage] = useState<number | null>(null);
  const [director, setDirector] = useState<string>("");
  const [directorPercentage, setDirectorPercentage] = useState<number | null>(
    null
  );
  const [movieTitle, setMovieTitle] = useState("");
  const [moviesPercentage, setMoviesPercentage] = useState<number | null>(null);
  const [depth, setDepth] = useState<number>(1);
  const [exploreType, setExploreType] = useState<string>("");
  const [starData, setStarData] = useState<string[]>([]);
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const [directorData, setDirectorData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleExplore = async () => {
    setStarData([]);
    setMovieData([]);
    setDirectorData([]);
    setStarsPercentage(null);
    setMoviesPercentage(null);
    setDirectorPercentage(null);
    setIsLoading(true);

    let stars: string[] = [];
    let movies: Movie[] = [];

    switch (exploreType) {
      case STAR:
        stars = await starredWith(creator);
        movies = await starredIn(creator);
        setStarData(stars);
        setMovieData(movies);
        break;
      case DIRECTOR:
        stars = await directedActors(creator);
        movies = await directedMovies(creator);
        setStarData(stars);
        setMovieData(movies);
        break;
      case KEVIN_BACON:
        const kb = await kevinBacon(creator, movieTitle, director, depth);
        setStarData(kb?.stars ?? []);
        setStarsPercentage(
          kb?.stars ? (kb.stars.length / kb.total_stars) * 100 : null
        );
        setMovieData(kb?.movies ?? []);
        setMoviesPercentage(
          kb?.movies ? (kb.movies.length / kb.total_movies) * 100 : null
        );
        setDirectorData(kb?.directors ?? []);
        setDirectorPercentage(
          kb?.directors
            ? (kb.directors.length / kb.total_directors) * 100
            : null
        );
        break;
      default:
        console.warn("Unknown explore request:", exploreType);
    }
    setIsLoading(false);
  };

  return (
    <>
      <HeaderBanner />
      <Container text className="movie-container">
        {isLoading && <Spinner message="🔎 Searching the movies archives..." />}
        <SearchSelector
          exploreType={exploreType}
          setExploreType={setExploreType}
          depth={depth}
          setDepth={setDepth}
        />
        <CreatorInputs
          exploreType={exploreType}
          creator={creator}
          setCreator={setCreator}
          movieTitle={movieTitle}
          setMovieTitle={setMovieTitle}
          director={director}
          setDirector={setDirector}
        />
        <Button onClick={handleExplore}>Go!</Button>
      </Container>
      {starsPercentage !== null && (
        <ExploreSummary
          starData={starData}
          starsPercentage={starsPercentage}
          movieData={movieData}
          moviesPercentage={moviesPercentage}
          directorData={directorData}
          directorPercentage={directorPercentage}
        />
      )}
      {starData.length > 0 && <ResultList title="Co-Stars" items={starData} />}
      {movieData.length > 0 && (
        <ResultList
          title="Movies"
          items={movieData.map((m) => ({
            label: m.title,
            link: `${moviesPath}/${m.id}`,
          }))}
        />
      )}

      {directorData.length > 0 && (
        <ResultList title="Directors" items={directorData} />
      )}
    </>
  );
};
