import { useEffect, useState } from "react";

import { Member, Movie } from "../types/types";
import { fetchMovies, returnRentals, updateCart } from "../utils/utils";
import { HeaderBanner } from "../components/headerBanner";
import { MovieTable } from "../components/movieTable/movieTable";
import { ErrorMessage } from "../components/errorMessage";

const errorMsg = "An unexpected error occurred fetching our movie catalog";

export const MoviesPage = () => {
  const data = localStorage.getItem("user");
  const user = data !== null ? (JSON.parse(data) as Member) : null;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [cart, setCart] = useState<string[]>(user?.cart ?? []);
  const [checkedOut, setCheckedOut] = useState(user?.checked_out ?? []);
  const [movieErr, setMovieErr] = useState<boolean>(false);

  const getMovies = async (page: string = "A") => {
    page = page === "#123?!" ? "%23" : page;
    const newMovies = await fetchMovies(page);
    if (newMovies) {
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

  const cartUpdate = (movieID: string, removeFromCart: boolean) => {
    if (!user) {
      return;
    }
    setCart(updateCart(user.username, movieID, cart, removeFromCart));
    const index = user.cart ? user.cart.indexOf(movieID) : -1;
    if (-1 < index) {
      user.cart?.splice(index, 1);
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  const returnRental = (movieID: string) => {
    if (!user) {
      return;
    }
    returnRentals(user?.username, [movieID]);
    const index = user?.checked_out ? user.checked_out.indexOf(movieID) : -1;
    if (-1 < index) {
      user?.checked_out?.splice(index, 1);
      localStorage.setItem("user", JSON.stringify(user));
      // @TODO: better way to trigger rerender?
      setCheckedOut(user?.checked_out ?? []);
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
          updateMovies={getMovies}
          returnRental={returnRental}
        />
      ) : (
        <>
          <ErrorMessage msg={errorMsg} />
        </>
      )}
    </>
  );
};
