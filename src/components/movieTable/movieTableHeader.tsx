import { TableRow, TableHeader, TableHeaderCell } from "semantic-ui-react";

import { Member } from "../../types/types";

type MovieTableHeaderProps = {
  user: Member | null;
};
export const MovieTableHeader = ({ user }: MovieTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHeaderCell>Title</TableHeaderCell>
        <TableHeaderCell>Rating</TableHeaderCell>
        <TableHeaderCell>Year</TableHeaderCell>
        <TableHeaderCell>Cast</TableHeaderCell>
        {user ? (
          <>
            <TableHeaderCell>Available</TableHeaderCell>
            <TableHeaderCell>Rented</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </>
        ) : null}
      </TableRow>
    </TableHeader>
  );
};
