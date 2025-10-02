import { Button, TableCell, TableRow } from "semantic-ui-react";

import { Movie } from "../../types/types";
import { moviesPath } from "../../constants/constants";

type CheckoutTableRowProps = {
  movie: Movie;
  cartRemove: (movieID: string) => void;
};
export const CheckoutTableRow = ({
  movie,
  cartRemove,
}: CheckoutTableRowProps) => {
  return (
    <TableRow>
      <TableCell className="title-cell">
        <a href={`${moviesPath}/${movie.id}`}>{movie.title}</a>
      </TableCell>
      <TableCell>
        {movie.inventory ? (
          <Button onClick={() => cartRemove(movie.id)}>Remove From Cart</Button>
        ) : (
          <Button disabled>Out of Stock</Button>
        )}
      </TableCell>
    </TableRow>
  );
};
