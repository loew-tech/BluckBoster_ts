import { useEffect, useState } from "react";

import { Movie } from "../types/types";
import { fetchMovies, returnRentals } from "../utils/utils";
import { HeaderBanner } from "../components/headerBanner";
import { MovieTable } from "../components/movieTable/movieTable";
import { ErrorMessage } from "../components/errorMessage";
import { Spinner } from "../components/Spinner";
import { useUser } from "../context/UserContext";

const errorMsg = "An unexpected error occurred fetching our movie catalog";

export const MoviesPage = () => {
  const { user, setUser } = useUser();

  const [movies, setMovies] = useState<Movie[]>([]);
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
    setUser(updatedUser);
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
        updateMovies={getMovies}
        returnRental={returnRental}
      />
    );
  };

  return (
    <>
      <HeaderBanner />
      {renderContent()}
    </>
  );
};
