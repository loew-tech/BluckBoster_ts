import { TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import { Movie } from "../../types/types";

type RentalTableHeaderProps = {
  rentals: Movie[];
  rentalReturn: (movieIDs: string[]) => void;
};
export const RentalTableHeader = ({
  rentals,
  rentalReturn,
}: RentalTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHeaderCell>Title</TableHeaderCell>
        <TableHeaderCell>
          <button
            disabled={!rentals.length}
            onClick={() => rentalReturn(rentals.map((m) => m.id))}
          >
            Return All Movies
          </button>
        </TableHeaderCell>
      </TableRow>
    </TableHeader>
  );
};
