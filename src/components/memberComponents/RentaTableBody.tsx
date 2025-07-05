import { Button, TableBody, TableCell, TableRow } from "semantic-ui-react";

import { Movie } from "../../types/types";
import { moviesPath } from "../../constants/constants";

type RentalTableBodyProps = {
  rentals: Movie[];
  rentalReturn: (movieIDs: string[]) => void;
};
export const RentalTableBody = ({
  rentals,
  rentalReturn,
}: RentalTableBodyProps) => {
  return (
    <TableBody>
      {rentals.map((movie, i) => {
        return (
          <TableRow key={`${i}-${movie.id}`}>
            <TableCell className="title-cell">
              <a href={`${moviesPath}/${movie.id}`}>{movie.title}</a>
            </TableCell>
            <TableCell>
              <Button
                onClick={() => {
                  rentalReturn([movie.id]);
                }}
              >
                Return Movie
              </Button>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};
