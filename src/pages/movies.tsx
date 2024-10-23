import { useEffect, useState } from "react";
import { Member, Movie } from "../types/types";
import { updateCart } from "../utils/utils";
import { HeaderBanner } from "../components/headerBanner";
import { MovieTable } from "../components/movieTable";
import { ErrorMessage } from "../components/errorMessage";
import { moviesURI } from "../constants/constants";

const errorMsg = "An unexpected error occurred fetching our movie catalog";

export const MoviesPage = () => {
  const data = localStorage.getItem("user");
  const user = data !== null ? (JSON.parse(data) as Member) : null;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [cart, setCart] = useState<string[]>(
    user && user.cart ? user.cart : []
  );
  const [movieErr, setMovieErr] = useState<boolean>(false);

  const getMovies = async () => {
    const response = await fetch(moviesURI);
    if (response.ok) {
      const newMovies = await response.json();
      setMovies(newMovies);
      setMovieErr(false);
    } else {
      setMovieErr(true);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  movies.sort((a: Movie, b: Movie) => {
    if (a.title < b.title) {
      return -1;
    }
    return 1;
  });

  const cartUpdate = (movie_id: string, removeFromCart: boolean) => {
    if (!user) {
      return;
    }
    setCart(updateCart(user.username, movie_id, cart, removeFromCart));
    const index = user.cart ? user.cart.indexOf(movie_id) : -1;
    if (-1 < index) {
      user.cart?.splice(index, 1);
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  return (
    <>
      <HeaderBanner user={user} />
      {!movieErr ? (
        <MovieTable
          movies={movies}
          user={user}
          cart={cart}
          cartUpdate={cartUpdate}
        />
      ) : (
        <>
          <ErrorMessage msg={errorMsg} />
        </>
      )}
    </>
  );
};
