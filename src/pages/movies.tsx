import { useEffect, useState } from "react";

import { Movie } from "../types/types";
import { fetchMovies, returnRentals, updateCart } from "../utils/utils";
import { HeaderBanner } from "../components/headerBanner";
import { MovieTable } from "../components/movieTable/movieTable";
import { ErrorMessage } from "../components/errorMessage";
import { Spinner } from "../components/Spinner";
import { getUserFromCookie, setCookie } from "../utils/cookieUtils";

const errorMsg = "An unexpected error occurred fetching our movie catalog";

export const MoviesPage = () => {
  const user = getUserFromCookie();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [cart, setCart] = useState<string[]>(user?.cart ?? []);
  const [, setCheckedOut] = useState<string[]>(user?.checked_out ?? []);
  const [movieErr, setMovieErr] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getMovies = async (page: string = "A") => {
    page = page === "#123?!" ? "%23" : page;
    setIsLoading(true);
    const newMovies = await fetchMovies(page);
    if (newMovies) {
      setMovies(newMovies);
      setMovieErr(false);
    } else {
      setMovieErr(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  movies.sort((a: Movie, b: Movie) => (a.title < b.title ? -1 : 1));

  const cartUpdate = (movieID: string, removeFromCart: boolean) => {
    if (!user) return;
    setCart(updateCart(user.username, movieID, cart, removeFromCart));

    if (user.cart) {
      user.cart = user.cart.filter((id) => id !== movieID); // ✅ Replaces splice
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

  const renderContent = () => {
    if (isLoading) {
      return <Spinner message="📼 Loading our VHS library..." />;
    }
    if (movieErr) {
      return <ErrorMessage msg={errorMsg} />;
    }
    return (
      <MovieTable
        movies={movies}
        user={user}
        updateMovies={getMovies}
        returnRental={returnRental}
      />
    );
  };

  return (
    <>
      <HeaderBanner user={user} />
      {renderContent()}
    </>
  );
};
