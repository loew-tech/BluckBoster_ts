import { useEffect, useState } from "react";

import { Movie } from "../types/types";
import { fetchMovies, returnRentals, updateCart } from "../utils/utils";
import { HeaderBanner } from "../components/headerBanner";
import { MovieTable } from "../components/movieTable/movieTable";
import { ErrorMessage } from "../components/errorMessage";
import { getUserFromCookie, setCookie } from "../utils/cookieUtils";

const errorMsg = "An unexpected error occurred fetching our movie catalog";

export const MoviesPage = () => {
  const user = getUserFromCookie();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [cart, setCart] = useState<string[]>(user?.cart ?? []);
  const [_, setCheckedOut] = useState(user?.checked_out ?? []);
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
      setCookie("user", JSON.stringify(user));
    }
  };

  const returnRental = async (movieID: string) => {
    if (!user) return;
    const success = await returnRentals(user.username, [movieID]);
    if (!success) {
      console.error("Failed to return rental");
      return;
    }
    const updatedCheckedOut = (user.checked_out ?? []).filter(
      (id) => id !== movieID
    );
    const updatedUser = { ...user, checked_out: updatedCheckedOut };
    setCookie("user", JSON.stringify(updatedUser));
    setCheckedOut(updatedCheckedOut);
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
