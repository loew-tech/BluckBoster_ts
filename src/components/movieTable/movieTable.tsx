import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "semantic-ui-react";

import { Member, Movie } from "../../types/types";
import { MovieTableHeader } from "./movieTableHeader";
import { moviesPath } from "../../constants/constants";
import { PagePicker } from "./pagePicker";

import "./movieTable.css";

type MovieTableProps = {
  movies: Movie[];
  user: Member | null;
  cart: string[];
  cartUpdate: (s: string, b: boolean) => void;
  updateMovies: (s: string) => void;
};
export const MovieTable = ({
  movies,
  user,
  cart,
  cartUpdate,
  updateMovies,
}: MovieTableProps) => {
  return (
    <div className="movie-table">
      <PagePicker updateMovies={updateMovies} />
      <Table striped>
        <MovieTableHeader user={user} cart={cart} />
        <TableBody>
          {movies.map((movie, i) => {
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
                    {movie.cast.join(", ")}
                  </div>
                </TableCell>
                {user ? (
                  <>
                    <TableCell>{movie.inventory}</TableCell>
                    <TableCell>{movie.rented ? movie.rented : 0}</TableCell>
                    <TableCell>
                      {movie.inventory && (
                        <Button
                          onClick={() => {
                            cartUpdate(movie.id, cart.includes(movie.id));
                          }}
                        >
                          {cart.includes(movie.id)
                            ? "Remove from cart"
                            : "Add to cart"}
                        </Button>
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
