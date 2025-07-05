import { TableRow, TableHeader, TableHeaderCell } from "semantic-ui-react";

import { useUser } from "../../context/UserContext";

export const MovieTableHeader = () => {
  const { user } = useUser();
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
