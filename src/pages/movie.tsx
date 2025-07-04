import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Header } from "semantic-ui-react";

import { Movie } from "../types/types";
import { HeaderBanner } from "../components/headerBanner";
import { TriviaContainer } from "../components/movieComponents/triviaContainer";
import { MovieElementRow } from "../components/movieComponents/movieElementRow";
import { ErrorMessage } from "../components/errorMessage";
import { Spinner } from "../components/Spinner";
import { fetchMovie } from "../utils/utils";
import { getUserFromCookie } from "../utils/cookieUtils";

import "./movie.css";

const WIKIPEDIA_URI = "https://en.wikipedia.org/wiki";

export const MoviePage = () => {
  const user = getUserFromCookie();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { movieID } = useParams();

  useEffect(() => {
    const getMovie = async () => {
      if (!movieID) {
        setIsLoading(false);
        setMovie(null);
        return;
      }
      const movie = await fetchMovie(movieID);
      setMovie(movie);
      setIsLoading(false);
    };
    getMovie();
  }, [movieID]);

  const getWikiID = (movieID: string) => {
    let ret = movieID.split("_");
    ret.splice(ret.length - 1, 1);
    return ret.join("_");
  };

  if (isLoading) {
    return <Spinner message="Loading movie data..." />;
  }

  return (
    <>
      <HeaderBanner user={user} />
      {movie ? (
        <Container text className="movie-container">
          <Header as="h2" className="title-field">
            {movie.title}
          </Header>
          <Grid columns={2} divided>
            {movie.review && movie.review.trim() ? (
              <MovieElementRow
                sectionTitle="Review:"
                content={<p>{movie.review}</p>}
              />
            ) : null}
            <MovieElementRow
              sectionTitle="Synopsis:"
              content={
                <p>
                  {movie.synopsis}
                  <a href={`${WIKIPEDIA_URI}/${getWikiID(movie.id)}`}>[More]</a>
                </p>
              }
            />
            {movie.trivia ? (
              <MovieElementRow
                sectionTitle="Trivia:"
                content={<TriviaContainer trivia={movie.trivia} />}
              />
            ) : null}
          </Grid>
        </Container>
      ) : (
        <ErrorMessage msg="Failed to retrieve movies from cloud" />
      )}
    </>
  );
};
