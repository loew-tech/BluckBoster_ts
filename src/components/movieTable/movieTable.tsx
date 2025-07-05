import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "semantic-ui-react";

import { Movie } from "../../types/types";
import { MovieTableHeader } from "./movieTableHeader";
import { moviesPath } from "../../constants/constants";
import { PagePicker } from "./pagePicker";

import "./movieTable.css";
import { useUser } from "../../context/UserContext";

type MovieTableProps = {
  movies: Movie[];
  updateMovies: (s: string) => void;
  returnRental: (s: string) => void;
};
export const MovieTable = ({
  movies,
  updateMovies,
  returnRental,
}: MovieTableProps) => {
  const { user, addToCart, removeFromCart, isInCart } = useUser();
  return (
    <div className="movie-table">
      <PagePicker updateMovies={updateMovies} />
      <Table striped>
        <MovieTableHeader />
        <TableBody>
          {movies.map((movie) => {
            return (
              <TableRow key={`${movie.id}`}>
                <TableCell className="title-cell">
                  <a href={`${moviesPath}/${movie.id}`}>{movie.title}</a>
                </TableCell>
                <TableCell>{movie.rating}</TableCell>
                <TableCell>{movie.year}</TableCell>
                <TableCell>
                  <div>
                    <p>Director:</p>
                    {movie.director}
                  </div>
                  <div>
                    <p>Starring:</p>
                    {(movie.cast ?? []).join(", ")}
                  </div>
                </TableCell>
                {user ? (
                  <>
                    <TableCell>{movie.inventory}</TableCell>
                    <TableCell>{movie.rented ? movie.rented : 0}</TableCell>
                    <TableCell>
                      {(user?.checked_out ?? []).includes(movie.id) ? (
                        <Button
                          className="return-button"
                          onClick={() => {
                            returnRental(movie.id);
                          }}
                        >
                          Return movie
                        </Button>
                      ) : (
                        movie.inventory && (
                          <Button
                            onClick={() => {
                              isInCart(movie.id)
                                ? removeFromCart(movie.id)
                                : addToCart(movie.id);
                            }}
                          >
                            {isInCart(movie.id)
                              ? "Remove from cart"
                              : "Add to cart"}
                          </Button>
                        )
                      )}
                    </TableCell>
                  </>
                ) : null}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
