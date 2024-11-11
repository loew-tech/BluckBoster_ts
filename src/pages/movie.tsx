import React, { useEffect, useState } from "react";

import { Member, Movie } from "../types/types";
import { HeaderBanner } from "../components/headerBanner";
import { useParams } from "react-router-dom";
import { moviesURI } from "../constants/constants";
import { ErrorMessage } from "../components/errorMessage";

const WIKIPEDIA_URI = "https://en.wikipedia.org/wiki";

export const MoviePage = () => {
  const data = localStorage.getItem("user");
  const user = data ? (JSON.parse(data) as Member) : null;
  const [movie, setMovie] = useState<Movie | null>(null);
  const { movieID } = useParams();

  const getMovie = async () => {
    const response = await fetch(`${moviesURI}/${movieID}`);
    if (response.ok) {
      const movie = await response.json();
      console.log("movie=", movie);
      setMovie(movie);
    } else {
      setMovie(null);
    }
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
        <div>
          <h2>{movie.title}</h2>
          {movie.review.trim() ? (
            <h3>
              Review:
              <p>{movie.review}</p>
            </h3>
          ) : null}

          <h3>
            Synopsis
            <p>
              {movie.synopsis}
              <br></br>
              <a href={`${WIKIPEDIA_URI}/${getWikiID(movie.id)}`}>[More]</a>
            </p>
          </h3>
        </div>
      ) : (
        <>
          <ErrorMessage msg="Failed to retrieve movies from cloud :/"></ErrorMessage>
        </>
      )}
    </>
  );
};
