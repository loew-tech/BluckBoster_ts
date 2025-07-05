import { Table, TableBody } from "semantic-ui-react";

import { Movie } from "../../types/types";
import { MovieTableHeader } from "./movieTableHeader";
import { PagePicker } from "./pagePicker/pagePicker";

import "./movieTable.css";
import { MovieTableRow } from "./movieTableRow";

type MovieTableProps = {
  movies: Movie[];
  updateMovies: (s: string) => void;
  returnRental: (s: string) => void;
  activePage?: string;
};
export const MovieTable = ({
  movies,
  updateMovies,
  returnRental,
  activePage,
}: MovieTableProps) => {
  return (
    <div className="movie-table">
      <PagePicker updateMovies={updateMovies} activePage={activePage} />
      <Table striped>
        <MovieTableHeader />
        <TableBody>
          {movies.map((movie) => {
            return (
              <MovieTableRow
                movie={movie}
                returnRental={returnRental}
                key={movie.id}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
