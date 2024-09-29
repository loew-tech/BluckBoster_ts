import { useNavigate } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";

import { Member } from "../types/types";
import { checkoutPath } from "../constants/constants";

type MovieTableHeaderProps = {
  user: Member | null;
  cart: string[];
};
export const MovieTableHeader = ({ user, cart }: MovieTableHeaderProps) => {
  const navigate = useNavigate();

  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Rating</Table.HeaderCell>
        <Table.HeaderCell>Year</Table.HeaderCell>
        <Table.HeaderCell>Cast</Table.HeaderCell>
        {user ? (
          <>
            <Table.HeaderCell>Available</Table.HeaderCell>
            <Table.HeaderCell>Rented</Table.HeaderCell>
            <Table.HeaderCell>
              <Button
                disabled={!cart.length}
                onClick={() => navigate(checkoutPath)}
              >
                Cart: ({cart.length})
              </Button>
            </Table.HeaderCell>
          </>
        ) : null}
      </Table.Row>
    </Table.Header>
  );
};
