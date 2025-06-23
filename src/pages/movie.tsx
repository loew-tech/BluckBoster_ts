import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Header } from "semantic-ui-react";

import { Member, Movie } from "../types/types";
import { HeaderBanner } from "../components/headerBanner";
import { TriviaContainer } from "../components/movieComponents/triviaContainer";
import { MovieElementRow } from "../components/movieComponents/movieElementRow";
import { ErrorMessage } from "../components/errorMessage";

import "./movie.css";
import { fetchMovie } from "../utils/utils";

const WIKIPEDIA_URI = "https://en.wikipedia.org/wiki";

export const MoviePage = () => {
  const data = localStorage.getItem("user");
  const user = data ? (JSON.parse(data) as Member) : null;
  const [movie, setMovie] = useState<Movie | null>(null);
  const { movieID } = useParams();

  const getMovie = async () => {
    if (!movieID) {
      setMovie(null);
      return;
    }
    const movie = await fetchMovie(movieID);
    setMovie(movie);
  };

  useEffect(() => {
    getMovie();
  }, []);

  const getWikiID = (movieID: string) => {
    let ret = movieID.split("_");
    ret.splice(ret.length - 1, 1);
    return ret.join("_");
  };

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
        <ErrorMessage msg="Failed to retrieve movies from cloud"></ErrorMessage>
      )}
    </>
  );
};
