import { Button, TableCell, TableRow } from "semantic-ui-react";

import { useUser } from "../../context/UserContext";
import { Movie } from "../../types/types";
import {
  moviesPath,
  RecEnginePath,
  SEEDING_MOVIE,
} from "../../constants/constants";
import { useNavigate } from "react-router-dom";

type MovieTableRowProps = {
  movie: Movie;
  returnRental: (s: string) => void;
};
export const MovieTableRow = ({ movie, returnRental }: MovieTableRowProps) => {
  const navigate = useNavigate();
  const { user, addToCart, removeFromCart, isInCart } = useUser();
  return (
    <TableRow>
      <TableCell className="title-cell">
        <a href={`${moviesPath}/${movie.id}`}>{movie.title}</a>
        <br />
        <Button
          onClick={() =>
            navigate(`${RecEnginePath}?${SEEDING_MOVIE}=${encodeURI(movie.id)}`)
          }
        >
          Recs like this!
        </Button>
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
                  {isInCart(movie.id) ? "Remove from cart" : "Add to cart"}
                </Button>
              )
            )}
          </TableCell>
        </>
      ) : null}
    </TableRow>
  );
};
