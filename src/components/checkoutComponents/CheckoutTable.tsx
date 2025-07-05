import { Table, TableBody } from "semantic-ui-react";

import { Movie } from "../../types/types";

import { CheckoutTableRow } from "./CheckoutTableRow";

type CheckoutTableBodyProps = {
  movies: Movie[];
  cartRemove: (movieID: string) => void;
};
export const CheckoutTable = ({
  movies,
  cartRemove,
}: CheckoutTableBodyProps) => {
  return (
    <Table striped>
      <TableBody>
        {movies.map((movie) => (
          <CheckoutTableRow
            key={movie.id}
            movie={movie}
            cartRemove={cartRemove}
          />
        ))}
      </TableBody>
    </Table>
  );
};
