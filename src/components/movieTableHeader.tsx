import { useNavigate } from "react-router-dom";
import {
  Button,
  TableRow,
  TableHeader,
  TableHeaderCell,
} from "semantic-ui-react";

import { Member } from "../types/types";
import { checkoutPath } from "../constants/constants";

type MovieTableHeaderProps = {
  user: Member | null;
  cart: string[];
};
export const MovieTableHeader = ({ user, cart }: MovieTableHeaderProps) => {
  const navigate = useNavigate();

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
            <TableHeaderCell>
              {/* @TODO: move this into headerBanner.tsx */}
              <Button
                disabled={!cart.length}
                onClick={() => navigate(checkoutPath)}
              >
                Cart: ({cart.length})
              </Button>
            </TableHeaderCell>
          </>
        ) : null}
      </TableRow>
    </TableHeader>
  );
};
