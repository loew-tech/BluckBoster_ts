import React, { useEffect, useState } from "react";

import { Member, Movie } from "../types/types";
import { HeaderBanner } from "../components/headerBanner";
import { useParams } from "react-router-dom";
import { moviesURI } from "../constants/constants";

export const MoviePage = () => {
  console.log("$$ here");

  const data = localStorage.getItem("user");
  const user = data ? (JSON.parse(data) as Member) : null;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [getMovieErr, setGetMovieErr] = useState<boolean>(false);
  const { movieID } = useParams();

  const getMovie = async () => {
    const response = await fetch(`${moviesURI}/${movieID}`);
    if (response.ok) {
      const movie = await response.json();
      setMovie(movie);
      setGetMovieErr(false);
    } else {
      setGetMovieErr(true);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <>
      <HeaderBanner user={user} />
      {movie ? (
        <div>
          <h2>{movie.title}</h2>
          <h3>
            Review:
            <p>{movie.review}</p>
          </h3>
          <h3>
            Synopsis
            <p>{movie.synopsis}</p>
          </h3>
        </div>
      ) : null}
    </>
  );
};
