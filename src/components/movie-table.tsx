import { Button, Table } from "semantic-ui-react";

import { Member, Movie } from "../types/types";
import { MovieTableHeader } from "./movie-table-header";

type MovieTableProps = {
  movies: Movie[];
  user: Member | null;
  cart: string[];
  cartUpdate: (s: string, b: boolean) => void;
};
export const MovieTable = ({
  movies,
  user,
  cart,
  cartUpdate,
}: MovieTableProps) => {
  return (
    <div className="MovieTable">
      <Table striped>
        <MovieTableHeader user={user} cart={cart} />
        <Table.Body>
          {movies.map((movie) => {
            return (
              <Table.Row key={`${movie.id}`}>
                <Table.Cell style={{ fontWeight: 1000, fontSize: "large" }}>
                  {movie.title}
                </Table.Cell>
                <Table.Cell>{movie.rating}</Table.Cell>
                <Table.Cell>{movie.year}</Table.Cell>
                <Table.Cell>
                  <div>
                    <p style={{ fontWeight: "bold" }}>Director:</p>
                    {movie.director}
                  </div>
                  <div>
                    <p style={{ fontWeight: "bold" }}>Starring:</p>
                    {movie.cast.join(", ")}
                  </div>
                </Table.Cell>
                {user ? (
                  <>
                    <Table.Cell>{movie.inventory}</Table.Cell>
                    <Table.Cell>{movie.rented ? movie.rented : 0}</Table.Cell>
                    <Table.Cell>
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
                    </Table.Cell>
                  </>
                ) : null}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};
